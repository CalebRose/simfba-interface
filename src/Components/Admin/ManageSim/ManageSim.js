import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import constants from '../../../Constants/acronyms';
import { setCFBTimestamp } from '../../../Redux/timestamp/timestamp.actions';
import AdminService from '../../../_Services/simFBA/AdminService';
import FBARecruitingService from '../../../_Services/simFBA/FBARecruitingService';
import ConfirmRecruitSyncModal from './ConfirmRecruitSyncModal';
import ConfirmRESSyncModal from './ConfirmRESModal';
import ConfirmWeekSyncModal from './ConfirmWeekSyncModal';
import CreateCrootModal from './CreateCrootModal';

const ManageSim = ({ currentUser, cfb_Timestamp }) => {
    const dispatch = useDispatch();
    const [timestamp, setTimestamp] = React.useState(cfb_Timestamp);
    const [SyncComplete, setCompletion] = React.useState(false);
    const [ActionsRemaining, setRemainingActionsCount] = React.useState(3);
    const [timeslots, setTimeSlots] = React.useState({
        Thursday: false,
        Friday: false,
        SaturdayMorning: false,
        SaturdayEvening: false,
        SaturdayNight: false
    });
    const [NFLtimeslots, setNFLTimeslots] = React.useState({
        NFLThursday: false,
        NFLSundayNoon: false,
        NFLSundayAfternoon: false,
        NFLSundayEvening: false,
        NFLMondayEvening: false
    });
    let _recruitingService = new FBARecruitingService();
    let _adminService = new AdminService();

    useEffect(() => {
        console.log('Timestamp Syncing!');
        ValidateSyncToNextWeek();
    }, [timestamp]);

    const ValidateSyncToNextWeek = () => {
        let valid = true;
        const ts = { ...timestamp };
        if (!ts.RecruitingEfficiencySynced || !ts.RecruitingSynced)
            valid = false;
        setCompletion(valid);
    };

    const SyncRES = async () => {
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

        if (!res) {
            alert('RES Could not be Synced!');
        } else {
            const newTs = { ...res };
            setTimestamp(() => newTs);
            dispatch(setCFBTimestamp(newTs));
        }
    };

    const SyncRecruiting = async () => {
        const ts = { ...timestamp };

        if (!ts.RecruitingEfficiencySynced && !ts.IsRecruitingLocked) {
            alert(
                'You must sync Recruiting Efficiency first and lock recruiting before conducting the Recruiting sync.'
            );
            return;
        }

        ts.RecruitingSynced = true;
        ts.IsRecruitingLocked = false;
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
            GMActionsCompleted: false,
            IsRecruitingLocked: false
        };

        let res = await _adminService.SyncTimestamp(UpdateTimestampDTO);

        if (!res) {
            alert('Could not complete recruiting sync!');
        } else {
            const newTs = { ...res };
            setTimestamp((x) => newTs);
            dispatch(setCFBTimestamp(newTs));
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

    const LockRecruiting = async () => {
        const UpdateTimestampDTO = {
            MoveUpCollegeWeek: false,
            MoveUpCollegeSeason: false,
            MoveUpNFLWeek: false,
            MoveUpNFLSeason: false,
            ThursdayGames: timeslots.Thursday,
            FridayGames: timeslots.Friday,
            SaturdayMorning: timeslots.SaturdayMorning,
            SaturdayEvening: timeslots.SaturdayEvening,
            SaturdayNight: timeslots.SaturdayNight,
            NFLThursday: NFLtimeslots.NFLThursday,
            NFLSundayNoon: NFLtimeslots.NFLSundayNoon,
            NFLSundayAfternoon: NFLtimeslots.NFLSundayAfternoon,
            NFLSundayEvening: NFLtimeslots.NFLSundayEvening,
            NFLMondayEvening: NFLtimeslots.NFLMondayEvening,
            // ThursdayGames: false,
            // FridayGames: false,
            // SaturdayMorning: false,
            // SaturdayNoon: false,
            // SaturdayEvening: false,
            // SaturdayNight: false,
            RESSynced: false,
            RecruitingSynced: false,
            ToggleRecruitingLock: true,
            GMActionsCompleted: false
        };

        let res = await _adminService.SyncTimestamp(UpdateTimestampDTO);

        if (!res) {
            alert('Could not lock recruiting!');
        } else {
            const newTs = { ...res };
            setTimestamp((x) => newTs);
            dispatch(setCFBTimestamp(newTs));
        }
    };

    const handleTimeslotChange = async (timeslot) => {
        const ts = { ...timestamp };
        switch (timeslot) {
            case 'Thursday':
                ts.ThursdayGames = !ts.ThursdayGames;
                break;
            case 'Friday':
                ts.FridayGames = !ts.FridayGames;
                break;
            case 'Saturday Morning':
                ts.SaturdayMorning = !ts.SaturdayMorning;
                break;
            case 'Saturday Noon':
                ts.SaturdayNoon = !ts.SaturdayNoon;
                break;
            case 'Saturday Evening':
                ts.SaturdayEvening = !ts.SaturdayEvening;
                break;
            case 'Saturday Night':
                ts.SaturdayNight = !ts.SaturdayNight;
                break;
            default:
                break;
        }
    };

    const handleNFLTimeslotChange = async (NFLtimeslots) => {
        const ts = { ...timestamp };
        switch (NFLtimeslots) {
            case 'NFL Thursday':
                ts.NFLThursday = !ts.NFLThursday;
                break;
            case 'NFL Sunday Noon':
                ts.NFLSundayNoon = !ts.NFLSundayNoon;
                break;
            case 'NFL Sunday Afternoon':
                ts.NFLSundayAfternoon = !ts.NFLSundayAfternoon;
                break;
            case 'NFL Monday Evening':
                ts.NFLMondayEvening = !ts.NFLMondayEvening;
                break;
            default:
                break;
        }
    };

    const SyncOffseasonFreeAgency = async () => {
        const ts = { ...timestamp };

        ts.FreeAgencyRound++;

        let res = await _adminService.SyncOffseasonFreeAgency();

        if (!res) {
            alert('Could not sync free agency!');
        } else {
            setTimestamp(() => ts);
            dispatch(setCFBTimestamp(ts));
        }
    };

    const SyncToNextWeek = async () => {
        if (
            !timestamp.RecruitingEfficiencySynced &&
            !timestamp.IsRecruitingLocked
        ) {
            alert(
                'You must sync Recruiting Efficiency first and lock recruiting before conducting the Recruiting sync.'
            );
            return;
        }

        const UpdateTimestampDTO = {
            MoveUpCollegeWeek: true,
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
            RecruitingSynced: false,
            GMActionsCompleted: false,
            IsRecruitingLocked: false
        };

        let res = await _adminService.SyncTimestamp(UpdateTimestampDTO);

        if (!res) {
            alert('Could not sync to next week!');
        } else {
            const newTs = { ...res };
            setTimestamp(() => newTs);
            dispatch(setCFBTimestamp(newTs));
        }
    };

    const runTheGames = () => {};

    const AdminUI = () => {
        return (
            <div className="container">
                <div className="row mt-2 justify-content-center">
                    <h2 className="">Manage Football Sim</h2>
                </div>
                <div className="row mt-4">
                    <div className="col col-md-3">
                        <h3>Season: {timestamp.Season}</h3>
                    </div>
                    <div className="col col-md-3">
                        <h3>CFB Week: {timestamp.CollegeWeek}</h3>
                    </div>
                    <div className="col col-md-3">
                        <h3>NFL Week: {timestamp.NFLWeek}</h3>
                    </div>
                    <div className="col col-md-3">
                        <h3>Free Agency Round: {timestamp.FreeAgencyRound}</h3>
                    </div>
                </div>
                <ConfirmRecruitSyncModal save={SyncRecruiting} />
                <ConfirmRESSyncModal save={SyncRES} />
                <ConfirmWeekSyncModal save={SyncToNextWeek} />
                <CreateCrootModal handleChange={SaveRecruit} />
                <div className="row mt-2 mb-2 g-2">
                    <div className="col-3 col-md-3 mb-2 g-4">
                        <h5>Recruiting Efficiency</h5>
                        {!timestamp.RecruitingEfficiencySynced ? (
                            <button
                                type="button"
                                className="btn btn-primary btn-sm-button rounded-pill"
                                data-bs-toggle="modal"
                                data-bs-target="#syncRESModal"
                            >
                                Sync
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm-button rounded-pill"
                            >
                                Sync
                            </button>
                        )}
                    </div>
                    <div className="col-3 mb-2 g-3">
                        <h5>Lock Recruiting</h5>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm-button rounded-pill"
                            onClick={LockRecruiting}
                        >
                            {timestamp.IsRecruitingLocked ? 'Lock' : 'Unlock'}
                        </button>
                    </div>
                    <div className="col-3 mb-2 g-3">
                        <h5>Sync Recruiting</h5>
                        {!timestamp.RecruitingSynced ? (
                            <button
                                type="button"
                                className={
                                    'btn btn-primary btn-sm-button rounded-pill'
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#syncRecruitModal"
                            >
                                Sync
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={
                                    'btn btn-secondary btn-sm-button rounded-pill'
                                }
                            >
                                Sync
                            </button>
                        )}
                    </div>
                    {/* <div className="col-3 mb-2">
                        <h5>Sync Free Agency</h5>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={SyncOffseasonFreeAgency}
                        >
                            Sync
                        </button>
                    </div> */}
                    <div className="col-3 mb-2 g-3">
                        <h5>Create a Croot</h5>
                        <button
                            type="button"
                            className={
                                !SyncComplete
                                    ? 'btn btn-primary btn-sm-button rounded-pill'
                                    : 'btn btn-secondary btn-sm-button rounded-pill'
                            }
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                        >
                            Create
                        </button>
                    </div>
                    <div className="col-3 mb-2 g-3">
                        <h5>Run Games</h5>
                        <button
                            type="button"
                            className={
                                !SyncComplete
                                    ? 'btn btn-primary btn-sm-button rounded-pill'
                                    : 'btn btn-secondary btn-sm-button rounded-pill'
                            }
                            onClick={() => runTheGames()}
                        >
                            Run
                        </button>
                    </div>
                    <div className="col-3 mb-2 pe-0">
                        <div
                            className="d-flex align-items-center justify-content-start"
                            style={{ marginLeft: '-500px', marginTop: '-90px' }}
                        >
                            <div
                                className="btn-group-vertical btn-group-lg"
                                role="group"
                                aria-label="TimeslotOptions"
                            >
                                <h5 className="me-3 ms-5"> Sync Week</h5>
                                {SyncComplete ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm-button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#syncWeekModal"
                                    >
                                        Sync
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm-button mt-2 rounded-pill"
                                    >
                                        Sync
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                >
                                    Thursday
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                >
                                    Friday
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                >
                                    Saturday Morning
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                >
                                    Saturday Noon
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                >
                                    Saturday Evening
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                >
                                    Saturday Night
                                </button>
                            </div>
                        </div>
                    </div>
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

const mapStateToProps = ({
    user: { currentUser },
    timestamp: { cfb_Timestamp }
}) => ({
    currentUser,
    cfb_Timestamp
});

export default connect(mapStateToProps)(ManageSim);
