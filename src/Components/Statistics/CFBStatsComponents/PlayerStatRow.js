import React from 'react';
import { GetStatsYear } from '../../../_Utility/RosterHelper';
import { getLogo } from '../../../Constants/getLogo';
const _ = require('lodash');

export const PlayerStatRow = ({
    statType,
    idx,
    player,
    viewType,
    isNFL,
    retro
}) => {
    const name = player.FirstName + ' ' + player.LastName;
    const s = viewType === 'SEASON' ? player.SeasonStats : player.Stats;
    const games = player.SeasonStats ? player.SeasonStats.GamesPlayed : 0;
    const year = !isNFL ? GetStatsYear(player, viewType) : player.Year;
    const teamLogo = getLogo(player.TeamAbbr, retro);
    const opposingLogo = getLogo(s.OpposingTeam, retro);

    const PassingRow = () => {
        const percentLabel =
            viewType === 'SEASON'
                ? parseFloat(s.Completion * 100).toFixed(2) + '%'
                : parseFloat(
                      (s.PassCompletions / s.PassAttempts) * 100
                  ).toFixed(2) + '%';

        let passAvg = s.PassingAvg ? parseFloat(s.PassingAvg).toFixed(2) : 0;

        let qbr = 0;
        if (viewType === 'SEASON') {
            qbr = parseFloat(s.QBRating).toFixed(2);
        } else {
            const pY = 8.4 * s.PassingYards;
            const ptd = 330 * s.PassingTDs;
            const pc = 100 * s.PassCompletions;
            const ints = 200 * s.Interceptions;
            const numerator = pY + ptd + pc - ints;
            qbr = parseFloat(numerator / s.PassAttempts).toFixed(2);
            passAvg = parseFloat(s.PassingYards / s.PassAttempts).toFixed(2);
        }

        return (
            <tr>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                <th className="">{name}</th>
                <th className="">{year}</th>
                <td label="team">
                    <img
                        className="image-nfl-fa mx-1"
                        src={teamLogo}
                        alt="competing-team"
                    />
                </td>
                <td label="Position">{player.Position}</td>
                <td label="Archetype">{player.Archetype}</td>
                <td label="PassingYards">{s.PassingYards}</td>
                <td label="PassingCompletions">{s.PassCompletions}</td>
                <td label="PassingAttempts">{s.PassAttempts}</td>
                <td label="Completion">{percentLabel}</td>
                <td label="PassingAvg">{passAvg}</td>
                <td label="PassingTDs">{s.PassingTDs}</td>
                <td label="Interceptions">{s.Interceptions}</td>
                <td label="Sacks">{s.Sacks}</td>
                <td label="QBR">{qbr}</td>
                <td label="LongestPass">{s.LongestPass}</td>
                {viewType === 'WEEK' && (
                    <td className="">
                        {!isNFL ? (
                            <img
                                className="image-nfl-fa mx-1"
                                src={opposingLogo}
                                alt="competing-team"
                            />
                        ) : (
                            s.OpposingTeam
                        )}
                    </td>
                )}
            </tr>
        );
    };

    const RushingRow = () => {
        const rushingAvg = s.RushingAvg
            ? parseFloat(s.RushingAvg).toFixed(2)
            : parseFloat(s.RushingYards / s.RushAttempts).toFixed(2);
        return (
            <tr>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                <th className="">{name}</th>
                <th className="">{year}</th>
                <td label="team">
                    <img
                        className="image-nfl-fa mx-1"
                        src={teamLogo}
                        alt="competing-team"
                    />
                </td>
                <td label="Position">{player.Position}</td>
                <td label="Archetype">{player.Archetype}</td>
                <td label="RushingYards">{s.RushingYards}</td>
                <td label="RushingAttempts">{s.RushAttempts}</td>
                <td label="RushingAvg">{rushingAvg}</td>
                <td label="RushingTDs">{s.RushingTDs}</td>
                <td label="Fumbles">{s.Fumbles}</td>
                <td label="LongestRush">{s.LongestRush}</td>
                {viewType === 'WEEK' && (
                    <td className="">
                        {!isNFL ? (
                            <img
                                className="image-nfl-fa mx-1"
                                src={opposingLogo}
                                alt="competing-team"
                            />
                        ) : (
                            s.OpposingTeam
                        )}
                    </td>
                )}
            </tr>
        );
    };

    const ReceivingRow = () => {
        const receivingAvg = s.ReceivingAvg
            ? parseFloat(s.ReceivingAvg).toFixed(2)
            : parseFloat(s.ReceivingYards / s.Catches).toFixed(2);
        return (
            <tr>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                <th className="">{name}</th>
                <th className="">{year}</th>
                <td label="team">
                    <img
                        className="image-nfl-fa mx-1"
                        src={teamLogo}
                        alt="competing-team"
                    />
                </td>
                <td label="Position">{player.Position}</td>
                <td label="Archetype">{player.Archetype}</td>
                <td label="Catches">{s.Catches}</td>
                <td label="Targets">{s.Targets}</td>
                <td label="ReceivingYards">{s.ReceivingYards}</td>
                <td label="ReceivingAvg">{receivingAvg}</td>
                <td label="ReceivingTDs">{s.ReceivingTDs}</td>
                <td label="Fumbles">{s.Fumbles}</td>
                <td label="LongestReception">{s.LongestReception}</td>
                {viewType === 'WEEK' && (
                    <td className="">
                        {!isNFL ? (
                            <img
                                className="image-nfl-fa mx-1"
                                src={opposingLogo}
                                alt="competing-team"
                            />
                        ) : (
                            s.OpposingTeam
                        )}
                    </td>
                )}
            </tr>
        );
    };

    const DefensiveRow = () => {
        const tck =
            viewType === 'SEASON'
                ? s.Tackles
                : s.SoloTackles + parseFloat(s.AssistedTackles / 2);
        return (
            <tr>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                <th className="">{name}</th>
                <th className="">{year}</th>
                <td label="team">
                    <img
                        className="image-nfl-fa mx-1"
                        src={teamLogo}
                        alt="competing-team"
                    />
                </td>
                <td label="Position">{player.Position}</td>
                <td label="Archetype">{player.Archetype}</td>
                <td label="Tackles">{tck}</td>
                <td label="TacklesForLoss">{s.TacklesForLoss}</td>
                <td label="Sacks">{s.SacksMade}</td>
                <td label="ForcedFumbles">{s.ForcedFumbles}</td>
                <td label="RecoveredFumbles">{s.RecoveredFumbles}</td>
                <td label="PassDeflections">{s.PassDeflections}</td>
                <td label="Interceptions">{s.InterceptionsCaught}</td>
                <td label="Safeties">{s.Safeties}</td>
                <td label="DefensiveTDs">{s.DefensiveTDs}</td>
                {viewType === 'WEEK' && (
                    <td className="">
                        {!isNFL ? (
                            <img
                                className="image-nfl-fa mx-1"
                                src={opposingLogo}
                                alt="competing-team"
                            />
                        ) : (
                            s.OpposingTeam
                        )}
                    </td>
                )}
            </tr>
        );
    };

    const KickingRow = () => {
        return (
            <tr>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                <th className="">{name}</th>
                <th className="">{year}</th>
                <td label="team">
                    <img
                        className="image-nfl-fa mx-1"
                        src={teamLogo}
                        alt="competing-team"
                    />
                </td>
                <td label="Position">{player.Position}</td>
                <td label="Archetype">{player.Archetype}</td>
                <td label="FGMade">{s.FGMade}</td>
                <td label="FGAttempts">{s.FGAttempts}</td>
                <td label="LongestFG">{s.LongestFG}</td>
                <td label="ExtraPointsMade">{s.ExtraPointsMade}</td>
                <td label="ExtraPointsAttempted">{s.ExtraPointsAttempted}</td>
                <td label="Punts">{s.Punts}</td>
                <td label="PuntsInside20">{s.PuntsInside20}</td>
                {viewType === 'WEEK' && (
                    <td className="">
                        {!isNFL ? (
                            <img
                                className="image-nfl-fa mx-1"
                                src={opposingLogo}
                                alt="competing-team"
                            />
                        ) : (
                            s.OpposingTeam
                        )}
                    </td>
                )}
            </tr>
        );
    };

    const OLineRow = () => {
        return (
            <tr>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                <th className="">{name}</th>
                <th className="">{year}</th>
                <td label="team">
                    <img
                        className="image-nfl-fa mx-1"
                        src={teamLogo}
                        alt="competing-team"
                    />
                </td>
                <td label="Position">{player.Position}</td>
                <td label="Archetype">{player.Archetype}</td>
                <td label="Pancakes">{s.Pancakes}</td>
                <td label="SacksAllowed">{s.SacksAllowed}</td>
                {viewType === 'WEEK' && (
                    <td className="">
                        {!isNFL ? (
                            <img
                                className="image-nfl-fa mx-1"
                                src={opposingLogo}
                                alt="competing-team"
                            />
                        ) : (
                            s.OpposingTeam
                        )}
                    </td>
                )}
            </tr>
        );
    };

    if (statType === 'Passing') return <PassingRow />;
    if (statType === 'Rushing') return <RushingRow />;
    if (statType === 'Receiving') return <ReceivingRow />;
    if (statType === 'Defense') return <DefensiveRow />;
    if (statType === 'Kicking') return <KickingRow />;
    if (statType === 'OLine') return <OLineRow />;
    return '';
};
