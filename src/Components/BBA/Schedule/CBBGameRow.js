import React from 'react';
import { getLogo } from '../../../Constants/getLogo';
import { SimCBB, SimNBA } from '../../../Constants/CommonConstants';

const CBBGameRow = (props) => {
    const { idx, game, ts, viewType, retro, leagueView } = props;
    const league = leagueView === 'CBB' ? SimCBB : SimNBA;

    const currentSeason = ts.SeasonID;
    const pastSeason = game.SeasonID < currentSeason;
    const modalTarget = `#gameModal`;
    let cardClass = 'card card-small mb-3 bba-match-row';
    const currentWeek = ts.NBAWeek;
    const ShowAGame =
        ts.GamesARan && game.Week === currentWeek && game.MatchOfWeek === 'A';
    const ShowBGame =
        ts.GamesBRan && game.Week === currentWeek && game.MatchOfWeek === 'B';
    const ShowCGame =
        ts.GamesCRan && game.Week === currentWeek && game.MatchOfWeek === 'C';
    const ShowDGame =
        ts.GamesDRan && game.Week === currentWeek && game.MatchOfWeek === 'D';
    const homeTeam = {
        Team: game.HomeTeam,
        TeamScore: game.HomeTeamScore,
        TeamWin: game.HomeTeamWin,
        Coach: game.HomeTeamCoach,
        Rank: game.HomeTeamRank,
        ID: game.HomeTeamID
    };
    const awayTeam = {
        ID: game.AwayTeamID,
        Team: game.AwayTeam,
        TeamScore: game.AwayTeamScore,
        TeamWin: game.AwayTeamWin,
        Coach: game.AwayTeamCoach,
        Rank: game.AwayTeamRank
    };
    const HomeTeamLogo = getLogo(league, homeTeam.ID, retro);
    const AwayTeamLogo = getLogo(league, awayTeam.ID, retro);
    const GameWeek = game.Week;
    const ConferenceGame = game.IsConference;
    let detailsLabel = '';
    if (game.MatchName.length > 0 || game.MatchName !== '') {
        detailsLabel = game.MatchName;
    } else if (!ConferenceGame) {
        detailsLabel = 'Non-Conference Game';
    } else if (ConferenceGame) {
        detailsLabel = `Conference Game`;
    }
    if (game.IsNeutral) {
        detailsLabel += ' | Neutral Site';
    }

    const SetGame = () => {
        return props.SetGame(game);
    };
    return (
        <div className={cardClass}>
            <div className="row g-0">
                <div className="col-md-2 d-flex flex-row align-items-center justify-content-center mv-icon">
                    <img
                        src={HomeTeamLogo}
                        className="img-fluid rounded-start bba-match-schedule p-1"
                        alt="homeTeam"
                    />
                </div>
                <div className="col-md-8 mv-description">
                    <div className="card-body">
                        <h6 className="card-title">
                            {viewType !== 'WEEK' ? <>Week {GameWeek} </> : ''}
                            {homeTeam.Rank > 0 ? `(${homeTeam.Rank}) ` : ''}
                            {homeTeam.Team} vs{' '}
                            {awayTeam.Rank > 0 ? `(${awayTeam.Rank}) ` : ''}
                            {awayTeam.Team}
                        </h6>
                        <strong className="card-subtitle">
                            Home: {homeTeam.Coach} | Away: {awayTeam.Coach}
                        </strong>
                        <p className="card-text">
                            {detailsLabel}{' '}
                            {game.GameComplete &&
                                (game.Week < currentWeek ||
                                    ShowAGame ||
                                    ShowBGame ||
                                    ShowCGame ||
                                    ShowDGame ||
                                    pastSeason) && (
                                    <>
                                        {'| '}
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
                                        <button
                                            type="button"
                                            className="btn btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target={modalTarget}
                                            onClick={SetGame}
                                        >
                                            <i className="bi bi-info-circle" />
                                        </button>
                                    </>
                                )}
                        </p>
                        <small className="card-text">
                            {game.Arena} in {game.City}, {game.State}
                        </small>
                    </div>
                </div>
                <div className="col-md-2 d-flex flex-row align-items-center justify-content-center mv-icon">
                    <img
                        src={AwayTeamLogo}
                        className="img-fluid rounded-start bba-match-schedule p-1"
                        alt="AwayTeam"
                    />
                </div>
            </div>
        </div>
    );
};

export default CBBGameRow;
