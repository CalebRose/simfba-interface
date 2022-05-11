import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import constants from '../../../Constants/acronyms';
import { setCFBTimestamp } from '../../../Redux/timestamp/timestamp.actions';
import AdminService from '../../../_Services/simFBA/AdminService';
import FBARecruitingService from '../../../_Services/simFBA/FBARecruitingService';
import ConfirmRecruitSyncModal from './ConfirmRecruitSyncModal';
import ConfirmRESSyncModal from './ConfirmRESModal';
import CreateCrootModal from './CreateCrootModal';

const ManageSim = ({ currentUser, cfb_Timestamp }) => {
    const dispatch = useDispatch();
    const [timestamp, setTimestamp] = React.useState(cfb_Timestamp);
    const [SyncComplete, setCompletion] = React.useState(false);
    const [ActionsRemaining, setRemainingActionsCount] = React.useState(3);
    let _recruitingService = new FBARecruitingService();
    let _adminService = new AdminService();

    useEffect(() => {
        console.log('Timestamp Syncing!');
    }, [timestamp]);

    const SyncAction = () => {};
    const SyncRES = async () => {
        const ts = { ...timestamp };

        ts.RecruitingEfficiencySynced = true;

        const UpdateTimestampDTO = {
            MoveUpCollegeWeek: false,
            MoveUpCollegeSeason: false,
            MoveUpNFLWeek: false,
            MoveUpNFLSeason: false,
            ThursdayGames: false,
            FridayGames: false,
            SaturdayMorning: false,
            SaturdayNoon: false,
            SaturdayEvening: false,
            SaturdayNight: false,
            RESSynced: true,
            RecruitingSynced: false,
            GMActionsCompleted: false
        };

        let res = await _adminService.SyncTimestamp(UpdateTimestampDTO);

        if (!res.ok) {
            alert('RES Could not be Synced!');
        } else {
            setTimestamp((x) => ts);
            dispatch(setCFBTimestamp(ts));
        }
    };

    const SyncRecruiting = async () => {
        const ts = { ...timestamp };

        if (!ts.RecruitingEfficiencySynced) {
            alert(
                'You must sync Recruiting Efficiency first before conducting the Recruiting sync.'
            );
            return;
        }

        ts.RecruitingSynced = true;

        const UpdateTimestampDTO = {
            MoveUpCollegeWeek: false,
            MoveUpCollegeSeason: false,
            MoveUpNFLWeek: false,
            MoveUpNFLSeason: false,
            ThursdayGames: false,
            FridayGames: false,
            SaturdayMorning: false,
            SaturdayNoon: false,
            SaturdayEvening: false,
            SaturdayNight: false,
            RESSynced: false,
            RecruitingSynced: true,
            GMActionsCompleted: false
        };

        let res = await _adminService.SyncTimestamp(UpdateTimestampDTO);

        if (!res.ok) {
            alert('RES Could not be Synced!');
        } else {
            setTimestamp((x) => ts);
            dispatch(setCFBTimestamp(ts));
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
                <ConfirmRecruitSyncModal save={SyncRecruiting} />
                <ConfirmRESSyncModal save={SyncRES} />
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
                            {/* <tr>
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
                            </tr> */}
                            <tr>
                                <th scope="row">
                                    <h5>Recruiting Efficiency Sync</h5>
                                </th>
                                <td>
                                    {!timestamp.RecruitingEfficiencySynced ? (
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#syncRESModal"
                                        >
                                            Sync
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                        >
                                            Sync
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <h5>
                                        {timestamp.RecruitingEfficiencySynced
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
                                    {!timestamp.RecruitingSynced ? (
                                        <button
                                            type="button"
                                            className={'btn btn-primary btn-sm'}
                                            data-bs-toggle="modal"
                                            data-bs-target="#syncRecruitModal"
                                        >
                                            Sync
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className={
                                                'btn btn-secondary btn-sm'
                                            }
                                        >
                                            Sync
                                        </button>
                                    )}
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
                                            !SyncComplete
                                                ? 'btn btn-primary btn-sm'
                                                : 'btn btn-secondary btn-sm'
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                    >
                                        Create
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <CreateCrootModal handleChange={SaveRecruit} />
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

const mapStateToProps = ({
    user: { currentUser },
    timestamp: { cfb_Timestamp }
}) => ({
    currentUser,
    cfb_Timestamp
});

export default connect(mapStateToProps)(ManageSim);
