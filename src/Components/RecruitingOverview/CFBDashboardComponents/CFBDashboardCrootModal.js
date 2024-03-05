import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { HeightToFeetAndInches } from '../../../_Utility/utilHelper';
import { GetRecruitingTendency } from '../../../_Utility/CFBRecruitingHelper';
import { CommonModal } from '../../_Common/ModalComponents';
import { getLogo } from '../../../Constants/getLogo';

const CrootModal = (props) => {
    const { crt, idx, viewMode, retro } = props;
    const modalId = 'crootModal' + idx;
    const heightObj = HeightToFeetAndInches(crt.Height);
    // const leadingTeams = crt.LeadingTeams;

    const LeadingTeam = (props) => {
        const { lt } = props;
        const { TeamAbbr, Odds, HasScholarship } = lt;
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
        const logo = getLogo(TeamAbbr, retro);

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
                    {HasScholarship ? 'Yes' : 'No'}
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
                    <h5>Position</h5>
                    {crt.Position}
                </div>
                <div className="col">
                    <h5>Archetype</h5>
                    {crt.Archetype}
                </div>
                <div className="col">
                    <h5>Stars</h5>
                    {crt.Stars}
                </div>
                <div className="col">
                    <h5>Status: </h5>
                    {crt.TeamID === 0 ? 'Unsigned' : 'Signed'}
                </div>
            </div>
            <div className="row g-2 gy-2 mb-3">
                <div className="col">
                    <h5>Overall:</h5> {crt.OverallGrade}
                </div>
                <div className="col">
                    <h5>Potential:</h5> {crt.PotentialGrade}
                </div>
                <div className="col">
                    <h5>Height:</h5> {heightObj.feet}' {heightObj.inches}"
                </div>
                <div className="col">
                    <h5>Weight:</h5> {crt.Weight}
                </div>
            </div>
            <div className="row g-2 mb-3">
                {crt.IsCustomCroot && (
                    <div className="col">
                        <h5>Custom Croot By {crt.CustomCrootFor}</h5>
                    </div>
                )}
                <div className="col">
                    <h5>High School:</h5> {crt.HighSchool}
                </div>
                <div className="col">
                    <h5>City</h5>
                    {crt.City}
                </div>
                <div className="col">
                    <h5>State</h5>
                    {crt.State}
                </div>
            </div>
            <div className="row g-2 mb-3">
                <div className="col">
                    <h5>Affinity One</h5>
                    {crt.AffinityOne}
                </div>
                <div className="col">
                    <h5>Affinity Two</h5>
                    {crt.AffinityTwo}
                </div>
                <div className="col">
                    <h5>Recruiting Tendencies</h5>
                    {tendency}
                </div>
            </div>
            <div className="row g-1 mb-3">
                <div className="col">
                    <h5>Team</h5>
                </div>
                <div className="col">
                    <h5>Scholarship</h5>
                </div>
                <div className="col">
                    {crt && crt.College.length > 0 ? (
                        <h5>Results</h5>
                    ) : (
                        <h5>Prediction</h5>
                    )}
                </div>
                {crt && crt.College.length > 0 && (
                    <div className="col">
                        <h5>Odds</h5>
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
                    <h5>Recruiting Preferences</h5>
                    <p>{crt.RecruitingBias}</p>
                </div>
            </div>
            <div className="row g-2 mb-2">
                <div className="col">
                    <h5>Work Ethic</h5>
                    <p>{crt.WorkEthic}</p>
                </div>
            </div>
            <div className="row g-2 mb-2">
                <div className="col">
                    <h5>Academic Bias</h5>
                    <p>{crt.AcademicBias}</p>
                </div>
            </div>
            <div className="row g-2 mb-2">
                <div className="col">
                    <h5>Personality</h5>
                    <p>{crt.Personality}</p>
                </div>
            </div>
        </CommonModal>
    );
};

export default CrootModal;
