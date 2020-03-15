import React from "react";
import SignUp from "./SignUp/SignUpPage";
import LoginPage from "./Login/LoginPage";
import "./SignUpLoginBody.style.css";

const body = () => {
  return (
    <div className="hero-body center">
      <div className="container is-fluid has-text-centered userInterface">
        <h2 className="title is-3">Registration</h2>
        <div className="registration">
          <SignUp />
          <LoginPage />
        </div>
        {/* <div className="columns is-left is-12">
          <div className="column is-2"></div>
          <div className="column is-2"></div>
        </div>
        <div className="is-divider" /> */}
      </div>
    </div>
  );
};

export default body;
