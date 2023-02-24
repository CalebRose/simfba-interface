import url from '../../Constants/url.js';

export default class FBAGameplanService {
    async GetGameplanByTeamID(TeamID) {
        let json;
        if (TeamID > 0) {
            let response = await fetch(
                url + 'gameplan/college/team/' + TeamID,
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

    async SaveGameplan(dto) {
        let response = await fetch(url + 'gameplan/college/updategameplan', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto)
        });
        return response;
    }

    async GetNFLGameplanByTeamID(TeamID) {
        let json;
        if (TeamID > 0) {
            let response = await fetch(url + 'gameplan/nfl/team/' + TeamID, {
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

    async SaveNFLGameplan(dto) {
        let response = await fetch(url + 'gameplan/nfl/updategameplan', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto)
        });
        return response;
    }
}
