import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setCBBTimestamp } from '../../../../Redux/timestamp/timestamp.actions';
import BBAAdminService from '../../../../_Services/simNBA/BBAAdminService';
import BBARecruitingService from '../../../../_Services/simNBA/BBARecruitingService';
import BBACreateCrootModal from './BBACreateCrootModal';

const BBAManageSim = ({ currentUser, cbbTeam, cbb_Timestamp }) => {
    let _adminService = new BBAAdminService();
    let _recruitingService = new BBARecruitingService();
    const dispatch = useDispatch();
    const [timestamp, setTimestamp] = React.useState(null);
    const [SyncComplete, setCompletion] = React.useState(false);
    const [ActionsRemaining, setRemainingActionsCount] = React.useState(3);

    useEffect(() => {
        if (cbb_Timestamp) {
            setTimestamp(() => cbb_Timestamp);
        }
    }, [cbb_Timestamp]);

    const IsWeekComplete = () => {
        if (timestamp && timestamp.IsOffSeason) {
            return timestamp.RecruitingSynced && timestamp.GMActionsComplete;
        } else {
            return (
                timestamp.GamesARan &&
                timestamp.GamesBRan &&
                timestamp.GamesCRan &&
                timestamp.GamesDRan &&
                timestamp.RecruitingSynced &&
                timestamp.GMActionsComplete
            );
        }
    };

    const SyncResults = async (event) => {
        const { value } = event.target;
        const timeslot = value;
        const ts = { ...timestamp };
        switch (timeslot) {
            case 'A':
                ts.ShowAGames = !ts.ShowAGames;
                break;
            case 'B':
                ts.ShowBGames = !ts.ShowBGames;
                break;
            case 'C':
                ts.ShowCGames = !ts.ShowCGames;
                break;
            case 'D':
                ts.ShowDGames = !ts.ShowDGames;
                break;
            default:
                break;
        }
        dispatch(setCBBTimestamp(ts));
        const res = await _adminService.ShowGames(value);
        if (res) {
            alert(`${timeslot} Sync Complete`);
        }
    };

    const syncRecruiting = async () => {
        if (timestamp.RecruitingSynced) {
            return;
        }
        const newTimestamp = { ...timestamp };
        const response = await _adminService.SyncRecruiting();
        if (response) {
            newTimestamp.RecruitingSynced = true;
            // API Call to Sync A Games
            setTimestamp({ ...newTimestamp });
            dispatch(setCBBTimestamp({ ...timestamp, ...newTimestamp }));
            setCompletion(() => IsWeekComplete());
        }
    };

    const syncAIBoards = async () => {
        const ts = { ...timestamp };

        const response = await _adminService.SyncAIBoards();

        if (response) {
            ts.AIPointAllocationComplete = !ts.AIPointAllocationComplete;
            setTimestamp(() => ts);
            dispatch(setCBBTimestamp({ ...timestamp }));
        }
    };

    const lockRecruiting = async () => {
        const ts = { ...timestamp };

        const response = await _adminService.LockRecruiting();

        if (response) {
            ts.IsRecruitingLocked = !ts.IsRecruitingLocked;
            setTimestamp(() => ts);
            dispatch(setCBBTimestamp({ ...timestamp }));
        }
    };

    const SyncManagementActions = async () => {
        const newTimestamp = { ...timestamp };

        if (newTimestamp.IsNBAOffseason) {
            newTimestamp.FreeAgencyRound = newTimestamp.FreeAgencyRound + 1;
        } else {
            newTimestamp.GMActionsComplete = true;
        }

        const res = await _adminService.SyncFreeAgency();
        if (!res) {
            alert('Could not sync free agency!');
        } else {
            setTimestamp({ ...newTimestamp });
            dispatch(setCBBTimestamp(newTimestamp));
            setCompletion(IsWeekComplete());
        }
    };

    const ChangeDraftTime = async () => {
        const newTimestamp = { ...timestamp };
        newTimestamp.IsDraftTime = !newTimestamp.IsDraftTime;

        const res = await _adminService.ChangeDraftTime();
        if (!res) {
            alert('Could not change draft time!');
        } else {
            setTimestamp({ ...newTimestamp });
            dispatch(setCBBTimestamp(newTimestamp));
            setCompletion(IsWeekComplete());
        }
    };

    const syncToNextWeek = () => {
        let response = _adminService.SyncWeek();
        const newTimestamp = { ...timestamp };
        // API Call to Sync to Next week and receive new timestamp
        // Test data for now
        if (response) {
            newTimestamp.NBAWeekId++;
            newTimestamp.CollegeWeekId++;
            newTimestamp.NBAWeek++;
            newTimestamp.CollegeWeek++;
            newTimestamp.GamesARan = false;
            newTimestamp.GamesBRan = false;
            newTimestamp.RecruitingSynced = false;
            newTimestamp.GMActionsComplete = false;
            setTimestamp({ ...timestamp, ...newTimestamp });
            dispatch(setCBBTimestamp({ ...timestamp, ...newTimestamp }));
        }
    };

    const SaveRecruit = async (croot) => {
        const RecruitDTO = { ...croot };

        // Set Service Message?
        const save = await _recruitingService.CreateRecruit(RecruitDTO);

        if (save.ok) {
            // Set Service Message?
        } else {
            alert('HTTP-Error:', save.status);
        }
    };

    return (
        <div className="container">
            {timestamp && (
                <>
                    <div className="row mt-3">
                        <div className="col">
                            <h2>Manage Basketball Sim</h2>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col  col-md-3">
                            <h3>Season: {timestamp.Season}</h3>
                        </div>
                        <div className="col col-md-3">
                            <h3>Week: {timestamp.CollegeWeek}</h3>
                        </div>
                        <div className="col col-md-3">
                            <h3>FA Round: {timestamp.FreeAgencyRound}</h3>
                        </div>
                        <div className="col col-md-3">
                            <h3>
                                {SyncComplete
                                    ? 'All Actions Completed'
                                    : ActionsRemaining + ' Actions Remaining'}
                            </h3>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-3 mb-2 g-2 justify-content-center text-center">
                            <div className="d-flex align-items-center justify-content-center">
                                <div
                                    className="btn-group-vertical btn-group-lg justify-content-center align-items-center"
                                    role="group"
                                    aria-label="TimeslotOptions"
                                >
                                    <h5>Sync Results</h5>
                                    <button
                                        type="button"
                                        className={
                                            SyncComplete
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                        disabled={!SyncComplete}
                                        onClick={syncToNextWeek}
                                    >
                                        Week
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.IsOffSeason
                                                ? 'btn btn-secondary btn-sm'
                                                : 'btn btn-primary btn-sm'
                                        }
                                        // disabled={timestamp.GamesARan}
                                        disabled
                                        value="A"
                                        onClick={SyncResults}
                                    >
                                        A Games
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.IsOffSeason
                                                ? 'btn btn-secondary btn-sm'
                                                : 'btn btn-primary btn-sm'
                                        }
                                        // disabled={timestamp.GamesBRan}
                                        disabled
                                        value="B"
                                        onClick={SyncResults}
                                    >
                                        B Games
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.IsOffSeason
                                                ? 'btn btn-secondary btn-sm'
                                                : 'btn btn-primary btn-sm'
                                        }
                                        // disabled={timestamp.GamesCRan}
                                        disabled
                                        value="C"
                                        onClick={SyncResults}
                                    >
                                        C Games
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.IsOffSeason
                                                ? 'btn btn-secondary btn-sm'
                                                : 'btn btn-primary btn-sm'
                                        }
                                        // disabled={timestamp.GamesDRan}
                                        disabled
                                        value="D"
                                        onClick={SyncResults}
                                    >
                                        D Games
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 mb-2 g-2 justify-content-center text-center">
                            <div className="d-flex align-items-center justify-content-center">
                                <div
                                    className="btn-group-vertical btn-group-lg justify-content-center align-items-center"
                                    role="group"
                                    aria-label="College Options"
                                >
                                    <h5>Recruiting</h5>
                                    <button
                                        type="button"
                                        className={
                                            !timestamp.IsRecruitingLocked
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                        onClick={lockRecruiting}
                                    >
                                        {!timestamp.IsRecruitingLocked
                                            ? 'Lock Recruiting'
                                            : 'Unlock Recruiting'}
                                    </button>
                                    <button
                                        type="button"
                                        className={'btn btn-primary btn-sm'}
                                        onClick={syncRecruiting}
                                        // disabled={
                                        //     timestamp.AIPointAllocationComplete ||
                                        //     timestamp.AIBoardsCreated
                                        // }
                                        disabled
                                    >
                                        Sync AI Boards
                                    </button>
                                    <button
                                        type="button"
                                        className={'btn btn-primary btn-sm'}
                                        onClick={syncRecruiting}
                                        // disabled={timestamp.AIBoardsCreated}
                                        disabled
                                    >
                                        Fill AI Boards
                                    </button>
                                    <button
                                        type="button"
                                        className={'btn btn-primary btn-sm'}
                                        onClick={syncRecruiting}
                                        // disabled={
                                        //     timestamp.RecruitingSynced ||
                                        //     !timestamp.AIPointAllocationComplete
                                        // }
                                        disabled
                                    >
                                        Sync Recruits
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 mb-2 g-2 justify-content-center text-center">
                            <div className="d-flex align-items-center justify-content-center">
                                <div
                                    className="btn-group-vertical btn-group-lg justify-content-center align-items-center"
                                    role="group"
                                    aria-label="Professional Options"
                                >
                                    <h5>NBA Management</h5>
                                    <button
                                        type="button"
                                        className={'btn btn-primary btn-sm'}
                                        onClick={SyncManagementActions}
                                        disabled={timestamp.GMActionsComplete}
                                    >
                                        Run Free Agency
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            !timestamp.IsDraftTime
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                        onClick={ChangeDraftTime}
                                    >
                                        {!timestamp.IsDraftTime
                                            ? 'Activate Draft'
                                            : 'Deactivate Draft'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#cbbCreateCrootModal"
                            disabled={!timestamp.IsOffSeason}
                        >
                            <h5>Create Character</h5>
                        </button>
                        <h6>Note: Only available in off-season</h6>
                    </div>
                    <BBACreateCrootModal handleChange={SaveRecruit} />
                </>
            )}
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    cbbTeam: { cbbTeam },
    timestamp: { cbb_Timestamp }
}) => ({
    currentUser,
    cbbTeam,
    cbb_Timestamp
});

export default connect(mapStateToProps)(BBAManageSim);
