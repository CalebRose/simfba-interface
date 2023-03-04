import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
    GetTableHoverClass,
    GetTableSmallClass
} from '../../../Constants/CSSClassHelper';
import FBAPlayerService from '../../../_Services/simFBA/FBAPlayerService';
import FBATeamService from '../../../_Services/simFBA/FBATeamService';
import { GetDefaultOrder } from '../../../_Utility/RosterHelper';
import DropdownItem from '../../Roster/DropdownItem';
import { CutPlayerModal } from './CutPlayerModal';
import { ExtendPlayerModal } from './ExtendPlayerModal';
import { NFLPlayerModal } from './NFLPlayerModal';
import NFLMobileRosterRow from './NFLRosterMobileRow';
import { NFLRosterPlayerRow } from './NFLRosterPlayerRow';
import { NFLSidebar } from './NFLSidebar';
import { PracticeSquadModal } from './OnPracticeSquadModal';
import { TradeBlockModal } from './OnTradeBlockModal';

const NFLRoster = ({ currentUser, cfb_Timestamp, viewMode }) => {
    let _teamService = new FBATeamService();
    let _rosterService = new FBAPlayerService();

    const [userTeam, setUserTeam] = React.useState(null);
    const [viewingUserTeam, setViewingUserTeam] = React.useState(true);
    const [teams, setTeams] = React.useState(null);
    const [team, setTeam] = React.useState(null);
    const [teamID, setTeamID] = React.useState(null);
    const [roster, setRoster] = React.useState('');
    const [viewRoster, setViewRoster] = React.useState('');
    const [sort, setSort] = React.useState('ovr');
    const [isAsc, setIsAsc] = React.useState(false);
    const [canModify, setCanModify] = React.useState(false);
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:760px)` });
    const tableHoverClass = GetTableHoverClass(viewMode);
    const tableSmallClass = GetTableSmallClass(viewMode);

    // For mobile
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    useEffect(() => {
        if (currentUser) {
            setTeamID(() => currentUser.NFLTeamID);
            getTeams();
        }
    }, [currentUser]);

    useEffect(() => {
        if (teamID && teamID > 0) {
            setCanModify(
                () =>
                    (teamID === currentUser.NFLTeamID &&
                        (currentUser.NFLRole === 'Owner' ||
                            currentUser.NFLRole === 'Manager')) ||
                    currentUser.roleID === 'Admin'
            );
            getRosterData(teamID);
        }
    }, [teamID, currentUser]);

    useEffect(() => {
        if (roster.length > 0 && roster.length !== viewRoster.length) {
            const r = [...roster];
            setViewRoster([...r]);
        }
    }, [roster, viewRoster]);

    // Functions
    const selectTeam = (team) => {
        setRoster(() => []);
        setTeamID(() => team.ID);
        setTeam(() => team);
    };

    const selectUserTeam = () => {
        setTeamID(() => userTeam.ID);
        selectTeam(userTeam);
    };

    // API Calls
    const getRosterData = async (id) => {
        let res = await _teamService.GetNFLRosterData(id);
        const isUserTeam = id === currentUser.NFLTeamID;
        if (isUserTeam && !userTeam) {
            setUserTeam(() => res.Team);
        }
        const r = [
            ...res.Roster.map((x) => {
                return { ...x };
            })
        ];
        const t = { ...res.Team };
        setViewingUserTeam(() => isUserTeam);
        setTeam(() => t);
        setRoster(r);
    };

    const getTeams = async () => {
        let teams = await _teamService.GetAllNFLTeams();
        setTeams(() => teams);
    };

    // Props
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

    // Sorting
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

        setSort(() => newSort);
        setIsAsc(() => isAscending);
    };

    const exportRoster = () => {
        _rosterService.ExportNFLRoster(team.ID, team.TeamName);
    };

    const CutPlayer = async (player) => {
        setViewRoster(() => '');
        const res = await _rosterService.CutNFLPlayerFromRoster(player.ID);
        let r = [];
        for (let i = 0; i < roster.length; i++) {
            if (roster[i].ID !== player.ID) {
                r.push(roster[i]);
            }
        }
        const t = { ...team };
        const contract = player.Contract;
        t.Capsheet.Y1Bonus -= contract.Y1Bonus;
        t.Capsheet.Y2Bonus -= contract.Y2Bonus;
        t.Capsheet.Y3Bonus -= contract.Y3Bonus;
        t.Capsheet.Y4Bonus -= contract.Y4Bonus;
        t.Capsheet.Y5Bonus -= contract.Y5Bonus;
        t.Capsheet.Y1CapHit += contract.Y1Bonus;
        t.Capsheet.Y1Salary -= contract.Y1BaseSalary;
        t.Capsheet.Y2Salary -= contract.Y2BaseSalary;
        t.Capsheet.Y3Salary -= contract.Y3BaseSalary;
        t.Capsheet.Y4Salary -= contract.Y4BaseSalary;
        t.Capsheet.Y5Salary -= contract.Y5BaseSalary;
        setRoster(() => r);
        setTeam(() => t);
    };
    const ExtendPlayer = () => {};
    const TradeBlockPlayer = (player) => {
        // const res = await _rosterService.PlacePlayerOnTradeBlock(player.ID);
        const currentRoster = [...roster];
        const rosterIdx = currentRoster.findIndex((x) => x.ID === player.ID);
        currentRoster[rosterIdx].IsOnTradeBlock = true;
        const currentViewRoster = [...viewRoster];
        const viewIdx = currentViewRoster.findIndex((x) => x.ID === player.ID);
        currentViewRoster[viewIdx].IsOnTradeBlock = true;

        setRoster(() => currentRoster);
        setViewRoster(() => currentViewRoster);
    };
    const PracticeSquadPlayer = () => {};

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <h2>
                        {team && team.TeamName} {team && team.Mascot} Roster
                    </h2>
                </div>
                <div className="row">
                    {team && cfb_Timestamp && (
                        <NFLSidebar
                            team={team}
                            ts={cfb_Timestamp}
                            isRoster={true}
                        />
                    )}
                    <div className="col-sm-10">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="btn-group btn-dropdown-width-auto">
                                    <div className="drop-start btn-dropdown-width-auto">
                                        <button
                                            name="team"
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <span>{team && team.TeamName}</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-content">
                                            <DropdownItem
                                                value={
                                                    currentUser
                                                        ? currentUser.NFLTeam
                                                        : null
                                                }
                                                click={selectUserTeam}
                                                id={
                                                    currentUser
                                                        ? currentUser.NFLTeamID
                                                        : null
                                                }
                                            />
                                            <hr className="dropdown-divider"></hr>
                                            {teamDropDowns}
                                        </ul>
                                    </div>
                                    {!isMobile && (
                                        <div className="export ms-2">
                                            <button
                                                className="btn btn-primary"
                                                onClick={exportRoster}
                                            >
                                                Export
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-4"></div>
                            <div className="col-sm-4">
                                <h3>Players: {roster && roster.length}</h3>
                            </div>
                        </div>
                        <div className="row">
                            {!isMobile ? (
                                <div className="table-wrapper table-height">
                                    <table
                                        className={
                                            viewWidth >= 901
                                                ? tableHoverClass
                                                : tableSmallClass
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
                                                            setSortValues(
                                                                'arch'
                                                            )
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
                                                        Position
                                                    </abbr>
                                                </th>
                                                <th scope="col">
                                                    <abbr
                                                        title="Year"
                                                        onClick={() =>
                                                            setSortValues(
                                                                'year'
                                                            )
                                                        }
                                                    >
                                                        Year
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('ovr')
                                                    }
                                                >
                                                    <abbr title="Overall">
                                                        Ovr
                                                    </abbr>
                                                </th>
                                                <th scope="col">
                                                    <abbr title="Height">
                                                        Ht
                                                    </abbr>
                                                </th>
                                                <th scope="col">
                                                    <abbr title="Weight">
                                                        Wt
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('bon')
                                                    }
                                                >
                                                    <abbr title="Bonus">
                                                        Bonus
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('sal')
                                                    }
                                                >
                                                    <abbr title="Salary">
                                                        Salary
                                                    </abbr>
                                                </th>
                                                <th scope="col">
                                                    <abbr title="Cut, Extend, Trade, and Practice Squad Players">
                                                        Actions
                                                    </abbr>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {viewRoster.length > 0 &&
                                                viewRoster.map(
                                                    (player, idx) => (
                                                        <>
                                                            <CutPlayerModal
                                                                key={player.ID}
                                                                player={player}
                                                                idx={idx}
                                                                cut={CutPlayer}
                                                                viewMode={
                                                                    viewMode
                                                                }
                                                            />
                                                            <ExtendPlayerModal
                                                                key={player.ID}
                                                                player={player}
                                                                idx={idx}
                                                                extend={
                                                                    ExtendPlayer
                                                                }
                                                                viewMode={
                                                                    viewMode
                                                                }
                                                            />
                                                            <TradeBlockModal
                                                                key={player.ID}
                                                                player={player}
                                                                idx={idx}
                                                                tradeblock={
                                                                    TradeBlockPlayer
                                                                }
                                                                viewMode={
                                                                    viewMode
                                                                }
                                                            />
                                                            <PracticeSquadModal
                                                                key={player.ID}
                                                                player={player}
                                                                idx={idx}
                                                                practicesquad={
                                                                    PracticeSquadPlayer
                                                                }
                                                                viewMode={
                                                                    viewMode
                                                                }
                                                            />
                                                            <NFLRosterPlayerRow
                                                                key={player.ID}
                                                                idx={idx}
                                                                player={player}
                                                                userView={
                                                                    viewingUserTeam
                                                                }
                                                                ts={
                                                                    cfb_Timestamp
                                                                }
                                                                canModify={
                                                                    canModify
                                                                }
                                                                viewMode={
                                                                    viewMode
                                                                }
                                                            />
                                                            <NFLPlayerModal
                                                                key={player.ID}
                                                                idx={idx}
                                                                player={player}
                                                                team={team}
                                                                viewMode={
                                                                    viewMode
                                                                }
                                                            />
                                                        </>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                    {viewRoster.length === 0 && (
                                        <div className="row justify-content-center pt-2 mb-4">
                                            <div
                                                className="spinner-border justify-content-center"
                                                role="status"
                                            >
                                                <span className="sr-only">
                                                    Loading...
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {viewRoster.length > 0 &&
                                        viewRoster.map((player, idx) => (
                                            <>
                                                <CutPlayerModal
                                                    key={player.ID}
                                                    player={player}
                                                    idx={idx}
                                                    cut={CutPlayer}
                                                    viewMode={viewMode}
                                                />
                                                <ExtendPlayerModal
                                                    key={player.ID}
                                                    player={player}
                                                    idx={idx}
                                                    extend={ExtendPlayer}
                                                    viewMode={viewMode}
                                                />
                                                <TradeBlockModal
                                                    key={player.ID}
                                                    player={player}
                                                    idx={idx}
                                                    tradeblock={
                                                        TradeBlockPlayer
                                                    }
                                                    viewMode={viewMode}
                                                />
                                                <PracticeSquadModal
                                                    key={player.ID}
                                                    player={player}
                                                    idx={idx}
                                                    practicesquad={
                                                        PracticeSquadPlayer
                                                    }
                                                    viewMode={viewMode}
                                                />

                                                <NFLMobileRosterRow
                                                    key={player.ID}
                                                    idx={idx}
                                                    player={player}
                                                    userView={viewingUserTeam}
                                                    ts={cfb_Timestamp}
                                                    canModify={canModify}
                                                    theme={viewMode}
                                                />
                                            </>
                                        ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    nflTeam: { nflTeam },
    timestamp: { cfb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    nflTeam,
    cfb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(NFLRoster);
