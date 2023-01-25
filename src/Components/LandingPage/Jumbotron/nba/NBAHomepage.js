import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLogo } from '../../../../Constants/getLogo';

const NBAHomePage = ({ currentUser }) => {
    const [team, setTeam] = React.useState('');
    const [logo, setLogo] = React.useState('');

    useEffect(() => {
        if (currentUser) {
            setTeam(currentUser.nba_team);
            setLogo(getLogo(currentUser.nba_team));
        }
    }, [currentUser]);

    const standingsRecords = [
        {
            team: 'Seattle Supersonics',
            conferenceWins: 0,
            conferenceLosses: 0,
            totalWins: 0,
            totalLosses: 0
        },
        {
            team: 'Vancouver Sea Lions',
            conferenceWins: 0,
            conferenceLosses: 0,
            totalWins: 0,
            totalLosses: 0
        },
        {
            team: 'Minnesota Timberwolves',
            conferenceWins: 0,
            conferenceLosses: 0,
            totalWins: 0,
            totalLosses: 0
        },
        {
            team: 'Sacramento Kings',
            conferenceWins: 0,
            conferenceLosses: 0,
            totalWins: 0,
            totalLosses: 0
        }
    ];

    // const standingsRow = standingsRecords.map((x, i) => {
    //     return <StandingsTableRow key={x.team} record={x} rank={i + 1} />;
    // });
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
                    <h3>Western Conference, North Division</h3>
                </div>
                <div className="col-md-auto"></div>
                <div className="col-3"></div>
            </div>
            <div className="row mt-2">
                <div className="col-md-auto">
                    <div className="image">
                        <img src={logo} alt="Go Cougs" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="row justify-content-start">
                        <h3 className="text-start">2021, Week 1</h3>
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
                                <tr className="">
                                    <th scope="row">A</th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr className="">
                                    <th scope="row">B</th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr className="">
                                    <th scope="row">C</th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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
                                    <td>Seattle Supersonics</td>
                                    <td>vs</td>
                                    <td>Vancouver Sea Lions</td>
                                </tr>
                                <tr>
                                    <th scope="row">B</th>
                                    <td>Seattle Supersonics</td>
                                    <td>vs</td>
                                    <td>San Antonio Spurs</td>
                                </tr>
                                <tr>
                                    <th scope="row">C</th>
                                    <td>San Diego Clippers</td>
                                    <td>vs</td>
                                    <td>Seattle Supersonics</td>
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
                                Management
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
                                    <th scope="col">Total Losses</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
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

export default connect(mapStateToProps)(NBAHomePage);
