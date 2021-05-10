export default class BBARecruitingService {
    async GetRecruitingProfile(url, teamId) {
        let response = await fetch(url + '/recruit/profile/' + teamId, {
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

    async GetRecruitsByProfileId(url, profileId) {
        let response = await fetch(url + '/recruit/croots/' + profileId, {
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

    async CreateRecruitingPointsProfile(url, payload) {
        let response = await fetch(
            url + '/recruit/croots/' + payload.profileId,
            {
                headers: {
                    authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    ProfileId: payload.profileId,
                    PlayerId: payload.playerId,
                    SeasonId: payload.seasonId
                })
            }
        );
        return response;
    }

    async AllocateRecruitingPointsForRecruit(url, payload) {
        let response = await fetch(url + '/recruit/allocatePoints/', {
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

    async SendScholarshipToRecruit(url, payload) {
        let response = await fetch(url + '/recruit/sendScholarshipToRecruit', {
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

    async RevokeScholarshipToRecruit(url, payload) {
        let response = await fetch(
            url + '/recruit/revokeScholarshipFromRecruit',
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
}
