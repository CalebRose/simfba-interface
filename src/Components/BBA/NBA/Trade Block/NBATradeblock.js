import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import BBATeamService from '../../../../_Services/simNBA/BBATeamService';
import BBATradeService from '../../../../_Services/simNBA/BBATradeService';
import { Spinner } from '../../../_Common/Spinner';
import { GetTableHoverClass } from '../../../../Constants/CSSClassHelper';
import { TeamDropdown } from '../../../_Common/TeamDropdown';
import {
    NBATradePreferencesModal,
    NBATradeProposalModal
} from './NBATradeblockModals';
import { ReceivedProposalsModal } from '../../../NFL/TradeBlock/ReceivedProposalsModal';
import { TradeBlockHeader } from '../../../NFL/TradeBlock/TradeBlockHeader';
import { NBATradeBlockRow } from '../../../NFL/TradeBlock/TradeBlockRow';
import { NBASidebar } from '../Sidebar/NBASidebar';

const NBATradeBlock = ({ currentUser, cbb_Timestamp, viewMode, nbaTeam }) => {
    // Services
    const _tradeService = new BBATradeService();
    const _teamService = new BBATeamService();
    // Hooks
    const [teams, setTeams] = useState(null);
    const [userTeam, setUserTeam] = useState(null);
    const [teamID, setTeamID] = useState(null);
    const [currentTeam, setCurrentTeam] = useState(null);
    const [sentTradeProposals, setSentTradeProposals] = useState([]);
    const [receivedTradeProposals, setReceivedTradeProposals] = useState([]);
    const [userPlayers, setUserPlayers] = useState([]);
    const [userPicks, setUserPicks] = useState([]);
    const [tradablePlayers, setTradablePlayers] = useState([]);
    const [tradablePicks, setTradablePicks] = useState([]);
    const [list, setList] = useState([]);
    const [tradePreferences, setTradePreferences] = useState(null);
    const [canModify, setCanModify] = useState(true);
    const [canPropose, setCanPropose] = useState(false);
    const [currentView, setCurrentView] = useState('Players');
    const [requests, setRequests] = useState([]);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
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
            GetTradeBlockData(currentUser.NBATeamID);
            GetAllNBATeams();
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
            res.Team.ID === currentUser.NBATeamID &&
            (currentUser.NBARole === 'Owner' ||
                currentUser.NBARole === 'Manager');
        const proposable =
            res.Team.ID !== currentUser.NBATeamID &&
            (currentUser.NBARole === 'Owner' ||
                currentUser.NBARole === 'Manager');
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

    const GetAllNBATeams = async () => {
        const res = await _teamService.GetNBATeams();
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
                            `${currentTeam.Team} Trade Block`
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
                        <NBATradePreferencesModal
                            tp={tradePreferences}
                            theme={viewMode}
                            saveTradePreferences={SaveTradePreferences}
                        />
                    )}
                    {userTeam && currentTeam && cbb_Timestamp && (
                        <NBATradeProposalModal
                            theme={viewMode}
                            ts={cbb_Timestamp}
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
                        <NBASidebar
                            isTradeBlock
                            tp={tradePreferences}
                            team={currentTeam}
                            ts={cbb_Timestamp}
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
                                        {currentTeam && (
                                            <TeamDropdown
                                                teams={teams}
                                                currentTeam={currentTeam}
                                                clickUserTeam={selectUserTeam}
                                                click={selectTeam}
                                                currentUser={currentUser}
                                                isNBA={true}
                                            />
                                        )}
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
                                                {/* <NBAMobileTradeBlockRow
                                                    viewMode={currentView}
                                                    obj={x}
                                                    theme={viewMode}
                                                /> */}
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
                                        <TradeBlockHeader
                                            currentView={currentView}
                                            isNBA={true}
                                        />
                                    </thead>
                                    <tbody className="overflow-auto">
                                        {list.length > 0 &&
                                            list.map((x) => (
                                                <>
                                                    <NBATradeBlockRow
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
    nbaTeam: { nbaTeam },
    timestamp: { cbb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    nbaTeam,
    cbb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(NBATradeBlock);
