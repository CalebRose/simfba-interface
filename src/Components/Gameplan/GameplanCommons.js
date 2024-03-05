import React from 'react';
import { DropdownItem } from '../_Common/Dropdown';
import { CommonModal } from '../_Common/ModalComponents';
import { schemeDropdownClass } from './GameplanConstants';

export const OpposingSchemeRow = ({ scheme }) => {
    return (
        <div className="row w-86 p-1 pt-2 border rounded-2 mb-2">
            <div className="col-auto">
                <h6>Opposing Scheme: {scheme}</h6>
            </div>
        </div>
    );
};

export const SchemeDropdown = ({
    teamColors,
    scheme,
    name,
    options,
    HandleTextChange,
    isDefault
}) => {
    return (
        <div className="dropdown">
            <button
                className={schemeDropdownClass}
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={teamColors ? teamColors : {}}
                disabled={isDefault}
            >
                {scheme}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {options.map((x) => (
                    <DropdownItem
                        name={name}
                        id={name}
                        value={x}
                        click={HandleTextChange}
                    />
                ))}
            </ul>
        </div>
    );
};

export const GPTab = ({ activeView, gameplanType, setActiveView }) => {
    const isActiveView = activeView === gameplanType;

    return (
        <li className="nav-item">
            <button
                type="button"
                role="tab"
                onClick={() => setActiveView(() => gameplanType)}
                className={`nav-link ${isActiveView ? 'active' : ''}`}
            >
                {gameplanType}
            </button>
        </li>
    );
};
export const SchemeModal = ({ Header, ID, ModalClass }) => {
    return (
        <CommonModal Header={Header} ID={ID} ModalClass={ModalClass}>
            <div className="mb-2">
                This is the scheme that your team uses as the foundation of your
                offense. Think of it as a blueprint. As of the 2024 season we
                have expanded from four offensive schemes to twelve. Each scheme
                offers a variety of formations and personnel combinations to
                choose from, and specialize in different types of plays. Below
                is the list for all scheme groups, and their approach to the
                game:
            </div>
            <ul>
                <li>
                    Pro Schemes have the most balanced approach between the run
                    game and pass game, and tend to have between 1-2 RBs, 1-2
                    TEs, and 2-3 WRs on the field at a time. Schemes: Power Run,
                    Vertical, West Coast, and I-Option
                </li>
                <li>
                    Spread Schemes are defined by their pass-focused approach by
                    spreading the field with as many wide receivers as possible.
                    Tend to have 1-fewer RBs, 1-fewer TEs, and 2-5 WR on the
                    field at a time. Schemes include Run and Shoot, Air Raid,
                    Pistol, and Spread Option.
                </li>
                <li>
                    Smashmouth Schemes are defined by their run-focused approach
                    and your team's potential to be an all star (pun intended).
                    Smashmouth schemes have 2-3 RBs, 1-3 TEs, and 2-fewer WRs on
                    the field at a time. Schemes include the Wing-T, Double
                    Wing, Wishbone, and Flexbone offense.
                </li>
            </ul>
            <div>
                To view each scheme and their formations, I suggest using the
                dropdown as it provides sufficient information on the strengths
                and weaknesses of each scheme. It is also suggested to commit an
                offensive scheme for your team during the off-season and by the
                first week of games. Switching schemes in the middle of the
                season will incur a penalty for your team. Rosters need to be
                familiar with their chosen scheme, and adjusting during the
                season will impact their performance negatively.
            </div>
        </CommonModal>
    );
};

export const FormationModal = ({ Header, ID, ModalClass }) => {
    return (
        <CommonModal Header={Header} ID={ID} ModalClass={ModalClass}>
            <div className="mb-2">
                The Offensive Formations window is where you can set the weights
                for the formations that you want to use for your next game. Each
                scheme has five formations with differing personnel, allowing
                you to control which personnel groups are on the field at a
                time. Not every formation is the same, and each formation
                carries a different set of plays.
            </div>
            <div>
                You can place weights into 2-5 formations at a time for your
                upcoming match up, and you can input weights towards the type of
                plays that are executed with each formation. It is recommended
                to mix and play around with the different formations, to see
                which ones are the best fit given your roster and depth chart.
            </div>
            <div>
                You may also selected the "Default Offense" option if you don't
                want to customize your offense. This make the computer choose
                the formations and distributions for you, with only limited
                input in terms of target passes. You can always toggle this off
                if you want to provide more customization.
            </div>
        </CommonModal>
    );
};

export const DistributionsModal = ({ Header, ID, ModalClass }) => {
    return (
        <CommonModal Header={Header} ID={ID} ModalClass={ModalClass}>
            <div className="mb-2">
                The Offensive Distributions window is where you can configure
                which types of plays are ran, and which player is being
                distributed or targeted for the ball in both the run and pass
                game.
            </div>
            <div>
                The first two windows cover Target Distribution (pass game) and
                Running Distributions (run game). These are weights that can
                accept an input between 0 and 10. There is no minimum or maximum
                required within either grouping. Instead, the heaver the weights
                placed on the player means the more likely they are to be
                targeted. (Example: Input Weight / TotalWeightAcross
                Distribution)
            </div>
            <div>
                The dropdown by the Target Distribution inputs allow you to
                control which type of pass the receiver will most likely run.
                You can choose between Quick, Short, Long, and None, with none
                being no preference.
            </div>
            <div>
                The final four distributions cover Run, Option, Pass, and RPO
                type plays, and must accumulate to a sum of 100 in each
                category. In the event that you as a player have no Offensive
                Formation weights in either Option or RPO plays, you can leave
                the weights as is.
            </div>
        </CommonModal>
    );
};

export const DefensiveSchemeModal = ({ Header, ID, ModalClass }) => {
    return (
        <CommonModal Header={Header} ID={ID} ModalClass={ModalClass}>
            <p className="mb-2 text-small">
                Defensive Schemes are the blueprint for your team's defense. As
                of the 2024 season we have expanded the number of defensive
                formations from two (4-3, 3-4) to six different schemes. Each
                scheme has strengths and weaknesses in terms of formations,
                personnel groups, and which schemes are strong/weak against
                offensive formations. To see the details for each formation, use
                the dropdown under "Defensive Scheme".
            </p>
            <p className="text-small">
                Each Scheme gives you access to a set of five different
                potential defensive formations. When planning your defense, you
                will be given information on your opponent's offensive scheme
                and the five formations under the scheme. You will not be given
                information as far as which formations your opponent will use.
                Instead, you can select a defensive formation to use to face off
                against the potential offensive formation. Use the formation
                dropdowns in the Opposing Formation cards to select a defensive
                formation.
            </p>
            <p className="text-small">
                When you've selected a defensive formation, you will get
                information on the type of personnel that will be on the
                defensive side of the field, with the order going as following:
            </p>
            <p className="text-small">
                Top row is the defensive line. Middle row is the middle of the
                field (linebackers). The bottom row is players in your secondary
                and backfield.
            </p>
            <p className="text-small">
                Use these dropdowns to find the best match for the offensive
                formation you're playing against, to ensure that your defensive
                players match with the personnel that will be on the field. You
                will also be given access to Run/Pass Ratios and Blitz options
                for each formation, giving you control over which defensive
                formation should lean more into the run, more into the pass, or
                how often you want to blitz in a specific formation.
            </p>
            <p className="text-small">
                The defensive settings section provides options on which
                secondary players you want to blitz with the front 7, along with
                coverage options between linebackers, corners, and safeties.
            </p>
        </CommonModal>
    );
};
