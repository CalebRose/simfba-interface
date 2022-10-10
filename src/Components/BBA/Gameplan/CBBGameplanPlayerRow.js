import React from 'react';

const GameplanPlayerRow = (props) => {
    let player = props.player;
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

    let year = getYear(player);

    const handleChange = (event) => {
        return props.updatePlayer(props.idx, event);
    };

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
            <td className="align-middle">{player.OverallGrade}</td>
            <td className="align-middle">{player.Shooting2Grade}</td>
            <td className="align-middle">{player.Shooting3Grade}</td>
            <td className="align-middle">{player.FinishingGrade}</td>
            <td className="align-middle">{player.BallworkGrade}</td>
            <td className="align-middle">{player.ReboundingGrade}</td>
            <td className="align-middle">{player.DefenseGrade}</td>
            <td className="align-middle">{player.Stamina}</td>
            <td className="align-middle">{player.PlaytimeExpectations}</td>
            <td className="minutes-input align-middle">
                <input
                    name="Minutes"
                    type="number"
                    class="form-control"
                    id="gameMinutes"
                    aria-describedby="gameMinutes"
                    value={player.Minutes}
                    onChange={handleChange}
                />
            </td>
        </tr>
    );
};

export default GameplanPlayerRow;
