import React from 'react';
import { connect, useSelector } from 'react-redux';

const ManageTeams = ({ currentUser }) => {
  // State
  const user = useSelector((state) => state.user.currentUser);
  const [teams, setTeams] = React.useState([]);
  console.log(user);
  // Use Effects Begin

  // Use Effects End

  // Admin UI
  const AdminUI = ({}) => {
    return (
      <div className='hero-body center'>
        <div className='container is-fluid has-text-centered userInterface'>
          <h2 className='title is-3'>Manage Users and Teams</h2>
          <div className='availableScrollbar available-ui-height availableTeams'>
            <div className='table-wrapper dTable'>
              <table className='table is-fullwidth is-hoverable is-truncated'>
                <thead>
                  <tr>
                    <th style={{ width: '120px' }}>
                      <abbr>Team</abbr>
                    </th>
                    <th style={{ width: '80px' }}>
                      <abbr title='User'>User</abbr>
                    </th>
                    <th style={{ width: '50px' }}>
                      <abbr title='Conference'>Conf.</abbr>
                    </th>
                    <th style={{ width: '50px' }}>
                      <abbr title='Revoke Team'>Revoke</abbr>
                    </th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th style={{ width: '120px' }}>
                      <abbr>Team</abbr>
                    </th>
                    <th style={{ width: '80px' }}>
                      <abbr title='User'>User</abbr>
                    </th>
                    <th style={{ width: '50px' }}>
                      <abbr title='Conference'>Conf.</abbr>
                    </th>
                    <th style={{ width: '50px' }}>
                      <abbr title='Revoke Team'>Revoke</abbr>
                    </th>
                  </tr>
                </tfoot>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const InvalidUser = () => {
    return (
      <div className='hero-body center'>
        <div className='is-fluid has-text-centered'>
          <h2 className='subtitle is-3 availableText'>
            Please return to Landing Page immediately.
          </h2>
        </div>
      </div>
    );
  };

  // Return
  return currentUser.roleID !== 'Admin' ? <InvalidUser /> : <AdminUI />;
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(ManageTeams);
