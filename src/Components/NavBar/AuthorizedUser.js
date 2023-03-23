import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase/firebase';
import routes from '../../Constants/routes';
// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from '../../Redux/user/user.actions';

const authorizedUser = (props) => {
    const { user, setCurrentUser } = props;
    var FBAdmin = () => {
        return (
            <li className="nav-item dropdown">
                <a
                    class="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <span className="glyphicon glyphicon-info-sign"></span>
                    Football Admin <span className="caret"></span>
                </a>
                <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                >
                    <li className="dropdown-item">
                        <Link to={routes.MANAGE_SIM} className="dropdown-item">
                            Manage Sim <span className="caret"></span>
                        </Link>
                    </li>
                    <li>
                        <hr className="navbar-divider"></hr>
                    </li>
                    <li className="dropdown-item">
                        <Link
                            to={routes.MANAGE_USERS}
                            className="dropdown-item"
                        >
                            Manage Teams <span className="caret"></span>
                        </Link>
                    </li>
                    <li className="dropdown-item">
                        <Link to={routes.APPROVE} className="dropdown-item">
                            Approve Requests <span className="caret"></span>
                        </Link>
                    </li>
                    <li className="dropdown-item">
                        <Link to={routes.APPROVE_NFL} className="dropdown-item">
                            Approve NFL Requests <span className="caret"></span>
                        </Link>
                    </li>
                    <li className="dropdown-item">
                        <Link
                            to={routes.NFL_ADMIN_TRADE}
                            className="dropdown-item"
                        >
                            NFL Trade Portal <span className="caret"></span>
                        </Link>
                    </li>
                </ul>
            </li>
        );
    };

    const BBAdmin = () => {
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
                    <span className="glyphicon glyphicon-info-sign"></span>
                    Basketball Admin <span className="caret"></span>
                </a>
                <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                >
                    <li className="dropdown-item">
                        <Link to={routes.BBA_ADMIN} className="dropdown-item">
                            Manage Sim <span className="caret"></span>
                        </Link>
                    </li>
                    <li>
                        <hr className="navbar-divider"></hr>
                    </li>
                    <li className="dropdown-item">
                        <Link to={routes.BBA_USERS} className="dropdown-item">
                            Manage Teams <span className="caret"></span>
                        </Link>
                    </li>
                    <li className="dropdown-item">
                        <Link to={routes.BBA_APPROVE} className="dropdown-item">
                            Approve Requests <span className="caret"></span>
                        </Link>
                    </li>
                </ul>
            </li>
        );
    };

    const logout = () => {
        auth.signOut();
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    return (
        <ul className="navbar-nav justify-content-end">
            {user && user.bba_roleID === 'Admin' ? <BBAdmin /> : ''}
            {user && user.roleID === 'Admin' ? <FBAdmin /> : ''}
            <li className="nav-item">
                <Link className="nav-link" to={routes.USER}>
                    <span className="glyphicon glyphicon-user"></span>
                    {user.username}
                </Link>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link"
                    href="https://www.simfba.com"
                    target="_blank"
                >
                    SimFBA Site
                </a>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link"
                    href="https://discord.gg/q46vwZ83RH"
                    target="_blank"
                >
                    Discord
                </a>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={routes.LANDING} onClick={logout}>
                    <span className="primary fas fa-sign-out-alt"></span> Log
                    Out
                </Link>
            </li>
        </ul>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(authorizedUser);
