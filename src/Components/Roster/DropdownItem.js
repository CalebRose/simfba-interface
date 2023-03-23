import React from 'react';

export const DropdownItemObj = ({
    id,
    team,
    value,
    positionSwitch,
    pos,
    click
}) => {
    const selectItem = () => {
        if (positionSwitch) {
            click(pos);
        }
    };

    const handleChange = () => {
        return click(team);
    };

    return (
        <li className="clickable" style={{ textAlign: 'left' }}>
            <p
                className="dropdown-item"
                value={value}
                onClick={positionSwitch ? selectItem : handleChange}
                id={id}
            >
                {value}
            </p>
        </li>
    );
};
