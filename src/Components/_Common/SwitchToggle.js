import React from 'react';

export const SwitchToggle = ({ value, change, checkValue }) => {
    const label = value.replace(/([A-Z])/g, ' $1').trim();
    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                value={value}
                checked={checkValue}
                onChange={change}
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
                {label}
            </label>
        </div>
    );
};

export const BBAToggle = ({ value, label, change, checkValue }) => (
    <div className="col ps-3 me-2">
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                value={value}
                checked={checkValue}
                onChange={change}
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
                {label}
            </label>
        </div>
    </div>
);
