import React, { useEffect } from 'react';
import routes from '../../Constants/routes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLogo } from '../../Constants/getLogo';

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
const Profile = ({ currentUser, cfbTeam }) => {
    let team = !!currentUser && !!currentUser.team ? currentUser.team : null;
    let username =
        !!currentUser && !!currentUser.username ? currentUser.username : '';
    let teamAbbr =
        !!currentUser && !!currentUser.teamAbbr ? currentUser.teamAbbr : '';
    const logo = getLogo(team);
    const [teamColors, setTeamColors] = React.useState('');

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

    return (
        <div className="container userInterface">
            <div className="row">
                <div className="col-md-auto">
                    <h2 className="subtitle is-3">{username}</h2>
                </div>
            </div>
            <div className="row mt-2 text-start">
                <div className="col-md-auto">
                    <div className="image me-2">
                        <img src={logo} alt="Team Logo" />
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <h2>User</h2>
                    </div>
                    <div>
                        <h2>Change Password</h2>
                    </div>
                </div>
                <div className="col-md-auto">
                    {teamAbbr !== '' ? (
                        <TeamTab user={currentUser} />
                    ) : (
                        <AvailableTab />
                    )}
                </div>
            </div>
            <div className="row mt-2 text-start">
                <div className="col-md-4">
                    <div>
                        <h3>Overall Wins:</h3>
                    </div>
                    <div>
                        <h3>Overall Losses:</h3>
                    </div>
                    <div>
                        <h3>Current Season Wins:</h3>
                    </div>
                    <div>
                        <h3>Current Season Losses:</h3>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="btn-group" role="group">
                    <Link
                        to={routes.ROSTER}
                        role="button"
                        class="btn btn-primary btn-md me-2 shadow"
                        style={teamColors ? teamColors : {}}
                    >
                        Roster
                    </Link>

                    <Link
                        to={routes.DEPTHCHART}
                        role="button"
                        class="btn btn-primary btn-md me-2 shadow"
                        style={teamColors ? teamColors : {}}
                    >
                        Depth Chart
                    </Link>
                    <button
                        type="button"
                        class="btn btn-primary btn-md me-2 shadow"
                        style={teamColors ? teamColors : {}}
                    >
                        Recruiting Board
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary btn-md me-2 shadow"
                        style={teamColors ? teamColors : {}}
                    >
                        Stats
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary btn-md shadow"
                        style={teamColors ? teamColors : {}}
                    >
                        Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser }, cfbTeam: { cfbTeam } }) => ({
    currentUser,
    cfbTeam
});

export default connect(mapStateToProps)(Profile);
