import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import routes from "./Constants/routes";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import AvailableTeams from "./Components/AvailableTeams/AvailableTeams";
import Profile from "./Components/Profile/Profile";
import Roster from "./Components/Roster/Roster";
import Team from "./Components/Team/Team";
import Login from "./Components/SignUp_Login/SignUpLoginBody";
import "./style.css";
import DepthChart from "./Components/DepthChart/DepthChart";

class App extends Component {
  state = {
    user: {
      username: "",
      team: "",
      teamAbbr: "",
      mascot: "",
      roleID: null
    }
  };
  // Global Variables
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App hero is-fullheight">
          <NavBar user={this.state.user} />
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
            path={routes.AVAILABLE_TEAMS}
            component={AvailableTeams}
          />
          <Route exact path={routes.RECRUITING} component={LandingPage} />
          <Route exact path={routes.LOGIN} component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
