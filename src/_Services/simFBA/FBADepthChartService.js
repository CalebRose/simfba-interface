import url from '../../Constants/url';

//
export default class FBADepthChartService {
    async GetDepthChartByTeamID(TeamID) {
        let json;
        if (TeamID > 0) {
            let response = await fetch(
                url + 'gameplan/college/depthchart/' + TeamID,
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

    async SaveDepthChart(DTO) {
        let response = await fetch(url + 'gameplan/college/updatedepthchart', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(DTO)
        });
        return response;
    }
}
