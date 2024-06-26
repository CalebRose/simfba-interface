import React from 'react';
import { Dropdown } from '../../_Common/Dropdown';
import {
    GetAdjStaminaByPace,
    GetCollegeYear,
    getCBBPositionList
} from '../../../_Utility/utilHelper';

const GameplanPlayerRow = ({
    player,
    idx,
    pace,
    updatePlayer,
    gameplan,
    updatePosition
}) => {
    const minutes = player.P1Minutes + player.P2Minutes + player.P3Minutes;
    const positionList = getCBBPositionList(player.Position);
    let year = GetCollegeYear(player);

    const handleChange = (event) => {
        return updatePlayer(idx, event);
    };

    const handlePosition = (name, value) => {
        return updatePosition(idx, name, value);
    };

    const adjStamina = GetAdjStaminaByPace(player.Stamina, pace);

    return (
        <tr>
            <th scope="row" className="align-middle">
                <h6 className={player.IsRedshirting ? 'text-danger' : ''}>
                    {year} {player.Position}{' '}
                    {player.FirstName + ' ' + player.LastName}
                </h6>
            </th>
            <td className="align-middle">{player.OverallGrade}</td>
            {gameplan.ToggleFN && (
                <td className="align-middle">{player.FinishingGrade}</td>
            )}
            {gameplan.Toggle2pt && (
                <td className="align-middle">{player.Shooting2Grade}</td>
            )}
            {gameplan.Toggle3pt && (
                <td className="align-middle">{player.Shooting3Grade}</td>
            )}
            {gameplan.ToggleFT && (
                <td className="align-middle">{player.FreeThrowGrade}</td>
            )}
            {gameplan.ToggleBW && (
                <td className="align-middle">{player.BallworkGrade}</td>
            )}
            {gameplan.ToggleRB && (
                <td className="align-middle">{player.ReboundingGrade}</td>
            )}
            {gameplan.ToggleID && (
                <td className="align-middle">{player.InteriorDefenseGrade}</td>
            )}
            {gameplan.TogglePD && (
                <td className="align-middle">{player.PerimeterDefenseGrade}</td>
            )}
            <td className="minutes-input align-middle">
                <input
                    name="InsideProportion"
                    type="number"
                    className={`form-control ${
                        player.InsideProportion > 15 ? 'border-danger' : ''
                    }`}
                    id="gameMinutes"
                    aria-describedby="gameMinutes"
                    value={player.InsideProportion}
                    onChange={handleChange}
                />
            </td>
            <td className="minutes-input align-middle">
                <input
                    name="MidRangeProportion"
                    type="number"
                    className={`form-control ${
                        player.MidRangeProportion > 15 ? 'border-danger' : ''
                    }`}
                    id="gameMinutes"
                    aria-describedby="gameMinutes"
                    value={player.MidRangeProportion}
                    onChange={handleChange}
                />
            </td>
            <td className="minutes-input align-middle">
                <input
                    name="ThreePointProportion"
                    type="number"
                    className={`form-control ${
                        player.ThreePointProportion > 15 ? 'border-danger' : ''
                    }`}
                    id="gameMinutes"
                    aria-describedby="gameMinutes"
                    value={player.ThreePointProportion}
                    onChange={handleChange}
                />
            </td>
            <td className="align-middle">
                <Dropdown
                    value={player.PositionOne}
                    click={handlePosition}
                    name="PositionOne"
                    list={positionList}
                />
            </td>
            <td className="minutes-input align-middle">
                <input
                    name="P1Minutes"
                    type="number"
                    className="form-control"
                    id="gameMinutes"
                    aria-describedby="gameMinutes"
                    value={player.P1Minutes}
                    onChange={handleChange}
                />
            </td>
            {gameplan.ToggleP2 && (
                <>
                    <td className="align-middle">
                        <Dropdown
                            value={player.PositionTwo}
                            click={handlePosition}
                            name="PositionTwo"
                            list={positionList}
                        />
                    </td>
                    <td className="minutes-input align-middle">
                        <input
                            name="P2Minutes"
                            type="number"
                            className="form-control"
                            id="gameMinutes"
                            aria-describedby="gameMinutes"
                            value={player.P2Minutes}
                            onChange={handleChange}
                        />
                    </td>
                </>
            )}
            {gameplan.ToggleP3 && (
                <>
                    <td className="align-middle">
                        <Dropdown
                            value={player.PositionThree}
                            click={handlePosition}
                            name="PositionThree"
                            list={positionList}
                        />
                    </td>
                    <td className="minutes-input align-middle">
                        <input
                            name="P3Minutes"
                            type="number"
                            className="form-control"
                            id="gameMinutes"
                            aria-describedby="gameMinutes"
                            value={player.P3Minutes}
                            onChange={handleChange}
                        />
                    </td>
                </>
            )}
            <td
                className={`align-middle ${
                    minutes > adjStamina ? 'text-danger' : ''
                }`}
            >
                {minutes}
            </td>
            <td className="align-middle">{adjStamina}</td>
            <td className="align-middle">{player.PlaytimeExpectations}</td>
        </tr>
    );
};

export default GameplanPlayerRow;
