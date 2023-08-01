import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getLogo } from '../../../../Constants/getLogo';
import { Link } from 'react-router-dom';
import routes from '../../../../Constants/routes';
import BBATeamService from '../../../../_Services/simNBA/BBATeamService';
import StandingsCard from '../../../BBA/Schedule/StandingsModalCard';
import { Spinner } from '../../../_Common/Spinner';
import { useMediaQuery } from 'react-responsive';
import { NBAStandingsCard } from '../../../_Common/NBAStandingsCard';

const NBAHomePage = ({ currentUser, nbaTeam, cbb_Timestamp }) => {
    let _teamService = new BBATeamService();
    const [teamName, setTeamName] = useState('');
    const [team, setTeam] = useState(false);
    const [logo, setLogo] = useState('');
    const [standings, setStandings] = useState([]);
    const [newsFeed, setNewsFeed] = useState([]);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:845px)` });

    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    useEffect(() => {
        if (currentUser) {
            setTeamName(currentUser.NBATeam);
            setLogo(getLogo(currentUser.NBATeam));
        }
        if (nbaTeam) {
            setTeam(() => nbaTeam);
        }
        if (cbb_Timestamp && nbaTeam) {
            GetConferenceStandings();
        }
    }, [currentUser, nbaTeam, cbb_Timestamp]);

    const GetConferenceStandings = async () => {
        const res = await _teamService.GetNBAStandingsByConferenceID(
            nbaTeam.ConferenceID,
            cbb_Timestamp.SeasonID
        );

        setStandings(() => res);
    };

    return (
        <>
            <div className="row mt-2">
                <div className="col-auto justify-content-start">
                    <h2>
                        <img
                            className="landing-image"
                            src={logo}
                            alt="Go Supersonics"
                        />{' '}
                        {teamName}
                    </h2>
                </div>
                <div className="col-auto">
                    <h2 className="text-start">
                        {cbb_Timestamp && cbb_Timestamp.Season}, Week{' '}
                        {cbb_Timestamp && cbb_Timestamp.NBAWeek}
                    </h2>
                </div>
                <div className="col-auto justify-content-start">
                    <h2>
                        {team &&
                            `${team.Conference} Conference, ${team.Division} Division`}
                    </h2>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4">
                    <div className="row mt-2 mb-2">
                        <div className="btn-group btn-group-sm d-flex">
                            <Link
                                to={routes.NBA_ROSTER}
                                role="button"
                                className="btn btn-primary btn-sm me-2 shadow"
                            >
                                Roster
                            </Link>
                            <Link
                                to={routes.NBA_GAMEPLAN}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                            >
                                Gameplan
                            </Link>
                            <Link
                                to={routes.NBA_FREE_AGENCY}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                            >
                                Free Agency
                            </Link>
                            <Link
                                to={routes.NBA_TRADEBLOCK}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                            >
                                Trade
                            </Link>
                            <Link
                                to={routes.CBB_SCHEDULE}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                            >
                                Schedule
                            </Link>
                            <Link
                                to={routes.CBB_STATS}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                            >
                                Stats
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <h4 className="text-start">Previous Week</h4>
                    </div>
                    <div className="row mt-2">
                        <h4 className="text-start">Current Week</h4>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row justify-content-start ms-1">
                        {standings && standings.length > 0 ? (
                            <>
                                {isMobile ? (
                                    <div className="mobile-card-viewer">
                                        <NBAStandingsCard
                                            standings={standings}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <NBAStandingsCard
                                            standings={standings}
                                        />
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="row justify-content-center pt-2 mt-4 mb-2">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    nbaTeam: { nbaTeam },
    timestamp: { cbb_Timestamp }
}) => ({
    currentUser,
    nbaTeam,
    cbb_Timestamp
});

export default connect(mapStateToProps)(NBAHomePage);
