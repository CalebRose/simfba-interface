import React from 'react';

const ConfirmRecruitSyncModal = (props) => {
    const modalId = 'syncRecruitModal';

    const SaveChanges = () => {
        return props.save();
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            aria-labelledby="syncRecruitModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4
                            className="modal-title"
                            id="saveRecruitingBoardModalLabel"
                        >
                            Confirm Recruit Sync
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
                            <strong>
                                NOTE: You must complete the RES Sync before
                                moving forward.
                            </strong>{' '}
                            Are you sure you would like to run the Recruit Sync?
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            No
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={SaveChanges}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRecruitSyncModal;
