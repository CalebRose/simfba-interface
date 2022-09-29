import React from 'react';

const OLineHeaders = ({ sortFunc, cv }) => {
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
            <th scope="col" onClick={() => returnSort('Pancakes', cv)}>
                Pancakes
            </th>
            <th scope="col" onClick={() => returnSort('SacksAllowed', cv)}>
                Sacks Allowed
            </th>
        </tr>
    );
};

export default OLineHeaders;
