import React, { useEffect } from 'react';
import { GetPredictionRound } from '../../../../_Utility/utilHelper';

export const NBADrafteeRow = ({ idx, player, map, ts, add, theme }) => {
    const [flag, setFlag] = React.useState(false);
    const keyCode =
        player.FirstName +
        player.LastName +
        player.Position +
        player.State +
        player.Country;
    useEffect(() => {
        if (map) {
            setFlag(map[keyCode]);
        }
    }, [map, keyCode]);
    const location = player.Country === 'USA' ? player.State : player.Country;

    const scoutPlayer = () => {
        return add(player);
    };
    return (
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
                    ) : player.DraftedTeamID === 0 || !ts.IsDraftTime ? (
                        <h2>
                            <i
                                className="bi bi-plus-circle-fill rounded-circle link-success"
                                onClick={scoutPlayer}
                            />
                        </h2>
                    ) : (
                        <h2>
                            <i class="bi bi-file-lock-fill" />
                        </h2>
                    )}
                </td>
            </tr>
        </>
    );
};
