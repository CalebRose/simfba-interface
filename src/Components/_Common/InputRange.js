import React from 'react';

export const InputRange = ({ id, name, value, change, label }) => {
    return (
        <>
            <label for={id} className="form-label">
                {label}: {value}
            </label>
            <input
                type="range"
                className="form-range"
                id={id}
                name={name}
                value={value}
                onChange={change}
            />
        </>
    );
};

export const MinMaxRange = ({ id, name, value, change, label, min, max }) => {
    return (
        <>
            <label for={id} className="form-label">
                {label}: {value}
            </label>
            <input
                type="range"
                className="form-range"
                id={id}
                name={name}
                value={value}
                onChange={change}
                min={min}
                max={max}
            />
        </>
    );
};
