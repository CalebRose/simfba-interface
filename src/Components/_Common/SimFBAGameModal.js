import React, { useEffect, useState } from 'react';
import FBAScheduleService from '../../_Services/simFBA/FBAScheduleService';
import { StatsPageButton } from './Buttons';

export const SimFBAGameModal = ({ game, isNFL }) => {
    const _scheduleService = new FBAScheduleService();
    const modalId = `gameModal`;
    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);
    const [viewableHomePlayers, setViewableHomePlayers] = useState([]);
    const [viewableAwayPlayers, setViewableAwayPlayers] = useState([]);
    const [statType, setStatType] = useState('Passing'); // PASSING, RUSHING, RECEIVING, TACKLES, YARDS ALLOWED, INTs, SACKS
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (game !== null) {
            GetMatchResults();
        }
    }, [game]);

    useEffect(() => {
        if (homePlayers.length > 0 && awayPlayers.length > 0) {
            const hList = [...homePlayers];
            const aList = [...awayPlayers];

            const filteredHomePlayerList = FilterStatsData(hList);
            const filteredAwayPlayerList = FilterStatsData(aList);
            setViewableHomePlayers(() => filteredHomePlayerList);
            setViewableAwayPlayers(() => filteredAwayPlayerList);
        }
    }, [homePlayers, awayPlayers, statType]);

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

    const FilterStatsData = (dataSet) => {
        // Player VS Team View
        if (dataSet.length > 0) {
            switch (statType) {
                case 'Passing':
                    dataSet = dataSet.filter((x) => {
                        return x.Stats.PassAttempts > 0;
                    });
                    break;
                case 'Rushing':
                    dataSet = dataSet.filter((x) => {
                        return x.Stats.RushAttempts > 0;
                    });
                    break;
                case 'Receiving':
                    dataSet = dataSet.filter((x) => {
                        return x.Stats.Targets > 0;
                    });
                    break;
                case 'Defense':
                    dataSet = dataSet.filter((x) =>
                        ['ILB', 'OLB', 'DT', 'DE', 'CB', 'FS', 'SS'].includes(
                            x.Position
                        )
                    );
                    break;
                case 'OLine':
                    dataSet = dataSet.filter((x) => {
                        return x.Stats.Pancakes > 0 || x.Stats.SacksAllowed > 0;
                    });
                    break;

                default:
                    break;
            }
        }

        return dataSet;
    };

    const SelectStatType = (event) => {
        event.preventDefault();
        const choice = event.target.value;
        setStatType(() => choice);
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
                    <div className="modal-body">
                        <div
                            className="btn-group btn-group-lg"
                            role="group"
                            aria-label="CategoryOptions"
                        >
                            <StatsPageButton
                                statType={statType}
                                action={SelectStatType}
                                value="Passing"
                                label="Passing"
                            />
                            <StatsPageButton
                                statType={statType}
                                action={SelectStatType}
                                value="Rushing"
                                label="Rushing"
                            />
                            <StatsPageButton
                                statType={statType}
                                action={SelectStatType}
                                value="Receiving"
                                label="Receiving"
                            />
                            <StatsPageButton
                                statType={statType}
                                action={SelectStatType}
                                value="Defense"
                                label="Defense"
                            />
                            <StatsPageButton
                                statType={statType}
                                action={SelectStatType}
                                value="Kicking"
                                label="Kicking"
                            />
                            <StatsPageButton
                                statType={statType}
                                action={SelectStatType}
                                value="OLine"
                                label="Offensive Line"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
