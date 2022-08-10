import React from 'react';

const TeamRow = (props) => {
    let data = props.team;

    const revoke = () => {
        const payload = {
            username: data.Coach,
            team: data.TeamName,
            mascot: data.Mascot,
            teamAbbr: data.TeamAbbr,
            reqId: data.ID
        };
        return props.revoke(payload);
    };

    return (
        <tr>
            <td>{data.TeamName + ' ' + data.Mascot}</td>
            <td>{data.Coach}</td>
            <td>{data.Conference}</td>
            <td>
                <h2>
                    <i
                        className="bi bi-x-circle rounded-circle link-danger"
                        onClick={revoke}
                    ></i>
                </h2>
            </td>
        </tr>
    );
};

export default TeamRow;
