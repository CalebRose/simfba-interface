import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Select from 'react-select';
import BBAStatsService from '../../../_Services/simNBA/BBAStatsService';
import {
    MapCBBTeamOptions,
    MapConferenceOptions,
    MapTeamOptions
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

const CBBStatsPage = ({ currentUser, cbbTeam, cbb_Timestamp }) => {
    // Services
    let _statsService = new BBAStatsService();

    // Hooks
    const [currentView, setCurrentView] = useState('PLAYER');
    const [selectedConferences, setSelectedConferences] = useState('');
    const [selectedTeams, setSelectedTeams] = useState('');
    const [statType, setStatType] = useState('PerGame'); // Offense, Defense, Differential
    const [collegeTeamOptions, setCollegeTeamOptions] = useState([]);
    const [conferenceOptions, setConferenceOptions] = useState([]);
    const [collegePlayers, setCollegePlayers] = useState([]);
    const [collegeTeams, setCollegeTeams] = useState([]);
    const [filteredView, setFilteredView] = useState([]);
    const [viewableStats, setViewableStats] = useState([]);
    const [count, setCount] = useState(100);
    const [sort, setSort] = React.useState('PPG');
    const [isAsc, setIsAsc] = React.useState(false);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const isMobile = useMediaQuery({ query: `(max-width:844px)` });

    useEffect(() => {
        if (currentUser) {
            // Get Stats page info
            GetStatsPageInfo();
        }
    }, [currentUser]);

    useEffect(() => {
        if (collegePlayers.length > 0 && collegeTeams.length > 0) {
            const dataSet =
                currentView === 'PLAYER'
                    ? [...collegePlayers]
                    : [...collegeTeams];
            const fc = FilterStatsData(dataSet);
            if (fc.length > 0) {
                const filteredDataSort = ConductSort([...fc], sort, isAsc);
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
        collegePlayers,
        collegeTeams,
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
            }

            if (currentView === 'PLAYER') {
                let teamList = [];

                if (selectedConferences.length > 0) {
                    const teamSet = [...collegeTeams].filter((x) =>
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
                        dataSet = dataSet.filter(
                            (x) => x.SeasonStats.Minutes > 0
                        );
                        break;

                    default:
                        break;
                }
            }
        }

        return dataSet;
    };

    const GetStatsPageInfo = async () => {
        const res = await _statsService.GetStatsPageData();
        const teamOptions = MapCBBTeamOptions(res.CollegeTeams);
        const conferenceOptions = MapConferenceOptions(res.CollegeConferences);
        setCollegeTeamOptions(() => teamOptions);
        setConferenceOptions(() => conferenceOptions);
        setCollegePlayers(() => [...res.CollegePlayers]);
        setCollegeTeams(() => [...res.CollegeTeams]);
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

    const ChangeTeamSelections = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedTeams(() => opts);
    };

    const ChangeConferenceSelections = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedConferences(() => opts);
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
                    <CBBOverallHeader sortFunc={ChangeSort} cv={currentView} />
                );
            if (statType === 'PerGame')
                return (
                    <CBBPerGameHeader sortFunc={ChangeSort} cv={currentView} />
                );
        } else if (currentView === 'TEAM') {
            if (statType === 'Differential')
                return (
                    <CBBDifferentialHeader
                        sortFunc={ChangeSort}
                        cv={currentView}
                    />
                );
            if (statType === 'Offense')
                return (
                    <CBBOffenseHeader sortFunc={ChangeSort} cv={currentView} />
                );
            if (statType === 'Defense')
                return (
                    <CBBDefenseHeader sortFunc={ChangeSort} cv={currentView} />
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
                <div className="col-md-10">
                    <div className="row mt-3 justify-content-between">
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle">Filters</h4>
                        </div>
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle me-2">
                                {cbb_Timestamp
                                    ? `Current Week ${cbb_Timestamp.CollegeWeek}`
                                    : ''}
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        {currentView === 'PLAYER' ? (
                            <div className="col-md-auto">
                                <h5 className="text-start align-middle">
                                    Teams
                                </h5>
                                <Select
                                    options={collegeTeamOptions}
                                    isMulti={true}
                                    className="basic-multi-select btn-dropdown-width-team z-index-6"
                                    classNamePrefix="select"
                                    onChange={ChangeTeamSelections}
                                />
                            </div>
                        ) : (
                            ''
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
                                <table className="table table-hover">
                                    <thead
                                        style={{
                                            position: 'sticky',
                                            top: 0,
                                            backgroundColor: 'white',
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
                                                          />
                                                      ) : (
                                                          <CBBTeamStatRow
                                                              statType={
                                                                  statType
                                                              }
                                                              idx={idx}
                                                              team={x}
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
    cbbTeam: { cbbTeam },
    timestamp: { cbb_Timestamp }
}) => ({
    currentUser,
    cbbTeam,
    cbb_Timestamp
});

export default connect(mapStateToProps)(CBBStatsPage);
