import React, { useEffect } from 'react';
import DropdownItem from '../Roster/DropdownItem';

const AddPlayerDropdown = (props) => {
  const [item, setItem] = React.useState('');
  const dropdownAlignment = 'dropdown is-' + props.align;
  const id = '#' + props.id;
  const activeDropdown = (event) => {
    const dropdown = document.querySelector(id);
    dropdown.classList.toggle('is-active');
  };
  const selectItem = (event) => {
    if (props.team) {
      setItem(event.target.value);
    } else if (props.data) {
      setItem(event);
    }
    activeDropdown();
    if (props.call) {
      props.call(event);
    }
  };

  let content;

  return (
    <div className={dropdownAlignment} id={props.id}>
      <div className='dropdown-trigger'>
        <button
          className='button'
          aria-haspopup='true'
          aria-controls='dropdown-menu6'
          onClick={activeDropdown}
        >
          <span>{'Add Player to Depth Chart'}</span>
          <span className='icon is-small'>
            <i className='fas fa-angle-down' aria-hidden='true'></i>
          </span>
        </button>
      </div>
      <div className='dropdown-menu' id='dropdown-menu' role='menu'>
        <div className='dropdown-content'>
          <DropdownItem value='Add Player to Depth Chart' click={selectItem} />
          <hr className='dropdown-divider'></hr>
          {content}
        </div>
      </div>
    </div>
  );
  //
};

export default AddPlayerDropdown;
