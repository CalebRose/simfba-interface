import React from 'react';
import { GetMobileCardClass } from '../../Constants/CSSClassHelper';
import { GetOverall, GetYear } from '../../_Utility/RosterHelper';
import { HeightToFeetAndInches } from '../../_Utility/utilHelper';

const MobileRosterRow = (props) => {
    const {
        idx,
        redshirtCount,
        ts,
        view,
        theme,
        setPromisePlayer,
        rosterCount,
        data,
        cutPlayer
    } = props;
    let player = props.data;
    let modalTarget = '#redshirtModal' + idx;
    const playerTarget = '#playerModal' + idx;
    let ovr = GetOverall(player.Overall, player.Year);
    const cutPlayerTitle = `Cut ${player.FirstName}`;
    const year = GetYear(player);
    const heightObj = HeightToFeetAndInches(player.Height);

    const mobileCardClass = GetMobileCardClass(theme);
    const cut = () => {
        return cutPlayer(data);
    };
    const promiseHelper = () => {
        return setPromisePlayer(data.PlayerID);
    };
    return (
        <>
            <div className={`${mobileCardClass} mb-2`}>
                <div className="card-body">
                    <h5 className="card-title">
                        {player.FirstName} {player.LastName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {year} {player.Stars} star {player.Archetype}
                        {player.ArchetypeTwo.length > 0
                            ? `/${player.ArchetypeTwo}`
                            : ''}{' '}
                        {player.Position}
                        {player.PositionTwo.length > 0
                            ? `/${player.PositionTwo}`
                            : ''}{' '}
                        from {player.HighSchool} in {player.City},{' '}
                        {player.State}
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
                    <div className="btn-group btn-border">
                        {player.IsRedshirting ? (
                            <button
                                type="button"
                                className="btn btn-sm"
                                disabled
                            >
                                <i className="bi bi-check-circle-fill rounded-circle link-danger"></i>
                            </button>
                        ) : redshirtCount < 20 &&
                          !player.IsRedshirt &&
                          !ts.CFBSpringGames &&
                          ts.CollegeWeek < 5 &&
                          view ? (
                            <button
                                type="button"
                                className="btn btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target={modalTarget}
                            >
                                <i className="bi bi-person-fill-lock link-danger"></i>
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-sm"
                                disabled
                            >
                                <i
                                    className={`bi bi-person-fill ${
                                        player.IsRedshirt
                                            ? 'link-danger'
                                            : 'link-secondary'
                                    }`}
                                ></i>
                            </button>
                        )}
                        <button type="button" className="btn btn-sm" disabled>
                            <i
                                className={`bi bi-shield-fill ${
                                    player.TransferStatus === 1
                                        ? 'link-danger'
                                        : 'link-success'
                                }`}
                            ></i>
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            title={cutPlayerTitle}
                            disabled={
                                rosterCount < 80 ||
                                !view ||
                                (ts.CollegeWeek > 0 && ts.CollegeWeek < 21) ||
                                ts.TransferPortalPhase !== 3
                            }
                            onClick={cut}
                        >
                            <i className="bi bi-scissors" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileRosterRow;
