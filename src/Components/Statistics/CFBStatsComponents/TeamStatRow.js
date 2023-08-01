import React from 'react';

export const TeamStatRow = ({ statType, idx, team, viewType }) => {
    const s = viewType === 'SEASON' ? team.SeasonStats : team.Stats;
    const seasonView = viewType === 'SEASON';
    const games = team.SeasonStats ? team.SeasonStats.GamesPlayed : 0;
    const toy = seasonView
        ? s.TotalOffensiveYards
        : s.PassingYards + s.RushingYards;
    const tya = seasonView
        ? s.TotalYardsAllowed
        : s.PassingYardsAllowed + s.RushingYardsAllowed;
    const to = seasonView
        ? s.Turnovers
        : s.DefensiveInterceptions + s.FumblesRecovered;
    const OverallRow = () => {
        return (
            <tr>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                <th className="">{team.TeamName}</th>
                <td label="">{team.Conference}</td>
                <td label="">{s.PointsScored}</td>
                <td label="">{s.PointsAgainst}</td>
                <td label="">{toy}</td>
                <td label="">{tya}</td>
                <td label="">{s.PassingYards}</td>
                <td label="">{s.PassingYardsAllowed}</td>
                <td label="">{s.RushingYards}</td>
                <td label="">{s.RushingYardsAllowed}</td>
                <td label="">{to}</td>
                <td label="">{s.OffensivePenalties}</td>
                <td label="">{s.DefensivePenalties}</td>
            </tr>
        );
    };

    const OffenseRow = () => {
        let qbr = parseFloat(s.QBRating).toFixed(2);
        if (!seasonView) {
            const py = 8.4 * s.PassingYards;
            const ptd = 330 * s.PassingTouchdowns;
            const pc = 100 * s.PassingCompletions;
            const ints = 200 * s.PassingInterceptions;
            const num = py + ptd + pc - ints;
            qbr = parseFloat(num / s.PassingAttempts).toFixed(2);
        }
        return (
            <tr>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                <th className="">{team.TeamName}</th>
                <td label="">{team.Conference}</td>
                <td label="">{s.PointsScored}</td>
                <td label="">{toy}</td>
                <td label="">{s.PassingYards}</td>
                <td label="">{s.PassingTouchdowns}</td>
                <td label="">{qbr}</td>
                <td label="">{s.QBSacks}</td>
                <td label="">{s.PassingInterceptions}</td>
                <td label="">{s.RushingYards}</td>
                <td label="RushingTDs">{s.RushingTouchdowns}</td>
            </tr>
        );
    };

    const DefenseRow = () => {
        const tck = seasonView
            ? s.Tackles
            : s.SoloTackles + s.AssistedTackles / 2;
        return (
            <tr>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                <th className="">{team.TeamName}</th>
                <td label="">{team.Conference}</td>
                <td label="">{s.PointsAgainst}</td>
                <td label="">{tya}</td>
                <td label="">{s.PassingYardsAllowed}</td>
                <td label="">{s.RushingYardsAllowed}</td>
                <td label="">{to}</td>
                <td label="">{tck}</td>
                <td label="">{s.TacklesForLoss}</td>
                <td label="">{s.DefensiveSacks}</td>
                <td label="">{s.ForcedFumbles}</td>
                <td label="">{s.FumblesRecovered}</td>
                <td label="">{s.DefensiveInterceptions}</td>
                <td label="">{s.Safeties}</td>
                <td label="">{s.DefensiveTDs}</td>
            </tr>
        );
    };

    if (statType === 'Overall') return <OverallRow />;
    if (statType === 'Offense') return <OffenseRow />;
    if (statType === 'Defense') return <DefenseRow />;
    return '';
};
