import React from 'react';
import { RoundToTwoDecimals } from '../../_Utility/utilHelper';

export const FBAStatsRow = ({ SeasonStats }) => {
    return (
        <div className="row g-2 d-flex flex-wrap justify-content-start">
            {SeasonStats.PassingYards > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Passing Yards</h6>
                    <p>{SeasonStats.PassingYards}</p>
                </div>
            )}
            {SeasonStats.PassAttempts > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Pass Attempts</h6>
                    <p>
                        {SeasonStats.PassCompletions}
                        {' / '}
                        {SeasonStats.PassAttempts}
                    </p>
                </div>
            )}
            {SeasonStats.PassingTDs > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Passing TDs</h6>
                    <p>{SeasonStats.PassingTDs}</p>
                </div>
            )}
            {SeasonStats.Interceptions > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>INTs</h6>
                    <p>{SeasonStats.Interceptions}</p>
                </div>
            )}
            {SeasonStats.Sacks > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Sacks</h6>
                    <p>{SeasonStats.Sacks}</p>
                </div>
            )}
            {SeasonStats.QBRating > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>QBR</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.QBRating)}</p>
                </div>
            )}
            {SeasonStats.RushingYards > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Rushing Yards</h6>
                    <p>
                        {SeasonStats.RushAttempts} Attempts for{' '}
                        {SeasonStats.RushingYards} Yards
                    </p>
                </div>
            )}
            {SeasonStats.RushingTDs > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Rush TDs</h6>
                    <p>{SeasonStats.RushingTDs}</p>
                </div>
            )}
            {SeasonStats.Targets > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Receiving Yards</h6>
                    <p>{SeasonStats.ReceivingYards} Yards</p>
                </div>
            )}
            {SeasonStats.Catches > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Catches</h6>
                    <p>
                        {SeasonStats.Catches}/{SeasonStats.Targets}
                    </p>
                </div>
            )}
            {SeasonStats.ReceivingTDs > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Receiving TDs</h6>
                    <p>{SeasonStats.ReceivingTDs}</p>
                </div>
            )}
            {SeasonStats.Fumbles > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Fumbles</h6>
                    <p>{SeasonStats.Fumbles}</p>
                </div>
            )}
            {SeasonStats.Tackles > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Tackles</h6>
                    <p>{SeasonStats.Tackles}</p>
                </div>
            )}
            {SeasonStats.SacksMade > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Sacks</h6>
                    <p>{SeasonStats.SacksMade}</p>
                </div>
            )}
            {SeasonStats.ForcedFumbles > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Forced Fumbles</h6>
                    <p>{SeasonStats.ForcedFumbles}</p>
                </div>
            )}
            {SeasonStats.RecoveredFumbles > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Recovered Fumbles</h6>
                    <p>{SeasonStats.RecoveredFumbles}</p>
                </div>
            )}
            {SeasonStats.PassDeflections > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Deflections</h6>
                    <p>{SeasonStats.PassDeflections}</p>
                </div>
            )}
            {SeasonStats.InterceptionsCaught > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Interceptions</h6>
                    <p>{SeasonStats.InterceptionsCaught}</p>
                </div>
            )}
            {SeasonStats.Safeties > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Safeties</h6>
                    <p>{SeasonStats.Safeties}</p>
                </div>
            )}
            {SeasonStats.DefensiveTDs > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Defensive TDs</h6>
                    <p>{SeasonStats.DefensiveTDs}</p>
                </div>
            )}
            {SeasonStats.FGMade > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Field Goals</h6>
                    <p>
                        {SeasonStats.FGMade} of {SeasonStats.FGAttempts}
                    </p>
                </div>
            )}
            {SeasonStats.XPMade > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Extra Points</h6>
                    <p>
                        {SeasonStats.ExtraPointsMade} of{' '}
                        {SeasonStats.ExtraPointsAttempted}
                    </p>
                </div>
            )}
            {SeasonStats.Punts > 0 && (
                <div className="col-2 g-2 mb-1">
                    <h6>Punts</h6>
                    <p>
                        {SeasonStats.Punts}, {SeasonStats.PuntsInside20} Inside
                        the 20
                    </p>
                </div>
            )}
        </div>
    );
};

export const BBAStatsRow = ({ SeasonStats }) => {
    return (
        <>
            <div className="row">
                <div className="col-auto">
                    <h6>PPG</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.PPG)}</p>
                </div>
                <div className="col-auto">
                    <h6>FG Made</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.FGMPG)}</p>
                </div>
                <div className="col-auto">
                    <h6>FG Attempts</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.FGAPG)}</p>
                </div>
                <div className="col-auto">
                    <h6>FG Percentage</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.FGPercent * 100)}%</p>
                </div>
                <div className="col-auto">
                    <h6>3pt Made</h6>
                    <p>
                        {RoundToTwoDecimals(SeasonStats.ThreePointsMadePerGame)}
                    </p>
                </div>
                <div className="col-auto">
                    <h6>3pt Attempts</h6>
                    <p>
                        {RoundToTwoDecimals(
                            SeasonStats.ThreePointAttemptsPerGame
                        )}
                    </p>
                </div>
                <div className="col-auto">
                    <h6>3pt Percentage</h6>
                    <p>
                        {RoundToTwoDecimals(
                            SeasonStats.ThreePointPercent * 100
                        )}
                        %
                    </p>
                </div>
                <div className="col-auto">
                    <h6>FT Made</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.FTMPG)}</p>
                </div>
                <div className="col-auto">
                    <h6>FT Attempts</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.FTAPG)}</p>
                </div>
                <div className="col-auto">
                    <h6>FT Percent</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.FTPercent * 100)}%</p>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-auto">
                    <h6>Assists</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.AssistsPerGame)}</p>
                </div>
                <div className="col-auto">
                    <h6>Total Rebounds</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.ReboundsPerGame)}</p>
                </div>
                <div className="col-auto">
                    <h6>Offensive Rebounds</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.OffReboundsPerGame)}</p>
                </div>
                <div className="col-auto">
                    <h6>Defensive Rebounds</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.DefReboundsPerGame)}</p>
                </div>
                <div className="col-auto">
                    <h6>Steals</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.StealsPerGame)}</p>
                </div>
                <div className="col-auto">
                    <h6>Blocks</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.BlocksPerGame)}</p>
                </div>
                <div className="col-auto">
                    <h6>Turnovers</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.TurnoversPerGame)}</p>
                </div>
                <div className="col-auto">
                    <h6>Fouls</h6>
                    <p>{RoundToTwoDecimals(SeasonStats.FoulsPerGame)}</p>
                </div>
            </div>
        </>
    );
};
