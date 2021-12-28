import { saveAs } from 'file-saver';
import url from '../../Constants/url.js';

export default class FBAPlayerService {
    async GetPlayersByTeam(teamID) {
        let json;
        if (teamID > 0) {
            let response = await fetch(url + 'collegeplayers/team/' + teamID, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });

            if (response.ok) {
                json = await response.json();
            } else {
                alert('HTTP-Error:', response.status);
            }
        }
        return json;
    }

    async GetPlayersByTeamNoRedshirts(teamID) {
        let json;
        if (teamID > 0) {
            let response = await fetch(
                url + 'collegeplayers/team/nors/' + teamID,
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
        }
        return json;
    }

    async ExportRoster(teamID, teamName) {
        let json;
        if (teamID > 0) {
            let fullURL = url + 'collegeplayers/team/export/' + teamID;
            let response = await fetch(fullURL, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'text/csv'
                },
                responseType: 'blob'
            })
                .then((res) => res.blob())
                .then((blob) => saveAs(blob, `${teamName}.csv`));

            if (response.ok) {
                // let blob = response.blob();
                // saveAs(blob, 'export.csv');
            } else {
                alert('HTTP-Error:', response.status);
            }
        }
        return json;
    }
}
