import React, { Component } from 'react';
import logos from '../../Constants/logos.js';
import TeamCard from './TeamCard.js';
import { getLogo } from '../../Constants/getLogo.js';
import { connect } from 'react-redux';

class AvailableTeams extends Component {
  state = {
    teams: [],
    filterTeams: [],
    sentRequest: false,
  };

  componentDidMount() {
    // FETCH FOR TEAMS
    const getTeams = async () => {
      let res = await fetch('http://localhost:3001/api/teams', {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
          mode: 'no-cors',
        },
      });

      let json;
      if (res.ok) {
        json = await res.json();
      } else {
        alert('HTTP-Error:', res.status);
      }
      const filterTeams = json.filter((x) => x.Coach === null);

      this.setState({ teams: json, filterTeams: filterTeams });
    };
    getTeams();
  }

  sendRequest = async (team) => {
    console.log(team);
    console.log(this.props);
    let postRequest = await fetch(
      'http://localhost:3001/api/request/' + team.id,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          team: team.id,
          username: this.props.currentUser.username,
        }),
      }
    );

    this.setState({ sentRequest: true });
    console.log(postRequest);
    console.log(this.state.sentRequest);
  };

  render() {
    // Check whether the team is available or not
    // For all teams available, run a loop
    // And render a teamcard for each available team
    // Pass all team info as a prop

    const teamCards = this.state.filterTeams.map((team) => {
      return (
        <TeamCard
          key={team.id}
          teamId={team.id}
          team={team.Team}
          mascot={team.Nickname}
          conference={team.Current_Conference}
          logo={getLogo(team.Team)}
          request={this.sendRequest}
          disable={this.state.sentRequest}
        />
      );
    });

    return (
      <div className='hero-body center'>
        <div className='is-fluid has-text-centered'>
          <h2 className='subtitle is-3 availableText'>Available Teams</h2>
          <div className='availableScrollbar available-ui-height availableTeams'>
            <div className='tile is-ancestor teams'>
              {teamCards}
              {/* <TeamCard
                team='Baylor'
                mascot='Bears'
                conference='Big 12 Conference'
                logo={logos.Baylor}
              />
              <TeamCard
                team='Boise State'
                mascot='Broncos'
                conference='Mountain West Conference'
                logo={logos.Boise_State}
              />
              <TeamCard
                team='California'
                mascot='Golden Bears'
                conference='Pac 12 Conference'
                logo={logos.California}
              />
              <TeamCard
                team='Eastern Michigan'
                mascot='Eagles'
                conference='Mid-American Conference'
                logo={logos.Eastern_Michigan}
              />
              <TeamCard
                team='Florida'
                mascot='Gators'
                conference='South Eastern Conference'
                logo={logos.Florida}
              />
              <TeamCard
                team='FIU'
                mascot='Panthers'
                conference='Conference-USA'
                logo={logos.FIU}
              />
              <TeamCard
                team='Hawaii'
                mascot='Rainbow Warriors'
                conference='Mountain West Conference'
                logo={logos.Hawaii}
              />
              <TeamCard
                team='Kansas'
                mascot='Jayhawks'
                conference='Big 12 Conference'
                logo={logos.Kansas}
              />
              <TeamCard
                team='Kansas State'
                mascot='Wildcats'
                conference='Big 12 Conference'
                logo={logos.Kansas_State}
              />
              <TeamCard
                team='LSU'
                mascot='Tigers'
                conference='South Eastern Conference'
                logo={logos.LSU}
              />
              <TeamCard
                team='Michigan'
                mascot='Wolverines'
                conference='Big 10 Conference'
                logo={logos.Michigan}
              />
              <TeamCard
                team='Nevada'
                mascot='Wolf Pack'
                conference='Mountain West Conference'
                logo={logos.Nevada}
              />
              <TeamCard
                team='Oregon'
                mascot='Ducks'
                conference='Pac 12 Conference'
                logo={logos.Oregon}
              />
              <TeamCard
                team='West Virginia'
                mascot='Mountaineers'
                conference='Big 12 Conference'
                logo={logos.West_Virginia}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(AvailableTeams);
