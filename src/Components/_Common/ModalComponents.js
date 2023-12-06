import React from 'react';

export const InfoModal = (props) => (
    <div
        className="modal modal-lg fade"
        id={props.id}
        tabindex="-1"
        aria-labelledby="schemeModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-scrollable">
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

export const OfficialPollModal = (props) => (
    <div
        className="modal modal-md fade"
        id={props.id}
        tabindex="-1"
        aria-labelledby="schemeModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content poll-modal-fixed">
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
        aria-labelledby="modalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-scrollable">
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
                    {props.Submit && props.enableSubmit && (
                        <button
                            type="button"
                            className="btn btn-primary me-2"
                            data-bs-dismiss="modal"
                            onClick={props.Submit}
                        >
                            Submit
                        </button>
                    )}
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

export const CommonModal = (props) => {
    return (
        <div
            className="modal fade"
            id={props.ID}
            tabindex="-1"
            aria-labelledby="commonModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className={props.ModalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="commonModalLabel">
                            {props.Header}
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
};

export const ConfirmModal = (props) => {
    return (
        <div
            className="modal fade"
            id={props.ModalID}
            tabindex="-1"
            aria-labelledby="saveRecruitingBoardModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className={props.ModalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="confirmModalLabel">
                            {props.Header}
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
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={props.ConfirmChanges}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
