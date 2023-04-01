import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {
    LeaguesList,
    NewsTypeList,
    SeasonsList
} from '../../Constants/CommonConstants';
import FBALandingPageService from '../../_Services/simFBA/FBALandingPageService';
import BBANewsService from '../../_Services/simNBA/BBANewsService';
import { MapObjOptions } from '../../_Utility/filterHelper';
import NewsLog from './NewsLog';

const NewsPage = ({ currentUser, cfbTeam, cfb_Timestamp, cbb_Timestamp }) => {
    // Services
    let _landingService = new FBALandingPageService();
    let _newsService = new BBANewsService();

    // Hooks
    const newsOptions = MapObjOptions(NewsTypeList);
    //retired this hook to not retrieve all newslog and instead seperate the sports out
    // const [allNews, setAllNews] = useState([]);
    //added in 4 seperate hooks to retrieve individual logs of sports
    const [cbbNews, setCbbNews] = useState([]);
    const [cfbNews, setCfbNews] = useState([]);
    const [nbaNews,setNbaNews] = useState([]);
    const [nflNews,setNflNews] = useState([]);
    const [currentNews, setCurrentNews] = useState([]);
    const [selectedNewsTypes, setSelectedNewsTypes] = useState([]);
    //retired comment below to choose 1 league at a time
    // const [selectedLeagues, setSelectedLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState('');
    const [selectedSeason, setSelectedSeason] = useState([]);
    const [selectedWeeks, setSelectedWeeks] = useState([]);
    const [seasonOptions, setSeasonOptions] = useState(SeasonsList);
    const [leagueOptions, setLeagueOptions] = useState(LeaguesList);
    const [weekOptions, setWeekOptions] = useState(null);

    // Use Effects
    useEffect(() => {
        if (cfb_Timestamp) {
            GetAllNews();
            GetWeeksInASeason();
        }
    }, [cfb_Timestamp]);

    useEffect(() => {
        //retired code below as it relates to allNews
        // const filterLogs = FilterLogs(allNews);
        let news = [];
        if (selectedLeague == 'CFB') {
            news = [...cfbNews];
        } else if (selectedLeague == 'CBB') {
            news = [...cbbNews];
        } else if (selectedLeague == 'NFL') {
            news = [...nflNews];
        } else if (selectedLeague == 'NBA') {
            news = [...nbaNews];
        }
        const filterLogs = FilterLogs(news);
        setCurrentNews(() => filterLogs);
    }, [selectedWeeks, selectedNewsTypes, selectedLeague, selectedSeason]);
    
    // Api Functions
    const GetAllNews = async () => {
        const res = await _landingService.GetAllNewsLogsForACfbSeason(
            cfb_Timestamp.CollegeSeasonID
        );

        const bbaNews = await _newsService.GetAllNewsLogsForACbbSeason(
            cbb_Timestamp.SeasonID
        );

        const nfl = await _landingService.GetAllNewsLogsForANflSeason(
            cfb_Timestamp.CollegeSeasonID
        );

        const nba = await _newsService.GetAllNewsLogsForANbaSeason(
            cbb_Timestamp.SeasonID
        );

        const cfbNews = [...res].map((x) => {
            return { ...x, League: 'CFB' };
        });

        const cbbNews = [...bbaNews].map((x) => {
            return { ...x, League: 'CBB' };
        });

        const nflNews = [...nfl].map((x) => {
            return { ...x, League: 'NFL' };
        });

        const nbaNews = [...nba].map((x) => {
            return { ...x, League: 'NBA' };
        });

        //this one needs to be retired to set seperate logs for sports
        // setAllNews(() => [...cfbNews, ...cbbNews]);
        // const currentWeekNews = res.filter(
        //     (x) => x.WeekID === cfb_Timestamp.CollegeWeekID
        // );
        // setCurrentNews(() => currentWeekNews);

        setCbbNews(() => [...cbbNews]);
        // const currentCbbWeekNews = res.filter(
        //     (x) => x.WeekID === cbb_Timestamp.CollegeWeekID
        // );
        // setCurrentNews(() => currentCbbWeekNews);

        setCfbNews(() => [...cfbNews]);
        const currentCfbWeekNews = res.filter(
            (x) => x.WeekID === cfb_Timestamp.CollegeWeekID
        );
        setCurrentNews(() => currentCfbWeekNews);

        setNbaNews(() => [...nbaNews]);
        
        setNflNews(() => [...nflNews]);

    };
    const GetWeeksInASeason = async () => {
        let response = await _landingService.GetWeeksInSeason(
            2,
            cfb_Timestamp.CollegeWeekID
        );

        const allowedWeeks = response.filter(
            (x) => x.ID <= cfb_Timestamp.CollegeWeekID
        );

        let weeks = allowedWeeks.map((x) => {
            return { label: `Week ${x.Week}`, value: x.Week };
        });
        weeks.unshift({ label: 'Week 0', value: 0 });

        setWeekOptions(() => weeks);
    };

    const FilterLogs = (news) => {
        let fl = [...news];
        if (fl.length > 0) {
            //retired due to selecting certain leagues and used effect will take over
            // if (selectedLeagues.length > 0) {
            //     fl = fl.filter((x) => selectedLeagues.includes(x.League));
            // }
            if (selectedNewsTypes.length > 0) {
                fl = fl.filter((x) =>
                    selectedNewsTypes.includes(x.MessageType)
                );
            }
            if (selectedSeason.length > 0) {
                fl = fl.filter((x) => selectedSeason.includes(x.SeasonID));
            }
            if (selectedWeeks.length > 0) {
                fl = fl.filter((x) => selectedWeeks.includes(x.Week));
            }
        }

        return fl;
    };

    // Click Functions

    const ChangeNewsTypes = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedNewsTypes(() => opts);
    };

    const ChangeWeeks = (options) => {
        const opts = [options.value];
        setSelectedWeeks(() => opts);
    };

    const ChangeSeasons = (options) => {
        const opts = [options.value];
        setSelectedSeason(() => opts);
    };

    const ChangeLeagues = (options) => {
        //retired due to filtering and commenting out line 131-132
        // const opts = [...options.map((x) => x.value)];
        const opts = options.value;
        setSelectedLeague(() => opts);
    };

    return (
        <div className="container-fluid">
            <div className="justify-content-start">
                <h2>SimFBA News</h2>
                <h4 className="align-end">
                    CFB Week: {cfb_Timestamp.CollegeWeek} | CBB Week:{' '}
                    {cbb_Timestamp.CollegeWeek} | NFL Week: {cfb_Timestamp.NFLWeek} | NBA Week: {cbb_Timestamp.NBAWeek}
                </h4>
                <div className="row">
                    <div className="col-md-2">
                        <h5>News Filters</h5>
                        <div className="row">
                            <h6>League</h6>
                            <Select
                                options={leagueOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={ChangeLeagues}
                            />
                        </div>
                        <div className="row mb-2">
                            <h6>News Type</h6>
                            <Select
                                options={newsOptions}
                                isMulti={true}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={ChangeNewsTypes}
                            />
                        </div>
                        <div className="row">
                            <h6>Season</h6>
                            <Select
                                options={seasonOptions}
                                isMulti={false}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={ChangeSeasons}
                            />
                        </div>
                        <div className="row">
                            <h6>Week</h6>
                            <Select
                                options={weekOptions}
                                isMulti={false}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={ChangeWeeks}
                            />
                        </div>
                    </div>
                    <div className="col-md-10 px-md-4">
                        <div className="row mt-3 mb-5 justify-content-between">
                            {currentNews.length > 0
                                ? currentNews.map((x, idx) => (
                                      <NewsLog
                                          key={x.ID}
                                          news={x}
                                          idx={idx}
                                          season={cfb_Timestamp.Season}
                                      />
                                  ))
                                : 'Loading News...'}
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
    timestamp: { cfb_Timestamp, cbb_Timestamp }
}) => ({
    currentUser,
    cfbTeam,
    cfb_Timestamp,
    cbb_Timestamp
});

export default connect(mapStateToProps)(NewsPage);
