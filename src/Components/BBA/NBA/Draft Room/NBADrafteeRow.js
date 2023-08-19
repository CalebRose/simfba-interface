import React, { useEffect } from 'react';
import { GetPredictionRound } from '../../../../_Utility/utilHelper';

export const NBADrafteeRow = ({
    idx,
    player,
    map,
    draftMap,
    ts,
    add,
    theme,
    isMobile
}) => {
    const [flag, setFlag] = React.useState(false);
    const [lockFlag, setLockFlag] = React.useState(false);
    const keyCode = player.ID;
    useEffect(() => {
        if (map) {
            setFlag(map[keyCode]);
        }
    }, [map, keyCode]);

    useEffect(() => {
        if (draftMap) {
            setLockFlag(() => draftMap[keyCode]);
        }
    }, [draftMap, keyCode]);

    const location = player.Country === 'USA' ? player.State : player.Country;

    const scoutPlayer = () => {
        return add(player);
    };
    return !isMobile ? (
        <>
            <tr className="draftee-row">
                <th scope="row">
                    <h4>{idx + 1}</h4>
                </th>
                <td className="align-middle">
                    <h6>
                        {player.Position} {player.FirstName} {player.LastName}
                    </h6>
                </td>
                <td className="align-middle">{player.Age}</td>
                <td className="align-middle">{player.Height}</td>
                <td className="align-middle">{player.College}</td>
                <td className="align-middle">{location}</td>
                <td className="align-middle">{player.OverallGrade}</td>
                <td>
                    {flag ? (
                        <h2>
                            <i className="bi bi-check-circle-fill rounded-circle link-secondary" />
                        </h2>
                    ) : lockFlag ? (
                        <h2>
                            <i class="bi bi-file-lock-fill" />
                        </h2>
                    ) : (
                        <h2>
                            <i
                                className="bi bi-plus-circle-fill rounded-circle link-success"
                                onClick={scoutPlayer}
                            />
                        </h2>
                    )}
                </td>
            </tr>
        </>
    ) : (
        <>
            <div className="card mb-1">
                <div className="card-body">
                    <h5 className="card-title">
                        {player.FirstName} {player.LastName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        Rank {idx + 1}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        {player.Age} year old {player.Height} {player.Position}{' '}
                        from {player.College}
                    </h6>
                    <p className="card-text">Overall: {player.OverallGrade}</p>
                </div>
                <div className="card-body">
                    <div className="btn-group" role="group">
                        {flag ? (
                            <h2>
                                <i className="bi bi-check-circle-fill rounded-circle link-secondary" />
                            </h2>
                        ) : lockFlag ? (
                            <h2>
                                <i class="bi bi-file-lock-fill" />
                            </h2>
                        ) : (
                            <h2>
                                <i
                                    className="bi bi-plus-circle-fill rounded-circle link-success"
                                    onClick={scoutPlayer}
                                />
                            </h2>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
