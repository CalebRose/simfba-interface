import url from '../../Constants/url.js';
import { GetActionCall, GetCall, PostCall } from '../simFBA/FetchHelper.js';

export default class FBADraftService {
    async GetDraftPageData(TeamID) {
        return await GetCall(`${url}nfl/draft/page/${TeamID}`);
    }

    async CreateScoutingProfile(dto) {
        return await PostCall(`${url}nfl/draft/create/scoutprofile`, dto);
    }

    async RevealAttribute(dto) {
        return await PostCall(`${url}nfl/draft/reveal/attribute`, dto);
    }

    async RemovePlayerFromBoard(id) {
        return await GetActionCall(`${url}nfl/draft/remove/${id}`);
    }

    async DraftPlayer(dto) {
        return await PostCall(`${url}nfl/draft/player/`, dto);
    }

    async GetScoutingData(id) {
        return await GetCall(`${url}nfl/draft/scout/${id}`);
    }

    async ExportPlayers(dto) {
        return await PostCall(`${url}nfl/draft/export/picks`, dto);
    }
}
