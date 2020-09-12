import React, { Component } from 'react';
import { connect } from 'react-redux';

const ManageSim = ({ currentUser }) => {
  return (
    <div className='landingPage'>
      <p>TEST</p>
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(ManageSim);
