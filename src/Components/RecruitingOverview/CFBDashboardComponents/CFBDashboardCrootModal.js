import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { HeightToFeetAndInches } from '../../../_Utility/utilHelper';
import { GetRecruitingTendency } from '../../../_Utility/CFBRecruitingHelper';
import { CommonModal } from '../../_Common/ModalComponents';
import { getLogo } from '../../../Constants/getLogo';
import { SimCFB } from '../../../Constants/CommonConstants';

const CrootModal = (props) => {
    const { crt, idx, viewMode, retro } = props;
    const modalId = 'crootModal' + idx;
    const heightObj = HeightToFeetAndInches(crt.Height);
    // const leadingTeams = crt.LeadingTeams;

    const LeadingTeam = (props) => {
        const { lt } = props;
        const { TeamAbbr, Odds, HasScholarship, TeamID } = lt;
        const displayOdds = Math.round(Odds * 100);

        const getDisplayStatus = (odds) => {
            if (odds > 45) {
                return 'Strong Favorite';
            } else if (odds > 24) {
                return 'In Contention';
            } else if (odds > 11) {
                return 'Just Outside';
            }
            return 'Unlikely';
        };
        let displayStatus = getDisplayStatus(displayOdds);
        const hasCommitted = crt && crt.College.length > 0;
        const isCommittedToCollege = (crt, teamAbbr) =>
            crt && crt.College === teamAbbr;
        const logo = getLogo(SimCFB, TeamID, retro);

        return (
            <div className="row">
                <div className={`col-${hasCommitted ? '3' : '4'}`}>
                    <h6
                        className={
                            isCommittedToCollege(crt, TeamAbbr)
                                ? 'text-success'
                                : ''
                        }
                    >
                        <img
                            className="image-nfl-fa mx-1"
                            src={logo}
                            alt="competing-team"
                        />{' '}
                        {TeamAbbr}
                    </h6>
                </div>
                <div className={`col-${hasCommitted ? '3' : '4'}`}>
                    <p>{HasScholarship ? 'Yes' : 'No'}</p>
                </div>
                <div className={`col-${hasCommitted ? '3' : '4'}`}>
                    <h6>
                        {isCommittedToCollege(crt, TeamAbbr)
                            ? 'Committed!'
                            : displayStatus}
                    </h6>
                </div>
                {hasCommitted && (
                    <div className="col-3">
                        <h6>{displayOdds}%</h6>
                    </div>
                )}
            </div>
        );
    };

    const tendency = GetRecruitingTendency(crt.RecruitModifier);

    const modalClass = GetModalClass(viewMode);
    const ModalHeader = `${crt.ID} ${crt.FirstName} ${crt.LastName}`;

    return (
        <CommonModal ID={modalId} ModalClass={modalClass} Header={ModalHeader}>
            <div className="row g-2 gy-2 mb-2">
                <div className="col">
                    <h6>Position</h6>
                    <p className="text-small">{crt.Position}</p>
                </div>
                <div className="col">
                    <h6>Archetype</h6>
                    <p className="text-small">{crt.Archetype}</p>
                </div>
                <div className="col">
                    <h6>Stars</h6>
                    <p className="text-small">{crt.Stars}</p>
                </div>
                <div className="col">
                    <h6>Status: </h6>
                    <p className="text-small">
                        {crt.TeamID === 0 ? 'Unsigned' : 'Signed'}
                    </p>
                </div>
            </div>
            <div className="row g-2 gy-2 mb-3">
                <div className="col">
                    <h6>Overall:</h6>
                    <p className="text-small">{crt.OverallGrade}</p>
                </div>
                <div className="col">
                    <h6>Potential:</h6>{' '}
                    <p className="text-small">{crt.PotentialGrade}</p>
                </div>
                <div className="col">
                    <h6>Height:</h6>{' '}
                    <p className="text-small">
                        {heightObj.feet}' {heightObj.inches}"
                    </p>
                </div>
                <div className="col">
                    <h6>Weight:</h6>
                    <p className="text-small">{crt.Weight}</p>
                </div>
            </div>
            <div className="row g-2 mb-3">
                {crt.IsCustomCroot && (
                    <div className="col">
                        <h6>Custom Croot By {crt.CustomCrootFor}</h6>
                    </div>
                )}
                {crt.ID === 91822 && (
                    <div className="col">
                        <h6>FOUND ME! DM TOUCAN A SCREENSHOT OF THIS CARD!</h6>
                    </div>
                )}
                <div className="col">
                    <h6>High School:</h6>
                    <p className="text-small">{crt.HighSchool}</p>
                </div>
                <div className="col">
                    <h6>City</h6>
                    <p className="text-small">{crt.City}</p>
                </div>
                <div className="col">
                    <h6>State</h6>
                    <p className="text-small">{crt.State}</p>
                </div>
            </div>
            <div className="row g-2 mb-3">
                <div className="col">
                    <h6>Affinity One</h6>
                    <p className="text-small">{crt.AffinityOne}</p>
                </div>
                <div className="col">
                    <h6>Affinity Two</h6>
                    <p className="text-small">{crt.AffinityTwo}</p>
                </div>
                <div className="col">
                    <h6>Recruiting Tendencies</h6>
                    <p className="text-small">{tendency}</p>
                </div>
            </div>
            <div className="row g-1 mb-3">
                <div className="col">
                    <h6>Team</h6>
                </div>
                <div className="col">
                    <h6>Scholarship</h6>
                </div>
                <div className="col">
                    {crt && crt.College.length > 0 ? (
                        <h6>Results</h6>
                    ) : (
                        <h6>Prediction</h6>
                    )}
                </div>
                {crt && crt.College.length > 0 && (
                    <div className="col">
                        <h6>Odds</h6>
                    </div>
                )}
            </div>
            {crt &&
                crt.LeadingTeams !== null &&
                crt.LeadingTeams.length > 0 &&
                crt.LeadingTeams.map((lt) => {
                    return <LeadingTeam lt={lt} />;
                })}
            <div className="row g-2 mb-2 mt-1">
                <div className="col">
                    <h6>Recruiting Preferences</h6>
                    <p className="text-small">{crt.RecruitingBias}</p>
                </div>
                <div className="col">
                    <h6>Work Ethic</h6>
                    <p className="text-small">{crt.WorkEthic}</p>
                </div>
            </div>
            <div className="row g-2 mb-2">
                <div className="col">
                    <h6>Academic Bias</h6>
                    <p className="text-small">{crt.AcademicBias}</p>
                </div>
                <div className="col">
                    <h6>Personality</h6>
                    <p className="text-small">{crt.Personality}</p>
                </div>
            </div>
        </CommonModal>
    );
};

export default CrootModal;
