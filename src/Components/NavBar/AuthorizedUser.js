import React from "react";

const authorizedUser = props => {
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
            <span className="glyphicon glyphicon-info-sign"></span>{" "}
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
        <a href="/profile">
          <span className="glyphicon glyphicon-user"></span>
          {props.user.username}
        </a>
      </div>
      <div className="navbar-item">
        <a href="/logout">
          <span className="fas fa-sign-out-alt"></span> log out
        </a>
      </div>
      <RoleList user={props.user} />
    </div>
  );
};

export default authorizedUser;
