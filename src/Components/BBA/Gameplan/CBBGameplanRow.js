import React from 'react';

const CBBGameplanRow = (props) => {
    let data = props.gameplan;
    let paceLabel = `game${data.Game}Pace`;
    let threePointLabel = `game${data.Game}3Pt`;
    let jumperLabel = `game${data.Game}Jumper`;
    let paintLabel = `game${data.Game}Paint`;

    const handleChange = (event) => {
        return props.updateGameplan(props.idx, event);
    };

    return (
        <tr>
            <th scope="row">
                <h4>{data.Game}</h4>
            </th>
            <td>
                <input
                    name="Pace"
                    type="number"
                    className="form-control"
                    id={paceLabel}
                    aria-describedby={paceLabel}
                    onChange={handleChange}
                    min="60"
                    max="85"
                    value={data.Pace}
                />
            </td>
            <td>
                <input
                    name="ThreePointProportion"
                    type="number"
                    className="form-control"
                    id={threePointLabel}
                    aria-describedby={threePointLabel}
                    onChange={handleChange}
                    min="20"
                    max="60"
                    value={data.ThreePointProportion}
                />
            </td>
            <td>
                <input
                    name="JumperProportion"
                    type="number"
                    className="form-control"
                    id={jumperLabel}
                    aria-describedby={jumperLabel}
                    onChange={handleChange}
                    min="20"
                    max="60"
                    value={data.JumperProportion}
                />
            </td>
            <td>
                <input
                    name="PaintProportion"
                    type="number"
                    className="form-control"
                    id={paintLabel}
                    aria-describedby={paintLabel}
                    onChange={handleChange}
                    min="20"
                    max="60"
                    value={data.PaintProportion}
                />
            </td>
        </tr>
    );
};

export default CBBGameplanRow;
