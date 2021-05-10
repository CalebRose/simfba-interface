import React, { useEffect } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

// Routes & Components
import routes from './Constants/routes';
import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Components/LandingPage/LandingPage';
import AvailableTeams from './Components/AvailableTeams/AvailableTeams';
import Profile from './Components/Profile/Profile';
import Roster from './Components/Roster/Roster';
import Team from './Components/Team/Team';
import Login from './Components/SignUp_Login/LoginBody';
import SignUp from './Components/SignUp_Login/SignUpBody';
import DepthChart from './Components/DepthChart/DepthChart';
import ApproveRequests from './Components/Admin/ApproveRequests/ApproveRequests';
import ManageTeams from './Components/Admin/ManageTeams/ManageTeams';
import ManageSim from './Components/Admin/ManageSim/ManageSim';
import Constants from './Constants/Constants';
import BBAManageSim from './Components/BBA/Admin/ManageSim/BBAManageSim';
import BBAApproveRequests from './Components/BBA/Admin/ApproveRequests/BBAApproveRequests';
import BBAManageTeams from './Components/BBA/Admin/ManageTeams/BBAManageTeams';

const Home = ({ currentUser }) => {
    const user = useSelector((state) => state.user.currentUser);
    const [roleId, setRole] = React.useState('');
    const [bbaRoleId, setBBARole] = React.useState('');
    const [CFBTeam, setCFBTeam] = React.useState(0);

    useEffect(() => {
        if (user) {
            setRole(user.roleID);
            setBBARole(user.bba_roleID);
            setCFBTeam(user.teamId);
        }
    }, [user]);
    return (
        <div className="App is-fullheight">
            <NavBar />
            <Route exact path={routes.LANDING} component={LandingPage} />
            <Route
                exact
                path={routes.USER}
                render={() =>
                    user !== null ? (
                        <Profile />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.TEAM}
                render={() =>
                    CFBTeam > 0 ? <Team /> : <Redirect to={routes.LANDING} />
                }
            />
            <Route
                exact
                path={routes.ROSTER}
                render={() =>
                    CFBTeam > 0 ? <Roster /> : <Redirect to={routes.LANDING} />
                }
            />
            <Route
                exact
                path={routes.DEPTHCHART}
                render={() =>
                    CFBTeam > 0 ? (
                        <DepthChart />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route exact path={routes.APPROVE}>
                {roleId === Constants.ADMIN ? (
                    <ApproveRequests />
                ) : (
                    <Redirect to={routes.LANDING} />
                )}
            </Route>
            <Route
                exact
                path={routes.MANAGE_USERS}
                render={() =>
                    roleId === Constants.ADMIN ? (
                        <ManageTeams />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.MANAGE_SIM}
                render={() => () =>
                    roleId === Constants.ADMIN ? (
                        <ManageSim />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )}
            />
            <Route
                exact
                path={routes.AVAILABLE_TEAMS}
                component={AvailableTeams}
            />
            <Route exact path={routes.RECRUITING} component={LandingPage} />
            <Route exact path={routes.SIGNUP} component={SignUp} />
            <Route exact path={routes.LOGIN} component={Login} />
            <Route
                exact
                path={routes.BBA_ADMIN}
                render={() =>
                    bbaRoleId === Constants.ADMIN ? (
                        <BBAManageSim />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route exact path={routes.BBA_APPROVE}>
                {bbaRoleId === Constants.ADMIN ? (
                    <BBAApproveRequests />
                ) : (
                    <Redirect to={routes.LANDING} />
                )}
            </Route>
            <Route exact path={routes.BBA_USERS}>
                {bbaRoleId === Constants.ADMIN ? (
                    <BBAManageTeams />
                ) : (
                    <Redirect to={routes.LANDING} />
                )}
            </Route>
            <footer class="footer fixed-bottom mt-auto py-3 bg-light">
                <div class="container">
                    <span class="text-muted">Simfba, 2021</span>
                </div>
            </footer>
        </div>
    );
};

// const mapStateToProps = ({ user }) => ({ // commenting out, not used
//   setCurrentUser: user.currentUser
// });

export default Home;
// export default connect(mapStateToProps)(Home);
