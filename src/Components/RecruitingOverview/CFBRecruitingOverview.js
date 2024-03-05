import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
    AffinitiesList,
    CloseToHome,
    LetterGradesList,
    PositionList,
    RecruitingLoadMessages,
    SimpleLetterGrades,
    StarsList,
    StatesList
} from '../../Constants/CommonConstants';
import FBARecruitingService from '../../_Services/simFBA/FBARecruitingService';
import CFBDashboardPlayerRow from './CFBDashboardComponents/CFBDashboardPlayerRow';
import { MapObjOptions, MapOptions } from '../../_Utility/filterHelper';
import {
    ValidateAffinity,
    ValidateCloseToHome
} from '../../_Utility/CFBRecruitingHelper';
import CFBDashboardSidebar from './CFBDashboardComponents/CFBDashboardSidebar';
import EasterEggService from '../../_Services/simFBA/EasterEggService';
import InfiniteScroll from 'react-infinite-scroll-component';
import CFBDashboardRankingsModal from './CFBDashboardComponents/CFBDashboardRankingsModal';
import { GetCollusionStatements } from '../../Constants/CollusionStatements';
import CFBDashboardMobilePlayerRow from './CFBDashboardComponents/CFBDashboardMobilePlayerRow';
import RecruitingClassModal from '../_Common/RecruitingClassModal';
import { PickFromArray } from '../../_Utility/utilHelper';

