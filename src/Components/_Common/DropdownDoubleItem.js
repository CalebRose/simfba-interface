import React from 'react';

const DropdownDoubleItem = (props) => {
    const { item } = props;
    const itemLabel = item.name + ' | ' + item.abbr;

    const selectItem = () => {
        props.click(item);
    };
    if (item) {
        return (
            <li className="clickable" style={{ textAlign: 'left' }}>
                <p
                    className="dropdown-item"
                    onClick={selectItem}
                    id={props.id ? props.id : 0}
                >
                    {itemLabel}
                </p>
            </li>
        );
    }
    return '';
};

export default DropdownDoubleItem;
