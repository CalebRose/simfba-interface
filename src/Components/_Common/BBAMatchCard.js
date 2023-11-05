import React from 'react';
import { getLogo } from '../../Constants/getLogo';
import { RevealCBBResults, RevealResults } from '../../_Utility/utilHelper';

export const BBAMatchCard = ({ game, team, timestamp, isNBA }) => {
    const currentWeek = !isNBA ? timestamp.CollegeWeek : timestamp.NBAWeek;
    const teamAbbr =
        !isNBA && team ? team.Abbr : `${team.Team} ${team.Nickname}`;
    const opposingTeam =
        game.HomeTeam === teamAbbr ? game.AwayTeam : game.HomeTeam;
    const opposingCoach =
        game.HomeTeam === teamAbbr ? game.AwayTeamCoach : game.HomeTeamCoach;
    const opposingRank =
        game.HomeTeam === teamAbbr ? game.AwayRank : game.HomeRank;
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

    let detailsLabel = '';
    if (game.MatchName.length > 0 || game.MatchName !== '') {
        detailsLabel = game.MatchName;
    } else if (!ConferenceGame) {
        detailsLabel = 'Non-Conference Game';
    } else {
        detailsLabel = `${ConferenceLabel} Conference Game`;
    }

    const showGame = RevealCBBResults(game, timestamp);

    let cardClass = '';
    if (wonTheMatch && (showGame || game.Week < currentWeek)) {
        cardClass = 'card mb-3 text-white bg-success';
    } else if (lostTheMatch && (showGame || game.Week < currentWeek)) {
        cardClass = 'card mb-3 text-white bg-danger';
    } else {
        cardClass = 'card mb-3';
    }

    const cardTitle = `Week ${gameWeek}${game.MatchOfWeek} ${
        awayGame ? 'at ' : 'vs '
    } ${opposingRank > 0 ? `(${opposingRank})` : ''}${opposingTeam}`;

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
