import React from 'react';

const GameplanDropdownItem = ({ name, value, handleChange }) => {
    const updateSchemeOption = () => {
        return handleChange({ name: name, value: value });
    };

    return (
        <li>
            <p
                className="dropdown-item"
                name={name}
                value={value}
                onClick={updateSchemeOption}
            >
                {value}
            </p>
        </li>
    );
};

export default GameplanDropdownItem;
