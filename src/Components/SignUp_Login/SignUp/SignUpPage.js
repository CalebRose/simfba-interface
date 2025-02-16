import React from 'react';
import FormInput from '../FormInput/FormInput';
import './SignUpPage.style.css';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification
} from 'firebase/auth';
import { createUserProfileDocument } from '../../../Firebase/firebase'; // Updated import
import { Link } from 'react-router-dom';
import routes from './../../../Constants/routes';

class SignUp extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
            alert(
                'WARNING! You need to fill out all input fields in the form.'
            );
            return;
        }
        if (password !== confirmPassword) {
            alert(
                'WARNING! Password does not match with Password Confirmation'
            );
            return;
        }
        try {
            const auth = getAuth();
            const userCredential = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            const user = userCredential.user;

            await createUserProfileDocument(user, {
                username,
                team: '',
                teamAbbr: '',
                mascot: '',
                roleID: null
            });

            await sendEmailVerification(user);

            const idToken = await user.getIdToken(true);
            localStorage.setItem('token', idToken);

            this.setState({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            this.props.history.push('/user');
            alert('Successfully registered. Welcome, ' + username + '!');
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
            <div className="SignUp">
                <div className="row">
                    <form>
                        <FormInput
                            name="username"
                            type="text"
                            value={username}
                            label="Username"
                            handleChange={this.handleChange}
                        />
                        <FormInput
                            name="email"
                            type="email"
                            value={email}
                            label="Email"
                            handleChange={this.handleChange}
                        />
                        <FormInput
                            name="password"
                            type="password"
                            value={password}
                            label="Password"
                            handleChange={this.handleChange}
                        />
                        <FormInput
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            label="Confirm Password"
                            handleChange={this.handleChange}
                        />
                        <div className="row signup-button">
                            <Link to={routes.LANDING}>
                                <button
                                    className="btn btn-primary"
                                    onClick={this.handleSubmit}
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;
