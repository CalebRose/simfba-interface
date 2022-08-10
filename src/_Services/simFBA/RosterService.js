export default class RosterService {
    async GetRoster(url, teamId) {
        let response = await fetch(url + '/roster/' + teamId, {
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
