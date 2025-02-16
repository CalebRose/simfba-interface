import React, { useEffect, useRef, useState } from 'react';
import AttributeAverages from '../../Constants/AttributeAverages';
import {
    GetLetterGrade,
    GetNFLLetterGrade,
    GetNFLOverall,
    GetNFLYear,
    GetOverall,
    GetYear
} from '../../_Utility/RosterHelper';
import { GetPosition, GetShotgunRating } from './DepthChartHelper';
import PlayerDropdownItem from './PlayerDropdownItem';

const DepthChartPlayerRow = (props) => {
    const {
        player,
        availablePlayers,
        positionAttributes,
        swapPlayer,
        canModify,
        isCFB
    } = props;
    const playerData = isCFB ? player.CollegePlayer : player.NFLPlayer;
    const dropdownButtonRef = useRef(null);
    const dropdownInstance = useRef(null);
    const name = player.FirstName + ' ' + player.LastName;
    const PositionLabel =
        player.OriginalPosition.length > 0 &&
        player.OriginalPosition !== player.Position &&
        player.OriginalPosition !== playerData.PositionTwo
            ? `${playerData.Position}${
                  playerData.PositionTwo.length > 0
                      ? `/${playerData.PositionTwo}`
                      : ''
              } (${player.OriginalPosition})`
            : player.Position;
    const playerLabel = playerData.IsInjured
        ? `${name} | ${playerData.Position}${
              playerData.PositionTwo.length > 0
                  ? `/${playerData.PositionTwo}`
                  : ''
          } (${playerData.WeeksOfRecovery})`
        : `${name} | ${playerData.Position}${
              playerData.PositionTwo.length > 0
                  ? `/${playerData.PositionTwo}`
                  : ''
          }`;

    const handleChange = (newPlayer) => {
        if (newPlayer.ID !== playerData.ID) {
            swapPlayer(player, newPlayer);
            dropdownInstance.current.hide(); // Close dropdown after swap
        }
    };

    useEffect(() => {
        if (dropdownButtonRef.current) {
            dropdownInstance.current = new window.bootstrap.Dropdown(
                dropdownButtonRef.current
            );
        }
    }, []); // Reinitialize Bootstrap dropdown on state change

    return (
        <tr>
            {canModify ? (
                <th className="drop-start btn-dropdown-width-dc">
                    <button
                        ref={dropdownButtonRef}
                        type="button"
                        name="name"
                        className={`btn btn-secondary dropdown-toggle btn-dropdown-width-dc ${
                            playerData.IsInjured && 'text-warning'
                        }`}
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                    >
                        <span>{playerLabel}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-content">
                        <PlayerDropdownItem
                            name={name}
                            click={handleChange}
                            player={playerData}
                        />
                        <hr className="dropdown-divider"></hr>
                        {availablePlayers &&
                            availablePlayers.length > 0 &&
                            availablePlayers.map((x) => {
                                const id = x && x.ID ? x.ID : 0;
                                return (
                                    <PlayerDropdownItem
                                        key={id}
                                        name={x.FirstName + ' ' + x.LastName}
                                        player={x}
                                        id={id}
                                        click={handleChange}
                                    />
                                );
                            })}
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
                    if (!playerData) return '';
                    const label =
                        idx > 5 && x.label !== 'Shotgun Rating'
                            ? x.attr
                            : x.label;
                    let attr = '';
                    let pos = GetPosition(player.Position, playerData.Position);
                    if (idx > 2) {
                        if (label === 'Archetype') {
                            attr = playerData[label];
                        } else if (label === 'Overall') {
                            if (isCFB) {
                                attr = GetOverall(
                                    playerData.Overall,
                                    playerData.Year
                                );
                            } else {
                                if (playerData.ShowLetterGrade) {
                                    attr = GetNFLOverall(
                                        playerData.Overall,
                                        playerData.ShowLetterGrade
                                    );
                                } else {
                                    attr = playerData.Overall;
                                }
                            }
                        } else if (label === 'Year') {
                            attr = isCFB
                                ? GetYear(playerData)
                                : GetNFLYear(playerData);
                        } else if (label === 'PotentialGrade') {
                            attr = playerData.PotentialGrade;
                        } else if (label === 'Shotgun Rating') {
                            attr = GetShotgunRating(playerData.Shotgun);
                        } else {
                            let val = playerData[label];
                            // May want to go off of the original position values
                            const average = AttributeAverages[label][pos];
                            // If player is either in college or is a rookie, show letter attribute
                            if (isCFB) {
                                attr = GetLetterGrade(
                                    average,
                                    val,
                                    playerData.Year
                                );
                            } else {
                                if (playerData.ShowLetterGrade) {
                                    attr = GetLetterGrade(
                                        average,
                                        val,
                                        playerData.Experience
                                    );
                                } else {
                                    attr = val;
                                }
                            }
                        }
                        return <td>{attr}</td>;
                    }
                    return '';
                })}
        </tr>
    );
};

export default DepthChartPlayerRow;
