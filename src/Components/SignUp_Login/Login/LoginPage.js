import React, { Component } from "react";
import FormInput from "../FormInput/FormInput";
import "./LoginPage.style.css";
// import { auth, signInWithGoogle } from "./../../../Firebase/firebase";
import { auth } from "./../../../Firebase/firebase";
import { Link } from "react-router-dom";
import routes from "../../../Constants/routes";

class LoginPage extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = async event => {
    console.log(this.props);
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
      console.log("successful login.");
      this.props.history.push("/user"); // on successful login, change user's location to their home page: /user
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
            type="email"
            handleChange={this.handleChange}
          />
          <FormInput
            name="password"
            value={password}
            label="Password"
            type="password"
            handleChange={this.handleChange}
          />
          <div className="tile signup-button">
            <Link to={routes.LANDING}>
              <button
                className="button login-button"
                onClick={this.handleSubmit}
              >
                Login
              </button>
            </Link>

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
