import React from 'react';

const TeamRow = (props) => {
    let data = props.team;

    const revoke = () => {
        const payload = {
            username: data.Coach,
            team: data.Team,
            mascot: data.Nickname,
            teamAbbr: data.Abbr,
            reqId: data.id
        };
        return props.revoke(payload);
    };

    return (
        <tr>
            <td>{data.Team + ' ' + data.Nickname}</td>
            <td>{data.Coach}</td>
            <td>{data.Current_Conference}</td>
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
