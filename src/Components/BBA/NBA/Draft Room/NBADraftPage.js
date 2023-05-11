import React, { useEffect, useState } from 'react';
import { Dropdown } from '../../../_Common/Dropdown';
import firebase from 'firebase';

const database = firebase.database();
const nbaDraftRef = database.ref('nbadraftstate');

const NBADraftPage = ({ currentUser, nbaTeam, cbb_Timestamp, viewMode }) => {
    // Services
    // Admin Values
    const [isAdmin, setIsAdmin] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [currentPick, setCurrentPick] = useState(1);
    const draftPickList = Array.from({ length: 64 }, (_, i) => i + 1);
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
        if (currentUser) {
            const adminStatus = currentUser.bba_roleID === 'Admin';
            setIsAdmin(() => adminStatus);
        }
    }, [currentUser]);

    // Click Functionality
    const adminSelectDraftPick = (name, val) => {
        if (val > 0 && val < 65) setCurrentPick(() => val);
    };

    // API Calls

    // Secondary Components

    return (
        <div className="container-fluid mt-3">
            <div className="row ps-2 mb-1">
                <div className="col-auto justify-content-start">
                    <h2>NBA Draft Room</h2>
                </div>
                <div className="col-auto ms-auto">TIMER HERE</div>
                {isAdmin && (
                    <>
                        <div className="col-auto ms-auto">
                            {isPaused ? (
                                <button
                                    type="button"
                                    className="btn btn-danger-outline"
                                >
                                    Start
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-warning-outline"
                                >
                                    Pause
                                </button>
                            )}
                        </div>
                        <div className="col-auto ms-auto">
                            <h6>Pick Selection</h6>
                            <Dropdown
                                value={currentPick}
                                list={draftPickList}
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
