import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getLogo } from '../../../../Constants/getLogo';
import { Link } from 'react-router-dom';
import routes from '../../../../Constants/routes';
import BBATeamService from '../../../../_Services/simNBA/BBATeamService';
import { Spinner } from '../../../_Common/Spinner';
import { useMediaQuery } from 'react-responsive';
import { NBAStandingsCard } from '../../../_Common/NBAStandingsCard';
import BBAMatchService from '../../../../_Services/simNBA/BBAMatchService';
import BBANewsService from '../../../../_Services/simNBA/BBANewsService';
import { NewsLogSmall } from '../../../_Common/NewsLog';
import { BBAMatchCard } from '../../../_Common/BBAMatchCard';

const NBAHomePage = ({ currentUser, nbaTeam, cbb_Timestamp }) => {
    const _teamService = new BBATeamService();
    const _matchService = new BBAMatchService();
    const _newsService = new BBANewsService();
    const [teamName, setTeamName] = useState('');
    const [team, setTeam] = useState(false);
    const [logo, setLogo] = useState('');
    const [standings, setStandings] = useState([]);
    const [newsFeed, setNewsFeed] = useState([]);
    const [matches, setMatches] = useState([]);
    const [viewableMatches, setViewableMatches] = useState([]);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:845px)` });

    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    useEffect(() => {
        if (currentUser) {
            setTeamName(currentUser.NBATeam);
            setLogo(getLogo(currentUser.NBATeam, currentUser.IsRetro));
        }
        if (nbaTeam) {
            setTeam(() => nbaTeam);
        }
        if (cbb_Timestamp && nbaTeam) {
            GetConferenceStandings();
            GetMatches();
            getPersonalizedNewsFeed();
        }
    }, [currentUser, nbaTeam, cbb_Timestamp]);

    useEffect(() => {
        if (
            cbb_Timestamp &&
            cbb_Timestamp.NBAWeek > -1 &&
            matches &&
            matches.length > 0
        ) {
            let currentMatchIdx = -1;
            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];
                if (match.GameComplete) continue;
                currentMatchIdx = i;
                break;
            }
            let prevIdx = currentMatchIdx - 2;
            let nextIdx = currentMatchIdx + 2;
            if (prevIdx < 0) {
                prevIdx = 0;
            }
            if (nextIdx >= matches.length) {
                nextIdx = matches.length - 1;
            }

            if (currentMatchIdx === -1) {
                setViewableMatches(() => []);
            } else {
                let gameRange = matches.slice(prevIdx, nextIdx + 1);
                setViewableMatches(() => gameRange.slice(0, 5));
            }
        }
    }, [cbb_Timestamp, matches]);

    const GetConferenceStandings = async () => {
        const res = await _teamService.GetNBAStandingsByConferenceID(
            nbaTeam.ConferenceID,
            cbb_Timestamp.SeasonID
        );

        setStandings(() => res);
    };

    const GetMatches = async () => {
        const res = await _matchService.GetNBAMatchesByTeamAndSeason(
            nbaTeam.ID,
            cbb_Timestamp.SeasonID
        );

        setMatches(() => res);
    };

    const getPersonalizedNewsFeed = async () => {
        let res = await _newsService.GetPersonalizedNewsFeed(
            'NBA',
            currentUser.NBATeamID
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
                            alt="Go Supersonics"
                        />{' '}
                        {teamName}
                    </h2>
                </div>
                <div className="col-auto">
                    <h2 className="text-start">
                        {cbb_Timestamp && cbb_Timestamp.Season}, Week{' '}
                        {cbb_Timestamp && cbb_Timestamp.NBAWeek}
                    </h2>
                </div>
                <div className="col-auto justify-content-start">
                    <h2>
                        {team &&
                            `${team.Conference} Conference, ${team.Division} Division`}
                    </h2>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4">
                    {isMobile ? (
                        <>
                            <div className="row mt-2 mb-2">
                                <div className="btn-group btn-group-sm d-flex">
                                    <Link
                                        to={routes.NBA_ROSTER}
                                        role="button"
                                        className="btn btn-primary btn-sm me-2 shadow"
                                    >
                                        Roster
                                    </Link>
                                    <Link
                                        to={routes.NBA_GAMEPLAN}
                                        role="button"
                                        className="btn btn-primary btn-md me-2 shadow"
                                    >
                                        Gameplan
                                    </Link>
                                    <Link
                                        to={routes.NBA_TRADEBLOCK}
                                        role="button"
                                        className="btn btn-primary btn-md me-2 shadow"
                                    >
                                        Trade
                                    </Link>
                                </div>
                            </div>
                            <div className="row mt-2 mb-2">
                                <div className="btn-group btn-group-sm d-flex">
                                    <Link
                                        to={routes.NBA_FREE_AGENCY}
                                        role="button"
                                        className="btn btn-primary btn-md me-2 shadow"
                                    >
                                        Free Agency
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
                        </>
                    ) : (
                        <>
                            <div className="row mt-2 mb-2">
                                <div className="btn-group btn-group-sm d-flex">
                                    <Link
                                        to={routes.NBA_ROSTER}
                                        role="button"
                                        className="btn btn-primary btn-sm me-2 shadow"
                                    >
                                        Roster
                                    </Link>
                                    <Link
                                        to={routes.NBA_GAMEPLAN}
                                        role="button"
                                        className="btn btn-primary btn-md me-2 shadow"
                                    >
                                        Gameplan
                                    </Link>
                                    <Link
                                        to={routes.NBA_FREE_AGENCY}
                                        role="button"
                                        className="btn btn-primary btn-md me-2 shadow"
                                    >
                                        Free Agency
                                    </Link>
                                    <Link
                                        to={routes.NBA_TRADEBLOCK}
                                        role="button"
                                        className="btn btn-primary btn-md me-2 shadow"
                                    >
                                        Trade
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
                        </>
                    )}
                    {viewableMatches && viewableMatches.length > 0 ? (
                        viewableMatches.map((x) => {
                            return (
                                <div className="row landing-page-row">
                                    <BBAMatchCard
                                        game={x}
                                        team={nbaTeam}
                                        isNBA={true}
                                        timestamp={cbb_Timestamp}
                                        retro={currentUser.IsRetro}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="row landing-page-row">
                            <div className="card text-dark bg-light mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Need to Add Games to DB, please be
                                        patient
                                    </h5>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
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
                                    <NBAStandingsCard
                                        standings={standings}
                                        retro={currentUser.IsRetro}
                                    />
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
    nbaTeam: { nbaTeam },
    timestamp: { cbb_Timestamp }
}) => ({
    currentUser,
    nbaTeam,
    cbb_Timestamp
});

export default connect(mapStateToProps)(NBAHomePage);
