import React, { useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
    AffinitiesList,
    CloseToHome,
    LetterGradesList,
    PositionList,
    SimpleLetterGrades,
    StarsList,
    StatesList
} from '../../Constants/CommonConstants';
import FBARecruitingService from '../../_Services/simFBA/FBARecruitingService';
import CFBDashboardPlayerRow from './CFBDashboardComponents/CFBDashboardPlayerRow';
import CrootModal from './CFBDashboardComponents/CFBDashboardCrootModal';
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

const CFBRecruitingOverview = ({ currentUser, cfbTeam, cfb_Timestamp }) => {
    // Services
    let _recruitingService = new FBARecruitingService();
    let _easterEggService = new EasterEggService();

    // Hooks
    const positions = MapObjOptions(PositionList);
    const [selectedPositions, setSelectedPositions] = React.useState('');
    const states = MapOptions(StatesList);
    const [selectedStates, setSelectedStates] = React.useState('');
    const affinities = MapOptions(AffinitiesList);
    const letterGrades = MapOptions(LetterGradesList);
    const stars = MapOptions(StarsList);
    const overallLetterGrades = MapOptions(SimpleLetterGrades);
    const [selectedPotentialLetterGrades, setSelectedPotentialLetterGrades] =
        React.useState('');
    const [selectedOverallLetterGrades, setSelectedOverallLetterGrades] =
        React.useState('');
    const [selectedAffinities, setSelectedAffinities] = React.useState('');
    const [selectedStars, setSelectedStars] = React.useState('');
    const [recruits, setRecruits] = React.useState([]);
    const [filteredRecruits, setFilteredRecruits] = React.useState([]);
    const [viewableRecruits, setViewableRecruits] = React.useState([]);
    const [count, SetCount] = React.useState(100);
    const [recruitingProfile, setRecruitingProfile] = React.useState({});
    const [teamProfiles, setTeamProfiles] = React.useState([]);
    const [recruitingNeeds, setRecruitingNeeds] = React.useState(null);
    const [crootMap, setCrootMap] = React.useState({});
    const [teamColors, setTeamColors] = React.useState('');
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const [showCollusionButton, setShowCollusionButton] = React.useState(true);

    let luckyTeam = Math.floor(Math.random() * (130 - 1) + 1);
    // Setup Modals?

    // For mobile
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const isMobile = useMediaQuery({ query: `(max-width:844px)` });

    const handleResize = () => {
        setViewWidth(window.innerWidth);
    };

    // UseEffects
    useEffect(() => {
        if (currentUser) {
            // Get Recruits from DB
            GetCroots();

            // Get Team Profile
            GetProfile(currentUser.teamId);
        }
    }, [currentUser]);

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

        setRecruitingProfile(response.TeamProfile);

        setRecruitingNeeds(response.TeamNeedsMap);

        // Get Map
        let croots = response.TeamProfile.Recruits;
        let map = {};
        for (let i = 0; i < croots.length; i++) {
            if (!croots[i].RemovedFromBoard && croots[i].Recruit) {
                let croot = croots[i].Recruit;
                map[croot.FirstName + croot.LastName + croot.HighSchool] = true;
            }
        }

        setCrootMap(map);
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
        }

        return fr;
    };

    // OnClick Events

    const ChangePositions = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedPositions(opts);
    };

    const ChangeStates = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedStates((x) => opts);
    };

    const ChangeAffinities = (affinityOptions) => {
        const options = [...affinityOptions.map((x) => x.value)];
        setSelectedAffinities((x) => options);
    };

    const ChangePotentialLetterGrades = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedPotentialLetterGrades((x) => opts);
    };

    const ChangeOverallLetterGrades = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedOverallLetterGrades((x) => opts);
    };

    const ChangeStars = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedStars((x) => opts);
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
                RES: recruitingProfile.RecruitingEfficiencyScore
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
        } else {
            alert(
                'Nice try, but you have already reached your limit on committed recruits.'
            );
        }
    };

    const CollusionButton = async () => {
        const message = GetCollusionStatements(currentUser, cfbTeam);
        const dto = {
            WeekID: cfb_Timestamp.CollegeWeekID,
            SeasonID: cfb_Timestamp.CollegeSeasonID,
            Message: message
        };
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
                    cfbTeam ? (
                        <CFBDashboardSidebar
                            cfbTeam={cfbTeam}
                            teamNeeds={recruitingNeeds}
                            recruitingProfile={recruitingProfile}
                        />
                    ) : (
                        ''
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
                        {cfb_Timestamp && cfb_Timestamp.CollegeWeek > 4 ? (
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
                        ) : (
                            ''
                        )}

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
                        {cfbTeam &&
                        cfbTeam.ID === luckyTeam &&
                        showCollusionButton ? (
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
                    <CFBDashboardRankingsModal teamProfiles={teamProfiles} />
                    <div className="row mt-3 mb-5 dashboard-table-height">
                        {cfb_Timestamp && !cfb_Timestamp.IsRecruitingLocked ? (
                            <InfiniteScroll
                                dataLength={viewableRecruits.length}
                                next={loadMoreRecords}
                                hasMore={true}
                                height={570}
                                scrollThreshold={0.8}
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
                                                  />
                                              ))
                                            : ''}
                                    </>
                                ) : (
                                    <table className="table table-hover">
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
                                                <th scope="col">Add</th>
                                            </tr>
                                        </thead>

                                        <tbody className="overflow-auto">
                                            {viewableRecruits.length > 0
                                                ? viewableRecruits.map(
                                                      (x, idx) => (
                                                          <>
                                                              <CrootModal
                                                                  crt={x}
                                                                  idx={idx}
                                                              />
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
                                                              />
                                                          </>
                                                      )
                                                  )
                                                : ''}
                                        </tbody>
                                    </table>
                                )}
                            </InfiniteScroll>
                        ) : (
                            <>
                                <div className="row justify-content-center mt-3 mb-2">
                                    My dude, recruiting is currently in-sync.
                                    Please wait until it's finished. Until then,
                                    make some tea and enjoy the next few
                                    minutes. Please check Discord for news on
                                    the completion of this week's recruiting
                                    sync.
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
    timestamp: { cfb_Timestamp }
}) => ({
    currentUser,
    cfbTeam,
    cfb_Timestamp
});

export default connect(mapStateToProps)(CFBRecruitingOverview);
