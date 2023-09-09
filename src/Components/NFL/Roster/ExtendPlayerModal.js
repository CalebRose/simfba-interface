import React, { useEffect, useState } from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { GetNFLOverall } from '../../../_Utility/RosterHelper';
import {
    CapRemainingRow,
    NFLBonusRow,
    NFLSalaryRow,
    NFLTotalRow,
    OfferValueRow
} from '../../_Common/CommonOfferComponents';
import {
    GetCapSpace,
    GetContractLength,
    GetTotalValue,
    GetYearlyValue,
    ValidateRule2,
    ValidateRule3,
    ValidateRule4,
    ValidateRule5,
    ValidateRule6
} from '../FreeAgency/FreeAgencyHelper';

export const ExtendPlayerModal = ({
    player,
    idx,
    extend,
    viewMode,
    team,
    ts,
    cancel
}) => {
    const modalId = `extendPlayer${idx}`;
    const name = `${player.FirstName} ${player.LastName}`;
    const modalClass = GetModalClass(viewMode);
    const [existingExtension, setExistingExtension] = useState(null);
    const [hasExistingExtension, setExistingExtensionBool] = useState(false);
    const [offer, setOffer] = useState(() => {
        const offers = player.Extensions;
        if (offers && offers.length > 0) {
            const offerIdx = player.Extensions.findIndex(
                (x) => x.TeamID === team.ID
            );
            if (offerIdx < 0) {
                return {
                    NFLPlayerID: player.ID,
                    TeamID: team.ID,
                    Team: `${team.TeamName} ${team.Mascot}`
                };
            }
            setExistingExtension(() => offers[offerIdx]);
            return offers[offerIdx];
        } else {
            return {
                NFLPlayerID: player.ID,
                TeamID: team.ID,
                Team: `${team.TeamName} ${team.Mascot}`
            };
        }
    });
    const [validOffer, setValidOffer] = useState(false);
    const [rule1Valid, setRule1] = useState(true);
    const [rule2Valid, setRule2] = useState(true);
    const [rule3Valid, setRule3] = useState(true);
    const [rule4Valid, setRule4] = useState(true);
    const [rule5Valid, setRule5] = useState(true);
    const [rule6Valid, setRule6] = useState(true);
    const { MinimumValue } = player;
    const ovr = GetNFLOverall(player.Overall, player.ShowLetterGrade);

    const confirmChange = () => {
        return extend(player, offer);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (offer) {
            let updatedOffer = { ...offer };
            updatedOffer[name] = Number(value);

            ValidateOffer(updatedOffer);
        }
    };

    const ValidateOffer = (offer) => {
        let BonusTotal = offer.TotalBonus;
        if (BonusTotal < 0) BonusTotal = 0;
        let y1Bonus = 0;
        let y2Bonus = 0;
        let y3Bonus = 0;
        let y4Bonus = 0;
        let y5Bonus = 0;
        const salary = GetTotalValue(
            offer.Y1BaseSalary,
            offer.Y2BaseSalary,
            offer.Y3BaseSalary,
            offer.Y4BaseSalary,
            offer.Y5BaseSalary
        );
        const contractLength = offer.ContractLength;
        const bonusByYear = BonusTotal / contractLength;
        y1Bonus = contractLength > 0 ? bonusByYear : 0;
        y2Bonus = contractLength > 1 ? bonusByYear : 0;
        y3Bonus = contractLength > 2 ? bonusByYear : 0;
        y4Bonus = contractLength > 3 ? bonusByYear : 0;
        y5Bonus = contractLength > 4 ? bonusByYear : 0;
        const totalOverall = BonusTotal + salary;
        const capsheet = team.Capsheet;
        const y1Total = GetYearlyValue(y1Bonus, offer.Y1BaseSalary);
        const y2Total = GetYearlyValue(y2Bonus, offer.Y2BaseSalary);
        const y3Total = GetYearlyValue(y3Bonus, offer.Y3BaseSalary);
        const y4Total = GetYearlyValue(y4Bonus, offer.Y4BaseSalary);
        const y5Total = GetYearlyValue(y5Bonus, offer.Y5BaseSalary);
        const y1Value = y1Bonus * 1 + offer.Y1BaseSalary * 0.8;
        const y2Value = y2Bonus * 0.9 + offer.Y2BaseSalary * 0.4;
        const y3Value = y3Bonus * 0.8 + offer.Y3BaseSalary * 0.2;
        const y4Value = y4Bonus * 0.7 + offer.Y4BaseSalary * 0.1;
        const y5Value = y5Bonus * 0.6 + offer.Y5BaseSalary * 0.05;
        const y1Space = GetCapSpace(
            ts.Y1Capspace,
            y1Bonus,
            capsheet.Y1Salary,
            capsheet.Y1CapHit
        );
        const y2Space = GetCapSpace(
            ts.Y2Capspace,
            y2Bonus,
            capsheet.Y2Salary,
            capsheet.Y2CapHit
        );
        const y3Space = GetCapSpace(
            ts.Y3Capspace,
            y3Bonus,
            capsheet.Y3Salary,
            capsheet.Y3CapHit
        );
        const y4Space = GetCapSpace(
            ts.Y4Capspace,
            y4Bonus,
            capsheet.Y4Salary,
            capsheet.Y4CapHit
        );
        const y5Space = GetCapSpace(
            ts.Y5Capspace,
            y5Bonus,
            capsheet.Y5Salary,
            capsheet.Y5CapHit
        );
        const contractValue = GetTotalValue(
            y1Value,
            y2Value,
            y3Value,
            y4Value,
            y5Value
        );
        const updatedOffer = {
            ...offer,
            TotalBonus: BonusTotal,
            Y1Bonus: y1Bonus,
            Y2Bonus: y2Bonus,
            Y3Bonus: y3Bonus,
            Y4Bonus: y4Bonus,
            Y5Bonus: y5Bonus,
            TotalSalary: salary,
            TotalOverall: totalOverall,
            TotalY1: y1Total,
            TotalY2: y2Total,
            TotalY3: y3Total,
            TotalY4: y4Total,
            TotalY5: y5Total,
            ValueY1: y1Value,
            ValueY2: y2Value,
            ValueY3: y3Value,
            ValueY4: y4Value,
            ValueY5: y5Value,
            Y1Remaining: y1Space - y1Total,
            Y2Remaining: y2Space - y2Total,
            Y3Remaining: y3Space - y3Total,
            Y4Remaining: y4Space - y4Total,
            Y5Remaining: y5Space - y5Total,
            ContractValue: contractValue,
            ContractLength: contractLength
        };

        const isRule1Valid = contractLength > 0 && contractLength < 6;
        const isRule2Valid = ValidateRule2(
            contractLength,
            y1Total,
            y2Total,
            y3Total,
            y4Total,
            y5Total
        );

        const isRule3Valid = ValidateRule3(
            contractLength,
            y1Total,
            y2Total,
            y3Total,
            y4Total,
            y5Total
        );

        const isRule4Valid = ValidateRule4(
            contractLength,
            y1Total,
            y2Total,
            y3Total,
            y4Total,
            y5Total
        );

        const isRule5Valid = ValidateRule5(
            BonusTotal,
            totalOverall,
            ts.IsNFLOffSeason
        );

        const isRule6Valid = ValidateRule6(
            offer.Y1BaseSalary,
            offer.Y2BaseSalary,
            offer.Y3BaseSalary,
            offer.Y4BaseSalary,
            offer.Y5BaseSalary
        );

        // const canMakeOffer =
        //     player.IsAcceptingOffers ||
        //     (player.IsNegotiating && hasExistingExtension);

        const validToExistingOffer = !existingExtension
            ? true
            : existingExtension.ContractValue <= contractValue;

        const isValid =
            contractValue >= MinimumValue &&
            isRule1Valid &&
            isRule2Valid &&
            isRule3Valid &&
            isRule4Valid &&
            isRule5Valid &&
            isRule6Valid &&
            // canMakeOffer &&
            validToExistingOffer;

        setRule1(() => isRule1Valid);
        setRule2(() => isRule2Valid);
        setRule3(() => isRule3Valid);
        setRule4(() => isRule4Valid);
        setRule5(() => isRule5Valid);
        setRule6(() => isRule6Valid);
        setValidOffer(() => isValid);
        setOffer(() => updatedOffer);
    };

    useEffect(() => {
        if (player && player.Extensions.length > 0) {
            GetTeamOffer(player.Extensions);
            const offers = player.Extensions;
            const offerIdx = player.Extensions.findIndex(
                (x) => x.TeamID === team.ID
            );
            if (offerIdx > -1) {
                setExistingExtensionBool(() => true);
                ValidateOffer(offers[offerIdx]);
            }
        }
    }, [player]);

    const GetTeamOffer = (offers) => {
        let teamOffer = offers.findIndex((x) => x.TeamID === team.ID);
        if (teamOffer > -1) {
            setOffer(() => offers[teamOffer]);
        }
    };

    const OfferButton = () => {
        let buttonText = 'Yes';
        let buttonClass = 'btn btn-secondary';
        let isDisabled = true;
        if (validOffer) {
            if (!hasExistingExtension) {
                buttonClass = 'btn btn-danger';
                isDisabled = false;
            } else {
                buttonText = 'Update';
                buttonClass = 'btn btn-warning';
                isDisabled = false;
            }
        }
        if (hasExistingExtension) {
            buttonText = 'Update';
        }

        return (
            <button
                type="button"
                className={buttonClass}
                data-bs-dismiss="modal"
                disabled={isDisabled}
                onClick={confirmChange}
            >
                {buttonText}
            </button>
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
            <div className="modal-dialog modal-xl">
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="redshirtModalLabel">
                            Extend Contract for {name}, {player.Experience} Year{' '}
                            {player.Archetype} {player.Position}
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <div className="row mb-2">
                            <div className="col-md-3">
                                <h5>Bias: </h5>
                                <p>{player.FreeAgency}</p>
                            </div>
                            <div className="col-md-auto">
                                <h5 className="">Overall: </h5>
                                <p>{ovr}</p>
                            </div>
                            <div className="col-md-auto">
                                <h5 className="">Height & Weight</h5>
                                <p>
                                    {player.Height} inches, {player.Weight} lbs
                                </p>
                            </div>
                            <div className="col-md-auto">
                                <h5 className="">Current Contract:</h5>
                                <p>{player.Contract.ContractLength} Years</p>
                            </div>
                            <div className="col-md-auto ms-auto">
                                <h5 className="">Minimum Value</h5>
                                <p>${MinimumValue}M</p>
                            </div>
                        </div>
                        <div className="row text-start text-small">
                            <div className="row text-start text-small">
                                <h5>Rules</h5>
                                <div className="row">
                                    <div className="col">
                                        <p
                                            className={
                                                !rule1Valid ? 'text-danger' : ''
                                            }
                                        >
                                            1: Contracts can only be between 1-5
                                            years
                                        </p>
                                        <p
                                            className={
                                                !rule3Valid ? 'text-danger' : ''
                                            }
                                        >
                                            3: Contracts cannot increase by more
                                            than 50% (or $3M) from year to year
                                        </p>
                                        <p
                                            className={
                                                !rule5Valid ? 'text-danger' : ''
                                            }
                                        >
                                            5: Before the draft, at least 30% of
                                            any contract must be bonus money.
                                            After the draft, bonus can be any
                                            amount, even 0%.
                                        </p>
                                    </div>
                                    <div className="col">
                                        <p
                                            className={
                                                !rule2Valid ? 'text-danger' : ''
                                            }
                                        >
                                            2: Salary cannot decrease (but can
                                            remain flat)
                                        </p>
                                        <p
                                            className={
                                                !rule4Valid ? 'text-danger' : ''
                                            }
                                        >
                                            4: Highest year cannot be more than
                                            100% of the lowest year (or $6M)
                                        </p>
                                        <p
                                            className={
                                                !rule6Valid ? 'text-danger' : ''
                                            }
                                        >
                                            6: An input for salary that isn't
                                            zero must be greater than 0.5.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2 text-start">
                            <h5>Contract Length</h5>
                        </div>
                        <div className="row mt-1">
                            <div className="col-auto">
                                <input
                                    name="ContractLength"
                                    type="number"
                                    className="form-control"
                                    id="ContractLength"
                                    aria-describedby="ContractLength"
                                    value={offer ? offer.ContractLength : 0}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <NFLBonusRow
                            handleInputChange={handleInputChange}
                            offer={offer}
                            isFAOffer={true}
                        />
                        <NFLSalaryRow
                            handleInputChange={handleInputChange}
                            offer={offer}
                            isFAOffer={true}
                        />
                        <NFLTotalRow
                            handleInputChange={handleInputChange}
                            offer={offer}
                        />
                        <OfferValueRow
                            handleInputChange={handleInputChange}
                            offer={offer}
                        />
                        <CapRemainingRow
                            offer={offer}
                            handleInputChange={handleInputChange}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            data-bs-dismiss="modal"
                        >
                            No
                        </button>
                        {hasExistingExtension && (
                            <button
                                type="button"
                                className="btn btn-secondary me-2"
                                data-bs-dismiss="modal"
                                onClick={() => cancel(player, offer)}
                            >
                                Cancel
                            </button>
                        )}
                        <OfferButton />
                    </div>
                </div>
            </div>
        </div>
    );
};
