import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';

const ConfirmRevokeModal = (props) => {
    const { idx, viewMode } = props;
    const modalId = 'revokeModal' + idx;

    const confirmChange = () => {
        return props.toggleScholarship();
    };
    const modalClass = GetModalClass(viewMode);

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="revokeModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className={viewMode}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="revokeModalLabel">
                            Confirm Revoke Scholarship
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
                            Once a scholarship has been revoked, you cannot
                            re-offer a scholarship to this recruit. Are you sure
                            you would like to make this decision?
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
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={confirmChange}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRevokeModal;
