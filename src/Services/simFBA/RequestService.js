export default class RequestService {
    async GetRequests(url) {
        let res = await fetch(url + 'requests', {
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

    async ApproveRequest(url, payload) {
        let res = await fetch(url + 'requests/approve/' + payload.reqId, {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                reqId: payload.reqId
            })
        });
        return res;
    }

    async AssignTeam(url, payload) {
        let assignTeam = await fetch(url + 'teams/assign/' + payload.teamId, {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        });

        return assignTeam;
    }

    async RejectRequest(url, payload) {
        // DB Request
        let res = await fetch(url + 'request/reject', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify(payload)
        });
        return res;
    }

    async PostRequest(url, team, username) {
        let postRequest = await fetch(url + 'request/' + team.id, {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                teamId: team.id,
                username: username
            })
        });

        return postRequest;
    }

    async RevokeRequest(url, payload) {
        let res = await fetch(url + 'requests/revoke/' + payload.reqId, {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username: null,
                team: payload.team,
                mascot: payload.mascot,
                teamAbbr: payload.teamAbbr,
                reqId: payload.reqId
            })
        });
        return res;
    }
}
