import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import acronyms from '../../Constants/acronyms';
import FBALandingPageService from '../../_Services/simFBA/FBALandingPageService';
import FBAScheduleService from '../../_Services/simFBA/FBAScheduleService';
import FBATeamService from '../../_Services/simFBA/FBATeamService';
import GameRow from './CFBGameRow';
import CFBStandingsModal from './CFBStandingsModal';

const SchedulePage = ({ cfbTeam, cfb_Timestamp, viewMode, currentUser }) => {
    // Services
    let _scheduleService = new FBAScheduleService();
    let _landingService = new FBALandingPageService();
    let _teamService = new FBATeamService();

    // Hooks
    const [weekOptions, setWeekOptions] = useState(null);
    const [teamOptions, setTeamOptions] = useState(null);
    const [allGames, setAllGames] = useState([]);
    const [viewGames, setViewGames] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [viewType, setViewType] = useState('TEAM');
    const isAdmin = currentUser && currentUser.roleID === acronyms.ADMIN;

    // Use Effects
    useEffect(() => {
        if (cfbTeam && cfb_Timestamp) {
            GetAllTeams();
            GetAllWeeks();
            GetAllGames();
        }
    }, [cfbTeam, cfb_Timestamp]);

    useEffect(() => {
        let gamesView = [];
        if (viewType === 'TEAM') {
            gamesView = [
                ...allGames.filter(
                    (x) =>
                        x.HomeTeam === selectedTeam ||
                        x.AwayTeam === selectedTeam
                )
            ];
        } else {
            gamesView = [...allGames.filter((x) => x.Week === selectedWeek)];
        }

        setViewGames(() => gamesView);
    }, [selectedTeam, selectedWeek, viewType, allGames]);

    // API Functions
    const GetAllTeams = async () => {
        const response = await _teamService.GetAllCollegeTeams();

        const teamOptionForm = [
            ...response.map((x) => {
                return { label: x.TeamName, value: x.TeamAbbr };
            })
        ];
        setTeamOptions(() => teamOptionForm);
        setSelectedTeam(() => cfbTeam.TeamAbbr);
    };

    const GetAllWeeks = async () => {
        const response = await _landingService.GetWeeksInSeason(
            cfb_Timestamp.CollegeSeasonID,
            cfb_Timestamp.CollegeWeekID
        );

        const weekOptionsForm = [
            ...response.map((x) => {
                return { label: x.Week, value: x.Week };
            })
        ];

        weekOptionsForm.unshift({ label: 0, value: 0 });

        setWeekOptions(() => weekOptionsForm);
    };

    const GetAllGames = async () => {
        const response = await _scheduleService.GetAllCollegeGamesInASeason(
            cfb_Timestamp.CollegeSeasonID
        );

        setAllGames(() => [...response]);
    };

    // Non-API Functions
    const ResetTeamViewOptions = () => {
        setSelectedTeam(() => cfbTeam.TeamAbbr);
    };
    const ResetWeekViewOptions = () => {
        setSelectedWeek(() => cfb_Timestamp.CollegeWeek);
    };

    // Click Functions

    const SelectTeamView = () => {
        ResetTeamViewOptions();
        setViewType(() => 'TEAM');
    };

    const SelectWeekView = () => {
        ResetWeekViewOptions();
        setViewType(() => 'WEEK');
    };

    const ChangeTeam = (options) => {
        const opts = options.value;
        setSelectedTeam(() => opts);
    };

    const ChangeWeek = (options) => {
        const opts = options.value;
        setSelectedWeek(() => opts);
    };

    // Return
    return (
        <div className="container-fluid">
            <div className="justify-content-start">
                <h2>SimFBA {cfb_Timestamp.Season} Schedule</h2>
                <div className="row">
                    <div className="col-md-2">
                        <h5>Schedule Filters</h5>
                        <div className="row mt-2 justify-content-center">
                            <div className="col-md-auto">
                                <div
                                    className="btn-group btn-group-lg"
                                    role="group"
                                    aria-label="ViewOptions"
                                >
                                    <button
                                        type="button"
                                        className={
                                            viewType === 'TEAM'
                                                ? 'btn btn-primary'
                                                : 'btn btn-secondary'
                                        }
                                        onClick={SelectTeamView}
                                    >
                                        By Team
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            viewType === 'WEEK'
                                                ? 'btn btn-primary'
                                                : 'btn btn-secondary'
                                        }
                                        onClick={SelectWeekView}
                                    >
                                        By Week
                                    </button>
                                </div>
                            </div>
                        </div>
                        {viewType === 'TEAM' ? (
                            <div className="row mt-2 mb-2">
                                <h6>Teams</h6>
                                <Select
                                    options={teamOptions}
                                    isMulti={false}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={ChangeTeam}
                                />
                            </div>
                        ) : (
                            <div className="row">
                                <h6>Week</h6>
                                <Select
                                    options={weekOptions}
                                    isMulti={false}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={ChangeWeek}
                                />
                            </div>
                        )}
                        <div className="row mt-2 justify-content-center">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#standingsModal"
                            >
                                Standings
                            </button>
                        </div>
                    </div>
                    <CFBStandingsModal ts={cfb_Timestamp} viewMode={viewMode} />
                    <div className="col-md-10 px-md-4">
                        <div className="row mt-3 mb-5 justify-content-between">
                            {viewGames.length > 0
                                ? viewGames.map((x, idx) => (
                                      <GameRow
                                          idx={idx}
                                          key={x.ID}
                                          game={x}
                                          currentWeek={
                                              cfb_Timestamp.CollegeWeek
                                          }
                                          viewMode={viewMode}
                                          isAdmin={isAdmin}
                                      />
                                  ))
                                : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    cfbTeam: { cfbTeam },
    timestamp: { cfb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    cfbTeam,
    cfb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(SchedulePage);
