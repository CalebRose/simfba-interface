import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const BBAManageSim = ({ currentUser }) => {
    const [timestamp, setTimestamp] = React.useState([]);
    const [SyncComplete, setCompletion] = React.useState(false);
    const [ActionsRemaining, setRemainingActionsCount] = React.useState(3);

    useEffect(() => {
        const testTimestamp = {
            Id: 1,
            SeasonId: 1,
            Season: 2022,
            CollegeWeekId: 1,
            CollegeWeek: 1,
            NBAWeekId: 1,
            NBAWeek: 1,
            GamesARan: false,
            GamesBRan: false,
            GamesCRan: false,
            RecruitingSynced: false,
            GMActionsComplete: false,
            IsOffSeason: true
        };

        let count = testTimestamp.IsOffSeason ? 2 : 5;
        setRemainingActionsCount(count);
        setTimestamp(testTimestamp);
    }, []);

    const IsWeekComplete = () => {
        if (timestamp.IsOffSeason) {
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

    const DeductActionsRemaining = () => {
        let count = ActionsRemaining - 1;
        setRemainingActionsCount(count);
    };

    const syncAGames = () => {
        if (timestamp.IsOffSeason) {
            return;
        }
        const newTimestamp = timestamp;
        newTimestamp.GamesARan = true;
        // API Call to Sync A Games
        setTimestamp({ ...timestamp, ...newTimestamp });
        DeductActionsRemaining();
    };
    const syncBGames = () => {
        if (timestamp.IsOffSeason || !timestamp.GamesARan) {
            return;
        }
        const newTimestamp = timestamp;
        newTimestamp.GamesBRan = true;
        // API Call to Sync A Games
        setTimestamp({ ...timestamp, ...newTimestamp });
        DeductActionsRemaining();
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
        DeductActionsRemaining();
    };

    const syncRecruiting = () => {
        if (timestamp.RecruitingSynced) {
            return;
        }
        const newTimestamp = timestamp;
        newTimestamp.RecruitingSynced = true;
        // API Call to Sync A Games
        setTimestamp({ ...timestamp, ...newTimestamp });
        setCompletion(IsWeekComplete());
        DeductActionsRemaining();
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
        DeductActionsRemaining();
    };

    const syncToNextWeek = () => {
        console.log(timestamp);
        if (!timestamp.GMActionsComplete) {
            return;
        }
        const newTimestamp = timestamp;
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
        console.log(newTimestamp);
        setTimestamp({ ...timestamp, ...newTimestamp });
        console.log(timestamp);
        setCompletion(IsWeekComplete());
        setRemainingActionsCount(newTimestamp.IsOffSeason ? 2 : 5);
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
                    <h3>Season: {timestamp.Season ? timestamp.Season : ''}</h3>
                </div>
                <div className="col col-md-4">
                    <h3>
                        Week:{' '}
                        {timestamp.CollegeWeek ? timestamp.CollegeWeek : ''}
                    </h3>
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
                                        timestamp.IsOffSeason ||
                                        timestamp.GamesARan
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
                                    {timestamp.GamesARan
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
                                    {timestamp.GamesBRan
                                        ? 'Synced'
                                        : 'Incomplete'}
                                </h5>
                            </td>
                        </tr>
                        <tr>
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
                        </tr>
                        <tr>
                            <th scope="row">
                                <h4>Recruiting Actions</h4>
                            </th>
                            <td>
                                <button
                                    type="button"
                                    className={
                                        !timestamp.RecruitingSynced
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
                                    {timestamp.RecruitingSynced
                                        ? 'Synced'
                                        : 'Incomplete'}
                                </h5>
                            </td>
                        </tr>
                        <tr>
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
                        </tr>
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
                <h5>Create Character</h5>
                <h6>Note: Only available in off-season</h6>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(BBAManageSim);
