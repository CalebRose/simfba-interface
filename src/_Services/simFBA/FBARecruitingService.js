import url from '../../Constants/url';

export default class FBARecruitingService {
    async GetTeamProfileForDashboard(id) {
        let json;
        let response = await fetch(url + 'recruiting/profile/dashboard/' + id, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            json = await response.json();
        } else {
            alert(
                'Could not grab Team Profile for Crooting.\nHTTP-Error:',
                response.status
            );
        }
        return json;
    }
    async GetTeamProfileForTeamboard(id) {
        let json;
        let response = await fetch(url + 'recruiting/profile/team/' + id, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            json = await response.json();
        } else {
            alert(
                'Could not grab Team Profile for Crooting.\nHTTP-Error:',
                response.status
            );
        }
        return json;
    }

    async GetOnlyTeamProfile(id) {
        let json;
        let response = await fetch(url + 'recruiting/profile/only/' + id, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            json = await response.json();
        } else {
            alert(
                'Could not grab Team Profile for Crooting.\nHTTP-Error:',
                response.status
            );
        }
        return json;
    }

    async GetRecruits() {
        let json;
        let response = await fetch(url + 'recruits/all/', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            json = await response.json();
        } else {
            alert(
                'Recruits Could Not be Acquired.\nHTTP-Error:',
                response.status
            );
        }
        return json;
    }

    async CreateRecruit(dto) {
        let response = await fetch(url + 'recruits/recruit/create', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto)
        });
        return response;
    }

    async CreateRecruitPlayerProfile(dto) {
        let response = await fetch(url + 'recruiting/addrecruit/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto)
        });

        if (response.ok) {
            console.log('Successfully added player to profile', dto.RecruitID);
        } else {
            throw (
                ('HTTP-Error: Could not add player to profile', response.status)
            );
        }

        return await response.json();
    }

    async ToggleScholarship(dto) {
        let response = await fetch(url + 'recruiting/toggleScholarship/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(dto)
        });

        if (response.ok) {
            console.log('Successfully modified scholarship status');
        } else {
            throw (
                ('HTTP-Error: Could not successfully toggle scholarship',
                response.status)
            );
        }
        return response;
    }

    async RemovePlayerFromBoard(dto) {
        let response = await fetch(url + 'recruiting/removecrootfromboard/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(dto)
        });
        if (response.ok) {
            console.log('Successfully removed recruit from team board');
        } else {
            throw (
                ('HTTP-Error: Could not successfully remove recruit from board',
                response.status)
            );
        }
        return response;
    }

    async SaveRecruitingBoard(dto) {
        let response = await fetch(url + 'recruiting/saverecruitingprofile/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(dto)
        });
        if (response.ok) {
            console.log('Successfully saved recruiting board!');
        } else {
            throw (
                ('HTTP-Error: Could not successfully save recruiting board',
                response.status)
            );
        }
        return response;
    }
}
