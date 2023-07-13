import React, { useEffect, useMemo, useState } from 'react';
import { DraftDropdown, Dropdown } from '../../../_Common/Dropdown';
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
    const [scoutMap, setScoutMap] = useState({});
    const [nbaTeams, setNBATeams] = useState([]);
    const [draftPickList, setDraftPickList] = useState([]);
    const [draftablePlayers, setDraftablePlayers] = useState([]);
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
        if (allDraftablePlayers) {
            for (let i = 0; i < allDraftablePlayers.length; i++) {
                const player = allDraftablePlayers[i];
                if (player.DraftedTeamID > 0) {
                    draftMapObj[player.ID] === true;
                }
            }
        }
        return draftMapObj;
    }, [allDraftablePlayers]);
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
                GetDraftPageData();
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
    const adminSelectDraftPick = (name, val) => {
        console.log({ val });
        if (val > 0 && val < 65) console.log('PING!');
        // Create updatedData object, setting the next draft pick to the value
        // updateData into firestore
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

        console.log({ dto });
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

    const draftPlayer = async (player) => {};

    // API Calls
    const GetDraftPageData = async () => {
        const res = await _draftService.GetDraftPageData(currentUser.NBATeamID);
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
        setWarRoom(() => res.WarRoom);
        setNBATeams(() => res.NBATeams);
        setScoutMap(() => scoutingMap);
        setIsLoading(() => false);
    };

    // Secondary Components

    return (
        <div className="container-fluid mt-3">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="row draft-room-header">
                        <div className="col-2 justify-content-start ms-end">
                            <h2>NBA Draft Room</h2>
                        </div>

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
                        <div className="col-auto px-4">
                            Next Team:{' '}
                            <img
                                src={nextPickTeamLogo}
                                height="50px"
                                width="50px"
                                alt="Next Team Logo"
                            />
                        </div>
                        <div className="col-auto px-4">
                            Recently Drafted Player: {recentlyDraftedPlayer}
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
                                    <h6>Pick Selection</h6>
                                    <DraftDropdown
                                        value={`${currentPick} | ${currentDraftPick.Team}`}
                                        list={data.allDraftPicks}
                                        name="DraftPick"
                                        click={adminSelectDraftPick}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="row mt-2">
                        <div className="draft-pick-container">
                            Draft Picks Here
                        </div>
                    </div>
                    <NBADraftHelpModal />
                    <ScoutingModal player={modalDraftee} />
                    <div className="row mt-2 draft-war-room">
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
                        <div className="col-4 px-2 nba-draft-draftee-box">
                            <table className={tableHoverClass}>
                                <thead
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor:
                                            viewMode === 'dark'
                                                ? '#202020'
                                                : 'white',
                                        zIndex: 3
                                    }}
                                >
                                    <tr>
                                        <th scope="col">Rank</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Age</th>
                                        <th scope="col">Height</th>
                                        <th scope="col">College</th>
                                        <th scope="col">State/Region</th>
                                        <th scope="col">Ovr</th>
                                        <th scope="col">Scout</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allDraftablePlayers.map((x, idx) => (
                                        <NBADrafteeRow
                                            player={x}
                                            ts={cbb_Timestamp}
                                            map={scoutMap}
                                            add={addPlayerToScoutingBoard}
                                            idx={idx}
                                            theme={viewMode}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-8 px-2 nba-draft-scout-box">
                            <table className={tableHoverClass}>
                                <thead
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        backgroundColor:
                                            viewMode === 'dark'
                                                ? '#202020'
                                                : 'white',
                                        zIndex: 3
                                    }}
                                >
                                    <tr>
                                        <th
                                            scope="col"
                                            onClick={() => ChangeSort('Name')}
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
                                        warRoom.ScoutProfiles.map((x, idx) => (
                                            <NBAScoutPlayerRow
                                                key={x.ID}
                                                profile={x}
                                                idx={idx}
                                                timestamp={cbb_Timestamp}
                                                viewMode={viewMode}
                                                currentDraftPick={
                                                    currentDraftPick
                                                }
                                                map={draftMap}
                                                draft={draftPlayer}
                                                remove={removePlayerFromBoard}
                                                wr={warRoom}
                                                reveal={revealAttribute}
                                                setDraftee={setModalDraftee}
                                            />
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
