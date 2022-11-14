import React from 'react';
import { getLogo } from '../../../../Constants/getLogo';
import ConfirmRemovePlayerFromBoardModal from '../../../TeamRecruitingBoard/CFBTeamRecruitingComponents/CFBTeamRemovePlayerModal';
import ConfirmRevokeModal from '../../../TeamRecruitingBoard/CFBTeamRecruitingComponents/CFBTeamRevokeScholarshipModal';
import CBBCrootModal from './CBBCrootModal';

const CBBTeamDashboardMobileRow = (props) => {
    const { recruitProfile, idx } = props;
    const recruit = recruitProfile.Recruit;
    const logo =
        recruit && recruit.College.length > 0 ? getLogo(recruit.College) : '';
    const crootModalTarget = '#crootModal' + idx;
    const revokeModalTarget = '#revokeModal' + idx;
    const removeModalTarget = '#removeModal' + idx;
    const name = recruit.FirstName + ' ' + recruit.LastName;
    const loc = recruit.Country === 'USA' ? recruit.State : recruit.Country;
    const leadingTeamsMapper = (data) => {
        if (data.LeadingTeams == null || data.LeadingTeams.length === 0)
            return 'None';

        const competingTeams = data.LeadingTeams.filter(
            (x, idx) => idx <= 2 && x.Odds > 0
        );

        const competingAbbrs = competingTeams.map((x) => x.TeamAbbr);

        return competingAbbrs.join(', ');
    };

    const handleChange = (event) => {
        return props.changePoints(idx, event);
    };

    const toggleScholarship = () => {
        return props.toggleScholarship(idx, data);
    };

    const removePlayerFromBoard = () => {
        return props.remove(idx, data);
    };
    let leadingTeams = leadingTeamsMapper(recruit);

    return (
        <>
            <CBBCrootModal crt={recruit} idx={idx} />
            <ConfirmRevokeModal
                idx={idx}
                toggleScholarship={toggleScholarship}
            />
            <ConfirmRemovePlayerFromBoardModal
                idx={idx}
                removePlayer={removePlayerFromBoard}
            />
            <div className="card mb-2">
                <div className="card-body">
                    <h5
                        className={
                            recruit.IsCustomCroot
                                ? 'card-text text-primary'
                                : 'card-title'
                        }
                    >
                        {name}
                    </h5>
                    <h6 className="card-subtitle mb-2">
                        <button
                            type="button"
                            className="btn btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={crootModalTarget}
                        >
                            <i className="bi bi-info-circle" />
                        </button>
                    </h6>
                    <p className="card-text">
                        {recruit.Stars} star {recruit.Position} from {loc}
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        2pt Shooting: {recruit.Shooting2} | 3pt Shooting:{' '}
                        {recruit.Shooting3}
                    </li>
                    <li className="list-group-item">
                        Finishing: {recruit.Finishing} | Ballwork:{' '}
                        {recruit.Ballwork}
                    </li>
                    <li className="list-group-item">
                        Rebounding: {recruit.Rebounding} | Defense:{' '}
                        {recruit.Defense}
                    </li>
                    <li className="list-group-item">
                        Potential: {recruit.PotentialGrade}
                    </li>
                    {recruit.SigningStatus.length > 0 &&
                    recruit.SigningStatus !== 'Signed' ? (
                        <li className="list-group-item">
                            Recruiting Status: {recruit.SigningStatus}
                        </li>
                    ) : (
                        ''
                    )}
                    {recruit.HasStateBonus || recruit.HasRegionBonus ? (
                        <li className="list-group-item">
                            {recruit.HasStateBonus ? 'State' : 'Region'}
                        </li>
                    ) : (
                        ''
                    )}
                    <li className="list-group-item">
                        {!recruit.IsSigned ? (
                            <h6>{leadingTeams}</h6>
                        ) : (
                            <img
                                className="image-recruit-logo"
                                src={logo}
                                alt="WinningTeam"
                            />
                        )}
                    </li>
                    <li className="list-group-item">
                        {recruit.IsSigned || recruitProfile.CaughtCheating ? (
                            <h6>
                                <input
                                    name="CurrentPoints"
                                    type="number"
                                    className="form-control"
                                    id="currentPoints"
                                    aria-describedby="currentPoints"
                                    value={recruitProfile.CurrentWeeksPoints}
                                    disabled
                                />
                            </h6>
                        ) : (
                            <h6>
                                <input
                                    name="CurrentPoints"
                                    type="number"
                                    className="form-control"
                                    id="currentPoints"
                                    aria-describedby="currentPoints"
                                    value={recruitProfile.CurrentWeeksPoints}
                                    onChange={handleChange}
                                />
                            </h6>
                        )}
                    </li>
                    <li className="list-group-item">
                        <h6>Total Points: {recruitProfile.TotalPoints}</h6>
                    </li>
                </ul>
                <div className="card-body">
                    {recruitProfile.ScholarshipRevoked ||
                    recruitProfile.CaughtCheating ? (
                        <h2>
                            <i className="bi bi-heartbreak-fill link-danger card-link" />
                        </h2>
                    ) : recruitProfile.Scholarship ? (
                        <button
                            type="button"
                            className="btn card-link"
                            data-bs-toggle="modal"
                            data-bs-target={revokeModalTarget}
                        >
                            <h2>
                                <i className="bi bi-mortarboard-fill link-success card-link" />
                            </h2>
                        </button>
                    ) : recruitProfile.IsSigned ? (
                        <h2>
                            <i className="bi bi-plus-circle-fill card-link" />
                        </h2>
                    ) : recruitProfile.IsLocked ? (
                        <h2>
                            <i class="bi bi-file-lock-fill card-link"></i>
                        </h2>
                    ) : (
                        <h2>
                            <i
                                className="bi bi-plus-circle-fill card-link card-link"
                                onClick={toggleScholarship}
                            />
                        </h2>
                    )}
                    <button
                        type="button"
                        className="btn card-link card-link"
                        data-bs-toggle="modal"
                        data-bs-target={removeModalTarget}
                    >
                        <h2>
                            <i className="bi bi-x-circle-fill rounded-circle link-danger card-link"></i>
                        </h2>
                    </button>
                </div>
            </div>
        </>
    );
};

export default CBBTeamDashboardMobileRow;
