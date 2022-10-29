import url from '../../Constants/SimBBA_url';

export default class BBARecruitingService {
    async GetRecruitingProfile(teamId) {
        let response = await fetch(url + 'recruiting/profile/team/' + teamId, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert('HTTP-Error:', response.status);
        }
        return json;
    }

    async GetTeamProfileForDashboard(id) {
        let json;
        let response = await fetch(
            url + 'recruiting/profile/dashboard/' + id + '/',
            {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        );

        if (response.ok) {
            json = await response.json();
        } else {
            alert(
                'Could not grab Team Profile for Crooting.\nHTTP-Error:',
                response.status
            );
        }
        return json;
    }
    async GetTeamProfileForTeamboard(id) {
        let json;
        let response = await fetch(url + 'recruiting/profile/team/' + id, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            json = await response.json();
        } else {
            alert(
                'Could not grab Team Profile for Crooting.\nHTTP-Error:',
                response.status
            );
        }
        return json;
    }

    async GetRecruitsByProfileId(profileId) {
        let response = await fetch(url + 'recruit/croots/' + profileId, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            alert('HTTP-Error:', response.status);
        }
        return json;
    }

    async CreateRecruitingPointsProfile(payload) {
        let response = await fetch(
            url + 'recruit/createRecruitingPointsProfile',
            {
                headers: {
                    authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    ProfileId: payload.profileId,
                    PlayerId: payload.playerId,
                    SeasonId: payload.seasonId,
                    Team: payload.team
                })
            }
        );
        if (response.ok) {
            console.log('Successfully added player to profile:', payload.ID);
        } else {
            throw (
                ('HTTP-Error: Could not add player to profile', response.status)
            );
        }
    }

    async AllocateRecruitingPointsForRecruit(payload) {
        let response = await fetch(url + 'recruit/allocatePoints/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                RecruitPointsId: payload.profileId,
                ProfileId: payload.profileId,
                PlayerId: payload.playerId,
                SpentPoints: payload.spentPoints,
                RewardScholarship: payload.rewardScholarship,
                RevokeScholarship: payload.revokeScholarship
            })
        });
        return response;
    }

    async RemovePlayerFromBoard(payload) {
        let body = {
            RecruitPointsId: payload.ProfileID,
            ProfileId: payload.ProfileID,
            PlayerId: payload.PlayerID,
            SpentPoints: payload.CurrentPointsSpent,
            RewardScholarship: false,
            RevokeScholarship: false
        };
        let response = await fetch(url + 'recruit/removeRecruit', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(body)
        });
        if (response.ok) {
            //GREAT!
        } else {
            alert('HTTP-Error:', response.status);
        }
        return response;
    }

    async SendScholarshipToRecruit(payload) {
        let response = await fetch(url + 'recruit/sendScholarshipToRecruit', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                RecruitPointsId: payload.profileId,
                ProfileId: payload.profileId,
                PlayerId: payload.playerId,
                SpentPoints: payload.spentPoints,
                RewardScholarship: payload.rewardScholarship,
                RevokeScholarship: payload.revokeScholarship
            })
        });
        return response;
    }

    async RevokeScholarshipToRecruit(payload) {
        let response = await fetch(
            url + 'recruit/revokeScholarshipFromRecruit',
            {
                headers: {
                    authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    RecruitPointsId: payload.profileId,
                    ProfileId: payload.profileId,
                    PlayerId: payload.playerId,
                    SpentPoints: payload.spentPoints,
                    RewardScholarship: payload.rewardScholarship,
                    RevokeScholarship: payload.revokeScholarship
                })
            }
        );
        return response;
    }

    async SaveRecruitingBoard(payload) {
        let response = await fetch(url + 'recruit/saveRecruitingBoard', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(payload)
        });

        return response;
    }

    async ExportCroots() {
        let fullURL = url + 'recruits/export/all/';
        let response = await fetch(fullURL, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'text/csv'
            },
            responseType: 'blob'
        })
            .then((res) => res.blob())
            .then((blob) => saveAs(blob, `ezacos_secret_croot_list.csv`));

        if (response.ok) {
            // let blob = response.blob();
            // saveAs(blob, 'export.csv');
        } else {
            alert('HTTP-Error:', response.status);
        }
    }

    async GetAllTeamProfiles() {
        let json;
        let response = await fetch(url + 'recruiting/profile/all/', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            json = await response.json();
        } else {
            alert(
                'Recruiting Profiles Could Not be Acquired.\nHTTP-Error:',
                response.status
            );
        }
        return json;
    }
}
