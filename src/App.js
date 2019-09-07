import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import routes from "./Constants/routes";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";

class App extends Component {
  state = {
    user: {
      username: "TuscanSota",
      team: "Washington State",
      teamAbbr: "WAST",
      roleID: 0
    }
  };
  // Global Variables
  render() {
    return (
      <Router>
        <div className="App hero is-fullheight">
          <NavBar user={this.state.user} />
          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route exact path={routes.USER} component={LandingPage} />
          <Route exact path={routes.TEAM} component={LandingPage} />
          <Route exact path={routes.AVAILABLE_TEAMS} component={LandingPage} />
          <Route exact path={routes.RECRUITING} component={LandingPage} />
        </div>
      </Router>
    );
  }
}

export default App;
