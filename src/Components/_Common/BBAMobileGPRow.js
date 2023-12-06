import React from 'react';
import { Dropdown } from './Dropdown';
import { GetCollegeYear, getCBBPositionList } from '../../_Utility/utilHelper';
import {
    MobileAttribute,
    MobileDropdownRow,
    MobileInputRow
} from './MobileAttributeTab';

export const MobileBBAGPRow = ({
    player,
    idx,
    updatePlayer,
    gameplan,
    updatePosition,
    isNBA
}) => {
    const minutes = player.P1Minutes + player.P2Minutes + player.P3Minutes;
    const positionList = getCBBPositionList(player.Position);
    const year = GetCollegeYear(player);
    const handleChange = (event) => {
        return updatePlayer(idx, event);
    };

    const handlePosition = (name, value) => {
        return updatePosition(idx, name, value);
    };

    const TitleLabel = `${year} ${player.Position} ${player.FirstName} ${player.LastName}`;

    return (
        <div className="card mb-2">
            <div className="card-body text-start">
                <div className="row mb-2">
                    <h5
                        className={`card-title ${
                            player.IsRedshirting || player.IsGLeague
                                ? 'text-danger'
                                : ''
                        }`}
                    >
                        {TitleLabel}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Overall: {isNBA ? player.Overall : player.OverallGrade}
                    </h6>
                </div>
                <div className="row d-flex mb-3">
                    {gameplan.ToggleFN && (
                        <MobileAttribute
                            label="Finishing"
                            value={
                                isNBA ? player.Finishing : player.FinishingGrade
                            }
                        />
                    )}
                    {gameplan.Toggle2pt && (
                        <MobileAttribute
                            label="2pt Shooting"
                            value={
                                isNBA ? player.Shooting2 : player.Shooting2Grade
                            }
                        />
                    )}
                    {gameplan.Toggle3pt && (
                        <MobileAttribute
                            label="3pt Shooting"
                            value={
                                isNBA ? player.Shooting3 : player.Shooting3Grade
                            }
                        />
                    )}
                    {gameplan.ToggleFT && (
                        <MobileAttribute
                            label="Free Throw"
                            value={
                                isNBA ? player.FreeThrow : player.FreeThrowGrade
                            }
                        />
                    )}
                    {gameplan.ToggleBW && (
                        <MobileAttribute
                            label="Ballwork"
                            value={
                                isNBA ? player.Ballwork : player.BallworkGrade
                            }
                        />
                    )}
                    {gameplan.ToggleRB && (
                        <MobileAttribute
                            label="Rebounding"
                            value={
                                isNBA
                                    ? player.Rebounding
                                    : player.ReboundingGrade
                            }
                        />
                    )}
                    {gameplan.ToggleID && (
                        <MobileAttribute
                            label="Int. Defense"
                            value={
                                isNBA
                                    ? player.InteriorDefense
                                    : player.InteriorDefenseGrade
                            }
                        />
                    )}
                    {gameplan.TogglePD && (
                        <MobileAttribute
                            label="Per. Defense"
                            value={
                                isNBA
                                    ? player.PerimeterDefense
                                    : player.PerimeterDefenseGrade
                            }
                        />
                    )}
                    <MobileInputRow
                        label="Ins. Proportion"
                        name="InsideProportion"
                        value={player.InsideProportion}
                        change={handleChange}
                    />
                    <MobileInputRow
                        label="Mid. Proportion"
                        name="MidRangeProportion"
                        value={player.MidRangeProportion}
                        change={handleChange}
                    />
                    <MobileInputRow
                        label="3pt. Proportion"
                        name="ThreePointProportion"
                        value={player.ThreePointProportion}
                        change={handleChange}
                    />
                    <MobileDropdownRow
                        label="Position One"
                        name="PositionOne"
                        value={player.PositionOne}
                        click={handlePosition}
                        list={positionList}
                    />
                    <MobileInputRow
                        label="Pos. One Minutes"
                        name="P1Minutes"
                        value={player.P1Minutes}
                        change={handleChange}
                    />
                    {gameplan.ToggleP2 && (
                        <>
                            <MobileDropdownRow
                                label="Position Two"
                                name="PositionTwo"
                                value={player.PositionTwo}
                                click={handlePosition}
                                list={positionList}
                            />
                            <MobileInputRow
                                label="Pos. Two Minutes"
                                name="P2Minutes"
                                value={player.P2Minutes}
                                change={handleChange}
                            />
                        </>
                    )}
                    {gameplan.ToggleP3 && (
                        <>
                            <MobileDropdownRow
                                label="Position Two"
                                name="PositionTwo"
                                value={player.PositionTwo}
                                click={handlePosition}
                                list={positionList}
                            />
                            <MobileInputRow
                                label="Pos. Three Minutes"
                                name="P3Minutes"
                                value={player.P3Minutes}
                                change={handleChange}
                            />
                        </>
                    )}
                    <MobileAttribute label="Total Minutes" value={minutes} />
                    <MobileAttribute label="Stamina" value={player.Stamina} />
                    <MobileAttribute
                        label="Playtime Expectations"
                        value={player.PlaytimeExpectations}
                    />
                </div>
            </div>
        </div>
    );
};
