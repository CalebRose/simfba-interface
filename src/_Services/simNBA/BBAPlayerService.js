import BBAURL from '../../Constants/SimBBA_url';
import { GetCall, PostCall } from '../simFBA/FetchHelper';
export default class BBAPlayerService {
    async GetPlayerByPlayerId(playerId) {
        return await GetCall(`${BBAURL}GetPlayer/${playerId}`);
    }

    async GetPlayersByTeam(teamId) {
        let json;
        if (teamId > 0) {
            return await GetCall(`${BBAURL}players/${teamId}`);
        }
        return json;
    }

    async GetAllCollegePlayers() {
        return await GetCall(`${BBAURL}players/college`);
    }

    async GetRecruits() {
        return await GetCall(`${BBAURL}players/college/recruits`);
    }

    async GetAllNBAPlayers() {
        return await GetCall(`${BBAURL}players/nba`);
    }

    async GetAllNBAFreeAgents() {
        return await GetCall(`${BBAURL}players/nba/freeAgents`);
    }

    async AssignRedshirt(payload) {
        return await PostCall(`${BBAURL}cbb/player/assign/redshirt/`, payload);
    }

    async GetNBARosterByTeamID(teamID) {
        return await GetCall(`${BBAURL}nba/players/${teamID}`);
    }

    async GetFreeAgencyData(teamID) {
        return await GetCall(`${BBAURL}nba/freeagency/available/${teamID}`);
    }

    async CreateFAOffer(dto) {
        return await PostCall(`${BBAURL}nba/freeagency/create/offer`, dto);
    }

    async CancelFAOffer(dto) {
        return await PostCall(`${BBAURL}nba/freeagency/cancel/offer`, dto);
    }

    async CreateWaiverOffer(dto) {
        return await PostCall(`${BBAURL}nba/freeagency/create/waiver`, dto);
    }

    async CancelWaiverOffer(dto) {
        return await PostCall(`${BBAURL}nba/freeagency/cancel/waiver`, dto);
    }

    async CreateExtensionOffer(dto) {
        return await PostCall(`${BBAURL}nba/extension/create/offer`, dto);
    }

    async CancelExtensionOffer(dto) {
        return await PostCall(`${BBAURL}nba/extension/cancel/offer`, dto);
    }

    async ActivatePlayerOption(id) {
        return await GetCall(`${BBAURL}nba/players/activate/option/${id}`);
    }

    async PlaceNBAPlayerInGLeague(playerID) {
        return await GetCall(`${BBAURL}nba/players/place/gleague/${playerID}`);
    }

    async AssignPlayerAsTwoWay(playerID) {
        return await GetCall(`${BBAURL}nba/players/place/twoway/${playerID}`);
    }

    async CutCBBPlayerFromRoster(playerID) {
        return await GetCall(`${BBAURL}cbb/players/cut/${playerID}`);
    }

    async CutNBAPlayerFromRoster(playerID) {
        return await GetCall(`${BBAURL}nba/players/cut/${playerID}`);
    }

    async ExportRoster(teamID, teamName) {
        let json;
        if (teamID > 0) {
            let fullURL = `${BBAURL}export/cbb/team/${teamID}`;
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
                alert('Export Complete');
            } else {
                alert('HTTP-Error:', response.status);
            }
        }
        return json;
    }

    async ExportNBARoster(teamID, teamName) {
        let json;
        if (teamID > 0) {
            let fullURL = `${BBAURL}export/nba/team/${teamID}`;
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
                alert('Export Complete');
            } else {
                alert('HTTP-Error:', response.status);
            }
        }
        return json;
    }
}
