export default class TeamService {
    async GetTeamByTeamId(url, id) {
        let response = await fetch(url + 'teams/team/' + id, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert('Http-Error: Individual Team Call', response.status);
        }
        return json[0];
    }

    async GetTeams(url) {
        let response = await fetch(url + 'teams/', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert('Http-Error: Get Teams ', response.status);
        }
        return json;
    }

    async GetCoachedTeams(url) {
        let res = await fetch(url + 'teams/coachedTeams', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        });
        let json;
        if (res.ok) {
            json = await res.json();
        } else {
            alert('HTTP-Error:', res.status);
        }

        return json;
    }
}
