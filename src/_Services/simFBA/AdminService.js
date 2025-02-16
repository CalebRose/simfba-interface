import BBAURL from '../../Constants/SimBBA_url';
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

    async SyncAIRecruitingBoards() {
        return await GetActionCall(`${url}admin/ai/sync/boards`);
    }

    async UpdateAIDepthCharts() {
        return await GetActionCall(
            `${url}gameplan/college/depthchart/ai/update/`
        );
    }

    async MassUpdateAIDepthCharts(off, def) {
        return await GetActionCall(`${url}simfba/mass/${off}/${def}/`);
    }

    async RunCron() {
        return await GetActionCall(`${url}simfba/run/cron`);
    }

    async GetInbox(league, collegeId, profID) {
        let apiUrl = url;
        if (league === 'bba') {
            apiUrl = BBAURL;
        }
        return await GetCall(
            `${apiUrl}${league}/inbox/get/${collegeId}/${profID}`
        );
    }

    async ToggleNotification(ID, league) {
        let apiUrl = url;
        if (league === 'CBB' || league === 'NBA') {
            apiUrl = BBAURL;
        }
        return await GetCall(`${apiUrl}notification/toggle/${ID}`);
    }

    async DeleteNotification(ID, league) {
        let apiUrl = url;
        if (league === 'CBB' || league === 'NBA') {
            apiUrl = BBAURL;
        }
        return await GetCall(`${apiUrl}notification/delete/${ID}`);
    }
}
