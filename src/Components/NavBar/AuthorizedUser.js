import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase/firebase';
import routes from '../../Constants/routes';

const authorizedUser = (props) => {
  const { user } = props;
  var RoleList = (props) => {
    if (props.user.roleID === 'Admin') {
      return (
        <div className='navbar-item has-dropdown is-hoverable'>
          <p
            className='navbar-link'
            data-toggle='dropdown'
            role='button'
            aria-expanded='false'
          >
            <span className='glyphicon glyphicon-info-sign'></span>
            Administration <span className='caret'></span>
          </p>
          <div className='navbar-dropdown'>
            <Link to={routes.MANAGE_SIM} className='navbar-item'>
              Manage Sim <span className='caret'></span>
            </Link>
            <hr className='navbar-divider'></hr>
            <Link to={routes.MANAGE_USERS} className='navbar-item'>
              Manage Teams <span className='caret'></span>
            </Link>
            <Link to={routes.APPROVE} className='navbar-item'>
              Approve Requests <span className='caret'></span>
            </Link>
          </div>
        </div>
      );
    } else return null;
  };

  const logout = () => {
    auth.signOut();
    localStorage.removeItem('token');
  };
  const Admin = () => {
    return (
      <div className='navbar-item'>
        <Link to={routes.ADMIN}>
          <span className='glyphicon glyphicon-info-sign'></span>
          Admin <span className='caret'></span>
        </Link>
      </div>
    );
  };

  return (
    <div className='navbar-end'>
      {user && user.roleID === 'Admin' ? <Admin /> : null}
      <RoleList user={user} />
      <div className='navbar-item'>
        <Link to={routes.USER}>
          <span className='glyphicon glyphicon-user'></span>
          {user.username}
        </Link>
      </div>
      <div className='navbar-item'>
        <Link to={routes.LANDING} onClick={logout}>
          <span className='fas fa-sign-out-alt'></span> log out
        </Link>
      </div>
    </div>
  );
};

export default authorizedUser;
