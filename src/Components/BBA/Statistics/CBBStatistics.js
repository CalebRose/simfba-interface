import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Select from 'react-select';
import { GetTableHoverClass } from '../../../Constants/CSSClassHelper';
import BBAStatsService from '../../../_Services/simNBA/BBAStatsService';
import {
    MapCBBTeamOptions,
    MapConferenceOptions
} from '../../../_Utility/filterHelper';
import {
    ConductSort,
    GetDefaultStatsOrder,
    uniq_fast
} from '../../../_Utility/utilHelper';
import { CBBDefenseHeader } from './CBBDefenseHeader';
import { CBBDifferentialHeader } from './CBBDifferentialHeader';
import { CBBOffenseHeader } from './CBBOffenseHeader';
import { CBBOverallHeader } from './CBBOverallHeader';
import { CBBPerGameHeader } from './CBBPerGameHeader';
import CBBPlayerStatRow from './CBBPlayerStatRow';
import CBBTeamStatRow from './CBBTeamStatRow';
import { StatsPageButton } from '../../_Common/Buttons';
import { SeasonsList } from '../../../Constants/CommonConstants';

const CBBStatsPage = ({ currentUser, viewMode, cbb_Timestamp }) => {
    // Services
    let _statsService = new BBAStatsService();

    // Hooks
    const [leagueView, setLeagueView] = useState('cbb');
    const [viewType, setViewType] = useState('SEASON');
    const [currentView, setCurrentView] = useState('PLAYER');
    const [weekOptions, setWeekOptions] = useState(() => {
        const weeks = [...Array(21).keys()];

        const weekOptionsForm = [
            ...weeks.map((x) => {
                return { label: x, value: x };
            })
        ];
        return weekOptionsForm;
    });
    const [seasons, setSeasons] = useState(SeasonsList);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [selectedConferences, setSelectedConferences] = useState('');
    const [selectedDivisions, setSelectedDivisions] = useState('');
    const [selectedLeague, setSelectedLeague] = useState('');
    const [selectedTeams, setSelectedTeams] = useState('');
    const [statType, setStatType] = useState('PerGame'); // Offense, Defense, Differential
    const [teamOptions, setTeamOptions] = useState([]);
    const [leagueOptions, setLeagueOptions] = useState([]);
    const [conferenceOptions, setConferenceOptions] = useState([]);
    const [divisionOptions, setDivisionOptions] = useState([]);
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [filteredView, setFilteredView] = useState([]);
    const [viewableStats, setViewableStats] = useState([]);
    const [count, setCount] = useState(100);
    const [sort, setSort] = React.useState('PPG');
    const [isAsc, setIsAsc] = React.useState(false);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const tableHoverClass = GetTableHoverClass(viewMode);
    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const isMobile = useMediaQuery({ query: `(max-width:844px)` });

    useEffect(() => {
        if (currentUser) {
            // Get Stats page info
            // GetStatsPageInfo();
        }
    }, [currentUser]);

    useEffect(() => {
        console.log({ teams });
        if (players.length > 0 || teams.length > 0) {
            const dataSet =
                currentView === 'PLAYER' ? [...players] : [...teams];
            const fc = FilterStatsData(dataSet);
            if (fc.length > 0) {
                const filteredDataSort = ConductSort(
                    [...fc],
                    sort,
                    isAsc,
                    viewType
                );
                console.log({ fc, filteredDataSort, viewType });
                setFilteredView(() => [...filteredDataSort]);
                if (currentView === 'PLAYER') {
                    setViewableStats(() => [
                        ...filteredDataSort.slice(0, count)
                    ]);
                } else {
                    setViewableStats(() => [...filteredDataSort]);
                }
            }
        }
    }, [
        players,
        teams,
        currentView,
        selectedConferences,
        selectedTeams,
        sort,
        isAsc
    ]);

    // Functions
    const FilterStatsData = (dataSet, viewType) => {
        // Player VS Team View
        if (dataSet.length > 0) {
            if (currentView === 'TEAM') {
                if (selectedConferences.length > 0) {
                    dataSet = dataSet.filter((x) =>
                        selectedConferences.includes(x.ConferenceID)
                    );
                }
            }

            if (currentView === 'PLAYER') {
                let teamList = [];

                if (selectedConferences.length > 0) {
                    const teamSet = [...teams].filter((x) =>
                        selectedConferences.includes(x.ConferenceID)
                    );
                    teamList = teamList.concat([...teamSet]);
                    teamList = teamList.map((x) => x.ID);
                }

                if (selectedTeams.length > 0) {
                    teamList = teamList.concat([...selectedTeams]);
                    teamList = uniq_fast(teamList);
                }
                // filter out duplicates
                if (teamList.length > 0) {
                    dataSet = dataSet.filter((x) =>
                        teamList.includes(x.TeamID)
                    );
                }

                switch (statType) {
                    case 'Overall':
                    case 'PerGame':
                        dataSet =
                            viewType === 'SEASON'
                                ? dataSet.filter(
                                      (x) => x.SeasonStats.Minutes > 0
                                  )
                                : dataSet.filter((x) => x.Stats.Minutes > 0);
                        break;

                    default:
                        break;
                }
            }
        }

        return dataSet;
    };

    const GetStatsPageInfo = async () => {
        const seasonID = Number(selectedSeason.value);
        let week = selectedWeek ? Number(selectedWeek.value) : 1;
        if (viewType === 'WEEK') {
            let startingWeekID = 0;
            if (seasonID === 1 || seasonID === 2) {
                // Nothing
            } else if (seasonID === 3) {
                startingWeekID = 20;
            } else {
                // startingWeekID = 40;
            }
            week += startingWeekID;
        }
        const res = await _statsService.GetStatsPageData(
            leagueView,
            seasonID,
            week,
            viewType
        );
        const isCBB = leagueView === 'cbb';
        const tList = isCBB ? [...res.CollegeTeams] : [...res.NBATeams];
        const teamOptions = MapCBBTeamOptions(tList);
        const conferenceOptions = isCBB
            ? MapConferenceOptions(res.CollegeConferences)
            : MapConferenceOptions(res.NBAConferences);
        let divisionOptions = [];
        let leagueOpts = [];
        if (!isCBB) {
            const uniqueDivisions = tList.filter(
                (value, idx, self) =>
                    idx ===
                    self.findIndex(
                        (t) =>
                            t.DivisionID === value.DivisionID &&
                            t.Division === value.Division
                    )
            );
            divisionOptions = [
                ...uniqueDivisions.map((item) => ({
                    label: item.Division,
                    value: item.DivisionID
                }))
            ];
            leagueOpts = [
                { label: 'SimNBA', value: 1 },
                { label: 'International Superleague', value: 2 }
            ];
            setLeagueOptions(() => leagueOpts);
            setSelectedLeague(() => ({ label: 'SimNBA', value: 1 }));
        }
        const plList = isCBB ? [...res.CollegePlayers] : [...res.NBAPlayers];
        setTeamOptions(() => teamOptions);
        setConferenceOptions(() => conferenceOptions);
        setDivisionOptions(() => divisionOptions);
        setPlayers(() => plList);
        setTeams(() => tList);
    };

    const SelectLeagueType = (event) => {
        setViewableStats(() => []);
        setTeams(() => []);
        setPlayers(() => []);
        setTeamOptions(() => []);
        setConferenceOptions(() => []);
        setSelectedConferences(() => []);
        setSelectedTeams(() => []);
        setDivisionOptions(() => []);
        setSelectedLeague(() => []);
        event.preventDefault();
        const choice = event.target.value;
        const weeks =
            choice === 'nba' ? [...Array(31).keys()] : [...Array(21).keys()];

        const weekOptionsForm = [
            ...weeks.map((x) => {
                return { label: x, value: x };
            })
        ];
        setWeekOptions(() => weekOptionsForm);
        setLeagueView(() => choice);
    };

    const SelectViewType = (event) => {
        setViewableStats(() => []);
        event.preventDefault();
        const choice = event.target.value;
        if (choice === 'WEEK') {
            setStatType(() => 'Overall');
        }
        setViewType(() => choice);
    };

    const SelectPlayerView = () => {
        setCurrentView(() => 'PLAYER');
        ResetPlayerViewOptions();
    };

    const SelectTeamView = () => {
        setCurrentView(() => 'TEAM');
        ResetTeamViewOptions();
    };

    const SelectStatType = (event) => {
        event.preventDefault();
        const choice = event.target.value;
        setStatType(() => choice);

        switch (choice) {
            case 'Offense':
                ChangeSort('PPG', currentView);
                break;
            case 'Defense':
                ChangeSort('PAPG', currentView);
                break;
            case 'Differential':
                ChangeSort('PointsDiff', currentView);
                break;
            case 'Overall':
                ChangeSort('Points', currentView);
                break;
            case 'PerGame':
                ChangeSort('PPG', currentView);
                break;
            default:
                break;
        }
    };

    const ChangeSeason = (options) => {
        const opts = { label: options.label, value: options.value };
        setSelectedSeason(() => opts);
    };

    const ChangeWeek = (options) => {
        const opts = { label: options.label, value: options.value };
        setSelectedWeek(() => opts);
    };

    const ChangeLeagueOptions = (options) => {
        const opts = { label: options.label, value: options.value };
        setSelectedLeague(() => opts);
    };

    const ChangeTeamSelections = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedTeams(() => opts);
    };

    const ChangeConferenceSelections = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedConferences(() => opts);
    };

    const ChangeDivisionSelections = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedDivisions(() => opts);
    };

    const ResetPlayerViewOptions = () => {
        setStatType(() => 'PerGame');
        setSelectedConferences(() => '');
        setSelectedTeams(() => '');
        ChangeSort('PPG', 'PLAYER');
    };

    const ResetTeamViewOptions = () => {
        setStatType(() => 'Offense');
        setSelectedTeams(() => '');
        setSelectedConferences(() => '');
        ChangeSort('PPG', 'TEAM');
    };

    const LoadMoreRecords = () => {
        const currentDataSet = [...viewableStats];
        let newCount = [...currentDataSet].concat(
            [...filteredView].slice(count, count + 100)
        );

        setCount((x) => x + 100);
        setViewableStats(() => newCount);
    };

    const ChangeSort = (value, view) => {
        const newSort = value;
        const isAscending = GetDefaultStatsOrder(
            newSort,
            sort,
            isAsc,
            view,
            currentView
        );
        setSort(() => newSort);
        setIsAsc(() => isAscending);
    };

    const CurrentHeader = () => {
        if (currentView === 'PLAYER') {
            if (statType === 'Overall')
                return (
                    <CBBOverallHeader
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
            if (statType === 'PerGame')
                return (
                    <CBBPerGameHeader
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
        } else if (currentView === 'TEAM') {
            if (statType === 'Differential')
                return (
                    <CBBDifferentialHeader
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
            if (statType === 'Offense')
                return (
                    <CBBOffenseHeader
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
            if (statType === 'Defense')
                return (
                    <CBBDefenseHeader
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
        }
        return '';
    };

    return (
        <div className="container-fluid">
            <div className="justify-content-start">
                <h2>Statistics</h2>
            </div>
            <div className="row">
                <div className="col-2">
                    <div className="row">
                        <h3>League Options</h3>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col-auto">
                            <div
                                className="btn-group btn-group-lg"
                                role="group"
                                aria-label="ViewOptions"
                            >
                                <StatsPageButton
                                    statType={leagueView}
                                    action={SelectLeagueType}
                                    value="cbb"
                                    label="College"
                                />
                                <StatsPageButton
                                    statType={leagueView}
                                    action={SelectLeagueType}
                                    value="nba"
                                    label="NBA"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h3>Search Options</h3>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col-auto">
                            <div
                                className="btn-group btn-group-lg"
                                role="group"
                                aria-label="ViewOptions"
                            >
                                <StatsPageButton
                                    statType={viewType}
                                    action={SelectViewType}
                                    value="SEASON"
                                    label="Season"
                                />
                                <StatsPageButton
                                    statType={viewType}
                                    action={SelectViewType}
                                    value="WEEK"
                                    label="Week"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h3>View Options</h3>
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
                                    className={
                                        currentView === 'PLAYER'
                                            ? 'btn btn-primary'
                                            : 'btn btn-secondary'
                                    }
                                    onClick={SelectPlayerView}
                                >
                                    Player
                                </button>
                                <button
                                    type="button"
                                    className={
                                        currentView === 'TEAM'
                                            ? 'btn btn-primary'
                                            : 'btn btn-secondary'
                                    }
                                    onClick={SelectTeamView}
                                >
                                    Team
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <h3>Categories</h3>
                    </div>
                    <div className="row mt-1 justify-content-center">
                        <div className="col-md-auto">
                            <div
                                className="btn-group-vertical btn-group-lg"
                                role="group"
                                aria-label="CategoryOptions"
                            >
                                {currentView === 'PLAYER' ? (
                                    <>
                                        <button
                                            type="button"
                                            className={
                                                statType === 'Overall'
                                                    ? 'btn btn-primary'
                                                    : 'btn btn-secondary'
                                            }
                                            onClick={SelectStatType}
                                            value="Overall"
                                        >
                                            Overall
                                        </button>
                                        <button
                                            type="button"
                                            className={
                                                statType === 'PerGame'
                                                    ? 'btn btn-primary'
                                                    : 'btn btn-secondary'
                                            }
                                            onClick={SelectStatType}
                                            value="PerGame"
                                            disabled={viewType === 'WEEK'}
                                        >
                                            Per Game
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className={
                                                statType === 'Offense'
                                                    ? 'btn btn-primary'
                                                    : 'btn btn-secondary'
                                            }
                                            onClick={SelectStatType}
                                            value="Offense"
                                        >
                                            Offense
                                        </button>
                                        <button
                                            type="button"
                                            className={
                                                statType === 'Defense'
                                                    ? 'btn btn-primary'
                                                    : 'btn btn-secondary'
                                            }
                                            onClick={SelectStatType}
                                            value="Defense"
                                        >
                                            Defense
                                        </button>
                                        <button
                                            type="button"
                                            className={
                                                statType === 'Differential'
                                                    ? 'btn btn-primary'
                                                    : 'btn btn-secondary'
                                            }
                                            onClick={SelectStatType}
                                            value="Differential"
                                        >
                                            Differential
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <div className="row mt-3 justify-content-between">
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle">Filters</h4>
                        </div>
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle me-2">
                                {cbb_Timestamp &&
                                    `Current Week ${cbb_Timestamp.CollegeWeek}`}
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <h5 className="text-start align-middle">Seasons</h5>
                            <Select
                                options={seasons}
                                isMulti={false}
                                className="basic-multi-select btn-dropdown-width-team z-index-6"
                                classNamePrefix="select"
                                onChange={ChangeSeason}
                            />
                        </div>
                        {viewType === 'WEEK' && (
                            <div className="col-auto">
                                <h5 className="text-start align-middle">
                                    Week
                                </h5>
                                <Select
                                    options={weekOptions}
                                    isMulti={false}
                                    className="basic-multi-select btn-dropdown-width-team z-index-6"
                                    classNamePrefix="select"
                                    onChange={ChangeWeek}
                                />
                            </div>
                        )}
                        {currentView === 'PLAYER' && (
                            <div className="col-md-auto">
                                <h5 className="text-start align-middle">
                                    Teams
                                </h5>
                                <Select
                                    options={teamOptions}
                                    isMulti={true}
                                    className="basic-multi-select btn-dropdown-width-team z-index-6"
                                    classNamePrefix="select"
                                    onChange={ChangeTeamSelections}
                                />
                            </div>
                        )}
                        {leagueView === 'nba' && (
                            <div className="col-md-auto">
                                <h5 className="text-start align-middle">
                                    Leagues
                                </h5>
                                <Select
                                    options={leagueOptions}
                                    isMulti={false}
                                    className="basic-multi-select btn-dropdown-width-team z-index-6"
                                    classNamePrefix="select"
                                    onChange={ChangeLeagueOptions}
                                />
                            </div>
                        )}
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Conferences
                            </h5>
                            <Select
                                options={conferenceOptions}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-6"
                                classNamePrefix="select"
                                onChange={ChangeConferenceSelections}
                            />
                        </div>
                        {leagueView === 'nba' && (
                            <div className="col-md-auto">
                                <h5 className="text-start align-middle">
                                    Divisions
                                </h5>
                                <Select
                                    options={divisionOptions}
                                    isMulti={true}
                                    className="basic-multi-select btn-dropdown-width-team z-index-6"
                                    classNamePrefix="select"
                                    onChange={ChangeDivisionSelections}
                                />
                            </div>
                        )}
                        <div className="col-auto">
                            <h5 className="text-start align-middle">Search</h5>
                            <StatsPageButton
                                statType="search"
                                value="search"
                                label={
                                    viewType === 'SEASON'
                                        ? 'Search Season'
                                        : 'Search Week'
                                }
                                action={GetStatsPageInfo}
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-auto"></div>
                    </div>
                    <div className="row mt-3 mb-5">
                        <InfiniteScroll
                            dataLength={viewableStats.length}
                            next={LoadMoreRecords}
                            hasMore={true}
                            height={570}
                            scrollThreshold={0.8}
                            loader={
                                <div className="row justify-content-center">
                                    Loading More Stats...
                                </div>
                            }
                            endMessage={
                                <div className="row justify-content-center">
                                    <h4>...that's all the stats we have.</h4>
                                </div>
                            }
                        >
                            {isMobile ? (
                                <>
                                    Please use Desktop for now. Also, stop
                                    shooting 3's
                                </>
                            ) : (
                                <table className={tableHoverClass}>
                                    <thead
                                        style={{
                                            position: 'sticky',
                                            top: 0,
                                            backgroundColor:
                                                viewMode === 'dark'
                                                    ? '#1a1a1a'
                                                    : 'white',
                                            zIndex: 3
                                        }}
                                    >
                                        <CurrentHeader />
                                    </thead>
                                    <tbody className="overflow-auto">
                                        {viewableStats.length > 0
                                            ? viewableStats.map((x, idx) => {
                                                  {
                                                      return currentView ===
                                                          'PLAYER' ? (
                                                          <CBBPlayerStatRow
                                                              statType={
                                                                  statType
                                                              }
                                                              idx={idx}
                                                              player={x}
                                                              viewType={
                                                                  viewType
                                                              }
                                                          />
                                                      ) : (
                                                          <CBBTeamStatRow
                                                              statType={
                                                                  statType
                                                              }
                                                              idx={idx}
                                                              team={x}
                                                              viewType={
                                                                  viewType
                                                              }
                                                          />
                                                      );
                                                  }
                                              })
                                            : ''}
                                    </tbody>
                                </table>
                            )}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    viewMode: { viewMode },
    timestamp: { cbb_Timestamp }
}) => ({
    currentUser,
    viewMode,
    cbb_Timestamp
});

export default connect(mapStateToProps)(CBBStatsPage);
