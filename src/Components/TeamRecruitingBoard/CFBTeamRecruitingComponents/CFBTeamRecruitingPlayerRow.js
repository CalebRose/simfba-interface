import React from 'react';
import { GetOverall } from '../../../_Utility/RosterHelper';
import ConfirmRemovePlayerFromBoardModal from './CFBTeamRemovePlayerModal';
import ConfirmRevokeModal from './CFBTeamRevokeScholarshipModal';

const CFBTeamDashboardPlayerRow = (props) => {
    const { recruitProfile, idx } = props;
    const { Recruit } = recruitProfile;
    const revokeModalTarget = '#revokeModal' + idx;
    const removeModalTarget = '#removeModal' + idx;

    const leadingTeamsMapper = (croot) => {
        // Show list of leading teams
        if (
            croot.RecruitPlayerProfiles == null ||
            croot.RecruitPlayerProfiles.length === 0
        )
            return 'None';

        const competingTeams = croot.RecruitPlayerProfiles.filter(
            (x, idx) => x.TotalPoints > 0 && idx <= 2
        );
        const teamAbbrs = competingTeams.map((x) => x.TeamAbbreviation);
        return teamAbbrs.join(', ');
    };

    const leadingTeams = leadingTeamsMapper(Recruit);

    const name = Recruit.FirstName + ' ' + Recruit.LastName;
    const CrootOverall = GetOverall(Recruit.Overall);

    // LeadingTeamsMapper

    const handleChange = (event) => {
        return props.changePoints(idx, event);
    };

    const toggleScholarship = () => {
        return props.toggleScholarship(idx, recruitProfile);
    };

    const removePlayerFromBoard = () => {
        // return removeFromBoard function
        return props.remove(idx, recruitProfile);
    };

    return (
        <>
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
                    {recruitProfile.ScholarshipRevoked ? (
                        <h2>
                            <i className="bi bi-heartbreak-fill link-danger" />
                        </h2>
                    ) : recruitProfile.Scholarship ? (
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
                    <h6>{name}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.Position}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.Archetype}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.HighSchool}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.City}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.State}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.Height}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.Weight}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.Stars}</h6>
                </td>
                <td className="align-middle">
                    <h6>{CrootOverall}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.PotentialGrade}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.AffinityOne}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.AffinityTwo}</h6>
                </td>
                <td className="align-middle">
                    <h6>{leadingTeams}</h6>
                </td>
                <td className="align-middle">
                    <h6>
                        <input
                            name="CurrentPoints"
                            type="number"
                            className="form-control"
                            id="currentPoints"
                            aria-describedby="currentPoints"
                            value={recruitProfile.CurrentWeeksPoints}
                            onChange={handleChange}
                        />
                    </h6>
                </td>
                <td className="align-middle">
                    <h6>{recruitProfile.TotalPoints}</h6>
                </td>
                <td className="align-middle">
                    <button
                        type="button"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target={removeModalTarget}
                    >
                        <h2>
                            <i className="bi bi-x-circle-fill rounded-circle link-danger"></i>
                        </h2>
                    </button>
                </td>
            </tr>
        </>
    );
};

export default CFBTeamDashboardPlayerRow;
