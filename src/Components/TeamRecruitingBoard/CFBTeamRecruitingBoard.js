import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Service } from '../../Constants/CommonConstants';
import {
    SavingMessage,
    SuccessfulRecruitingBoardSaveMessage
} from '../../Constants/SystemMessages';
import FBARecruitingService from '../../_Services/simFBA/FBARecruitingService';
import ServiceMessageBanner from '../_Common/ServiceMessageBanner';
import CFBTeamBoardSidebar from './CFBTeamRecruitingComponents/CFBTeamBoardSidebar';
import CFBTeamDashboardPlayerRow from './CFBTeamRecruitingComponents/CFBTeamRecruitingPlayerRow';
import ConfirmSaveRecruitingBoardModal from './CFBTeamRecruitingComponents/CFBTeamSaveBoardModal';

const CFBTeamRecruitingBoard = ({ currentUser, cfbTeam, cfb_Timestamp }) => {
    // Services
    let _recruitingService = new FBARecruitingService();

    // Hooks
    const [recruitingProfile, setRecruitingProfile] = React.useState(null);
    const [recruits, setRecruits] = React.useState(null);
    const [isValid, setValidation] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [serviceMessage, setServiceMessage] = React.useState('');

    // UseEffects
    useEffect(() => {
        if (currentUser) {
            getRecruitingProfile(currentUser.teamId);
        }
    }, [currentUser]);

    useEffect(() => {
        if (recruits) {
            CheckValidation();
        }
    }, [recruits]);

    // Functions
    const getRecruitingProfile = async (id) => {
        let response = await _recruitingService.GetTeamProfileForTeamboard(id);
        let profile = response.TeamProfile;

        let recruits =
            profile !== undefined && profile.Recruits.length > 0
                ? profile.Recruits
                : [];

        let filteredRecruits = recruits.filter((x) => !x.RemovedFromBoard);
        setRecruitingProfile(profile);
        setRecruits(filteredRecruits);
    };

    // Events
    const RemoveRecruitFromBoard = async (idx, crootProfile) => {
        // Remove a Recruit from team board

        // create dto
        const RemovePlayerDto = {
            RecruitID: crootProfile.RecruitID,
            ProfileID: recruitingProfile.ID
        };
        // conduct remove call
        const res = await _recruitingService.RemovePlayerFromBoard(
            RemovePlayerDto
        );

        if (res.ok) {
            // filter out by recruit ID
            const croots = [...recruits].filter(
                (x) => x.RecruitID !== crootProfile.RecruitID
            );
            // reset hooks
            setRecruits(croots);
        } else {
            alert(
                'Could not remove player from board. Please reach out to Toucan for assistance.'
            );
        }
    };

    const ToggleScholarship = async (idx, recruitProfile) => {
        //
        const scholarshipVal = !recruitProfile.Scholarship ? true : false;
        const revokedVal = recruitProfile.Scholarship ? true : false;
        const croots = [...recruits].map((x) => {
            return { ...x };
        });
        croots[idx].Scholarship = scholarshipVal;
        croots[idx].ScholarshipRevoked = revokedVal;

        const UpdateRecruitDto = {
            RecruitID: recruitProfile.RecruitID,
            ProfileID: recruitingProfile.ID,
            RewardScholarship: scholarshipVal,
            RevokeScholarship: revokedVal
        };

        const response = await _recruitingService.ToggleScholarship(
            UpdateRecruitDto
        );
        if (response.ok) {
            setRecruits(croots);

            const teamProfile = { ...recruitingProfile };
            teamProfile.ScholarshipsAvailable = !revokedVal
                ? ScholarshipsAvailable + 1
                : ScholarshipsAvailable - 1;
            setRecruitingProfile(teamProfile);
        }
    };

    const AllocatePoints = (idx, event) => {
        const { value } = event.target;
        if (recruits) {
            const croots = [...recruits];
            let crootList = croots.map((x) => {
                return { ...x };
            });
            let pointsSpent = Number(value);
            crootList[idx].CurrentWeeksPoints = pointsSpent;
            setRecruits(crootList);
        }
    };

    const CheckValidation = () => {
        if (recruits.length === 0) return;

        let validationCheck = true;

        let croots = [...recruits];

        let pointCount = 0;

        for (let i = 0; i < croots.length; i++) {
            let croot = croots[i];
            if (croot.CurrentWeeksPoints < 0 || croot.CurrentWeeksPoints > 20) {
                validationCheck = false;
                setErrorMessage(
                    `ERROR! Recruit ${croot.Recruit.FirstName} ${croot.Recruit.LastName} must have a point allocation between 0 and 20.`
                );
                break;
            }
            pointCount += Number(croot.CurrentWeeksPoints);
        }
        if (pointCount > 50 && validationCheck) {
            validationCheck = false;
        }
        let teamProfile = { ...recruitingProfile };
        teamProfile.SpentPoints = pointCount;
        setRecruitingProfile(teamProfile);
        setValidation(validationCheck);
        if (validationCheck) {
            setErrorMessage('');
        }
    };

    const SavePointAllocations = async () => {
        if (!isValid) return;
        setServiceMessage(SavingMessage);

        const SaveRecruitingBoardDto = {
            Profile: recruitingProfile,
            Recruits: recruits,
            TeamID: recruitingProfile.ID
        };

        const res = await _recruitingService.SaveRecruitingBoard(
            SaveRecruitingBoardDto
        );

        if (res.ok) {
            setServiceMessage(SuccessfulRecruitingBoardSaveMessage);
        } else {
            alert(
                'Could not save recruiting board. Please reach out to TuscanSota for assistance.'
            );
            setServiceMessage('');
            setErrorMessage(
                'ERROR: Could not successfully save recruiting board.'
            );
        }

        setTimeout(() => {
            setServiceMessage('');
            setErrorMessage('');
        }, 5000);
    };

    return (
        <div className="container-fluid mt-3">
            <ConfirmSaveRecruitingBoardModal save={SavePointAllocations} />
            <div className="justify-content-start">
                <h2>{cfbTeam ? cfbTeam.TeamName : 'Team'} Recruiting Board</h2>
            </div>
            <div className="row">
                <div className="col-md-2 dashboard-sidebar">
                    {recruitingProfile !== undefined ? (
                        <CFBTeamBoardSidebar
                            cfbTeam={cfbTeam}
                            recruitingProfile={recruitingProfile}
                        />
                    ) : (
                        ''
                    )}
                </div>
                <div className="col-md-10 px-md-4">
                    <div className="row">
                        <div className="col-md-auto ms-auto">
                            <div className="row justify-content-end">
                                <div className="col-md-auto ms-auto">
                                    <h4>
                                        Weekly Points:{' '}
                                        {recruitingProfile &&
                                            recruitingProfile.WeeklyPoints}
                                    </h4>
                                    <h4>
                                        Points Spent:{' '}
                                        {recruitingProfile &&
                                            recruitingProfile.SpentPoints}
                                    </h4>
                                </div>
                                <div className="col-md-auto ms-auto align-self-center">
                                    {isValid ? (
                                        <button
                                            className="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#saveBoardModal"
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
                    <ServiceMessageBanner
                        serMessage={serviceMessage}
                        errMessage={errorMessage}
                    />
                    <div className="row mt-2 dashboard-table-height">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" abbr="Scholarship">
                                        Scholarship
                                    </th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Archetype</th>
                                    <th scope="col">High School</th>
                                    <th scope="col">City</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Height (in)</th>
                                    <th scope="col">Weight (lbs)</th>
                                    <th scope="col">Stars</th>
                                    <th scope="col">Overall</th>
                                    <th scope="col">Potential</th>
                                    <th scope="col">Affinity One</th>
                                    <th scope="col">Affinity Two</th>
                                    <th scope="col">Leading Schools</th>
                                    <th scope="col">Add Points</th>
                                    <th scope="col">Total Points</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {recruits !== undefined &&
                                recruits !== null &&
                                recruits.length > 0
                                    ? recruits.map((x, idx) => (
                                          <CFBTeamDashboardPlayerRow
                                              key={x.ID}
                                              idx={idx}
                                              recruitProfile={x}
                                              remove={RemoveRecruitFromBoard}
                                              toggleScholarship={
                                                  ToggleScholarship
                                              }
                                              changePoints={AllocatePoints}
                                          />
                                      ))
                                    : ''}
                            </tbody>
                        </table>
                        {recruits !== undefined &&
                        recruits !== null &&
                        recruits.length === 0 ? (
                            <div className="row justify-content-center">
                                Have you considered adding a croot to your team
                                board?
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    cfbTeam: { cfbTeam },
    timestamp: { cfb_Timestamp }
}) => ({
    currentUser,
    cfbTeam,
    cfb_Timestamp
});

export default connect(mapStateToProps)(CFBTeamRecruitingBoard);
