import React, { useEffect } from 'react';
import { getLogo } from '../../../Constants/getLogo';
import { GetOverall } from '../../../_Utility/RosterHelper';
import CrootModal from './CFBDashboardCrootModal';

const CFBDashboardMobilePlayerRow = (props) => {
    const [flag, setFlag] = React.useState(false);
    const { croot, idx, map, timestamp } = props;
    const rank = idx + 1;
    const name = croot.FirstName + ' ' + croot.LastName;
    const affinities = croot.AffinityTwo.length
        ? croot.AffinityOne + ', ' + croot.AffinityTwo
        : croot.AffinityOne;
    const CrootOverall = GetOverall(croot.OverallGrade);
    const modalTarget = '#crootModal' + idx;
    const mapKey = croot.FirstName + croot.LastName + croot.HighSchool;
    const logo =
        croot && croot.College.length > 0 ? getLogo(croot.College) : '';

    useEffect(() => {
        if (map) {
            setFlag(map[mapKey]);
        }
    }, [map, mapKey]);

    const leadingTeamsMapper = (croot) => {
        // Show list of leading teams
        if (croot.LeadingTeams == null || croot.LeadingTeams.length === 0)
            return 'None';

        const competingTeams = croot.LeadingTeams.filter((x, idx) => idx <= 2);

        const competingAbbrs = competingTeams.map((x) => x.TeamAbbr);

        return competingAbbrs.join(', ');
    };

    const leadingTeams = leadingTeamsMapper(croot);

    const AddPlayerToBoard = () => {
        setFlag(true);
        return props.add(croot);
    };

    /* 
        <button
            type="button"
            className="btn btn-sm"
            data-bs-toggle="modal"
            data-bs-target={modalTarget}
        >
            <i className="bi bi-info-circle" />
        </button>
    */

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Rank: {rank}{' '}
                    </h6>
                    <p className="card-text">
                        {croot.Stars} star {croot.Archetype} {croot.Position}{' '}
                        from {croot.HighSchool} in {croot.City}, {croot.State}
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Overall: {CrootOverall}, Potential:{' '}
                        {croot.PotentialGrade}
                    </li>
                    <li className="list-group-item">
                        <h6>{affinities}</h6>
                    </li>
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
                                onClick={AddPlayerToBoard}
                            ></i>
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
};

export default CFBDashboardMobilePlayerRow;
