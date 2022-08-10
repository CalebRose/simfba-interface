import React from 'react';

const DCPositionItem = (props) => {
    const { position } = props;
    const positionLabel = position.name + ' | ' + position.abbr;

    const selectItem = () => {
        props.click(position);
    };
    if (position) {
        return (
            <li className="clickable" style={{ textAlign: 'left' }}>
                <p
                    className="dropdown-item"
                    onClick={selectItem}
                    id={props.id ? props.id : 0}
                >
                    {positionLabel}
                </p>
            </li>
        );
    }
    return '';
};

export default DCPositionItem;
