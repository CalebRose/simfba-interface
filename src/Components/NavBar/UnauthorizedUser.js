import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../Constants/routes';

var UnauthorizedUser = () => {
    return (
        <ul className="navbar-nav justify-content-end">
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
                <Link to={routes.SIGNUP} className="nav-link">
                    <span className="fas fa-user-plus"></span> Sign up
                </Link>
            </li>
            <li className="nav-item">
                <Link to={routes.LOGIN} className="nav-link">
                    <span className="fas fa-sign-in-alt"></span> Login
                </Link>
            </li>
        </ul>
    );
};

export default UnauthorizedUser;
