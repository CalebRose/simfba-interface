import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../Constants/routes';

var UnauthorizedUser = () => {
  return (
    <div className='navbar-end'>
      <div className='navbar-item'>
        {/*<Link to={routes.SIGNUP}><span className='fas fa-user-plus'></span> Sign up</Link>*/ /*  This link was removed until signup is implemented.  */}
        <div style={{ color: "lightgray" }}><span className='fas fa-user-plus'></span> Sign up</div>
      </div>
      <div className='navbar-item'>
        <Link to={routes.LOGIN}><span className='fas fa-sign-in-alt'></span> Login</Link>
      </div>
    </div>
  );
};

export default UnauthorizedUser;
