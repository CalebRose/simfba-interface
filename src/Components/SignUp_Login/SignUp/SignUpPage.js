import React from 'react';
import FormInput from '../FormInput/FormInput';
import './SignUpPage.style.css';
import { auth, createUserProfileDocument } from '../../../Firebase/firebase';
import { Link } from 'react-router-dom';
import routes from './../../../Constants/routes';

class SignUp extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    if (
      username === null ||
      username.length === 0 ||
      email === null ||
      email.length === 0 ||
      password === null ||
      password.length === 0 ||
      confirmPassword === null ||
      confirmPassword.length === 0
    ) {
      alert('WARNING! You need to fill out all input fields in the form.');
      return;
    }
    if (password !== confirmPassword) {
      alert('WARNING! Password does not match with Password Confirmation');
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, {
        username,
        team: '',
        teamAbbr: '',
        mascot: '',
        roleID: null,
      });

      this.setState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { username, email, password, confirmPassword } = this.state;
    return (
      <div className='SignUp'>
        <h2 className='is-left sign-up-logo'>Sign Up</h2>
        <div className='tile is-ancestor'>
          <div className='tile is-parent is-vertical'>
            <form>
              <FormInput
                name='username'
                type='text'
                value={username}
                label='Username'
                handleChange={this.handleChange}
              />
              <FormInput
                name='email'
                type='email'
                value={email}
                label='Email'
                handleChange={this.handleChange}
              />
              <FormInput
                name='password'
                type='password'
                value={password}
                label='Password'
                handleChange={this.handleChange}
              />
              <FormInput
                name='confirmPassword'
                type='password'
                value={confirmPassword}
                label='Confirm Password'
                handleChange={this.handleChange}
              />
              <div className='tile signup-button'>
                <Link to={routes.LANDING}>
                  <button className='button' onClick={this.handleSubmit}>
                    Sign Up
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
