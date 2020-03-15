import React, { Component } from "react";
import FormInput from "../FormInput/FormInput";
import "./LoginPage.style.css";
import { auth, signInWithGoogle } from "./../../../Firebase/firebase";

class LoginPage extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
  // handleGoogle = () => {
  //   try {
  //     signInWithGoogle();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  handleChange = event => {
    //
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="LoginPage">
        <h2 className="login-logo">Login</h2>
        <form>
          <FormInput
            name="email"
            value={email}
            label="Email"
            handleChange={this.handleChange}
          />
          <FormInput
            name="password"
            value={password}
            label="Password"
            handleChange={this.handleChange}
          />
          <div className="tile buttons">
            <button className="button login-button" onClick={this.handleSubmit}>
              Login
            </button>
            {/* <button
              className="button login-button google"
              onClick={signInWithGoogle}
            >
              Login With Google
            </button> */}
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
