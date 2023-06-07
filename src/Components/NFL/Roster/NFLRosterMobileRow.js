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
                            >
                                <i class="bi bi-currency-dollar" />
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
                            'Unavailable'
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default NFLMobileRosterRow;
