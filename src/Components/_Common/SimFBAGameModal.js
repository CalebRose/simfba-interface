import React, { useEffect, useState } from 'react';
import FBAScheduleService from '../../_Services/simFBA/FBAScheduleService';
import { StatsPageButton } from './Buttons';
import { Spinner } from './Spinner';

export const SimFBAGameModal = ({ game, isNFL }) => {
    const _scheduleService = new FBAScheduleService();
    const modalId = `gameModal`;
    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);
    const [viewableHomePlayers, setViewableHomePlayers] = useState(null);
    const [viewableAwayPlayers, setViewableAwayPlayers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (game !== null) {
            GetMatchResults();
        }
    }, [game]);

    const GetMatchResults = async () => {
        setIsLoading(() => true);
        let response;
        if (isNFL) {
            response = await _scheduleService.GetNFLGameResultData(game.ID);
        } else {
            response = await _scheduleService.GetCFBGameResultData(game.ID);
        }
        const filteredHomePlayerList = FilterStatsData(response.HomePlayers);
        const filteredAwayPlayerList = FilterStatsData(response.AwayPlayers);
        setViewableHomePlayers(() => filteredHomePlayerList);
        setViewableAwayPlayers(() => filteredAwayPlayerList);
        setHomePlayers(() => response.HomePlayers);
        setAwayPlayers(() => response.AwayPlayers);
        setIsLoading(() => false);
    };

    const FilterStatsData = (dataSet) => {
        // Player VS Team View
        const obj = {};
        if (dataSet.length > 0) {
            obj.PassingStats = dataSet.filter((x) => {
                return x.PassAttempts > 0;
            });
            obj.RushingStats = dataSet.filter((x) => {
                return x.RushAttempts > 0;
            });
            obj.ReceivingStats = dataSet.filter((x) => {
                return x.Targets > 0;
            });
            obj.DefenseStats = dataSet.filter((x) =>
                ['ILB', 'OLB', 'DT', 'DE', 'CB', 'FS', 'SS'].includes(
                    x.Position
                )
            );
            obj.SpecialTeamStats = dataSet.filter((x) =>
                ['P', 'K'].includes(x.Position)
            );
            obj.OLineStats = dataSet.filter((x) => {
                return x.Pancakes > 0 || x.SacksAllowed > 0;
            });
        }
        return obj;
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            aria-labelledby="gameModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="crootModalLabel">
                            {!isLoading && (
                                <>
                                    {game.HomeTeamRank > 0 &&
                                        game.HomeTeamRank + ' '}
                                    {game.HomeTeam} vs{' '}
                                    {game.AwayTeamRank > 0 &&
                                        game.AwayTeamRank + ' '}
                                    {game.AwayTeam} Box Score
                                </>
                            )}
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                <div className="p-1 mb-2 border rounded">
                                    <div className="row">
                                        <h6>Score</h6>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">1Q</div>
                                        <div className="col-2">2Q</div>
                                        <div className="col-2">3Q</div>
                                        <div className="col-2">4Q</div>
                                        <div className="col-2">OT</div>
                                        <div className="col-2">Final</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            {game.Home1stQtr || 0}
                                        </div>
                                        <div className="col-2">
                                            {game.Home2ndQtr || 0}
                                        </div>
                                        <div className="col-2">
                                            {game.Home3rdQtr || 0}
                                        </div>
                                        <div className="col-2">
                                            {game.Home4thQtr || 0}
                                        </div>
                                        <div className="col-2">
                                            {game.HomeOT || 0}
                                        </div>
                                        <div className="col-2">
                                            {game.HomeTeamScore || 0}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-2">
                                            {game.Away1stQtr || 0}
                                        </div>
                                        <div className="col-2">
                                            {game.Away2ndQtr || 0}
                                        </div>
                                        <div className="col-2">
                                            {game.Away3rdQtr || 0}
                                        </div>
                                        <div className="col-2">
                                            {game.Away4thQtr || 0}
                                        </div>
                                        <div className="col-2">
                                            {game.AwayOT || 0}
                                        </div>
                                        <div className="col-2">
                                            {game.AwayTeamScore || 0}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-1 pb-2 mb-2 border rounded">
                                    <div className="row mb-1">
                                        <h6>Passing Stats</h6>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-1">Team</div>
                                        <div className="col-2">Name</div>
                                        <div className="col-1">Position</div>
                                        <div className="col-1">CMP</div>
                                        <div className="col-1">ATT</div>
                                        <div className="col-1">YDS</div>
                                        <div className="col-1">YDS/ATT</div>
                                        <div className="col-1">TD</div>
                                        <div className="col-1">INT</div>
                                        <div className="col-1">RTG</div>
                                        <div className="col-1">SCK</div>
                                    </div>
                                    {viewableHomePlayers &&
                                        viewableHomePlayers.PassingStats
                                            .length > 0 &&
                                        viewableHomePlayers.PassingStats.map(
                                            (x) => {
                                                const pY = 8.4 * x.PassingYards;
                                                const ptd = 330 * x.PassingTDs;
                                                const pc =
                                                    100 * x.PassCompletions;
                                                const ints =
                                                    200 * x.Interceptions;
                                                const numerator =
                                                    pY + ptd + pc - ints;
                                                const qbr = parseFloat(
                                                    numerator / x.PassAttempts
                                                ).toFixed(2);
                                                return (
                                                    <div className="row justify-content-center">
                                                        <div className="col-1">
                                                            {game.HomeTeam}
                                                        </div>
                                                        <div className="col-2">
                                                            {x.FirstName}{' '}
                                                            {x.LastName}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.Position}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.PassCompletions}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.PassAttempts}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.PassingYards}
                                                        </div>
                                                        <div className="col-1">
                                                            {parseFloat(
                                                                x.PassingYards /
                                                                    x.PassAttempts
                                                            ).toFixed(2)}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.PassingTDs}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.Interceptions}
                                                        </div>
                                                        <div className="col-1">
                                                            {qbr}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.Sacks}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    {viewableAwayPlayers &&
                                        viewableAwayPlayers.PassingStats
                                            .length > 0 &&
                                        viewableAwayPlayers.PassingStats.map(
                                            (x) => {
                                                const pY = 8.4 * x.PassingYards;
                                                const ptd = 330 * x.PassingTDs;
                                                const pc =
                                                    100 * x.PassCompletions;
                                                const ints =
                                                    200 * x.Interceptions;
                                                const numerator =
                                                    pY + ptd + pc - ints;
                                                const qbr = parseFloat(
                                                    numerator / x.PassAttempts
                                                ).toFixed(2);
                                                return (
                                                    <div className="row justify-content-center">
                                                        <div className="col-1">
                                                            {game.AwayTeam}
                                                        </div>
                                                        <div className="col-2">
                                                            {x.FirstName}{' '}
                                                            {x.LastName}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.Position}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.PassCompletions}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.PassAttempts}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.PassingYards}
                                                        </div>
                                                        <div className="col-1">
                                                            {parseFloat(
                                                                x.PassingYards /
                                                                    x.PassAttempts
                                                            ).toFixed(2)}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.PassingTDs}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.Interceptions}
                                                        </div>
                                                        <div className="col-1">
                                                            {qbr}
                                                        </div>
                                                        <div className="col-1">
                                                            {x.Sacks}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>
                                <div className="p-1 pb-2 mb-2 border rounded">
                                    <div className="row mt-1 mb-1">
                                        <h6>Rushing Stats</h6>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-2">Team</div>
                                        <div className="col-4">Name</div>
                                        <div className="col-1">Position</div>
                                        <div className="col-1">ATT</div>
                                        <div className="col-1">YDS</div>
                                        <div className="col-1">YDS/ATT</div>
                                        <div className="col-1">TD</div>
                                        <div className="col-1">FUM</div>
                                    </div>
                                    {viewableHomePlayers &&
                                        viewableHomePlayers.RushingStats
                                            .length > 0 &&
                                        viewableHomePlayers.RushingStats.map(
                                            (x) => (
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        {game.HomeTeam}
                                                    </div>
                                                    <div className="col-4">
                                                        {x.FirstName}{' '}
                                                        {x.LastName}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Position}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.RushAttempts}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.RushingYards}
                                                    </div>
                                                    <div className="col-1">
                                                        {parseFloat(
                                                            x.RushingYards /
                                                                x.RushAttempts
                                                        ).toFixed(2)}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.RushingTDs}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Fumbles}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    {viewableAwayPlayers &&
                                        viewableAwayPlayers.RushingStats
                                            .length > 0 &&
                                        viewableAwayPlayers.RushingStats.map(
                                            (x) => (
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        {game.AwayTeam}
                                                    </div>
                                                    <div className="col-4">
                                                        {x.FirstName}{' '}
                                                        {x.LastName}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Position}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.RushAttempts}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.RushingYards}
                                                    </div>
                                                    <div className="col-1">
                                                        {parseFloat(
                                                            x.RushingYards /
                                                                x.RushAttempts
                                                        ).toFixed(2)}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.RushingTDs}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Fumbles}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                                <div className="p-1 pb-2 mb-2 border rounded">
                                    <div className="row mt-1 mb-1">
                                        <h6>Receiving Stats</h6>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-2">Team</div>
                                        <div className="col-2">Name</div>
                                        <div className="col-1">Position</div>
                                        <div className="col-1">TGT</div>
                                        <div className="col-1">CTH</div>
                                        <div className="col-1">YDS</div>
                                        <div className="col-1">YDS/CTH</div>
                                        <div className="col-1">TD</div>
                                        <div className="col-1">FUM</div>
                                        <div className="col-1">Lng.Rec.</div>
                                    </div>
                                    {viewableHomePlayers &&
                                        viewableHomePlayers.ReceivingStats
                                            .length > 0 &&
                                        viewableHomePlayers.ReceivingStats.map(
                                            (x) => (
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        {game.HomeTeam}
                                                    </div>
                                                    <div className="col-2">
                                                        {x.FirstName}{' '}
                                                        {x.LastName}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Position}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Targets}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Catches}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.ReceivingYards}
                                                    </div>
                                                    <div className="col-1">
                                                        {parseFloat(
                                                            x.ReceivingYards /
                                                                x.Catches
                                                        ).toFixed(2)}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.ReceivingTDs}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Fumbles}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.LongestReception}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    {viewableAwayPlayers &&
                                        viewableAwayPlayers.ReceivingStats
                                            .length > 0 &&
                                        viewableAwayPlayers.ReceivingStats.map(
                                            (x) => (
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        {game.AwayTeam}
                                                    </div>
                                                    <div className="col-2">
                                                        {x.FirstName}{' '}
                                                        {x.LastName}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Position}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Targets}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Catches}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.ReceivingYards}
                                                    </div>
                                                    <div className="col-1">
                                                        {parseFloat(
                                                            x.ReceivingYards /
                                                                x.Catches
                                                        ).toFixed(2)}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.ReceivingTDs}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Fumbles}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.LongestReception}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                                <div className="p-1 pb-2 mb-2 border rounded">
                                    <div className="row mt-1 mb-1">
                                        <h6>Defensive Stats</h6>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-2">Team</div>
                                        <div className="col-2">Name</div>
                                        <div className="col-1">Position</div>
                                        <div className="col-1">Solo TKL</div>
                                        <div className="col-1">Ast. TKL</div>
                                        <div className="col-1">TFL</div>
                                        <div className="col-1">SCK</div>
                                        <div className="col-1">FF/FR</div>
                                        <div className="col-1">INT</div>
                                        <div className="col-1">TDs</div>
                                    </div>
                                    {viewableHomePlayers &&
                                        viewableHomePlayers.DefenseStats
                                            .length > 0 &&
                                        viewableHomePlayers.DefenseStats.map(
                                            (x) => (
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        {game.HomeTeam}
                                                    </div>
                                                    <div className="col-2">
                                                        {x.FirstName}{' '}
                                                        {x.LastName}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Position}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.SoloTackles}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.AssistedTackles}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.TacklesForLoss}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.SacksMade}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.ForcedFumbles} /{' '}
                                                        {x.RecoveredFumbles}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.InterceptionsCaught}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.DefensiveTDs}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    {viewableAwayPlayers &&
                                        viewableAwayPlayers.DefenseStats
                                            .length > 0 &&
                                        viewableAwayPlayers.DefenseStats.map(
                                            (x) => (
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        {game.AwayTeam}
                                                    </div>
                                                    <div className="col-2">
                                                        {x.FirstName}{' '}
                                                        {x.LastName}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Position}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.SoloTackles}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.AssistedTackles}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.TacklesForLoss}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.SacksMade}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.ForcedFumbles}/
                                                        {x.RecoveredFumbles}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.InterceptionsCaught}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.DefensiveTDs}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                                <div className="p-1 pb-2 mb-2 border rounded">
                                    <div className="row mt-1 mb-1">
                                        <h6>Special Teams Stats</h6>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-2">Team</div>
                                        <div className="col-2">Name</div>
                                        <div className="col-1">Position</div>
                                        <div className="col-1">XP</div>
                                        <div className="col-1">FG</div>
                                        <div className="col-1">PUNTS</div>
                                        <div className="col-1">YDS</div>
                                        <div className="col-1">Inside 20</div>
                                    </div>
                                    {viewableHomePlayers &&
                                        viewableHomePlayers.SpecialTeamStats
                                            .length > 0 &&
                                        viewableHomePlayers.SpecialTeamStats.map(
                                            (x) => (
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        {game.HomeTeam}
                                                    </div>
                                                    <div className="col-2">
                                                        {x.FirstName}{' '}
                                                        {x.LastName}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Position}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.ExtraPointsMade}/
                                                        {x.ExtraPointsAttempted}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.FGMade}/
                                                        {x.FGAttempts}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Punts}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.PuntYards || 0}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.PuntsInside20}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    {viewableAwayPlayers &&
                                        viewableAwayPlayers.SpecialTeamStats
                                            .length > 0 &&
                                        viewableAwayPlayers.SpecialTeamStats.map(
                                            (x) => (
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        {game.AwayTeam}
                                                    </div>
                                                    <div className="col-2">
                                                        {x.FirstName}{' '}
                                                        {x.LastName}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Position}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.ExtraPointsMade}/
                                                        {x.ExtraPointsAttempted}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.FGMade}/
                                                        {x.FGAttempts}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.Punts}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.PuntYards || 0}
                                                    </div>
                                                    <div className="col-1">
                                                        {x.PuntsInside20}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
