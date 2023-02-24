import React from 'react';

export const TradeBlockModal = ({ player, idx, tradeblock }) => {
    const modalId = `tradeBlock${idx}`;
    const name = `${player.FirstName} ${player.LastName}`;

    const confirmChange = () => {
        return tradeblock(player);
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
                            Placing {name} on the Trade Block won't cause any
                            depth chart issues as long as {name} is on your
                            team. Other teams will be able to inquiry you about
                            your Team and their trade block and propose trade
                            offers which could involve {name}.
                        </div>

                        <div className="row g-2 gy-2 mb-2">
                            Do you really want to place {name} on the Trade
                            Block?
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
