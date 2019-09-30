import React from "react";

const TeamCard = props => {
  return (
    <div className="tile is-parent">
      <div className="card team">
        <div className="media">
          <div className="media-left">
            <figure className="image is-128x128">
              <img src={props.logo} />
            </figure>
          </div>
          <div className="">
            <p className="title is-4">{props.team}</p>
            <p className="subtitle is-6">{props.mascot}</p>
            <p className="Conference">{props.conference}</p>
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
  );
};

export default TeamCard;
