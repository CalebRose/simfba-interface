import url from '../../Constants/url.js';
import { GetActionCall, GetCall, PostCall } from './FetchHelper.js';

export default class FBATradeService {
    async GetTradeBlockDataByTeamID(TeamID) {
        return await GetCall(`${url}trades/nfl/block/${TeamID}`);
    }

    async PlaceNFLPlayerOnTradeBlock(PlayerID) {
        let response = await fetch(`${url}trades/nfl/place/block/${PlayerID}`, {
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

    async UpdateTradePreferences(dto) {
        const response = PostCall(`${url}trades/nfl/preferences/update`, dto);
        return response;
    }

    async CreateTradeProposal(dto) {
        const response = PostCall(`${url}trades/nfl/create/proposal`, dto);
        return response;
    }

    async ProcessDraftTrade(dto) {
        const response = PostCall(`${url}trades/nfl/draft/process`, dto);
        return response;
    }

    async AcceptTradeProposal(ProposalID) {
        return await GetActionCall(
            `${url}trades/nfl/proposal/accept/${ProposalID}`
        );
    }

    async RejectTradeProposal(ProposalID) {
        return await GetActionCall(
            `${url}trades/nfl/proposal/reject/${ProposalID}`
        );
    }

    async CancelTradeProposal(ProposalID) {
        return await GetActionCall(
            `${url}trades/nfl/proposal/cancel/${ProposalID}`
        );
    }

    async GetAllAcceptedTrades() {
        return await GetCall(`${url}trades/nfl/all/accepted`);
    }

    async GetAllRejectedTrades() {
        return await GetCall(`${url}trades/nfl/all/rejected`);
    }

    async ConfirmAcceptedTrade(ProposalID) {
        return await GetActionCall(
            `${url}admin/trades/accept/sync/${ProposalID}`
        );
    }

    async VetoAcceptedTrade(ProposalID) {
        return await GetActionCall(
            `${url}admin/trades/veto/sync/${ProposalID}`
        );
    }

    async CleanupRejectedTrades() {
        return await GetActionCall(`${url}admin/trades/cleanup`);
    }

    async RegenerateCapsheets() {
        return await GetActionCall(`${url}nfl/capsheet/generate`);
    }
}
