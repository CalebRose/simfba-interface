import { saveAs } from 'file-saver';
import url from '../../Constants/url';

export default class FBAStatsService {
    async GetStatsForStatisticsPage(league, season, week, viewType) {
        let json;
        let response = await fetch(
            `${url}statistics/interface/${league}/${season}/${week}/${viewType}`,
            {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        );
        if (response.ok) {
            json = await response.json();
        } else {
            alert('HTTP-Error:', response.status);
        }

        return json;
    }

    async ExportStatsForStatsPage(
        league,
        seasonID,
        season,
        weekID,
        week,
        viewType
    ) {
        let fullURL = `${url}statistics/export/${league}/${seasonID}/${weekID}/${viewType}`;
        let res = await fetch(fullURL, {
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
                    `toucans_${season}_${
                        viewType !== 'SEASON' ? `${week}_` : ''
                    }${viewType}_stats.csv`
                )
            );
        if (res.ok) {
        } else {
            alert('HTTP-Error:', res.status);
        }
    }

    async GetCollegeSeasonStatsByPlayerID(playerID, seasonID) {
        return await GetCall(
            `${url}/stats/player/${playerID}/season/${seasonID}`
        );
    }

    async GetHeismanList() {
        let json;
        let response = await fetch(url + 'collegeplayers/heisman/', {
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
