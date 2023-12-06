import React from 'react';
import { GetModalClass } from '../../Constants/CSSClassHelper';
import { GetOverall, GetYear, SetPriority } from '../../_Utility/RosterHelper';
import AttributeRow from './AttributeRow';
import { CommonModal } from '../_Common/ModalComponents';

const PlayerModal = (props) => {
    const { player, team, idx, viewMode } = props;
    const playerRecord = player;
    playerRecord['priorityAttributes'] = SetPriority(playerRecord);
    const year = GetYear(player);
    const ovr = GetOverall(player.Overall, player.Year);
    const playerModalID = 'playerModal' + idx;
    const modalClass = GetModalClass(viewMode);
    const modalHeader = `${player.FirstName} ${player.LastName}`;
    return (
        <CommonModal
            ID={playerModalID}
            ModalClass={modalClass}
            Header={modalHeader}
        >
            <div className="row">
                <div className="col">
                    <div className="row text-start">
                        <h5>{team.TeamName}</h5>
                        <p className="gap">
                            <strong>Year: </strong>
                            {year ? year : ''}
                        </p>
                        <p className="gap">
                            <strong>Stars: </strong>
                            {player.Stars}
                        </p>
                    </div>
                </div>
                <div className="col">
                    <div className="row text-start">
                        <p>
                            <strong>Position: </strong>
                            {player.Position}
                        </p>
                        <p>
                            <strong>Archetype:</strong> {player.Archetype}
                        </p>
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-auto">
                    <h4 className="">
                        {player.Height} inches, {player.Weight} lbs
                    </h4>
                </div>
                <div className="col-md-auto">
                    <h4 className="">Overall: {ovr}</h4>
                </div>
            </div>
            <div className="AttributeTable row mt-1">
                {player.priorityAttributes &&
                    player.priorityAttributes.length > 0 &&
                    player.priorityAttributes.map((attribute) => (
                        <AttributeRow
                            key={attribute.Name}
                            data={attribute}
                            theme={viewMode}
                        />
                    ))}
            </div>
        </CommonModal>
    );
};

export default PlayerModal;
