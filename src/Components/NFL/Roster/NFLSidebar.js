import React from 'react';
import {
    numberWithCommas,
    RoundToTwoDecimals
} from '../../../_Utility/utilHelper';
import {
    GetCapSpace,
    GetProjectedCapsheet
} from '../FreeAgency/FreeAgencyHelper';

export const CapsheetRow = ({ year, bonus, salary, space }) => (
    <div className="row mb-1 pe-2">
        <div className="col-3">
            <p>{year}</p>
        </div>
        <div className="col-3">
            <p>{RoundToTwoDecimals(bonus)}</p>
        </div>
        <div className="col-3">
            <p>{RoundToTwoDecimals(salary)}</p>
        </div>
        <div className="col-3">
            <p>{RoundToTwoDecimals(space)}</p>
        </div>
    </div>
);

export const NFLSidebar = ({
    team,
    ts,
    isRoster,
    TeamOffers,
    isTradeBlock,
    tp,
    canModify
}) => {
    const capsheet = team.Capsheet;
    const y1Cap = ts.Y1Capspace;
    const y2Cap = ts.Y2Capspace;
    const y3Cap = ts.Y3Capspace;
    const y4Cap = ts.Y4Capspace;
    const y5Cap = ts.Y5Capspace;
    const y1Space = GetCapSpace(
        y1Cap,
        capsheet.Y1Bonus,
        capsheet.Y1Salary,
        capsheet.Y1CapHit
    );
    const y2Space = GetCapSpace(
        y2Cap,
        capsheet.Y2Bonus,
        capsheet.Y2Salary,
        capsheet.Y2CapHit
    );
    const y3Space = GetCapSpace(
        y3Cap,
        capsheet.Y3Bonus,
        capsheet.Y3Salary,
        capsheet.Y3CapHit
    );
    const y4Space = GetCapSpace(
        y4Cap,
        capsheet.Y4Bonus,
        capsheet.Y4Salary,
        capsheet.Y4CapHit
    );
    const y5Space = GetCapSpace(
        y5Cap,
        capsheet.Y5Bonus,
        capsheet.Y5Salary,
        capsheet.Y5CapHit
    );
    const year = ts.Season;
    const projectedCapsheet = GetProjectedCapsheet({ ...capsheet }, TeamOffers);
    const ProjectedY1Space = GetCapSpace(
        y1Cap,
        projectedCapsheet.Y1Bonus,
        projectedCapsheet.Y1Salary,
        projectedCapsheet.Y1CapHit
    );
    const ProjectedY2Space = GetCapSpace(
        y2Cap,
        projectedCapsheet.Y2Bonus,
        projectedCapsheet.Y2Salary,
        projectedCapsheet.Y2CapHit
    );
    const ProjectedY3Space = GetCapSpace(
        y3Cap,
        projectedCapsheet.Y3Bonus,
        projectedCapsheet.Y3Salary,
        projectedCapsheet.Y3CapHit
    );
    const ProjectedY4Space = GetCapSpace(
        y4Cap,
        projectedCapsheet.Y4Bonus,
        projectedCapsheet.Y4Salary,
        projectedCapsheet.Y4CapHit
    );
    const ProjectedY5Space = GetCapSpace(
        y5Cap,
        projectedCapsheet.Y5Bonus,
        projectedCapsheet.Y5Salary,
        projectedCapsheet.Y5CapHit
    );

    return (
        <div className="col-sm-2">
            {isRoster && (
                <>
                    <div className="row mb-1">
                        <h5>
                            {team.Conference} {team.Division}
                        </h5>
                    </div>
                    <div className="row mb-1">
                        <h5>Owner: {team.NFLOwnerName}</h5>
                    </div>
                    <div className="row mb-1">
                        <h5>Manager: {team.NFLGMName}</h5>
                    </div>
                    <div className="row mb-1">
                        <h5>Coach: {team.NFLCoachName}</h5>
                    </div>
                    <div className="row mb-2">
                        <h5>Assistant: {team.NFLAssistantName}</h5>
                    </div>
                    <div className="row mb-1">
                        <h5>Stadium: {team.Stadium}</h5>
                    </div>
                    <div className="row mb-3">
                        <h5>
                            Capacity: {numberWithCommas(team.StadiumCapacity)}
                        </h5>
                    </div>
                </>
            )}
            {!isRoster && (
                <div className="row mb-1 pe-2">
                    <h3>Cap Space</h3>
                </div>
            )}
            <div className="row mb-1 pe-2">
                <div className="col-3">
                    <h5>Year</h5>
                </div>
                <div className="col-3">
                    <h5>Bonus</h5>
                </div>
                <div className="col-3">
                    <h5>Salary</h5>
                </div>
                <div className="col-3">
                    <h5>Space</h5>
                </div>
            </div>
            <CapsheetRow
                year={year}
                bonus={capsheet.Y1Bonus}
                salary={capsheet.Y1Salary}
                space={y1Space}
            />
            <CapsheetRow
                year={year + 1}
                bonus={capsheet.Y2Bonus}
                salary={capsheet.Y2Salary}
                space={y2Space}
            />
            <CapsheetRow
                year={year + 2}
                bonus={capsheet.Y3Bonus}
                salary={capsheet.Y3Salary}
                space={y3Space}
            />
            <CapsheetRow
                year={year + 3}
                bonus={capsheet.Y4Bonus}
                salary={capsheet.Y4Salary}
                space={y4Space}
            />
            <CapsheetRow
                year={year + 4}
                bonus={capsheet.Y5Bonus}
                salary={capsheet.Y5Salary}
                space={y5Space}
            />
            <div className="row mt-1">
                <h6>Dead Cap: {RoundToTwoDecimals(capsheet.Y1CapHit)}</h6>
            </div>
            {TeamOffers && TeamOffers.length > 0 && (
                <>
                    <div className="row mt-4 mb-1 pe-2">
                        <h3>Projected Cap Space</h3>
                    </div>
                    <div className="row mb-1 pe-2">
                        <div className="col-3">
                            <h5>Year</h5>
                        </div>
                        <div className="col-3">
                            <h5>Bonus</h5>
                        </div>
                        <div className="col-3">
                            <h5>Salary</h5>
                        </div>
                        <div className="col-3">
                            <h5>Space</h5>
                        </div>
                    </div>
                    <CapsheetRow
                        year={year}
                        bonus={projectedCapsheet.Y1Bonus}
                        salary={projectedCapsheet.Y1Salary}
                        space={ProjectedY1Space}
                    />
                    <CapsheetRow
                        year={year + 1}
                        bonus={projectedCapsheet.Y2Bonus}
                        salary={projectedCapsheet.Y2Salary}
                        space={ProjectedY2Space}
                    />
                    <CapsheetRow
                        year={year + 2}
                        bonus={projectedCapsheet.Y3Bonus}
                        salary={projectedCapsheet.Y3Salary}
                        space={ProjectedY3Space}
                    />
                    <CapsheetRow
                        year={year + 3}
                        bonus={projectedCapsheet.Y4Bonus}
                        salary={projectedCapsheet.Y4Salary}
                        space={ProjectedY4Space}
                    />
                    <CapsheetRow
                        year={year + 4}
                        bonus={projectedCapsheet.Y5Bonus}
                        salary={projectedCapsheet.Y5Salary}
                        space={ProjectedY5Space}
                    />
                </>
            )}
            {isTradeBlock && (
                <>
                    <div className="row mt-2 mb-1 pe-2">
                        <h3>Trade Preferences</h3>
                    </div>
                    <div className="row mb-2 ps-3 pe-3">
                        {canModify ? (
                            <button
                                type="button"
                                className="btn btn-success"
                                title="Update Trade Preferences"
                                data-bs-toggle="modal"
                                data-bs-target="#tradePreferencesModal"
                            >
                                Update Preferences
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                    {tp && tp.DraftPicks && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.DraftPickType} Draft Picks
                        </div>
                    )}
                    {tp && tp.Quarterbacks && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.QuarterbackType} Quarterbacks
                        </div>
                    )}
                    {tp && tp.Runningbacks && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.RunningbackType} Runningbacks
                        </div>
                    )}
                    {tp && tp.Fullbacks && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.FullbackType} Fullbacks
                        </div>
                    )}
                    {tp && tp.WideReceivers && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.WideReceiverType} Wide Receivers
                        </div>
                    )}
                    {tp && tp.TightEnds && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.TightEndType} Tight Ends
                        </div>
                    )}
                    {tp && tp.OffensiveTackles && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.OffensiveTackleType} OTs
                        </div>
                    )}
                    {tp && tp.OffensiveGuards && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.OffensiveGuardType} OGs
                        </div>
                    )}
                    {tp && tp.Centers && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.CenterType} Centers
                        </div>
                    )}
                    {tp && tp.DefensiveTackles && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.DefensiveTackleType} DTs
                        </div>
                    )}
                    {tp && tp.DefensiveEnds && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.DefensiveEndType} DEs
                        </div>
                    )}
                    {tp && tp.OutsideLinebackers && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.OutsideLinebackerType} OLBs
                        </div>
                    )}
                    {tp && tp.InsideLinebackers && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.InsideLinebackerType} ILBS
                        </div>
                    )}
                    {tp && tp.Cornerbacks && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.CornerbackType} CBs
                        </div>
                    )}
                    {tp && tp.FreeSafeties && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.FreeSafetyType} FSs
                        </div>
                    )}
                    {tp && tp.StrongSafeties && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.StrongSafetyType} SSs
                        </div>
                    )}
                    {tp && tp.Kickers && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.KickerType} Kickers
                        </div>
                    )}
                    {tp && tp.Punters && (
                        <div className="row mb-1 pe-2 justify-content-center">
                            {tp.PunterType} Punters
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
