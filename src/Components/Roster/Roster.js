import React, { Component } from "react";
import PlayerRow from "./PlayerRow";
import SampleContent from "./SampleContent";

const Roster = props => {
  /* 
        API Call to get team data
        Loop through array list to acquire players
    */

  const Modal = () => {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body"></section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    );
  };
  // React Hooks for Modal
  //
  //
  const Rows = SampleContent.map(player => <PlayerRow data={player} />);
  const playerCount = SampleContent.length;
  return (
    <div className="hero-body center">
      <div className="container has-text-centered userInterface">
        <h2 className="title is-3">
          {props.data.team} {props.data.mascot}
        </h2>
        <div className="columns is-12">
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
        <div class="is-divider" />
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <h2 className="title roster-title">Roster</h2>
          </div>
        </div>
        <div className="scrollbar">
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
              <tbody>{Rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roster;
