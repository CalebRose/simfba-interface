import React, { useEffect, useMemo, useState } from 'react';
import { ExtraLargeModal } from '../_Common/ModalComponents';
import { GetCollegeYear, RoundToTwoDecimals } from '../../_Utility/utilHelper';
import { PortalService } from '../../_Services/simFBA/FBAPortalService';
import { BBAStatsRow } from '../_Common/SeasonStatsRow';
import { getLogo } from '../../Constants/getLogo';

const CFBTransferPortalHeader = ({ viewMode }) => {
    return (
        <thead
            style={{
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                zIndex: 3
            }}
        >
            <tr>
                <th scope="col">Rank</th>
                <th scope="col" style={{ width: 175 }}>
                    Name
                </th>
                <th scope="col">Position</th>
                <th scope="col" style={{ width: 175 }}>
                    Archetype
                </th>
                <th scope="col" style={{ width: 175 }}>
                    High School
                </th>
                <th scope="col" style={{ width: 175 }}>
                    City
                </th>
                <th scope="col">State</th>
                <th scope="col">Stars</th>
                <th scope="col">Overall</th>
                <th scope="col">Potential</th>
                <th scope="col">Affinities</th>
                <th scope="col">Leading Schools</th>
                <th scope="col">Status</th>
                <th scope="col">Add</th>
            </tr>
        </thead>
    );
};

const CBBTransferPortalHeader = ({ viewMode }) => {
    return (
        <thead
            style={{
                position: 'sticky',
                top: 0,
                backgroundColor: viewMode === 'dark' ? '#202020' : 'white',
                zIndex: 3
            }}
        >
            <tr>
                <th scope="col" onClick={() => ChangeSort('Rank')}>
                    Rank
                </th>
                <th scope="col" onClick={() => ChangeSort('Name')}>
                    Name
                </th>
                <th scope="col">Pos</th>
                <th scope="col">Height</th>
                <th scope="col" onClick={() => ChangeSort('PreviousTeamID')}>
                    Prev. Team
                </th>
                <th scope="col" onClick={() => ChangeSort('Year')}>
                    Year
                </th>
                <th scope="col" onClick={() => ChangeSort('Stars')}>
                    Stars
                </th>
                <th scope="col" onClick={() => ChangeSort('OverallGrade')}>
                    Ovr.
                </th>
                <th scope="col" onClick={() => ChangeSort('Shooting2')}>
                    2pt.
                </th>
                <th scope="col" onClick={() => ChangeSort('Shooting3')}>
                    3pt.
                </th>
                <th scope="col" onClick={() => ChangeSort('FreeThrow')}>
                    FT
                </th>
                <th scope="col" onClick={() => ChangeSort('Finishing')}>
                    Finishing
                </th>
                <th scope="col" onClick={() => ChangeSort('Ballwork')}>
                    Ballwork
                </th>
                <th scope="col" onClick={() => ChangeSort('Rebounding')}>
                    Rebounding
                </th>
                <th scope="col" onClick={() => ChangeSort('InteriorDefense')}>
                    Int. Defense
                </th>
                <th scope="col" onClick={() => ChangeSort('PerimeterDefense')}>
                    Per. Defense
                </th>
                <th scope="col" onClick={() => ChangeSort('PotentialGrade')}>
                    Potential
                </th>
                <th scope="col">Leading Teams</th>
                <th scope="col">Add</th>
            </tr>
        </thead>
    );
};

export const TPOverviewHeader = ({ isCFB, viewMode }) => {
    return isCFB ? (
        <CFBTransferPortalHeader viewMode={viewMode} />
    ) : (
        <CBBTransferPortalHeader viewMode={viewMode} />
    );
};

const CFBTransferBoardHeader = ({ viewMode }) => {};

const CBBTransferBoardHeader = ({ viewMode, ChangeSort }) => {
    return (
        <thead
            style={{
                position: 'sticky',
                top: 0,
                backgroundColor: viewMode === 'dark' ? '#202020' : 'white',
                zIndex: 3
            }}
        >
            <tr>
                <th scope="col" onClick={() => ChangeSort('Position')}>
                    Pos
                </th>
                <th scope="col" onClick={() => ChangeSort('Name')}>
                    Name
                </th>
                <th scope="col" onClick={() => ChangeSort('PreviousTeamID')}>
                    Prev. Team
                </th>
                <th scope="col" onClick={() => ChangeSort('Year')}>
                    Year
                </th>
                <th scope="col" onClick={() => ChangeSort('Stars')}>
                    Stars
                </th>
                <th scope="col" onClick={() => ChangeSort('OverallGrade')}>
                    Ovr.
                </th>
                <th scope="col" onClick={() => ChangeSort('Shooting2')}>
                    2pt.
                </th>
                <th scope="col" onClick={() => ChangeSort('Shooting3')}>
                    3pt.
                </th>
                <th scope="col" onClick={() => ChangeSort('FreeThrow')}>
                    FT
                </th>
                <th scope="col" onClick={() => ChangeSort('Finishing')}>
                    Fin.
                </th>
                <th scope="col" onClick={() => ChangeSort('Ballwork')}>
                    Bal.
                </th>
                <th scope="col" onClick={() => ChangeSort('Rebounding')}>
                    Reb.
                </th>
                <th scope="col" onClick={() => ChangeSort('InteriorDefense')}>
                    Int. D.
                </th>
                <th scope="col" onClick={() => ChangeSort('PerimeterDefense')}>
                    Per. D.
                </th>
                <th scope="col" onClick={() => ChangeSort('PotentialGrade')}>
                    Pot.
                </th>
                <th scope="col">Leading Teams</th>
                <th scope="col">Allocate</th>
                <th scope="col">Multiplier</th>
                <th scope="col">Total Points</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
    );
};

