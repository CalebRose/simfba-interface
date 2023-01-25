import React from 'react';
import { getLogo } from '../../../../Constants/getLogo';

const CFBMatchCard = ({ game, team, currentWeek }) => {
    const teamAbbr = team && team.TeamAbbr;
    const opposingTeam =
        game.HomeTeam === teamAbbr ? game.AwayTeam : game.HomeTeam;
    const opposingCoach =
        game.HomeTeam === teamAbbr ? game.AwayTeamCoach : game.HomeTeamCoach;
    const wonTheMatch =
        game.GameComplete &&
        ((game.HomeTeam === teamAbbr && game.HomeTeamWin) ||
            (game.AwayTeam === teamAbbr && game.AwayTeamWin));
    const lostTheMatch =
        game.GameComplete &&
        ((game.HomeTeam === teamAbbr && game.AwayTeamWin) ||
            (game.AwayTeam === teamAbbr && game.HomeTeamWin));
    const awayGame =
        game.HomeTeam === teamAbbr || game.IsNeutral ? false : true;
    const opposingTeamLogo = getLogo(opposingTeam);
    const gameWeek = game.Week;
    const ConferenceGame = game.IsConference;
    const ConferenceLabel = team && team.Conference;
    const DivisionLabel = team && team.Division;
    const DivisionGame = game.IsDivisional;
    let detailsLabel = '';
    if (game.GameTitle.length > 0 || game.GameTitle !== '') {
        detailsLabel = game.GameTitle;
    } else if (!ConferenceGame && !DivisionGame) {
        detailsLabel = 'Non-Conference Game';
    } else if (DivisionGame && ConferenceGame) {
        detailsLabel = `${ConferenceLabel} ${DivisionLabel} Game`;
    } else {
        detailsLabel = `${ConferenceLabel} Conference Game`;
    }

    let cardClass = '';
    if (wonTheMatch && game.GameComplete && game.Week < currentWeek) {
        cardClass = 'card mb-3 text-white bg-success';
    } else if (lostTheMatch && game.GameComplete && game.Week < currentWeek) {
        cardClass = 'card mb-3 text-white bg-danger';
    } else {
        cardClass = 'card mb-3';
    }

    const cardTitle = `Week ${gameWeek} ${
        awayGame ? 'at ' : 'vs '
    } ${opposingTeam}`;

    return (
        <div className={cardClass} style={{ maxWidth: '540px' }}>
            <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img
                        src={opposingTeamLogo}
                        className="img-fluid rounded-start img-match p-1"
                        alt="opposingTeam"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{cardTitle}</h5>
                        <h6 className="card-subtitle">
                            Opposing Coach: {opposingCoach}
                        </h6>
                        {game.GameComplete && game.Week < currentWeek ? (
                            <p className="card-text">
                                {game.HomeTeamScore} - {game.AwayTeamScore}
                            </p>
                        ) : (
                            <p className="card-text">{detailsLabel}</p>
                        )}
                        <small className="card-text">
                            Location: {game.Stadium} in {game.City},{' '}
                            {game.State}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CFBMatchCard;
