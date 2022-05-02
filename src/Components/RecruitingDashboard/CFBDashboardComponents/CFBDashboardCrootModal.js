import React from 'react';

const CrootModal = (props) => {
    const { crt, idx } = props;
    const modalId = 'crootModal' + idx;
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
                                <h5>Height:</h5> {crt.Height}
                            </div>
                            <div className="col">
                                <h5>Weight:</h5> {crt.Weight}
                            </div>
                        </div>
                        <div className="row g-2 mb-3">
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
                        </div>
                        <div className="row g-2 mb-2">
                            <div className="col">
                                <h5>Recruiting Preferences</h5>
                                <p>{crt.RecruitingBias}</p>
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

export default CrootModal;
