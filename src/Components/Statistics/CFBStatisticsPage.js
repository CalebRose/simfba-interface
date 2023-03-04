import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import InfiniteScroll from 'react-infinite-scroll-component';
import FBAStatsService from '../../_Services/simFBA/FBAStatsService';
import { connect } from 'react-redux';
import {
    MapConferenceOptions,
    MapTeamOptions
} from '../../_Utility/filterHelper';
import PassingHeaders from './CFBStatsComponents/PassingHeaders';
import RushingHeaders from './CFBStatsComponents/RushingHeaders';
import ReceivingHeaders from './CFBStatsComponents/ReceivingHeaders';
import DefensiveHeaders from './CFBStatsComponents/DefenseHeaders';
import KickingHeaders from './CFBStatsComponents/KickingHeaders';
import { PlayerStatRow } from './CFBStatsComponents/PlayerStatRow';
import { TeamStatRow } from './CFBStatsComponents/TeamStatRow';
import {
    ConductSort,
    GetDefaultStatsOrder,
    uniq_fast
} from '../../_Utility/utilHelper';
import TeamOverallHeaders from './CFBStatsComponents/TeamOverallHeaders';
import TeamOffenseHeaders from './CFBStatsComponents/TeamOffenseHeaders';
import TeamDefensiveHeaders from './CFBStatsComponents/TeamDefenseHeaders';
import HeismanModal from './CFBStatsComponents/HeismanModal';
import OLineHeaders from './CFBStatsComponents/OLineStats';
import { SeasonsList } from '../../Constants/CommonConstants';

