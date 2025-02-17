import React from 'react';
import { GetOverall } from '../../../_Utility/RosterHelper';
import {
    CalculateAdjustedPoints,
    isBadFit,
    isGoodFit
} from '../../../_Utility/CFBRecruitingHelper';
import CrootModal from '../../RecruitingOverview/CFBDashboardComponents/CFBDashboardCrootModal';
import ConfirmRemovePlayerFromBoardModal from './CFBTeamRemovePlayerModal';
import ConfirmRevokeModal from './CFBTeamRevokeScholarshipModal';
import { getLogo } from '../../../Constants/getLogo';
import { GetMobileCardClass } from '../../../Constants/CSSClassHelper';
import {
    MobileAttribute,
    MobileInputRow
} from '../../_Common/MobileAttributeTab';
import { SimCFB } from '../../../Constants/CommonConstants';

const CFBTeamMobilePlayerRow = (props) => {
    const { recruitProfile, idx, theme, retro, teamProfile } = props;
    const { Recruit } = recruitProfile;
    const logo =
        Recruit && Recruit.TeamID > 0
            ? getLogo(SimCFB, Recruit.TeamID, retro)
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

        const competingIDs = competingTeams.map((x) => x.TeamID);

        return competingIDs.map((x) => {
            const logo = getLogo(SimCFB, x, retro);
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

    const goodFit = isGoodFit(
        teamProfile.OffensiveScheme,
        teamProfile.DefensiveScheme,
        Recruit.Position,
        Recruit.Archetype
    );

    const badFit = isBadFit(
        teamProfile.OffensiveScheme,
        teamProfile.DefensiveScheme,
        Recruit.Position,
        Recruit.Archetype
    );

    let customClass = 'card-title';
    if (Recruit.IsCustomCroot) {
        customClass += ' text-primary';
    } else if (goodFit && !badFit) {
        customClass += ' text-success';
    } else if (!goodFit && badFit) {
        customClass += ' text-danger';
    }

    return (
        <>
            <CrootModal crt={Recruit} idx={idx} retro={retro} />
            <ConfirmRevokeModal idx={idx} revoke={toggleScholarship} />
            <ConfirmRemovePlayerFromBoardModal
                idx={idx}
                removePlayer={removePlayerFromBoard}
            />
            <div className={`${mobileCardClass} mb-2`}>
                <div className="card-body text-start">
                    <div className="row mb-2">
                        <div className="col-7">
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
                        <div className="col-5">
                            {Recruit.RecruitingStatus.length > 0 &&
                                Recruit.RecruitingStatus !== 'Signed' && (
                                    <p className="card-text text-muted">
                                        Recruiting Status:{' '}
                                        {Recruit.RecruitingStatus}
                                    </p>
                                )}
                            {!Recruit.IsSigned ? (
                                <>{leadingTeams}</>
                            ) : (
                                <>
                                    <img
                                        className="image-recruit-logo"
                                        src={logo}
                                        alt="WinningTeam"
                                    />
                                    <h6>{Recruit.College}</h6>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row d-flex mb-2 justify-content-evenly">
                    <MobileAttribute label="Overall" value={CrootOverall} />
                    <MobileAttribute
                        label="Potential"
                        value={Recruit.PotentialGrade}
                    />
                </div>
                <div className="row d-flex mb-3 justify-content-evenly">
                    {Recruit.AffinityOne.length > 0 && (
                        <MobileAttribute
                            success={recruitProfile.AffinityOneEligible}
                            label="Affinity One"
                            value={Recruit.AffinityOne}
                        />
                    )}
                    {Recruit.AffinityTwo.length > 0 && (
                        <MobileAttribute
                            success={recruitProfile.AffinityTwoEligible}
                            label="Affinity Two"
                            value={Recruit.AffinityTwo}
                        />
                    )}
                    <MobileInputRow
                        label="Total Points"
                        name="TotalPoints"
                        value={recruitProfile.TotalPoints}
                        disable={true}
                    />
                    <MobileInputRow
                        label="Current Points"
                        name="CurrentPoints"
                        value={recruitProfile.CurrentWeeksPoints}
                        disable={
                            Recruit.IsSigned || recruitProfile.CaughtCheating
                        }
                        change={handleChange}
                    />
                </div>

                <div className="row justify-content-center">
                    <div className="col d-grid justify-content-center">
                        {recruitProfile.ScholarshipRevoked ||
                        recruitProfile.CaughtCheating ? (
                            <>
                                <h2 className="text-center">
                                    <i className="bi bi-heartbreak-fill link-danger card-link" />
                                </h2>
                                <h6 className="text-center">
                                    Revoked Scholarship
                                </h6>
                            </>
                        ) : recruitProfile.Scholarship ? (
                            <>
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
                                <h6 className="text-center">Scholarship</h6>
                            </>
                        ) : recruitProfile.IsSigned ? (
                            <>
                                <h2 className="text-center">
                                    <i className="bi bi-plus-circle-fill card-link" />
                                </h2>
                                <h6 className="text-center">Signed</h6>
                            </>
                        ) : recruitProfile.IsLocked ? (
                            <>
                                <h2 className="text-center">
                                    <i className="bi bi-file-lock-fill card-link"></i>
                                </h2>
                                <h6 className="text-center">
                                    Signed Elsewhere
                                </h6>
                            </>
                        ) : (
                            <>
                                <h2 className="text-center">
                                    <i
                                        className="bi bi-plus-circle-fill card-link card-link"
                                        onClick={toggleScholarship}
                                    />
                                </h2>
                                <h6 className="text-center">
                                    Offer Scholarship
                                </h6>
                            </>
                        )}
                    </div>
                    <div className="col d-grid justify-content-center">
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
                        <h6 className="text-center">Remove</h6>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CFBTeamMobilePlayerRow;
