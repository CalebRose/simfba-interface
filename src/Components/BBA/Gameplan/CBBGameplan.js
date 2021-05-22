import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BBAPlayerService from '../../../_Services/simNBA/BBAPlayerService';
import SimBBA_url from '../../../Constants/SimBBA_url';
import CBBGameplanRow from './CBBGameplanRow';
import BBAGameplanService from '../../../_Services/simNBA/BBAGameplanService';
import GameplanPlayerRow from './CBBGameplanPlayerRow';

const CBBGameplan = ({ currentUser }) => {
    let playerService = new BBAPlayerService();
    let gameplanService = new BBAGameplanService();
    const [team, setTeam] = React.useState('');
    const [roster, setRoster] = React.useState([]);
    const [gameplans, setGameplans] = React.useState([]);
    const [isValid, setValidation] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [serviceMessage, setServiceMessage] = React.useState('');
    const isNBA = false;
    const savingMessage = 'Saving...';

    useEffect(() => {
        const getGameplans = async () => {
            // Get Gameplan Route using team Id
            let gameplans = await gameplanService.GetGameplans(
                SimBBA_url,
                currentUser.cbb_id
            );
            setGameplans(gameplans);
        };

        const getRoster = async () => {
            let players = await playerService.GetPlayersByTeam(
                SimBBA_url,
                currentUser.cbb_id
            );
            setRoster(players);
        };

        if (currentUser) {
            setTeam(currentUser.cbb_team);
            getGameplans();
            getRoster();
        }
    }, [currentUser]);

    const updateGameplan = (idx, event) => {
        let gamePlanList = [...gameplans];
        let { name, value, min, max } = event.target;
        // Keep the value in range of what's being changed
        gamePlanList[idx][name] = Math.max(
            Number(min),
            Math.min(Number(max), Number(value))
        );
        setGameplans(gamePlanList);
        checkValidation();
    };

    const updatePlayer = (idx, event) => {
        let playerList = [...roster];
        let { name, value, min } = event.target;
        playerList[idx][name] = Math.max(Number(min), Number(value));
        setRoster(playerList);
        checkValidation();
    };

    const checkValidation = () => {
        let valid = true;
        const proportionLimit = 100;
        let currentProportion = 0;
        let message = '';
        // Check Gameplan
        for (let i = 0; i < gameplans.length; i++) {
            currentProportion =
                gameplans[i].ThreePointProportion +
                gameplans[i].JumperProportion +
                gameplans[i].PaintProportion;
            if (
                currentProportion > proportionLimit ||
                currentProportion < proportionLimit
            ) {
                message = `Total Proportion for Gameplan ${gameplans[i].Game} set to ${currentProportion}. Please make sure your allocation adds up to 100.`;
                setErrorMessage(message);
                valid = false;
                setValidation(valid);
                return;
            }
        }
        const minutesLimit = 200;
        let totalMinutesA = 0;
        let totalMinutesB = 0;
        // Check Players
        for (let i = 0; i < roster.length; i++) {
            totalMinutesA += roster[i].MinutesA;
            totalMinutesB += roster[i].MinutesB;

            if (
                roster[i].MinutesA > roster[i].Stamina ||
                roster[i].MinutesB > roster[i].Stamina
            ) {
                message = `${roster[i].FirstName} ${roster[i].LastName}'s minutes allocation cannot exceed its Stamina.`;
                setErrorMessage(message);
                valid = false;
                setValidation(valid);
                return;
            }
        }

        if (totalMinutesA > minutesLimit || totalMinutesA < minutesLimit) {
            message = `Total Minutes between all Players for Game A adds up to ${totalMinutesA}.\nPlease make overall total to 200.`;
            setErrorMessage(message);
            valid = false;
            setValidation(valid);
            return;
        }
        if (totalMinutesB > minutesLimit || totalMinutesB < minutesLimit) {
            message = `Total Minutes between all Players for Game B adds up to ${totalMinutesB}.\nPlease make overall total to 200.`;
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
            Gameplans: gameplans,
            teamId: currentUser.cbb_id
        };
        setServiceMessage(savingMessage);
        const save = await gameplanService.SaveGameplanOptions(
            SimBBA_url,
            gameplanOptionsDto
        );
        console.log(save);
        if (save.ok) {
            const message = `Successfully update Gameplan and Minutes`;
            setServiceMessage(message);
            console.log(message);
            setTimeout(() => setServiceMessage(''), 5000);
        } else {
            alert('HTTP-Error:', save.status);
        }
    };

    // Rows
    const gamePlanRows = gameplans.map((x, idx) => {
        return (
            <CBBGameplanRow
                key={gameplans.ID}
                idx={idx}
                gameplan={x}
                updateGameplan={updateGameplan}
            />
        );
    });

    const playerRows = roster.map((x, idx) => {
        return (
            <GameplanPlayerRow
                key={x.ID}
                idx={idx}
                player={x}
                updatePlayer={updatePlayer}
            />
        );
    });

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-auto justify-content-start">
                    <h2>{team} Gameplan</h2>
                </div>
                <div className="col-md-auto ms-auto">
                    <button
                        className="btn btn-primary"
                        onClick={saveGameplanOptions}
                    >
                        Save
                    </button>
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
            <div className="row mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Game</th>
                            <th scope="col">Pace</th>
                            <th scope="col">3pt Proportion</th>
                            <th scope="col">Jumper Proportion</th>
                            <th scope="col">Paint Proportion</th>
                        </tr>
                    </thead>
                    <tbody>{gameplans.length > 0 ? gamePlanRows : ''}</tbody>
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
                            <th scope="col">Shooting</th>
                            <th scope="col">Finishing</th>
                            <th scope="col">Ballwork</th>
                            <th scope="col">Rebounding</th>
                            <th scope="col">Defense</th>
                            <th scope="col">Stamina</th>
                            <th scope="col">Playtime Expectations</th>
                            <th scope="col">Minutes A</th>
                            <th scope="col">Minutes B</th>
                            {isNBA ? <th scope="col">Minutes C</th> : ''}
                        </tr>
                    </thead>
                    <tbody>{roster.length > 0 ? playerRows : ''}</tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(CBBGameplan);
