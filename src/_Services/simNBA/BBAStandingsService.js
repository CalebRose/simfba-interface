import url from '../../Constants/SimBBA_url';
import { GetCall } from '../simFBA/FetchHelper';

export default class BBAStandingsService {
    async GetAllConferenceStandings(seasonID) {
        return await GetCall(`${url}standings/college/season/${seasonID}`);
    }
}
