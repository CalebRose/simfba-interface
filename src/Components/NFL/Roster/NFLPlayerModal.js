import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { getLogo } from '../../../Constants/getLogo';
import {
    GetNFLOverall,
    GetNFLRound,
    SetNFLPriority
} from '../../../_Utility/RosterHelper';
import {
    HeightToFeetAndInches,
    RoundToTwoDecimals
} from '../../../_Utility/utilHelper';
import AttributeRow from '../../Roster/AttributeRow';

export const NFLPlayerModal = ({ team, player, idx, viewMode }) => {
    const modalId = 'playerModal' + idx;
    const modalClass = GetModalClass(viewMode);
    const heightObj = HeightToFeetAndInches(player.Height);
    player['priorityAttributes'] = SetNFLPriority(player);
    const logo = getLogo(team.TeamName + ' ' + team.Mascot);
    const CollegeLogo = getLogo(player.College);
    const CurrentYearSalary =
        player.Contract.Y1BaseSalary + player.Contract.Y1Bonus;
    const draftedRound = GetNFLRound(player.DraftedRound);
    const ovr = GetNFLOverall(player.Overall, player.ShowLetterGrade);
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
                                                      theme={viewMode}
                                                  />
                                              )
                                          )
                                        : ''}
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="row g-1 mb-2">
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
                                <div className="row g-1 mb-2">
                                    <div className="col">
                                        <h5>Work Ethic</h5>
                                        <p>{player.WorkEthic}</p>
                                    </div>
                                </div>
                                <div className="row g-1 mb-2">
                                    <div className="col">
                                        <h5>Free Agency Bias</h5>
                                        <p>{player.FreeAgency}</p>
                                    </div>
                                </div>
                                <div className="row g-1 mb-2">
                                    <div className="col">
                                        <h5>Personality</h5>
                                        <p>{player.Personality}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="row mb-1">
                                    <h6>Year 1</h6>
                                    <p className="fs-6">
                                        Bonus:{' '}
                                        {RoundToTwoDecimals(
                                            player.Contract.Y1Bonus
                                        )}
                                    </p>
                                    <p className="fs-6">
                                        Salary:{' '}
                                        {RoundToTwoDecimals(
                                            player.Contract.Y1BaseSalary
                                        )}
                                    </p>
                                </div>
                                {player.Contract.ContractLength > 1 && (
                                    <>
                                        <div className="row mb-1">
                                            <h6>Year 2</h6>
                                            <p className="fs-6">
                                                Bonus:{' '}
                                                {RoundToTwoDecimals(
                                                    player.Contract.Y2Bonus
                                                )}{' '}
                                            </p>
                                            <p className="fs-6">
                                                Salary:{' '}
                                                {RoundToTwoDecimals(
                                                    player.Contract.Y2BaseSalary
                                                )}
                                            </p>
                                        </div>
                                    </>
                                )}
                                {player.Contract.ContractLength > 2 && (
                                    <>
                                        <div className="row mb-1">
                                            <h6>Year 3</h6>
                                            <p className="fs-6">
                                                Bonus:{' '}
                                                {RoundToTwoDecimals(
                                                    player.Contract.Y3Bonus
                                                )}{' '}
                                            </p>
                                            <p className="fs-6">
                                                Salary:{' '}
                                                {RoundToTwoDecimals(
                                                    player.Contract.Y3BaseSalary
                                                )}
                                            </p>
                                        </div>
                                    </>
                                )}
                                {player.Contract.ContractLength > 3 && (
                                    <>
                                        <div className="row mb-1">
                                            <h6>Year 4</h6>
                                            <p className="fs-6">
                                                Bonus:{' '}
                                                {RoundToTwoDecimals(
                                                    player.Contract.Y4Bonus
                                                )}{' '}
                                            </p>
                                            <p className="fs-6">
                                                Salary:{' '}
                                                {RoundToTwoDecimals(
                                                    player.Contract.Y4BaseSalary
                                                )}
                                            </p>
                                        </div>
                                    </>
                                )}
                                {player.Contract.ContractLength > 4 && (
                                    <>
                                        <div className="row mb-1">
                                            <h6>Year 5</h6>
                                            <p className="fs-6">
                                                Bonus:{' '}
                                                {RoundToTwoDecimals(
                                                    player.Contract.Y5Bonus
                                                )}{' '}
                                            </p>
                                            <p className="fs-6">
                                                Salary:{' '}
                                                {RoundToTwoDecimals(
                                                    player.Contract.Y5BaseSalary
                                                )}
                                            </p>
                                        </div>
                                    </>
                                )}
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
