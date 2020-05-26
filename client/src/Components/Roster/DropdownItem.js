import React from "react";

const DropdownItem = props => {
  return (
    <div className="dropdown-item" style={{ textAlign: "left" }} >
      <option value={props.value} onClick={props.click}>
        {props.value}
      </option>
    </div>
  );
};

export default DropdownItem;
