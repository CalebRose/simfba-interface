import React, { useEffect } from 'react';

const CBBDashboardPlayerRow = (props) => {
    const [flag, setFlag] = React.useState(false);
    const data = props.player;
    const map = props.map;
    const name = data.FirstName + data.LastName;

    useEffect(() => {
        if (map) {
            setFlag(map[name]);
        }
    }, [map, name]);
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
        if (
            data.RecruitingPoints === null ||
            data.RecruitingPoints.length === 0
        )
            return 'Early';
        // Map through all Recruiting Points
        // If Team passes High Threshold, return 'Ready to Sign'
        // If Team passes Medium Threshold, return 'High',
        // If Team passes Low Threshold, return 'Still Considering'
        // Else, return Early
        return '';
    };

    const leadingTeamsMapper = (data) => {
        if (
            data.RecruitingPoints === null ||
            data.RecruitingPoints.length === 0
        )
            return 'None';
        let teams = [];
        // Map through All Recruiting Points
        // First option should be leader
        // Iterate through all other teams
        // Set Points Mark == 75% of leader's points
        // If other teams pass point mark, push to array
        return teams.join(', ');
    };

    const addToProfile = () => {
        setFlag(true);
        return props.add(data);
    };

    let shootingGrade = attributeMapper(data.Shooting);
    let finishingGrade = attributeMapper(data.Finishing);
    let ballworkGrade = attributeMapper(data.Ballwork);
    let reboundingGrade = attributeMapper(data.Rebounding);
    let defenseGrade = attributeMapper(data.Defense);
    let recruitingStatus = statusMapper(data);
    let leadingTeams = leadingTeamsMapper(data);
    let potentialGrade = getOverall(data.PotentialGrade);

    return (
        <tr>
            <th scope="row">
                <h4>{props.rank}</h4>
            </th>
            <td className="align-middle">
                <h6>{data.Position}</h6>
            </td>
            <td className="align-middle">
                <h6>{data.FirstName + ' ' + data.LastName}</h6>
            </td>
            <td className="align-middle">
                <h6>{data.Height}</h6>
            </td>
            <td className="align-middle">
                <h6>{data.Year}</h6>
            </td>
            <td className="align-middle">
                <h6>{data.State.length > 0 ? data.State : data.Country}</h6>
            </td>
            <td className="align-middle">
                <h6>{data.Stars}</h6>
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
                <h6>{data.Stamina}</h6>
            </td>
            <td className="align-middle">
                <h6>{data.PlaytimeExpectations}</h6>
            </td>
            <td className="align-middle">{recruitingStatus}</td>
            <td className="align-middle">{leadingTeams}</td>
            <td className="align-middle">
                {flag ? (
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
    );
};

export default CBBDashboardPlayerRow;
