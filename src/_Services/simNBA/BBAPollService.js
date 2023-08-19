import url from '../../Constants/SimBBA_url';
import { GetCall, PostCall } from '../simFBA/FetchHelper';
export default class BBAPollService {
    async GetTeamDataForPollForm() {
        return await GetCall(`${url}`);
    }
}
