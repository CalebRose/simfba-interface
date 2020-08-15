import React from 'react';

const DepthChartRow = (props) => {
  /* 
    Name, Position, Archtype, Ovr, Yr, Ht, Wt, St,
    HS/JC, Pot, Num
    
    */
  // let position = props.designation.slice(0, 2);

  let data = props.data;
  const playerAttributes = {};
  for (let attribute in data.attr) {
    // Algorithm to provide letter value to attribute
    // NOTE: Move this outside of the if statement for implementation to see all attributes
    let attr = data.attr[attribute];
    if (attr.value < 15) {
      playerAttributes[attribute] = 'F';
      attr.letter = 'F';
    } else if (attr.value < 25) {
      playerAttributes[attribute] = 'D';
      attr.letter = 'D';
    } else if (attr.value < 35) {
      playerAttributes[attribute] = 'C';
      attr.letter = 'C';
    } else if (attr.value < 45) {
      playerAttributes[attribute] = 'B';
      attr.letter = 'B';
    } else if (attr.value >= 45) {
      playerAttributes[attribute] = 'A';
      attr.letter = 'A';
    }
  }
  // const toggleModal = () => {
  //   props.toggle();
  //   props.getData(data);
  // };
  return (
    <tr>
      <td>{props.data.position}</td>
      <th className='clickable'>{props.data.name}</th>
      <td>{props.data.archtype}</td>
      <td>{props.data.overall}</td>
      <td>{props.data.year}</td>
      <td>{props.data.height}</td>
      <td>{props.data.weight}</td>
      <td>{props.data.potential}</td>
      <td>{playerAttributes.carrying}</td>
      <td>{playerAttributes.agility}</td>
      <td>{playerAttributes.catching}</td>
      <td>{playerAttributes.zone_coverage}</td>
      <td>{playerAttributes.man_coverage}</td>
      <td>{playerAttributes.football_iq}</td>
      <td>{playerAttributes.kick_accuracy}</td>
      <td>{playerAttributes.kick_power}</td>
      <td>{playerAttributes.pass_block}</td>
      <td>{playerAttributes.pass_rush}</td>
      <td>{playerAttributes.punt_accuracy}</td>
      <td>{playerAttributes.punt_power}</td>
      <td>{playerAttributes.route_running}</td>
      <td>{playerAttributes.run_block}</td>
      <td>{playerAttributes.run_defense}</td>
      <td>{playerAttributes.speed}</td>
      <td>{playerAttributes.strength}</td>
      <td>{playerAttributes.tackle}</td>
      <td>{playerAttributes.throw_power}</td>
      <td>{playerAttributes.throw_accuracy}</td>
      <td>{playerAttributes.stamina}</td>
    </tr>
  );
};

export default DepthChartRow;
