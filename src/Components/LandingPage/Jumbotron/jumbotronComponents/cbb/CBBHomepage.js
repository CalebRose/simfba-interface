import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogo } from '../../../../../Constants/getLogo';
import routes from '../../../../../Constants/routes';
import BBATeamService from '../../../../../_Services/simNBA/BBATeamService';
import StandingsTableRow from '../standingsTable/standingsTableRow';
import SimBBA_url from '../../../../../Constants/SimBBA_url';

const CBBHomePage = ({ currentUser }) => {
    let teamService = new BBATeamService();
    const [team, setTeam] = React.useState('');
    const [teamName, setTeamName] = React.useState('');
    const [logo, setLogo] = React.useState('');
    const [previousMatches, setPreviousMatches] = React.useState([]);
    const [currentMatches, setCurrentMatches] = React.useState([]);
    const [standings, setStandings] = React.useState([]);

    useEffect(() => {
        if (currentUser) {
            const getTeamRecord = async () => {
                let response = await teamService.GetTeamByTeamId(
                    SimBBA_url,
                    currentUser.cbb_id
                );
                setTeam(response);
            };
            setTeamName(currentUser.cbb_team);
            setLogo(getLogo(currentUser.cbb_team));
            getTeamRecord();
        }
    }, [currentUser]);

    const standingsRecords = [
        {
            team: 'Washington State',
            conferenceWins: 16,
            conferenceLosses: 0,
            totalWins: 24,
            totalLosses: 0
        },
        {
            team: "Saint Mary's",
            conferenceWins: 11,
            conferenceLosses: 5,
            totalWins: 16,
            totalLosses: 8
        },
        {
            team: 'New Mexico',
            conferenceWins: 10,
            conferenceLosses: 6,
            totalWins: 16,
            totalLosses: 8
        },
        {
            team: 'UC Irvine',
            conferenceWins: 9,
            conferenceLosses: 7,
            totalWins: 16,
            totalLosses: 8
        },
        {
            team: 'San Diego',
            conferenceWins: 8,
            conferenceLosses: 8,
            totalWins: 14,
            totalLosses: 10
        },
        {
            team: 'Oregon',
            conferenceWins: 6,
            conferenceLosses: 10,
            totalWins: 7,
            totalLosses: 17
        },
        {
            team: 'Seattle',
            conferenceWins: 1,
            conferenceLosses: 15,
            totalWins: 3,
            totalLosses: 21
        },
        {
            team: 'Portland',
            conferenceWins: 0,
            conferenceLosses: 16,
            totalWins: 0,
            totalLosses: 24
        }
    ];

    const standingsRow = standingsRecords.map((x, i) => {
        return <StandingsTableRow key={x.team} record={x} rank={i + 1} />;
    });
    return (
        <div>
            <div className="row mt-2">
                <div className="col-md-auto justify-content-start">
                    <h2>{teamName}</h2>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
            </div>
            <div className="row mt-2">
                <div className="col-md-auto col-sm justify-content-start">
                    <h3>
                        {team ? `${team.Conference} Conference` : ''},
                        {team ? `${team.Division} Division` : ''}
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
                <div className="col-6">
                    <div className="row justify-content-start">
                        <h3 className="text-start">2021, Week 1</h3>
                    </div>
                    <div className="row">
                        <h4 className="text-start">Previous Week</h4>
                        {previousMatches.length > 0 ? (
                            <table className="table jumbotron-shadow rounded-3">
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
                                <tbody></tbody>
                            </table>
                        ) : (
                            <div class="alert alert-light" role="alert">
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
                                        <td>New Mexico</td>
                                        <td>vs</td>
                                        <td>Washington State</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">B</th>
                                        <td>Washington State</td>
                                        <td>vs</td>
                                        <td>USC</td>
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
                            <Link to={routes.CBB_GAMEPLAN}>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-md me-2 shadow"
                                >
                                    Gameplan
                                </button>
                            </Link>
                            <Link to={routes.CBB_RECRUITING_BOARD}>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-md me-2 shadow"
                                >
                                    Recruiting
                                </button>
                            </Link>
                            <Link to={routes.CBB_STATS}>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-md shadow"
                                >
                                    Stats
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-3 ms-md-auto">
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

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(CBBHomePage);
