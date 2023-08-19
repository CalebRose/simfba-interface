import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import { BBATeamDropdown } from '../../../_Common/Dropdown';
import firebase from 'firebase';
import { useFirestore } from '../../../../Firebase/firebase';
import BBADraftService from '../../../../_Services/simNBA/BBADraftService';
import { connect } from 'react-redux';
import { getLogo } from '../../../../Constants/getLogo';
import { Spinner } from '../../../_Common/Spinner';
import { NBADrafteeRow } from './NBADrafteeRow';
import { GetTableHoverClass } from '../../../../Constants/CSSClassHelper';
import { NBAScoutPlayerRow } from './NBAScoutPlayerRow';
import { NBADraftHelpModal, ScoutingModal } from './NBADraftModals';
import { MapObjOptions } from '../../../../_Utility/filterHelper';
import { PositionList } from '../../../../Constants/BBAConstants';

const NBADraftPage = ({ currentUser, nbaTeam, cbb_Timestamp, viewMode }) => {
    // Services
    const _draftService = new BBADraftService();
    // Admin Values
    const [data, updateData] = useFirestore(
        'nbadraftstate',
        'YfIofzhpUVSJITQpBrUA'
    );
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [endAt, setEndTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300);
    const [warRoom, setWarRoom] = useState(null);
    const [userWarRoom, setUserWarRoom] = useState(null);
    const [scoutMap, setScoutMap] = useState({});
    const [nbaTeams, setNBATeams] = useState([]);
    const [draftPickList, setDraftPickList] = useState([]);
    const positions = MapObjOptions(PositionList);
    const [selectedPositions, setPositions] = React.useState('');
    const [mobileView, setMobileView] = useState('DRAFT');
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const [modalDraftee, setModalDraftee] = useState(null);
    const {
        allDraftPicks,
        allDraftablePlayers,
        currentPick,
        nextPick,
        recentlyDraftedPlayerID,
        seconds,
        startAt,
        endTime
    } = data;
    const tableHoverClass = GetTableHoverClass(viewMode);

    useEffect(() => {
        if (!endTime || isPaused) return;
        const updateCountdown = () => {
            const now = new Date();
            const endTimeJS = endTime.toDate();
            const secondsLeft = Math.round((endTimeJS - now) / 1000);
            setTimeLeft(secondsLeft > 0 ? secondsLeft : 0);
        };

        updateCountdown(); // Immediately update the countdown
        const intervalId = setInterval(updateCountdown, 1000); // Then update every second

        return () => clearInterval(intervalId);
    }, [endTime, isPaused]);

    // For mobile
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const isMobile = useMediaQuery({ query: `(max-width:851px)` });

    const recentlyDraftedPlayer = useMemo(() => {
        if (allDraftablePlayers) {
            const idx = allDraftablePlayers.findIndex(
                (x) => x.ID === recentlyDraftedPlayerID
            );
            if (idx > -1) {
                const p = allDraftablePlayers[idx];
                return `${p.OverallGrade} ${p.FirstName} ${p.LastName}`;
            }
        }
        return 'P David Ross';
    }, [allDraftablePlayers, recentlyDraftedPlayerID]);
    const draftMap = useMemo(() => {
        const draftMapObj = {};
        if (allDraftPicks) {
            for (let i = 0; i < allDraftPicks.length; i++) {
                const pick = allDraftPicks[i];
                if (pick.SelectedPlayerID > 0) {
                    draftMapObj[pick.SelectedPlayerID] = true;
                }
            }
        }
        return draftMapObj;
    }, [allDraftPicks]);
    const currentDraftPickIdx = useMemo(() => {
        if (allDraftPicks) {
            return allDraftPicks.findIndex(
                (x) => x.DraftNumber === currentPick
            );
        }
        return -1;
    }, [allDraftPicks, currentPick]);
    const currentDraftPick = useMemo(() => {
        if (allDraftPicks && currentDraftPickIdx >= 0) {
            return allDraftPicks[currentDraftPickIdx];
        }
        return null;
    }, [allDraftPicks, currentDraftPickIdx]);
    const nextDraftPickIdx = useMemo(() => {
        if (allDraftPicks) {
            return allDraftPicks.findIndex((x) => x.DraftNumber === nextPick);
        }
        return -1;
    }, [allDraftPicks, nextPick]);

    const nextDraftPick = useMemo(() => {
        if (allDraftPicks && nextDraftPickIdx >= 0) {
            return allDraftPicks[nextDraftPickIdx];
        }
        return null;
    }, [allDraftPicks, nextDraftPickIdx]);

    const currentPickTeamLogo = useMemo(() => {
        if (currentDraftPick) {
            return getLogo(currentDraftPick.Team);
        }
        return null;
    }, [currentDraftPick]);

    const nextPickTeamLogo = useMemo(() => {
        if (nextDraftPick) {
            return getLogo(nextDraftPick.Team);
        }
        return null;
    }, [nextDraftPick]);

    const viewablePlayers = useMemo(() => {
        let list = [];
        if (allDraftablePlayers) {
            list = [...allDraftablePlayers];
            if (selectedPositions.length > 0) {
                list = list.filter((x) =>
                    selectedPositions.includes(x.Position)
                );
            }
        }
        return list;
    }, [allDraftablePlayers, selectedPositions]);

    // NBA Draft Room State -- get Firebase
    // Current Round
    // Current Pick
    // Start Time
    const StartTimer = () => {
        const { currentPick } = data;
        let seconds = 0;
        if (currentPick < 32 && timeLeft === 0) {
            seconds = 300;
        } else if (currentPick > 32 && timeLeft === 0) {
            seconds = 120;
        } else if (isPaused && timeLeft > 0) {
            seconds = timeLeft;
        }
        const endTime = firebase.firestore.Timestamp.fromDate(
            new Date(Date.now() + seconds * 1000)
        ); // Current time + 4 minutes
        const newData = {
            ...data,
            endTime,
            isPaused: false,
            seconds,
            startAt: firebase.firestore.Timestamp.fromDate(new Date(Date.now()))
        }; // Current time + 4 minutes  };
        updateData(newData);
    };
    // End Time
    const PauseTimer = () => {
        const newData = { ...data, isPaused: true, seconds: timeLeft };
        updateData(newData);
    };

    const ResetTimer = () => {
        const { currentPick } = data;
        let seconds = 0;
        if (currentPick < 32) {
            seconds = 300;
        } else {
            seconds = 120;
        }
        const endTime = firebase.firestore.Timestamp.fromDate(
            new Date(Date.now() + seconds * 1000)
        ); // Current time + 4 minutes
        const newData = {
            ...data,
            endTime,
            isPaused: true,
            seconds,
            startAt: firebase.firestore.Timestamp.fromDate(new Date(Date.now()))
        }; // Current time + 4 minutes  };
        updateData(newData);
    };

    // Options for filters
    // Hooks
    // Mobile Functionality

    // Use Effects
    useEffect(() => {
        if (currentUser && data) {
            const adminStatus = currentUser.bba_roleID === 'Admin';
            if (!warRoom && nbaTeams.length === 0) {
                GetDraftPageData(currentUser.NBATeamID);
            }
            setIsAdmin(() => adminStatus);
            if (data.endTime) {
                setEndTime(() => data.endTime.toDate());
            }
            setIsPaused(() => data.isPaused);
            setTimeLeft(() => data.seconds);
            if (data.startTime) {
                setStartTime(() => data.startAt.toDate());
            }
        }
    }, [currentUser, data, warRoom, nbaTeams]);

    // Click Functionality
    const adminSelectTeam = async (team) => {
        if (currentUser.username !== 'TuscanSota') {
            alert('Sorry, but this is something only Tuscan can do for now.');
            return;
        }
        setIsLoading(() => true);
        await GetDraftPageData(team.ID);
    };

    const selectMobileView = (event) => {
        event.preventDefault();

        const { value } = event.target;
        setMobileView(() => value);
    };

    const addPlayerToScoutingBoard = async (player) => {
        const wr = { ...warRoom };

        const dto = { PlayerID: player.ID, TeamID: wr.TeamID };

        const res = await _draftService.CreateScoutingProfile(dto);

        if (res.ok) {
            const newProfile = await res.json();
            const newProfileWithDraftee = { ...newProfile, Draftee: player };
            if (wr.ScoutProfiles && Array.isArray(wr.ScoutProfiles)) {
                wr.ScoutProfiles.push(newProfileWithDraftee);
            } else {
                wr.ScoutProfiles = [newProfileWithDraftee];
            }
            setWarRoom(() => wr);
        }
        const keyCode = `${player.FirstName}${player.LastName}${player.Position}${player.State}${player.Country}`;
        const scoutingMap = { ...scoutMap };
        scoutingMap[keyCode] = true;
        setScoutMap(() => scoutingMap);
    };

    const removePlayerFromBoard = async (profile) => {
        const wr = { ...warRoom };
        const res = await _draftService.RemovePlayerFromBoard(profile.ID);
        if (res.ok) {
            wr.ScoutProfiles = warRoom.ScoutProfiles.filter(
                (x) => x.PlayerID !== profile.PlayerID
            );
            setWarRoom(() => wr);
            const keyCode = `${profile.Draftee.FirstName}${profile.Draftee.LastName}${profile.Draftee.Position}${profile.Draftee.State}${profile.Draftee.Country}`;
            const scoutingMap = { ...scoutMap };
            scoutingMap[keyCode] = true;
            setScoutMap(() => scoutingMap);
        }
    };

    const revealAttribute = async (idx, profile, attr, points) => {
        const wr = { ...warRoom };
        const dto = {
            ScoutProfileID: profile.ID,
            Attribute: attr,
            Points: Number(points),
            TeamID: wr.TeamID
        };

        const res = await _draftService.RevealAttribute(dto);
        if (res) {
            if (attr === 'Shooting2') {
                wr.ScoutProfiles[idx].ShowShooting2 = true;
            } else if (attr === 'Shooting3') {
                wr.ScoutProfiles[idx].ShowShooting3 = true;
            } else if (attr === 'FreeThrow') {
                wr.ScoutProfiles[idx].ShowFreeThrow = true;
            } else if (attr === 'Finishing') {
                wr.ScoutProfiles[idx].ShowFinishing = true;
            } else if (attr === 'Ballwork') {
                wr.ScoutProfiles[idx].ShowBallwork = true;
            } else if (attr === 'Rebounding') {
                wr.ScoutProfiles[idx].ShowRebounding = true;
            } else if (attr === 'InteriorDefense') {
                wr.ScoutProfiles[idx].ShowInteriorDefense = true;
            } else if (attr === 'PerimeterDefense') {
                wr.ScoutProfiles[idx].ShowPerimeterDefense = true;
            } else if (attr === 'Potential') {
                wr.ScoutProfiles[idx].ShowPotential = true;
            }
            wr.ScoutProfiles[idx].ShowCount += 1;
            wr.SpentPoints = Number(wr.SpentPoints) + Number(points);
            setWarRoom(() => wr);
        } else {
            alert(
                `Alert: Could not reveal ${attr} Attribute for Player ${profile.Draftee.FirstName} ${profile.Draftee.LastName}`
            );
        }
    };

    const draftPlayer = async (player) => {
        const draftedPlayerInfo = {
            SelectedPlayerID: player.ID,
            SelectedPlayerName: `${player.FirstName} ${player.LastName}`,
            SelectedPlayerPosition: player.Position
        };
        const draftPicks = [...allDraftPicks];
        draftPicks[currentDraftPickIdx] = {
            ...draftPicks[currentDraftPickIdx],
            ...draftedPlayerInfo
        };
        // Update Player Info
        const draftablePlayers = [...allDraftablePlayers];
        const teamInfoFromDP = {
            DraftPickID: draftPicks[currentDraftPickIdx].ID,
            DraftPick: `${draftPicks[currentDraftPickIdx].DraftNumber}`,
            DraftedTeamID: draftPicks[currentDraftPickIdx].TeamID,
            DraftedTeamAbbr: draftPicks[currentDraftPickIdx].Team
        };
        const draftedPlayerIDX = draftablePlayers.findIndex(
            (x) => x.ID === player.ID
        );

        if (draftedPlayerIDX === -1) {
            alert(
                `ERROR: COULD NOT FIND ${player.ID} ${player.FirstName} ${player.LastName}`
            );
            return;
        }
        draftablePlayers[draftedPlayerIDX] = {
            ...draftablePlayers[draftedPlayerIDX],
            ...teamInfoFromDP
        };

        const theNextPick = nextPick;
        const finalPick = currentPick === allDraftPicks.length;
        const newData = {
            ...data,
            currentPick: theNextPick,
            nextPick: theNextPick + 1,
            recentlyDraftedPlayerID: player.ID,
            allDraftPicks: draftPicks,
            allDraftablePlayers: draftablePlayers,
            isPaused: true
        };
        updateData(newData);
        setTimeout(() => {
            console.log('NEXT TEAM CAN NOW DRAFT');
            const endTime = firebase.firestore.Timestamp.fromDate(
                new Date(Date.now() + seconds * 1000)
            );
            let seconds = 0;
            if (currentPick < 32) {
                seconds = 300;
            } else {
                seconds = 120;
            }
            const resetTimerData = {
                ...newData,
                endTime,
                isPaused: finalPick,
                seconds,
                startAt: firebase.firestore.Timestamp.fromDate(
                    new Date(Date.now())
                ),
                draftingTeam: nextDraftPick.Team,
                draftingTeamID: nextDraftPick.TeamID
            };
            updateData(resetTimerData);
        }, 10000);
    };

    // API Calls
    const GetDraftPageData = async (id) => {
        const res = await _draftService.GetDraftPageData(id);
        const { ScoutProfiles } = res.WarRoom;
        const scoutingMap = {};
        for (let i = 0; i < ScoutProfiles.length; i++) {
            const profile = ScoutProfiles[i];
            if (profile.Draftee) {
                const { Draftee } = profile;
                const { FirstName, LastName, Position, State, Country } =
                    Draftee;
                scoutingMap[
                    FirstName + LastName + Position + State + Country
                ] = true;
            }
        }
        // In the event we need to re-upload the draft picks
        // const { AllDraftPicks, DraftablePlayers } = res;
        // const newData = {
        //     ...data,
        //     allDraftPicks: AllDraftPicks
        //     // allDraftablePlayers: DraftablePlayers
        // };
        // updateData(newData);
        setWarRoom(() => res.WarRoom);
        if (res.WarRoom.ID === currentUser.NBATeamID) {
            setUserWarRoom(() => res.WarRoom);
        }
        if (nbaTeams.length === 0) {
            setNBATeams(() => res.NBATeams);
        }
        setScoutMap(() => scoutingMap);
        setIsLoading(() => false);
    };

    // Secondary Components
    const ChangePositions = (options) => {
        const opts = [...options.map((x) => x.value)];
        setPositions(opts);
    };

    return (
        <div className="container-fluid mt-3">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="row draft-room-header">
                        <div className="col-2 justify-content-start ms-end">
                            <h3>NBA Draft Room</h3>
                        </div>

                        {currentDraftPickIdx > -1 && (
                            <>
                                <div className="col-auto px-4">
                                    Current Pick: {currentPick}
                                </div>
                                <div className="col-auto px-4">
                                    Team Drafting:{' '}
                                    <img
                                        src={currentPickTeamLogo}
                                        height="50px"
                                        width="50px"
                                        alt="Current Team Logo"
                                    />
                                </div>
                            </>
                        )}
                        {nextDraftPickIdx > -1 && (
                            <div className="col-auto px-4">
                                Next Team:{' '}
                                <img
                                    src={nextPickTeamLogo}
                                    height="50px"
                                    width="50px"
                                    alt="Next Team Logo"
                                />
                            </div>
                        )}
                        {!currentDraftPick && !nextDraftPick && (
                            <div className="col-auto px-4">
                                Draft is Complete!
                            </div>
                        )}

                        <div className="col-auto px-4">
                            <p>Recently Drafted Player</p>
                            <p>{recentlyDraftedPlayer}</p>
                        </div>

                        <div className="col-auto">
                            Time Left: {Math.floor(timeLeft / 60)}:
                            {('0' + (timeLeft % 60)).slice(-2)}
                        </div>
                        <div className="col-auto">
                            <h6>Help</h6>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#helpModal"
                            >
                                <i
                                    className={`bi bi-info-circle ${
                                        viewMode === 'dark' ? 'text-light' : ''
                                    }`}
                                />
                            </button>
                        </div>
                        {isAdmin && (
                            <>
                                <div className="col-auto px-4">
                                    {isPaused ? (
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={StartTimer}
                                        >
                                            Start
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-outline-warning"
                                            onClick={PauseTimer}
                                        >
                                            Pause
                                        </button>
                                    )}
                                    {isPaused && (
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger ms-1"
                                            onClick={ResetTimer}
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>
                                <div className="col-auto px-4">
                                    <h6>War Room Selection</h6>
                                    <BBATeamDropdown
                                        team={userWarRoom}
                                        list={nbaTeams}
                                        currentUser={currentUser}
                                        selectTeam={adminSelectTeam}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="row mt-2">
                        <div className="draft-pick-container">
                            {allDraftPicks.map((x, idx) => {
                                const TeamLogo = getLogo(x.Team);

                                return !isMobile ? (
                                    <div
                                        className={`draft-card card mt-1 mb-2 p-1 ${
                                            x.SelectedPlayerID > 0 &&
                                            'border-success'
                                        } ${
                                            currentDraftPick &&
                                            currentDraftPick.ID === x.ID &&
                                            'border-danger'
                                        }  ${
                                            nextDraftPick &&
                                            nextDraftPick.ID === x.ID &&
                                            'border-warning'
                                        }`}
                                    >
                                        <div className="row g-0">
                                            <div className="col-1">
                                                <strong className="draft-number">
                                                    {x.DraftNumber}
                                                </strong>
                                            </div>
                                            <div className="col-3">
                                                <img
                                                    className="draft-card-icon"
                                                    src={TeamLogo}
                                                />
                                            </div>
                                            <div className="col-8">
                                                <div className="card-body">
                                                    <div className="draft-pick-text">
                                                        {x.Team}
                                                    </div>
                                                    {x.SelectedPlayerID !==
                                                        null &&
                                                        x.SelectedPlayerID >
                                                            0 && (
                                                            <small className="text-small">
                                                                {
                                                                    x.SelectedPlayerPosition
                                                                }{' '}
                                                                {
                                                                    x.SelectedPlayerName
                                                                }
                                                            </small>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className={`draft-card-mobile card mt-1 mb-1 p-1 ${
                                                x.SelectedPlayerID > 0 &&
                                                'border-success'
                                            } ${
                                                currentDraftPick &&
                                                currentDraftPick.ID === x.ID &&
                                                'border-danger'
                                            }  ${
                                                nextDraftPick &&
                                                nextDraftPick.ID === x.ID &&
                                                'border-warning'
                                            }`}
                                        >
                                            <div className="row">
                                                <div className="col-3">
                                                    <strong className="draft-number me-1">
                                                        {x.DraftNumber}
                                                    </strong>
                                                    <img
                                                        className="image-standings-logo"
                                                        src={TeamLogo}
                                                    />
                                                </div>
                                                <div className="col-9">
                                                    <div className="justify-content-start text-start">
                                                        <label className="draft-pick-text-mobile text-start">
                                                            {x.Team}
                                                            {x.SelectedPlayerID !==
                                                                null &&
                                                                x.SelectedPlayerID >
                                                                    0 && (
                                                                    <>
                                                                        {' | '}
                                                                        {
                                                                            x.SelectedPlayerPosition
                                                                        }{' '}
                                                                        {
                                                                            x.SelectedPlayerName
                                                                        }
                                                                    </>
                                                                )}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                    <NBADraftHelpModal />
                    <ScoutingModal player={modalDraftee} />
                    <div className="row mt-2 draft-war-room">
                        <div className="row">
                            <div className="col-auto text-start">
                                <h4>{warRoom.Team} War Room</h4>
                            </div>
                            <div className="col-auto">
                                <h5>Total Points: {warRoom.ScoutingPoints}</h5>
                            </div>
                            <div className="col-auto">
                                <h5>Spent Points: {warRoom.SpentPoints}</h5>
                            </div>
                            <div className="col-auto">
                                <h5>Draft Picks:</h5>
                            </div>
                            {warRoom.DraftPicks.length > 0 &&
                                warRoom.DraftPicks.map((x) => (
                                    <div className="col-1">
                                        <span>
                                            Round {x.DraftRound}, Pick{' '}
                                            {x.DraftNumber}
                                        </span>
                                    </div>
                                ))}
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-auto">
                                <h6 className="text-start align-middle">
                                    Position
                                </h6>
                                <Select
                                    options={positions}
                                    isMulti={true}
                                    className="basic-multi-select btn-dropdown-width-team z-index-6"
                                    classNamePrefix="select"
                                    onChange={ChangePositions}
                                />
                            </div>
                        </div>
                    </div>
                    {!isMobile ? (
                        <div className="row mt-2">
                            <div className="col-4 px-2 nba-draft-draftee-box">
                                <table
                                    className={`${tableHoverClass} table-responsive`}
                                >
                                    <thead
                                        style={{
                                            position: 'sticky',
                                            top: 0,
                                            backgroundColor:
                                                viewMode === 'dark'
                                                    ? '#202020'
                                                    : 'white',
                                            zIndex: 3,
                                            fontSize: '1.5vh'
                                        }}
                                    >
                                        <tr>
                                            <th scope="col">Rank</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Age</th>
                                            <th scope="col">Ht.</th>
                                            <th scope="col">College</th>
                                            <th scope="col">Region</th>
                                            <th scope="col">Ovr</th>
                                            <th scope="col">Scout</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewablePlayers.map((x, idx) => (
                                            <NBADrafteeRow
                                                player={x}
                                                ts={cbb_Timestamp}
                                                map={scoutMap}
                                                draftMap={draftMap}
                                                add={addPlayerToScoutingBoard}
                                                idx={idx}
                                                theme={viewMode}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-8 px-2 nba-draft-scout-box">
                                <table
                                    className={`${tableHoverClass} table-responsive`}
                                >
                                    <thead
                                        style={{
                                            position: 'sticky',
                                            top: 0,
                                            backgroundColor:
                                                viewMode === 'dark'
                                                    ? '#202020'
                                                    : 'white',
                                            zIndex: 3,
                                            fontSize: '1.5vh'
                                        }}
                                    >
                                        <tr>
                                            <th
                                                scope="col"
                                                onClick={() =>
                                                    ChangeSort('Name')
                                                }
                                            >
                                                Name
                                            </th>
                                            <th scope="col">Age</th>
                                            <th scope="col">Height</th>
                                            <th
                                                scope="col"
                                                onClick={() =>
                                                    ChangeSort('College')
                                                }
                                            >
                                                College
                                            </th>
                                            <th scope="col">Overall</th>
                                            <th scope="col">2pt.</th>
                                            <th scope="col">3pt.</th>
                                            <th scope="col">FT</th>
                                            <th scope="col">Finishing</th>
                                            <th scope="col">Ballwork</th>
                                            <th scope="col">Rebounding</th>
                                            <th scope="col">Int. Defense</th>
                                            <th scope="col">Per. Defense</th>
                                            <th scope="col">Pot.</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow-auto">
                                        {warRoom &&
                                            warRoom.ScoutProfiles.length > 0 &&
                                            warRoom.ScoutProfiles.map(
                                                (x, idx) => (
                                                    <NBAScoutPlayerRow
                                                        key={x.ID}
                                                        profile={x}
                                                        idx={idx}
                                                        ts={cbb_Timestamp}
                                                        viewMode={viewMode}
                                                        currentDraftPick={
                                                            currentDraftPick
                                                        }
                                                        map={draftMap}
                                                        draft={draftPlayer}
                                                        remove={
                                                            removePlayerFromBoard
                                                        }
                                                        wr={warRoom}
                                                        reveal={revealAttribute}
                                                        setDraftee={
                                                            setModalDraftee
                                                        }
                                                    />
                                                )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="row mt-2">
                                <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Basic example"
                                >
                                    <button
                                        type="button"
                                        className={`btn ${
                                            mobileView !== 'DRAFT'
                                                ? 'btn-outline-info'
                                                : 'btn-info'
                                        }`}
                                        value="DRAFT"
                                        onClick={selectMobileView}
                                    >
                                        Draft Board
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn ${
                                            mobileView !== 'SCOUT'
                                                ? 'btn-outline-info'
                                                : 'btn-info'
                                        }`}
                                        value="SCOUT"
                                        onClick={selectMobileView}
                                    >
                                        Scouting Board
                                    </button>
                                </div>
                            </div>
                            <div className="row mt-2 nba-draft-mobile-box">
                                {mobileView === 'DRAFT' ? (
                                    <>
                                        {viewablePlayers.map((x, idx) => (
                                            <NBADrafteeRow
                                                player={x}
                                                ts={cbb_Timestamp}
                                                map={scoutMap}
                                                draftMap={draftMap}
                                                add={addPlayerToScoutingBoard}
                                                idx={idx}
                                                theme={viewMode}
                                                isMobile={true}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {warRoom &&
                                            warRoom.ScoutProfiles.length > 0 &&
                                            warRoom.ScoutProfiles.map(
                                                (x, idx) => (
                                                    <NBAScoutPlayerRow
                                                        key={x.ID}
                                                        profile={x}
                                                        idx={idx}
                                                        ts={cbb_Timestamp}
                                                        viewMode={viewMode}
                                                        currentDraftPick={
                                                            currentDraftPick
                                                        }
                                                        map={draftMap}
                                                        draft={draftPlayer}
                                                        remove={
                                                            removePlayerFromBoard
                                                        }
                                                        wr={warRoom}
                                                        reveal={revealAttribute}
                                                        setDraftee={
                                                            setModalDraftee
                                                        }
                                                        isMobile={true}
                                                    />
                                                )
                                            )}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
const mapStateToProps = ({
    user: { currentUser },
    nbaTeam: { nbaTeam },
    timestamp: { cbb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    nbaTeam,
    cbb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(NBADraftPage);
