import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import FBAGameplanService from '../../_Services/simFBA/FBAGameplanService';
import FBATeamService from '../../_Services/simFBA/FBATeamService';
import {
    FormationMap,
    BlitzAggressivenessOptions,
    CoverageOptions,
    Defense34Formations,
    Defense43Formations,
    DefensiveSchemeOptions,
    OffensiveSchemeOptions,
    PassPlayLabels,
    RunPlayLabels,
    TargetingLabels,
    OptionPlayLabels,
    RPOLabels
} from './GameplanConstants';
import {
    GameplanInputItem,
    GameplanInputSm,
    RunInput,
    TargetInput
} from './GameplanInputItem';
import {
    GetDefensivePositions,
    ValidatePassPlayDistribution,
    ValidateRunPlayDistribution
} from './GameplanHelper';
import SchemeModal from './SchemeModal';
import { DropdownItemObj } from '../Roster/DropdownItem';
import { DropdownItem } from '../_Common/Dropdown';
import { SchemeInfo } from './SchemeInfo';
import { FBAToggle } from '../_Common/SwitchToggle';

const CFBGameplan = ({ currentUser, cfbTeam }) => {
    // GameplanService
    let gameplanService = new FBAGameplanService();
    let _teamService = new FBATeamService();
    const [userTeam, setUserTeam] = useState('');
    const [team, setTeam] = useState(''); // Redux value as initial value for react hook
    const [aiTeams, setAITeams] = useState(null);
    const [teamColors, setTeamColors] = useState('');
    const [initialGameplan, setInitialGameplan] = useState(null);
    const [gameplan, setGameplan] = useState(null);
    const [depthChart, setDepthChart] = useState(null);
    const [activeView, setActiveView] = useState('Offensive Formations');
    const [offenseFormationLabels, setOffenseFormationLabels] = useState([]);
    const [passTotal, setPassTotal] = useState(0);
    const [tradRunTotal, setTradRunTotal] = useState(0);
    const [optRunTotal, setOptRunTotal] = useState(0);
    const [rpoTotal, setRPOTotal] = useState(0);
    const [isValid, setValidation] = useState(false);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:760px)` });
    const offensiveFormations =
        gameplan && gameplan.OffensiveScheme
            ? FormationMap[gameplan.OffensiveScheme].Formations
            : [];
    const defensiveFormations =
        gameplan && gameplan.DefensiveScheme
            ? FormationMap[gameplan.DefensiveScheme].Formations
            : [];
    // UseEffects
    useEffect(() => {
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
            setUserTeam(cfbTeam);
            GetAvailableTeams();
        }
    }, [currentUser]);

    useEffect(() => {
        if (cfbTeam) {
            setTeam(cfbTeam);
            const colors = {
                color: '#fff',
                backgroundColor:
                    cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d',
                borderColor:
                    cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d'
            };
            setTeamColors(colors);
        }
    }, [cfbTeam]);

    useEffect(() => {
        if (team) {
            GetGameplan(team.ID);
        }
    }, [team]);

    useEffect(() => {
        if (gameplan) {
            CheckValidation();
        }
    }, [gameplan]);

    const ValidatePlayDistribution = (dist, total, playType, setValidation) => {
        if (dist !== total) {
            const message = `Total ${playType} Distribution is set to ${dist}. Please make sure your allocation equals 100.`;
            setValidation(false);
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 3000 }
            );
            return false;
        }
        return true;
    };

    const CheckWeightDistribution = (weight, playType, setValidation) => {
        if (weight < 0 || weight > 10) {
            const message = `The ${playType} Weight Distribution is set to ${dist}. Please make sure the number is between 0 and 10.`;
            setValidation(false);
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 3000 }
            );
            return false;
        }
        return true;
    };

    const CheckPlayTypeDistribution = (
        weight,
        min,
        max,
        playType,
        setValidation
    ) => {
        if (weight < min || weight > max) {
            const message = `The ${playType} Weight Distribution is set to ${weight}. Please make sure the number is between ${min} and ${max}.`;
            setValidation(false);
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 3000 }
            );
            return false;
        }
        return true;
    };

    const CheckForDistributionInUnusedWeight = (
        formation,
        weight,
        trad,
        opt,
        rpo,
        pass,
        setValidation
    ) => {
        if (weight === 0 && (trad > 0 || opt > 0 || rpo > 0 || pass > 0)) {
            const message = `Offensive Formation ${formation} has weights set greater than zero despite Formation Weight set to 0. Please set all play type weights for formation ${formation} to zero.`;
            setValidation(() => false);
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 6000 }
            );
            return false;
        }
        return true;
    };

    // Function Handlers
    const CheckValidation = () => {
        const gp = { ...gameplan };
        const offensiveScheme = FormationMap[gp.OffensiveScheme];
        const defensiveScheme = FormationMap[gp.DefensiveScheme];
        const { Ranges } = offensiveScheme;
        const totalDistribution = 100;
        let formationDist = 0;
        let tradRunDist = 0;
        let optRunDist = 0;
        let rpoDist = 0;
        let passDist = 0;
        let currentDistribution = 0;
        let message = '';
        let valid = true;
        let formationCount = 0;
        // Check Offensive formations
        if (gp.OffFormation1Weight > 0) {
            formationCount += 1;
        }

        if (gp.OffFormation2Weight > 0) {
            formationCount += 1;
        }

        if (gp.OffFormation3Weight > 0) {
            formationCount += 1;
        }

        if (gp.OffFormation4Weight > 0) {
            formationCount += 1;
        }

        if (gp.OffFormation5Weight > 0) {
            formationCount += 1;
        }

        if (formationCount > 3) {
            message = `You're currently weighted to use ${formationCount} different formations when the maximum is 3. Please reduce the weight of one of your formations to bring the count to 3.`;
            valid = false;
            setValidation(valid);
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 2000 }
            );
            return;
        }

        formationDist =
            gp.OffForm1Weight +
            gp.OffForm2Weight +
            gp.OffForm3Weight +
            gp.OffForm4Weight +
            gp.OffForm5Weight;

        if (formationDist !== totalDistribution) {
            message = `Total Offensive Formation Ratio is set to ${formationDist}. Please make sure your allocation equals 100.`;
            valid = false;
            setValidation(valid);
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 2000 }
            );
            return;
        }

        const unusedWeightForm1 = CheckForDistributionInUnusedWeight(
            'One',
            gp.OffForm1Weight,
            gp.OffForm1TraditionalRun,
            gp.OffForm1OptionRun,
            gp.OffForm1RPO,
            gp.OffForm1Pass,
            setValidation
        );
        const unusedWeightForm2 = CheckForDistributionInUnusedWeight(
            'Two',
            gp.OffForm2Weight,
            gp.OffForm2TraditionalRun,
            gp.OffForm2OptionRun,
            gp.OffForm2RPO,
            gp.OffForm2Pass,
            setValidation
        );
        const unusedWeightForm3 = CheckForDistributionInUnusedWeight(
            'Three',
            gp.OffForm3Weight,
            gp.OffForm3TraditionalRun,
            gp.OffForm3OptionRun,
            gp.OffForm3RPO,
            gp.OffForm3Pass,
            setValidation
        );
        const unusedWeightForm4 = CheckForDistributionInUnusedWeight(
            'Four',
            gp.OffForm4Weight,
            gp.OffForm4TraditionalRun,
            gp.OffForm4OptionRun,
            gp.OffForm4RPO,
            gp.OffForm4Pass,
            setValidation
        );
        const unusedWeightForm5 = CheckForDistributionInUnusedWeight(
            'Five',
            gp.OffForm5Weight,
            gp.OffForm5TraditionalRun,
            gp.OffForm5OptionRun,
            gp.OffForm5RPO,
            gp.OffForm5Pass,
            setValidation
        );

        if (
            !unusedWeightForm1 ||
            !unusedWeightForm2 ||
            !unusedWeightForm3 ||
            !unusedWeightForm4 ||
            !unusedWeightForm5
        )
            return;

        // Get Min,Max Ranges
        const { TraditionalRun, OptionRun, RPO, Pass } = Ranges;

        // Check Ratio Min & Max
        tradRunDist =
            gp.OffForm1TraditionalRun +
            gp.OffForm2TraditionalRun +
            gp.OffForm3TraditionalRun +
            gp.OffForm4TraditionalRun +
            gp.OffForm5TraditionalRun;

        const checkTradRun = CheckPlayTypeDistribution(
            tradRunDist,
            TraditionalRun.Min,
            TraditionalRun.Max,
            'Traditional Run',
            setValidation
        );

        optRunDist =
            gp.OffForm1OptionRun +
            gp.OffForm2OptionRun +
            gp.OffForm3OptionRun +
            gp.OffForm4OptionRun +
            gp.OffForm5OptionRun;
        const checkOptRun = CheckPlayTypeDistribution(
            optRunDist,
            OptionRun.Min,
            OptionRun.Max,
            'Option Run',
            setValidation
        );
        rpoDist =
            gp.OffForm1RPO +
            gp.OffForm2RPO +
            gp.OffForm3RPO +
            gp.OffForm4RPO +
            gp.OffForm5RPO;
        const checkRPO = CheckPlayTypeDistribution(
            rpoDist,
            RPO.Min,
            RPO.Max,
            'Option Run',
            setValidation
        );

        passDist =
            gp.OffForm1Pass +
            gp.OffForm2Pass +
            gp.OffForm3Pass +
            gp.OffForm4Pass +
            gp.OffForm5Pass;

        const checkPass = CheckPlayTypeDistribution(
            passDist,
            Pass.Min,
            Pass.Max,
            'Pass',
            setValidation
        );

        setPassTotal(() => passDist);
        setTradRunTotal(() => tradRunDist);
        setOptRunTotal(() => optRunDist);
        setRPOTotal(() => rpoDist);

        if (!checkTradRun || !checkOptRun || !checkRPO || !checkPass) return;
        // Check Running Distribution
        // Check Max Values on Distribution

        // Need to redo run distributions by scheme
        currentDistribution =
            gp.RunnerDistributionRB1 +
            gp.RunnerDistributionRB2 +
            gp.RunnerDistributionRB3 +
            gp.RunnerDistributionFB1 +
            gp.RunnerDistributionFB2 +
            gp.RunnerDistributionWR +
            gp.RunnerDistributionQB;

        let rb1Check = CheckWeightDistribution(
            gp.RunnerDistributionRB1,
            'Run',
            setValidation
        );
        let rb2Check = CheckWeightDistribution(
            gp.RunnerDistributionRB2,
            'Run',
            setValidation
        );
        const rb3Check = CheckWeightDistribution(
            gp.RunnerDistributionRB2,
            'Run',
            setValidation
        );
        let fb1Check = CheckWeightDistribution(
            gp.RunnerDistributionFB1,
            'Run',
            setValidation
        );
        const fb2Check = CheckWeightDistribution(
            gp.RunnerDistributionFB2,
            'Run',
            setValidation
        );
        const wrCheck = CheckWeightDistribution(
            gp.RunnerDistributionWR,
            'Run',
            setValidation
        );
        const qbCheck = CheckWeightDistribution(
            gp.RunnerDistributionQB,
            'Run',
            setValidation
        );

        if (
            !rb1Check ||
            !rb2Check ||
            !rb3Check ||
            !fb1Check ||
            !fb2Check ||
            !wrCheck ||
            !qbCheck
        ) {
            return;
        }

        const wr1Check = CheckWeightDistribution(
            gp.TargetingWR1,
            'Pass',
            setValidation
        );
        const wr2Check = CheckWeightDistribution(
            gp.TargetingWR2,
            'Pass',
            setValidation
        );

        const wr3Check = CheckWeightDistribution(
            gp.TargetingWR3,
            'Pass',
            setValidation
        );

        const wr4Check = CheckWeightDistribution(
            gp.TargetingWR4,
            'Pass',
            setValidation
        );

        const wr5Check = CheckWeightDistribution(
            gp.TargetingWR5,
            'Pass',
            setValidation
        );

        const te1Check = CheckWeightDistribution(
            gp.TargetingTE1,
            'Pass',
            setValidation
        );

        const te2Check = CheckWeightDistribution(
            gp.TargetingTE2,
            'Pass',
            setValidation
        );

        const te3Check = CheckWeightDistribution(
            gp.TargetingTE3,
            'Pass',
            setValidation
        );
        rb1Check = CheckWeightDistribution(
            gp.TargetingRB1,
            'Pass',
            setValidation
        );

        rb2Check = CheckWeightDistribution(
            gp.TargetingRB2,
            'Pass',
            setValidation
        );

        fb1Check = CheckWeightDistribution(
            gp.TargetingFB1,
            'Pass',
            setValidation
        );

        if (
            !rb1Check ||
            !rb2Check ||
            !fb1Check ||
            !wr1Check ||
            !wr2Check ||
            !wr3Check ||
            !wr4Check ||
            !wr5Check ||
            !te1Check ||
            !te2Check ||
            !te3Check
        ) {
            return;
        }

        // Check Run Play Distribution
        // Do max value checks on Run Plays
        const validRunPlays = ValidateRunPlayDistribution(gp);

        if (!validRunPlays) {
            message =
                'Run Play Distribution is out of range. Please change ranges for all inside, outside, and power plays (50 max) and all draw plays (15 max)';
            setValidation(validRunPlays);
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 3000 }
            );
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

        const validRun = ValidatePlayDistribution(
            currentDistribution,
            totalDistribution,
            'Run Play',
            setValidation
        );

        if (!validRun) return;

        currentDistribution =
            gp.ReadOptionLeft +
            gp.ReadOptionRight +
            gp.SpeedOptionLeft +
            gp.SpeedOptionRight +
            gp.InvertedOptionLeft +
            gp.InvertedOptionRight +
            gp.TripleOptionLeft +
            gp.TripleOptionRight;

        const validOption =
            optRunDist > 0 &&
            ValidatePlayDistribution(
                currentDistribution,
                totalDistribution,
                'Option Run',
                setValidation
            );
        if (!validOption) return;

        // Check Pass Play Distribution
        const validPassPlays = ValidatePassPlayDistribution(gp);

        if (!validPassPlays) {
            message = `Please modify the pass play distribution for all plays for the current scheme: ${gp.OffensiveScheme}`;
            setValidation(validPassPlays);
            toast.error(
                (t) => (
                    <span>
                        {message}{' '}
                        <button onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ),
                { duration: 10000 }
            );
            return;
        }

        currentDistribution =
            gp.PassQuick +
            gp.PassShort +
            gp.PassLong +
            gp.PassScreen +
            gp.PassPAShort +
            gp.PassPALong;

        const validPass = ValidatePlayDistribution(
            currentDistribution,
            totalDistribution,
            'Pass Play',
            setValidation
        );
        if (!validPass) return;

        currentDistribution =
            gp.ChoiceOutside +
            gp.ChoiceInside +
            gp.PeekOutside +
            gp.PeekInside +
            gp.ChoicePower +
            gp.PeekPower +
            gp.LeftVsRight;

        const validRPO =
            rpoDist > 0 &&
            ValidatePlayDistribution(
                currentDistribution,
                totalDistribution,
                'RPO',
                setValidation
            );
        if (!validRPO) return;

        setValidation(valid);
        toast.success('Gameplan is ready to save!', { duration: 3000 });
    };

    const SelectUserTeam = () => {
        SelectTeam(userTeam);
    };

    const SelectTeam = (selectedTeam) => {
        setTeam(selectedTeam);
    };

    const GetGameplan = async (ID) => {
        let response = await gameplanService.GetGameplanByTeamID(ID);
        const { CollegeGP, CollegeDC } = response;
        const { DepthChartPlayers } = CollegeDC;
        const targetPositions = ['QB', 'RB', 'WR', 'TE', 'FB'];
        const positionPlayers = DepthChartPlayers.filter((x) =>
            targetPositions.includes(x.Position)
        );
        setInitialGameplan({ ...CollegeGP });
        setGameplan({ ...CollegeGP });
        setDepthChart([...positionPlayers]);
    };

    const GetAvailableTeams = async () => {
        let res = await _teamService.GetAvailableCollegeTeams();

        setAITeams(res);
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

        setGameplan(gp);
    };

    const HandleToggleChange = (event) => {
        const { value } = event.target;
        const gp = { ...gameplan };
        console.log({ value });
        gp[value] = !gp[value];

        if (value === 'DefaultOffense') {
        } else if (value === 'DefaultDefense') {
        }

        setGameplan(() => gp);
    };

    const HandleNumberChange = (event) => {
        let gp = { ...gameplan };
        let { name, value } = event.target;
        let num = Number(value);
        if (num < 0) {
            num = 0;
        }
        gp[name] = num;

        // If Value IS NOT a Number...
        setGameplan(() => gp);
    };

    const SaveToast = () => {
        toast.promise(SaveGameplanOptions(), {
            loading: 'Saving...'
        });
    };

    const SaveGameplanOptions = async () => {
        if (!isValid) return;

        const fullGP = {
            ...gameplan,
            OffFormation1Name: offensiveFormations[0].name,
            OffFormation2Name: offensiveFormations[1].name,
            OffFormation3Name: offensiveFormations[2].name,
            OffFormation4Name: offensiveFormations[3].name,
            OffFormation5Name: offensiveFormations[4].name,
            DefFormation1: defensiveFormations[0].name,
            DefFormation2: defensiveFormations[1].name,
            DefFormation3: defensiveFormations[2].name,
            DefFormation4: defensiveFormations[3].name,
            DefFormation5: defensiveFormations[4].name
        };

        const UpdateGameplanDTO = {
            GameplanID: gameplan.ID.toString(),
            UpdatedGameplan: fullGP,
            Username: currentUser.username,
            TeamName: cfbTeam.TeamName
        };

        // Save
        const save = await gameplanService.SaveGameplan(UpdateGameplanDTO);

        if (save.ok) {
            // YAY!
            toast.success('Successfully Saved Gameplan!', {
                style: {
                    border: `1px solid ${cfbTeam.ColorOne}`,
                    padding: '16px',
                    color: cfbTeam.ColorTwo
                },
                iconTheme: {
                    primary: cfbTeam.ColorOne,
                    secondary: cfbTeam.ColorTwo
                },
                duration: 4000
            });
        } else {
            toast.error('Could not save Gameplan.');
        }

        // Response
        setInitialGameplan({ ...gameplan });
    };

    const ResetGameplan = () => {
        const originalGameplan = { ...initialGameplan };
        setGameplan(() => originalGameplan);
    };

    // Child Component References
    const GPTab = ({ activeView, gameplanType, setActiveView }) => {
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

    // Mobile classes

    // Return
    return (
        <div className="container-fluid mt-3 cfb-gameplan-container px-4">
            <div className="row mb-1">
                <div className="col-md-auto justify-content-start">
                    <h2>{team ? team.TeamName : ''} Gameplan</h2>
                </div>
                <div className="col-md-auto ms-auto d-flex align-items-center">
                    {currentUser && currentUser.roleID === 'Admin' && (
                        <div className="drop-start btn-dropdown-width-team me-2">
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
                                        currentUser
                                            ? currentUser.team +
                                              ' ' +
                                              currentUser.mascot
                                            : null
                                    }
                                    click={SelectUserTeam}
                                    id={currentUser ? currentUser.teamId : null}
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
                    )}
                    <button
                        className="btn btn-danger me-2"
                        onClick={ResetGameplan}
                    >
                        Reset Gameplan
                    </button>

                    <button
                        className={
                            isValid ? `btn btn-primary` : `btn btn-secondary`
                        }
                        disabled={!isValid}
                        onClick={SaveToast}
                    >
                        Save Gameplan
                    </button>
                </div>
            </div>
            <div className="row mb-3">
                <ul className="nav nav-tabs">
                    <GPTab
                        activeView={activeView}
                        gameplanType="Offensive Formations"
                        setActiveView={setActiveView}
                    />
                    <GPTab
                        activeView={activeView}
                        gameplanType="Offensive Distributions"
                        setActiveView={setActiveView}
                    />
                    <GPTab
                        activeView={activeView}
                        gameplanType="Defense"
                        setActiveView={setActiveView}
                    />
                    <GPTab
                        activeView={activeView}
                        gameplanType="Special Teams"
                        setActiveView={setActiveView}
                    />
                </ul>
            </div>
            {gameplan && activeView === 'Offensive Formations' && (
                <>
                    <SchemeModal />
                    <div className="row mt-1">
                        <div className="container offense-options">
                            <div className="row mb-1 d-flex flex-wrap">
                                <div
                                    className={`card ${
                                        isMobile ? '' : 'w-25'
                                    } text-start`}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Offensive Scheme:
                                            <button
                                                type="button"
                                                className="btn btn-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target="#schemeModal"
                                            >
                                                <i className="bi bi-info-circle" />
                                            </button>
                                        </h5>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle cfb-gameplan-btn scheme"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                style={
                                                    teamColors ? teamColors : {}
                                                }
                                            >
                                                {gameplan
                                                    ? gameplan.OffensiveScheme
                                                    : 'Loading...'}
                                            </button>
                                            <ul
                                                className="dropdown-menu dropdown-content"
                                                aria-labelledby="dropdownMenuButton1"
                                            >
                                                {OffensiveSchemeOptions.map(
                                                    (x) => (
                                                        <DropdownItem
                                                            name="OffensiveScheme"
                                                            id="OffensiveScheme"
                                                            value={x}
                                                            click={
                                                                HandleTextChange
                                                            }
                                                        />
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        {gameplan &&
                                            gameplan.OffensiveScheme && (
                                                <SchemeInfo
                                                    formationMap={FormationMap}
                                                    scheme={
                                                        gameplan.OffensiveScheme
                                                    }
                                                />
                                            )}
                                    </div>
                                </div>
                                <div
                                    className={`card ${isMobile ? '' : 'w-75'}`}
                                >
                                    <div className="card-body text-start mb-2">
                                        <div className="row gap-2 mb-1">
                                            <div className="col-md-auto">
                                                <h5 className="card-title">
                                                    Offensive Formations
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#schemeModal"
                                                    >
                                                        <i className="bi bi-info-circle" />
                                                    </button>
                                                </h5>
                                            </div>
                                            <FBAToggle
                                                label="Default Offense"
                                                value="DefaultOffense"
                                                checkValue={
                                                    gameplan
                                                        ? gameplan.DefaultOffense
                                                        : false
                                                }
                                                change={HandleToggleChange}
                                            />
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-auto">
                                                <h6 className="card-subtitle">
                                                    Traditional Run:{' '}
                                                    {tradRunTotal}
                                                </h6>
                                            </div>
                                            <div className="col-auto">
                                                <h6 className="card-subtitle">
                                                    Option Run: {optRunTotal}
                                                </h6>
                                            </div>
                                            <div className="col-auto">
                                                <h6 className="card-subtitle">
                                                    Pass: {passTotal}
                                                </h6>
                                            </div>
                                            <div className="col-auto">
                                                <h6 className="card-subtitle">
                                                    RPO: {rpoTotal}
                                                </h6>
                                            </div>
                                        </div>

                                        <div className="row gap-3">
                                            {offensiveFormations.map(
                                                (x, idx) => {
                                                    const num = idx + 1;
                                                    const initLabel = `OffForm${num}`;
                                                    const positions =
                                                        x.positions.join(', ');
                                                    return (
                                                        <div className="col-md-2 gx-3 border rounded">
                                                            <h6 className="pt-2">
                                                                {x.name}
                                                            </h6>
                                                            <p className="text-small">
                                                                {positions}
                                                            </p>
                                                            <GameplanInputSm
                                                                label="Weight"
                                                                name={`${initLabel}Weight`}
                                                                value={
                                                                    gameplan
                                                                        ? gameplan[
                                                                              `${initLabel}Weight`
                                                                          ]
                                                                        : 0
                                                                }
                                                                handleChange={
                                                                    HandleNumberChange
                                                                }
                                                            />
                                                            <GameplanInputSm
                                                                label="Traditional Run"
                                                                name={`${initLabel}TraditionalRun`}
                                                                value={
                                                                    gameplan
                                                                        ? gameplan[
                                                                              `${initLabel}TraditionalRun`
                                                                          ]
                                                                        : 0
                                                                }
                                                                handleChange={
                                                                    HandleNumberChange
                                                                }
                                                            />
                                                            <GameplanInputSm
                                                                label="Option Run"
                                                                name={`${initLabel}OptionRun`}
                                                                value={
                                                                    gameplan
                                                                        ? gameplan[
                                                                              `${initLabel}OptionRun`
                                                                          ]
                                                                        : 0
                                                                }
                                                                handleChange={
                                                                    HandleNumberChange
                                                                }
                                                            />
                                                            <GameplanInputSm
                                                                label="Pass"
                                                                name={`${initLabel}Pass`}
                                                                value={
                                                                    gameplan
                                                                        ? gameplan[
                                                                              `${initLabel}Pass`
                                                                          ]
                                                                        : 0
                                                                }
                                                                handleChange={
                                                                    HandleNumberChange
                                                                }
                                                            />
                                                            <GameplanInputSm
                                                                label="RPO"
                                                                name={`${initLabel}RPO`}
                                                                value={
                                                                    gameplan
                                                                        ? gameplan[
                                                                              `${initLabel}RPO`
                                                                          ]
                                                                        : 0
                                                                }
                                                                handleChange={
                                                                    HandleNumberChange
                                                                }
                                                            />
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {gameplan &&
                depthChart &&
                activeView === 'Offensive Distributions' && (
                    <>
                        <SchemeModal />
                        <div className="row mt-1">
                            <div className="container offense-options">
                                <div className="row mb-1 d-flex flex-wrap">
                                    <div className="card text-start">
                                        <div className="card-body mb-1">
                                            <h5 className="card-title">
                                                Offensive Distributions
                                            </h5>
                                            <div className="row gap-3">
                                                <div
                                                    className={`${
                                                        isMobile ? '' : 'w-20'
                                                    } gx-3 border rounded`}
                                                >
                                                    <h6 className="pt-2 mb-1">
                                                        Target Distributions
                                                    </h6>
                                                    {TargetingLabels.map(
                                                        (x) => {
                                                            const name =
                                                                'Targeting' + x;
                                                            let max =
                                                                x === 'TE3'
                                                                    ? '0'
                                                                    : '60';
                                                            return (
                                                                <TargetInput
                                                                    name={name}
                                                                    label={x}
                                                                    value={
                                                                        gameplan[
                                                                            name
                                                                        ]
                                                                    }
                                                                    targetDepth={
                                                                        gameplan[
                                                                            `TargetDepth${x}`
                                                                        ]
                                                                            ? gameplan[
                                                                                  `TargetDepth${x}`
                                                                              ]
                                                                            : 'None'
                                                                    }
                                                                    dc={
                                                                        depthChart
                                                                    }
                                                                    handleChange={
                                                                        HandleNumberChange
                                                                    }
                                                                    handleClick={
                                                                        HandleTextChange
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </div>
                                                <div
                                                    className={`${
                                                        isMobile ? '' : 'w-80'
                                                    } gx-3 row`}
                                                >
                                                    <div className="col-md-3 gx-3 border rounded mb-2">
                                                        <h6 className="pt-2">
                                                            Running
                                                            Distributions
                                                        </h6>
                                                        <RunInput
                                                            label="QB"
                                                            name={`RunnerDistributionQB`}
                                                            value={
                                                                gameplan
                                                                    ? gameplan[
                                                                          'RunnerDistributionQB'
                                                                      ]
                                                                    : 0
                                                            }
                                                            handleChange={
                                                                HandleNumberChange
                                                            }
                                                            dc={depthChart}
                                                        />
                                                        <RunInput
                                                            label="RB1"
                                                            name={`RunnerDistributionRB1`}
                                                            value={
                                                                gameplan
                                                                    ? gameplan[
                                                                          'RunnerDistributionRB1'
                                                                      ]
                                                                    : 0
                                                            }
                                                            handleChange={
                                                                HandleNumberChange
                                                            }
                                                            dc={depthChart}
                                                        />
                                                        <RunInput
                                                            label="RB2"
                                                            name={`RunnerDistributionRB2`}
                                                            value={
                                                                gameplan
                                                                    ? gameplan[
                                                                          'RunnerDistributionRB2'
                                                                      ]
                                                                    : 0
                                                            }
                                                            handleChange={
                                                                HandleNumberChange
                                                            }
                                                            dc={depthChart}
                                                        />
                                                        <RunInput
                                                            label="RB3"
                                                            name={`RunnerDistributionRB3`}
                                                            value={
                                                                gameplan
                                                                    ? gameplan[
                                                                          'RunnerDistributionRB3'
                                                                      ]
                                                                    : 0
                                                            }
                                                            handleChange={
                                                                HandleNumberChange
                                                            }
                                                            dc={depthChart}
                                                        />
                                                        <RunInput
                                                            label="FB1"
                                                            name={`RunnerDistributionFB1`}
                                                            value={
                                                                gameplan
                                                                    ? gameplan[
                                                                          'RunnerDistributionFB1'
                                                                      ]
                                                                    : 0
                                                            }
                                                            handleChange={
                                                                HandleNumberChange
                                                            }
                                                            dc={depthChart}
                                                        />
                                                        <RunInput
                                                            label="FB2"
                                                            name={`RunnerDistributionFB2`}
                                                            value={
                                                                gameplan
                                                                    ? gameplan[
                                                                          'RunnerDistributionFB2'
                                                                      ]
                                                                    : 0
                                                            }
                                                            handleChange={
                                                                HandleNumberChange
                                                            }
                                                            dc={depthChart}
                                                        />
                                                        <TargetInput
                                                            label={
                                                                gameplan[
                                                                    `RunnerDistributionWRPosition`
                                                                ]
                                                                    ? gameplan[
                                                                          `RunnerDistributionWRPosition`
                                                                      ]
                                                                    : 'WR1'
                                                            }
                                                            name={`RunnerDistributionWR`}
                                                            value={
                                                                gameplan
                                                                    ? gameplan[
                                                                          'RunnerDistributionWR'
                                                                      ]
                                                                    : 0
                                                            }
                                                            targetDepth={
                                                                gameplan[
                                                                    `RunnerDistributionWRPosition`
                                                                ]
                                                                    ? gameplan[
                                                                          `RunnerDistributionWRPosition`
                                                                      ]
                                                                    : 'None'
                                                            }
                                                            dc={depthChart}
                                                            handleChange={
                                                                HandleNumberChange
                                                            }
                                                            handleClick={
                                                                HandleTextChange
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-md-auto gx-3 border rounded mb-2">
                                                        <h6 className="pt-2">
                                                            Run Type
                                                            Distributions
                                                        </h6>
                                                        {RunPlayLabels.map(
                                                            (x) => {
                                                                const name =
                                                                    'Run' + x;
                                                                return (
                                                                    <GameplanInputSm
                                                                        name={
                                                                            name
                                                                        }
                                                                        label={
                                                                            x
                                                                        }
                                                                        value={
                                                                            gameplan
                                                                                ? gameplan[
                                                                                      name
                                                                                  ]
                                                                                : 0
                                                                        }
                                                                        handleChange={
                                                                            HandleNumberChange
                                                                        }
                                                                    />
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                    <div className="col-md-2 gx-3 border rounded mb-2">
                                                        <h6 className="pt-2">
                                                            Option Distributions
                                                        </h6>
                                                        {OptionPlayLabels.map(
                                                            (x) => {
                                                                return (
                                                                    <GameplanInputSm
                                                                        name={x}
                                                                        label={
                                                                            x
                                                                        }
                                                                        value={
                                                                            gameplan
                                                                                ? gameplan[
                                                                                      x
                                                                                  ]
                                                                                : 0
                                                                        }
                                                                        handleChange={
                                                                            HandleNumberChange
                                                                        }
                                                                    />
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                    <div className="col-md-2 gx-3 border rounded mb-2">
                                                        <h6 className="pt-2">
                                                            Pass Type
                                                            Distributions
                                                        </h6>
                                                        {PassPlayLabels.map(
                                                            (x, idx) => {
                                                                const name =
                                                                    'Pass' + x;
                                                                let label = x;
                                                                if (idx === 4) {
                                                                    label =
                                                                        'Play Action Short';
                                                                } else if (
                                                                    idx === 5
                                                                ) {
                                                                    label =
                                                                        'Play Action Long';
                                                                }

                                                                return (
                                                                    <div className="col-auto d-flex">
                                                                        <GameplanInputSm
                                                                            name={
                                                                                name
                                                                            }
                                                                            label={
                                                                                label
                                                                            }
                                                                            value={
                                                                                gameplan[
                                                                                    name
                                                                                ]
                                                                            }
                                                                            handleChange={
                                                                                HandleNumberChange
                                                                            }
                                                                        />
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                    <div className="col-md-2 gx-3 border rounded mb-1">
                                                        <h6 className="pt-2">
                                                            RPO Distributions
                                                        </h6>
                                                        {RPOLabels.map((x) => {
                                                            return (
                                                                <GameplanInputSm
                                                                    name={x}
                                                                    label={x}
                                                                    value={
                                                                        gameplan
                                                                            ? gameplan[
                                                                                  x
                                                                              ]
                                                                            : 0
                                                                    }
                                                                    handleChange={
                                                                        HandleNumberChange
                                                                    }
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            {gameplan && activeView === 'Defense' && (
                <>
                    <div className="row mt-1">
                        <div className="container defense-options">
                            <div className="row mb-1 d-flex flex-wrap">
                                <div
                                    className={`card ${
                                        isMobile ? '' : 'w-25'
                                    } text-start`}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Defensive Scheme
                                            <button
                                                type="button"
                                                className="btn btn-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target="#schemeModal"
                                            >
                                                <i className="bi bi-info-circle" />
                                            </button>
                                        </h5>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle cfb-gameplan-btn scheme"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                style={
                                                    teamColors ? teamColors : {}
                                                }
                                            >
                                                {gameplan
                                                    ? gameplan.DefensiveScheme
                                                    : 'Loading...'}
                                            </button>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton1"
                                            >
                                                {DefensiveSchemeOptions.map(
                                                    (x) => (
                                                        <DropdownItem
                                                            name="DefensiveScheme"
                                                            id="DefensiveScheme"
                                                            value={x}
                                                            click={
                                                                HandleTextChange
                                                            }
                                                        />
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        {gameplan.DefensiveScheme && (
                                            <SchemeInfo
                                                formationMap={FormationMap}
                                                scheme={
                                                    gameplan.DefensiveScheme
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`card ${
                                        isMobile ? '' : 'w-75'
                                    } text-start`}
                                >
                                    <div className="card-body text-start mb-2">
                                        <div className="row gap-2">
                                            <div className="col-md-auto">
                                                <h5 className="card-title">
                                                    Defensive Formations
                                                </h5>
                                            </div>
                                            <FBAToggle
                                                label="Default Defense"
                                                value="DefaultDefense"
                                                checkValue={
                                                    gameplan
                                                        ? gameplan.DefaultDefense
                                                        : false
                                                }
                                                change={HandleToggleChange}
                                            />
                                        </div>

                                        <div className="row gap-2">
                                            {defensiveFormations.map(
                                                (x, idx) => {
                                                    const num = idx + 1;
                                                    const initLabel = `DefFormation${num}`;
                                                    const positions =
                                                        GetDefensivePositions(
                                                            x.positions
                                                        );

                                                    return (
                                                        <div className="col-md-2 border rounded">
                                                            <h6 className="pt-2">
                                                                {x.name}
                                                            </h6>
                                                            <p className="text-small">
                                                                {positions}
                                                            </p>
                                                            <GameplanInputSm
                                                                label="Run to Pass"
                                                                name={`${initLabel}RunToPass`}
                                                                value={
                                                                    gameplan
                                                                        ? gameplan[
                                                                              `${initLabel}RunToPass`
                                                                          ]
                                                                        : 0
                                                                }
                                                                handleChange={
                                                                    HandleNumberChange
                                                                }
                                                            />
                                                            <GameplanInputSm
                                                                label="Blitz Weight"
                                                                name={`${initLabel}BlitzWeight`}
                                                                value={
                                                                    gameplan
                                                                        ? gameplan[
                                                                              `${initLabel}BlitzWeight`
                                                                          ]
                                                                        : 0
                                                                }
                                                                handleChange={
                                                                    HandleNumberChange
                                                                }
                                                            />
                                                            <h6>
                                                                Blitz Aggression
                                                            </h6>
                                                            <div className="dropdown">
                                                                <button
                                                                    className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                                                    type="button"
                                                                    id="dropdownMenuButton1"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                    style={
                                                                        teamColors
                                                                            ? teamColors
                                                                            : {}
                                                                    }
                                                                >
                                                                    {gameplan
                                                                        ? gameplan[
                                                                              `${initLabel}BlitzAggression`
                                                                          ]
                                                                        : 'Loading...'}
                                                                </button>
                                                                <ul
                                                                    className="dropdown-menu"
                                                                    aria-labelledby="dropdownMenuButton1"
                                                                >
                                                                    {gameplan &&
                                                                        BlitzAggressivenessOptions.map(
                                                                            (
                                                                                x
                                                                            ) => (
                                                                                <DropdownItem
                                                                                    name={`${initLabel}BlitzAggression`}
                                                                                    id={`${initLabel}BlitzAggression`}
                                                                                    value={
                                                                                        x
                                                                                    }
                                                                                    click={
                                                                                        HandleTextChange
                                                                                    }
                                                                                />
                                                                            )
                                                                        )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}

                                            <div className="w-86 border rounded">
                                                <h6 className="pt-2">
                                                    Defensive Settings
                                                </h6>
                                                <div className="row d-flex align-items-center">
                                                    <FBAToggle
                                                        label="Blitz Safeties"
                                                        value="BlitzSafeties"
                                                        checkValue={
                                                            gameplan
                                                                ? gameplan.BlitzSafeties
                                                                : false
                                                        }
                                                        change={
                                                            HandleToggleChange
                                                        }
                                                    />
                                                    <FBAToggle
                                                        label="Blitz Corners"
                                                        value="BlitzCorners"
                                                        checkValue={
                                                            gameplan
                                                                ? gameplan.BlitzCorners
                                                                : false
                                                        }
                                                        change={
                                                            HandleToggleChange
                                                        }
                                                    />
                                                    <div className="col p-2 ms-2 me-2">
                                                        <h6>
                                                            Linebacker Coverage
                                                        </h6>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                                                type="button"
                                                                id="dropdownMenuButton1"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                                style={
                                                                    teamColors
                                                                        ? teamColors
                                                                        : {}
                                                                }
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
                                                                    CoverageOptions.map(
                                                                        (x) => (
                                                                            <DropdownItem
                                                                                name="LinebackerCoverage"
                                                                                id="LinebackerCoverage"
                                                                                value={
                                                                                    x
                                                                                }
                                                                                click={
                                                                                    HandleTextChange
                                                                                }
                                                                            />
                                                                        )
                                                                    )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col p-2 ms-2 me-2">
                                                        <h6>
                                                            Corners Coverage
                                                        </h6>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                                                type="button"
                                                                id="dropdownMenuButton1"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                                style={
                                                                    teamColors
                                                                        ? teamColors
                                                                        : {}
                                                                }
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
                                                                    CoverageOptions.map(
                                                                        (x) => (
                                                                            <DropdownItem
                                                                                name="CornersCoverage"
                                                                                id="CornersCoverage"
                                                                                value={
                                                                                    x
                                                                                }
                                                                                click={
                                                                                    HandleTextChange
                                                                                }
                                                                            />
                                                                        )
                                                                    )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col p-2 ms-2 me-2">
                                                        <h6>
                                                            Safeties Coverage
                                                        </h6>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn btn-secondary dropdown-toggle cfb-gameplan-btn"
                                                                type="button"
                                                                id="dropdownMenuButton1"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                                style={
                                                                    teamColors
                                                                        ? teamColors
                                                                        : {}
                                                                }
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
                                                                    CoverageOptions.map(
                                                                        (x) => (
                                                                            <DropdownItem
                                                                                name="SafetiesCoverage"
                                                                                id="SafetiesCoverage"
                                                                                value={
                                                                                    x
                                                                                }
                                                                                click={
                                                                                    HandleTextChange
                                                                                }
                                                                            />
                                                                        )
                                                                    )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {gameplan && activeView === 'Special Teams' && (
                <>
                    <div className="row mt-1 justify-content-start">
                        <div className="container st-options">
                            <div className="row mb-1 d-flex flex-wrap">
                                <div className="card text-start">
                                    <div className="card-body">
                                        <h5>Special Team Options</h5>
                                        <div className="row gap-2">
                                            <div className="col-auto">
                                                <GameplanInputItem
                                                    name="MaximumFGDistance"
                                                    label="Maximum Field Goal Distance"
                                                    value={
                                                        gameplan &&
                                                        gameplan.MaximumFGDistance
                                                    }
                                                    min={'15'}
                                                    max={'85'}
                                                    handleChange={
                                                        HandleNumberChange
                                                    }
                                                />
                                            </div>
                                            <div className="col-auto">
                                                <GameplanInputItem
                                                    name="GoFor4AndShort"
                                                    label="Go For It on 4th and Short"
                                                    value={
                                                        gameplan &&
                                                        gameplan.GoFor4AndShort
                                                    }
                                                    min={'0'}
                                                    max={'85'}
                                                    handleChange={
                                                        HandleNumberChange
                                                    }
                                                />
                                            </div>
                                            <div className="col-auto">
                                                <GameplanInputItem
                                                    name="GoFor4AndLong"
                                                    label="Go For It on 4th and Long"
                                                    value={
                                                        gameplan &&
                                                        gameplan.GoFor4AndLong
                                                    }
                                                    min={'0'}
                                                    max={'85'}
                                                    handleChange={
                                                        HandleNumberChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser }, cfbTeam: { cfbTeam } }) => ({
    currentUser,
    cfbTeam
});

export default connect(mapStateToProps)(CFBGameplan);
