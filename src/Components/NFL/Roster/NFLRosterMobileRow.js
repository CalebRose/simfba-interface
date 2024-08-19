import React from 'react';
import { GetMobileCardClass } from '../../../Constants/CSSClassHelper';
import { baseUrl } from '../../../Constants/logos';
import { GetNFLOverall } from '../../../_Utility/RosterHelper';
import { HeightToFeetAndInches } from '../../../_Utility/utilHelper';
import { CutPlayerModal } from './CutPlayerModal';
import { ExtendPlayerModal } from './ExtendPlayerModal';
import { PracticeSquadModal } from './OnPracticeSquadModal';
import { TradeBlockModal } from './OnTradeBlockModal';

const NFLMobileRosterRow = ({
    player,
    idx,
    userView,
    ts,
    canModify,
    theme,
    team,
    psCount,
    practicesquad,
    tradeblock,
    extend,
    retro,
    tagPlayer,
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
    const contract = player.Contract;
    const cutPlayerTitle = `Cut ${player.FirstName}`;
    const extendPlayerTitle = `Extend ${player.FirstName}`;
    const tradeBlockTitle = `Place ${player.FirstName} on the Trade Block.`;
    const practiceSquadTitle = `Place ${player.FirstName} on the Practice Squad`;

    const canCutOrPracticeSquad = userView && canModify;
    const canExtendPlayer =
        (ts.NFLWeek >= 15 || ts.NFLWeek === 0) && userView && canModify;
    const canTradeBlockPlayer = ts.NFLWeek <= 9 && userView && canModify;
    const mobileCardClass = GetMobileCardClass(theme);
    const injuryReservePlayer = () => {
        return ir(player);
    };
    const { Contract, Extensions } = player;

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
                viewMode={theme}
            />
            <ExtendPlayerModal
                key={player.ID}
                player={player}
                idx={idx}
                team={team}
                extend={extend}
                viewMode={theme}
            />
            <TradeBlockModal
                key={player.ID}
                player={player}
                idx={idx}
                tradeblock={tradeblock}
                viewMode={theme}
            />
            <PracticeSquadModal
                key={player.ID}
                player={player}
                idx={idx}
                practicesquad={practicesquad}
                viewMode={theme}
            />
            <div className={`${mobileCardClass} mb-2`}>
                <div className="card-body">
                    <h5 className="card-title">
                        {player.FirstName} {player.LastName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {year === 'R' ? 'Rookie' : `${year} Year`}{' '}
                        {player.Archetype} {player.Position} from{' '}
                        {player.Hometown}, {player.State}
                    </h6>
                    <p className="card-text">
                        {heightObj.feet}' {heightObj.inches}", {player.Weight}{' '}
                        lbs
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Overall: {ovr}, Potential: {player.PotentialGrade}
                    </li>
                    <li className="list-group-item">
                        <button
                            type="button"
                            className="btn btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={modalTarget}
                        >
                            <i
                                className={`bi bi-info-circle ${
                                    theme === 'dark' ? 'text-light' : ''
                                }`}
                            />{' '}
                            Info
                        </button>
                    </li>
                    <li className="list-group-item">
                        Place {player.LastName} on IR
                        <button
                            type="button"
                            className={`btn ${
                                player.InjuryReserve && 'btn-danger'
                            }`}
                            title="Place player on IR"
                            onClick={injuryReservePlayer}
                            disabled={
                                (!player.IsInjured && !player.InjuryReserve) ||
                                !userView ||
                                !canModify
                            }
                        >
                            <i class="bi bi-bandaid" />
                        </button>
                    </li>
                    <li className="list-group-item">
                        Cut {player.LastName} |{' '}
                        {canCutOrPracticeSquad ? (
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
                            'Unavailable'
                        )}
                    </li>
                    <li className="list-group-item">
                        Extend {player.LastName}'s Contract |{' '}
                        {canExtendPlayer ? (
                            <button
                                type="button"
                                className="btn"
                                title={extendPlayerTitle}
                                data-bs-toggle="modal"
                                data-bs-target={extendPlayerTarget}
                                disabled={
                                    !(
                                        ts.NFLWeek >= 15 &&
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
                                <i class="bi bi-currency-dollar" />
                            </button>
                        ) : (
                            'Unavailable'
                        )}
                    </li>
                    <li className="list-group-item">
                        Tag {player.LastName} |
                        {canExtendPlayer ? (
                            <button
                                className={`btn ${
                                    player.IsTagged ? 'btn-success' : ''
                                }`}
                                title="Tag Player"
                                data-bs-toggle="modal"
                                data-bs-target="tagPlayer"
                                disabled={
                                    !(
                                        ts.NFLWeek >= 15 &&
                                        userView &&
                                        canModify &&
                                        !player.IsPracticeSquad
                                    ) ||
                                    player.IsTagged ||
                                    Contract.ContractLength > 1 ||
                                    player.IsPracticeSquad ||
                                    acceptedExtensionBool
                                }
                                onClick={() => tagPlayer(() => player)}
                            >
                                <i class="bi bi-tag-fill" />
                            </button>
                        ) : (
                            'Unavailable'
                        )}
                    </li>
                    <li className="list-group-item">
                        Place {player.LastName} on Trade Block |{' '}
                        {canTradeBlockPlayer ? (
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
                    </li>
                    <li className="list-group-item">
                        Place {player.LastName} on PS |{' '}
                        {canCutOrPracticeSquad &&
                        psCount <= 16 &&
                        player.Experience <= 3 ? (
                            <button
                                type="button"
                                className={`btn ${
                                    player.IsPracticeSquad ? 'btn-warning' : ''
                                }`}
                                title={practiceSquadTitle}
                                data-bs-toggle="modal"
                                data-bs-target={practiceSquadTarget}
                                disabled={player.Experience > 3}
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
                                    player.IsPracticeSquad ? 'btn-warning' : ''
                                }`}
                                title={practiceSquadTitle}
                                onClick={bringUpPlayer}
                                disabled={player.Experience > 3}
                            >
                                {player.IsPracticeSquad ? (
                                    <i class="bi bi-person-fill-up" />
                                ) : (
                                    <i class="bi bi-person-fill-down" />
                                )}
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default NFLMobileRosterRow;
