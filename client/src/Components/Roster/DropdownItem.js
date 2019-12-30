import React, { Component } from "react";

const DropdownItem = props => {
  return (
    <a className="dropdown-item">
      <option value={props.value} onClick={props.click}>
        {props.value}
      </option>
    </a>
  );
};

export default DropdownItem;
