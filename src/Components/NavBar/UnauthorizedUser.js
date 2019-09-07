import React from "react";

var UnauthorizedUser = () => {
  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <a href="/signup">
          <span class="fas fa-user-plus"></span> Sign up
        </a>
      </div>
      <div className="navbar-item">
        <a href="/login">
          <span className="fas fa-sign-in-alt"></span> Login
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedUser;
