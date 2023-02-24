import React from 'react';

export const CancelOfferModal = ({ player, idx, cancel, teamID }) => {
    const modalId = `cancelOffer${idx}`;
    const name = `${player.FirstName} ${player.LastName}`;

    const confirmChange = () => {
        const offerIdx = player.Offers.findIndex((x) => x.TeamID === teamID);
        if (offerIdx > -1) {
            const offer = player.Offers[offerIdx];
            return cancel(player, offer);
        }
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
                            Cancel Offer for {name}
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
                            By cancelling your team's existing offer with {name}
                            , you will no longer be in contention. If this
                            occurs during the negotiation phase for {name}, you
                            will not be able to create another offer.
                        </div>

                        <div className="row g-2 gy-2 mt-2 justify-content-center">
                            Are you sure you want to do this?
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
