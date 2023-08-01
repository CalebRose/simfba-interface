import React, { useEffect } from 'react';
import { getLogo } from '../../../Constants/getLogo';
import CBBCrootModal from '../RecruitingBoard/DashboardComponents/CBBCrootModal';

const CBBDashboardPlayerRow = (props) => {
    const [flag, setFlag] = React.useState(false);
    const { idx, timestamp, map, viewMode } = props;
    const data = props.player;
    const name = data.FirstName + ' ' + data.LastName;
    const keyCode =
        data.FirstName + data.LastName + data.Stars + data.State + data.Country;
    const crootModalTarget = '#crootModal' + idx;

    const logo = data && data.College.length > 0 ? getLogo(data.College) : '';

    useEffect(() => {
        if (map) {
            setFlag(map[keyCode]);
        }
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
        return props.add(data);
    };

    const leadingTeams = leadingTeamsMapper(data);
    const customClass = data.IsCustomCroot ? 'text-primary' : '';
    return (
        <>
            <CBBCrootModal crt={data} idx={idx} viewMode={viewMode} />
            <tr>
                <th scope="row">
                    <h4>{props.rank}</h4>
                </th>
                <td className="align-middle">
                    <h6 className={customClass}>{name}</h6>
                    <button
                        type="button"
                        className="btn btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target={crootModalTarget}
                    >
                        <i
                            className={`bi bi-info-circle ${
                                viewMode === 'dark' ? 'text-light' : ''
                            }`}
                        />
                    </button>
                </td>
                <td className="align-middle">
                    <h6>{data.Position}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.Height}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.State.length > 0 ? data.State : data.Country}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.Stars}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.Shooting2}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.Shooting3}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.FreeThrow}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.Finishing}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.Ballwork}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.Rebounding}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.InteriorDefense}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.PerimeterDefense}</h6>
                </td>
                <td className="align-middle">
                    <h6>{data.PotentialGrade}</h6>
                </td>
                <td className="align-middle">{data.SigningStatus}</td>
                <td className="align-middle">
                    {!data.IsSigned ? (
                        <h6>{leadingTeams}</h6>
                    ) : (
                        <img
                            className="image-recruit-logo"
                            src={logo}
                            alt="WinningTeam"
                        />
                    )}
                </td>
                <td className="align-middle">
                    {data.IsSigned || timestamp.CollegeWeek === 16 ? (
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
                </td>
            </tr>
        </>
    );
};

export default CBBDashboardPlayerRow;
