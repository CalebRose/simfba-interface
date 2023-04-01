import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GetTableHoverClass } from '../../../../Constants/CSSClassHelper';
import BBAPlayerService from '../../../../_Services/simNBA/BBAPlayerService';
import BBATeamService from '../../../../_Services/simNBA/BBATeamService';
import BBATeamDropdownItem from '../../Team/BBATeamDropdownItem';
import { NBASidebar } from '../Sidebar/NBASidebar';
import NBATeamPlayerRow from './NBATeamPlayerRow';

const NBARosterPage = ({ currentUser, cbb_Timestamp, viewMode }) => {
    let _teamService = new BBATeamService();
    let _playerService = new BBAPlayerService();
    const [userTeam, setUserTeam] = React.useState('');
    const [team, setTeam] = React.useState('');
    const [teams, setTeams] = React.useState('');
    const [filteredTeams, setFilteredTeams] = React.useState('');
    const [roster, setRoster] = React.useState([]);
    const tableHoverClass = GetTableHoverClass(viewMode);

    useEffect(() => {
        if (currentUser) {
            getTeamRecord(currentUser.NBATeamID);
            getTeams();
        }
    }, [currentUser]);

    useEffect(() => {
        if (team) {
            getRosterRecords(team.ID);
        }
    }, [team]);

    const getTeamRecord = async (id) => {
        let response = await _teamService.GetNBATeamByTeamID(id);
        setTeam(() => response);
        setUserTeam(() => response);
    };

    const getTeams = async () => {
        let response = await _teamService.GetNBATeams();
        response = response.filter((x) => x.ID !== currentUser.NBATeamID);
        setTeams(() => response);
        setFilteredTeams(() => response);
    };

    const getRosterRecords = async (id) => {
        if (id !== null || id > 0) {
            let response = await _playerService.GetNBARosterByTeamID(id);
            // Pad Player Attributes to have Letters instead of numbers
            setRoster(() => response);
        }
    };

    const selectTeam = (team) => {
        let teamsList = [...teams];
        teamsList = teamsList.filter((x) => x.ID !== team.ID);
        setTeam(team);
        setFilteredTeams(teamsList);
    };

    const selectUserTeam = () => {
        selectTeam(userTeam);
    };

    const CutPlayerFromRoster = () => {};

    const ExtendPlayer = () => {};

    const PlacePlayerOnTradeBlock = () => {};

    const SetToGLeague = () => {};

    const SetToTwoWay = () => {};

    const playerRows = roster ? (
        roster.map((x, i) => {
            return (
                <>
                    <NBATeamPlayerRow
                        key={x.ID}
                        player={x}
                        idx={i}
                        ts={cbb_Timestamp}
                        view={userTeam.ID === team.ID}
                        theme={viewMode}
                        cut={CutPlayerFromRoster}
                        extend={ExtendPlayer}
                        tradeblock={PlacePlayerOnTradeBlock}
                        setToGLeague={SetToGLeague}
                        setToTwoWay={SetToTwoWay}
                    />
                </>
            );
        })
    ) : (
        <tr>Attempting to load players...</tr>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                {team && cbb_Timestamp && (
                    <NBASidebar
                        team={team}
                        ts={cbb_Timestamp}
                        isRoster={true}
                    />
                )}
                <div className="col-md-10">
                    <div className="row mt-2">
                        <div className="col-md-auto">
                            <h4>{team && team.Team} Roster</h4>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-auto">
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {team && team.Team}
                                </button>
                                <ul
                                    className="dropdown-menu dropdown-content"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    <li>
                                        <p
                                            className="dropdown-item"
                                            value={userTeam}
                                            onClick={selectUserTeam}
                                        >
                                            {currentUser.NBATeam}
                                        </p>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    {filteredTeams
                                        ? filteredTeams.map((x) => (
                                              <BBATeamDropdownItem
                                                  key={x.ID}
                                                  selectTeam={selectTeam}
                                                  team={x}
                                              />
                                          ))
                                        : ''}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 mb-5">
                        <table className={tableHoverClass}>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Age | Exp</th>
                                    <th scope="col">Overall</th>
                                    <th scope="col">2pt Shooting</th>
                                    <th scope="col">3pt Shooting</th>
                                    <th scope="col">Free Throw</th>
                                    <th scope="col">Finishing</th>
                                    <th scope="col">Ballwork</th>
                                    <th scope="col">Rebounding</th>
                                    <th scope="col">Int. Defense</th>
                                    <th scope="col">Per. Defense</th>
                                    <th scope="col">Stamina</th>
                                    <th scope="col">Potential</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="">{playerRows}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    timestamp: { cbb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    cbb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(NBARosterPage);
