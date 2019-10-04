import React from "react";
import logos from "../../Constants/logos";
import routes from "../../Constants/routes";
import ImageCard from "../ImageCard/ImageCard";
import { Link } from "react-router-dom";

var TeamTab = props => {
  return (
    <Link to={routes.TEAM} className="tile">
      <h2>{props.data.team}</h2>
    </Link>
  );
};
var AvailableTab = () => {
  return (
    <Link to={routes.AVAILABLE_TEAMS} className="tile">
      <h2>Available Teams</h2>
    </Link>
  );
};
const Profile = props => {
  console.log(props);

  return (
    <div className="hero-body center">
      <div className="container has-text-centered userInterface">
        <h2 className="subtitle is-3">{props.data.username}</h2>
        <div className="tile is-ancestor is-vertical">
          <div className="tile is-parent">
            <div className="tile is-2">
              <div className="image">
                <img src={logos.Washington_State} alt="Go Cougs" />
              </div>
            </div>
            <div className="tile is-parent is-vertical is-3">
              <div className="tile is-vertical">
                <div className="tile">
                  <h1>User</h1>
                </div>
                <div className="tile">
                  <h3>Change Password</h3>
                </div>
              </div>
              <div className="tile is-vertical">
                {props.data.teamAbbr !== "" ? (
                  <TeamTab data={props.data} />
                ) : (
                  <AvailableTab />
                )}
              </div>
              <div className="tile is-vertical">
                <div className="tile">
                  <h1>Overall W/L </h1>
                </div>

                <div className="tile">
                  <h3>Current W/L</h3>
                </div>
              </div>
            </div>

            <div className="tile is-parent is-vertical">
              <div className="tile is-parent">
                <ImageCard
                  image="./img/userpage/roster4.jpg"
                  title="ROSTER"
                  route={routes.ROSTER}
                />
                <ImageCard
                  image="./img/userpage/depthchart2.jpg"
                  title="DEPTH CHART"
                  route={routes.DEPTHCHART}
                />
              </div>
              <div className="tile is-parent">
                <ImageCard
                  image="./img/userpage/roster5.jpg"
                  title="RECRUITING"
                  route={routes.RECRUITING}
                />
                <ImageCard
                  image="./img/userpage/schedule2.jpg"
                  title="SCHEDULING"
                  route={routes.SCHEDULING}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
