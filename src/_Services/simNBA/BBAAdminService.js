import url from '../../Constants/SimBBA_url';

export default class BBAAdminService {
    async GetCurrentTimestamp() {
        let json;
        let response = await fetch(url + 'simbba/get/timestamp/', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            json = await response.json();
        } else {
            alert(
                'Could not get necessary season data.\nHTTP-Error:',
                response.status
            );
        }

        return json;
    }

    async LockRecruiting() {
        let response = await fetch(url + 'admin/lock/recruiting', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (response.ok) {
            return true;
        } else {
            alert(
                'Could not successfully lock recruiting.\nHTTP-Error:',
                response.status
            );
            return false;
        }
    }

    async SyncRecruiting() {
        let response = await fetch(url + 'admin/recruiting/sync', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (response.ok) {
            return true;
        } else {
            alert(
                'Could not successfully sync recruiting.\nHTTP-Error:',
                response.status
            );
            return false;
        }
    }

    async ShowAGames() {
        let response = await fetch(url + 'admin/show/a', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (response.ok) {
            return true;
        } else {
            alert(
                'Could not successfully show A Games.\nHTTP-Error:',
                response.status
            );
            return false;
        }
    }

    async ShowBGames() {
        let response = await fetch(url + 'admin/show/a', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (response.ok) {
            return true;
        } else {
            alert(
                'Could not successfully show A Games.\nHTTP-Error:',
                response.status
            );
            return false;
        }
    }
}
