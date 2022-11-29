import React from 'react';

export const CBBOverallHeader = ({ sortFunc, cv }) => {
    const returnSort = (val) => {
        return sortFunc(val);
    };
    return (
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Team</th>
            <th scope="col">GP</th>
            <th scope="col" onClick={() => returnSort('Minutes', cv)}>
                Minutes
            </th>
            <th scope="col" onClick={() => returnSort('Possessions', cv)}>
                Possessions
            </th>
            <th scope="col" onClick={() => returnSort('Points', cv)}>
                PTS
            </th>
            <th scope="col" onClick={() => returnSort('FGM', cv)}>
                FGM
            </th>
            <th scope="col" onClick={() => returnSort('FGA', cv)}>
                FGA
            </th>
            <th scope="col" onClick={() => returnSort('FGPercent', cv)}>
                FG%
            </th>
            <th scope="col" onClick={() => returnSort('ThreePointsMade', cv)}>
                3PM
            </th>
            <th
                scope="col"
                onClick={() => returnSort('ThreePointAttempts', cv)}
            >
                3PA
            </th>
            <th scope="col" onClick={() => returnSort('ThreePointPercent', cv)}>
                3P%
            </th>
            <th scope="col" onClick={() => returnSort('FTM', cv)}>
                FTM
            </th>{' '}
            <th scope="col" onClick={() => returnSort('FTA', cv)}>
                FTA
            </th>
            <th scope="col" onClick={() => returnSort('FTPercent', cv)}>
                FT%
            </th>
            <th scope="col" onClick={() => returnSort('OffRebounds', cv)}>
                OR
            </th>
            <th scope="col" onClick={() => returnSort('DefRebounds', cv)}>
                DR
            </th>
            <th scope="col" onClick={() => returnSort('Rebounds', cv)}>
                REB
            </th>
            <th scope="col" onClick={() => returnSort('Assists', cv)}>
                AST
            </th>
            <th scope="col" onClick={() => returnSort('Steals', cv)}>
                STL
            </th>
            <th scope="col" onClick={() => returnSort('Blocks', cv)}>
                BLK
            </th>
            <th scope="col" onClick={() => returnSort('Turnovers', cv)}>
                TO
            </th>
        </tr>
    );
};
