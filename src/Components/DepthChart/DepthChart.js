import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import url from '../../Constants/url';
import AddPlayerDropdown from './AddPlayerDropdown';

// import DropdownItem from '../Roster/DropdownItem';
// import DepthChartRow from './DepthChartRow';
import Dropdown from './DC_DropDown';
import PlayerRow from './PlayerRow';
// import DesignationRow from './DesignationRow';

const DepthChart = ({ currentUser }) => {
  const user = useSelector((state) => state.user.currentUser);
  let initialTeam = user ? user.team + ' ' + user.mascot : null; // Initial value from redux state
  const [team, setTeam] = React.useState(initialTeam);
  const [depthChart, setDepthChart] = React.useState([]);
  const [filterDepthChart, setFilter] = React.useState([]);
  const [roster, setRoster] = React.useState([]);
  const [teams, setTeams] = React.useState([]);
  const [addPlayer, setAddPlayer] = React.useState({});
  const [pos, setPosition] = React.useState({
    name: 'Quarterback',
    position: 'QB',
    id: 6,
  });

  // DropDown
  const activeDropdown = (event) => {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('is-active');
  };

  const selectTeam = (event) => {
    setTeam(event.target.value);
    activeDropdown();
  };

  const callPosition = (event) => {
    let pos = event;
    if (pos.position === 'LT' || pos.position === 'RT') {
      pos.position = 'OT';
    } else if (pos.position === 'LG' || pos.position === 'RG') {
      pos.position = 'OG';
    } else if (pos.position === 'LE' || pos.position === 'RE') {
      pos.position = 'DE';
    } else if (pos.position === 'ROLB' || pos.position === 'LOLB') {
      pos.position = 'OLB';
    }
    setPosition(pos);
    // const filterRoster = roster.filter((x) => x.position === pos);
    // setFilter(filterRoster);
  };

  const adjustDepthChart = (callback) => {
    //
    let positionRoster = filterDepthChart;
    let player = callback.player;

    let index = 0;
    while (index < positionRoster.length) {
      if (positionRoster[index].playerId === player.playerId) {
        break;
      }
      index++;
    }
    let playerToSwap = index;
    if (callback.swap === -1) {
      playerToSwap--;
    } else {
      playerToSwap++;
    }
    let rosterIndex = 0;
    let secondPlayerIndex = 0;
    while (rosterIndex < depthChart.length) {
      if (depthChart[rosterIndex].playerId === positionRoster[index].playerId) {
        break;
      }
      rosterIndex++;
    }

    while (secondPlayerIndex < depthChart.length) {
      if (
        depthChart[secondPlayerIndex].playerId ===
        positionRoster[playerToSwap].playerId
      ) {
        break;
      }
      secondPlayerIndex++;
    }
    // swap in Roster
    if (callback.swap === -1) {
      depthChart[rosterIndex].startingTernary -= 1;
      depthChart[secondPlayerIndex].startingTernary += 1;
    } else {
      depthChart[rosterIndex].startingTernary += 1;
      depthChart[secondPlayerIndex].startingTernary -= 1;
    }
    setDepthChart(depthChart);
    setPosition(pos);

    positionRoster = [...positionRoster].sort(
      (a, b) => a.startingTernary - b.startingTernary
    );

    // POST
    let arr = JSON.stringify([
      depthChart[rosterIndex],
      depthChart[secondPlayerIndex],
    ]);
    const postUpdate = async (arr) => {
      let res = await fetch(url + 'depthchart/update/' + user.teamId, {
        headers: {
          authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: arr,
      });
      if (res.ok) {
        console.log('Post Complete');
      } else {
        alert('HTTP-Error:', res.status);
      }
    };
    //
    setFilter(positionRoster);
    postUpdate(arr);
  };

  // const callBackPosition = (event) => {
  //   return event.target.value;
  // };

  useEffect(() => {
    // const getTeams = async () => {
    //   let res = await fetch('http://localhost:3001/api/teams', {
    //     headers: {
    //       authorization: 'Bearer ' + localStorage.getItem('token'),
    //     },
    //   });
    //   let json;
    //   if (res.ok) {
    //     json = await res.json();
    //   } else {
    //     alert('HTTP-Error:', res.status);
    //   }
    //   let teamList = json ? json.filter((team) => user.team !== team) : null;
    //   setTeams(teamList);
    // };

    const getDepthChart = async () => {
      let res = await fetch(url + 'depthchart/' + user.teamId, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      });
      let json;
      if (res.ok) {
        json = await res.json();
      } else {
        alert('HTTP-Error:', res.status);
      }
      setDepthChart(json);
    };
    if (user) {
      setTeam(user.team + ' ' + user.mascot);
      // getTeams();
      getDepthChart();
    }
  }, [user]);

  useEffect(() => {
    const filterRoster = depthChart
      .filter((x) => x.Position === pos.position)
      .sort((a, b) => a.startingTernary - b.startingTernary);
    setFilter(filterRoster);
  }, [depthChart, pos]);

  // useEffect(() => {
  //   console.log(roster);
  //   let playerList = roster.filter((player) => player.pos === pos);
  //   setFilter(playerList);
  // }, [team, pos, roster]);

  // Rows
  // const PlayerRows = roster.map((player) => (
  //   <DepthChartRow key={player.id} data={player} />
  // ));
  // const playerCount = roster.length;
  // Player Dropdown
  // Set in stone each designation to be a permanent slot
  // Go to the sample content and assign each player a designation
  // If they match the designation, ahve them in the proper dropdown

  let positions = [
    { name: 'Quarterback', position: 'QB', id: 6 },
    { name: 'Runningback', position: 'RB', id: 5 },
    { name: 'Wide Receiver', position: 'WR', id: 14 },
    { name: 'Tight End', position: 'TE', id: 11 },
    { name: 'Left Tackle', position: 'LT', id: 1 },
    { name: 'Left Guard', position: 'LG', id: 2 },
    { name: 'Center', position: 'C', id: 15 },
    { name: 'Right Guard', position: 'RG', id: 2 },
    { name: 'Right Tackle', position: 'RT', id: 1 },
    { name: 'Left End', position: 'LE', id: 7 },
    { name: 'Defensive Tackle', position: 'DT', id: 4 },
    { name: 'Right End', position: 'RE', id: 7 },
    { name: 'Left Outside Linebacker', position: 'LOLB', id: 12 },
    { name: 'Inside Linebacker', position: 'ILB', id: 8 },
    { name: 'Right Outside Linebacker', position: 'ROLB', id: 12 },
    { name: 'Cornerback', position: 'CB', id: 13 },
    { name: 'Free Safety', position: 'FS', id: 9 },
    { name: 'Strong Safety', position: 'SS', id: 10 },
    { name: 'Punter', position: 'P', id: 16 },
    { name: 'Kicker', position: 'K', id: 17 },
    { name: 'Personal Protector', position: 'PPr', id: 18 },
    { name: 'Long Snapper', position: 'LS', id: 19 },
    { name: 'Gunner', position: 'GU', id: 20 },
    { name: 'Wing', position: 'W', id: 21 },
    { name: 'Gun Stopper', position: 'GS', id: 22 },
    { name: 'Punt Rusher', position: 'PRSH', id: 23 },
    { name: 'Kickoff Coverage', position: 'KCov', id: 24 },
    { name: 'Punt Returner', position: 'PR', id: 25 },
    { name: 'Kick Returner', position: 'KR', id: 26 },
    { name: 'Upback', position: 'UP', id: 27 },
    { name: 'First Line', position: 'FL', id: 28 },
    { name: 'Second Line', position: 'SL', id: 29 },
    { name: 'Holder', position: 'H', id: 30 },
    { name: 'FG Rushers', position: 'FGR', id: 31 },
    { name: 'Kickoff Kicker', position: 'KK', id: 32 },
  ];

  let headers = [
    { title: 'String', Label: 'String' },
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
    { title: 'Promote', Label: 'Promote' },
  ];

  let headerRows = headers.map((x) => (
    <th>
      <abbr key={x.title} title={x.title}>
        {x.Label}
      </abbr>
    </th>
  ));

  // let DesignationRows = designations.map((x) => (
  //   <DesignationRow
  //     // designation={x.designation}
  //     pos={x.position}
  //     players={filterRosters}
  //     key={x.designation}
  //   />
  // ));

  // let PlayerRows = filterRosters.map((x, i) => {
  //   return (
  //     <PlayerRow
  //       pos={x.Position}
  //       player={x}
  //       key={x.id}
  //       moveRow={adjustDepthChart}
  //       rank={i}
  //       arrLength={filterRosters.length}
  //     />
  //   );
  // });

  return (
    <div className='hero-body center'>
      <div className='container is-fluid has-text-centered userInterface'>
        <h2 className='title is-3'>Depth Chart</h2>
        <div className='columns center is-12'></div>
        <div className='columns is-left is-12'>
          <div className='column is-2'>
            <Dropdown
              team={team}
              info={user}
              teams={teams}
              align='left'
              id='team-dropdown'
            />
            <Dropdown
              info={user}
              data={positions}
              align='right'
              id='position-dropdown'
              call={callPosition}
              currentPosition={pos}
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
              {/* <tbody>{PlayerRows}</tbody> */}
              <tbody>
                {filterDepthChart.map((x, i) => {
                  return (
                    <PlayerRow
                      pos={x.Position}
                      player={x}
                      key={x.id}
                      moveRow={adjustDepthChart}
                      rank={i}
                      arrLength={filterDepthChart.length}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='is-divider' />
        <div className='add-player'>
          <h1>Add to Depth Chart</h1>
          <div>
            <AddPlayerDropdown />
          </div>
          <div>For Add Player Button</div>
        </div>
      </div>
    </div>
  );
};

export default DepthChart;
