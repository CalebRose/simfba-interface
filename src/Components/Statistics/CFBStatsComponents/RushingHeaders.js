import React from 'react';

const RushingHeaders = ({ sortFunc, cv }) => {
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
            <th scope="col" onClick={() => returnSort('RushingYards', cv)}>
                Rushing Yards
            </th>
            <th scope="col" onClick={() => returnSort('RushAttempts', cv)}>
                Rush Attempts
            </th>
            <th scope="col" onClick={() => returnSort('RushingAvg', cv)}>
                Rush Avg.
            </th>
            <th scope="col" onClick={() => returnSort('RushingTDs', cv)}>
                Rushing TDs
            </th>
            <th scope="col" onClick={() => returnSort('Fumbles', cv)}>
                Fumbles
            </th>
            <th scope="col" onClick={() => returnSort('LongestRush', cv)}>
                Longest Rush
            </th>
        </tr>
    );
};

export default RushingHeaders;
