import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BBAPlayerService from '../../../../_Services/simNBA/BBAPlayerService';
import BBAGameplanService from '../../../../_Services/simNBA/BBAGameplanService';
import { GetTableHoverClass } from '../../../../Constants/CSSClassHelper';
import {
    GetBBAMinutesRequired,
    getProportionLimits
} from '../../../../_Utility/utilHelper';
import { Dropdown } from '../../../_Common/Dropdown';
import {
    DefensiveFormationModal,
    OffensiveFormationModal,
    OffensiveStyleModal,
    PaceModal
} from '../../Gameplan/BBAGameplanModals';
import { BBAToggle } from '../../../_Common/SwitchToggle';
import NBAGameplanPlayerRow from './NBAGameplanPlayerRow';

const NBAGameplan = ({ currentUser, viewMode }) => {
    let playerService = new BBAPlayerService();
    let gameplanService = new BBAGameplanService();
    const [team, setTeam] = React.useState('');
    const [roster, setRoster] = React.useState(null);
    const [opposingRoster, setOpposingRoster] = React.useState([]);
    const [gameplan, setGameplan] = React.useState(null);
    const [isValid, setValidation] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [serviceMessage, setServiceMessage] = React.useState('');
    const [pgMinutes, setPGMinutes] = React.useState(0);
    const [sgMinutes, setSGMinutes] = React.useState(0);
    const [sfMinutes, setSFMinutes] = React.useState(0);
    const [pfMinutes, setPFMinutes] = React.useState(0);
    const [cMinutes, setCMinutes] = React.useState(0);
    const [iProp, setIProp] = React.useState(0);
    const [midProp, setMidProp] = React.useState(0);
    const [thrProp, setThrProp] = React.useState(0);
    const savingMessage = 'Saving...';
    const paceOptions = ['Very Fast', 'Fast', 'Balanced', 'Slow', 'Very Slow'];
    const offFormations = [
        'Balanced',
        'Motion',
        'Pick-and-Roll',
        'Post-Up',
        'Space-and-Post'
    ];
    const defFormations = [
        'Man-to-Man',
        '1-3-1 Zone',
        '3-2 Zone',
        '2-3 Zone',
        'Box-and-One Zone'
    ];
    const styleList = ['Traditional', 'Small Ball', 'Microball', 'Jumbo'];
    const tableHoverClass = GetTableHoverClass(viewMode);
    useEffect(() => {
        if (currentUser) {
            setTeam(() => currentUser.NBATeam);
            getGameplan();
            getRoster();
        }
    }, [currentUser]);

    useEffect(() => {
        if (gameplan && roster) {
            checkValidation();
        }
    }, [gameplan, roster]);

    const getGameplan = async () => {
        // Get Gameplan Route using team Id
        let res = await gameplanService.GetNBAGameplan(currentUser.NBATeamID);
        setGameplan(() => res.Gameplan);
        const namesList = [...res.OpposingRoster].map(
            (x) => `${x.FirstName} ${x.LastName}`
        );
        setOpposingRoster(() => [...namesList]);
    };

    const getRoster = async () => {
        let players = await playerService.GetNBARosterByTeamID(
            currentUser.NBATeamID
        );
        setRoster(() => players);
    };

    const updateGameplan = (name, value) => {
        let gp = { ...gameplan };
        // Keep the value in range of what's being changed

        gp[name] = value;
        setGameplan(() => gp);
    };

    const UpdateViewableColumns = (event) => {
        const { value } = event.target;
        const gp = { ...gameplan };
        gp[value] = !gp[value];
        setGameplan(() => gp);
    };

    const updatePlayer = (idx, event) => {
        let playerList = [...roster];
        let { name, value } = event.target;
        playerList[idx][name] = Number(value);
        setRoster(() => playerList);
    };

    const updatePlayerPosition = (idx, name, value) => {
        let playerList = [...roster];
        playerList[idx][name] = value;
        setRoster(() => playerList);
    };

    const IsProportionInLimits = (proportion, min, max) => {
        return proportion >= min && proportion <= max;
    };

    const setAllMinutes = (pg, sg, sf, pf, c, ip, mp, tp) => {
        setPGMinutes(() => pg);
        setSGMinutes(() => sg);
        setSFMinutes(() => sf);
        setPFMinutes(() => pf);
        setCMinutes(() => c);
        setIProp(() => ip);
        setMidProp(() => mp);
        setThrProp(() => tp);
    };

    const checkValidation = () => {
        let valid = true;
        const proportionLimit = 100;
        let currentProportion = 0;
        let insideTotal = 0;
        let midTotal = 0;
        let threeTotal = 0;
        const insideMin = getProportionLimits(
            gameplan.OffensiveFormation,
            'Inside',
            true
        );
        const insideMax = getProportionLimits(
            gameplan.OffensiveFormation,
            'Inside',
            false
        );
        const midMin = getProportionLimits(
            gameplan.OffensiveFormation,
            'Mid',
            true
        );
        const midMax = getProportionLimits(
            gameplan.OffensiveFormation,
            'Mid',
            false
        );
        const threeMin = getProportionLimits(
            gameplan.OffensiveFormation,
            'Three',
            true
        );
        const threeMax = getProportionLimits(
            gameplan.OffensiveFormation,
            'Three',
            false
        );

        let message = '';
        const pgMinuteRequirement = GetBBAMinutesRequired(
            'PG',
            gameplan.OffensiveStyle,
            true
        );
        const sgMinuteRequirement = GetBBAMinutesRequired(
            'SG',
            gameplan.OffensiveStyle,
            true
        );
        const sfMinuteRequirement = GetBBAMinutesRequired(
            'SF',
            gameplan.OffensiveStyle,
            true
        );
        const pfMinuteRequirement = GetBBAMinutesRequired(
            'PF',
            gameplan.OffensiveStyle,
            true
        );
        const cMinuteRequirement = GetBBAMinutesRequired(
            'C',
            gameplan.OffensiveStyle,
            true
        );
        let pgMin = 0;
        let sgMin = 0;
        let sfMin = 0;
        let pfMin = 0;
        let cMin = 0;

        // Check Players
        for (let i = 0; i < roster.length; i++) {
            const r = roster[i];
            if (r.P1Minutes < 0) {
                message = `${r.FirstName} ${r.LastName} has allocated ${r.P1Minutes} minutes for position 1. Please set the number of minutes to 0 or above.`;
                setErrorMessage(message);
                valid = false;
                setValidation(valid);
                return;
            }
            if (r.P2Minutes < 0) {
                message = `${r.FirstName} ${r.LastName} has allocated ${r.P2Minutes} minutes for position 2. Please set the number of minutes to 0 or above.`;
                setErrorMessage(message);
                valid = false;
                setValidation(valid);
                return;
            }
            if (r.P3Minutes < 0) {
                message = `${r.FirstName} ${r.LastName} has allocated ${r.P3} minutes for position 3. Please set the number of minutes to 0 or above.`;
                setErrorMessage(message);
                valid = false;
                setValidation(valid);
                return;
            }

            if (r.PositionOne === 'PG') pgMin += r.P1Minutes;
            else if (r.PositionOne === 'SG') sgMin += r.P1Minutes;
            else if (r.PositionOne === 'SF') sfMin += r.P1Minutes;
            else if (r.PositionOne === 'PF') pfMin += r.P1Minutes;
            else if (r.PositionOne === 'C') cMin += r.P1Minutes;
            if (r.PositionTwo === 'PG') pgMin += r.P2Minutes;
            else if (r.PositionTwo === 'SG') sgMin += r.P2Minutes;
            else if (r.PositionTwo === 'SF') sfMin += r.P2Minutes;
            else if (r.PositionTwo === 'PF') pfMin += r.P2Minutes;
            else if (r.PositionTwo === 'C') cMin += r.P2Minutes;
            if (r.PositionThree === 'PG') pgMin += r.P3Minutes;
            else if (r.PositionThree === 'SG') sgMin += r.P3Minutes;
            else if (r.PositionThree === 'SF') sfMin += r.P3Minutes;
            else if (r.PositionThree === 'PF') pfMin += r.P3Minutes;
            else if (r.PositionThree === 'C') cMin += r.P3Minutes;

            if (
                r.IsRedshirting &&
                (r.P1Minutes > 0 || r.P2Minutes > 0 || r.P3Minutes > 0)
            ) {
                message = `${r.FirstName} ${r.LastName} is in the G-League and is allocated ${r.P1Minutes} minutes. Please set the number of minutes to 0.`;
                setErrorMessage(message);
                valid = false;
                setValidation(valid);
                return;
            }

            if (
                r.IsGLeague &&
                (r.InsideProportion > 0 ||
                    r.MidRangeProportion > 0 ||
                    r.ThreePointProportion > 0)
            ) {
                const t =
                    r.InsideProportion +
                    r.MidRangeProportion +
                    r.ThreePointProportion;
                message = `${r.FirstName} ${r.LastName} is redshirted and is allocated ${t} in Shot Proportion. Please set the shot proportion for Inside, Mid, and 3pt to 0.`;
                setErrorMessage(message);
                valid = false;
                setValidation(valid);
                return;
            }

            let playerTotalMinutes = r.P1Minutes + r.P2Minutes + r.P3Minutes;

            if (playerTotalMinutes > r.Stamina) {
                message = `${r.FirstName} ${r.LastName}'s minutes allocation cannot exceed its Stamina.`;
                setErrorMessage(message);
                valid = false;
                setValidation(valid);
                return;
            }

            insideTotal += r.InsideProportion;
            midTotal += r.MidRangeProportion;
            threeTotal += r.ThreePointProportion;
        }

        // Check Gameplan
        // Proportion Requirements
        if (!IsProportionInLimits(threeTotal, threeMin, threeMax)) {
            message = `Three Point Proportion for Gameplan ${gameplan.Game} set to ${threeTotal}. Please make sure this allocation is between ${threeMin} and ${threeMax}.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            setAllMinutes(
                pgMin,
                sgMin,
                sfMin,
                pfMin,
                cMin,
                insideTotal,
                midTotal,
                threeTotal
            );
            return;
        }

        if (!IsProportionInLimits(midTotal, midMin, midMax)) {
            message = `Mid-Range Proportion for Gameplan ${gameplan.Game} set to ${midTotal}. Please make sure this allocation is between ${midMin} and ${midMax}.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            setAllMinutes(
                pgMin,
                sgMin,
                sfMin,
                pfMin,
                cMin,
                insideTotal,
                midTotal,
                threeTotal
            );
            return;
        }

        if (!IsProportionInLimits(insideTotal, insideMin, insideMax)) {
            message = `Inside Proportion for Gameplan ${gameplan.Game} set to ${insideTotal}. Please make sure this allocation is between ${insideMin} and ${insideMax}.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            setAllMinutes(
                pgMin,
                sgMin,
                sfMin,
                pfMin,
                cMin,
                insideTotal,
                midTotal,
                threeTotal
            );
            return;
        }

        currentProportion = threeTotal + midTotal + insideTotal;
        if (
            currentProportion > proportionLimit ||
            currentProportion < proportionLimit
        ) {
            message = `Total Proportion for Gameplan ${gameplan.Game} set to ${currentProportion}. Please make sure your allocation adds up to 100.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            return;
        }

        // Style Requirement
        if (pgMin > pgMinuteRequirement || pgMin < pgMinuteRequirement) {
            message = `Total Minutes between all Point Guards adds up to ${pgMin}.\nPlease make overall total to ${pgMinuteRequirement}.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            setAllMinutes(
                pgMin,
                sgMin,
                sfMin,
                pfMin,
                cMin,
                insideTotal,
                midTotal,
                threeTotal
            );
            return;
        }

        if (sgMin > sgMinuteRequirement || sgMin < sgMinuteRequirement) {
            message = `Total Minutes between all Shooting Guards adds up to ${sgMin}.\nPlease make overall total to ${sgMinuteRequirement}.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            setAllMinutes(
                pgMin,
                sgMin,
                sfMin,
                pfMin,
                cMin,
                insideTotal,
                midTotal,
                threeTotal
            );
            return;
        }

        if (sfMin > sfMinuteRequirement || sfMin < sfMinuteRequirement) {
            message = `Total Minutes between all Small Forwards adds up to ${sfMin}.\nPlease make overall total to ${sfMinuteRequirement}.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            setAllMinutes(
                pgMin,
                sgMin,
                sfMin,
                pfMin,
                cMin,
                insideTotal,
                midTotal,
                threeTotal
            );
            return;
        }

        if (pfMin > pfMinuteRequirement || pfMin < pfMinuteRequirement) {
            message = `Total Minutes between all Power Forwards adds up to ${pfMin}.\nPlease make overall total to ${pfMinuteRequirement}.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            setAllMinutes(
                pgMin,
                sgMin,
                sfMin,
                pfMin,
                cMin,
                insideTotal,
                midTotal,
                threeTotal
            );
            return;
        }

        if (cMin > cMinuteRequirement || cMin < cMinuteRequirement) {
            message = `Total Minutes between all Centers adds up to ${cMin}.\nPlease make overall total to ${cMinuteRequirement}.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            setAllMinutes(
                pgMin,
                sgMin,
                sfMin,
                pfMin,
                cMin,
                insideTotal,
                midTotal,
                threeTotal
            );
            return;
        }
        setAllMinutes(
            pgMin,
            sgMin,
            sfMin,
            pfMin,
            cMin,
            insideTotal,
            midTotal,
            threeTotal
        );
        // Set the validation
        setValidation(valid);
        setErrorMessage('');
    };

    const saveGameplanOptions = async () => {
        checkValidation();
        if (!isValid) return;
        const gameplanOptionsDto = {
            NBAPlayers: roster,
            Gameplan: gameplan,
            teamId: currentUser.NBATeamID
        };
        setServiceMessage(savingMessage);
        const save = await gameplanService.SaveGameplanOptions(
            gameplanOptionsDto,
            'nba'
        );

        if (save.ok) {
            const message = `Successfully update Gameplan and Minutes`;
            setServiceMessage(message);
            setTimeout(() => setServiceMessage(''), 5000);
        } else {
            alert('HTTP-Error:', save.status);
        }
    };

    return (
        <div className="container-fluid mt-3">
            <div className="row ps-2">
                <div className="row mb-1">
                    <div className="col-md-auto justify-content-start">
                        <h2>{team} Gameplan</h2>
                    </div>
                    <div className="col-md-auto ms-auto">
                        <div className="row">
                            {gameplan && (
                                <div className="col-md-auto me-1">
                                    <h6>
                                        Pace{' '}
                                        <button
                                            type="button"
                                            className="btn btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#paceModal"
                                        >
                                            <i className="bi bi-info-circle" />
                                        </button>
                                    </h6>
                                    <Dropdown
                                        value={gameplan.Pace}
                                        click={updateGameplan}
                                        name="Pace"
                                        list={paceOptions}
                                    />
                                </div>
                            )}
                            {gameplan && (
                                <div className="col-md-auto me-1">
                                    <h6>
                                        Offensive Formation{' '}
                                        <button
                                            type="button"
                                            className="btn btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#offFormModal"
                                        >
                                            <i className="bi bi-info-circle" />
                                        </button>
                                    </h6>
                                    <Dropdown
                                        value={gameplan.OffensiveFormation}
                                        click={updateGameplan}
                                        name="OffensiveFormation"
                                        list={offFormations}
                                    />
                                </div>
                            )}
                            {gameplan && (
                                <div className="col-md-auto me-1">
                                    <h6>
                                        Defensive Formation{' '}
                                        <button
                                            type="button"
                                            className="btn btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#defFormModal"
                                        >
                                            <i className="bi bi-info-circle" />
                                        </button>
                                    </h6>
                                    <Dropdown
                                        value={gameplan.DefensiveFormation}
                                        click={updateGameplan}
                                        name="DefensiveFormation"
                                        list={defFormations}
                                    />
                                </div>
                            )}
                            {gameplan && (
                                <div className="col-md-auto me-1">
                                    <h6>
                                        Offensive Style{' '}
                                        <button
                                            type="button"
                                            className="btn btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#offStyleModal"
                                        >
                                            <i className="bi bi-info-circle" />
                                        </button>
                                    </h6>
                                    <Dropdown
                                        value={gameplan.OffensiveStyle}
                                        click={updateGameplan}
                                        name="OffensiveStyle"
                                        list={styleList}
                                    />
                                </div>
                            )}
                            {gameplan &&
                                (gameplan.DefensiveFormation === 'Man-to-Man' ||
                                    gameplan.DefensiveFormation ===
                                        'Box-and-One Zone') &&
                                opposingRoster.length > 0 && (
                                    <div className="col-md-auto me-1">
                                        <h6>Focus Player </h6>
                                        <Dropdown
                                            value={gameplan.FocusPlayer}
                                            click={updateGameplan}
                                            name="FocusPlayer"
                                            list={opposingRoster}
                                        />
                                    </div>
                                )}
                            {isValid ? (
                                <div className="col-md-auto">
                                    <button
                                        className="btn btn-primary"
                                        onClick={saveGameplanOptions}
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="col-md-auto">
                                    <button
                                        className="btn btn-primary"
                                        disabled
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {serviceMessage.length > 0 ||
                    (errorMessage.length > 0 && (
                        <div className="row mt-2 mb-2">
                            {serviceMessage.length > 0 &&
                                serviceMessage !== savingMessage && (
                                    <div className="alert alert-success">
                                        {serviceMessage}
                                    </div>
                                )}
                            {serviceMessage.length > 0 &&
                                serviceMessage === savingMessage && (
                                    <div className="alert alert-secondary">
                                        {serviceMessage}
                                    </div>
                                )}
                            {errorMessage.length > 0 && (
                                <div className="alert alert-danger">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    ))}

                <PaceModal />
                <OffensiveFormationModal />
                <DefensiveFormationModal />
                <OffensiveStyleModal isNBA={true} />
                {gameplan && (
                    <div className="row justify-content-center mt-1 mb-1">
                        {gameplan.OffensiveStyle !== 'Jumbo' && (
                            <div className="col mx-1">
                                <h6>PG Minutes: {pgMinutes}</h6>
                            </div>
                        )}
                        <div className="col mx-1">
                            <h6>SG Minutes: {sgMinutes}</h6>
                        </div>
                        <div className="col mx-1">
                            <h6>SF Minutes: {sfMinutes}</h6>
                        </div>
                        {gameplan.OffensiveStyle !== 'Microball' && (
                            <div className="col mx-1">
                                <h6>PF Minutes: {pfMinutes}</h6>
                            </div>
                        )}
                        {gameplan.OffensiveStyle !== 'Microball' &&
                            gameplan.OffensiveStyle !== 'Small Ball' && (
                                <div className="col mx-1">
                                    <h6>C Minutes: {cMinutes}</h6>
                                </div>
                            )}
                        <div className="col mx-1">
                            <h6>Inside Prop.: {iProp}</h6>
                        </div>
                        <div className="col mx-1">
                            <h6>Mid Range Prop.: {midProp}</h6>
                        </div>
                        <div className="col mx-1">
                            <h6>3pt Prop.: {thrProp}</h6>
                        </div>
                    </div>
                )}
                <div className="row mt-2">
                    {gameplan && (
                        <>
                            <BBAToggle
                                value="ToggleFN"
                                label="Inside Shot"
                                checkValue={gameplan.ToggleFN}
                                change={UpdateViewableColumns}
                            />
                            <BBAToggle
                                value="Toggle2pt"
                                label="Mid Range Shooting"
                                checkValue={gameplan.Toggle2pt}
                                change={UpdateViewableColumns}
                            />
                            <BBAToggle
                                value="Toggle3pt"
                                label="3pt Shooting"
                                checkValue={gameplan.Toggle3pt}
                                change={UpdateViewableColumns}
                            />
                            <BBAToggle
                                value="ToggleFT"
                                label="Free Throws"
                                checkValue={gameplan.ToggleFT}
                                change={UpdateViewableColumns}
                            />
                            <BBAToggle
                                value="ToggleBW"
                                label="Ballwork"
                                checkValue={gameplan.ToggleBW}
                                change={UpdateViewableColumns}
                            />
                            <BBAToggle
                                value="ToggleRB"
                                label="Rebounding"
                                checkValue={gameplan.ToggleRB}
                                change={UpdateViewableColumns}
                            />
                            <BBAToggle
                                value="ToggleID"
                                label="Int. Defense"
                                checkValue={gameplan.ToggleID}
                                change={UpdateViewableColumns}
                            />
                            <BBAToggle
                                value="TogglePD"
                                label="Per. Defense"
                                checkValue={gameplan.TogglePD}
                                change={UpdateViewableColumns}
                            />
                            <BBAToggle
                                value="ToggleP2"
                                label="Position Two"
                                checkValue={gameplan.ToggleP2}
                                change={UpdateViewableColumns}
                            />
                            <BBAToggle
                                value="ToggleP3"
                                label="Position Three"
                                checkValue={gameplan.ToggleP3}
                                change={UpdateViewableColumns}
                            />
                        </>
                    )}
                </div>
                {roster && gameplan && roster.length > 0 && (
                    <div className="row">
                        <div
                            className={`row mt-3 mb-2 overflow-auto gameplan-table-height${
                                viewMode === 'dark' ? '-dark' : ''
                            }`}
                        >
                            <table className={tableHoverClass}>
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            style={{ width: '250px' }}
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            style={{ width: '90px' }}
                                        >
                                            Overall
                                        </th>
                                        {gameplan.ToggleFN && (
                                            <th scope="col">Inside</th>
                                        )}
                                        {gameplan.Toggle2pt && (
                                            <th scope="col">Mid</th>
                                        )}
                                        {gameplan.Toggle3pt && (
                                            <th scope="col">3pt</th>
                                        )}
                                        {gameplan.ToggleFT && (
                                            <th scope="col">Free Throw</th>
                                        )}
                                        {gameplan.ToggleBW && (
                                            <th scope="col">Ballwork</th>
                                        )}
                                        {gameplan.ToggleRB && (
                                            <th scope="col">Rebounding</th>
                                        )}
                                        {gameplan.ToggleID && (
                                            <th scope="col">Int. D</th>
                                        )}
                                        {gameplan.TogglePD && (
                                            <th scope="col">Per. D</th>
                                        )}
                                        <th scope="col">
                                            <abbr title="Inside Proportion">
                                                Inside Prop.
                                            </abbr>
                                        </th>
                                        <th scope="col">
                                            <abbr title="Mid Range Proportion">
                                                Mid Prop.
                                            </abbr>
                                        </th>
                                        <th scope="col">
                                            <abbr title="3pt Proportion">
                                                3pt Prop.
                                            </abbr>
                                        </th>
                                        <th scope="col">Pos 1</th>
                                        <th scope="col">P1 Min</th>
                                        {gameplan.ToggleP2 && (
                                            <th scope="col">Pos 2</th>
                                        )}
                                        {gameplan.ToggleP2 && (
                                            <th scope="col">P2 Min</th>
                                        )}
                                        {gameplan.ToggleP3 && (
                                            <th scope="col">Pos 3</th>
                                        )}
                                        {gameplan.ToggleP3 && (
                                            <th scope="col">P3 Min</th>
                                        )}
                                        <th scope="col">Minutes</th>
                                        <th scope="col">Stamina</th>
                                        <th scope="col">
                                            Playtime Expectations
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roster.map((x, idx) => {
                                        return (
                                            <NBAGameplanPlayerRow
                                                key={x.ID}
                                                idx={idx}
                                                player={x}
                                                updatePlayer={updatePlayer}
                                                updatePosition={
                                                    updatePlayerPosition
                                                }
                                                gameplan={gameplan}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    viewMode: { viewMode }
}) => ({
    currentUser,
    viewMode
});

export default connect(mapStateToProps)(NBAGameplan);
