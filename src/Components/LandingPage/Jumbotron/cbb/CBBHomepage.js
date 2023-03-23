import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogo } from '../../../../Constants/getLogo';
import routes from '../../../../Constants/routes';
import BBATeamService from '../../../../_Services/simNBA/BBATeamService';
import { setCBBTeam } from '../../../../Redux/cbbTeam/cbbTeam.actions';
import { useMediaQuery } from 'react-responsive';
import StandingsCard from '../../../BBA/Schedule/StandingsModalCard';
import { Spinner } from '../../../_Common/Spinner';

const CBBHomePage = ({ currentUser, cbbTeam, cbb_Timestamp }) => {
    let _teamService = new BBATeamService();
    const dispatch = useDispatch();

    const [team, setTeam] = React.useState('');
    const [teamName, setTeamName] = React.useState('');
    const [logo, setLogo] = React.useState('');
    const [previousMatches, setPreviousMatches] = React.useState([]);
    const [currentMatches, setCurrentMatches] = React.useState([]);
    const [standings, setStandings] = React.useState([]);
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:845px)` });

    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    useEffect(() => {
        if (currentUser) {
            setTeamName(() => currentUser.cbb_team);
            setLogo(() => getLogo(currentUser.cbb_abbr));
        }
        if (!cbbTeam) {
            GetTeam();
        } else {
            if (!team) {
                setTeam(() => cbbTeam);
            }
        }
        if (cbb_Timestamp && cbbTeam) {
            GetConferenceStandings();
            // GetGames();
        }
    }, [currentUser, cbbTeam, cbb_Timestamp]);

    const GetTeam = async () => {
        let response = await _teamService.GetTeamByTeamId(currentUser.cbb_id);
        setTeam(() => response);
        dispatch(setCBBTeam(response));
    };

    const GetConferenceStandings = async () => {
        const res = await _teamService.GetTeamStandingsByConferenceID(
            cbbTeam.ConferenceID,
            cbb_Timestamp.SeasonID
        );

        setStandings(() => res);
    };

    return (
        <>
            <div className="row mt-2">
                <div className="col-md-auto justify-content-start">
                    <h2>{teamName}</h2>
                </div>
                <div className="col-md-4">
                    <h2 className="text-start">
                        {cbb_Timestamp ? cbb_Timestamp.Season : ''}, Week{' '}
                        {cbb_Timestamp !== null &&
                        cbb_Timestamp.CollegeWeek !== null
                            ? cbb_Timestamp.CollegeWeek
                            : ''}
                    </h2>
                </div>
                <div className="col-md-auto justify-content-start">
                    <h2>{team ? `${team.Conference} Conference` : ''}</h2>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-auto col-sm justify-content-start"></div>
                <div className="col-md-auto"></div>
                <div className="col-3"></div>
            </div>
            <div className="row mt-2">
                <div className="col-md-2">
                    <div className="image me-2">
                        <img
                            className={
                                cbbTeam && cbbTeam.ID === 86
                                    ? 'landing-image-purdue'
                                    : ''
                            }
                            src={logo}
                            alt="Go Cougs"
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row mt-2 mb-2">
                        <div className="btn-group btn-group-sm d-flex">
                            <Link
                                to={routes.CBB_GAMEPLAN}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                            >
                                Gameplan
                            </Link>
                            <Link
                                to={routes.CBB_RECRUITING_BOARD}
                                role="button"
                                className="btn btn-primary btn-md me-2 shadow"
                            >
                                Recruiting
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
                                        <StandingsCard standings={standings} />
                                    </div>
                                ) : (
                                    <>
                                        <StandingsCard standings={standings} />
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
    cbbTeam: { cbbTeam },
    timestamp: { cbb_Timestamp }
}) => ({
    currentUser,
    cbbTeam,
    cbb_Timestamp
});

export default connect(mapStateToProps)(CBBHomePage);
