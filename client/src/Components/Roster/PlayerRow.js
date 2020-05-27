import React from "react";

const PlayerRow = props => {
  const [ showRow, setShowRow ] = React.useState(false);
  const [ viewWidth, setViewWidth ] = React.useState(window.innerWidth);

  React.useEffect(() => { if (!viewWidth) { setViewWidth(window.innerWidth); }}, [viewWidth]);

  const handleResize = () => {
    setViewWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  /* 
    Name, Position, Archtype, Ovr, Yr, Ht, Wt, St,
    HS/JC, Pot, Num
    
    */
  let data = props.data;
  const toggleModal = () => {
    props.toggle();
    props.getData(data);
  };
  if (showRow || viewWidth >= 901) {
    return (
          <tr onTouchEnd={(e) => {
              if (e.cancelable) { e.preventDefault(); }
              setShowRow(!showRow);
            }} >
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
  } else {
    return (
      <tr onTouchEnd={(e) => {
        if (e.cancelable) { e.preventDefault(); }
        setShowRow(!showRow);
      }} >
        <th className="clickable" onClick={toggleModal}>
          {props.data.name}
        </th>
      </tr>
    );
  };

}

export default PlayerRow;
