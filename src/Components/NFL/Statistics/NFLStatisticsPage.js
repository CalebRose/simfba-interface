import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import FBAStatsService from '../../../_Services/simFBA/FBAStatsService';
import {
    NFLConferenceList,
    NFLDivisionList,
    NFLSeasonsList
} from '../../../Constants/CommonConstants';
import {
    MapConferenceOptions,
    MapTeamOptions
} from '../../../_Utility/filterHelper';
import PassingHeaders from '../../Statistics/CFBStatsComponents/PassingHeaders';
import RushingHeaders from '../../Statistics/CFBStatsComponents/RushingHeaders';
import ReceivingHeaders from '../../Statistics/CFBStatsComponents/ReceivingHeaders';
import DefensiveHeaders from '../../Statistics/CFBStatsComponents/DefenseHeaders';
import KickingHeaders from '../../Statistics/CFBStatsComponents/KickingHeaders';
import OLineHeaders from '../../Statistics/CFBStatsComponents/OLineStats';
import TeamOverallHeaders from '../../Statistics/CFBStatsComponents/TeamOverallHeaders';
import TeamOffenseHeaders from '../../Statistics/CFBStatsComponents/TeamOffenseHeaders';
import TeamDefensiveHeaders from '../../Statistics/CFBStatsComponents/TeamDefenseHeaders';
import { StatsPageButton } from '../../_Common/Buttons';
import { PlayerStatRow } from '../../Statistics/CFBStatsComponents/PlayerStatRow';
import { TeamStatRow } from '../../Statistics/CFBStatsComponents/TeamStatRow';
import {
    ConductSort,
    GetDefaultStatsOrder
} from '../../../_Utility/utilHelper';

