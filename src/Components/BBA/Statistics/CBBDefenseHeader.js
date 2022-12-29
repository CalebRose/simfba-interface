import React from 'react';

export const CBBDefenseHeader = ({ sortFunc, cv }) => {
    const returnSort = (val) => {
        return sortFunc(val, cv);
    };
    return (
        <tr>
            <th scope="col">Team</th>
            <th scope="col">Conf.</th>
            <th scope="col">GP</th>
            <th scope="col" onClick={() => returnSort('PAPG', cv)}>
                PTS
            </th>
            <th scope="col" onClick={() => returnSort('FGMAPG', cv)}>
                FGM
            </th>
            <th scope="col" onClick={() => returnSort('FGAAPG', cv)}>
                FGA
            </th>
            <th scope="col" onClick={() => returnSort('FGPercentAgainst', cv)}>
                FG%
            </th>
            <th scope="col" onClick={() => returnSort('TPMAPG', cv)}>
                3PM
            </th>
            <th scope="col" onClick={() => returnSort('TPAAPG', cv)}>
                3PA
            </th>
            <th
                scope="col"
                onClick={() => returnSort('ThreePointPercentAgainst', cv)}
            >
                3P%
            </th>
            <th scope="col" onClick={() => returnSort('FTMAPG', cv)}>
                FTM
            </th>{' '}
            <th scope="col" onClick={() => returnSort('FTAAPG', cv)}>
                FTA
            </th>
            <th scope="col" onClick={() => returnSort('FTPercentAgainst', cv)}>
                FT%
            </th>
            <th
                scope="col"
                onClick={() => returnSort('OffReboundsAllowedPerGame', cv)}
            >
                OR
            </th>
            <th
                scope="col"
                onClick={() => returnSort('DefReboundsAllowedPerGame', cv)}
            >
                DR
            </th>
            <th
                scope="col"
                onClick={() => returnSort('ReboundsAllowedPerGame', cv)}
            >
                REB
            </th>
            <th
                scope="col"
                onClick={() => returnSort('AssistsAllowedPerGame', cv)}
            >
                AST
            </th>
            <th
                scope="col"
                onClick={() => returnSort('StealsAllowedPerGame', cv)}
            >
                STL
            </th>
            <th
                scope="col"
                onClick={() => returnSort('BlocksAllowedPerGame', cv)}
            >
                BLK
            </th>
            <th
                scope="col"
                onClick={() => returnSort('TurnoversAllowedPerGame', cv)}
            >
                TO
            </th>
        </tr>
    );
};
