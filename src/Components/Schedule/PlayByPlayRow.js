import React from 'react';
import { GetDownStr } from '../../_Utility/utilHelper';

export const PlayByPlayRow = ({ play }) => {
    const {
        PlayNumber,
        HomeTeamScore,
        AwayTeamScore,
        Quarter,
        Possession,
        TimeRemaining,
        Down,
        Distance,
        LineOfScrimmage,
        PlayType,
        PlayName,
        OffensiveFormation,
        DefensiveFormation,
        PointOfAttack,
        DefensiveTendency,
        BlitzNumber,
        LBCoverage,
        CBCoverage,
        SCoverage,
        ResultYards,
        Result
    } = play;
    const downStr = GetDownStr(Down);
    const distanceLabel =
        downStr === 0 || downStr === '0' || downStr == ''
            ? ''
            : `${downStr} and ${Distance}`;
    return (
        <tr>
            <th scope="row" className="align-middle">
                {PlayNumber}
            </th>
            <td className="align-middle text-small">{HomeTeamScore}</td>
            <td className="align-middle text-small">{AwayTeamScore}</td>
            <td className="align-middle text-small">{Quarter}</td>
            <td className="align-middle text-small">{Possession}</td>
            <td className="align-middle text-small">{TimeRemaining}</td>
            <td className="align-middle text-small">{distanceLabel}</td>
            <td className="align-middle text-small">{LineOfScrimmage}</td>
            <td className="align-middle text-small">{PlayType}</td>
            <td className="align-middle text-small">{PlayName}</td>
            <td className="align-middle text-small">{OffensiveFormation}</td>
            <td className="align-middle text-small">{DefensiveFormation}</td>
            <td className="align-middle text-small">{PointOfAttack}</td>
            <td className="align-middle text-small">{DefensiveTendency}</td>
            <td className="align-middle text-small">{BlitzNumber}</td>
            <td className="align-middle text-small">{LBCoverage}</td>
            <td className="align-middle text-small">{CBCoverage}</td>
            <td className="align-middle text-small">{SCoverage}</td>
            <td className="align-middle text-small">{ResultYards}</td>
            <td className="align-middle text-small">{Result}</td>
        </tr>
    );
};

export const PBPMobileRow = ({ play }) => {
    const {
        PlayNumber,
        HomeTeamScore,
        AwayTeamScore,
        Quarter,
        Possession,
        TimeRemaining,
        Down,
        Distance,
        LineOfScrimmage,
        PlayType,
        PlayName,
        OffensiveFormation,
        DefensiveFormation,
        PointOfAttack,
        DefensiveTendency,
        BlitzNumber,
        LBCoverage,
        CBCoverage,
        SCoverage,
        ResultYards,
        Result
    } = play;

    const downStr = GetDownStr(Down);
    const distanceLabel =
        downStr === 0 || downStr === '0' || downStr == ''
            ? ''
            : `${downStr} and ${Distance}`;

    return (
        <div className="row mb-1">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        Play {PlayNumber} | Possession: {Possession}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        {HomeTeamScore}-{AwayTeamScore}, {Quarter}Q,{' '}
                        {TimeRemaining}, {distanceLabel}, {LineOfScrimmage} LOS
                    </h6>
                    <div className="row mb-1">
                        <div className="col">
                            <p className="card-text">
                                Off. Formation: {OffensiveFormation}
                            </p>
                        </div>
                        <div className="col">
                            <p className="card-text">
                                Def. Formation: {DefensiveFormation}
                            </p>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col">
                            <p className="card-text">Play Type: {PlayType}</p>
                            <p className="card-text">Play Name: {PlayName}</p>
                        </div>
                        <div className="col">
                            <p className="card-text">
                                Point of Attack: {PointOfAttack}
                            </p>
                            <p className="card-text">
                                Def. Tendency: {DefensiveTendency}
                            </p>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col">
                            <p className="card-text">
                                Blitz No.: {BlitzNumber}
                            </p>
                            <p className="card-text">
                                Resulting Yds: {ResultYards}
                            </p>
                        </div>
                        <div className="col">
                            <p className="card-text">
                                LB Coverage: {LBCoverage}
                            </p>
                            <p className="card-text">
                                CB Coverage: {CBCoverage}
                            </p>
                            <p className="card-text">S Coverage: {SCoverage}</p>
                        </div>
                    </div>
                    <p className="card-text">{Result}</p>
                </div>
            </div>
        </div>
    );
};
