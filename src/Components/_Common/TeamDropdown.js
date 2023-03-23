import React from 'react';
import { DropdownItemObj } from '../Roster/DropdownItem';

export const TeamDropdown = ({
    teams,
    currentTeam,
    clickUserTeam,
    click,
    currentUser,
    isNFL
}) => {
    const teamVal = isNFL ? currentUser.NFLTeam : currentUser.team;
    const teamID = isNFL ? currentUser.NFLTeamID : currentUser.teamId;

    const teamDropDowns =
        teams && teams.length > 0
            ? teams.map((x) => (
                  <DropdownItemObj
                      key={x.ID}
                      value={x.TeamName + ' ' + x.Mascot}
                      team={x}
                      id={x.ID}
                      click={click}
                  />
              ))
            : '';

    return (
        <div className="drop-start btn-dropdown-width-auto">
            <button
                name="team"
                className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <span>{currentTeam && currentTeam.TeamName}</span>
            </button>
            <ul className="dropdown-menu dropdown-content">
                <DropdownItemObj
                    value={teamVal}
                    click={clickUserTeam}
                    id={teamID}
                />
                <hr className="dropdown-divider"></hr>
                {teamDropDowns}
            </ul>
        </div>
    );
};
