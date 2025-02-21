import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { getLogo } from '../../../Constants/getLogo';
import {
    HeightToFeetAndInches,
    RoundToTwoDecimals,
    ShuffleList
} from '../../../_Utility/utilHelper';
import { GetNFLOverall, SetNFLPriority } from '../../../_Utility/RosterHelper';
import AttributeRow from '../../Roster/AttributeRow';
import { SimNFL } from '../../../Constants/CommonConstants';

export const FreeAgencyPlayerModal = ({ player, idx, viewMode, retro }) => {
    const modalId = 'playerModal' + idx;
    const heightObj = HeightToFeetAndInches(player.Height);
    let AllOffers = player && player.Offers;
    if (AllOffers === undefined) AllOffers = player && player.WaiverOffers;
    const { IsNegotiating, SeasonStats } = player;
    const modalClass = GetModalClass(viewMode);
    const ovr = GetNFLOverall(player.Overall, player.ShowLetterGrade);
    player['priorityAttributes'] = SetNFLPriority(player);
    const teamsList = AllOffers.map((x) => x.Team);
    const shuffledTeamList = ShuffleList(teamsList);
    const OfferingTeam = ({ offer }) => {
        const logo = getLogo(SimNFL, offer.TeamID, retro);
        return (
            <div className="row">
                <div className="col">
                    <img src={logo} className="image-nfl-player-modal" alt="" />
                </div>
                <div className="col">
                    <h6>{offer.Team}</h6>
                </div>
            </div>
        );
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            aria-labelledby="extendPlayerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="playerModalLabel">
                            {player.ID} {player.Archetype} {player.Position}{' '}
                            {player.FirstName} {player.LastName}
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
                                <h5>Experience</h5>
                                {player.Experience}
                            </div>
                            <div className="col">
                                <h5>Age</h5>
                                {player.Age}
                            </div>
                            <div className="col">
                                <h5>Previous Team</h5>
                                {player.PreviousTeam.length > 0
                                    ? player.PreviousTeam
                                    : 'N/A'}
                            </div>
                            <div className="col">
                                <h5>Status: </h5>
                                {player.IsAcceptingOffers
                                    ? 'Open'
                                    : 'Negotiating'}
                            </div>
                        </div>
                        <div className="row g-2 gy-2 mb-3">
                            <div className="col">
                                <h5>Overall:</h5> {ovr}
                            </div>
                            <div className="col">
                                <h5>Potential:</h5> {player.PotentialGrade}
                            </div>
                            <div className="col">
                                <h5>Height:</h5> {heightObj.feet}'{' '}
                                {heightObj.inches}"
                            </div>
                            <div className="col">
                                <h5>Weight:</h5> {player.Weight}
                            </div>
                        </div>
                        <div className="row g-2 mb-3">
                            <div className="col">
                                <h5>
                                    Drafted By:{' '}
                                    {player.DraftedTeam.length > 0
                                        ? player.DraftedTeam
                                        : 'N/A'}
                                </h5>
                            </div>
                            <div className="col">
                                <h5>Hometown:</h5> {player.Hometown}
                            </div>
                            <div className="col">
                                <h5>State</h5>
                                {player.State}
                            </div>
                            <div className="col">
                                <h5>Free Agency</h5>
                                {player.IsFreeAgent
                                    ? 'Free Agent'
                                    : 'Waiver Player'}
                            </div>
                        </div>
                        {IsNegotiating && (
                            <div className="row g-1 mb-3">
                                <h5>This player is now negotiating.</h5>
                                <p>
                                    Teams with an offer will have one more week
                                    to update their offers before the player
                                    signs. Until then, all contract info will
                                    remain hidden.
                                </p>
                            </div>
                        )}
                        <h6>Teams In Contention</h6>
                        {shuffledTeamList.map((x) => (
                            <p>{x}</p>
                        ))}
                        <div className="row">
                            {SeasonStats.ID > 0 && (
                                <div className="col">
                                    <div className="row g-2 mb-2">
                                        <h5>{SeasonStats.Year} Stats</h5>
                                    </div>
                                    <div className="row g-2 d-flex flex-wrap justify-content-center">
                                        {SeasonStats.PassingYards > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Passing Yards</h6>
                                                <p>
                                                    {SeasonStats.PassingYards}
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.PassAttempts > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Pass Attempts</h6>
                                                <p>
                                                    {
                                                        SeasonStats.PassCompletions
                                                    }
                                                    {' / '}
                                                    {SeasonStats.PassAttempts}
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.PassingTDs > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Passing TDs</h6>
                                                <p>{SeasonStats.PassingTDs}</p>
                                            </div>
                                        )}
                                        {SeasonStats.Interceptions > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>INTs</h6>
                                                <p>
                                                    {SeasonStats.Interceptions}
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.Sacks > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Sacks</h6>
                                                <p>{SeasonStats.Sacks}</p>
                                            </div>
                                        )}
                                        {SeasonStats.QBRating > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>QBR</h6>
                                                <p>
                                                    {RoundToTwoDecimals(
                                                        SeasonStats.QBRating
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.RushingYards > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Rushing Yards</h6>
                                                <p>
                                                    {SeasonStats.RushingYards}{' '}
                                                    Yards for{' '}
                                                    {SeasonStats.RushAttempts}{' '}
                                                    Attempts
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.RushingTDs > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Rush TDs</h6>
                                                <p>{SeasonStats.RushingTDs}</p>
                                            </div>
                                        )}
                                        {SeasonStats.Targets > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Receiving Yards</h6>
                                                <p>
                                                    {SeasonStats.ReceivingYards}{' '}
                                                    Yards
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.Catches > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Catches</h6>
                                                <p>
                                                    {SeasonStats.Catches}/
                                                    {SeasonStats.Targets}
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.ReceivingTDs > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Receiving TDs</h6>
                                                <p>
                                                    {SeasonStats.ReceivingTDs}
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.Fumbles > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Fumbles</h6>
                                                <p>{SeasonStats.Fumbles}</p>
                                            </div>
                                        )}
                                        {SeasonStats.Tackles > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Tackles</h6>
                                                <p>{SeasonStats.Tackles}</p>
                                            </div>
                                        )}
                                        {SeasonStats.SacksMade > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Sacks</h6>
                                                <p>{SeasonStats.SacksMade}</p>
                                            </div>
                                        )}
                                        {SeasonStats.ForcedFumbles > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Forced Fumbles</h6>
                                                <p>
                                                    {SeasonStats.ForcedFumbles}
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.RecoveredFumbles > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Recovered Fumbles</h6>
                                                <p>
                                                    {
                                                        SeasonStats.RecoveredFumbles
                                                    }
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.PassDeflections > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Deflections</h6>
                                                <p>
                                                    {
                                                        SeasonStats.PassDeflections
                                                    }
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.InterceptionsCaught >
                                            0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Interceptions</h6>
                                                <p>
                                                    {
                                                        SeasonStats.InterceptionsCaught
                                                    }
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.Safeties > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Safeties</h6>
                                                <p>{SeasonStats.Safeties}</p>
                                            </div>
                                        )}
                                        {SeasonStats.DefensiveTDs > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Defensive TDs</h6>
                                                <p>
                                                    {SeasonStats.DefensiveTDs}
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.FGMade > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Field Goals</h6>
                                                <p>
                                                    {SeasonStats.FGMade} of{' '}
                                                    {SeasonStats.FGAttempts}
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.XPMade > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Extra Points</h6>
                                                <p>
                                                    {
                                                        SeasonStats.ExtraPointsMade
                                                    }{' '}
                                                    of{' '}
                                                    {
                                                        SeasonStats.ExtraPointsAttempted
                                                    }
                                                </p>
                                            </div>
                                        )}
                                        {SeasonStats.Punts > 0 && (
                                            <div className="col-2 g-2 mb-1">
                                                <h6>Punts</h6>
                                                <p>
                                                    {SeasonStats.Punts},{' '}
                                                    {SeasonStats.PuntsInside20}{' '}
                                                    Inside the 20
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="col">
                                <div className="row g-2 mb-2">
                                    <h5>Biases</h5>
                                </div>
                                <div className="row g-2 mb-2 d-flex flex-wrap">
                                    <div className="col">
                                        <h6>Work Ethic</h6>
                                        <p>{player.WorkEthic}</p>
                                    </div>
                                    <div className="col">
                                        <h6>Free Agency Bias</h6>
                                        <p>{player.FreeAgency}</p>
                                    </div>
                                    <div className="col">
                                        <h6>Personality</h6>
                                        <p>{player.Personality}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <h6>Attributes</h6>
                                <div className="row g-2">
                                    {player.priorityAttributes &&
                                        player.priorityAttributes.length > 0 &&
                                        player.priorityAttributes.map(
                                            (attribute) => (
                                                <AttributeRow
                                                    key={attribute.Name}
                                                    data={attribute}
                                                    theme={viewMode}
                                                />
                                            )
                                        )}
                                </div>
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
