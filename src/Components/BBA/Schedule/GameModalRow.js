import React from 'react';

const GameModalRow = (props) => {
    const { player } = props;

    return (
        <tr className="mb-1">
            <td>{player.FirstName + ' ' + player.LastName}</td>
            <td>{player.Position}</td>
            <td>{player.Minutes || 0}</td>
            <td>{player.FGM || 0}</td>
            <td>{player.FGA || 0}</td>
            <td>{Math.round(player.FGPercent * 100) || 0}%</td>
            <td>{player.ThreePointsMade || 0}</td>
            <td>{player.ThreePointAttempts || 0}</td>
            <td>{Math.round(player.ThreePointPercent * 100) || 0}%</td>
            <td>{player.FTM || 0}</td>
            <td>{player.FTA || 0}</td>
            <td>{Math.round(player.FTPercent * 100) || 0}%</td>
            <td>{player.Points || 0}</td>
            <td>{player.TotalRebounds || 0}</td>
            <td>{player.Assists || 0}</td>
            <td>{player.Steals || 0}</td>
            <td>{player.Blocks || 0}</td>
            <td>{player.Turnovers || 0}</td>
            <td>{player.Fouls || 0}</td>
        </tr>
    );
};

export default GameModalRow;
