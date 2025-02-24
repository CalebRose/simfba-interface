import url from '../../Constants/SimBBA_url';
import { GetCall, PostCall } from '../simFBA/FetchHelper';
export default class BBAPollService {
    async GetTeamDataForPollForm() {
        return await GetCall(`${url}`);
    }
    async GetSubmittedPoll(username) {
        return await GetCall(`${url}college/poll/submission/${username}`);
    }

    async GetOfficialPollData(seasonID) {
        return await GetCall(`${url}college/poll/official/season/${seasonID}`);
    }

    async SubmitPoll(dto) {
        return await PostCall(`${url}college/poll/create/`, dto);
    }
}
