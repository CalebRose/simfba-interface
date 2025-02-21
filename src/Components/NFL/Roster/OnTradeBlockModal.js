import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';

export const TradeBlockModal = ({ player, idx, tradeblock, viewMode }) => {
    const modalId = `tradeBlock${idx}`;
    const name = `${player.FirstName} ${player.LastName}`;
    const modalClass = GetModalClass(viewMode);

    const confirmChange = () => {
        return tradeblock(player);
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            aria-labelledby="extendPlayerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="redshirtModalLabel">
                            Place {name} on the Trade Block
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
                            {!player.IsOnTradeBlock ? (
                                <>
                                    Placing {name} on the Trade Block won't
                                    cause any depth chart issues as long as{' '}
                                    {name} is on your team. Other teams will be
                                    able to inquiry you about your Team and
                                    their trade block and propose trade offers
                                    which could involve {name}.
                                </>
                            ) : (
                                <>
                                    Oh boy, well that was an awkward moment.
                                    Sounds like no one was interested in{' '}
                                    {player.Position} {name}. Rest assured,
                                    taking him off the trade block shouldn't
                                    have any affect on any contract extension
                                    opportunities with {name}. They certainly
                                    won't remember that they were on the trade
                                    block. I mean, {name} is just data.
                                </>
                            )}
                        </div>

                        <div className="row g-2 gy-2 mb-2">
                            {!player.IsOnTradeBlock ? (
                                <>
                                    Do you really want to place {name} on the
                                    Trade Block?
                                </>
                            ) : (
                                <>
                                    Do you want to take {name} off the trade
                                    block?
                                </>
                            )}
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
