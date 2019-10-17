import React, { Component } from "react";

const DropdownItem = props => {
  return (
    <a className="dropdown-item">
      <option value={props.team} onClick={props.click}>
        {props.team}
      </option>
    </a>
  );
};

export default DropdownItem;
