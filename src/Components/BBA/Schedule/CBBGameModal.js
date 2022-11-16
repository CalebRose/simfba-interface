import React, { useEffect, useState } from 'react';
import BBAMatchService from '../../../_Services/simNBA/BBAMatchService';
import GameModalRow from './GameModalRow';

const CBBGameModal = (props) => {
    const { idx, game } = props;
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
                                <div className="row g-2 gy-2 mb-2">
                                    <div className="col">Team</div>
                                    <div className="col">First Half</div>
                                    <div className="col">Second Half</div>
                                    <div className="col">OT</div>
                                    <div className="col">Total</div>
                                    <div className="col">Possessions</div>
                                </div>
                                <div className="row g-2 gy-2 mb-1">
                                    <div className="col">{game.HomeTeam}</div>
                                    <div className="col">
                                        {homeStats.FirstHalfScore}
                                    </div>
                                    <div className="col">
                                        {homeStats.SecondHalfScore}
                                    </div>
                                    <div className="col">
                                        {homeStats.OvertimeScore}
                                    </div>
                                    <div className="col">
                                        {homeStats.Points}
                                    </div>
                                    <div className="col">
                                        {homeStats.Possessions}
                                    </div>
                                </div>
                                <div className="row g-2 gy-2 mb-3">
                                    <div className="col">{game.AwayTeam}</div>
                                    <div className="col">
                                        {awayStats.FirstHalfScore}
                                    </div>
                                    <div className="col">
                                        {awayStats.SecondHalfScore}
                                    </div>
                                    <div className="col">
                                        {awayStats.OvertimeScore}
                                    </div>
                                    <div className="col">
                                        {awayStats.Points}
                                    </div>
                                    <div className="col">
                                        {awayStats.Possessions}
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <h4 className="ms-auto">
                                        {game.HomeTeam} Players
                                    </h4>
                                </div>
                                <div className="row mb-1">
                                    <table className="table">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Position</th>
                                            <th scope="col">Minutes</th>
                                            <th scope="col">FGM</th>
                                            <th scope="col">FGA</th>
                                            <th scope="col">FG%</th>
                                            <th scope="col">3PM</th>
                                            <th scope="col">3PA</th>
                                            <th scope="col">3P%</th>
                                            <th scope="col">FTM</th>
                                            <th scope="col">FTA</th>
                                            <th scope="col">FT%</th>
                                            <th scope="col">Points</th>
                                            <th scope="col">Rebounds</th>
                                            <th scope="col">Assists</th>
                                            <th scope="col">Steals</th>
                                            <th scope="col">Blocks</th>
                                            <th scope="col">TOs</th>
                                            <th scope="col">Fouls</th>
                                        </tr>
                                        {homePlayers.length > 0 &&
                                            homePlayers.map((x) => (
                                                <GameModalRow player={x} />
                                            ))}
                                    </table>
                                </div>

                                <div className="row mb-2">
                                    <h4 className="ms-auto">
                                        {game.AwayTeam} Players
                                    </h4>
                                </div>
                                <div className="row mb-1">
                                    <table className="table">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Position</th>
                                            <th scope="col">Minutes</th>
                                            <th scope="col">FGM</th>
                                            <th scope="col">FGA</th>
                                            <th scope="col">FG%</th>
                                            <th scope="col">3PM</th>
                                            <th scope="col">3PA</th>
                                            <th scope="col">3P%</th>
                                            <th scope="col">FTM</th>
                                            <th scope="col">FTA</th>
                                            <th scope="col">FT%</th>
                                            <th scope="col">Points</th>
                                            <th scope="col">Rebounds</th>
                                            <th scope="col">Assists</th>
                                            <th scope="col">Steals</th>
                                            <th scope="col">Blocks</th>
                                            <th scope="col">TOs</th>
                                            <th scope="col">Fouls</th>
                                        </tr>
                                        {awayPlayers.length > 0 &&
                                            awayPlayers.map((x) => (
                                                <GameModalRow player={x} />
                                            ))}
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="row justify-content-center pt-2 mt-4 mb-2">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CBBGameModal;
