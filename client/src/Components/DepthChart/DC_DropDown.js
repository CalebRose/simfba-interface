import React, { Component } from "react";
import DropdownItem from "../Roster/DropdownItem";

const DC_Dropdown = props => {
  const [item, setItem] = React.useState("");
  const dropdownAlignment = "dropdown is-" + props.align;
  const id = "#" + props.id;
  const activeDropdown = event => {
    const dropdown = document.querySelector(id);
    dropdown.classList.toggle("is-active");
  };
  const selectItem = event => {
    setItem(event.target.value);
    activeDropdown();
  };

  let type, mainLabel;
  // If Dropdown is for teams
  if (props.team) {
    type = props.team;
    mainLabel = props.data.team + " " + props.data.mascot;
  } else {
    // Dropdown is for position
    type = props.position;
    mainLabel = "Quarterback";
  }

  return (
    <div className={dropdownAlignment} id={props.id}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu6"
          onClick={activeDropdown}
        >
          <span>{type}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <DropdownItem team={mainLabel} click={selectItem} />
          <hr className="dropdown-divider"></hr>
        </div>
      </div>
    </div>
  );
};

export default DC_Dropdown;
