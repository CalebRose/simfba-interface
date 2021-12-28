import React, { useEffect } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import PlayerRow from './PlayerRow';
import AttributeRow from './AttributeRow';
import DropdownItem from './DropdownItem';
import FBAPlayerService from '../../_Services/simFBA/FBAPlayerService';
import FBATeamService from '../../_Services/simFBA/FBATeamService';
import { SetPriority, GetDefaultOrder } from '../../_Utility/RosterHelper';
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
    const [sort, setSort] = React.useState('ovr');
    const [isAsc, setIsAsc] = React.useState(false);
    const [playerYear, setPlayerYear] = React.useState('');
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);

    // For mobile
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const handleResize = () => {
        setViewWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

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
    const getPlayerData = (data, year) => {
        if (data) {
            let toggle = !modalState;
            setModal(toggle);

            let playerRecord = data;
            playerRecord['priorityAttributes'] = SetPriority(playerRecord);
            setPlayer(playerRecord);
            setPlayerYear(year);
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
    const playerCount = viewRoster ? viewRoster.length : 0;

    let redshirtCount = viewRoster
        ? viewRoster.filter(
              (player) => player.IsRedshirting || player.IsRedshirt
          ).length
        : 0;

    const setSortValues = (value) => {
        const newSort = value;

        // determine default sort by attribute selected
        const isAscending = GetDefaultOrder(newSort, sort, isAsc);

        switch (newSort) {
            case 'ovr':
                setViewRoster((currRoster) =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Overall - b.Overall) * (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'name':
                setViewRoster((currRoster) =>
                    [...roster].sort(
                        (a, b) =>
                            a.LastName.localeCompare(b.LastName) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'year':
                setViewRoster((currRoster) =>
                    [...roster].sort(
                        (a, b) => (a.Year - b.Year) * (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'pos':
                setViewRoster((currRoster) =>
                    [...roster].sort(
                        (a, b) =>
                            a.Position.localeCompare(b.Position) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'pot':
                setViewRoster((currRoster) =>
                    [...roster].sort(
                        (a, b) =>
                            a.PotentialGrade.localeCompare(b.PotentialGrade) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'arch':
                setViewRoster((currRoster) =>
                    [...roster].sort(
                        (a, b) =>
                            a.Archetype.localeCompare(b.Archetype) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            default:
                break;
        }

        setSort((currValue) => newSort);
        setIsAsc((asc) => isAscending);
    };

    const exportRoster = async () => {
        // Removing if-check on if team is the user's...
        let response = rosterService.ExportRoster(team.ID, team.TeamName);
        if (response) {
            //
        }
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
                    <div className="btn-group btn-dropdown-width-auto">
                        <div className="drop-start btn-dropdown-width-auto">
                            <button
                                name="team"
                                className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
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
                        <div className="export ms-2">
                            <button
                                className="btn btn-primary export-btn"
                                onClick={exportRoster}
                            >
                                Export
                            </button>
                        </div>
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
                                                    {playerYear
                                                        ? playerYear
                                                        : ''}
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
                    <table
                        className={
                            viewWidth >= 901
                                ? 'table table-hover'
                                : 'table table-sm'
                        }
                    >
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
                        <tbody>
                            {viewRoster && viewRoster.length > 0
                                ? viewRoster.map((player) => (
                                      <PlayerRow
                                          key={player.ID}
                                          data={player}
                                          getData={getPlayerData}
                                          school={team.TeamName}
                                          width={viewWidth}
                                      />
                                  ))
                                : ''}
                        </tbody>
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
