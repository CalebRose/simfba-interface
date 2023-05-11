import React, { useState } from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { RoundToTwoDecimals } from '../../../_Utility/utilHelper';
import { TradeDropdown } from '../../_Common/Dropdown';
import { NumberInput } from '../../_Common/Input';
import { GetCapSpace } from '../FreeAgency/FreeAgencyHelper';
import { CapsheetRow } from '../Roster/NFLSidebar';
import { GetOptionList, LoadTradeOptions } from './TradeBlockHelper';

const CapspaceColumn = ({ team, ts }) => {
    const {
        Season,
        Y1Capspace,
        Y2Capspace,
        Y3Capspace,
        Y4Capspace,
        Y5Capspace
    } = ts;
    const capsheet = team.Capsheet;
    const y1Space = GetCapSpace(
        Y1Capspace,
        capsheet.Y1Bonus,
        capsheet.Y1Salary,
        capsheet.Y1CapHit
    );
    const y2Space = GetCapSpace(
        Y2Capspace,
        capsheet.Y2Bonus,
        capsheet.Y2Salary,
        capsheet.Y2CapHit
    );
    const y3Space = GetCapSpace(
        Y3Capspace,
        capsheet.Y3Bonus,
        capsheet.Y3Salary,
        capsheet.Y3CapHit
    );
    const y4Space = GetCapSpace(
        Y4Capspace,
        capsheet.Y4Bonus,
        capsheet.Y4Salary,
        capsheet.Y4CapHit
    );
    const y5Space = GetCapSpace(
        Y5Capspace,
        capsheet.Y5Bonus,
        capsheet.Y5Salary,
        capsheet.Y5CapHit
    );

    return (
        <div className="col-2">
            <div className="row mb-1 pe-2">
                <h3>{team.TeamName} Cap Space</h3>
            </div>
            <div className="row mb-1 pe-2">
                <div className="col-3">
                    <h5>Year</h5>
                </div>
                <div className="col-3">
                    <h5>Bonus</h5>
                </div>
                <div className="col-3">
                    <h5>Salary</h5>
                </div>
                <div className="col-3">
                    <h5>Space</h5>
                </div>
            </div>
            <CapsheetRow
                year={Season}
                bonus={capsheet.Y1Bonus}
                salary={capsheet.Y1Salary}
                space={y1Space}
            />
            <CapsheetRow
                year={Season + 1}
                bonus={capsheet.Y2Bonus}
                salary={capsheet.Y2Salary}
                space={y2Space}
            />
            <CapsheetRow
                year={Season + 2}
                bonus={capsheet.Y3Bonus}
                salary={capsheet.Y3Salary}
                space={y3Space}
            />
            <CapsheetRow
                year={Season + 3}
                bonus={capsheet.Y4Bonus}
                salary={capsheet.Y4Salary}
                space={y4Space}
            />
            <CapsheetRow
                year={Season + 4}
                bonus={capsheet.Y5Bonus}
                salary={capsheet.Y5Salary}
                space={y5Space}
            />
        </div>
    );
};

