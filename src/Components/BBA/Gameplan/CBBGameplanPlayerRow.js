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
            <td className="align-middle">{player.Overall}</td>
            <td className="align-middle">{player.Shooting}</td>
            <td className="align-middle">{player.Finishing}</td>
            <td className="align-middle">{player.Ballwork}</td>
            <td className="align-middle">{player.Rebounding}</td>
            <td className="align-middle">{player.Defense}</td>
            <td className="align-middle">{player.Stamina}</td>
            <td className="align-middle">{player.PlaytimeExpectations}</td>
            <td className="minutes-input align-middle">
                <input
                    name="MinutesA"
                    type="number"
                    class="form-control"
                    id="gameAMinutes"
                    aria-describedby="gameAMinutes"
                    value={player.MinutesA}
                    onChange={handleChange}
                    min="0"
                />
            </td>
            <td className="minutes-input align-middle">
                <input
                    name="MinutesB"
                    type="number"
                    class="form-control"
                    id="gameBMinutes"
                    aria-describedby="gameBMinutes"
                    value={player.MinutesB}
                    onChange={handleChange}
                    min="0"
                />
            </td>
            {player.IsNBA ? (
                <td className="minutes-input align-middle">
                    <input
                        name="MinutesC"
                        type="number"
                        class="form-control"
                        id="gameCMinutes"
                        aria-describedby="gameCMinutes"
                        value={player.MinutesC}
                        onChange={handleChange}
                        min="0"
                    />
                </td>
            ) : (
                ''
            )}
        </tr>
    );
};

export default GameplanPlayerRow;
