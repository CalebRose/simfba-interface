import React, { Component } from 'react';
import FormInput from '../FormInput/FormInput';
import './LoginPage.style.css';
// import { auth, signInWithGoogle } from "./../../../Firebase/firebase";
import { auth } from './../../../Firebase/firebase';
import { Link } from 'react-router-dom';
import routes from '../../../Constants/routes';

class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        hasError: false,
        isLoading: false,
        message: ''
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            this.setState({
                isLoading: true,
                message: 'Attempting Sign In...'
            });
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                email: '',
                password: '',
                isLoading: false,
                message: 'Sign In successful. Please return to Landing Page.'
            });
            console.log('successful login.');
            auth.currentUser
                .getIdToken(/* forceRefresh */ true)
                .then(function (idToken) {
                    // Send token to your backend via HTTPS
                    // ...
                    localStorage.setItem('token', idToken);
                })
                .catch(function (error) {
                    console.log('test 1');
                    console.log(error);
                    // Handle error
                });
            this.setState({ message: '' });
            this.props.history.push('/user'); // on successful login, change user's location to their home page: /user
        } catch (error) {
            console.log('test 2');
            console.log(error);
            this.setState({
                message: error.message,
                hasError: true,
                isLoading: false
            });
            setTimeout(() => {
                this.setState({ message: '', hasError: false });
            }, 5000);
        }
    };

    handleChange = (event) => {
        //
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { email, password, message, hasError, isLoading } = this.state;
        return (
            <div className="LoginPage">
                <div class="row">
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
                        <div className="row signup-button">
                            <Link to={routes.LANDING}>
                                <button
                                    className="btn btn-primary login-button"
                                    onClick={this.handleSubmit}
                                >
                                    Login
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="row mt-2">
                    {message.length > 0 && !isLoading && !hasError ? (
                        <div className="alert alert-success">{message}</div>
                    ) : (
                        ''
                    )}
                    {message.length > 0 && isLoading && !hasError ? (
                        <div className="alert alert-secondary">{message}</div>
                    ) : (
                        ''
                    )}
                    {message.length > 0 && hasError && !isLoading ? (
                        <div className="alert alert-danger">{message}</div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    }
}

export default LoginPage;
