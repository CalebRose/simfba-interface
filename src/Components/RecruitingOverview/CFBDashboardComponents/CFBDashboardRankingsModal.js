import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { RoundToTwoDecimals } from '../../../_Utility/utilHelper';

const CFBDashboardRankingsModal = (props) => {
    const { teamProfiles, viewMode, retro } = props;
    const modalId = 'rankingsModal';
    const sortedProfiles =
        teamProfiles &&
        teamProfiles.sort((a, b) => b.CompositeScore - a.CompositeScore);

    const modalClass = GetModalClass(viewMode);

    return (
        <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            data-bs-keyboard="false"
            aria-labelledby="rankingModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
                <div className={modalClass}>
                    <div className="modal-header">
                        <h2 className="modal-title" id="rankingsModalLabel">
                            Recruiting Rankings
                        </h2>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-1 ms-auto">
                                <h5>Rank</h5>
                            </div>
                            <div className="col-sm-2 ms-auto">
                                <h5>Team</h5>
                            </div>
                            <div className="col-sm-1 ms-auto">
                                <h5>Signees</h5>
                            </div>
                            <div className="col-sm-1 ms-auto">
                                <h5>Five Stars</h5>
                            </div>
                            <div className="col-sm-1 ms-auto">
                                <h5>Four Stars</h5>
                            </div>
                            <div className="col-sm-1 ms-auto">
                                <h5>Three Stars</h5>
                            </div>
                            <div className="col-sm-2 ms-auto">
                                <h5>Composite Score</h5>
                            </div>
                            <div className="col-sm-1 ms-auto">
                                <h6>ESPN Score</h6>
                            </div>
                            <div className="col-sm-1 ms-auto">
                                <h6>Rivals Score</h6>
                            </div>
                            <div className="col-sm-1 ms-auto">
                                <h6>247 Score</h6>
                            </div>
                        </div>
                        {sortedProfiles &&
                            sortedProfiles.map((x, idx) => {
                                if (x.CompositeScore > 0)
                                    return (
                                        <div className="row">
                                            <div className="col-sm-1 ms-auto">
                                                <strong>{idx + 1}</strong>
                                            </div>
                                            <div className="col-sm-2 ms-auto">
                                                {x.Team}
                                            </div>
                                            <div className="col-sm-1 ms-auto">
                                                {x.TotalCommitments}
                                            </div>
                                            <div className="col-sm-1 ms-auto">
                                                {x.FiveStars}
                                            </div>
                                            <div className="col-sm-1 ms-auto">
                                                {x.FourStars}
                                            </div>
                                            <div className="col-sm-1 ms-auto">
                                                {x.ThreeStars}
                                            </div>
                                            <div className="col-sm-2 ms-auto">
                                                {RoundToTwoDecimals(
                                                    x.CompositeScore
                                                )}
                                            </div>
                                            <div className="col-sm-1 ms-auto">
                                                {RoundToTwoDecimals(
                                                    x.ESPNScore
                                                )}
                                            </div>
                                            <div className="col-sm-1 ms-auto">
                                                {RoundToTwoDecimals(
                                                    x.RivalsScore
                                                )}
                                            </div>
                                            <div className="col-sm-1 ms-auto">
                                                {RoundToTwoDecimals(
                                                    x.Rank247Score
                                                )}
                                            </div>
                                        </div>
                                    );
                            })}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
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

export default CFBDashboardRankingsModal;
