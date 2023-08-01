import url from '../../Constants/SimBBA_url';
import { GetCall, PostCall } from '../simFBA/FetchHelper';

export default class BBAGameplanService {
    async GetCBBGameplan(teamId) {
        return await GetCall(`${url}cbb/gameplans/${teamId}`);
    }

    async GetNBAGameplan(teamId) {
        return await GetCall(`${url}nba/gameplans/${teamId}`);
    }

    async SaveGameplanOptions(dto, league) {
        return await PostCall(`${url}${league}/gameplans/update`, dto);
    }
}
