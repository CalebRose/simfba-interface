import React from 'react';

const PlayerDropdownItem = (props) => {
    const { name, click, player } = props;
    const id = player && player.ID ? player.ID : 0;
    const pos = player && player.Position ? player.Position : 'Empty';

    const handleChange = () => {
        return click(player);
    };

    return (
        <li className="clickable" style={{ textAlign: 'left' }}>
            <p
                className="dropdown-item"
                value={name}
                onClick={handleChange}
                id={id}
            >
                {name + ' | ' + player.Position}
            </p>
        </li>
    );
};

export default PlayerDropdownItem;
