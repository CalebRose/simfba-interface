import url from '../../Constants/url.js';

export default class FBARequestService {
    async GetRequests() {
        let res = await fetch(url + 'requests/all/', {
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

    async ApproveRequest(payload) {
        let res = await fetch(url + 'requests/approve/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                ID: payload.reqId,
                TeamID: payload.teamId,
                Username: payload.username,
                IsApproved: true
            })
        });
        return res;
    }

    async AssignTeam(payload) {
        let assignTeam = await fetch(url + 'teams/assign/' + payload.teamId, {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                TeamID: payload.TeamID,
                Username: payload.Username,
                IsApproved: true
            })
        });

        return assignTeam;
    }

    async CreateTeamRequest(team, username) {
        let postRequest = await fetch(url + 'requests/create/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                TeamID: team.id,
                Username: username,
                IsApproved: false
            })
        });

        return postRequest;
    }

    async RejectRequest(payload) {
        // DB Request
        let res = await fetch(url + 'requests/reject/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({
                ID: payload.ID,
                TeamID: payload.ReqID,
                Username: payload.Username,
                IsApproved: true
            })
        });
        return res;
    }

    async RemoveUserFromTeamRequest(teamID) {
        let res = await fetch(url + 'requests/remove/' + teamID, {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
        return res;
    }
}
