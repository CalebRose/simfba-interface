import React from 'react';

const NFLStandingsTableRow = (props) => {
    return (
        <tr>
            <th scope="row">{props.rank}</th>
            <td>{props.record.team}</td>
            <td>{props.record.divisionWins}</td>
            <td>{props.record.divisionLosses}</td>
            <td>{props.record.totalWins}</td>
            <td>{props.record.totalLosses}</td>
        </tr>
    );
};

export default NFLStandingsTableRow;
