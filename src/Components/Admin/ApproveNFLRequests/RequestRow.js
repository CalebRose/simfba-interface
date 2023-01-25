import React from 'react';

const NFLRequestRow = ({ request, approve, reject }) => {
    let data = request;

    let role = '';
    if (data.IsOwner) {
        role = 'Owner';
    } else if (data.IsManager) {
        role = 'Manager';
    } else if (data.IsCoach) {
        role = 'Coach';
    } else {
        role = 'Assistant';
    }

    const approveRequest = () => {
        return approve(request, role);
    };

    const rejectRequest = () => {
        return reject(request);
    };
    return (
        <tr>
            <td>{data.NFLTeam}</td>
            <td>{role}</td>
            <td>{data.Username}</td>
            <td>
                <h2>
                    <i
                        className="bi bi-check-circle rounded-circle link-success"
                        onClick={approveRequest}
                    ></i>
                </h2>
            </td>
            <td>
                <h2>
                    <i
                        className="bi bi-x-circle rounded-circle link-danger"
                        onClick={rejectRequest}
                    ></i>
                </h2>
            </td>
        </tr>
    );
};

export default NFLRequestRow;
