import React from 'react';
import { getLogo } from '../../../../Constants/getLogo';
import { RevealResults } from '../../../../_Utility/utilHelper';
import { SimCFB, SimNFL } from '../../../../Constants/CommonConstants';

const CFBMatchCard = ({ game, team, timestamp, isNFL, retro }) => {
    const currentWeek = !isNFL ? timestamp.CollegeWeek : timestamp.NFLWeek;
    const teamAbbr =
        !isNFL && team ? team.TeamAbbr : `${team.TeamName} ${team.Mascot}`;
    const league = isNFL ? SimNFL : SimCFB;
    const opposingTeam =
        game.HomeTeam === teamAbbr ? game.AwayTeam : game.HomeTeam;
    const opposingTeamID =
        game.HomeTeam === teamAbbr ? game.AwayTeamID : game.HomeTeamID;
    let opposingTeamLabel = opposingTeam;
    if (game.HomeTeam === teamAbbr && game.AwayTeamRank > 0) {
        opposingTeamLabel = `(${game.AwayTeamRank}) ${opposingTeam}`;
    }
    if (game.HomeTeam !== teamAbbr && game.HomeTeamRank > 0) {
        opposingTeamLabel = `(${game.HomeTeamRank}) ${opposingTeam}`;
    }
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
    const opposingTeamLogo = getLogo(league, opposingTeamID, retro);
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

    const showGame = RevealResults(game, timestamp);

    let cardClass = '';
    if (wonTheMatch && (showGame || game.Week < currentWeek)) {
        cardClass = 'card mb-3 text-white bg-success';
    } else if (lostTheMatch && (showGame || game.Week < currentWeek)) {
        cardClass = 'card mb-3 text-white bg-danger';
    } else {
        cardClass = 'card mb-3';
    }

    const cardTitle = `Week ${gameWeek} ${
        awayGame ? 'at ' : 'vs '
    } ${opposingTeamLabel}`;

    return (
        <div className={cardClass} style={{ maxWidth: '540px' }}>
            <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img
                        src={opposingTeamLogo}
                        className="img-fluid rounded-start img-lp-match p-1"
                        alt="opposingTeam"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h6 className="card-title">{cardTitle}</h6>
                        {(showGame || game.Week < currentWeek) && (
                            <small className="card-text">
                                {game.HomeTeamScore} - {game.AwayTeamScore}
                            </small>
                        )}{' '}
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
