import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';

const ConfirmRemovePlayerFromBoardModal = (props) => {
    const { idx, viewMode } = props;
    const modalId = 'removeModal' + idx;

    const confirmChange = () => {
        return props.removePlayer();
    };
    const modalClass = GetModalClass(viewMode);

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="removeModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="removeModalLabel">
                            Confirm Remove Recruit
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
                            You will always be able to re-add this recruit onto
                            your board from the CFB Recruiting Dashboard page.
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

export default ConfirmRemovePlayerFromBoardModal;
