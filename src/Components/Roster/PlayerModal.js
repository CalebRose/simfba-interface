import React from 'react';
import { GetModalClass } from '../../Constants/CSSClassHelper';
import { GetOverall, GetYear, SetPriority } from '../../_Utility/RosterHelper';
import AttributeRow from './AttributeRow';

const PlayerModal = (props) => {
    const { player, team, idx, viewMode } = props;
    const playerRecord = player;
    playerRecord['priorityAttributes'] = SetPriority(playerRecord);
    const year = GetYear(player);
    const ovr = GetOverall(player.Overall, player.Year);
    const playerModalID = 'playerModal' + idx;
    const modalClass = GetModalClass(viewMode);

    return (
        <div
            className="modal fade"
            id={playerModalID}
            tabindex="-1"
            aria-labelledby="playerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className={modalClass}>
                    <header className="modal-header">
                        <h2 className="modal-title">
                            {player.FirstName + ' ' + player.LastName}
                        </h2>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </header>
                    <section className="modal-body">
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
                                        <strong>Archetype:</strong>{' '}
                                        {player.Archetype}
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
                            player.priorityAttributes.length > 0
                                ? player.priorityAttributes.map((attribute) => (
                                      <AttributeRow
                                          key={attribute.Name}
                                          data={attribute}
                                      />
                                  ))
                                : ''}
                        </div>
                    </section>
                    <footer className="modal-footer">
                        <button
                            className="btn btn-light"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default PlayerModal;
