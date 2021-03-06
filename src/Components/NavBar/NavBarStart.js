import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../Constants/routes';
import { connect } from 'react-redux';

const NavBar_Start = ({ currentUser }) => {
  const user = currentUser;
  var TeamTab = props => {
    if (
      typeof props.user !== 'undefined' &&
      (typeof props.username !== 'undefined' || typeof props.username !== null)
    ) {
      if (props.teamAbbr !== '') {
        return <Team />;
      } else {
        return <AvailableTeams />;
      }
    }
  };

  var Team = () => {
    return (
      <div className='navbar-item has-dropdown is-hoverable'>
        <Link to={routes.TEAM} className='navbar-link'>
          {user.team}
        </Link>
        <div className='navbar-dropdown is-boxed'>
          <Link to={routes.ROSTER} className='navbar-item'>
            Roster
          </Link>
          <Link to={routes.DEPTHCHART} className='navbar-item'>
            Depth Chart
          </Link>
          <Link to={routes.RECRUITING_BOARD} className='navbar-item'>
            Recruiting Board
          </Link>
          <Link to={routes.SCHEDULING} className='navbar-item'>
            Scheduling
          </Link>
        </div>
      </div>
    );
  };

  var AvailableTeams = () => {
    return (
      <div className='navbar-item'>
        <Link to={routes.AVAILABLE_TEAMS}>
          <span className='glyphicon glyphicon-open'></span> Request Team
        </Link>
      </div>
    );
  };
  return (
    <div className='navbar-start'>
      {currentUser.team ? <Team /> : <AvailableTeams />}
      {/* <TeamTab user={user} username={user.username} teamAbbr={user.teamAbbr} /> */}
      <div className='navbar-item'>
        <Link to={routes.RECRUITING}>Recruits</Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(mapStateToProps)(NavBar_Start);
