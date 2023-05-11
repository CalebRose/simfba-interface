import React from 'react';

const TeamOffenseHeaders = ({ sortFunc, cv, viewType }) => {
    const returnSort = (val) => {
        return sortFunc(val, cv);
    };
    return (
        <tr>
            {viewType === 'SEASON' && <th scope="col">Games</th>}
            <th scope="col">Team</th>
            <th scope="col">
                <abbr title="Conference">Conf</abbr>
            </th>
            <th scope="col">
                <abbr
                    title="Points Scored"
                    onClick={() => returnSort('PointsScored', cv)}
                >
                    Pts
                </abbr>
            </th>
            <th scope="col">
                <abbr
                    title="Total Offensive Yards"
                    onClick={() => returnSort('TotalOffensiveYards', cv)}
                >
                    Tot Off Yds
                </abbr>
            </th>
            <th scope="col" onClick={() => returnSort('PassingYards', cv)}>
                <abbr title="Passing Yards">Pass Yds</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('PassingTouchdowns', cv)}>
                <abbr title="Passing TDs">Pass TDs</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('QBRating', cv)}>
                <abbr title="Quarterback Rating">QBR</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('QBSacks', cv)}>
                Sacks
            </th>
            <th
                scope="col"
                onClick={() => returnSort('PassingInterceptions', cv)}
            >
                <abbr title="Interceptions">INTs</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('RushingYards', cv)}>
                <abbr title="Rushing Yards">Ru Yds</abbr>
            </th>
            <th scope="col" onClick={() => returnSort('RushingTouchdowns', cv)}>
                <abbr title="Rushing TDs">Ru TDs</abbr>
            </th>
        </tr>
    );
};

export default TeamOffenseHeaders;