export const OptionCard = ({
    optionType,
    opt,
    change,
    remove,
    idx,
    isUser,
    isProposalModal,
    sp
}) => {
    const title =
        optionType === 'Player'
            ? `${opt.Position} ${opt.FirstName} ${opt.LastName}`
            : `${opt.Season} Round ${opt.Round}`;
    const description =
        optionType === 'Player' ? (
            <>
                <p className="card-text mb-0">
                    Overall: {GetNFLOverall(opt.Overall, opt.ShowLetterGrade)}
                </p>
                <p className="card-text mb-0">Year {opt.Experience}</p>
                <p className="card-text mb-0">{opt.Age} years old</p>
                <p className="card-text mb-0">
                    Contract Value:{' '}
                    {RoundToTwoDecimals(opt.Contract.ContractValue)}
                </p>
            </>
        ) : (
            <>
                {opt.PickNumber > 0 && (
                    <p className="card-text mb-0">
                        Pick Number: {opt.PickNumber}
                    </p>
                )}
                <p className="card-text">Trade Value: {opt.TradeValue}</p>
            </>
        );

    const salaryPercentageLabel = sp ? sp : opt.SalaryPercentage;

    const helper = (event) => {
        const { name, value } = event.target;
        return change(name, value, idx, isUser);
    };

    const removeHelper = () => {
        return remove(opt, isUser);
    };

    return (
        <div className="card mt-1 mb-2">
            <div className="row g-0">
                <div
                    className="col-1 justify-content-start"
                    style={{ marginTop: '1%', paddingLeft: '0.5rem' }}
                >
                    {optionType === 'Player' ? (
                        <i
                            className="bi bi-person-fill"
                            style={{ fontSize: '20px' }}
                        />
                    ) : (
                        <i
                            className={`bi bi-${opt.Round}-circle-fill`}
                            style={{ fontSize: '20px' }}
                        />
                    )}
                </div>
                <div
                    className={
                        isProposalModal
                            ? optionType === 'Player'
                                ? 'col-5'
                                : 'col-9'
                            : 'col-7'
                    }
                >
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        {description}
                    </div>
                </div>
                {optionType === 'Player' && (
                    <div className="col-4">
                        <div className="row mt-2 mb-2 justify-content-center">
                            <label
                                for="SalaryPercentage"
                                className="salary-percentage-label pe-3 text-wrap mb-1"
                                title="The amount the sending team will pay for the salary."
                            >
                                1st Year Salary Percentage
                            </label>
                            {isProposalModal ? (
                                <NumberInput
                                    name="SalaryPercentage"
                                    value={opt.SalaryPercentage || 0}
                                    change={helper}
                                />
                            ) : (
                                <h5>{salaryPercentageLabel}</h5>
                            )}
                        </div>
                    </div>
                )}
                {isProposalModal && (
                    <div className="col-2">
                        <div className="row row-remove-btn">
                            <button
                                type="button"
                                className="btn remove-option-btn"
                                onClick={removeHelper}
                            >
                                <i class="bi bi-x-circle-fill" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {optionType === 'Player' && (
                <div className="row g-0 mb-2">
                    <div className="col">
                        <p className="card-text mb-0">
                            Year 1:{' '}
                            {RoundToTwoDecimals(
                                opt.Contract.Y1BaseSalary + opt.Contract.Y1Bonus
                            )}
                        </p>
                    </div>
                    <div className="col">
                        <p className="card-text mb-0">
                            Year 2:{' '}
                            {RoundToTwoDecimals(
                                opt.Contract.Y2BaseSalary + opt.Contract.Y2Bonus
                            )}
                        </p>
                    </div>
                    <div className="col">
                        <p className="card-text mb-0">
                            Year 3:{' '}
                            {RoundToTwoDecimals(
                                opt.Contract.Y3BaseSalary + opt.Contract.Y3Bonus
                            )}
                        </p>
                    </div>
                    <div className="col">
                        <p className="card-text mb-0">
                            Year 4:{' '}
                            {RoundToTwoDecimals(
                                opt.Contract.Y4BaseSalary + opt.Contract.Y4Bonus
                            )}
                        </p>
                    </div>
                    <div className="col">
                        <p className="card-text mb-0">
                            Year 5:{' '}
                            {RoundToTwoDecimals(
                                opt.Contract.Y5BaseSalary + opt.Contract.Y5Bonus
                            )}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export const TradeProposalModal = ({
    theme,
    ts,
    userTeam,
    currentTeam,
    tradablePlayers,
    tradablePicks,
    userPlayers,
    userPicks,
    Propose
}) => {
    const [userOptions, setUserOptions] = useState([]);
    const [receiverOptions, setReceiverOptions] = useState([]);
    const modalId = `tradeProposalModal`;
    const modalClass = GetModalClass(theme);
    const userList = GetOptionList(userPlayers, userPicks, userOptions);
    const tradableList = GetOptionList(
        tradablePlayers,
        tradablePicks,
        receiverOptions
    );

    const RemoveFromList = (opt, isUser) => {
        const list = isUser ? [...userOptions] : [...receiverOptions];
        const newList = [];
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item.OptionType === opt.OptionType && item.ID === opt.ID)
                continue;
            newList.push(item);
        }
        if (isUser) {
            setUserOptions(() => newList);
        } else {
            setReceiverOptions(() => newList);
        }
    };

    const AddToList = (opt, isUser) => {
        const list = isUser ? [...userOptions] : [...receiverOptions];
        const obj = { ...opt };
        list.push(obj);
        if (isUser) {
            setUserOptions(() => list);
        } else {
            setReceiverOptions(() => list);
        }
    };

    const ClearOptions = () => {
        setUserOptions(() => []);
        setReceiverOptions(() => []);
    };

    const click = () => {
        const NFLTeamID = userTeam.ID;
        const RecepientTeamID = currentTeam.ID;
        const NFLTeam = userTeam.TeamName + ' ' + userTeam.Mascot;
        const RecepientTeam = currentTeam.TeamName + ' ' + currentTeam.Mascot;
        const tradeOptions = LoadTradeOptions(userOptions, NFLTeamID, false);
        const recepientTradeOptions = LoadTradeOptions(
            receiverOptions,
            RecepientTeamID,
            false
        );

        const modalSentOptions = LoadTradeOptions(userOptions, NFLTeamID, true);
        const modalRecepientTradeOptions = LoadTradeOptions(
            receiverOptions,
            RecepientTeamID,
            true
        );

        const dto = {
            NFLTeamID,
            RecepientTeamID,
            NFLTeam,
            RecepientTeam,
            NFLTeamTradeOptions: tradeOptions,
            RecepientTeamTradeOptions: recepientTradeOptions
        };
        const modalDTO = {
            ...dto,
            NFLTeamTradeOptions: modalSentOptions,
            RecepientTeamTradeOptions: modalRecepientTradeOptions
        };
        setUserOptions(() => []);
        setReceiverOptions(() => []);
        return Propose(dto, modalDTO);
    };

    const SalaryPercentageChange = (name, value, idx, isUser) => {
        const list = isUser ? [...userOptions] : [...receiverOptions];
        let percent = value;
        if (value > 100) percent = 100;
        else if (value < 0) percent = 0;
        list[idx][name] = percent;
        if (isUser) {
            setUserOptions(() => list);
        } else {
            setReceiverOptions(() => list);
        }
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="proposalModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-scrollable modal-xl">
                <div className={modalClass} style={{ minHeight: '530px' }}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="redshirtModalLabel">
                            Propose trade with {currentTeam.TeamName}
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body proposal-body">
                        <div className="row">
                            <CapspaceColumn team={userTeam} ts={ts} />
                            <div className="col-4">
                                <div className="row">
                                    <h3>User Team Players and Picks</h3>
                                </div>
                                <div className="row mt-2">
                                    <TradeDropdown
                                        value="Select a Player or Pick"
                                        list={userList}
                                        click={AddToList}
                                        isUser
                                    />
                                </div>
                                {userOptions.length > 0 &&
                                    userOptions.map((x, idx) => (
                                        <OptionCard
                                            optionType={x.OptionType}
                                            opt={x}
                                            idx={idx}
                                            change={SalaryPercentageChange}
                                            remove={RemoveFromList}
                                            isUser
                                            isProposalModal
                                        />
                                    ))}
                            </div>
                            <div className="col-4">
                                <div className="row">
                                    <h3>Other Team Players and Picks</h3>
                                </div>
                                <div className="row mt-2">
                                    <TradeDropdown
                                        value="Select a Player or Pick"
                                        list={tradableList}
                                        click={AddToList}
                                    />
                                </div>
                                {receiverOptions.length > 0 &&
                                    receiverOptions.map((x, idx) => (
                                        <OptionCard
                                            optionType={x.OptionType}
                                            opt={x}
                                            idx={idx}
                                            remove={RemoveFromList}
                                            change={SalaryPercentageChange}
                                            isProposalModal
                                        />
                                    ))}
                            </div>
                            <CapspaceColumn team={currentTeam} ts={ts} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={ClearOptions}
                        >
                            No
                        </button>
                        <button
                            type="button"
                            className="btn btn-warning"
                            data-bs-dismiss="modal"
                            onClick={click}
                        >
                            Propose
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
