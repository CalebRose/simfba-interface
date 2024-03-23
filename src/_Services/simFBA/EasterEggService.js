import config from '../../config';
import BBAUrl from '../../Constants/SimBBA_url';
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

    async CollusionCall(isCFB, dto) {
        const u = isCFB ? url : BBAUrl;
        const fullURL = isCFB
            ? `${u}easter/egg/collude`
            : `${u}cbb/easter/egg/collude/`;
        let postRequest = await fetch(fullURL, {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto)
        });

        if (postRequest.ok) {
            console.log('Check the site you cheat!');
        } else {
            alert('Nice try :(');
        }
    }

    async CollusionCallBBall(dto) {
        let postRequest = await fetch(BBAUrl + 'cbb/easter/egg/collude/', {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dto)
        });

        if (postRequest.ok) {
            console.log('Check the site you cheat!');
        } else {
            alert('Nice try :(');
        }
    }
}
