import React from 'react';
import { DropdownItemObj } from '../Roster/DropdownItem';

export const TeamDropdown = ({
    teams,
    currentTeam,
    clickUserTeam,
    click,
    currentUser,
    isNFL,
    isNBA
}) => {
    let teamVal = currentUser.team;
    let teamID = currentUser.teamId;

    if (isNFL) {
        teamVal = currentUser.NFLTeam;
        teamID = currentUser.NFLTeamID;
    } else if (isNBA) {
        teamVal = currentUser.NBATeam;
        teamID = currentUser.NBATeamID;
    }
    const teamDropDowns =
        teams && teams.length > 0
            ? teams.map((x) => (
                  <DropdownItemObj
                      key={x.ID}
                      value={
                          isNBA
                              ? `${x.Team} ${x.Nickname}`
                              : `${x.TeamName} ${x.Mascot}`
                      }
                      team={x}
                      id={x.ID}
                      click={click}
                  />
              ))
            : '';
    let currentTeamLabel = '';
    if (isNBA && currentTeam) {
        currentTeamLabel = currentTeam.Team;
    } else if (isNFL && currentTeam) {
        currentTeamLabel = currentTeam.TeamName;
    }

    return (
        <div className="drop-start btn-dropdown-width-auto">
            <button
                name="team"
                className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <span>{currentTeam && currentTeamLabel}</span>
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
