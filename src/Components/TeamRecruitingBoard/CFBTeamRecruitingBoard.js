import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import {
    SavingMessage,
    SuccessfulRecruitingBoardSaveMessage
} from '../../Constants/SystemMessages';
import FBARecruitingService from '../../_Services/simFBA/FBARecruitingService';
import { CalculateAdjustedPoints } from '../../_Utility/CFBRecruitingHelper';
import { PickFromArray, RoundToTwoDecimals } from '../../_Utility/utilHelper';
import CFBTeamBoardSidebar from './CFBTeamRecruitingComponents/CFBTeamBoardSidebar';
import CFBTeamMobilePlayerRow from './CFBTeamRecruitingComponents/CFBTeamRecruitingMobilePlayerRow';
import CFBTeamDashboardPlayerRow from './CFBTeamRecruitingComponents/CFBTeamRecruitingPlayerRow';
import ConfirmSaveRecruitingBoardModal from './CFBTeamRecruitingComponents/CFBTeamSaveBoardModal';
import { RecruitingLoadMessages } from '../../Constants/CommonConstants';
import { CFBRecruitingAIConfigModal } from './CFBTeamRecruitingComponents/CFBAIRecruitingModal';

const CFBTeamRecruitingBoard = ({
    currentUser,
    cfbTeam,
    cfb_Timestamp,
    viewMode
}) => {
    // Services
    let _recruitingService = new FBARecruitingService();

    // Hooks
    const [recruitingProfile, setRecruitingProfile] = React.useState(null);
    const [recruits, setRecruits] = React.useState(null);
    const [isValid, setValidation] = React.useState(false);
    const [approxPoints, setApproxPoints] = React.useState(0);
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const [loadMessage] = React.useState(() =>
        PickFromArray(RecruitingLoadMessages)
    );
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);
    const isMobile = useMediaQuery({ query: `(max-width:844px)` });

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
            profile !== undefined &&
            profile.Recruits &&
            profile.Recruits.length > 0
                ? profile.Recruits
                : [];

        let filteredRecruits = recruits
            .filter((x) => !x.RemovedFromBoard)
            .sort((a, b) => {
                return a.IsSigned === b.IsSigned ? 0 : a.IsSigned ? 1 : -1;
            });
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
            toast.success(`Successfully removed the croot from your board.`);
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
            Team: recruitingProfile.Team,
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
                ? teamProfile.ScholarshipsAvailable + 1
                : teamProfile.ScholarshipsAvailable - 1;
            setRecruitingProfile(() => teamProfile);
            const croot = croots[idx].Recruit;
            if (revokedVal) {
                toast.error(
                    `You really broke ${croot.FirstName} ${croot.LastName}'s heart by revoking his scholarship, you know that?`
                );
            } else {
                toast.success(
                    `Successfully Offered a Scholarship to ${croot.FirstName} ${croot.LastName}!`
                );
            }
        }
    };

    const AllocatePoints = (idx, event) => {
        const { value } = event.target;
        if (recruits) {
            const croots = [...recruits];
            let crootList = croots.map((x) => {
                return { ...x };
            });
            let pointsSpent = value;
            crootList[idx] = {
                ...crootList[idx],
                CurrentWeeksPoints: pointsSpent
            };
            setRecruits(crootList);
        }
    };

    const CheckValidation = () => {
        if (recruits.length === 0) return;

        let validationCheck = true;

        let croots = [...recruits];

        let pointCount = 0;
        let approxCount = 0;

        for (let i = 0; i < croots.length; i++) {
            let croot = croots[i];
            if (isNaN(croot.CurrentWeeksPoints)) croot.CurrentWeeksPoints = 0;
            if (croot.CurrentWeeksPoints < 0 || croot.CurrentWeeksPoints > 20) {
                validationCheck = false;
                toast.error(
                    `ERROR! Recruit ${croot.Recruit.FirstName} ${croot.Recruit.LastName} must have a point allocation between 0 and 20.`,
                    { duration: 8000 }
                );
                break;
            }
            pointCount += Number(croot.CurrentWeeksPoints);
            approxCount += Number(CalculateAdjustedPoints(croot));
        }
        if (pointCount > recruitingProfile.WeeklyPoints && validationCheck) {
            validationCheck = false;
        }
        let teamProfile = { ...recruitingProfile, SpentPoints: pointCount };
        approxCount = RoundToTwoDecimals(approxCount);
        setApproxPoints((x) => approxCount);
        setRecruitingProfile((x) => teamProfile);
        setValidation((x) => validationCheck);
    };

    const SaveToast = () => {
        toast.promise(SavePointAllocations(), {
            loading: SavingMessage
        });
    };

    const SavePointAllocations = async () => {
        if (!isValid) return;

        const croots = [...recruits];

        for (let i = 0; i < croots.length; i++) {
            let curr = Number(croots[i].CurrentWeeksPoints);
            croots[i] = { ...croots[i], CurrentWeeksPoints: curr };
        }

        const SaveRecruitingBoardDto = {
            Profile: recruitingProfile,
            Recruits: croots,
            TeamID: recruitingProfile.ID
        };

        const res = await _recruitingService.SaveRecruitingBoard(
            SaveRecruitingBoardDto
        );

        if (res.ok) {
            toast.success(SuccessfulRecruitingBoardSaveMessage);
        } else {
            alert(
                'Could not save recruiting board. Please reach out to TuscanSota for assistance.'
            );
            toast.error('ERROR: Could not successfully save recruiting board.');
        }
    };

    const saveAIBehavior = async (config) => {
        const newRecruitingProfile = {
            ...recruitingProfile,
            AIMinThreshold: config.AIMinThreshold,
            AIMaxThreshold: config.AIMaxThreshold,
            AIStarMin: config.AIStarMin,
            AIStarMax: config.AIStarMax,
            AIAutoOfferscholarships: config.AIAutoOfferscholarships,
            OffensiveScheme: config.OffensiveScheme,
            DefensiveScheme: config.DefensiveScheme,
            IsAI: config.IsAI
        };
        const SaveAIProfileDTO = {
            Profile: newRecruitingProfile
        };
        await _recruitingService.ToggleAIBehavior(SaveAIProfileDTO);
    };
    const colors = {
        color: '#fff',
        backgroundColor:
            cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d',
        borderColor: cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d'
    };

    return (
        <div className="container-fluid mt-3">
            <ConfirmSaveRecruitingBoardModal save={SaveToast} />
            <div className="justify-content-start">
                <h2>{cfbTeam ? cfbTeam.TeamName : 'Team'} Recruiting Board</h2>
            </div>
            <div className="row">
                <div className="col-md-2 dashboard-sidebar">
                    {recruitingProfile !== undefined && (
                        <CFBTeamBoardSidebar
                            cfbTeam={cfbTeam}
                            recruitingProfile={recruitingProfile}
                            theme={viewMode}
                            toggleAIBehavior={saveAIBehavior}
                        />
                    )}
                </div>
                {recruitingProfile && (
                    <CFBRecruitingAIConfigModal
                        recruitingProfile={recruitingProfile}
                        teamColors={colors}
                        Save={saveAIBehavior}
                    />
                )}
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
                                    {/* <h4>Approximate Points: {approxPoints}</h4> */}
                                </div>
                                <div className="col-md-auto ms-auto align-self-center">
                                    {isValid &&
                                    cfb_Timestamp &&
                                    !cfb_Timestamp.IsRecruitingLocked ? (
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
                    <div
                        className={`row mt-2 dashboard-table-height${
                            viewMode === 'dark' ? '-dark' : ''
                        }`}
                    >
                        {isMobile &&
                        cfb_Timestamp &&
                        !cfb_Timestamp.IsRecruitingLocked ? (
                            <>
                                {recruits !== undefined &&
                                    recruits !== null &&
                                    recruits.length > 0 &&
                                    recruits.map((x, idx) => (
                                        <CFBTeamMobilePlayerRow
                                            key={x.ID}
                                            idx={idx}
                                            recruitProfile={x}
                                            remove={RemoveRecruitFromBoard}
                                            toggleScholarship={
                                                ToggleScholarship
                                            }
                                            changePoints={AllocatePoints}
                                            theme={viewMode}
                                            retro={currentUser.IsRetro}
                                            teamProfile={recruitingProfile}
                                        />
                                    ))}
                            </>
                        ) : (
                            <table
                                className={`table table-sm table-hover ${
                                    viewMode === 'dark' ? 'table-dark' : ''
                                }`}
                            >
                                <thead>
                                    <tr>
                                        <th scope="col" abbr="Scholarship">
                                            Scholarship
                                        </th>
                                        <th scope="col" style={{ width: 175 }}>
                                            Name
                                        </th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Archetype</th>
                                        <th scope="col">City</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Stars</th>
                                        <th scope="col">Overall</th>
                                        <th scope="col">Potential</th>
                                        <th scope="col">Affinity One</th>
                                        <th scope="col">Affinity Two</th>
                                        <th scope="col">Leading Schools</th>
                                        <th scope="col" style={{ width: 125 }}>
                                            Add Points
                                        </th>

                                        {/* <th scope="col">
                                            Approx. Points
                                            <i
                                                className="bi bi-info-circle"
                                                data-bs-container="body"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title="Approximate Points submitted with Recruiting Efficiency in mind. (Points * RES)"
                                            />
                                        </th> */}
                                        <th scope="col">Total Points</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-auto">
                                    {recruits !== undefined &&
                                        recruits !== null &&
                                        cfb_Timestamp &&
                                        !cfb_Timestamp.IsRecruitingLocked &&
                                        recruits.length > 0 &&
                                        recruits.map((x, idx) => (
                                            <CFBTeamDashboardPlayerRow
                                                key={x.ID}
                                                idx={idx}
                                                recruitProfile={x}
                                                remove={RemoveRecruitFromBoard}
                                                toggleScholarship={
                                                    ToggleScholarship
                                                }
                                                changePoints={AllocatePoints}
                                                viewMode={viewMode}
                                                retro={currentUser.IsRetro}
                                                teamProfile={recruitingProfile}
                                            />
                                        ))}
                                </tbody>
                            </table>
                        )}
                        {(recruits === undefined || recruits === null) &&
                            cfb_Timestamp &&
                            !cfb_Timestamp.IsRecruitingLocked && (
                                <div className="row justify-content-center pt-2 mt-4 mb-2">
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            )}
                        {recruits !== undefined &&
                            recruits !== null &&
                            recruits.length === 0 && (
                                <div className="row justify-content-center">
                                    Have you considered adding a croot to your
                                    team board?
                                </div>
                            )}
                        {cfb_Timestamp && cfb_Timestamp.IsRecruitingLocked && (
                            <div className="row justify-content-center">
                                {loadMessage}
                            </div>
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
    timestamp: { cfb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    cfbTeam,
    cfb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(CFBTeamRecruitingBoard);
