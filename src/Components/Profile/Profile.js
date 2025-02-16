import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import routes from '../../Constants/routes';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { getLogo } from '../../Constants/getLogo';
import { setViewMode } from '../../Redux/viewMode/viewMode.actions';
import { FBAToggle } from '../_Common/SwitchToggle';
import {
    SimCBB,
    SimCFB,
    SimNBA,
    SimNFL
} from '../../Constants/CommonConstants';

var TeamTab = ({ user }) => {
    return (
        <Link to={routes.TEAM} className="tile">
            <h2>{user.team}</h2>
        </Link>
    );
};
var AvailableTab = () => {
    return (
        <Link to={routes.AVAILABLE_TEAMS} className="tile">
            <h2>Available Teams</h2>
        </Link>
    );
};
const Profile = ({ currentUser, cfbTeam, viewMode }) => {
    const dispatch = useDispatch();
    let username =
        !!currentUser && !!currentUser.username ? currentUser.username : '';
    let teamAbbr =
        !!currentUser && !!currentUser.teamAbbr ? currentUser.teamAbbr : '';
    const [teamColors, setTeamColors] = React.useState('');
    const [cfbRecord, setCFBRecord] = useState(null);
    const [cbbRecord, setCBBRecord] = useState(null);
    const [nflRecord, setNFLRecord] = useState(null);
    const [nbaRecord, setNBARecord] = useState(null);
    const [cfbLogo, setCFBLogo] = useState('');
    const [cbbLogo, setCBBLogo] = useState('');
    const [nflLogo, setNFLLogo] = useState('');
    const [nbaLogo, setNBALogo] = useState('');

    const ChangeViewMode = (event) => {
        const { value } = event.target;
        const isLight = value !== 'dark';
        let newValue = 'light';
        if (isLight) {
            newValue = 'dark';
        }
        if (value) dispatch(setViewMode(newValue));
        localStorage.setItem('theme', newValue);
    };

    useEffect(() => {
        if (currentUser) {
            if (currentUser.cbb_id > 0) {
                const cbb = getLogo(
                    SimCBB,
                    currentUser.cbb_id,
                    currentUser.IsRetro
                );
                setCBBLogo(() => cbb);
            }
            if (currentUser.teamId > 0) {
                const cfb = getLogo(
                    SimCFB,
                    currentUser.teamId,
                    currentUser.IsRetro
                );
                setCFBLogo(() => cfb);
            }
            if (currentUser.NFLTeamID > 0) {
                const nfl = getLogo(
                    SimNFL,
                    currentUser.NFLTeamID,
                    currentUser.IsRetro
                );
                setNFLLogo(() => nfl);
            }
            if (currentUser.NBATeamID > 0) {
                const nba = getLogo(
                    SimNBA,
                    currentUser.NBATeamID,
                    currentUser.IsRetro
                );
                setNBALogo(() => nba);
            }
        }
    }, [currentUser]);

    useEffect(() => {
        if (cfbTeam) {
            const colors = {
                color: '#fff',
                backgroundColor:
                    cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d',
                borderColor:
                    cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d'
            };
            setTeamColors(colors);
        }
    }, [cfbTeam]);

    const ToggleRetroMode = async () => {
        if (currentUser && !currentUser.IsSubscribed) return;
        const toggle = currentUser.IsRetro;
        const firestore = firebase.firestore();
        let userRef = await firestore
            .collection('users')
            .where('username', '==', currentUser.username)
            .get();
        const payload = { IsRetro: !toggle };
        userRef.forEach(async (doc) => {
            await doc.ref.update(payload);
        });
        console.log('Firebase Updated');
    };

    const ProfileCard = ({
        teamLogo,
        team,
        isProfessional,
        profRole,
        sport
    }) => {
        const label = `${team}${sport}`;
        return (
            <div className="col-3">
                <div className="card">
                    <div className="card-body profile-card">
                        <div className="d-flex align-items-center mb-3">
                            <img
                                className="image img-match"
                                src={teamLogo}
                                alt="Team Logo"
                            />
                            <h5 className="card-title ms-3">{label}</h5>
                        </div>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                            {!isProfessional ? 'Head Coach' : profRole}
                        </h6>
                        <p className="card-text"></p>
                        <button className="btn btn-danger-outline" disabled>
                            Resign
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container userInterface">
            <div className="row">
                <div className="col-md-auto">
                    <h2 className="subtitle is-3">{username}</h2>
                </div>
            </div>
            <div className="row mt-2 text-start">
                {currentUser.teamId > 0 && (
                    <ProfileCard
                        teamLogo={cfbLogo}
                        team={currentUser.team}
                        sport=" Football"
                    />
                )}
                {currentUser.NFLTeamID > 0 && (
                    <ProfileCard
                        teamLogo={nflLogo}
                        team={currentUser.NFLTeam}
                        isProfessional
                        profRole={currentUser.NFLRole}
                        sport=""
                    />
                )}
                {currentUser.cbb_id > 0 && (
                    <ProfileCard
                        teamLogo={cbbLogo}
                        team={currentUser.cbb_team}
                        sport=" Basketball"
                    />
                )}
                {currentUser.NBATeamID > 0 && (
                    <ProfileCard
                        teamLogo={nbaLogo}
                        team={currentUser.NBATeam}
                        isProfessional
                        profRole={currentUser.NBARole}
                        sport=""
                    />
                )}
            </div>
            <div className="row mt-2">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Dark Mode Toggle</h6>
                            <h6 className="card-subtitle text-body-secondary mb-2">
                                {viewMode}
                            </h6>
                            <div className="row">
                                <div className="col ps-3 me-2">
                                    <FBAToggle
                                        label=""
                                        checkValue={viewMode === 'dark'}
                                        value={viewMode}
                                        change={ChangeViewMode}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {currentUser.IsSubscribed && (
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">
                                    Retro Mode Toggle
                                </h6>
                                <h6 className="card-subtitle text-body-secondary mb-2">
                                    {currentUser.IsRetro
                                        ? 'Activated'
                                        : 'Deactivated'}
                                </h6>
                                <div className="row">
                                    <div className="col ps-3 me-2">
                                        <FBAToggle
                                            label=""
                                            checkValue={currentUser.IsRetro}
                                            value={currentUser.IsRetro}
                                            change={ToggleRetroMode}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    cfbTeam: { cfbTeam },
    viewMode: { viewMode }
}) => ({
    currentUser,
    cfbTeam,
    viewMode
});

export default connect(mapStateToProps)(Profile);
