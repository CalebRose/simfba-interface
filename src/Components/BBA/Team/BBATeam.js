import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BBATeamService from '../../../_Services/simNBA/BBATeamService';
import BBAPlayerService from '../../../_Services/simNBA/BBAPlayerService';
import toast from 'react-hot-toast';
import BBATeamPlayerRow from './BBATeamPlayerRow';
import BBATeamDropdownItem from './BBATeamDropdownItem';
import ConfirmRedshirtModal from '../../Roster/RedshirtModal';
import { GetTableHoverClass } from '../../../Constants/CSSClassHelper';
import { PromisePlayerModal } from '../../_Common/ModalComponents';
import { PortalService } from '../../../_Services/simFBA/FBAPortalService';

const BBATeam = ({ currentUser, cbb_Timestamp, viewMode }) => {
    let _teamService = new BBATeamService();
    let _playerService = new BBAPlayerService();
    const _portalService = new PortalService();
    const [userTeam, setUserTeam] = useState('');
    const [team, setTeam] = useState('');
    const [teams, setTeams] = useState('');
    const [filteredTeams, setFilteredTeams] = useState('');
    const [roster, setRoster] = useState([]);
    const [promisePlayer, setPromisePlayer] = useState(null);
    const tableHoverClass = GetTableHoverClass(viewMode);
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
        let response = await _teamService.GetTeamByTeamId(id);
        setTeam(response);
        setUserTeam(response);
    };

    const getTeams = async () => {
        let response = await _teamService.GetActiveCollegeTeams();
        response = response.filter((x) => x.ID !== currentUser.cbb_id);
        setTeams(response);
        setFilteredTeams(response);
    };

    const getRosterRecords = async (id) => {
        if (id !== null || id > 0) {
            let response = await _playerService.GetPlayersByTeam(id);
            // Pad Player Attributes to have Letters instead of numbers
            setRoster(response);
        }
    };

    const selectTeam = (team) => {
        let teamsList = [...teams];
        teamsList = teamsList.filter((x) => x.ID !== team.ID);
        setTeam(() => team);
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

        const response = await _playerService.AssignRedshirt(dto);
        if (!response) return;

        setRoster(() => playerRoster);
    };

    const setPromisePlayerForModal = (id) => {
        const r = [...roster];
        const playerIdx = r.findIndex((x) => x.PlayerID === id);
        if (playerIdx > -1) {
            const pl = r[playerIdx];
            setPromisePlayer(() => pl);
        }
    };

    const MakePromise = (dto) => {
        toast.promise(submitPromise(dto), {
            loading: 'Committing promise...',
            success: 'Promise Created',
            error: 'Error! Promise could not properly be created. Please reach out to Tuscan for assistance.'
        });
    };

    const submitPromise = async (dto) => {
        const res = await _portalService.CreatePromise(false, dto);
    };

    const exportRoster = async () => {
        // Removing if-check on if team is the user's...
        let response = _playerService.ExportRoster(team.ID, team.Team);
    };

    const playerRows = roster ? (
        roster.map((x, i) => {
            return (
                <>
                    <ConfirmRedshirtModal
                        idx={i}
                        setRedshirtStatus={setRedshirtStatus}
                        player={x}
                        viewMode={viewMode}
                    />
                    <BBATeamPlayerRow
                        key={x.ID}
                        player={x}
                        idx={i}
                        redshirtCount={redshirtCount}
                        ts={cbb_Timestamp}
                        view={userTeam.ID === team.ID}
                        setPromisePlayer={setPromisePlayerForModal}
                    />
                </>
            );
        })
    ) : (
        <tr>Attempting to load players...</tr>
    );

    return (
        <div className="container-fluid">
            <div className="row mb-2 mt-2">
                <div className="col-md-2">
                    <h4>{team && team.Team}</h4>
                </div>
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
                <div className="col-md-auto">
                    <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={exportRoster}
                    >
                        Export
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                    {team && (
                        <>
                            <div className="row mb-1">
                                <h5>
                                    Coach:{' '}
                                    {team.Coach.length > 0 ? team.Coach : 'AI'}
                                </h5>
                            </div>
                            <div className="row mb-1">
                                <h5>Conference: {team.Conference}</h5>
                            </div>
                            <div className="row mb-1">
                                <h5>Arena: {team.Arena}</h5>
                            </div>
                            <div className="row mb-1">
                                <h5>
                                    {team.City}, {team.State}
                                </h5>
                            </div>
                            <div className="row mb-1">
                                <h5>Grades</h5>
                                <div className="col-4">
                                    <h6>Overall</h6>
                                    <p>{team.OverallGrade}</p>
                                </div>
                                <div className="col-4">
                                    <h6>Offense</h6>
                                    <p>{team.OffenseGrade}</p>
                                </div>
                                <div className="col-4">
                                    <h6>Defense</h6>
                                    <p>{team.DefenseGrade}</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="col-md-10">
                    <PromisePlayerModal
                        promisePlayer={promisePlayer}
                        submit={MakePromise}
                        teams={teams}
                        seasonID={cbb_Timestamp.SeasonID}
                    />
                    <div className="row mb-5">
                        <table className={tableHoverClass}>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Height</th>
                                    <th scope="col">Stars</th>
                                    <th scope="col">Overall</th>
                                    <th scope="col">Finishing</th>
                                    <th scope="col">2pt Shooting</th>
                                    <th scope="col">3pt Shooting</th>
                                    <th scope="col">Free Throw</th>
                                    <th scope="col">Ballwork</th>
                                    <th scope="col">Rebounding</th>
                                    <th scope="col">Int. Defense</th>
                                    <th scope="col">Per. Defense</th>
                                    <th scope="col">Stamina</th>
                                    <th scope="col">Potential</th>
                                    <th scope="col">Min. Expectations</th>
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

export default connect(mapStateToProps)(BBATeam);
