import url from '../../Constants/SimBBA_url';
import { GetCall } from '../simFBA/FetchHelper';

export default class BBAMatchService {
    async GetMatchesByWeek(week) {
        return await GetCall(`${url}/match/week/${week}/`);
    }

    async GetMatchesBySeason(seasonID) {
        return await GetCall(`${url}/match/season/${seasonID}/`);
    }

    async GetMatchResultData(id) {
        return await GetCall(`${url}/match/result/${id}/`);
    }
}
