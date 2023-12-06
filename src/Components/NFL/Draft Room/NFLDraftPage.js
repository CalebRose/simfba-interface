import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import firebase from 'firebase';
import { connect } from 'react-redux';
import FBADraftService from '../../../_Services/simFBA/FBADraftService';
import { useFirestore } from '../../../Firebase/firebase';
import { MapObjOptions } from '../../../_Utility/filterHelper';
import { PositionList } from '../../../Constants/CommonConstants';
import { GetTableHoverClass } from '../../../Constants/CSSClassHelper';
import {
    GetCurrentDraftPick,
    GetCurrentDraftPickIdx,
    GetPickTeamLogo,
    GetNextDraftPickIdx,
    GetNextDraftPickObj,
    GetNextPickTeamLogo,
    GetRecentlyDraftedPlayer,
    useDraftMap,
    GetViewablePlayersList
} from '../../../_Hooks/DraftHooks';
import {
    GetPauseTimer,
    GetResetTimer,
    GetStartTimer
} from '../../../_Utility/DraftHelper';

const NFLDraftPage = ({ currentUser, nflTeam, cfb_Timestamp, viewMode }) => {
    const _draftService = new FBADraftService();
    const [data, updateData] = useFirestore('nfldraftstate', '');

    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [endAt, setEndTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300);
    const [warRoom, setWarRoom] = useState(null);
    const [userWarRoom, setUserWarRoom] = useState(null);
    const [scoutMap, setScoutMap] = useState({});
    const [nflTeams, setNFLTeams] = useState([]);
    const positions = MapObjOptions(PositionList);
    const [selectedPositions, setPositions] = useState('');
    const [mobileView, setMobileView] = useState('DRAFT');
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const [modalDraftee, setModalDraftee] = useState(null);
    const tableHoverClass = GetTableHoverClass(viewMode);
    const isMobile = useMediaQuery({ query: `(max-width:851px)` });
    const {
        allDraftPicks,
        allDraftablePlayers,
        currentPick,
        nextPick,
        recentlyDraftedPlayerID,
        seconds,
        startAt,
        exportComplete,
        endTime
    } = data;

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
    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const recentlyDraftedPlayer = GetRecentlyDraftedPlayer(
        allDraftablePlayers,
        recentlyDraftedPlayerID
    );
    const draftMap = useDraftMap(allDraftPicks);
    const currentDraftPickIdx = GetCurrentDraftPickIdx(
        allDraftPicks,
        currentPick
    );
    const currentDraftPick = GetCurrentDraftPick(
        allDraftPicks,
        currentDraftPickIdx
    );
    const nextDraftPickIdx = GetNextDraftPickIdx(allDraftPicks, nextPick);
    const nextDraftPick = GetNextDraftPickObj(allDraftPicks, nextDraftPickIdx);
    const currentPickLogo = GetPickTeamLogo(
        currentDraftPick,
        currentUser.IsRetro
    );
    const nextPickLogo = GetPickTeamLogo(nextDraftPick, currentUser.IsRetro);
    const viewablePlayers = GetViewablePlayersList(
        allDraftablePlayers,
        selectedPositions
    );

    const StartTimer = GetStartTimer(
        data,
        currentPick,
        timeLeft,
        isPaused,
        updateData
    );

    const PauseTimer = GetPauseTimer(data, updateData);

    const ResetTimer = GetResetTimer(data, updateData);

    useEffect(() => {
        if (currentUser && data) {
            const adminStatus = currentUser.roleID === 'Admin';
            if (!warRoom && nflTeams.length === 0) {
                GetDraftPageData(currentUser.NFLTeamID);
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
    }, [currentUser, data, warRoom, nflTeams]);

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
            if (attr === '1') {
                wr.ScoutProfiles[idx].ShowAttribute1 = true;
            } else if (attr === '2') {
                wr.ScoutProfiles[idx].ShowAttribute2 = true;
            } else if (attr === '3') {
                wr.ScoutProfiles[idx].ShowAttribute3 = true;
            } else if (attr === '4') {
                wr.ScoutProfiles[idx].ShowAttribute4 = true;
            } else if (attr === '5') {
                wr.ScoutProfiles[idx].ShowAttribute5 = true;
            } else if (attr === '6') {
                wr.ScoutProfiles[idx].ShowAttribute6 = true;
            } else if (attr === '7') {
                wr.ScoutProfiles[idx].ShowAttribute7 = true;
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

    const exportDraftedPlayers = async () => {
        if (exportComplete) {
            return;
        }

        const draftpicks = [...allDraftPicks];
        const dto = { DraftPicks: draftpicks };

        const res = await _draftService.ExportPlayers(dto);

        if (res) {
            const newData = {
                ...data,
                exportComplete: true
            };
            updateData(newData);
        }
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
            setNFLTeams(() => res.NFLTeams);
        }
        setScoutMap(() => scoutingMap);
        setIsLoading(() => false);
    };
};

const mapStateToProps = ({
    user: { currentUser },
    nflTeam: { nflTeam },
    timestamp: { cfb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    nflTeam,
    cfb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(NFLDraftPage);
