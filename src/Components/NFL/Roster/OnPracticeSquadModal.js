import React from 'react';

export const PracticeSquadModal = ({ player, idx, practicesquad }) => {
    const modalId = `practiceSquad${idx}`;
    const name = `${player.FirstName} ${player.LastName}`;

    const confirmChange = () => {
        return practicesquad(player);
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="extendPlayerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="redshirtModalLabel">
                            Place {name} on the Practice Squad
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
                            Placing {name} on the Practice Squad will make them
                            unavailable on your team's depth chart. To make them
                            available, you will need to bring the player from
                            the practice squad back onto the roster.
                        </div>

                        <div className="row g-2 gy-2 mb-2">
                            Do you really want to place {name} on the Practice
                            Squad?
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
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={confirmChange}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
