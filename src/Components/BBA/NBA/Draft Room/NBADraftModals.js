import React, { useEffect, useMemo, useState } from 'react';
import { ExtraLargeModal, InfoModal } from '../../../_Common/ModalComponents';
import BBADraftService from '../../../../_Services/simNBA/BBADraftService';
import { Spinner } from '../../../_Common/Spinner';
import { getLogo } from '../../../../Constants/getLogo';
import {
    HeightToFeetAndInches,
    RoundToTwoDecimals
} from '../../../../_Utility/utilHelper';
import FBADraftService from '../../../../_Services/simFBA/FBADraftService';
import { GetScoutableAttributes } from '../../../../_Utility/DraftHelper';
import { AttributeColumn } from '../../../_Common/DraftComponents';
import { BBAStatsRow, FBAStatsRow } from '../../../_Common/SeasonStatsRow';

export const NBADraftHelpModal = ({ isNBA }) => {
    return (
        <InfoModal
            id="helpModal"
            header={`${isNBA ? 'NBA' : 'NFL'} Draft Help Info`}
        >
            <div className="row">
                <h6>
                    Welcome to this year's {isNBA ? 'SimNBA' : 'SimNFL'} Draft!
                </h6>
            </div>
            <div className="row mt-2 text-start">
                <p>
                    This page is designed to give you the resources needed for
                    you to scout and draft the future of your team. There are
                    five different segments that make up this page: The Draft
                    Room Header, The Draft Pick Window, The Team War Room, The
                    Draftable Players List, and the Team Scouting Board.
                </p>
            </div>
            <div className="row mt-2 text-start">
                <p>
                    The <strong>Draft Room Header</strong> is used to keep track
                    of the current state of the draft. The Current Pick, the
                    team selecting, the next team selecting, and the most recent
                    drafted player will always be visible. The time left in the
                    current round (Five minutes for Round 1, two minutes for
                    Round 2) are there to let you know how much time is
                    remaining.
                </p>
            </div>
            <div className="row mt-2 text-start">
                <p>
                    The <strong>Draft Pick Window</strong> is a visual view of
                    all draft picks in this year's draft, showing you the order
                    of teams, along with which players are selected by pick.
                </p>
            </div>
            <div className="row mt-2 text-start">
                <p>
                    The <strong>War Room</strong> keeps track of your total
                    Scouting Points, the points you use to scout talent, how
                    many Scout Points you've spent, and all draft picks that
                    your team owns.{' '}
                    {!isNBA &&
                        'You may also propose, accept, and reject trades here during the duration of the draft with other participating teams.'}
                </p>
            </div>
            <div className="row mt-2 text-start">
                <p>
                    The <strong>Draftable Players List</strong> is a small
                    section giving you info on all available players by Overall
                    Grade. To add a player, click the Green Button. If you
                    aren't sure if you've selected a player on your scouting
                    board, please ensure that the button is now a grey
                    checkmark.
                </p>
            </div>
            <div className="row mt-2 text-start">
                <p>
                    The <strong>Scouting Board</strong> is where you can view
                    your scouting players and their attribute grades. In this
                    section, you can spend Scouting Points to reveal the true
                    value of an attribute, which will help you determine the
                    true value of a player. Each attribute costs 4 points, while
                    Potential costs 10 points to reveal. Revealing four
                    attributes will reveal the player's overall value. You can
                    always remove a player from your board if you so choose;
                    however, removing a player from your board won't return any
                    scouting points spent on a player.
                </p>
            </div>
        </InfoModal>
    );
};

const NBAScoutingCard = ({
    player,
    TeamStandings,
    teamLogo,
    DrafteeSeasonStats
}) => {
    return (
        <>
            <div className="row">
                <div className="col-auto">
                    <h5>Attributes: </h5>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <p>Shooting2:</p>
                    <p>{player.Shooting2Grade}</p>
                </div>
                <div className="col-auto">
                    <p>Shooting3:</p>
                    <p>{player.Shooting3Grade}</p>
                </div>
                <div className="col-auto">
                    <p>Free Throw:</p>
                    <p>{player.FreeThrowGrade}</p>
                </div>
                <div className="col-auto">
                    <p>Finishing:</p>
                    <p>{player.FinishingGrade}</p>
                </div>
                <div className="col-auto">
                    <p>Ballwork:</p>
                    <p>{player.BallworkGrade}</p>
                </div>
                <div className="col-auto">
                    <p>Rebounding:</p>
                    <p>{player.ReboundingGrade}</p>
                </div>
                <div className="col-auto">
                    <p>Int. Defense:</p>
                    <p>{player.InteriorDefenseGrade}</p>
                </div>
                <div className="col-auto">
                    <p>Per. Defense:</p>
                    <p>{player.PerimeterDefenseGrade}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <h5>
                        College: {TeamStandings.TeamName}
                        {'  '}
                        <img
                            src={teamLogo}
                            alt={TeamStandings.TeamAbbr}
                            className="image-recruit-logo"
                        />
                        {', '}
                        {TeamStandings.ConferenceName}
                    </h5>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-auto">
                    <h6>Total Wins: {TeamStandings.TotalWins}</h6>
                </div>
                <div className="col-auto">
                    <h6>Total Losses: {TeamStandings.TotalLosses}</h6>
                </div>
                <div className="col-auto">
                    <h6>Conference Wins: {TeamStandings.ConferenceWins}</h6>
                </div>
                <div className="col-auto">
                    <h6>Conference Losses: {TeamStandings.ConferenceLosses}</h6>
                </div>
                <div className="col-auto">
                    <h6>
                        Post-Season Status: {TeamStandings.PostSeasonStatus}
                    </h6>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-auto">
                    <h5>Season Stats</h5>
                </div>
                <div className="col-auto">
                    <h6>Games Played</h6>
                    <p>{DrafteeSeasonStats.GamesPlayed}</p>
                </div>
                <div className="ms-2 col-auto">
                    <h6>Minutes</h6>
                    <p>
                        {RoundToTwoDecimals(DrafteeSeasonStats.MinutesPerGame)}
                    </p>
                </div>
                <div className="col-auto">
                    <h6>Possessions</h6>
                    <p>
                        {RoundToTwoDecimals(
                            DrafteeSeasonStats.PossessionsPerGame
                        )}
                    </p>
                </div>
            </div>
            <BBAStatsRow SeasonStats={DrafteeSeasonStats} />
        </>
    );
};

