import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Select from 'react-select';
import {
    LetterGradesList,
    PositionList
} from '../../../../Constants/BBAConstants';
import { GetTableHoverClass } from '../../../../Constants/CSSClassHelper';
import BBAPlayerService from '../../../../_Services/simNBA/BBAPlayerService';
import { MapObjOptions, MapOptions } from '../../../../_Utility/filterHelper';
import { NBASidebar } from '../Sidebar/NBASidebar';

const NBAFreeAgency = ({ currentUser, nbaTeam, cbb_Timestamp, viewMode }) => {
    const _playerService = new BBAPlayerService();
    const positions = MapObjOptions(PositionList);
    const letterGrades = MapOptions(LetterGradesList);
    const statusOptions = MapOptions(['Open', 'Negotiating']);
    const [selectedPositions, setSelectedPositions] = useState('');
    const [selectedArchetypes, setSelectedArchetypes] = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState('');
    const [selectedPotentialLetterGrades, setSelectedPotentialGrades] =
        useState('');
    const [team, setTeam] = useState(null);
    const [viewablePlayers, setViewablePlayers] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState('');
    const [viewOfferedPlayers, setViewOfferedPlayers] = useState(false);
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
    const tableClass = GetTableHoverClass(viewMode);

    // For mobile
    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    useEffect(() => {
        if (allPlayers.length === 0 && currentUser) {
            GetAvailablePlayers(currentUser.NBATeamID);
            // setCanModify(
            //     () =>
            //         currentUser.NBARole === 'Owner' ||
            //         currentUser.NBARole === 'Manager' ||
            //         currentUser.roleID === 'Admin'
            // );
        }
    }, [allPlayers, currentUser]);

    useEffect(() => {
        if (nbaTeam && !team) {
            setTeam(() => nbaTeam);
        }
    }, [nbaTeam, team]);

    useEffect(() => {
        if (cbb_Timestamp) {
            const isOffseason = cbb_Timestamp.IsNFLOffSeason;
            let label = '';
            if (isOffseason) {
                label = `Current Round: ${cbb_Timestamp.FreeAgencyRound}`;
            } else {
                label = `Current Week: ${cbb_Timestamp.NFLWeek}`;
            }
            setWeekLabel(() => label);
        }
    }, [cbb_Timestamp]);

    // Api Calls
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

    // Needed functions
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

    return (
        <div className="container-fluid">
            <div className="justify-content-start">
                <h2>SimNBA Free Agency</h2>
            </div>
            <div className="row">
                {team && cbb_Timestamp && (
                    <NBASidebar
                        team={team}
                        ts={cbb_Timestamp}
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
                    </div>
                    <div className="row"></div>
                    {/* Modals Here */}
                    <div
                        className={`row mt-3 mb-5 dashboard-table-height${
                            viewMode === 'dark' ? '-dark' : ''
                        }`}
                    >
                        {cbb_Timestamp && !cbb_Timestamp.IsFreeAgencyLocked ? (
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
                                                ts={cbb_Timestamp}
                                                viewMode={viewMode}
                                                canModify={canModify}
                                                team={team}
                                                cancel={CancelOffer}
                                                extend={CreateFAOffer}
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
                                            {team &&
                                                viewablePlayers.length > 0 &&
                                                viewablePlayers.map(
                                                    (x, idx) => (
                                                        <NFLFreeAgencyRow
                                                            key={x.ID}
                                                            player={x}
                                                            teamID={team.ID}
                                                            idx={idx}
                                                            ts={cbb_Timestamp}
                                                            viewMode={viewMode}
                                                            canModify={
                                                                canModify
                                                            }
                                                            team={team}
                                                            cancel={CancelOffer}
                                                            extend={
                                                                CreateFAOffer
                                                            }
                                                        />
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
    nbaTeam: { nbaTeam },
    timestamp: { cbb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    nbaTeam,
    cbb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(NBAFreeAgency);
