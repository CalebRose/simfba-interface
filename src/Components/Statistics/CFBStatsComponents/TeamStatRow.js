import React from 'react';

export const TeamStatRow = ({ statType, idx, team }) => {
    const seasonStats = team.SeasonStats;
    // console.log(team);
    console.log(team.TeamStats);
    const games = team.TeamStats ? team.TeamStats.length : 0;

    const OverallRow = () => {
        return (
            <tr>
                <th className="">{games}</th>
                <th className="">{team.TeamName}</th>
                <td label="">{team.Conference}</td>
                <td label="">{seasonStats.PointsScored}</td>
                <td label="">{seasonStats.PointsAgainst}</td>
                <td label="">{seasonStats.TotalOffensiveYards}</td>
                <td label="">{seasonStats.TotalYardsAllowed}</td>
                <td label="">{seasonStats.PassingYards}</td>
                <td label="">{seasonStats.PassingYardsAllowed}</td>
                <td label="">{seasonStats.RushingYards}</td>
                <td label="">{seasonStats.RushingYardsAllowed}</td>
                <td label="">{seasonStats.Turnovers}</td>
                <td label="">{seasonStats.OffensivePenalties}</td>
                <td label="">{seasonStats.DefensivePenalties}</td>
            </tr>
        );
    };

    const OffenseRow = () => {
        const qbr = parseFloat(seasonStats.QBRating).toFixed(2);
        return (
            <tr>
                <th className="">{games}</th>
                <th className="">{team.TeamName}</th>
                <td label="">{team.Conference}</td>
                <td label="">{seasonStats.PointsScored}</td>
                <td label="">{seasonStats.TotalOffensiveYards}</td>
                <td label="">{seasonStats.PassingYards}</td>
                <td label="">{seasonStats.PassingTouchdowns}</td>
                <td label="">{qbr}</td>
                <td label="">{seasonStats.QBSacks}</td>
                <td label="">{seasonStats.PassingInterceptions}</td>
                <td label="">{seasonStats.RushingYards}</td>
                <td label="RushingTDs">{seasonStats.RushingTouchdowns}</td>
                <td label="">{seasonStats.ReceivingYards}</td>
                <td label="RushingTDs">{seasonStats.ReceivingTouchdowns}</td>
                <td label="Fumbles">{seasonStats.Fumbles}</td>
            </tr>
        );
    };

    const DefenseRow = () => {
        return (
            <tr>
                <th className="">{games}</th>
                <th className="">{team.TeamName}</th>
                <td label="">{team.Conference}</td>
                <td label="">{seasonStats.PointsAgainst}</td>
                <td label="">{seasonStats.TotalYardsAllowed}</td>
                <td label="">{seasonStats.PassingYardsAllowed}</td>
                <td label="">{seasonStats.RushingYardsAllowed}</td>
                <td label="">{seasonStats.Turnovers}</td>
                <td label="">{seasonStats.Tackles}</td>
                <td label="">{seasonStats.TacklesForLoss}</td>
                <td label="">{seasonStats.DefensiveSacks}</td>
                <td label="">{seasonStats.ForcedFumbles}</td>
                <td label="">{seasonStats.FumblesRecovered}</td>
                <td label="">{seasonStats.DefensiveInterceptions}</td>
                <td label="">{seasonStats.Safeties}</td>
                <td label="">{seasonStats.DefensiveTDs}</td>
            </tr>
        );
    };

    if (statType === 'Overall') return <OverallRow />;
    if (statType === 'Offense') return <OffenseRow />;
    if (statType === 'Defense') return <DefenseRow />;
    return '';
};
