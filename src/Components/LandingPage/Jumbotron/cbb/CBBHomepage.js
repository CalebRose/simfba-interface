import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogo } from '../../../../Constants/getLogo';
import routes from '../../../../Constants/routes';
import BBATeamService from '../../../../_Services/simNBA/BBATeamService';
import { setCBBTeam } from '../../../../Redux/cbbTeam/cbbTeam.actions';
import { useMediaQuery } from 'react-responsive';
import StandingsCard from '../../../BBA/Schedule/StandingsModalCard';
import { Spinner } from '../../../_Common/Spinner';
import BBAMatchService from '../../../../_Services/simNBA/BBAMatchService';
import { BBAMatchCard } from '../../../_Common/BBAMatchCard';
import BBANewsService from '../../../../_Services/simNBA/BBANewsService';
import { NewsLogSmall } from '../../../_Common/NewsLog';

const CBBHomePage = ({ currentUser, cbbTeam, cbb_Timestamp }) => {
    let _teamService = new BBATeamService();
    let _matchService = new BBAMatchService();
    const _newsService = new BBANewsService();
    const dispatch = useDispatch();
    const [team, setTeam] = useState('');
    const [teamName, setTeamName] = useState('');
    const [logo, setLogo] = useState('');
    const [matches, setMatches] = useState([]);
    const [viewableMatches, setViewableMatches] = useState([]);
    const [newsFeed, setNewsFeed] = useState([]);
    const [standings, setStandings] = useState([]);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:845px)` });

    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    useEffect(() => {
        if (currentUser) {
            setTeamName(() => currentUser.cbb_team);
            setLogo(() => getLogo(currentUser.cbb_abbr));
        }
        if (!cbbTeam) {
            GetTeam();
        } else {
            if (!team) {
                setTeam(() => cbbTeam);
            }
        }
        if (cbb_Timestamp && cbbTeam) {
            GetConferenceStandings();
            GetMatches();
            getPersonalizedNewsFeed();
        }
    }, [currentUser, cbbTeam, cbb_Timestamp]);

    useEffect(() => {
        if (
            cbb_Timestamp &&
            cbb_Timestamp.CollegeWeek > -1 &&
            matches &&
            matches.length > 0
        ) {
            const currentWeek = cbb_Timestamp.CollegeWeek;
            let latestMatch = '';
            if (!cbb_Timestamp.GamesARan) {
                latestMatch = 'A';
            } else if (!cbb_Timestamp.GamesBRan) {
                latestMatch = 'B';
            }
            let prevWeek = currentWeek - 1;
            let nextWeek = currentWeek + 2;
            let prevIdx = 0;
            let nextIdx = 0;
            if (prevWeek < 0) {
                nextWeek = nextWeek - prevWeek;
                prevWeek = 0;
            }
            prevIdx = matches.findIndex(
                (x) => x.Week === prevWeek && x.MatchOfWeek === latestMatch
            );
            nextIdx = matches.findIndex(
                (x) => x.Week === nextWeek && x.MatchOfWeek === latestMatch
            );
            while (prevIdx === -1) {
                prevWeek += 1;
                prevIdx = matches.findIndex(
                    (x) => x.Week === prevWeek && x.MatchOfWeek === latestMatch
                );
            }
            while (nextIdx === -1) {
                nextWeek -= 1;
                nextIdx = matches.findIndex(
                    (x) => x.Week === nextWeek && x.MatchOfWeek === latestMatch
                );
            }

            let gameRange = matches.slice(prevIdx, nextIdx + 1);
            setViewableMatches(() => gameRange);
        }
    }, [cbb_Timestamp, matches]);

    const GetMatches = async () => {
        const res = await _matchService.GetCBBMatchesByTeamAndSeason(
            cbbTeam.ID,
            cbb_Timestamp.SeasonID
        );

        setMatches(() => res);
    };

    const GetTeam = async () => {
        let response = await _teamService.GetTeamByTeamId(currentUser.cbb_id);
        setTeam(() => response);
        dispatch(setCBBTeam(response));
    };

    const GetConferenceStandings = async () => {
        const res = await _teamService.GetTeamStandingsByConferenceID(
            cbbTeam.ConferenceID,
            cbb_Timestamp.SeasonID
        );

        setStandings(() => res);
    };

    const getPersonalizedNewsFeed = async () => {
        let res = await _newsService.GetPersonalizedNewsFeed(
            'CBB',
            currentUser.cbb_id
        );

        setNewsFeed(() => res);
    };

    return (
        <>
            <div className="row mt-2">
                <div className="col-auto justify-content-start">
                    <h2>
                        <img
                            className="landing-image"
                            src={logo}
                            alt="Go Cougs"
                        />{' '}
                        {teamName}
                    </h2>
                </div>
                <div className="col-auto">
                    <h2 className="text-start">
                        {cbb_Timestamp && cbb_Timestamp.Season}, Week{' '}
                        {cbb_Timestamp && cbb_Timestamp.CollegeWeek}
                    </h2>
                </div>
                <div className="col-auto justify-content-start">
                    <h2>{team && `${team.Conference} Conference`}</h2>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4">
                    <div className="row mt-2 mb-2">
                        <div className="btn-group btn-group-sm d-flex">
                            <Link
                                to={routes.CBB_TEAM}
                                role="button"
                                className="btn btn-primary btn-sm me-2 shadow"
                            >
                                Roster
                            </Link>
                            <Link
                                to={routes.CBB_GAMEPLAN}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                            >
                                Gameplan
                            </Link>
                            <Link
                                to={routes.CBB_RECRUITING}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                            >
                                Recruit
                            </Link>
                            <Link
                                to={routes.CBB_SCHEDULE}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                            >
                                Schedule
                            </Link>
                            <Link
                                to={routes.CBB_STATS}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                            >
                                Stats
                            </Link>
                        </div>
                    </div>
                    {viewableMatches && viewableMatches.length > 0 ? (
                        viewableMatches.map((x) => {
                            return (
                                <div className="row landing-page-row">
                                    <BBAMatchCard
                                        game={x}
                                        team={cbbTeam}
                                        isNBA={false}
                                        timestamp={cbb_Timestamp}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="row landing-page-row">
                            <div className="card text-dark bg-light mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Loading...</h5>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-md-8">
                    <div className="row justify-content-start ms-1">
                        {standings && standings.length > 0 ? (
                            <>
                                <div
                                    className={
                                        isMobile
                                            ? 'mobile-card-viewer'
                                            : 'desktop-display'
                                    }
                                >
                                    <StandingsCard standings={standings} />
                                    <div className="cbb-news-feed">
                                        {newsFeed.length > 0 &&
                                            newsFeed.map((x) => (
                                                <NewsLogSmall
                                                    key={x.ID}
                                                    news={x}
                                                    season={
                                                        cbb_Timestamp.Season
                                                    }
                                                />
                                            ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="row justify-content-center pt-2 mt-4 mb-2">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
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

export default connect(mapStateToProps)(CBBHomePage);
