import React, { useEffect } from "react";
import SampleContent from "../Roster/SampleContent";
import DropdownItem from "../Roster/DropdownItem";
import DepthChartRow from "./DepthChartRow";
import DC_Dropdown from "./DC_DropDown";

const DepthChart = props => {
  const [team, setTeam] = React.useState(
    props.data.team + " " + props.data.mascot
  );
  const [roster, setRoster] = React.useState([]);

  // DropDown
  const activeDropdown = event => {
    const dropdown = document.querySelector(".dropdown");
    dropdown.classList.toggle("is-active");
  };

  const selectTeam = event => {
    setTeam(event.target.value);
    activeDropdown();
  };

  useEffect(() => {
    let playerList = SampleContent.filter(player => player.team === team);
    setRoster(playerList);
  }, [team]);

  // Rows
  const PlayerRows = roster.map(player => (
    <DepthChartRow key={player.id} data={player} />
  ));
  const playerCount = roster.length;
  return (
    <div className="hero-body center">
      <div className="container is-fluid has-text-centered userInterface">
        <h2 className="title is-3">Depth Chart</h2>
        <div className="columns center is-12"></div>
        <div className="columns is-left is-12">
          <div className="column is-2">
            <DC_Dropdown
              team={team}
              data={props.data}
              align="left"
              id="team-dropdown"
            />
          </div>
          <div className="column is-8" />
          <div className="column is-2">
            <DC_Dropdown
              position="Position"
              data={props.data}
              align="right"
              id="position-dropdown"
            />
            {/* <div className="dropdown is-right">
              <div className="dropdown-trigger">
                <button
                  name="position"
                  className="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu6"
                  onClick={activeDropdown}
                >
                  <span>Position</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <DropdownItem
                    team={props.data.team + " " + props.data.mascot}
                    click={selectTeam}
                  />
                  <hr className="dropdown-divider"></hr>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="is-divider" />
        <div className="scrollbar roster-scrollbar">
          <div className="table-wrapper">
            <table className="table is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>
                    <abbr title="Position">Pos</abbr>
                  </th>
                  <th>
                    <abbr title="Archtype">Archtype</abbr>
                  </th>
                  <th>
                    <abbr>Name</abbr>
                  </th>
                  <th>
                    <abbr title="Overall">Ovr</abbr>
                  </th>
                  <th>
                    <abbr title="Year">Yr</abbr>
                  </th>
                  <th>
                    <abbr title="Height">Ht</abbr>
                  </th>
                  <th>
                    <abbr title="Weight">Wt</abbr>
                  </th>
                  <th>
                    <abbr title="State">St</abbr>
                  </th>
                  <th>
                    <abbr title="High School / JUCO">School</abbr>
                  </th>
                  <th>
                    <abbr title="Potential">Pot</abbr>
                  </th>
                  <th>
                    <abbr title="Jersey Number">Num</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>
                    <abbr title="Position">Pos</abbr>
                  </th>
                  <th>
                    <abbr title="Archtype">Archtype</abbr>
                  </th>{" "}
                  <th>
                    <abbr>Name</abbr>
                  </th>
                  <th>
                    <abbr title="Overall">Ovr</abbr>
                  </th>
                  <th>
                    <abbr title="Year">Yr</abbr>
                  </th>
                  <th>
                    <abbr title="Height">Ht</abbr>
                  </th>
                  <th>
                    <abbr title="Weight">Wt</abbr>
                  </th>
                  <th>
                    <abbr title="State">St</abbr>
                  </th>
                  <th>
                    <abbr title="High School / JUCO">School</abbr>
                  </th>
                  <th>
                    <abbr title="Potential">Pot</abbr>
                  </th>
                  <th>
                    <abbr title="Jersey Number">Num</abbr>
                  </th>
                </tr>
              </tfoot>
              <tbody>{PlayerRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepthChart;
