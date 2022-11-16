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
                timestamp.RecruitingSynced &&
                timestamp.GMActionsComplete
            );
        }
    };

    const syncAGames = async () => {
        if (timestamp.IsOffSeason) {
            return;
        }
        const response = await _adminService.ShowAGames();

        if (response) {
            const newTimestamp = timestamp;
            newTimestamp.GamesARan = true;
            // API Call to Sync A Games
            setTimestamp({ ...timestamp, ...newTimestamp });
            dispatch(setCBBTimestamp({ ...timestamp, ...newTimestamp }));
        }
    };
    const syncBGames = async () => {
        if (timestamp.IsOffSeason || !timestamp.GamesARan) {
            return;
        }
        const response = await _adminService.ShowBGames();

        if (response) {
            const newTimestamp = timestamp;
            newTimestamp.GamesBRan = true;
            // API Call to Sync A Games
            setTimestamp({ ...timestamp, ...newTimestamp });
            dispatch(setCBBTimestamp({ ...timestamp, ...newTimestamp }));
        }
    };

    const syncCGames = () => {
        if (
            timestamp.IsOffSeason ||
            !timestamp.GamesARan ||
            !timestamp.GamesBRan
        ) {
            return;
        }
        const newTimestamp = timestamp;
        newTimestamp.GamesCRan = true;
        // API Call to Sync A Games
        setTimestamp({ ...timestamp, ...newTimestamp });
        setCompletion(IsWeekComplete());
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

    const syncAIBoards = async () => {};

    const lockRecruiting = async () => {
        const ts = { ...timestamp };

        const response = await _adminService.LockRecruiting();

        if (response) {
            ts.IsRecruitingLocked = !ts.IsRecruitingLocked;
            setTimestamp(() => ts);
            dispatch(setCBBTimestamp({ ...timestamp, ...newTimestamp }));
        }
    };

    const syncManagementActions = () => {
        if (timestamp.GMActionsComplete) {
            return;
        }
        const newTimestamp = timestamp;
        newTimestamp.GMActionsComplete = true;
        // API Call to Sync A Games
        setTimestamp({ ...timestamp, ...newTimestamp });
        setCompletion(IsWeekComplete());
    };

    const syncToNextWeek = () => {
        if (!timestamp.GMActionsComplete) {
            return;
        }
        const newTimestamp = { ...timestamp };
        // API Call to Sync to Next week and receive new timestamp
        // Test data for now
        newTimestamp.NBAWeekId++;
        newTimestamp.CollegeWeekId++;
        newTimestamp.NBAWeek++;
        newTimestamp.CollegeWeek++;
        newTimestamp.GamesARan = false;
        newTimestamp.GamesBRan = false;
        newTimestamp.GamesCRan = false;
        newTimestamp.RecruitingSynced = false;
        newTimestamp.GMActionsComplete = false;
        setTimestamp({ ...timestamp, ...newTimestamp });
        setCompletion(IsWeekComplete());
        setRemainingActionsCount(newTimestamp.IsOffSeason ? 2 : 5);
    };

    const SaveRecruit = async (croot) => {
        const RecruitDTO = { ...croot };
        console.log({ RecruitDTO });

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
            <div className="row mt-3">
                <div className="col">
                    <h2>Manage Basketball Sim</h2>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col  col-md-4">
                    <h3>
                        Season:{' '}
                        {timestamp && timestamp.Season ? timestamp.Season : ''}
                    </h3>
                </div>
                <div className="col col-md-4">
                    <h3>Week: {timestamp && timestamp.CollegeWeek}</h3>
                </div>
                <div className="col col-md-4">
                    <h3>
                        {SyncComplete
                            ? 'All Actions Completed'
                            : ActionsRemaining + ' Actions Remaining'}
                    </h3>
                </div>
            </div>
            <div className="row mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sync Action</th>
                            <th scope="col">Execute</th>
                            <th scope="col">Action Complete?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                <h4>Week A Games</h4>
                            </th>
                            <td>
                                <button
                                    type="button"
                                    className={
                                        timestamp &&
                                        (timestamp.IsOffSeason ||
                                            timestamp.GamesARan)
                                            ? 'btn btn-secondary btn-sm'
                                            : 'btn btn-primary btn-sm'
                                    }
                                    onClick={syncAGames}
                                >
                                    Sync
                                </button>
                            </td>
                            <td>
                                <h5>
                                    {timestamp && timestamp.GamesARan
                                        ? 'Synced'
                                        : 'Incomplete'}
                                </h5>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <h4>Week B Games</h4>
                            </th>
                            <td>
                                <button
                                    type="button"
                                    className={
                                        timestamp &&
                                        timestamp.GamesARan &&
                                        !timestamp.GamesBRan
                                            ? 'btn btn-primary btn-sm'
                                            : 'btn btn-secondary btn-sm'
                                    }
                                    onClick={syncBGames}
                                >
                                    Sync
                                </button>
                            </td>
                            <td>
                                <h5>
                                    {timestamp && timestamp.GamesBRan
                                        ? 'Synced'
                                        : 'Incomplete'}
                                </h5>
                            </td>
                        </tr>
                        {/* <tr>
                            <th scope="row">
                                <h4>Week C (NBA) Games</h4>
                            </th>
                            <td>
                                <button
                                    type="button"
                                    className={
                                        timestamp.GamesARan &&
                                        timestamp.GamesBRan &&
                                        !timestamp.GamesCRan
                                            ? 'btn btn-primary btn-sm'
                                            : 'btn btn-secondary btn-sm'
                                    }
                                    onClick={syncCGames}
                                >
                                    Sync
                                </button>
                            </td>
                            <td>
                                <h5>
                                    {timestamp.GamesCRan
                                        ? 'Synced'
                                        : 'Incomplete'}
                                </h5>
                            </td>
                        </tr> */}
                        <tr>
                            <th scope="row">
                                <h4>Lock Recruiting</h4>
                            </th>
                            <td>
                                <button
                                    type="button"
                                    className={
                                        timestamp &&
                                        !timestamp.IsRecruitingLocked
                                            ? 'btn btn-primary btn-sm'
                                            : 'btn btn-secondary btn-sm'
                                    }
                                    onClick={lockRecruiting}
                                >
                                    Lock
                                </button>
                            </td>
                            <td>
                                <h5>
                                    {timestamp && timestamp.IsRecruitingLocked
                                        ? 'Locked'
                                        : 'Unlocked'}
                                </h5>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <h4>Recruiting Sync</h4>
                            </th>
                            <td>
                                <button
                                    type="button"
                                    className={
                                        timestamp && !timestamp.RecruitingSynced
                                            ? 'btn btn-primary btn-sm'
                                            : 'btn btn-secondary btn-sm'
                                    }
                                    onClick={syncRecruiting}
                                >
                                    Sync
                                </button>
                            </td>
                            <td>
                                <h5>
                                    {timestamp && timestamp.RecruitingSynced
                                        ? 'Synced'
                                        : 'Incomplete'}
                                </h5>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <h4>Sync AI Team Boards</h4>
                            </th>
                            <td>
                                <button
                                    type="button"
                                    className={
                                        timestamp &&
                                        !timestamp.AIPointAllocationComplete
                                            ? 'btn btn-primary btn-sm'
                                            : 'btn btn-secondary btn-sm'
                                    }
                                    onClick={syncAIBoards}
                                >
                                    Sync
                                </button>
                            </td>
                            <td>
                                <h5>
                                    {timestamp &&
                                    timestamp.AIPointAllocationComplete
                                        ? 'Synced'
                                        : 'Incomplete'}
                                </h5>
                            </td>
                        </tr>
                        {/* <tr>
                            <th scope="row">
                                <h4>GM Actions</h4>
                            </th>
                            <td>
                                <button
                                    type="button"
                                    className={
                                        timestamp.GMActionsComplete
                                            ? 'btn btn-secondary btn-sm'
                                            : 'btn btn-primary btn-sm'
                                    }
                                    onClick={syncManagementActions}
                                >
                                    Sync
                                </button>
                            </td>
                            <td>
                                <h5>
                                    {timestamp.GMActionsComplete
                                        ? 'Synced'
                                        : 'Incomplete'}
                                </h5>
                            </td>
                        </tr> */}
                        <tr>
                            <th scope="row">
                                <h4>Sync to Next Week</h4>
                            </th>
                            <td>
                                <button
                                    type="button"
                                    className={
                                        SyncComplete
                                            ? 'btn btn-primary btn-sm'
                                            : 'btn btn-secondary btn-sm'
                                    }
                                    onClick={syncToNextWeek}
                                >
                                    Sync
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row mt-5">
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#cbbCreateCrootModal"
                >
                    <h5>Create Character</h5>
                </button>
                <h6>Note: Only available in off-season</h6>
            </div>
            <BBACreateCrootModal handleChange={SaveRecruit} />
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
