import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { getLogo } from '../../../../../Constants/getLogo';
import routes from '../../../../../Constants/routes';
import { setCBBTeam } from '../../../../../Redux/cbbTeam/cbbTeam.actions';
import { setCFBTeam } from '../../../../../Redux/cfbTeam/cfbTeam.actions';
import FBAScheduleService from '../../../../../_Services/simFBA/FBAScheduleService';
import FBATeamService from '../../../../../_Services/simFBA/FBATeamService';
import BBATeamService from '../../../../../_Services/simNBA/BBATeamService';
import StandingsMobileRow from '../standingsTable/StandingsMobileRow';
import StandingsTableRow from '../standingsTable/standingsTableRow';
import CFBMatchCard from './CFBMatchCard';

const CFBHomepage = ({ currentUser, cfbTeam, cfb_Timestamp }) => {
    let teamService = new FBATeamService();
    let _scheduleService = new FBAScheduleService();
    let _teamService = new BBATeamService();
    const dispatch = useDispatch();
    const [team, setTeam] = React.useState('');
    const [logo, setLogo] = React.useState('');
    const [teamData, setTeamData] = React.useState(null);
    const [teamColors, setTeamColors] = React.useState('');
    const [previousMatch, setPreviousMatch] = React.useState(null);
    const [currentMatch, setCurrentMatch] = React.useState(null);
    const [nextMatch, setNextMatch] = React.useState(null);
    const [games, setGames] = React.useState([]);
    const [standings, setStandings] = React.useState([]);
    const [secondStandings, setSecondStandings] = React.useState(null);
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:845px)` });
    const [previousMatchLabel, setPreviousMatchLabel] = React.useState('');
    // For mobile
    React.useEffect(() => {
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
        if (currentUser.cbb_team.length > 0 || currentUser.cbb_id > 0) {
            GetCBBTeam();
        }
        if (!cfbTeam) {
            getTeam();
        } else {
            if (!teamData) {
                setTeamData(cfbTeam);
            }
        }
        if (cfb_Timestamp !== null) {
            let prevLabel = '';
            if (cfb_Timestamp.CollegeWeek - 1 === -1) {
                prevLabel = 'Off Season';
            } else {
                prevLabel = `Week ${cfb_Timestamp.CollegeWeek - 1}: Bye Week`;
            }
            setPreviousMatchLabel(prevLabel);
            // GetNewsLogs();
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
            const prevWeek = currentWeek - 1;
            const nextWeek = currentWeek + 1;
            let prevGame = null;
            let currGame = null;
            let nextGame = null;
            if (prevWeek > -1) {
                let prevIdx = games.findIndex((x) => x.Week === prevWeek);
                if (prevIdx > -1) {
                    prevGame = games[prevIdx];
                }
            }
            let currIdx = games.findIndex((x) => x.Week === currentWeek);
            if (currIdx > -1) {
                currGame = games[currIdx];
            }
            let nextIdx = games.findIndex((x) => x.Week === nextWeek);
            if (nextIdx > -1) {
                nextGame = games[nextIdx];
            }
            setPreviousMatch((x) => prevGame);
            setCurrentMatch((x) => currGame);
            setNextMatch((x) => nextGame);
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

    const GetCBBTeam = async () => {
        let response = await _teamService.GetTeamByTeamId(currentUser.cbb_id);
        dispatch(setCBBTeam(response));
    };

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

        if (cfbTeam.DivisionID === 0) {
            setStandings(res);
        } else {
            const division1Standings = res.filter(
                (x) => x.DivisionID === cfbTeam.DivisionID
            );
            const division2Standings = res.filter(
                (x) => x.DivisionID !== cfbTeam.DivisionID
            );
            setStandings((x) => division1Standings);
            setSecondStandings((x) => division2Standings);
        }
    };

    const GetGames = async () => {
        const res = await _scheduleService.GetCollegeGamesByTeamAndSeason(
            cfbTeam.ID,
            cfb_Timestamp.CollegeSeasonID
        );

        setGames(res);
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
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
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
                                    <Link
                                        to={routes.NEWS}
                                        type="button"
                                        className="btn btn-primary btn-sm me-2 shadow"
                                        style={teamColors ? teamColors : {}}
                                    >
                                        News
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

                    {cfb_Timestamp !== null && previousMatch !== null ? (
                        <div className="row">
                            <CFBMatchCard
                                game={previousMatch}
                                team={cfbTeam}
                                currentWeek={cfb_Timestamp.CollegeWeek}
                            />
                        </div>
                    ) : (
                        <div className="row">
                            <div className="card text-dark bg-light mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {previousMatchLabel}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    )}
                    {cfb_Timestamp !== null && currentMatch !== null ? (
                        <div className="row mt-1">
                            <CFBMatchCard
                                game={currentMatch}
                                team={cfbTeam}
                                currentWeek={cfb_Timestamp.CollegeWeek}
                            />
                        </div>
                    ) : (
                        <div className="row">
                            <div className="card text-dark bg-light mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {cfb_Timestamp &&
                                        cfb_Timestamp.CollegeWeek > -1
                                            ? `Week ${cfb_Timestamp.CollegeWeek}: Bye Week`
                                            : 'Bye Week'}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    )}
                    {cfb_Timestamp !== null && nextMatch !== null ? (
                        <div className="row mt-1">
                            <CFBMatchCard
                                game={nextMatch}
                                team={cfbTeam}
                                currentWeek={cfb_Timestamp.CollegeWeek}
                            />
                        </div>
                    ) : (
                        <div className="row">
                            <div className="card text-dark bg-light mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {cfb_Timestamp &&
                                        cfb_Timestamp.CollegeWeek + 1 === 21
                                            ? 'Off Season'
                                            : `Week ${
                                                  cfb_Timestamp &&
                                                  cfb_Timestamp.CollegeWeek + 1
                                              }: Bye Week`}
                                    </h5>
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
                        <h3 className="text-start">Conference Standings</h3>

                        {standings && standings.length > 0 ? (
                            <>
                                {isMobile ? (
                                    <div className="mobile-card-viewer">
                                        {standings.map((x, i) => {
                                            return (
                                                <StandingsMobileRow
                                                    key={x.TeamName}
                                                    record={x}
                                                    rank={i + 1}
                                                    secondDivision={false}
                                                />
                                            );
                                        })}
                                        {secondStandings &&
                                            secondStandings.map((x, i) => {
                                                return (
                                                    <StandingsMobileRow
                                                        key={x.TeamName}
                                                        record={x}
                                                        rank={i + 1}
                                                        secondDivision={true}
                                                    />
                                                );
                                            })}
                                    </div>
                                ) : (
                                    <>
                                        <div className="row">
                                            <div className="col-sm-1">
                                                <h6>Rank</h6>
                                            </div>
                                            <div className="col-sm-3">
                                                <h6>Team</h6>
                                            </div>
                                            <div className="col-sm-2">
                                                <h6>Conf Wins</h6>
                                            </div>
                                            <div className="col-sm-2">
                                                <h6>Conf Losses</h6>
                                            </div>
                                            <div className="col-sm-1">
                                                <h6>Total Wins</h6>
                                            </div>
                                            <div className="col-sm-1">
                                                <h6>Total Losses</h6>
                                            </div>
                                        </div>
                                        {standings.map((x, i) => {
                                            return (
                                                <StandingsTableRow
                                                    key={x.TeamName}
                                                    record={x}
                                                    rank={i + 1}
                                                    secondDivision={false}
                                                />
                                            );
                                        })}
                                        {secondStandings &&
                                            secondStandings.map((x, i) => {
                                                return (
                                                    <StandingsTableRow
                                                        key={x.TeamName}
                                                        record={x}
                                                        rank={i + 1}
                                                        secondDivision={true}
                                                    />
                                                );
                                            })}
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="row justify-content-center pt-2 mt-4 mb-2">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
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
