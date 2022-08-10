import React from 'react';

const PlayerDropdownItem = (props) => {
    const { name, click, player } = props;

    const handleChange = () => {
        return click(player);
    };

    return (
        <li className="clickable" style={{ textAlign: 'left' }}>
            <p
                className="dropdown-item"
                value={name}
                onClick={handleChange}
                id={player.ID}
            >
                {name + ' | ' + player.Position}
            </p>
        </li>
    );
};

export default PlayerDropdownItem;
