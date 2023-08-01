import React from 'react';

const DefensiveHeaders = ({ sortFunc, cv, viewType }) => {
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
            <th scope="col" onClick={() => returnSort('Tackles', cv)}>
                Tackles
            </th>
            <th scope="col" onClick={() => returnSort('TacklesForLoss', cv)}>
                Tackles for Loss
            </th>
            <th scope="col" onClick={() => returnSort('SacksMade', cv)}>
                Sacks
            </th>
            <th scope="col" onClick={() => returnSort('ForcedFumbles', cv)}>
                Forced Fumbles
            </th>
            <th scope="col" onClick={() => returnSort('FumblesRecovered', cv)}>
                Recovered Fumbles
            </th>
            <th scope="col" onClick={() => returnSort('PassDeflections', cv)}>
                Pass Deflections
            </th>
            <th
                scope="col"
                onClick={() => returnSort('InterceptionsCaught', cv)}
            >
                Interceptions
            </th>
            <th scope="col" onClick={() => returnSort('Safeties', cv)}>
                Safeties
            </th>
            <th scope="col" onClick={() => returnSort('DefensiveTDs', cv)}>
                Defensive TDs
            </th>
            {viewType === 'WEEK' && <th scope="col">Opponent</th>}
        </tr>
    );
};

export default DefensiveHeaders;
