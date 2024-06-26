import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import constants from '../../../Constants/acronyms';
import { setCFBTimestamp } from '../../../Redux/timestamp/timestamp.actions';
import AdminService from '../../../_Services/simFBA/AdminService';
import FBARecruitingService from '../../../_Services/simFBA/FBARecruitingService';
import CreateCrootModal from './CreateCrootModal';
import {
    DefensiveSchemeOptions,
    OffensiveSchemeOptions
} from '../../Gameplan/GameplanConstants';
import { GPTab, SchemeDropdown } from '../../Gameplan/GameplanCommons';
import { SwitchToggle } from '../../_Common/SwitchToggle';
import FBATeamService from '../../../_Services/simFBA/FBATeamService';
import {
    ProfessionalCapsheetRow,
    ProfessionalTeamRow
} from '../../_Common/ProfessionalTeamRow';
import FBARequestService from '../../../_Services/simFBA/FBARequestService';
import firebase from 'firebase';

const ManageSim = ({ currentUser, cfb_Timestamp }) => {
    const dispatch = useDispatch();
    const [SyncComplete] = useState(false);
    const [offensiveScheme, setOffensiveScheme] = useState('');
    const [defensiveScheme, setDefensiveScheme] = useState('');
    const [view, setView] = useState('Teams');
    const [nflTeams, setNFLTeams] = useState([]);
    let _recruitingService = new FBARecruitingService();
    let _adminService = new AdminService();
    const _requestService = new FBARequestService();
    const _teamService = new FBATeamService();

    useEffect(() => {
        if (nflTeams.length === 0) {
            GetNFLTeams();
        }
    }, [nflTeams]);

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

    const HandleTextChange = (name, value) => {
        if (name === 'OffensiveScheme') {
            setOffensiveScheme(() => value);
        } else if (name === 'DefensiveScheme') {
            setDefensiveScheme(() => value);
        }
    };

    const UpdateAIDepthCharts = async () => {
        const ts = { ...cfb_Timestamp };

        let res = await _adminService.MassUpdateAIDepthCharts(
            offensiveScheme,
            defensiveScheme
        );

        if (!res) {
            alert('Could not sync AI Recruiting Boards!');
        } else {
            ts.AIDepthchartsSync = true;
            dispatch(setCFBTimestamp(ts));
        }
    };

    const ToggleRunCron = async () => {
        const ts = { ...cfb_Timestamp };

        let res = await _adminService.RunCron();

        if (!res) {
            alert('Could not toggle cron jobs!');
        } else {
            ts.RunCron = !ts.RunCron;
            dispatch(setCFBTimestamp(ts));
        }
    };

    const GetNFLTeams = async () => {
        const res = await _teamService.GetAllNFLTeams();
        setNFLTeams(() => res);
    };

    const removeUserFromTeam = async (event) => {
        event.preventDefault();
        const value = event.currentTarget.getAttribute('value');
        const name = event.currentTarget.getAttribute('name');
        const dto = {
            NFLTeamID: Number(name),
            Username: value
        };
        const res = await _requestService.RemoveUserFromNFLTeamRequest(
            name,
            dto
        );

        // Firebase Call
        const firestore = firebase.firestore();

        let userRef = await firestore
            .collection('users')
            .where('username', '==', value)
            .get();

        userRef.forEach(async (doc) => {
            let emptyObj = {
                username: payload.username,
                NFLRole: '',
                NFLTeam: '',
                NFLTeamAbbreviation: '',
                NFLTeamID: 0
            };
            await doc.ref.update(emptyObj);
        });

        const nt = [...nflTeams];
        const ntIdx = nt.findIndex((x) => x.ID === name);
        if (ntIdx > -1) {
            const nflTeam = nt[ntIdx];
            if (nflTeam.NFLOwnerName === value) {
                nt[ntIdx].NFLOwnerName = '';
            } else if (nflTeam.NFLGMName === value) {
                nt[ntIdx].NFLGMName = '';
            } else if (nflTeam.NFLCoachName === value) {
                nt[ntIdx].NFLCoachName = '';
            } else {
                nt[ntIdx].NFLAssistantName = '';
            }
        }
        setNFLTeams(() => nt);
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
                        <SwitchToggle
                            value="Run Cron"
                            change={ToggleRunCron}
                            checkValue={cfb_Timestamp.RunCron}
                        />
                    </div>
                </div>
                <CreateCrootModal handleChange={SaveRecruit} />
                <div className="row mt-2 mb-2 g-2">
                    <div className="col-4 mb-2 g-2 justify-content-center  text-center">
                        <div className="d-flex align-items-center justify-content-center">
                            <div
                                className="btn-group-vertical btn-group-lg justify-content-center align-items-center"
                                role="group"
                                aria-label="TimeslotOptions"
                            >
                                <h5 className="mt-1">Create a Croot</h5>
                                <button
                                    type="button"
                                    className={
                                        !SyncComplete
                                            ? 'btn btn-primary btn-sm-button rounded-pill'
                                            : 'btn btn-secondary btn-sm-button rounded-pill'
                                    }
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    disabled={!cfb_Timestamp.IsOffseason}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 mb-2 g-2 justify-content-center">
                        <h5 className="">Select CFB AI Depthcharts</h5>
                        <SchemeDropdown
                            scheme={offensiveScheme}
                            name="OffensiveScheme"
                            options={OffensiveSchemeOptions}
                            HandleTextChange={HandleTextChange}
                        />
                        <SchemeDropdown
                            scheme={defensiveScheme}
                            name="DefensiveScheme"
                            options={DefensiveSchemeOptions}
                            HandleTextChange={HandleTextChange}
                        />
                    </div>

                    <div className="col-4 mb-2 g-2">
                        <h5 className="">Update CFB AI Depthcharts</h5>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm-button rounded-pill  mb-2"
                            onClick={UpdateAIDepthCharts}
                            disabled={
                                offensiveScheme.length === 0 ||
                                defensiveScheme.length === 0
                            }
                        >
                            Update
                        </button>
                    </div>
                </div>
                <div className="row mb-1">
                    <ul className="nav nav-tabs">
                        <GPTab
                            activeView={view}
                            setActiveView={setView}
                            gameplanType="Teams"
                        />
                        <GPTab
                            activeView={view}
                            setActiveView={setView}
                            gameplanType="Capsheet"
                        />
                    </ul>
                </div>
                <div className="mb-5">
                    {view === 'Teams' &&
                        nflTeams.length > 0 &&
                        nflTeams.map((x) => {
                            return (
                                <ProfessionalTeamRow
                                    team={x}
                                    isNFL
                                    click={removeUserFromTeam}
                                />
                            );
                        })}
                    {view === 'Capsheet' &&
                        nflTeams.length > 0 &&
                        nflTeams.map((x) => {
                            return (
                                <ProfessionalCapsheetRow
                                    team={x}
                                    isNFL
                                    ts={cfb_Timestamp}
                                />
                            );
                        })}
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
