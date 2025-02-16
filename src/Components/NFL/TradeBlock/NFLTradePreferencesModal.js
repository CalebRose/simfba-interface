import { saveAs } from 'file-saver';
import React, { useState } from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { Dropdown } from '../../_Common/Dropdown';
import { SwitchToggle } from '../../_Common/SwitchToggle';

export const NFLTradePreferencesModal = ({
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
                                position="Quarterbacks"
                                check={tradePreferences.Quarterbacks}
                                toggle={UpdatePreferences}
                                positionType="QuarterbackType"
                                click={UpdateType}
                                value={tradePreferences.QuarterbackType}
                                list={[
                                    'Any',
                                    'Balanced',
                                    'Pocket',
                                    'Scrambler',
                                    'Field General'
                                ]}
                            />
                            <PositionSection
                                position="Runningbacks"
                                check={tradePreferences.Runningbacks}
                                toggle={UpdatePreferences}
                                positionType="RunningbackType"
                                click={UpdateType}
                                value={tradePreferences.RunningbackType}
                                list={[
                                    'Any',
                                    'Balanced',
                                    'Speed',
                                    'Power',
                                    'Receiving'
                                ]}
                            />
                        </div>
                        <div className="row mb-2">
                            <PositionSection
                                position="Fullbacks"
                                check={tradePreferences.Fullbacks}
                                toggle={UpdatePreferences}
                                positionType="FullbackType"
                                click={UpdateType}
                                value={tradePreferences.FullbackType}
                                list={[
                                    'Any',
                                    'Balanced',
                                    'Blocking',
                                    'Receiving',
                                    'Rushing'
                                ]}
                            />
                            <PositionSection
                                position="WideReceivers"
                                check={tradePreferences.WideReceivers}
                                toggle={UpdatePreferences}
                                positionType="WideReceiverType"
                                click={UpdateType}
                                value={tradePreferences.WideReceiverType}
                                list={[
                                    'Any',
                                    'Possession',
                                    'Red Zone Threat',
                                    'Route Runner',
                                    'Speed'
                                ]}
                            />
                        </div>
                        <div className="row mb-2">
                            <PositionSection
                                position="TightEnds"
                                check={tradePreferences.TightEnds}
                                toggle={UpdatePreferences}
                                positionType="TightEndType"
                                click={UpdateType}
                                value={tradePreferences.TightEndType}
                                list={[
                                    'Any',
                                    'Blocking',
                                    'Receiving',
                                    'Vertical Threat'
                                ]}
                            />
                            <PositionSection
                                position="OffensiveTackles"
                                check={tradePreferences.OffensiveTackles}
                                toggle={UpdatePreferences}
                                positionType="OffensiveTackleType"
                                click={UpdateType}
                                value={tradePreferences.OffensiveTackleType}
                                list={[
                                    'Any',
                                    'Balanced',
                                    'Pass Blocking',
                                    'Run Blocking'
                                ]}
                            />
                        </div>
                        <div className="row mb-2">
                            <PositionSection
                                position="OffensiveGuards"
                                check={tradePreferences.OffensiveGuards}
                                toggle={UpdatePreferences}
                                positionType="OffensiveGuardType"
                                click={UpdateType}
                                value={tradePreferences.OffensiveGuardType}
                                list={[
                                    'Any',
                                    'Balanced',
                                    'Pass Blocking',
                                    'Run Blocking'
                                ]}
                            />
                            <PositionSection
                                position="Centers"
                                check={tradePreferences.Centers}
                                toggle={UpdatePreferences}
                                positionType="CenterType"
                                click={UpdateType}
                                value={tradePreferences.CenterType}
                                list={[
                                    'Any',
                                    'Balanced',
                                    'Line Captain',
                                    'Pass Blocking',
                                    'Run Blocking'
                                ]}
                            />
                        </div>
                        <div className="row mb-2">
                            <PositionSection
                                position="DefensiveEnds"
                                check={tradePreferences.DefensiveEnds}
                                toggle={UpdatePreferences}
                                positionType="DefensiveEndType"
                                click={UpdateType}
                                value={tradePreferences.DefensiveEndType}
                                list={[
                                    'Any',
                                    'Balanced',
                                    'Run Stopper',
                                    'Speed Rusher'
                                ]}
                            />
                            <PositionSection
                                position="DefensiveTackles"
                                check={tradePreferences.DefensiveTackles}
                                toggle={UpdatePreferences}
                                positionType="DefensiveTackleType"
                                click={UpdateType}
                                value={tradePreferences.DefensiveTackleType}
                                list={[
                                    'Any',
                                    'Balanced',
                                    'Nose Tackle',
                                    'Pass Rusher'
                                ]}
                            />
                        </div>
                        <div className="row mb-2">
                            <PositionSection
                                position="InsideLinebackers"
                                check={tradePreferences.InsideLinebackers}
                                toggle={UpdatePreferences}
                                positionType="InsideLinebackerType"
                                click={UpdateType}
                                value={tradePreferences.InsideLinebackerType}
                                list={[
                                    'Any',
                                    'Coverage',
                                    'Field General',
                                    'Run Stopper',
                                    'Speed'
                                ]}
                            />
                            <PositionSection
                                position="OutsideLinebackers"
                                check={tradePreferences.OutsideLinebackers}
                                toggle={UpdatePreferences}
                                positionType="OutsideLinebackerType"
                                click={UpdateType}
                                value={tradePreferences.OutsideLinebackerType}
                                list={[
                                    'Any',
                                    'Coverage',
                                    'Pass Rush',
                                    'Run Stopper',
                                    'Speed'
                                ]}
                            />
                        </div>
                        <div className="row mb-2">
                            <PositionSection
                                position="Cornerbacks"
                                check={tradePreferences.Cornerbacks}
                                toggle={UpdatePreferences}
                                positionType="CornerbackType"
                                click={UpdateType}
                                value={tradePreferences.CornerbackType}
                                list={[
                                    'Any',
                                    'Ball Hawk',
                                    'Man Coverage',
                                    'Zone Coverage'
                                ]}
                            />
                            <PositionSection
                                position="FreeSafeties"
                                check={tradePreferences.FreeSafeties}
                                toggle={UpdatePreferences}
                                positionType="FreeSafetyType"
                                click={UpdateType}
                                value={tradePreferences.FreeSafetyType}
                                list={[
                                    'Any',
                                    'Ball Hawk',
                                    'Man Coverage',
                                    'Run Stopper',
                                    'Zone Coverage'
                                ]}
                            />
                        </div>
                        <div className="row mb-2">
                            <PositionSection
                                position="StrongSafeties"
                                check={tradePreferences.StrongSafeties}
                                toggle={UpdatePreferences}
                                positionType="StrongSafetyType"
                                click={UpdateType}
                                value={tradePreferences.StrongSafetyType}
                                list={[
                                    'Any',
                                    'Ball Hawk',
                                    'Man Coverage',
                                    'Run Stopper',
                                    'Zone Coverage'
                                ]}
                            />{' '}
                            <PositionSection
                                position="Kickers"
                                check={tradePreferences.Kickers}
                                toggle={UpdatePreferences}
                                positionType="KickerType"
                                click={UpdateType}
                                value={tradePreferences.KickerType}
                                list={['Any', 'Accuracy', 'Balanced', 'Power']}
                            />
                        </div>
                        <div className="row mb-2">
                            <PositionSection
                                position="Punters"
                                check={tradePreferences.Punters}
                                toggle={UpdatePreferences}
                                positionType="PunterType"
                                click={UpdateType}
                                value={tradePreferences.PunterType}
                                list={['Any', 'Accuracy', 'Balanced', 'Power']}
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
