import React from 'react';

const GameplanInputItem = ({ name, label, value, handleChange, min, max }) => {
    return (
        <div>
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

export default GameplanInputItem;
