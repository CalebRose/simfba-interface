import React from 'react';
import { RoundToTwoDecimals } from '../../../_Utility/utilHelper';

const GameModalRow = (props) => {
    const { player } = props;
    const stats = player.Stats.length > 0 ? player.Stats[0] : null;

    return (
        <tr className="mb-1">
            <td>{player.FirstName + ' ' + player.LastName}</td>
            <td>{stats ? stats.Minutes : 0}</td>
            <td>{stats ? stats.FGM : 0}</td>
            <td>{stats ? stats.FGA : 0}</td>
            <td>{stats ? RoundToTwoDecimals(stats.FGPercent) * 100 : 0}%</td>
            <td>{stats ? stats.ThreePointsMade : 0}</td>
            <td>{stats ? stats.ThreePointAttempts : 0}</td>
            <td>
                {stats ? RoundToTwoDecimals(stats.ThreePointPercent) * 100 : 0}%
            </td>
            <td>{stats ? stats.FTM : 0}</td>
            <td>{stats ? stats.FTA : 0}</td>
            <td>{stats ? RoundToTwoDecimals(stats.FTPercent) * 100 : 0}%</td>
            <td>{stats ? stats.Points : 0}</td>
            <td>{stats ? stats.TotalRebounds : 0}</td>
            <td>{stats ? stats.Assists : 0}</td>
            <td>{stats ? stats.Steals : 0}</td>
            <td>{stats ? stats.Blocks : 0}</td>
            <td>{stats ? stats.Turnovers : 0}</td>
            <td>{stats ? stats.Fouls : 0}</td>
        </tr>
    );
};

export default GameModalRow;
