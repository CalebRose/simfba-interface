import React from "react";

const AttributeRow = props => {
  console.log(props.data);
  return (
    <div className="tile is-child is-4 attribute">
      <p className="title is-5">{props.data.name}</p>
      <p className="subtitle is-5">{props.data.letter}</p>
    </div>
  );
};

export default AttributeRow;
