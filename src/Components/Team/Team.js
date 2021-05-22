import React, { useEffect } from 'react';
import logos from '../../Constants/logos';
import ImageCard from '../ImageCard/ImageCard';
import routes from '../../Constants/routes';
import { useSelector } from 'react-redux';
import { getLogo } from '../../Constants/getLogo';
import url from '../../Constants/url';

const Team = () => {
    const user = useSelector((state) => state.user.currentUser);
    let initialTeam = user ? user.team : null; // Initial value from redux state
    const [team, setTeam] = React.useState(null); // Redux value as initial value for react hook
    const logo = getLogo(initialTeam);

    useEffect(() => {
        const getTeam = async () => {
            let response = await fetch(url + 'teams/team/' + user.teamId, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });

            let json;
            if (response.ok) {
                json = await response.json();
            } else {
                alert('HTTP-Error:', response.status);
            }
            setTeam(json[0]);
        };
        if (user) {
            getTeam();
        }
    }, [user]);

    return (
        <div className="container userInterface">
            <div className="row">
                <div className="col-md-auto">
                    <h2 className="title is-3">
                        {user.team} {user.mascot}
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
                        <strong>Coach:</strong> {user.username}
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
                                <strong>Location:</strong>
                                {team ? team.City : ''},{' '}
                                {team ? team.State : ''}
                            </p>
                            <p>
                                <strong>Enrollment:</strong> N / A
                            </p>
                            <p>
                                <strong>Stadium:</strong> N / A
                            </p>
                            <p>
                                <strong>Avg Attendance:</strong> N / A
                            </p>
                        </div>
                        <div className="col-md-auto">
                            <p>
                                <strong>Conference: </strong>
                                {team ? team.Current_Conference : ''}
                            </p>
                            <p>
                                <strong>Division:</strong> N / A
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
export default Team;
