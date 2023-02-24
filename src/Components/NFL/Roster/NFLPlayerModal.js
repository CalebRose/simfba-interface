import React from 'react';
import { getLogo } from '../../../Constants/getLogo';
import { GetNFLRound, SetNFLPriority } from '../../../_Utility/RosterHelper';
import { HeightToFeetAndInches } from '../../../_Utility/utilHelper';
import AttributeRow from '../../Roster/AttributeRow';

export const NFLPlayerModal = ({ team, player, idx }) => {
    const modalId = 'playerModal' + idx;
    const heightObj = HeightToFeetAndInches(player.Height);
    player['priorityAttributes'] = SetNFLPriority(player);
    const logo = getLogo(team.TeamName + ' ' + team.Mascot);
    const CollegeLogo = getLogo(player.College);
    const CurrentYearSalary =
        player.Contract.Y1BaseSalary + player.Contract.Y1Bonus;
    const draftedRound = GetNFLRound(player.DraftedRound);
    let status = 'Active Player';
    if (player.IsPracticeSquad) {
        status = 'Practice Squad';
    } else if (player.IsOnTradeBlock) {
        status = 'On Trade Block';
    }

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="extendPlayerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
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
                                <img src={logo} className="image-nfl-team" />
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
                        <div className="row g-2 gy-2 mb-3">
                            <div className="col">
                                <h5>Overall:</h5> {player.Overall}
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
                                <h5>Hometown:</h5> {player.Hometown}
                            </div>
                            <div className="col">
                                <h5>State</h5>
                                {player.State}
                            </div>
                            <div className="col">
                                <h5>College:</h5>
                                <img
                                    src={CollegeLogo}
                                    className="image-college-team"
                                />
                                <p>{player.College}</p>
                            </div>
                            <div className="col">
                                <h5>Drafted Team</h5>
                                <p>
                                    {player.DraftedTeam.length > 0
                                        ? player.DraftedTeam
                                        : 'N/A'}
                                </p>
                                <p>
                                    {draftedRound.length > 0
                                        ? `${draftedRound} Round, Pick ${player.DraftedPick}`
                                        : ''}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row g-2 mb-2">
                                    {player.priorityAttributes &&
                                    player.priorityAttributes.length > 0
                                        ? player.priorityAttributes.map(
                                              (attribute) => (
                                                  <AttributeRow
                                                      key={attribute.Name}
                                                      data={attribute}
                                                  />
                                              )
                                          )
                                        : ''}
                                </div>
                            </div>
                            <div className="col">
                                <div className="row g-2 mb-2">
                                    <div className="col">
                                        <h5>Contract</h5>
                                        <p>
                                            {player.Contract.ContractLength}{' '}
                                            Years
                                        </p>
                                        <h5>Current Year</h5>
                                        <p>${CurrentYearSalary}M</p>
                                    </div>
                                </div>
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
