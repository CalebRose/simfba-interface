import url from '../../Constants/url.js';
import { GetCall, PostCall } from './FetchHelper.js';

export default class FBAScheduleService {
    async GetCollegeGamesByTeamAndSeason(TeamID, SeasonID) {
        return await GetCall(`${url}games/college/team/${TeamID}/${SeasonID}/`);
    }

    async GetNFLGamesByTeamAndSeason(TeamID, SeasonID) {
        return await GetCall(`${url}games/nfl/team/${TeamID}/${SeasonID}/`);
    }

    async GetAllCollegeGamesInASeason(SeasonID) {
        return await GetCall(`${url}games/college/season/${SeasonID}/`);
    }

    async GetAllNFLGamesInASeason(SeasonID) {
        return await GetCall(`${url}games/nfl/season/${SeasonID}/`);
    }

    async UpdateTimeslot(dto) {
        await fetch(`${url}games/update/time/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            // mode: 'cors',
            body: JSON.stringify(dto)
        });
    }

    async GetCFBGameResultData(id) {
        return await GetCall(`${url}/games/result/cfb/${id}/`);
    }
    async GetNFLGameResultData(id) {
        return await GetCall(`${url}/games/result/nfl/${id}/`);
    }
}
