import React from 'react';
import { ExtraLargeModal } from '../../_Common/ModalComponents';
import { TradePortalRow } from '../../Admin/AdminTradePortal/AdminTradePortal';

export const NFLDraftTradeModal = ({ approvedTrades, process, veto }) => {
    const id = `adminTradeModal`;
    const header = `SimNFL Draft Trade Portal`;
    return (
        <>
            <ExtraLargeModal id={id} header={header}>
                <div className="row mb-2">
                    <div className="col col-sm-1">
                        <h5>Proposing Team</h5>
                    </div>
                    <div className="col col-sm-4">
                        <h5>Proposing Team Options</h5>
                    </div>
                    <div className="col col-sm-4">
                        <h5>Receiving Team Options</h5>
                    </div>
                    <div className="col col-sm-1">
                        <h5>Receiving Team</h5>
                    </div>
                    <div className="col-1">
                        <h5>Accept</h5>
                    </div>
                    <div className="col-1">
                        <h5>Veto</h5>
                    </div>
                </div>
                {approvedTrades.length > 0 &&
                    approvedTrades.map((x) => (
                        <TradePortalRow
                            trade={x}
                            accept={process}
                            veto={veto}
                        />
                    ))}
            </ExtraLargeModal>
        </>
    );
};
