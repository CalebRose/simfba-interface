import React from 'react';

export const CutPlayerModal = ({ player, idx, cut }) => {
    const modalId = `cutPlayer${idx}`;
    const name = `${player.FirstName} ${player.LastName}`;

    const confirmChange = () => {
        return cut(player);
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="cutPlayerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="redshirtModalLabel">
                            Cut {name}
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
                            WARNING: Once you've cut {name}, they will be placed
                            on the waiver wire with their existing contract.
                            After that, they will have to hope another team
                            picks them up on the waiver wire. And if worse, find
                            a way to sign with a different team so that they can
                            support their loved ones and the mortgage they have
                            on their home.
                        </div>

                        <div className="row g-2 gy-2 mb-2">
                            Do you really want to put {name} through all that
                            trouble just to take a Cap Hit? Think of the players
                            and their families...{' '}
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
