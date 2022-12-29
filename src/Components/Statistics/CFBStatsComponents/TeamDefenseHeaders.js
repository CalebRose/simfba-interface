import React from 'react';

const TeamDefensiveHeaders = ({ sortFunc, cv }) => {
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
            <th scope="col">
                <abbr
                    title="Points Against"
                    onClick={() => returnSort('PointsAgainst', cv)}
                >
                    Pts All
                </abbr>
            </th>
            <th scope="col" onClick={() => returnSort('TotalYardsAllowed', cv)}>
                <abbr title="Total Yards Allowed">Tot Yds All</abbr>
            </th>
            <th
                scope="col"
                onClick={() => returnSort('PassingYardsAllowed', cv)}
            >
                <abbr title="Passing Yards Allowed">Pass Yds All</abbr>
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
            <th scope="col" onClick={() => returnSort('Tackles', cv)}>
                Tackles
            </th>
            <th scope="col" onClick={() => returnSort('TacklesForLoss', cv)}>
                <abbr title="Tackles for Loss">TFL</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('DefensiveSacks', cv)}>
                <abbr title="Defensive Sacks">Sacks</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('ForcedFumbles', cv)}>
                <abbr title="Forced Fumbles">FF</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('FumblesRecovered', cv)}>
                <abbr title="Recovered Fumbles">RF</abbr>
            </th>
            <th
                scope="col"
                onClick={() => returnSort('DefensiveInterceptions', cv)}
            >
                <abbr title="Interceptions">INTs</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('Safeties', cv)}>
                Safeties
            </th>
            <th
                scope="col"
                onClick={() => returnSort('DefensiveTouchdowns', cv)}
            >
                <abbr title="Defensive TDs">Def TDs</abbr>
            </th>
        </tr>
    );
};

export default TeamDefensiveHeaders;
