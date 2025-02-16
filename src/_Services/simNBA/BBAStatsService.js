import { saveAs } from 'file-saver';
import url from '../../Constants/SimBBA_url';
import { GetCall } from '../simFBA/FetchHelper.js';

export default class BBAStatsService {
    async GetStatsPageData(league, seasonID, weekID, matchType, viewType) {
        return await GetCall(
            `${url}/stats/${league}/${seasonID}/${weekID}/${matchType}/${viewType}`
        );
    }

    async GetCollegeSeasonStatsByPlayerID(playerID, seasonID) {
        return await GetCall(
            `${url}/stats/player/${playerID}/season/${seasonID}`
        );
    }

    async ExportStats(
        league,
        seasonID,
        weekID,
        matchType,
        viewType,
        playerView
    ) {
        const fullURL = `${url}stats/export/${league}/${seasonID}/${weekID}/${matchType}/${viewType}/${playerView}`;
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
                    `babas_secret_${league}_${viewType}_${playerView}_stats_list.csv`
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
