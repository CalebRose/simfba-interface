import React, { useState } from 'react';
import { GetModalClass } from '../../../../Constants/CSSClassHelper';
import { GetOptionList } from '../../../NFL/TradeBlock/TradeBlockHelper';
import { GetNBACapSpace } from '../../../NFL/FreeAgency/FreeAgencyHelper';
import { Dropdown, TradeDropdown } from '../../../_Common/Dropdown';
import { NumberInput } from '../../../_Common/Input';
import { SwitchToggle } from '../../../_Common/SwitchToggle';
import { NBACapsheetRow } from '../Sidebar/NBASidebar';

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
    const y1Space = GetNBACapSpace(
        Y1Capspace,
        capsheet.Year1Total,
        capsheet.Year1Cap
    );
    const y2Space = GetNBACapSpace(
        Y2Capspace,
        capsheet.Year2Total,
        capsheet.Year2Cap
    );
    const y3Space = GetNBACapSpace(
        Y3Capspace,
        capsheet.Year3Total,
        capsheet.Year3Cap
    );
    const y4Space = GetNBACapSpace(
        Y4Capspace,
        capsheet.Year4Total,
        capsheet.Year3Cap
    );
    const y5Space = GetNBACapSpace(
        Y5Capspace,
        capsheet.Year5Total,
        capsheet.Year5Cap
    );

    return (
        <div className="col-2">
            <div className="row mb-1 pe-2">
                <h3>{team.Team} Cap Space</h3>
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
            <NBACapsheetRow
                year={Season}
                bonus={capsheet.Year1Total}
                space={y1Space}
            />
            <NBACapsheetRow
                year={Season + 1}
                bonus={capsheet.Year2Total}
                space={y2Space}
            />
            <NBACapsheetRow
                year={Season + 2}
                bonus={capsheet.Year3Total}
                space={y3Space}
            />
            <NBACapsheetRow
                year={Season + 3}
                bonus={capsheet.Year4Total}
                space={y4Space}
            />
            <NBACapsheetRow
                year={Season + 4}
                bonus={capsheet.Year5Total}
                space={y5Space}
            />
        </div>
    );
};

