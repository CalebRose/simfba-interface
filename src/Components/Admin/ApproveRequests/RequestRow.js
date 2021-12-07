import React from 'react';

const RequestRow = (props) => {
    let data = props.request;

    const approve = () => {
        const payload = {
            username: data.Username,
            team: data.TeamName,
            teamAbbr: data.TeamAbbr,
            teamId: data.TeamID,
            reqId: data.ID
        };
        return props.approve(payload);
    };

    const reject = () => {
        return props.reject({
            ReqID: data.TeamID,
            ID: data.ID,
            Username: data.Username
        });
    };

    return (
        <tr>
            <td>{data.TeamName}</td>
            <td>{data.Conference}</td>
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
