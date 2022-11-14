import React, { useEffect } from 'react';
import { getLogo } from '../../../Constants/getLogo';

const CBBDashboardMobileRow = (props) => {
    const [flag, setFlag] = React.useState(false);
    const { croot, idx, map, timestamp } = props;
    const rank = idx + 1;
    const name = croot.FirstName + ' ' + croot.LastName;
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
        croot && croot.College.length > 0 ? getLogo(croot.College) : '';

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

        return competingAbbrs.join(', ');
    };

    const addToProfile = () => {
        setFlag(true);
        return props.add(croot);
    };
    const leadingTeams = leadingTeamsMapper(croot);
    const customClass = croot.IsCustomCroot ? 'text-primary' : '';
    const loc = croot.Country === 'USA' ? croot.State : croot.Country;

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <h5
                        className={
                            croot.IsCustomCroot
                                ? 'card-text text-primary'
                                : 'card-title'
                        }
                    >
                        {name}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Rank: {rank}{' '}
                    </h6>
                    <p className="card-text">
                        {croot.Stars} star {croot.Position} from {loc}
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        2pt Shooting: {croot.Shooting2} | 3pt Shooting:{' '}
                        {croot.Shooting3}
                    </li>
                    <li className="list-group-item">
                        Finishing: {croot.Finishing} | Ballwork:{' '}
                        {croot.Ballwork}
                    </li>
                    <li className="list-group-item">
                        Rebounding: {croot.Rebounding} | Defense:{' '}
                        {croot.Defense}
                    </li>
                    <li className="list-group-item">
                        Potential: {croot.PotentialGrade}
                    </li>
                    {croot.SigningStatus.length > 0 &&
                    croot.SigningStatus !== 'Signed' ? (
                        <li className="list-group-item">
                            Recruiting Status: {croot.SigningStatus}
                        </li>
                    ) : (
                        ''
                    )}
                    <li className="list-group-item">
                        {!croot.IsSigned ? (
                            <h6>{leadingTeams}</h6>
                        ) : (
                            <img
                                className="image-recruit-logo"
                                src={logo}
                                alt="WinningTeam"
                            />
                        )}
                    </li>
                </ul>
                <div className="card-body">
                    {croot.IsSigned || timestamp.CollegeWeek === 21 ? (
                        <h2>
                            <i class="bi bi-file-lock-fill"></i>
                        </h2>
                    ) : flag ? (
                        <h2>
                            <i className="bi bi-check-circle-fill rounded-circle link-secondary"></i>
                        </h2>
                    ) : (
                        <h2>
                            <i
                                className="bi bi-plus-circle-fill rounded-circle link-success"
                                onClick={addToProfile}
                            ></i>
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
};

export default CBBDashboardMobileRow;
