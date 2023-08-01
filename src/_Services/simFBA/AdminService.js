import url from '../../Constants/url';
import { GetActionCall, GetCall } from './FetchHelper';
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

    async SyncOffseasonFreeAgency() {
        return await GetActionCall(`${url}simfba/sync/freeagency/round`);
    }

    async SyncTimeslot(timeslot) {
        return await GetActionCall(`${url}simfba/sync/timeslot/${timeslot}`);
    }

    async SyncWeek() {
        return await GetActionCall(`${url}simfba/sync/week/`);
    }

    async RunTheGames() {
        return await GetActionCall(`${url}admin/run/the/games/`);
    }
}
