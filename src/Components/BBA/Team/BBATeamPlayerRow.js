import React from 'react';

const BBATeamPlayerRow = (props) => {
    let player = props.player;

    // Row Functions
    const getYear = (player) => {
        let isRedshirt = player.IsRedshirt;
        switch (player.Year) {
            case 1:
                return isRedshirt ? '(Fr)' : 'Fr';
            case 2:
                return isRedshirt ? '(So)' : 'So';
            case 3:
                return isRedshirt ? '(Jr)' : 'Jr';
            case 4:
                return isRedshirt ? '(Sr)' : 'Sr';
            default:
                return '?';
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

    // Row Variables
    let year = getYear(player);
    let potential = getOverall(player.Potential);

    return (
        <tr>
            <th scope="row">
                <h4>{props.idx + 1}</h4>
            </th>
            <td className="align-middle">
                <h6>{player.FirstName + ' ' + player.LastName}</h6>
            </td>
            <td className="align-middle">{player.Position}</td>
            <td className="align-middle">{year}</td>
            <td className="align-middle">{player.Stars}</td>
            <td className="align-middle">{player.Overall}</td>
            <td className="align-middle">{player.Shooting}</td>
            <td className="align-middle">{player.Finishing}</td>
            <td className="align-middle">{player.Ballwork}</td>
            <td className="align-middle">{player.Rebounding}</td>
            <td className="align-middle">{player.Defense}</td>
            <td className="align-middle">{player.Stamina}</td>
            <td className="align-middle">{potential}</td>
            <td className="align-middle">{player.PlaytimeExpectations}</td>
            <td className="align-middle">
                {player.IsRedshirting ? 'Redshirting' : ''}
            </td>
        </tr>
    );
};

export default BBATeamPlayerRow;
