import React from 'react';

const DropdownItem = (props) => {
  return (
    <div className='dropdown-item clickable' style={{ textAlign: 'left' }}>
      <option value={props.value} onClick={props.click} id={props.id}>
        {props.value}
      </option>
    </div>
  );
};

export default DropdownItem;
