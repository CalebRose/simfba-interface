import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, useHistory } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './Redux/user/user.actions';

// Firebase
import { auth, createUserProfileDocument } from './Firebase/firebase';

// CSS
import './App.css';
import './style.css';

// Routes and Pages
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

class App extends Component {
  state = {
    user: {
      id: null,
      username: '',
      team: '',
      teamAbbr: '',
      mascot: '',
      roleID: null,
      teamId: '',
    },
  };
  // Global Variables
  unSubscribeFromAuth = null;

  // Components
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth !== null) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
  render() {
    return (
      <div className='App hero is-fullheight'>
        <NavBar />
        <Route exact path={routes.LANDING} component={LandingPage} />
        <Route
          exact
          path={routes.USER}
          render={() => <Profile data={this.state.user} />}
        />
        <Route
          exact
          path={routes.TEAM}
          render={() => <Team data={this.state.user} />}
        />
        <Route
          exact
          path={routes.ROSTER}
          render={() => <Roster data={this.state.user} />}
        />
        <Route
          exact
          path={routes.DEPTHCHART}
          render={() => <DepthChart data={this.state.user} />}
        />
        <Route
          exact
          path={routes.APPROVE}
          render={() => <ApproveRequests data={this.state.user} />}
        />
        <Route
          exact
          path={routes.MANAGE_USERS}
          render={() => <ManageTeams data={this.state.user} />}
        />
        <Route
          exact
          path={routes.MANAGE_SIM}
          render={() => <ManageSim data={this.state.user} />}
        />
        <Route exact path={routes.AVAILABLE_TEAMS} component={AvailableTeams} />
        <Route exact path={routes.RECRUITING} component={LandingPage} />
        <Route exact path={routes.SIGNUP} component={SignUp} />
        <Route exact path={routes.LOGIN} component={Login} />
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => ({ // commenting out, not used
//   setCurrentUser: user.currentUser
// });

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
