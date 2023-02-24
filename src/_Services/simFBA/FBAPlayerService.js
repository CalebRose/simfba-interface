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

    async GetNFLPlayersForDepthChartPage(teamID) {
        let json;
        if (teamID > 0) {
            let response = await fetch(`${url}nflplayers/team/${teamID}`, {
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

    async AssignRedshirt(dto) {
        let response = await fetch(url + 'collegeplayers/assign/redshirt/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto)
        });

        if (response.ok) {
            console.log('Successfully added redshirt to player', dto.PlayerID);
        } else {
            throw (
                ('HTTP-Error: Could not add redshirt to player',
                response.status)
            );
        }
        return true;
    }

    async CutNFLPlayerFromRoster(PlayerID) {
        let response = await fetch(`${url}nflplayers/cut/player/${PlayerID}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (response.ok) {
            return response;
        } else {
            alert('HTTP-Error:', response.status);
            return false;
        }
    }

    async GetFreeAgencyData(TeamID) {
        let json;
        let response = await fetch(
            `${url}nflplayers/freeagency/available/${TeamID}`,
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

    async CancelFAOffer(dto) {
        let response = await fetch(url + 'nfl/freeagency/create/offer', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto)
        });
        return response;
    }

    async CancelFAOffer(dto) {
        let response = await fetch(url + 'nfl/freeagency/cancel/offer', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto)
        });
        if (response.ok) {
            return await response.json();
        } else {
            alert('HTTP-Error:', response.status);
            return false;
        }
    }
}
