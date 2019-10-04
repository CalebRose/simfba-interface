import React from "react";
import PlayerRow from "./PlayerRow";
import SampleContent from "./SampleContent";
import AttributeRow from "./AttributeRow";

const Roster = props => {
  /* 
        API Call to get team data
        Loop through array list to acquire players
    */

  // React Hooks for Modal
  //
  const [modalState, setModal] = React.useState(false);
  const [player, setPlayer] = React.useState(null);
  const [attributes, setAttributes] = React.useState([]);
  let playerAttributes = [];
  let AttributeQueue = [];
  const toggleModal = () => {
    const newState = !modalState;
    return setModal(newState);
  };
  // Call Back Function
  const getPlayerData = data => {
    if (data) {
      playerAttributes = [];
      setPriority(data);
      setPlayer(data);
      setAttributes(playerAttributes);
    }
  };
  // Priority Queue

  const setPriority = data => {
    switch (data.position) {
      case "QB":
        data.attr.football_iq.priority = true;
        data.attr.agility.priority = true;
        data.attr.speed.priority = true;
        data.attr.strength.priority = true;
        data.attr.throw_power.priority = true;
        data.attr.throw_accuracy.priority = true;
        break;
      case "RB":
        data.attr.carrying.priority = true;
        data.attr.agility.priority = true;
        data.attr.speed.priority = true;
        data.attr.catching.priority = true;
        data.attr.football_iq.priority = true;
        data.attr.pass_block.priority = true;
        data.attr.strength.priority = true;
        break;
      case "FB":
        data.attr.carrying.priority = true;
        data.attr.agility.priority = true;
        data.attr.speed.priority = true;
        data.attr.catching.priority = true;
        data.attr.football_iq.priority = true;
        data.attr.pass_block.priority = true;
        data.attr.run_block.priority = true;
        data.attr.strength.priority = true;
        break;
      case "WR":
        data.attr.carrying.priority = true;
        data.attr.agility.priority = true;
        data.attr.speed.priority = true;
        data.attr.catching.priority = true;
        data.attr.football_iq.priority = true;
        data.attr.route_running.priority = true;
        data.attr.strength.priority = true;
        break;
      case "TE":
        data.attr.carrying.priority = true;
        data.attr.agility.priority = true;
        data.attr.speed.priority = true;
        data.attr.catching.priority = true;
        data.attr.football_iq.priority = true;
        data.attr.pass_block.priority = true;
        data.attr.run_block.priority = true;
        data.attr.route_running.priority = true;
        data.attr.strength.priority = true;
        break;
      case "OT":
      case "OG":
      case "C":
        data.attr.agility.priority = true;
        data.attr.football_iq.priority = true;
        data.attr.pass_block.priority = true;
        data.attr.run_block.priority = true;
        data.attr.strength.priority = true;
        break;
      case "DE":
        data.attr.agility.priority = true;
        data.attr.football_iq.priority = true;
        data.attr.pass_rush.priority = true;
        data.attr.run_defense.priority = true;
        data.attr.speed.priority = true;
        data.attr.strength.priority = true;
        data.attr.tackle.priority = true;
        break;
      case "DT":
        data.attr.agility.priority = true;
        data.attr.football_iq.priority = true;
        data.attr.pass_rush.priority = true;
        data.attr.run_defense.priority = true;
        data.attr.strength.priority = true;
        data.attr.tackle.priority = true;
        break;
      case "ILB":
      case "OLB":
        data.attr.agility.priority = true;
        data.attr.man_coverage.priority = true;
        data.attr.zone_coverage.priority = true;
        data.attr.football_iq.priority = true;
        data.attr.pass_rush.priority = true;
        data.attr.run_defense.priority = true;
        data.attr.speed.priority = true;
        data.attr.strength.priority = true;
        data.attr.tackle.priority = true;
        break;
      case "CB":
        data.attr.agility.priority = true;
        data.attr.catching.priority = true;
        data.attr.man_coverage.priority = true;
        data.attr.zone_coverage.priority = true;
        data.attr.football_iq.priority = true;
        data.attr.speed.priority = true;
        data.attr.strength.priority = true;
        data.attr.tackle.priority = true;
        break;
      case "FS":
      case "SS":
        data.attr.agility.priority = true;
        data.attr.catching.priority = true;
        data.attr.man_coverage.priority = true;
        data.attr.zone_coverage.priority = true;
        data.attr.football_iq.priority = true;
        data.attr.run_defense.priority = true;
        data.attr.speed.priority = true;
        data.attr.strength.priority = true;
        data.attr.tackle.priority = true;
        break;
      case "K":
        data.attr.football_iq.priority = true;
        data.attr.kick_accuracy.priority = true;
        data.attr.kick_power.priority = true;
        break;
      case "P":
        data.attr.football_iq.priority = true;
        data.attr.punt_accuracy.priority = true;
        data.attr.punt_power.priority = true;
      default:
        break;
    }
    for (let attribute in data.attr) {
      if (data.attr[attribute].priority) {
        // Algorithm to provide letter value to attribute
        // NOTE: Move this outside of the if statement for implementation to see all attributes
        let attr = data.attr[attribute];
        switch (attr.value) {
          case attr.value < 15:
            attr.letter_val = "F";
            break;
          case attr.value < 25:
            attr.letter_val = "D";
            break;
          case attr.value < 35:
            attr.letter_val = "C";
            break;
          case attr.value < 45:
            attr.letter_val = "B";
            break;
          case attr.value >= 45:
            attr.letter_val = "A";
          default:
            break;
        }
        playerAttributes.push(data.attr[attribute]);
      }
    }
  };
  const AttributeRows = attributes.map(attribute => (
    <AttributeRow key={attribute.name} data={attribute} />
  ));
  const Modal = ({ children, closeModal, modalState, title }) => {
    if (!modalState) return null;

    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{player.name}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="level">
              <div className="level-left">
                <p className="title is-4">
                  {player.year} {player.position}, {player.archtype}
                </p>
              </div>
              <div className="level-right">
                <p className="title is-4">{player.team}</p>
              </div>
            </div>
            <div className="level">
              <div className="level-left">
                <p className="title is-4">
                  {player.height} {player.weight}
                </p>
              </div>
              <div className="level-right">
                <p className="subtitle is-4">Overall: {player.overall}</p>
              </div>
            </div>
            <div className="AttributeTable">{AttributeRows}</div>
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={closeModal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  };

  // Rows
  const PlayerRows = SampleContent.map(player => (
    <PlayerRow
      key={player.id}
      data={player}
      toggle={toggleModal}
      getData={getPlayerData}
    />
  ));
  const playerCount = SampleContent.length;
  return (
    <div className="hero-body center">
      <div className="container is-fluid has-text-centered userInterface">
        <h2 className="title is-3">
          {props.data.team} {props.data.mascot} Roster
        </h2>
        <div className="columns center is-12">
          <div className="column is-3">
            <h2>Coach: {props.data.username}</h2>
          </div>
          <div className="column is-3">
            <h2>Season: 2019</h2>
          </div>
          <div className="column is-3">
            <h2>Players: {playerCount}</h2>
          </div>
          <div className="column is-3">
            <h2>Redshirts: 0</h2>
          </div>
        </div>
        <div className="is-divider" />
        {/* <div className="tile is-ancestor">
          <div className="tile is-parent">
            <h2 className="title roster-title">Roster</h2>
          </div>
        </div> */}
        <div className="scrollbar roster-scrollbar">
          <Modal
            closeModal={toggleModal}
            modalState={modalState}
            title="TEST"
          />
          <div className="table-wrapper">
            <table className="table is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>
                    <abbr>Name</abbr>
                  </th>
                  <th>
                    <abbr title="Position">Pos</abbr>
                  </th>
                  <th>
                    <abbr title="Archtype">Archtype</abbr>
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
                    <abbr>Name</abbr>
                  </th>
                  <th>
                    <abbr title="Position">Pos</abbr>
                  </th>
                  <th>
                    <abbr title="Archtype">Archtype</abbr>
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
                    <abbr title="High School / JUCO">HS/JC</abbr>
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

export default Roster;
