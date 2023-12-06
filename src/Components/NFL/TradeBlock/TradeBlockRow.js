import React from 'react';
import { RoundToTwoDecimals } from '../../../_Utility/utilHelper';

const PlayerRow = ({ player }) => {
    const { Contract } = player;
    const NameLabel = `${player.FirstName} ${player.LastName}`;
    return (
        <>
            <tr style={{ zIndex: -1 }}>
                <th scope="row">{NameLabel}</th>
                <td className="align-middle">{player.Position}</td>
                <td className="align-middle">{player.Archetype}</td>
                <td className="align-middle">{player.Overall}</td>
                <td className="align-middle">{player.Age}</td>
                <td className="align-middle">{player.Experience}</td>
                <td className="align-middle">{player.PotentialGrade}</td>
                <td className="align-middle">
                    {RoundToTwoDecimals(Contract.ContractValue)}
                </td>
                <td className="align-middle">{Contract.Y1Bonus}</td>
                <td className="align-middle">{Contract.Y1BaseSalary}</td>
            </tr>
        </>
    );
};

const NBAPlayerRow = ({ player }) => {
    const { Contract } = player;
    const NameLabel = `${player.FirstName} ${player.LastName}`;
    return (
        <>
            <tr style={{ zIndex: -1 }}>
                <th scope="row">{NameLabel}</th>
                <td className="align-middle">{player.Position}</td>
                <td className="align-middle">{player.Archetype}</td>
                <td className="align-middle">{player.Overall}</td>
                <td className="align-middle">{player.Age}</td>
                <td className="align-middle">{player.Year}</td>
                <td className="align-middle">{player.PotentialGrade}</td>
                <td className="align-middle">
                    {RoundToTwoDecimals(Contract.ContractValue)}
                </td>
                <td className="align-middle">{Contract.Year1Total}</td>
            </tr>
        </>
    );
};

const DraftPickRow = ({ pick, isNFL }) => {
    return (
        <>
            <tr style={{ zIndex: -1 }}>
                <th scope="row">{pick.Season}</th>
                <td className="align-middle">{pick.DraftRound}</td>
                <td className="align-middle">{pick.DraftNumber}</td>
                <td className="align-middle">{pick.DraftValue}</td>
                <td className="align-middle">{pick.OriginalTeam}</td>
            </tr>
        </>
    );
};

export const TradeBlockRow = ({ viewMode, obj }) => {
    return viewMode === 'Players' ? (
        <PlayerRow player={obj} />
    ) : (
        <DraftPickRow pick={obj} isNFL={true} />
    );
};

export const NBATradeBlockRow = ({ viewMode, obj }) => {
    return viewMode === 'Players' ? (
        <NBAPlayerRow player={obj} />
    ) : (
        <DraftPickRow pick={obj} isNFL={false} />
    );
};
