import React from 'react';
import AttributeAverages from '../../Constants/AttributeAverages';
import {
    GetLetterGrade,
    GetOverall,
    GetYear
} from '../../_Utility/RosterHelper';
import { GetPosition } from './DepthChartHelper';
import PlayerDropdownItem from './PlayerDropdownItem';

const DepthChartPlayerRow = (props) => {
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
        <tr>
            {canModify ? (
                <th className="drop-start btn-dropdown-width-dc">
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
                        {availablePlayers && availablePlayers.length > 0
                            ? availablePlayers.map((x) => (
                                  <PlayerDropdownItem
                                      key={x.ID}
                                      name={x.FirstName + ' ' + x.LastName}
                                      player={x}
                                      id={x.ID}
                                      click={handleChange}
                                  />
                              ))
                            : ''}
                    </ul>
                </th>
            ) : (
                <th>{name}</th>
            )}

            <td>{PositionLabel}</td>
            <td>{player.PositionLevel}</td>
            {positionAttributes &&
                positionAttributes.length > 0 &&
                positionAttributes.map((x, idx) => {
                    const label = idx > 5 ? x.attr : x.label;
                    let attr = '';
                    let pos = GetPosition(player.Position, playerData.Position);
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
                        return <td>{attr}</td>;
                    }
                    return '';
                })}
        </tr>
    );
};

export default DepthChartPlayerRow;
