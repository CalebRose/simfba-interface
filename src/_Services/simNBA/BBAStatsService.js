import url from '../../Constants/SimBBA_url';
import { GetActionCall, GetCall, PostCall } from '../simFBA/FetchHelper.js';

export default class BBAStatsService {
    async GetStatsPageData(league, seasonID, weekID, viewType) {
        return await GetCall(
            `${url}/stats/${league}/${seasonID}/${weekID}/${viewType}`
        );
    }
}
