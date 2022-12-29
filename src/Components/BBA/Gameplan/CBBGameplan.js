import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BBAPlayerService from '../../../_Services/simNBA/BBAPlayerService';
import CBBGameplanRow from './CBBGameplanRow';
import BBAGameplanService from '../../../_Services/simNBA/BBAGameplanService';
import GameplanPlayerRow from './CBBGameplanPlayerRow';

const CBBGameplan = ({ currentUser }) => {
    let playerService = new BBAPlayerService();
    let gameplanService = new BBAGameplanService();
    const [team, setTeam] = React.useState('');
    const [roster, setRoster] = React.useState(null);
    const [gameplan, setGameplan] = React.useState(null);
    const [isValid, setValidation] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [serviceMessage, setServiceMessage] = React.useState('');
    const savingMessage = 'Saving...';
    const paceOptions = ['Very Fast', 'Fast', 'Balanced', 'Slow', 'Very Slow'];

    useEffect(() => {
        if (currentUser) {
            setTeam(() => currentUser.cbb_team);
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
        let res = await gameplanService.GetGameplan(currentUser.cbb_id);
        setGameplan(() => res);
    };

    const getRoster = async () => {
        let players = await playerService.GetPlayersByTeam(currentUser.cbb_id);
        setRoster(() => players);
    };

    const updateGameplan = (event) => {
        const tar = event.target === null ? event.currentTarget : event.target;
        let gp = { ...gameplan };
        let { name, value } = tar;
        // Keep the value in range of what's being changed
        if (name !== 'Pace') {
            gp[name] = Number(value);
        } else {
            gp[name] = value;
        }
        setGameplan(() => gp);
    };

    const updatePlayer = (idx, event) => {
        let playerList = [...roster];
        let { name, value } = event.target;
        playerList[idx][name] = Number(value);
        setRoster(() => playerList);
    };

    const IsProportionInLimits = (proportion) => {
        return proportion >= 20 && proportion <= 60;
    };

    const checkValidation = () => {
        let valid = true;
        const proportionLimit = 100;
        let currentProportion = 0;
        let message = '';
        // Check Gameplan
        if (!IsProportionInLimits(gameplan.ThreePointProportion)) {
            message = `Three Point Proportion for Gameplan ${gameplan.Game} set to ${gameplan.ThreePointProportion}. Please make sure this allocation is between 20 and 60.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            return;
        }

        if (!IsProportionInLimits(gameplan.JumperProportion)) {
            message = `Jumper Proportion for Gameplan ${gameplan.Game} set to ${gameplan.JumperProportion}. Please make sure this allocation is between 20 and 60.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            return;
        }

        if (!IsProportionInLimits(gameplan.PaintProportion)) {
            message = `Paint Proportion for Gameplan ${gameplan.Game} set to ${gameplan.PaintProportion}. Please make sure this allocation is between 20 and 60.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            return;
        }

        currentProportion =
            gameplan.ThreePointProportion +
            gameplan.JumperProportion +
            gameplan.PaintProportion;
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
        const minutesLimit = 200;
        let totalMinutes = 0;
        // Check Players
        for (let i = 0; i < roster.length; i++) {
            totalMinutes += roster[i].Minutes;

            if (roster[i].IsRedshirting && roster[i].Minutes > 0) {
                message = `${roster[i].FirstName} ${roster[i].LastName} is redshirted and is allocated ${roster[i].Minutes} minutes. Please set the number of minutes to 0.`;
                setErrorMessage(message);
                valid = false;
                setValidation(valid);
                return;
            }

            if (roster[i].Minutes > roster[i].Stamina) {
                message = `${roster[i].FirstName} ${roster[i].LastName}'s minutes allocation cannot exceed its Stamina.`;
                setErrorMessage(message);
                valid = false;
                setValidation(valid);
                return;
            }
        }

        if (totalMinutes > minutesLimit || totalMinutes < minutesLimit) {
            message = `Total Minutes between all Players adds up to ${totalMinutes}.\nPlease make overall total to 200.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            return;
        }
        setValidation(valid);
        setErrorMessage('');
    };

    const saveGameplanOptions = async () => {
        checkValidation();
        if (!isValid) return;
        const gameplanOptionsDto = {
            Players: roster,
            Gameplan: gameplan,
            teamId: currentUser.cbb_id
        };
        setServiceMessage(savingMessage);
        const save = await gameplanService.SaveGameplanOptions(
            gameplanOptionsDto
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
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-auto justify-content-start">
                    <h2>{team} Gameplan</h2>
                </div>
                <div className="col-md-auto ms-auto">
                    <div className="row">
                        {gameplan !== undefined && gameplan !== null ? (
                            <div className="col-md-auto me-1">
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Pace: {gameplan.Pace}
                                    </button>
                                    <ul
                                        className="dropdown-menu dropdown-content"
                                        aria-labelledby="dropdownMenuButton1"
                                        style={{ zIndex: 3 }}
                                    >
                                        {paceOptions.map((x) => (
                                            <li
                                                className="clickable"
                                                style={{ zIndex: 3 }}
                                            >
                                                <button
                                                    className="dropdown-item clickable"
                                                    name="Pace"
                                                    value={x}
                                                    onClick={updateGameplan}
                                                >
                                                    {x}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="col-md-auto">
                            <button
                                className="btn btn-primary"
                                onClick={saveGameplanOptions}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {serviceMessage.length > 0 || errorMessage.length > 0 ? (
                <div className="row mt-2 mb-2">
                    {serviceMessage.length > 0 &&
                    serviceMessage !== savingMessage ? (
                        <div className="alert alert-success">
                            {serviceMessage}
                        </div>
                    ) : (
                        ''
                    )}
                    {serviceMessage.length > 0 &&
                    serviceMessage === savingMessage ? (
                        <div className="alert alert-secondary">
                            {serviceMessage}
                        </div>
                    ) : (
                        ''
                    )}
                    {errorMessage.length > 0 ? (
                        <div className="alert alert-danger">{errorMessage}</div>
                    ) : (
                        ''
                    )}
                </div>
            ) : (
                ''
            )}
            <div className="row">
                <div className="row mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">3pt Proportion</th>
                                <th scope="col">Jumper Proportion</th>
                                <th scope="col">Paint Proportion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gameplan !== undefined && gameplan !== null ? (
                                <CBBGameplanRow
                                    key={gameplan.ID}
                                    gameplan={gameplan}
                                    updateGameplan={updateGameplan}
                                />
                            ) : (
                                ''
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="row mt-3 overflow-auto gameplan-table-height">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Position</th>
                                <th scope="col">Year</th>
                                <th scope="col">Overall</th>
                                <th scope="col">2pt Shooting</th>
                                <th scope="col">3pt Shooting</th>
                                <th scope="col">Finishing</th>
                                <th scope="col">Ballwork</th>
                                <th scope="col">Rebounding</th>
                                <th scope="col">Defense</th>
                                <th scope="col">Stamina</th>
                                <th scope="col">Playtime Expectations</th>
                                <th scope="col">Minutes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roster !== undefined &&
                            roster !== null &&
                            roster.length > 0
                                ? roster.map((x, idx) => {
                                      return (
                                          <GameplanPlayerRow
                                              key={x.ID}
                                              idx={idx}
                                              player={x}
                                              updatePlayer={updatePlayer}
                                          />
                                      );
                                  })
                                : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(CBBGameplan);
