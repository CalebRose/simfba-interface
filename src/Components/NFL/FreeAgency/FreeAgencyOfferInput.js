import React from 'react';

export const OfferInput = ({ name, value, change, label }) => {
    return (
        <div className="col">
            <h6>{label}</h6>
            <input
                name={name}
                type="number"
                className="form-control"
                id={name}
                aria-describedby={name}
                value={value}
                onChange={change}
            />
        </div>
    );
};

export const TotalInput = ({ name, value, label }) => (
    <div className="col">
        <h6>{label}</h6>
        <input
            name={name}
            type="number"
            className="form-control"
            id={name}
            aria-describedby={name}
            value={value}
            disabled
        />
    </div>
);
