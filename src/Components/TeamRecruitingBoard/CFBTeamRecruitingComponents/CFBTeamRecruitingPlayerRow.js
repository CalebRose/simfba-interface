import React from 'react';
import { GetOverall } from '../../../_Utility/RosterHelper';
import { CalculateAdjustedPoints } from '../../../_Utility/CFBRecruitingHelper';
import CrootModal from '../../RecruitingOverview/CFBDashboardComponents/CFBDashboardCrootModal';
import ConfirmRemovePlayerFromBoardModal from './CFBTeamRemovePlayerModal';
import ConfirmRevokeModal from './CFBTeamRevokeScholarshipModal';
import { getLogo } from '../../../Constants/getLogo';

const CFBTeamDashboardPlayerRow = (props) => {
    const { recruitProfile, idx, viewMode } = props;
    const { Recruit } = recruitProfile;
    const customClass = Recruit.IsCustomCroot ? 'text-primary' : '';
    const logo =
        Recruit && Recruit.College.length > 0 ? getLogo(Recruit.College) : '';
    const crootModalTarget = '#crootModal' + idx;
    const revokeModalTarget = '#revokeModal' + idx;
    const removeModalTarget = '#removeModal' + idx;

    const totalPoints = Math.round(recruitProfile.TotalPoints * 100) / 100;

    const leadingTeamsMapper = (croot) => {
        // Show list of leading teams
        if (croot.LeadingTeams == null || croot.LeadingTeams.length === 0)
            return 'None';

        const competingTeams = croot.LeadingTeams.filter(
            (x, idx) => idx <= 2 && x.Odds > 0
        );

        const competingAbbrs = competingTeams.map((x) => x.TeamAbbr);

        return competingAbbrs.map((x) => {
            const logo = getLogo(x);
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

    const leadingTeams = leadingTeamsMapper(Recruit);

    const name = Recruit.FirstName + ' ' + Recruit.LastName;
    const CrootOverall = GetOverall(Recruit.OverallGrade);

    const adjustedPoints = CalculateAdjustedPoints(recruitProfile);

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
            <CrootModal crt={Recruit} idx={idx} viewMode={viewMode} />
            <ConfirmRevokeModal
                idx={idx}
                toggleScholarship={toggleScholarship}
                viewMode={viewMode}
            />
            <ConfirmRemovePlayerFromBoardModal
                idx={idx}
                removePlayer={removePlayerFromBoard}
                viewMode={viewMode}
            />
            <tr>
                <th scope="row">
                    {recruitProfile.IsLocked ? (
                        <h2>
                            <i class="bi bi-file-lock-fill"></i>
                        </h2>
                    ) : recruitProfile.ScholarshipRevoked ||
                      recruitProfile.CaughtCheating ? (
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
                    ) : recruitProfile.IsSigned ? (
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
                <td className="align-middle" style={{ width: 175 }}>
                    <h6 className={customClass}>{name}</h6>
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
                    <h6>{Recruit.Position}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.Archetype}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.City}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.State}</h6>
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
                    <h6
                        className={
                            recruitProfile.AffinityOneEligible
                                ? 'text-success'
                                : ''
                        }
                    >
                        {Recruit.AffinityOne}
                    </h6>
                </td>
                <td className="align-middle">
                    <h6
                        className={
                            recruitProfile.AffinityTwoEligible
                                ? 'text-success'
                                : ''
                        }
                    >
                        {Recruit.AffinityTwo}
                    </h6>
                </td>
                <td className="align-middle">
                    {Recruit.IsSigned ? (
                        <img
                            className="image-recruit-logo"
                            src={logo}
                            alt="WinningTeam"
                        />
                    ) : (
                        <>{leadingTeams}</>
                    )}
                </td>
                <td className="align-middle" style={{ width: 125 }}>
                    {Recruit.IsSigned || recruitProfile.CaughtCheating ? (
                        <h6>
                            <input
                                name="CurrentPoints"
                                type="number"
                                className="form-control"
                                id="currentPoints"
                                aria-describedby="currentPoints"
                                value={recruitProfile.CurrentWeeksPoints}
                                disabled
                            />
                        </h6>
                    ) : (
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
                    )}
                </td>
                {/* <td className="align-middle">
                    <h6>{adjustedPoints}</h6>
                </td> */}
                <td className="align-middle">
                    <h6>{totalPoints}</h6>
                </td>
                <td className="align-middle">
                    <h6>{Recruit.RecruitingStatus}</h6>
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
