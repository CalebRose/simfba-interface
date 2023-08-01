import url from '../../Constants/SimBBA_url';
import { GetCall } from '../simFBA/FetchHelper';

export default class BBAMatchService {
    async GetCBBMatchesByTeamAndSeason(TeamID, SeasonID) {
        return await GetCall(`${url}match/team/${TeamID}/season/${SeasonID}/`);
    }
    async GetMatchesByWeek(week) {
        return await GetCall(`${url}/match/week/${week}/`);
    }

    async GetMatchesBySeason(seasonID) {
        return await GetCall(`${url}/match/season/${seasonID}/`);
    }

    async GetMatchResultData(id) {
        return await GetCall(`${url}/match/result/cbb/${id}/`);
    }
    async GetNBAMatchResultData(id) {
        return await GetCall(`${url}/match/result/nba/${id}/`);
    }
}
