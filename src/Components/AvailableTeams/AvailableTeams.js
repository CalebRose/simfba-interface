import React, { Component } from 'react';
import TeamCard from './TeamCard.js';
import { getLogo } from '../../Constants/getLogo.js';
import { connect } from 'react-redux';
import url from '../../Constants/url.js';
import SimBBA_url from '../../Constants/SimBBA_url';
import TeamService from '../../_Services/simFBA/TeamService.js';
import RequestService from '../../_Services/simFBA/RequestService.js';
import BBATeamService from '../../_Services/simNBA/BBATeamService.js';
import BBARequestService from '../../_Services/simNBA/BBARequestService.js';
import constants from '../../Constants/constants.js';
import BBATeamCard from '../BBA/TeamCard/BBATeamCard.js';

class AvailableTeams extends Component {
    state = {
        teams: [],
        filterTeams: [],
        sentRequest: false,
        selectedSport: 'CFB'
    };
    CFBTeamService = new TeamService();
    CFBRequestService = new RequestService();
    BBATeamService = new BBATeamService();
    BBARequestService = new BBARequestService();

    async componentDidMount() {
        // FETCH FOR TEAMS
        // const url = 'https://simfba-interface.azurewebsites.net/api';
        await this.CFBGetAvailableTeams();
    }

    CFBGetAvailableTeams = async () => {
        let teams = await this.CFBTeamService.GetTeams(url);

        const filterTeams = teams.filter((x) => x.Coach === null);

        this.setState({ teams: teams, filterTeams: filterTeams });
    };

    CBBGetAvailableTeams = async () => {
        let teams = await this.BBATeamService.GetCollegeTeams(SimBBA_url);
        const filterTeams = teams.filter(
            (x) => x.Coach === null || x.Coach === ''
        );
        this.setState({ teams: teams, filterTeams: filterTeams });
    };

    NBAGetAvailableTeams = async () => {
        let teams = await this.BBATeamService.GetNBATeams(SimBBA_url);

        const filterTeams = teams.filter((x) => x.FirstSeason !== '');

        this.setState({ teams: teams, filterTeams: filterTeams });
    };

    sendCFBRequest = async (team) => {
        let postRequest = await this.CFBRequestService.PostRequest(
            url,
            team,
            this.props.currentUser.username
        );

        this.setState({ sentRequest: true });
    };

    sendCBBRequest = async (team) => {
        let postRequest = await this.BBARequestService.CreateTeamRequest(
            url,
            team,
            this.props.currentUser.username
        );

        this.setState({ sentRequest: true });
    };

    selectSport = async (event) => {
        const sport = event.target.value;
        this.setState({ selectedSport: sport });
        switch (sport) {
            case constants.CFB:
                await this.CFBGetAvailableTeams();
                break;
            case constants.CBB:
                await this.CBBGetAvailableTeams();
                break;
            case constants.NBA:
                await this.NBAGetAvailableTeams();
                break;

            default:
                break;
        }
    };

    render() {
        // Check whether the team is available or not
        // For all teams available, run a loop
        // And render a teamcard for each available team
        // Pass all team info as a prop
        const teamCards = this.state.filterTeams.map((team) => {
            if (this.state.selectedSport === constants.CFB) {
                return (
                    <TeamCard
                        key={team.id}
                        teamId={team.id}
                        team={team.Team}
                        mascot={team.Nickname}
                        conference={team.Current_Conference}
                        logo={getLogo(team.Team)}
                        request={this.sendCFBRequest}
                        disable={this.state.sentRequest}
                    />
                );
            } else if (this.state.selectedSport === constants.CBB) {
                return (
                    <BBATeamCard
                        key={team.ID}
                        teamId={team.ID}
                        team={team.Team}
                        mascot={team.Nickname}
                        conference={team.Conference}
                        logo={getLogo(team.Team)}
                        request={this.sendCBBRequest}
                        disable={this.state.sentRequest}
                    />
                );
            } else if (this.state.selectedSport === constants.NBA) {
                return (
                    <BBATeamCard
                        key={team.ID}
                        teamId={team.ID}
                        team={team.Team}
                        mascot={team.Nickname}
                        conference={team.Conference}
                        logo={getLogo(team.Team + ' ' + team.Nickname)}
                        request={this.sendCBBRequest}
                        disable={this.state.sentRequest}
                    />
                );
            }
            return <div>Finding available teams...</div>;
        });

        return (
            <div className="container mt-2">
                <h2 className="subtitle is-3">Available Teams</h2>
                <div className="btn-group mb-2">
                    <button
                        type="button"
                        class="btn btn-primary btn-sm me-2"
                        value="CFB"
                        onClick={this.selectSport}
                    >
                        CFB Team
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary btn-sm me-2"
                        value="NFL"
                        onClick={this.selectSport}
                    >
                        NFL Team
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary btn-sm me-2"
                        value="CBB"
                        onClick={this.selectSport}
                    >
                        CBB Team
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        value="NBA"
                        onClick={this.selectSport}
                    >
                        NBA Team
                    </button>
                </div>
                <div className="availableScrollbar available-ui-height availableTeams">
                    <div className="row  row-cols-1 row-cols-md-3 g-4">
                        {teamCards}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(AvailableTeams);
