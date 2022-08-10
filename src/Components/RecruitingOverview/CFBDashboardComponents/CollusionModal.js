import React from 'react';

const ConfirmRecruitSyncModal = (props) => {
    const modalId = 'collusionModal';

    const SaveChanges = () => {
        return props.save();
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="collusionModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="collusionModalLabel">
                            Collude?
                        </h4>
                    </div>
                    <div className="modal-body">
                        <div className="row g-2 gy-2 mb-2">
                            <strong>
                                NOTE: By clicking this button, you will get 200
                                points guaranteed per week, no backsies.
                            </strong>{' '}
                            Do you really want to do this?
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={SaveChanges}
                        >
                            Of Course!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRecruitSyncModal;
