import React from "react";

const DepthChartRow = props => {
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
      <td>{props.data.position}</td>
      <td>{props.data.archtype}</td>{" "}
      <th className="clickable" onClick={toggleModal}>
        {props.data.name}
      </th>
      <td>{props.data.overall}</td>
      <td>{props.data.year}</td>
      <td>{props.data.height}</td>
      <td>{props.data.weight}</td>
      <td>{props.data.state}</td>
      <td>{props.data.school}</td>
      <td>{props.data.potential}</td>
      <td>{props.data.jersey}</td>
    </tr>
  );
};

export default DepthChartRow;
