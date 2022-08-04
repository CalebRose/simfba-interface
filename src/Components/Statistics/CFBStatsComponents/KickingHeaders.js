import React from 'react';

const KickingHeaders = ({ sortFunc, cv }) => {
    const returnSort = (val) => {
        return sortFunc(val);
    };
    return (
        <tr>
            <th scope="col">Games</th>
            <th scope="col">Name</th>
            <th scope="col">Team</th>
            <th scope="col">Position</th>
            <th scope="col">Archetype</th>
            <th scope="col" onClick={() => returnSort('FGMade', cv)}>
                FG Made
            </th>
            <th scope="col" onClick={() => returnSort('FGAttempts', cv)}>
                FG Attempts
            </th>
            <th scope="col" onClick={() => returnSort('LongestFG', cv)}>
                Longest FG
            </th>
            <th scope="col" onClick={() => returnSort('ExtraPointsMade', cv)}>
                XP Made
            </th>
            <th
                scope="col"
                onClick={() => returnSort('ExtraPointsAttempted', cv)}
            >
                XP Attempts
            </th>
            <th scope="col" onClick={() => returnSort('Punts', cv)}>
                Punts
            </th>
            <th scope="col" onClick={() => returnSort('PuntsInside20', cv)}>
                Punts Inside 20
            </th>
        </tr>
    );
};

export default KickingHeaders;
