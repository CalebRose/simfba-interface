import url from '../../Constants/SimBBA_url';
import { GetCall } from '../simFBA/FetchHelper';

export default class BBATeamService {
    async GetActiveCollegeTeams() {
        return await GetCall(`${url}teams/active/college`);
    }

    async GetCoachedTeams() {
        return await GetCall(`${url}teams/coached`);
    }

    async GetCollegeTeams() {
        return await GetCall(`${url}teams/active/college`);
    }

    async GetNBATeams() {
        return GetCall(`${url}teams/nba`);
    }

    async GetAllISLTeams() {
        return GetCall(`${url}teams/isl`);
    }

    async GetAllProfessionalTeams() {
        return GetCall(`${url}teams/pro`);
    }

    async GetTeamByTeamId(teamId) {
        return await GetCall(`${url}team/${teamId}`);
    }

    async GetNBATeamByTeamID(teamID) {
        return await GetCall(`${url}team/nba/${teamID}`);
    }

    async GetTeamStandingsByConferenceID(confId, seasonId) {
        return await GetCall(
            `${url}standings/college/conf/${confId}/${seasonId}`
        );
    }

    async GetNBAStandingsByConferenceID(confId, seasonId) {
        return await GetCall(`${url}standings/nba/conf/${confId}/${seasonId}`);
    }
}
