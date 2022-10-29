import React, { useEffect } from 'react';

const CBBTeamDashboardPlayerRow = (props) => {
    const data = props.player;
    const idx = props.idx;
    const recruit = data.Recruit;

    const attributeMapper = (attr) => {
        switch (true) {
            case attr > 16:
                return 'A';
            case attr > 13:
                return 'B';
            case attr > 10:
                return 'C';
            case attr > 7:
                return 'D';
            default:
                return 'F';
        }
    };

    const getOverall = (attribute) => {
        if (attribute > 98) {
            return 'A+';
        } else if (attribute > 92) {
            return 'A';
        } else if (attribute > 89) {
            return 'A-';
        } else if (attribute > 87) {
            return 'B+';
        } else if (attribute > 82) {
            return 'B';
        } else if (attribute > 79) {
            return 'B-';
        } else if (attribute > 77) {
            return 'C+';
        } else if (attribute > 72) {
            return 'C';
        } else if (attribute > 69) {
            return 'C-';
        } else if (attribute > 67) {
            return 'D+';
        } else if (attribute > 62) {
            return 'D';
        } else if (attribute > 59) {
            return 'D-';
        } else {
            return 'F';
        }
    };

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

    const toggleScholarship = (event) => {
        return props.toggleScholarship(idx, event);
    };

    const removePlayerFromBoard = () => {
        return props.remove(idx, data);
    };

    let shooting2Grade = attributeMapper(recruit.Shooting2);
    let shooting3Grade = attributeMapper(recruit.Shooting3);
    let finishingGrade = attributeMapper(recruit.Finishing);
    let ballworkGrade = attributeMapper(recruit.Ballwork);
    let reboundingGrade = attributeMapper(recruit.Rebounding);
    let defenseGrade = attributeMapper(recruit.Defense);
    let potentialGrade = getOverall(recruit.PotentialGrade);
    let leadingTeams = leadingTeamsMapper(recruit);

    return (
        <>
            <tr>
                <td className="align-middle">
                    <h6>{data.Scholarship}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Position}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.FirstName + ' ' + recruit.LastName}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Height}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Year}</h6>
                </td>
                <td className="align-middle">
                    <h6>
                        {recruit.State && recruit.State.length > 0
                            ? recruit.State
                            : recruit.Country}
                    </h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Stars}</h6>
                </td>
                <td className="align-middle">
                    <h6>{shooting2Grade}</h6>
                </td>
                <td className="align-middle">
                    <h6>{shooting3Grade}</h6>
                </td>
                <td className="align-middle">
                    <h6>{finishingGrade}</h6>
                </td>
                <td className="align-middle">
                    <h6>{ballworkGrade}</h6>
                </td>
                <td className="align-middle">
                    <h6>{reboundingGrade}</h6>
                </td>
                <td className="align-middle">
                    <h6>{defenseGrade}</h6>
                </td>
                <td className="align-middle">
                    <h6>{potentialGrade}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.Stamina}</h6>
                </td>
                <td className="align-middle">
                    <h6>{recruit.PlaytimeExpectations}</h6>
                </td>
                <td className="align-middle">{data.RecruitingStatus}</td>
                <td className="align-middle">{leadingTeams}</td>
                <td className="align-middle">
                    <input
                        name="CurrentPoints"
                        type="number"
                        class="form-control"
                        id="currentPoints"
                        aria-describedby="currentPoints"
                        value={data.CurrentPointsSpent}
                        onChange={handleChange}
                        min="0"
                    />
                </td>
                <td className="align-middle">
                    <h6>{data.TotalPointsSpent}</h6>
                </td>
                <td className="align-middle">
                    <h2>
                        <i
                            className="bi bi-x-circle-fill rounded-circle link-danger"
                            onClick={removePlayerFromBoard}
                        ></i>
                    </h2>
                </td>
            </tr>
        </>
    );
};

export default CBBTeamDashboardPlayerRow;
