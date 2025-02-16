import React, { useEffect } from 'react';
import { getLogo } from '../../../Constants/getLogo';
import { GetOverall } from '../../../_Utility/RosterHelper';
import CrootModal from './CFBDashboardCrootModal';
import { isBadFit, isGoodFit } from '../../../_Utility/CFBRecruitingHelper';
import { SimCFB } from '../../../Constants/CommonConstants';

const CFBDashboardPlayerRow = (props) => {
    const [flag, setFlag] = React.useState(false);
    const { croot, idx, map, timestamp, theme, retro, teamProfile } = props;
    const rank = idx + 1;
    const name = croot.FirstName + ' ' + croot.LastName;
    const affinities = croot.AffinityTwo.length
        ? croot.AffinityOne + ', ' + croot.AffinityTwo
        : croot.AffinityOne;
    const CrootOverall = GetOverall(croot.OverallGrade);
    const modalTarget = '#crootModal' + idx;
    const mapKey = croot.FirstName + croot.LastName + croot.HighSchool;
    const logo =
        croot && croot.TeamID > 0 ? getLogo(SimCFB, croot.TeamID, retro) : '';

    useEffect(() => {
        if (map) {
            setFlag(map[mapKey]);
        }
    }, [map, mapKey]);

    const leadingTeamsMapper = (croot) => {
        // Show list of leading teams
        if (croot.LeadingTeams == null || croot.LeadingTeams.length === 0)
            return 'None';

        const competingTeams = croot.LeadingTeams.filter(
            (x, idx) => idx <= 2 && x.Odds > 0
        );

        const competingIDs = competingTeams.map((x) => x.TeamID);

        return competingIDs.map((x) => {
            const logo = getLogo(SimCFB, x, retro);
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

    const leadingTeams = leadingTeamsMapper(croot);

    const AddPlayerToBoard = () => {
        setFlag(true);
        return props.add(croot);
    };

    const goodFit = isGoodFit(
        teamProfile.OffensiveScheme,
        teamProfile.DefensiveScheme,
        croot.Position,
        croot.Archetype
    );

    const badFit = isBadFit(
        teamProfile.OffensiveScheme,
        teamProfile.DefensiveScheme,
        croot.Position,
        croot.Archetype
    );

    let customClass = 'align-middle';
    if (croot.IsCustomCroot) {
        customClass += ' text-primary';
    } else if (goodFit && !badFit) {
        customClass += ' text-success';
    } else if (!goodFit && badFit) {
        customClass += ' text-danger';
    }

    return (
        <>
            <CrootModal
                key={croot.ID}
                crt={croot}
                idx={idx}
                viewMode={theme}
                retro={retro}
            />
            <tr style={{ backgroundColor: 'white', zIndex: -1 }}>
                <th scope="row">
                    <h4>{rank}</h4>
                    <button
                        type="button"
                        className="btn btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target={modalTarget}
                    >
                        <i
                            className={`bi bi-info-circle ${
                                theme === 'dark' ? 'text-light' : ''
                            }`}
                        />
                    </button>
                </th>
                <td className={customClass} style={{ width: 175 }}>
                    <h6 className={customClass}>{name}</h6>
                </td>
                <td className="align-middle">
                    <h6>{croot.Position}</h6>
                </td>
                <td className="align-middle" style={{ width: 175 }}>
                    <h6>{croot.Archetype}</h6>
                </td>
                <td className="align-middle" style={{ width: 175 }}>
                    <h6>{croot.HighSchool}</h6>
                </td>
                <td className="align-middle" style={{ width: 175 }}>
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
                    {!croot.IsSigned ? (
                        <>{leadingTeams}</>
                    ) : (
                        <>
                            <img
                                className="image-recruit-logo"
                                src={logo}
                                alt="WinningTeam"
                            />
                            <h6>{croot.College}</h6>
                        </>
                    )}
                </td>
                <td className="align-middle">
                    <h6>{croot.RecruitingStatus}</h6>
                </td>
                <td className="align-middle">
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
                </td>
            </tr>
        </>
    );
};

export default CFBDashboardPlayerRow;
