import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { RoundToTwoDecimals } from '../../../_Utility/utilHelper';

const HeismanModal = ({ list, viewMode }) => {
    const modalClass = GetModalClass(viewMode);
    return (
        <div
            className="modal fade"
            id="heismanModal"
            tabIndex="-1"
            aria-labelledby="heismanModal"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-scrollable modal-xl">
                <div className={modalClass}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Heisman Watch List
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-1">
                                <h4>Rank</h4>
                            </div>
                            <div className="col-md-2">
                                <h4>Name</h4>
                            </div>
                            <div className="col-md-2">
                                <h4>Position</h4>
                            </div>
                            <div className="col-md-2">
                                <h4>Archetype</h4>
                            </div>
                            <div className="col-md-2">
                                <h4>School</h4>
                            </div>
                            <div className="col-md-2">
                                <h4>Score</h4>
                            </div>
                            <div className="col-md-1">
                                <h4>Games</h4>
                            </div>
                        </div>
                        {list &&
                            list.map((x, idx) => {
                                return (
                                    <div className="row">
                                        <div className="col-md-1">
                                            {idx + 1}
                                        </div>
                                        <div className="col-md-2">
                                            {x.FirstName + ' ' + x.LastName}
                                        </div>
                                        <div className="col-md-2">
                                            {x.Position}
                                        </div>
                                        <div className="col-md-2">
                                            {x.Archetype}
                                        </div>
                                        <div className="col-md-2">
                                            {x.School}
                                        </div>
                                        <div className="col-md-2">
                                            {RoundToTwoDecimals(x.Score)}
                                        </div>
                                        <div className="col-md-1">
                                            {x.Games}
                                        </div>
                                    </div>
                                );
                            })}
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

export default HeismanModal;
