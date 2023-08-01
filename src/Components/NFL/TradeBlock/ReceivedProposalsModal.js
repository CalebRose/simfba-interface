import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { OptionCard } from './TradeProposalModal';
import { NBAOptionCard } from '../../BBA/NBA/Trade Block/NBATradeblockModals';

const ProposalItem = ({ item, idx, isSent, accept, reject, cancel, isNBA }) => {
    const collapseLabel = isSent ? `${idx}-sent` : `${idx}-received`;
    let otherTeam = isSent ? item.RecepientTeam : item.NFLTeam;
    let team = isSent ? item.NFLTeam : item.RecepientTeam;
    if (isNBA && isSent) {
        team = item.NBATeam;
    }
    if (isNBA && !isSent) {
        otherTeam = item.NBATeam;
    }
    const teamArr = team.split(' ');
    const otherTeamArr = otherTeam.split(' ');
    const teamLabel =
        teamArr.length > 2 ? teamArr.slice(0, 2).join(' ') : teamArr[0];
    const otherTeamLabel =
        otherTeamArr.length > 2
            ? otherTeamArr.slice(0, 2).join(' ')
            : otherTeamArr[0];
    const sendsLabel = isSent
        ? `${teamLabel} Sends`
        : `${otherTeamLabel} Sends`;
    const receivesLabel = isSent
        ? `${teamLabel} Receives`
        : `${otherTeamLabel} Receives`;
    const header = isSent ? `To ${otherTeam}` : `From ${otherTeam}`;
    const sentOptions = !isNBA
        ? item.NFLTeamTradeOptions
        : item.NBATeamTradeOptions;
    const receivedOptions = item.RecepientTeamTradeOptions;
    const acceptHelper = () => {
        return accept(item.ID);
    };

    const rejectHelper = () => {
        return reject(item.ID);
    };

    const cancelHelper = () => {
        return cancel(item.ID);
    };

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseLabel}`}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                >
                    {header}
                </button>
            </h2>
            <div
                id={collapseLabel}
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body">
                    <div className="row">
                        <div className="col-6">
                            <h3>{sendsLabel}</h3>
                            {sentOptions.length > 0 &&
                                sentOptions.map((x, idx) => {
                                    const obj =
                                        x.OptionType === 'Player'
                                            ? x.Player
                                            : x.Draftpick;
                                    return !isNBA ? (
                                        <OptionCard
                                            optionType={x.OptionType}
                                            sp={x.SalaryPercentage}
                                            opt={obj}
                                            idx={idx}
                                        />
                                    ) : (
                                        <NBAOptionCard
                                            optionType={x.OptionType}
                                            sp={x.SalaryPercentage}
                                            opt={obj}
                                            idx={idx}
                                        />
                                    );
                                })}
                        </div>
                        <div className="col-6">
                            <h3>{receivesLabel}</h3>
                            {receivedOptions.length > 0 &&
                                receivedOptions.map((x, idx) => {
                                    const obj =
                                        x.OptionType === 'Player'
                                            ? x.Player
                                            : x.Draftpick;
                                    return !isNBA ? (
                                        <OptionCard
                                            optionType={x.OptionType}
                                            sp={x.SalaryPercentage}
                                            opt={obj}
                                            idx={idx}
                                        />
                                    ) : (
                                        <NBAOptionCard
                                            optionType={x.OptionType}
                                            sp={x.SalaryPercentage}
                                            opt={obj}
                                            idx={idx}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    {!isSent ? (
                        <div className="btn-group gap-2 w-100" role="group">
                            <button
                                type="button"
                                className="btn btn-outline-success"
                                onClick={acceptHelper}
                            >
                                Accept
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={rejectHelper}
                            >
                                Reject
                            </button>
                        </div>
                    ) : (
                        <div className="btn-group gap-2 w-100" role="group">
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={cancelHelper}
                            >
                                Cancel Offer
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ReceivedProposalsModal = ({
    sent,
    received,
    theme,
    accept,
    reject,
    cancel,
    isNBA
}) => {
    const modalId = 'receivedProposalsModal';
    const modalClass = GetModalClass(theme);

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            aria-labelledby="proposalModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-scrollable modal-xl">
                <div className={modalClass} style={{ minHeight: '530px' }}>
                    <div className="modal-header">
                        <h3 className="modal-title" id="redshirtModalLabel">
                            Trades Inbox
                        </h3>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body proposal-body">
                        <div className="row">
                            <div className="col-6">
                                <div className="row justify-content-start">
                                    <h4>Sent</h4>
                                </div>
                                {sent.length > 0 && (
                                    <div className="accordion mt-2">
                                        {sent.map((x, idx) => (
                                            <ProposalItem
                                                item={x}
                                                idx={idx}
                                                accept={accept}
                                                reject={reject}
                                                cancel={cancel}
                                                isNBA={isNBA}
                                                isSent
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="col-6">
                                <div className="row justify-content-start">
                                    <h4>Received</h4>
                                </div>
                                {received.length > 0 && (
                                    <div className="accordion mt-2">
                                        {received.map((x, idx) => (
                                            <ProposalItem
                                                item={x}
                                                idx={idx}
                                                accept={accept}
                                                reject={reject}
                                                cancel={cancel}
                                                isNBA={isNBA}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
