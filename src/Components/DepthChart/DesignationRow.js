import React from "react";

const DesignationRow = props => {
  return (
    <tr>
      {props.rank === 0 ? <th scope="row">first string</th> : props.rank === 1 ? <th scope="row">second string</th> : props.rank === 2 ? <th scope="row">bench</th> : <td></td>}
      <td>{props.player.position}</td>
      <td>{props.player.name}</td>
      <td>{props.player.archtype}</td>
      <td>{props.player.overall}</td>
      <td>{props.player.year}</td>
      <td>{props.player.height || "5'10\""}</td>
      <td>{props.player.weight}</td>
      <td>{props.player.potential}</td>
      <td>{props.player.carrying || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.agility || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.catching || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.zone_coverage || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.man_coverage || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.football_iq || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.kick_accuracy || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.kick_power || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.pass_block || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.pass_rush || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.punt_accuracy || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.punt_power || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.route_running || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.run_block || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.run_defense || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.speed || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.strength || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.tackle || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.throw_power || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.throw_accuracy || Math.floor(Math.random() * 5)}</td>
      <td>{props.player.stamina || Math.floor(Math.random() * 5)}</td>
    </tr>
  );
};

export default DesignationRow;
