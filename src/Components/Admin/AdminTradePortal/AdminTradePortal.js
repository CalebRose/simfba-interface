import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FBATradeService from '../../../_Services/simFBA/FBATradeService';
import { Divider } from '../../_Common/Divider';

const TradeOptionRow = ({ opt, isNBA }) => {
    const isPlayer = isNBA ? opt.NBAPlayerID > 0 : opt.NFLPlayerID > 0;
    const obj = isPlayer ? opt.Player : opt.Draftpick;
    const Contract = obj && isPlayer ? obj.Contract : null;
    const yearsRemaining = isPlayer
        ? !isNBA
            ? Contract.ContractLength
            : Contract.YearsRemaining
        : 0;

    const salary = isPlayer ? (!isNBA ? Contract.Y1BaseSalary : 0) : 0;
    const bonus = isPlayer
        ? !isNBA
            ? Contract.Y1Bonus
            : Contract.Year1Total
        : 0;

    const salaryPercentage = isPlayer ? opt.SalaryPercentage : 0;

    return isPlayer ? (
        <p className="align-middle text-small">
            {obj.Overall} Overall {obj.Position} {obj.Age}|{obj.Experience} |{' '}
            {obj.FirstName} {obj.LastName} | {bonus}m/{salary}
            m/{salaryPercentage}/{yearsRemaining}
        </p>
    ) : (
        <p className="align-middle text-small">
            {obj.Season} Round {obj.DraftRound} Draft Pick{' '}
            {`| Pick Number ${obj.DraftNumber}`}
        </p>
    );
};

export const TradePortalRow = ({ trade, accept, veto, isNBA }) => {
    const sentOptions = isNBA
        ? trade.NBATeamTradeOptions
        : trade.NFLTeamTradeOptions;
    const recepientOptions = trade.RecepientTeamTradeOptions;
    const acceptHelper = () => {
        return accept(trade.ID);
    };

    const vetoHelper = () => {
        return veto(trade.ID);
    };
    return (
        <div className="row mt-2">
            <div className="col col-sm-1">
                <h6 className="align-middle">
                    {isNBA ? trade.NBATeam : trade.NFLTeam}
                </h6>
            </div>
            <div className="col col-sm-4">
                {sentOptions.map((x) => (
                    <TradeOptionRow opt={x} isNBA={isNBA} />
                ))}
            </div>
            <div className="col col-sm-4">
                {recepientOptions.map((x) => (
                    <TradeOptionRow opt={x} isNBA={isNBA} />
                ))}
            </div>
            <div className="col col-sm-1">
                <h6 className="align-middle">{trade.RecepientTeam}</h6>
            </div>
            <div className="col-1 btn-group">
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={acceptHelper}
                >
                    Accept
                </button>
            </div>
            <div className="col-1 btn-group">
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={vetoHelper}
                >
                    Veto
                </button>
            </div>
            <Divider />
        </div>
    );
};

const AdminTradePortal = ({ currentUser }) => {
    const _tradeService = new FBATradeService();
    const [trades, setTrades] = React.useState([]);
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
                <h2>Admin Trade Portal</h2>
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
            <div className="row mt-2">
                <div className="col col-sm-1">
                    <h3 className="align-middle">Proposing Team</h3>
                </div>
                <div className="col col-sm-4">
                    <h3 className="align-middle">Proposing Team Options</h3>
                    <p className="text-small align-middle">
                        (bon/sal/sal%/yrs)
                    </p>
                </div>
                <div className="col col-sm-4">
                    <h3 className="align-middle">Receiving Team Options</h3>
                    <p className="text-small align-middle">
                        (bon/sal/sal%/yrs)
                    </p>
                </div>
                <div className="col col-sm-1">
                    <h3 className="align-middle">Receiving Team</h3>
                </div>
                <div className="col">
                    <h3 className="align-middle">Accept</h3>
                </div>
                <div className="col">
                    <h3 className="align-middle">Veto</h3>
                </div>
            </div>
            {trades.length > 0 &&
                trades.map((x) => (
                    <TradePortalRow
                        trade={x}
                        accept={AcceptTrade}
                        veto={VetoTrade}
                    />
                ))}
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(AdminTradePortal);
