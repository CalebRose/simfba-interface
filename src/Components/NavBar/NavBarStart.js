import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../Constants/routes';
import { connect } from 'react-redux';

const NavBar_Start = ({ currentUser }) => {
    const user = currentUser;

    var CFBTeam = () => {
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
                        <Link className="dropdown-item" to={routes.RECRUITING}>
                            AllCFB Recruits
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

    const CBBTeam = () => {
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
                    {user.cbb_team}
                </a>
                <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                >
                    <li>
                        <Link to={routes.CBB_TEAM} className="dropdown-item">
                            Team Page
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={routes.CBB_GAMEPLAN}
                            className="dropdown-item"
                        >
                            Gameplan
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={routes.CBB_RECRUITING_BOARD}
                            className="dropdown-item"
                        >
                            Recruiting Board
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="dropdown-item"
                            to={routes.CBB_RECRUITING}
                        >
                            All CBB Recruits
                        </Link>
                    </li>
                    <li>
                        <Link to={routes.CBB_STATS} className="dropdown-item">
                            Stats
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
                        <CFBTeam />
                    ) : (
                        <li className="nav-item">
                            <span className="nav-link">CFB (None)</span>
                        </li>
                    )}
                    {/* <TeamTab user={user} username={user.username} teamAbbr={user.teamAbbr} /> */}
                </li>
                <li className="nav-item">
                    <span className="nav-link">|</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link">NFL (Soon)</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link">|</span>
                </li>
                <li className="nav-item">
                    {currentUser.cbb_team !== null &&
                    currentUser.cbb_team !== '' ? (
                        <CBBTeam />
                    ) : (
                        <li className="nav-item">
                            <span className="nav-link">CBB (None)</span>
                        </li>
                    )}
                </li>
                <li className="nav-item">
                    <span className="nav-link">|</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link">NBA (Soon)</span>
                </li>

                {currentUser.teamId === null ||
                currentUser.nfl_id === null ||
                currentUser.cbb_teamId === null ||
                currentUser.nba_teamID === null ? (
                    <div>
                        <li className="nav-item">
                            <span className="nav-link">|</span>
                        </li>
                        <AvailableTeams />
                    </div>
                ) : (
                    ''
                )}
            </ul>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(NavBar_Start);
