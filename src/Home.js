import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import NFLDepthChart from './Components/NFL/DepthChart/NFLDepthChart';
import NFLFreeAgency from './Components/NFL/FreeAgency/NFLFreeAgency';
import NFLTradeBlock from './Components/NFL/TradeBlock/NFLTradeBlock';
import AdminTradePortal from './Components/Admin/AdminTradePortal/AdminTradePortal';
import NBAApproveRequests from './Components/BBA/Admin/ApproveNBARequests/NBAApproveRequests';
import NBARosterPage from './Components/BBA/NBA/Team/NBATeam';
import NBAFreeAgency from './Components/BBA/NBA/Free Agency/NBAFreeAgency';
import NBATradeblock from './Components/BBA/NBA/Trade Block/NBATradeblock';
import NFLSchedulePage from './Components/NFL/Schedule/NFLSchedulePage';
import NBAGameplan from './Components/BBA/NBA/Gameplan/NBAGameplan';
import NBADraftPage from './Components/BBA/NBA/Draft Room/NBADraftPage';
import NBATradePortal from './Components/BBA/Admin/NBATradePortal/NBATradePortal';
import { Toaster } from 'react-hot-toast';
import NFLDraftPage from './Components/NFL/Draft Room/NFLDraftPage';
import TransferPortal from './Components/TransferPortal/TransferPortal';

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
            <Toaster position="top-right" />
            <NavBar />
            <Routes>
                <Route path={routes.LANDING} element={<LandingPage />} />
                <Route
                    path={routes.USER}
                    element={
                        user !== null ? (
                            <Profile />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.TEAM}
                    element={
                        CFBTeam > 0 ? (
                            <Team />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.ROSTER}
                    element={
                        CFBTeam > 0 ? (
                            <Roster />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.CFB_GAMEPLAN}
                    element={
                        CFBTeam > 0 ? (
                            <CFBGameplan />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.DEPTHCHART}
                    element={
                        CFBTeam > 0 ? (
                            <CFBDepthChart />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.CFB_SCHEDULE}
                    element={
                        CFBTeam > 0 ? (
                            <CFBSchedulePage />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.APPROVE}
                    element={
                        roleId === Constants.ADMIN ? (
                            <ApproveRequests />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.APPROVE_NFL}
                    element={
                        roleId === Constants.ADMIN ? (
                            <ApproveNFLRequests />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.NFL_ADMIN_TRADE}
                    element={
                        roleId === Constants.ADMIN ? (
                            <AdminTradePortal />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.MANAGE_USERS}
                    element={
                        roleId === Constants.ADMIN ? (
                            <ManageTeams />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.MANAGE_SIM}
                    element={
                        roleId === Constants.ADMIN ? (
                            <ManageSim />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.AVAILABLE_TEAMS}
                    element={<AvailableTeams />}
                />
                <Route
                    path={routes.CFB_RECRUITING}
                    element={
                        CFBTeam > 0 ? (
                            <CFBRecruitingOverview />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.CFB_TEAM_RECRUITING_BOARD}
                    element={
                        CFBTeam > 0 ? (
                            <CFBTeamRecruitingBoard />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.CFB_TRANSFER}
                    element={
                        CFBTeam > 0 ? (
                            <TransferPortal isCFB={true} />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.CBB_TRANSFER}
                    element={
                        CBBTeam > 0 ? (
                            <TransferPortal />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.CFB_STATS}
                    element={
                        CFBTeam > 0 || NFLTeam > 0 ? (
                            <CFBStatisticsPage />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.NEWS}
                    element={
                        CFBTeam > 0 ? (
                            <NewsPage />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.NFL_ROSTER}
                    element={
                        NFLTeam > 0 ? (
                            <NFLRoster />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.NFL_GAMEPLAN}
                    element={
                        NFLTeam > 0 ? (
                            <CFBGameplan isNFL />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.NFL_DEPTHCHART}
                    element={
                        NFLTeam > 0 ? (
                            <NFLDepthChart />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.NFL_FREE_AGENCY}
                    element={
                        NFLTeam > 0 ? (
                            <NFLFreeAgency />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.NFL_TRADEBLOCK}
                    element={
                        NFLTeam > 0 ? (
                            <NFLTradeBlock />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.NFL_SCHEDULE}
                    element={
                        NFLTeam > 0 ? (
                            <NFLSchedulePage />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.NFL_DRAFT_ROOM}
                    element={
                        NFLTeam > 0 ? (
                            <NFLDraftPage />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route path={routes.SIGNUP} element={<SignUp />} />
                <Route path={routes.LOGIN} element={<Login />} />
                <Route
                    path={routes.BBA_ADMIN}
                    element={
                        bbaRoleId === Constants.ADMIN ? (
                            <BBAManageSim />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.NBA_ADMIN_TRADE}
                    element={
                        bbaRoleId === Constants.ADMIN ? (
                            <NBATradePortal />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.BBA_APPROVE}
                    element={
                        bbaRoleId === Constants.ADMIN ? (
                            <BBAApproveRequests />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.NBA_APPROVE}
                    element={
                        bbaRoleId === Constants.ADMIN ? (
                            <NBAApproveRequests />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.BBA_USERS}
                    element={
                        bbaRoleId === Constants.ADMIN ? (
                            <BBAManageTeams />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.CBB_GAMEPLAN}
                    element={
                        CBBTeam > 0 ? (
                            <CBBGameplan />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.CBB_TEAM}
                    element={
                        CBBTeam > 0 ? (
                            <BBATeam />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.NBA_ROSTER}
                    element={
                        NBATeam > 0 ? (
                            <NBARosterPage />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.NBA_GAMEPLAN}
                    element={
                        NBATeam > 0 ? (
                            <NBAGameplan />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.NBA_FREE_AGENCY}
                    element={
                        NBATeam > 0 ? (
                            <NBAFreeAgency />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.NBA_TRADEBLOCK}
                    element={
                        NBATeam > 0 ? (
                            <NBATradeblock />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.NBA_DRAFT_ROOM}
                    element={
                        NBATeam > 0 ? (
                            <NBADraftPage />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />

                <Route
                    path={routes.CBB_RECRUITING}
                    element={
                        CBBTeam > 0 ? (
                            <CBBRecruitingDashboard />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.CBB_RECRUITING_BOARD}
                    element={
                        CBBTeam > 0 ? (
                            <CBBRecruitingTeamBoard />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.CBB_SCHEDULE}
                    element={
                        CBBTeam > 0 || NBATeam > 0 ? (
                            <CBBSchedule />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route
                    path={routes.CBB_STATS}
                    element={
                        CBBTeam > 0 || NBATeam > 0 ? (
                            <CBBStatistics />
                        ) : (
                            <Navigate to={routes.LANDING} />
                        )
                    }
                />
                <Route path="*" element={<Navigate to={routes.LANDING} />} />
            </Routes>
            <footer
                className={
                    !isMobile
                        ? `footer fixed-bottom mt-auto py-3 ${footerClasses}`
                        : `footer mt-auto py-3 ${footerClasses}`
                }
            >
                <div className="container">
                    <span>SimSN, {new Date().getFullYear()}</span>
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
