import React from 'react';

const PlayerDropdownItem = (props) => {
    const { name, click, player } = props;
    const id = player && player.ID ? player.ID : 0;
    const pos = player && player.Position ? player.Position : 'Empty';
    const playerLabel = player.IsInjured
        ? `${name} | ${player.Position} (${player.WeeksOfRecovery})`
        : `${name} | ${player.Position}`;

    const handleChange = () => {
        return click(player);
    };

    return (
        <li className="clickable" style={{ textAlign: 'left' }}>
            <p
                className={`dropdown-item ${player.IsInjured && 'text-danger'}`}
                value={name}
                onClick={handleChange}
                id={id}
            >
                {playerLabel}
            </p>
        </li>
    );
};

export default PlayerDropdownItem;
