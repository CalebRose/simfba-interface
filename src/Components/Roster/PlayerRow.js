import React from 'react';

const PlayerRow = (props) => {
  const [showRow, setShowRow] = React.useState(false);
  const [viewWidth, setViewWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    if (!viewWidth) {
      setViewWidth(window.innerWidth);
    }
  }, [viewWidth]);

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
      <tr
        onTouchEnd={(e) => {
          if (e.cancelable) {
            e.preventDefault();
          }
          setShowRow(!showRow);
        }}
      >
        <th className='clickable' onClick={toggleModal}>
          {props.data.First_Name + ' ' + props.data.Last_Name}
        </th>
        <td label='Archtype'>{props.data.Archetype}</td>
        <td label='Position'>{props.data.Position}</td>
        <td label='Overall'>{props.data.Overall}</td>
        <td label='Year'>{props.data.Year}</td>
        <td label='Height'>{props.data.Height}</td>
        <td label='Weight'>{props.data.Weight}</td>
        <td label='State'>{props.data.State}</td>
        <td label='School'>{props.data.School}</td>
        <td label='Potential'>{props.data.Potential}</td>
        <td label='Number'>{props.data.JerseyNum}</td>
      </tr>
    );
  } else {
    return (
      <tr
        onTouchEnd={(e) => {
          if (e.cancelable) {
            e.preventDefault();
          }
          setShowRow(!showRow);
        }}
      >
        <th className='clickable' onClick={toggleModal}>
          {props.data.name}
        </th>
      </tr>
    );
  }
};

export default PlayerRow;
