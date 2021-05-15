import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import BBAPlayerService from '../../../_Services/simNBA/BBAPlayerService';
import SimBBA_url from '../../../Constants/SimBBA_url';

const CBBGameplan = ({ currentUser }) => {
    const user = useSelector((state) => state.user.currentUser); // Selecting redux state

    let team =
        !!currentUser && !!currentUser.cbb_team ? currentUser.cbb_team : null;
    const [roster, setRoster] = React.useState([]);
    const [teamId, setTeamId] = React.useState([]);
    const [gameplan, setGameplan] = React.useState([]);

    useEffect(() => {
        if (user) {
            setTeamId(user.cbb_teamId);
        }
    }, [user]);

    useEffect(() => {
        const getGameplan = () => {
            // Get Gameplan Route using team Id
        };

        const getRoster = async () => {
            let players = await BBAPlayerService.GetPlayersByTeam(
                SimBBA_url,
                teamId
            );
            setRoster(players);
        };
    }, [teamId]);

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-auto justify-content-start">
                    <h2>{team} Gameplan</h2>
                </div>
            </div>
            <div className="row mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Game</th>
                            <th scope="col">Pace</th>
                            <th scope="col">3pt Proportion</th>
                            <th scope="col">Jumper Proportion</th>
                            <th scope="col">Paint Proportion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                <h4>A</h4>
                            </th>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameAPace"
                                    aria-describedby="gameAPace"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameA3Pt"
                                    aria-describedby="gameA3Pt"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameAJumper"
                                    aria-describedby="gameAJumper"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameAPaint"
                                    aria-describedby="gameAPaint"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <h4>B</h4>
                            </th>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameBPace"
                                    aria-describedby="gameBPace"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameB3Pt"
                                    aria-describedby="gameB3Pt"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameBJumper"
                                    aria-describedby="gameBJumper"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameBPaint"
                                    aria-describedby="gameBPaint"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <h4>C</h4>
                            </th>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameCPace"
                                    aria-describedby="gameCPace"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameC3Pt"
                                    aria-describedby="gameC3Pt"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameCJumper"
                                    aria-describedby="gameCJumper"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameCPaint"
                                    aria-describedby="gameCPaint"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Year</th>
                            <th scope="col">Overall</th>
                            <th scope="col">Shooting</th>
                            <th scope="col">Finishing</th>
                            <th scope="col">Ballwork</th>
                            <th scope="col">Rebounding</th>
                            <th scope="col">Defense</th>
                            <th scope="col">Stamina</th>
                            <th scope="col">Playtime Expectations</th>
                            <th scope="col">Minutes A</th>
                            <th scope="col">Minutes B</th>
                            <th scope="col">Minutes C</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                <h4>1</h4>
                            </th>
                            <td>
                                <h6>David Ross</h6>
                            </td>
                            <td>F</td>
                            <td>Fr</td>
                            <td>90</td>
                            <td>18</td>
                            <td>18</td>
                            <td>18</td>
                            <td>18</td>
                            <td>18</td>
                            <td>40</td>
                            <td>25</td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameAMinutes"
                                    aria-describedby="gameAMinutes"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameBMinutes"
                                    aria-describedby="gameBMinutes"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gameCMinutes"
                                    aria-describedby="gameCMinutes"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row align-items-end">
                <button className="btn btn-primary">Save</button>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(CBBGameplan);
