export default class LocalStorageService {
    getRecruitingProfile() {
        return JSON.parse(localStorage.getItem('croots'));
    }

    setRecruitingProfile(payload) {
        localStorage.setItem('croots', JSON.stringify(payload));
    }

    getCFBTimestamp() {
        return JSON.parse(localStorage.getItem('cfb_timestamp'));
    }

    setCFBTimestamp(payload) {
        localStorage.setItem('cfb_timestamp', JSON.stringify(payload));
    }

    getCBBTimestamp() {
        return JSON.parse(localStorage.getItem('cbb_timestamp'));
    }

    setCBBTimestamp(payload) {
        localStorage.setItem('cbb_timestamp', JSON.stringify(payload));
    }
}
