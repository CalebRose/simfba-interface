import React from 'react';
import { GetMobileCardClass } from '../../../../Constants/CSSClassHelper';
import { getLogo } from '../../../../Constants/getLogo';
import ConfirmRemovePlayerFromBoardModal from '../../../TeamRecruitingBoard/CFBTeamRecruitingComponents/CFBTeamRemovePlayerModal';
import ConfirmRevokeModal from '../../../TeamRecruitingBoard/CFBTeamRecruitingComponents/CFBTeamRevokeScholarshipModal';
import CBBCrootModal from './CBBCrootModal';
import {
    MobileAttribute,
    MobileInputRow,
    MobileLabelRow
} from '../../../_Common/MobileAttributeTab';
import { SimCBB } from '../../../../Constants/CommonConstants';

const CBBTeamDashboardMobileRow = (props) => {
    const { recruitProfile, idx, theme, retro } = props;
    const recruit = recruitProfile.Recruit;
    const logo =
        recruit && recruit.TeamID > 0
            ? getLogo(SimCBB, recruit.TeamID, retro)
            : '';
    const crootModalTarget = '#crootModal' + idx;
    const revokeModalTarget = '#revokeModal' + idx;
    const removeModalTarget = '#removeModal' + idx;
    const name = recruit.FirstName + ' ' + recruit.LastName;
    const loc = recruit.Country === 'USA' ? recruit.State : recruit.Country;
    const mobileCardClass = GetMobileCardClass(theme);
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
        return props.toggleScholarship(idx, recruitProfile);
    };

    const removePlayerFromBoard = () => {
        return props.remove(idx, recruitProfile);
    };
    let leadingTeams = leadingTeamsMapper(recruit);

    return (
        <>
            <CBBCrootModal crt={recruit} idx={idx} />
            <ConfirmRevokeModal
                idx={idx}
                revoke={toggleScholarship}
                viewMode={theme}
            />
            <ConfirmRemovePlayerFromBoardModal
                idx={idx}
                removePlayer={removePlayerFromBoard}
            />
            <div className={`${mobileCardClass} mb-2`}>
                <div className="card-body text-start">
                    <div className="row mb-2">
                        <div className="col-7">
                            <h5
                                className={
                                    recruit.IsCustomCroot
                                        ? 'card-title text-primary'
                                        : 'card-title'
                                }
                            >
                                {name}
                            </h5>
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
                                {recruit.Stars} star {recruit.Position} from{' '}
                                {loc}
                            </p>
                        </div>
                        <div className="col-5">
                            {recruit.SigningStatus.length > 0 &&
                                recruit.SigningStatus !== 'Signed' && (
                                    <p className="card-text text-muted">
                                        Recruiting Status:{' '}
                                        {recruit.SigningStatus}
                                    </p>
                                )}
                            {!recruit.IsSigned ? (
                                <>{leadingTeams}</>
                            ) : (
                                <>
                                    <img
                                        className="image-recruit-logo image-recruit-signed"
                                        src={logo}
                                        alt="WinningTeam"
                                    />
                                    <h6>{recruit.College}</h6>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <MobileAttribute
                            label="Finishing"
                            value={recruit.Finishing}
                        />
                        <MobileAttribute
                            label="2pt Shooting"
                            value={recruit.Shooting2}
                        />
                        <MobileAttribute
                            label="3pt Shooting"
                            value={recruit.Shooting3}
                        />
                        <MobileAttribute
                            label="Free Throw"
                            value={recruit.FreeThrow}
                        />
                        <MobileAttribute
                            label="Ballwork"
                            value={recruit.Ballwork}
                        />
                        <MobileAttribute
                            label="Rebounding"
                            value={recruit.Rebounding}
                        />
                        <MobileAttribute
                            label="Int. Defense"
                            value={recruit.InteriorDefense}
                        />
                        <MobileAttribute
                            label="Per. Defense"
                            value={recruit.PerimeterDefense}
                        />
                        <MobileAttribute
                            label="Potential"
                            value={recruit.PotentialGrade}
                        />
                        {recruit.HasStateBonus ||
                            (recruit.HasRegionBonus && (
                                <MobileAttribute
                                    label="Bonus"
                                    value={
                                        recruit.HasStateBonus
                                            ? 'State'
                                            : 'Region'
                                    }
                                />
                            ))}
                        <MobileInputRow
                            label="Total Points"
                            name="TotalPoints"
                            value={recruitProfile.TotalPoints}
                            disable={true}
                        />
                        <MobileInputRow
                            label="Current Points"
                            name="CurrentPoints"
                            change={handleChange}
                            value={recruitProfile.CurrentWeeksPoints}
                            disable={
                                recruit.IsSigned ||
                                recruitProfile.CaughtCheating
                            }
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
                                        <i className="bi bi-file-lock-fill card-link" />
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
            </div>
        </>
    );
};

export default CBBTeamDashboardMobileRow;
