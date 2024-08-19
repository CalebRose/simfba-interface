import React from 'react';
import { GetModalClass } from '../../../../Constants/CSSClassHelper';
import { getLogo } from '../../../../Constants/getLogo';
import { GetNFLRound } from '../../../../_Utility/RosterHelper';
import { RoundToTwoDecimals } from '../../../../_Utility/utilHelper';

export const GLeagueModal = ({ player, idx, setToGLeague, viewMode }) => {
    const modalId = `gLeague${idx}`;
    const modalClass = GetModalClass(viewMode);

    const confirmChange = () => {
        return setToGLeague(player);
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="cutPlayerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="redshirtModalLabel">
                            Place {player.FirstName} {player.LastName} in the
                            G-League
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-2 gy-2 mb-2">
                            WARNING: Once you've placed {player.FirstName}{' '}
                            {player.LastName} on the G-League roster and the
                            season starts, you cannot place them on your roster
                            for the remainder of the season. You can call up a
                            player; however, their contract will then be
                            calculated to your team's capsheet. Are you sure you
                            want to do this?
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            No
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={confirmChange}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TwoWayModal = ({ player, idx, setToTwoWay, viewMode }) => {
    const modalId = `twoWay${idx}`;
    const modalClass = GetModalClass(viewMode);

    const confirmChange = () => {
        return setToTwoWay(player);
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="cutPlayerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="redshirtModalLabel">
                            Place {player.FirstName} {player.LastName} in the
                            G-League
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-2 gy-2 mb-2">
                            WARNING: Once you've declared {player.FirstName}{' '}
                            {player.LastName} as a Two-Way player, they can
                            participate in both the G-League and the NBA league
                            simultaneously. You can only have two players on
                            your roster as a two-way player. Are you sure you
                            want to do this?
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            No
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={confirmChange}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const PlayerModal = ({ team, player, idx, viewMode, retro }) => {
    const modalId = `playerModal${idx}`;
    const modalClass = GetModalClass(viewMode);
    const teamKey = `${team.Team} ${team.Nickname}`;
    const nbaLogo = getLogo(teamKey.trim(), retro);
    const collegeLogo = getLogo(player.College, retro);
    const { Contract, IsGLeague, IsOnTradeBlock, IsTwoWay, DraftedRound } =
        player;
    const draftedRound = GetNFLRound(DraftedRound);
    const draftLabel =
        DraftedRound > 0 ? `${draftedRound} - ${player.DraftPick}` : 'UDFA';
    let status = 'Active Player';
    if (IsGLeague) status = 'In GLeague';
    else if (IsTwoWay) status = 'Two-Way Player';
    else if (IsOnTradeBlock) status = 'On Trade Block';
    let awardStatus = 'None';
    if (player.IsFirstTeamANBA) awardStatus = '1st Team All-SimNBA';
    else if (player.IsDPOY) awardStatus = 'Defensive Player of the Year';
    else if (player.IsMVP) awardStatus = 'MVP';
    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="cutPlayerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="redshirtModalLabel">
                            {player.Position} {player.FirstName}{' '}
                            {player.LastName}
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-2 gy-2 mb-3">
                            <div className="col">
                                <img src={nbaLogo} className="image-nfl-team" />
                            </div>
                            <div className="col">
                                <h6>Experience</h6>
                                <p className="text-small">{player.Year}</p>
                            </div>
                            <div className="col">
                                <h6>Age</h6>
                                <p className="text-small">{player.Age}</p>
                            </div>
                            <div className="col">
                                <h6>Status</h6>
                                <p className="text-small">{status}</p>
                            </div>
                        </div>
                        <div className="row g-2 gy-2 mb-3">
                            <div className="col">
                                <h6>Overall:</h6>{' '}
                                <p className="text-small">{player.Overall}</p>
                            </div>
                            <div className="col">
                                <h6>Potential:</h6>{' '}
                                <p className="text-small">
                                    {player.PotentialGrade}
                                </p>
                            </div>
                            <div className="col">
                                <h6>Height:</h6>{' '}
                                <p className="text-small">{player.Height}</p>
                            </div>
                            <div className="col">
                                <h6>Accolades</h6>{' '}
                                <p className="text-small">{awardStatus}</p>
                            </div>
                        </div>
                        <div className="row g-2 gy-2 mb-3">
                            <div className="col">
                                <h6>Origin</h6>
                                <p className="text-small">
                                    {player.Country != 'USA'
                                        ? player.Country
                                        : player.State}
                                </p>
                            </div>
                            <div className="col">
                                <h6>
                                    {player.IsIntGenerated
                                        ? 'Home Team'
                                        : 'Alma Mater'}
                                </h6>
                                <img
                                    src={collegeLogo}
                                    className="image-college-team"
                                />
                                <p className="text-small">{player.College}</p>
                            </div>
                            <div className="col">
                                <h6>Drafted Team</h6>
                                <p className="text-small">
                                    {player.DraftedTeamAbbr.length > 0
                                        ? player.DraftedTeamAbbr
                                        : 'N/A'}
                                </p>
                                <p className="text-small">{draftLabel}</p>
                            </div>
                            {player.PreviousTeamID > 0 && (
                                <div className="col">
                                    <h6>Previous Team</h6>
                                    <p className="text-small">
                                        {player.PreviousTeam.length > 0
                                            ? player.PreviousTeam
                                            : 'N/A'}
                                    </p>
                                </div>
                            )}
                            <div className="col">
                                <h6>Minimum Value</h6>{' '}
                                <p className="text-small">
                                    ${player.MinimumValue}
                                </p>
                            </div>
                        </div>
                        <div className="row g-2 gy-2 mb-2">
                            <div className="col-3">
                                <h6>Finishing</h6>
                                <p className="text-small">{player.Finishing}</p>
                            </div>
                            <div className="col-3">
                                <h6>2pt Shooting</h6>
                                <p className="text-small">{player.Shooting2}</p>
                            </div>
                            <div className="col-3">
                                <h6>3pt Shooting</h6>
                                <p className="text-small">{player.Shooting3}</p>
                            </div>
                            <div className="col-3">
                                <h6>Free Throw</h6>
                                <p className="text-small">{player.FreeThrow}</p>
                            </div>
                            <div className="col-3">
                                <h6>Ballwork</h6>
                                <p className="text-small">{player.Ballwork}</p>
                            </div>
                            <div className="col-3">
                                <h6>Rebounding</h6>
                                <p className="text-small">
                                    {player.Rebounding}
                                </p>
                            </div>
                            <div className="col-3">
                                <h6>Int. Defense</h6>
                                <p className="text-small">
                                    {player.InteriorDefense}
                                </p>
                            </div>
                            <div className="col-3">
                                <h6>Per. Defense</h6>
                                <p className="text-small">
                                    {player.PerimeterDefense}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
