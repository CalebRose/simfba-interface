import React, { useEffect } from 'react';
import Select from 'react-select';
import { GetModalClass } from '../../Constants/CSSClassHelper';
import { getLogo } from '../../Constants/getLogo';
import FBARecruitingService from '../../_Services/simFBA/FBARecruitingService';
import BBARecruitingService from '../../_Services/simNBA/BBARecruitingService';
import { GetOverall } from '../../_Utility/RosterHelper';
import { SimCBB, SimCFB } from '../../Constants/CommonConstants';

const RecruitingClassModal = ({ isCFB, teams, userTeam, viewMode, retro }) => {
    let _recruitingService = new FBARecruitingService();
    let _bbaRecruitingService = new BBARecruitingService();
    const modalId = `recruitingClassModal`;
    const teamOptions =
        teams &&
        teams.length > 0 &&
        teams.map((x) => {
            return isCFB
                ? { label: x.TeamAbbreviation, value: x.TeamID }
                : { label: x.TeamAbbr, value: x.TeamID };
        });
    const sortedTeamOptions =
        teamOptions &&
        teamOptions.length > 0 &&
        teamOptions.sort((a, b) => (a.label > b.label ? 1 : -1));
    const [currentTeam, setCurrentTeam] = React.useState(userTeam.ID);
    const [recruitingClass, setClass] = React.useState(null);
    const [logoKey, setLogoKey] = React.useState(userTeam.ID);
    const league = isCFB ? SimCFB : SimCBB;
    const [logo, setLogo] = React.useState('');

    useEffect(() => {
        GetRecruitingClass();
    }, [currentTeam]);

    useEffect(() => {
        const logoSrc = getLogo(league, logoKey, retro);
        setLogo(() => logoSrc);
    }, [logoKey]);

    const SelectTeam = (options) => {
        const opts = options.value;
        setCurrentTeam(() => opts);
        setLogoKey(() => opts);
    };

    const GetRecruitingClass = async () => {
        let res;
        if (isCFB) {
            res = await _recruitingService.GetRecruitingClass(currentTeam);
        } else {
            res = await _bbaRecruitingService.GetRecruitingClass(currentTeam);
        }

        let cfbRecruits = [];
        if (isCFB && res.Recruits) {
            cfbRecruits = res.Recruits;
        }

        const result = isCFB ? cfbRecruits : res;

        setClass(() => result);
    };

    const CFBHeader = () => {
        return (
            <div className="row g-2 gy-2 mb-2">
                <div className="col">
                    <h5>Name</h5>
                </div>
                <div className="col">
                    <h5>Position</h5>
                </div>
                <div className="col">
                    <h5>Archetype</h5>
                </div>
                <div className="col">
                    <h5>City</h5>
                </div>
                <div className="col">
                    <h5>State</h5>
                </div>
                <div className="col">
                    <h5>Stars</h5>
                </div>
                <div className="col">
                    <h5>Overall</h5>
                </div>
                <div className="col">
                    <h5>Potential</h5>
                </div>
            </div>
        );
    };

    const CFBRow = ({ croot }) => {
        const CrootOverall = GetOverall(croot.OverallGrade);
        return (
            <div className="row">
                <div
                    className={croot.IsCustomCroot ? 'text-primary col' : 'col'}
                >
                    <h6>
                        {croot.FirstName} {croot.LastName}
                    </h6>
                </div>
                <div className="col">
                    <p>{croot.Position}</p>
                </div>
                <div className="col">
                    <p>{croot.Archetype}</p>
                </div>
                <div className="col">
                    <h6>{croot.City}</h6>
                </div>
                <div className="col">
                    <h6>{croot.State}</h6>
                </div>
                <div className="col">
                    <h6>{croot.Stars}</h6>
                </div>
                <div className="col">
                    <h6>{CrootOverall}</h6>
                </div>
                <div className="col">
                    <h6>{croot.PotentialGrade}</h6>
                </div>
            </div>
        );
    };

    const CBBHeader = () => {
        return (
            <div className="row g-2 gy-2 mb-2">
                <div className="col">
                    <h5>Position</h5>
                </div>
                <div className="col">
                    <h5>Name</h5>
                </div>
                <div className="col">
                    <h5>Height</h5>
                </div>
                <div className="col" title="State/Country">
                    <h5>S/C</h5>
                </div>
                <div className="col">
                    <h5>Stars</h5>
                </div>
                <div className="col" title="Shooting 2">
                    <h5>Sht 2</h5>
                </div>
                <div className="col" title="Shooting 3">
                    <h5>Sht 3</h5>
                </div>
                <div className="col" title="Finishing">
                    <h5>Fin</h5>
                </div>
                <div className="col" title="Ballwork">
                    <h5>Bll</h5>
                </div>
                <div className="col" title="Rebounding">
                    <h5>Reb</h5>
                </div>
                <div className="col" title="Interior Defense">
                    <h5>Int. Def</h5>
                </div>
                <div className="col" title="Perimeter Defense">
                    <h5>Per. Def</h5>
                </div>
                <div className="col" title="Potential">
                    <h5>Pot</h5>
                </div>
            </div>
        );
    };

    const CBBRow = ({ croot }) => {
        return (
            <div className="row">
                <div className="col">{croot.Position}</div>
                <div
                    className={croot.IsCustomCroot ? 'text-primary col' : 'col'}
                >
                    <h6>
                        {croot.FirstName} {croot.LastName}
                    </h6>
                </div>
                <div className="col">
                    <h6>{croot.Height}</h6>
                </div>
                <div className="col">
                    <h6>
                        {croot.State && croot.State.length > 0
                            ? croot.State
                            : croot.Country}
                    </h6>
                </div>
                <div className="col">
                    <h6>{croot.Stars}</h6>
                </div>
                <div className="col">
                    <h6>{croot.Shooting2}</h6>
                </div>
                <div className="col">
                    <h6>{croot.Shooting3}</h6>
                </div>
                <div className="col">
                    <h6>{croot.Finishing}</h6>
                </div>
                <div className="col">
                    <h6>{croot.Ballwork}</h6>
                </div>
                <div className="col">
                    <h6>{croot.Rebounding}</h6>
                </div>
                <div className="col">
                    <h6>{croot.InteriorDefense}</h6>
                </div>
                <div className="col">
                    <h6>{croot.PerimeterDefense}</h6>
                </div>
                <div className="col">
                    <h6>{croot.PotentialGrade}</h6>
                </div>
            </div>
        );
    };

    const modalClass = GetModalClass(viewMode);

    return (
        <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            aria-labelledby="recruitingClassModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className={modalClass}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="standingsLabel">
                            <img
                                className="image-recruit-logo me-2"
                                src={logo}
                                alt="WinningTeam"
                            />
                            {isCFB
                                ? 'CFB Recruiting Class'
                                : 'CBB Recruiting Class'}
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <>
                            <div className="row g-2 gy-2 mb-2">
                                <div className="col-md-auto">
                                    <h5 className="text-start align-middle">
                                        Teams
                                    </h5>
                                    <Select
                                        options={sortedTeamOptions}
                                        className="basic-multi-select btn-dropdown-width-team z-index-6"
                                        classNamePrefix="select"
                                        onChange={SelectTeam}
                                    />
                                </div>
                            </div>
                            {isCFB ? <CFBHeader /> : <CBBHeader />}
                            {recruitingClass &&
                                recruitingClass.length > 0 &&
                                recruitingClass.map((x) =>
                                    isCFB ? (
                                        <CFBRow croot={x.Recruit} />
                                    ) : (
                                        <CBBRow croot={x} />
                                    )
                                )}
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruitingClassModal;
