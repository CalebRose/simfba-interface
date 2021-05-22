import React, { useEffect } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import PlayerRow from './PlayerRow';
import AttributeRow from './AttributeRow';
import DropdownItem from './DropdownItem';
import Player from '../../Models/Player';
import url from '../../Constants/url';
import RosterService from '../../_Services/simFBA/RosterService';
import TeamService from '../../_Services/simFBA/TeamService';
// import DepthChartRow from "../DepthChart/DepthChartRow";

const Roster = ({ currentUser }) => {
    /* 
        API Call to get team data
        Loop through array list to acquire players
    */
    let rosterService = new RosterService();
    let teamService = new TeamService();
    // React Hooks for Modal
    //
    const [modalState, setModal] = React.useState(false);
    const [player, setPlayer] = React.useState(null);
    const [attributes, setAttributes] = React.useState([]);
    const [userTeam, setUserTeam] = React.useState([]);
    const [team, setTeam] = React.useState([]); // Redux value as initial value for react hook
    const [teams, setTeams] = React.useState([]);
    const [roster, setRoster] = React.useState([]);
    const toggleModal = () => {
        const newState = !modalState;
        return setModal(newState);
    };

    useEffect(() => {
        if (currentUser) {
            getTeam(currentUser.teamId);
            getTeams();
        }
    }, [currentUser]);

    useEffect(() => {
        if (team) {
            getRoster(team.id);
        }
    }, [team]);

    // Functions
    const selectTeam = (team) => {
        setTeam(team);
    };

    const selectUserTeam = () => {
        selectTeam(userTeam);
    };

    const getTeam = async (id) => {
        let response = await teamService.GetTeamByTeamId(url, id);
        setTeam(response);
        setUserTeam(response);
    };

    const getTeams = async () => {
        //
        let teams = await teamService.GetTeams(url);
        setTeams(teams);
    };

    const getRoster = async (id) => {
        if (id !== null || id > 0) {
            let roster = await rosterService.GetRoster(url, id);
            setRoster(roster);
        }
    };

    // Call Back Function
    const getPlayerData = (data) => {
        if (data) {
            let playerRecord = new Player(data);
            setPriority(playerRecord);
            setPlayer(playerRecord);
            setAttributes(playerRecord.priorityAttributes);
        }
    };
    // Priority Queue

    const setPriority = (data) => {
        switch (data.Position) {
            case 'QB':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    {
                        Name: 'Throw Power',
                        Value: data.Throw_Power,
                        Letter: ''
                    },
                    {
                        Name: 'Throw Accuracy',
                        Value: data.Throw_Accuracy,
                        Letter: ''
                    }
                ];
                break;
            case 'RB':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Carrying', Value: data.Carrying, Letter: '' },
                    { Name: 'Catching', Value: data.Catching, Letter: '' },
                    { Name: 'Pass Block', Value: data.Pass_Block, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' }
                ];
                break;
            case 'FB':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Carrying', Value: data.Carrying, Letter: '' },
                    { Name: 'Catching', Value: data.Catching, Letter: '' },
                    { Name: 'Pass Block', Value: data.Pass_Block, Letter: '' },
                    { Name: 'Run Block', Value: data.Run_Block, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' }
                ];
                break;
            case 'WR':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Carrying', Value: data.Carrying, Letter: '' },
                    { Name: 'Catching', Value: data.Catching, Letter: '' },
                    {
                        Name: 'Route Running',
                        Value: data.Route_Running,
                        Letter: ''
                    },
                    { Name: 'Strength', Value: data.Strength, Letter: '' }
                ];
                break;
            case 'TE':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Carrying', Value: data.Carrying, Letter: '' },
                    { Name: 'Catching', Value: data.Catching, Letter: '' },
                    {
                        Name: 'Route Running',
                        Value: data.Route_Running,
                        Letter: ''
                    },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    { Name: 'Pass Block', Value: data.Pass_Block, Letter: '' },
                    { Name: 'Run Block', Value: data.Run_Block, Letter: '' }
                ];
                break;
            case 'OT':
            case 'OG':
            case 'C':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    { Name: 'Pass Block', Value: data.Pass_Block, Letter: '' },
                    { Name: 'Run Block', Value: data.Run_Block, Letter: '' }
                ];
                break;
            case 'DE':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Tackle', Value: data.Tackle, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    { Name: 'Pass Rush', Value: data.Pass_Rush, Letter: '' },
                    { Name: 'Run Defense', Value: data.Run_Defense, Letter: '' }
                ];
                break;
            case 'DT':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Tackle', Value: data.Tackle, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    { Name: 'Pass Rush', Value: data.Pass_Rush, Letter: '' },
                    { Name: 'Run Defense', Value: data.Run_Defense, Letter: '' }
                ];
                break;
            case 'ILB':
            case 'OLB':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Tackle', Value: data.Tackle, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    { Name: 'Pass Rush', Value: data.Pass_Rush, Letter: '' },
                    {
                        Name: 'Run Defense',
                        Value: data.Run_Defense,
                        Letter: ''
                    },
                    {
                        Name: 'Zone Coverage',
                        Value: data.Zone_Coverage,
                        Letter: ''
                    },
                    {
                        Name: 'Man Coverage',
                        Value: data.Man_Coverage,
                        Letter: ''
                    }
                ];
                break;
            case 'CB':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Tackle', Value: data.Tackle, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    {
                        Name: 'Zone Coverage',
                        Value: data.Zone_Coverage,
                        Letter: ''
                    },
                    {
                        Name: 'Man Coverage',
                        Value: data.Man_Coverage,
                        Letter: ''
                    },
                    { Name: 'Catching', Value: data.Catching, Letter: '' }
                ];
                break;
            case 'FS':
            case 'SS':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    {
                        Name: 'Run Defense',
                        Value: data.Run_Defense,
                        Letter: ''
                    },
                    { Name: 'Tackle', Value: data.Tackle, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    {
                        Name: 'Zone Coverage',
                        Value: data.Zone_Coverage,
                        Letter: ''
                    },
                    {
                        Name: 'Man Coverage',
                        Value: data.Man_Coverage,
                        Letter: ''
                    },
                    { Name: 'Catching', Value: data.Catching, Letter: '' }
                ];
                break;
            case 'K':
                data.priorityAttributes = [
                    {
                        Name: 'Kick Accuracy',
                        Value: data.Kick_Accuracy,
                        Letter: ''
                    },
                    { Name: 'Kick Power', Value: data.Kick_Power, Letter: '' }
                ];
                break;
            case 'P':
                data.priorityAttributes = [
                    {
                        Name: 'Punt Accuracy',
                        Value: data.Punt_Accuracy,
                        Letter: ''
                    },
                    { Name: 'Punt Power', Value: data.Punt_Power, Letter: '' }
                ];
                break;
            default:
                break;
        }
        data.priorityAttributes.push({
            Name: 'Football IQ',
            Value: data.Football_IQ,
            Letter: ''
        });
        data.priorityAttributes.push({
            Name: 'Stamina',
            Value: data.Stamina,
            Letter: ''
        });
        for (let i = 0; i < data.priorityAttributes.length; i++) {
            const attribute = data.priorityAttributes[i];
            // Algorithm to provide letter value to attribute
            // NOTE: Move this outside of the if statement for implementation to see all attributes
            if (attribute.Value < 15) attribute.Letter = 'F';
            else if (attribute.Value < 25) attribute.Letter = 'D';
            else if (attribute.Value < 35) attribute.Letter = 'C';
            else if (attribute.Value < 45) attribute.Letter = 'B';
            else if (attribute.Value >= 45) attribute.Letter = 'A';
        }
        data.priorityAttributes.push({
            Name: 'Potential',
            Letter: data.Potential
        });
    };
    const AttributeRows = attributes.map((attribute) => (
        <AttributeRow key={attribute.Name} data={attribute} />
    ));

    const teamDropDowns = teams
        ? teams.map((x) => (
              <DropdownItem
                  key={x.id}
                  value={x.Team + ' ' + x.Nickname}
                  team={x}
                  id={x.id}
                  click={selectTeam}
              />
          ))
        : '';
    const Modal = ({ children, closeModal, modalState, title, teamName }) => {
        if (!modalState) return null;

        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={closeModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            {player.First_Name + ' ' + player.Last_Name}
                        </p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={closeModal}
                        ></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="level">
                            <div className="level-left">
                                <div className="title is-4">
                                    <p>{teamName}</p>
                                    <p className="gap">
                                        <strong>Year: </strong>
                                        {player.Year}
                                    </p>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="title is-4">
                                    <p className="gap-right">
                                        <strong>Position: </strong>
                                        {player.Position}
                                    </p>
                                    <p>
                                        <strong>Archetype:</strong>{' '}
                                        {player.Archetype}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="level">
                            <div className="level-left">
                                <p className="title is-4">
                                    {player.Height} inches, {player.Weight} lbs
                                </p>
                            </div>
                            <div className="level-right">
                                <p className="subtitle is-4">
                                    Overall: {player.Overall}
                                </p>
                            </div>
                        </div>
                        <div className="AttributeTable tile is-parent">
                            {AttributeRows}
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button" onClick={closeModal}>
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        );
    };

    // Rows
    const PlayerRows = roster.map((player) => (
        <PlayerRow
            key={player.id}
            data={player}
            toggle={toggleModal}
            getData={getPlayerData}
        />
    ));
    const playerCount = roster.length;

    // Designations
    // Objects inside design. array; designation being QB1, QB2, etc...
    // Position being the position related to the designation
    // Use the position key-value as a means to grab players from sample content and display them in player

    return (
        <div className="container">
            <div className="row userInterface">
                <h2 className="">{team ? team.Team : ''} Roster</h2>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="drop-start">
                        <button
                            name="team"
                            className="btn btn-secondary dropdown-toggle"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span>{team ? team.Team : ''}</span>
                        </button>
                        <ul className="dropdown-menu dropdown-content">
                            <DropdownItem
                                value={
                                    currentUser
                                        ? currentUser.team +
                                          ' ' +
                                          currentUser.mascot
                                        : null
                                }
                                click={selectUserTeam}
                                id={currentUser ? currentUser.teamId : null}
                            />
                            <hr className="dropdown-divider"></hr>
                            {teamDropDowns}
                        </ul>
                    </div>
                </div>
                <div className="col-4">
                    <h2>Players: {playerCount}</h2>
                </div>
                <div className="col-4">
                    <h2>Redshirts: 0</h2>
                </div>
            </div>
            <div className="row">
                <Modal
                    closeModal={toggleModal}
                    modalState={modalState}
                    title="TEST"
                    teamName={team.Team}
                />
                <div className="table-wrapper table-height">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <abbr>Name</abbr>
                                </th>
                                <th scope="col">
                                    <abbr title="Archetype">Archetype</abbr>
                                </th>
                                <th scope="col">
                                    <abbr title="Position">Pos</abbr>
                                </th>
                                <th scope="col">
                                    <abbr title="Overall">Ovr</abbr>
                                </th>
                                <th scope="col">
                                    <abbr title="Year">Yr</abbr>
                                </th>
                                <th scope="col">
                                    <abbr title="Height">Ht</abbr>
                                </th>
                                <th scope="col">
                                    <abbr title="Weight">Wt</abbr>
                                </th>
                                <th scope="col">
                                    <abbr title="State">St</abbr>
                                </th>
                                <th scope="col">
                                    <abbr title="High School / JUCO">
                                        School
                                    </abbr>
                                </th>
                                <th scope="col">
                                    <abbr title="Potential">Pot</abbr>
                                </th>
                                <th scope="col">
                                    <abbr title="Jersey Number">Num</abbr>
                                </th>
                            </tr>
                        </thead>
                        <tbody>{PlayerRows}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(Roster);
