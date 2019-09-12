import React, { Component } from "react";
import logos from "../../Constants/logos";

const Profile = props => {
  console.log(props);
  return (
    <div className="hero-body center">
      <div className="container has-text-centered userInterface">
        <h2 className="subtitle is-3">{props.data.username}</h2>
        <div className="tile is-ancestor is-vertical">
          <div className="tile is-parent">
            <div className="tile">
              <div className="image">
                <img src={logos.Washington_State} alt="Go Cougs" />
              </div>
            </div>
            <div className="tile is-parent is-vertical is-9">
              <div className="tile is-vertical">
                <div className="tile">
                  <h1>User</h1>
                </div>
                <div className="tile">
                  <h3>Change Password</h3>
                </div>
              </div>
              <div className="tile is-vertical">
                <div className="tile">
                  <h2>Team</h2>
                </div>
                <div className="tile">
                  <h2>Available</h2>
                </div>
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
          </div>

          <div className="tile is-parent is-vertical">
            <div className="tile is-parent">
              <div className="tile card is-4">
                <div className="card-image">
                  <figure className="image">
                    <img src="/img/userpage/roster.jpg" alt="Roster" />
                  </figure>
                  <div className="is-overlay overlay">
                    <h1 className="overlay-text">ROSTER</h1>
                  </div>
                </div>
              </div>
              <div className="tile card is-4">
                <div className="card-image">
                  <figure className="image">
                    <img src="/img/userpage/depthchart1.jpg" alt="Roster" />
                  </figure>
                  <div className="is-overlay overlay">
                    <h1 className="overlay-text">DEPTH CHART</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="card-image">
                <figure className="image">
                  <img src="/img/userpage/recruits3.png" alt="Roster" />
                </figure>
                <div className="is-overlay overlay">
                  <h1 className="overlay-text">RECRUITING</h1>
                </div>
              </div>
              <div className="card-image">
                <figure className="image">
                  <img src="/img/userpage/schedule.jpg" alt="Roster" />
                </figure>
                <div className="is-overlay overlay">
                  <h1 className="overlay-text">SCHEDULING</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
