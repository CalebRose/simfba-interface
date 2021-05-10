import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../Constants/routes';
import { connect } from 'react-redux';

const NavBar_Start = ({ currentUser }) => {
    const user = currentUser;
    var TeamTab = (props) => {
        if (
            typeof props.user !== 'undefined' &&
            (typeof props.username !== 'undefined' ||
                typeof props.username !== null)
        ) {
            if (props.teamAbbr !== '' && props.teamAbbr.length > 0) {
                return <Team />;
            } else {
                return <AvailableTeams />;
            }
        }
    };

    var Team = () => {
        return (
            <li className="nav-item dropdown">
                <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {user.team}
                </a>
                <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                >
                    <li>
                        <Link to={routes.TEAM} className="dropdown-item">
                            Team Page
                        </Link>
                    </li>
                    <li>
                        <Link to={routes.ROSTER} className="dropdown-item">
                            Roster
                        </Link>
                    </li>
                    <li>
                        <Link to={routes.DEPTHCHART} className="dropdown-item">
                            Depth Chart
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={routes.RECRUITING_BOARD}
                            className="dropdown-item"
                        >
                            Recruiting Board
                        </Link>
                    </li>
                    <li>
                        <Link to={routes.SCHEDULING} className="dropdown-item">
                            Scheduling
                        </Link>
                    </li>
                </ul>
            </li>
        );
    };

    var AvailableTeams = () => {
        return (
            <div className="nav-item">
                <Link className="nav-link" to={routes.AVAILABLE_TEAMS}>
                    <span className="glyphicon glyphicon-open"></span> Request
                    Team
                </Link>
            </div>
        );
    };
    return (
        <div className="">
            <ul className="navbar-nav">
                <li className="nav-item">
                    {currentUser.team !== null && currentUser.team !== '' ? (
                        <Team />
                    ) : (
                        <AvailableTeams />
                    )}
                    {/* <TeamTab user={user} username={user.username} teamAbbr={user.teamAbbr} /> */}
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={routes.RECRUITING}>
                        Recruits
                    </Link>
                </li>
                <li className="nav-item">
                    <span className="nav-link">|</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link">Basketball (Coming Soon)</span>
                </li>
            </ul>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(NavBar_Start);
