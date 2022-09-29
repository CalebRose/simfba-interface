import url from '../../Constants/url.js';

export default class FBAScheduleService {
    async GetCollegeGamesByTeamAndSeason(TeamID, SeasonID) {
        let response = await fetch(
            url + `games/college/team/${TeamID}/${SeasonID}/`,
            {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        );
        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert('Http-Error', response.status);
        }
        return json;
    }

    async GetAllCollegeGamesInASeason(SeasonID) {
        let response = await fetch(url + `games/college/season/${SeasonID}/`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert('Http-Error', response.status);
        }
        return json;
    }
}
