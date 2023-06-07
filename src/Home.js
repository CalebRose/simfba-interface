import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
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
import CFBDepthChart from './Components/DepthChart/CFBDepthChart';
import ApproveRequests from './Components/Admin/ApproveRequests/ApproveRequests';
import ManageTeams from './Components/Admin/ManageTeams/ManageTeams';
import ManageSim from './Components/Admin/ManageSim/ManageSim';
import Constants from './Constants/acronyms';
import BBAManageSim from './Components/BBA/Admin/ManageSim/BBAManageSim';
import BBAApproveRequests from './Components/BBA/Admin/ApproveRequests/BBAApproveRequests';
import BBAManageTeams from './Components/BBA/Admin/ManageTeams/BBAManageTeams';
import CBBGameplan from './Components/BBA/Gameplan/CBBGameplan';
import BBATeam from './Components/BBA/Team/BBATeam';
import { useMediaQuery } from 'react-responsive';
import CFBGameplan from './Components/Gameplan/CFBGameplan';
import CFBRecruitingOverview from './Components/RecruitingOverview/CFBRecruitingOverview';
import CFBTeamRecruitingBoard from './Components/TeamRecruitingBoard/CFBTeamRecruitingBoard';
import CFBStatisticsPage from './Components/Statistics/CFBStatisticsPage';
import NewsPage from './Components/NewsPage/NewsPage';
import CFBSchedulePage from './Components/Schedule/CFBSchedulePage';
import CBBRecruitingDashboard from './Components/BBA/RecruitingOverview/CBBRecruitingDashboard';
import CBBRecruitingTeamBoard from './Components/BBA/RecruitingBoard/CBBRecruitingTeamBoard';
import CBBSchedule from './Components/BBA/Schedule/CBBSchedule';
import CBBStatistics from './Components/BBA/Statistics/CBBStatistics';
import ApproveNFLRequests from './Components/Admin/ApproveNFLRequests/ApproveNFLRequests';
import NFLRoster from './Components/NFL/Roster/NFLRoster';
import NFLGameplan from './Components/NFL/Gameplan/NFLGameplan';
import NFLDepthChart from './Components/NFL/DepthChart/NFLDepthChart';
import NFLFreeAgency from './Components/NFL/FreeAgency/NFLFreeAgency';
import NFLTradeBlock from './Components/NFL/TradeBlock/NFLTradeBlock';
import AdminTradePortal from './Components/Admin/AdminTradePortal/AdminTradePortal';
import NBAApproveRequests from './Components/BBA/Admin/ApproveNBARequests/NBAApproveRequests';
import NBARosterPage from './Components/BBA/NBA/Team/NBATeam';
import NBAFreeAgency from './Components/BBA/NBA/Free Agency/NBAFreeAgency';
import NBATradeblock from './Components/BBA/NBA/Trade Block/NBATradeblock';
import NFLSchedulePage from './Components/NFL/Schedule/NFLSchedulePage';
import NFLStatisticsPage from './Components/NFL/Statistics/NFLStatisticsPage';
import NBAGameplan from './Components/BBA/NBA/Gameplan/NBAGameplan';
import NBADraftPage from './Components/BBA/NBA/Draft Room/NBADraftPage';

