import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { getLogo } from '../../../../Constants/getLogo';
import routes from '../../../../Constants/routes';
import { setCFBTeam } from '../../../../Redux/cfbTeam/cfbTeam.actions';
import FBAScheduleService from '../../../../_Services/simFBA/FBAScheduleService';
import FBATeamService from '../../../../_Services/simFBA/FBATeamService';
import StandingsCard from '../../../BBA/Schedule/StandingsModalCard';
import { Spinner } from '../../../_Common/Spinner';
import CFBMatchCard from './CFBMatchCard';

const CFBHomepage = ({ currentUser, cfbTeam, cfb_Timestamp }) => {
    let teamService = new FBATeamService();
    let _scheduleService = new FBAScheduleService();
    const dispatch = useDispatch();
    const [team, setTeam] = React.useState('');
    const [logo, setLogo] = React.useState('');
    const [teamData, setTeamData] = React.useState(null);
    const [teamColors, setTeamColors] = React.useState('');
    const [viewableMatches, setViewableMatches] = React.useState(null);
    const [games, setGames] = React.useState([]);
    const [standings, setStandings] = React.useState([]);
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:845px)` });
    // For mobile
    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    // Get Team call
    useEffect(() => {
        if (currentUser) {
            setTeam(currentUser.team);
            setLogo(getLogo(currentUser.teamAbbr));
        }
        if (!cfbTeam) {
            getTeam();
        } else {
            if (!teamData) {
                setTeamData(cfbTeam);
            }
        }
        if (cfb_Timestamp && cfbTeam) {
            GetConferenceStandings();
            GetGames();
        }
    }, [currentUser, cfbTeam, cfb_Timestamp]);

    useEffect(() => {
        if (
            cfb_Timestamp &&
            cfb_Timestamp.CollegeWeek > -1 &&
            games &&
            games.length > 0
        ) {
            const currentWeek = cfb_Timestamp.CollegeWeek;
            let prevWeek = isMobile ? currentWeek - 1 : currentWeek - 2;
            let nextWeek = isMobile ? currentWeek + 1 : currentWeek + 2;
            let prevIdx = 0;
            let nextIdx = 0;
            if (prevWeek < 0) {
                nextWeek = nextWeek - prevWeek;
                prevWeek = 0;
            }
            prevIdx = games.findIndex((x) => x.Week === prevWeek);
            nextIdx = games.findIndex((x) => x.Week === nextWeek);
            while (prevIdx === -1) {
                prevWeek += 1;
                prevIdx = games.findIndex((x) => x.Week === prevWeek);
            }
            while (nextIdx === -1) {
                nextWeek -= 1;
                nextIdx = games.findIndex((x) => x.Week === nextWeek);
            }

            let gameRange = games.slice(prevIdx, nextIdx + 1);
            setViewableMatches(() => gameRange);
        }
    }, [cfb_Timestamp, games]);

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

    const getTeam = async () => {
        let response = await teamService.GetTeamByTeamId(currentUser.teamId);
        setTeamData(response);
        dispatch(setCFBTeam(response));
    };

    const GetConferenceStandings = async () => {
        const res = await teamService.GetTeamStandingsByConference(
            cfbTeam.ConferenceID,
            cfb_Timestamp.CollegeSeasonID
        );

        setStandings(() => res);
    };

    const GetGames = async () => {
        const res = await _scheduleService.GetCollegeGamesByTeamAndSeason(
            cfbTeam.ID,
            cfb_Timestamp.CollegeSeasonID
        );

        setGames(() => res);
    };

    return (
        <>
            <div className="row mt-2">
                <div className="col-md-auto justify-content-start">
                    <h2>{team}</h2>
                </div>
                <div className="col-md-4">
                    <h2 className="text-start">
                        {cfb_Timestamp ? cfb_Timestamp.Season : ''}, Week{' '}
                        {cfb_Timestamp !== null &&
                        cfb_Timestamp.CollegeWeek !== null
                            ? cfb_Timestamp.CollegeWeek
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
                        <img
                            className={
                                cfbTeam && cfbTeam.ID === 86
                                    ? 'landing-image-purdue'
                                    : ''
                            }
                            src={logo}
                            alt="Go Cougs"
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    {isMobile ? (
                        <>
                            <div className="row mt-2 mb-2">
                                <div className="btn-group btn-group-sm d-flex">
                                    <Link
                                        to={routes.CFB_GAMEPLAN}
                                        role="button"
                                        className="btn btn-primary btn-sm me-2 shadow"
                                        style={teamColors ? teamColors : {}}
                                    >
                                        Gameplan
                                    </Link>
                                    <Link
                                        to={routes.DEPTHCHART}
                                        role="button"
                                        className="btn btn-primary btn-sm me-2 shadow"
                                        style={teamColors ? teamColors : {}}
                                    >
                                        Depth Chart
                                    </Link>
                                    <Link
                                        to={routes.CFB_RECRUITING}
                                        type="button"
                                        className="btn btn-primary btn-sm me-2 shadow"
                                        style={teamColors ? teamColors : {}}
                                    >
                                        Recruiting
                                    </Link>
                                </div>
                            </div>
                            <div className="row mt-2 mb-2">
                                <div className="btn-group btn-group-sm d-flex">
                                    <Link
                                        to={routes.CFB_STATS}
                                        type="button"
                                        className="btn btn-primary btn-sm me-2 shadow"
                                        style={teamColors ? teamColors : {}}
                                    >
                                        Statistics
                                    </Link>
                                    <Link
                                        to={routes.CFB_SCHEDULE}
                                        type="button"
                                        className="btn btn-primary btn-sm me-2 shadow"
                                        style={teamColors ? teamColors : {}}
                                    >
                                        Schedule
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="row mt-2 mb-2">
                            <div className="btn-group btn-group-sm d-flex">
                                <Link
                                    to={routes.CFB_GAMEPLAN}
                                    role="button"
                                    className="btn btn-primary btn-md me-2 shadow"
                                    style={teamColors ? teamColors : {}}
                                >
                                    Gameplan
                                </Link>
                                <Link
                                    to={routes.DEPTHCHART}
                                    role="button"
                                    className="btn btn-primary btn-md me-2 shadow"
                                    style={teamColors ? teamColors : {}}
                                >
                                    Depth Chart
                                </Link>
                                <Link
                                    to={routes.CFB_RECRUITING}
                                    type="button"
                                    className="btn btn-primary btn-md me-2 shadow"
                                    style={teamColors ? teamColors : {}}
                                >
                                    Recruiting
                                </Link>
                                <Link
                                    to={routes.CFB_STATS}
                                    type="button"
                                    className="btn btn-primary btn-md me-2 shadow"
                                    style={teamColors ? teamColors : {}}
                                >
                                    Statistics
                                </Link>
                                <Link
                                    to={routes.CFB_SCHEDULE}
                                    type="button"
                                    className="btn btn-primary btn-md me-2 shadow"
                                    style={teamColors ? teamColors : {}}
                                >
                                    Schedule
                                </Link>
                                <Link
                                    to={routes.NEWS}
                                    type="button"
                                    className="btn btn-primary btn-md me-2 shadow"
                                    style={teamColors ? teamColors : {}}
                                >
                                    News
                                </Link>
                            </div>
                        </div>
                    )}
                    {viewableMatches && viewableMatches.length > 0 ? (
                        viewableMatches.map((x) => {
                            return (
                                <div className="row">
                                    <CFBMatchCard
                                        game={x}
                                        team={cfbTeam}
                                        currentWeek={cfb_Timestamp.CollegeWeek}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="row">
                            <div className="card text-dark bg-light mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Loading...</h5>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <div
                        className={
                            isMobile
                                ? 'row justify-content-start mt-2 ms-1'
                                : 'row justify-content-start ms-1'
                        }
                    >
                        {standings && standings.length > 0 ? (
                            <>
                                {isMobile ? (
                                    <div className="mobile-card-viewer">
                                        <StandingsCard standings={standings} />
                                    </div>
                                ) : (
                                    <>
                                        <StandingsCard standings={standings} />
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
        </>
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

export default connect(mapStateToProps)(CFBHomepage);