const NFLScoutingCard = ({
    player,
    profile,
    TeamStandings,
    teamLogo,
    DrafteeSeasonStats,
    wr
}) => {
    const { SpentPoints } = wr;
    const attrList = GetScoutableAttributes(player.Position, player.Archetype);
    const heightObj = HeightToFeetAndInches(player.Height);
    return (
        <>
            <div className="row mb-3">
                <div className="col-auto">
                    <h5 className="text-start">
                        {TeamStandings.TeamName}
                        {'  '}
                        <img
                            src={teamLogo}
                            alt={TeamStandings.TeamAbbr}
                            className="image-recruit-logo"
                        />
                    </h5>
                    <h6>{TeamStandings.ConferenceName} Conference</h6>
                </div>
                <div className="col-auto">
                    <div className="row">
                        <div className="col-auto">
                            <h5>Attributes:</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <h6>Height</h6>
                            <p>
                                {heightObj.feet}' {heightObj.inches}"
                            </p>
                        </div>
                        <div className="col-auto">
                            <h6>Weight</h6>
                            <p>{player.Weight}</p>
                        </div>
                        <div className="col-auto">
                            <div className="align-middle">
                                <h6>Overall</h6>
                                <p>
                                    {profile.ShowCount < 4
                                        ? player.OverallGrade
                                        : player.Overall}
                                </p>
                            </div>
                        </div>
                        {attrList.map((x, idx) => (
                            <AttributeColumn
                                idx={idx}
                                player={player}
                                profile={profile}
                                attr={x}
                                SpentPoints={SpentPoints}
                                modalView
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-auto">
                    <h6>Total Wins: {TeamStandings.TotalWins}</h6>
                </div>
                <div className="col-auto">
                    <h6>Total Losses: {TeamStandings.TotalLosses}</h6>
                </div>
                <div className="col-auto">
                    <h6>Conference Wins: {TeamStandings.ConferenceWins}</h6>
                </div>
                <div className="col-auto">
                    <h6>Conference Losses: {TeamStandings.ConferenceLosses}</h6>
                </div>
                <div className="col-auto">
                    <h6>
                        Post-Season Status: {TeamStandings.PostSeasonStatus}
                    </h6>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-auto">
                    <h5>Season Stats</h5>
                </div>
                <div className="col-auto">
                    <h6>Games Played</h6>
                    <p>{DrafteeSeasonStats.GamesPlayed}</p>
                </div>
            </div>
            <FBAStatsRow SeasonStats={DrafteeSeasonStats} />
        </>
    );
};

export const ScoutingModal = ({ profile, retro, isNFL, wr, reveal }) => {
    const _draftService = isNFL ? new FBADraftService() : new BBADraftService();
    const Draftee = profile && profile.Draftee;
    const id = `drafteeModal`;
    const header = Draftee
        ? `${Draftee.Position} ${Draftee.FirstName} ${Draftee.LastName} Scouting Report Card`
        : 'Loading...';
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const TeamStandings = useMemo(() => {
        if (data) {
            return data.TeamStandings;
        }
        return {};
    }, [data]);

    const DrafteeSeasonStats = useMemo(() => {
        if (data) {
            return data.DrafteeSeasonStats;
        }
        return {};
    }, [data]);

    const teamLogo = getLogo(TeamStandings.TeamAbbr, retro);

    useEffect(() => {
        if (
            Draftee &&
            (!data || data.DrafteeSeasonStats.CollegePlayerID !== Draftee.ID)
        ) {
            GetPlayerData();
        }
    }, [Draftee, data]);

    const GetPlayerData = async () => {
        setIsLoading(() => true);
        const res = await _draftService.GetScoutingData(Draftee.ID);
        const dataObj = {
            TeamStandings: res.TeamStandings,
            DrafteeSeasonStats: res.DrafteeSeasonStats
        };

        setData(() => dataObj);
        setIsLoading(() => false);
    };
    // Show attributes
    // Get season stats
    // Team History
    // Team Standings?

    return (
        <ExtraLargeModal id={id} header={header}>
            {isLoading ? (
                <Spinner />
            ) : isNFL ? (
                <NFLScoutingCard
                    player={Draftee}
                    profile={profile}
                    TeamStandings={TeamStandings}
                    teamLogo={teamLogo}
                    DrafteeSeasonStats={DrafteeSeasonStats}
                    wr={wr}
                />
            ) : (
                <NBAScoutingCard
                    player={Draftee}
                    TeamStandings={TeamStandings}
                    teamLogo={teamLogo}
                    DrafteeSeasonStats={DrafteeSeasonStats}
                />
            )}
        </ExtraLargeModal>
    );
};
