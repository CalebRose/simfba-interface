import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    SavingMessage,
    SuccessfulGameplanSaveMessage
} from '../../../Constants/SystemMessages';
import { ServiceMessageBanner } from '../../_Common/ServiceMessageBanner';
import FBAGameplanService from '../../../_Services/simFBA/FBAGameplanService';
import FBATeamService from '../../../_Services/simFBA/FBATeamService';
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
    RunPlayLabels,
    SpreadOptionFormations,
    TargetingLabels,
    YesNoOptions
} from '../../Gameplan/GameplanConstants';
import GameplanInputItem from './../../Gameplan/GameplanInputItem';
import {
    GetDefenseFormationLabel,
    GetMaxForPassPlays,
    ValidatePassPlayDistribution,
    ValidateRunPlayDistribution
} from '../../Gameplan/GameplanHelper';
import SchemeModal from '../../Gameplan/SchemeModal';
import { DropdownItem } from '../../_Common/Dropdown';
import { DropdownItemObj } from '../../Roster/DropdownItem';

const NFLGameplan = ({ currentUser, nflTeam }) => {
    // GameplanService
    let gameplanService = new FBAGameplanService();
    let _teamService = new FBATeamService();
    const [userTeam, setUserTeam] = React.useState('');
    const [team, setTeam] = React.useState(''); // Redux value as initial value for react hook
    const [aiTeams, setAITeams] = React.useState(null);
    const [teamColors, setTeamColors] = React.useState('');
    const [initialGameplan, setInitialGameplan] = React.useState(null);
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
            // GetGameplan(currentUser.teamId);
            setUserTeam(() => nflTeam);
            GetAvailableTeams();
            GetGameplan(currentUser.NFLTeamID);
        }
    }, [currentUser]);

    useEffect(() => {
        if (nflTeam) {
            // GetGameplan(team.ID);
            const colors = {
                color: '#fff',
                backgroundColor:
                    nflTeam && nflTeam.ColorOne ? nflTeam.ColorOne : '#6c757d',
                borderColor:
                    nflTeam && nflTeam.ColorOne ? nflTeam.ColorOne : '#6c757d'
            };
            setTeamColors(() => colors);
            setTeam(() => nflTeam);
        }
    }, [nflTeam]);

    useEffect(() => {
        if (team) {
            // GetGameplan(team.ID);
            const colors = {
                color: '#fff',
                backgroundColor:
                    team && team.ColorOne ? team.ColorOne : '#6c757d',
                borderColor:
                    team && nflTeam.ColorOne ? team.ColorOne : '#6c757d'
            };
            setTeamColors(() => colors);
        }
    }, [team]);

    useEffect(() => {
        if (gameplan) {
            CheckValidation();
        }
    }, [gameplan]);

    // Function Handlers
    const CheckValidation = () => {
        const gp = { ...gameplan };
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
            setValidation(() => valid);
            setErrorMessage(() => message);
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
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        // Check Running Distribution
        // Check Max Values on Distribution
        if (gp.RunnerDistributionQB > distributionMaxQB) {
            message = `QB Run Distribution set to ${gp.RunnerDistributionQB}. Please lower the distribution to keep within the valid range of the ${gp.OffensiveScheme} scheme.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (
            distributionMaxBK1 > 0 &&
            gp.RunnerDistributionBK1 > distributionMaxBK1
        ) {
            message = `BK1 Run Distribution set to ${gp.RunnerDistributionBK1}. Please lower the distribution to keep within the valid range of the ${gp.OffensiveScheme} scheme.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.RunnerDistributionBK2 > distributionMaxBK2) {
            message = `BK2 Run Distribution set to ${gp.RunnerDistributionBK2}. Please lower the distribution to keep within the valid range of the ${gp.OffensiveScheme} scheme.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.RunnerDistributionBK3 > distributionMaxBK3) {
            message = `BK3 Run Distribution set to ${gp.RunnerDistributionBK3}. Please lower the distribution to keep within the valid range of the ${gp.OffensiveScheme} scheme.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        currentDistribution =
            gp.RunnerDistributionBK1 +
            gp.RunnerDistributionBK2 +
            gp.RunnerDistributionBK3 +
            gp.RunnerDistributionQB;

        if (currentDistribution !== totalDistribution) {
            message = `Total Runner Distribution is set to ${currentDistribution}. Please make sure your allocation equals 100.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        // Check Run Play Distribution
        // Do max value checks on Run Plays
        const validRunPlays = ValidateRunPlayDistribution(gp);

        if (!validRunPlays) {
            message =
                'Run Play Distribution is out of range. Please change ranges for all inside, outside, and power plays (50 max) and all draw plays (15 max)';
            setValidation(() => validRunPlays);
            setErrorMessage(() => message);
            return;
        }

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
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        // Check Pass Play Distribution
        const validPassPlays = ValidatePassPlayDistribution(gp);

        if (!validPassPlays) {
            message = `Please modify the pass play distribution for all plays for the current scheme: ${gp.OffensiveScheme}`;
            setValidation(() => validPassPlays);
            setErrorMessage(() => message);
            return;
        }

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
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        // Check Targeting Distribution
        if (gp.TargetingWR1 > 60) {
            message = `TargetingWR1 Distribution is set to ${gp.TargetingWR1}. Please set it to below 60.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.TargetingWR2 > 60) {
            message = `TargetingWR2 Distribution is set to ${gp.TargetingWR2}. Please set it to below 60.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.TargetingWR3 > 60) {
            message = `TargetingWR3 Distribution is set to ${gp.TargetingWR3}. Please set it to below 60.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.TargetingWR4 > 60) {
            message = `TargetingWR4 Distribution is set to ${gp.TargetingWR4}. Please set it to below 60.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.TargetingWR5 > 60) {
            message = `TargetingWR5 Distribution is set to ${gp.TargetingWR5}. Please set it to below 60.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.TargetingRB1 > 60) {
            message = `TargetingRB1 Distribution is set to ${gp.TargetingRB1}. Please set it to below 60.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.TargetingRB2 > 60) {
            message = `TargetingRB2 Distribution is set to ${gp.TargetingRB2}. Please set it to below 60.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.TargetingRB3 > 60) {
            message = `TargetingRB3 Distribution is set to ${gp.TargetingRB3}. Please set it to below 60.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.TargetingTE1 > 60) {
            message = `TargetingTE1 Distribution is set to ${gp.TargetingTE1}. Please set it to below 60.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.TargetingTE2 > 60) {
            message = `TargetingTE2 Distribution is set to ${gp.TargetingTE2}. Please set it to below 60.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.TargetingTE3 > 0) {
            message = `TargetingTE3 is not ready for use. Please leave this input as 0.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        if (gp.BlitzRatio > 60 || gp.BlitzRatio < 15) {
            message = `The current Blitz Ratio is set to ${gp.BlitzRatio}%. Please set the ratio between 15% and 60%`;
            valid = false;
            setValidation(valid);
            setErrorMessage(message);
            return;
        }

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
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        // Check Defensive Personnel Distribution
        currentDistribution =
            gp.DefPersonnelOne + gp.DefPersonnelTwo + gp.DefPersonnelThree;

        if (currentDistribution !== totalDistribution) {
            message = `Total Defensive Formation Distribution is set to ${currentDistribution}. Please make sure your allocation equals 100.`;
            valid = false;
            setValidation(() => valid);
            setErrorMessage(() => message);
            return;
        }

        setValidation(
            () =>
                valid &&
                (currentUser.NFLRole === 'Owner' ||
                    currentUser.NFLRole === 'Coach')
        );
        setErrorMessage(() => message);
    };

    const SelectUserTeam = () => {
        SelectTeam(userTeam);
    };

    const SelectTeam = (selectedTeam) => {
        setTeam(() => selectedTeam);
    };

    const GetGameplan = async (ID) => {
        let response = await gameplanService.GetNFLGameplanByTeamID(ID);
        SetFormationNames(response.OffensiveScheme);
        SetFormationNames(response.DefensiveScheme);
        setInitialGameplan({ ...response });
        setGameplan({ ...response });
    };

    const GetAvailableTeams = async () => {
        let res = await _teamService.GetAllNFLTeams();

        setAITeams(() => res);
    };

    const SetFormationNames = (name) => {
        switch (name) {
            case 'Pro':
                setOffenseFormationLabels(() => ProFormations);
                setOffRunToPassRatioMin(() => 35);
                setOffRunToPassRatioMax(() => 65);
                setDistributionMaxQB(() => 0);
                setDistributionMaxBK1(() => 100);
                setDistributionMaxBK2(() => 20);
                setDistributionMaxBK3(() => 0);
                break;

            case 'Air Raid':
                setOffenseFormationLabels(() => AirRaidFormations);
                setOffRunToPassRatioMin(() => 10);
                setOffRunToPassRatioMax(() => 40);
                setDistributionMaxQB(() => 0);
                setDistributionMaxBK1(() => 100);
                setDistributionMaxBK2(() => 0);
                setDistributionMaxBK3(() => 0);
                break;

            case 'Spread Option':
                setOffenseFormationLabels(() => SpreadOptionFormations);
                setOffRunToPassRatioMin(() => 45);
                setOffRunToPassRatioMax(() => 75);
                setDistributionMaxQB(() => 60);
                setDistributionMaxBK1(() => 60);
                setDistributionMaxBK2(() => 30);
                setDistributionMaxBK3(() => 0);
                break;

            case 'Double Wing Option':
                setOffenseFormationLabels(() => DoubleWingFormations);
                setOffRunToPassRatioMin(() => 60);
                setOffRunToPassRatioMax(() => 90);
                setDistributionMaxQB(() => 60);
                setDistributionMaxBK1(() => 60);
                setDistributionMaxBK2(() => 60);
                setDistributionMaxBK3(() => 60);
                break;

            case '3-4':
                setDefenseFormationLabels(() => Defense34Formations);
                break;

            case '4-3':
                setDefenseFormationLabels(() => Defense43Formations);
                break;

            default:
                break;
        }
    };

    // Event Functions
    const HandleTextChange = (name, value) => {
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

        setGameplan(() => gp);
    };

    const HandleNumberChange = (event) => {
        let gp = { ...gameplan };
        let { name, value, min, max } = event.target;
        // If Value IS a Number
        // gp[name] = Math.max(Number(min), Math.min(Number(max), Number(value)));
        gp[name] = Number(value);

        // If Value IS NOT a Number...
        setGameplan(() => gp);
    };

    const SaveGameplanOptions = async () => {
        CheckValidation();
        if (!isValid) return;

        const fullGP = {
            ...gameplan,
            OffFormation1Name: offenseFormationLabels[0],
            OffFormation2Name: offenseFormationLabels[1],
            OffFormation3Name: offenseFormationLabels[2]
        };

        const UpdateGameplanDTO = {
            GameplanID: gameplan.ID.toString(),
            UpdatedNFLGameplan: fullGP,
            Username: currentUser.username,
            TeamName: nflTeam.TeamName
        };

        // Set the Service Message
        setServiceMessage(() => SavingMessage);
        // Save
        const save = await gameplanService.SaveNFLGameplan(UpdateGameplanDTO);

        if (save.ok) {
            // YAY!
            setServiceMessage(() => SuccessfulGameplanSaveMessage);
            setTimeout(() => setServiceMessage(() => ''), 5000);
        } else {
            alert('HTTP-Error:', save.status);
        }

        // Response
        setInitialGameplan({ ...gameplan });
    };

    const ResetGameplan = () => {
        const originalGameplan = { ...initialGameplan };
        SetFormationNames(originalGameplan.OffensiveScheme);
        SetFormationNames(originalGameplan.DefensiveScheme);
        setGameplan(() => originalGameplan);
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
                    <button
                        className="btn btn-danger me-2"
                        onClick={ResetGameplan}
                    >
                        Reset Gameplan
                    </button>
                    {isValid ? (
                        <button
                            className="btn btn-primary"
                            onClick={SaveGameplanOptions}
                        >
                            Save Gameplan
                        </button>
                    ) : (
                        <button className="btn btn-secondary" disabled>
                            Save Gameplan
                        </button>
                    )}
                </div>
            </div>
            <ServiceMessageBanner
                serMessage={serviceMessage}
                errMessage={errorMessage}
            />
            {currentUser && currentUser.roleID === 'Admin' ? (
                <div className="row mt-3">
                    <div className="col-md-auto">
                        <div className="drop-start btn-dropdown-width-team">
                            <button
                                name="team"
                                className="btn dropdown-toggle btn-dropdown-width-team"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={teamColors ? teamColors : {}}
                            >
                                <span>{team ? team.TeamName : ''}</span>
                            </button>
                            <ul className="dropdown-menu dropdown-content">
                                <DropdownItemObj
                                    value={
                                        currentUser ? currentUser.NFLTeam : null
                                    }
                                    click={SelectUserTeam}
                                    id={
                                        currentUser
                                            ? currentUser.NFLTeamID
                                            : null
                                    }
                                />
                                <hr className="dropdown-divider"></hr>
                                {aiTeams && aiTeams.length > 0
                                    ? aiTeams.map((x) => (
                                          <DropdownItemObj
                                              key={x.ID}
                                              value={
                                                  x.TeamName + ' ' + x.Mascot
                                              }
                                              team={x}
                                              id={x.ID}
                                              click={SelectTeam}
                                          />
                                      ))
                                    : ''}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
            <div className="row mt-3">
                <div className="col-md-auto justify-content-start">
                    <h2>Offense</h2>
                </div>
            </div>
            <SchemeModal />
            <div className="row mt-1">
                <div className="container offense-options">
                    <div className="row mb-1">
                        <div className="col-auto d-flex">
                            <h4>
                                Offensive Scheme:
                                <button
                                    type="button"
                                    className="btn btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#schemeModal"
                                >
                                    <i className="bi bi-info-circle" />
                                </button>
                            </h4>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn scheme"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
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
                                        <DropdownItem
                                            name="OffensiveScheme"
                                            id="OffensiveScheme"
                                            value={x}
                                            click={HandleTextChange}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row text-start mb-2">
                        <h5>Offensive Personnel</h5>
                        <div className="col-auto d-flex">
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
                                    <div className="col-auto d-flex">
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
                        <div className="col-auto d-flex">
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
                        <div className="col-auto d-flex">
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
                        <div className="col-auto d-flex">
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
                        <div className="col-auto d-flex">
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
                        <div className="col-auto d-flex">
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
                                    <div className="col-auto d-flex">
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
                                    <div className="col-auto d-flex">
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
                                    <div className="col-auto d-flex">
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
                <div className="col-auto text-start">
                    <h2>Defense</h2>
                </div>
            </div>
            <div className="row mt-1">
                <div className="container defense-options">
                    <div className="row text-start mb-2">
                        <div className="col-auto d-flex">
                            <h4>Defensive Scheme:</h4>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn scheme"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
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
                                        <DropdownItem
                                            name="DefensiveScheme"
                                            id="DefensiveScheme"
                                            value={x}
                                            click={HandleTextChange}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row text-start mb-2">
                        <h5>Defensive Personnel</h5>
                        <div className="col-auto d-flex">
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
                                    <div className="col-auto d-flex">
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
                        <div className="col-auto d-flex">
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

                        <div className="col-auto d-flex">
                            <h5>Blitz Aggressiveness</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
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
                                            <DropdownItem
                                                name="BlitzAggressiveness"
                                                id="BlitzAggressiveness"
                                                value={x}
                                                click={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-auto d-flex">
                            <h5>Blitz Safeties</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
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
                                            <DropdownItem
                                                name="BlitzSafeties"
                                                id="BlitzSafeties"
                                                value={x}
                                                click={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-auto d-flex">
                            <h5>Blitz Corners</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
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
                                            <DropdownItem
                                                name="BlitzCorners"
                                                id="BlitzCorners"
                                                value={x}
                                                click={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row text-start mb-2">
                        <div className="col-auto d-flex">
                            <h5>Linebacker Coverage</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
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
                                            <DropdownItem
                                                name="LinebackerCoverage"
                                                value={x}
                                                click={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-auto d-flex">
                            <h5>Corners Coverage</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
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
                                            <DropdownItem
                                                name="CornersCoverage"
                                                value={x}
                                                click={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-auto d-flex">
                            <h5>Safeties Coverage</h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
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
                                            <DropdownItem
                                                name="SafetiesCoverage"
                                                id="SafetiesCoverage"
                                                value={x}
                                                click={HandleTextChange}
                                            />
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-auto justify-content-start">
                    <h2>Special Teams</h2>
                </div>
            </div>
            <div className="row mt-1 justify-content-start">
                <div className="container st-options">
                    <div className="row">
                        <div className="col-auto d-flex">
                            <GameplanInputItem
                                name="MaximumFGDistance"
                                label="Maximum Field Goal Distance"
                                value={gameplan && gameplan.MaximumFGDistance}
                                min={'15'}
                                max={'85'}
                                handleChange={HandleNumberChange}
                            />
                        </div>
                        <div className="col-auto d-flex">
                            <GameplanInputItem
                                name="GoFor4AndShort"
                                label="Go For It on 4th and Short"
                                value={gameplan && gameplan.GoFor4AndShort}
                                min={'0'}
                                max={'85'}
                                handleChange={HandleNumberChange}
                            />
                        </div>{' '}
                        <div className="col-auto d-flex">
                            <GameplanInputItem
                                name="GoFor4AndLong"
                                label="Go For It on 4th and Long"
                                value={gameplan && gameplan.GoFor4AndLong}
                                min={'0'}
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

const mapStateToProps = ({ user: { currentUser }, nflTeam: { nflTeam } }) => ({
    currentUser,
    nflTeam
});

export default connect(mapStateToProps)(NFLGameplan);
