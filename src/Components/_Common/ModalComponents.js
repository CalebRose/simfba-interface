import React, { useEffect, useMemo, useState } from 'react';
import {
    cbbPromiseTypes,
    cfbPromiseTypes
} from '../../Constants/CommonConstants';
import BBAStatsService from '../../_Services/simNBA/BBAStatsService';
import FBAStatsService from '../../_Services/simFBA/FBAStatsService';
import {
    GetPromiseWeight,
    RoundToTwoDecimals
} from '../../_Utility/utilHelper';
import { BBAStatsRow } from './SeasonStatsRow';
import { MapOptions } from '../../_Utility/filterHelper';
import Select from 'react-select';
import { MinMaxRange } from './InputRange';
import { PortalService } from '../../_Services/simFBA/FBAPortalService';
import { GPTab } from '../Gameplan/GameplanCommons';
import { Notification } from './NewsLog';
import { useDispatch } from 'react-redux';
import {
    setCBBNotifications,
    setCFBNotifications,
    setNBANotifications,
    setNFLNotifications
} from '../../Redux/inbox/inbox.actions';
import AdminService from '../../_Services/simFBA/AdminService';

export const InfoModal = (props) => (
    <div
        className="modal modal-lg fade"
        id={props.id}
        tabindex="-1"
        aria-labelledby="schemeModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="crootModalLabel">
                        {props.header}
                    </h4>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export const OfficialPollModal = (props) => (
    <div
        className="modal modal-md fade"
        id={props.id}
        tabindex="-1"
        aria-labelledby="schemeModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content poll-modal-fixed">
                <div className="modal-header">
                    <h4 className="modal-title" id="crootModalLabel">
                        {props.header}
                    </h4>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export const ExtraLargeModal = (props) => (
    <div
        className="modal modal-xl fade"
        id={props.id}
        tabindex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="crootModalLabel">
                        {props.header}
                    </h4>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-footer">
                    {props.Submit && props.enableSubmit && (
                        <button
                            type="button"
                            className="btn btn-primary me-2"
                            data-bs-dismiss="modal"
                            onClick={props.Submit}
                        >
                            Submit
                        </button>
                    )}
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export const CommonModal = (props) => {
    return (
        <div
            className="modal fade"
            id={props.ID}
            tabindex="-1"
            aria-labelledby="commonModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className={props.ModalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="commonModalLabel">
                            {props.Header}
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">{props.children}</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ConfirmModal = (props) => {
    const confirm = () => {
        return props.ConfirmChanges();
    };
    return (
        <div
            className="modal fade"
            id={props.ModalID}
            tabindex="-1"
            aria-labelledby="saveRecruitingBoardModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className={props.ModalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="confirmModalLabel">
                            {props.Header}
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">{props.children}</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            disabled={!props.IsValid}
                            onClick={() => confirm()}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const PromisePlayerModal = (props) => {
    const { promisePlayer, submit, isCFB, teams, seasonID, teamID } = props;
    const _statsService = isCFB ? new FBAStatsService() : new BBAStatsService();
    const _portalService = new PortalService();
    const id = 'promiseModal';
    const [promise, setPromise] = useState(null);
    const [promiseType, setPromiseType] = useState('');
    const [promiseWeight, setPromiseWeight] = useState('');
    const [benchmark, setBenchmark] = useState(0);
    const [minRange, setMinRange] = useState(1);
    const [maxRange, setMaxRange] = useState(100);
    const [isNumericPromise, setIsNumericPromise] = useState(false);
    const [seasonStats, setSeasonStats] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [validMessage, setValidMessage] = useState('');
    const header = promisePlayer
        ? `${promisePlayer.PlayerID} ${promisePlayer.Position} ${
              promisePlayer.FirstName
          } ${promisePlayer.LastName} ${
              validMessage.length > 0 ? ` | ${validMessage}` : ''
          }`
        : 'Promise a Player';
    const promiseTypes = isCFB ? cfbPromiseTypes : cbbPromiseTypes;
    const promiseTypeList = MapOptions(promiseTypes);
    const coachPreferenceBias = 'Prefers to play for a specific coach';
    const legacyPreferenceBias = 'Legacy';
    const legacyTeamIDX =
        promisePlayer && promisePlayer.RecruitingBias === legacyPreferenceBias
            ? teams.findIndex((x) => x.ID === promisePlayer.LegacyID)
            : -1;

    const legacyTeam = legacyTeamIDX > -1 ? teams[legacyTeamIDX] : null;
    const legacyTeamAbbr = useMemo(() => {
        return legacyTeam && isCFB
            ? legacyTeam.TeamAbbr
            : legacyTeam && !isCFB
            ? legacyTeam.Abbr
            : null;
    }, [legacyTeam, isCFB]);

    useEffect(() => {
        if (promisePlayer) {
            getSeasonStatsByPlayerID(promisePlayer.PlayerID, seasonID);
            getPromiseByPlayerID(promisePlayer.PlayerID, teamID);
        }
    }, [promisePlayer]);

    useEffect(() => {
        if (!promisePlayer) return;
        const isNumeric =
            promiseType === 'Wins' ||
            promiseType === 'Snaps' ||
            promiseType === 'Minutes';
        setIsNumericPromise(() => isNumeric);
        if (promiseType === 'Wins') {
            const maxR = isCFB ? 17 : 40;
            setMaxRange(() => maxR);
        }
        if (promiseType === 'Minutes') {
            setMaxRange(() => promisePlayer.Stamina);
        }
        if (promiseType === 'Snaps') {
            setMaxRange(() => 60);
        }
        const weight = GetPromiseWeight(
            promiseType,
            benchmark,
            promisePlayer.Position,
            isCFB
        );
        setPromiseWeight(() => weight);
        ValidatePromise(promiseType, benchmark, promisePlayer, isCFB);
    }, [promiseType, benchmark, promisePlayer, isCFB]);

    const getSeasonStatsByPlayerID = async (playerID, seasonID) => {
        const res = await _statsService.GetCollegeSeasonStatsByPlayerID(
            playerID,
            seasonID
        );
        if (res) {
            setSeasonStats(() => res);
        }
    };

    const getPromiseByPlayerID = async (playerID, teamID) => {
        const res = await _portalService.GetCollegePromiseByPlayerID(
            isCFB,
            playerID,
            teamID
        );

        if (res && res.ID > 0) {
            setPromise(() => res);
            setPromiseType(() => res.PromiseType);
            setPromiseWeight(() => res.PromiseWeight);
            setBenchmark(() => res.Benchmark);
        } else {
            setPromise(() => null);
            setPromiseType(() => 'None');
            setPromiseWeight(() => 0);
            setBenchmark(() => 0);
        }
    };

    const ChangePromiseType = (options) => {
        setPromiseType(() => options.value);
    };

    const ChangeBenchmark = (event) => {
        const { value } = event.target;
        setBenchmark(() => value);
    };

    const ValidatePromise = (pt, benchmark, player, isCFB) => {
        let valid = true;

        if (pt === 'Home State Game' && player.Country !== 'USA') {
            valid = false;
            setValidMessage(
                () =>
                    'Error: Cannot schedule a game outside of the United States.'
            );
        }

        if (!isCFB && pt === 'Minutes' && benchmark > player.Stamina) {
            valid = false;
            setValidMessage(
                () => "Error: Cannot playing time beyond the player's stamina."
            );
        }
        if (
            pt === 'No Redshirt' &&
            (player.IsRedshirting || player.IsRedshirt)
        ) {
            valid = false;
            setValidMessage(
                () =>
                    "Error: You cannot promise this player that is currently redshirting or has redshirted. It's a bit late for that."
            );
        }

        if (valid) {
            setValidMessage(() => 'This is a valid promise.');
        }
        setIsValid(() => valid);
    };

    const commitPromise = async () => {
        const p = promise ? { ...promise } : null;
        let promiseID = p ? p.ID : 0;
        const dto = {
            ID: promiseID,
            PromiseType: promiseType,
            CollegePlayerID: promisePlayer.PlayerID,
            TeamID: teamID,
            PromiseWeight: promiseWeight,
            Benchmark: Number(benchmark),
            BenchmarkStr: promisePlayer.State,
            IsActive: true,
            PromiseMade: false,
            IsFulfilled: false
        };
        return await submit(dto);
    };

    return (
        <ExtraLargeModal
            header={header}
            id={id}
            enableSubmit={isValid}
            Submit={commitPromise}
        >
            {promisePlayer && (
                <>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-3">
                                    <h6>Recruiting Bias</h6>
                                    <p>{promisePlayer.RecruitingBias}</p>
                                </div>
                                <div className="col-3">
                                    <h6>Transfer Likeliness</h6>
                                    <p>{promisePlayer.TransferLikeliness}</p>
                                </div>
                                <div className="col-3">
                                    <h6>Expected Minutes</h6>
                                    <p>{promisePlayer.PlaytimeExpectations}</p>
                                </div>
                                {promisePlayer.LegacyID > 0 && (
                                    <div className="col-3">
                                        <h6>
                                            {promisePlayer.RecruitingBias ===
                                            coachPreferenceBias
                                                ? 'Preferred Coach'
                                                : 'Preferred Team'}
                                        </h6>
                                        <p>
                                            {promisePlayer.RecruitingBias ===
                                            coachPreferenceBias
                                                ? ''
                                                : legacyTeamAbbr}
                                        </p>
                                    </div>
                                )}
                                <div className="col-3">
                                    <h6>Personality</h6>
                                    <p>{promisePlayer.Personality}</p>
                                </div>
                            </div>
                            {seasonStats && (
                                <>
                                    <div className="row mt-2">
                                        <div className="col-auto">
                                            <h5>Season Stats</h5>
                                        </div>
                                        <div className="col-auto">
                                            <h6>Games Played</h6>
                                            <p>{seasonStats.GamesPlayed}</p>
                                        </div>
                                        <div className="ms-2 col-auto">
                                            <h6>Minutes</h6>
                                            <p>
                                                {RoundToTwoDecimals(
                                                    seasonStats.MinutesPerGame
                                                )}
                                            </p>
                                        </div>
                                        <div className="col-auto">
                                            <h6>Possessions</h6>
                                            <p>
                                                {RoundToTwoDecimals(
                                                    seasonStats.PossessionsPerGame
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <BBAStatsRow SeasonStats={seasonStats} />
                                </>
                            )}
                        </div>
                        <div className="col-6">
                            <div className="row justify-content-center">
                                <div className="col-auto">
                                    <h5>Make a Promise</h5>
                                </div>
                            </div>
                            <div className="row mt-2 justify-content-start">
                                <div className="col-auto">
                                    <h6>Promise Type: {promiseType}</h6>
                                    <Select
                                        options={promiseTypeList}
                                        isMulti={false}
                                        className="basic-multi-select btn-dropdown-width-team z-index-5"
                                        classNamePrefix="select"
                                        onChange={ChangePromiseType}
                                    />
                                </div>
                                <div className="col-auto">
                                    <h6>Promise Weight</h6>
                                    <p>{promiseWeight}</p>
                                </div>
                            </div>
                            <div className="row mt-2 d-flex justify-content-start">
                                {promiseType === 'Home State Game' && (
                                    <>
                                        <h6>Home State</h6>
                                        <p>{promisePlayer.State}</p>
                                    </>
                                )}

                                {isNumericPromise && (
                                    <div className="px-3">
                                        <MinMaxRange
                                            id={promiseType}
                                            name="Benchmark"
                                            label={promiseType}
                                            value={benchmark}
                                            min={minRange}
                                            max={maxRange}
                                            change={ChangeBenchmark}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </ExtraLargeModal>
    );
};

export const InboxModal = ({ inbox }) => {
    const _adminService = new AdminService();
    const [league, setLeague] = useState('CFB');
    const dispatch = useDispatch();
    const header = 'Inbox';
    const id = 'inboxModal';
    const {
        cfbNotifications,
        nflNotifications,
        cbbNotifications,
        nbaNotifications
    } = inbox;

    const toggleNotification = async (noti) => {
        await _adminService.ToggleNotification(noti.ID);
        if (league === 'CFB') {
            handleNotifications(cfbNotifications, noti, setCFBNotifications);
        } else if (league === 'NFL') {
            handleNotifications(nflNotifications, noti, setNFLNotifications);
        } else if (league === 'CBB') {
            handleNotifications(cbbNotifications, noti, setCBBNotifications);
        } else if (league === 'NBA') {
            handleNotifications(nbaNotifications, noti, setNBANotifications);
        }
    };

    const handleNotifications = (list, noti, setNotification) => {
        const listNoti = [...list];
        const notiIDX = listNoti.findIndex((x) => x.ID === noti.ID);
        if (notiIDX > -1) {
            listNoti[notiIDX].IsRead = !listNoti[notiIDX].IsRead;
            dispatch(setNotification(listNoti));
        }
    };

    const removeNotification = async (noti) => {};

    return (
        <CommonModal Header={header} ID={id} ModalClass="modal-content">
            <div className="row mb-2">
                <ul className="nav nav-tabs">
                    <GPTab
                        activeView={league}
                        gameplanType="CFB"
                        setActiveView={setLeague}
                    />
                    <GPTab
                        activeView={league}
                        gameplanType="NFL"
                        setActiveView={setLeague}
                    />
                    <GPTab
                        activeView={league}
                        gameplanType="CBB"
                        setActiveView={setLeague}
                    />
                    <GPTab
                        activeView={league}
                        gameplanType="NBA"
                        setActiveView={setLeague}
                    />
                </ul>
            </div>
            <div className="row mb-2 overflow-y-scroll">
                {league === 'CFB' &&
                    cfbNotifications.map((x) => (
                        <Notification noti={x} toggle={toggleNotification} />
                    ))}
                {league === 'NFL' &&
                    nflNotifications.map((x) => (
                        <Notification noti={x} toggle={toggleNotification} />
                    ))}
                {league === 'CBB' &&
                    cbbNotifications.map((x) => (
                        <Notification noti={x} toggle={toggleNotification} />
                    ))}
                {league === 'NBA' &&
                    nbaNotifications.map((x) => (
                        <Notification noti={x} toggle={toggleNotification} />
                    ))}
            </div>
        </CommonModal>
    );
};
