import React, { useEffect } from 'react';
import SampleContent from '../Roster/SampleContent';
import { useSelector } from 'react-redux';

import DropdownItem from '../Roster/DropdownItem';
import DepthChartRow from './DepthChartRow';
import DC_Dropdown from './DC_DropDown';
import DesignationRow from './DesignationRow';

const DepthChart = ({ currentUser }) => {
  const user = useSelector((state) => state.user.currentUser);
  let initialTeam = user ? user.team + ' ' + user.mascot : null; // Initial value from redux state
  const [team, setTeam] = React.useState(initialTeam);
  const [roster, setRoster] = React.useState([]);

  // DropDown
  const activeDropdown = (event) => {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('is-active');
  };

  const selectTeam = (event) => {
    setTeam(event.target.value);
    activeDropdown();
  };

  useEffect(() => {
    if (user) {
      setTeam(user.team + ' ' + user.mascot);
    }
  }, [user]);

  useEffect(() => {
    let playerList = SampleContent.filter((player) => player.team === team);
    setRoster(playerList);
  }, [team]);

  // Rows
  // const PlayerRows = roster.map(player => (
  //   <DepthChartRow key={player.id} data={player} />
  // ));
  // const playerCount = roster.length;
  // Player Dropdown
  // Set in stone each designation to be a permanent slot
  // Go to the sample content and assign each player a designation
  // If they match the designation, ahve them in the proper dropdown

  let designations = [
    { designation: 'QB1', position: 'QB' },
    { designation: 'QB2', position: 'QB' },
    { designation: 'RB1', position: 'RB' },
    { designation: 'RB2', position: 'RB' },
    { designation: 'WR1', position: 'WR' },
    { designation: 'WR2', position: 'WR' },
    { designation: 'WR3', position: 'WR' },
    { designation: 'TE1', position: 'TE' },
    { designation: 'TE2', position: 'TE' },
    { designation: 'LT1', position: 'LT' },
    { designation: 'LT2', position: 'LT' },
    { designation: 'LG1', position: 'LG' },
    { designation: 'LG2', position: 'LG' },
    { designation: 'C1', position: 'C' },
    { designation: 'C2', position: 'C' },
    { designation: 'RG1', position: 'RG' },
    { designation: 'RG2', position: 'RG' },
    { designation: 'RT1', position: 'RT' },
    { designation: 'RT2', position: 'RT' },
    { designation: 'LE1', position: 'LE' },
    { designation: 'LE2', position: 'LE' },
    { designation: 'DT1', position: 'DT' },
    { designation: 'DT2', position: 'DT' },
    { designation: 'RE1', position: 'RE' },
    { designation: 'RE2', position: 'RE' },
    { designation: 'LOLB1', position: 'OLB' },
    { designation: 'LOLB2', position: 'OLB' },
    { designation: 'ILB1', position: 'ILB' },
    { designation: 'ILB2', position: 'ILB' },
    { designation: 'ROLB1', position: 'OLB' },
    { designation: 'ROLB2', position: 'OLB' },
    { designation: 'CB1', position: 'CB' },
    { designation: 'CB2', position: 'CB' },
    { designation: 'CB3', position: 'CB' },
    { designation: 'FS1', position: 'FS' },
    { designation: 'FS2', position: 'FS' },
    { designation: 'SS1', position: 'SS' },
    { designation: 'SS2', position: 'SS' },
    { designation: 'P1', position: 'P' },
    { designation: 'P2', position: 'P' },
    { designation: 'K1', position: 'K' },
    { designation: 'K2', position: 'K' },
  ];

  let positions = [
    { position: 'QB' },
    { position: 'RB' },
    { position: 'WR' },
    { position: 'TE' },
    { position: 'LT' },
    { position: 'LG' },
    { position: 'C' },
    { position: 'RG' },
    { position: 'RT' },
    { position: 'LE' },
    { position: 'DT' },
    { position: 'RE' },
    { position: 'LOLB' },
    { position: 'ILB' },
    { position: 'ROLB' },
    { position: 'CB' },
    { position: 'FS' },
    { position: 'SS' },
  ];

  let headers = [
    { title: 'Designation', Label: 'Pos' },
    { title: 'Name', Label: 'Name' },
    { title: 'Archetype', Label: 'Archetype' },
    { title: 'Overall', Label: 'Ovr' },
    { title: 'Year', Label: 'Yr' },
    { title: 'Height', Label: 'Ht' },
    { title: 'Weight', Label: 'Wt' },
    { title: 'Potential', Label: 'Pot' },
    { title: 'Carrying', Label: 'Carr' },
    { title: 'Agility', Label: 'Agi' },
    { title: 'Catching', Label: 'Ctch' },
    { title: 'Zone Coverage', Label: 'Z.C.' },
    { title: 'Man Coverage', Label: 'M.C.' },
    { title: 'Football IQ', Label: 'IQ' },
    { title: 'Kick Accuracy', Label: 'K.A.' },
    { title: 'Kick Power', Label: 'K.P.' },
    { title: 'Pass Blocking', Label: 'P.B.' },
    { title: 'Pass Rush', Label: 'P.R.' },
    { title: 'Punt Accuracy', Label: 'P.A.' },
    { title: 'Punt Power', Label: 'P.P.' },
    { title: 'Route Running', Label: 'R.R.' },
    { title: 'Run Blocking', Label: 'R.B.' },
    { title: 'Run Defense', Label: 'R.D.' },
    { title: 'Speed', Label: 'Spd' },
    { title: 'Strength', Label: 'Str' },
    { title: 'Tackle', Label: 'Tck' },
    { title: 'Throw Power', Label: 'T.P.' },
    { title: 'Throw Accuracy', Label: 'T.A.' },
    { title: 'Stamina', Label: 'Stm' },
  ];

  let headerRows = headers.map((x) => (
    <th>
      <abbr key={x.title} title={x.title}>
        {x.Label}
      </abbr>
    </th>
  ));

  let DesignationRows = designations.map((x) => (
    <DesignationRow
      designation={x.designation}
      pos={x.position}
      players={roster}
      key={x.designation}
    />
  ));

  return (
    <div className='hero-body center'>
      <div className='container is-fluid has-text-centered userInterface'>
        <h2 className='title is-3'>Depth Chart</h2>
        <div className='columns center is-12'></div>
        <div className='columns is-left is-12'>
          <div className='column is-2'>
            <DC_Dropdown
              team={team}
              info={user}
              align='left'
              id='team-dropdown'
            />
            <DC_Dropdown
              info={user}
              data={positions}
              align='right'
              id='position-dropdown'
            />
          </div>
          <div className='column is-8' />
          <div className='column is-2'>
            {/* <div className="dropdown is-right">
              <div className="dropdown-trigger">
                <button
                  name="position"
                  className="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu6"
                  onClick={activeDropdown}
                >
                  <span>Position</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <DropdownItem
                    team={props.data.team + " " + props.data.mascot}
                    click={selectTeam}
                  />
                  <hr className="dropdown-divider"></hr>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className='is-divider' />
        <div className='scrollbar-dc roster-scrollbar'>
          <div className='table-wrapper table-container'>
            <table className='table is-hoverable'>
              <thead>
                <tr>{headerRows}</tr>
              </thead>
              <tfoot>
                <tr>{headerRows}</tr>
              </tfoot>
              {/* <tbody>{DesignationRows}</tbody> */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepthChart;
