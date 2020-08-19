import React from 'react';

const PlayerRow = (props) => {
  /* 
    Name, Position, Archtype, Ovr, Yr, Ht, Wt, St,
    HS/JC, Pot, Num
    
    */
  // let position = props.designation.slice(0, 2);
  let player = props.player;

  const playerAttributes = {};
  //   let data = props.data;

  for (let attribute in player) {
    // Algorithm to provide letter value to attribute
    // NOTE: Move this outside of the if statement for implementation to see all attributes
    if (!isNaN(player[attribute])) {
      if (player[attribute] < 15) {
        playerAttributes[attribute] = 'F';
      } else if (player[attribute] < 25) {
        playerAttributes[attribute] = 'D';
      } else if (player[attribute] < 35) {
        playerAttributes[attribute] = 'C';
      } else if (player[attribute] < 45) {
        playerAttributes[attribute] = 'B';
      } else if (player[attribute] >= 45) {
        playerAttributes[attribute] = 'A';
      }
    }
  }

  let ternary = '';
  if (player.startingTernary === 0) {
    ternary = 'Starting';
  } else if (player.startingTernary === 1) {
    ternary = '2nd String';
  } else {
    ternary = 'Bench';
  }

  return (
    <tr>
      <td>{player ? ternary : ''}</td>
      {/* <th>{props.designation}</th> */}
      <th>{player ? player.Position : ''}</th>
      <th>{player ? player.First_Name + ' ' + player.Last_Name : ''}</th>
      <td>{player ? player.Archetype : ''}</td>
      <td>{player ? player.Overall : ''}</td>
      <td>{player ? player.Year : ''}</td>
      <td>{player ? player.Height : ''}</td>
      <td>{player ? player.Weight : ''}</td>
      <td>{player ? player.Potential : ''}</td>
      <td>{playerAttributes.Carrying}</td>
      <td>{playerAttributes.Agility}</td>
      <td>{playerAttributes.Catching}</td>
      <td>{playerAttributes.Zone_Coverage}</td>
      <td>{playerAttributes.Man_Coverage}</td>
      <td>{playerAttributes.Football_IQ}</td>
      <td>{playerAttributes.Kick_Accuracy}</td>
      <td>{playerAttributes.Kick_Power}</td>
      <td>{playerAttributes.Pass_Block}</td>
      <td>{playerAttributes.Pass_Rush}</td>
      <td>{playerAttributes.Punt_Accuracy}</td>
      <td>{playerAttributes.Punt_Power}</td>
      <td>{playerAttributes.Route_Running}</td>
      <td>{playerAttributes.Run_Block}</td>
      <td>{playerAttributes.Run_Defense}</td>
      <td>{playerAttributes.Speed}</td>
      <td>{playerAttributes.Strength}</td>
      <td>{playerAttributes.Tackle}</td>
      <td>{playerAttributes.Throw_Power}</td>
      <td>{playerAttributes.Throw_Accuracy}</td>
      <td>{playerAttributes.Stamina}</td>
      <td>
        <button onClick={() => props.moveRow(true)} disabled={props.rank === 0}>
          <span style={{ fontSize: '2rem' }}>&#8593;</span>
        </button>
        <button
          onClick={() => props.moveRow(false)}
          disabled={props.rank === props.arrLength - 1}
        >
          <span style={{ fontSize: '2rem' }}>&#8595;</span>
        </button>
      </td>
    </tr>
  );
};

export default PlayerRow;
