export default class BBAGameplanService {
    async GetGameplans(url, teamId) {
        let response = await fetch(url + 'gameplans/' + teamId, {
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

    async SaveGameplanOptions(url, dto) {
        let response = await fetch(url + 'gameplans/update', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(dto)
        });
        return response;
    }
}
