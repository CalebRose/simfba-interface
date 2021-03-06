import React, { useEffect } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import PlayerRow from './PlayerRow';
import SampleContent from './SampleContent';
import AttributeRow from './AttributeRow';
import DropdownItem from './DropdownItem';
import Player from '../../Models/Player';
// import DepthChartRow from "../DepthChart/DepthChartRow";

const Roster = ({ currentUser }) => {
  /* 
        API Call to get team data
        Loop through array list to acquire players
    */

  // React Hooks for Modal
  //
  const user = useSelector((state) => state.user.currentUser); // Selecting redux state
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
      let response = await fetch(
        'http://localhost:3001/api/roster/' + user.teamId,
        {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
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
      // let playerList = json
      //   ? json.filter((player) => player.Team === team)
      //   : null;
      // console.log(playerList);
      setRoster(json);
    };
    if (user) {
      getRoster();
    }
    // let playerList = SampleContent.filter((player) => player.team === team);
  }, [team, user]);

  // Call Back Function
  const getPlayerData = (data) => {
    if (data) {
      let playerRecord = new Player(data);
      setPriority(playerRecord);
      setPlayer(playerRecord);
      setAttributes(playerRecord.priorityAttributes);
    }
  };
  // Priority Queue

  const setPriority = (data) => {
    switch (data.Position) {
      case 'QB':
        data.priorityAttributes = [
          { Name: 'Agility', Value: data.Agility, Letter: '' },
          { Name: 'Speed', Value: data.Speed, Letter: '' },
          { Name: 'Strength', Value: data.Strength, Letter: '' },
          { Name: 'Throw Power', Value: data.Throw_Power, Letter: '' },
          { Name: 'Throw Accuracy', Value: data.Throw_Accuracy, Letter: '' },
        ];
        break;
      case 'RB':
        data.priorityAttributes = [
          { Name: 'Agility', Value: data.Agility, Letter: '' },
          { Name: 'Speed', Value: data.Speed, Letter: '' },
          { Name: 'Carrying', Value: data.Carrying, Letter: '' },
          { Name: 'Catching', Value: data.Catching, Letter: '' },
          { Name: 'Pass Block', Value: data.Pass_Block, Letter: '' },
          { Name: 'Strength', Value: data.Strength, Letter: '' },
        ];
        break;
      case 'FB':
        data.priorityAttributes = [
          { Name: 'Agility', Value: data.Agility, Letter: '' },
          { Name: 'Speed', Value: data.Speed, Letter: '' },
          { Name: 'Carrying', Value: data.Carrying, Letter: '' },
          { Name: 'Catching', Value: data.Catching, Letter: '' },
          { Name: 'Pass Block', Value: data.Pass_Block, Letter: '' },
          { Name: 'Run Block', Value: data.Run_Block, Letter: '' },
          { Name: 'Strength', Value: data.Strength, Letter: '' },
        ];
        break;
      case 'WR':
        data.priorityAttributes = [
          { Name: 'Agility', Value: data.Agility, Letter: '' },
          { Name: 'Speed', Value: data.Speed, Letter: '' },
          { Name: 'Carrying', Value: data.Carrying, Letter: '' },
          { Name: 'Catching', Value: data.Catching, Letter: '' },
          { Name: 'Route Running', Value: data.Route_Running, Letter: '' },
          { Name: 'Strength', Value: data.Strength, Letter: '' },
        ];
        break;
      case 'TE':
        data.priorityAttributes = [
          { Name: 'Agility', Value: data.Agility, Letter: '' },
          { Name: 'Speed', Value: data.Speed, Letter: '' },
          { Name: 'Carrying', Value: data.Carrying, Letter: '' },
          { Name: 'Catching', Value: data.Catching, Letter: '' },
          { Name: 'Route Running', Value: data.Route_Running, Letter: '' },
          { Name: 'Strength', Value: data.Strength, Letter: '' },
          { Name: 'Pass Block', Value: data.Pass_Block, Letter: '' },
          { Name: 'Run Block', Value: data.Run_Block, Letter: '' },
        ];
        break;
      case 'OT':
      case 'OG':
      case 'C':
        data.priorityAttributes = [
          { Name: 'Agility', Value: data.Agility, Letter: '' },
          { Name: 'Strength', Value: data.Strength, Letter: '' },
          { Name: 'Pass Block', Value: data.Pass_Block, Letter: '' },
          { Name: 'Run Block', Value: data.Run_Block, Letter: '' },
        ];
        break;
      case 'DE':
        data.priorityAttributes = [
          { Name: 'Agility', Value: data.Agility, Letter: '' },
          { Name: 'Speed', Value: data.Speed, Letter: '' },
          { Name: 'Tackle', Value: data.Tackle, Letter: '' },
          { Name: 'Strength', Value: data.Strength, Letter: '' },
          { Name: 'Pass Rush', Value: data.Pass_Rush, Letter: '' },
          { Name: 'Run Defense', Value: data.Run_Defense, Letter: '' },
        ];
        break;
      case 'DT':
        data.priorityAttributes = [
          { Name: 'Agility', Value: data.Agility, Letter: '' },
          { Name: 'Tackle', Value: data.Tackle, Letter: '' },
          { Name: 'Strength', Value: data.Strength, Letter: '' },
          { Name: 'Pass Rush', Value: data.Pass_Rush, Letter: '' },
          { Name: 'Run Defense', Value: data.Run_Defense, Letter: '' },
        ];
        break;
      case 'ILB':
      case 'OLB':
        data.priorityAttributes = [
          { Name: 'Agility', Value: data.Agility, Letter: '' },
          { Name: 'Speed', Value: data.Speed, Letter: '' },
          { Name: 'Tackle', Value: data.Tackle, Letter: '' },
          { Name: 'Strength', Value: data.Strength, Letter: '' },
          { Name: 'Pass Rush', Value: data.Pass_Rush, Letter: '' },
          { Name: 'Run Defense', Value: data.Run_Defense, Letter: '' },
          { Name: 'Zone Coverage', Value: data.Zone_coverage, Letter: '' },
          { Name: 'Man Coverage', Value: data.Man_Coverage, Letter: '' },
        ];
        break;
      case 'CB':
        data.priorityAttributes = [
          { Name: 'Agility', Value: data.Agility, Letter: '' },
          { Name: 'Speed', Value: data.Speed, Letter: '' },
          { Name: 'Tackle', Value: data.Tackle, Letter: '' },
          { Name: 'Strength', Value: data.Strength, Letter: '' },
          { Name: 'Zone Coverage', Value: data.Zone_coverage, Letter: '' },
          { Name: 'Man Coverage', Value: data.Man_Coverage, Letter: '' },
          { Name: 'Catching', Value: data.Catching, Letter: '' },
        ];
        break;
      case 'FS':
      case 'SS':
        data.priorityAttributes = [
          { Name: 'Agility', Value: data.Agility, Letter: '' },
          { Name: 'Speed', Value: data.Speed, Letter: '' },
          { Name: 'Run Defense', Value: data.Run_Defense, Letter: '' },
          { Name: 'Tackle', Value: data.Tackle, Letter: '' },
          { Name: 'Strength', Value: data.Strength, Letter: '' },
          { Name: 'Zone Coverage', Value: data.Zone_coverage, Letter: '' },
          { Name: 'Man Coverage', Value: data.Man_Coverage, Letter: '' },
          { Name: 'Catching', Value: data.Catching, Letter: '' },
        ];
        break;
      case 'K':
        data.priorityAttributes = [
          { Name: 'Kick Accuracy', Value: data.Kick_Accuracy, Letter: '' },
          { Name: 'KickPower', Value: data.Kick_Power, Letter: '' },
        ];
        break;
      case 'P':
        data.priorityAttributes = [
          { Name: 'Punt Accuracy', Value: data.Punt_Accuracy, Letter: '' },
          { Name: 'Punt Power', Value: data.Punt_Power, Letter: '' },
        ];
        break;
      default:
        break;
    }
    data.priorityAttributes.push({
      Name: 'Football IQ',
      Value: data.Football_IQ,
      Letter: '',
    });
    data.priorityAttributes.push({
      Name: 'Stamina',
      Value: data.Stamina,
      Letter: '',
    });
    for (let i = 0; i < data.priorityAttributes.length; i++) {
      const attribute = data.priorityAttributes[i];
      // Algorithm to provide letter value to attribute
      // NOTE: Move this outside of the if statement for implementation to see all attributes
      if (attribute.Value < 15) attribute.Letter = 'F';
      else if (attribute.Value < 25) attribute.Letter = 'D';
      else if (attribute.Value < 35) attribute.Letter = 'C';
      else if (attribute.Value < 45) attribute.Letter = 'B';
      else if (attribute.Value >= 45) attribute.Letter = 'A';
    }
    data.priorityAttributes.push({
      Name: 'Potential',
      Letter: data.Potential,
    });
  };
  const AttributeRows = attributes.map((attribute) => (
    <AttributeRow key={attribute.Name} data={attribute} />
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
                  <p>{player.Team}</p>
                  <p className='gap'>
                    <strong>Year: </strong>
                    {player.Year}
                  </p>
                </div>
              </div>
              <div className='level-right'>
                <div className='title is-4'>
                  <p className='gap-right'>
                    <strong>Position: </strong>
                    {player.Position}
                  </p>
                  <p>
                    <strong>Archetype:</strong> {player.Archetype}
                  </p>
                </div>
              </div>
            </div>
            <div className='level'>
              <div className='level-left'>
                <p className='title is-4'>
                  {player.Height} inches, {player.Weight} lbs
                </p>
              </div>
              <div className='level-right'>
                <p className='subtitle is-4'>Overall: {player.Overall}</p>
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
                    <abbr title='Archetype'>Archetype</abbr>
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