const CFBRecruitingOverview = ({
    currentUser,
    cfbTeam,
    cfb_Timestamp,
    viewMode
}) => {
    // Services
    let _recruitingService = new FBARecruitingService();
    let _easterEggService = new EasterEggService();

    // Hooks
    const positions = MapObjOptions(PositionList);
    const [selectedPositions, setSelectedPositions] = useState('');
    const states = MapOptions(StatesList);
    const [selectedStates, setSelectedStates] = useState('');
    const affinities = MapOptions(AffinitiesList);
    const letterGrades = MapOptions(LetterGradesList);
    const stars = MapOptions(StarsList);
    const overallLetterGrades = MapOptions(SimpleLetterGrades);
    const [selectedPotentialLetterGrades, setSelectedPotentialLetterGrades] =
        useState('');
    const [selectedOverallLetterGrades, setSelectedOverallLetterGrades] =
        useState('');
    const [selectedAffinities, setSelectedAffinities] = useState('');
    const [selectedStars, setSelectedStars] = useState('');
    const [selectedStatuses, setStatuses] = useState('');
    const [recruits, setRecruits] = useState([]);
    const [filteredRecruits, setFilteredRecruits] = useState([]);
    const [viewableRecruits, setViewableRecruits] = useState([]);
    const [count, SetCount] = useState(100);
    const [recruitingProfile, setRecruitingProfile] = useState(null);
    const [teamProfiles, setTeamProfiles] = useState([]);
    const [recruitingNeeds, setRecruitingNeeds] = useState(null);
    const [crootMap, setCrootMap] = useState({});
    const [teamColors, setTeamColors] = useState('');
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const [loadMessage] = useState(() => PickFromArray(RecruitingLoadMessages));
    const [showCollusionButton, setShowCollusionButton] = useState(true);
    const statusOptions = MapOptions([
        'Not Ready',
        'Hearing Offers',
        'Narrowing Down Offers',
        'Finalizing Decisions',
        'Ready to Sign',
        'Signed'
    ]);
    let luckyTeam = Math.floor(Math.random() * (20 - 1) + 1);
    // Setup Modals?

    // For mobile
    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const isMobile = useMediaQuery({ query: `(max-width:844px)` });

    // UseEffects
    useEffect(() => {
        if (
            (currentUser && recruitingProfile === null) ||
            Object.keys(recruitingProfile).length === 0
        ) {
            // Get Team Profile
            GetProfile(currentUser.teamId);
        }
    }, [currentUser, recruitingProfile]);

    useEffect(() => {
        if (recruits.length === 0) {
            // Get Recruits from DB
            GetCroots();
        }
    }, [recruits]);

    useEffect(() => {
        if (cfbTeam) {
            const colors = {
                color: '#fff',
                backgroundColor:
                    cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d',
                borderColor:
                    cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d'
            };
            setTeamColors(colors);
            GetTeamProfiles();
        }
    }, [cfbTeam]);

    useEffect(() => {
        const fc = FilterCroots(recruits);
        setFilteredRecruits((x) => fc);
        setViewableRecruits((x) => fc.slice(0, count));
    }, [
        selectedStates,
        selectedPositions,
        selectedAffinities,
        selectedPotentialLetterGrades,
        selectedOverallLetterGrades,
        selectedStatuses,
        selectedStars
    ]);

    //
    const GetCroots = async () => {
        let croots = await _recruitingService.GetRecruits();

        setRecruits([...croots]);
        const fc = FilterCroots(croots);
        setFilteredRecruits((x) => [...fc]);
        setViewableRecruits((x) => [...fc].slice(0, count));
    };

    const GetProfile = async (id) => {
        let response = await _recruitingService.GetTeamProfileForDashboard(id);
        setRecruitingProfile(() => response.TeamProfile);

        setRecruitingNeeds(() => response.TeamNeedsMap);

        // Get Map
        let croots = response.TeamProfile.Recruits;
        let map = {};
        for (let i = 0; i < croots.length; i++) {
            if (!croots[i].RemovedFromBoard && croots[i].Recruit) {
                let croot = croots[i].Recruit;
                map[croot.FirstName + croot.LastName + croot.HighSchool] = true;
            }
        }

        setCrootMap(() => map);
    };

    const GetTeamProfiles = async () => {
        let response = await _recruitingService.GetAllTeamProfiles();

        setTeamProfiles(response);
    };

    const FilterCroots = (croots) => {
        let fr = [...croots];

        if (fr.length > 0) {
            if (selectedStates.length > 0) {
                fr = fr.filter((x) => selectedStates.includes(x.State));
            }

            if (selectedPositions.length > 0) {
                fr = fr.filter((x) => selectedPositions.includes(x.Position));
            }

            if (selectedAffinities.length > 0) {
                fr = fr.filter(
                    (x) =>
                        selectedAffinities.includes(x.AffinityOne) ||
                        selectedAffinities.includes(x.AffinityTwo)
                );
            }

            if (selectedPotentialLetterGrades.length > 0) {
                fr = fr.filter((x) =>
                    selectedPotentialLetterGrades.includes(x.PotentialGrade)
                );
            }

            if (selectedOverallLetterGrades.length > 0) {
                fr = fr.filter((x) =>
                    selectedOverallLetterGrades.includes(x.OverallGrade)
                );
            }

            if (selectedStars.length > 0) {
                fr = fr.filter((x) => selectedStars.includes(x.Stars));
            }

            if (selectedStatuses.length > 0) {
                fr = fr.filter((x) =>
                    selectedStatuses.includes(x.RecruitingStatus)
                );
            }
        }

        return fr;
    };

    // OnClick Events

    const ChangePositions = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedPositions(() => opts);
    };

    const ChangeStates = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedStates(() => opts);
    };

    const ChangeAffinities = (affinityOptions) => {
        const options = [...affinityOptions.map((x) => x.value)];
        setSelectedAffinities(() => options);
    };

    const ChangePotentialLetterGrades = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedPotentialLetterGrades(() => opts);
    };

    const ChangeOverallLetterGrades = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedOverallLetterGrades(() => opts);
    };

    const ChangeStars = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedStars(() => opts);
    };

    const ChangeRecruitingStatus = (options) => {
        const opts = [...options.map((x) => x.value)];
        setStatuses(() => opts);
    };

    const AddRecruitToBoard = async (recruit) => {
        if (recruitingProfile.TotalCommitments <= 25) {
            let map = { ...crootMap };
            let crootProfile = { ...recruitingProfile };
            map[
                recruit.FirstName + recruit.LastName + recruit.HighSchool
            ] = true;
            // async
            // AffinityOne
            const affinityOneValid =
                recruit.AffinityOne === CloseToHome
                    ? ValidateCloseToHome(recruit, cfbTeam.TeamAbbr)
                    : ValidateAffinity(recruit.AffinityOne, crootProfile);

            // AffinityTwo
            const affinityTwoValid =
                recruit.AffinityTwo === CloseToHome
                    ? ValidateCloseToHome(recruit, cfbTeam.TeamAbbr)
                    : ValidateAffinity(recruit.AffinityTwo, crootProfile);

            const CreateRecruitProfileDto = {
                PlayerID: recruit.ID,
                SeasonID: cfb_Timestamp.SeasonID,
                RecruitID: recruit.ID,
                ProfileID: cfbTeam.ID,
                Team: cfbTeam.TeamAbbr,
                AffinityOneEligible: affinityOneValid,
                AffinityTwoEligible: affinityTwoValid,
                PlayerRecruit: recruit,
                RES: recruitingProfile.RecruitingEfficiencyScore,
                Recruiter: currentUser.username
            };

            let newProfile =
                await _recruitingService.CreateRecruitPlayerProfile(
                    CreateRecruitProfileDto
                );

            if (!newProfile) {
                if (!crootProfile.Recruits) {
                    crootProfile.Recruits = [];
                }

                crootProfile.push(newProfile);

                setCrootMap(map);
                setRecruitingProfile(crootProfile);
                setFilteredRecruits(filteredRecruits);
            }
            toast.success(
                `${recruit.Position} ${recruit.FirstName} ${recruit.LastName} has been added to your recruiting board.`
            );
        } else {
            toast.error(
                'Nice try, but you have already reached your limit on committed recruits.'
            );
        }
    };

    const CollusionButton = async () => {
        let randomInt = Math.floor(Math.random() * recruits.length - 1);
        if (randomInt >= recruits.length) {
            randomInt = recruits.length - 1;
        }
        const randomCroot =
            randomInt > -1 && randomInt < recruits.length
                ? recruits[randomInt]
                : recruits[Math.floor(Math.random() * recruits.length - 1)];
        const message = GetCollusionStatements(
            currentUser,
            cfbTeam,
            randomCroot
        );
        const dto = {
            WeekID: cfb_Timestamp.CollegeWeekID,
            SeasonID: cfb_Timestamp.CollegeSeasonID,
            Message: message
        };
        toast.error(
            `Hey man I'm not gonna judge, but you should be careful. You don't want any rumors of your team popping up out of the blue...`
        );
        setShowCollusionButton(false);
        await _easterEggService.CollusionCall(dto);
    };

    const Export = async () => {
        await _recruitingService.ExportCroots();
    };

    const loadRecords = () => {
        const currentRecruits = [...viewableRecruits];

        const newCount = [...currentRecruits].concat(
            [...filteredRecruits].slice(count, count + 100)
        );
        setViewableRecruits(() => newCount);
        SetCount((x) => x + 100);
    };

    const loadMoreRecords = () => {
        setTimeout(() => loadRecords(), 500);
    };

    return (
        <div className="container-fluid">
            <div className="justify-content-start">
                <h2>College Football Recruiting Overview</h2>
            </div>
            <div className="row">
                <div className="col-md-2 dashboard-sidebar">
                    {recruitingProfile !== undefined &&
                        recruitingNeeds !== null &&
                        cfbTeam && (
                            <CFBDashboardSidebar
                                cfbTeam={cfbTeam}
                                teamNeeds={recruitingNeeds}
                                recruitingProfile={recruitingProfile}
                                theme={viewMode}
                            />
                        )}
                </div>
                <div className="col-md-10 px-md-4">
                    <div className="row mt-3 justify-content-between">
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle">Filters</h4>
                        </div>
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle me-2">
                                {cfb_Timestamp
                                    ? `Current Week ${cfb_Timestamp.CollegeWeek}`
                                    : ''}
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Position
                            </h5>
                            <Select
                                options={positions}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-6"
                                classNamePrefix="select"
                                onChange={ChangePositions}
                            />
                        </div>

                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">States</h5>
                            <Select
                                options={states}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-5"
                                classNamePrefix="select"
                                onChange={ChangeStates}
                            />
                        </div>
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Affinities
                            </h5>
                            <Select
                                options={affinities}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-4"
                                classNamePrefix="select"
                                onChange={ChangeAffinities}
                            />
                        </div>
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Potential Grade
                            </h5>
                            <Select
                                options={letterGrades}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-3"
                                classNamePrefix="select"
                                onChange={ChangePotentialLetterGrades}
                            />
                        </div>
                        {cfb_Timestamp &&
                            cfb_Timestamp.CollegeWeek > 4 &&
                            teamProfiles.length > 0 && (
                                <div className="col-md-auto">
                                    <h5 className="text-start align-middle">
                                        Recruiting Class
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn"
                                        style={teamColors ? teamColors : {}}
                                        data-bs-toggle="modal"
                                        data-bs-target="#recruitingClassModal"
                                    >
                                        View Class
                                    </button>
                                </div>
                            )}
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Overall Grade
                            </h5>
                            <Select
                                options={overallLetterGrades}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-2"
                                classNamePrefix="select"
                                onChange={ChangeOverallLetterGrades}
                            />
                        </div>
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">Stars</h5>
                            <Select
                                options={stars}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-1"
                                classNamePrefix="select"
                                onChange={ChangeStars}
                            />
                        </div>
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">Status</h5>
                            <Select
                                options={statusOptions}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-1"
                                classNamePrefix="select"
                                onChange={ChangeRecruitingStatus}
                            />
                        </div>
                        {cfb_Timestamp && cfb_Timestamp.CollegeWeek >= 4 && (
                            <div className="col-md-auto">
                                <h5 className="text-start align-middle">
                                    Team Rankings
                                </h5>
                                <button
                                    type="button"
                                    className="btn"
                                    style={teamColors ? teamColors : {}}
                                    data-bs-toggle="modal"
                                    data-bs-target="#rankingsModal"
                                >
                                    Recruiting Rankings
                                </button>
                            </div>
                        )}

                        {!cfb_Timestamp.IsRecruitingLocked && (
                            <div className="col-md-auto">
                                <h5 className="text-start align-middle">
                                    Export Croots
                                </h5>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={Export}
                                >
                                    Export
                                </button>
                            </div>
                        )}
                        {cfbTeam && luckyTeam >= 16 && showCollusionButton ? (
                            <div className="col-md-auto">
                                <h5 className="text-start align-middle">
                                    Collude?
                                </h5>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={CollusionButton}
                                >
                                    You Know You Want To
                                </button>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    <CFBDashboardRankingsModal
                        teamProfiles={teamProfiles}
                        viewMode={viewMode}
                        retro={currentUser.IsRetro}
                    />
                    {cfb_Timestamp && cfb_Timestamp.CollegeWeek >= 4 && (
                        <RecruitingClassModal
                            teams={teamProfiles}
                            userTeam={cfbTeam}
                            isCFB
                            viewMode={viewMode}
                            retro={currentUser.IsRetro}
                        />
                    )}
                    <div
                        className={`row mt-3 mb-5 dashboard-table-height${
                            viewMode === 'dark' ? '-dark' : ''
                        }`}
                    >
                        {cfb_Timestamp && !cfb_Timestamp.IsRecruitingLocked ? (
                            <InfiniteScroll
                                dataLength={viewableRecruits.length}
                                next={loadMoreRecords}
                                hasMore={true}
                                scrollThreshold={0.8}
                                height={570}
                                loader={
                                    <div className="row justify-content-center">
                                        Loading More Croots...
                                    </div>
                                }
                                endMessage={
                                    <div className="row justify-content-center">
                                        <h4>
                                            ...that's all the croots we have.
                                        </h4>
                                    </div>
                                }
                            >
                                {isMobile ? (
                                    <>
                                        {viewableRecruits.length > 0
                                            ? viewableRecruits.map((x, idx) => (
                                                  <CFBDashboardMobilePlayerRow
                                                      key={x.ID}
                                                      croot={x}
                                                      idx={idx}
                                                      add={AddRecruitToBoard}
                                                      map={crootMap}
                                                      timestamp={cfb_Timestamp}
                                                      theme={viewMode}
                                                      retro={
                                                          currentUser.IsRetro
                                                      }
                                                      teamProfile={
                                                          recruitingProfile
                                                      }
                                                  />
                                              ))
                                            : ''}
                                    </>
                                ) : (
                                    <table
                                        className={`table table-hover ${
                                            viewMode === 'dark'
                                                ? 'table-dark'
                                                : ''
                                        }`}
                                    >
                                        <thead
                                            style={{
                                                position: 'sticky',
                                                top: 0,
                                                backgroundColor: 'white',
                                                zIndex: 3
                                            }}
                                        >
                                            <tr>
                                                <th scope="col">Rank</th>
                                                <th
                                                    scope="col"
                                                    style={{ width: 175 }}
                                                >
                                                    Name
                                                </th>
                                                <th scope="col">Position</th>
                                                <th
                                                    scope="col"
                                                    style={{ width: 175 }}
                                                >
                                                    Archetype
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: 175 }}
                                                >
                                                    High School
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: 175 }}
                                                >
                                                    City
                                                </th>
                                                <th scope="col">State</th>
                                                <th scope="col">Stars</th>
                                                <th scope="col">Overall</th>
                                                <th scope="col">Potential</th>
                                                <th scope="col">Affinities</th>
                                                <th scope="col">
                                                    Leading Schools
                                                </th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Add</th>
                                            </tr>
                                        </thead>

                                        <tbody className="overflow-auto">
                                            {viewableRecruits.length > 0 &&
                                                viewableRecruits.map(
                                                    (x, idx) => (
                                                        <>
                                                            <CFBDashboardPlayerRow
                                                                key={x.ID}
                                                                croot={x}
                                                                idx={idx}
                                                                add={
                                                                    AddRecruitToBoard
                                                                }
                                                                map={crootMap}
                                                                timestamp={
                                                                    cfb_Timestamp
                                                                }
                                                                theme={viewMode}
                                                                retro={
                                                                    currentUser.IsRetro
                                                                }
                                                                teamProfile={
                                                                    recruitingProfile
                                                                }
                                                            />
                                                        </>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                )}
                            </InfiniteScroll>
                        ) : (
                            <>
                                <div className="row justify-content-center mt-3 mb-2">
                                    {loadMessage}
                                </div>

                                <div className="row justify-content-center pt-2 mt-4 mb-2">
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </>
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

export default connect(mapStateToProps)(CFBRecruitingOverview);
