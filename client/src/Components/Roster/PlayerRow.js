import React from "react";

const PlayerRow = props => {
  /* 
    Name, Position, Archtype, Ovr, Yr, Ht, Wt, St,
    HS/JC, Pot, Num
    
    */
  let data = props.data;
  const toggleModal = () => {
    props.toggle();
    props.getData(data);
  };
  return (
    <tr>
      <th className="clickable" onClick={toggleModal}>
        {props.data.name}
      </th>
      <td label="Position">{props.data.position}</td>
      <td label="Type">{props.data.archtype}</td>
      <td label="Overall">{props.data.overall}</td>
      <td label="Year">{props.data.year}</td>
      <td label="Height">{props.data.height}</td>
      <td label="Weight">{props.data.weight}</td>
      <td label="State">{props.data.state}</td>
      <td label="School">{props.data.school}</td>
      <td label="Potential">{props.data.potential}</td>
      <td label="Number">{props.data.jersey}</td>
    </tr>
  );
};

export default PlayerRow;
