import React from 'react';

export const InfoModal = (props) => (
    <div
        className="modal modal-lg fade"
        id={props.id}
        tabindex="-1"
        aria-labelledby="schemeModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="crootModalLabel">
                        {props.header}
                    </h4>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">{props.children}</div>
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

export const ExtraLargeModal = (props) => (
    <div
        className="modal modal-xl fade"
        id={props.id}
        tabindex="-1"
        aria-labelledby="schemeModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="crootModalLabel">
                        {props.header}
                    </h4>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">{props.children}</div>
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
