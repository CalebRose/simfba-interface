import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';

export const PracticeSquadModal = ({
    player,
    idx,
    practicesquad,
    viewMode
}) => {
    const modalId = `practiceSquad${idx}`;
    const name = `${player.FirstName} ${player.LastName}`;
    const modalClass = GetModalClass(viewMode);

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
                <div className={modalClass}>
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
                            {!player.IsPracticeSquad && (
                                <>
                                    Placing {name} on the Practice Squad will
                                    make them unavailable on your team's depth
                                    chart. It will also remove the contract
                                    placed on them, and will apply any remaining
                                    bonus to your team's capsheet this year. To
                                    make them available, just click the button
                                    again.
                                </>
                            )}
                        </div>

                        {!player.IsPracticeSquad && (
                            <div className="row g-2 gy-2 mb-2">
                                <p>
                                    Do you really want to place {name} on the
                                    Practice Squad?
                                </p>
                            </div>
                        )}

                        {player.IsPracticeSquad && (
                            <div className="row g-2 gy-2 mb-2">
                                <p>
                                    Do you want to place {name} back on your
                                    main roster? He will be really happy if you
                                    do.
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <>
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
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
};
