import React from 'react';

const StandingsTableRow = (props) => {
    return (
        <tr>
            <th scope="row">{props.rank}</th>
            <td>{props.record.team}</td>
            <td>{props.record.conferenceWins}</td>
            <td>{props.record.conferenceLosses}</td>
            <td>{props.record.totalWins}</td>
            <td>{props.record.totalLosses}</td>
        </tr>
    );
};

export default StandingsTableRow;
