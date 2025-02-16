import React, { useEffect, useState } from 'react';
import FBAScheduleService from '../../_Services/simFBA/FBAScheduleService';
import { StatsPageButton } from './Buttons';
import { Spinner } from './Spinner';
import { GPTab } from '../Gameplan/GameplanCommons';
import { PBPMobileRow, PlayByPlayRow } from '../Schedule/PlayByPlayRow';

export const SimFBAGameModal = ({ game, isNFL, isMobile }) => {
    const _scheduleService = new FBAScheduleService();
    const modalId = `gameModal`;
    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);
    const [viewableHomePlayers, setViewableHomePlayers] = useState(null);
    const [viewableAwayPlayers, setViewableAwayPlayers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [playByPlays, setPlayByPlays] = useState([]);
    const [view, setView] = useState('Box Score');
    const [header, setHeader] = useState('Box Score');
    const [score, setScore] = useState(null);

    useEffect(() => {
        if (game !== null) {
            GetMatchResults();
        }
    }, [game]);

    useEffect(() => {
        if (view && view === 'Box Score') {
            setHeader(() => `Box Score`);
        } else {
            setHeader(() => `Play By Play`);
        }
    }, [view]);

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
        const pbp = [...response.PlayByPlays];
        setPlayByPlays(() => pbp);
        setScore(() => response.Score);
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
                ['ILB', 'OLB', 'DT', 'DE', 'CB', 'FS', 'SS', 'QB'].includes(
                    x.Position
                )
            );
            obj.SpecialTeamStats = dataSet.filter((x) =>
                ['P', 'K', 'QB'].includes(x.Position)
            );
            obj.OLineStats = dataSet.filter((x) => {
                return x.Pancakes > 0 || x.SacksAllowed > 0;
            });
        }

        return obj;
    };

    const ExportPlayByPlays = async () => {
        await _scheduleService.ExportPlayByPlay(
            isNFL,
            game.ID,
            game.HomeTeam,
            game.AwayTeam
        );
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
                                    {game.AwayTeam} {header}
                                </>
                            )}
                        </h4>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={ExportPlayByPlays}
                            style={{ marginLeft: '1rem' }}
                        >
                            Export
                        </button>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row mb-2">
                            <ul className="nav nav-tabs">
                                <GPTab
                                    activeView={view}
                                    gameplanType="Box Score"
                                    setActiveView={setView}
                                />
                                <GPTab
                                    activeView={view}
                                    gameplanType="Play By Play"
                                    setActiveView={setView}
                                />
                            </ul>
                        </div>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                {view === 'Box Score' && (
                                    <>
                                        <div className="row justify-content-center mb-3 gap-2">
                                            <div className="col-12 col-sm-7 px-1 py-2 border rounded">
                                                <div className="row">
                                                    <h6>Score</h6>
                                                </div>
                                                <div className="row justify-content-between">
                                                    <div className="col-2 col-sm-1">
                                                        <h6>Team</h6>
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <h6>1Q</h6>
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <h6>2Q</h6>
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <h6>3Q</h6>
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <h6>4Q</h6>
                                                    </div>
                                                    {score &&
                                                        (score.OT1Home > 0 ||
                                                            score.OT2Home > 0 ||
                                                            score.OT3Home > 0 ||
                                                            score.OT4Home > 0 ||
                                                            score.OT1Away > 0 ||
                                                            score.OT2Away > 0 ||
                                                            score.OT3Away > 0 ||
                                                            score.OT4Away >
                                                                0) && (
                                                            <div className="col-1 col-sm-2">
                                                                OT
                                                            </div>
                                                        )}
                                                    <div className="col-2 col-sm-1">
                                                        Final
                                                    </div>
                                                </div>
                                                <div className="row justify-content-between">
                                                    <div className="col-2 col-sm-1">
                                                        {game.HomeTeam}
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <p className="text-small">
                                                            {score.Q1Home || 0}
                                                        </p>
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <p className="text-small">
                                                            {score.Q2Home || 0}
                                                        </p>
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <p className="text-small">
                                                            {score.Q3Home || 0}
                                                        </p>
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <p className="text-small">
                                                            {score.Q4Home || 0}
                                                        </p>
                                                    </div>
                                                    {score &&
                                                        (score.OT1Home > 0 ||
                                                            score.OT2Home > 0 ||
                                                            score.OT3Home > 0 ||
                                                            score.OT4Home > 0 ||
                                                            score.OT1Away > 0 ||
                                                            score.OT2Away > 0 ||
                                                            score.OT3Away > 0 ||
                                                            score.OT4Away >
                                                                0) && (
                                                            <div className="col-1 col-sm-2">
                                                                <p className="text-small">
                                                                    {score.OT1Home +
                                                                        score.OT2Home +
                                                                        score.OT3Home +
                                                                        score.OT4Home ||
                                                                        0}
                                                                </p>
                                                            </div>
                                                        )}

                                                    <div className="col-2 col-sm-1">
                                                        <p className="text-small">
                                                            {game.HomeTeamScore ||
                                                                0}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-between">
                                                    <div className="col-2 col-sm-1">
                                                        {game.AwayTeam}
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <p className="text-small">
                                                            {score.Q1Away || 0}
                                                        </p>
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <p className="text-small">
                                                            {score.Q2Away || 0}
                                                        </p>
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <p className="text-small">
                                                            {score.Q3Away || 0}
                                                        </p>
                                                    </div>
                                                    <div className="col-1 col-sm-2">
                                                        <p className="text-small">
                                                            {score.Q4Away || 0}
                                                        </p>
                                                    </div>
                                                    {score &&
                                                        (score.OT1Home > 0 ||
                                                            score.OT2Home > 0 ||
                                                            score.OT3Home > 0 ||
                                                            score.OT4Home > 0 ||
                                                            score.OT1Away > 0 ||
                                                            score.OT2Away > 0 ||
                                                            score.OT3Away > 0 ||
                                                            score.OT4Away >
                                                                0) && (
                                                            <div className="col-1 col-sm-2">
                                                                <p className="text-small">
                                                                    {score.OT1Away +
                                                                        score.OT2Away +
                                                                        score.OT3Away +
                                                                        score.OT4Away ||
                                                                        0}
                                                                </p>
                                                            </div>
                                                        )}
                                                    <div className="col-2 col-sm-1">
                                                        <p className="text-small">
                                                            {game.AwayTeamScore ||
                                                                0}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4 px-1 py-2 border rounded">
                                                <div className="row">
                                                    <h6>Schemes</h6>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-6">
                                                        Offense
                                                    </div>
                                                    <div className="col-6">
                                                        Defense
                                                    </div>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-6">
                                                        <p className="text-small">
                                                            {
                                                                score.HomeOffensiveScheme
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="col-6">
                                                        <p className="text-small">
                                                            {
                                                                score.HomeDefensiveScheme
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-6">
                                                        <p className="text-small">
                                                            {
                                                                score.AwayOffensiveScheme
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="col-6">
                                                        <p className="text-small">
                                                            {
                                                                score.AwayDefensiveScheme
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {!isMobile && (
                                            <div className="p-1 pb-2 mb-2 border rounded">
                                                <div className="row mb-1">
                                                    <h6>Passing Stats</h6>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-1">
                                                        Team
                                                    </div>
                                                    <div className="col-2">
                                                        Name
                                                    </div>
                                                    <div className="col-1">
                                                        Position
                                                    </div>
                                                    <div className="col-1">
                                                        CMP
                                                    </div>
                                                    <div className="col-1">
                                                        ATT
                                                    </div>
                                                    <div className="col-1">
                                                        YDS
                                                    </div>
                                                    <div className="col-1">
                                                        YDS/ATT
                                                    </div>
                                                    <div className="col-1">
                                                        TD
                                                    </div>
                                                    <div className="col-1">
                                                        INT
                                                    </div>
                                                    <div className="col-1">
                                                        RTG
                                                    </div>
                                                    <div className="col-1">
                                                        SCK
                                                    </div>
                                                </div>
                                                {viewableHomePlayers &&
                                                    viewableHomePlayers
                                                        .PassingStats.length >
                                                        0 &&
                                                    viewableHomePlayers.PassingStats.map(
                                                        (x) => {
                                                            const pY =
                                                                8.4 *
                                                                x.PassingYards;
                                                            const ptd =
                                                                330 *
                                                                x.PassingTDs;
                                                            const pc =
                                                                100 *
                                                                x.PassCompletions;
                                                            const ints =
                                                                200 *
                                                                x.Interceptions;
                                                            const numerator =
                                                                pY +
                                                                ptd +
                                                                pc -
                                                                ints;
                                                            const qbr =
                                                                parseFloat(
                                                                    numerator /
                                                                        x.PassAttempts
                                                                ).toFixed(2);
                                                            return (
                                                                <div className="row justify-content-center mb-2">
                                                                    <div className="col-1">
                                                                        {
                                                                            game.HomeTeam
                                                                        }
                                                                    </div>
                                                                    <div className="col-2">
                                                                        {
                                                                            x.FirstName
                                                                        }{' '}
                                                                        {
                                                                            x.LastName
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.Position
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.PassCompletions
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.PassAttempts
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.PassingYards
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {parseFloat(
                                                                            x.PassingYards /
                                                                                x.PassAttempts
                                                                        ).toFixed(
                                                                            2
                                                                        )}
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.PassingTDs
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.Interceptions
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {qbr}
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.Sacks
                                                                        }
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                {viewableAwayPlayers &&
                                                    viewableAwayPlayers
                                                        .PassingStats.length >
                                                        0 &&
                                                    viewableAwayPlayers.PassingStats.map(
                                                        (x) => {
                                                            const pY =
                                                                8.4 *
                                                                x.PassingYards;
                                                            const ptd =
                                                                330 *
                                                                x.PassingTDs;
                                                            const pc =
                                                                100 *
                                                                x.PassCompletions;
                                                            const ints =
                                                                200 *
                                                                x.Interceptions;
                                                            const numerator =
                                                                pY +
                                                                ptd +
                                                                pc -
                                                                ints;
                                                            const qbr =
                                                                parseFloat(
                                                                    numerator /
                                                                        x.PassAttempts
                                                                ).toFixed(2);
                                                            return (
                                                                <div className="row justify-content-center mb-2">
                                                                    <div className="col-1">
                                                                        {
                                                                            game.AwayTeam
                                                                        }
                                                                    </div>
                                                                    <div className="col-2">
                                                                        {
                                                                            x.FirstName
                                                                        }{' '}
                                                                        {
                                                                            x.LastName
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.Position
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.PassCompletions
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.PassAttempts
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.PassingYards
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {parseFloat(
                                                                            x.PassingYards /
                                                                                x.PassAttempts
                                                                        ).toFixed(
                                                                            2
                                                                        )}
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.PassingTDs
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.Interceptions
                                                                        }
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {qbr}
                                                                    </div>
                                                                    <div className="col-1">
                                                                        {
                                                                            x.Sacks
                                                                        }
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        )}
                                        {isMobile && (
                                            <div className="p-1 pb-2 mb-2 border rounded">
                                                <div className="row mb-1">
                                                    <h6>Passing Stats</h6>
                                                </div>
                                                {viewableHomePlayers &&
                                                    viewableHomePlayers
                                                        .PassingStats.length >
                                                        0 &&
                                                    viewableHomePlayers.PassingStats.map(
                                                        (x) => {
                                                            const pY =
                                                                8.4 *
                                                                x.PassingYards;
                                                            const ptd =
                                                                330 *
                                                                x.PassingTDs;
                                                            const pc =
                                                                100 *
                                                                x.PassCompletions;
                                                            const ints =
                                                                200 *
                                                                x.Interceptions;
                                                            const numerator =
                                                                pY +
                                                                ptd +
                                                                pc -
                                                                ints;
                                                            const qbr =
                                                                parseFloat(
                                                                    numerator /
                                                                        x.PassAttempts
                                                                ).toFixed(2);
                                                            return (
                                                                <div className="row justify-content-center mb-2">
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">
                                                                                {
                                                                                    game.HomeTeam
                                                                                }{' '}
                                                                                {
                                                                                    x.Position
                                                                                }{' '}
                                                                                {
                                                                                    x.FirstName
                                                                                }{' '}
                                                                                {
                                                                                    x.LastName
                                                                                }
                                                                            </h5>
                                                                            <h6 className="card-subtitle mb-2">
                                                                                {
                                                                                    x.PassCompletions
                                                                                }{' '}
                                                                                of{' '}
                                                                                {
                                                                                    x.PassAttempts
                                                                                }{' '}
                                                                                for{' '}
                                                                                {
                                                                                    x.PassingYards
                                                                                }{' '}
                                                                                yards
                                                                            </h6>
                                                                            <p className="card-text text-small">
                                                                                {parseFloat(
                                                                                    x.PassingYards /
                                                                                        x.PassAttempts
                                                                                ).toFixed(
                                                                                    2
                                                                                )}{' '}
                                                                                yds/att
                                                                            </p>
                                                                            <p className="card-text text-small">
                                                                                {
                                                                                    x.PassingTDs
                                                                                }{' '}
                                                                                TDs,{' '}
                                                                                {
                                                                                    x.Interceptions
                                                                                }{' '}
                                                                                INT,{' '}
                                                                                {
                                                                                    qbr
                                                                                }{' '}
                                                                                QBR,{' '}
                                                                                {
                                                                                    x.Sacks
                                                                                }{' '}
                                                                                SCK
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                {viewableAwayPlayers &&
                                                    viewableAwayPlayers
                                                        .PassingStats.length >
                                                        0 &&
                                                    viewableAwayPlayers.PassingStats.map(
                                                        (x) => {
                                                            const pY =
                                                                8.4 *
                                                                x.PassingYards;
                                                            const ptd =
                                                                330 *
                                                                x.PassingTDs;
                                                            const pc =
                                                                100 *
                                                                x.PassCompletions;
                                                            const ints =
                                                                200 *
                                                                x.Interceptions;
                                                            const numerator =
                                                                pY +
                                                                ptd +
                                                                pc -
                                                                ints;
                                                            const qbr =
                                                                parseFloat(
                                                                    numerator /
                                                                        x.PassAttempts
                                                                ).toFixed(2);
                                                            return (
                                                                <div className="row justify-content-center mb-2">
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">
                                                                                {
                                                                                    game.AwayTeam
                                                                                }{' '}
                                                                                {
                                                                                    x.Position
                                                                                }{' '}
                                                                                {
                                                                                    x.FirstName
                                                                                }{' '}
                                                                                {
                                                                                    x.LastName
                                                                                }
                                                                            </h5>
                                                                            <h6 className="card-subtitle mb-2">
                                                                                {
                                                                                    x.PassCompletions
                                                                                }{' '}
                                                                                of{' '}
                                                                                {
                                                                                    x.PassAttempts
                                                                                }{' '}
                                                                                for{' '}
                                                                                {
                                                                                    x.PassingYards
                                                                                }{' '}
                                                                                yards
                                                                            </h6>
                                                                            <p className="card-text text-small">
                                                                                {parseFloat(
                                                                                    x.PassingYards /
                                                                                        x.PassAttempts
                                                                                ).toFixed(
                                                                                    2
                                                                                )}{' '}
                                                                                yds/att
                                                                            </p>
                                                                            <p className="card-text text-small">
                                                                                {
                                                                                    x.PassingTDs
                                                                                }{' '}
                                                                                TDs,{' '}
                                                                                {
                                                                                    x.Interceptions
                                                                                }{' '}
                                                                                INT,{' '}
                                                                                {
                                                                                    qbr
                                                                                }{' '}
                                                                                QBR,{' '}
                                                                                {
                                                                                    x.Sacks
                                                                                }{' '}
                                                                                SCK
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        )}
                                        {!isMobile && (
                                            <div className="p-1 pb-2 mb-2 border rounded">
                                                <div className="row mt-1 mb-1">
                                                    <h6>Rushing Stats</h6>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        Team
                                                    </div>
                                                    <div className="col-4">
                                                        Name
                                                    </div>
                                                    <div className="col-1">
                                                        Position
                                                    </div>
                                                    <div className="col-1">
                                                        ATT
                                                    </div>
                                                    <div className="col-1">
                                                        YDS
                                                    </div>
                                                    <div className="col-1">
                                                        YDS/ATT
                                                    </div>
                                                    <div className="col-1">
                                                        TD
                                                    </div>
                                                    <div className="col-1">
                                                        FUM
                                                    </div>
                                                </div>
                                                {viewableHomePlayers &&
                                                    viewableHomePlayers
                                                        .RushingStats.length >
                                                        0 &&
                                                    viewableHomePlayers.RushingStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center">
                                                                <div className="col-2">
                                                                    {
                                                                        game.HomeTeam
                                                                    }
                                                                </div>
                                                                <div className="col-4">
                                                                    {
                                                                        x.FirstName
                                                                    }{' '}
                                                                    {x.LastName}
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.Position}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.RushAttempts
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.RushingYards
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {parseFloat(
                                                                        x.RushingYards /
                                                                            x.RushAttempts
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.RushingTDs
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.Fumbles}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                {viewableAwayPlayers &&
                                                    viewableAwayPlayers
                                                        .RushingStats.length >
                                                        0 &&
                                                    viewableAwayPlayers.RushingStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center">
                                                                <div className="col-2">
                                                                    {
                                                                        game.AwayTeam
                                                                    }
                                                                </div>
                                                                <div className="col-4">
                                                                    {
                                                                        x.FirstName
                                                                    }{' '}
                                                                    {x.LastName}
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.Position}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.RushAttempts
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.RushingYards
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {parseFloat(
                                                                        x.RushingYards /
                                                                            x.RushAttempts
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.RushingTDs
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.Fumbles}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        )}
                                        {isMobile && (
                                            <div className="p-1 pb-2 mb-2 border rounded">
                                                <div className="row mt-1 mb-1">
                                                    <h6>Rushing Stats</h6>
                                                </div>
                                                {viewableHomePlayers &&
                                                    viewableHomePlayers
                                                        .RushingStats.length >
                                                        0 &&
                                                    viewableHomePlayers.RushingStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center mb-2">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            {
                                                                                game.HomeTeam
                                                                            }{' '}
                                                                            {
                                                                                x.Position
                                                                            }{' '}
                                                                            {
                                                                                x.FirstName
                                                                            }{' '}
                                                                            {
                                                                                x.LastName
                                                                            }
                                                                        </h5>
                                                                        <h6 className="card-subtitle mb-2">
                                                                            {
                                                                                x.RushAttempts
                                                                            }{' '}
                                                                            att
                                                                            for{' '}
                                                                            {
                                                                                x.RushingYards
                                                                            }{' '}
                                                                            yds,{' '}
                                                                            {
                                                                                x.RushingTDs
                                                                            }
                                                                            TDs{' '}
                                                                            {
                                                                                x.Fumbles
                                                                            }
                                                                            FUM
                                                                        </h6>
                                                                        <p className="card-text text-small">
                                                                            {parseFloat(
                                                                                x.RushingYards /
                                                                                    x.RushAttempts
                                                                            ).toFixed(
                                                                                2
                                                                            )}{' '}
                                                                            yds/att.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                {viewableAwayPlayers &&
                                                    viewableAwayPlayers
                                                        .RushingStats.length >
                                                        0 &&
                                                    viewableAwayPlayers.RushingStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center mb-2">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            {
                                                                                game.AwayTeam
                                                                            }{' '}
                                                                            {
                                                                                x.Position
                                                                            }{' '}
                                                                            {
                                                                                x.FirstName
                                                                            }{' '}
                                                                            {
                                                                                x.LastName
                                                                            }
                                                                        </h5>
                                                                        <h6 className="card-subtitle mb-2">
                                                                            {
                                                                                x.RushAttempts
                                                                            }{' '}
                                                                            att
                                                                            for{' '}
                                                                            {
                                                                                x.RushingYards
                                                                            }{' '}
                                                                            yds,{' '}
                                                                            {
                                                                                x.RushingTDs
                                                                            }
                                                                            TDs{' '}
                                                                            {
                                                                                x.Fumbles
                                                                            }
                                                                            FUM
                                                                        </h6>
                                                                        <p className="card-text text-small">
                                                                            {parseFloat(
                                                                                x.RushingYards /
                                                                                    x.RushAttempts
                                                                            ).toFixed(
                                                                                2
                                                                            )}{' '}
                                                                            yds/att.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        )}
                                        {isMobile && (
                                            <div className="p-1 pb-2 mb-2 border rounded">
                                                <div className="row mt-1 mb-1">
                                                    <h6>Receiving Stats</h6>
                                                </div>
                                                {viewableHomePlayers &&
                                                    viewableHomePlayers
                                                        .ReceivingStats.length >
                                                        0 &&
                                                    viewableHomePlayers.ReceivingStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center mb-2">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            {
                                                                                game.HomeTeam
                                                                            }{' '}
                                                                            {
                                                                                x.Position
                                                                            }{' '}
                                                                            {
                                                                                x.FirstName
                                                                            }{' '}
                                                                            {
                                                                                x.LastName
                                                                            }
                                                                        </h5>
                                                                        <h6 className="card-subtitle mb-2">
                                                                            {
                                                                                x.Targets
                                                                            }{' '}
                                                                            tgts,{' '}
                                                                            {
                                                                                x.Catches
                                                                            }{' '}
                                                                            cth
                                                                            for{' '}
                                                                            {
                                                                                x.ReceivingYards
                                                                            }{' '}
                                                                            yds{' '}
                                                                            {
                                                                                x.ReceivingTDs
                                                                            }
                                                                            TDs{' '}
                                                                            {
                                                                                x.Fumbles
                                                                            }
                                                                            FUM
                                                                        </h6>
                                                                        <p>
                                                                            {parseFloat(
                                                                                x.ReceivingYards /
                                                                                    x.Catches
                                                                            ).toFixed(
                                                                                2
                                                                            )}{' '}
                                                                            yds/cth
                                                                            |
                                                                            Longest
                                                                            Rec:{' '}
                                                                            {
                                                                                x.LongestReception
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                {viewableAwayPlayers &&
                                                    viewableAwayPlayers
                                                        .ReceivingStats.length >
                                                        0 &&
                                                    viewableAwayPlayers.ReceivingStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center mb-2">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            {
                                                                                game.AwayTeam
                                                                            }{' '}
                                                                            {
                                                                                x.Position
                                                                            }{' '}
                                                                            {
                                                                                x.FirstName
                                                                            }{' '}
                                                                            {
                                                                                x.LastName
                                                                            }
                                                                        </h5>
                                                                        <h6 className="card-subtitle mb-2">
                                                                            {
                                                                                x.Targets
                                                                            }{' '}
                                                                            tgts,{' '}
                                                                            {
                                                                                x.Catches
                                                                            }{' '}
                                                                            cth
                                                                            for{' '}
                                                                            {
                                                                                x.ReceivingYards
                                                                            }{' '}
                                                                            yds{' '}
                                                                            {
                                                                                x.ReceivingTDs
                                                                            }
                                                                            TDs{' '}
                                                                            {
                                                                                x.Fumbles
                                                                            }
                                                                            FUM
                                                                        </h6>
                                                                        <p>
                                                                            {parseFloat(
                                                                                x.ReceivingYards /
                                                                                    x.Catches
                                                                            ).toFixed(
                                                                                2
                                                                            )}{' '}
                                                                            yds/cth
                                                                            |
                                                                            Longest
                                                                            Rec:{' '}
                                                                            {
                                                                                x.LongestReception
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        )}
                                        {!isMobile && (
                                            <div className="p-1 pb-2 mb-2 border rounded">
                                                <div className="row mt-1 mb-1">
                                                    <h6>Receiving Stats</h6>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        Team
                                                    </div>
                                                    <div className="col-2">
                                                        Name
                                                    </div>
                                                    <div className="col-1">
                                                        Position
                                                    </div>
                                                    <div className="col-1">
                                                        TGT
                                                    </div>
                                                    <div className="col-1">
                                                        CTH
                                                    </div>
                                                    <div className="col-1">
                                                        YDS
                                                    </div>
                                                    <div className="col-1">
                                                        YDS/CTH
                                                    </div>
                                                    <div className="col-1">
                                                        TD
                                                    </div>
                                                    <div className="col-1">
                                                        FUM
                                                    </div>
                                                    <div className="col-1">
                                                        Lng.Rec.
                                                    </div>
                                                </div>
                                                {viewableHomePlayers &&
                                                    viewableHomePlayers
                                                        .ReceivingStats.length >
                                                        0 &&
                                                    viewableHomePlayers.ReceivingStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center">
                                                                <div className="col-2">
                                                                    {
                                                                        game.HomeTeam
                                                                    }
                                                                </div>
                                                                <div className="col-2">
                                                                    {
                                                                        x.FirstName
                                                                    }{' '}
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
                                                                    {
                                                                        x.ReceivingYards
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {parseFloat(
                                                                        x.ReceivingYards /
                                                                            x.Catches
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.ReceivingTDs
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.Fumbles}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.LongestReception
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                {viewableAwayPlayers &&
                                                    viewableAwayPlayers
                                                        .ReceivingStats.length >
                                                        0 &&
                                                    viewableAwayPlayers.ReceivingStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center">
                                                                <div className="col-2">
                                                                    {
                                                                        game.AwayTeam
                                                                    }
                                                                </div>
                                                                <div className="col-2">
                                                                    {
                                                                        x.FirstName
                                                                    }{' '}
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
                                                                    {
                                                                        x.ReceivingYards
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {parseFloat(
                                                                        x.ReceivingYards /
                                                                            x.Catches
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.ReceivingTDs
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.Fumbles}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.LongestReception
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        )}
                                        {!isMobile && (
                                            <div className="p-1 pb-2 mb-2 border rounded">
                                                <div className="row mt-1 mb-1">
                                                    <h6>Defensive Stats</h6>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        Team
                                                    </div>
                                                    <div className="col-2">
                                                        Name
                                                    </div>
                                                    <div className="col-1">
                                                        Solo TKL
                                                    </div>
                                                    <div className="col-1">
                                                        Ast. TKL
                                                    </div>
                                                    <div className="col-1">
                                                        TFL
                                                    </div>
                                                    <div className="col-1">
                                                        SCK
                                                    </div>
                                                    <div className="col-1">
                                                        FF/FR
                                                    </div>
                                                    <div className="col-1">
                                                        PD
                                                    </div>
                                                    <div className="col-1">
                                                        INT
                                                    </div>
                                                    <div className="col-1">
                                                        TDs
                                                    </div>
                                                </div>
                                                {viewableHomePlayers &&
                                                    viewableHomePlayers
                                                        .DefenseStats.length >
                                                        0 &&
                                                    viewableHomePlayers.DefenseStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center">
                                                                <div className="col-2">
                                                                    {
                                                                        game.HomeTeam
                                                                    }
                                                                </div>
                                                                <div className="col-2">
                                                                    {x.Position}{' '}
                                                                    {
                                                                        x.FirstName
                                                                    }{' '}
                                                                    {x.LastName}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.SoloTackles
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.AssistedTackles
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.TacklesForLoss
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.SacksMade
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.ForcedFumbles
                                                                    }{' '}
                                                                    /{' '}
                                                                    {
                                                                        x.RecoveredFumbles
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.PassDeflections
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.InterceptionsCaught
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.DefensiveTDs
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                {viewableAwayPlayers &&
                                                    viewableAwayPlayers
                                                        .DefenseStats.length >
                                                        0 &&
                                                    viewableAwayPlayers.DefenseStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center">
                                                                <div className="col-2">
                                                                    {
                                                                        game.AwayTeam
                                                                    }
                                                                </div>
                                                                <div className="col-2">
                                                                    {x.Position}{' '}
                                                                    {
                                                                        x.FirstName
                                                                    }{' '}
                                                                    {x.LastName}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.SoloTackles
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.AssistedTackles
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.TacklesForLoss
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.SacksMade
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.ForcedFumbles
                                                                    }{' '}
                                                                    /{' '}
                                                                    {
                                                                        x.RecoveredFumbles
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.PassDeflections
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.InterceptionsCaught
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.DefensiveTDs
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        )}
                                        {isMobile && (
                                            <div className="p-1 pb-2 mb-2 border rounded">
                                                <div className="row mt-1 mb-1">
                                                    <h6>Defensive Stats</h6>
                                                </div>
                                                {viewableHomePlayers &&
                                                    viewableHomePlayers
                                                        .DefenseStats.length >
                                                        0 &&
                                                    viewableHomePlayers.DefenseStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center mb-2">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            {
                                                                                game.HomeTeam
                                                                            }{' '}
                                                                            {
                                                                                x.Position
                                                                            }{' '}
                                                                            {
                                                                                x.FirstName
                                                                            }{' '}
                                                                            {
                                                                                x.LastName
                                                                            }
                                                                        </h5>
                                                                        <h6 className="card-subtitle mb-2">
                                                                            {
                                                                                x.SoloTackles
                                                                            }{' '}
                                                                            Solo
                                                                            TKL,{' '}
                                                                            {
                                                                                x.AssistedTackles
                                                                            }{' '}
                                                                            Ast.
                                                                            TKL,{' '}
                                                                            {
                                                                                x.TacklesForLoss
                                                                            }
                                                                        </h6>
                                                                        <p className="card-text text-small">
                                                                            {
                                                                                x.SacksMade
                                                                            }
                                                                            SCK{' '}
                                                                            {
                                                                                x.ForcedFumbles
                                                                            }{' '}
                                                                            /{' '}
                                                                            {
                                                                                x.RecoveredFumbles
                                                                            }{' '}
                                                                            FF/FR,{' '}
                                                                            {
                                                                                x.PassDeflections
                                                                            }
                                                                            PD,{' '}
                                                                            {
                                                                                x.InterceptionsCaught
                                                                            }{' '}
                                                                            INT{' '}
                                                                            {
                                                                                x.DefensiveTDs
                                                                            }
                                                                            TDs
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                {viewableAwayPlayers &&
                                                    viewableAwayPlayers
                                                        .DefenseStats.length >
                                                        0 &&
                                                    viewableAwayPlayers.DefenseStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center mb-2">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            {
                                                                                game.AwayTeam
                                                                            }{' '}
                                                                            {
                                                                                x.Position
                                                                            }{' '}
                                                                            {
                                                                                x.FirstName
                                                                            }{' '}
                                                                            {
                                                                                x.LastName
                                                                            }
                                                                        </h5>
                                                                        <h6 className="card-subtitle mb-2">
                                                                            {
                                                                                x.SoloTackles
                                                                            }{' '}
                                                                            Solo
                                                                            TKL,{' '}
                                                                            {
                                                                                x.AssistedTackles
                                                                            }{' '}
                                                                            Ast.
                                                                            TKL,{' '}
                                                                            {
                                                                                x.TacklesForLoss
                                                                            }
                                                                        </h6>
                                                                        <p className="card-text text-small">
                                                                            {
                                                                                x.SacksMade
                                                                            }
                                                                            SCK{' '}
                                                                            {
                                                                                x.ForcedFumbles
                                                                            }{' '}
                                                                            /{' '}
                                                                            {
                                                                                x.RecoveredFumbles
                                                                            }{' '}
                                                                            FF/FR,{' '}
                                                                            {
                                                                                x.PassDeflections
                                                                            }
                                                                            PD,{' '}
                                                                            {
                                                                                x.InterceptionsCaught
                                                                            }{' '}
                                                                            INT{' '}
                                                                            {
                                                                                x.DefensiveTDs
                                                                            }
                                                                            TDs
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        )}
                                        {!isMobile && (
                                            <div className="p-1 pb-2 mb-2 border rounded">
                                                <div className="row mt-1 mb-1">
                                                    <h6>Special Teams Stats</h6>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-2">
                                                        Team
                                                    </div>
                                                    <div className="col-2">
                                                        Name
                                                    </div>
                                                    <div className="col-1">
                                                        Position
                                                    </div>
                                                    <div className="col-1">
                                                        XP
                                                    </div>
                                                    <div className="col-1">
                                                        FG
                                                    </div>
                                                    <div className="col-1">
                                                        PUNTS
                                                    </div>
                                                    <div className="col-1">
                                                        YDS
                                                    </div>
                                                    <div className="col-1">
                                                        Inside 20
                                                    </div>
                                                </div>
                                                {viewableHomePlayers &&
                                                    viewableHomePlayers
                                                        .SpecialTeamStats
                                                        .length > 0 &&
                                                    viewableHomePlayers.SpecialTeamStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center">
                                                                <div className="col-2">
                                                                    {
                                                                        game.HomeTeam
                                                                    }
                                                                </div>
                                                                <div className="col-2">
                                                                    {
                                                                        x.FirstName
                                                                    }{' '}
                                                                    {x.LastName}
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.Position}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.ExtraPointsMade
                                                                    }
                                                                    /
                                                                    {
                                                                        x.ExtraPointsAttempted
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.FGMade}/
                                                                    {
                                                                        x.FGAttempts
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.Punts}
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.PuntYards ||
                                                                        0}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.PuntsInside20
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                {viewableAwayPlayers &&
                                                    viewableAwayPlayers
                                                        .SpecialTeamStats
                                                        .length > 0 &&
                                                    viewableAwayPlayers.SpecialTeamStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center">
                                                                <div className="col-2">
                                                                    {
                                                                        game.AwayTeam
                                                                    }
                                                                </div>
                                                                <div className="col-2">
                                                                    {
                                                                        x.FirstName
                                                                    }{' '}
                                                                    {x.LastName}
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.Position}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.ExtraPointsMade
                                                                    }
                                                                    /
                                                                    {
                                                                        x.ExtraPointsAttempted
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.FGMade}/
                                                                    {
                                                                        x.FGAttempts
                                                                    }
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.Punts}
                                                                </div>
                                                                <div className="col-1">
                                                                    {x.PuntYards ||
                                                                        0}
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        x.PuntsInside20
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        )}
                                        {isMobile && (
                                            <div className="p-1 pb-2 mb-2 border rounded">
                                                <div className="row mt-1 mb-1">
                                                    <h6>Special Teams Stats</h6>
                                                </div>
                                                {viewableHomePlayers &&
                                                    viewableHomePlayers
                                                        .SpecialTeamStats
                                                        .length > 0 &&
                                                    viewableHomePlayers.SpecialTeamStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center mb-2">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            {
                                                                                game.HomeTeam
                                                                            }{' '}
                                                                            {
                                                                                x.Position
                                                                            }{' '}
                                                                            {
                                                                                x.FirstName
                                                                            }{' '}
                                                                            {
                                                                                x.LastName
                                                                            }
                                                                        </h5>
                                                                        <h6 className="card-subtitle mb-2">
                                                                            {
                                                                                x.ExtraPointsMade
                                                                            }
                                                                            /
                                                                            {
                                                                                x.ExtraPointsAttempted
                                                                            }
                                                                            XP{' '}
                                                                            {
                                                                                x.FGMade
                                                                            }
                                                                            /
                                                                            {
                                                                                x.FGAttempts
                                                                            }
                                                                            FG
                                                                        </h6>
                                                                        <p className="card-text">
                                                                            {
                                                                                x.Punts
                                                                            }{' '}
                                                                            punts,{' '}
                                                                            {x.PuntYards ||
                                                                                0}
                                                                            yds
                                                                        </p>
                                                                        <p className="card-text">
                                                                            {
                                                                                x.PuntsInside20
                                                                            }{' '}
                                                                            Inside
                                                                            20
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                {viewableAwayPlayers &&
                                                    viewableAwayPlayers
                                                        .SpecialTeamStats
                                                        .length > 0 &&
                                                    viewableAwayPlayers.SpecialTeamStats.map(
                                                        (x) => (
                                                            <div className="row justify-content-center">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            {
                                                                                game.AwayTeam
                                                                            }{' '}
                                                                            {
                                                                                x.Position
                                                                            }{' '}
                                                                            {
                                                                                x.FirstName
                                                                            }{' '}
                                                                            {
                                                                                x.LastName
                                                                            }
                                                                        </h5>
                                                                        <h6 className="card-subtitle mb-2">
                                                                            {
                                                                                x.ExtraPointsMade
                                                                            }
                                                                            /
                                                                            {
                                                                                x.ExtraPointsAttempted
                                                                            }
                                                                            XP{' '}
                                                                            {
                                                                                x.FGMade
                                                                            }
                                                                            /
                                                                            {
                                                                                x.FGAttempts
                                                                            }
                                                                            FG
                                                                        </h6>
                                                                        <p className="card-text">
                                                                            {
                                                                                x.Punts
                                                                            }{' '}
                                                                            punts,{' '}
                                                                            {x.PuntYards ||
                                                                                0}
                                                                            yds
                                                                        </p>
                                                                        <p className="card-text">
                                                                            {
                                                                                x.PuntsInside20
                                                                            }{' '}
                                                                            Inside
                                                                            20
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        )}
                                    </>
                                )}

                                {view === 'Play By Play' && !isMobile && (
                                    <>
                                        <div className="p-1 mb-2 border rounded">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            Num.
                                                        </th>
                                                        <th scope="col">
                                                            HT Score
                                                        </th>
                                                        <th scope="col">
                                                            AT Score
                                                        </th>
                                                        <th scope="col">
                                                            Quarter
                                                        </th>
                                                        <th scope="col">
                                                            Possession
                                                        </th>
                                                        <th scope="col">
                                                            Time
                                                        </th>
                                                        <th scope="col">
                                                            Down
                                                        </th>
                                                        <th scope="col">LOS</th>
                                                        <th scope="col">PT.</th>
                                                        <th scope="col">
                                                            Play
                                                        </th>
                                                        <th scope="col">
                                                            Off. Form.
                                                        </th>
                                                        <th scope="col">
                                                            Def. Form.
                                                        </th>
                                                        <th scope="col">
                                                            PoA.
                                                        </th>
                                                        <th scope="col">
                                                            Def. Ten.
                                                        </th>
                                                        <th scope="col">
                                                            Blitz No.
                                                        </th>
                                                        <th scope="col">
                                                            LB Cov.
                                                        </th>
                                                        <th scope="col">
                                                            DB Cov.
                                                        </th>
                                                        <th scope="col">
                                                            S Cov.
                                                        </th>
                                                        <th scope="col">
                                                            Yds.
                                                        </th>
                                                        <th scope="col">
                                                            Results
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {playByPlays.length > 0 &&
                                                        playByPlays.map((x) => (
                                                            <PlayByPlayRow
                                                                play={x}
                                                            />
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                                {view === 'Play By Play' && isMobile && (
                                    <>
                                        {playByPlays &&
                                            playByPlays.map((x) => (
                                                <PBPMobileRow play={x} />
                                            ))}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
