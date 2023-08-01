import React, { useEffect } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import PlayerRow from './PlayerRow';
import FBAPlayerService from '../../_Services/simFBA/FBAPlayerService';
import FBATeamService from '../../_Services/simFBA/FBATeamService';
import { GetDefaultOrder } from '../../_Utility/RosterHelper';
import { useMediaQuery } from 'react-responsive';
import ConfirmRedshirtModal from './RedshirtModal';
import PlayerModal from './PlayerModal';
import MobileRosterRow from './MobileRosterRow';
import { numberWithCommas } from '../../_Utility/utilHelper';
import { DropdownItemObj } from './DropdownItem';

const Roster = ({ currentUser, cfbTeam, cfb_Timestamp, viewMode }) => {
    /* 
        API Call to get team data
        Loop through array list to acquire players
    */
    let rosterService = new FBAPlayerService();
    let teamService = new FBATeamService();
    // React Hooks for Modal
    //
    const [modalState, setModal] = React.useState(false);
    const [userTeam, setUserTeam] = React.useState([]);
    const [viewingUserTeam, setViewingUserTeam] = React.useState(true);
    const [team, setTeam] = React.useState([]); // Redux value as initial value for react hook
    const [teams, setTeams] = React.useState([]);
    const [roster, setRoster] = React.useState([]);
    const [viewRoster, setViewRoster] = React.useState([]);
    const [sort, setSort] = React.useState('ovr');
    const [isAsc, setIsAsc] = React.useState(false);
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:760px)` });

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
            getTeams();
        }
    }, [currentUser]);

    useEffect(() => {
        if (cfbTeam) {
            setTeam(cfbTeam);
            setUserTeam(cfbTeam);
        }
    }, [cfbTeam]);

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

            if (ID !== userTeam.ID) {
                setViewingUserTeam((x) => false);
            } else {
                setViewingUserTeam((x) => true);
            }
        }
    };
    // Priority Queue

    const teamDropDowns =
        teams && teams.length > 0
            ? teams.map((x) => (
                  <DropdownItemObj
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
        ? viewRoster.filter((player) => player.IsRedshirting).length
        : 0;

    const setSortValues = (value) => {
        const newSort = value;

        // determine default sort by attribute selected
        const isAscending = GetDefaultOrder(newSort, sort, isAsc);

        switch (newSort) {
            case 'ovr':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Overall - b.Overall) * (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'name':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            a.LastName.localeCompare(b.LastName) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'year':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) => (a.Year - b.Year) * (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'pos':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            a.Position.localeCompare(b.Position) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'pot':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            a.PotentialGrade.localeCompare(b.PotentialGrade) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'arch':
                setViewRoster(() =>
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

    const setRedshirtStatus = async (player) => {
        const PlayerID = player.ID;
        const playerRoster = [...viewRoster];
        const originalRoster = [...roster];
        const playerIDX = playerRoster.findIndex((x) => x.ID === PlayerID);
        const originalIDX = originalRoster.findIndex((x) => x.ID === PlayerID);
        playerRoster[playerIDX].IsRedshirting = true;
        originalRoster[originalIDX].IsRedshirting = true;

        const dto = {
            PlayerID: PlayerID,
            RedshirtStatus: true
        };

        const response = await rosterService.AssignRedshirt(dto);
        if (!response) {
            return;
        }

        setRoster(() => originalRoster);
        setViewRoster(() => playerRoster);
    };

    const tableClass = viewMode === 'light' ? '' : 'table-dark';

    return (
        <div className="container-fluid">
            <div className="row userInterface">
                <h2 className="">{team ? team.TeamName : ''} Roster</h2>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <div className="row mb-1">
                        <h5>Coach: {team && team.Coach ? team.Coach : 'AI'}</h5>
                    </div>
                    <div className="row mb-1">
                        <h5>Conference: {team && team.Conference}</h5>
                    </div>
                    {team !== undefined && team.DivisionID > 0 && (
                        <div className="row mb-1">
                            <h5>Division: {team && team.Division}</h5>
                        </div>
                    )}

                    <div className="row mb-1">
                        <h5>Stadium: {team && team.Stadium}</h5>
                    </div>
                    <div className="row mb-1">
                        <h5>
                            Stadium Capacity:{' '}
                            {team && numberWithCommas(team.StadiumCapacity)}
                        </h5>
                    </div>
                </div>
                <div className="col-md-10">
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
                                        <DropdownItemObj
                                            value={
                                                currentUser
                                                    ? currentUser.team +
                                                      ' ' +
                                                      currentUser.mascot
                                                    : null
                                            }
                                            click={selectUserTeam}
                                            id={
                                                currentUser
                                                    ? currentUser.teamId
                                                    : null
                                            }
                                        />
                                        <hr className="dropdown-divider"></hr>
                                        {teamDropDowns}
                                    </ul>
                                </div>
                                {!isMobile ? (
                                    <div className="export ms-2">
                                        <button
                                            className="btn btn-primary export-btn"
                                            onClick={exportRoster}
                                        >
                                            Export
                                        </button>
                                    </div>
                                ) : (
                                    ''
                                )}
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
                        {!isMobile ? (
                            <div
                                className={`table-wrapper table-height ${
                                    viewMode === 'dark'
                                        ? 'table-height-dark'
                                        : ''
                                }`}
                            >
                                <table
                                    className={
                                        viewWidth >= 901
                                            ? 'table table-hover ' + tableClass
                                            : 'table table-sm ' + tableClass
                                    }
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                onClick={() =>
                                                    setSortValues('name')
                                                }
                                            >
                                                <abbr>Name</abbr>
                                            </th>
                                            <th scope="col">
                                                <abbr
                                                    title="Archetype"
                                                    onClick={() =>
                                                        setSortValues('arch')
                                                    }
                                                >
                                                    Archetype
                                                </abbr>
                                            </th>
                                            <th scope="col">
                                                <abbr
                                                    title="Position"
                                                    onClick={() =>
                                                        setSortValues('pos')
                                                    }
                                                >
                                                    Pos
                                                </abbr>
                                            </th>
                                            <th
                                                scope="col"
                                                onClick={() =>
                                                    setSortValues('ovr')
                                                }
                                            >
                                                <abbr title="Overall">Ovr</abbr>
                                            </th>
                                            <th scope="col">
                                                <abbr
                                                    title="Year"
                                                    onClick={() =>
                                                        setSortValues('year')
                                                    }
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
                                            </th>{' '}
                                            <th scope="col">
                                                <abbr title="Stars">Sr</abbr>
                                            </th>
                                            <th scope="col">
                                                <abbr title="Redshirt">
                                                    Redshirt Status
                                                </abbr>
                                            </th>
                                            <th
                                                scope="col"
                                                onClick={() =>
                                                    setSortValues('pot')
                                                }
                                            >
                                                <abbr title="Potential">
                                                    Pot
                                                </abbr>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewRoster && viewRoster.length > 0
                                            ? viewRoster.map((player, idx) => (
                                                  <>
                                                      <ConfirmRedshirtModal
                                                          idx={idx}
                                                          setRedshirtStatus={
                                                              setRedshirtStatus
                                                          }
                                                          player={player}
                                                          viewMode={viewMode}
                                                      />
                                                      <PlayerModal
                                                          player={player}
                                                          team={team}
                                                          idx={idx}
                                                          viewMode={viewMode}
                                                      />
                                                      <PlayerRow
                                                          key={player.ID}
                                                          idx={idx}
                                                          data={player}
                                                          width={viewWidth}
                                                          redshirtCount={
                                                              redshirtCount
                                                          }
                                                          view={viewingUserTeam}
                                                          ts={cfb_Timestamp}
                                                          theme={viewMode}
                                                      />
                                                  </>
                                              ))
                                            : ''}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <>
                                {viewRoster && viewRoster.length > 0
                                    ? viewRoster.map((player, idx) => (
                                          <>
                                              <ConfirmRedshirtModal
                                                  idx={idx}
                                                  setRedshirtStatus={
                                                      setRedshirtStatus
                                                  }
                                                  player={player}
                                                  viewMode={viewMode}
                                              />
                                              <PlayerModal
                                                  player={player}
                                                  team={team}
                                                  idx={idx}
                                                  viewMode={viewMode}
                                              />
                                              <MobileRosterRow
                                                  key={player.ID}
                                                  idx={idx}
                                                  data={player}
                                                  width={viewWidth}
                                                  redshirtCount={redshirtCount}
                                                  view={viewingUserTeam}
                                                  ts={cfb_Timestamp}
                                                  theme={viewMode}
                                              />
                                          </>
                                      ))
                                    : ''}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    cfbTeam: { cfbTeam },
    timestamp: { cfb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    cfbTeam,
    cfb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(Roster);
