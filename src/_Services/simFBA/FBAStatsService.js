import url from '../../Constants/url';

export default class FBAStatsService {
    async GetStatsForStatisticsPage(season, week, viewType) {
        let json;
        let response = await fetch(
            `${url}statistics/interface/cfb/${season}/${week}/${viewType}`,
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

    async GetNFLStatsForStatisticsPage(season, week, viewType) {
        let json;
        let response = await fetch(
            `${url}statistics/interface/nfl/${season}/${week}/${viewType}`,
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
