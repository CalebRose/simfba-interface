import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLogo } from '../../Constants/getLogo';
import routes from '../../Constants/routes';
import FBATeamService from '../../_Services/simFBA/FBATeamService';

const Team = ({ currentUser }) => {
    let teamService = new FBATeamService();
    const [team, setTeam] = React.useState(null); // Redux value as initial value for react hook
    const [logo, setLogo] = React.useState([]);

    useEffect(() => {
        if (currentUser) {
            const getTeam = async () => {
                // General Team Data
                let response = await teamService.GetTeamByTeamId(
                    currentUser.teamId
                );
                console.log(response);
                setTeam(response);

                // Stats?
            };
            setLogo(getLogo(currentUser.team));
            getTeam();
        }
    }, [currentUser]);

    return (
        <div className="container userInterface">
            <div className="row">
                <div className="col-md-auto">
                    <h2 className="title is-3">
                        {currentUser
                            ? `${currentUser.team} ${currentUser.mascot}`
                            : ''}
                    </h2>
                </div>
            </div>
            <div className="row mt-2 text-start">
                <div className="col-md-auto">
                    <div className="image me-2">
                        <img src={logo} alt="Team Logo" />
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <h2>Coach</h2>
                    </div>
                    <p>
                        <strong>Coach:</strong>{' '}
                        {currentUser ? currentUser.username : ''}
                    </p>
                    <p>
                        <strong>Overall:</strong> N / A
                    </p>
                    <p>
                        <strong>Current Season:</strong> N / A
                    </p>
                    <p>
                        <strong>Bowl Record:</strong> N / A
                    </p>
                </div>
                <div className="col-md-auto">
                    <div>
                        <h2>School</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-auto">
                            <p>
                                <strong>Location:</strong>{' '}
                                {team ? team.City : ''},{' '}
                                {team ? team.State : ''}
                            </p>
                            <p>
                                <strong>Enrollment:</strong>{' '}
                                {team
                                    ? team.Enrollment.toLocaleString()
                                    : 'N / A'}
                            </p>
                            <p>
                                <strong>Stadium:</strong>{' '}
                                {team ? team.Stadium : 'N / A'}
                            </p>
                            <p>
                                <strong>Avg Attendance:</strong>{' '}
                                {team
                                    ? team.StadiumCapacity.toLocaleString()
                                    : 'N / A'}
                            </p>
                        </div>
                        <div className="col-md-auto">
                            <p>
                                <strong>Conference: </strong>
                                {team ? team.Conference : 'N / A'}
                            </p>
                            <p>
                                <strong>Division:</strong>{' '}
                                {team && team.DivisionID > 0
                                    ? team.Division
                                    : 'N / A'}
                            </p>
                            <p>
                                <strong>Conference Championships:</strong> N / A
                            </p>
                            <p>
                                <strong>Division Titles:</strong> N / A
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="btn-group">
                    <button
                        type="button"
                        class="btn btn-primary btn-md me-2 shadow"
                    >
                        Gameplan
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary btn-md me-2 shadow"
                    >
                        Depth Chart
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary btn-md me-2 shadow"
                    >
                        Recruiting Board
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary btn-md me-2 shadow"
                    >
                        Stats
                    </button>
                    <button type="button" class="btn btn-primary btn-md shadow">
                        Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(Team);
