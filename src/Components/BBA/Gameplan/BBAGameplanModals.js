import React from 'react';
import { InfoModal } from '../../_Common/ModalComponents';

export const PaceModal = () => (
    <InfoModal id="paceModal" header="Pace Info">
        <div className="modal-text">
            Pace is how fast your team will play when games are ran. Pace puts
            into effect how many possessions are in a game overall. The slower
            the pace, the less possessions there are. The faster the pace, the
            more possessions. Possessions allow you and your opponent to make
            plays and make attempts at scoring the ball. Pace allows you to
            provide input into how many chances each team will have at a
            possession.
        </div>
    </InfoModal>
);

export const OffensiveFormationModal = () => (
    <InfoModal id="offFormModal" header="Offensive Formation Info">
        <div className="row">
            <div className="modal-text">
                Offensive Formation is the foundation of your team's offense,
                and the template to how your team will run. There are five
                options for offensive formations, each with their own limits in
                terms of shot proportion, bonuses, and maluses.
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-3">
                <h5>Name</h5>
            </div>
            <div className="col-3">
                <h5>Shot Proportions</h5>
            </div>
            <div className="col-3">
                <h5>Bonuses</h5>
            </div>
            <div className="col-3">
                <h5>Maluses</h5>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-3">
                <h6>Balanced</h6>
            </div>
            <div className="col-3">
                <div className="modal-text">All Types: 20% - 60%</div>
            </div>
            <div className="col-3">
                <div className="modal-text">None</div>
            </div>
            <div className="col-3">
                <div className="modal-text">None</div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-3">
                <h6>Motion</h6>
            </div>
            <div className="col-3">
                <div className="modal-text">
                    Inside & Mid: 10% - 20% | 3pt: 30%-70%
                </div>
            </div>
            <div className="col-3">
                <div className="modal-text">Inside Shooting, 3pt Shooting</div>
            </div>
            <div className="col-3">
                <div className="modal-text">Ballwork, Rebounding</div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-3">
                <h6>Pick-and-Roll</h6>
            </div>
            <div className="col-3">
                <div className="modal-text">All Types: 20% - 60%</div>
            </div>
            <div className="col-3">
                <div className="modal-text">Inside Shooting, Ballwork</div>
            </div>
            <div className="col-3">
                <div className="modal-text">Mid-Range shooting, Rebounding</div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-3">
                <h6>Post-Up</h6>
            </div>
            <div className="col-3">
                <div className="modal-text">
                    Inside: 40% - 80% | Mid & 3pt: 5% - 15%
                </div>
            </div>
            <div className="col-3">
                <div className="modal-text">Inside Shooting, Rebounding</div>
            </div>
            <div className="col-3">
                <div className="modal-text">Mid-Range & 3pt Shooting</div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-3">
                <h6>Space-and-Post</h6>
            </div>
            <div className="col-3">
                <div className="modal-text">
                    Mid & 3pt: 30% - 70% | Inside: 10% - 20%
                </div>
            </div>
            <div className="col-3">
                <div className="modal-text">Mid-Range & 3pt Shooting</div>
            </div>
            <div className="col-3">
                <div className="modal-text">Ballwork, Rebounding</div>
            </div>
        </div>
    </InfoModal>
);

