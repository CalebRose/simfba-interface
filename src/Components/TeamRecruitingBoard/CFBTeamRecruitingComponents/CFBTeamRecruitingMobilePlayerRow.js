import React from 'react';
import { GetOverall } from '../../../_Utility/RosterHelper';
import { CalculateAdjustedPoints } from '../../../_Utility/CFBRecruitingHelper';
import CrootModal from '../../RecruitingOverview/CFBDashboardComponents/CFBDashboardCrootModal';
import ConfirmRemovePlayerFromBoardModal from './CFBTeamRemovePlayerModal';
import ConfirmRevokeModal from './CFBTeamRevokeScholarshipModal';
import { getLogo } from '../../../Constants/getLogo';
import { GetMobileCardClass } from '../../../Constants/CSSClassHelper';

const CFBTeamMobilePlayerRow = (props) => {
    const { recruitProfile, idx, theme, retro } = props;
    const { Recruit } = recruitProfile;
    const logo =
        Recruit && Recruit.College.length > 0
            ? getLogo(Recruit.College, retro)
            : '';
    const crootModalTarget = '#crootModal' + idx;
    const revokeModalTarget = '#revokeModal' + idx;
    const removeModalTarget = '#removeModal' + idx;
    const mobileCardClass = GetMobileCardClass(theme);
    const leadingTeamsMapper = (croot) => {
        // Show list of leading teams
        if (croot.LeadingTeams == null || croot.LeadingTeams.length === 0)
            return 'None';

        const competingTeams = croot.LeadingTeams.filter(
            (x, idx) => idx <= 2 && x.Odds > 0
        );

        const competingAbbrs = competingTeams.map((x) => x.TeamAbbr);

        return competingAbbrs.map((x) => {
            const logo = getLogo(x, retro);
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

    const customClass = Recruit.IsCustomClass
        ? 'card-title text-primary'
        : 'card-title';

    return (
        <>
            <CrootModal crt={Recruit} idx={idx} />
            <ConfirmRevokeModal
                idx={idx}
                toggleScholarship={toggleScholarship}
            />
            <ConfirmRemovePlayerFromBoardModal
                idx={idx}
                removePlayer={removePlayerFromBoard}
            />
            <div className={`${mobileCardClass} mb-2`}>
                <div className="card-body">
                    <h5 className={customClass}>{name}</h5>
                    <h6 className="card-subtitle mb-2">
                        <button
                            type="button"
                            className="btn btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={crootModalTarget}
                        >
                            <i className="bi bi-info-circle" />
                        </button>
                    </h6>
                    <p className="card-text">
                        {Recruit.Stars} star {Recruit.Archetype}{' '}
                        {Recruit.Position} from {Recruit.HighSchool} in{' '}
                        {Recruit.City}, {Recruit.State}
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Overall: {CrootOverall}, Potential:{' '}
                        {Recruit.PotentialGrade}
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-sm-auto">
                                <h6
                                    className={
                                        recruitProfile.AffinityOneEligible
                                            ? 'text-success'
                                            : ''
                                    }
                                >
                                    {Recruit.AffinityOne.length > 0
                                        ? Recruit.AffinityOne
                                        : 'No Affinity'}
                                </h6>
                            </div>
                            <div className="col-sm-auto">
                                <h6
                                    className={
                                        recruitProfile.AffinityTwoEligible
                                            ? 'text-success'
                                            : ''
                                    }
                                >
                                    {Recruit.AffinityTwo}
                                </h6>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        {!Recruit.IsSigned ? (
                            <>
                                {leadingTeams} | {Recruit.RecruitingStatus}
                            </>
                        ) : (
                            <img
                                className="image-recruit-logo"
                                src={logo}
                                alt="WinningTeam"
                            />
                        )}
                    </li>
                    <li className="list-group-item">
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
                    </li>
                    {/* <li className="list-group-item">
                        <h6>Approx. Points: {adjustedPoints}</h6>
                    </li> */}
                    <li className="list-group-item">
                        <h6>Total Points: {recruitProfile.TotalPoints}</h6>
                    </li>
                </ul>
                <div className="card-body">
                    {recruitProfile.ScholarshipRevoked ||
                    recruitProfile.CaughtCheating ? (
                        <h2>
                            <i className="bi bi-heartbreak-fill link-danger card-link" />
                        </h2>
                    ) : recruitProfile.Scholarship ? (
                        <button
                            type="button"
                            className="btn card-link"
                            data-bs-toggle="modal"
                            data-bs-target={revokeModalTarget}
                        >
                            <h2>
                                <i className="bi bi-mortarboard-fill link-success card-link" />
                            </h2>
                        </button>
                    ) : recruitProfile.IsSigned ? (
                        <h2>
                            <i className="bi bi-plus-circle-fill card-link" />
                        </h2>
                    ) : recruitProfile.IsLocked ? (
                        <h2>
                            <i class="bi bi-file-lock-fill card-link"></i>
                        </h2>
                    ) : (
                        <h2>
                            <i
                                className="bi bi-plus-circle-fill card-link card-link"
                                onClick={toggleScholarship}
                            />
                        </h2>
                    )}
                    <button
                        type="button"
                        className="btn card-link card-link"
                        data-bs-toggle="modal"
                        data-bs-target={removeModalTarget}
                    >
                        <h2>
                            <i className="bi bi-x-circle-fill rounded-circle link-danger card-link"></i>
                        </h2>
                    </button>
                </div>
            </div>
        </>
    );
};

export default CFBTeamMobilePlayerRow;
