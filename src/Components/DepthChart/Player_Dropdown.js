import React from "react";
import DropdownItem from "../Roster/DropdownItem";

const Player_Dropdown = props => {
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
  const benchPlayers = props.bench.map(player => (
    <DropdownItem value={player.name} click={selectItem} />
  ));
  return (
    <div className="dropdown" id={props.id}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu6"
          onClick={activeDropdown}
        >
          <span>{!props.starter ? "None" : props.starter.name}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <DropdownItem
            value={!props.starter ? "None" : props.starter.name}
            click={selectItem}
          />
          <hr className="dropdown-divider"></hr>
          {benchPlayers}
        </div>
      </div>
    </div>
  );
};

export default Player_Dropdown;