const CFBStatisticsPage = ({ currentUser, cfb_Timestamp, viewMode }) => {
    // Services
    let _statsService = new FBAStatsService();
    // Hooks
    const [currentView, setCurrentView] = useState('PLAYER');
    const [selectedConferences, setSelectedConferences] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
    const [selectedTeams, setSelectedTeams] = useState('');
    const [statType, setStatType] = useState('Passing'); // PASSING, RUSHING, RECEIVING, TACKLES, YARDS ALLOWED, INTs, SACKS
    const [conferenceList, setConferenceList] = useState('');
    const [collegeTeams, setCollegeTeams] = useState([]);
    const [collegeTeamOptions, setCollegeTeamOptions] = useState([]);
    const [conferenceOptions, setConferenceOptions] = useState([]);
    const [seasons, setSeasons] = useState(SeasonsList);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [heismanList, setHeismanList] = useState([]);
    const [collegePlayers, setCollegePlayers] = useState([]);
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
        if (currentUser) {
            GetStatsPageInfo();
            GetHeismanList();
        }
    }, [currentUser]);

    useEffect(() => {
        if (cfb_Timestamp !== undefined || cfb_Timestamp !== null) {
            if (selectedSeason === null) {
                const year = {
                    label: cfb_Timestamp.Season,
                    value: cfb_Timestamp.CollegeSeasonID
                };
                setSelectedSeason(() => year);
            } else {
                GetStatsPageInfo();
            }
        }
    }, [cfb_Timestamp, selectedSeason]);

    useEffect(() => {}, [viewableStats, currentView]);

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
                    case 'Passing':
                        dataSet = dataSet.filter(
                            (x) => x.SeasonStats.PassAttempts > 0
                        );
                        break;
                    case 'Rushing':
                        dataSet = dataSet.filter(
                            (x) => x.SeasonStats.RushAttempts > 0
                        );
                        break;
                    case 'Receiving':
                        dataSet = dataSet.filter(
                            (x) => x.SeasonStats.Targets > 0
                        );
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
                        dataSet = dataSet.filter(
                            (x) =>
                                x.SeasonStats.Pancakes > 0 ||
                                x.SeasonStats.SacksAllowed > 0
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
        const res = await _statsService.GetStatsForStatisticsPage(
            selectedSeason.value
        );
        const teamOptions = MapTeamOptions(res.CollegeTeams);
        const conferenceOptions = MapConferenceOptions(res.CollegeConferences);

        setCollegeTeamOptions(() => teamOptions);
        setConferenceOptions(() => conferenceOptions);
        if (res.CollegePlayers) {
            setCollegePlayers(() => [...res.CollegePlayers]);
        }
        if (res.CollegeTeams) {
            setCollegeTeams(() => [...res.CollegeTeams]);
        }
        setConferenceList(() => res.CollegeConferences);
    };

    const GetHeismanList = async () => {
        const res = await _statsService.GetHeismanList();
        if (res) {
            setHeismanList(() => [...res.slice(0, 25)]);
        }
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

    const ChangeSeason = (options) => {
        const opts = { label: options.label, value: options.value };
        setSelectedSeason(() => opts);
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
                    <PassingHeaders sortFunc={ChangeSort} cv={currentView} />
                );
            if (statType === 'Rushing')
                return (
                    <RushingHeaders sortFunc={ChangeSort} cv={currentView} />
                );
            if (statType === 'Receiving')
                return (
                    <ReceivingHeaders sortFunc={ChangeSort} cv={currentView} />
                );
            if (statType === 'Defense')
                return (
                    <DefensiveHeaders sortFunc={ChangeSort} cv={currentView} />
                );
            if (statType === 'Kicking')
                return (
                    <KickingHeaders sortFunc={ChangeSort} cv={currentView} />
                );
            if (statType === 'OLine')
                return <OLineHeaders sortFunc={ChangeSort} cv={currentView} />;
        } else if (currentView === 'TEAM') {
            if (statType === 'Overall')
                return (
                    <TeamOverallHeaders
                        sortFunc={ChangeSort}
                        cv={currentView}
                    />
                );
            if (statType === 'Offense')
                return (
                    <TeamOffenseHeaders
                        sortFunc={ChangeSort}
                        cv={currentView}
                    />
                );
            if (statType === 'Defense')
                return (
                    <TeamDefensiveHeaders
                        sortFunc={ChangeSort}
                        cv={currentView}
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
                                                statType === 'Passing'
                                                    ? 'btn btn-primary'
                                                    : 'btn btn-secondary'
                                            }
                                            onClick={SelectStatType}
                                            value="Passing"
                                        >
                                            Passing
                                        </button>
                                        <button
                                            type="button"
                                            className={
                                                statType === 'Rushing'
                                                    ? 'btn btn-primary'
                                                    : 'btn btn-secondary'
                                            }
                                            onClick={SelectStatType}
                                            value="Rushing"
                                        >
                                            Rushing
                                        </button>
                                        <button
                                            type="button"
                                            className={
                                                statType === 'Receiving'
                                                    ? 'btn btn-primary'
                                                    : 'btn btn-secondary'
                                            }
                                            onClick={SelectStatType}
                                            value="Receiving"
                                        >
                                            Receiving
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
                                                statType === 'Kicking'
                                                    ? 'btn btn-primary'
                                                    : 'btn btn-secondary'
                                            }
                                            onClick={SelectStatType}
                                            value="Kicking"
                                        >
                                            Kicking
                                        </button>
                                        <button
                                            type="button"
                                            className={
                                                statType === 'OLine'
                                                    ? 'btn btn-primary'
                                                    : 'btn btn-secondary'
                                            }
                                            onClick={SelectStatType}
                                            value="OLine"
                                        >
                                            Offensive Line
                                        </button>
                                    </>
                                ) : (
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
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <div className="col-md-auto">
                            {heismanList.length > 0 ? (
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    data-bs-toggle="modal"
                                    data-bs-target="#heismanModal"
                                >
                                    Heisman Watch List
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                >
                                    Heisman Watch List
                                </button>
                            )}
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
                                {cfb_Timestamp
                                    ? `Current Week ${cfb_Timestamp.CollegeWeek}`
                                    : ''}
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
                    <HeismanModal list={heismanList} viewMode={viewMode} />
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
                                                      />
                                                  ) : (
                                                      <TeamStatRow
                                                          statType={statType}
                                                          idx={idx}
                                                          team={x}
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

export default connect(mapStateToProps)(CFBStatisticsPage);
