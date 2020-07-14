import React, { useEffect } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import PlayerRow from './PlayerRow';
import SampleContent from './SampleContent';
import AttributeRow from './AttributeRow';
import DropdownItem from './DropdownItem';
// import DepthChartRow from "../DepthChart/DepthChartRow";

const Roster = ({ currentUser }) => {
  /* 
        API Call to get team data
        Loop through array list to acquire players
    */

  // React Hooks for Modal
  //
  const user = useSelector((state) => state.user.currentUser); // Selecting redux state
  console.log(user);
  const [modalState, setModal] = React.useState(false);
  const [player, setPlayer] = React.useState(null);
  const [attributes, setAttributes] = React.useState([]);
  let initialTeam = user ? user.team : null; // Initial value from redux state
  const [team, setTeam] = React.useState(initialTeam); // Redux value as initial value for react hook
  const [roster, setRoster] = React.useState([]);
  let playerAttributes = [];
  const toggleModal = () => {
    const newState = !modalState;
    return setModal(newState);
  };

  // Dropdown Toggle
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
      setTeam(user.team);
    }
  }, [user]);

  useEffect(() => {
    const getRoster = async () => {
      let response = await fetch('http://localhost:3001/api/rosters');
      /* {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      } */
      let json;
      if (response.ok) {
        json = await response.json();
      } else {
        alert('HTTP-Error:', response.status);
      }
      let playerList = json
        ? json.filter((player) => player.Team === team)
        : null;
      console.log(playerList);
      setRoster(playerList);
    };
    getRoster();
    // let playerList = SampleContent.filter((player) => player.team === team);
  }, [team]);

  // Call Back Function
  const getPlayerData = (data) => {
    if (data) {
      playerAttributes = [];
      setPriority(data);
      setPlayer(data);
      setAttributes(playerAttributes);
    }
  };
  // Priority Queue

  const setPriority = (data) => {
    switch (data.Position) {
      case 'QB':
        data.Agility.priority = true;
        data.Speed.priority = true;
        data.Strength.priority = true;
        data.Throw_Power.priority = true;
        data.Throw_Accuracy.priority = true;
        break;
      case 'RB':
        data.attr.carrying.priority = true;
        data.attr.agility.priority = true;
        data.attr.speed.priority = true;
        data.attr.catching.priority = true;
        data.attr.pass_block.priority = true;
        data.attr.strength.priority = true;
        break;
      case 'FB':
        data.attr.carrying.priority = true;
        data.attr.agility.priority = true;
        data.attr.speed.priority = true;
        data.attr.catching.priority = true;
        data.attr.pass_block.priority = true;
        data.attr.run_block.priority = true;
        data.attr.strength.priority = true;
        break;
      case 'WR':
        data.attr.carrying.priority = true;
        data.attr.agility.priority = true;
        data.attr.speed.priority = true;
        data.attr.catching.priority = true;
        data.attr.route_running.priority = true;
        data.attr.strength.priority = true;
        break;
      case 'TE':
        data.attr.carrying.priority = true;
        data.attr.agility.priority = true;
        data.attr.speed.priority = true;
        data.attr.catching.priority = true;
        data.attr.pass_block.priority = true;
        data.attr.run_block.priority = true;
        data.attr.route_running.priority = true;
        data.attr.strength.priority = true;
        break;
      case 'OT':
      case 'OG':
      case 'C':
        data.Agility.priority = true;
        data.Pass_Block.priority = true;
        data.Run_Block.priority = true;
        data.Strength.priority = true;
        break;
      case 'DE':
        data.attr.agility.priority = true;
        data.attr.pass_rush.priority = true;
        data.attr.run_defense.priority = true;
        data.attr.speed.priority = true;
        data.attr.strength.priority = true;
        data.attr.tackle.priority = true;
        break;
      case 'DT':
        data.attr.agility.priority = true;
        data.attr.pass_rush.priority = true;
        data.attr.run_defense.priority = true;
        data.attr.strength.priority = true;
        data.attr.tackle.priority = true;
        break;
      case 'ILB':
      case 'OLB':
        data.attr.agility.priority = true;
        data.attr.man_coverage.priority = true;
        data.attr.zone_coverage.priority = true;
        data.attr.pass_rush.priority = true;
        data.attr.run_defense.priority = true;
        data.attr.speed.priority = true;
        data.attr.strength.priority = true;
        data.attr.tackle.priority = true;
        break;
      case 'CB':
        data.attr.agility.priority = true;
        data.attr.catching.priority = true;
        data.attr.man_coverage.priority = true;
        data.attr.zone_coverage.priority = true;
        data.attr.speed.priority = true;
        data.attr.strength.priority = true;
        data.attr.tackle.priority = true;
        break;
      case 'FS':
      case 'SS':
        data.agility.priority = true;
        data.catching.priority = true;
        data.man_coverage.priority = true;
        data.zone_coverage.priority = true;
        data.run_defense.priority = true;
        data.speed.priority = true;
        data.strength.priority = true;
        data.tackle.priority = true;
        break;
      case 'K':
        data.kick_accuracy.priority = true;
        data.kick_power.priority = true;
        break;
      case 'P':
        data.punt_accuracy.priority = true;
        data.punt_power.priority = true;
        break;
      default:
        break;
    }
    data.Football_Iq.priority = true;
    data.Stamina.Priority = true;
    for (let attribute in data.attr) {
      if (data.attr[attribute].priority) {
        // Algorithm to provide letter value to attribute
        // NOTE: Move this outside of the if statement for implementation to see all attributes
        let attr = data.attr[attribute];
        if (attr.value < 15) attr.letter = 'F';
        else if (attr.value < 25) attr.letter = 'D';
        else if (attr.value < 35) attr.letter = 'C';
        else if (attr.value < 45) attr.letter = 'B';
        else if (attr.value >= 45) attr.letter = 'A';
        playerAttributes.push(attr);
      }
    }
    playerAttributes.push({
      name: 'Potential',
      letter: data.Potential,
      priority: 'true',
    });
  };
  const AttributeRows = attributes.map((attribute) => (
    <AttributeRow key={attribute.name} data={attribute} />
  ));
  const Modal = ({ children, closeModal, modalState, title }) => {
    if (!modalState) return null;

    return (
      <div className='modal is-active'>
        <div className='modal-background' onClick={closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>
              {player.First_Name + ' ' + player.Last_Name}
            </p>
            <button
              className='delete'
              aria-label='close'
              onClick={closeModal}
            ></button>
          </header>
          <section className='modal-card-body'>
            <div className='level'>
              <div className='level-left'>
                <div className='title is-4'>
                  <p>{player.team}</p>
                  <p className='gap'>Year: {player.year}</p>
                </div>
              </div>
              <div className='level-right'>
                <div className='title is-4'>
                  <p className='gap-right'>Position: {player.position}</p>
                  <p>Archtype: {player.archtype}</p>
                </div>
              </div>
            </div>
            <div className='level'>
              <div className='level-left'>
                <p className='title is-4'>
                  {player.height} {player.weight}
                </p>
              </div>
              <div className='level-right'>
                <p className='subtitle is-4'>Overall: {player.overall}</p>
              </div>
            </div>
            <div className='AttributeTable tile is-parent'>{AttributeRows}</div>
          </section>
          <footer className='modal-card-foot'>
            <button className='button' onClick={closeModal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  };

  // Rows
  const PlayerRows = roster.map((player) => (
    <PlayerRow
      key={player.id}
      data={player}
      toggle={toggleModal}
      getData={getPlayerData}
    />
  ));
  const playerCount = roster.length;

  // Designations
  // Objects inside design. array; designation being QB1, QB2, etc...
  // Position being the position related to the designation
  // Use the position key-value as a means to grab players from sample content and display them in player

  return (
    <div className='hero-body center'>
      <div className='container is-fluid has-text-centered userInterface'>
        <h2 className='title is-3'>{team} Roster</h2>
        <div className='columns center is-12'>
          <div className='column is-3'>
            <h2>Coach: {user ? user.username : ''}</h2>
          </div>
          <div className='column is-3'>
            <h2>Season: 2019</h2>
          </div>
          <div className='column is-3'>
            <h2>Players: {playerCount}</h2>
          </div>
          <div className='column is-3'>
            <h2>Redshirts: 0</h2>
          </div>
        </div>
        <div className='columns is-left is-12'>
          <div className='column is-2'>
            <div className='dropdown is-left'>
              <div className='dropdown-trigger'>
                <button
                  name='team'
                  className='button'
                  aria-haspopup='true'
                  aria-controls='dropdown-menu6'
                  onClick={activeDropdown}
                >
                  <span>{user ? team : null}</span>
                  <span className='icon is-small'>
                    <i className='fas fa-angle-down' aria-hidden='true'></i>
                  </span>
                </button>
              </div>
              <div className='dropdown-menu' id='dropdown-menu' role='menu'>
                <div className='dropdown-content'>
                  <DropdownItem
                    value={user ? user.team + ' ' + user.mascot : null}
                    click={selectTeam}
                  />
                  <hr className='dropdown-divider'></hr>
                  <DropdownItem
                    value='Michigan Wolverines'
                    click={selectTeam}
                  />
                  <DropdownItem value='New Mexico Lobos' click={selectTeam} />
                  <DropdownItem
                    value='California Golden Bears'
                    click={selectTeam}
                  />
                  <DropdownItem value='LSU Tigers' click={selectTeam} />
                </div>
              </div>
            </div>
          </div>
          <div className='column is-2'></div>
        </div>
        <div className='is-divider' />
        <div className='scrollbar roster-scrollbar'>
          <Modal
            closeModal={toggleModal}
            modalState={modalState}
            title='TEST'
          />
          <div className='table-wrapper dTable'>
            <table className='table is-fullwidth is-hoverable is-truncated'>
              <thead>
                <tr>
                  <th style={{ width: '200px' }}>
                    <abbr>Name</abbr>
                  </th>
                  <th>
                    <abbr title='Archtype'>Archtype</abbr>
                  </th>
                  <th style={{ width: '50px' }}>
                    <abbr title='Position'>Pos</abbr>
                  </th>
                  <th style={{ width: '50px' }}>
                    <abbr title='Overall'>Ovr</abbr>
                  </th>
                  <th style={{ width: '50px' }}>
                    <abbr title='Year'>Yr</abbr>
                  </th>
                  <th style={{ width: '60px' }}>
                    <abbr title='Height'>Ht</abbr>
                  </th>
                  <th style={{ width: '80px' }}>
                    <abbr title='Weight'>Wt</abbr>
                  </th>
                  <th style={{ width: '50px' }}>
                    <abbr title='State'>St</abbr>
                  </th>
                  <th>
                    <abbr title='High School / JUCO'>School</abbr>
                  </th>
                  <th style={{ width: '50px' }}>
                    <abbr title='Potential'>Pot</abbr>
                  </th>
                  <th style={{ width: '60px' }}>
                    <abbr title='Jersey Number'>Num</abbr>
                  </th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th style={{ width: '200px' }}>
                    <abbr>Name</abbr>
                  </th>
                  <th>
                    <abbr title='Archtype'>Archtype</abbr>
                  </th>
                  <th style={{ width: '50px' }}>
                    <abbr title='Position'>Pos</abbr>
                  </th>
                  <th style={{ width: '50px' }}>
                    <abbr title='Overall'>Ovr</abbr>
                  </th>
                  <th style={{ width: '50px' }}>
                    <abbr title='Year'>Yr</abbr>
                  </th>
                  <th style={{ width: '60px' }}>
                    <abbr title='Height'>Ht</abbr>
                  </th>
                  <th style={{ width: '80px' }}>
                    <abbr title='Weight'>Wt</abbr>
                  </th>
                  <th style={{ width: '50px' }}>
                    <abbr title='State'>St</abbr>
                  </th>
                  <th>
                    <abbr title='High School / JUCO'>School</abbr>
                  </th>
                  <th style={{ width: '50px' }}>
                    <abbr title='Potential'>Pot</abbr>
                  </th>
                  <th style={{ width: '60px' }}>
                    <abbr title='Jersey Number'>Num</abbr>
                  </th>
                </tr>
              </tfoot>
              <tbody>{PlayerRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = ({ user: { currentUser } }) => ({
//   currentUser,
// });
export default Roster;
// export default connect(mapStateToProps)(Roster);
