import React, { useEffect, useState } from 'react';
import BBAMatchService from '../../../_Services/simNBA/BBAMatchService';
import { Spinner } from '../../_Common/Spinner';
import {
    BBABoxScoreHeader,
    BBABoxScoreRow,
    BBAPlayerStatsTable
} from '../../_Common/BBAGameModalComponents';

const CBBGameModal = (props) => {
    const { game } = props;
    let _matchService = new BBAMatchService();
    const modalId = `gameModal`;
    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);
    const [homeStats, setHomeStats] = useState(null);
    const [awayStats, setAwayStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (game !== null) {
            GetMatchResults();
        }
    }, [game]);

    const GetMatchResults = async () => {
        const response = await _matchService.GetMatchResultData(game.ID);

        setHomePlayers(() => response.HomePlayers);
        setAwayPlayers(() => response.AwayPlayers);
        setHomeStats(() => response.HomeStats);
        setAwayStats(() => response.AwayStats);
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
                        <h4 className="modal-title" id="crootModalLabel">
                            {!isLoading
                                ? `${game.HomeTeam} vs ${game.AwayTeam}`
                                : ''}
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {!isLoading ? (
                            <>
                                <BBABoxScoreHeader />
                                <BBABoxScoreRow
                                    team={game.HomeTeam}
                                    teamStats={homeStats}
                                />
                                <BBABoxScoreRow
                                    team={game.AwayTeam}
                                    teamStats={awayStats}
                                />
                                <BBAPlayerStatsTable
                                    team={game.HomeTeam}
                                    players={homePlayers}
                                />
                                <BBAPlayerStatsTable
                                    team={game.AwayTeam}
                                    players={awayPlayers}
                                />
                            </>
                        ) : (
                            <div className="row justify-content-center pt-2 mt-4 mb-2">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CBBGameModal;
