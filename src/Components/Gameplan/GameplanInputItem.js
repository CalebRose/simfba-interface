import React from 'react';
import { GetOverall } from '../../_Utility/RosterHelper';
import { TargetDepthLabel, WRRunnerList } from './GameplanConstants';

export const GameplanInputItem = ({
    name,
    label,
    value,
    handleChange,
    min,
    max
}) => {
    return (
        <div className="w-33">
            <h6>{label}</h6>
            <input
                name={name}
                type="number"
                className="form-control"
                id={name}
                aria-describedby={name}
                onChange={handleChange}
                min={min}
                max={max}
                value={value}
            />
        </div>
    );
};

export const GameplanInputSm = ({
    name,
    label,
    value,
    handleChange,
    isDefault
}) => {
    return (
        <div className="input-group input-group-sm mb-3">
            <span
                className="input-group-text text-small"
                id="inputGroup-sizing-sm"
            >
                {label}
            </span>
            <input
                name={name}
                type="number"
                className="form-control"
                id={name}
                value={value}
                onChange={handleChange}
                aria-label="Sizing example input"
                aria-describedby={name}
                disabled={isDefault}
            />
        </div>
    );
};

export const RunInput = ({
    name,
    label,
    value,
    isNFL,
    handleChange,
    isDefault,
    dc
}) => {
    const positionLabel = label === 'QB' ? 'QB1' : label;
    const position = positionLabel.slice(0, 2);
    const level = positionLabel.slice(2);
    const depthChartPosition = dc.find(
        (x) => x.Position === position && x.PositionLevel === level
    );

    const { CollegePlayer, NFLPlayer } = depthChartPosition;
    const { FirstName, LastName, Position, Archetype, Overall, Year } = !isNFL
        ? CollegePlayer
        : NFLPlayer;
    const overallGrade = GetOverall(Overall, Year);
    let archLabel = '';
    if (Archetype === 'Possession') archLabel = 'Poss.';
    else if (Archetype === 'Red Zone Threat') archLabel = 'RZ. Threat';
    else if (Archetype === 'Vertical Threat') archLabel = 'V. Threat';
    else if (Archetype === 'Scrambler') archLabel = 'Scramb.';
    else if (Archetype === 'Receiving') archLabel = 'Rec.';
    else {
        archLabel = Archetype;
    }
    const nameLabel = `${archLabel} ${Position} ${FirstName} ${LastName} | ${overallGrade}`;
    return (
        <div className="input-group input-group-sm mb-3">
            <span
                className="input-group-text text-small"
                id="inputGroup-sizing-sm"
            >
                {nameLabel}
            </span>
            <input
                name={name}
                type="number"
                className="form-control"
                id={name}
                value={value}
                onChange={handleChange}
                aria-label="Sizing example input"
                aria-describedby={name}
                disabled={isDefault}
            />
        </div>
    );
};

export const TargetInput = ({
    name,
    label,
    value,
    handleChange,
    handleClick,
    targetDepth,
    isDefault,
    isNFL,
    dc
}) => {
    const position = label.slice(0, 2);
    const level = label.slice(2);
    const depthChartPosition = dc.find(
        (x) => x.Position === position && x.PositionLevel === level
    );
    const { CollegePlayer, NFLPlayer } = depthChartPosition;
    const { FirstName, LastName, Position, Archetype, Overall, Year } = !isNFL
        ? CollegePlayer
        : NFLPlayer;
    const overallGrade = GetOverall(Overall, Year);
    let archLabel = '';
    if (Archetype === 'Possession') archLabel = 'Poss.';
    else if (Archetype === 'Red Zone Threat') archLabel = 'RZT.';
    else if (Archetype === 'Vertical Threat') archLabel = 'VT.';
    else if (Archetype === 'Scrambler') archLabel = 'Scr.';
    else if (Archetype === 'Receiving') archLabel = 'Rec.';
    else if (Archetype === 'Speed') archLabel = 'Spd.';
    else if (Archetype === 'Rushing') archLabel = 'Rsh.';
    else if (Archetype === 'Blocking') archLabel = 'Blk.';
    else {
        archLabel = Archetype;
    }
    const nameLabel = `${archLabel} ${Position} ${FirstName} ${LastName} | ${overallGrade}`;
    const isTargetDist = name !== 'RunnerDistributionWR';
    const list = isTargetDist ? TargetDepthLabel : WRRunnerList;
    return (
        <div className="input-group input-group-sm mb-3">
            <span
                className="input-group-text text-tiny"
                id="inputGroup-sizing-sm"
            >
                {nameLabel}
            </span>
            <input
                name={name}
                type="number"
                className="form-control"
                id={name}
                value={value}
                onChange={handleChange}
                aria-label=""
                aria-describedby={name}
                disabled={isDefault}
            />
            <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle={`dropdown`}
                aria-expanded="false"
            >
                {targetDepth}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                {list.map((x) => {
                    const click = () => {
                        const name = isTargetDist
                            ? `TargetDepth${label}`
                            : 'RunnerDistributionWRPosition';
                        return handleClick(name, x);
                    };
                    return (
                        <li>
                            <p
                                className="dropdown-item"
                                value={x}
                                onClick={click}
                            >
                                {x}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
