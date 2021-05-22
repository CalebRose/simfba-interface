import React from 'react';

const BBATeamDropdownItem = (props) => {
    let team = props.team;

    const handleChange = (event) => {
        console.log(event);
        return props.selectTeam(team);
    };
    return (
        <li>
            <p class="dropdown-item" value={team} onClick={handleChange}>
                {team.Team}
            </p>
        </li>
    );
};

export default BBATeamDropdownItem;
