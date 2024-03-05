import url from '../../Constants/url';
import BBAURL from '../../Constants/SimBBA_url';
import { GetCall, PostCall } from './FetchHelper';

export class PortalService {
    async GetCollegePromiseByPlayerID(isCFB, playerID, teamID) {
        let u = isCFB ? url : BBAURL;
        return await GetCall(`${u}portal/promise/player/${playerID}/${teamID}`);
    }

    async CreatePromise(isCFB, dto) {
        let u = isCFB ? url : BBAURL;
        return await PostCall(`${u}portal/promise/create`, dto);
    }
}
