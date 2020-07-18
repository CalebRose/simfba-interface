import React, { useEffect } from 'react';
import SampleContent from '../Roster/SampleContent';
import { useSelector } from 'react-redux';
// import DropdownItem from '../Roster/DropdownItem';
// import DepthChartRow from './DepthChartRow';
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

  // const selectTeam = (event) => {
  //   setTeam(event.target.value);
  //   activeDropdown();
  // };

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

  // let designations = [
  //   { designation: 'QB1', position: 'QB' },
  //   { designation: 'QB2', position: 'QB' },
  //   { designation: 'RB1', position: 'RB' },
  //   { designation: 'RB2', position: 'RB' },
  //   { designation: 'WR1', position: 'WR' },
  //   { designation: 'WR2', position: 'WR' },
  //   { designation: 'WR3', position: 'WR' },
  //   { designation: 'TE1', position: 'TE' },
  //   { designation: 'TE2', position: 'TE' },
  //   { designation: 'LT1', position: 'LT' },
  //   { designation: 'LT2', position: 'LT' },
  //   { designation: 'LG1', position: 'LG' },
  //   { designation: 'LG2', position: 'LG' },
  //   { designation: 'C1', position: 'C' },
  //   { designation: 'C2', position: 'C' },
  //   { designation: 'RG1', position: 'RG' },
  //   { designation: 'RG2', position: 'RG' },
  //   { designation: 'RT1', position: 'RT' },
  //   { designation: 'RT2', position: 'RT' },
  //   { designation: 'LE1', position: 'LE' },
  //   { designation: 'LE2', position: 'LE' },
  //   { designation: 'DT1', position: 'LT' },
  //   { designation: 'DT2', position: 'DT' },
  //   { designation: 'RE1', position: 'RE' },
  //   { designation: 'RE2', position: 'RE' },
  //   { designation: 'LOLB1', position: 'OLB' },
  //   { designation: 'LOLB2', position: 'OLB' },
  //   { designation: 'ILB1', position: 'ILB' },
  //   { designation: 'ILB2', position: 'ILB' },
  //   { designation: 'ROLB1', position: 'OLB' },
  //   { designation: 'ROLB2', position: 'OLB' },
  //   { designation: 'CB1', position: 'CB' },
  //   { designation: 'CB2', position: 'CB' },
  //   { designation: 'CB3', position: 'CB' },
  //   { designation: 'FS1', position: 'FS' },
  //   { designation: 'FS2', position: 'FS' },
  //   { designation: 'SS1', position: 'SS' },
  //   { designation: 'SS2', position: 'SS' },
  //   { designation: 'P1', position: 'P' },
  //   { designation: 'P2', position: 'P' },
  //   { designation: 'K1', position: 'K' },
  //   { designation: 'K2', position: 'K' },
  // ];

  // let DesignationRows = designations.map((x) => (
  //   <DesignationRow
  //     designation={x.designation}
  //     pos={x.position}
  //     players={roster}
  //     key={x.designation}
  //   />
  // ));

  return (
    <div className='hero-body center'>
      <div className='container is-fluid has-text-centered userInterface'>
        <h2 className='title is-3'>Depth Chart</h2>
        <div className='columns center is-12'></div>
        <div className='columns is-left is-12'>
          <div className='column is-2' style={{ textAlign: "start" }}>
            <div className='column'>
              <label htmlFor="team">Team:&emsp;</label>
              <input value="LSU Tigers" id="team" disabled/>
            </div>
            <div className='column'>
              <label htmlFor="position">Position:&emsp;</label>
              <select defaultValue="Quarterback" id="position">
                <option value="Quarterback">Quarterback</option>
                <option value="Running Back">Running Back</option>
                <option value="Wide Receiver">Wide Receiver</option>
                <option value="Tackle">Tackle</option>
                <option value="Guard">Guard</option>
                <option value="Center">Center</option>
                <option value="Tight End">Tight End</option>
                <option value="End">End</option>
                <option value="Linebacker">Linebacker</option>
                <option value="Cornerback">Cornerback</option>
                <option value="Safety">Safety</option>
              </select>
            </div>
{/*
            <DC_Dropdown
              team={team}
              data={user}
              align='left'
              id='team-dropdown'
            />
            <DC_Dropdown
              position='Position'
              data={user}
              align='right'
              id='position-dropdown'
            />
*/}
          </div>
        </div>
        <div className='is-divider' />
        <div className='scrollbar-dc roster-scrollbar'>
          <div className='table-wrapper table-container'>
            <table className='table is-hoverable'>
              <thead>
                <tr>
                  <td></td>
                  <th>
                    <abbr title='Designation'>Pos</abbr>
                  </th>
                  <th>
                    <abbr>Name</abbr>
                  </th>
                  <th>
                    <abbr title='Archtype'>Archtype</abbr>
                  </th>
                  <th>
                    <abbr title='Overall'>Ovr</abbr>
                  </th>
                  <th>
                    <abbr title='Year'>Yr</abbr>
                  </th>
                  <th>
                    <abbr title='Height'>Ht</abbr>
                  </th>
                  <th>
                    <abbr title='Weight'>Wt</abbr>
                  </th>
                  <th>
                    <abbr title='Potential'>Pot</abbr>
                  </th>
                  <th>
                    <abbr title='Carrying'>Carr</abbr>
                  </th>
                  <th>
                    <abbr title='Agility'>Agi</abbr>
                  </th>
                  <th>
                    <abbr title='Catching'>Ctch</abbr>
                  </th>
                  <th>
                    <abbr title='Zone Coverage'>Z.C.</abbr>
                  </th>
                  <th>
                    <abbr title='Man Coverage'>M.C.</abbr>
                  </th>
                  <th>
                    <abbr title='Football IQ'>IQ</abbr>
                  </th>
                  <th>
                    <abbr title='Kick Accuracy'>K.A.</abbr>
                  </th>
                  <th>
                    <abbr title='Kick Power'>K.P.</abbr>
                  </th>
                  <th>
                    <abbr title='Pass Blocking'>P.B.</abbr>
                  </th>
                  <th>
                    <abbr title='Pass Rush'>P.R.</abbr>
                  </th>
                  <th>
                    <abbr title='Punt Accuracy'>P.A.</abbr>
                  </th>
                  <th>
                    <abbr title='Punt Power'>P.P.</abbr>
                  </th>
                  <th>
                    <abbr title='Route Running'>R.R.</abbr>
                  </th>
                  <th>
                    <abbr title='Run Blocking'>R.B.</abbr>
                  </th>
                  <th>
                    <abbr title='Run Defense'>R.D.</abbr>
                  </th>
                  <th>
                    <abbr title='Speed'>Spd</abbr>
                  </th>
                  <th>
                    <abbr title='Strength'>Str</abbr>
                  </th>
                  <th>
                    <abbr title='Tackle'>Tck</abbr>
                  </th>
                  <th>
                    <abbr title='Throw Power'>T.P.</abbr>
                  </th>
                  <th>
                    <abbr title='Throw Accuracy'>T.A.</abbr>
                  </th>
                  <th>
                    <abbr title='Stamina'>Stm</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot>
              <tr>
                  <td></td>
                  <th>
                    <abbr title='Designation'>Pos</abbr>
                  </th>
                  <th>
                    <abbr>Name</abbr>
                  </th>
                  <th>
                    <abbr title='Archtype'>Archtype</abbr>
                  </th>
                  <th>
                    <abbr title='Overall'>Ovr</abbr>
                  </th>
                  <th>
                    <abbr title='Year'>Yr</abbr>
                  </th>
                  <th>
                    <abbr title='Height'>Ht</abbr>
                  </th>
                  <th>
                    <abbr title='Weight'>Wt</abbr>
                  </th>
                  <th>
                    <abbr title='Potential'>Pot</abbr>
                  </th>
                  <th>
                    <abbr title='Carrying'>Carr</abbr>
                  </th>
                  <th>
                    <abbr title='Agility'>Agi</abbr>
                  </th>
                  <th>
                    <abbr title='Catching'>Ctch</abbr>
                  </th>
                  <th>
                    <abbr title='Zone Coverage'>Z.C.</abbr>
                  </th>
                  <th>
                    <abbr title='Man Coverage'>M.C.</abbr>
                  </th>
                  <th>
                    <abbr title='Football IQ'>IQ</abbr>
                  </th>
                  <th>
                    <abbr title='Kick Accuracy'>K.A.</abbr>
                  </th>
                  <th>
                    <abbr title='Kick Power'>K.P.</abbr>
                  </th>
                  <th>
                    <abbr title='Pass Blocking'>P.B.</abbr>
                  </th>
                  <th>
                    <abbr title='Pass Rush'>P.R.</abbr>
                  </th>
                  <th>
                    <abbr title='Punt Accuracy'>P.A.</abbr>
                  </th>
                  <th>
                    <abbr title='Punt Power'>P.P.</abbr>
                  </th>
                  <th>
                    <abbr title='Route Running'>R.R.</abbr>
                  </th>
                  <th>
                    <abbr title='Run Blocking'>R.B.</abbr>
                  </th>
                  <th>
                    <abbr title='Run Defense'>R.D.</abbr>
                  </th>
                  <th>
                    <abbr title='Speed'>Spd</abbr>
                  </th>
                  <th>
                    <abbr title='Strength'>Str</abbr>
                  </th>
                  <th>
                    <abbr title='Tackle'>Tck</abbr>
                  </th>
                  <th>
                    <abbr title='Throw Power'>T.P.</abbr>
                  </th>
                  <th>
                    <abbr title='Throw Accuracy'>T.A.</abbr>
                  </th>
                  <th>
                    <abbr title='Stamina'>Stm</abbr>
                  </th>
                </tr>
              </tfoot>
              <tbody>
                {
                  roster.map((player, index) => <DesignationRow player={player} designation={player.designation} pos={player.pos} key={index} rank={index} players={roster} />)
                }
              </tbody>

              {/* <tbody>{roster.map(player => <p>{player}</p>)}</tbody> */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepthChart;
