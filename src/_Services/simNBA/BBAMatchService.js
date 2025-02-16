import url from '../../Constants/SimBBA_url';
import { GetCall } from '../simFBA/FetchHelper';

export default class BBAMatchService {
    async GetCBBMatchesByTeamAndSeason(TeamID, SeasonID) {
        return await GetCall(`${url}match/team/${TeamID}/season/${SeasonID}/`);
    }
    async GetNBAMatchesByTeamAndSeason(TeamID, SeasonID) {
        return await GetCall(
            `${url}nba/match/team/${TeamID}/season/${SeasonID}/`
        );
    }
    async GetMatchesByWeek(week) {
        return await GetCall(`${url}/match/week/${week}/`);
    }

    async GetMatchesBySeason(seasonID) {
        return await GetCall(`${url}/match/season/${seasonID}/`);
    }

    async GetMatchResultData(id) {
        return await GetCall(`${url}/match/result/cbb/${id}/`);
    }
    async GetNBAMatchResultData(id) {
        return await GetCall(`${url}/match/result/nba/${id}/`);
    }
    async ExportResults(seasonID, weekID, nbaWeekID, matchType, selectedWeek) {
        const fullURL = `${url}match/export/results/${seasonID}/${weekID}/${nbaWeekID}/${matchType}`;
        const response = await fetch(fullURL, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'text/csv'
            },
            responseType: 'blob'
        })
            .then((res) => res.blob())
            .then((blob) =>
                saveAs(
                    blob,
                    `wahoos_secret_${selectedWeek}${matchType}_results_list.csv`
                )
            );

        if (response.ok) {
            // let blob = response.blob();
            // saveAs(blob, 'export.csv');
        } else {
            alert('HTTP-Error:', response.status);
        }
    }
}
