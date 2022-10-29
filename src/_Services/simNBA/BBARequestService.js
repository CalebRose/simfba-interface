import url from '../../Constants/SimBBA_url';

export default class BBARequestService {
    async GetTeamRequests() {
        let res = await fetch(url + 'requests/', {
            headers: {}
        });

        let requests;
        if (res.ok) {
            requests = await res.json();
        } else {
            alert('HTTP-Error:', res.status);
        }

        return requests;
    }

    async CreateTeamRequest(team, username) {
        let postRequest = await fetch(url + 'requests/createTeamRequest', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                TeamID: team.teamId,
                Username: username,
                IsApproved: false
            })
        });

        return postRequest;
    }

    async ApproveRequest(payload) {
        let res = await fetch(url + 'requests/approveTeamRequest', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(payload)
        });
        return res;
    }

    async RejectTeamRequest(payload) {
        let res = await fetch(url + 'requests/rejectTeamRequest', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify(payload)
        });
        return res;
    }

    async RevokeUserFromTeamRequest(teamId) {
        let res = await fetch(url + 'team/removeUserFromTeam/' + teamId, {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
        return res;
    }
}
