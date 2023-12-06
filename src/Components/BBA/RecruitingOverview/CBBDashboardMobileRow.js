import React, { useEffect } from 'react';
import { GetMobileCardClass } from '../../../Constants/CSSClassHelper';
import { getLogo } from '../../../Constants/getLogo';
import { MobileAttribute } from '../../_Common/MobileAttributeTab';

const CBBDashboardMobileRow = (props) => {
    const [flag, setFlag] = React.useState(false);
    const { croot, idx, map, timestamp, theme, retro } = props;
    const rank = idx + 1;
    const name = `${croot.FirstName} ${croot.LastName}`;
    const keyCode =
        croot.FirstName +
        croot.LastName +
        croot.Stars +
        croot.PotentialGrade +
        croot.Shooting2 +
        croot.Shooting3 +
        croot.State +
        croot.Country;
    const logo =
        croot && croot.College.length > 0 ? getLogo(croot.College, retro) : '';
    const mobileClass = GetMobileCardClass(theme);
    useEffect(() => {
        if (map) setFlag(map[keyCode]);
    }, [map, keyCode]);

    const leadingTeamsMapper = (croot) => {
        // Show list of leading teams
        if (croot.LeadingTeams == null || croot.LeadingTeams.length === 0)
            return 'None';

        const competingTeams = croot.LeadingTeams.filter(
            (x, idx) => idx <= 2 && x.Odds > 0
        );

        const competingAbbrs = competingTeams.map((x) => x.TeamAbbr);

        return competingAbbrs.map((x) => {
            const logo = getLogo(x, retro);
            return (
                <>
                    <img
                        className="image-nfl-fa mx-1"
                        src={logo}
                        alt="competing-team"
                    />
                </>
            );
        });
    };

    const addToProfile = () => {
        setFlag(true);
        return props.add(croot);
    };
    const leadingTeams = leadingTeamsMapper(croot);
    const customClass = croot.IsCustomCroot
        ? 'card-title text-primary'
        : 'card-title';
    const loc = croot.Country === 'USA' ? croot.State : croot.Country;

    return (
        <>
            <div className={`${mobileClass} mb-2`}>
                <div className="card-body text-start">
                    <div className="row mb-2">
                        <div className="col-7">
                            <h5 className={customClass}>{name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                Rank: {rank}{' '}
                            </h6>
                            <p className="card-text">
                                {croot.Stars} star {croot.Position} from {loc}
                            </p>
                        </div>
                        <div className="col-5">
                            {croot.SigningStatus.length > 0 &&
                                croot.SigningStatus !== 'Signed' && (
                                    <p className="card-text text-muted">
                                        Recruiting Status: {croot.SigningStatus}
                                    </p>
                                )}
                            {!croot.IsSigned ? (
                                <>{leadingTeams}</>
                            ) : (
                                <img
                                    className="image-recruit-logo image-recruit-signed ms-auto"
                                    src={logo}
                                    alt="WinningTeam"
                                />
                            )}
                        </div>
                    </div>
                    <div className="row d-flex mb-3">
                        <MobileAttribute
                            label="Finishing"
                            value={croot.Finishing}
                        />
                        <MobileAttribute
                            label="2pt Shooting"
                            value={croot.Shooting2}
                        />
                        <MobileAttribute
                            label="3pt Shooting"
                            value={croot.Shooting3}
                        />
                        <MobileAttribute
                            label="Free Throw"
                            value={croot.FreeThrow}
                        />
                        <MobileAttribute
                            label="Ballwork"
                            value={croot.Ballwork}
                        />
                        <MobileAttribute
                            label="Rebounding"
                            value={croot.Rebounding}
                        />
                        <MobileAttribute
                            label="Int. Defense"
                            value={croot.InteriorDefense}
                        />
                        <MobileAttribute
                            label="Per. Defense"
                            value={croot.PerimeterDefense}
                        />
                        <MobileAttribute
                            label="Potential"
                            value={croot.PotentialGrade}
                        />
                    </div>
                    <div className="row justify-content-center">
                        {croot.IsSigned || timestamp.CollegeWeek === 21 ? (
                            <>
                                <h2 className="mb-1 text-center">
                                    <i class="bi bi-file-lock-fill"></i>
                                </h2>
                                <h6 className="text-center">Signed</h6>
                            </>
                        ) : flag ? (
                            <>
                                <h2 className="mb-1 text-center">
                                    <i className="bi bi-check-circle-fill rounded-circle link-secondary"></i>
                                </h2>
                                <h6 className="text-center">On Board</h6>
                            </>
                        ) : (
                            <>
                                <h2 className="mb-1 text-center">
                                    <i
                                        className="bi bi-plus-circle-fill rounded-circle link-success"
                                        onClick={addToProfile}
                                    ></i>
                                </h2>
                                <h6 className="text-center">Add to Board</h6>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CBBDashboardMobileRow;
