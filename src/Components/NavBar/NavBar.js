import React from 'react';
import { Link } from 'react-router-dom';
import AuthorizedUser from './AuthorizedUser';
import UnauthorizedUser from './UnauthorizedUser';
import routes from '../../Constants/routes';
import NavBarStart from './NavBarStart';
import { connect } from 'react-redux';

const NavBar = ({ currentUser }) => {
    /*
    Will Need to setup some kind of Modal
  */
    const user = currentUser;
    return (
        <nav
            className="navbar navbar-expand-lg navbar-light bg-light"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="container-fluid">
                <Link to={routes.LANDING} className="navbar-brand">
                    <span className="glyphicon glyphicon-home"></span>
                    Interface
                </Link>

                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {user ? <NavBarStart user={user} /> : null}
                    </ul>
                    {user ? (
                        <AuthorizedUser user={user} />
                    ) : (
                        <UnauthorizedUser />
                    )}
                </div>
            </div>
        </nav>
    );
    // Return
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(NavBar);
