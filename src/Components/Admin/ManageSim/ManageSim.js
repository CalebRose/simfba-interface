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
    const [SyncComplete, setCompletion] = React.useState(false);
    const [ActionsRemaining, setRemainingActionsCount] = React.useState(13);
    const [timeslots, setTimeSlots] = React.useState({
        Thursday: false,
        Friday: false,
        SaturdayMorning: false,
        SaturdayEvening: false,
        SaturdayNight: false,
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
    }, [cfb_Timestamp]);

    const ValidateSyncToNextWeek = () => {
        let valid = true;
        const ts = { ...cfb_Timestamp };
        let actionCount = 13;
        if (ts.RecruitingSynced) actionCount -= 1;
        if (ts.GMActionsCompleted) actionCount -= 1;
        if (ts.ThursdayGames) actionCount -= 1;
        if (ts.NFLThursday) actionCount -= 1;
        if (ts.FridayGames) actionCount -= 1;
        if (ts.SaturdayMorning) actionCount -= 1;
        if (ts.SaturdayNoon) actionCount -= 1;
        if (ts.SaturdayEvening) actionCount -= 1;
        if (ts.SaturdayNight) actionCount -= 1;
        if (ts.NFLSundayNoon) actionCount -= 1;
        if (ts.NFLSundayAfternoon) actionCount -= 1;
        if (ts.NFLSundayEvening) actionCount -= 1;
        if (ts.NFLMondayEvening) actionCount -= 1;
        if (actionCount > 0) valid = false;
        setRemainingActionsCount(() => actionCount);
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
            dispatch(setCFBTimestamp(newTs));
        }
    };

    const SyncRecruiting = async () => {
        const ts = { ...cfb_Timestamp };

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
            NFLThursday: timeslots.NFLThursday,
            NFLSundayNoon: timeslots.NFLSundayNoon,
            NFLSundayAfternoon: timeslots.NFLSundayAfternoon,
            NFLSundayEvening: timeslots.NFLSundayEvening,
            NFLMondayEvening: timeslots.NFLMondayEvening,
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
            dispatch(setCFBTimestamp(newTs));
        }
    };

    const handleTimeslotChange = async (event) => {
        const { value } = event.target;
        const timeslot = value;
        const ts = { ...cfb_Timestamp };
        switch (timeslot) {
            case 'Thursday Night':
                ts.ThursdayGames = !ts.ThursdayGames;
                break;
            case 'Friday Night':
                ts.FridayGames = !ts.FridayGames;
                break;
            case 'Saturday Morning':
                ts.SaturdayMorning = !ts.SaturdayMorning;
                break;
            case 'Saturday Afternoon':
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
        dispatch(setCFBTimestamp(ts));
        const res = await _adminService.SyncTimeslot(timeslot);
        if (res) {
            alert(`${timeslot} Sync Complete`);
        }
    };

    const handleNFLTimeslotChange = async (event) => {
        event.preventDefault();
        const { value } = event.target;
        const NFLtimeslots = value;
        const ts = { ...cfb_Timestamp };
        switch (NFLtimeslots) {
            case 'Thursday Night Football':
                ts.NFLThursday = !ts.NFLThursday;
                break;
            case 'Sunday Noon':
                ts.NFLSundayNoon = !ts.NFLSundayNoon;
                break;
            case 'Sunday Afternoon':
                ts.NFLSundayAfternoon = !ts.NFLSundayAfternoon;
                break;
            case 'Sunday Night Football':
                ts.NFLSundayEvening = !ts.NFLSundayEvening;
                break;
            case 'Monday Night Football':
                ts.NFLMondayEvening = !ts.NFLMondayEvening;
                break;
            default:
                break;
        }
        const res = await _adminService.SyncTimeslot(NFLtimeslots);
        if (res) {
            dispatch(setCFBTimestamp(ts));
        }
    };

    const SyncOffseasonFreeAgency = async () => {
        const ts = { ...cfb_Timestamp };

        if (ts.IsNFLOffseason) {
            ts.FreeAgencyRound++;
        }

        let res = await _adminService.SyncOffseasonFreeAgency();

        if (!res) {
            alert('Could not sync free agency!');
        } else {
            ts.GMActionsCompleted = true;
            dispatch(setCFBTimestamp(ts));
        }
    };

    const SyncToNextWeek = async () => {
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

        let res = await _adminService.SyncWeek();

        if (!res) {
            alert('Could not sync to next week!');
        } else {
            const newTs = { ...res };
            dispatch(setCFBTimestamp(newTs));
        }
    };

    const runTheGames = async () => {
        const res = await _adminService.RunTheGames();
        if (res) {
            const ts = { ...cfb_Timestamp };
            ts.RunGames = true;
            dispatch(setCFBTimestamp(ts));
        }
    };

    const AdminUI = () => {
        return (
            <div className="container">
                <div className="row mt-2 justify-content-center">
                    <h2 className="">Manage Football Sim</h2>
                </div>
                <div className="row mt-4">
                    <div className="col col-md-3">
                        <h3>Season: {cfb_Timestamp.Season}</h3>
                    </div>
                    <div className="col col-md-3">
                        <h3>CFB Week: {cfb_Timestamp.CollegeWeek}</h3>
                    </div>
                    <div className="col col-md-3">
                        <h3>NFL Week: {cfb_Timestamp.NFLWeek}</h3>
                    </div>
                    <div className="col col-md-3">
                        <h3>
                            {cfb_Timestamp.IsNFLOffseason
                                ? `Free Agency Round: ${cfb_Timestamp.FreeAgencyRound}`
                                : `Actions Left: ${ActionsRemaining}`}
                        </h3>
                    </div>
                </div>
                <ConfirmRecruitSyncModal save={SyncRecruiting} />
                <ConfirmRESSyncModal save={SyncRES} />
                <ConfirmWeekSyncModal save={SyncToNextWeek} />
                <CreateCrootModal handleChange={SaveRecruit} />
                <div className="row mt-2 mb-2 g-2">
                    <div className="col-3 mb-2 g-2 justify-content-center  text-center">
                        <div className="d-flex align-items-center justify-content-center">
                            <div
                                className="btn-group-vertical btn-group-lg justify-content-center align-items-center"
                                role="group"
                                aria-label="TimeslotOptions"
                            >
                                <h5 className=""> Sync Week</h5>
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
                                    disabled={cfb_Timestamp.ThursdayGames}
                                    value="Thursday Night"
                                    onClick={handleTimeslotChange}
                                >
                                    Thursday
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                    disabled={cfb_Timestamp.FridayGames}
                                    value="Friday Night"
                                    onClick={handleTimeslotChange}
                                >
                                    Friday
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                    disabled={cfb_Timestamp.SaturdayMorning}
                                    value="Saturday Morning"
                                    onClick={handleTimeslotChange}
                                >
                                    Saturday Morning
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                    disabled={cfb_Timestamp.SaturdayNoon}
                                    value="Saturday Afternoon"
                                    onClick={handleTimeslotChange}
                                >
                                    Saturday Noon
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                    disabled={cfb_Timestamp.SaturdayEvening}
                                    value="Saturday Evening"
                                    onClick={handleTimeslotChange}
                                >
                                    Saturday Evening
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                    disabled={cfb_Timestamp.SaturdayNight}
                                    value="Saturday Night"
                                    onClick={handleTimeslotChange}
                                >
                                    Saturday Night
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 mb-2 g-2 justify-content-center">
                        <div className="d-flex align-items-center justify-content-center">
                            <div
                                className="btn-group-vertical btn-group-lg justify-content-center align-items-center"
                                role="group"
                                aria-label="TimeslotOptions"
                            >
                                <h5 className=""> Sync NFL</h5>

                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                    disabled={cfb_Timestamp.NFLThursday}
                                    value="Thursday Night Football"
                                    onClick={handleNFLTimeslotChange}
                                >
                                    Thursday Night
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                    disabled={cfb_Timestamp.NFLSundayNoon}
                                    value="Sunday Noon"
                                    onClick={handleNFLTimeslotChange}
                                >
                                    Sunday Noon
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                    disabled={cfb_Timestamp.NFLSundayAfternoon}
                                    value="Sunday Afternoon"
                                    onClick={handleNFLTimeslotChange}
                                >
                                    Sunday Afternoon
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                    disabled={cfb_Timestamp.NFLSundayEvening}
                                    value="Sunday Night Football"
                                    onClick={handleNFLTimeslotChange}
                                >
                                    Sunday Night
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-4 rounded-pill"
                                    disabled={cfb_Timestamp.NFLMondayEvening}
                                    value="Monday Night Football"
                                    onClick={handleNFLTimeslotChange}
                                >
                                    Monday Night
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-3 col-md-3 mb-2 g-4">
                        <h5>Recruiting Efficiency</h5>
                        {!cfb_Timestamp.RecruitingEfficiencySynced ? (
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
                    </div> */}
                    <div className="col-3 mb-2 g-2">
                        <h5>Lock Recruiting</h5>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm-button rounded-pill  mb-2"
                            onClick={LockRecruiting}
                        >
                            {cfb_Timestamp.IsRecruitingLocked
                                ? 'Unlock'
                                : 'Lock'}
                        </button>

                        <h5>Sync Recruiting</h5>
                        {!cfb_Timestamp.RecruitingSynced ? (
                            <button
                                type="button"
                                className={
                                    'btn btn-primary btn-sm-button rounded-pill mb-2'
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
                                    'btn btn-secondary btn-sm-button rounded-pill  mb-2'
                                }
                            >
                                Sync Complete
                            </button>
                        )}

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
                    <div className="col-3 mb-2 g-2">
                        <h5>Sync Free Agency</h5>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm-button rounded-pill mb-2"
                            onClick={SyncOffseasonFreeAgency}
                        >
                            Sync
                        </button>

                        <h5>Run Games</h5>
                        <button
                            type="button"
                            className={
                                !SyncComplete
                                    ? 'btn btn-primary btn-sm-button rounded-pill'
                                    : 'btn btn-secondary btn-sm-button rounded-pill'
                            }
                            disabled={cfb_Timestamp.RunGames}
                            onClick={runTheGames}
                        >
                            Run
                        </button>
                    </div>
                    <div className="col-3 mb-2"></div>
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
