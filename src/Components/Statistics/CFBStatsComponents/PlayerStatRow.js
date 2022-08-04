import React from 'react';
const _ = require('lodash');

export const PlayerStatRow = ({ statType, idx, player }) => {
    const name = player.FirstName + ' ' + player.LastName;
    const seasonStats = player.SeasonStats;
    const games = player.PlayerStats ? player.PlayerStats.length : 0;

    const PassingRow = () => {
        const completionPercentage =
            seasonStats.PassAttempts > 0
                ? seasonStats.PassCompletions / seasonStats.PassAttempts
                : 0;
        const percentLabel =
            parseFloat(completionPercentage * 100).toFixed(2) + '%';

        const qbr = parseFloat(seasonStats.QBRating).toFixed(2);

        return (
            <tr>
                <th className="">{games}</th>
                <th className="">{name}</th>
                <td label="team">{player.TeamAbbr}</td>
                <td label="Position">{player.Position}</td>
                <td label="Archetype">{player.Archetype}</td>
                <td label="PassingYards">{seasonStats.PassingYards}</td>
                <td label="PassingCompletions">
                    {seasonStats.PassCompletions}
                </td>
                <td label="PassingAttempts">{seasonStats.PassAttempts}</td>
                <td label="PassingAvg">{percentLabel}</td>
                <td label="PassingTDs">{seasonStats.PassingTDs}</td>
                <td label="Interceptions">{seasonStats.Interceptions}</td>
                <td label="Sacks">{seasonStats.Sacks}</td>
                <td label="QBR">{qbr}</td>
                <td label="LongestPass">{seasonStats.LongestPass}</td>
            </tr>
        );
    };

    const RushingRow = () => {
        const rushingAvg = parseFloat(
            seasonStats.RushingYards / seasonStats.RushAttempts
        ).toFixed(2);
        return (
            <tr>
                <th className="">{games}</th>
                <th className="">{name}</th>
                <td label="team">{player.TeamAbbr}</td>
                <td label="Position">{player.Position}</td>
                <td label="Archetype">{player.Archetype}</td>
                <td label="RushingYards">{seasonStats.RushingYards}</td>
                <td label="RushingAttempts">{seasonStats.RushAttempts}</td>
                <td label="RushingAvg">{rushingAvg}</td>
                <td label="RushingTDs">{seasonStats.RushingTDs}</td>
                <td label="Fumbles">{seasonStats.Fumbles}</td>
                <td label="LongestRush">{seasonStats.LongestRush}</td>
            </tr>
        );
    };

    const ReceivingRow = () => {
        const receivingAvg = parseFloat(
            seasonStats.ReceivingYards / seasonStats.Catches
        ).toFixed(2);
        return (
            <tr>
                <th className="">{games}</th>
                <th className="">{name}</th>
                <td label="team">{player.TeamAbbr}</td>
                <td label="Position">{player.Position}</td>
                <td label="Archetype">{player.Archetype}</td>
                <td label="Catches">{seasonStats.Catches}</td>
                <td label="Targets">{seasonStats.Targets}</td>
                <td label="ReceivingYards">{seasonStats.ReceivingYards}</td>
                <td label="ReceivingAvg">{receivingAvg}</td>
                <td label="ReceivingTDs">{seasonStats.ReceivingTDs}</td>
                <td label="Fumbles">{seasonStats.Fumbles}</td>
                <td label="LongestReception">{seasonStats.LongestReception}</td>
            </tr>
        );
    };

    const DefensiveRow = () => {
        return (
            <tr>
                <th className="">{games}</th>
                <th className="">{name}</th>
                <td label="team">{player.TeamAbbr}</td>
                <td label="Position">{player.Position}</td>
                <td label="Archetype">{player.Archetype}</td>
                <td label="Tackles">{seasonStats.Tackles}</td>
                <td label="TacklesForLoss">{seasonStats.TacklesForLoss}</td>
                <td label="Sacks">{seasonStats.SacksMade}</td>
                <td label="ForcedFumbles">{seasonStats.ForcedFumbles}</td>
                <td label="RecoveredFumbles">{seasonStats.RecoveredFumbles}</td>
                <td label="PassDeflections">{seasonStats.PassDeflections}</td>
                <td label="Interceptions">{seasonStats.InterceptionsCaught}</td>
                <td label="Safeties">{seasonStats.Safeties}</td>
                <td label="DefensiveTDs">{seasonStats.DefensiveTDs}</td>
            </tr>
        );
    };

    const KickingRow = () => {
        return (
            <tr>
                <th className="">{games}</th>
                <th className="">{name}</th>
                <td label="team">{player.TeamAbbr}</td>
                <td label="Position">{player.Position}</td>
                <td label="Archetype">{player.Archetype}</td>
                <td label="FGMade">{seasonStats.FGMade}</td>
                <td label="FGAttempts">{seasonStats.FGAttempts}</td>
                <td label="LongestFG">{seasonStats.LongestFG}</td>
                <td label="ExtraPointsMade">{seasonStats.ExtraPointsMade}</td>
                <td label="ExtraPointsAttempted">
                    {seasonStats.ExtraPointsAttempted}
                </td>
                <td label="Punts">{seasonStats.Punts}</td>
                <td label="PuntsInside20">{seasonStats.PuntsInside20}</td>
            </tr>
        );
    };

    if (statType === 'Passing') return <PassingRow />;
    if (statType === 'Rushing') return <RushingRow />;
    if (statType === 'Receiving') return <ReceivingRow />;
    if (statType === 'Defense') return <DefensiveRow />;
    if (statType === 'Kicking') return <KickingRow />;
    return '';
};
