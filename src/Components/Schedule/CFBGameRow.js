import React from 'react';
import { getLogo } from '../../Constants/getLogo';

const GameRow = (props) => {
    const { idx, game, currentWeek } = props;

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
    const DivisionGame = game.IsDivisional;
    let detailsLabel = '';
    if (!ConferenceGame && !DivisionGame) {
        detailsLabel = 'Non-Conference Game';
    } else if (DivisionGame && ConferenceGame) {
        detailsLabel = `Conference Divisional Game`;
    } else {
        detailsLabel = `Conference Game`;
    }
    let cardClass = 'card mb-3';
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
                        {game.GameComplete && game.Week < currentWeek ? (
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
                        ) : (
                            ''
                        )}
                        <small className="card-text">
                            Location: {game.Stadium} in {game.City},{' '}
                            {game.State}
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

export default GameRow;
