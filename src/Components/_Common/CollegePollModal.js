import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import BBAPollService from '../../_Services/simNBA/BBAPollService';
import FBAPollService from '../../_Services/simFBA/FBAPollService';
import { SeasonsList } from '../../Constants/CommonConstants';
import {
    ExtraLargeModal,
    InfoModal,
    OfficialPollModal
} from './ModalComponents';
import { getLogo } from '../../Constants/getLogo';

const RankRow = ({ row, idx, standingsMap, retro }) => {
    const num = idx + 1;
    const { Team, TeamID, Votes, No1Votes } = row;
    const logo = getLogo(Team, retro);
    const standings = standingsMap[TeamID];
    let description = '';
    if (standings) {
        description = `${standings.TotalWins}-${standings.TotalLosses} (${standings.ConferenceWins}-${standings.ConferenceLosses})`;
    }
    console.log({ standings });
    return (
        <div className="row mb-3">
            <div
                className="card card-small"
                style={{
                    paddingLeft: '0.5rem',
                    paddingRight: '2rem'
                }}
            >
                <div className="row g-0">
                    <div className="col-1 p-2 d-flex flex-row align-items-center justify-content-center">
                        <h4>{num}</h4>
                    </div>
                    <div className="col-4 p-2 d-flex flex-row align-items-center justify-content-center">
                        <img
                            className="image-rank-logo"
                            src={logo}
                            alt={Team}
                        />
                    </div>
                    <div className="col-7 justify-content-start d-flex flex-row align-items-center">
                        <div className="card-body d-flex flex-row">
                            <h6 className="card-title me-2">
                                {Team} | {standings && standings.ConferenceName}
                            </h6>
                            <p className="card-text">
                                {description}{' '}
                                <small className="ms-1 text-body-secondary">
                                    {Votes} Votes {`(${No1Votes})`}
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CollegePollModal = ({
    currentUser,
    timestamp,
    isCFB,
    seasonOptions
}) => {
    const header = `Official College ${isCFB ? 'Football' : 'Basketball'} Poll`;
    const modalId = `collegePollModal`;
    const _pollService = isCFB ? new FBAPollService() : new BBAPollService();
    const [season, setSeason] = useState(null);
    const [week, setWeek] = useState(null);
    const [weekOptions] = useState(() => {
        const weeksForm = [];
        for (let i = 0; i <= 21; i++) {
            weeksForm.push({ label: i, value: i });
        }
        return weeksForm;
    });
    const [isLoading, setIsLoading] = useState(true);
    const [currentPoll, setCurrentPoll] = useState([]);
    const [officialPolls, setOfficialPolls] = useState([]);
    const [standingsMap, setStandingsMap] = useState(null);

    useEffect(() => {
        if (timestamp && officialPolls.length === 0) {
            const obj = {
                label: timestamp.Season,
                value: isCFB ? timestamp.CollegeSeasonID : timestamp.SeasonID
            };
            setSeason(() => obj);
        } else if (timestamp && officialPolls.length > 0) {
            const obj = {
                label: timestamp.CollegeWeek,
                value: timestamp.CollegeWeek
            };
            setWeek(() => obj);
        }
    }, [timestamp, officialPolls]);

    useEffect(() => {
        if (week) {
            const { value } = week;
            GetPollByWeek(value);
        }
    }, [week]);

    useEffect(() => {
        if (season) {
            const { value } = season;
            GetOfficialPollData(value);
        }
    }, [season]);

    const GetOfficialPollData = async (seasonID) => {
        const res = await _pollService.GetOfficialPollData(seasonID);
        if (res) {
            const sortedStandings = res.Standings.sort((a, b) =>
                a.TeamName.localeCompare(b.TeamName)
            );
            const teamMap = {};
            for (let i = 0; i < sortedStandings.length; i++) {
                const stand = sortedStandings[i];
                teamMap[stand.TeamID] = stand;
            }

            setOfficialPolls(() => [...res.OfficialPolls]);
            setStandingsMap(() => teamMap);
        }
    };

    const GetPollByWeek = (week) => {
        const polls = [...officialPolls];
        const pollIdx = polls.findIndex((x) => x.Week === Number(week));
        const pollArr = [];
        if (pollIdx > -1) {
            for (let i = 1; i <= 25; i++) {
                const obj = {};
                obj[`Team`] = polls[pollIdx][`Rank${i}`];
                obj[`TeamID`] = polls[pollIdx][`Rank${i}ID`];
                obj[`Votes`] = polls[pollIdx][`Rank${i}Votes`];
                obj[`No1Votes`] = polls[pollIdx][`Rank${i}No1Votes`];
                pollArr.push(obj);
            }
        }
        setCurrentPoll(() => pollArr);
        setIsLoading(() => false);
    };

    const ChangeSeason = (options) => {
        const opts = { label: options.label, value: options.value };
        setOfficialPolls(() => []);
        setIsLoading(() => true);
        setSeason(() => opts);
    };

    const ChangeWeek = (options) => {
        const opts = { label: options.label, value: options.value };
        setIsLoading(() => true);
        setWeek(() => opts);
    };

    return (
        <OfficialPollModal id={modalId} header={header}>
            {!isLoading && (
                <>
                    <div className="row mb-2">
                        <div className="col-md-auto col-auto">
                            <h5 className="text-start align-middle">Season</h5>
                            <Select
                                options={seasonOptions}
                                isMulti={false}
                                className="basic-multi-select btn-dropdown-width-poll z-index-6"
                                classNamePrefix="select"
                                onChange={ChangeSeason}
                            />
                        </div>
                        <div className="col-md-auto col-auto">
                            <h5 className="text-start align-middle">Week</h5>
                            <Select
                                options={weekOptions}
                                isMulti={false}
                                className="basic-multi-select btn-dropdown-width-poll"
                                classNamePrefix="select"
                                onChange={ChangeWeek}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-auto ms-start d-flex flex-row">
                            <h5 className="me-2">
                                Current Season: {season.label}
                            </h5>
                            <h5>Current Week: {week.label}</h5>
                        </div>
                    </div>
                    {currentPoll.map((x, idx) => (
                        <RankRow
                            key={`row-${idx}`}
                            row={x}
                            idx={idx}
                            standingsMap={standingsMap}
                            retro={currentUser.IsRetro}
                        />
                    ))}
                </>
            )}
        </OfficialPollModal>
    );
};
