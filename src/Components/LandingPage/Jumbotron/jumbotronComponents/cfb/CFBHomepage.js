import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogo } from '../../../../../Constants/getLogo';
import routes from '../../../../../Constants/routes';
import { setCFBTeam } from '../../../../../Redux/cfbTeam/cfbTeam.actions';
import FBATeamService from '../../../../../_Services/simFBA/FBATeamService';
import StandingsTableRow from '../standingsTable/standingsTableRow';

const CFBHomepage = ({ currentUser, cfbTeam }) => {
    let teamService = new FBATeamService();
    const dispatch = useDispatch();
    const [team, setTeam] = React.useState('');
    const [logo, setLogo] = React.useState('');
    const [teamData, setTeamData] = React.useState(null);
    const [teamColors, setTeamColors] = React.useState('');
    const [previousMatches, setPreviousMatches] = React.useState([]);
    const [currentMatches, setCurrentMatches] = React.useState([]);
    const [standings, setStandings] = React.useState([]);

    const standingsRecords = [
        {
            team: 'Washington State',
            conferenceWins: 9,
            conferenceLosses: 0,
            totalWins: 13,
            totalLosses: 0
        },
        {
            team: 'Oregon',
            conferenceWins: 7,
            conferenceLosses: 2,
            totalWins: 10,
            totalLosses: 2
        },
        {
            team: 'California',
            conferenceWins: 6,
            conferenceLosses: 3,
            totalWins: 9,
            totalLosses: 3
        },
        {
            team: 'Stanford',
            conferenceWins: 5,
            conferenceLosses: 4,
            totalWins: 8,
            totalLosses: 4
        },
        {
            team: 'Oregon State',
            conferenceWins: 4,
            conferenceLosses: 5,
            totalWins: 7,
            totalLosses: 5
        },
        {
            team: 'Washington',
            conferenceWins: 0,
            conferenceLosses: 9,
            totalWins: 0,
            totalLosses: 12
        }
    ];

    // Get Team call
    useEffect(() => {
        if (currentUser) {
            setTeam(currentUser.team);
            setLogo(getLogo(currentUser.team));
        }
        if (!cfbTeam) {
            getTeam();
        } else {
            setTeamData(cfbTeam);
        }
    }, [currentUser, cfbTeam]);

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

    const standingsRow = standingsRecords.map((x, i) => {
        return <StandingsTableRow key={x.TeamName} record={x} rank={i + 1} />;
    });

    return (
        <div>
            <div className="row mt-2">
                <div className="col-md-auto justify-content-start">
                    <h2>{team}</h2>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
            </div>
            <div className="row mt-2">
                <div className="col-md-auto col-sm justify-content-start">
                    <h3>
                        {teamData ? `${teamData.Conference} Conference` : ''},
                        {teamData && teamData.DivisionID > 0
                            ? ` ${teamData.Division} Division`
                            : ''}
                    </h3>
                </div>
                <div className="col-md-auto"></div>
                <div className="col-3"></div>
            </div>
            <div className="row mt-2">
                <div className="col-md-auto">
                    <div className="image me-2">
                        <img src={logo} alt="Go Cougs" />
                    </div>
                </div>
                <div className="col-md-auto">
                    <div className="row justify-content-start">
                        <h3 className="text-start">2021, Bowl Season</h3>
                    </div>
                    <div className="row">
                        <h4 className="text-start">Previous Week</h4>
                        {previousMatches.length > 0 ? (
                            <table class="table jumbotron-shadow rounded-3">
                                <thead>
                                    <tr>
                                        <th scope="col">Game</th>
                                        <th scope="col">Home Team</th>
                                        <th scope="col">Home Points</th>
                                        <th scope="col">Away Points</th>
                                        <th scope="col">Away Team</th>
                                        <th scope="col">Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-danger">
                                        <th scope="row">A</th>
                                        <td>Washington State</td>
                                        <td>41</td>
                                        <td>42</td>
                                        <td>Michigan</td>
                                        <td>L</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <div className="alert alert-light" role="alert">
                                No games played last week.
                            </div>
                        )}
                    </div>
                    <div className="row mt-2">
                        <h4 className="text-start">Current Week</h4>

                        {currentMatches.length > 0 ? (
                            <table className="table jumbotron-shadow rounded-3">
                                <thead>
                                    <tr>
                                        <th scope="col">Game</th>
                                        <th scope="col">Home Team</th>
                                        <th scope="col"></th>
                                        <th scope="col">Away Team</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">A</th>
                                        <td>Alabama</td>
                                        <td>vs</td>
                                        <td>Washington State</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <div className="alert alert-light" role="alert">
                                No games played this week.
                            </div>
                        )}
                    </div>
                    <div className="row mt-3">
                        <div className="btn-group">
                            <Link
                                to={routes.CFB_GAMEPLAN}
                                role="button"
                                class="btn btn-primary btn-md me-2 shadow"
                                style={teamColors ? teamColors : {}}
                            >
                                Gameplan
                            </Link>

                            <Link
                                to={routes.DEPTHCHART}
                                role="button"
                                class="btn btn-primary btn-md me-2 shadow"
                                style={teamColors ? teamColors : {}}
                            >
                                Depth Chart
                            </Link>
                            <button
                                type="button"
                                className="btn btn-primary btn-md me-2 shadow"
                                style={teamColors ? teamColors : {}}
                            >
                                Recruiting
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
                </div>
                <div className="col-md-auto ms-md-auto">
                    <div className="row justify-content-start">
                        <h3 className="text-start">Standings</h3>
                        {standings.length > 0 ? (
                            <table className="table jumbotron-shadow rounded-3">
                                <thead>
                                    <tr>
                                        <th scope="col">Rank</th>
                                        <th scope="col">Team</th>
                                        <th scope="col">Conf Wins</th>
                                        <th scope="col">Conf Losses</th>
                                        <th scope="col">Total Wins</th>
                                        <th scope="col me-2">Total Losses</th>
                                    </tr>
                                </thead>
                                <tbody>{standingsRow}</tbody>
                            </table>
                        ) : (
                            <div className="alert alert-light" role="alert">
                                To be implemented soon...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser }, cfbTeam: { cfbTeam } }) => ({
    currentUser,
    cfbTeam
});

export default connect(mapStateToProps)(CFBHomepage);
