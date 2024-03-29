import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import BBAMatchService from '../../../_Services/simNBA/BBAMatchService';
import BBATeamService from '../../../_Services/simNBA/BBATeamService';
import CBBGameModal from './CBBGameModal';
import CBBGameRow from './CBBGameRow';
import CBBStandingsModal from './CBBStandingsModal';
import { SeasonsList } from '../../../Constants/CommonConstants';

const CBBSchedulePage = ({ currentUser, cbbTeam, cbb_Timestamp }) => {
    // Services
    let _matchService = new BBAMatchService();
    let _teamService = new BBATeamService();

    // Hooks
    const [allCBBMatches, setAllCBBMatches] = useState([]);
    const [allNBAMatches, setAllNBAMatches] = useState([]);
    const [allISLMatches, setAllISLMatches] = useState([]);
    const [viewableMatches, setViewableMatches] = useState([]);
    const [viewMatches, setViewMatches] = useState([]);
    const [weekOptions, setWeekOptions] = useState(null);
    const [teamOptions, setTeamOptions] = useState(null);
    const [seasons, setSeasons] = useState(SeasonsList);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [leagueView, setLeagueView] = useState(''); // CBB, NBA, ISL
    const [viewType, setViewType] = useState('WEEK');
    const [viewGame, setViewGame] = useState(null);
    const [cbbTeams, setCBBTeams] = useState([]);
    const [nbaTeams, setNBATeams] = useState([]);
    const [islTeams, setISLTeams] = useState([]);
    const [showAGames, setShowAGames] = useState(true);
    const [showBGames, setShowBGames] = useState(true);
    const [showCGames, setShowCGames] = useState(true);
    const [showDGames, setShowDGames] = useState(true);

    // UseEffects
    useEffect(() => {
        if (leagueView === 'CBB' && cbb_Timestamp) {
            GetAllCBBTeams();
        } else if (leagueView === 'NBA' && cbb_Timestamp) {
            GetAllNBATeams();
        } else if (leagueView === 'ISL' && cbb_Timestamp) {
            GetAllISLTeams();
        }
    }, [leagueView, cbb_Timestamp]);

    useEffect(() => {
        if (cbb_Timestamp) {
            GetAllWeeks();
            GetAllMatches(cbb_Timestamp.SeasonID);
        }
    }, [cbb_Timestamp]);

    useEffect(() => {
        let gamesView = [];
        if (leagueView === 'CBB') {
            gamesView = [...allCBBMatches];
        } else if (leagueView === 'NBA') {
            gamesView = [...allNBAMatches];
        } else {
            gamesView = [...allISLMatches];
        }
        if (viewType === 'TEAM' && selectedTeam.length > 0) {
            gamesView = [
                ...gamesView.filter(
                    (x) =>
                        x.HomeTeam === selectedTeam ||
                        x.AwayTeam === selectedTeam
                )
            ];
        } else {
            gamesView = [...gamesView.filter((x) => x.Week === selectedWeek)];
        }

        if (!showAGames) {
            gamesView = gamesView.filter((x) => x.MatchOfWeek !== 'A');
        }

        if (!showBGames) {
            gamesView = gamesView.filter((x) => x.MatchOfWeek !== 'B');
        }

        if (!showCGames) {
            gamesView = gamesView.filter((x) => x.MatchOfWeek !== 'C');
        }

        if (!showDGames) {
            gamesView = gamesView.filter((x) => x.MatchOfWeek !== 'D');
        }

        setViewMatches(() => gamesView);
    }, [
        selectedTeam,
        selectedWeek,
        viewType,
        allCBBMatches,
        showAGames,
        showBGames
    ]);

    // API Functions
    const GetAllCBBTeams = async () => {
        let teamOptionForm;
        if (cbbTeams.length === 0) {
            const response = await _teamService.GetActiveCollegeTeams();
            teamOptionForm = [
                ...response.map((x) => {
                    return { label: x.Team, value: x.Abbr };
                })
            ];

            setTeamOptions(() => teamOptionForm);
        } else {
            teamOptionForm = [
                ...cbbTeams.map((x) => {
                    return { label: x.Team, value: x.Abbr };
                })
            ];
        }
        setTeamOptions(() => teamOptionForm);
    };

    const GetAllNBATeams = async () => {
        let teamOptionForm;
        if (nbaTeams.length === 0) {
            const response = await _teamService.GetNBATeams();
            teamOptionForm = [
                ...response.map((x) => {
                    return { label: x.Team, value: x.Abbr };
                })
            ];
        } else {
            teamOptionForm = [
                ...nbaTeams.map((x) => {
                    return { label: x.Team, value: x.Abbr };
                })
            ];
        }
        setTeamOptions(() => teamOptionForm);
    };

    const GetAllISLTeams = async () => {
        let teamOptionForm;
        if (islTeams.length === 0) {
            const response = await _teamService.GetAllISLTeams();
            teamOptionForm = [
                ...response.map((x) => {
                    return { label: x.Team, value: x.Abbr };
                })
            ];
        } else {
            teamOptionForm = [
                ...islTeams.map((x) => {
                    return { label: x.Team, value: x.Abbr };
                })
            ];
        }
        setTeamOptions(() => teamOptionForm);
    };

    const GetAllWeeks = () => {
        const weeksForm = [];
        for (let i = 1; i < 31; i++) {
            weeksForm.push({ label: i, value: i });
        }

        setWeekOptions(() => weeksForm);
        setSelectedWeek(() => cbb_Timestamp.CollegeWeek);
    };

    const GetAllMatches = async (seasonID) => {
        const response = await _matchService.GetMatchesBySeason(seasonID);
        setAllCBBMatches(() => [...response.CBBGames]);
        setAllNBAMatches(() => [...response.NBAGames]);
        setAllISLMatches(() => [...response.ISLGames]);
    };

    const ResetTeamViewOptions = () => {
        setSelectedTeam(() => cbbTeam.Abbr);
    };

    const ResetWeekViewOptions = () => {
        setSelectedWeek(() => cbb_Timestamp.CollegeWeek);
    };

    // Click Functions
    const SelectTeamView = () => {
        ResetTeamViewOptions();
        setViewType(() => 'TEAM');
    };

    const SelectLeagueView = (event) => {
        const { value } = event.target;
        setSelectedTeam(() => '');
        ResetWeekViewOptions();
        setLeagueView(() => value);
        if (value === 'CBB') {
            setShowCGames(() => false);
            setShowDGames(() => false);
        }
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
        GetAllMatches(options.value);
    };

    const SetGame = (game) => {
        setViewGame(() => game);
    };

    return (
        <div className="container-fluid">
            <div className="justify-content-start">
                <h2>SimCBB {cbb_Timestamp.Season} Schedule</h2>
                <div className="row">
                    <div className="col-md-2">
                        <h5>League</h5>
                        <div className="row mt-2 justify-content-center">
                            <div className="col-auto">
                                <div
                                    className="btn-group btn-group-lg"
                                    role="group"
                                    aria-label="ViewOptions"
                                >
                                    <button
                                        type="button"
                                        className={
                                            leagueView === 'CBB'
                                                ? 'btn btn-primary'
                                                : 'btn btn-secondary'
                                        }
                                        value="CBB"
                                        onClick={SelectLeagueView}
                                    >
                                        CBB
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            leagueView === 'NBA'
                                                ? 'btn btn-primary'
                                                : 'btn btn-secondary'
                                        }
                                        value="NBA"
                                        onClick={SelectLeagueView}
                                    >
                                        NBA
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            leagueView === 'ISL'
                                                ? 'btn btn-primary'
                                                : 'btn btn-secondary'
                                        }
                                        value="ISL"
                                        onClick={SelectLeagueView}
                                    >
                                        ISL
                                    </button>
                                </div>
                            </div>
                        </div>
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
                        <div className="row mt-2 justify-content-center">
                            <div className="col-md-auto">
                                <div
                                    className="btn-group btn-group-lg"
                                    role="group"
                                    aria-label="ViewOptions"
                                >
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${
                                            showAGames
                                                ? 'btn-primary'
                                                : 'btn-danger'
                                        }`}
                                        onClick={() =>
                                            setShowAGames(() => !showAGames)
                                        }
                                    >
                                        A
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${
                                            showBGames
                                                ? 'btn-primary'
                                                : 'btn-danger'
                                        }`}
                                        onClick={() =>
                                            setShowBGames(() => !showBGames)
                                        }
                                    >
                                        B
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${
                                            showCGames
                                                ? 'btn-primary'
                                                : 'btn-danger'
                                        }`}
                                        onClick={() =>
                                            setShowCGames(() => !showCGames)
                                        }
                                        disabled={leagueView === 'CBB'}
                                    >
                                        C
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${
                                            showDGames
                                                ? 'btn-primary'
                                                : 'btn-danger'
                                        }`}
                                        onClick={() =>
                                            setShowDGames(() => !showDGames)
                                        }
                                        disabled={leagueView === 'CBB'}
                                    >
                                        D
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
                    <CBBGameModal game={viewGame} />
                    <CBBStandingsModal ts={cbb_Timestamp} />
                    <div className="col-md-10 px-md-4">
                        <div className="row mt-3 mb-5 justify-content-between">
                            {viewMatches &&
                                viewMatches.length > 0 &&
                                viewMatches.map((x, idx) => (
                                    <>
                                        <CBBGameRow
                                            idx={idx}
                                            key={x.ID}
                                            game={x}
                                            ts={cbb_Timestamp}
                                            SetGame={SetGame}
                                        />
                                    </>
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
    cbbTeam: { cbbTeam },
    timestamp: { cbb_Timestamp }
}) => ({
    currentUser,
    cbbTeam,
    cbb_Timestamp
});

export default connect(mapStateToProps)(CBBSchedulePage);
