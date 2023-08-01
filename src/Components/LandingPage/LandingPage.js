import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import constants from '../../Constants/acronyms';
import CBBHomePage from './Jumbotron/cbb/CBBHomepage';
import CFBHomepage from './Jumbotron/cfb/CFBHomepage';
import NBAHomepage from './Jumbotron/nba/NBAHomepage';
import NFLHomepage from './Jumbotron/nfl/NFLHomepage';
import { setNFLTeam } from '../../Redux/nflTeam/nflTeam.actions';
import { setCBBTeam } from '../../Redux/cbbTeam/cbbTeam.actions';
import { setNBATeam } from '../../Redux/nbaTeam/nbaTeam.actions';
import BBATeamService from '../../_Services/simNBA/BBATeamService';
import FBATeamService from '../../_Services/simFBA/FBATeamService';
import { getLogo } from '../../Constants/getLogo';

const LandingPage = ({ currentUser }) => {
    let _teamService = new BBATeamService();
    let teamService = new FBATeamService();
    const [sport, setSport] = useState('');
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:845px)` });
    const dispatch = useDispatch();
    const [cfbLogo, setCFBLogo] = useState('');
    const [nflLogo, setNFLLogo] = useState('');
    const [cbbLogo, setCBBLogo] = useState('');
    const [nbaLogo, setNBALogo] = useState('');

    // For mobile
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const selectSport = (event) => {
        setSport(event.target.value);
    };

    useEffect(() => {
        if (currentUser) {
            if (currentUser.teamId && currentUser.teamId > 0) {
                const logo = getLogo(currentUser.teamAbbr);
                setCFBLogo(() => logo);
                setSport('CFB');
            } else if (currentUser.NFLTeamID) {
                setSport('NFL');
            } else if (currentUser.cbb_id) {
                setSport('CBB');
            } else if (currentUser.nba_id) {
                setSport('NBA');
            } else {
                setSport('');
            }

            if (
                currentUser.NFLTeam !== undefined &&
                currentUser.NFLTeam.length > 0 &&
                currentUser.NFLTeamID > 0
            ) {
                GetNFLTeam();
            }

            if (
                (currentUser.cbb_team !== undefined &&
                    currentUser.cbb_team.length > 0) ||
                currentUser.cbb_id > 0
            ) {
                GetCBBTeam();
            }

            if (
                currentUser.NBATeam !== undefined &&
                currentUser.NBATeam.length > 0 &&
                currentUser.NBATeamID > 0
            ) {
                GetNBATeam();
            }
        }
    }, [currentUser]);

    const GetCBBTeam = async () => {
        let response = await _teamService.GetTeamByTeamId(currentUser.cbb_id);
        const logo = getLogo(currentUser.cbb_abbr);
        setCBBLogo(() => logo);
        dispatch(setCBBTeam(response));
    };

    const GetNFLTeam = async () => {
        let response = await teamService.GetNFLTeamByTeamID(
            currentUser.NFLTeamID
        );
        const logo = getLogo(currentUser.NFLTeam);
        setNFLLogo(() => logo);
        dispatch(setNFLTeam(response));
    };

    const GetNBATeam = async () => {
        let response = await _teamService.GetNBATeamByTeamID(
            currentUser.NBATeamID
        );
        const logo = getLogo(currentUser.NBATeam);
        setNBALogo(() => logo);
        dispatch(setNBATeam(response));
    };

    return (
        <div className="container-fluid">
            <div className="row mt-3 justify-content-start">
                {isMobile ? (
                    ''
                ) : (
                    <div className="col-1">
                        <div className="btn-group-sm btn-group-vertical d-flex">
                            {currentUser && currentUser.teamId && (
                                <button
                                    type="button"
                                    className="btn btn-outline-light btn-sm mb-2"
                                    value="CFB"
                                    onClick={selectSport}
                                >
                                    <img
                                        className="image-standings-logo"
                                        src={cfbLogo}
                                    />{' '}
                                    SimCFB
                                </button>
                            )}
                            {currentUser && currentUser.NFLTeamID && (
                                <button
                                    type="button"
                                    className="btn btn-outline-light btn-sm mb-2"
                                    value="NFL"
                                    onClick={selectSport}
                                >
                                    <img
                                        className="image-standings-logo"
                                        src={nflLogo}
                                    />{' '}
                                    SimNFL
                                </button>
                            )}
                            {currentUser && currentUser.cbb_id && (
                                <button
                                    type="button"
                                    className="btn btn-outline-light btn-sm mb-2"
                                    value="CBB"
                                    onClick={selectSport}
                                >
                                    <img
                                        className="image-standings-logo"
                                        src={cbbLogo}
                                    />{' '}
                                    SimCBB
                                </button>
                            )}
                            {currentUser && currentUser.NBATeamID && (
                                <button
                                    type="button"
                                    className="btn btn-outline-light btn-sm"
                                    value="NBA"
                                    onClick={selectSport}
                                >
                                    <img
                                        className="image-standings-logo"
                                        src={nbaLogo}
                                    />{' '}
                                    SimNBA
                                </button>
                            )}
                        </div>
                    </div>
                )}
                <div className={isMobile ? 'col-sm-12' : 'col-sm-11'}>
                    {currentUser && sport === constants.CBB ? (
                        <CBBHomePage />
                    ) : currentUser && sport === constants.NBA ? (
                        <NBAHomepage />
                    ) : currentUser && sport === constants.CFB ? (
                        <CFBHomepage />
                    ) : currentUser && sport === constants.NFL ? (
                        <NFLHomepage />
                    ) : (
                        'No Team? Click the Available Teams button'
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(LandingPage);
