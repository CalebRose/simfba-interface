import React, { useEffect } from 'react';
import { GetMobileCardClass } from '../../../Constants/CSSClassHelper';
import { getLogo } from '../../../Constants/getLogo';
import { GetOverall } from '../../../_Utility/RosterHelper';
import { MobileAttribute } from '../../_Common/MobileAttributeTab';
import { isBadFit, isGoodFit } from '../../../_Utility/CFBRecruitingHelper';

const CFBDashboardMobilePlayerRow = (props) => {
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
        croot && croot.College.length > 0 ? getLogo(croot.College, retro) : '';
    const mobileCardClass = GetMobileCardClass(theme);
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

    let customClass = 'card-title';
    if (croot.IsCustomCroot) {
        customClass += ' text-primary';
    } else if (goodFit && !badFit) {
        customClass += ' text-success';
    } else if (!goodFit && badFit) {
        customClass += ' text-danger';
    }
    return (
        <>
            <div className={`${mobileCardClass} mb-2`}>
                <div className="card-body text-start">
                    <div className="row mb-2">
                        <div className="col-7">
                            <h5 className={customClass}>{name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                Rank: {rank}{' '}
                            </h6>
                            <p className="card-text">
                                {croot.Stars} star {croot.Archetype}{' '}
                                {croot.Position} from {croot.HighSchool} in{' '}
                                {croot.City}, {croot.State}
                            </p>
                        </div>
                        <div className="col-5">
                            {croot.RecruitingStatus.length > 0 &&
                                croot.RecruitingStatus !== 'Signed' && (
                                    <p className="card-text text-muted">
                                        Recruiting Status:{' '}
                                        {croot.RecruitingStatus}
                                    </p>
                                )}
                            {!croot.IsSigned ? (
                                <>{leadingTeams}</>
                            ) : (
                                <img
                                    className="image-recruit-logo"
                                    src={logo}
                                    alt="WinningTeam"
                                />
                            )}
                        </div>
                    </div>
                    <div className="row d-flex mb-2 justify-content-evenly">
                        <MobileAttribute label="Overall" value={CrootOverall} />
                        <MobileAttribute
                            label="Potential"
                            value={croot.PotentialGrade}
                        />
                    </div>
                    <div className="row d-flex mb-3 justify-content-evenly">
                        {croot.AffinityOne.length > 0 && (
                            <MobileAttribute
                                label="Affinity One"
                                value={croot.AffinityOne}
                            />
                        )}
                        {croot.AffinityTwo.length > 0 && (
                            <MobileAttribute
                                label="Affinity Two"
                                value={croot.AffinityTwo}
                            />
                        )}
                    </div>
                    <div className="row justify-content-center">
                        {croot.IsSigned || timestamp.CollegeWeek === 21 ? (
                            <h2 className="mb-1 text-center">
                                <i class="bi bi-file-lock-fill"></i>
                            </h2>
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
                                        onClick={AddPlayerToBoard}
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

export default CFBDashboardMobilePlayerRow;
