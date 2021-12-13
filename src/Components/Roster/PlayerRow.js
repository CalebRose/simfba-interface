import React from 'react';
import { GetYear, SetPriority } from '../../_Utility/RosterHelper';

const PlayerRow = (props) => {
    const [showRow, setShowRow] = React.useState(false);
    const [attributes, setAttributes] = React.useState([]);
    let viewWidth = props.width;
    let data = props.data;
    let school = props.school;

    const getOverall = (ovr) => {
        if (typeof ovr === 'string') return ovr;
        if (ovr > 44) return 'A';
        else if (ovr > 34) return 'B';
        else if (ovr > 24) return 'C';
        else if (ovr > 14) return 'D';
        else return 'F';
    };

    let ovr = getOverall(data.Overall);
    const year = GetYear(data);

    /* 
    Name, Position, Archtype, Ovr, Yr, Ht, Wt, St,
    HS/JC, Pot, Num
    
    */

    const toggleModal = () => {
        if (showRow) {
            setShowRow(!showRow);
        } else {
            data.Overall = ovr;
            props.getData(data, year);
        }
    };
    if (viewWidth >= 901) {
        return (
            <tr>
                <th
                    className="clickable"
                    onClick={toggleModal}
                    data-bs-toggle="modal"
                    data-bs-target="#playerModal"
                >
                    {props.data.FirstName + ' ' + props.data.LastName}
                </th>
                <td label="Archtype">{data.Archetype}</td>
                <td label="Position">{data.Position}</td>
                <td label="Overall">{ovr ? ovr : ''}</td>
                <td label="Year">{year ? year : ''}</td>
                <td label="Height">{data.Height}</td>
                <td label="Weight">{data.Weight}</td>
                <td label="State">{data.State}</td>
                <td label="School">{school}</td>
                <td label="Potential">{data.PotentialGrade}</td>
            </tr>
        );
    } else {
        return (
            <tr
                onTouchEnd={(e) => {
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                    setShowRow(!showRow);
                    setAttributes(SetPriority(data));
                }}
            >
                <th className="clickable">
                    {props.data.FirstName + ' ' + props.data.LastName}
                </th>
                {showRow ? (
                    <>
                        <td label="Archtype">{data.Archetype}</td>
                        <td label="Position">{data.Position}</td>
                        <td label="Overall">{ovr ? ovr : ''}</td>
                        <td label="Year">{year ? year : ''}</td>
                        <td label="Potential">{data.PotentialGrade}</td>
                        {attributes && attributes.length > 0
                            ? attributes.map((attr) => {
                                  return (
                                      <td label={attr.Name}>{attr.Letter}</td>
                                  );
                              })
                            : ''}
                    </>
                ) : (
                    ''
                )}
            </tr>
        );
    }
};

export default PlayerRow;
