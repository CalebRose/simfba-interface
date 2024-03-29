import React from 'react';

const ReceivingHeaders = ({ sortFunc, cv, viewType }) => {
    const returnSort = (val) => {
        return sortFunc(val, cv);
    };

    return (
        <tr>
            {viewType === 'SEASON' && <th scope="col">Games</th>}
            <th scope="col">Name</th>
            <th scope="col">Year</th>
            <th scope="col">Team</th>
            <th scope="col">Position</th>
            <th scope="col">Archetype</th>
            <th scope="col" onClick={() => returnSort('Catches', cv)}>
                Catches
            </th>
            <th scope="col" onClick={() => returnSort('Targets', cv)}>
                Targets
            </th>
            <th scope="col" onClick={() => returnSort('ReceivingYards', cv)}>
                Receiving Yards
            </th>
            <th scope="col" onClick={() => returnSort('ReceivingAvg', cv)}>
                Receiving Avg.
            </th>
            <th scope="col" onClick={() => returnSort('ReceivingTDs', cv)}>
                Receiving TDs
            </th>
            <th scope="col" onClick={() => returnSort('Fumbles', cv)}>
                Fumbles
            </th>
            <th scope="col" onClick={() => returnSort('LongestReception', cv)}>
                Longest Reception
            </th>
            {viewType === 'WEEK' && <th scope="col">Opponent</th>}
        </tr>
    );
};

export default ReceivingHeaders;
