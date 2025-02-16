import React from 'react';
import { GetYear } from '../../../_Utility/RosterHelper';

const CBBPlayerStatRow = ({ statType, idx, player, viewType }) => {
    const name =
        player.Position + ' ' + player.FirstName + ' ' + player.LastName;
    const s = viewType === 'SEASON' ? player.SeasonStats : player.Stats;
    const games = player.SeasonStats ? player.SeasonStats.GamesPlayed : 0;
    const year = GetYear(player);
    const FGPercentLabel = parseFloat(s.FGPercent * 100).toFixed(2) + '%';
    const FTPercentLabel = parseFloat(s.FTPercent * 100).toFixed(2) + '%';
    const TPPercentLabel =
        parseFloat(s.ThreePointPercent * 100).toFixed(2) + '%';

    const OverallRow = () => {
        return (
            <tr>
                <td scope="col">{name + ' | ' + year}</td>
                <td scope="col">{player.TeamAbbr}</td>
                {viewType === 'SEASON' && <td scope="col">{games}</td>}
                <td scope="col">{s.Minutes}</td>
                <td scope="col">{s.Possessions}</td>
                <td scope="col">{s.Points}</td>
                <td scope="col">{s.FGM}</td>
                <td scope="col">{s.FGA}</td>
                <td scope="col">{FGPercentLabel}</td>
                <td scope="col">{s.ThreePointsMade}</td>
                <td scope="col">{s.ThreePointAttempts}</td>
                <td scope="col">{TPPercentLabel}</td>
                <td scope="col">{s.FTM}</td>
                <td scope="col">{s.FTA}</td>
                <td scope="col">{FTPercentLabel}</td>
                <td scope="col">{s.OffRebounds}</td>
                <td scope="col">{s.DefRebounds}</td>
                <td scope="col">{s.TotalRebounds}</td>
                <td scope="col">{s.Assists}</td>
                <td scope="col">{s.Steals}</td>
                <td scope="col">{s.Blocks}</td>
                <td scope="col">{s.Turnovers}</td>
            </tr>
        );
    };

    const PerGameRow = () => {
        return (
            <tr>
                <td scope="col">{name}</td>
                <td scope="col">{player.TeamAbbr}</td>
                {viewType === 'SEASON' && <td scope="col">{games}</td>}
                <td scope="col">{parseFloat(s.MinutesPerGame).toFixed(2)}</td>
                <td scope="col">
                    {parseFloat(s.PossessionsPerGame).toFixed(2)}
                </td>
                <td scope="col">{parseFloat(s.PPG).toFixed(2)}</td>
                <td scope="col">{parseFloat(s.FGMPG).toFixed(2)}</td>
                <td scope="col">{parseFloat(s.FGAPG).toFixed(2)}</td>
                <td scope="col">{FGPercentLabel}</td>
                <td scope="col">
                    {parseFloat(s.ThreePointsMadePerGame).toFixed(2)}
                </td>
                <td scope="col">
                    {parseFloat(s.ThreePointAttemptsPerGame).toFixed(2)}
                </td>
                <td scope="col">{TPPercentLabel}</td>
                <td scope="col">{parseFloat(s.FTMPG).toFixed(2)}</td>
                <td scope="col">{parseFloat(s.FTAPG).toFixed(2)}</td>
                <td scope="col">{FTPercentLabel}</td>
                <td scope="col">
                    {parseFloat(s.OffReboundsPerGame).toFixed(2)}
                </td>
                <td scope="col">
                    {parseFloat(s.DefReboundsPerGame).toFixed(2)}
                </td>
                <td scope="col">{parseFloat(s.ReboundsPerGame).toFixed(2)}</td>
                <td scope="col">{parseFloat(s.AssistsPerGame).toFixed(2)}</td>
                <td scope="col">{parseFloat(s.StealsPerGame).toFixed(2)}</td>
                <td scope="col">{parseFloat(s.BlocksPerGame).toFixed(2)}</td>
                <td scope="col">{parseFloat(s.TurnoversPerGame).toFixed(2)}</td>
            </tr>
        );
    };

    if (statType === 'Overall') return <OverallRow />;
    if (statType === 'PerGame') return <PerGameRow />;
    return <></>;
};

export default CBBPlayerStatRow;
