import React from "react";
import FormInput from "../FormInput/FormInput";
import "./SignUpPage.style.css";

class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { username, email, password, confirmPassword } = this.state;
    return (
      <div className="SignUp">
        <h2 className="is-left sign-up-logo">Sign Up</h2>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical">
            <form>
              <FormInput name="username" value={username} label="Username" />
              <FormInput name="email" value={email} label="Email" />
              <FormInput name="password" value={password} label="Password" />
              <FormInput
                name="confirmPassword"
                value={confirmPassword}
                label="Confirm Password"
              />
              <div className="tile signup-button">
                <button className="button">Sign Up</button>
              </div>
            </form>
          </div>
        </div>

        {/* Implement Sign Up Button. Fetch Request for implmenting a new user */}
      </div>
    );
  }
}

export default SignUp;
