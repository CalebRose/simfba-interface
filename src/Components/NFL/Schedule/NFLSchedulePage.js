import React, { useEffect, useState } from 'react';
import FBAScheduleService from '../../../_Services/simFBA/FBAScheduleService';
import FBATeamService from '../../../_Services/simFBA/FBATeamService';
import Select from 'react-select';
import { NFLStandings } from './NFLStandingsModal';
import GameRow from '../../Schedule/CFBGameRow';
import { connect } from 'react-redux';
import { NFLSeasonsList } from '../../../Constants/CommonConstants';
import acronyms from '../../../Constants/acronyms';

const NFLSchedulePage = ({ nflTeam, cfb_Timestamp, viewMode, currentUser }) => {
    // Services
    let _scheduleService = new FBAScheduleService();
    let _teamService = new FBATeamService();

    // Hooks
    const [weekOptions, setWeekOptions] = useState(null);
    const [teamOptions, setTeamOptions] = useState(null);
    const [seasons, setSeasons] = useState(NFLSeasonsList);
    const [allGames, setAllGames] = useState([]);
    const [viewGames, setViewGames] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [viewType, setViewType] = useState('TEAM');
    const isAdmin = currentUser && currentUser.roleID === acronyms.ADMIN;

    // Use Effects
    useEffect(() => {
        if (nflTeam && cfb_Timestamp) {
            GetAllTeams();
            GetAllWeeks();
            GetAllGames(cfb_Timestamp.NFLSeasonID);
        }
    }, [nflTeam, cfb_Timestamp]);

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
        const response = await _teamService.GetAllNFLTeams();

        const teamOptionForm = [
            ...response.map((x) => {
                return {
                    label: x.TeamName,
                    value: x.TeamName + ' ' + x.Mascot
                };
            })
        ];
        setTeamOptions(() => teamOptionForm);
        setSelectedTeam(() => nflTeam.TeamName + ' ' + nflTeam.Mascot);
    };

    const GetAllWeeks = () => {
        const nflWeeks = [...Array(25).keys()];

        const weekOptionsForm = [
            ...nflWeeks.map((x) => {
                return { label: x, value: x };
            })
        ];

        setWeekOptions(() => weekOptionsForm);
    };

    const GetAllGames = async (seasonID) => {
        const response = await _scheduleService.GetAllNFLGamesInASeason(
            seasonID
        );

        setAllGames(() => [...response]);
    };

    // Non-API Functions
    const ResetTeamViewOptions = () => {
        setSelectedTeam(() => nflTeam.TeamName + ' ' + nflTeam.Mascot);
    };
    const ResetWeekViewOptions = () => {
        setSelectedWeek(() => cfb_Timestamp.NFLWeek);
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

    const ChangeSeason = (options) => {
        const opts = { label: options.label, value: options.value };
        setSelectedSeason(() => opts);
        GetAllGames(options.value);
    };

    const ChangeTimeSlot = async (time, game) => {
        const dto = { GameID: game.ID, Timeslot: time, League: 'NFL' };
        // const res = await _scheduleService.UpdateTimeslot(dto);
        await _scheduleService.UpdateTimeslot(dto);
        const ag = [...allGames];
        const idx = ag.findIndex((x) => x.ID === game.ID);
        ag[idx] = {
            ...ag[idx],
            TimeSlot: time
            // Precip: res.Precip,
            // LowTemp: res.LowTemp,
            // HighTemp: res.HighTemp,
            // WindSpeed: res.WindSpeed,
            // WindCategory: res.WindCategory,
            // Cloud: res.Cloud
        };
        setAllGames(() => ag);
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
                            <div className="row mt-2 mb-2">
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
                        <div className="row mt-2 mb-2">
                            <h6 className="">Seasons</h6>
                            <Select
                                options={seasons}
                                isMulti={false}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={ChangeSeason}
                            />
                        </div>
                        <div className="row mt-2 justify-content-center gx-2">
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
                    <NFLStandings ts={cfb_Timestamp} viewMode={viewMode} />
                    <div className="col-md-10 px-md-4">
                        <div className="row mt-3 mb-5 justify-content-between">
                            {viewGames.length > 0 &&
                                viewGames.map((x, idx) => (
                                    <GameRow
                                        idx={idx}
                                        key={x.ID}
                                        game={x}
                                        viewMode={viewMode}
                                        isAdmin={isAdmin}
                                        change={ChangeTimeSlot}
                                        ts={cfb_Timestamp}
                                        isNFL={true}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    nflTeam: { nflTeam },
    timestamp: { cfb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    nflTeam,
    cfb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(NFLSchedulePage);
