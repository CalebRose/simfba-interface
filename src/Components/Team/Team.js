import React, { Component } from "react";
import logos from "../../Constants/logos";

const Team = props => {
  return (
    <div className="hero-body center">
      <div className="container has-text-centered userInterface">
        <h2 className="title is-3">
          {props.data.team} {props.data.mascot}
        </h2>
        <div className="columns is-12">
          <div className="column is-2">
            <img src={logos.Washington_State} />
          </div>
          <div className="column is-3 text-left">
            <p>
              <strong>Location:</strong> Pullman, Washington
            </p>
            <p>
              <strong>Stadium:</strong> Martin Stadium
            </p>
            <p>
              <strong>Avg Attendance:</strong> 32,952
            </p>
            <p>
              <strong>Conference:</strong> Pac 12 Conference
            </p>
            <p>
              <strong>Division:</strong>North
            </p>
            <p>
              <strong>Rivals:</strong> Washington Huskies, Idaho Vandals
            </p>
            <br></br>
            <p>
              <strong>Coach:</strong> {props.data.username}
            </p>
            <p>
              <strong>Overall:</strong> 30 Wins, 18 Losses
            </p>
            <p>
              <strong>Current Season:</strong> 12 Wins, 0 Losses
            </p>
            <p>
              <strong>Division Titles:</strong> 2018, 2019
            </p>
            <p>
              <strong>Conference Championships:</strong> 1917, 1930, 1997, 2002,
              2019
            </p>
            <p>
              <strong>Bowl Record:</strong> 8 Wins, 7 Losses
            </p>
          </div>
          <div className="column is-7">
            <div className="tile is-parent">
              <div className="card-image image-gap">
                <figure className="image tile-image">
                  <img
                    src="/img/userpage/roster.jpg"
                    alt="Roster"
                    className="profile-image"
                  />
                </figure>
                <div className="is-overlay overlay">
                  <h1 className="overlay-text">ROSTER</h1>
                </div>
              </div>
              <div className="card-image image-gap">
                <figure className="image tile-image">
                  <img
                    src="/img/userpage/depthchart1.jpg"
                    alt="Roster"
                    className="profile-image"
                  />
                </figure>
                <div className="is-overlay overlay">
                  <h1 className="overlay-text">DEPTH CHART</h1>
                </div>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="card-image image-gap">
                <figure className="image tile-image">
                  <img
                    src="/img/userpage/recruits3.png"
                    alt="Roster"
                    className="profile-image"
                  />
                </figure>
                <div className="is-overlay overlay">
                  <h1 className="overlay-text">RECRUITING</h1>
                </div>
              </div>
              <div className="card-image image-gap">
                <figure className="image tile-image">
                  <img
                    src="/img/userpage/schedule.jpg"
                    alt="Roster"
                    className="profile-image"
                  />
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
export default Team;