const NFLStatisticsPage = ({ currentUser, cfb_Timestamp, viewMode }) => {
    // Services
    let _statsService = new FBAStatsService();
    // Hooks
    const [currentView, setCurrentView] = useState('PLAYER');
    const [viewType, setViewType] = useState('SEASON'); // SEASON, WEEK
    const [selectedConferences, setSelectedConferences] = useState('');
    const [selectedDivisions, setSelectedDivisions] = useState('');
    const [selectedTeams, setSelectedTeams] = useState('');
    const [statType, setStatType] = useState('Passing'); // PASSING, RUSHING, RECEIVING, TACKLES, YARDS ALLOWED, INTs, SACKS
    const [nflTeams, setNFLTeams] = useState([]);
    const [nflTeamOptions, setNFLTeamOptions] = useState([]);
    const [conferenceOptions, setConferenceOptions] =
        useState(NFLConferenceList);
    const [divisionOptions, setDivisionOptions] = useState(NFLDivisionList);
    const [weekOptions, setWeekOptions] = useState(() => {
        const weeks = [...Array(21).keys()];

        const weekOptionsForm = [
            ...weeks.map((x) => {
                return { label: x, value: x };
            })
        ];
        return weekOptionsForm;
    });
    const [seasons, setSeasons] = useState(NFLSeasonsList);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [nflPlayers, setNFLPlayers] = useState([]);
    const [filteredView, setFilteredView] = useState([]);
    const [viewableStats, setViewableStats] = useState([]);
    const [count, setCount] = useState(100);
    const [sort, setSort] = React.useState('PassingYards');
    const [isAsc, setIsAsc] = React.useState(false);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const isMobile = useMediaQuery({ query: `(max-width:844px)` });

    // UseEffects
    useEffect(() => {
        if (cfb_Timestamp !== undefined || cfb_Timestamp !== null) {
            if (selectedSeason === null) {
                const year = {
                    label: cfb_Timestamp.NFLSeason,
                    value: cfb_Timestamp.NFLSeasonID
                };
                setSelectedSeason(() => year);
            }
        }
    }, [cfb_Timestamp, selectedSeason]);

    useEffect(() => {
        if (nflPlayers.length > 0 && nflTeams.length > 0) {
            const dataSet =
                currentView === 'PLAYER' ? [...nflPlayers] : [...nflTeams];
            const fc = FilterStatsData(dataSet);
            if (fc.length > 0) {
                const filteredDataSort = ConductSort(
                    [...fc],
                    sort,
                    isAsc,
                    viewType
                );
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
        nflPlayers,
        nflTeams,
        currentView,
        selectedConferences,
        selectedTeams,
        sort,
        isAsc
    ]);

    // Functions
    const FilterStatsData = (dataSet) => {
        // Player VS Team View
        if (dataSet.length > 0) {
            if (currentView === 'TEAM') {
                if (selectedConferences.length > 0) {
                    dataSet = dataSet.filter((x) =>
                        selectedConferences.includes(x.ConferenceID)
                    );
                }

                if (selectedDivisions.length > 0) {
                    dataSet = dataSet.filter((x) =>
                        selectedDivisions.includes(x.DivisionID)
                    );
                }
            }

            if (currentView === 'PLAYER') {
                let teamList = [];

                if (selectedConferences.length > 0) {
                    const teamSet = [...nflTeams].filter((x) =>
                        selectedConferences.includes(x.ConferenceID)
                    );
                    teamList = teamList.concat([...teamSet]);
                    teamList = teamList.map((x) => x.ID);
                }

                if (selectedDivisions.length > 0) {
                    const teamSet = [...nflTeams].filter((x) =>
                        selectedDivisions.includes(x.DivisionID)
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
                    case 'Passing':
                        dataSet = dataSet.filter((x) => {
                            return viewType === 'SEASON'
                                ? x.SeasonStats.PassAttempts > 0
                                : x.Stats.PassAttempts > 0;
                        });
                        break;
                    case 'Rushing':
                        dataSet = dataSet.filter((x) => {
                            return viewType === 'SEASON'
                                ? x.SeasonStats.RushAttempts > 0
                                : x.Stats.RushAttempts > 0;
                        });
                        break;
                    case 'Receiving':
                        dataSet = dataSet.filter((x) => {
                            return viewType === 'SEASON'
                                ? x.SeasonStats.Targets > 0
                                : x.Stats.Targets > 0;
                        });
                        break;
                    case 'Defense':
                        dataSet = dataSet.filter((x) =>
                            [
                                'ILB',
                                'OLB',
                                'DT',
                                'DE',
                                'CB',
                                'FS',
                                'SS'
                            ].includes(x.Position)
                        );
                        break;
                    case 'OLine':
                        dataSet = dataSet.filter((x) => {
                            return viewType === 'SEASON'
                                ? x.SeasonStats.Pancakes > 0 ||
                                      x.SeasonStats.SacksAllowed > 0
                                : x.Stats.Pancakes > 0 ||
                                      x.Stats.SacksAllowed > 0;
                        });
                        break;

                    default:
                        break;
                }
            }
        }

        return dataSet;
    };

    const GetStatsPageInfo = async () => {
        const seasonID = selectedSeason.value;
        let week = selectedWeek ? Number(selectedWeek.value) : 0;
        if (viewType === 'WEEK') {
            let startingWeekID = 0;
            if (seasonID === '1') {
                startingWeekID = 1;
            } else if (seasonID === 2) {
                startingWeekID = 21;
            } else if (seasonID === 3) {
                startingWeekID = 43;
            }
            week = week + startingWeekID;
        }

        const res = await _statsService.GetNFLStatsForStatisticsPage(
            seasonID,
            week,
            viewType
        );

        const teamOptions = MapTeamOptions(res.NFLTeams);

        setNFLTeamOptions(() => teamOptions);
        if (res.NFLPlayers && res.NFLPlayers.length > 0) {
            setNFLPlayers(() => [...res.NFLPlayers]);
        }
        if (res.NFLTeams && res.NFLTeams.length > 0) {
            setNFLTeams(() => [...res.NFLTeams]);
        }
    };

    const SelectViewType = (event) => {
        setViewableStats(() => []);
        event.preventDefault();
        const choice = event.target.value;
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
            case 'Passing':
                ChangeSort('PassingYards', currentView);
                break;
            case 'Rushing':
                ChangeSort('RushingYards', currentView);
                break;
            case 'Receiving':
                ChangeSort('ReceivingYards', currentView);
                break;
            case 'Defense':
                if (currentView === 'PLAYER') {
                    ChangeSort('Tackles', currentView);
                } else {
                    ChangeSort('PointsAgainst', currentView);
                }
                break;
            case 'OLine':
                ChangeSort('Pancakes', currentView);
                break;
            case 'Kicking':
                ChangeSort('FGMade', currentView);
                break;
            case 'Offense':
            case 'Overall':
                ChangeSort('PointsScored', currentView);
                break;
            default:
                break;
        }
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

    const ChangeSeason = (options) => {
        const opts = { label: options.label, value: options.value };
        setSelectedSeason(() => opts);
    };

    const ChangeWeek = (options) => {
        const opts = { label: options.label, value: options.value };
        setSelectedWeek(() => opts);
    };

    const ResetPlayerViewOptions = () => {
        setStatType(() => 'Passing');
        setSelectedConferences(() => '');
        setSelectedTeams(() => '');
        ChangeSort('PassingYards', 'PLAYER');
    };

    const ResetTeamViewOptions = () => {
        setStatType(() => 'Overall');
        setSelectedTeams(() => '');
        setSelectedConferences(() => '');
        ChangeSort('PointsScored', 'TEAM');
    };

    const LoadMoreRecords = () => {
        if (currentView === 'PLAYER' && filteredView) {
            const currentDataSet = [...viewableStats];
            let newCount = [...currentDataSet].concat(
                [...filteredView].slice(count, count + 100)
            );

            setCount((x) => x + 100);
            setViewableStats(() => newCount);
        }
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
    // Click Handles

    const CurrentHeader = () => {
        if (currentView === 'PLAYER') {
            if (statType === 'Passing')
                return (
                    <PassingHeaders
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
            if (statType === 'Rushing')
                return (
                    <RushingHeaders
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
            if (statType === 'Receiving')
                return (
                    <ReceivingHeaders
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
            if (statType === 'Defense')
                return (
                    <DefensiveHeaders
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
            if (statType === 'Kicking')
                return (
                    <KickingHeaders
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
            if (statType === 'OLine')
                return (
                    <OLineHeaders
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
        } else if (currentView === 'TEAM') {
            if (statType === 'Overall')
                return (
                    <TeamOverallHeaders
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
            if (statType === 'Offense')
                return (
                    <TeamOffenseHeaders
                        sortFunc={ChangeSort}
                        cv={currentView}
                        viewType={viewType}
                    />
                );
            if (statType === 'Defense')
                return (
                    <TeamDefensiveHeaders
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
                <div className="col-md-2">
                    <div className="row">
                        <h3>Search Options</h3>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col-md-auto">
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
                                <StatsPageButton
                                    statType={currentView}
                                    action={SelectPlayerView}
                                    value="PLAYER"
                                    label="Player"
                                />
                                <StatsPageButton
                                    statType={currentView}
                                    action={SelectTeamView}
                                    value="TEAM"
                                    label="Team"
                                />
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
                                        <StatsPageButton
                                            statType={statType}
                                            action={SelectStatType}
                                            value="Passing"
                                            label="Passing"
                                        />
                                        <StatsPageButton
                                            statType={statType}
                                            action={SelectStatType}
                                            value="Rushing"
                                            label="Rushing"
                                        />
                                        <StatsPageButton
                                            statType={statType}
                                            action={SelectStatType}
                                            value="Receiving"
                                            label="Receiving"
                                        />
                                        <StatsPageButton
                                            statType={statType}
                                            action={SelectStatType}
                                            value="Defense"
                                            label="Defense"
                                        />
                                        <StatsPageButton
                                            statType={statType}
                                            action={SelectStatType}
                                            value="Kicking"
                                            label="Kicking"
                                        />
                                        <StatsPageButton
                                            statType={statType}
                                            action={SelectStatType}
                                            value="OLine"
                                            label="Offensive Line"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <StatsPageButton
                                            statType={statType}
                                            action={SelectStatType}
                                            value="Overall"
                                            label="Overall"
                                        />
                                        <StatsPageButton
                                            statType={statType}
                                            action={SelectStatType}
                                            value="Offense"
                                            label="Offense"
                                        />
                                        <StatsPageButton
                                            statType={statType}
                                            action={SelectStatType}
                                            value="Defense"
                                            label="Defense"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col-md-auto"></div>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="row mt-3 justify-content-between">
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle">Filters</h4>
                        </div>
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle me-2">
                                {cfb_Timestamp &&
                                    `Current Week ${cfb_Timestamp.NFLWeek}`}
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-auto">
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
                            <div className="col-md-auto">
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
                                    options={nflTeamOptions}
                                    isMulti={true}
                                    className="basic-multi-select btn-dropdown-width-team z-index-6"
                                    classNamePrefix="select"
                                    onChange={ChangeTeamSelections}
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
                        <div className="col-md-auto">
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
                    {/* <HeismanModal list={heismanList} viewMode={viewMode} /> */}
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
                                    Please use Desktop for now. Also, the
                                    Huskies suck.
                                </>
                            ) : (
                                <table
                                    className={`table table-hover ${
                                        viewMode === 'dark' ? 'table-dark' : ''
                                    }`}
                                >
                                    <thead
                                        style={{
                                            position: 'sticky',
                                            top: 0,
                                            backgroundColor:
                                                viewMode === 'dark'
                                                    ? '#202020'
                                                    : 'white',
                                            zIndex: 3
                                        }}
                                    >
                                        <CurrentHeader />
                                    </thead>
                                    <tbody className="overflow-auto">
                                        {viewableStats.length > 0
                                            ? viewableStats.map((x, idx) => {
                                                  return currentView ===
                                                      'PLAYER' ? (
                                                      <PlayerStatRow
                                                          statType={statType}
                                                          idx={idx}
                                                          player={x}
                                                          viewType={viewType}
                                                      />
                                                  ) : (
                                                      <TeamStatRow
                                                          statType={statType}
                                                          idx={idx}
                                                          team={x}
                                                          viewType={viewType}
                                                      />
                                                  );
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
    timestamp: { cfb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    cfb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(NFLStatisticsPage);
