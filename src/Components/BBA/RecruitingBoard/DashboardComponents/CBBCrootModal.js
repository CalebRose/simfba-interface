import React from 'react';
import { RoundToTwoDecimals } from '../../../../_Utility/utilHelper';

const CBBCrootModal = (props) => {
    const { crt, idx } = props;
    const modalId = 'crootModal' + idx;

    const LeadingTeam = (props) => {
        const { lt } = props;
        const { TeamAbbr, Odds } = lt;
        const displayOdds = Math.round(Odds * 100);
        let displayStatus = '';
        if (displayOdds > 50) {
            displayStatus = 'Strong Favorite';
        } else if (displayOdds > 25) {
            displayStatus = 'In Contention';
        } else {
            displayStatus = 'Unlikely';
        }
        return crt && crt.College === TeamAbbr ? (
            <div className="row">
                <div className="col">
                    <h6 className="text-success">{TeamAbbr}</h6>
                </div>
                <div className="col">
                    <h6>Committed!</h6>
                </div>
                <div className="col">
                    <h6>Odds: {displayOdds}%</h6>
                </div>
            </div>
        ) : (
            <div className="row">
                <div className="col">
                    <h6>{TeamAbbr}</h6>
                </div>
                {crt && crt.College.length > 0 && crt.College !== TeamAbbr ? (
                    <div className="col">
                        <h6>Unlikely</h6>
                    </div>
                ) : (
                    ''
                )}
                <div className="col">
                    <h6>
                        {crt &&
                        crt.College.length > 0 &&
                        crt.College !== TeamAbbr
                            ? 'Odds: ' + displayOdds + '%'
                            : displayStatus}
                    </h6>
                </div>
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
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="crootModalLabel">
                            {crt.FirstName} {crt.LastName}
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
                            <div className="col">
                                <h5>Position</h5>
                                {crt.Position}
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
                                <h5>Potential:</h5> {crt.PotentialGrade}
                            </div>
                            <div className="col">
                                <h5>Height:</h5> {crt.Height}
                            </div>
                            {crt.IsCustomCroot ? (
                                <div className="col">
                                    <h5>Custom Croot By {crt.CreatedFor}</h5>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="row g-2 mb-3">
                            {crt.State.length > 0 ? (
                                <div className="col">
                                    <h5>State:</h5> {crt.State}
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className="col">
                                <h5>Country</h5>
                                {crt.Country}
                            </div>
                        </div>
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
                        <div className="row g-1 mb-3">
                            {crt && crt.College.length > 0 ? (
                                <h5>Results</h5>
                            ) : (
                                <h5>Prediction</h5>
                            )}

                            {crt &&
                                crt.LeadingTeams !== null &&
                                crt.LeadingTeams.length > 0 &&
                                crt.LeadingTeams.map((lt) => {
                                    return <LeadingTeam lt={lt} />;
                                })}
                        </div>
                        <div className="row g-2 mb-2">
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
