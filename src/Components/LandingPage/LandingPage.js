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
import AdminService from '../../_Services/simFBA/AdminService';
import { getLogo } from '../../Constants/getLogo';
import {
    setCBBNotifications,
    setCFBNotifications,
    setNBANotifications,
    setNFLNotifications
} from '../../Redux/inbox/inbox.actions';

const LandingPage = ({ currentUser }) => {
    let _teamService = new BBATeamService();
    let teamService = new FBATeamService();
    const _adminService = new AdminService();
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
        if (currentUser && currentUser.teamId && currentUser.teamId > 0) {
            const logo = getLogo(currentUser.teamAbbr, currentUser.IsRetro);
            setCFBLogo(() => logo);
            setSport('CFB');
        } else if (currentUser && currentUser.NFLTeamID) {
            setSport('NFL');
        } else if (currentUser && currentUser.cbb_id) {
            setSport('CBB');
        } else if (currentUser && currentUser.nba_id) {
            setSport('NBA');
        } else {
            setSport('');
        }

        if (
            currentUser &&
            currentUser.NFLTeam !== undefined &&
            currentUser.NFLTeam.length > 0 &&
            currentUser.NFLTeamID > 0
        ) {
            GetNFLTeam();
        }

        if (
            currentUser &&
            (currentUser.NFLTeamID > 0 || currentUser.teamId > 0)
        ) {
            getFBAInbox();
        }

        if (
            currentUser &&
            ((currentUser.cbb_team !== undefined &&
                currentUser.cbb_team.length > 0) ||
                currentUser.cbb_id > 0)
        ) {
            GetCBBTeam();
        }

        if (
            currentUser &&
            currentUser.NBATeam !== undefined &&
            currentUser.NBATeam.length > 0 &&
            currentUser.NBATeamID > 0
        ) {
            GetNBATeam();
        }
    }, [currentUser]);

    const GetCBBTeam = async () => {
        let response = await _teamService.GetTeamByTeamId(currentUser.cbb_id);
        const logo = getLogo(currentUser.cbb_abbr, currentUser.IsRetro);
        setCBBLogo(() => logo);
        dispatch(setCBBTeam(response));
    };

    const GetNFLTeam = async () => {
        let response = await teamService.GetNFLTeamByTeamID(
            currentUser.NFLTeamID
        );
        const logo = getLogo(currentUser.NFLTeam, currentUser.IsRetro);
        setNFLLogo(() => logo);
        dispatch(setNFLTeam(response));
    };

    const GetNBATeam = async () => {
        let response = await _teamService.GetNBATeamByTeamID(
            currentUser.NBATeamID
        );
        const logo = getLogo(currentUser.NBATeam, currentUser.IsRetro);
        setNBALogo(() => logo);
        dispatch(setNBATeam(response));
    };

    const getFBAInbox = async () => {
        const collegeID = currentUser.teamId || 0;
        const profID = currentUser.NFLTeamID || 0;
        const res = await _adminService.GetInbox('fba', collegeID, profID);

        dispatch(setCFBNotifications(res.CFBNotifications));
        dispatch(setNFLNotifications(res.NFLNotifications));
    };

    const getBBAInbox = async () => {
        const collegeID = currentUser.cbb_id || 0;
        const profID = currentUser.NBATeamID || 0;
        const res = await _adminService.GetInbox('bba', collegeID, profID);
        dispatch(setCBBNotifications(res.CBBNotifications));
        dispatch(setNBANotifications(res.NBANotifications));
    };

    return (
        <div className="container-fluid">
            <div
                className={`row mt-3 justify-content-${
                    !isMobile ? 'start' : 'center'
                }`}
            >
                {isMobile ? (
                    <div className="row">
                        <div className="btn-group-sm btn-group d-flex">
                            {currentUser && currentUser.teamId && (
                                <button
                                    type="button"
                                    className="btn btn-outline-light btn-sm mb-2 btn-mobile"
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
                                    className="btn btn-outline-light btn-sm mb-2 btn-mobile"
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
                                    className="btn btn-outline-light btn-sm mb-2 btn-mobile"
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
                                    className="btn btn-outline-light btn-sm btn-mobile"
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
