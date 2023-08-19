import React, { Component } from 'react';
import TeamCard from './TeamCard.js';
import { getLogo } from '../../Constants/getLogo.js';
import { connect } from 'react-redux';
import SimBBA_url from '../../Constants/SimBBA_url';
import FBATeamService from '../../_Services/simFBA/FBATeamService.js';
import FBARequestService from '../../_Services/simFBA/FBARequestService.js';
import BBATeamService from '../../_Services/simNBA/BBATeamService.js';
import BBARequestService from '../../_Services/simNBA/BBARequestService.js';
import constants from '../../Constants/acronyms.js';
import BBATeamCard from '../BBA/TeamCard/BBATeamCard.js';
import NFLTeamCard from './NFLTeamCard.js';
import NBATeamCard from './NBATeamCard.js';

class AvailableTeams extends Component {
    state = {
        teams: [],
        filterTeams: [],
        sentRequest: false,
        selectedSport: 'CFB'
    };
    _FBTeamService = new FBATeamService();
    CFBRequestService = new FBARequestService();
    BBATeamService = new BBATeamService();
    BBARequestService = new BBARequestService();

    async componentDidMount() {
        // FETCH FOR TEAMS
        await this.CFBGetAvailableTeams();
    }

    CFBGetAvailableTeams = async () => {
        let teams = await this._FBTeamService.GetAllCollegeTeams();
        const filterTeams = teams.sort(
            (a, b) => '' + a.TeamName.localeCompare(b.TeamName)
        );

        this.setState({ teams: teams, filterTeams: filterTeams });
    };

    NFLGetAvailableTeams = async () => {
        let teams = await this._FBTeamService.GetAllNFLTeams();
        const sortedTeams = teams.sort(
            (a, b) => '' + a.TeamName.localeCompare(b.TeamName)
        );

        this.setState({ teams: teams, filterTeams: sortedTeams });
    };

    CBBGetAvailableTeams = async () => {
        let teams = await this.BBATeamService.GetCollegeTeams(SimBBA_url);
        const filterTeams = teams
            .filter((x) => x.IsNBA === false)
            .sort((a, b) => '' + a.Team.localeCompare(b.Team));
        this.setState({ teams: teams, filterTeams: filterTeams });
    };

    NBAGetAvailableTeams = async () => {
        let teams = await this.BBATeamService.GetAllProfessionalTeams();
        const sortedTeams = teams.sort(
            (a, b) => '' + a.Team.localeCompare(b.Team)
        );
        this.setState({ teams: teams, filterTeams: sortedTeams });
    };

    sendCFBRequest = async (team) => {
        if (this.state.sentRequest === false) {
            await this.CFBRequestService.CreateTeamRequest(
                team,
                this.props.currentUser.username
            );

            this.setState({ sentRequest: true });
        } else {
            alert(
                "It appears you've already requested a team. Please wait for an admin to approve the request."
            );
        }
    };

    sendNFLRequest = async (team, role) => {
        if (this.state.sentRequest === false) {
            const isOwner = role === 'o';
            const isManager = role === 'gm';
            const isCoach = role === 'hc';
            const isAssistant = role === 'a';
            const requestDTO = {
                Username: this.props.currentUser.username,
                NFLTeamID: team.ID,
                NFLTeam: team.TeamName + ' ' + team.Mascot,
                NFLTeamAbbreviation: team.TeamAbbr,
                IsOwner: isOwner,
                IsManager: isManager,
                IsCoach: isCoach,
                IsAssistant: isAssistant,
                IsApproved: false
            };

            await this.CFBRequestService.CreateNFLTeamRequest(requestDTO);
            this.setState({ sentRequest: true });
        } else {
            alert(
                "It appears you've already requested a team. Please wait for an admin to approve the request."
            );
        }
    };

    sendCBBRequest = async (team) => {
        await this.BBARequestService.CreateTeamRequest(
            team,
            this.props.currentUser.username
        );

        this.setState({ sentRequest: true });
    };

    sendNBARequest = async (team, role) => {
        if (this.state.sentRequest === false) {
            const isOwner = role === 'o';
            const isManager = role === 'gm';
            const isCoach = role === 'hc';
            const isAssistant = role === 'a';
            const requestDTO = {
                Username: this.props.currentUser.username,
                NBATeamID: team.ID,
                NBATeam: team.Team + ' ' + team.Nickname,
                NBATeamAbbreviation: team.Abbr,
                IsOwner: isOwner,
                IsManager: isManager,
                IsCoach: isCoach,
                IsAssistant: isAssistant,
                IsApproved: false
            };

            const res = await this.BBARequestService.CreateNBATeamRequest(
                requestDTO
            );
            this.setState({ sentRequest: true });
        } else {
            alert(
                "It appears you've already requested a team. Please wait for an admin to approve the request."
            );
        }
    };

