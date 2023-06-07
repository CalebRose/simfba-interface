import React from 'react';
import { GetNFLOverall } from '../../../_Utility/RosterHelper';
import { HeightToFeetAndInches } from '../../../_Utility/utilHelper';
import { CutPlayerModal } from './CutPlayerModal';
import { ExtendPlayerModal } from './ExtendPlayerModal';
import { NFLPlayerModal } from './NFLPlayerModal';
import { PracticeSquadModal } from './OnPracticeSquadModal';
import { TradeBlockModal } from './OnTradeBlockModal';

export const NFLRosterPlayerRow = ({
    player,
    idx,
    userView,
    ts,
    canModify,
    team,
    psCount,
    viewMode,
    practicesquad,
    tradeblock,
    extend,
    cut
}) => {
    let modalTarget = `#playerModal${idx}`;
    let cutPlayerTarget = `#cutPlayer${idx}`;
    let extendPlayerTarget = `#extendPlayer${idx}`;
    let tradeBlockTarget = `#tradeBlock${idx}`;
    let practiceSquadTarget = `#practiceSquad${idx}`;
    let ovr = GetNFLOverall(player.Overall, player.ShowLetterGrade);
    const year = player.Experience === 0 ? 'R' : player.Experience;
    const heightObj = HeightToFeetAndInches(player.Height);
    const contract = player.Contract;
    const cutPlayerTitle = `Cut ${player.FirstName}`;
    const extendPlayerTitle = `Extend ${player.FirstName}`;
    const tradeBlockTitle = `Place ${player.FirstName} on the Trade Block.`;
    const practiceSquadTitle = `Place ${player.FirstName} on the Practice Squad`;

    return (
        <>
            <CutPlayerModal
                key={player.ID}
                player={player}
                idx={idx}
                cut={cut}
                viewMode={viewMode}
            />
            <ExtendPlayerModal
                key={player.ID}
                player={player}
                idx={idx}
                extend={extend}
                viewMode={viewMode}
            />
            <TradeBlockModal
                key={player.ID}
                player={player}
                idx={idx}
                tradeblock={tradeblock}
                viewMode={viewMode}
            />
            <PracticeSquadModal
                key={player.ID}
                player={player}
                idx={idx}
                practicesquad={practicesquad}
                viewMode={viewMode}
            />
            <NFLPlayerModal
                key={player.ID}
                idx={idx}
                player={player}
                team={team}
                viewMode={viewMode}
            />
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
                <td label="YearsRemaining">{contract.ContractLength}</td>
                <td>
                    <div className="btn-group btn-border">
                        {userView && canModify ? (
                            <button
                                type="button"
                                className="btn"
                                title={cutPlayerTitle}
                                data-bs-toggle="modal"
                                data-bs-target={cutPlayerTarget}
                            >
                                <i class="bi bi-scissors" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                title={cutPlayerTitle}
                                disabled
                            >
                                <i class="bi bi-scissors" />
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
                                <i class="bi bi-currency-dollar" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                title={extendPlayerTitle}
                                disabled
                            >
                                <i class="bi bi-currency-dollar" />
                            </button>
                        )}
                        {ts.NFLWeek <= 9 && userView && canModify ? (
                            <button
                                type="button"
                                className={`btn ${
                                    player.IsOnTradeBlock ? 'btn-danger' : ''
                                }`}
                                title={tradeBlockTitle}
                                data-bs-toggle="modal"
                                data-bs-target={tradeBlockTarget}
                            >
                                <i class="bi bi-arrow-down-up" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={`btn ${
                                    player.IsOnTradeBlock
                                        ? 'btn-danger'
                                        : 'btn-secondary'
                                }`}
                                title={tradeBlockTitle}
                                disabled
                            >
                                <i class="bi bi-arrow-down-up" />
                            </button>
                        )}
                        {userView &&
                        canModify &&
                        (psCount <= 16 || player.IsPracticeSquad) &&
                        player.Experience <= 3 ? (
                            <button
                                type="button"
                                className={`btn ${
                                    player.IsPracticeSquad ? 'btn-warning' : ''
                                }`}
                                title={practiceSquadTitle}
                                data-bs-toggle="modal"
                                data-bs-target={practiceSquadTarget}
                            >
                                {player.IsPracticeSquad ? (
                                    <i class="bi bi-person-fill-up" />
                                ) : (
                                    <i class="bi bi-person-fill-down" />
                                )}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={`btn ${
                                    player.IsPracticeSquad
                                        ? 'btn-warning'
                                        : 'btn-secondary'
                                }`}
                                title={practiceSquadTitle}
                                disabled
                            >
                                {player.IsOnPracticeSquad ? (
                                    <i class="bi bi-person-fill-up" />
                                ) : (
                                    <i class="bi bi-person-fill-down" />
                                )}
                            </button>
                        )}
                    </div>
                </td>
            </tr>
        </>
    );
};
