import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setCBBTimestamp } from '../../../../Redux/timestamp/timestamp.actions';
import BBAAdminService from '../../../../_Services/simNBA/BBAAdminService';
import BBARecruitingService from '../../../../_Services/simNBA/BBARecruitingService';
import BBACreateCrootModal from './BBACreateCrootModal';
import { SwitchToggle } from '../../../_Common/SwitchToggle';
import BBARequestService from '../../../../_Services/simNBA/BBARequestService';
import BBATeamService from '../../../../_Services/simNBA/BBATeamService';
import { GPTab } from '../../../Gameplan/GameplanCommons';
import {
    ProfessionalCapsheetRow,
    ProfessionalTeamRow
} from '../../../_Common/ProfessionalTeamRow';
import { updateUserByUsername } from '../../../../Firebase/firestoreHelper';

const BBAManageSim = ({ cbb_Timestamp }) => {
    let _adminService = new BBAAdminService();
    let _recruitingService = new BBARecruitingService();
    let _requestService = new BBARequestService();
    const _teamService = new BBATeamService();
    const dispatch = useDispatch();
    const [timestamp, setTimestamp] = useState(null);
    const [nbaTeams, setNBATeams] = useState([]);
    const [view, setView] = useState('Teams');

    useEffect(() => {
        if (nbaTeams.length === 0) {
            GetNBATeams();
        }
    }, [nbaTeams]);

    useEffect(() => {
        if (cbb_Timestamp) {
            setTimestamp(() => cbb_Timestamp);
        }
    }, [cbb_Timestamp]);

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

    const ToggleRunCron = async () => {
        const ts = { ...cbb_Timestamp };

        let res = await _adminService.RunCron();

        if (!res) {
            alert('Could not toggle cron jobs!');
        } else {
            ts.RunCron = !ts.RunCron;
            dispatch(setCBBTimestamp(ts));
        }
    };

    const GetNBATeams = async () => {
        const res = await _teamService.GetAllProfessionalTeams();
        setNBATeams(() => res);
    };

    const removeUserFromTeam = async (event) => {
        event.preventDefault();
        const value = event.currentTarget.getAttribute('value');
        const name = event.currentTarget.getAttribute('name');
        const dto = {
            NBATeamID: Number(name),
            Username: value
        };
        const res = await _requestService.RevokeNBARequest(dto);
        const nt = [...nbaTeams];
        // Firebase Call
        let emptyObj = {
            username: value,
            NBARole: '',
            NBATeam: '',
            NBATeamAbbreviation: '',
            NBATeamID: 0
        };
        updateUserByUsername(value, emptyObj);

        const ntIdx = nt.findIndex((x) => x.ID === Number(name));
        if (ntIdx > -1) {
            const nbaTeam = nt[ntIdx];
            if (nbaTeam.NBAOwnerName === value) {
                nt[ntIdx].NBAOwnerName = '';
            } else if (nbaTeam.NBAGMName === value) {
                nt[ntIdx].NBAGMName = '';
            } else if (nbaTeam.NBACoachName === value) {
                nt[ntIdx].NBACoachName = '';
            } else {
                nt[ntIdx].NBAAssistantName = '';
            }
        }
        setNBATeams(() => nt);
    };

    return (
        <div className="container">
            {timestamp && (
                <>
                    <div className="row mt-3 mb-4">
                        <div className="col">
                            <h2>Manage Basketball Sim</h2>
                        </div>
                    </div>
                    <div className="row mb-5">
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
                            <SwitchToggle
                                value="Run Cron"
                                change={ToggleRunCron}
                                checkValue={timestamp.RunCron}
                            />
                        </div>
                    </div>
                    <div className="row mb-5">
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
                    <div className="row mb-5">
                        {view === 'Teams' &&
                            nbaTeams.length > 0 &&
                            nbaTeams.map((x) => {
                                return (
                                    <ProfessionalTeamRow
                                        team={x}
                                        click={removeUserFromTeam}
                                    />
                                );
                            })}
                        {view === 'Capsheet' &&
                            nbaTeams.length > 0 &&
                            nbaTeams.map((x) => {
                                return (
                                    <ProfessionalCapsheetRow
                                        team={x}
                                        ts={cbb_Timestamp}
                                    />
                                );
                            })}
                    </div>
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
