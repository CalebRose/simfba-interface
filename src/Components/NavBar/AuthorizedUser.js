import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase/firebase';
import routes from '../../Constants/routes';

const authorizedUser = (props) => {
    const { user } = props;
    var RoleList = (props) => {
        if (props.user.roleID === 'Admin') {
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
                        Football Admin <span className="caret"></span>
                    </a>
                    <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                    >
                        <li className="dropdown-item">
                            <Link
                                to={routes.MANAGE_SIM}
                                className="dropdown-item"
                            >
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
                    </ul>
                </li>
            );
        } else return null;
    };

    const logout = () => {
        auth.signOut();
        localStorage.removeItem('token');
    };
    const Admin = () => {
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

    return (
        <ul className="navbar-nav justify-content-end">
            {user && user.roleID === 'Admin' ? <Admin /> : null}
            <RoleList user={user} />
            <li className="nav-item">
                <Link className="nav-link" to={routes.USER}>
                    <span className="glyphicon glyphicon-user"></span>
                    {user.username}
                </Link>
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

export default authorizedUser;
