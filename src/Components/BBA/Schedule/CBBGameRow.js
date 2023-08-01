import React from 'react';
import { getLogo } from '../../../Constants/getLogo';

const CBBGameRow = (props) => {
    const { idx, game, ts } = props;

    const currentSeason = ts.SeasonID;
    const pastSeason = game.SeasonID < currentSeason;
    const modalTarget = `#gameModal`;
    let cardClass = 'card mb-3 bba-match-row';
    const ShowAGame =
        ts.GamesARan && game.Week === currentWeek && game.MatchOfWeek === 'A';
    const ShowBGame =
        ts.GamesBRan && game.Week === currentWeek && game.MatchOfWeek === 'B';
    const currentWeek = ts.CollegeWeek;
    const homeTeam = {
        Team: game.HomeTeam,
        TeamScore: game.HomeTeamScore,
        TeamWin: game.HomeTeamWin,
        Coach: game.HomeTeamCoach
    };
    const awayTeam = {
        Team: game.AwayTeam,
        TeamScore: game.AwayTeamScore,
        TeamWin: game.AwayTeamWin,
        Coach: game.AwayTeamCoach
    };
    const HomeTeamLogo = getLogo(homeTeam.Team);
    const AwayTeamLogo = getLogo(awayTeam.Team);
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
                <div className="col-md-2 d-flex align-items-center justify-content-center mv-icon">
                    <img
                        src={HomeTeamLogo}
                        className="img-fluid rounded-start bba-match-schedule p-1"
                        alt="homeTeam"
                    />
                </div>
                <div className="col-md-8 mv-description">
                    <div className="card-body">
                        <h6 className="card-title">
                            Week {GameWeek} {homeTeam.Team} vs {awayTeam.Team}
                        </h6>
                        <strong className="card-subtitle">
                            Home: {homeTeam.Coach} | Away: {awayTeam.Coach}
                        </strong>
                        <p className="card-text" style={{ height: '25px' }}>
                            {detailsLabel}{' '}
                            {game.GameComplete &&
                                (game.Week < currentWeek ||
                                    ShowAGame ||
                                    ShowBGame ||
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
                <div className="col-md-2 d-flex align-items-center justify-content-center mv-icon">
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
