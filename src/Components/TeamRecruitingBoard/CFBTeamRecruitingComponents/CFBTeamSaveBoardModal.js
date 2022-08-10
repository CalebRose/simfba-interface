import React from 'react';

const ConfirmSaveRecruitingBoardModal = (props) => {
    const modalId = 'saveBoardModal';

    const SaveChanges = () => {
        return props.save();
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="saveRecruitingBoardModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4
                            className="modal-title"
                            id="saveRecruitingBoardModalLabel"
                        >
                            Confirm Save Recruiting Board
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
                            All Point Submissions will be saved. Would you like
                            to confirm this action?
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
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={SaveChanges}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmSaveRecruitingBoardModal;
