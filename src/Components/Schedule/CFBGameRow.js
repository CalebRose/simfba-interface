import React from 'react';
import { getLogo } from '../../Constants/getLogo';
import {
    RevealResults,
    RoundToTwoDecimals,
    TitleCase
} from '../../_Utility/utilHelper';
import { Dropdown } from '../_Common/Dropdown';
import {
    CFBTimeSlotList,
    NFLTimeSlotList,
    SimCFB,
    SimNFL
} from '../../Constants/CommonConstants';

const GameRow = ({
    idx,
    game,
    ts,
    viewMode,
    isAdmin,
    change,
    isNFL,
    retro,
    SetGame,
    viewType
}) => {
    const modalTarget = `#gameModal`;
    const currentWeek = !isNFL ? ts.CollegeWeek : ts.NFLWeek;
    const currentSeason = !isNFL ? ts.CollegeSeasonID : ts.NFLSeasonID;
    let TimeSlotList = CFBTimeSlotList;
    if (isNFL) {
        TimeSlotList = NFLTimeSlotList;
    }
    const league = isNFL ? SimNFL : SimCFB;
    const { HighTemp, LowTemp, Precip, WindCategory, WindSpeed, TimeSlot } =
        game;

    const homeTeam = {
        ID: game.HomeTeamID,
        Team: game.HomeTeam,
        TeamScore: game.HomeTeamScore,
        TeamWin: game.HomeTeamWin,
        Coach: game.HomeTeamCoach
    };

    const awayTeam = {
        ID: game.AwayTeamID,
        Team: game.AwayTeam,
        TeamScore: game.AwayTeamScore,
        TeamWin: game.AwayTeamWin,
        Coach: game.AwayTeamCoach
    };

    const HomeTeamLogo = getLogo(league, homeTeam.ID, retro);
    const AwayTeamLogo = getLogo(league, awayTeam.ID, retro);
    const GameWeek = game.Week;
    const ConferenceGame = game.IsConference;
    const DivisionGame = game.IsDivisional;
    let detailsLabel = '';
    if (game.GameTitle.length > 0 || game.GameTitle !== '') {
        detailsLabel = game.GameTitle;
    } else if (!ConferenceGame && !DivisionGame) {
        detailsLabel = 'Non-Conference Game';
    } else if (DivisionGame && ConferenceGame) {
        detailsLabel = `Conference Divisional Game`;
    } else {
        detailsLabel = `Conference Game`;
    }
    if (game.IsNeutral) {
        detailsLabel += ' | Neutral Site';
    }
    let homeTeamLabel = homeTeam.Team;
    let awayTeamLabel = awayTeam.Team;
    if (game.HomeTeamRank > 0) {
        homeTeamLabel = `(${game.HomeTeamRank}) ${homeTeam.Team}`;
    }
    if (game.AwayTeamRank > 0) {
        awayTeamLabel = `(${game.AwayTeamRank}) ${awayTeam.Team}`;
    }
    let cardClass = `card game-record mb-3 ${
        viewMode === 'dark' ? 'text-bg-dark' : ''
    }`;
    const showGame = RevealResults(game, ts);
    const ChangeTimeslot = async (name, value) => {
        return await change(value, game);
    };

    const SetGameState = () => {
        return SetGame(game);
    };

    return (
        <div className={cardClass}>
            <div className="row g-0">
                <div className="col-md-3 mt-4 align-middle">
                    <div className="row mb-1 justify-content-center">
                        <img
                            src={HomeTeamLogo}
                            className="img-fluid rounded-start img-match-schedule p-1"
                            alt="homeTeam"
                        />
                    </div>
                    <div className="row mb-1">
                        <h6 className="card-subtitle">
                            Home Team Coach: {homeTeam.Coach}
                        </h6>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">
                            {viewType === 'TEAM' ? `Week ${GameWeek} ` : ''}
                            {homeTeamLabel} vs {awayTeamLabel}
                        </h5>
                        <div className="row">
                            <div className="col">
                                <p className="card-text">{detailsLabel}</p>
                            </div>
                            <div className="col">
                                {!isAdmin || game.GameComplete ? (
                                    <p className="card-text">{TimeSlot}</p>
                                ) : (
                                    <Dropdown
                                        value={TimeSlot}
                                        name="Time Slot"
                                        list={TimeSlotList}
                                        click={ChangeTimeslot}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="row mb-1">
                            {(showGame ||
                                isAdmin ||
                                GameWeek < currentWeek ||
                                game.SeasonID < currentSeason) && (
                                <>
                                    <p className="card-text">
                                        <span
                                            className={
                                                homeTeam.TeamWin
                                                    ? 'text-success'
                                                    : 'text-danger'
                                            }
                                        >
                                            {game.HomeTeamScore}
                                        </span>{' '}
                                        -{' '}
                                        <span
                                            className={
                                                awayTeam.TeamWin
                                                    ? 'text-success'
                                                    : 'text-danger'
                                            }
                                        >
                                            {game.AwayTeamScore}
                                        </span>
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target={modalTarget}
                                        onClick={SetGameState}
                                    >
                                        <i className="bi bi-info-circle" />
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="row">
                            <small className="card-text">
                                Location: {game.Stadium} in {game.City},{' '}
                                {game.State}
                            </small>
                            {currentWeek >= GameWeek - 1 && (
                                <small className="card-text">
                                    Weather Prediction: {Math.floor(LowTemp)}-
                                    {Math.floor(HighTemp)} deg,{' '}
                                    {TitleCase(Precip)}, {WindCategory}{' '}
                                    {Math.floor(WindSpeed)}mph winds
                                </small>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mt-4 align-middle">
                    <div className="row mb-1 justify-content-center">
                        <img
                            src={AwayTeamLogo}
                            className="img-fluid rounded-start img-match-schedule p-1"
                            alt="AwayTeam"
                        />
                    </div>
                    <div className="row mb-1">
                        <h6 className="card-subtitle">
                            Away Team Coach: {awayTeam.Coach}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameRow;
