import React, { useEffect } from 'react';

const CBBDashboardPlayerRow = (props) => {
    const [flag, setFlag] = React.useState(false);
    const data = props.player;
    const map = props.map;
    const name = data.FirstName + ' ' + data.LastName;
    const keyCode =
        data.FirstName +
        data.LastName +
        data.Stars +
        data.PotentialGrade +
        data.Shooting2 +
        data.Shooting3 +
        data.State +
        data.Country;

    useEffect(() => {
        if (map) {
            setFlag(map[keyCode]);
        }
    }, [map, keyCode]);
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

    const shooting2Grade = attributeMapper(data.Shooting2);
    const shooting3Grade = attributeMapper(data.Shooting3);
    const finishingGrade = attributeMapper(data.Finishing);
    const ballworkGrade = attributeMapper(data.Ballwork);
    const reboundingGrade = attributeMapper(data.Rebounding);
    const defenseGrade = attributeMapper(data.Defense);
    const leadingTeams = leadingTeamsMapper(data);

    return (
        <tr>
            <th scope="row">
                <h4>{props.rank}</h4>
            </th>
            <td className="align-middle">
                <h6>{name}</h6>
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
                <h6>{data.PotentialGrade}</h6>
            </td>
            <td className="align-middle">{data.SigningStatus}</td>
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
