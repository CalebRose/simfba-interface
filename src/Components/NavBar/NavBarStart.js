import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../Constants/routes';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

const NavBar_Start = ({ currentUser }) => {
    const user = currentUser;
    const isMobile = useMediaQuery({ query: `(max-width:844px)` });
    const DesktopBarrier = () => {
        return !isMobile ? (
            <li className="nav-item">
                <span className="nav-link">|</span>
            </li>
        ) : (
            ''
        );
    };

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
                        <Link
                            to={routes.CFB_GAMEPLAN}
                            className="dropdown-item"
                        >
                            Gameplan
                        </Link>
                    </li>
                    <li>
                        <Link to={routes.DEPTHCHART} className="dropdown-item">
                            Depth Chart
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="dropdown-item"
                            to={routes.CFB_RECRUITING}
                        >
                            Recruiting Overview
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={routes.CFB_TEAM_RECRUITING_BOARD}
                            className="dropdown-item"
                        >
                            {user.team} Recruiting Board
                        </Link>
                    </li>
                    <li>
                        <Link to={routes.CFB_STATS} className="dropdown-item">
                            Statistics
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={routes.CFB_SCHEDULE}
                            className="dropdown-item"
                        >
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
                        <Link to={routes.CBB_STATS} className="dropdown-item">
                            Team Statistics
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={routes.CBB_RECRUITING_BOARD}
                            className="dropdown-item"
                        >
                            Team Recruiting Board
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="dropdown-item"
                            to={routes.CBB_RECRUITING}
                        >
                            CBB Recruiting Dashboard
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
                <>
                    <DesktopBarrier />
                    <li className="nav-item">
                        <span className="nav-link">NFL (Soon)</span>
                    </li>
                </>
                <DesktopBarrier />
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
                {/* <DesktopBarrier />
                <li className="nav-item">
                    <span className="nav-link">NBA (Soon)</span>
                </li> */}
                {/* <DesktopBarrier /> */}
                {currentUser.teamId === null ||
                currentUser.nfl_id === null ||
                currentUser.cbb_teamId === null ||
                currentUser.nba_teamID === null ? (
                    <>
                        <DesktopBarrier />
                        <AvailableTeams />
                    </>
                ) : (
                    <>
                        <DesktopBarrier />
                        <AvailableTeams />
                    </>
                )}
            </ul>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(NavBar_Start);
