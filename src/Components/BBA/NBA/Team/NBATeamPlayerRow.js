import React from 'react';
import { CutPlayerModal } from '../../../NFL/Roster/CutPlayerModal';
import { ExtendNBAPlayerModal } from '../../../NFL/Roster/ExtendPlayerModal';
import { TradeBlockModal } from '../../../NFL/Roster/OnTradeBlockModal';
import { GLeagueModal, PlayerModal, TwoWayModal } from './NBATeamModals';
import { GetNFLRound } from '../../../../_Utility/RosterHelper';

const MobileRow = ({ data }) => {
    const {
        modalTarget,
        theme,
        player,
        Contract,
        draftLabel,
        awardStatus,
        cutPlayerTitle,
        ts,
        userView,
        canModify,
        extensionStatus,
        cutPlayerTarget,
        extendPlayerTitle,
        extendPlayerTarget,
        healthStatus,
        gLeagueTarget,
        gLeagueCount,
        twoWayCount,
        twoWayTarget,
        tradeBlockTarget,
        tradeBlockTitle
    } = data;
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">
                    {player.FirstName} {player.LastName}{' '}
                </h5>
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
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    {player.Age} year old {player.Position} from{' '}
                    {player.Country !== 'USA' ? player.Country : player.State}
                </h6>
                <p className="card-text">Overall: {player.Overall}</p>
                <p className="card-text">
                    {(Contract && Contract.YearsRemaining) || 0} Years Remaining
                    on Contract
                </p>
                <p className="card-text">{draftLabel}</p>
                <p className="card-text">{awardStatus}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    2pt Shooting: {player.Shooting2Grade} | 3pt Shooting:{' '}
                    {player.Shooting3}
                </li>
                <li className="list-group-item">
                    Finishing: {player.Finishing} | Free Throw:{' '}
                    {player.FreeThrow}
                </li>
                <li className="list-group-item">
                    Rebounding: {player.Rebounding} | Ballwork:{' '}
                    {player.Ballwork}
                </li>
                <li className="list-group-item">
                    Int. Defense: {player.InteriorDefense} | Per. Defense:{' '}
                    {player.PerimeterDefense}
                </li>
                <li className="list-group-item">
                    Potential: {player.PotentialGrade} | Stamina:{' '}
                    {player.Stamina}
                </li>
                <li className="list-group-item">
                    Min.Expectations: {player.PlaytimeExpectations} | Health:{' '}
                    {healthStatus}
                </li>
            </ul>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <p
                        className={`align-middle ${
                            Contract && Contract.Year1Opt ? 'text-warning' : ''
                        }`}
                    >
                        Year 1: ${(Contract && Contract.Year1Total) || 0}
                    </p>
                </li>
                {(Contract.Year2Total > 0 || Contract.Year2Opt) && (
                    <li className="list-group-item">
                        <p
                            className={`align-middle ${
                                Contract && Contract.Year2Opt
                                    ? 'text-warning'
                                    : ''
                            }`}
                        >
                            Year 2: ${(Contract && Contract.Year2Total) || 0}
                        </p>
                    </li>
                )}
                {(Contract.Year3Total > 0 || Contract.Year3Opt) && (
                    <li className="list-group-item">
                        <p
                            className={`align-middle ${
                                Contract && Contract.Year3Opt
                                    ? 'text-warning'
                                    : ''
                            }`}
                        >
                            Year 3: ${(Contract && Contract.Year3Total) || 0}
                        </p>
                    </li>
                )}
                {(Contract.Year4Total > 0 || Contract.Year4Opt) && (
                    <li className="list-group-item">
                        <p
                            className={`align-middle ${
                                Contract && Contract.Year4Opt
                                    ? 'text-warning'
                                    : ''
                            }`}
                        >
                            Year 4: ${(Contract && Contract.Year4Total) || 0}
                        </p>
                    </li>
                )}
                {(Contract.Year5Total > 0 || Contract.Year5Opt) && (
                    <li className="list-group-item">
                        <p
                            className={`align-middle ${
                                Contract && Contract.Year5Opt
                                    ? 'text-warning'
                                    : ''
                            }`}
                        >
                            Year 5: ${(Contract && Contract.Year5Total) || 0}
                        </p>
                    </li>
                )}
            </ul>
            <div className="card-body">
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
                            className={`btn ${extensionStatus}`}
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
                            className={`btn ${extensionStatus}`}
                            title={extendPlayerTitle}
                            disabled
                        >
                            <i className="bi bi-currency-dollar" />
                        </button>
                    )}
                    {(ts.NBAWeek <= 10 || ts.NBASeasonOver) &&
                    userView &&
                    canModify ? (
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
            </div>
        </div>
    );
};

