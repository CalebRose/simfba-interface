import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { GetTableHoverClass } from '../../../Constants/CSSClassHelper';
import FBATeamService from '../../../_Services/simFBA/FBATeamService';
import FBATradeService from '../../../_Services/simFBA/FBATradeService';
import { Spinner } from '../../_Common/Spinner';
import { TeamDropdown } from '../../_Common/TeamDropdown';
import { NFLSidebar } from '../Roster/NFLSidebar';
import { NFLMobileTradeBlockRow } from './NFLMobileTradeBlockRow';
import { NFLTradePreferencesModal } from './NFLTradePreferencesModal';
import { ReceivedProposalsModal } from './ReceivedProposalsModal';
import { NFLTradeBlockHeader } from './TradeBlockHeader';
import { TradeBlockRow } from './TradeBlockRow';
import { TradeProposalModal } from './TradeProposalModal';

const NFLTradeBlock = ({ currentUser, cfb_Timestamp, viewMode, nflTeam }) => {
    // Services
    const _tradeService = new FBATradeService();
    const _teamService = new FBATeamService();
    // Hooks
    const [teams, setTeams] = React.useState(null);
    const [userTeam, setUserTeam] = React.useState(null);
    const [teamID, setTeamID] = React.useState(null);
    const [currentTeam, setCurrentTeam] = React.useState(null);
    const [sentTradeProposals, setSentTradeProposals] = React.useState([]);
    const [receivedTradeProposals, setReceivedTradeProposals] = React.useState(
        []
    );
    const [userPlayers, setUserPlayers] = React.useState([]);
    const [userPicks, setUserPicks] = React.useState([]);
    const [tradablePlayers, setTradablePlayers] = React.useState([]);
    const [tradablePicks, setTradablePicks] = React.useState([]);
    const [list, setList] = React.useState([]);
    const [tradePreferences, setTradePreferences] = React.useState(null);
    const [canModify, setCanModify] = React.useState(true);
    const [canPropose, setCanPropose] = React.useState(false);
    const [currentView, setCurrentView] = React.useState('Players');
    const [requests, setRequests] = React.useState([]);
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:760px)` });
    const tableClass = GetTableHoverClass(viewMode);

    // For mobile
    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    // useEffects
    useEffect(() => {
        if (currentUser) {
            GetTradeBlockData(currentUser.NFLTeamID);
            GetAllNFLTeams();
        }
    }, [currentUser]);

    // useEffects
    useEffect(() => {
        if (teamID) {
            GetTradeBlockData(teamID);
        }
    }, [teamID]);

    // API Request Functions
    const GetTradeBlockData = async (TeamID) => {
        const res = await _tradeService.GetTradeBlockDataByTeamID(TeamID);
        setCurrentTeam(() => res.Team);
        setTradablePlayers(() => [...res.TradablePlayers]);
        setTradablePicks(() => [...res.DraftPicks]);
        if (currentView === 'Players') {
            setList(() => [...res.TradablePlayers]);
        } else {
            setList(() => [...res.DraftPicks]);
        }
        setSentTradeProposals(() => [...res.SentTradeProposals]);
        setReceivedTradeProposals(() => [...res.ReceivedTradeProposals]);
        const tp = { ...res.TradePreferences };
        setTradePreferences(() => tp);
        const modifiable =
            res.Team.ID === currentUser.NFLTeamID &&
            (currentUser.NFLRole === 'Owner' ||
                currentUser.NFLRole === 'Manager');
        const proposable =
            res.Team.ID !== currentUser.NFLTeamID &&
            (currentUser.NFLRole === 'Owner' ||
                currentUser.NFLRole === 'Manager');
        if (modifiable) {
            setUserTeam(() => res.Team);
        }
        if (userPlayers.length === 0 && userPicks.length === 0) {
            setUserPlayers(() => [...res.TradablePlayers]);
            setUserPicks(() => [...res.DraftPicks]);
        }
        setCanModify(() => modifiable);
        setCanPropose(() => proposable);
    };

    const GetAllNFLTeams = async () => {
        const res = await _teamService.GetAllNFLTeams();
        setTeams(() => [...res]);
    };

    // Click Events
    const SelectView = (event) => {
        const { value } = event.target;
        if (value === 'Players') {
            setList(() => tradablePlayers);
        } else {
            setList(() => tradablePicks);
        }
        setCurrentView(() => value);
    };

    const selectTeam = (team) => {
        setTradablePlayers(() => []);
        setTeamID(() => team.ID);
    };

    const selectUserTeam = () => {
        setTradablePlayers(() => []);
        setTeamID(() => userTeam.ID);
    };

    const SaveTradePreferences = async (tp) => {
        const res = await _tradeService.UpdateTradePreferences(tp);
        const newTP = { ...tp };
        setTradePreferences(() => newTP);
    };

    const ProposeTrade = async (dto, modalDTO) => {
        const res = _tradeService.CreateTradeProposal(dto);
        const sentProposals = [...sentTradeProposals];
        sentProposals.push(modalDTO);
        setSentTradeProposals(() => sentProposals);
    };

    const AcceptTrade = async (id) => {
        const res = _tradeService.AcceptTradeProposal(id);
        const proposals = [...receivedTradeProposals];

        const filteredProposals = proposals.filter((x) => x.ID !== id);
        setReceivedTradeProposals(() => filteredProposals);
    };

    const RejectTrade = async (id) => {
        const res = _tradeService.RejectTradeProposal(id);
        const proposals = [...receivedTradeProposals];
        const filteredProposals = proposals.filter((x) => x.ID !== id);
        setReceivedTradeProposals(() => filteredProposals);
    };

    const CancelTrade = async (id) => {
        const res = _tradeService.CancelTradeProposal(id);
        const proposals = [...sentTradeProposals];
        const filteredProposals = proposals.filter((x) => x.ID !== id);
        setSentTradeProposals(() => filteredProposals);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row mt-1 justify-content-center d-md-block">
                    <h2>
                        {!currentTeam ? (
                            <Spinner />
                        ) : (
                            `${currentTeam.TeamName} Trade Block`
                        )}{' '}
                        {canModify && !isMobile && (
                            <button
                                type="button"
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#receivedProposalsModal"
                            >
                                <i
                                    className={`bi bi-bell-fill ${
                                        receivedTradeProposals.length > 0
                                            ? 'text-danger'
                                            : ''
                                    }`}
                                />
                            </button>
                        )}
                    </h2>
                </div>
                <>
                    {tradePreferences && (
                        <NFLTradePreferencesModal
                            tp={tradePreferences}
                            theme={viewMode}
                            saveTradePreferences={SaveTradePreferences}
                        />
                    )}
                    {userTeam && currentTeam && cfb_Timestamp && (
                        <TradeProposalModal
                            theme={viewMode}
                            ts={cfb_Timestamp}
                            userTeam={userTeam}
                            currentTeam={currentTeam}
                            tradablePlayers={tradablePlayers}
                            tradablePicks={tradablePicks}
                            userPlayers={userPlayers}
                            userPicks={userPicks}
                            Propose={ProposeTrade}
                        />
                    )}
                    {userTeam && currentTeam && (
                        <ReceivedProposalsModal
                            sent={sentTradeProposals}
                            received={receivedTradeProposals}
                            theme={viewMode}
                            accept={AcceptTrade}
                            reject={RejectTrade}
                            cancel={CancelTrade}
                        />
                    )}
                </>
                <div className="row">
                    {currentTeam && (
                        <NFLSidebar
                            isTradeBlock
                            tp={tradePreferences}
                            team={currentTeam}
                            ts={cfb_Timestamp}
                            canModify={canModify}
                            isMobile={isMobile}
                        />
                    )}
                    <div className="col-sm-10">
                        <div className="row mt-3">
                            <div className="col-6">
                                <div
                                    className="btn-group gap-2"
                                    role="group"
                                    style={{ width: '-webkit-fill-available' }}
                                >
                                    <div
                                        className="btn-group"
                                        role="group"
                                        style={{ width: '50%' }}
                                    >
                                        <TeamDropdown
                                            teams={teams}
                                            currentTeam={currentTeam}
                                            clickUserTeam={selectUserTeam}
                                            click={selectTeam}
                                            currentUser={currentUser}
                                            isNFL
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-outline-dark"
                                        value="Players"
                                        onClick={SelectView}
                                    >
                                        Players
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-dark"
                                        value="Draft Picks"
                                        onClick={SelectView}
                                    >
                                        Draft Picks
                                    </button>
                                    {canPropose && !isMobile ? (
                                        <button
                                            type="button"
                                            className="btn btn-outline-success"
                                            data-bs-toggle="modal"
                                            data-bs-target="#tradeProposalModal"
                                        >
                                            Propose Trade
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            disabled
                                        >
                                            Propose Trade
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div
                            className="row mt-3"
                            style={{ maxHeight: '570px', overflow: 'auto' }}
                        >
                            {isMobile ? (
                                <>
                                    {list.length > 0 &&
                                        list.map((x) => (
                                            <>
                                                <NFLMobileTradeBlockRow
                                                    viewMode={currentView}
                                                    obj={x}
                                                    theme={viewMode}
                                                />
                                            </>
                                        ))}
                                </>
                            ) : (
                                <table
                                    className={tableClass}
                                    style={{ width: '85%' }}
                                >
                                    <thead
                                        style={{
                                            position: 'sticky',
                                            top: 0,
                                            backgroundColor:
                                                viewMode === 'dark'
                                                    ? '#202020'
                                                    : 'white',
                                            zIndex: 3
                                        }}
                                    >
                                        <NFLTradeBlockHeader
                                            currentView={currentView}
                                        />
                                    </thead>
                                    <tbody className="overflow-auto">
                                        {list.length > 0 &&
                                            list.map((x) => (
                                                <>
                                                    <TradeBlockRow
                                                        viewMode={currentView}
                                                        obj={x}
                                                    />
                                                </>
                                            ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        {list.length === 0 && (
                            <>
                                <div className="row justify-content-center mt-3">
                                    My dude, this team has not placed anyone nor
                                    do they have picks available. Something is
                                    up and the admin team is working on it.
                                    Please view a different team in the
                                    meantime.
                                </div>
                                <div className="row justify-content-center pt-2 mt-4 mb-2">
                                    <Spinner />
                                </div>
                            </>
                        )}
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

export default connect(mapStateToProps)(NFLTradeBlock);
