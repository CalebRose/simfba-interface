import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthorizedUser from "./AuthorizedUser";
import UnauthorizedUser from "./UnauthorizedUser";
import routes from "../../Constants/routes";
import NavBarStart from "./NavBarStart";

class NavBar extends Component {
  state = { test: true };
  render() {
    return (
      <nav
        className="navbar is-transparent is-marginless heading has-text-weight-bold"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <Link to={routes.LANDING} class="navbar-item">
            {/* Switch image to a home icon */}
            {/* <img
              src="https://bulma.io/images/bulma-logo.png"
              alt="Bulma: Free, open source, & modern CSS framework based on Flexbox"
              width="112"
              height="28"
            /> */}
            <span className="glyphicon glyphicon-home"></span> Interface
          </Link>
          <a
            href=""
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu">
          {/* Probably create a component for navbar-start*/}
          <NavBarStart user={this.props.user} />
          {typeof this.props.user.username != "undefined" ? (
            <AuthorizedUser user={this.props.user} />
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
