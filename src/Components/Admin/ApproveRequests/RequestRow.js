import React from 'react';

const RequestRow = (props) => {
    let data = props.request;

    const approve = () => {
        const payload = {
            username: data.Username,
            team: data.Team,
            mascot: data.Nickname,
            teamAbbr: data.Abbr,
            teamId: data.TeamId,
            reqId: data.id
        };
        return props.approve(payload);
    };

    const reject = () => {
        return props.reject({ reqId: data.TeamId, id: data.id });
    };

    return (
        <tr>
            <td>{data.Team + ' ' + data.Nickname}</td>
            <td>{data.Current_Conference}</td>
            <td>{data.Username}</td>
            <td>
                <h2>
                    <i
                        className="bi bi-check-circle rounded-circle link-success"
                        onClick={approve}
                    ></i>
                </h2>
            </td>
            <td>
                <h2>
                    <i
                        className="bi bi-x-circle rounded-circle link-danger"
                        onClick={reject}
                    ></i>
                </h2>
            </td>
        </tr>
    );
};

export default RequestRow;
