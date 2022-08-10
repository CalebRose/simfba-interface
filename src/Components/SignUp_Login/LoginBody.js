import React from 'react';
import SignUp from './SignUp/SignUpPage';
import LoginPage from './Login/LoginPage';
import './SignUpLoginBody.style.css';

const body = (props) => {
    return (
        <div className="container userInterface center">
            <div className="row">
                <h2 className="title">Login</h2>
                <div className="registration">
                    <LoginPage {...props} />
                </div>
            </div>
        </div>
    );
};

export default body;
