import React from 'react';
import { GetOverall, GetYear, SetPriority } from '../../_Utility/RosterHelper';
import { HeightToFeetAndInches } from '../../_Utility/utilHelper';

const PlayerRow = (props) => {
    const [showRow, setShowRow] = React.useState(false);
    const [attributes, setAttributes] = React.useState([]);
    const { idx, redshirtCount, ts, view } = props;
    let viewWidth = props.width;
    let data = props.data;
    let modalTarget = '#redshirtModal' + idx;

    let ovr = GetOverall(data.Overall);
    const year = GetYear(data);
    const heightObj = HeightToFeetAndInches(data.Height);
    let redshirtLabel = '';
    if (data.IsRedshirting) {
        redshirtLabel = 'Current Redshirt';
    } else {
        redshirtLabel = 'Active Player';
    }

    const toggleModal = () => {
        if (showRow) {
            setShowRow(!showRow);
        } else {
            data.Overall = ovr;
            props.getData(data, year);
        }
    };

    const toggleRedshirtStatus = () => {
        // props.RedshirtStatus
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
                <td label="Height">
                    {heightObj.feet}' {heightObj.inches}"
                </td>
                <td label="Weight">{data.Weight}</td>
                <td label="State">{data.State}</td>
                <td label="Stars">{data.Stars}</td>
                <td label="School">
                    {data.IsRedshirting ? (
                        <i className="bi bi-check-circle-fill rounded-circle link-danger"></i>
                    ) : redshirtCount < 15 &&
                      !data.IsRedshirt &&
                      ts.CollegeWeek < 1 &&
                      view ? (
                        <button
                            type="button"
                            className="btn btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={modalTarget}
                        >
                            <i className="bi bi-plus-circle-fill rounded-circle link-success"></i>
                        </button>
                    ) : (
                        redshirtLabel
                    )}
                </td>
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
