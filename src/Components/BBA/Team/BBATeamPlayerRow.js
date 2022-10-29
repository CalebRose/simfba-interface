import React from 'react';

const BBATeamPlayerRow = (props) => {
    const { player } = props;

    // Row Functions
    const getYear = (player) => {
        let isRedshirt = player.IsRedshirt;
        if (player.Year === 5 && isRedshirt) {
            return '(Sr)';
        } else if (player.Year === 4 && !isRedshirt) {
            return 'Sr';
        } else if (player.Year === 4 && isRedshirt) {
            return '(Jr)';
        } else if (player.Year === 3 && !isRedshirt) {
            return 'Jr';
        } else if (player.Year === 3 && isRedshirt) {
            return '(So)';
        } else if (player.Year === 2 && !isRedshirt) {
            return 'So';
        } else if (player.Year === 2 && isRedshirt) {
            return '(Fr)';
        }
        return 'Fr';
    };

    const GetRedshirtStatus = (p) => {
        if (p.IsRedshirt) {
            return 'Former Redshirt';
        } else if (p.IsRedshirting) {
            return 'Redshirting';
        } else {
            return 'Available';
        }
    };

    // Row Variables
    let year = getYear(player);
    let redshirtStatus = GetRedshirtStatus(player);

    return (
        <tr>
            <th scope="row" className="align-middle">
                <h6>{player.FirstName + ' ' + player.LastName}</h6>
            </th>{' '}
            <td className="align-middle">{year}</td>
            <td className="align-middle">{player.Position}</td>
            <td className="align-middle">{player.Height}</td>
            <td className="align-middle">{player.Stars}</td>
            <td className="align-middle">{player.OverallGrade}</td>
            <td className="align-middle">{player.Shooting2Grade}</td>
            <td className="align-middle">{player.Shooting3Grade}</td>
            <td className="align-middle">{player.FinishingGrade}</td>
            <td className="align-middle">{player.BallworkGrade}</td>
            <td className="align-middle">{player.ReboundingGrade}</td>
            <td className="align-middle">{player.DefenseGrade}</td>
            <td className="align-middle">{player.Stamina}</td>
            <td className="align-middle">{player.PotentialGrade}</td>
            <td className="align-middle">{player.PlaytimeExpectations}</td>
            <td className="align-middle">{redshirtStatus}</td>
        </tr>
    );
};

export default BBATeamPlayerRow;
