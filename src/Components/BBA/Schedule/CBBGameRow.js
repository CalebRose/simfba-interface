import React from 'react';
import { getLogo } from '../../../Constants/getLogo';

const CBBGameRow = (props) => {
    const { idx, game, ts } = props;

    const modalTarget = `#gameModal`;

    const SetGame = () => {
        return props.SetGame(game);
    };

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
    let cardClass = 'card mb-3';

    const ShowAGame =
        ts.GamesARan && game.Week === currentWeek && game.MatchOfWeek === 'A';
    const ShowBGame =
        ts.GamesBRan && game.Week === currentWeek && game.MatchOfWeek === 'B';
    return (
        <div className={cardClass} style={{ maxWidth: '75vw' }}>
            <div className="row g-0">
                <div className="col-md-3 d-flex align-items-center justify-content-center">
                    <img
                        src={HomeTeamLogo}
                        className="img-fluid rounded-start img-match-schedule p-1"
                        alt="homeTeam"
                    />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">
                            Week {GameWeek} {homeTeam.Team} vs {awayTeam.Team}
                        </h5>
                        <h6 className="card-subtitle">
                            Home Team Coach: {homeTeam.Coach} | Away Team Coach:{' '}
                            {awayTeam.Coach}
                        </h6>
                        <p className="card-text">{detailsLabel}</p>
                        {game.GameComplete &&
                        (game.Week < currentWeek || ShowAGame || ShowBGame) ? (
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
                                    onClick={SetGame}
                                >
                                    <i className="bi bi-info-circle" />
                                </button>
                            </>
                        ) : (
                            ''
                        )}
                        <small className="card-text">
                            Location: {game.Arena} in {game.City}, {game.State}
                        </small>
                    </div>
                </div>
                <div className="col-md-3 d-flex align-items-center justify-content-center">
                    <img
                        src={AwayTeamLogo}
                        className="img-fluid rounded-start img-match-schedule p-1"
                        alt="AwayTeam"
                    />
                </div>
            </div>
        </div>
    );
};

export default CBBGameRow;
