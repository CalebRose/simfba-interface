import url from '../../Constants/url';

export default class FBALandingPageService {
    async GetNewsLogs(week, season) {
        let json;
        let response = await fetch(url + 'news/' + week + '/' + season, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            json = await response.json();
        } else {
            alert('HTTP-Error:', response.status);
        }
        return json;
    }
}
