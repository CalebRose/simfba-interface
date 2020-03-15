import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthorizedUser from "./AuthorizedUser";
import UnauthorizedUser from "./UnauthorizedUser";
import routes from "../../Constants/routes";
import NavBarStart from "./NavBarStart";

class NavBar extends Component {
  state = { test: true, modalState: false };
  /*
    Will Need to setup some kind of Modal
  */

  render() {
    const user = this.props.user;
    return (
      <nav
        className="navbar is-transparent is-marginless heading has-text-weight-bold"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to={routes.LANDING} className="navbar-item">
            {/* Switch image to a home icon */}
            {/* <img
              src="https://bulma.io/images/bulma-logo.png"
              alt="Bulma: Free, open source, & modern CSS framework based on Flexbox"
              width="112"
              height="28"
            /> */}
            <span className="glyphicon glyphicon-home"></span> Interface
          </Link>
          <p
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </p>
        </div>
        <div className="navbar-menu">
          {/* Probably create a component for navbar-start*/}
          {user.username !== "" || typeof user !== "undefined" ? (
            <NavBarStart user={user} />
          ) : null}
          {user.username !== "" ? (
            <AuthorizedUser user={user} />
          ) : (
            <UnauthorizedUser />
          )}
        </div>
      </nav>
    );
  }
  // Return
}

export default NavBar;
