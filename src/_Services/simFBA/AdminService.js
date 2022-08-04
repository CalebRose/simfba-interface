import url from '../../Constants/url';
export default class AdminService {
    async GetCurrentTimestamp() {
        let json;
        let response = await fetch(url + 'simfba/get/timestamp/', {
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

    async SyncTimestamp(dto) {
        let response = await fetch(url + 'simfba/sync/timestamp/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto)
        });
        if (response.ok) {
            console.log('Timestamp Updated!');
        } else {
            throw (
                ('HTTP-Error: Could not successfully save Timestamp',
                response.status)
            );
        }
        return await response.json();
    }
}
