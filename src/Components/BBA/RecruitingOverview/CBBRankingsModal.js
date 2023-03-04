import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { getLogo } from '../../../Constants/getLogo';
import { RoundToTwoDecimals } from '../../../_Utility/utilHelper';

const CBBRankingsModal = (props) => {
    const { teamProfiles, viewMode } = props;
    const modalId = 'rankingsModal';
    const sortedProfiles =
        teamProfiles &&
        teamProfiles.sort((a, b) => b.CompositeScore - a.CompositeScore);
    const modalClass = GetModalClass(viewMode);
    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
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
                                <h3>Rank</h3>
                            </div>
                            <div className="col-sm-2 ms-auto">
                                <h3>Team</h3>
                            </div>
                            <div className="col-sm-1 ms-auto">
                                <h4>Signees</h4>
                            </div>
                            <div className="col-sm-2 ms-auto">
                                <h4>Composite Score</h4>
                            </div>
                            <div className="col-sm-2 ms-auto">
                                <h4>ESPN Score</h4>
                            </div>
                            <div className="col-sm-2 ms-auto">
                                <h4>Rivals Score</h4>
                            </div>
                            <div className="col-sm-2 ms-auto">
                                <h4>247 Score</h4>
                            </div>
                        </div>
                        {sortedProfiles &&
                            sortedProfiles.map((x, idx) => {
                                const logo = getLogo(x.TeamAbbr);
                                if (x.CompositeScore > 0)
                                    return (
                                        <div className="row cbb-rank-row">
                                            <div className="col-sm-1 ms-auto">
                                                <strong>{idx + 1}</strong>
                                            </div>
                                            <div className="col-sm-2 ms-auto">
                                                <img
                                                    className="image-recruit-logo"
                                                    src={logo}
                                                    alt="rankedTeam"
                                                />
                                            </div>
                                            <div className="col-sm-1 ms-auto">
                                                {x.TotalCommitments}
                                            </div>
                                            <div className="col-sm-2 ms-auto">
                                                {RoundToTwoDecimals(
                                                    x.CompositeScore
                                                )}
                                            </div>
                                            <div className="col-sm-2 ms-auto">
                                                {RoundToTwoDecimals(
                                                    x.ESPNScore
                                                )}
                                            </div>
                                            <div className="col-sm-2 ms-auto">
                                                {RoundToTwoDecimals(
                                                    x.RivalsScore
                                                )}
                                            </div>
                                            <div className="col-sm-2 ms-auto">
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

export default CBBRankingsModal;
