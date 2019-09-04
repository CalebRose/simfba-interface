import React, { Component } from "react";
import AuthorizedUser from "./AuthorizedUser";
import UnauthorizedUser from "./UnauthorizedUser";

class NavBar extends Component {
  state = { test: true };
  render() {
    // Team Tab
    var TeamTab = props => {
      if (
        typeof this.props.user !== "undefined" &&
        typeof this.props.user.username !== "undefined"
      ) {
        return (
          <li className="">
            {this.props.user.teamAbbr != null ? <Team /> : <AvailableTeams />}
          </li>
        );
      }
    };

    var Team = () => {
      return (
        <a href="/">
          <span className=""></span> {this.props.user.teamAbbr}
        </a>
      );
    };

    var AvailableTeams = () => {
      return (
        <a href="/user/teams/available">
          <span className="glyphicon glyphicon-open"></span> Request Team
        </a>
      );
    };
    return (
      <div className="navbar navbar-default navbar-static-top navbar-inverse">
        <div className="container">
          <ul className="nav navbar-nav">
            <li className="active">
              <a href="/">
                <span className="glyphicon glyphicon-home"></span> Home
              </a>
            </li>
            <TeamTab />
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="navbar-right">
              {typeof this.props.user.username != "undefined" ? (
                <AuthorizedUser user={this.props.user} />
              ) : (
                <UnauthorizedUser />
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  }
  // Return
}

export default NavBar;
