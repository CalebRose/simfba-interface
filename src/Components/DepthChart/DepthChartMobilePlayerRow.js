import React from 'react';
import AttributeAverages from '../../Constants/AttributeAverages';
import {
    GetLetterGrade,
    GetOverall,
    GetYear
} from '../../_Utility/RosterHelper';
import { GetPosition } from './DepthChartHelper';
import PlayerDropdownItem from './PlayerDropdownItem';

const DepthChartMobilePlayerRow = (props) => {
    const {
        player,
        availablePlayers,
        positionAttributes,
        swapPlayer,
        canModify
    } = props;
    const playerData = player.CollegePlayer;
    const name = player.FirstName + ' ' + player.LastName;
    const PositionLabel =
        player.OriginalPosition.length > 0 &&
        player.OriginalPosition !== player.Position
            ? player.Position + ' (' + player.OriginalPosition + ')'
            : player.Position;

    const handleChange = (newPlayer) => {
        if (newPlayer.ID !== playerData.ID) {
            return swapPlayer(player, newPlayer);
        }
        return;
    };

    return (
        <div className="card mb-2">
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
                                availablePlayers.map((x) => (
                                    <PlayerDropdownItem
                                        key={x.ID}
                                        name={x.FirstName + ' ' + x.LastName}
                                        player={x}
                                        id={x.ID}
                                        click={handleChange}
                                    />
                                ))
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
                                attr = GetOverall(
                                    playerData.Overall,
                                    playerData.Year
                                );
                            } else if (label === 'Year') {
                                attr = GetYear(playerData);
                            } else if (label === 'PotentialGrade') {
                                attr = playerData.PotentialGrade;
                            } else {
                                let val = playerData[label];
                                // May want to go off of the original position values
                                const average = AttributeAverages[label][pos];
                                attr = GetLetterGrade(
                                    average,
                                    val,
                                    playerData.Year
                                );
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
