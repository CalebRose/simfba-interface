import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    SavingMessage,
    SuccessfulGameplanSaveMessage
} from '../../Constants/SystemMessages';
import ServiceMessageBanner from '../_Common/ServiceMessageBanner';
import FBAGameplanService from '../../_Services/simFBA/FBAGameplanService';
import FBATeamService from '../../_Services/simFBA/FBATeamService';
import { useMediaQuery } from 'react-responsive';
import {
    AirRaidFormations,
    BlitzAggressivenessOptions,
    CoverageOptions,
    Defense34Formations,
    Defense43Formations,
    DefensiveSchemeOptions,
    DoubleWingFormations,
    OffensiveSchemeOptions,
    PassPlayLabels,
    ProFormations,
    RunnerDistributionLabels,
    RunPlayLabels,
    SpreadOptionFormations,
    TargetingLabels,
    YesNoOptions
} from './GameplanConstants';
import GameplanDropdownItem from './GameplanDropdownItem';
import GameplanInputItem from './GameplanInputItem';
import {
    GetDefenseFormationLabel,
    GetMaxForPassPlays,
    ValidatePassPlayDistribution,
    ValidateRunPlayDistribution
} from './GameplanHelper';

const CFBGameplan = ({ currentUser }) => {
    // GameplanService
    let gameplanService = new FBAGameplanService();
    let teamService = new FBATeamService();

    const [team, setTeam] = React.useState(''); // Redux value as initial value for react hook
    const [gameplan, setGameplan] = React.useState(null);
    const [offenseFormationLabels, setOffenseFormationLabels] = React.useState(
        []
    );
    const [offRunToPassRatioMin, setOffRunToPassRatioMin] = React.useState(0);
    const [offRunToPassRatioMax, setOffRunToPassRatioMax] = React.useState(0);
    const [distributionMaxQB, setDistributionMaxQB] = React.useState(0);
    const [distributionMaxBK1, setDistributionMaxBK1] = React.useState(0);
    const [distributionMaxBK2, setDistributionMaxBK2] = React.useState(0);
    const [distributionMaxBK3, setDistributionMaxBK3] = React.useState(0);
    const [defenseFormationLabels, setDefenseFormationLabels] = React.useState(
        []
    );
    const [isValid, setValidation] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [serviceMessage, setServiceMessage] = React.useState('');
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:760px)` });

    // UseEffects
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const handleResize = () => {
        setViewWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // On init
    useEffect(() => {
        if (currentUser) {
            GetTeam(currentUser.teamId);
            GetGameplan(currentUser.teamId);
        }
    }, [currentUser]);

    useEffect(() => {
        if (gameplan) {
            CheckValidation();
        }
    }, [gameplan]);

    // Function Handlers
    const CheckValidation = () => {
        const gp = gameplan;
        const totalDistribution = 100;
        let currentDistribution = 0;
        let message = '';
        let valid = true;
        // Check Offensive formations
        currentDistribution =
            gp.OffFormation1 + gp.OffFormation2 + gp.OffFormation3;

        if (currentDistribution !== totalDistribution) {
            message = `Total Offensive Formation Ratio is set to ${currentDistribution}. Please make sure your allocation equals 100.`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

        // Check Ratio Min & Max
        if (
            offRunToPassRatioMin > 0 &&
            offRunToPassRatioMax > 0 &&
            (gp.OffRunToPassRatio < offRunToPassRatioMin ||
                gp.OffRunToPassRatio > offRunToPassRatioMax)
        ) {
            message = `Offense Run to Pass Ratio is not with the range of ${offRunToPassRatioMin} and ${offRunToPassRatioMax} for the ${gp.OffensiveScheme} scheme. Please adjust.`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

        // Check Running Distribution
        currentDistribution =
            gp.RunnerDistributionBK1 +
            gp.RunnerDistributionBK2 +
            gp.RunnerDistributionBK3 +
            gp.RunnerDistributionQB;

        if (currentDistribution !== totalDistribution) {
            message = `Total Runner Distribution is set to ${currentDistribution}. Please make sure your allocation equals 100.`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

        // Check Max Values on Distribution
        if (gp.RunnerDistributionQB > distributionMaxQB) {
            message = `QB Run Distribution set to ${gp.RunnerDistributionQB}. Please lower the distribution to keep within the valid range of the ${gp.OffensiveScheme} scheme.`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

        if (
            distributionMaxBK1 > 0 &&
            gp.RunnerDistributionBK1 > distributionMaxBK1
        ) {
            message = `BK1 Run Distribution set to ${gp.RunnerDistributionBK1}. Please lower the distribution to keep within the valid range of the ${gp.OffensiveScheme} scheme.`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

        if (gp.RunnerDistributionBK2 > distributionMaxBK2) {
            message = `BK2 Run Distribution set to ${gp.RunnerDistributionBK2}. Please lower the distribution to keep within the valid range of the ${gp.OffensiveScheme} scheme.`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

        if (gp.RunnerDistributionBK3 > distributionMaxBK3) {
            message = `BK3 Run Distribution set to ${gp.RunnerDistributionBK3}. Please lower the distribution to keep within the valid range of the ${gp.OffensiveScheme} scheme.`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

        // Check Run Play Distribution
        currentDistribution =
            gp.RunOutsideLeft +
            gp.RunOutsideRight +
            gp.RunInsideLeft +
            gp.RunInsideRight +
            gp.RunPowerLeft +
            gp.RunPowerRight +
            gp.RunDrawLeft +
            gp.RunDrawRight;

        if (currentDistribution !== totalDistribution) {
            message = `Total Run Play Distribution is set to ${currentDistribution}. Please make sure your allocation equals 100.`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

        // Do max value checks on Run Plays
        const validRunPlays = ValidateRunPlayDistribution(gp);

        if (!validRunPlays) {
            message =
                'Run Play Distribution is out of range. Please change ranges for all inside, outside, and power plays (50 max) and all draw plays (15 max)';
            setValidation(validRunPlays);
            setErrorMessage(message);
            return;
        }

        // Check Pass Play Distribution
        currentDistribution =
            gp.PassQuick +
            gp.PassShort +
            gp.PassLong +
            gp.PassScreen +
            gp.PassPAShort +
            gp.PassPALong;

        if (currentDistribution !== totalDistribution) {
            message = `Total Pass Play Distribution is set to ${currentDistribution}. Please make sure your allocation equals 100.`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

        // Do Max Value Checks on Pass Values

        const validPassPlays = ValidatePassPlayDistribution(gp);

        if (!validPassPlays) {
            message = `Please modify the pass play distribution for all plays for the current scheme: ${gp.OffensiveScheme}`;
            setValidation(validPassPlays);
            setErrorMessage(message);
            return;
        }

        // Check Targeting Distribution
        currentDistribution =
            gp.TargetingWR1 +
            gp.TargetingWR2 +
            gp.TargetingWR3 +
            gp.TargetingWR4 +
            gp.TargetingWR5 +
            gp.TargetingTE1 +
            gp.TargetingTE2 +
            gp.TargetingTE3 +
            gp.TargetingRB1 +
            gp.TargetingRB2 +
            gp.TargetingRB3;

        if (currentDistribution !== totalDistribution) {
            message = `Total Targeting Distribution is set to ${currentDistribution}. Please make sure your allocation equals 100.`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

        // Check Defensive Personnel Distribution
        currentDistribution =
            gp.DefPersonnelOne + gp.DefPersonnelTwo + gp.DefPersonnelThree;

        if (currentDistribution !== totalDistribution) {
            message = `Total Defensive Formation Distribution is set to ${currentDistribution}. Please make sure your allocation equals 100.`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

        setValidation(valid);
        setErrorMessage(message);
    };

    const GetTeam = async (ID) => {
        let response = await teamService.GetTeamByTeamId(ID);
        setTeam(response);
    };

    const GetGameplan = async (ID) => {
        let response = await gameplanService.GetGameplanByTeamID(ID);
        SetFormationNames(response.OffensiveScheme);
        SetFormationNames(response.DefensiveScheme);
        setGameplan(response);
    };

    const SetFormationNames = (name) => {
        switch (name) {
            case 'Pro':
                setOffenseFormationLabels(ProFormations);
                setOffRunToPassRatioMin(35);
                setOffRunToPassRatioMax(65);
                setDistributionMaxQB(0);
                setDistributionMaxBK1(100);
                setDistributionMaxBK2(20);
                setDistributionMaxBK3(0);
                break;

            case 'Air Raid':
                setOffenseFormationLabels(AirRaidFormations);
                setOffRunToPassRatioMin(10);
                setOffRunToPassRatioMax(40);
                setDistributionMaxQB(0);
                setDistributionMaxBK1(100);
                setDistributionMaxBK2(0);
                setDistributionMaxBK3(0);
                break;

            case 'Spread Option':
                setOffenseFormationLabels(SpreadOptionFormations);
                setOffRunToPassRatioMin(45);
                setOffRunToPassRatioMax(75);
                setDistributionMaxQB(60);
                setDistributionMaxBK1(60);
                setDistributionMaxBK2(30);
                setDistributionMaxBK3(0);
                break;

            case 'Double Wing Option':
                setOffenseFormationLabels(DoubleWingFormations);
                setOffRunToPassRatioMin(60);
                setOffRunToPassRatioMax(90);
                setDistributionMaxQB(60);
                setDistributionMaxBK1(60);
                setDistributionMaxBK2(60);
                setDistributionMaxBK3(60);
                break;

            case '3-4':
                setDefenseFormationLabels(Defense34Formations);
                break;

            case '4-3':
                setDefenseFormationLabels(Defense43Formations);
                break;

            default:
                break;
        }
    };

    // Event Functions
    const HandleTextChange = ({ name, value }) => {
        let gp = { ...gameplan };

        if (value === 'Yes') {
            gp[name] = true;
        } else if (value === 'No') {
            gp[name] = false;
        } else {
            gp[name] = value;
        }

        if (name === 'OffensiveScheme' || name === 'DefensiveScheme') {
            SetFormationNames(value);
        }

        setGameplan(gp);
    };

    const HandleNumberChange = (event) => {
        let gp = { ...gameplan };
        let { name, value, min, max } = event.target;
        // If Value IS a Number
        gp[name] = Math.max(Number(min), Math.min(Number(max), Number(value)));

        // If Value IS NOT a Number...
        setGameplan((x) => gp);
    };

    const SaveGameplanOptions = async () => {
        CheckValidation();
        if (!isValid) return;

        const UpdateGameplanDTO = {
            GameplanID: currentUser.teamId.toString(),
            UpdatedGameplan: gameplan
        };

        // Set the Service Message
        setServiceMessage(SavingMessage);
        // Save
        const save = await gameplanService.SaveGameplan(UpdateGameplanDTO);

        if (save.ok) {
            // YAY!
            setServiceMessage(SuccessfulGameplanSaveMessage);
            setTimeout(() => setServiceMessage(''), 5000);
        } else {
            alert('HTTP-Error:', save.status);
        }

        // Response
    };

    // Child Component References

    // Return
    return (
        <div className="container mt-3 cfb-gameplan-container">
            <div className="row">
                <div className="col-md-auto justify-content-start">
                    <h2>{team ? team.TeamName : ''} Gameplan</h2>
                </div>
                <div className="col-md-auto ms-auto">
                    {isValid ? (
                        <button
                            className="btn btn-primary"
                            onClick={SaveGameplanOptions}
                        >
                            Save
                        </button>
                    ) : (
                        <button className="btn btn-secondary" disabled>
                            Save
                        </button>
                    )}
                </div>
            </div>
            <ServiceMessageBanner
                serMessage={serviceMessage}
                errMessage={errorMessage}
            />

            <div className="row mt-3">
                <div className="col-md-auto justify-content-start">
                    <h2>Offense</h2>
                </div>
            </div>
            <div className="row mt-1">
                <div className="container offense-options">
                    <div className="row mb-1">
                        <div className="col-md-auto d-flex">
                            <h4>Offensive Scheme:</h4>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn scheme"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {gameplan
                                        ? gameplan.OffensiveScheme
                                        : 'Loading...'}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    {OffensiveSchemeOptions.map((x) => (
                                        <GameplanDropdownItem
                                            name="OffensiveScheme"
                                            value={x}
                                            handleChange={HandleTextChange}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row text-start mb-2">
                        <h5>Offensive Personnel</h5>
                        <div className="col-md-auto d-flex">
                            <GameplanInputItem
                                name="OffRunToPassRatio"
                                label="Run To Pass Ratio"
                                value={
                                    gameplan ? gameplan.OffRunToPassRatio : 0
                                }
                                min={offRunToPassRatioMin}
                                max={offRunToPassRatioMax}
                                handleChange={HandleNumberChange}
                            />
                        </div>
                        {gameplan &&
                            offenseFormationLabels.length > 0 &&
                            offenseFormationLabels.map((x, idx) => {
                                const name = 'OffFormation' + (idx + 1);
                                return (
                                    <div className="col-md-auto d-flex">
                                        <GameplanInputItem
                                            name={name}
                                            label={x}
                                            value={gameplan[name]}
                                            min={'0'}
                                            max={'50'}
                                            handleChange={HandleNumberChange}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                    <div className="row text-start mb-2">
                        <h5>Running Distribution:</h5>
                        <div className="col-md-auto d-flex">
                            <GameplanInputItem
                                name={'RunnerDistributionQB'}
                                label={'QB'}
                                value={
                                    gameplan
                                        ? gameplan['RunnerDistributionQB']
                                        : 0
                                }
                                min={'0'}
                                max={distributionMaxQB.toString()}
                                handleChange={HandleNumberChange}
                            />
                        </div>
                        <div className="col-md-auto d-flex">
                            <GameplanInputItem
                                name={'RunnerDistributionBK1'}
                                label={'BK1'}
                                value={
                                    gameplan
                                        ? gameplan['RunnerDistributionBK1']
                                        : 0
                                }
                                min={'0'}
                                max={distributionMaxBK1.toString()}
                                handleChange={HandleNumberChange}
                            />
                        </div>
                        <div className="col-md-auto d-flex">
                            <GameplanInputItem
                                name={'RunnerDistributionBK2'}
                                label={'BK2'}
                                value={
                                    gameplan
                                        ? gameplan['RunnerDistributionBK2']
                                        : 0
                                }
                                min={'0'}
                                max={distributionMaxBK2.toString()}
                                handleChange={HandleNumberChange}
                            />
                        </div>
                        <div className="col-md-auto d-flex">
                            <GameplanInputItem
                                name={'RunnerDistributionBK3'}
                                label={'BK3'}
                                value={
                                    gameplan
                                        ? gameplan['RunnerDistributionBK3']
                                        : 0
                                }
                                min={'0'}
                                max={distributionMaxBK3.toString()}
                                handleChange={HandleNumberChange}
                            />
                        </div>
                        <div className="col-md-auto d-flex">
                            <GameplanInputItem
                                name="PrimaryHB"
                                label="Primary HB Percentage"
                                value={gameplan ? gameplan.PrimaryHB : 0}
                                min={'50'}
                                max={'100'}
                                handleChange={HandleNumberChange}
                            />
                        </div>
                    </div>
                    <div className="row text-start mb-2">
                        <h5>Run Type Distribution:</h5>
                        {gameplan &&
                            RunPlayLabels.map((x, idx) => {
                                const name = 'Run' + x;
                                let max = '50';
                                if (idx > 5) {
                                    max = '15';
                                }
                                return (
                                    <div className="col-md-auto d-flex">
                                        <GameplanInputItem
                                            name={name}
                                            label={x}
                                            value={
                                                gameplan ? gameplan[name] : 0
                                            }
                                            min={'0'}
                                            max={max}
                                            handleChange={HandleNumberChange}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                    <div className="row text-start mb-2">
                        <h5>Pass Type Distribution:</h5>
                        {gameplan &&
                            PassPlayLabels.map((x, idx) => {
                                const scheme = gameplan.OffensiveScheme;
                                const name = 'Pass' + x;
                                let label = x;
                                if (idx === 4) {
                                    label = 'Play Action Short';
                                } else if (idx === 5) {
                                    label = 'Play Action Long';
                                }
                                const max = GetMaxForPassPlays(scheme, idx);
                                return (
                                    <div className="col-md-auto d-flex">
                                        <GameplanInputItem
                                            name={name}
                                            label={label}
                                            value={gameplan[name]}
                                            min={'0'}
                                            max={max}
                                            handleChange={HandleNumberChange}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                    <div className="row text-start mb-2">
                        <h5>Target Distribution:</h5>
                        {gameplan &&
                            TargetingLabels.map((x) => {
                                const name = 'Targeting' + x;
                                let max = x === 'TE3' ? '0' : '60';
                                return (
                                    <div className="col-md-auto d-flex">
                                        <GameplanInputItem
                                            name={name}
                                            label={x}
                                            value={gameplan[name]}
                                            min={'0'}
                                            max={max}
                                            handleChange={HandleNumberChange}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-auto text-start">
                    <h2>Defense</h2>
                </div>
            </div>
            <div className="row mt-1">
                <div className="container defense-options">
                    <div className="row text-start mb-2">
                        <div className="col-md-auto d-flex">
                            <h4>Defensive Scheme:</h4>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn scheme"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {gameplan
                                        ? gameplan.DefensiveScheme
                                        : 'Loading...'}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    {DefensiveSchemeOptions.map((x) => (
                                        <GameplanDropdownItem
                                            name="DefensiveScheme"
                                            value={x}
                                            handleChange={HandleTextChange}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row text-start mb-2">
                        <h5>Defensive Personnel</h5>
                        <div className="col-md-auto d-flex">
                            <GameplanInputItem
                                name="DefRunToPassRatio"
                                label="Run To Pass Ratio"
                                value={
                                    gameplan ? gameplan.DefRunToPassRatio : 0
                                }
                                min={'15'}
                                max={'85'}
                                handleChange={HandleNumberChange}
                            />
                        </div>

                        {gameplan &&
                            defenseFormationLabels.length > 0 &&
                            defenseFormationLabels.map((x, idx) => {
                                const name = GetDefenseFormationLabel(idx);
                                return (
                                    <div className="col-md-auto d-flex">
                                        <GameplanInputItem
                                            name={name}
                                            label={x}
                                            value={gameplan[name]}
                                            min={'0'}
                                            max={'100'}
                                            handleChange={HandleNumberChange}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                    <div className="row text-start mb-2">
                        <h5>Defensive Settings</h5>
                    </div>
                    <div className="row text-start mb-2">
                        <div className="col-md-auto d-flex">
                            <h5>Blitz Ratio</h5>
                            <div className="cfb-gameplan-btn blitz-ratio">
                                <GameplanInputItem
                                    name={'BlitzRatio'}
                                    label={''}
                                    value={
                                        gameplan ? gameplan['BlitzRatio'] : 0
                                    }
                                    min={'0'}
                                    max={'60'}
                                    handleChange={HandleNumberChange}
                                />
                            </div>
                        </div>

                        <div className="col-md-auto d-flex">
                            <h5>Blitz Aggressiveness</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {gameplan
                                        ? gameplan.BlitzAggressiveness
                                        : 'Loading...'}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    {gameplan &&
                                        BlitzAggressivenessOptions.map((x) => (
                                            <GameplanDropdownItem
                                                name="BlitzAggressiveness"
                                                value={x}
                                                handleChange={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-auto d-flex">
                            <h5>Blitz Safeties</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {gameplan
                                        ? gameplan.BlitzSafeties
                                            ? 'Yes'
                                            : 'No'
                                        : 'Loading...'}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    {gameplan &&
                                        YesNoOptions.map((x) => (
                                            <GameplanDropdownItem
                                                name="BlitzSafeties"
                                                value={x}
                                                handleChange={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-auto d-flex">
                            <h5>Blitz Corners</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {gameplan
                                        ? gameplan.BlitzCorners
                                            ? 'Yes'
                                            : 'No'
                                        : 'Loading...'}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    {gameplan &&
                                        YesNoOptions.map((x) => (
                                            <GameplanDropdownItem
                                                name="BlitzCorners"
                                                value={x}
                                                handleChange={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row text-start mb-2">
                        <div className="col-md-auto d-flex">
                            <h5>Linebacker Coverage</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {gameplan
                                        ? gameplan.LinebackerCoverage
                                        : 'Loading...'}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    {gameplan &&
                                        CoverageOptions.map((x) => (
                                            <GameplanDropdownItem
                                                name="LinebackerCoverage"
                                                value={x}
                                                handleChange={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-auto d-flex">
                            <h5>Corners Coverage</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {gameplan
                                        ? gameplan.CornersCoverage
                                        : 'Loading...'}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    {gameplan &&
                                        CoverageOptions.map((x) => (
                                            <GameplanDropdownItem
                                                name="CornersCoverage"
                                                value={x}
                                                handleChange={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-auto d-flex">
                            <h5>Safeties Coverage</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {gameplan
                                        ? gameplan.SafetiesCoverage
                                        : 'Loading...'}
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    {gameplan &&
                                        CoverageOptions.map((x) => (
                                            <GameplanDropdownItem
                                                name="SafetiesCoverage"
                                                value={x}
                                                handleChange={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-auto justify-content-start">
                    <h2>Special Teams</h2>
                </div>
            </div>
            <div className="row mt-1 justify-content-start">
                <div className="container st-options">
                    <div className="row">
                        <div className="col-md-auto d-flex">
                            <GameplanInputItem
                                name="MaximumFGDistance"
                                label="Maximum Field Goal Distance"
                                value={gameplan && gameplan.MaximumFGDistance}
                                min={'15'}
                                max={'85'}
                                handleChange={HandleNumberChange}
                            />
                        </div>
                        <div className="col-md-auto d-flex">
                            <GameplanInputItem
                                name="GoFor4AndShort"
                                label="Go For It on 4th and Short"
                                value={gameplan && gameplan.GoFor4AndShort}
                                min={'15'}
                                max={'85'}
                                handleChange={HandleNumberChange}
                            />
                        </div>{' '}
                        <div className="col-md-auto d-flex">
                            <GameplanInputItem
                                name="GoFor4AndLong"
                                label="Go For It on 4th and Long"
                                value={gameplan && gameplan.GoFor4AndLong}
                                min={'15'}
                                max={'85'}
                                handleChange={HandleNumberChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(CFBGameplan);
