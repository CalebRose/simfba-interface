import React, { useEffect } from 'react';
import { getLogo } from '../../../../Constants/getLogo';
import ConfirmRemovePlayerFromBoardModal from '../../../TeamRecruitingBoard/CFBTeamRecruitingComponents/CFBTeamRemovePlayerModal';
import ConfirmRevokeModal from '../../../TeamRecruitingBoard/CFBTeamRecruitingComponents/CFBTeamRevokeScholarshipModal';
import CBBCrootModal from './CBBCrootModal';
import { SimCBB } from '../../../../Constants/CommonConstants';

const CBBTeamDashboardPlayerRow = (props) => {
    const viewMode = props.viewMode;
    const data = props.player;
    const idx = props.idx;
    const retro = props.retro;
    const recruit = data.Recruit;
    const logo =
        recruit && recruit.TeamID > 0
            ? getLogo(SimCBB, recruit.TeamID, retro)
            : '';
    const crootModalTarget = '#crootModal' + idx;
    const revokeModalTarget = '#revokeModal' + idx;
    const removeModalTarget = '#removeModal' + idx;

    const leadingTeamsMapper = (data) => {
        if (data.LeadingTeams == null || data.LeadingTeams.length === 0)
            return 'None';

        const competingTeams = data.LeadingTeams.filter(
            (x, idx) => idx <= 2 && x.Odds > 0
        );

        const competingIDs = competingTeams.map((x) => x.TeamID);
        return competingIDs.map((x) => {
            const logo = getLogo(SimCBB, x, retro);
            return (
                <>
                    <img
                        className="image-nfl-fa mx-1"
                        src={logo}
                        alt="competing-team"
                    />
                </>
            );
        });
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
            <CBBCrootModal crt={recruit} idx={idx} viewMode={viewMode} />
            <ConfirmRevokeModal
                idx={idx}
                revoke={toggleScholarship}
                viewMode={viewMode}
            />
            <ConfirmRemovePlayerFromBoardModal
                idx={idx}
                removePlayer={removePlayerFromBoard}
                viewMode={viewMode}
            />
            <tr>
                <th scope="row">
                    {data.IsLocked || data.IsSigned ? (
                        <h2>
                            <i className="bi bi-file-lock-fill"></i>
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
                        <i
                            className={`bi bi-info-circle ${
                                viewMode === 'dark' ? 'text-light' : ''
                            }`}
                        />
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
                    <h6>{recruit.Finishing}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Shooting2}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Shooting3}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.FreeThrow}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Ballwork}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Rebounding}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.InteriorDefense}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.PerimeterDefense}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.PotentialGrade}</h6>
                </td>
                <td className="align-middle">{recruit.SigningStatus}</td>
                <td className="align-middle">
                    {recruit.IsSigned ? (
                        <>
                            <img
                                className="image-recruit-logo"
                                src={logo}
                                alt="WinningTeam"
                            />
                            <h6>{recruit.College}</h6>
                        </>
                    ) : (
                        <h6>{leadingTeams}</h6>
                    )}
                </td>
                {recruit.IsSigned || data.CaughtCheating ? (
                    <td>
                        <input
                            name="CurrentPoints"
                            type="number"
                            className="form-control"
                            id="currentPoints"
                            aria-describedby="currentPoints"
                            value={data.CurrentWeeksPoints}
                            disabled
                        />
                    </td>
                ) : (
                    <td className="align-middle">
                        <input
                            name="CurrentPoints"
                            type="number"
                            className="form-control"
                            id="currentPoints"
                            aria-describedby="currentPoints"
                            value={data.CurrentWeeksPoints}
                            onChange={handleChange}
                            min="0"
                        />
                    </td>
                )}
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