export const NBAOptionCard = ({
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
                <p className="card-text mb-0">Overall: {opt.Overall}</p>
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
                            {RoundToTwoDecimals(opt.Contract.Year1Total)}
                        </p>
                    </div>
                    <div className="col">
                        <p className="card-text mb-0">
                            Year 2:{' '}
                            {RoundToTwoDecimals(opt.Contract.Year2Total)}
                        </p>
                    </div>
                    <div className="col">
                        <p className="card-text mb-0">
                            Year 3:{' '}
                            {RoundToTwoDecimals(opt.Contract.Year3Total)}
                        </p>
                    </div>
                    <div className="col">
                        <p className="card-text mb-0">
                            Year 4:{' '}
                            {RoundToTwoDecimals(opt.Contract.Year4Total)}
                        </p>
                    </div>
                    <div className="col">
                        <p className="card-text mb-0">
                            Year 5:{' '}
                            {RoundToTwoDecimals(opt.Contract.Year5Total)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export const NBATradeProposalModal = ({
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
        const NBATeamID = userTeam.ID;
        const RecepientTeamID = currentTeam.ID;
        const NBATeam = userTeam.Team + ' ' + userTeam.Nickname;
        const RecepientTeam = currentTeam.Team + ' ' + currentTeam.Nickname;
        const tradeOptions = LoadTradeOptions(userOptions, NBATeamID, false);
        const recepientTradeOptions = LoadTradeOptions(
            receiverOptions,
            RecepientTeamID,
            false
        );

        const modalSentOptions = LoadTradeOptions(userOptions, NBATeamID, true);
        const modalRecepientTradeOptions = LoadTradeOptions(
            receiverOptions,
            RecepientTeamID,
            true
        );

        const dto = {
            NBATeamID: NBATeamID,
            RecepientTeamID,
            NBATeam: NBATeam,
            RecepientTeam,
            NBATeamTradeOptions: tradeOptions,
            RecepientTeamTradeOptions: recepientTradeOptions
        };
        const modalDTO = {
            ...dto,
            NBATeamTradeOptions: modalSentOptions,
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
                            Propose trade with {currentTeam.Team}
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
                                        <NBAOptionCard
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
                                        <NBAOptionCard
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

export const NBATradePreferencesModal = ({
    tp,
    theme,
    saveTradePreferences
}) => {
    const [tradePreferences, setTradePreferences] = useState(() => {
        return { ...tp };
    });
    const modalId = `tradePreferencesModal`;
    const modalClass = GetModalClass(theme);

    const UpdatePreferences = (event) => {
        const { value } = event.target;
        const pref = { ...tradePreferences };
        pref[value] = !pref[value];
        setTradePreferences(() => pref);
    };

    const UpdateType = (name, value) => {
        const pref = { ...tradePreferences };
        pref[name] = value;
        setTradePreferences(() => pref);
    };

    const Save = () => {
        return saveTradePreferences(tradePreferences);
    };

    const PositionSection = ({
        position,
        check,
        toggle,
        click,
        value,
        positionType,
        list
    }) => {
        return (
            <>
                <div className="col-3">
                    <SwitchToggle
                        value={position}
                        checkValue={check}
                        change={toggle}
                    />
                </div>
                <div className="col-3">
                    <Dropdown
                        name={positionType}
                        click={click}
                        value={value}
                        list={list}
                        id={position}
                    />
                </div>
            </>
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
                            Update Trade Preferences
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
                            <PositionSection
                                position="PointGuards"
                                check={tradePreferences.PointGuards}
                                toggle={UpdatePreferences}
                                positionType="PointGuardType"
                                click={UpdateType}
                                value={tradePreferences.PointGuardType}
                                list={[
                                    'Any',
                                    'Floor General',
                                    'Sharpshooter',
                                    'Slasher',
                                    '3-and-D',
                                    'All-Around'
                                ]}
                            />
                            <PositionSection
                                position="PowerForwards"
                                check={tradePreferences.PowerForwards}
                                toggle={UpdatePreferences}
                                positionType="PowerForwardType"
                                click={UpdateType}
                                value={tradePreferences.PowerForwardType}
                                list={[
                                    'Any',
                                    'Point Forward',
                                    'Two-Way Wing',
                                    'Traditional Forward',
                                    'All-Around'
                                ]}
                            />
                        </div>
                        <div className="row mb-2">
                            <PositionSection
                                position="ShootingGuards"
                                check={tradePreferences.ShootingGuards}
                                toggle={UpdatePreferences}
                                positionType="ShootingGuardType"
                                click={UpdateType}
                                value={tradePreferences.ShootingGuardType}
                                list={[
                                    'Any',
                                    'Floor General',
                                    'Pure Defender',
                                    'Sharpshooter',
                                    'Slasher',
                                    'Finisher',
                                    'Swingman',
                                    '3-and-D',
                                    'All-Around'
                                ]}
                            />
                            <PositionSection
                                position="SmallForwards"
                                check={tradePreferences.SmallForwards}
                                toggle={UpdatePreferences}
                                positionType="SmallForwardType"
                                click={UpdateType}
                                value={tradePreferences.SmallForwardType}
                                list={[
                                    'Any',
                                    'Point Forward',
                                    'Pure Defender',
                                    'Slasher',
                                    'Swingman',
                                    'Two-Way Wing',
                                    'All-Around'
                                ]}
                            />
                        </div>
                        <div className="row mb-2">
                            <PositionSection
                                position="Centers"
                                check={tradePreferences.Centers}
                                toggle={UpdatePreferences}
                                positionType="CenterType"
                                click={UpdateType}
                                value={tradePreferences.CenterType}
                                list={[
                                    'Any',
                                    'Rim Protector',
                                    'Stretch Bigs',
                                    'Lob Threat',
                                    'All-Around'
                                ]}
                            />
                            <PositionSection
                                position="DraftPicks"
                                check={tradePreferences.DraftPicks}
                                toggle={UpdatePreferences}
                                positionType="DraftPickType"
                                click={UpdateType}
                                value={tradePreferences.DraftPickType}
                                list={[
                                    'Any',
                                    'Early Round',
                                    'Mid-Round',
                                    'Late Round'
                                ]}
                            />
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
                            className="btn btn-warning"
                            data-bs-dismiss="modal"
                            onClick={Save}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
