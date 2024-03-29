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

export const PlayerModal = ({ team, player, idx, viewMode }) => {
    const modalId = `playerModal${idx}`;
    const modalClass = GetModalClass(viewMode);
    const nbaLogo = getLogo(team.Team + ' ' + team.Nickname);
    const collegeLogo = getLogo(player.College);
    const { Contract, IsGLeague, IsOnTradeBlock, IsTwoWay, DraftedRound } =
        player;
    const draftedRound = GetNFLRound(DraftedRound);
    let status = 'Active Player';
    if (IsGLeague) status = 'In GLeague';
    else if (IsTwoWay) status = 'Two-Way Player';
    else if (IsOnTradeBlock) status = 'On Trade Block';
    let awardStatus = 'None';
    if (player.IsFirstTeamANBA) awardStatus = '1st Team All-SimNBA';
    else if (player.IsDPOY) awardStatus = 'Defensive Player of the Year';
    else if (player.IsMVP) awardStatus = 'MVP';
    let origin = player.Country === 'USA' ? player.State : player.Country;
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
                        <div className="row g-2 gy-2 mb-2">
                            <div className="col">
                                <img src={nbaLogo} className="image-nfl-team" />
                            </div>
                            <div className="col">
                                <h5>Experience</h5>
                                {player.Experience}
                            </div>
                            <div className="col">
                                <h5>Age</h5>
                                {player.Age}
                            </div>
                            <div className="col">
                                <h5>Status</h5>
                                {status}
                            </div>
                        </div>
                        <div className="row g-2 gy-2 mb-2">
                            <div className="col">
                                <h5>Overall:</h5> {player.Overall}
                            </div>
                            <div className="col">
                                <h5>Potential:</h5> {player.PotentialGrade}
                            </div>
                            <div className="col">
                                <h5>Height:</h5> {player.Height}
                            </div>
                            <div className="col">
                                <h5>Recent Awards</h5> {awardStatus}
                            </div>
                        </div>
                        <div className="row g-2 gy-2 mb-2">
                            <div className="col">
                                <h5>College</h5>{' '}
                                <img
                                    src={collegeLogo}
                                    className="image-college-team"
                                />
                                <p>{player.College}</p>
                            </div>
                            <div className="col">
                                <h5>Origin:</h5>
                                {origin}
                            </div>
                            <div className="col">
                                <h5>Drafted Team</h5>
                                <p>
                                    {player.DraftedTeamAbbr.length > 0
                                        ? player.DraftedTeamAbbr
                                        : 'N/A'}
                                </p>
                                <p>
                                    {draftedRound.length > 0
                                        ? `${draftedRound} Round, Pick ${player.DraftPick}`
                                        : ''}
                                </p>
                            </div>
                            <div className="col">
                                <h5>Years in League</h5> {player.Year}
                            </div>
                        </div>
                        <div className="row g-2 gy-2 mb-2">
                            <div className="col">
                                <h5>Minimum Value</h5> ${player.MinimumValue}
                            </div>
                            <div className="col">
                                <h5>Contract Value</h5> $
                                {Contract.ContractValue}
                            </div>
                            <div className="col">
                                <h5>Total Remaining</h5> $
                                {Contract.TotalRemaining}M
                            </div>
                            <div className="col">
                                <h5>Years Left</h5> {Contract.YearsRemaining}
                            </div>
                        </div>
                        <div className="row g-2 gy-2 mb-2">
                            <h6>Year 1</h6>
                            <p className="fs-6">
                                Total: $
                                {RoundToTwoDecimals(Contract.Year1Total)}
                            </p>
                            {Contract.Year1Opt && <p>Year 1 Option</p>}
                        </div>
                        {Contract.YearsRemaining > 1 && (
                            <div className="row mb-1">
                                <h6>Year 2</h6>
                                <p className="fs-6">
                                    Total: $
                                    {RoundToTwoDecimals(Contract.Year2Total)}
                                </p>
                                {Contract.Year2Opt && <p>Year 2 Option</p>}
                            </div>
                        )}
                        {Contract.YearsRemaining > 2 && (
                            <div className="row mb-1">
                                <h6>Year 3</h6>
                                <p className="fs-6">
                                    Total: $
                                    {RoundToTwoDecimals(Contract.Year3Total)}
                                </p>
                                {Contract.Year3Opt && <p>Year 3 Option</p>}
                            </div>
                        )}
                        {Contract.YearsRemaining > 3 && (
                            <div className="row mb-1">
                                <h6>Year 4</h6>
                                <p className="fs-6">
                                    Total: $
                                    {RoundToTwoDecimals(Contract.Year4Total)}
                                </p>
                                {Contract.Year4Opt && <p>Year 4 Option</p>}
                            </div>
                        )}
                        {Contract.YearsRemaining > 4 && (
                            <div className="row mb-1">
                                <h6>Year 5</h6>
                                <p className="fs-6">
                                    Total: $
                                    {RoundToTwoDecimals(Contract.Year5Total)}
                                </p>
                                {Contract.Year5Opt && <p>Year 5 Option</p>}
                            </div>
                        )}
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
