import React from "react";

const AttributeRow = props => {
  let attributeImage = "../img/attributes/" + props.data.name + ".png";
  console.log(attributeImage);
  return (
    <div className="tile is-child is-4 attribute">
      <img src={attributeImage} className="attribute-icon" alt="" />
      <p className="title is-6">{props.data.name}</p>
      <p className="subtitle is-6">{props.data.letter}</p>
    </div>
  );
};

export default AttributeRow;
