import url from '../../Constants/SimBBA_url';

export default class BBAAdminService {
    async GetCurrentTimestamp() {
        let json;
        let response = await fetch(url + 'simbba/get/timestamp/', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            json = await response.json();
        } else {
            alert(
                'Could not get necessary season data.\nHTTP-Error:',
                response.status
            );
        }

        return json;
    }
}
