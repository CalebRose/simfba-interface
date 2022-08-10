import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import SimBBA_url from '../../../../Constants/SimBBA_url';
import BBARequestService from '../../../../_Services/simNBA/BBARequestService';
import BBARequestRow from './BBARequestRow';

const BBAApproveRequests = ({ currentUser }) => {
    // State
    const [requests, setRequests] = React.useState([]);
    const requestService = new BBARequestService();
    // Use Effects Begin
    // Get Requests
    useEffect(() => {
        getRequests();
    }, []);

    // Use Effects End
    const getRequests = async () => {
        let requests = await requestService.GetTeamRequests(SimBBA_url);
        setRequests(requests);
    };

    // Click Functions
    const approveRequest = async (payload) => {
        try {
            // DB request for Request
            let requestPayload = {
                ID: payload.reqId,
                TeamID: payload.cbb_id,
                Username: payload.Username,
                IsApproved: true
            };

            console.log(requestPayload);

            let res = await requestService.ApproveRequest(
                SimBBA_url,
                requestPayload
            );

            if (res.ok) {
                console.log(
                    'Approved Request:',
                    payload.reqId + ' ' + payload.Team + ' ' + payload.Username
                );
                console.log(
                    payload.Username + ' is now assigned to ' + payload.Team
                );
            } else {
                throw ('HTTP-Error: Approval incomplete', res.status);
            }

            const firebasePayload = {
                cbb_team: payload.cbb_team,
                cbb_abbr: payload.cbb_abbr,
                cbb_id: payload.cbb_id,
                reqId: payload.reqId
            };

            // Firebase Call
            const firestore = firebase.firestore();
            let userRef = await firestore
                .collection('users')
                .where('username', '==', payload.Username)
                .get();

            userRef.forEach(async (doc) => {
                await doc.ref.update(firebasePayload);
            });

            console.log('Firebase Updated');

            // Filter Requests
            const filterRequests = requests.filter(
                (x) => x.ID !== payload.reqId
            );
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
        let res = await requestService.RejectTeamRequest(SimBBA_url, payload);

        if (res.ok) {
            console.log('Rejected Request:', payload.reqId);
        } else {
            throw ('HTTP-Error: Approval incomplete', res.status);
        }
        // Filter Requests
        const filterRequests = requests.filter((x) => x.ID !== payload.id);
        setRequests(filterRequests);
    };

    // Click Functions End

    // Admin UI
    const AdminUI = () => {
        return (
            <div className="hero-body center">
                <div className="container is-fluid has-text-centered userInterface">
                    <h2 className="title is-3">SimBBA Approve Requests</h2>
                    <div className="availableScrollbar available-ui-height availableTeams">
                        <div className="table-wrapper dTable">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <abbr>Team</abbr>
                                        </th>
                                        <th scope="col">
                                            <abbr>Conference</abbr>
                                        </th>
                                        <th scope="col">
                                            <abbr title="User">User</abbr>
                                        </th>
                                        <th scope="col">
                                            <abbr title="League">League</abbr>
                                        </th>
                                        <th scope="col">
                                            <abbr title="Approve">Approve</abbr>
                                        </th>
                                        <th style={{ width: '50px' }}>
                                            <abbr title="Reject">Reject</abbr>
                                        </th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th scope="col">
                                            <abbr>Team</abbr>
                                        </th>
                                        <th scope="col">
                                            <abbr>Conference</abbr>
                                        </th>
                                        <th scope="col">
                                            <abbr title="User">User</abbr>
                                        </th>
                                        <th scope="col">
                                            <abbr title="League">League</abbr>
                                        </th>
                                        <th scope="col">
                                            <abbr title="Approve">Approve</abbr>
                                        </th>
                                        <th style={{ width: '50px' }}>
                                            <abbr title="Reject">Reject</abbr>
                                        </th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {requests.length > 0
                                        ? requests.map((x, i) => {
                                              return (
                                                  <BBARequestRow
                                                      key={i}
                                                      request={x}
                                                      approve={approveRequest}
                                                      reject={rejectRequest}
                                                  />
                                              );
                                          })
                                        : ''}
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
            <div className="hero-body center">
                <div className="is-fluid has-text-centered">
                    <h2 className="subtitle is-3 availableText">
                        Please return to Landing Page immediately.
                    </h2>
                </div>
            </div>
        );
    };

    // Return
    return currentUser.bba_roleID !== 'Admin' ? <InvalidUser /> : <AdminUI />;
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(BBAApproveRequests);
