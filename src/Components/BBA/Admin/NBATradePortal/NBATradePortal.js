import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TradePortalRow } from '../../../Admin/AdminTradePortal/AdminTradePortal';
import BBATradeService from '../../../../_Services/simNBA/BBATradeService';

const AdminNBATradePortal = ({ currentUser }) => {
    const _tradeService = new BBATradeService();
    const [trades, setTrades] = useState([]);
    const [rejectedTrades, setRejectedTrades] = React.useState([]);
    const [showCapsheetButton, setShowCapsheetButton] = React.useState(false);

    useEffect(() => {
        if (currentUser) {
            GetAllAcceptedTrades();
            GetAllRejectedTrades();
        }
    }, [currentUser]);

    const GetAllAcceptedTrades = async () => {
        const res = await _tradeService.GetAllAcceptedTrades();
        setTrades(() => [...res]);
    };

    const GetAllRejectedTrades = async () => {
        const res = await _tradeService.GetAllRejectedTrades();
        setRejectedTrades(() => [...res]);
    };

    const AcceptTrade = async (id) => {
        const res = await _tradeService.ConfirmAcceptedTrade(id);
        if (res.ok) {
            const tr = [...trades];
            const filteredTrades = tr.filter((x) => x.ID !== id);
            setTrades(() => filteredTrades);
            setShowCapsheetButton(() => true);
        }
    };

    const VetoTrade = async (id) => {
        const res = await _tradeService.VetoAcceptedTrade(id);
        if (res.ok) {
            const tr = [...trades];
            const filteredTrades = tr.filter((x) => x.ID !== id);
            setTrades(() => filteredTrades);
        }
    };

    const CleanRejectedTrades = async () => {
        const res = await _tradeService.CleanupRejectedTrades();
        if (res.ok) {
            setRejectedTrades(() => []);
        }
    };

    const RegenerateCapsheets = async () => {
        const res = await _tradeService.RegenerateCapsheets();
        if (res.ok) {
            setShowCapsheetButton(() => false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row mt-1 justify-content-center">
                <h2>Admin NBA Trade Portal</h2>
            </div>
            <div className="row mt-2">
                <div className="d-flex justify-content-end me-1">
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={RegenerateCapsheets}
                    >
                        Re-generate Capsheets
                    </button>
                </div>
                <div className="d-flex justify-content-end">
                    {rejectedTrades.length > 0 && (
                        <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={CleanRejectedTrades}
                        >
                            Clean Rejected Trades
                        </button>
                    )}
                </div>
            </div>
            <div className="row mt-3">
                <div className="col col-sm-1">
                    <h3 className="align-middle">Proposing Team</h3>
                </div>
                <div className="col col-sm-4">
                    <h3 className="align-middle">Proposing Team Options</h3>
                </div>
                <div className="col col-sm-4">
                    <h3 className="align-middle">Receiving Team Options</h3>
                </div>
                <div className="col col-sm-1">
                    <h3 className="align-middle">Receiving Team</h3>
                </div>
                <div className="col-1">
                    <h3 className="align-middle">Accept</h3>
                </div>
                <div className="col-1">
                    <h3 className="align-middle">Veto</h3>
                </div>
            </div>
            {trades.length > 0 &&
                trades.map((x) => (
                    <TradePortalRow
                        trade={x}
                        accept={AcceptTrade}
                        veto={VetoTrade}
                        isNBA={true}
                    />
                ))}
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(AdminNBATradePortal);
