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
          <div className="navbar-item">
            {this.props.user.teamAbbr != null ? <Team /> : <AvailableTeams />}
          </div>
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
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            {/* Switch image to a home icon */}
            {/* <img
              src="https://bulma.io/images/bulma-logo.png"
              alt="Bulma: Free, open source, & modern CSS framework based on Flexbox"
              width="112"
              height="28"
            /> */}
            <span className="glyphicon glyphicon-home"></span> Home
          </a>
          <a
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
          <div className="navbar-start"></div>
          <div>
            {typeof this.props.user.username != "undefined" ? (
              <AuthorizedUser user={this.props.user} />
            ) : (
              <UnauthorizedUser />
            )}
          </div>
        </div>
      </nav>
      // <nav className="navbar navbar-default navbar-static-top navbar-inverse">
      //   <div className="container">
      //     <ul className="nav navbar-nav">
      //       <li className="active">
      //         <a href="/">
      //           <span className="glyphicon glyphicon-home"></span> Home
      //         </a>
      //       </li>
      //       <TeamTab />
      //     </ul>
      //     <ul className="nav navbar-nav navbar-right">
      //       <li className="navbar-right">
      //         {typeof this.props.user.username != "undefined" ? (
      //           <AuthorizedUser user={this.props.user} />
      //         ) : (
      //           <UnauthorizedUser />
      //         )}
      //       </li>
      //     </ul>
      //   </div>
      // </nav>
    );
  }
  // Return
}

export default NavBar;
