import React from 'react';

export const NumberInput = ({ name, value, change }) => {
    return (
        <input
            name={name}
            type="number"
            className="form-control"
            id={name}
            aria-describedby={name}
            value={value}
            onChange={change}
        />
    );
};
