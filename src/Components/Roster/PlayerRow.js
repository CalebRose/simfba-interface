import React from 'react';
import { GetOverall, GetYear, SetPriority } from '../../_Utility/RosterHelper';
import { HeightToFeetAndInches } from '../../_Utility/utilHelper';

const PlayerRow = (props) => {
    const { idx, redshirtCount, ts, view, theme } = props;
    let data = props.data;
    let modalTarget = '#redshirtModal' + idx;
    const playerTarget = '#playerModal' + idx;
    let ovr = GetOverall(data.Overall, data.Year);
    const year = GetYear(data);
    const heightObj = HeightToFeetAndInches(data.Height);
    let healthStatus = 'Healthy';
    if (data.IsInjured) {
        healthStatus = `${data.InjuryType} ${data.InjuryName}, ${data.WeeksOfRecovery} Games`;
    }
    return (
        <tr>
            <th
                className={`align-middle ${
                    data.IsInjured ? 'text-danger' : ''
                }`}
            >
                {props.data.FirstName + ' ' + props.data.LastName}
                <button
                    type="button"
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={playerTarget}
                >
                    <i
                        className={`bi bi-info-circle ${
                            theme === 'dark' ? 'text-light' : ''
                        }`}
                    />
                </button>
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
            <td label="Potential">{data.PotentialGrade}</td>
            <td label="Health">
                <p className="text-small">{healthStatus}</p>
            </td>
            <td label="">
                <div className="btn-group btn-border">
                    {data.IsRedshirting ? (
                        <button type="button" className="btn btn-sm" disabled>
                            <i className="bi bi-check-circle-fill rounded-circle link-danger"></i>
                        </button>
                    ) : redshirtCount < 15 &&
                      !data.IsRedshirt &&
                      ts.CollegeWeek < 5 &&
                      !ts.CFBSpringGames &&
                      view ? (
                        <button
                            type="button"
                            className="btn btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={modalTarget}
                            title="Redshirt Player"
                        >
                            <i class="bi bi-person-fill-lock link-danger"></i>
                        </button>
                    ) : (
                        <button type="button" className="btn btn-sm" disabled>
                            <i
                                class={`bi bi-person-fill ${
                                    data.IsRedshirt
                                        ? 'link-danger'
                                        : 'link-secondary'
                                }`}
                            ></i>
                        </button>
                    )}
                    <button type="button" className="btn btn-sm" disabled>
                        <i
                            className={`bi bi-shield-fill ${
                                data.TransferStatus === 1
                                    ? 'link-danger'
                                    : 'link-success'
                            }`}
                        ></i>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default PlayerRow;
