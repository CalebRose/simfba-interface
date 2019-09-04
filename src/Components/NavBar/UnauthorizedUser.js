import React from "react";

var UnauthorizedUser = () => {
  return (
    <li className="dropdown">
      <a href="/signup" style={{ display: "inline-block" }}>
        <span class="fas fa-user-plus"></span> Sign up
      </a>
      /
      <a style={{ display: "inline-block" }} href="/login">
        <span className="fas fa-sign-in-alt"></span> Login
      </a>
    </li>
  );
};

export default UnauthorizedUser;
