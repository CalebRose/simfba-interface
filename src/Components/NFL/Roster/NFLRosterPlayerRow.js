import React from 'react';
import { GetNFLOverall } from '../../../_Utility/RosterHelper';
import { HeightToFeetAndInches } from '../../../_Utility/utilHelper';
import { CutPlayerModal } from './CutPlayerModal';
import { ExtendPlayerModal } from './ExtendPlayerModal';
import { NFLPlayerModal } from './NFLPlayerModal';
import { PracticeSquadModal } from './OnPracticeSquadModal';
import { TradeBlockModal } from './OnTradeBlockModal';
import { ButtonWithIcon } from '../../_Common/Buttons';

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
    cancelExtension,
    retro,
    ir,
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
    const { Contract, Extensions } = player;
    const cutPlayerTitle = `Cut ${player.FirstName}`;
    const extendPlayerTitle = `Extend ${player.FirstName}`;
    const tradeBlockTitle = `Place ${player.FirstName} on the Trade Block.`;
    const practiceSquadTitle = `Place ${player.FirstName} on the Practice Squad`;
    const offeredExtensionIdx =
        Extensions && Extensions.findIndex((x) => x.IsActive === true);
    const acceptedExtensionIdx =
        Extensions && Extensions.findIndex((x) => x.IsAccepted === true);
    const offeredExtensionBool = Extensions && offeredExtensionIdx > -1;
    const acceptedExtensionBool = Extensions && acceptedExtensionIdx > -1;
    const offeredExtension =
        offeredExtensionBool && Extensions[offeredExtensionIdx];

    let extensionStatus = '';
    if (
        (offeredExtensionBool &&
            (offeredExtension.IsRejected || offeredExtension.Rejections > 2)) ||
        player.Rejections > 2
    ) {
        extensionStatus = 'btn-danger';
    } else if (
        (offeredExtensionBool && offeredExtension.Rejections > 0) ||
        player.Rejections > 0
    ) {
        extensionStatus = 'btn-warning';
    } else if (offeredExtensionBool) {
        extensionStatus = 'btn-info';
    }
    if (acceptedExtensionBool) {
        extensionStatus = 'btn-success';
    }

    const injuryReservePlayer = () => {
        return ir(player);
    };

    const bringUpPlayer = () => {
        return practicesquad(player);
    };

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
                cancel={cancelExtension}
                team={team}
                ts={ts}
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
                retro={retro}
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
                <td label="Bonus">{Contract.Y1Bonus}</td>
                <td label="Salary">{Contract.Y1BaseSalary}</td>
                <td label="YearsRemaining">{Contract.ContractLength}</td>
                <td>
                    <div className="btn-group btn-border">
                        <button
                            type="button"
                            className={`btn`}
                            title={cutPlayerTitle}
                            disabled={!userView || !canModify}
                            data-bs-toggle="modal"
                            data-bs-target={cutPlayerTarget}
                        >
                            <i className={`bi bi-scissors`} />
                        </button>
                        <button
                            type="button"
                            className={`btn ${extensionStatus}`}
                            title={extendPlayerTitle}
                            data-bs-toggle="modal"
                            data-bs-target={extendPlayerTarget}
                            disabled={
                                !(
                                    (ts.NFLWeek >= 15 || ts.NFLWeek === 0) &&
                                    userView &&
                                    canModify &&
                                    !player.IsPracticeSquad
                                ) ||
                                Contract.ContractLength > 1 ||
                                player.IsPracticeSquad ||
                                player.Rejections > 2 ||
                                acceptedExtensionBool
                            }
                        >
                            <i className="bi bi-currency-dollar" />
                        </button>
                        <button
                            type="button"
                            className={`btn ${
                                player.InjuryReserve && 'btn-danger'
                            }`}
                            title="Place player on IR"
                            onClick={injuryReservePlayer}
                            disabled={!player.IsInjured}
                        >
                            <i class="bi bi-bandaid" />
                        </button>
                        <button
                            type="button"
                            className={`btn ${
                                player.IsOnTradeBlock && 'btn-danger'
                            }`}
                            title={tradeBlockTitle}
                            data-bs-toggle="modal"
                            data-bs-target={tradeBlockTarget}
                            disabled={
                                !(ts.NFLWeek <= 9 && userView && canModify)
                            }
                        >
                            <i className="bi bi-arrow-down-up" />
                        </button>
                        {userView &&
                        canModify &&
                        psCount <= 16 &&
                        player.Experience <= 3 ? (
                            <button
                                type="button"
                                className={`btn ${
                                    player.IsPracticeSquad
                                        ? 'btn-warning'
                                        : 'btn-secondary'
                                }`}
                                title={practiceSquadTitle}
                                data-bs-toggle="modal"
                                data-bs-target={practiceSquadTarget}
                            >
                                <i
                                    className={`bi ${
                                        player.IsPracticeSquad ||
                                        player.IsOnPracticeSquad
                                            ? 'bi-person-fill-up'
                                            : 'bi-person-fill-down'
                                    }`}
                                />
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
                                onClick={bringUpPlayer}
                            >
                                <i
                                    className={`bi ${
                                        player.IsPracticeSquad ||
                                        player.IsOnPracticeSquad
                                            ? 'bi-person-fill-up'
                                            : 'bi-person-fill-down'
                                    }`}
                                />
                            </button>
                        )}
                    </div>
                </td>
            </tr>
        </>
    );
};
