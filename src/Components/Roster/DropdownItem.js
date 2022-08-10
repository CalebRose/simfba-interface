import React from 'react';

const DropdownItem = (props) => {
    let team = props.team;
    const selectItem = () => {
        if (props.positionSwitch) {
            props.click(props.pos);
        }
    };

    const handleChange = () => {
        return props.click(team);
    };

    return (
        <li className="clickable" style={{ textAlign: 'left' }}>
            <p
                className="dropdown-item"
                value={props.value}
                onClick={props.positionSwitch ? selectItem : handleChange}
                id={props.id}
            >
                {props.value}
            </p>
        </li>
    );
};

export default DropdownItem;
