import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import BBATeamService from '../../../../_Services/simNBA/BBATeamService';
import BBARequestService from '../../../../_Services/simNBA/BBARequestService';
import TeamRow from '../../../Admin/ManageTeams/TeamRow';
import BBAManageTeamRow from './BBAManageTeamRow';

const BBAManageTeams = ({ currentUser }) => {
    // State
    const [teams, setTeams] = React.useState([]);
    let teamService = new BBATeamService();
    let requestService = new BBARequestService();

    // Use Effects Begin
    useEffect(() => {
        getCoachedTeams();
    }, []);

    // Use Effects End
    const getCoachedTeams = async () => {
        let coachedTeams = await teamService.GetCoachedTeams();
        setTeams(coachedTeams);
    };

    // Click Functions
    const revokeRequest = async (payload) => {
        // DB Request
        let res = await requestService.RevokeUserFromTeamRequest(payload.reqId);

        let firebasePayload = {};
        if (payload.IsNBA) {
            firebasePayload = {
                username: payload.username,
                nba_team: '',
                nba_abbr: '',
                nba_id: null
            };
        } else {
            firebasePayload = {
                username: payload.username,
                cbb_team: '',
                cbb_abbr: '',
                cbb_id: null
            };
        }

        if (res.ok) {
            console.log('Revoke Request:', payload.reqId);
        } else {
            throw ('HTTP-Error: Revoke incomplete', res.status);
        }
        // Firebase Call
        const firestore = firebase.firestore();

        let userRef = await firestore
            .collection('users')
            .where('username', '==', payload.username)
            .get();

        userRef.forEach(async (doc) => {
            await doc.ref.update(firebasePayload);
        });
        console.log('Firebase Updated');

        // Filter Requests
        const filterTeams = teams.filter((x) => x.ID !== payload.reqId);
        setTeams(filterTeams);
    };

    // Admin UI
    const AdminUI = () => {
        return (
            <div className="hero-body center">
                <div className="container is-fluid has-text-centered userInterface">
                    <h2 className="title is-3">Manage Users and Teams</h2>
                    <div className="availableScrollbar available-ui-height availableTeams">
                        <div className="table-wrapper dTable">
                            <table className="table is-fullwidth is-hoverable is-truncated">
                                <thead>
                                    <tr>
                                        <th style={{ width: '120px' }}>
                                            <abbr>Team</abbr>
                                        </th>
                                        <th style={{ width: '80px' }}>
                                            <abbr title="User">User</abbr>
                                        </th>
                                        <th style={{ width: '50px' }}>
                                            <abbr title="Conference">
                                                Conf.
                                            </abbr>
                                        </th>
                                        <th style={{ width: '50px' }}>
                                            <abbr title="League">League</abbr>
                                        </th>
                                        <th style={{ width: '50px' }}>
                                            <abbr title="Revoke Team">
                                                Revoke
                                            </abbr>
                                        </th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th style={{ width: '120px' }}>
                                            <abbr>Team</abbr>
                                        </th>
                                        <th style={{ width: '80px' }}>
                                            <abbr title="User">User</abbr>
                                        </th>
                                        <th style={{ width: '50px' }}>
                                            <abbr title="Conference">
                                                Conf.
                                            </abbr>
                                        </th>
                                        <th style={{ width: '50px' }}>
                                            <abbr title="League">League</abbr>
                                        </th>
                                        <th style={{ width: '50px' }}>
                                            <abbr title="Revoke Team">
                                                Revoke
                                            </abbr>
                                        </th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {teams.length > 0
                                        ? teams.map((x, i) => {
                                              return (
                                                  <BBAManageTeamRow
                                                      key={i}
                                                      team={x}
                                                      revoke={revokeRequest}
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
    return currentUser.roleID !== 'Admin' ? <InvalidUser /> : <AdminUI />;
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(BBAManageTeams);
