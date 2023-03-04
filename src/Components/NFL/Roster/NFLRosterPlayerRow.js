import React from 'react';
import { baseUrl } from '../../../Constants/logos';
import { GetNFLOverall } from '../../../_Utility/RosterHelper';
import { HeightToFeetAndInches } from '../../../_Utility/utilHelper';

export const NFLRosterPlayerRow = ({
    player,
    idx,
    userView,
    ts,
    canModify,
    viewMode
}) => {
    let modalTarget = `#playerModal${idx}`;
    let cutPlayerTarget = `#cutPlayer${idx}`;
    let extendPlayerTarget = `#extendPlayer${idx}`;
    let tradeBlockTarget = `#tradeBlock${idx}`;
    let practiceSquadTarget = `#practiceSquad${idx}`;
    let ovr = GetNFLOverall(player.Overall, player.Experience);
    const year = player.Experience === 0 ? 'R' : player.Experience;
    const heightObj = HeightToFeetAndInches(player.Height);
    const contract = player.Contract;
    const cutPlayerTitle = `Cut ${player.FirstName}`;
    const extendPlayerTitle = `Extend ${player.FirstName}`;
    const tradeBlockTitle = `Place ${player.FirstName} on the Trade Block.`;
    const practiceSquadTitle = `Place ${player.FirstName} on the Practice Squad`;

    return (
        <tr>
            <th className="align-middle">
                {player.FirstName} {player.LastName}
                <button
                    type="button"
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={modalTarget}
                >
                    <i
                        className={`bi bi-info-circle ${
                            viewMode === 'dark' ? 'text-light' : ''
                        }`}
                    />
                </button>
            </th>
            <td label="Archtype">{player.Archetype}</td>
            <td label="Position">{player.Position}</td>
            <td label="Year">{year ? year : ''}</td>
            <td label="Overall">{ovr ? ovr : ''}</td>
            <td label="Height">
                {heightObj.feet}' {heightObj.inches}"
            </td>
            <td label="Weight">{player.Weight}</td>
            <td label="Bonus">{contract.Y1Bonus}</td>
            <td label="Salary">{contract.Y1BaseSalary}</td>
            <td>
                <div className="btn-group">
                    {userView && canModify ? (
                        <button
                            type="button"
                            className="btn"
                            title={cutPlayerTitle}
                            data-bs-toggle="modal"
                            data-bs-target={cutPlayerTarget}
                        >
                            <img
                                className="image-nfl-roster"
                                src={`${baseUrl}/icons/cut_player.png`}
                            />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            title={cutPlayerTitle}
                            disabled
                        >
                            <img
                                className="image-nfl-roster"
                                src={`${baseUrl}/icons/cut_player.png`}
                            />
                        </button>
                    )}

                    {(ts.NFLWeek >= 15 || ts.NFLWeek === 0) &&
                    userView &&
                    canModify ? (
                        <button
                            type="button"
                            className="btn"
                            title={extendPlayerTitle}
                            data-bs-toggle="modal"
                            data-bs-target={extendPlayerTarget}
                        >
                            <img
                                className="image-nfl-roster"
                                src={`${baseUrl}/icons/extend_contract.png`}
                            />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            title={extendPlayerTitle}
                            disabled
                        >
                            <img
                                className="image-nfl-roster"
                                src={`${baseUrl}/icons/extend_contract.png`}
                            />
                        </button>
                    )}
                    {ts.NFLWeek <= 9 && userView && canModify ? (
                        <button
                            type="button"
                            className="btn"
                            title={tradeBlockTitle}
                            data-bs-toggle="modal"
                            data-bs-target={tradeBlockTarget}
                        >
                            <img
                                className="image-nfl-roster"
                                src={`${baseUrl}/icons/trade_block.png`}
                            />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            title={tradeBlockTitle}
                            disabled
                        >
                            <img
                                className="image-nfl-roster"
                                src={`${baseUrl}/icons/trade_block.png`}
                            />
                        </button>
                    )}
                    {userView && canModify ? (
                        <button
                            type="button"
                            className="btn"
                            title={practiceSquadTitle}
                            data-bs-toggle="modal"
                            data-bs-target={practiceSquadTarget}
                        >
                            <img
                                className="image-nfl-roster"
                                src={`${baseUrl}/icons/practice_squad.png`}
                            />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            title={practiceSquadTitle}
                            disabled
                        >
                            <img
                                className="image-nfl-roster"
                                src={`${baseUrl}/icons/practice_squad.png`}
                            />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};
