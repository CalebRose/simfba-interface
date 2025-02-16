import React from 'react';

const CBBTeamStatRow = ({ statType, idx, team, viewType }) => {
    const s = viewType === 'SEASON' ? team.SeasonStats : team.Stats;
    const games = team.SeasonStats ? team.SeasonStats.GamesPlayed : 0;
    const FGPercentLabel = parseFloat(s.FGPercent * 100).toFixed(2) + '%';
    const FTPercentLabel = parseFloat(s.FTPercent * 100).toFixed(2) + '%';
    const TPPercentLabel =
        parseFloat(s.ThreePointPercent * 100).toFixed(2) + '%';
    const FGPercentAllowedLabel =
        parseFloat(s.FGPercentAgainst * 100).toFixed(2) + '%';
    const FTPercentAllowedLabel =
        parseFloat(s.FTPercentAgainst * 100).toFixed(2) + '%';
    const TPPercentAllowedLabel =
        parseFloat(s.ThreePointPercentAgainst * 100).toFixed(2) + '%';
    const FGPercentDiffLabel =
        parseFloat(s.FGPercentDiff * 100).toFixed(2) + '%';
    const FTPercentDiffLabel =
        parseFloat(s.FTPercentDiff * 100).toFixed(2) + '%';
    const TPPercentDiffLabel =
        parseFloat(s.TPPercentDiff * 100).toFixed(2) + '%';
    const OffenseRow = () => {
        return (
            <tr>
                <th className="">{team.Team}</th>
                <th className="">{team.Conference}</th>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                {viewType === 'SEASON' && (
                    <>
                        <td label="">{parseFloat(s.PPG).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FGMPG).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FGAPG).toFixed(2)}</td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        <td label="">{parseFloat(s.Points).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FGM).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FGA).toFixed(2)}</td>
                    </>
                )}
                <td label="">{FGPercentLabel}</td>
                {viewType === 'SEASON' && (
                    <>
                        <td label="">{parseFloat(s.TPMPG).toFixed(2)}</td>
                        <td label="">{parseFloat(s.TPAPG).toFixed(2)}</td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        <td label="">
                            {parseFloat(s.ThreePointsMade).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.ThreePointAttempts).toFixed(2)}
                        </td>
                    </>
                )}

                <td label="">{TPPercentLabel}</td>
                {viewType === 'SEASON' && (
                    <>
                        <td label="">{parseFloat(s.FTMPG).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FTAPG).toFixed(2)}</td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        <td label="">{parseFloat(s.FTM).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FTA).toFixed(2)}</td>
                    </>
                )}

                <td label="">{FTPercentLabel}</td>
                {viewType === 'SEASON' && (
                    <>
                        <td label="">
                            {parseFloat(s.OffReboundsPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.DefReboundsPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.ReboundsPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.AssistsPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.StealsPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.BlocksPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.TurnoversPerGame).toFixed(2)}
                        </td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        <td label="">{parseFloat(s.OffRebounds).toFixed(2)}</td>
                        <td label="">{parseFloat(s.DefRebounds).toFixed(2)}</td>
                        <td label="">{parseFloat(s.Rebounds).toFixed(2)}</td>
                        <td label="">{parseFloat(s.Assists).toFixed(2)}</td>
                        <td label="">{parseFloat(s.Steals).toFixed(2)}</td>
                        <td label="">{parseFloat(s.Blocks).toFixed(2)}</td>
                        <td label="">
                            {parseFloat(s.TotalTurnovers).toFixed(2)}
                        </td>
                    </>
                )}
            </tr>
        );
    };

    const DefenseRow = () => {
        return (
            <tr>
                <th className="">{team.Team}</th>
                <th className="">{team.Conference}</th>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                {viewType === 'SEASON' && (
                    <>
                        <td label="">{parseFloat(s.PAPG).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FGMAPG).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FGAAPG).toFixed(2)}</td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        <td label="">
                            {parseFloat(s.PointsAgainst).toFixed(2)}
                        </td>
                        <td label="">{parseFloat(s.FGMAgainst).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FGAAgainst).toFixed(2)}</td>
                    </>
                )}

                <td label="">{FGPercentAllowedLabel}</td>
                {viewType === 'SEASON' && (
                    <>
                        <td label="">{parseFloat(s.TPMAPG).toFixed(2)}</td>
                        <td label="">{parseFloat(s.TPAAPG).toFixed(2)}</td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        <td label="">
                            {parseFloat(s.ThreePointsMadeAgainst).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.ThreePointAttemptsAgainst).toFixed(2)}
                        </td>
                    </>
                )}
                <td label="">{TPPercentAllowedLabel}</td>
                {viewType === 'SEASON' && (
                    <>
                        {' '}
                        <td label="">{parseFloat(s.FTMAPG).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FTAAPG).toFixed(2)}</td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        {' '}
                        <td label="">{parseFloat(s.FTMAgainst).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FTAAgainst).toFixed(2)}</td>
                    </>
                )}
                <td label="">{FTPercentAllowedLabel}</td>
                {viewType === 'SEASON' && (
                    <>
                        <td label="">
                            {parseFloat(s.OffReboundsAllowedPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.DefReboundsAllowedPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.ReboundsAllowedPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.AssistsAllowedPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.StealsAllowedPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.BlocksAllowedPerGame).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.TurnoversAllowedPerGame).toFixed(2)}
                        </td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        <td label="">
                            {parseFloat(s.OffReboundsAllowed).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.DefReboundsAllowed).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.ReboundsAllowed).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.AssistsAllowed).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.StealsAllowed).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.BlocksAllowed).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.TurnoversAllowed).toFixed(2)}
                        </td>
                    </>
                )}
            </tr>
        );
    };
    const DifferentialRow = () => {
        return (
            <tr>
                <th className="">{team.Team}</th>
                <th className="">{team.Conference}</th>
                {viewType === 'SEASON' && <th className="">{games}</th>}
                {viewType === 'SEASON' && (
                    <>
                        <td label="">{parseFloat(s.PointsDiff).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FGMDiff).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FGADiff).toFixed(2)}</td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        <td label=""></td>
                        <td label=""></td>
                        <td label=""></td>
                    </>
                )}
                <td label="">{FGPercentDiffLabel}</td>
                {viewType === 'SEASON' && (
                    <>
                        <td label="">{parseFloat(s.TPMDiff).toFixed(2)}</td>
                        <td label="">{parseFloat(s.TPADiff).toFixed(2)}</td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        <td label=""></td>
                        <td label=""></td>
                    </>
                )}

                <td label="">{TPPercentDiffLabel}</td>
                {viewType === 'SEASON' && (
                    <>
                        <td label="">{parseFloat(s.FTMDiff).toFixed(2)}</td>
                        <td label="">{parseFloat(s.FTADiff).toFixed(2)}</td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        <td label=""></td>
                        <td label=""></td>
                    </>
                )}

                <td label="">{FTPercentDiffLabel}</td>
                {viewType === 'SEASON' && (
                    <>
                        <td label="">
                            {parseFloat(s.OReboundsDiff).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.DReboundsDiff).toFixed(2)}
                        </td>
                        <td label="">
                            {parseFloat(s.ReboundsDiff).toFixed(2)}
                        </td>
                        <td label="">{parseFloat(s.AssistsDiff).toFixed(2)}</td>
                        <td label="">{parseFloat(s.StealsDiff).toFixed(2)}</td>
                        <td label="">{parseFloat(s.BlocksDiff).toFixed(2)}</td>
                        <td label="">{parseFloat(s.TODiff).toFixed(2)}</td>
                    </>
                )}
                {viewType !== 'SEASON' && (
                    <>
                        <td label=""></td>
                        <td label=""></td>
                        <td label=""></td>
                        <td label=""></td>
                        <td label=""></td>
                        <td label=""></td>
                        <td label=""></td>
                    </>
                )}
            </tr>
        );
    };

    if (statType === 'Offense') return <OffenseRow />;
    if (statType === 'Defense') return <DefenseRow />;
    if (statType === 'Differential') return <DifferentialRow />;
    return '';
};

export default CBBTeamStatRow;
