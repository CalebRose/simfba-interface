import React from 'react';
import { connect } from 'react-redux';
import { getLogo } from '../../../../../Constants/getLogo';
import NFLStandingsTableRow from '../standingsTable/NFLStandingsTableRow';

const CFBHomepage = ({ currentUser }) => {
    let team =
        !!currentUser && !!currentUser.nfl_team ? currentUser.nfl_team : null;
    const logo = getLogo(team);

    const standingsRecords = [
        {
            team: 'Seattle Seahawks',
            divisionWins: 6,
            divisionLosses: 0,
            totalWins: 16,
            totalLosses: 0
        },
        {
            team: 'San Francisco 49ers',
            divisionWins: 4,
            divisionLosses: 2,
            totalWins: 10,
            totalLosses: 6
        },
        {
            team: 'Arizona Cardinals',
            divisionWins: 2,
            divisionLosses: 4,
            totalWins: 6,
            totalLosses: 10
        },
        {
            team: 'LA Rams',
            divisionWins: 0,
            divisionLosses: 6,
            totalWins: 0,
            totalLosses: 16
        }
    ];

    const standingsRow = standingsRecords.map((x, i) => {
        return <NFLStandingsTableRow key={x.team} record={x} rank={i + 1} />;
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
                    <h3>NFC West Division</h3>
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
                <div className="col-5">
                    <div className="row justify-content-start">
                        <h3 className="text-start">2021, Week 17</h3>
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
                                <tr className="table-success">
                                    <th scope="row">17</th>
                                    <td>Seattle Seahawks</td>
                                    <td>70</td>
                                    <td>0</td>
                                    <td>LA Rams</td>
                                    <td>W</td>
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
                                    <th scope="row"></th>
                                    <td></td>
                                    <td>Bye</td>
                                    <td></td>
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
                                    <th scope="col">Div Wins</th>
                                    <th scope="col">Div Losses</th>
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
