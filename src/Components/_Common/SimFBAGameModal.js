import React, { useEffect, useState } from 'react';
import FBAScheduleService from '../../_Services/simFBA/FBAScheduleService';

export const SimFBAGameModal = ({ game, isNFL }) => {
    const _scheduleService = new FBAScheduleService();
    const modalId = `gameModal`;
    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (game !== null) {
            GetMatchResults();
        }
    }, [game]);

    const GetMatchResults = async () => {
        let response;
        if (isNFL) {
            response = await _scheduleService.GetNFLGameResultData(game.ID);
        } else {
            response = await _scheduleService.GetCFBGameResultData(game.ID);
        }

        setHomePlayers(() => response.HomePlayers);
        setAwayPlayers(() => response.AwayPlayers);
        setIsLoading(() => false);
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            aria-labelledby="gameModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="crootModalLabel"></h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body"></div>
                </div>
            </div>
        </div>
    );
};