export const TPBoardHeader = ({ isCFB, viewMode }) => {
    return isCFB ? (
        <CFBTransferBoardHeader viewMode={viewMode} />
    ) : (
        <CBBTransferBoardHeader viewMode={viewMode} />
    );
};

export const ViewTransferPlayerModal = ({ player, isCFB, retro }) => {
    const _portalService = new PortalService();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const id = 'portalPlayerModal';
    const year = player && GetCollegeYear(player);
    const header = player
        ? `${player.PlayerID} ${year} ${player.Position} ${player.FirstName} ${player.LastName}`
        : 'Loading Player...';

    const standings = useMemo(() => {
        if (data) {
            return data.TeamStandings;
        }
        return null;
    }, [data]);

    const seasonStats = useMemo(() => {
        if (data) {
            return data.DrafteeSeasonStats;
        }
        return null;
    }, [data]);

    useEffect(() => {
        if (
            player &&
            (!data ||
                !data.DrafteeSeasonStats.CollegePlayerID !== player.PlayerID)
        ) {
            getTransferPlayerData();
        }
    }, [player]);

    const getTransferPlayerData = async () => {
        setIsLoading(() => true);
        const res = await _portalService.GetTransferPlayerData(
            isCFB,
            player.PlayerID
        );
        setData(() => res);
        setIsLoading(() => false);
    };

    const teamLogo = standings && getLogo(standings.TeamAbbr, retro);

    return (
        <ExtraLargeModal header={header} id={id}>
            {!isLoading ? (
                <div className="row d-flex justify-content-start">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-2">
                                <h6>Stars</h6>
                                <p>{player.Stars}</p>
                            </div>
                            <div className="col-2">
                                <h6>Potential</h6>
                                <p>{player.PotentialGrade}</p>
                            </div>
                            <div className="col-2">
                                <h6>Height</h6>
                                <p>{player.Height}</p>
                            </div>
                            <div className="col-2">
                                <h6>State</h6>
                                <p>{player.State}</p>
                            </div>
                            <div className="col-2">
                                <h6>Country</h6>
                                <p>{player.Country}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <h6>Recruiting Bias</h6>
                                <p>{player.RecruitingBias}</p>
                            </div>
                            <div className="col-2">
                                <h6>Work Ethic</h6>
                                <p>{player.WorkEthic}</p>
                            </div>
                            <div className="col-2">
                                <h6>Academic Bias</h6>
                                <p>{player.AcademicBias}</p>
                            </div>
                            <div className="col-2">
                                <h6>Personality</h6>
                                <p>{player.Personality}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <h6>Finishing</h6>
                                <p>{player.Finishing}</p>
                            </div>
                            <div className="col-2">
                                <h6>2pt. Shooting</h6>
                                <p>{player.Shooting2}</p>
                            </div>
                            <div className="col-2">
                                <h6>3pt. Shooting</h6>
                                <p>{player.Shooting3}</p>
                            </div>
                            <div className="col-2">
                                <h6>Free Throw</h6>
                                <p>{player.FreeThrow}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <h6>Ballwork</h6>
                                <p>{player.Ballwork}</p>
                            </div>
                            <div className="col-2">
                                <h6>Rebounding</h6>
                                <p>{player.Rebounding}</p>
                            </div>
                            <div className="col-2">
                                <h6>Interior Defense</h6>
                                <p>{player.InteriorDefense}</p>
                            </div>
                            <div className="col-2">
                                <h6>Perimeter Defense</h6>
                                <p>{player.PerimeterDefense}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row mb-2">
                            <div className="col-auto">
                                <h5>
                                    College: {standings.TeamName}
                                    {'  '}
                                    <img
                                        src={teamLogo}
                                        alt={standings.TeamAbbr}
                                        className="image-recruit-logo"
                                    />
                                    {', '}
                                    {standings.ConferenceName}
                                </h5>
                            </div>
                        </div>
                        <div className="row  mb-2">
                            <div className="col-auto">
                                <h6>Total Wins: {standings.TotalWins}</h6>
                            </div>
                            <div className="col-auto">
                                <h6>Total Losses: {standings.TotalLosses}</h6>
                            </div>
                            <div className="col-auto">
                                <h6>
                                    Conference Wins: {standings.ConferenceWins}
                                </h6>
                            </div>
                            <div className="col-auto">
                                <h6>
                                    Conference Losses:{' '}
                                    {standings.ConferenceLosses}
                                </h6>
                            </div>
                            <div className="col-auto">
                                <h6>
                                    Post-Season Status:{' '}
                                    {standings.PostSeasonStatus}
                                </h6>
                            </div>
                        </div>
                        <div className="row mb-2">
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
                    </div>
                </div>
            ) : (
                <></>
            )}
        </ExtraLargeModal>
    );
};
