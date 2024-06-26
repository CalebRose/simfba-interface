import url from '../../Constants/url.js';
import { GetCall, PostCall } from './FetchHelper.js';

export default class FBAScheduleService {
    async GetCollegeGamesByTeamAndSeason(TeamID, SeasonID) {
        return await GetCall(`${url}games/college/team/${TeamID}/${SeasonID}/`);
    }

    async GetNFLGamesByTeamAndSeason(TeamID, SeasonID) {
        return await GetCall(`${url}games/nfl/team/${TeamID}/${SeasonID}/`);
    }

    async GetAllCollegeGamesInASeason(SeasonID) {
        return await GetCall(`${url}games/college/season/${SeasonID}/`);
    }

    async GetAllNFLGamesInASeason(SeasonID) {
        return await GetCall(`${url}games/nfl/season/${SeasonID}/`);
    }

    async UpdateTimeslot(dto) {
        await fetch(`${url}games/update/time/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            // mode: 'cors',
            body: JSON.stringify(dto)
        });
    }

    async GetCFBGameResultData(id) {
        return await GetCall(`${url}/games/result/cfb/${id}/`);
    }
    async GetNFLGameResultData(id) {
        return await GetCall(`${url}/games/result/nfl/${id}/`);
    }

    async ExportPlayByPlay(isNFL, id, ht, at) {
        const prefix = isNFL ? 'nfl' : 'cfb';
        let fullURL = `${url}statistics/${prefix}/export/play/by/play/${id}`;
        let response = await fetch(fullURL, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'text/csv'
            },
            responseType: 'blob'
        })
            .then((res) => res.blob())
            .then((blob) =>
                saveAs(blob, `${id}_${ht}_vs_${at}_play_by_play.csv`)
            );

        if (response.ok) {
            // let blob = response.blob();
            // saveAs(blob, 'export.csv');
        } else {
            alert('HTTP-Error:', response.status);
        }
    }

    async ExportResults(seasonID, weekID, nflWeekID, timeslot, selectedWeek) {
        const fullURL = `${url}games/export/results/${seasonID}/${weekID}/${nflWeekID}/${timeslot}`;
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
                    `wahoos_secret_${selectedWeek}${timeslot}_results_list.csv`
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
