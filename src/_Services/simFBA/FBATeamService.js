import url from '../../Constants/url.js';

export default class FBATeamService {
    async GetAllCollegeTeams() {
        let response = await fetch(url + 'teams/college/all', {
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

    async GetAllNFLTeams() {
        let response = await fetch(url + 'teams/nfl/all', {
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

    async GetAllActiveCollegeTeams() {
        let response = await fetch(url + 'teams/college/active', {
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

    async GetAvailableCollegeTeams() {
        let response = await fetch(url + 'teams/college/available', {
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

    async GetTeamByTeamId(teamID) {
        let response = await fetch(url + 'teams/college/team/' + teamID, {
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

    async GetNFLTeamByTeamID(teamID) {
        let response = await fetch(url + 'teams/nfl/team/' + teamID, {
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

    async GetTeamsByConference(conferenceID) {
        let response = await fetch(
            url + 'teams/college/conference/' + conferenceID,
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

    async GetTeamsByDivision(divisionID) {
        let response = await fetch(
            url + 'teams/college/division/' + divisionID,
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

    async GetTeamStandingsByConference(conferenceID, seasonID) {
        let response = await fetch(
            url + `standings/cfb/${conferenceID}/${seasonID}/`,
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

    async GetNFLTeamStandingsByDivision(divisionID, seasonID) {
        let response = await fetch(
            url + `standings/nfl/${divisionID}/${seasonID}/`,
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

    async GetHistoricalTeamStandingsByTeamID(teamID) {
        let response = await fetch(
            url + `standings/cfb/history/team/${teamID}/`,
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

    async GetAllCollegeStandingsBySeasonID(seasonID) {
        let response = await fetch(`${url}/standings/cfb/season/${seasonID}/`, {
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

    async GetNFLRosterData(teamID) {
        let response = await fetch(url + `teams/nfl/roster/${teamID}`, {
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
