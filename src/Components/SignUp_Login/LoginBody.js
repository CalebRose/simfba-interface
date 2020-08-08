import React from 'react';
import SignUp from './SignUp/SignUpPage';
import LoginPage from './Login/LoginPage';
import './SignUpLoginBody.style.css';

const body = (props) => {
  return (
    <div className='hero-body center'>
      <div className='container is-fluid has-text-centered userInterface'>
        <h2 className='title is-3'>Login</h2>
        <div className='registration'>
          <LoginPage {...props} />
        </div>
      </div>
    </div>
  );
};

export default body;
