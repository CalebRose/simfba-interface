import url from '../../Constants/SimBBA_url';
export default class BBAPlayerService {
    async GetPlayerByPlayerId(playerId) {
        let response = await fetch(url + 'GetPlayer/' + playerId, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert('HTTP-Error:', response.status);
        }
        return json;
    }

    async GetPlayersByTeam(teamId) {
        let json;
        if (teamId > 0) {
            let response = await fetch(url + 'players/' + teamId, {
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

    async GetAllCollegePlayers() {
        let response = await fetch(url + 'players/college', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert('HTTP-Error:', response.status);
        }
        return json;
    }

    async GetRecruits() {
        let response = await fetch(url + 'players/college/recruits', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert('HTTP-Error:', response.status);
        }
        return json;
    }

    async GetAllNBAPlayers() {
        let response = await fetch(url + 'players/nba', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert('HTTP-Error:', response.status);
        }
        return json;
    }

    async GetAllNBAFreeAgents() {
        let response = await fetch(url + 'players/nba/freeAgents', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert('HTTP-Error:', response.status);
        }
        return json;
    }
}
