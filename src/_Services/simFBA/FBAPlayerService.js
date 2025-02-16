import { saveAs } from 'file-saver';
import url from '../../Constants/url.js';
import { GetActionCall, GetCall, PostCall } from './FetchHelper.js';

export default class FBAPlayerService {
    async GetCFBRosterDataByTeamID(teamID) {
        return await GetCall(`${url}collegeplayers/team/${teamID}`);
    }

    async GetPlayersByTeamNoRedshirts(teamID) {
        return await GetCall(`${url}collegeplayers/team/nors/${teamID}`);
    }

    async GetNFLPlayersForDepthChartPage(teamID) {
        return await GetCall(`${url}nflplayers/team/${teamID}`);
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

    async ExportNFLRoster(teamID, teamName) {
        let json;
        if (teamID > 0) {
            let response = await fetch(
                `${url}nflplayers/team/export/${teamID}`,
                {
                    headers: {
                        authorization:
                            'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'text/csv'
                    },
                    responseType: 'blob'
                }
            )
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

    async AssignRedshirt(playerID) {
        return await GetActionCall(
            `${url}collegeplayers/assign/redshirt/${playerID}`
        );
    }

    async CutNFLPlayerFromRoster(PlayerID) {
        return await GetCall(`${url}nflplayers/cut/player/${PlayerID}`);
    }

    async PlaceNFLPlayerOnPracticeSquad(PlayerID) {
        return await GetCall(`${url}nflplayers/place/player/squad/${PlayerID}`);
    }

    async PlaceNFLPlayerOnInjuryReserve(PlayerID) {
        return await GetCall(
            `${url}nflplayers/injury/reserve/player/${PlayerID}`
        );
    }

    async GetInjuryData() {
        return await GetCall(`${url}statistics/injured/players/`);
    }

    async GetFreeAgencyData(TeamID) {
        return await GetCall(`${url}nflplayers/freeagency/available/${TeamID}`);
    }

    async CreateFAOffer(dto) {
        return await PostCall(`${url}nfl/freeagency/create/offer`, dto);
    }

    async CancelFAOffer(dto) {
        return await PostCall(`${url}nfl/freeagency/cancel/offer`, dto);
    }

    async CreateWaiverOffer(dto) {
        return await PostCall(`${url}nfl/waiverwire/create/offer`, dto);
    }

    async CancelWaiverOffer(dto) {
        return await PostCall(`${url}nfl/waiverwire/cancel/offer`, dto);
    }

    async CreateExtensionOffer(dto) {
        return await PostCall(`${url}nfl/extension/create/offer`, dto);
    }

    async CancelExtensionOffer(dto) {
        return await PostCall(`${url}nfl/extension/cancel/offer`, dto);
    }

    async CutCFBPlayerFromRoster(playerID) {
        return await GetActionCall(
            `${url}collegeplayers/cut/player/${playerID.toString()}`
        );
    }

    async TagPlayer(dto) {
        return await PostCall(`${url}nflplayers/tag/player/`, dto);
    }
}
