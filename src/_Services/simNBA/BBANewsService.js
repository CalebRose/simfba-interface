import url from '../../Constants/SimBBA_url';

export default class BBANewsService {
    async GetAllNewsLogsForASeason(season) {
        let json;
        let response = await fetch(url + 'cbb/news/all/' + season, {
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
