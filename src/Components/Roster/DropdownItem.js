import React from 'react';

const DropdownItem = (props) => {
  const selectItem = () => {
    if (props.positionSwitch) {
      props.click(props.pos);
    }
  };
  return (
    <div className='dropdown-item clickable' style={{ textAlign: 'left' }}>
      <option
        value={props.value}
        onClick={props.positionSwitch ? selectItem : props.click}
        id={props.id}
      >
        {props.value}
      </option>
    </div>
  );
};

export default DropdownItem;
