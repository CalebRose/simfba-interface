import url from '../../Constants/SimBBA_url.js';
import { GetActionCall, GetCall, PostCall } from '../simFBA/FetchHelper.js';

export default class BBADraftService {
    async GetDraftPageData(TeamID) {
        return await GetCall(`${url}nba/draft/page/${TeamID}`);
    }

    async CreateScoutingProfile(dto) {
        return await PostCall(`${url}nba/draft/create/scoutprofile`, dto);
    }

    async RevealAttribute(dto) {
        return await PostCall(`${url}nba/draft/reveal/attribute`, dto);
    }

    async RemovePlayerFromBoard(id) {
        return await GetActionCall(`${url}nba/draft/remove/${id}`);
    }

    async DraftPlayer(dto) {
        return await PostCall(`${url}nba/draft/player/`, dto);
    }

    async GetScoutingData(id) {
        return await GetCall(`${url}nba/draft/scout/${id}`);
    }
}
