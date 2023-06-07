import React, { useEffect, useMemo, useState } from 'react';
import { DraftDropdown, Dropdown } from '../../../_Common/Dropdown';
import firebase from 'firebase';
import { useFirestore } from '../../../../Firebase/firebase';
import BBADraftService from '../../../../_Services/simNBA/BBADraftService';
import { connect } from 'react-redux';
import { getLogo } from '../../../../Constants/getLogo';
import { Spinner } from '../../../_Common/Spinner';

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
    const [warRoom, setWarRoom] = useState(null);
    const [nbaTeams, setNBATeams] = useState([]);
    const [draftPickList, setDraftPickList] = useState([]);
    const {
        allDraftPicks,
        allDraftablePlayers,
        currentPick,
        nextPick,
        recentlyDraftedPlayerID
    } = data;
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
    // End Time

    // Options for filters
    // Hooks
    // Mobile Functionality

    // Use Effects
    useEffect(() => {
        if (currentUser && data) {
            const adminStatus = currentUser.bba_roleID === 'Admin';
            GetDraftPageData();
            setIsAdmin(() => adminStatus);
        }
    }, [currentUser, data]);

    // Click Functionality
    const adminSelectDraftPick = (name, val) => {
        console.log({ val });
        if (val > 0 && val < 65) console.log('PING!');
        // Create updatedData object, setting the next draft pick to the value
        // updateData into firestore
    };

    // API Calls
    const GetDraftPageData = async () => {
        const res = await _draftService.GetDraftPageData(currentUser.NBATeamID);

        setWarRoom(() => res.WarRoom);
        setNBATeams(() => res.NBATeams);
        setIsLoading(() => false);
    };

    // Secondary Components

    return (
        <div className="container-fluid mt-3">
            <div className="d-flex flex-row draft-room-header">
                <div className=" d-flex justify-content-start flex-grow-1">
                    <h2>NBA Draft Room</h2>
                </div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="px-4">Current Pick: {currentPick}</div>
                        <div className="px-4">
                            Team Drafting:{' '}
                            <img
                                src={currentPickTeamLogo}
                                height="50px"
                                width="50px"
                                alt="Current Team Logo"
                            />
                        </div>
                        <div className="px-4">
                            Next Team:{' '}
                            <img
                                src={nextPickTeamLogo}
                                height="50px"
                                width="50px"
                                alt="Next Team Logo"
                            />
                        </div>
                        <div className="px-4">
                            Recently Drafted Player: {recentlyDraftedPlayer}
                        </div>
                    </>
                )}

                <div className="">TIMER HERE</div>
                {isAdmin && !isLoading && (
                    <>
                        <div className="px-4">
                            {isPaused ? (
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                >
                                    Start
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-outline-warning"
                                >
                                    Pause
                                </button>
                            )}
                        </div>
                        <div className="px-4">
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
