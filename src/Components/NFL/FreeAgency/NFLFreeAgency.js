import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Select from 'react-select';
import {
    ArchetypesListForFA,
    LetterGradesList,
    PositionList
} from '../../../Constants/CommonConstants';
import EasterEggService from '../../../_Services/simFBA/EasterEggService';
import FBAPlayerService from '../../../_Services/simFBA/FBAPlayerService';
import { MapObjOptions, MapOptions } from '../../../_Utility/filterHelper';
import { NFLSidebar } from '../Roster/NFLSidebar';
import { CancelOfferModal } from './CancelOfferModal';
import { FilterFreeAgencyPlayers } from './FreeAgencyHelper';
import { FreeAgencyPlayerModal } from './FreeAgencyPlayerModal';
import { FreeAgentOfferModal } from './FreeAgentOfferModal';
import NFLFreeAgencyRow from './NFLFreeAgencyRow';

const NFLFreeAgency = ({ currentUser, nflTeam, cfb_Timestamp }) => {
    let _rosterService = new FBAPlayerService();
    let _easterEggService = new EasterEggService();
    const positions = MapObjOptions(PositionList);
    const archetypes = MapObjOptions(ArchetypesListForFA);
    const letterGrades = MapOptions(LetterGradesList);
    const [selectedPositions, setSelectedPositions] = React.useState('');
    const [selectedArchetypes, setSelectedArchetypes] = React.useState('');
    const [selectedStatuses, setSelectedStatuses] = React.useState('');
    const [selectedPotentialLetterGrades, setSelectedPotentialGrades] =
        React.useState('');
    const [team, setTeam] = React.useState(null);
    const [viewablePlayers, setViewablePlayers] = React.useState('');
    const [filteredPlayers, setFilteredPlayers] = React.useState('');
    const [allPlayers, setAllPlayers] = React.useState('');
    const [allFreeAgents, setAllFreeAgents] = React.useState('');
    const [allWaivedPlayers, setAllWaivedPlayers] = React.useState('');
    const [freeAgencyView, setFreeAgencyView] = React.useState('FA');
    const [teamOffers, setTeamOffers] = React.useState([]);
    const [showTamperingButton, setShowButton] = React.useState(true);
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const [count, SetCount] = React.useState(100);
    const [weekLabel, setWeekLabel] = React.useState('');
    const isMobile = useMediaQuery({ query: `(max-width:844px)` });
    let luckyTeam = Math.floor(Math.random() * (20 - 1) + 1);
    const statusOptions = MapOptions(['Open', 'Negotiating']);
    // For mobile
    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    useEffect(() => {
        if (allPlayers.length === 0 && currentUser) {
            GetAvailablePlayers(currentUser.NFLTeamID);
        }
    }, [allPlayers, currentUser]);

    useEffect(() => {
        if (nflTeam && !team) {
            setTeam(() => nflTeam);
        }
    }, [nflTeam, team]);

    useEffect(() => {
        const players =
            freeAgencyView === 'FA'
                ? [...allFreeAgents]
                : [...allWaivedPlayers];
        const filter = FilterFreeAgencyPlayers(
            players,
            selectedPositions,
            selectedArchetypes,
            selectedStatuses,
            selectedPotentialLetterGrades
        );

        setFilteredPlayers(() => filter);
        setViewablePlayers(() => filter.slice(0, count));
    }, [
        freeAgencyView,
        allFreeAgents,
        allWaivedPlayers,
        selectedPositions,
        selectedArchetypes,
        selectedStatuses,
        selectedPotentialLetterGrades
    ]);

    useEffect(() => {
        if (cfb_Timestamp) {
            const isOffseason = cfb_Timestamp.IsNFLOffSeason;
            let label = '';
            if (isOffseason) {
                label = `Current Round: ${cfb_Timestamp.FreeAgencyRound}`;
            } else {
                label = `Current Week: ${cfb_Timestamp.NFLWeek}`;
            }
            setWeekLabel(() => label);
        }
    }, [cfb_Timestamp]);

    // API Calls
    const GetAvailablePlayers = async (TeamID) => {
        const res = await _rosterService.GetFreeAgencyData(TeamID);
        const FAs = res.FreeAgents.map((x) => {
            return { ...x };
        });
        const Waivers = res.WaiverPlayers.map((x) => {
            return { ...x };
        });
        const ExistingOffers = res.TeamOffers.map((x) => {
            return { ...x };
        });
        const all = [...FAs, ...Waivers];
        setAllPlayers(() => all);
        setAllFreeAgents(() => FAs);
        setAllWaivedPlayers(() => Waivers);
        setTeamOffers(() => ExistingOffers);
    };

    // Click Functions
    const ChangePositions = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedPositions(() => opts);
    };

    const ChangeArchetypes = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedArchetypes(() => opts);
    };

    const ChangePotentialLetterGrades = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedPotentialGrades(() => opts);
    };

    const ChangeStatuses = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedStatuses(() => opts);
    };

    // Needed Functions
    const loadRecords = () => {
        const currentPlayers = [...viewablePlayers];

        const newCount = [...currentPlayers].concat(
            [...filteredPlayers].slice(count, count + 100)
        );
        setViewableRecruits(() => newCount);
        SetCount((x) => x + 100);
    };

    const loadMoreRecords = () => {
        setTimeout(() => loadRecords(), 500);
    };

    const CreateFAOffer = async (player, offer) => {
        let res = await _rosterService.CancelFAOffer(offer);
        const viewingFA = freeAgencyView === 'FA';
        const players = viewingFA ? [...allFreeAgents] : [...allWaivedPlayers];
        const playerIDX = players.findIndex((x) => x.ID === player.ID);
        if (offer.ID > 0) {
            // Existing Offer
            const offerIDX = players[playerIDX].Offers.findIndex(
                (x) => x.ID === offer.ID
            );
            players[playerIDX].Offers[offerIDX] = offer;
        } else {
            const offerObj = { ...offer, ID: res.ID };
            players[playerIDX].Offers.push(offerObj);
        }

        if (viewingFA) {
            setAllFreeAgents(() => players);
        } else {
            setAllWaivedPlayers(() => players);
        }
    };

    const CancelOffer = async (player, offer) => {
        let res = await _rosterService.CancelFAOffer(offer);
        if (res) {
            const viewingFA = freeAgencyView === 'FA';
            const players = viewingFA
                ? [...allFreeAgents]
                : [...allWaivedPlayers];
            const playerIDX = players.findIndex((x) => x.ID === player.ID);
            const offers = [...players[playerIDX].Offers];
            players[playerIDX].Offers = offers.filter((x) => x.ID !== offer.ID);
            if (viewingFA) {
                setAllFreeAgents(() => players);
            } else {
                setAllWaivedPlayers(() => players);
            }
        }
    };

    // Sorts

    return (
        <div className="container-fluid">
            <div className="justify-content-start">
                <h2>SimNFL Free Agency</h2>
            </div>
            <div className="row">
                {team && cfb_Timestamp && (
                    <NFLSidebar
                        team={team}
                        ts={cfb_Timestamp}
                        isRoster={false}
                        TeamOffers={teamOffers}
                    />
                )}

                <div className="col-md-10">
                    <div className="row mt-3 justify-content-between">
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle">Filters</h4>
                        </div>
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle me-2">
                                {weekLabel}
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Position
                            </h5>
                            <Select
                                options={positions}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-6"
                                classNamePrefix="select"
                                onChange={ChangePositions}
                            />
                        </div>
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Archetype
                            </h5>
                            <Select
                                options={archetypes}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-6"
                                classNamePrefix="select"
                                onChange={ChangeArchetypes}
                            />
                        </div>
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Potential Grade
                            </h5>
                            <Select
                                options={letterGrades}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-6"
                                classNamePrefix="select"
                                onChange={ChangePotentialLetterGrades}
                            />
                        </div>
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Statuses
                            </h5>
                            <Select
                                options={statusOptions}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-6"
                                classNamePrefix="select"
                                onChange={ChangeStatuses}
                            />
                        </div>
                    </div>
                    <div className="row"></div>
                    {/* Modals Here */}
                    <div className="row mt-3 mb-5 dashboard-table-height">
                        {cfb_Timestamp && !cfb_Timestamp.IsFreeAgencyLocked ? (
                            <InfiniteScroll
                                dataLength={viewablePlayers.length}
                                next={loadMoreRecords}
                                hasMore={
                                    viewablePlayers.length <
                                        allFreeAgents.length &&
                                    viewablePlayers.length <
                                        allWaivedPlayers.length
                                }
                                height={570}
                                scrollThreshold={0.8}
                                loader={
                                    <div className="row justify-content-center">
                                        Loading More Players...
                                    </div>
                                }
                                endMessage={
                                    <div className="row justify-content-center">
                                        <h4>
                                            ...that's all the players we have.
                                            Blame the Commies if you can't find
                                            the players you want.
                                        </h4>
                                    </div>
                                }
                            >
                                {isMobile ? (
                                    ''
                                ) : (
                                    <table className="table table-hover">
                                        <thead
                                            style={{
                                                position: 'sticky',
                                                top: 0,
                                                backgroundColor: 'white',
                                                zIndex: 3
                                            }}
                                        >
                                            <tr>
                                                <th scope="col">Rank</th>
                                                <th
                                                    scope="col"
                                                    style={{ width: 175 }}
                                                >
                                                    Name
                                                </th>
                                                <th scope="col">Position</th>
                                                <th
                                                    scope="col"
                                                    style={{ width: 175 }}
                                                >
                                                    Archetype
                                                </th>
                                                <th scope="col">Experience</th>
                                                <th scope="col">Age</th>
                                                <th scope="col">Overall</th>
                                                <th scope="col">Potential</th>
                                                <th scope="col">
                                                    Previous Team
                                                </th>
                                                <th scope="col">Status</th>
                                                <th scope="col">
                                                    Minimum Value
                                                </th>
                                                <th scope="col">
                                                    Teams Offering
                                                </th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="overflow-auto">
                                            {viewablePlayers.length > 0 &&
                                                viewablePlayers.map(
                                                    (x, idx) => (
                                                        <>
                                                            <FreeAgencyPlayerModal
                                                                player={x}
                                                                idx={idx}
                                                            />
                                                            <FreeAgentOfferModal
                                                                team={team}
                                                                player={x}
                                                                idx={idx}
                                                                ts={
                                                                    cfb_Timestamp
                                                                }
                                                                extend={
                                                                    CreateFAOffer
                                                                }
                                                            />
                                                            <CancelOfferModal
                                                                player={x}
                                                                idx={idx}
                                                                cancel={
                                                                    CancelOffer
                                                                }
                                                                teamID={team.ID}
                                                            />
                                                            <NFLFreeAgencyRow
                                                                key={x.ID}
                                                                player={x}
                                                                teamID={team.ID}
                                                                idx={idx}
                                                                ts={
                                                                    cfb_Timestamp
                                                                }
                                                            />
                                                        </>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                )}
                            </InfiniteScroll>
                        ) : (
                            <>
                                <div className="row justify-content-center mt-3 mb-2">
                                    My dude, free agency is currently in-sync.
                                    Please wait until it's finished. Until then,
                                    make some tea and enjoy the next few
                                    minutes. Please check Discord for news on
                                    the completion of this week's free agency
                                    sync sync.
                                </div>

                                <div className="row justify-content-center pt-2 mt-4 mb-2">
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
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
    nflTeam: { nflTeam },
    timestamp: { cfb_Timestamp }
}) => ({
    currentUser,
    nflTeam,
    cfb_Timestamp
});

export default connect(mapStateToProps)(NFLFreeAgency);
