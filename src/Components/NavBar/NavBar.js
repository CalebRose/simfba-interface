import React from 'react';
import { Link } from 'react-router-dom';
import AuthorizedUser from './AuthorizedUser';
import UnauthorizedUser from './UnauthorizedUser';
import routes from '../../Constants/routes';
import NavBarStart from './NavBarStart';
import { connect } from 'react-redux';

const NavBar = ({ currentUser, viewMode, inbox }) => {
    /*
    Will Need to setup some kind of Modal
  */
    const GetViewModeClasses = (theme) => {
        if (theme === 'light') return 'bg-light';
        return 'navbar-dark bg-dark';
    };

    const viewModeClasses = GetViewModeClasses(viewMode);
    return (
        <nav
            className={`navbar navbar-expand-lg ${viewModeClasses}`}
            role="navigation"
            aria-label="main navigation"
        >
            <div className="container-fluid">
                <Link to={routes.LANDING} className="navbar-brand">
                    <span className="glyphicon glyphicon-home"></span>
                    Interface
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {currentUser ? (
                            <NavBarStart user={currentUser} />
                        ) : null}
                    </ul>
                    {currentUser ? (
                        <AuthorizedUser user={currentUser} inbox={inbox} />
                    ) : (
                        <UnauthorizedUser />
                    )}
                </div>
            </div>
        </nav>
    );
    // Return
};

const mapStateToProps = ({
    user: { currentUser },
    viewMode: { viewMode },
    inbox: inbox
}) => ({
    currentUser,
    viewMode,
    inbox
});

export default connect(mapStateToProps)(NavBar);
