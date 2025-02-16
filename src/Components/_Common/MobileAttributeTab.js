import React from 'react';
import { Dropdown } from './Dropdown';

export const MobileAttribute = ({ label, value, success }) => {
    return (
        <div className="col-4">
            <p className="card-text">{label}</p>
            <p
                className={`card-text text-body-secondary ${
                    success ? 'text-success' : ''
                }`}
            >
                {value}
            </p>
        </div>
    );
};

export const MobileLabelRow = ({ label, value }) => {
    return (
        <div className="col-12 mb-2">
            <h6 className="card-subtitle">{label}</h6>
            <p className="card-text text-body-secondary">{value}</p>
        </div>
    );
};

export const MobileInputRow = ({ label, name, value, change, disable }) => {
    return (
        <div className="col-12 input-group mt-1 mb-1">
            <span className="input-group-text card-input-text">{label}</span>
            <input
                name={name}
                type="number"
                className="form-control card-input"
                id={name}
                aria-describedby={name}
                value={value}
                onChange={change}
                disabled={disable}
                min="0"
            />
        </div>
    );
};

export const MobileDropdownRow = ({ value, name, click, list }) => {
    return (
        <div className="col-12 input-group mt-1 mb-1">
            <Dropdown value={value} name={name} click={click} list={list} />
        </div>
    );
};
