import React from 'react';

const BBAManageTeamRow = (props) => {
    let data = props.team;

    const revoke = () => {
        const payload = {
            username: data.Coach,
            team: data.Team,
            mascot: data.Nickname,
            teamAbbr: data.Abbr,
            reqId: data.ID,
            IsNBA: data.IsNBA
        };
        return props.revoke(payload);
    };

    return (
        <tr>
            <td>{data.Team + ' ' + data.Nickname}</td>
            <td>{data.Coach}</td>
            <td>{data.Conference}</td>
            <td>{data.IsNBA ? 'NBA' : 'College'}</td>
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

export default BBAManageTeamRow;
