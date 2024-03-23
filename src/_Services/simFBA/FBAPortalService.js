import url from '../../Constants/url';
import BBAURL from '../../Constants/SimBBA_url';
import { GetCall, PostCall } from './FetchHelper';

export class PortalService {
    async GetTransferPortalPageData(isCFB, teamID) {
        let u = isCFB ? url : BBAURL;
        return await GetCall(`${u}portal/page/data/${teamID}`);
    }

    async GetTransferPlayerData(isCFB, playerID) {
        let u = isCFB ? url : BBAURL;
        return await GetCall(`${u}portal/player/scout/${playerID}`);
    }

    async GetCollegePromiseByPlayerID(isCFB, playerID, teamID) {
        let u = isCFB ? url : BBAURL;
        return await GetCall(`${u}portal/promise/player/${playerID}/${teamID}`);
    }

    async CreatePromise(isCFB, dto) {
        let u = isCFB ? url : BBAURL;
        return await PostCall(`${u}portal/promise/create`, dto);
    }

    async RemovePromise(isCFB, id) {
        let u = isCFB ? url : BBAURL;
        return await PostCall(`${u}portal/promise/remove/${id}`);
    }

    async CreatePortalProfile(isCFB, dto) {
        let u = isCFB ? url : BBAURL;
        return await PostCall(`${u}portal/profile/create`, dto);
    }

    async RemovePortalProfile(isCFB, id) {
        let u = isCFB ? url : BBAURL;
        return await GetCall(`${u}portal/profile/remove/${id}`);
    }

    async SaveBoard(isCFB, dto) {
        let u = isCFB ? url : BBAURL;
        return await PostCall(`${u}portal/saveboard`, dto);
    }
}
