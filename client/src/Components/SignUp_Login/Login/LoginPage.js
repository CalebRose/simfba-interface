import React from "react";
import FormInput from "../FormInput/FormInput";
import "./LoginPage.style.css";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <h2 className="login-logo">Login</h2>
      <form>
        <FormInput label="Username or Email" />
        <FormInput label="Password" />
        <div className="tile login-button">
          <button className="button">Login</button>
        </div>{" "}
      </form>
    </div>
  );
};

export default LoginPage;
