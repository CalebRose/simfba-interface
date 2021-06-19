import React from 'react';
import SignUp from './SignUp/SignUpPage';
import './SignUpLoginBody.style.css';

const body = () => {
    return (
        <div className="container userInterface center">
            <div className="row">
                <h2 className="title">Sign Up</h2>
                <div className="registration">
                    <SignUp />
                </div>
            </div>
        </div>
    );
};

export default body;
