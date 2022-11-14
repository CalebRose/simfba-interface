import React, { useEffect } from 'react';
import ConfirmRemovePlayerFromBoardModal from '../../../TeamRecruitingBoard/CFBTeamRecruitingComponents/CFBTeamRemovePlayerModal';
import ConfirmRevokeModal from '../../../TeamRecruitingBoard/CFBTeamRecruitingComponents/CFBTeamRevokeScholarshipModal';
import CBBCrootModal from './CBBCrootModal';

const CBBTeamDashboardPlayerRow = (props) => {
    const data = props.player;
    const idx = props.idx;
    const recruit = data.Recruit;
    const logo =
        recruit && recruit.College.length > 0 ? getLogo(recruit.College) : '';
    const crootModalTarget = '#crootModal' + idx;
    const revokeModalTarget = '#revokeModal' + idx;
    const removeModalTarget = '#removeModal' + idx;

    const leadingTeamsMapper = (data) => {
        if (data.LeadingTeams == null || data.LeadingTeams.length === 0)
            return 'None';

        const competingTeams = data.LeadingTeams.filter(
            (x, idx) => idx <= 2 && x.Odds > 0
        );

        const competingAbbrs = competingTeams.map((x) => x.TeamAbbr);

        return competingAbbrs.join(', ');
    };

    const handleChange = (event) => {
        return props.changePoints(idx, event);
    };

    const toggleScholarship = () => {
        return props.toggleScholarship(idx, data);
    };

    const removePlayerFromBoard = () => {
        return props.remove(idx, data);
    };
    let leadingTeams = leadingTeamsMapper(recruit);

    return (
        <>
            <CBBCrootModal crt={recruit} idx={idx} />
            <ConfirmRevokeModal
                idx={idx}
                toggleScholarship={toggleScholarship}
            />
            <ConfirmRemovePlayerFromBoardModal
                idx={idx}
                removePlayer={removePlayerFromBoard}
            />
            <tr>
                <th scope="row">
                    {data.IsLocked ? (
                        <h2>
                            <i class="bi bi-file-lock-fill"></i>
                        </h2>
                    ) : data.ScholarshipRevoked ? (
                        <h2>
                            <i className="bi bi-heartbreak-fill link-danger" />
                        </h2>
                    ) : data.Scholarship ? (
                        <button
                            type="button"
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target={revokeModalTarget}
                        >
                            <h2>
                                <i className="bi bi-mortarboard-fill link-success" />
                            </h2>
                        </button>
                    ) : data.IsSigned ? (
                        <h2>
                            <i className="bi bi-plus-circle-fill" />
                        </h2>
                    ) : (
                        <h2>
                            <i
                                className="bi bi-plus-circle-fill"
                                onClick={toggleScholarship}
                            />
                        </h2>
                    )}
                </th>
                <td className="align-middle">
                    <h6>{recruit.Position}</h6>
                </td>
                <td className="align-middle">
                    <h6 className={recruit.IsCustomCroot ? 'text-primary' : ''}>
                        {recruit.FirstName + ' ' + recruit.LastName}
                    </h6>
                    <button
                        type="button"
                        className="btn btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target={crootModalTarget}
                    >
                        <i className="bi bi-info-circle" />
                    </button>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Height}</h6>
                </td>
                <td className="align-middle">
                    <h6>
                        {recruit.State && recruit.State.length > 0
                            ? recruit.State
                            : recruit.Country}
                    </h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Stars}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Shooting2}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Shooting3}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Finishing}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Ballwork}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Rebounding}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Defense}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.PotentialGrade}</h6>
                </td>
                <td className="align-middle">{recruit.SigningStatus}</td>
                <td className="align-middle">
                    {data.IsSigned ? (
                        <img
                            className="image-recruit-logo"
                            src={logo}
                            alt="WinningTeam"
                        />
                    ) : (
                        <h6>{leadingTeams}</h6>
                    )}
                </td>
                <td className="align-middle">
                    <input
                        name="CurrentPoints"
                        type="number"
                        class="form-control"
                        id="currentPoints"
                        aria-describedby="currentPoints"
                        value={data.CurrentWeeksPoints}
                        onChange={handleChange}
                        min="0"
                    />
                </td>
                <td className="align-middle">
                    <h6>{data.TotalPoints}</h6>
                </td>
                <td className="align-middle">
                    <button
                        type="button"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target={removeModalTarget}
                    >
                        <i className="bi bi-x-circle-fill rounded-circle link-danger" />
                    </button>
                </td>
            </tr>
        </>
    );
};

export default CBBTeamDashboardPlayerRow;
