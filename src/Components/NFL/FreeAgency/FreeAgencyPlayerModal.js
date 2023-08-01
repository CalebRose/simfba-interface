import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { getLogo } from '../../../Constants/getLogo';
import {
    HeightToFeetAndInches,
    RoundToTwoDecimals
} from '../../../_Utility/utilHelper';
import { GetNFLOverall } from '../../../_Utility/RosterHelper';

export const FreeAgencyPlayerModal = ({ player, idx, viewMode }) => {
    const modalId = 'playerModal' + idx;
    const heightObj = HeightToFeetAndInches(player.Height);
    const AllOffers = player && player.Offers;
    const modalClass = GetModalClass(viewMode);
    const ovr = GetNFLOverall(player.Overall, player.ShowLetterGrade);

    const OfferingTeam = ({ offer, idx }) => {
        const logo = getLogo(offer.Team);
        const rank = idx + 1;
        return (
            <div className="row">
                <div className="col">
                    <img src={logo} className="image-nfl-player-modal" alt="" />
                </div>
                <div className="col">
                    <h6>Rank: {rank}</h6>
                </div>
                <div className="col">
                    <h6>
                        Contract Value: $
                        {RoundToTwoDecimals(offer.ContractValue)}
                    </h6>
                </div>
            </div>
        );
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="extendPlayerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="playerModalLabel">
                            {player.Archetype} {player.Position}{' '}
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
                        {player &&
                            AllOffers !== null &&
                            AllOffers.length > 0 && (
                                <div className="row g-1 mb-3">
                                    <h5>Offers</h5>
                                    {AllOffers.map((x, i) => {
                                        return (
                                            <OfferingTeam offer={x} idx={i} />
                                        );
                                    })}
                                </div>
                            )}
                        <div className="row">
                            <div className="col">
                                <h5>Seasonal Stats</h5>
                            </div>
                            <div className="col">
                                <div className="row g-2 mb-2">
                                    <div className="col">
                                        <h5>Work Ethic</h5>
                                        <p>{player.WorkEthic}</p>
                                    </div>
                                </div>
                                <div className="row g-2 mb-2">
                                    <div className="col">
                                        <h5>Free Agency Bias</h5>
                                        <p>{player.FreeAgency}</p>
                                    </div>
                                </div>
                                <div className="row g-2 mb-2">
                                    <div className="col">
                                        <h5>Personality</h5>
                                        <p>{player.Personality}</p>
                                    </div>
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
