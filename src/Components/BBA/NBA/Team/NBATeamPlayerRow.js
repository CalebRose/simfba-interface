import React from 'react';
import { CutPlayerModal } from '../../../NFL/Roster/CutPlayerModal';
import { ExtendNBAPlayerModal } from '../../../NFL/Roster/ExtendPlayerModal';
import { TradeBlockModal } from '../../../NFL/Roster/OnTradeBlockModal';
import { GLeagueModal, PlayerModal, TwoWayModal } from './NBATeamModals';

const NBATeamPlayerRow = ({
    player,
    idx,
    ts,
    view,
    theme,
    setToGLeague,
    setToTwoWay,
    cut,
    extend,
    cancel,
    tradeblock,
    team,
    twoWayCount,
    gLeagueCount,
    activateOption,
    retro
}) => {
    let modalTarget = `#playerModal${idx}`;
    let tradeBlockTarget = `#tradeBlock${idx}`;
    let extendPlayerTarget = `#extendPlayer${idx}`;
    let gLeagueTarget = `#gLeague${idx}`;
    let twoWayTarget = `#twoWay${idx}`;
    let cutPlayerTarget = `#cutPlayer${idx}`;
    const canModify = view;
    const userView = view;
    const cutPlayerTitle = `Cut ${player.FirstName}`;
    const extendPlayerTitle = `Extend ${player.FirstName}`;
    const tradeBlockTitle = `Place ${player.FirstName} on the Trade Block.`;
    // Row Functions
    const aav = player.Contract.TotalRemaining / player.Contract.YearsRemaining;
    const { Contract } = player;
    // Row Variables

    return (
        <>
            <PlayerModal
                key={player.ID}
                player={player}
                viewMode={theme}
                team={team}
                idx={idx}
                retro={retro}
            />
            <CutPlayerModal
                key={player.ID}
                player={player}
                idx={idx}
                cut={cut}
                viewMode={theme}
            />
            <ExtendNBAPlayerModal
                key={player.ID}
                player={player}
                idx={idx}
                extend={extend}
                viewMode={theme}
                team={team}
                cancel={cancel}
                ts={ts}
                activateOption={activateOption}
            />
            <TradeBlockModal
                key={player.ID}
                player={player}
                idx={idx}
                tradeblock={tradeblock}
                viewMode={theme}
            />
            <GLeagueModal
                key={player.ID}
                player={player}
                idx={idx}
                setToGLeague={setToGLeague}
                viewMode={theme}
            />
            <TwoWayModal
                key={player.ID}
                player={player}
                idx={idx}
                setToTwoWay={setToTwoWay}
                viewMode={theme}
            />
            <tr>
                <th scope="row" className="align-middle">
                    <h6>
                        {player.Position} {player.FirstName} {player.LastName}
                    </h6>
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
                        />
                    </button>
                </th>
                <td className="align-middle">
                    {player.Age} | {player.Year}
                </td>
                <td className="align-middle">{player.Overall}</td>
                <td className="align-middle">{player.Finishing}</td>
                <td className="align-middle">{player.Shooting2}</td>
                <td className="align-middle">{player.Shooting3}</td>
                <td className="align-middle">{player.FreeThrow}</td>
                <td className="align-middle">{player.Ballwork}</td>
                <td className="align-middle">{player.Rebounding}</td>
                <td className="align-middle">{player.InteriorDefense}</td>
                <td className="align-middle">{player.PerimeterDefense}</td>
                <td className="align-middle">{player.Stamina}</td>
                <td className="align-middle">{player.PotentialGrade}</td>
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
                                <i className="bi bi-scissors" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                title={cutPlayerTitle}
                                disabled
                            >
                                <i className="bi bi-scissors" />
                            </button>
                        )}

                        {(ts.NBAWeek >= 15 || ts.NBAWeek === 0) &&
                        userView &&
                        canModify ? (
                            <button
                                type="button"
                                className="btn"
                                title={extendPlayerTitle}
                                data-bs-toggle="modal"
                                data-bs-target={extendPlayerTarget}
                                disabled={
                                    Contract.YearsRemaining > 1 &&
                                    !Contract.Year2Opt
                                }
                            >
                                <i className="bi bi-currency-dollar" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                title={extendPlayerTitle}
                                disabled
                            >
                                <i className="bi bi-currency-dollar" />
                            </button>
                        )}
                        {ts.NBAWeek <= 10 && userView && canModify ? (
                            <button
                                type="button"
                                className={`btn ${
                                    player.IsOnTradeBlock ? 'btn-danger' : ''
                                }`}
                                title={tradeBlockTitle}
                                data-bs-toggle="modal"
                                data-bs-target={tradeBlockTarget}
                            >
                                <i className="bi bi-arrow-down-up" />
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
                                <i className="bi bi-arrow-down-up" />
                            </button>
                        )}
                        {userView &&
                        canModify &&
                        player.Year <= 3 &&
                        player.Contract.YearsRemaining <= 2 &&
                        player.Contract.Year1Total <= 2 ? (
                            <button
                                type="button"
                                className={`btn ${
                                    player.IsGLeague ? 'btn-warning' : ''
                                }`}
                                title="G-League"
                                data-bs-toggle="modal"
                                data-bs-target={gLeagueTarget}
                                disabled={gLeagueCount > 9 && !player.IsGLeague}
                            >
                                <i className="bi bi-person-fill-lock" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className={`btn ${
                                    player.IsGLeague
                                        ? 'btn-warning'
                                        : 'btn-secondary'
                                }`}
                                title="G-League"
                                disabled
                            >
                                <i className="bi bi-person-fill-lock" />
                            </button>
                        )}
                        {userView && canModify ? (
                            <button
                                type="button"
                                className={`btn ${
                                    player.IsTwoWay ? 'btn-warning' : ''
                                }`}
                                title="Two-Way"
                                data-bs-toggle="modal"
                                data-bs-target={twoWayTarget}
                                disabled={twoWayCount > 1 && !player.IsTwoWay}
                            >
                                {player.IsTwoWay ? (
                                    <i className="bi bi-person-fill-up" />
                                ) : (
                                    <i className="bi bi-person-fill-down" />
                                )}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                title="Two-Way"
                                disabled
                            >
                                {player.IsTwoWay ? (
                                    <i className="bi bi-person-fill-up" />
                                ) : (
                                    <i className="bi bi-person-fill-down" />
                                )}
                            </button>
                        )}
                    </div>
                </td>
            </tr>
        </>
    );
};

export default NBATeamPlayerRow;
