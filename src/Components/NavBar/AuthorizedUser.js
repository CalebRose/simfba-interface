import React from "react";

const authorizedUser = props => {
  var RoleList = props => {
    if (props.user.roleID === 1) {
      return (
        <li className="dropdown">
          <a
            href="#"
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-expanded="false"
          >
            <span className="glyphicon glyphicon-info-sign"></span>{" "}
            Administration <span className="caret"></span>
          </a>
          <ul className="dropdown-menu" role="menu">
            <li>
              <a href="/admin/teams/all">All Teams</a>
            </li>
            <li className="divider"></li>
            <li>
              <a href="/admin/teams/assign">Assign Team</a>
            </li>
          </ul>
        </li>
      );
    }
  };

  return (
    <div>
      <a style={{ display: "inline-block" }} href="/profile">
        <span className="glyphicon glyphicon-user"></span>
        {props.user.username}
      </a>
      <a style={{ display: "inline-block" }} href="/logout">
        <span className="fas fa-sign-out-alt"></span> log out
      </a>
      <RoleList user={props.user} />
    </div>
  );
};

export default authorizedUser;
