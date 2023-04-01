import React from 'react';
import { GetModalClass } from '../../../../Constants/CSSClassHelper';

export const GLeagueModal = ({ player, idx, setToGLeague, viewMode }) => {
    const modalId = `gLeague${idx}`;
    const modalClass = GetModalClass(viewMode);

    const confirmChange = () => {
        return setToGLeague(player);
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
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="redshirtModalLabel">
                            Place {player.FirstName} {player.LastName} in the
                            G-League
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
                            WARNING: Once you've placed {player.FirstName}{' '}
                            {player.LastName} on the G-League roster and the
                            season starts, you cannot place them on your roster
                            for the remainder of the season. You can call up a
                            player; however, their contract will then be
                            calculated to your team's capsheet. Are you sure you
                            want to do this?
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

export const TwoWayModal = ({ player, idx, setToTwoWay, viewMode }) => {
    const modalId = `twoWay${idx}`;
    const modalClass = GetModalClass(viewMode);

    const confirmChange = () => {
        return setToTwoWay(player);
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
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="redshirtModalLabel">
                            Place {player.FirstName} {player.LastName} in the
                            G-League
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
                            WARNING: Once you've declared {player.FirstName}{' '}
                            {player.LastName} as a Two-Way player, they can
                            participate in both the G-League and the NBA league
                            simultaneously. You can only have two players on
                            your roster as a two-way player. Are you sure you
                            want to do this?
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
