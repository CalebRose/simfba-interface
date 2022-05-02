import React, { useEffect } from 'react';
import { GetOverall } from '../../../_Utility/RosterHelper';

const CFBDashboardPlayerRow = (props) => {
    const [flag, setFlag] = React.useState(false);
    const { croot, idx, map } = props;
    const rank = idx + 1;
    const name = croot.FirstName + ' ' + croot.LastName;
    const affinities = croot.AffinityTwo.length
        ? croot.AffinityOne + ', ' + croot.AffinityTwo
        : croot.AffinityOne;
    const CrootOverall = GetOverall(croot.OverallGrade);
    const modalTarget = '#crootModal' + idx;
    const mapKey = croot.FirstName + croot.LastName + croot.HighSchool;

    useEffect(() => {
        if (map) {
            setFlag(map[mapKey]);
        }
    }, [map, mapKey]);

    const leadingTeamsMapper = (data) => {
        if (
            data.RecruitPlayerProfiles === null ||
            data.RecruitPlayerProfiles.length === 0
        )
            return 'None';

        let teams = data.map((x) => x.TeamAbbreviation);
        return teams.join(', ');
    };

    const AddPlayerToBoard = () => {
        setFlag(true);
        return props.add(croot);
    };

    return (
        <tr>
            <th scope="row">
                <h4>{rank}</h4>
                <button
                    type="button"
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={modalTarget}
                >
                    <i className="bi bi-info-circle" />
                </button>
            </th>
            <td className="align-middle">
                <h6>{name}</h6>
            </td>
            <td className="align-middle">
                <h6>{croot.Position}</h6>
            </td>
            <td className="align-middle">
                <h6>{croot.Archetype}</h6>
            </td>
            <td className="align-middle">
                <h6>{croot.HighSchool}</h6>
            </td>
            <td className="align-middle">
                <h6>{croot.City}</h6>
            </td>
            <td className="align-middle">
                <h6>{croot.State}</h6>
            </td>
            <td className="align-middle">
                <h6>{croot.Stars}</h6>
            </td>
            <td className="align-middle">
                <h6>{CrootOverall}</h6>
            </td>
            <td className="align-middle">
                <h6>{croot.PotentialGrade}</h6>
            </td>
            <td className="align-middle">
                <h6>{affinities}</h6>
            </td>
            <td className="align-middle">
                <h6></h6>
            </td>
            <td className="align-middle">
                {croot.IsSigned ? (
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
                {}
            </td>
        </tr>
    );
};

export default CFBDashboardPlayerRow;
