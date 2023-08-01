import React from 'react';
import { GetMobileCardClass } from '../../Constants/CSSClassHelper';
import { GetOverall, GetYear } from '../../_Utility/RosterHelper';
import { HeightToFeetAndInches } from '../../_Utility/utilHelper';

const MobileRosterRow = (props) => {
    const { idx, redshirtCount, ts, view, theme } = props;
    let player = props.data;
    let modalTarget = '#redshirtModal' + idx;
    const playerTarget = '#playerModal' + idx;
    let ovr = GetOverall(player.Overall, player.Year);
    const year = GetYear(player);
    const heightObj = HeightToFeetAndInches(player.Height);
    let redshirtLabel = '';
    if (player.IsRedshirting) {
        redshirtLabel = 'Current Redshirt';
    } else {
        redshirtLabel = 'Active Player';
    }
    const mobileCardClass = GetMobileCardClass(theme);

    return (
        <>
            <div className={`${mobileCardClass} mb-2`}>
                <div className="card-body">
                    {' '}
                    <h5 className="card-title">
                        {player.FirstName} {player.LastName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {year} {player.Stars} star {player.Archetype}{' '}
                        {player.Position} from {player.HighSchool} in{' '}
                        {player.City}, {player.State}
                    </h6>
                    <p className="card-text">
                        {heightObj.feet}' {heightObj.inches}", {player.Weight}{' '}
                        lbs
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Overall: {ovr}, Potential: {player.PotentialGrade}
                    </li>
                    <li className="list-group-item">
                        <button
                            type="button"
                            className="btn btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={playerTarget}
                        >
                            <i className="bi bi-info-circle" /> Info
                        </button>
                    </li>
                </ul>
                <div className="card-body">
                    {player.IsRedshirting ? (
                        <i className="bi bi-check-circle-fill rounded-circle link-danger"></i>
                    ) : redshirtCount < 15 &&
                      !player.IsRedshirt &&
                      ts.CollegeWeek < 5 &&
                      view ? (
                        <button
                            type="button"
                            className="btn btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={modalTarget}
                        >
                            Redshirt Player{' '}
                            <i className="bi bi-plus-circle-fill rounded-circle link-success"></i>
                        </button>
                    ) : (
                        redshirtLabel
                    )}
                </div>
            </div>
        </>
    );
};

export default MobileRosterRow;
