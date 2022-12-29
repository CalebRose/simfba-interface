import React from 'react';

const CBBTeamStatRow = ({ statType, idx, team }) => {
    const seasonStats = team.SeasonStats;
    const games = team.SeasonStats ? team.SeasonStats.GamesPlayed : 0;
    const FGPercentLabel =
        parseFloat(seasonStats.FGPercent * 100).toFixed(2) + '%';
    const FTPercentLabel =
        parseFloat(seasonStats.FTPercent * 100).toFixed(2) + '%';
    const TPPercentLabel =
        parseFloat(seasonStats.ThreePointPercent * 100).toFixed(2) + '%';
    const FGPercentAllowedLabel =
        parseFloat(seasonStats.FGPercentAgainst * 100).toFixed(2) + '%';
    const FTPercentAllowedLabel =
        parseFloat(seasonStats.FTPercentAgainst * 100).toFixed(2) + '%';
    const TPPercentAllowedLabel =
        parseFloat(seasonStats.ThreePointPercentAgainst * 100).toFixed(2) + '%';
    const FGPercentDiffLabel =
        parseFloat(seasonStats.FGPercentDiff * 100).toFixed(2) + '%';
    const FTPercentDiffLabel =
        parseFloat(seasonStats.FTPercentDiff * 100).toFixed(2) + '%';
    const TPPercentDiffLabel =
        parseFloat(seasonStats.TPPercentDiff * 100).toFixed(2) + '%';
    const OffenseRow = () => {
        return (
            <tr>
                <th className="">{team.Team}</th>
                <th className="">{team.Conference}</th>
                <th className="">{games}</th>
                <td label="">{parseFloat(seasonStats.PPG).toFixed(2)}</td>
                <td label="">{parseFloat(seasonStats.FGMPG).toFixed(2)}</td>
                <td label="">{parseFloat(seasonStats.FGAPG).toFixed(2)}</td>
                <td label="">{FGPercentLabel}</td>
                <td label="">{parseFloat(seasonStats.TPMPG).toFixed(2)}</td>
                <td label="">{parseFloat(seasonStats.TPAPG).toFixed(2)}</td>
                <td label="">{TPPercentLabel}</td>
                <td label="">{parseFloat(seasonStats.FTMPG).toFixed(2)}</td>
                <td label="">{parseFloat(seasonStats.FTAPG).toFixed(2)}</td>
                <td label="">{FTPercentLabel}</td>
                <td label="">
                    {parseFloat(seasonStats.OffReboundsPerGame).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.DefReboundsPerGame).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.ReboundsPerGame).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.AssistsPerGame).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.StealsPerGame).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.BlocksPerGame).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.TurnoversPerGame).toFixed(2)}
                </td>
            </tr>
        );
    };

    const DefenseRow = () => {
        return (
            <tr>
                <th className="">{team.Team}</th>
                <th className="">{team.Conference}</th>
                <th className="">{games}</th>
                <td label="">{parseFloat(seasonStats.PAPG).toFixed(2)}</td>
                <td label="">{parseFloat(seasonStats.FGMAPG).toFixed(2)}</td>
                <td label="">{parseFloat(seasonStats.FGAAPG).toFixed(2)}</td>
                <td label="">{FGPercentAllowedLabel}</td>
                <td label="">{parseFloat(seasonStats.TPMAPG).toFixed(2)}</td>
                <td label="">{parseFloat(seasonStats.TPAAPG).toFixed(2)}</td>
                <td label="">{TPPercentAllowedLabel}</td>
                <td label="">{parseFloat(seasonStats.FTMAPG).toFixed(2)}</td>
                <td label="">{parseFloat(seasonStats.FTAAPG).toFixed(2)}</td>
                <td label="">{FTPercentAllowedLabel}</td>
                <td label="">
                    {parseFloat(seasonStats.OffReboundsAllowedPerGame).toFixed(
                        2
                    )}
                </td>
                <td label="">
                    {parseFloat(seasonStats.DefReboundsAllowedPerGame).toFixed(
                        2
                    )}
                </td>
                <td label="">
                    {parseFloat(seasonStats.ReboundsAllowedPerGame).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.AssistsAllowedPerGame).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.StealsAllowedPerGame).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.BlocksAllowedPerGame).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.TurnoversAllowedPerGame).toFixed(2)}
                </td>
            </tr>
        );
    };
    const DifferentialRow = () => {
        return (
            <tr>
                <th className="">{team.Team}</th>
                <th className="">{team.Conference}</th>
                <th className="">{games}</th>
                <td label="">
                    {parseFloat(seasonStats.PointsDiff).toFixed(2)}
                </td>
                <td label="">{parseFloat(seasonStats.FGMDiff).toFixed(2)}</td>
                <td label="">{parseFloat(seasonStats.FGADiff).toFixed(2)}</td>
                <td label="">{FGPercentDiffLabel}</td>
                <td label="">{parseFloat(seasonStats.TPMDiff).toFixed(2)}</td>
                <td label="">{parseFloat(seasonStats.TPADiff).toFixed(2)}</td>
                <td label="">{TPPercentDiffLabel}</td>
                <td label="">{parseFloat(seasonStats.FTMDiff).toFixed(2)}</td>
                <td label="">{parseFloat(seasonStats.FTADiff).toFixed(2)}</td>
                <td label="">{FTPercentDiffLabel}</td>
                <td label="">
                    {parseFloat(seasonStats.OReboundsDiff).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.DReboundsDiff).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.ReboundsDiff).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.AssistsDiff).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.StealsDiff).toFixed(2)}
                </td>
                <td label="">
                    {parseFloat(seasonStats.BlocksDiff).toFixed(2)}
                </td>
                <td label="">{parseFloat(seasonStats.TODiff).toFixed(2)}</td>
            </tr>
        );
    };

    if (statType === 'Offense') return <OffenseRow />;
    if (statType === 'Defense') return <DefenseRow />;
    if (statType === 'Differential') return <DifferentialRow />;
    return '';
};

export default CBBTeamStatRow;
