import React from 'react';

const TeamOverallHeaders = ({ sortFunc, cv }) => {
    const returnSort = (val) => {
        return sortFunc(val, cv);
    };
    return (
        <tr>
            <th scope="col">Games</th>
            <th scope="col">Team</th>
            <th scope="col">
                <abbr title="Conference">Conf</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('PointsScored', cv)}>
                <abbr title="Points Scored">Pts</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('PointsAgainst', cv)}>
                <abbr title="Points Against">Pts All</abbr>
            </th>
            <th
                scope="col"
                onClick={() => returnSort('TotalOffensiveYards', cv)}
            >
                <abbr title="Total Offensive Yards">Tot Off Yds</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('TotalYardsAllowed', cv)}>
                <abbr title="Total Yards Allowed">Tot Yds All</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('PassingYards', cv)}>
                <abbr title="Passing Yards">Pass Yds</abbr>
            </th>
            <th
                scope="col"
                onClick={() => returnSort('PassingYardsAllowed', cv)}
            >
                <abbr title="Passing Yards Allowed">Pass Yds All</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('RushingYards', cv)}>
                <abbr title="Rushing Yards">Ru Yds</abbr>
            </th>
            <th
                scope="col"
                onClick={() => returnSort('RushingYardsAllowed', cv)}
            >
                <abbr title="Rushing Yards Allowed">Ru Yds All</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('Turnovers', cv)}>
                Turnovers
            </th>
            <th
                scope="col"
                onClick={() => returnSort('OffensivePenalties', cv)}
            >
                <abbr title="Offensive Penalties">Off Pen</abbr>
            </th>
            <th
                scope="col"
                onClick={() => returnSort('DefensivePenalties', cv)}
            >
                <abbr title="Defensive Penalties">Def Pen</abbr>
            </th>
        </tr>
    );
};

export default TeamOverallHeaders;
