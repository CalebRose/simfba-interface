import React from 'react';

const DropdownSingularItem = (props) => {
    const { value, theme } = props;
    const dropdownLabel = value;

    const selectItem = () => {
        props.click(value);
    };

    if (value) {
        return (
            <li className="clickable" style={{ textAlign: 'left' }}>
                <p
                    className="dropdown-item"
                    onClick={selectItem}
                    id={props.id ? props.id : 0}
                    style={{ color: theme === 'dark' ? '#202020' : 'white' }}
                >
                    {dropdownLabel}
                </p>
            </li>
        );
    }
    return '';
};

export default DropdownSingularItem;
