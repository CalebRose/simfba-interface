import React from 'react';

export const CBBDifferentialHeader = ({ sortFunc, cv }) => {
    const returnSort = (val) => {
        return sortFunc(val);
    };
    return (
        <tr>
            <th scope="col">Team</th>
            <th scope="col">Conf.</th>
            <th scope="col">GP</th>
            <th scope="col" onClick={() => returnSort('PointsDiff', cv)}>
                PTS
            </th>
            <th scope="col" onClick={() => returnSort('FGMDiff', cv)}>
                FGM
            </th>
            <th scope="col" onClick={() => returnSort('FGADiff', cv)}>
                FGA
            </th>
            <th scope="col" onClick={() => returnSort('FGPercentDiff', cv)}>
                FG%
            </th>
            <th scope="col" onClick={() => returnSort('TPMDiff', cv)}>
                3PM
            </th>
            <th scope="col" onClick={() => returnSort('TPADiff', cv)}>
                3PA
            </th>
            <th scope="col" onClick={() => returnSort('TPPercentDiff', cv)}>
                3P%
            </th>
            <th scope="col" onClick={() => returnSort('FTMDiff', cv)}>
                FTM
            </th>{' '}
            <th scope="col" onClick={() => returnSort('FTADiff', cv)}>
                FTA
            </th>
            <th scope="col" onClick={() => returnSort('FTPercentDiff', cv)}>
                FT%
            </th>
            <th scope="col" onClick={() => returnSort('OReboundsDiff', cv)}>
                OR
            </th>
            <th scope="col" onClick={() => returnSort('DReboundsDiff', cv)}>
                DR
            </th>
            <th scope="col" onClick={() => returnSort('ReboundsDiff', cv)}>
                REB
            </th>
            <th scope="col" onClick={() => returnSort('AssistsDiff', cv)}>
                AST
            </th>
            <th scope="col" onClick={() => returnSort('StealsDiff', cv)}>
                STL
            </th>
            <th scope="col" onClick={() => returnSort('BlocksDiff', cv)}>
                BLK
            </th>
            <th scope="col" onClick={() => returnSort('TODiff', cv)}>
                TO
            </th>
        </tr>
    );
};
