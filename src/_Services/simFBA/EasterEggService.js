import config from '../../config';
import url from '../../Constants/url';

export default class EasterEggService {
    JSON_to_URLEncoded(element, key, list) {
        var list = list || [];
        if (typeof element == 'object') {
            for (var idx in element)
                JSON_to_URLEncoded(
                    element[idx],
                    key ? key + '[' + idx + ']' : idx,
                    list
                );
        } else {
            list.push(key + '=' + encodeURIComponent(element));
        }
        return list.join('&');
    }

    encodeParams(details) {
        let formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        return formBody;
    }

    async CollusionCall(dto) {
        // const body = this.encodeParams(params);
        // const response = await fetch(
        //     'https://cors-anywhere.herokuapp.com/https://www.simfba.com/index.php?api/threads/',
        //     {
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //             'XF-Api-Key': config.simFBAKey,
        //             'XF-Api-User': config.simFBAUser
        //         },
        //         method: 'POST',
        //         body: body,
        //     }
        // );
        let postRequest = await fetch(url + 'easter/egg/collude/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                user: dto.username.toUpperCase(),
                team: dto.Team,
                mascot: dto.Mascot
            })
        });

        return postRequest;
        if (response.ok) {
            console.log('Check the site you cheat!');
        } else {
            alert('Nice try :(');
        }
    }
}
