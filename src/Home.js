import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
import CFBDepthChart from './Components/DepthChart/CFBDepthChart';
import ApproveRequests from './Components/Admin/ApproveRequests/ApproveRequests';
import ManageTeams from './Components/Admin/ManageTeams/ManageTeams';
import ManageSim from './Components/Admin/ManageSim/ManageSim';
import Constants from './Constants/acronyms';
import BBAManageSim from './Components/BBA/Admin/ManageSim/BBAManageSim';
import BBAApproveRequests from './Components/BBA/Admin/ApproveRequests/BBAApproveRequests';
import BBAManageTeams from './Components/BBA/Admin/ManageTeams/BBAManageTeams';
import CBBGameplan from './Components/BBA/Gameplan/CBBGameplan';
import CBBRecruitingDashboard from './Components/BBA/RecruitingBoard/CBBRecruitingDashboard';
import CBBRecruitingTeamBoard from './Components/BBA/RecruitingBoard/CBBRecruitingTeamBoard';
import BBATeam from './Components/BBA/Team/BBATeam';
import { useMediaQuery } from 'react-responsive';
import CFBGameplan from './Components/Gameplan/CFBGameplan';
import CFBRecruitingOverview from './Components/RecruitingOverview/CFBRecruitingOverview';
import CFBTeamRecruitingBoard from './Components/TeamRecruitingBoard/CFBTeamRecruitingBoard';

const Home = ({ currentUser }) => {
    const user = useSelector((state) => state.user.currentUser);
    const [roleId, setRole] = React.useState('');
    const [bbaRoleId, setBBARole] = React.useState('');
    const [CFBTeam, setCFBTeam] = React.useState(0);
    const [CBBTeam, setCBBTeam] = React.useState(0);
    const [NBATeam, setNBATeam] = React.useState(0);
    const [NFLTeam, setNFLTeam] = React.useState(0);
    const isMobile = useMediaQuery({ query: `(max-width:760px)` });

    useEffect(() => {
        if (user) {
            setRole(user.roleID);
            setBBARole(user.bba_roleID);
            setCFBTeam(user.teamId);
            setCBBTeam(user.cbb_id);
            setNBATeam(user.nba_id);
            setNFLTeam(user.nfl_id);
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
                path={routes.CFB_GAMEPLAN}
                render={() =>
                    CFBTeam > 0 ? (
                        <CFBGameplan />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.DEPTHCHART}
                render={() =>
                    CFBTeam > 0 ? (
                        <CFBDepthChart />
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
                render={() =>
                    roleId === Constants.ADMIN ? (
                        <ManageSim />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.AVAILABLE_TEAMS}
                component={AvailableTeams}
            />
            <Route
                exact
                path={routes.CFB_RECRUITING}
                render={() =>
                    CFBTeam > 0 ? (
                        <CFBRecruitingOverview />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.CFB_TEAM_RECRUITING_BOARD}
                render={() =>
                    CFBTeam > 0 ? (
                        <CFBTeamRecruitingBoard />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
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
            <Route
                exact
                path={routes.CBB_GAMEPLAN}
                render={() =>
                    CBBTeam > 0 ? (
                        <CBBGameplan />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.CBB_TEAM}
                render={() =>
                    CBBTeam > 0 ? <BBATeam /> : <Redirect to={routes.LANDING} />
                }
            />
            <Route
                exact
                path={routes.CBB_RECRUITING}
                render={() =>
                    CBBTeam > 0 ? (
                        <CBBRecruitingDashboard />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.CBB_RECRUITING_BOARD}
                render={() =>
                    CBBTeam > 0 ? (
                        <CBBRecruitingTeamBoard />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <footer
                className={
                    !isMobile
                        ? 'footer fixed-bottom mt-auto py-3 bg-light'
                        : 'footer mt-auto py-3 bg-light'
                }
            >
                <div className="container">
                    <span className="text-muted">Simfba, 2021</span>
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
