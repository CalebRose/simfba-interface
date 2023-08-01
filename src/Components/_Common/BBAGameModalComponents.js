import React from 'react';
import GameModalRow from '../BBA/Schedule/GameModalRow';

export const BBABoxScoreHeader = () => (
    <div className="row g-2 gy-2 mb-2">
        <div className="col">Team</div>
        <div className="col">First Half</div>
        <div className="col">Second Half</div>
        <div className="col">OT</div>
        <div className="col">Total</div>
        <div className="col">Possessions</div>
    </div>
);

export const BBABoxScoreRow = ({ team, teamStats }) => (
    <div className="row g-2 gy-2 mb-1">
        <div className="col">{team}</div>
        <div className="col">{teamStats.FirstHalfScore}</div>
        <div className="col">{teamStats.SecondHalfScore}</div>
        <div className="col">{teamStats.OvertimeScore}</div>
        <div className="col">{teamStats.Points}</div>
        <div className="col">{teamStats.Possessions}</div>
    </div>
);

export const BBAPlayerStatsTable = ({ team, players }) => (
    <>
        <div className="row mb-2">
            <h4 className="ms-auto">{team} Players</h4>
        </div>
        <div className="row mb-1">
            <table className="table">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Minutes</th>
                    <th scope="col">FGM</th>
                    <th scope="col">FGA</th>
                    <th scope="col">FG%</th>
                    <th scope="col">3PM</th>
                    <th scope="col">3PA</th>
                    <th scope="col">3P%</th>
                    <th scope="col">FTM</th>
                    <th scope="col">FTA</th>
                    <th scope="col">FT%</th>
                    <th scope="col">Points</th>
                    <th scope="col">Rebounds</th>
                    <th scope="col">Assists</th>
                    <th scope="col">Steals</th>
                    <th scope="col">Blocks</th>
                    <th scope="col">TOs</th>
                    <th scope="col">Fouls</th>
                </tr>
                {players.length > 0 &&
                    players.map((x) => <GameModalRow player={x} />)}
            </table>
        </div>
    </>
);
