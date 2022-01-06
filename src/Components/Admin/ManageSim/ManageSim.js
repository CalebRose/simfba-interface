import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import constants from '../../../Constants/constants';

const ManageSim = ({ currentUser }) => {
    const [timestamp, setTimestamp] = React.useState([]);
    const [SyncComplete, setCompletion] = React.useState(false);
    const [ActionsRemaining, setRemainingActionsCount] = React.useState(3);

    useEffect(() => {
        const testTimestamp = {
            ID: 1,
            CollegeSeasonID: 1,
            Season: 2022,
            CollegeWeekID: 1,
            CollegeWeek: 1,
            ThursdayGames: false,
            FridayGames: false,
            SaturdayMorning: false,
            SaturdayNoon: false,
            SaturdayEvening: false,
            SaturdayNight: false,
            NFLThursday: false,
            NFLSundayNoon: false,
            NFLSundayAfternoon: false,
            NFLSundayEvening: false,
            NFLMondayEvening: false,
            NFLTradingAllowed: false,
            NFLPreseason: false,
            RecruitingSynced: false,
            GMActionsComplete: false,
            IsOffSeason: true
        };
        let count = testTimestamp.IsOffSeason ? 2 : 5;
        setRemainingActionsCount(count);
        setTimestamp(testTimestamp);
    }, []);
    const AdminUI = () => {
        return (
            <div className="container">
                <div className="row mt-3">
                    <h2 className="">Manage Football Sim</h2>
                </div>
                <div className="row mt-4">
                    <div className="col col-md-3">
                        <h3>
                            Season:{' '}
                            {timestamp && timestamp.Season
                                ? timestamp.Season
                                : 'Loading...'}
                        </h3>
                    </div>
                    <div className="col col-md-3">
                        <h3>CFB Week: </h3>
                    </div>
                    <div className="col col-md-3">
                        <h3>NFL Week: </h3>
                    </div>
                    <div className="col col-md-3">
                        <h3>Actions Remaining: </h3>
                    </div>
                </div>
                <div className="row mt-3 mb-5">
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
                                    <h5>Thursday Games</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.IsOffSeason ||
                                            timestamp.ThursdayGames
                                                ? 'btn btn-secondary btn-sm'
                                                : 'btn btn-primary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.ThursdayGames
                                            ? 'Synced'
                                            : 'Incomplete'}
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>Friday Games</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.ThursdayGames &&
                                            !timestamp.FridayGames
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.FridayGames
                                            ? 'Synced'
                                            : 'Incomplete'}
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>Saturday Morning Games</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.ThursdayGames &&
                                            timestamp.FridayGames &&
                                            !timestamp.SaturdayMorning
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.SaturdayMorning
                                            ? 'Synced'
                                            : 'Incomplete'}
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>Saturday Noon Games</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.ThursdayGames &&
                                            timestamp.FridayGames &&
                                            timestamp.SaturdayMorning &&
                                            !timestamp.SaturdayNoon
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.SaturdayNoon
                                            ? 'Synced'
                                            : 'Incomplete'}
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>Saturday Evening Games</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.ThursdayGames &&
                                            timestamp.FridayGames &&
                                            timestamp.SaturdayMorning &&
                                            timestamp.SaturdayNoon &&
                                            !timestamp.SaturdayEvening
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.SaturdayEvening
                                            ? 'Synced'
                                            : 'Incomplete'}
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>Saturday Night Games</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.ThursdayGames &&
                                            timestamp.FridayGames &&
                                            timestamp.SaturdayMorning &&
                                            timestamp.SaturdayNoon &&
                                            timestamp.SaturdayEvening &&
                                            !timestamp.SaturdayNight
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.SaturdayNight
                                            ? 'Synced'
                                            : 'Incomplete'}
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>NFL Thursday Games</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            !timestamp.NFLThursday
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.NFLThursday
                                            ? 'Synced'
                                            : 'Incomplete'}
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>NFL Sunday Noon Games</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.NFLThursday &&
                                            !timestamp.NFLSundayNoon
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.NFLSundayNoon
                                            ? 'Synced'
                                            : 'Incomplete'}
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>NFL Sunday Afternoon Games</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.NFLThursday &&
                                            timestamp.NFLSundayNoon &&
                                            !timestamp.NFLSundayAfternoon
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.NFLSundayAfternoon
                                            ? 'Synced'
                                            : 'Incomplete'}
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>NFL Sunday Evening Games</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.NFLThursday &&
                                            timestamp.NFLSundayNoon &&
                                            timestamp.NFLSundayAfternoon &&
                                            !timestamp.NFLSundayEvening
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.NFLSundayEvening
                                            ? 'Synced'
                                            : 'Incomplete'}
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>NFL Monday Night Games</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.NFLThursday &&
                                            timestamp.NFLSundayNoon &&
                                            timestamp.NFLSundayAfternoon &&
                                            timestamp.NFLSundayEvening &&
                                            !timestamp.NFLMondayEvening
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.NFLMondayEvening
                                            ? 'Synced'
                                            : 'Incomplete'}
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>Recruiting Actions</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            !timestamp.RecruitingSynced
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
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
                                    <h5>GM Actions</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            timestamp.GMActionsComplete
                                                ? 'btn btn-secondary btn-sm'
                                                : 'btn btn-primary btn-sm'
                                        }
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
                                    <h5>Sync to Next Week</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            SyncComplete
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Sync
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <h5>Create a Croot</h5>
                                </th>
                                <td>
                                    <button
                                        type="button"
                                        className={
                                            SyncComplete
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                    >
                                        Create
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const InvalidUser = () => {
        return (
            <div className="container">
                <div className="row mt-3">
                    <h2 className="">
                        Please return to Landing Page immediately.
                    </h2>
                </div>
            </div>
        );
    };

    return currentUser.roleID !== constants.ADMIN ? (
        <InvalidUser />
    ) : (
        <AdminUI />
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(ManageSim);