const DesktopRow = ({ data }) => {
    const {
        modalTarget,
        player,
        Contract,
        draftLabel,
        awardStatus,
        cutPlayerTitle,
        ts,
        userView,
        canModify,
        extensionStatus,
        cutPlayerTarget,
        extendPlayerTitle,
        extendPlayerTarget,
        healthStatus,
        gLeagueTarget,
        gLeagueCount,
        twoWayCount,
        twoWayTarget,
        tradeBlockTarget,
        tradeBlockTitle,
        theme
    } = data;
    return (
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
            <td className="align-middle">{player.PotentialGrade}</td>
            <td className="align-middle">{healthStatus}</td>
            <td className="align-middle">{player.Stamina}</td>
            <td className="align-middle">{player.PlaytimeExpectations}</td>
            <td className="align-middle">{draftLabel}</td>
            <td className="align-middle">{awardStatus}</td>
            <td className="align-middle">
                {(Contract && Contract.YearsRemaining) || 0}
            </td>
            <td
                className={`align-middle ${
                    Contract && Contract.Year1Opt ? 'text-warning' : ''
                }`}
            >
                {(Contract && Contract.Year1Total) || 0}
            </td>
            <td
                className={`align-middle ${
                    Contract && Contract.Year2Opt ? 'text-warning' : ''
                }`}
            >
                {(Contract && Contract.Year2Total) || 0}
            </td>
            <td
                className={`align-middle ${
                    Contract && Contract.Year3Opt ? 'text-warning' : ''
                }`}
            >
                {(Contract && Contract.Year3Total) || 0}
            </td>
            <td
                className={`align-middle ${
                    Contract && Contract.Year4Opt ? 'text-warning' : ''
                }`}
            >
                {(Contract && Contract.Year4Total) || 0}
            </td>
            <td
                className={`align-middle ${
                    Contract && Contract.Year5Opt ? 'text-warning' : ''
                }`}
            >
                {(Contract && Contract.Year5Total) || 0}
            </td>
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
                            className={`btn ${extensionStatus}`}
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
                            className={`btn ${extensionStatus}`}
                            title={extendPlayerTitle}
                            disabled
                        >
                            <i className="bi bi-currency-dollar" />
                        </button>
                    )}
                    {(ts.NBAWeek <= 10 || ts.NBASeasonOver) &&
                    userView &&
                    canModify ? (
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
    );
};

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
    isMobile,
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
    const { Contract, Extensions, DraftedRound } = player;
    // Row Variables
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
    let awardStatus = 'None';
    if (player.IsFirstTeamANBA) awardStatus = '1st Team All-SimNBA';
    else if (player.IsDPOY) awardStatus = 'Defensive Player of the Year';
    else if (player.IsMVP) awardStatus = 'MVP';
    const draftedRound = GetNFLRound(DraftedRound);
    const draftLabel =
        DraftedRound > 0 ? `${draftedRound} - ${player.DraftPick}` : 'UDFA';
    let healthStatus = 'Healthy';
    if (player.IsInjured) {
        healthStatus = `${player.InjuryType} ${player.InjuryName}, ${player.WeeksOfRecovery} Games`;
    }
    const data = {
        modalTarget,
        player,
        Contract,
        draftLabel,
        awardStatus,
        cutPlayerTitle,
        ts,
        userView,
        canModify,
        extensionStatus,
        extendPlayerTitle,
        extendPlayerTarget,
        cutPlayerTarget,
        healthStatus,
        gLeagueTarget,
        gLeagueCount,
        twoWayCount,
        twoWayTarget,
        tradeBlockTarget,
        tradeBlockTitle,
        theme
    };
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
            {isMobile ? <MobileRow data={data} /> : <DesktopRow data={data} />}
        </>
    );
};

export default NBATeamPlayerRow;
