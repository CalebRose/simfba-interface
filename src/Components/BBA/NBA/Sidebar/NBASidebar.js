import React from 'react';
import { RoundToTwoDecimals } from '../../../../_Utility/utilHelper';
import { GetNBACapSpace } from '../../../NFL/FreeAgency/FreeAgencyHelper';

export const NBACapsheetRow = ({ year, total, space }) => (
    <div className="row mb-1 pe-2">
        <div className="col-4">
            <p>{year}</p>
        </div>
        <div className="col-4">
            <p>{RoundToTwoDecimals(total)}</p>
        </div>
        <div className="col-4">
            <p>{RoundToTwoDecimals(space)}</p>
        </div>
    </div>
);

export const NBASidebar = ({
    team,
    ts,
    isRoster,
    canModify,
    isMobile,
    tp,
    isTradeBlock
}) => {
    const {
        Capsheet,
        NBAOwnerName,
        NBAGMName,
        NBACoachName,
        NBAAssistantName
    } = team;
    const {
        Y1Capspace,
        Y2Capspace,
        Y3Capspace,
        Y4Capspace,
        Y5Capspace,
        Season
    } = ts;
    const y1Space = GetNBACapSpace(
        Y1Capspace,
        Capsheet.Year1Total,
        Capsheet.Year1Cap
    );
    const y2Space = GetNBACapSpace(
        Y2Capspace,
        Capsheet.Year2Total,
        Capsheet.Year2Cap
    );
    const y3Space = GetNBACapSpace(
        Y3Capspace,
        Capsheet.Year3Total,
        Capsheet.Year3Cap
    );
    const y4Space = GetNBACapSpace(
        Y4Capspace,
        Capsheet.Year4Total,
        Capsheet.Year4Cap
    );
    const y5Space = GetNBACapSpace(
        Y5Capspace,
        Capsheet.Year5Total,
        Capsheet.Year5Cap
    );

    return (
        <>
            <div className="col-sm-2 border-end">
                {isRoster && (
                    <>
                        <div className="row mb-1">
                            <h5>
                                {team.Conference} {team.Division}
                            </h5>
                        </div>
                        <div className="row mb-1">
                            <h5>
                                Owner:{' '}
                                {NBAOwnerName.length > 0
                                    ? NBAOwnerName
                                    : 'None'}
                            </h5>
                        </div>
                        <div className="row mb-1">
                            <h5>
                                Manager:{' '}
                                {NBAGMName.length > 0 ? NBAGMName : 'None'}
                            </h5>
                        </div>
                        <div className="row mb-1">
                            <h5>
                                Coach:{' '}
                                {NBACoachName.length > 0
                                    ? NBACoachName
                                    : 'None'}
                            </h5>
                        </div>
                        <div className="row mb-2">
                            <h5>
                                Assistant:{' '}
                                {NBAAssistantName.length > 0
                                    ? NBAAssistantName
                                    : 'None'}
                            </h5>
                        </div>
                        <div className="row mb-1">
                            <h5>Stadium: {team.Arena}</h5>
                        </div>
                    </>
                )}
                {!isRoster && (
                    <div className="row mb-1 pe-2">
                        <h3>Cap Space</h3>
                    </div>
                )}
                <div className="">
                    <div className="row mb-1 pe-2 pt-1">
                        <div className="col-4">
                            <h5>Year</h5>
                        </div>
                        <div className="col-4">
                            <h5>Total</h5>
                        </div>
                        <div className="col-4">
                            <h5>Space</h5>
                        </div>
                    </div>
                    <NBACapsheetRow
                        year={Season}
                        total={Capsheet.Year1Total}
                        space={y1Space}
                    />
                    <NBACapsheetRow
                        year={Season + 1}
                        total={Capsheet.Year2Total}
                        space={y2Space}
                    />
                    <NBACapsheetRow
                        year={Season + 2}
                        total={Capsheet.Year3Total}
                        space={y3Space}
                    />
                    <NBACapsheetRow
                        year={Season + 3}
                        total={Capsheet.Year4Total}
                        space={y4Space}
                    />
                    <NBACapsheetRow
                        year={Season + 4}
                        total={Capsheet.Year5Total}
                        space={y5Space}
                    />
                    <div className="row mt-1">
                        <h6>
                            Dead Cap: {RoundToTwoDecimals(Capsheet.Year1Cap)}
                        </h6>
                    </div>
                </div>
                {isTradeBlock && (
                    <>
                        <div className="row mt-2 mb-1 pe-2">
                            <h3>Trade Preferences</h3>
                        </div>
                        <div className="row mb-2 ps-3 pe-3">
                            {canModify && !isMobile && (
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    title="Update Trade Preferences"
                                    data-bs-toggle="modal"
                                    data-bs-target="#tradePreferencesModal"
                                >
                                    Update Preferences
                                </button>
                            )}
                        </div>
                        {tp && tp.DraftPicks && (
                            <div className="row mb-1 pe-2 justify-content-center">
                                {tp.DraftPickType} Draft Picks
                            </div>
                        )}
                        {tp && tp.PointGuards && (
                            <div className="row mb-1 pe-2 justify-content-center">
                                {tp.PointGuardSpecialties} Point Guards
                            </div>
                        )}
                        {tp && tp.PowerForwards && (
                            <div className="row mb-1 pe-2 justify-content-center">
                                {tp.PowerForwardSpecialties} Power Forwards
                            </div>
                        )}
                        {tp && tp.ShootingGuards && (
                            <div className="row mb-1 pe-2 justify-content-center">
                                {tp.ShootingGuardSpecialties} Shooting Guards
                            </div>
                        )}
                        {tp && tp.SmallForwards && (
                            <div className="row mb-1 pe-2 justify-content-center">
                                {tp.SmallForwardSpecialties} Small Forwards
                            </div>
                        )}
                        {tp && tp.Centers && (
                            <div className="row mb-1 pe-2 justify-content-center">
                                {tp.CenterSpecialties} Centers
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};
