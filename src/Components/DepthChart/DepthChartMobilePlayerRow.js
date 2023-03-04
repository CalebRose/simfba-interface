import React from 'react';
import AttributeAverages from '../../Constants/AttributeAverages';
import { GetMobileCardClass } from '../../Constants/CSSClassHelper';
import {
    GetLetterGrade,
    GetNFLYear,
    GetOverall,
    GetYear
} from '../../_Utility/RosterHelper';
import { GetPosition } from './DepthChartHelper';
import PlayerDropdownItem from './PlayerDropdownItem';

const DepthChartMobilePlayerRow = ({
    player,
    availablePlayers,
    positionAttributes,
    swapPlayer,
    canModify,
    isCFB,
    theme
}) => {
    const playerData = isCFB ? player.CollegePlayer : player.NFLPlayer;
    const name = player.FirstName + ' ' + player.LastName;
    const PositionLabel =
        player.OriginalPosition.length > 0 &&
        player.OriginalPosition !== player.Position
            ? player.Position + ' (' + player.OriginalPosition + ')'
            : player.Position;
    const mobileClass = GetMobileCardClass(theme);
    const handleChange = (newPlayer) => {
        if (newPlayer.ID !== playerData.ID) {
            return swapPlayer(player, newPlayer);
        }
        return;
    };

    return (
        <div className={`${mobileClass} mb-2`}>
            <div className="card-body">
                {canModify ? (
                    <div className="drop-start btn-dropdown-width-dc mb-2">
                        <button
                            name="name"
                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-dc"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span>{name}</span>
                        </button>
                        <ul className="dropdown-menu dropdown-content">
                            <PlayerDropdownItem
                                name={name}
                                click={handleChange}
                                player={playerData}
                            />
                            <hr className="dropdown-divider"></hr>
                            {availablePlayers && availablePlayers.length > 0 ? (
                                availablePlayers.map((x) => {
                                    const id = x && x.ID ? x.ID : 0;

                                    return (
                                        <PlayerDropdownItem
                                            key={id}
                                            name={
                                                x.FirstName + ' ' + x.LastName
                                            }
                                            player={x}
                                            id={id}
                                            click={handleChange}
                                        />
                                    );
                                })
                            ) : (
                                <h5 className="card-title">{name}</h5>
                            )}
                        </ul>
                        <div />
                    </div>
                ) : (
                    <h5 className="card-title mb-2">{name}</h5>
                )}
                <h6 className="card-subtitle mb-2">
                    {PositionLabel} {player.PositionLevel}
                </h6>
            </div>
            <ul className="list-group list-group-flush">
                {positionAttributes &&
                    positionAttributes.length > 0 &&
                    positionAttributes.map((x, idx) => {
                        if (!playerData) return '';
                        const label = idx > 5 ? x.attr : x.label;
                        const mobileLabel = label
                            .replace(/([A-Z])/g, ' $1')
                            .trim();
                        let attr = '';
                        let pos = GetPosition(
                            player.Position,
                            playerData.Position
                        );
                        if (idx > 2) {
                            if (label === 'Archetype') {
                                attr = playerData[label];
                            } else if (label === 'Overall') {
                                if (isCFB || playerData.Experience < 2) {
                                    attr = GetOverall(
                                        playerData.Overall,
                                        playerData.Year
                                    );
                                } else {
                                    attr = playerData.Overall;
                                }
                            } else if (label === 'Year') {
                                attr = isCFB
                                    ? GetYear(playerData)
                                    : GetNFLYear(playerData);
                            } else if (label === 'PotentialGrade') {
                                attr = playerData.PotentialGrade;
                            } else {
                                let val = playerData[label];
                                // May want to go off of the original position values
                                const average = AttributeAverages[label][pos];
                                if (isCFB || playerData.Experience < 2) {
                                    attr = GetLetterGrade(
                                        average,
                                        val,
                                        playerData.Year
                                    );
                                } else {
                                    attr = val;
                                }
                            }
                            return (
                                <li className="list-group-item">
                                    {mobileLabel}: {attr}
                                </li>
                            );
                        }
                        return '';
                    })}
            </ul>
        </div>
    );
};

export default DepthChartMobilePlayerRow;
