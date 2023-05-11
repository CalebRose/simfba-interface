import url from '../../Constants/url';
import { GetCall } from './FetchHelper';

export default class FBALandingPageService {
    async GetNewsLogs(week, season) {
        return await GetCall(`${url}news/${week}/${season}`);
    }

    async GetAllNewsLogsForACfbSeason(cfbSeason) {
        //this uses GetCall function from FetchHelper file to return news for a CFB season
        return GetCall(`${url}cfb/news/all/`);
        //Ignore code below as created selected season
        // let json;
        // let response = await fetch(url + 'cfb/news/all/' + season, {
        //     headers: {
        //         authorization: 'Bearer ' + localStorage.getItem('token')
        //     }
        // });

        // if (response.ok) {
        //     json = await response.json();
        // } else {
        //     alert('HTTP-Error:', response.status);
        // }
        // return json;
    }

    async GetAllNewsLogsForANflSeason(nflSeason) {
        //this uses GetCall function from FetchHelper file to return news for a NFL season
        return GetCall(`${url}nfl/news/all/`);
    }

    async GetWeeksInSeason(season, currentWeek) {
        return await GetCall(`${url}season/${season}/weeks/${currentWeek}`);
    }

    async GetNFLWeeksInSeason(season, currentWeek) {
        return await GetCall(`${url}nfl/season/${season}/weeks/${currentWeek}`);
    }
}
