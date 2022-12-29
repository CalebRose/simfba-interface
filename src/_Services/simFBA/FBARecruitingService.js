import url from '../../Constants/url';

export default class FBARecruitingService {
    async GetTeamProfileForDashboard(id) {
        let json;
        let response = await fetch(
            `${url}recruiting/overview/dashboard/${id}/`,
            {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            }
        );

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

    async GetAllTeamProfiles() {
        let json;
        let response = await fetch(url + 'recruiting/profile/all/', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            json = await response.json();
        } else {
            alert(
                'Recruiting Profiles Could Not be Acquired.\nHTTP-Error:',
                response.status
            );
        }
        return json;
    }

    async GetRecruits() {
        let json;
        let response = await fetch(url + 'recruits/all', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            const string = await response.text();
            json = string === '' ? {} : JSON.parse(string);
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
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto),
            mode: 'cors'
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
        let response = await fetch(url + 'recruiting/savecrootboard/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto),
            mode: 'cors'
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

    async ExportCroots() {
        let fullURL = url + 'recruits/export/all/';
        let response = await fetch(fullURL, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'text/csv'
            },
            responseType: 'blob'
        })
            .then((res) => res.blob())
            .then((blob) => saveAs(blob, `tsweezyscroots.csv`));

        if (response.ok) {
            // let blob = response.blob();
            // saveAs(blob, 'export.csv');
        } else {
            alert('HTTP-Error:', response.status);
        }
    }
}