    selectSport = async (event) => {
        const sport = event.target.value;
        this.setState({ filterTeams: [], selectedSport: sport });
        switch (sport) {
            case constants.CFB:
                await this.CFBGetAvailableTeams();
                break;
            case constants.NFL:
                await this.NFLGetAvailableTeams();
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
                        key={team.ID}
                        teamId={team.ID}
                        team={team.TeamName}
                        mascot={team.Mascot}
                        conference={team.Conference}
                        logo={getLogo(team.TeamAbbr)}
                        request={this.sendCFBRequest}
                        disable={this.state.sentRequest}
                        isFBS={team.IsFBS}
                        coach={team.Coach}
                        viewMode={this.props.viewMode}
                    />
                );
            } else if (this.state.selectedSport === constants.NFL) {
                return (
                    <NFLTeamCard
                        key={team.ID}
                        team={team}
                        request={this.sendNFLRequest}
                        disable={this.state.sentRequest}
                        viewMode={this.props.viewMode}
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
                        logo={getLogo(team.Abbr)}
                        request={this.sendCBBRequest}
                        disable={this.state.sentRequest}
                        ovr={team.OverallGrade}
                        off={team.OffenseGrade}
                        def={team.DefenseGrade}
                        coach={team.Coach}
                        viewMode={this.props.viewMode}
                    />
                );
            } else if (this.state.selectedSport === constants.NBA) {
                let logoKey = `${team.Team} ${team.Nickname}`;
                logoKey = logoKey.trim();
                return (
                    <NBATeamCard
                        key={team.ID}
                        teamId={team.ID}
                        team={team}
                        logo={getLogo(logoKey)}
                        request={this.sendNBARequest}
                        disable={this.state.sentRequest}
                        viewMode={this.props.viewMode}
                        ovr={team.OverallGrade}
                        off={team.OffenseGrade}
                        def={team.DefenseGrade}
                    />
                );
            }
            return <div>Finding available teams...</div>;
        });

        return (
            <div className="container-fluid mt-3">
                <div className="justify-content-start">
                    <h2 className="subtitle is-3">Available Teams</h2>
                </div>
                <div className="row mt-2 mb-1">
                    <p>
                        NOTE: All team requests without an application filled
                        out will be rejected. If you haven't filled out an
                        application, please make sure you've registered into{' '}
                        <a
                            target="_blank"
                            href="https://www.simfba.com/index.php"
                        >
                            SimFBA
                        </a>{' '}
                        and go to the{' '}
                        <a
                            target="_blank"
                            href="https://www.simfba.com/index.php?forums/job-applications-and-interviews.4/"
                        >
                            Job Apps Subforum
                        </a>{' '}
                        to fill out an application.{' '}
                    </p>
                    <p>
                        If you're not sure where to start, please join our{' '}
                        <a target="_blank" href="https://discord.gg/q46vwZ83RH">
                            Discord server
                        </a>{' '}
                        and we shall help you there.
                    </p>
                </div>
                <div className="row mt-2 mb-2">
                    <p>
                        FCS Teams are currently being displayed but are
                        unavailable for the 2023 Season.
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <div className="btn-group-vertical mb-2">
                            <button
                                type="button"
                                class="btn btn-primary btn-sm mb-1"
                                value="CFB"
                                onClick={this.selectSport}
                            >
                                CFB Team
                            </button>
                            <button
                                type="button"
                                class="btn btn-primary btn-sm mb-1"
                                value="NFL"
                                onClick={this.selectSport}
                            >
                                NFL Team
                            </button>
                            <button
                                type="button"
                                class="btn btn-primary btn-sm mb-1"
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
                    </div>
                    <div className="col-md-10">
                        <div className="availableScrollbar available-ui-height availableTeams">
                            <div className="row row-cols-1 row-cols-md-3 g-4 mb-2">
                                {teamCards}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({
    user: { currentUser },
    viewMode: { viewMode }
}) => ({
    currentUser,
    viewMode
});

export default connect(mapStateToProps)(AvailableTeams);
