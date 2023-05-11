import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Select from 'react-select';
import {
    ArchetypesListForFA,
    LetterGradesList,
    PositionList
} from '../../../Constants/CommonConstants';
import { GetTableHoverClass } from '../../../Constants/CSSClassHelper';
import EasterEggService from '../../../_Services/simFBA/EasterEggService';
import FBAPlayerService from '../../../_Services/simFBA/FBAPlayerService';
import { MapObjOptions, MapOptions } from '../../../_Utility/filterHelper';
import { Spinner } from '../../_Common/Spinner';
import { NFLSidebar } from '../Roster/NFLSidebar';
import { FilterFreeAgencyPlayers } from './FreeAgencyHelper';
import { NFLFreeAgencyMobileRow } from './NFLFreeAgencyMobileRow';
import NFLFreeAgencyRow from './NFLFreeAgencyRow';

const NFLFreeAgency = ({ currentUser, nflTeam, cfb_Timestamp, viewMode }) => {
    let _rosterService = new FBAPlayerService();
    let _easterEggService = new EasterEggService();
    const positions = MapObjOptions(PositionList);
    const archetypes = MapObjOptions(ArchetypesListForFA);
    const letterGrades = MapOptions(LetterGradesList);
    const [selectedPositions, setSelectedPositions] = useState('');
    const [selectedArchetypes, setSelectedArchetypes] = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState('');
    const [selectedPotentialLetterGrades, setSelectedPotentialGrades] =
        useState('');
    const [team, setTeam] = useState(null);
    const [viewablePlayers, setViewablePlayers] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState('');
    const [viewOfferedPlayers, setViewOfferedPlayers] = useState(false);
    const [viewUDFAs, setViewUDFAs] = useState(false);
    const [canModify, setCanModify] = useState(true);
    const [allPlayers, setAllPlayers] = useState('');
    const [allFreeAgents, setAllFreeAgents] = useState('');
    const [allWaivedPlayers, setAllWaivedPlayers] = useState('');
    const [freeAgencyView, setFreeAgencyView] = useState('FA');
    const [teamOffers, setTeamOffers] = useState([]);
    const [showTamperingButton, setShowButton] = useState(true);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const [count, SetCount] = useState(100);
    const [weekLabel, setWeekLabel] = useState('');
    const isMobile = useMediaQuery({ query: `(max-width:844px)` });
    let luckyTeam = Math.floor(Math.random() * (20 - 1) + 1);
    const statusOptions = MapOptions(['Open', 'Negotiating']);
    const tableClass = GetTableHoverClass(viewMode);
    // For mobile
    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    useEffect(() => {
        if (allPlayers.length === 0 && currentUser) {
            GetAvailablePlayers(currentUser.NFLTeamID);
            setCanModify(
                () =>
                    currentUser.NFLRole === 'Owner' ||
                    currentUser.NFLRole === 'Manager' ||
                    currentUser.roleID === 'Admin'
            );
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
            selectedPotentialLetterGrades,
            viewUDFAs
        );

        // To view players with team offers
        if (viewOfferedPlayers) {
            const filterOnlyOfferedPlayers = [];
            for (let i = 0; i < filter.length; i++) {
                const item = filter[i];
                if (freeAgencyView === 'FA') {
                    if (item.Offers !== null && item.Offers.length > 0) {
                        const check = item.Offers.some(
                            (x) => x.TeamID === currentUser.NFLTeamID
                        );
                        if (check) filterOnlyOfferedPlayers.push(item);
                    }
                } else {
                    if (
                        item.WaiverOffers !== null &&
                        item.WaiverOffers.length > 0
                    ) {
                        const check = item.WaiverOffers.some(
                            (x) => x.TeamID === currentUser.NFLTeamID
                        );
                        if (check) filterOnlyOfferedPlayers.push(item);
                    }
                }
            }
            setFilteredPlayers(() => filterOnlyOfferedPlayers);
            setViewablePlayers(() => filterOnlyOfferedPlayers.slice(0, count));
        } else {
            setFilteredPlayers(() => filter);
            setViewablePlayers(() => filter.slice(0, count));
        }
    }, [
        freeAgencyView,
        allFreeAgents,
        allWaivedPlayers,
        selectedPositions,
        selectedArchetypes,
        selectedStatuses,
        selectedPotentialLetterGrades,
        viewOfferedPlayers,
        viewUDFAs
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

    const ToggleViewOfferedPlayers = () => {
        const toggle = !viewOfferedPlayers;
        setViewOfferedPlayers(() => toggle);
    };

    const ToggleUDFAs = () => {
        const toggle = !viewUDFAs;
        setViewUDFAs(() => toggle);
    };

    const ToggleFAView = () => {
        setViewablePlayers(() => []);
        const nextView = freeAgencyView === 'FA' ? 'WW' : 'FA';
        setFreeAgencyView(() => nextView);
    };

    // Needed Functions
    const loadRecords = () => {
        const currentPlayers = [...viewablePlayers];

        const newCount = [...currentPlayers].concat(
            [...filteredPlayers].slice(count, count + 100)
        );
        setViewablePlayers(() => newCount);
        SetCount((x) => x + 100);
    };

    const loadMoreRecords = () => {
        setTimeout(() => loadRecords(), 500);
    };

    const CreateFAOffer = async (player, offer) => {
        let res = await _rosterService.CreateFAOffer(offer);
        const viewingFA = freeAgencyView === 'FA';
        const players = viewingFA ? [...allFreeAgents] : [...allWaivedPlayers];
        const playerIDX = players.findIndex((x) => x.ID === player.ID);
        const ExistingOffers = [...teamOffers];
        if (offer.ID > 0) {
            // Existing Offer
            const offerIDX = players[playerIDX].Offers.findIndex(
                (x) => x.ID === offer.ID
            );

            const existingOffersIdx = ExistingOffers.findIndex(
                (x) => x.ID === offer.ID
            );
            ExistingOffers[existingOffersIdx] = offer;
            players[playerIDX].Offers[offerIDX] = offer;
        } else {
            const offerObj = { ...offer, ID: res.ID };
            const offers = players[playerIDX].Offers;
            offers.push(offerObj);
            players[playerIDX].Offers = offers.sort(
                (a, b) => a.ContractValue - b.ContractValue
            );
            ExistingOffers.push(offerObj);
        }

        setTeamOffers(() => ExistingOffers);

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
                    <div className="row mt-1">
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">FA View</h5>
                            <button
                                type="button"
                                className={`btn ${
                                    freeAgencyView
                                        ? 'btn-outline-info'
                                        : 'btn-outline-success'
                                }`}
                                onClick={ToggleFAView}
                            >
                                {freeAgencyView == 'FA'
                                    ? 'Waiver Wire'
                                    : 'Free Agency'}
                            </button>
                        </div>
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">Toggle</h5>
                            <button
                                type="button"
                                className={`btn ${
                                    viewOfferedPlayers
                                        ? 'btn-outline-danger'
                                        : 'btn-outline-success'
                                }`}
                                onClick={ToggleViewOfferedPlayers}
                            >
                                {viewOfferedPlayers
                                    ? 'View Full List'
                                    : 'View Offered Players'}
                            </button>
                        </div>
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">Toggle</h5>
                            <button
                                type="button"
                                className={`btn ${
                                    viewOfferedPlayers
                                        ? 'btn-outline-danger'
                                        : 'btn-outline-success'
                                }`}
                                onClick={ToggleUDFAs}
                            >
                                {viewUDFAs ? 'View Full List' : 'View UDFAs'}
                            </button>
                        </div>
                    </div>
                    {/* Modals Here */}
                    <div
                        className={`row mt-3 mb-5 dashboard-table-height${
                            viewMode === 'dark' ? '-dark' : ''
                        }`}
                    >
                        {cfb_Timestamp && !cfb_Timestamp.IsFreeAgencyLocked ? (
                            <InfiniteScroll
                                dataLength={viewablePlayers.length}
                                next={loadMoreRecords}
                                hasMore={
                                    viewablePlayers.length <
                                        allFreeAgents.length ||
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
                                        </h4>
                                    </div>
                                }
                            >
                                {isMobile ? (
                                    viewablePlayers.length > 0 &&
                                    viewablePlayers.map((x, idx) => (
                                        <>
                                            <NFLFreeAgencyMobileRow
                                                key={x.ID}
                                                player={x}
                                                teamID={team.ID}
                                                idx={idx}
                                                ts={cfb_Timestamp}
                                                viewMode={viewMode}
                                                canModify={canModify}
                                                team={team}
                                                cancel={CancelOffer}
                                                extend={CreateFAOffer}
                                                freeAgencyView={freeAgencyView}
                                            />
                                        </>
                                    ))
                                ) : (
                                    <table className={tableClass}>
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
                                                <th scope="col">Age | Exp</th>
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
                                            {!cfb_Timestamp.IsFreeAgencyLocked &&
                                                team &&
                                                viewablePlayers.length > 0 &&
                                                viewablePlayers.map(
                                                    (x, idx) => (
                                                        <NFLFreeAgencyRow
                                                            key={x.ID}
                                                            player={x}
                                                            teamID={team.ID}
                                                            idx={idx}
                                                            ts={cfb_Timestamp}
                                                            viewMode={viewMode}
                                                            canModify={
                                                                canModify
                                                            }
                                                            team={team}
                                                            cancel={CancelOffer}
                                                            extend={
                                                                CreateFAOffer
                                                            }
                                                            freeAgencyView={
                                                                freeAgencyView
                                                            }
                                                        />
                                                    )
                                                )}

                                            {cfb_Timestamp.IsFreeAgencyLocked && (
                                                <>
                                                    <tr className="mt -2">
                                                        Free Agency is currently
                                                        syncing. Please be
                                                        patient and make
                                                        yourself a cup of tea.
                                                        You deserve it.
                                                    </tr>
                                                </>
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
                                    <Spinner />
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
    timestamp: { cfb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    nflTeam,
    cfb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(NFLFreeAgency);
