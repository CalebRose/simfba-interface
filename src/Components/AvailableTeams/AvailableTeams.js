import React, { Component } from 'react';
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
    let postRequest = await fetch(
      'http://localhost:3001/api/request/' + team.id,
      {
        headers: {
          authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          teamId: team.id,
          username: this.props.currentUser.username,
        }),
      }
    );

    this.setState({ sentRequest: true });
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
            <div className='tile is-ancestor teams'>{teamCards}</div>
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
