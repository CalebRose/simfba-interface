import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/firebase";
import routes from "../../Constants/routes";

const authorizedUser = props => {
  const { user } = props;
  var RoleList = props => {
    if (props.user.roleID === 1) {
      return (
        <div className="navbar-item has-dropdown">
          <a
            href="#"
            className="navbar-link"
            data-toggle="dropdown"
            role="button"
            aria-expanded="false"
          >
            <span className="glyphicon glyphicon-info-sign"></span>
            Administration <span className="caret"></span>
          </a>
          <div className="navbar-dropdown">
            <a className="navbar-item" href="/admin/teams/all">
              All Teams
            </a>
            <hr className="navbar-divider"></hr>
            <a href="/admin/teams/assign">Assign Team</a>
          </div>
        </div>
      );
    } else return null;
  };

  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <Link to={routes.USER}>
          <span className="glyphicon glyphicon-user"></span>
          {user.username}
        </Link>
      </div>
      <div className="navbar-item">
        <Link to={routes.LANDING} onClick={() => auth.signOut()}>
          <span className="fas fa-sign-out-alt"></span> log out
        </Link>
      </div>
      <RoleList user={user} />
    </div>
  );
};

export default authorizedUser;
