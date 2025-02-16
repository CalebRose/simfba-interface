import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import toast from 'react-hot-toast';
import {
    GetTableHoverClass,
    GetTableSmallClass
} from '../../../Constants/CSSClassHelper';
import FBAPlayerService from '../../../_Services/simFBA/FBAPlayerService';
import FBATeamService from '../../../_Services/simFBA/FBATeamService';
import FBATradeService from '../../../_Services/simFBA/FBATradeService';
import { GetDefaultOrder } from '../../../_Utility/RosterHelper';
import { Spinner } from '../../_Common/Spinner';
import { TeamDropdown } from '../../_Common/TeamDropdown';
import NFLMobileRosterRow from './NFLRosterMobileRow';
import { NFLRosterPlayerRow } from './NFLRosterPlayerRow';
import { NFLSidebar } from './NFLSidebar';
import { TagPlayerModal } from './TagPlayerModal';

const NFLRoster = ({ currentUser, cfb_Timestamp, viewMode }) => {
    let _tradeService = new FBATradeService();
    let _teamService = new FBATeamService();
    let _rosterService = new FBAPlayerService();

    const [userTeam, setUserTeam] = useState(null);
    const [viewingUserTeam, setViewingUserTeam] = useState(true);
    const [teams, setTeams] = useState(null);
    const [team, setTeam] = useState(null);
    const [teamID, setTeamID] = useState(null);
    const [roster, setRoster] = useState('');
    const [activeCount, setActiveCount] = useState(0);
    const [practiceSquadCount, setPracticeSquadCount] = useState(0);
    const [viewRoster, setViewRoster] = useState('');
    const [sort, setSort] = useState('ovr');
    const [isAsc, setIsAsc] = useState(false);
    const [tagPlayer, setTagPlayer] = useState(null);
    const [canModify, setCanModify] = useState(false);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:760px)` });
    const tableHoverClass = GetTableHoverClass(viewMode);
    const tableSmallClass = GetTableSmallClass(viewMode);

    // For mobile
    useEffect(() => {
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
        if (roster && roster.length > 0) {
            const nonPracticeSquad = [
                ...roster.filter((x) => !x.IsPracticeSquad && !x.InjuryReserve)
            ];
            const practiceSquad = [...roster.filter((x) => x.IsPracticeSquad)];
            setPracticeSquadCount(() => practiceSquad.length);
            setActiveCount(() => nonPracticeSquad.length);
        }
    }, [roster]);

    useEffect(() => {
        if (teamID && teamID > 0) {
            setCanModify(
                () =>
                    teamID === currentUser.NFLTeamID ||
                    currentUser.roleID === 'Admin'
            );
            getRosterData(teamID);
        }
    }, [teamID, currentUser]);

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
        const roster = [...res.Roster];
        const r = [
            ...roster.map((x) => {
                return { ...x };
            })
        ];
        const t = { ...res.Team };
        setViewingUserTeam(() => isUserTeam);
        setTeam(() => t);
        setRoster(r);
        setViewRoster(r);
    };

    const getTeams = async () => {
        let teams = await _teamService.GetAllNFLTeams();
        setTeams(() => teams);
    };

    // Props

    // Sorting
    const setSortValues = (value) => {
        const newSort = value;

        // determine default sort by attribute selected
        const isAscending = GetDefaultOrder(newSort, sort, isAsc);

        switch (newSort) {
            case 'ovr':
                setViewRoster(() =>
                    [...roster].sort((a, b) => {
                        if (a.ShowLetterGrade) return 1;
                        if (b.ShowLetterGrade) return -1;
                        return (a.Overall - b.Overall) * (isAscending ? 1 : -1);
                    })
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
            case 'bon':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Contract.Y1Bonus - b.Contract.Y1Bonus) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'sal':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Contract.Y1BaseSalary -
                                b.Contract.Y1BaseSalary) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'bon2':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Contract.Y2Bonus - b.Contract.Y2Bonus) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'sal2':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Contract.Y2BaseSalary -
                                b.Contract.Y2BaseSalary) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'bon3':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Contract.Y3Bonus - b.Contract.Y3Bonus) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'sal3':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Contract.Y3BaseSalary -
                                b.Contract.Y3BaseSalary) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'bon4':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Contract.Y4Bonus - b.Contract.Y4Bonus) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'sal4':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Contract.Y4BaseSalary -
                                b.Contract.Y4BaseSalary) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'bon5':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Contract.Y5Bonus - b.Contract.Y5Bonus) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'sal5':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Contract.Y5BaseSalary -
                                b.Contract.Y5BaseSalary) *
                            (isAscending ? 1 : -1)
                    )
                );
                break;
            case 'yrs':
                setViewRoster(() =>
                    [...roster].sort(
                        (a, b) =>
                            (a.Contract.ContractLength -
                                b.Contract.ContractLength) *
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
        setViewRoster([]);
        const res = await _rosterService.CutNFLPlayerFromRoster(player.ID);
        let r = [];
        for (let i = 0; i < roster.length; i++) {
            if (roster[i].ID !== player.ID) {
                r.push(roster[i]);
            }
        }
        toast(
            `${player.Position} ${player.FirstName} ${player.LastName} has been cut from the team.`,
            {
                icon: '✂️'
            }
        );
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
        setViewRoster(r);
        setTeam(() => t);
    };

    const ExtendPlayer = async (player, offer) => {
        let res = await _rosterService.CreateExtensionOffer(offer);
        const offerData = await res.json();
        const r = [...roster];
        const playerIDX = r.findIndex((x) => x.ID === player.ID);
        if (offer.ID > 0) {
            const offerIDX = r[playerIDX].Extensions.findIndex(
                (x) => x.ID === offer.ID
            );
            r[playerIDX].Extensions[offerIDX] = offerData;
        } else {
            const offerObj = { offerData };
            r[playerIDX].Extensions.push(offerObj);
        }
        toast(
            `Successfully sent extension offer to ${player.Position} ${player.FirstName} ${player.LastName}`,
            {
                icon: '💰'
            }
        );
        setRoster(() => r);
    };

    const CancelExtension = async (player, offer) => {
        let res = await _rosterService.CancelExtensionOffer(offer);
        const r = [...roster];
        const playerIDX = r.findIndex((x) => x.ID === player.ID);
        const exs = r[playerIDX].Extensions.filter((x) => x.ID !== offer.ID);
        r[playerIDX].Extensions = exs;
        toast(
            `Cancelled extension offer for ${player.Position} ${player.FirstName} ${player.LastName}`,
            {
                icon: '😞'
            }
        );
        setRoster(() => r);
    };
    const TradeBlockPlayer = async (player) => {
        const res = await _tradeService.PlaceNFLPlayerOnTradeBlock(player.ID);
        if (res) {
            const currentRoster = [...roster];
            const rosterIdx = currentRoster.findIndex(
                (x) => x.ID === player.ID
            );
            const toggle = !currentRoster[rosterIdx].IsOnTradeBlock;
            currentRoster[rosterIdx].IsOnTradeBlock = toggle;
            const currentViewRoster = [...viewRoster];
            const viewIdx = currentViewRoster.findIndex(
                (x) => x.ID === player.ID
            );
            currentViewRoster[viewIdx].IsOnTradeBlock = toggle;
            if (currentViewRoster[viewIdx].IsOnTradeBlock) {
                toast(
                    `Successfully placed ${player.Position} ${player.FirstName} ${player.LastName} on the trade block.`,
                    {
                        icon: '🔃'
                    }
                );
            } else {
                toast(
                    `Successfully removed ${player.Position} ${player.FirstName} ${player.LastName} from the trade block.`,
                    {
                        icon: '🔃'
                    }
                );
            }
            setRoster(() => currentRoster);
            setViewRoster(() => currentViewRoster);
        }
    };

    const PracticeSquadPlayer = async (player) => {
        const res = await _rosterService.PlaceNFLPlayerOnPracticeSquad(
            player.ID
        );
        const currentRoster = [...roster];
        const rosterIdx = currentRoster.findIndex((x) => x.ID === player.ID);
        const toggle = !currentRoster[rosterIdx].IsPracticeSquad;
        currentRoster[rosterIdx].IsPracticeSquad = toggle;
        const currentViewRoster = [...viewRoster];
        const viewIdx = currentViewRoster.findIndex((x) => x.ID === player.ID);
        currentViewRoster[viewIdx].IsPracticeSquad = toggle;
        if (currentViewRoster[viewIdx].IsPracticeSquad) {
            toast(
                `Successfully placed ${player.Position} ${player.FirstName} ${player.LastName} on the Practice Squad.`,
                {
                    icon: '⛔'
                }
            );
        } else {
            toast(
                `Successfully removed ${player.Position} ${player.FirstName} ${player.LastName} from the Practice Squad.`,
                {
                    icon: '⛔'
                }
            );
        }
        setRoster(() => currentRoster);
        setViewRoster(() => currentViewRoster);
    };

    const InjuryReservePlayer = async (player) => {
        const res = await _rosterService.PlaceNFLPlayerOnInjuryReserve(
            player.ID
        );
        const currentRoster = [...roster];
        const rosterIdx = currentRoster.findIndex((x) => x.ID === player.ID);
        const toggle = !currentRoster[rosterIdx].InjuryReserve;
        currentRoster[rosterIdx].InjuryReserve = toggle;
        const currentViewRoster = [...viewRoster];
        const viewIdx = currentViewRoster.findIndex((x) => x.ID === player.ID);
        currentViewRoster[viewIdx].InjuryReserve = toggle;
        if (currentViewRoster[viewIdx].InjuryReserve) {
            toast(
                `Successfully placed ${player.Position} ${player.FirstName} ${player.LastName} on the Injury Reserve.`,
                {
                    icon: '🚑'
                }
            );
        } else {
            toast(
                `Successfully removed ${player.Position} ${player.FirstName} ${player.LastName} from the Injury Reserve.`,
                {
                    icon: '💪'
                }
            );
        }
        setRoster(() => currentRoster);
        setViewRoster(() => currentViewRoster);
    };

    const TagPlayerOption = async (player, tagType) => {
        const { ID, Position } = player;
        let tagEnum = 4;
        if (tagType === 'Franchise') {
            tagEnum = 1;
        } else if (tagType === 'Playtime') {
            tagEnum = 3;
        }
        const dto = { PlayerID: ID, TagType: tagEnum, Position: Position };
        const r = [...roster];
        const playerIDX = r.findIndex((x) => x.ID === ID);
        if (playerIDX > -1) {
            const res = await _rosterService.TagPlayer(dto);
            r[playerIDX].TagType = tagEnum;
            r[playerIDX].IsTagged = true;
            setRoster(() => r);

            if (tagEnum === 1 || tagEnum === 2);
            const t = { ...team };
            const u = { ...userTeam };
            t.UsedTagThisSeason = true;
            u.UsedTagThisSeason = true;
            setTeam(() => t);
            setUserTeam(() => u);
        }
    };

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
                                    <TeamDropdown
                                        teams={teams}
                                        currentTeam={team}
                                        clickUserTeam={selectUserTeam}
                                        click={selectTeam}
                                        currentUser={currentUser}
                                        isNFL={true}
                                        isNBA={false}
                                    />
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
                            <div className="col-sm-4">
                                <h3>Active Players: {activeCount} Players</h3>
                            </div>
                            <div className="col-sm-4">
                                <h3>
                                    Practice Squad: {practiceSquadCount} Players
                                </h3>
                            </div>
                        </div>
                        <TagPlayerModal
                            player={tagPlayer}
                            tag={TagPlayerOption}
                            viewMode={viewMode}
                            team={team}
                        />
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
                                                    <abbr title="Health">
                                                        Health
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('bon')
                                                    }
                                                >
                                                    <abbr title="Y1 Bonus">
                                                        Y1 B
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('sal')
                                                    }
                                                >
                                                    <abbr title="Y1 Salary">
                                                        Y1 S
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('bon2')
                                                    }
                                                >
                                                    <abbr title="Y2 Bonus">
                                                        Y2 B
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('sal2')
                                                    }
                                                >
                                                    <abbr title="Y2 Salary">
                                                        Y2 S
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('bon3')
                                                    }
                                                >
                                                    <abbr title="Y3 Bonus">
                                                        Y3 B
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('sal3')
                                                    }
                                                >
                                                    <abbr title="Y3 Salary">
                                                        Y3 S
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('bon4')
                                                    }
                                                >
                                                    <abbr title="Y4 Bonus">
                                                        Y4 B
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('sal4')
                                                    }
                                                >
                                                    <abbr title="Y4 Salary">
                                                        Y4 S
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('bon5')
                                                    }
                                                >
                                                    <abbr title="Y5 Bonus">
                                                        Y5 B
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('sal5')
                                                    }
                                                >
                                                    <abbr title="Y5 Salary">
                                                        Y5 S
                                                    </abbr>
                                                </th>
                                                <th
                                                    scope="col"
                                                    onClick={() =>
                                                        setSortValues('yrs')
                                                    }
                                                >
                                                    <abbr title="Years Remaining">
                                                        Yrs Left
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
                                                            <NFLRosterPlayerRow
                                                                key={player.ID}
                                                                idx={idx}
                                                                player={player}
                                                                team={team}
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
                                                                psCount={
                                                                    practiceSquadCount
                                                                }
                                                                practicesquad={
                                                                    PracticeSquadPlayer
                                                                }
                                                                tradeblock={
                                                                    TradeBlockPlayer
                                                                }
                                                                extend={
                                                                    ExtendPlayer
                                                                }
                                                                cancelExtension={
                                                                    CancelExtension
                                                                }
                                                                cut={CutPlayer}
                                                                ir={
                                                                    InjuryReservePlayer
                                                                }
                                                                retro={
                                                                    currentUser.IsRetro
                                                                }
                                                                tagPlayer={
                                                                    setTagPlayer
                                                                }
                                                            />
                                                        </>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                    {viewRoster.length === 0 && (
                                        <div className="row justify-content-center pt-2 mb-4">
                                            <Spinner />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {viewRoster.length > 0 &&
                                        viewRoster.map((player, idx) => (
                                            <>
                                                <NFLMobileRosterRow
                                                    key={player.ID}
                                                    idx={idx}
                                                    player={player}
                                                    team={team}
                                                    psCount={practiceSquadCount}
                                                    userView={viewingUserTeam}
                                                    ts={cfb_Timestamp}
                                                    canModify={canModify}
                                                    theme={viewMode}
                                                    practicesquad={
                                                        PracticeSquadPlayer
                                                    }
                                                    tradeblock={
                                                        TradeBlockPlayer
                                                    }
                                                    extend={ExtendPlayer}
                                                    cancelExtension={
                                                        CancelExtension
                                                    }
                                                    cut={CutPlayer}
                                                    ir={InjuryReservePlayer}
                                                    retro={currentUser.IsRetro}
                                                    tagPlayer={setTagPlayer}
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
