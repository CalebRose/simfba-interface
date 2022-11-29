import React from 'react';

export const CBBPerGameHeader = ({ sortFunc, cv }) => {
    const returnSort = (val) => {
        return sortFunc(val);
    };
    return (
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Team</th>
            <th scope="col">GP</th>
            <th scope="col" onClick={() => returnSort('MinutesPerGame', cv)}>
                MPG
            </th>
            <th
                scope="col"
                label="Possessions Per Game"
                onClick={() => returnSort('PossessionsPerGame', cv)}
            >
                PPG
            </th>
            <th scope="col" onClick={() => returnSort('PPG', cv)}>
                PTS
            </th>
            <th scope="col" onClick={() => returnSort('FGMPG', cv)}>
                FGM
            </th>
            <th scope="col" onClick={() => returnSort('FGAPG', cv)}>
                FGA
            </th>
            <th scope="col" onClick={() => returnSort('FGPercent', cv)}>
                FG%
            </th>
            <th
                scope="col"
                onClick={() => returnSort('ThreePointsMadePerGame', cv)}
            >
                3PM
            </th>
            <th
                scope="col"
                onClick={() => returnSort('ThreePointAttemptsPerGame', cv)}
            >
                3PA
            </th>
            <th scope="col" onClick={() => returnSort('ThreePointPercent', cv)}>
                3P%
            </th>
            <th scope="col" onClick={() => returnSort('FTMPG', cv)}>
                FTM
            </th>{' '}
            <th scope="col" onClick={() => returnSort('FTAPG', cv)}>
                FTA
            </th>
            <th scope="col" onClick={() => returnSort('FTPercent', cv)}>
                FT%
            </th>
            <th
                scope="col"
                onClick={() => returnSort('OffReboundsPerGame', cv)}
            >
                OR
            </th>
            <th
                scope="col"
                onClick={() => returnSort('DefReboundsPerGame', cv)}
            >
                DR
            </th>
            <th scope="col" onClick={() => returnSort('ReboundsPerGame', cv)}>
                REB
            </th>
            <th scope="col" onClick={() => returnSort('AssistsPerGame', cv)}>
                AST
            </th>
            <th scope="col" onClick={() => returnSort('StealsPerGame', cv)}>
                STL
            </th>
            <th scope="col" onClick={() => returnSort('BlocksPerGame', cv)}>
                BLK
            </th>
            <th scope="col" onClick={() => returnSort('TurnoversPerGame', cv)}>
                TO
            </th>
        </tr>
    );
};
