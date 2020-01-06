import React, { Component } from "react";
import logos from "../../Constants/logos.js";
import TeamCard from "./TeamCard.js";

class AvailableTeams extends Component {
  render() {
    // Check whether the team is available or not
    // For all teams available, run a loop
    // And render a teamcard for each available team
    // Pass all team info as a prop
    return (
      <div className="hero-body center">
        <div className="container is-fluid has-text-centered userInterface">
          <h2 className="subtitle is-3">Available Teams</h2>
          <div className="scrollbar available-ui-height">
            <div className="tile is-ancestor teams">
              <TeamCard
                team="Baylor"
                mascot="Bears"
                conference="Big 12 Conference"
                logo={logos.Baylor}
              />
              <TeamCard
                team="Boise State"
                mascot="Broncos"
                conference="Mountain West Conference"
                logo={logos.Boise_State}
              />
              <TeamCard
                team="California"
                mascot="Golden Bears"
                conference="Pac 12 Conference"
                logo={logos.California}
              />
              <TeamCard
                team="Eastern Michigan"
                mascot="Eagles"
                conference="Mid-American Conference"
                logo={logos.Eastern_Michigan}
              />
              <TeamCard
                team="Florida"
                mascot="Gators"
                conference="South Eastern Conference"
                logo={logos.Florida}
              />
              <TeamCard
                team="FIU"
                mascot="Panthers"
                conference="Conference-USA"
                logo={logos.FIU}
              />
              <TeamCard
                team="Hawaii"
                mascot="Rainbow Warriors"
                conference="Mountain West Conference"
                logo={logos.Hawaii}
              />
              <TeamCard
                team="Kansas"
                mascot="Jayhawks"
                conference="Big 12 Conference"
                logo={logos.Kansas}
              />
              <TeamCard
                team="Kansas State"
                mascot="Wildcats"
                conference="Big 12 Conference"
                logo={logos.Kansas_State}
              />
              <TeamCard
                team="LSU"
                mascot="Tigers"
                conference="South Eastern Conference"
                logo={logos.LSU}
              />
              <TeamCard
                team="Michigan"
                mascot="Wolverines"
                conference="Big 10 Conference"
                logo={logos.Michigan}
              />
              <TeamCard
                team="Nevada"
                mascot="Wolf Pack"
                conference="Mountain West Conference"
                logo={logos.Nevada}
              />
              <TeamCard
                team="Oregon"
                mascot="Ducks"
                conference="Pac 12 Conference"
                logo={logos.Oregon}
              />
              <TeamCard
                team="West Virginia"
                mascot="Mountaineers"
                conference="Big 12 Conference"
                logo={logos.West_Virginia}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AvailableTeams;
