import React from 'react';
import {
    HeightToFeetAndInches,
    RoundToTwoDecimals
} from '../../../_Utility/utilHelper';
import { GetMobileCardClass } from '../../../Constants/CSSClassHelper';
import { GetNFLOverall } from '../../../_Utility/RosterHelper';

const PlayerRow = ({ player, theme }) => {
    const { Contract } = player;
    const NameLabel = `${player.FirstName} ${player.LastName}`;
    const mobileCardClass = GetMobileCardClass(theme);
    const heightObj = HeightToFeetAndInches(player.Height);
    const year = player.Experience === 0 ? 'R' : player.Experience;
    const ovr = GetNFLOverall(player.Overall, player.Experience);
    return (
        <>
            <div className={`${mobileCardClass} mb-2`}>
                <div className="card-body">
                    <h5 className="card-title">{NameLabel}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {player.Age} year old{' '}
                        {year === 'R' ? 'Rookie' : `${year} Year`}{' '}
                        {player.Archetype} {player.Position} from{' '}
                        {player.Hometown}, {player.State}
                    </h6>
                    <p className="card-text">
                        {heightObj.feet}' {heightObj.inches}", {player.Weight}{' '}
                        lbs
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Overall: {ovr}, Potential: {player.PotentialGrade}
                    </li>
                    <li className="list-group-item">
                        Contract Value:{' '}
                        {RoundToTwoDecimals(Contract.ContractValue)}
                    </li>
                    <li className="list-group-item">
                        Bonus: {Contract.Y1Bonus} | Salary:{' '}
                        {Contract.Y1BaseSalary}
                    </li>
                </ul>
            </div>
        </>
    );
};

const DraftPickRow = ({ pick, theme }) => {
    const mobileCardClass = GetMobileCardClass(theme);
    return (
        <>
            <div className={`${mobileCardClass} mb-2`}>
                <div className="card-body">
                    <h5 className="card-title">
                        {pick.Season} {pick.Round} Round
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Pick No. {pick.PickNumber} | Original Team:{' '}
                        {pick.OriginalTeam}
                    </h6>
                    <p className="card-text">Trade Value: {pick.TradeValue}</p>
                </div>
            </div>
        </>
    );
};

export const NFLMobileTradeBlockRow = ({ viewMode, obj, theme }) => {
    return viewMode === 'Players' ? (
        <PlayerRow player={obj} theme={theme} />
    ) : (
        <DraftPickRow pick={obj} theme={theme} />
    );
};
