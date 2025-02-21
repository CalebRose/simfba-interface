import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ConfirmModal } from '../../_Common/ModalComponents';
import { FBAToggle } from '../../_Common/SwitchToggle';
import {
    DefensiveSchemeOptions,
    OffensiveSchemeOptions
} from '../../Gameplan/GameplanConstants';
import { SchemeDropdown } from '../../Gameplan/GameplanCommons';
import { GameplanInputItem } from '../../Gameplan/GameplanInputItem';

export const CFBRecruitingAIConfigModal = ({
    recruitingProfile,
    teamColors,
    Save
}) => {
    const [configBoard, setConfigBoard] = useState(recruitingProfile);
    const [isValid, setValid] = useState(false);

    useEffect(() => {
        if (configBoard) {
            HandleValidation();
        }
    }, [configBoard]);
    const HandleTextChange = (name, value) => {
        let rp = { ...configBoard };

        if (value === 'Yes') {
            rp[name] = true;
        } else if (value === 'No') {
            rp[name] = false;
        } else {
            rp[name] = value;
        }
        setConfigBoard(() => rp);
    };

    const HandleToggleChange = (event) => {
        const { value } = event.target;
        let rp = { ...configBoard };
        rp[value] = !rp[value];

        setConfigBoard(() => rp);
    };

    const HandleNumberChange = (event) => {
        let rp = { ...configBoard };
        let { name, value } = event.target;
        let num = Number(value);
        if (num < 0) {
            num = 0;
        }
        rp[name] = num;

        // If Value IS NOT a Number...
        setConfigBoard(() => rp);
    };

    const HandleValidation = () => {
        const rp = { ...configBoard };

        if (rp.AIStarMax > 5) {
            const message = `Error! Maximum star rating cannot be greater than five. Please lower the number.`;
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 6000 }
            );
            setValid(() => false);
            return;
        }

        if (rp.AIStarMin < 1) {
            const message = `Error! Minimum star rating cannot be less than one. If you want walkons, just don't recruit. Otherwise, please raise the number.`;
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 6000 }
            );
            setValid(() => false);
            return;
        }

        if (rp.AIMaxThreshold > 20) {
            const message = `Error! Maximum point value cannot be greater than twenty. Please lower the number.`;
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 6000 }
            );
            setValid(() => false);
            return;
        }

        if (rp.AIMinThreshold < 1) {
            const message = `Error! Minimum point value cannot be less than one. Please raise the number.`;
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 6000 }
            );
            setValid(() => false);
            return;
        }

        const starDif = rp.AIStarMax - rp.AIStarMin;
        if (starDif <= 1) {
            setValid(() => false);
            const message = `Error! Difference between the star maximum and star minimum is less than 2. Please make sure to have the difference be at least two.`;
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 6000 }
            );
            setValid(() => false);
            return;
        }

        const pointDif = rp.AIMaxThreshold - rp.AIMinThreshold;
        if (pointDif < 5) {
            const message = `Error! The point differential between the maximum and minimum must be by at least five points. Please adjust accordingly.`;
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 6000 }
            );
            setValid(() => false);
            return;
        }

        if (rp.OffensiveScheme.length === 0) {
            const message = `Error! Please select an Offensive Scheme from the dropdown.`;
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 6000 }
            );
            setValid(() => false);
            return;
        }

        if (rp.DefensiveScheme.length === 0) {
            const message = `Error! Please select a Defensive Scheme from the dropdown.`;
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 6000 }
            );
            setValid(() => false);
            return;
        }

        setValid(() => true);
    };

    const confirm = () => {
        return Save(configBoard);
    };

    return (
        <div
            className="modal fade"
            id="recruitingAIModal"
            tabIndex="-1"
            aria-labelledby="saveRecruitingBoardModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="confirmModalLabel">
                            Recruiting AI Configuration Settings
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {configBoard && (
                            <>
                                <div className="row mb-2 justify-content-center">
                                    <div className="col-auto ps-3 me-2">
                                        <FBAToggle
                                            label="AI Active"
                                            value="IsAI"
                                            checkValue={
                                                configBoard
                                                    ? configBoard.IsAI
                                                    : false
                                            }
                                            change={HandleToggleChange}
                                        />
                                    </div>
                                    <div className="col-auto ps-3 me-2">
                                        <FBAToggle
                                            label="Automatically Offer Scholarships"
                                            value="AIAutoOfferscholarships"
                                            checkValue={
                                                configBoard
                                                    ? configBoard.AIAutoOfferscholarships
                                                    : false
                                            }
                                            change={HandleToggleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2 justify-content-center">
                                    <div className="col-auto">
                                        <h6>Offensive Scheme</h6>
                                        <SchemeDropdown
                                            teamColors={teamColors}
                                            scheme={configBoard.OffensiveScheme}
                                            name="OffensiveScheme"
                                            options={OffensiveSchemeOptions}
                                            HandleTextChange={HandleTextChange}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <h6>Defensive Scheme</h6>
                                        <SchemeDropdown
                                            teamColors={teamColors}
                                            scheme={configBoard.DefensiveScheme}
                                            name="DefensiveScheme"
                                            options={DefensiveSchemeOptions}
                                            HandleTextChange={HandleTextChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3 justify-content-center">
                                    <div className="col-auto">
                                        <GameplanInputItem
                                            name="AIStarMin"
                                            label="Star Minimum"
                                            value={
                                                configBoard &&
                                                configBoard.AIStarMin
                                            }
                                            min={'1'}
                                            max={'5'}
                                            handleChange={HandleNumberChange}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <GameplanInputItem
                                            name="AIStarMax"
                                            label="Star Maximum"
                                            value={
                                                configBoard &&
                                                configBoard.AIStarMax
                                            }
                                            min={'1'}
                                            max={'20'}
                                            handleChange={HandleNumberChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2 justify-content-center">
                                    <div className="col-auto">
                                        <GameplanInputItem
                                            name="AIMinThreshold"
                                            label="Point Minimum"
                                            value={
                                                configBoard &&
                                                configBoard.AIMinThreshold
                                            }
                                            min={'1'}
                                            max={'5'}
                                            handleChange={HandleNumberChange}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <GameplanInputItem
                                            name="AIMaxThreshold"
                                            label="Point Maximum"
                                            value={
                                                configBoard &&
                                                configBoard.AIMaxThreshold
                                            }
                                            min={'1'}
                                            max={'20'}
                                            handleChange={HandleNumberChange}
                                        />
                                    </div>
                                </div>
                            </>
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
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            disabled={!isValid}
                            onClick={() => confirm()}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
