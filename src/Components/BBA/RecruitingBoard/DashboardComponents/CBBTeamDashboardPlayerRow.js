import React, { useEffect } from 'react';

const CBBTeamDashboardPlayerRow = (props) => {
    const data = props.player;
    const recruit = data.Recruit;

    useEffect(() => {}, []);

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

    const statusMapper = (data) => {
        if (data.TotalPointsSpent.length === 0) return 'Early';
        // Map through all Recruiting Points
        // If Team passes High Threshold, return 'Ready to Sign'
        // If Team passes Medium Threshold, return 'High',
        // If Team passes Low Threshold, return 'Still Considering'
        // Else, return Early
        return '';
    };

    const leadingTeamsMapper = (data) => {
        if (data.RecruitingPoints.length === 0) return 'None';
        let teams = data.RecruitingPoints.map((x) => x.Team);
        // Map through All Recruiting Points
        // First option should be leader
        // Iterate through all other teams
        // Set Points Mark == 75% of leader's points
        // If other teams pass point mark, push to array
        return teams.join(', ');
    };

    const handleChange = (event) => {
        return props.changePoints(props.rank - 1, event);
    };

    const toggleScholarship = (event) => {
        return props.toggleScholarship(props.rank - 1, event);
    };

    const removePlayerFromBoard = () => {
        return props.remove(props.rank - 1, data);
    };

    let shootingGrade = attributeMapper(recruit.Shooting);
    let finishingGrade = attributeMapper(recruit.Finishing);
    let ballworkGrade = attributeMapper(recruit.Ballwork);
    let reboundingGrade = attributeMapper(recruit.Rebounding);
    let defenseGrade = attributeMapper(recruit.Defense);
    let potentialGrade = getOverall(recruit.PotentialGrade);
    let recruitingStatus = statusMapper(data);
    let leadingTeams = leadingTeamsMapper(recruit);

    return (
        <tr>
            <th scope="row">
                <h4>{props.rank}</h4>
            </th>
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
                <h6>{shootingGrade}</h6>
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
            <td className="align-middle">{recruitingStatus}</td>
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
    );
};

export default CBBTeamDashboardPlayerRow;
