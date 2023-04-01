import url from '../../Constants/SimBBA_url';
import { GetCall } from '../simFBA/FetchHelper';

export default class BBANewsService {
    async GetAllNewsLogsForACbbSeason(cbbSeason) {
        //this uses GetCall function from FetchHelper file to return news for a CBB season
        return GetCall(`${url}cbb/news/all/`);
        //Ignore code below as created selected season
        // let json;
        // let response = await fetch(url + 'cbb/news/all/' + season, {
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

    async GetAllNewsLogsForANbaSeason(nbaSeason) {
        //this uses GetCall function from FetchHelper file to return news for a NBA season
        return GetCall(`${url}nba/news/all/`);
    }
}
