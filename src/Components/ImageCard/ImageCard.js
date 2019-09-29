import React from "react";
import { Link } from "react-router-dom";

const ImageCard = props => {
  let lowerCase = props.title.toLowerCase();
  let alt = props.title.slice(0, 1) + lowerCase.slice(1);
  return (
    <Link to={props.route}>
      <div className="card-image image-gap">
        <figure className="image tile-image">
          <img src={props.image} alt={alt} className="profile-image" />
        </figure>
        <div className="is-overlay overlay">
          <h1 className="overlay-text">{props.title}</h1>
        </div>
      </div>
    </Link>
  );
};
// /img/userpage/roster4.jpg
export default ImageCard;
