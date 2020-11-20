import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import RequestRow from './RequestRow';
import firebase from 'firebase';
import url from '../../../Constants/url';

const ApproveRequests = ({ currentUser }) => {
  // State
  const user = useSelector((state) => state.user.currentUser);
  const [requests, setRequests] = React.useState([]);
  // Use Effects Begin
  // Get Requests
  useEffect(() => {
    const getRequests = async () => {
      let res = await fetch(url + 'requests', {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      });
      let json;
      if (res.ok) {
        json = await res.json();
      } else {
        alert('HTTP-Error:', res.status);
      }
      setRequests(json);
    };
    if (user) {
      getRequests();
    }
  }, [user]);

  // Use Effects End

  // Click Functions
  const approveRequest = async (payload) => {
    try {
      // DB request for Request
      let res = await fetch(url + 'requests/approve/' + payload.reqId, {
        headers: {
          authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          reqId: payload.reqId,
        }),
      });
      if (res.ok) {
        console.log(
          'Approved Request:',
          payload.teamId + ' ' + payload.team + ' ' + payload.username
        );
      } else {
        throw ('HTTP-Error: Approval incomplete', res.status);
      }

      // DB Request for assigning coach to team
      let assignTeam = await fetch(url + 'teams/assign/' + payload.teamId, {
        headers: {
          authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (assignTeam.ok) {
        console.log(payload.username + ' is now assigned to ' + payload.team);
      } else {
        throw ('HTTP-Error: Approval incomplete', res.status);
      }

      // Firebase Call
      const firestore = firebase.firestore();
      let userRef = await firestore
        .collection('users')
        .where('username', '==', payload.username)
        .get();

      userRef.forEach(async (doc) => {
        await doc.ref.update(payload);
      });
      console.log('Firebase Updated');
      // Filter Requests
      const filterRequests = requests.filter((x) => x.id !== payload.reqId);
      setRequests(filterRequests);
    } catch (err) {
      if (err) {
        console.log(err);
        alert(err);
      }
    }
  };

  const rejectRequest = async (payload) => {
    // DB Request
    let res = await fetch(url + 'request/reject', {
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      console.log('Rejected Request:', payload.reqId);
    } else {
      throw ('HTTP-Error: Approval incomplete', res.status);
    }
    // Filter Requests
    const filterRequests = requests.filter((x) => x.id !== payload.id);
    setRequests(filterRequests);
  };

  // Click Functions End

  // Admin UI
  const AdminUI = () => {
    return (
      <div className='hero-body center'>
        <div className='container is-fluid has-text-centered userInterface'>
          <h2 className='title is-3'>Approve Requests</h2>
          <div className='availableScrollbar available-ui-height availableTeams'>
            <div className='table-wrapper dTable'>
              <table className='table is-fullwidth is-hoverable is-truncated'>
                <thead>
                  <tr>
                    <th style={{ width: '120px' }}>
                      <abbr>Team</abbr>
                    </th>
                    <th style={{ width: '120px' }}>
                      <abbr>Conference</abbr>
                    </th>
                    <th style={{ width: '80px' }}>
                      <abbr title='User'>User</abbr>
                    </th>
                    <th style={{ width: '50px' }}>
                      <abbr title='Approve'>Approve</abbr>
                    </th>
                    <th style={{ width: '50px' }}>
                      <abbr title='Reject'>Reject</abbr>
                    </th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th style={{ width: '200px' }}>
                      <abbr>Team</abbr>
                    </th>
                    <th style={{ width: '120px' }}>
                      <abbr>Conference</abbr>
                    </th>
                    <th style={{ width: '80px' }}>
                      <abbr title='User'>User</abbr>
                    </th>
                    <th style={{ width: '50px' }}>
                      <abbr title='Approve'>Approve</abbr>
                    </th>
                    <th style={{ width: '50px' }}>
                      <abbr title='Reject'>Reject</abbr>
                    </th>
                  </tr>
                </tfoot>
                <tbody>
                  {requests.map((x, i) => {
                    return (
                      <RequestRow
                        key={i}
                        request={x}
                        approve={approveRequest}
                        reject={rejectRequest}
                      />
                    );
                  })}
                </tbody>
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

export default connect(mapStateToProps)(ApproveRequests);
