import React, { useEffect } from 'react';
import {
    PositionList,
    StatesList,
    CountryList
} from '../../../../Constants/BBAConstants';
import {
    AcademicBiasList,
    FreeAgencyList,
    PersonalitiesList,
    RecruitingBiasList,
    WorkEthicList
} from '../../../../Constants/CommonConstants';
import {
    GetPotentialGrade,
    GetCBBValidation,
    GetCBBOverall,
    GetStarRating
} from '../../../Admin/ManageSim/CreateCrootHelper';

const BBACreateCrootModal = (props) => {
    const [Recruit, setRecruit] = React.useState({});
    const [validStatus, setValidStatus] = React.useState(false);
    const positions = [...PositionList.map((x) => x.abbr)];
    const { handleChange } = props;

    useEffect(() => {
        if (Recruit) {
            const ValidateCheck = GetCBBValidation(Recruit);
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

        if (name === 'State') {
            croot['Country'] = 'USA';
        } else if (name === 'Country' && value !== 'USA') {
            croot['State'] = '';
        }
        setRecruit(croot);
    };

    const NumberChange = (event) => {
        const { name, value } = event.target;
        let croot = { ...Recruit };
        croot[name] = Number(value);

        if (name !== 'Stamina') {
            let overall = GetCBBOverall(croot);
            console.log({ overall, croot });

            croot['Overall'] = overall > 99 ? 99 : overall;
            croot['Stars'] = GetStarRating(overall);
        }

        setRecruit(() => croot);
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
        croot.PotentialGrade = GetPotentialGrade(croot.Potential);
        let emptyForm = {};
        setRecruit(() => emptyForm);

        return handleChange(croot);
    };

    return (
        <div
            class="modal fade"
            id="cbbCreateCrootModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            Create a Recruit (Admin Only)
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
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
                                        Height (ft-inches):
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={InputChange}
                                        name="Height"
                                        value={
                                            Recruit && Recruit.Height
                                                ? Recruit.Height
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
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Country:
                                    </label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {Recruit && Recruit.Country
                                                ? Recruit.Country
                                                : 'Select a Country'}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                            style={{
                                                overflowY: 'scroll',
                                                maxHeight: '30vh'
                                            }}
                                        >
                                            {CountryList.map((x) => (
                                                <ModalDropdownDiv
                                                    name="Country"
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
                                        Stars:
                                    </label>
                                    <input
                                        className="form-control text-center"
                                        type="text"
                                        value={
                                            Recruit && Recruit.Stars
                                                ? Recruit.Stars
                                                : 0
                                        }
                                        disabled
                                        readonly
                                    />
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
                                        Shooting 2:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Shooting2"
                                        value={
                                            Recruit && Recruit.Shooting2
                                                ? Recruit.Shooting2
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        Shooting 3:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Shooting3"
                                        value={
                                            Recruit && Recruit.Shooting3
                                                ? Recruit.Shooting3
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        Finishing:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Finishing"
                                        value={
                                            Recruit && Recruit.Finishing
                                                ? Recruit.Finishing
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        Ballwork:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Ballwork"
                                        value={
                                            Recruit && Recruit.Ballwork
                                                ? Recruit.Ballwork
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="col-form-label">
                                        Rebounding:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Rebounding"
                                        value={
                                            Recruit && Recruit.Rebounding
                                                ? Recruit.Rebounding
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Defense:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Defense"
                                        value={
                                            Recruit && Recruit.Defense
                                                ? Recruit.Defense
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label">
                                        Potential:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={NumberChange}
                                        name="Potential"
                                        value={
                                            Recruit && Recruit.Potential
                                                ? Recruit.Potential
                                                : ''
                                        }
                                    />
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
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        {validStatus ? (
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={CreateRecruit}
                            >
                                Create
                            </button>
                        ) : (
                            <button
                                type="button"
                                class="btn btn-secondary"
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

export default BBACreateCrootModal;
