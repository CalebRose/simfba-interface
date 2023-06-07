import url from '../../Constants/SimBBA_url.js';
import { GetActionCall, GetCall, PostCall } from '../simFBA/FetchHelper.js';

export default class BBADraftService {
    async GetDraftPageData(TeamID) {
        return await GetCall(`${url}nba/draft/page/${TeamID}`);
    }
}