export const DefensiveFormationModal = () => (
    <InfoModal id="defFormModal" header="Defensive Formation Info">
        <div className="row">
            <div className="modal-text mb-2">
                Defense Formation is the foundation of your team's defense, and
                the template to how your team will run when defending your side
                of the court. There are five options for defensive formations,
                each with their own limits in terms of bonuses, and maluses.
            </div>
            <div className="modal-text">
                Certain formations allow you to double team a player, meaning
                you can place a malus on an opposing player in your next match.
                The downside of this option, however, is that all
                non-double-teamed players will receive a bonus to shots from any
                range. This is completely optional.
            </div>
        </div>
        <div className="row">
            <div className="col-3">
                <h5>Name</h5>
            </div>
            <div className="col-3">
                <h5>Bonuses</h5>
            </div>
            <div className="col-3">
                <h5>Maluses</h5>
            </div>
            <div className="col-3">
                <h5>Allow Double Team</h5>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-3">
                <h6>Man-to-Man</h6>
            </div>
            <div className="col-3">
                <div className="modal-text">None</div>
            </div>
            <div className="col-3">
                <div className="modal-text">None</div>
            </div>
            <div className="col-3">
                <div className="modal-text">Yes</div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-3">
                <h6>1-3-1 Zone</h6>
            </div>
            <div className="col-3">
                <div className="modal-text">
                    Turnovers, Mid-Range malus to opposing team
                </div>
            </div>
            <div className="col-3">
                <div className="modal-text">
                    Opposing team bonus to inside shots & 3pt shots
                </div>
            </div>
            <div className="col-3">
                <div className="modal-text">No</div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-3">
                <h6>3-2 Zone</h6>
            </div>
            <div className="col-3">
                <div className="modal-text">Opposing team 3pt malus</div>
            </div>
            <div className="col-3">
                <div className="modal-text">
                    Opposing team inside shooting & rebounding bonus
                </div>
            </div>
            <div className="col-3">
                <div className="modal-text">No</div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-3">
                <h6>2-3 Zone</h6>
            </div>
            <div className="col-3">
                <div className="modal-text">
                    Rebounding, opposing team inside shot malus
                </div>
            </div>
            <div className="col-3">
                <div className="modal-text">
                    Opposing team 3pt shooting bonus
                </div>
            </div>
            <div className="col-3">
                <div className="modal-text">No</div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-3">
                <h6>Box-and-One Zone</h6>
            </div>
            <div className="col-3">
                <div className="modal-text">
                    Focus player has malus to all shots
                </div>
            </div>
            <div className="col-3">
                <div className="modal-text">
                    Non-focus player has bonus to all shots
                </div>
            </div>
            <div className="col-3">
                <div className="modal-text">Yes</div>
            </div>
        </div>
    </InfoModal>
);

export const OffensiveStyleModal = ({ isNBA }) => (
    <InfoModal id="offStyleModal" header="Offensive Style Info">
        <div className="row">
            <div className="modal-text"></div>
        </div>
        <div className="row">
            <div className="col">
                <h5>Name</h5>
            </div>
            <div className="col">
                <h5>PG Minutes</h5>
            </div>
            <div className="col">
                <h5>SG Minutes</h5>
            </div>
            <div className="col">
                <h5>SF Minutes</h5>
            </div>
            <div className="col">
                <h5>PF Minutes</h5>
            </div>
            <div className="col">
                <h5>C Minutes</h5>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h6>Traditional</h6>
            </div>
            <div className="col">{isNBA ? 48 : 40}</div>
            <div className="col">{isNBA ? 48 : 40}</div>
            <div className="col">{isNBA ? 48 : 40}</div>
            <div className="col">{isNBA ? 48 : 40}</div>
            <div className="col">{isNBA ? 48 : 40}</div>
        </div>
        <div className="row">
            <div className="col">
                <h6>Small Ball</h6>
            </div>
            <div className="col">{isNBA ? 48 : 40}</div>
            <div className="col">{isNBA ? 96 : 80}</div>
            <div className="col">{isNBA ? 48 : 40}</div>
            <div className="col">{isNBA ? 48 : 40}</div>
            <div className="col">0</div>
        </div>
        <div className="row">
            <div className="col">
                <h6>Microball</h6>
            </div>
            <div className="col">{isNBA ? 96 : 80}</div>
            <div className="col">{isNBA ? 96 : 80}</div>
            <div className="col">{isNBA ? 48 : 40}</div>
            <div className="col">0</div>
            <div className="col">0</div>
        </div>
        <div className="row">
            <div className="col">
                <h6>Jumbo</h6>
            </div>
            <div className="col">0</div>
            <div className="col">{isNBA ? 48 : 40}</div>
            <div className="col">{isNBA ? 48 : 40}</div>
            <div className="col">{isNBA ? 96 : 80}</div>
            <div className="col">{isNBA ? 48 : 40}</div>
        </div>
    </InfoModal>
);
