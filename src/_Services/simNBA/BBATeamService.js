export default class BBATeamService {
    async GetTeams(url) {
        let response = await fetch(url + 'teams', {
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

    async GetActiveTeams(url) {
        let response = await fetch(url + 'teams/active', {
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

    async GetActiveCollegeTeams(url) {
        let response = await fetch(url + 'teams/active/college', {
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

    async GetAvailableTeams(url) {
        let response = await fetch(url + 'teams/available', {
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

    async GetCoachedTeams(url) {
        let response = await fetch(url + 'teams/coached', {
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

    async GetCollegeTeams(url) {
        let response = await fetch(url + 'teams/college', {
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

    async GetNBATeams(url) {
        let response = await fetch(url + 'teams/nba', {
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

    async GetTeamByTeamId(url, teamId) {
        let response = await fetch(url + 'team/' + teamId, {
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
