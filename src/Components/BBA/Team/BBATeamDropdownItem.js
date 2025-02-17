import React from 'react';

const BBATeamDropdownItem = (props) => {
    let { team } = props;

    const handleChange = (event) => {
        return props.selectTeam(team);
    };
    return (
        <li>
            <p className="dropdown-item" value={team} onClick={handleChange}>
                {team.Team}
            </p>
        </li>
    );
};

export default BBATeamDropdownItem;
