import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { getLogo } from '../../../../Constants/getLogo';
import routes from '../../../../Constants/routes';
import { setNFLTeam } from '../../../../Redux/nflTeam/nflTeam.actions';
import FBAScheduleService from '../../../../_Services/simFBA/FBAScheduleService';
import FBATeamService from '../../../../_Services/simFBA/FBATeamService';
import NFLStandingsCard from '../../../_Common/NFLStandingsModalCard';
import { Spinner } from '../../../_Common/Spinner';
import CFBMatchCard from '../cfb/CFBMatchCard';

const NFLHomepage = ({ currentUser, nflTeam, cfb_Timestamp }) => {
    let _teamService = new FBATeamService();
    let _scheduleService = new FBAScheduleService();
    const dispatch = useDispatch();
    const [team, setTeam] = React.useState('');
    const [logo, setLogo] = React.useState('');
    const [teamData, setTeamData] = React.useState(null);
    const [teamColors, setTeamColors] = React.useState('');
    const [games, setGames] = React.useState(null);
    const [viewableMatches, setViewableMatches] = React.useState(null);
    const [standings, setStandings] = React.useState([]);
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:845px)` });

    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    useEffect(() => {
        if (currentUser) {
            setTeam(currentUser.NFLTeam);
            setLogo(getLogo(currentUser.NFLTeam));
        }
        if (!nflTeam) {
            getTeam();
        } else {
            if (!teamData) {
                setTeamData(() => nflTeam);
            }
        }
        if (cfb_Timestamp && nflTeam) {
            GetDivisionStandings();
            GetGames();
        }
    }, [currentUser, nflTeam, cfb_Timestamp]);

    useEffect(() => {
        if (teamData) {
            const colors = {
                color: '#fff',
                backgroundColor:
                    teamData && teamData.ColorOne
                        ? teamData.ColorOne
                        : '#6c757d',
                borderColor:
                    teamData && teamData.ColorOne
                        ? teamData.ColorOne
                        : '#6c757d'
            };
            setTeamColors(colors);
        }
    }, [teamData]);

    useEffect(() => {
        if (
            cfb_Timestamp &&
            cfb_Timestamp.NFLWeek > -1 &&
            games &&
            games.length > 0
        ) {
            const currentWeek = cfb_Timestamp.NFLWeek;
            let prevWeek = currentWeek - 1;
            let nextWeek = currentWeek + 1;
            let prevIdx = 0;
            let nextIdx = 0;
            if (prevWeek < 0) {
                nextWeek = nextWeek - prevWeek;
                prevWeek = 0;
            }
            prevIdx = games.findIndex((x) => x.Week === prevWeek);
            nextIdx = games.findIndex((x) => x.Week === nextWeek);

            let gameRange = games.slice(prevIdx, nextIdx);
            setViewableMatches(() => gameRange);
        }
    }, [cfb_Timestamp, games]);

    const getTeam = async () => {
        let response = await _teamService.GetNFLTeamByTeamID(
            currentUser.NFLTeamID
        );
        setTeamData(() => response);
        dispatch(setNFLTeam(response));
    };

    const GetDivisionStandings = async () => {
        const res = await _teamService.GetNFLTeamStandingsByDivision(
            nflTeam.DivisionID,
            cfb_Timestamp.NFLSeasonID
        );

        setStandings(() => res);
    };

    const GetGames = async () => {
        const res = await _scheduleService.GetNFLGamesByTeamAndSeason(
            nflTeam.ID,
            cfb_Timestamp.NFLSeasonID
        );

        setGames(() => res);
    };

    return (
        <div>
            <div className="row mt-2">
                <div className="col-md-auto justify-content-start">
                    <h2>{team}</h2>
                </div>
                <div className="col-4">
                    <h2 className="text-start">
                        {cfb_Timestamp ? cfb_Timestamp.Season : ''}, Week{' '}
                        {cfb_Timestamp !== null &&
                        cfb_Timestamp.NFLWeek !== null
                            ? cfb_Timestamp.NFLWeek
                            : ''}
                    </h2>
                </div>
                <div className="col-md-auto justify-content-start">
                    {teamData ? (
                        <h2 className="">
                            {`${teamData.Conference} Conference ${
                                teamData.Division.length > 0
                                    ? `, ${teamData.Division} Division`
                                    : ''
                            }`}
                        </h2>
                    ) : (
                        <div className="row justify-content-center pt-2 mt-4 mb-2">
                            <Spinner />
                        </div>
                    )}
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-2">
                    <div className="image me-2">
                        <img src={logo} alt="Go Cougs" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="row mt-3 mb-2">
                        <div className="btn-group">
                            <Link
                                to={routes.NFL_ROSTER}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                                style={teamColors ? teamColors : {}}
                            >
                                Team
                            </Link>
                            <Link
                                to={routes.NFL_GAMEPLAN}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                                style={teamColors ? teamColors : {}}
                            >
                                Gameplan
                            </Link>
                            <Link
                                to={routes.NFL_DEPTHCHART}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                                style={teamColors ? teamColors : {}}
                            >
                                Depth Chart
                            </Link>
                            <Link
                                to={routes.NFL_FREE_AGENCY}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                                style={teamColors ? teamColors : {}}
                            >
                                Free Agency
                            </Link>
                            <button
                                type="button"
                                className="btn btn-primary btn-md me-2 shadow"
                                style={teamColors ? teamColors : {}}
                            >
                                Schedule
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary btn-md shadow"
                                style={teamColors ? teamColors : {}}
                            >
                                Stats
                            </button>
                        </div>
                    </div>
                    {viewableMatches && viewableMatches.length > 0 ? (
                        viewableMatches.map((x) => {
                            return (
                                <div className="row">
                                    <CFBMatchCard
                                        game={x}
                                        team={nflTeam}
                                        currentWeek={cfb_Timestamp.NFLWeek}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="row">
                            <div className="card text-dark bg-light mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Someone please get me next year's NFL
                                        schedule so we can get that and
                                        pre-season games in.
                                    </h5>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    {standings && standings.length > 0 ? (
                        <>
                            {isMobile ? (
                                <div className="mobile-card-viewer">
                                    <NFLStandingsCard standings={standings} />
                                </div>
                            ) : (
                                <>
                                    <NFLStandingsCard standings={standings} />
                                </>
                            )}
                        </>
                    ) : (
                        <div className="row justify-content-center pt-2 mt-4 mb-2">
                            <Spinner />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    nflTeam: { nflTeam },
    timestamp: { cfb_Timestamp }
}) => ({
    currentUser,
    nflTeam,
    cfb_Timestamp
});

export default connect(mapStateToProps)(NFLHomepage);
