import React from 'react';

const PassingHeaders = ({ sortFunc, cv }) => {
    const returnSort = (val) => {
        return sortFunc(val);
    };
    return (
        <tr>
            <th scope="col">Games</th>
            <th scope="col">Name</th>
            <th scope="col">Year</th>
            <th scope="col">Team</th>
            <th scope="col">Position</th>
            <th scope="col">Archetype</th>
            <th scope="col" onClick={() => returnSort('PassingYards', cv)}>
                Passing Yards
            </th>
            <th scope="col" onClick={() => returnSort('PassCompletions', cv)}>
                Pass Completions
            </th>
            <th scope="col" onClick={() => returnSort('PassAttempts', cv)}>
                Passing Attempts
            </th>
            <th scope="col" onClick={() => returnSort('Completion', cv)}>
                Percentage
            </th>{' '}
            <th scope="col" onClick={() => returnSort('PassingAvg', cv)}>
                Passing Avg
            </th>
            <th scope="col" onClick={() => returnSort('PassingTDs', cv)}>
                Passing TDs
            </th>
            <th scope="col" onClick={() => returnSort('Interceptions', cv)}>
                Interceptions
            </th>
            <th scope="col" onClick={() => returnSort('Sacks', cv)}>
                Sacks
            </th>
            <th scope="col" onClick={() => returnSort('QBRating', cv)}>
                QB Rating
            </th>
            <th scope="col" onClick={() => returnSort('LongestPass', cv)}>
                Longest Pass
            </th>
        </tr>
    );
};

export default PassingHeaders;
