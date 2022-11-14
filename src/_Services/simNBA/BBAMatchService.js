import url from '../../Constants/SimBBA_url';

export default class BBAMatchService {
    async GetMatchesByWeek(week) {
        let response = await fetch(`${url}/match/week/${week}/`, {
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

    async GetMatchesBySeason(seasonID) {
        let response = await fetch(`${url}/match/season/${seasonID}/`, {
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

    async GetMatchResultData(id) {
        let response = await fetch(`${url}/match/result/${id}/`, {
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
