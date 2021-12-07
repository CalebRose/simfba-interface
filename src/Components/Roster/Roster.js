import React, { useEffect } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import PlayerRow from './PlayerRow';
import AttributeRow from './AttributeRow';
import DropdownItem from './DropdownItem';
import FBAPlayerService from '../../_Services/simFBA/FBAPlayerService';
import FBATeamService from '../../_Services/simFBA/FBATeamService';
// import DepthChartRow from "../DepthChart/DepthChartRow";

const Roster = ({ currentUser }) => {
    /* 
        API Call to get team data
        Loop through array list to acquire players
    */
    let rosterService = new FBAPlayerService();
    let teamService = new FBATeamService();
    // React Hooks for Modal
    //
    const [modalState, setModal] = React.useState(false);
    const [player, setPlayer] = React.useState(null);
    const [attributes, setAttributes] = React.useState([]);
    const [userTeam, setUserTeam] = React.useState([]);
    const [team, setTeam] = React.useState([]); // Redux value as initial value for react hook
    const [teams, setTeams] = React.useState([]);
    const [roster, setRoster] = React.useState([]);
    const [viewRoster, setViewRoster] = React.useState([]);
    const [sort, setSort] = React.useState('');
    const [isAsc, setIsAsc] = React.useState(false);

    useEffect(() => {
        if (currentUser) {
            getTeam(currentUser.teamId);
            getTeams();
        }
    }, [currentUser]);

    useEffect(() => {
        if (team) {
            getRoster(team.ID);
        }
    }, [team]);

    useEffect(() => {
        switch (sort) {
            case 'ovr':
                setViewRoster((currRoster) =>
                    currRoster.sort(
                        (a, b) => (a.Overall - b.Overall) * (isAsc ? 1 : -1)
                    )
                );
                break;
            case 'name':
                setViewRoster((currRoster) =>
                    currRoster.sort(
                        (a, b) =>
                            a.LastName.localeCompare(b.LastName) *
                            (isAsc ? 1 : -1)
                    )
                );
                break;
            case 'year':
                setViewRoster((currRoster) =>
                    currRoster.sort(
                        (a, b) => (a.Year - b.Year) * (isAsc ? 1 : -1)
                    )
                );
                break;
            case 'pos':
                setViewRoster((currRoster) =>
                    currRoster.sort(
                        (a, b) =>
                            a.Position.localeCompare(b.Position) *
                            (isAsc ? 1 : -1)
                    )
                );
                break;
            case 'pot':
                setViewRoster((currRoster) =>
                    currRoster.sort(
                        (a, b) =>
                            a.Potential.localeCompare(b.Potential) *
                            (isAsc ? 1 : -1)
                    )
                );
                break;
            case 'arch':
                setViewRoster((currRoster) =>
                    currRoster.sort(
                        (a, b) =>
                            a.Archetype.localeCompare(b.Archetype) *
                            (isAsc ? 1 : -1)
                    )
                );
                break;
            default:
                break;
        }
    }, [sort, isAsc]);

    // Functions
    const selectTeam = (team) => {
        setTeam(team);
    };

    const selectUserTeam = () => {
        selectTeam(userTeam);
    };

    const getTeam = async (ID) => {
        let response = await teamService.GetTeamByTeamId(ID);
        setTeam(response);
        setUserTeam(response);
    };

    const getTeams = async () => {
        //
        let teams = await teamService.GetAllCollegeTeams();
        setTeams(teams);
    };

    const getRoster = async (ID) => {
        if (ID !== null || ID > 0) {
            let roster = await rosterService.GetPlayersByTeam(ID);
            setRoster(roster);
            setViewRoster(roster);
        }
    };

    // Call Back Function
    const setPriority = (data) => {
        switch (data.Position) {
            case 'QB':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    {
                        Name: 'Throw Power',
                        Value: data.ThrowPower,
                        Letter: ''
                    },
                    {
                        Name: 'Throw Accuracy',
                        Value: data.ThrowAccuracy,
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
                    { Name: 'Pass Block', Value: data.PassBlock, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' }
                ];
                break;
            case 'FB':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Carrying', Value: data.Carrying, Letter: '' },
                    { Name: 'Catching', Value: data.Catching, Letter: '' },
                    { Name: 'Pass Block', Value: data.PassBlock, Letter: '' },
                    { Name: 'Run Block', Value: data.RunBlock, Letter: '' },
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
                        Value: data.RouteRunning,
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
                        Value: data.RouteRunning,
                        Letter: ''
                    },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    { Name: 'Pass Block', Value: data.PassBlock, Letter: '' },
                    { Name: 'Run Block', Value: data.RunBlock, Letter: '' }
                ];
                break;
            case 'OT':
            case 'OG':
            case 'C':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    { Name: 'Pass Block', Value: data.PassBlock, Letter: '' },
                    { Name: 'Run Block', Value: data.RunBlock, Letter: '' }
                ];
                break;
            case 'DE':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Tackle', Value: data.Tackle, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    { Name: 'Pass Rush', Value: data.PassRush, Letter: '' },
                    { Name: 'Run Defense', Value: data.RunDefense, Letter: '' }
                ];
                break;
            case 'DT':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Tackle', Value: data.Tackle, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    { Name: 'Pass Rush', Value: data.PassRush, Letter: '' },
                    { Name: 'Run Defense', Value: data.RunDefense, Letter: '' }
                ];
                break;
            case 'ILB':
            case 'OLB':
                data.priorityAttributes = [
                    { Name: 'Agility', Value: data.Agility, Letter: '' },
                    { Name: 'Speed', Value: data.Speed, Letter: '' },
                    { Name: 'Tackle', Value: data.Tackle, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    { Name: 'Pass Rush', Value: data.PassRush, Letter: '' },
                    {
                        Name: 'Run Defense',
                        Value: data.RunDefense,
                        Letter: ''
                    },
                    {
                        Name: 'Zone Coverage',
                        Value: data.ZoneCoverage,
                        Letter: ''
                    },
                    {
                        Name: 'Man Coverage',
                        Value: data.ManCoverage,
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
                        Value: data.ZoneCoverage,
                        Letter: ''
                    },
                    {
                        Name: 'Man Coverage',
                        Value: data.ManCoverage,
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
                        Value: data.RunDefense,
                        Letter: ''
                    },
                    { Name: 'Tackle', Value: data.Tackle, Letter: '' },
                    { Name: 'Strength', Value: data.Strength, Letter: '' },
                    {
                        Name: 'Zone Coverage',
                        Value: data.ZoneCoverage,
                        Letter: ''
                    },
                    {
                        Name: 'Man Coverage',
                        Value: data.ManCoverage,
                        Letter: ''
                    },
                    { Name: 'Catching', Value: data.Catching, Letter: '' }
                ];
                break;
            case 'K':
                data.priorityAttributes = [
                    {
                        Name: 'Kick Accuracy',
                        Value: data.KickAccuracy,
                        Letter: ''
                    },
                    { Name: 'Kick Power', Value: data.KickPower, Letter: '' }
                ];
                break;
            case 'P':
                data.priorityAttributes = [
                    {
                        Name: 'Punt Accuracy',
                        Value: data.PuntAccuracy,
                        Letter: ''
                    },
                    { Name: 'Punt Power', Value: data.PuntPower, Letter: '' }
                ];
                break;
            default:
                break;
        }
        data.priorityAttributes.push({
            Name: 'Football IQ',
            Value: data.FootballIQ,
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
            Letter: data.PotentialGrade
        });
    };

    const getPlayerData = (data) => {
        if (data) {
            let toggle = !modalState;
            setModal(toggle);

            let playerRecord = data;
            playerRecord['priorityAttributes'] = [];
            setPriority(playerRecord);
            setPlayer(playerRecord);
            setAttributes(playerRecord.priorityAttributes);
        }
    };
    // Priority Queue

    const teamDropDowns =
        teams && teams.length > 0
            ? teams.map((x) => (
                  <DropdownItem
                      key={x.ID}
                      value={x.TeamName + ' ' + x.Mascot}
                      team={x}
                      id={x.ID}
                      click={selectTeam}
                  />
              ))
            : '';

    // Rows
    const PlayerRows =
        viewRoster && viewRoster.length > 0
            ? viewRoster.map((player) => (
                  <PlayerRow
                      key={player.ID}
                      data={player}
                      getData={getPlayerData}
                      school={team.TeamName}
                  />
              ))
            : '';
    const playerCount = viewRoster ? viewRoster.length : 0;

    let redshirtCount = viewRoster
        ? viewRoster.filter(
              (player) => player.IsRedshirting || player.IsRedshirt
          ).length
        : 0;

    const setSortValues = (value) => {
        setIsAsc((asc) => (value === sort ? !asc : false));
        setSort((currValue) => (currValue === value ? currValue : value));
    };

    // Designations
    // Objects inside design. array; designation being QB1, QB2, etc...
    // Position being the position related to the designation
    // Use the position key-value as a means to grab players from sample content and display them in player

    return (
        <div className="container">
            <div className="row userInterface">
                <h2 className="">{team ? team.TeamName : ''} Roster</h2>
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
                            <span>{team ? team.TeamName : ''}</span>
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
                    <h2>Redshirts: {redshirtCount}</h2>
                </div>
            </div>
            <div className="row">
                {player ? (
                    <div
                        className="modal fade"
                        id="playerModal"
                        tabindex="-1"
                        aria-labelledby="playerModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <header className="modal-header">
                                    <h2 className="modal-title">
                                        {player.FirstName +
                                            ' ' +
                                            player.LastName}
                                    </h2>

                                    <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </header>
                                <section className="modal-body">
                                    <div className="row">
                                        <div className="col">
                                            <div className="row text-start">
                                                <h5>{team.TeamName}</h5>
                                                <p className="gap">
                                                    <strong>Year: </strong>
                                                    {player.Year}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row text-start">
                                                <p>
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
                                    <div className="row mt-1">
                                        <div className="col-md-auto">
                                            <h4 className="">
                                                {player.Height} inches,{' '}
                                                {player.Weight} lbs
                                            </h4>
                                        </div>
                                        <div className="col-md-auto">
                                            <h4 className="">
                                                Overall: {player.Overall}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="AttributeTable row mt-1">
                                        {player.priorityAttributes &&
                                        player.priorityAttributes.length > 0
                                            ? player.priorityAttributes.map(
                                                  (attribute) => (
                                                      <AttributeRow
                                                          key={attribute.Name}
                                                          data={attribute}
                                                      />
                                                  )
                                              )
                                            : ''}
                                    </div>
                                </section>
                                <footer className="modal-footer">
                                    <button
                                        className="btn btn-light"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                </footer>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                <div className="table-wrapper table-height">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    onClick={() => setSortValues('name')}
                                >
                                    <abbr>Name</abbr>
                                </th>
                                <th scope="col">
                                    <abbr
                                        title="Archetype"
                                        onClick={() => setSortValues('arch')}
                                    >
                                        Archetype
                                    </abbr>
                                </th>
                                <th scope="col">
                                    <abbr
                                        title="Position"
                                        onClick={() => setSortValues('pos')}
                                    >
                                        Pos
                                    </abbr>
                                </th>
                                <th
                                    scope="col"
                                    onClick={() => setSortValues('ovr')}
                                >
                                    <abbr title="Overall">Ovr</abbr>
                                </th>
                                <th scope="col">
                                    <abbr
                                        title="Year"
                                        onClick={() => setSortValues('year')}
                                    >
                                        Yr
                                    </abbr>
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
                                <th
                                    scope="col"
                                    onClick={() => setSortValues('pot')}
                                >
                                    <abbr title="Potential">Pot</abbr>
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
