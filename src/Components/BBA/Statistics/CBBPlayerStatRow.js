import React from 'react';
import { GetYear } from '../../../_Utility/RosterHelper';

const CBBPlayerStatRow = ({ statType, idx, player }) => {
    const name = player.FirstName + ' ' + player.LastName;
    const seasonStats = player.SeasonStats;
    const games = player.SeasonStats ? player.SeasonStats.GamesPlayed : 0;
    const year = GetYear(player);
    const FGPercentLabel =
        parseFloat(seasonStats.FGPercent * 100).toFixed(2) + '%';
    const FTPercentLabel =
        parseFloat(seasonStats.FTPercent * 100).toFixed(2) + '%';
    const TPPercentLabel =
        parseFloat(seasonStats.ThreePointPercent * 100).toFixed(2) + '%';

    const OverallRow = () => {
        return (
            <tr>
                <td scope="col">{name + ' ' + year}</td>
                <td scope="col">{player.TeamAbbr}</td>
                <td scope="col">{games}</td>
                <td scope="col">{seasonStats.Minutes}</td>
                <td scope="col">{seasonStats.Possessions}</td>
                <td scope="col">{seasonStats.Points}</td>
                <td scope="col">{seasonStats.FGM}</td>
                <td scope="col">{seasonStats.FGA}</td>
                <td scope="col">{FGPercentLabel}</td>
                <td scope="col">{seasonStats.ThreePointsMade}</td>
                <td scope="col">{seasonStats.ThreePointAttempts}</td>
                <td scope="col">{TPPercentLabel}</td>
                <td scope="col">{seasonStats.FTM}</td>
                <td scope="col">{seasonStats.FTA}</td>
                <td scope="col">{FTPercentLabel}</td>
                <td scope="col">{seasonStats.OffRebounds}</td>
                <td scope="col">{seasonStats.DefRebounds}</td>
                <td scope="col">{seasonStats.TotalRebounds}</td>
                <td scope="col">{seasonStats.Assists}</td>
                <td scope="col">{seasonStats.Steals}</td>
                <td scope="col">{seasonStats.Blocks}</td>
                <td scope="col">{seasonStats.Turnovers}</td>
            </tr>
        );
    };

    const PerGameRow = () => {
        return (
            <tr>
                <td scope="col">{name}</td>
                <td scope="col">{player.TeamAbbr}</td>
                <td scope="col">{games}</td>
                <td scope="col">
                    {parseFloat(seasonStats.MinutesPerGame).toFixed(2)}
                </td>
                <td scope="col">
                    {parseFloat(seasonStats.PossessionsPerGame).toFixed(2)}
                </td>
                <td scope="col">{parseFloat(seasonStats.PPG).toFixed(2)}</td>
                <td scope="col">{parseFloat(seasonStats.FGMPG).toFixed(2)}</td>
                <td scope="col">{parseFloat(seasonStats.FGAPG).toFixed(2)}</td>
                <td scope="col">{FGPercentLabel}</td>
                <td scope="col">
                    {parseFloat(seasonStats.ThreePointsMadePerGame).toFixed(2)}
                </td>
                <td scope="col">
                    {parseFloat(seasonStats.ThreePointAttemptsPerGame).toFixed(
                        2
                    )}
                </td>
                <td scope="col">{TPPercentLabel}</td>
                <td scope="col">{parseFloat(seasonStats.FTMPG).toFixed(2)}</td>
                <td scope="col">{parseFloat(seasonStats.FTAPG).toFixed(2)}</td>
                <td scope="col">{FTPercentLabel}</td>
                <td scope="col">
                    {parseFloat(seasonStats.OffReboundsPerGame).toFixed(2)}
                </td>
                <td scope="col">
                    {parseFloat(seasonStats.DefReboundsPerGame).toFixed(2)}
                </td>
                <td scope="col">
                    {parseFloat(seasonStats.ReboundsPerGame).toFixed(2)}
                </td>
                <td scope="col">
                    {parseFloat(seasonStats.AssistsPerGame).toFixed(2)}
                </td>
                <td scope="col">
                    {parseFloat(seasonStats.StealsPerGame).toFixed(2)}
                </td>
                <td scope="col">
                    {parseFloat(seasonStats.BlocksPerGame).toFixed(2)}
                </td>
                <td scope="col">
                    {parseFloat(seasonStats.TurnoversPerGame).toFixed(2)}
                </td>
            </tr>
        );
    };

    if (statType === 'Overall') return <OverallRow />;
    if (statType === 'PerGame') return <PerGameRow />;
    return <></>;
};

export default CBBPlayerStatRow;
