import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLogo } from '../../../../../Constants/getLogo';
import url from '../../../../../Constants/url';
import TeamService from '../../../../../_Services/simFBA/TeamService';
import StandingsTableRow from '../standingsTable/standingsTableRow';

const CFBHomepage = ({ currentUser }) => {
    let teamService = new TeamService();
    const [team, setTeam] = React.useState('');
    const [logo, setLogo] = React.useState('');
    const [teamData, setTeamData] = React.useState([]);

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
            const getTeam = async () => {
                let response = await teamService.GetTeamByTeamId(
                    url,
                    currentUser.teamId
                );
                setTeamData(response);
            };
            setTeam(currentUser.team);
            setLogo(getLogo(currentUser.team));
            getTeam();
        }
    }, [currentUser]);

    const standingsRow = standingsRecords.map((x, i) => {
        return <StandingsTableRow key={x.team} record={x} rank={i + 1} />;
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
                        {teamData ? teamData.Current_Conference : ''}, North
                        Division
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
                        <h3 className="text-start">2021, Bowl Season</h3>
                    </div>
                    <div className="row">
                        <h4 className="text-start">Previous Week</h4>
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
                    </div>
                    <div className="row mt-2">
                        <h4 className="text-start">Current Week</h4>
                        <table class="table jumbotron-shadow rounded-3">
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
                    </div>
                    <div className="row mt-3">
                        <div className="btn-group">
                            <button
                                type="button"
                                class="btn btn-primary btn-md me-2 shadow"
                            >
                                Gameplan
                            </button>
                            <button
                                type="button"
                                class="btn btn-primary btn-md me-2 shadow"
                            >
                                Depth Chart
                            </button>
                            <button
                                type="button"
                                class="btn btn-primary btn-md me-2 shadow"
                            >
                                Recruiting
                            </button>
                            <button
                                type="button"
                                class="btn btn-primary btn-md shadow"
                            >
                                Stats
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-3 ms-md-auto">
                    <div className="row justify-content-start">
                        <h3 className="text-start">Standings</h3>
                        <table class="table jumbotron-shadow rounded-3">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(CFBHomepage);
