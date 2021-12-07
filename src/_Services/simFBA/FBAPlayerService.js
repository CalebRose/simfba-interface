import url from '../../Constants/url.js';

export default class FBAPlayerService {
    async GetPlayersByTeam(teamID) {
        let json;
        if (teamID > 0) {
            let response = await fetch(url + 'collegeplayers/team/' + teamID, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });

            if (response.ok) {
                json = await response.json();
            } else {
                alert('HTTP-Error:', response.status);
            }
        }
        return json;
    }

    async GetPlayersByTeamNoRedshirts(teamID) {
        let json;
        if (teamID > 0) {
            let response = await fetch(
                url + 'collegeplayers/team/nors/' + teamID,
                {
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
            );

            if (response.ok) {
                json = await response.json();
            } else {
                alert('HTTP-Error:', response.status);
            }
        }
        return json;
    }
}
