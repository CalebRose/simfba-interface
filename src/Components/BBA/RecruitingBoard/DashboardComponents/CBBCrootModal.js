import React from 'react';
import { GetModalClass } from '../../../../Constants/CSSClassHelper';
import { RoundToTwoDecimals } from '../../../../_Utility/utilHelper';
import { getLogo } from '../../../../Constants/getLogo';
import { SimCBB } from '../../../../Constants/CommonConstants';

const CBBCrootModal = (props) => {
    const { crt, idx, viewMode, retro } = props;
    const modalId = 'crootModal' + idx;
    const modalClass = GetModalClass(viewMode);
    const LeadingTeam = ({ lt }) => {
        const { TeamID, TeamAbbr, Odds, Scholarship } = lt;
        const displayOdds = Math.round(Odds * 100);

        const getDisplayStatus = (odds) => {
            if (odds > 50) return 'Strong Favorite';
            if (odds > 19) return 'In Contention';
            return 'Unlikely';
        };
        let displayStatus = getDisplayStatus(displayOdds);
        const hasCommitted = crt && crt.College.length > 0;
        const isCommittedToCollege = (crt, teamAbbr) =>
            crt && crt.College === teamAbbr;
        const logo = getLogo(SimCBB, TeamID, retro);

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
                    {Scholarship ? 'Yes' : 'No'}
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

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="crootModalLabel"
            aria-hidden="true"
        >
            <div
                className={`modal-dialog ${
                    crt.LeadingTeams !== null &&
                    crt.LeadingTeams.length > 6 &&
                    'modal-dialog-scrollable cbb-modal'
                }`}
            >
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="crootModalLabel">
                            {crt.ID} {crt.Position} {crt.FirstName}{' '}
                            {crt.LastName}
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-2 gy-2 mb-2">
                            <div
                                className={crt.IsCustomCroot ? 'col-3' : 'col'}
                            >
                                <h5>Stars</h5>
                                {crt.Stars}
                            </div>
                            <div
                                className={crt.IsCustomCroot ? 'col-3' : 'col'}
                            >
                                <h5>Potential:</h5> {crt.PotentialGrade}
                            </div>
                            {crt.IsCustomCroot && (
                                <div className="col-3">
                                    <h5>Custom Croot By {crt.CreatedFor}</h5>
                                </div>
                            )}
                            <div
                                className={crt.IsCustomCroot ? 'col-3' : 'col'}
                            >
                                <h5>Status: </h5>
                                {crt.TeamID === 0 ? 'Unsigned' : 'Signed'}
                            </div>
                        </div>
                        <div className="row g-2 mb-3">
                            <div
                                className={crt.RelativeID > 0 ? 'col-3' : 'col'}
                            >
                                <h5>Height:</h5> {crt.Height}
                            </div>
                            {crt.State.length > 0 && (
                                <div
                                    className={
                                        crt.RelativeID > 0 ? 'col-3' : 'col'
                                    }
                                >
                                    <h5>State:</h5> {crt.State}
                                </div>
                            )}
                            <div
                                className={crt.RelativeID > 0 ? 'col-3' : 'col'}
                            >
                                <h5>Country</h5>
                                {crt.Country}
                            </div>
                            {crt.RelativeID > 0 && (
                                <div className="col-3">
                                    <h5>Notes</h5>
                                    <p>{crt.Notes}</p>
                                </div>
                            )}
                        </div>
                        {crt.HasStateBonus ||
                            (crt.HasRegionBonus && (
                                <div className="row g-2 gy-2 mb-3">
                                    <div className="col">
                                        <h5>Bonus Applied</h5>
                                        {crt.HasStateBonus ? 'State' : 'Region'}
                                    </div>
                                </div>
                            ))}
                        <div className="row g-2 gy-2 mb-3">
                            <div className="col">
                                <h5>Rivals Rank:</h5>{' '}
                                {RoundToTwoDecimals(crt.RivalsRank)}
                            </div>
                            <div className="col">
                                <h5>ESPN Rank:</h5> {crt.ESPNRank}
                            </div>
                            <div className="col">
                                <h5>247 Rank:</h5>{' '}
                                {RoundToTwoDecimals(crt.Rank247)}
                            </div>
                        </div>
                        <div className="row g-1 mb-2">
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
                            <div className="col">
                                <h5>Personality</h5>
                                <p>{crt.Personality}</p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CBBCrootModal;
