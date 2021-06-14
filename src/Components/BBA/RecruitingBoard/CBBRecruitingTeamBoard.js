import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LocalStorageService from '../../../_Services/localStorage/LocalStorageService';
import BBARecruitingService from '../../../_Services/simNBA/BBARecruitingService';
import SimBBA_url from '../../../Constants/SimBBA_url';
import CBBTeamDashboardPlayerRow from './DashboardComponents/CBBTeamDashboardPlayerRow';

const CBBRecruitingTeamBoard = ({ currentUser }) => {
    // Services
    let recruitingService = new BBARecruitingService();
    let localStorageService = new LocalStorageService();

    // Hooks
    const [recruitingProfile, setRecruitingProfile] = React.useState({});
    const [recruits, setRecruits] = React.useState([]);
    const [isValid, setValidation] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [serviceMessage, setServiceMessage] = React.useState('');
    const savingMessage = 'Saving Recruiting Options...';
    const successMessage = 'Saved successfully!';
    // useEffects
    useEffect(() => {
        if (currentUser) {
            getRecruitingProfile();
        }
    }, [currentUser]);

    // Functions
    const getRecruitingProfile = async () => {
        let profile = localStorageService.getRecruitingProfile();

        if (!profile || profile === undefined) {
            profile = await recruitingService.GetRecruitingProfile(
                SimBBA_url,
                currentUser.cbb_id
            );
        }

        let recruits = profile.Recruits.length > 0 ? profile.Recruits : [];
        console.log(recruits);
        setRecruitingProfile(profile);
        setRecruits(recruits);
    };

    const removeRecruitFromBoard = async (idx, player) => {
        //
        let res = await recruitingService.RemovePlayerFromBoard(
            SimBBA_url,
            player
        );

        const recruitList = recruits.filter(
            (x) => x.PlayerID !== player.PlayerID
        );

        let profile = recruitingProfile;
        profile.Recruits = recruitList;
        setRecruits(recruitList);
        setRecruitingProfile(profile);
        localStorageService.setRecruitingProfile(profile);
    };

    const toggleScholarship = async (payload) => {};

    const allocatePoints = (idx, event) => {
        let { value, min } = event.target;
        let recruitList = [...recruits];
        let pointsSpent = Number(value);
        recruitList[idx].CurrentPointsSpent = Math.max(
            Number(min),
            pointsSpent
        );
        setRecruits(recruitList);
        checkValidation();
    };

    const checkValidation = () => {
        //
        let valid = true;
        let profile = recruitingProfile;
        let currentPointsSpent = 0;
        let message = '';
        for (let i = 0; i < recruits.length; i++) {
            currentPointsSpent += recruits[i].CurrentPointsSpent;

            if (currentPointsSpent > profile.WeeklyPoints) {
                // Display error message
                if (valid) valid = false;
            }
            if (!valid) {
                message = `Total Points Spent Exceeds Weekly Points for Team. Please remove ${
                    currentPointsSpent - profile.WeeklyPoints
                } points.`;
            }
        }
        profile.SpentPoints = currentPointsSpent;
        setRecruitingProfile(profile);
        setErrorMessage(message);
        setValidation(valid);
    };

    const savePointAllocations = async () => {
        if (!isValid) return;
        let profile = recruitingProfile;
        let croots = recruits;
        let payload = {
            Profile: profile,
            Recruits: croots,
            TeamId: currentUser.cbb_id
        };

        setServiceMessage(savingMessage);

        let response = await recruitingService.SaveRecruitingBoard(
            SimBBA_url,
            payload
        );

        if (response.ok) {
            profile.Recruits = croots;
            localStorageService.setRecruitingProfile(profile);
            setRecruitingProfile(profile);
            setRecruits(croots);
            setServiceMessage(successMessage);
            console.log('Saved successful for team ', payload.TeamId);
        } else {
            setServiceMessage('');
            setErrorMessage(
                'ERROR: Could not successfully save. Please reach out to admin'
            );
            alert('HTTP-Error:', response.status);
        }
        setTimeout(() => {
            setServiceMessage('');
            setErrorMessage('');
        }, 5000);
    };

    return (
        <div className="container mt-3">
            <div className="dashboard-row row">
                <div className="row">
                    <div className="col-md-auto justify-content-start">
                        <h2>
                            {currentUser ? currentUser.cbb_team : 'Team'} Board
                        </h2>
                    </div>
                    <div className="col-md-auto ms-auto">
                        <div className="row justify-content-end">
                            <div className="col-md-auto ms-auto">
                                <h4>
                                    Weekly Points:{' '}
                                    {recruitingProfile.WeeklyPoints}
                                </h4>
                                <h4>
                                    Points Spent:{' '}
                                    {recruitingProfile.SpentPoints}
                                </h4>
                            </div>
                            <div className="col-md-auto ms-auto align-self-center">
                                {isValid ? (
                                    <button
                                        className="btn btn-primary"
                                        onClick={savePointAllocations}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button className="btn btn-warning">
                                        Save
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {serviceMessage.length > 0 || errorMessage.length > 0 ? (
                    <div className="row mt-1 mb-1">
                        {serviceMessage.length > 0 &&
                        serviceMessage !== savingMessage ? (
                            <div className="alert alert-success">
                                {serviceMessage}
                            </div>
                        ) : (
                            ''
                        )}
                        {serviceMessage.length > 0 &&
                        serviceMessage === savingMessage ? (
                            <div className="alert alert-secondary">
                                {serviceMessage}
                            </div>
                        ) : (
                            ''
                        )}
                        {errorMessage.length > 0 ? (
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                ) : (
                    ''
                )}
                <div className="row mt-2 dashboard-table-height">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col" abbr="Scholarship">
                                    Schl
                                </th>
                                <th scope="col">Pos</th>
                                <th scope="col">Name</th>
                                <th scope="col">Height</th>
                                <th scope="col">Yr</th>
                                <th scope="col">State/Region</th>
                                <th scope="col">Stars</th>
                                <th scope="col">Sht.</th>
                                <th scope="col">Fin.</th>
                                <th scope="col">Bal.</th>
                                <th scope="col">Reb.</th>
                                <th scope="col">Def.</th>
                                <th scope="col">Pot.</th>
                                <th scope="col">Sta.</th>
                                <th scope="col">Pt Exp.</th>
                                <th scope="col">Status</th>
                                <th scope="col">Leading Teams</th>
                                <th scope="col">Add Points</th>
                                <th scope="col">Total Points</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-auto">
                            {recruits.length > 0
                                ? recruits.map((x, idx) => (
                                      <CBBTeamDashboardPlayerRow
                                          key={x.ID}
                                          player={x}
                                          rank={idx + 1}
                                          remove={removeRecruitFromBoard}
                                          toggleScholarship={toggleScholarship}
                                          changePoints={allocatePoints}
                                      />
                                  ))
                                : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(CBBRecruitingTeamBoard);
