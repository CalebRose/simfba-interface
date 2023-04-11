import url from '../../Constants/SimBBA_url.js';
import { GetActionCall, GetCall, PostCall } from '../simFBA/FetchHelper.js';

export default class BBATradeService {
    async GetTradeBlockDataByTeamID(TeamID) {
        return await GetCall(`${url}trades/nba/block/${TeamID}`);
    }

    async PlaceNBAPlayerOnTradeBlock(PlayerID) {
        let response = await fetch(`${url}trades/nba/place/block/${PlayerID}`, {
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
        const response = PostCall(`${url}trades/nba/preferences/update`, dto);
        return response;
    }

    async CreateTradeProposal(dto) {
        const response = PostCall(`${url}trades/nba/create/proposal`, dto);
        return response;
    }

    async AcceptTradeProposal(ProposalID) {
        return await GetActionCall(
            `${url}trades/nba/proposal/accept/${ProposalID}`
        );
    }

    async RejectTradeProposal(ProposalID) {
        return await GetActionCall(
            `${url}trades/nba/proposal/reject/${ProposalID}`
        );
    }

    async CancelTradeProposal(ProposalID) {
        return await GetActionCall(
            `${url}trades/nba/proposal/cancel/${ProposalID}`
        );
    }

    async GetAllAcceptedTrades() {
        return await GetCall(`${url}trades/nba/all/accepted`);
    }

    async GetAllRejectedTrades() {
        return await GetCall(`${url}trades/nba/all/rejected`);
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
        return await GetActionCall(`${url}nba/capsheet/generate`);
    }
}
