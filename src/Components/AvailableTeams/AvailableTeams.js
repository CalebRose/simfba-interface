import React, { Component } from "react";

class AvailableTeams extends Component {
  render() {
    return (
      <div className="hero-body center">
        <div className="container has-text-centered userInterface">
          <h2 className="subtitle">This is the available teams page</h2>
          <div className="tile is-ancestor teams">
            {/* <div className="tile is-3 box is-parent">
              <div className="is-child media-left">
                <figure className="image is-128x128">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Boise_State_Broncos_logo.svg/1200px-Boise_State_Broncos_logo.svg.png" />
                </figure>
              </div>
              <div className="is-child">
                <p className="title">Boise State</p>
                <p className="subtitle">Broncos</p>
                <p>Conference</p>
                <p>
                  <strong>Head Coach:</strong> <i>None</i>
                </p>
                <button className="button is-info">Request</button>
              </div>
            </div> */}
            <div className="tile is-3 is-parent">
              <div className="card team">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-128x128">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Boise_State_Broncos_logo.svg/1200px-Boise_State_Broncos_logo.svg.png" />
                    </figure>
                  </div>
                  <div className="">
                    <p className="title is-4">Boise State</p>
                    <p className="subtitle is-6">Broncos</p>
                    <p>Mountain West Conference</p>
                    <p>
                      <strong>Head Coach:</strong> <i>None</i>
                    </p>
                  </div>
                </div>
                <footer className="card-footer">
                  <a className="card-footer-item">Request</a>
                </footer>
              </div>
            </div>
            <div className="tile is-3 is-parent">
              <div className="card team">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-128x128">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Boise_State_Broncos_logo.svg/1200px-Boise_State_Broncos_logo.svg.png" />
                    </figure>
                  </div>
                  <div className="">
                    <p className="title is-4">LSU</p>
                    <p className="subtitle is-6">Tigers</p>
                    <p>South Eastern Conference</p>
                    <p>
                      <strong>Head Coach:</strong> <i>None</i>
                    </p>
                  </div>
                </div>
                <footer className="card-footer">
                  <a className="card-footer-item">Request</a>
                </footer>
              </div>
            </div>
            <div className="tile is-3 is-parent">
              <div className="card team">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-128x128">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Boise_State_Broncos_logo.svg/1200px-Boise_State_Broncos_logo.svg.png" />
                    </figure>
                  </div>
                  <div className="">
                    <p className="title is-4">Baylor</p>
                    <p className="subtitle is-6">Bears</p>
                    <p>Big 12 Conference</p>
                    <p>
                      <strong>Head Coach:</strong> <i>None</i>
                    </p>
                  </div>
                </div>
                <footer className="card-footer">
                  <a className="card-footer-item">Request</a>
                </footer>
              </div>
            </div>
            <div className="tile is-3 is-parent">
              <div className="card team">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-128x128">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Boise_State_Broncos_logo.svg/1200px-Boise_State_Broncos_logo.svg.png" />
                    </figure>
                  </div>
                  <div className="">
                    <p className="title is-4">Washington</p>
                    <p className="subtitle is-6">Huskies</p>
                    <p>Pac 12 Conference</p>
                    <p>
                      <strong>Head Coach:</strong> <i>None</i>
                    </p>
                  </div>
                </div>
                <footer className="card-footer">
                  <a className="card-footer-item">Request</a>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AvailableTeams;
