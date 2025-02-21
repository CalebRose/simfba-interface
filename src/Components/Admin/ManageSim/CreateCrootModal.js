import React, { useEffect } from 'react';
import {
    AcademicBiasList,
    AffinitiesList,
    ArchetypeList,
    FreeAgencyList,
    PersonalitiesList,
    FBPositionList,
    RecruitingBiasList,
    StatesList,
    WorkEthicList
} from '../../../Constants/CommonConstants';
import {
    GetOverall,
    GetPotentialGrade,
    GetValidation
} from './CreateCrootHelper';

const CreateCrootModal = (props) => {
    const [Recruit, setRecruit] = React.useState({});
    const [archetypes, setArchetypes] = React.useState([]);
    const [initialAffinitiesList] = React.useState([...AffinitiesList]);
    const [currentAffinitiesList, setCurrentAffinitiesList] = React.useState(
        []
    );
    const [validStatus, setValidStatus] = React.useState(false);
    const positions = [...FBPositionList.map((x) => x.abbr)];
    const initialArchetypes = [...ArchetypeList];
    const starRatings = [1, 2, 3, 4, 5];
    const { handleChange } = props;

    useEffect(() => {
        if (initialAffinitiesList && initialAffinitiesList.length > 0) {
            setCurrentAffinitiesList([...initialAffinitiesList]);
        }
    }, [initialAffinitiesList]);

    useEffect(() => {
        if (Recruit) {
            const ValidateCheck = GetValidation(Recruit);
            setValidStatus(ValidateCheck);
        }
    }, [Recruit]);

    const InputChange = (event) => {
        const { name, value } = event.target;
        let croot = { ...Recruit };
        croot[name] = value;

        setRecruit(croot);
    };

    const DropdownChange = ({ name, value }) => {
        let croot = { ...Recruit };
        croot[name] = value;

        if (name === 'Position') {
            setArchetypes(
                [...initialArchetypes].filter((x) => x.pos === value)
            );
        }
        if (name === 'AffinityOne' || name === 'AffinityTwo') {
            //
            let affinityList = [...initialAffinitiesList];
            if (croot.AffinityOne && croot.AffinityOne.length > 0) {
                affinityList = affinityList.filter(
                    (x) => x !== croot.AffinityOne
                );
            }

            if (croot.AffinityTwo && croot.AffinityTwo.length > 0) {
                affinityList = affinityList.filter(
                    (x) => x !== croot.AffinityTwo
                );
            }

            setCurrentAffinitiesList((x) => affinityList);
        }
        setRecruit(croot);
    };

    const NumberChange = (event) => {
        const { name, value } = event.target;
        let croot = { ...Recruit };
        croot[name] = Number(value);

        let overall = GetOverall(croot);

        croot['Overall'] = overall > 99 ? 99 : overall;

        setRecruit(croot);
    };

    const ModalDropdownDiv = ({ name, value, handleChange }) => {
        const updateOption = () => handleChange({ name: name, value: value });
        return (
            <li>
                <p
                    className="dropdown-item"
                    name={name}
                    value={value}
                    onClick={updateOption}
                >
                    {value}
                </p>
            </li>
        );
    };

    const CreateRecruit = () => {
        //
        let croot = { ...Recruit };
        croot.Age = 18;
        croot.Year = 0;
        croot.PotentialGrade = GetPotentialGrade(croot.Progression);
        let emptyForm = {};
        setRecruit((x) => emptyForm);
        const aL = [...initialAffinitiesList];
        setCurrentAffinitiesList((x) => aL);

        return handleChange(croot);
    };

    return (
        <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Create a Recruit (Admin Only)
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        First Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={InputChange}
                                        name="FirstName"
                                        value={
                                            Recruit && Recruit.FirstName
                                                ? Recruit.FirstName
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Last Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={InputChange}
                                        name="LastName"
                                        value={
                                            Recruit && Recruit.LastName
                                                ? Recruit.LastName
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="col-form-label">
                                        Custom Croot For:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={InputChange}
                                        name="CreatedFor"
                                        value={
                                            Recruit && Recruit.CreatedFor
                                                ? Recruit.CreatedFor
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Position:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.Position
                                                ? Recruit.Position
                                                : 'Select a Position'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'auto',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {positions.map((x) => (
                                                <ModalDropdownDiv
                                                    name="Position"
                                                    value={x}
                                                    handleChange={
                                                        DropdownChange
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Archetype:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.Archetype
                                                ? Recruit.Archetype
                                                : 'Select an Archetype'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'auto',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {archetypes.map((x) => (
                                                <ModalDropdownDiv
                                                    name="Archetype"
                                                    value={x.archetype}
                                                    handleChange={
                                                        DropdownChange
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        High School:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={InputChange}
                                        name="HighSchool"
                                        value={
                                            Recruit && Recruit.HighSchool
                                                ? Recruit.HighSchool
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        City:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={InputChange}
                                        name="City"
                                        value={
                                            Recruit && Recruit.City
                                                ? Recruit.City
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        State:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.State
                                                ? Recruit.State
                                                : 'Select a State'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'scroll',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {StatesList.map((x) => (
                                                <ModalDropdownDiv
                                                    name="State"
                                                    value={x}
                                                    handleChange={
                                                        DropdownChange
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Height (in inches):
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Height"
                                        value={
                                            Recruit && Recruit.Height
                                                ? Recruit.Height
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Weight (lbs):
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Weight"
                                        value={
                                            Recruit && Recruit.Weight
                                                ? Recruit.Weight
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Stars:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.Stars
                                                ? Recruit.Stars
                                                : 'Select Rating'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'auto',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {starRatings.map((x) => (
                                                <ModalDropdownDiv
                                                    name="Stars"
                                                    value={x}
                                                    handleChange={
                                                        DropdownChange
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Overall:
                                    </label>
                                    <input
                                        className="form-control text-center"
                                        type="text"
                                        value={
                                            Recruit && Recruit.Overall
                                                ? Recruit.Overall
                                                : 0
                                        }
                                        disabled
                                        readonly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        Stamina:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Stamina"
                                        value={
                                            Recruit && Recruit.Stamina
                                                ? Recruit.Stamina
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        Injury:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Injury"
                                        value={
                                            Recruit && Recruit.Injury
                                                ? Recruit.Injury
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        Football IQ:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="FootballIQ"
                                        value={
                                            Recruit && Recruit.FootballIQ
                                                ? Recruit.FootballIQ
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        Speed:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Speed"
                                        value={
                                            Recruit && Recruit.Speed
                                                ? Recruit.Speed
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        Agility:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Agility"
                                        value={
                                            Recruit && Recruit.Agility
                                                ? Recruit.Agility
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        Carrying:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Carrying"
                                        value={
                                            Recruit && Recruit.Carrying
                                                ? Recruit.Carrying
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Catching:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Catching"
                                        value={
                                            Recruit && Recruit.Catching
                                                ? Recruit.Catching
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Route Running:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="RouteRunning"
                                        value={
                                            Recruit && Recruit.RouteRunning
                                                ? Recruit.RouteRunning
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Zone Coverage:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="ZoneCoverage"
                                        value={
                                            Recruit && Recruit.ZoneCoverage
                                                ? Recruit.ZoneCoverage
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Man Coverage:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="ManCoverage"
                                        value={
                                            Recruit && Recruit.ManCoverage
                                                ? Recruit.ManCoverage
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Strength:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Strength"
                                        value={
                                            Recruit && Recruit.Strength
                                                ? Recruit.Strength
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Tackle:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Tackle"
                                        value={
                                            Recruit && Recruit.Tackle
                                                ? Recruit.Tackle
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Pass Block:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="PassBlock"
                                        value={
                                            Recruit && Recruit.PassBlock
                                                ? Recruit.PassBlock
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Run Block:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="RunBlock"
                                        value={
                                            Recruit && Recruit.RunBlock
                                                ? Recruit.RunBlock
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Pass Rush:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="PassRush"
                                        value={
                                            Recruit && Recruit.PassRush
                                                ? Recruit.PassRush
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Run Defense:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="RunDefense"
                                        value={
                                            Recruit && Recruit.RunDefense
                                                ? Recruit.RunDefense
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Throw Power:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="ThrowPower"
                                        value={
                                            Recruit && Recruit.ThrowPower
                                                ? Recruit.ThrowPower
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Throw Accuracy:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="ThrowAccuracy"
                                        value={
                                            Recruit && Recruit.ThrowAccuracy
                                                ? Recruit.ThrowAccuracy
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Kick Accuracy:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="KickAccuracy"
                                        value={
                                            Recruit && Recruit.KickAccuracy
                                                ? Recruit.KickAccuracy
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Kick Power:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="KickPower"
                                        value={
                                            Recruit && Recruit.KickPower
                                                ? Recruit.KickPower
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Punt Accuracy:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="PuntAccuracy"
                                        value={
                                            Recruit && Recruit.PuntAccuracy
                                                ? Recruit.PuntAccuracy
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Punt Power:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="PuntPower"
                                        value={
                                            Recruit && Recruit.PuntPower
                                                ? Recruit.PuntPower
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Progression:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Progression"
                                        value={
                                            Recruit && Recruit.Progression
                                                ? Recruit.Progression
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Discipline:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Discipline"
                                        value={
                                            Recruit && Recruit.Discipline
                                                ? Recruit.Discipline
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Affinity One:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.AffinityOne
                                                ? Recruit.AffinityOne
                                                : 'Select an Affinity'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'auto',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {currentAffinitiesList.map((x) => (
                                                <ModalDropdownDiv
                                                    name="AffinityOne"
                                                    value={x}
                                                    handleChange={
                                                        DropdownChange
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Affinity Two:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.AffinityTwo
                                                ? Recruit.AffinityTwo
                                                : 'Select an Affinity'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'auto',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {currentAffinitiesList.map((x) => (
                                                <ModalDropdownDiv
                                                    name="AffinityTwo"
                                                    value={x}
                                                    handleChange={
                                                        DropdownChange
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="col-form-label">
                                        Personality:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.Personality
                                                ? Recruit.Personality
                                                : 'Select a Personality'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'auto',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {PersonalitiesList.map((x) => (
                                                <ModalDropdownDiv
                                                    name="Personality"
                                                    value={x}
                                                    handleChange={
                                                        DropdownChange
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Work Ethic:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.WorkEthic
                                                ? Recruit.WorkEthic
                                                : 'Select a Work Ethic'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'auto',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {WorkEthicList.map((x) => (
                                                <ModalDropdownDiv
                                                    name="WorkEthic"
                                                    value={x}
                                                    handleChange={
                                                        DropdownChange
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Recruiting Bias:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.RecruitingBias
                                                ? Recruit.RecruitingBias
                                                : 'Select RecruitingBias'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'auto',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {RecruitingBiasList.map((x) => (
                                                <ModalDropdownDiv
                                                    name="RecruitingBias"
                                                    value={x}
                                                    handleChange={
                                                        DropdownChange
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Academic Bias:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.AcademicBias
                                                ? Recruit.AcademicBias
                                                : 'Select Academic Bias'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'auto',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {AcademicBiasList.map((x) => (
                                                <ModalDropdownDiv
                                                    name="AcademicBias"
                                                    value={x}
                                                    handleChange={
                                                        DropdownChange
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Free Agency Bias:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.FreeAgency
                                                ? Recruit.FreeAgency
                                                : 'Select Free Agency Bias'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'auto',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {FreeAgencyList.map((x) => (
                                                <ModalDropdownDiv
                                                    name="FreeAgency"
                                                    value={x}
                                                    handleChange={
                                                        DropdownChange
                                                    }
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        {validStatus ? (
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={CreateRecruit}
                            >
                                Create
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                disabled
                            >
                                Create
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCrootModal;
