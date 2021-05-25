import React from 'react';

const BBARequestRow = (props) => {
    let data = props.request;

    const approve = () => {
        let payload = {};
        if (data.IsNBA === false) {
            payload = {
                Username: data.Username,
                Conference: data.Conference,
                IsApproved: true,
                cbb_team: data.Team,
                cbb_abbr: data.Abbr,
                cbb_id: data.TeamID,
                reqId: data.ID,
                Team: data.Team
            };
        }

        return props.approve(payload);
    };

    const reject = () => {
        return props.reject({ reqId: data.TeamID, id: data.ID });
    };

    return (
        <tr>
            <td>{data.Team}</td>
            <td>{data.Conference}</td>
            <td>{data.Username}</td>
            <td>{data.IsNBA ? 'NBA' : 'College'}</td>
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

export default BBARequestRow;
