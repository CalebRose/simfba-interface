import React from "react";

const AttributeRow = props => {
  let stringValue = props.data.value.toString();
  return (
    <div className="level">
      <p className="level-left title is-6">{props.data.name}</p>
      <p className="level-right subtitle is-6">{props.data.letter_val}</p>
    </div>
  );
};

export default AttributeRow;
