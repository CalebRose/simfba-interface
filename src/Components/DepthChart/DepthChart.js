import React, { useEffect } from 'react';
import SampleContent from '../Roster/SampleContent';
import { useSelector } from 'react-redux';
import PlayerRow from './DepthChartRow';

const DepthChart = ({ currentUser }) => {
  const user = useSelector((state) => state.user.currentUser);
  let initialTeam = user ? user.team + ' ' + user.mascot : null; // Initial value from redux state
  const [team, setTeam] = React.useState(initialTeam);
  const [roster, setRoster] = React.useState([]);

  useEffect(() => {
    if (user) {
      setTeam(user.team + ' ' + user.mascot);
    }
  }, [user]);

  useEffect(() => {
    let playerList = SampleContent.filter((player) => player.team === team);
    setRoster(playerList);
  }, [team]);

  useEffect(() => {
    if (roster.length) {
      console.log(roster);
    }
  }, [roster]);

  const moveRow = (up, ind) => {
    console.log("move row " + ind + (up ? " up" : " down" ));
    const arr = roster;
    if (up) {
      if (ind > 0) {
        const temp = arr[ind - 1];
        arr[ind - 1] = arr[ind];
        arr[ind] = temp;
        console.log("calling set roster");
        setRoster(arr);
      }
    } else {
      if (ind < arr.length - 2) {
        const temp = arr[ind + 1];
        arr[ind + 1] = arr[ind];
        arr[ind] = temp;
        console.log("calling set roster");
        setRoster(arr);
      }
    }
  }

 
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
                  <th>
                    <abbr title='Promote'>Promote</abbr>
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
                  <th>
                    <abbr title='Promote'>Promote</abbr>
                  </th>
                </tr>
              </tfoot>
              <tbody>{roster.map((player, index, arr) => <PlayerRow player={player} key={index} rank={index} moveRow={(up) => moveRow(up, index)} arrLength={arr.length} />)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepthChart;
