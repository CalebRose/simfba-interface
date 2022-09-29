import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { NewsTypeList } from '../../Constants/CommonConstants';
import FBALandingPageService from '../../_Services/simFBA/FBALandingPageService';
import { MapObjOptions } from '../../_Utility/filterHelper';
import NewsLog from './NewsLog';

const NewsPage = ({ currentUser, cfbTeam, cfb_Timestamp }) => {
    // Services
    let _landingService = new FBALandingPageService();
    // Hooks
    const newsOptions = MapObjOptions(NewsTypeList);
    const [allNews, setAllNews] = useState([]);
    const [currentNews, setCurrentNews] = useState([]);
    const [selectedNewsTypes, setSelectedNewsTypes] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState([]);
    const [selectedWeeks, setSelectedWeeks] = useState([]);
    const [seasonOptions, setSeasonOptions] = useState(null);
    const [weekOptions, setWeekOptions] = useState(null);

    // Use Effects
    useEffect(() => {
        if (cfb_Timestamp) {
            GetAllNews();
            GetWeeksInASeason();
        }
    }, [cfb_Timestamp]);

    useEffect(() => {
        const filterLogs = FilterLogs(allNews);
        setCurrentNews(() => filterLogs);
    }, [selectedWeeks, selectedNewsTypes]);

    // Api Functions
    const GetAllNews = async () => {
        const res = await _landingService.GetAllNewsLogsForASeason(
            cfb_Timestamp.CollegeSeasonID
        );
        setAllNews(() => res);
        const currentWeekNews = res.filter(
            (x) => x.WeekID === cfb_Timestamp.CollegeWeekID
        );
        setCurrentNews(() => currentWeekNews);
    };
    const GetWeeksInASeason = async () => {
        let response = await _landingService.GetWeeksInSeason(
            cfb_Timestamp.CollegeSeasonID,
            cfb_Timestamp.CollegeWeekID
        );

        const allowedWeeks = response.filter(
            (x) => x.ID <= cfb_Timestamp.CollegeWeekID
        );

        let weeks = allowedWeeks.map((x) => {
            return { label: `Week ${x.Week}`, value: x.ID };
        });

        setWeekOptions(() => weeks);
    };

    const FilterLogs = (news) => {
        let fl = [...news];
        if (fl.length > 0) {
            if (selectedNewsTypes.length > 0) {
                fl = fl.filter((x) =>
                    selectedNewsTypes.includes(x.MessageType)
                );
            }
            if (selectedWeeks.length > 0) {
                fl = fl.filter((x) => selectedWeeks.includes(x.WeekID));
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

    return (
        <div className="container-fluid">
            <div className="justify-content-start">
                <h2>SimFBA News</h2>
                <div className="row">
                    <div className="col-md-2">
                        <h5>News Filters</h5>
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
    timestamp: { cfb_Timestamp }
}) => ({
    currentUser,
    cfbTeam,
    cfb_Timestamp
});

export default connect(mapStateToProps)(NewsPage);
