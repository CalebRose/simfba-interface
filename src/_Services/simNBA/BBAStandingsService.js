import url from '../../Constants/SimBBA_url';

export default class BBAStandingsService {
    async GetAllConferenceStandings(seasonID) {
        let response = await fetch(
            `${url}/standings/college/season/${seasonID}/`,
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
            alert('HTTP-Error:', response.status);
        }
        return json;
    }
}