const Home = ({ viewMode }) => {
    const user = useSelector((state) => state.user.currentUser);
    const [roleId, setRole] = React.useState('');
    const [bbaRoleId, setBBARole] = React.useState('');
    const [CFBTeam, setCFBTeam] = React.useState(0);
    const [CBBTeam, setCBBTeam] = React.useState(0);
    const [NBATeam, setNBATeam] = React.useState(0);
    const [NFLTeam, setNFLTeam] = React.useState(0);
    const isMobile = useMediaQuery({ query: `(max-width:760px)` });

    useEffect(() => {
        document.body.className = viewMode;
    }, [viewMode]);

    useEffect(() => {
        if (user) {
            setRole(user.roleID);
            setBBARole(() => user.bba_roleID);
            setCFBTeam(() => user.teamId);
            setCBBTeam(() => user.cbb_id);
            setNBATeam(() => user.NBATeamID);
            setNFLTeam(() => user.NFLTeamID);
        }
    }, [user]);

    const viewingBeta = roleId === Constants.ADMIN || roleId === Constants.BETA;
    const footerClasses = viewMode === 'light' ? 'bg-light' : 'bg-dark';
    return (
        <div className={`App ${viewMode}`}>
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
            <Route
                exact
                path={routes.CFB_SCHEDULE}
                render={() =>
                    CFBTeam > 0 ? (
                        <CFBSchedulePage />
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
            <Route exact path={routes.APPROVE_NFL}>
                {roleId === Constants.ADMIN ? (
                    <ApproveNFLRequests />
                ) : (
                    <Redirect to={routes.LANDING} />
                )}
            </Route>
            <Route exact path={routes.NFL_ADMIN_TRADE}>
                {roleId === Constants.ADMIN ? (
                    <AdminTradePortal />
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
            <Route
                exact
                path={routes.CFB_STATS}
                render={() =>
                    CFBTeam > 0 ? (
                        <CFBStatisticsPage />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.NEWS}
                render={() =>
                    CFBTeam > 0 ? (
                        <NewsPage />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.NFL_ROSTER}
                render={() =>
                    NFLTeam > 0 ? (
                        <NFLRoster />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.NFL_GAMEPLAN}
                render={() =>
                    NFLTeam > 0 ? (
                        <NFLGameplan />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.NFL_DEPTHCHART}
                render={() =>
                    NFLTeam > 0 ? (
                        <NFLDepthChart />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.NFL_FREE_AGENCY}
                render={() =>
                    NFLTeam > 0 ? (
                        <NFLFreeAgency />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.NFL_TRADEBLOCK}
                render={() =>
                    NFLTeam > 0 ? (
                        <NFLTradeBlock />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.NFL_SCHEDULE}
                render={() =>
                    NFLTeam > 0 ? (
                        <NFLSchedulePage />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.NFL_STATS}
                render={() =>
                    NFLTeam > 0 ? (
                        <NFLStatisticsPage />
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
            <Route exact path={routes.NBA_APPROVE}>
                {bbaRoleId === Constants.ADMIN ? (
                    <NBAApproveRequests />
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
            <Route exact path={routes.NBA_ROSTER}>
                {NBATeam > 0 ? (
                    <NBARosterPage />
                ) : (
                    <Redirect to={routes.LANDING} />
                )}
            </Route>
            <Route exact path={routes.NBA_GAMEPLAN}>
                {NBATeam > 0 ? (
                    <NBAGameplan />
                ) : (
                    <Redirect to={routes.LANDING} />
                )}
            </Route>

            <Route exact path={routes.NBA_FREE_AGENCY}>
                {NBATeam > 0 && viewingBeta ? (
                    <NBAFreeAgency />
                ) : (
                    <Redirect to={routes.LANDING} />
                )}
            </Route>

            <Route exact path={routes.NBA_TRADEBLOCK}>
                {NBATeam > 0 && viewingBeta ? (
                    <NBATradeblock />
                ) : (
                    <Redirect to={routes.LANDING} />
                )}
            </Route>

            <Route exact path={routes.NBA_DRAFT_ROOM}>
                {NBATeam > 0 && viewingBeta ? (
                    <NBADraftPage />
                ) : (
                    <Redirect to={routes.LANDING} />
                )}
            </Route>

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
            <Route
                exact
                path={routes.CBB_SCHEDULE}
                render={() =>
                    CBBTeam > 0 ? (
                        <CBBSchedule />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <Route
                exact
                path={routes.CBB_STATS}
                render={() =>
                    CBBTeam > 0 ? (
                        <CBBStatistics />
                    ) : (
                        <Redirect to={routes.LANDING} />
                    )
                }
            />
            <footer
                className={
                    !isMobile
                        ? `footer fixed-bottom mt-auto py-3 ${footerClasses}`
                        : `footer mt-auto py-3 ${footerClasses}`
                }
            >
                <div className="container">
                    <span>Simfba, {new Date().getFullYear()}</span>
                </div>
            </footer>
        </div>
    );
};

const mapStateToProps = ({ viewMode: { viewMode } }) => ({
    // commenting out, not used
    viewMode
});

// export default Home;
export default connect(mapStateToProps)(Home);
