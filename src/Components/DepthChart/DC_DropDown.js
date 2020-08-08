import React, { useEffect } from 'react';
import DropdownItem from '../Roster/DropdownItem';

const DC_Dropdown = (props) => {
  const [item, setItem] = React.useState('');
  const dropdownAlignment = 'dropdown is-' + props.align;
  const id = '#' + props.id;
  const activeDropdown = (event) => {
    const dropdown = document.querySelector(id);
    dropdown.classList.toggle('is-active');
  };
  const selectItem = (event) => {
    setItem(event.target.value);
    activeDropdown();
  };

  let type, mainLabel;
  // If Dropdown is for teams

  useEffect(() => {
    if (props.team) {
      setItem(props.team);
    } else {
      setItem(props.data[0].position);
    }
  }, [props]);

  let content;
  if (props.data) {
    mainLabel = props.data[0].position;
    content = props.data.map((x) => (
      <DropdownItem key={x.position} value={x.position} click={selectItem} />
    ));
  }

  return (
    <div className={dropdownAlignment} id={props.id}>
      <div className='dropdown-trigger'>
        <button
          className='button'
          aria-haspopup='true'
          aria-controls='dropdown-menu6'
          onClick={activeDropdown}
        >
          <span>{item}</span>
          <span className='icon is-small'>
            <i className='fas fa-angle-down' aria-hidden='true'></i>
          </span>
        </button>
      </div>
      <div className='dropdown-menu' id='dropdown-menu' role='menu'>
        <div className='dropdown-content'>
          <DropdownItem value={mainLabel} click={selectItem} />
          <hr className='dropdown-divider'></hr>
          {content}
        </div>
      </div>
    </div>
  );
};

export default DC_Dropdown;
