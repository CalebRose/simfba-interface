import url from '../../Constants/url';
import { GetCall, PostCall } from '../simFBA/FetchHelper';
export default class FBAPollService {
    async GetTeamDataForPollForm() {
        return await GetCall(`${url}`);
    }
}
