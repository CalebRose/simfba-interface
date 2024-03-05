import url from '../../Constants/url.js';
import { GetCall } from './FetchHelper.js';

export default class FBATeamService {
    async GetAllCollegeTeams() {
        return await GetCall(`${url}teams/college/all`);
    }

    async GetAllCollegeTeamsForRosterPage() {
        return await GetCall(`${url}teams/college/data/all`);
    }

    async GetAllNFLTeams() {
        return await GetCall(`${url}teams/nfl/all`);
    }

    async GetAllActiveCollegeTeams() {
        return await GetCall(`${url}teams/college/active`);
    }

    async GetAvailableCollegeTeams() {
        return await GetCall(`${url}teams/college/available`);
    }

    async GetTeamByTeamId(teamID) {
        return await GetCall(`${url}teams/college/team/${teamID}`);
    }

    async GetNFLTeamByTeamID(teamID) {
        return await GetCall(`${url}teams/nfl/team/${teamID}`);
    }

    async GetTeamsByConference(conferenceID) {
        return await GetCall(`${url}teams/college/conference/${conferenceID}`);
    }

    async GetTeamsByDivision(divisionID) {
        return await GetCall(`${url}teams/college/division/${divisionID}`);
    }

    async GetTeamStandingsByConference(conferenceID, seasonID) {
        return await GetCall(
            `${url}standings/cfb/${conferenceID}/${seasonID}/`
        );
    }

    async GetNFLTeamStandingsByDivision(divisionID, seasonID) {
        return await GetCall(`${url}standings/nfl/${divisionID}/${seasonID}/`);
    }

    async GetHistoricalTeamStandingsByTeamID(teamID) {
        return await GetCall(`${url}standings/cfb/history/team/${teamID}/`);
    }

    async GetAllCollegeStandingsBySeasonID(seasonID) {
        return await GetCall(`${url}standings/cfb/season/${seasonID}/`);
    }

    async GetAllNFLStandingsBySeasonID(seasonID) {
        return await GetCall(`${url}standings/nfl/season/${seasonID}/`);
    }

    async GetNFLRosterData(teamID) {
        return await GetCall(`${url}teams/nfl/roster/${teamID}`);
    }
}
