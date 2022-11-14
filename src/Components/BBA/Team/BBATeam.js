import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BBATeamService from '../../../_Services/simNBA/BBATeamService';
import BBAPlayerService from '../../../_Services/simNBA/BBAPlayerService';

import BBATeamPlayerRow from './BBATeamPlayerRow';
import BBATeamDropdownItem from './BBATeamDropdownItem';
import ConfirmRedshirtModal from '../../Roster/RedshirtModal';

const BBATeam = ({ currentUser, cbb_Timestamp }) => {
    let teamService = new BBATeamService();
    let playerService = new BBAPlayerService();
    const [userTeam, setUserTeam] = React.useState('');
    const [team, setTeam] = React.useState('');
    const [teams, setTeams] = React.useState('');
    const [filteredTeams, setFilteredTeams] = React.useState('');
    const [roster, setRoster] = React.useState([]);
    let redshirtCount =
        roster && roster.length > 0
            ? roster.filter((player) => player.IsRedshirting).length
            : 0;

    useEffect(() => {
        if (currentUser) {
            getTeamRecord(currentUser.cbb_id);
            getTeams();
        }
    }, [currentUser]);

    useEffect(() => {
        if (team) {
            getRosterRecords(team.ID);
        }
    }, [team]);

    const getTeamRecord = async (id) => {
        let response = await teamService.GetTeamByTeamId(id);
        setTeam(response);
        setUserTeam(response);
    };

    const getTeams = async () => {
        let response = await teamService.GetActiveCollegeTeams();
        response = response.filter((x) => x.ID !== currentUser.cbb_id);
        setTeams(response);
        setFilteredTeams(response);
    };

    const getRosterRecords = async (id) => {
        if (id !== null || id > 0) {
            let response = await playerService.GetPlayersByTeam(id);
            // Pad Player Attributes to have Letters instead of numbers
            setRoster(response);
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

    const setRedshirtStatus = async (player) => {
        const PlayerID = player.PlayerID;
        const playerRoster = [...roster];
        const playerIDX = playerRoster.findIndex(
            (x) => x.PlayerID === PlayerID
        );
        playerRoster[playerIDX].IsRedshirting = true;

        const dto = {
            PlayerID: PlayerID,
            RedshirtStatus: true
        };

        const response = await playerService.AssignRedshirt(dto);
        if (!response) return;

        setRoster(() => playerRoster);
    };

    const playerRows = roster ? (
        roster.map((x, i) => {
            return (
                <>
                    <ConfirmRedshirtModal
                        idx={i}
                        setRedshirtStatus={setRedshirtStatus}
                        player={x}
                    />
                    <BBATeamPlayerRow
                        key={x.ID}
                        player={x}
                        idx={i}
                        redshirtCount={redshirtCount}
                        ts={cbb_Timestamp}
                        view={userTeam.ID === team.ID}
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
                <div className="col-md-1" />
                <div className="col-md-11">
                    <div className="row mt-2">
                        <div className="col-md-auto">
                            <h4>{team ? team.Team : ''} Roster</h4>
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
                                    {team ? team.Team : ''}
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
                                            {currentUser.cbb_team}
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
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Height</th>
                                    <th scope="col">Stars</th>
                                    <th scope="col">Overall</th>
                                    <th scope="col">2pt Shooting</th>
                                    <th scope="col">3pt Shooting</th>
                                    <th scope="col">Finishing</th>
                                    <th scope="col">Ballwork</th>
                                    <th scope="col">Rebounding</th>
                                    <th scope="col">Defense</th>
                                    <th scope="col">Stamina</th>
                                    <th scope="col">Potential</th>
                                    <th scope="col">Min. Expectations</th>
                                    <th scope="col">Redshirt Status</th>
                                </tr>
                            </thead>
                            <tbody className="">{playerRows}</tbody>
                        </table>
                    </div>
                </div>
            </div>{' '}
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    timestamp: { cbb_Timestamp }
}) => ({
    currentUser,
    cbb_Timestamp
});

export default connect(mapStateToProps)(BBATeam);
