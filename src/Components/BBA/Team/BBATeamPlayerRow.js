import React, { useEffect, useState } from 'react';

const BBATeamPlayerRow = (props) => {
    const { player, idx, redshirtCount, ts, view, setPromisePlayer } = props;
    let modalTarget = '#redshirtModal' + idx;
    const promiseModalTarget = '#promiseModal';

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
    useEffect(() => {});

    // Row Variables
    let year = getYear(player);

    const promiseHelper = () => {
        return setPromisePlayer(player.PlayerID);
    };

    return (
        <tr>
            <th scope="row" className="align-middle">
                <h6>
                    {player.Position} {player.FirstName} {player.LastName}
                </h6>
            </th>
            <td className="align-middle">{year}</td>
            <td className="align-middle">{player.Height}</td>
            <td className="align-middle">{player.Stars}</td>
            <td className="align-middle">{player.OverallGrade}</td>
            <td className="align-middle">{player.FinishingGrade}</td>
            <td className="align-middle">{player.Shooting2Grade}</td>
            <td className="align-middle">{player.Shooting3Grade}</td>
            <td className="align-middle">{player.FreeThrowGrade}</td>
            <td className="align-middle">{player.BallworkGrade}</td>
            <td className="align-middle">{player.ReboundingGrade}</td>
            <td className="align-middle">{player.InteriorDefenseGrade}</td>
            <td className="align-middle">{player.PerimeterDefenseGrade}</td>
            <td className="align-middle">{player.Stamina}</td>
            <td className="align-middle">{player.PotentialGrade}</td>
            <td className="align-middle">{player.PlaytimeExpectations}</td>
            <td label="redshirt-status" className="align-middle">
                <div className="btn-group btn-border">
                    {player.IsRedshirting ? (
                        <button type="button" className="btn btn-sm" disabled>
                            <i className="bi bi-check-circle-fill rounded-circle link-danger"></i>
                        </button>
                    ) : redshirtCount < 4 &&
                      !player.IsRedshirt &&
                      ts.CollegeWeek < 3 &&
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
                                    player.IsRedshirt
                                        ? 'link-danger'
                                        : 'link-secondary'
                                }`}
                            ></i>
                        </button>
                    )}
                    <button
                        type="button"
                        className="btn btn-sm"
                        onClick={promiseHelper}
                        data-bs-toggle="modal"
                        data-bs-target={promiseModalTarget}
                        disabled={player.TransferStatus < 1}
                    >
                        <i
                            className={`bi bi-shield-fill ${
                                player.TransferStatus === 1
                                    ? 'link-danger'
                                    : 'link-success'
                            }`}
                        ></i>
                    </button>
                </div>
            </td>
            {/* <td className="align-middle">{redshirtStatus}</td> */}
        </tr>
    );
};

export default BBATeamPlayerRow;
