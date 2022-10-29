import React, { useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import CBBDashboardPlayerRow from './CBBDashboardPlayerRow';
import BBAPlayerService from '../../../_Services/simNBA/BBAPlayerService';
import BBARecruitingService from '../../../_Services/simNBA/BBARecruitingService';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    CountryList,
    LetterGradesList,
    PositionList,
    SimpleLetterGrades,
    StarsList,
    StatesList
} from '../../../Constants/BBAConstants';
import EasterEggService from '../../../_Services/simFBA/EasterEggService';
import { GetBBallCollusionStatements } from '../../../Constants/CollusionStatements';
import { MapOptions, MapObjOptions } from '../../../_Utility/filterHelper';
import { useMediaQuery } from 'react-responsive';
import routes from '../../../Constants/routes';
import { Link } from 'react-router-dom';

const CBBRecruitingDashboard = ({ currentUser, cbbTeam, cbb_Timestamp }) => {
    // Services
    let playerService = new BBAPlayerService();
    let _recruitingService = new BBARecruitingService();
    let _easterEggService = new EasterEggService();

    // Hooks
    const positions = MapObjOptions(PositionList);
    const states = MapOptions(StatesList);
    const countries = MapOptions(CountryList);
    const letterGrades = MapOptions(LetterGradesList);
    const simpleLetterGrades = MapOptions(SimpleLetterGrades);
    const stars = MapOptions(StarsList);
    const [selectedStates, setSelectedStates] = React.useState('');
    const [selectedCountries, setSelectedCountries] = React.useState('');
    const [selectedPositions, setPositions] = React.useState('');
    const [selectedShooting2Grades, setShooting2Grades] = React.useState('');
    const [selectedShooting3Grades, setShooting3Grades] = React.useState('');
    const [selectedFinishingGrades, setFinishingGrades] = React.useState('');
    const [selectedBallworkGrades, setBallworkGrades] = React.useState('');
    const [selectedReboundingGrades, setReboundingGrades] = React.useState('');
    const [selectedDefenseGrades, setDefenseGrades] = React.useState('');
    const [selectedOverallGrades, setOverallGrades] = React.useState('');
    const [selectedPotentialGrades, setPotentialGrades] = React.useState('');
    const [selectedStars, setStars] = React.useState('');
    const [recruits, setRecruits] = React.useState([]);
    const [filteredRecruits, setFilteredRecruits] = React.useState([]);
    const [viewableRecruits, setViewableRecruits] = React.useState([]);
    const [count, setCount] = React.useState(100);
    const [recruitingProfile, setRecruitingProfile] = React.useState({});
    const [crootMap, setCrootMap] = React.useState({});
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const [showCollusionButton, setShowCollusionButton] = React.useState(true);
    const [teamProfiles, setTeamProfiles] = React.useState([]);

    const [luckyTeam, setLuckyTeam] = React.useState(() =>
        Math.floor(Math.random() * (172 - 1) + 1)
    );

    // For mobile
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const isMobile = useMediaQuery({ query: `(max-width:844px)` });

    // Static Data
    const filterCroots = (recruits) => {
        let fr = [...recruits];
        if (fr.length > 0) {
            console.log({
                selectedStates,
                selectedCountries,
                selectedPositions,
                selectedStars,
                selectedPotentialGrades,
                selectedOverallGrades
            });

            if (selectedStates.length > 0) {
                fr = fr.filter((x) => selectedStates.includes(x.State));
            }
            if (selectedCountries.length > 0) {
                fr = fr.filter((x) => selectedCountries.includes(x.Country));
            }

            if (selectedPositions.length > 0) {
                fr = fr.filter((x) => selectedPositions.includes(x.Position));
            }

            if (selectedPotentialGrades.length > 0) {
                fr = fr.filter((x) =>
                    selectedPotentialGrades.includes(x.PotentialGrade)
                );
            }

            if (selectedOverallGrades.length > 0) {
                fr = fr.filter((x) =>
                    selectedOverallGrades.includes(x.OverallGrade)
                );
            }

            if (selectedStars.length > 0) {
                fr = fr.filter((x) => selectedStars.includes(x.Stars));
            }
        }

        return fr;
    };

    // UseEffects
    useEffect(() => {
        if (currentUser) {
            getCroots();
            getProfile();
            GetTeamProfiles();
        }
    }, [currentUser]);

    useEffect(() => {
        const fc = filterCroots(recruits);
        setFilteredRecruits(() => [...fc]);
        setViewableRecruits(() => [...fc.slice(0, count)]);
    }, [
        selectedStates,
        selectedCountries,
        selectedPositions,
        selectedOverallGrades,
        selectedPotentialGrades,
        selectedStars
    ]);

    const getProfile = async () => {
        let res = await _recruitingService.GetTeamProfileForDashboard(
            currentUser.cbb_id
        );

        let profile = res.TeamProfile;

        // Get Map
        let recruits = profile.Recruits;
        let map = {};
        for (let i = 0; i < recruits.length; i++) {
            if (recruits[i].Recruit) {
                if (!recruits[i].RemovedFromBoard && recruits[i].Recruit) {
                    const keyCode =
                        recruits[i].Recruit.FirstName +
                        recruits[i].Recruit.LastName +
                        recruits[i].Recruit.Stars +
                        recruits[i].Recruit.PotentialGrade +
                        recruits[i].Recruit.Shooting2 +
                        recruits[i].Recruit.Shooting3 +
                        recruits[i].Recruit.State +
                        recruits[i].Recruit.Country;
                    map[keyCode] = true;
                }
            }
        }
        setCrootMap(map);
        setRecruitingProfile(profile);
    };

    const getCroots = async () => {
        if (recruits.length < 1) {
            let croots = await playerService.GetRecruits();
            setRecruits(() => [...croots]);
            const fc = filterCroots(croots);
            setFilteredRecruits(() => [...fc]);
            setViewableRecruits(() => [...fc].slice(0, count));
        }
    };

    const GetTeamProfiles = async () => {
        let response = await _recruitingService.GetAllTeamProfiles();

        setTeamProfiles(response);
    };

    // On Click Functions
    const ChangePositions = (options) => {
        const opts = [...options.map((x) => x.value)];
        setPositions(opts);
    };

    const ChangeStates = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedStates((x) => opts);
    };

    const ChangeCountries = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedCountries((x) => opts);
    };

    const ChangePotentialLetterGrades = (options) => {
        const opts = [...options.map((x) => x.value)];
        setPotentialGrades((x) => opts);
    };

    const ChangeOverallLetterGrades = (options) => {
        const opts = [...options.map((x) => x.value)];
        setOverallGrades((x) => opts);
    };

    const ChangeStars = (options) => {
        const opts = [...options.map((x) => x.value)];
        setStars(() => opts);
    };

    const addPlayerToProfile = async (payload) => {
        let crootProfile = { ...recruitingProfile };
        let map = { ...crootMap };
        let createRecruitPointsDto = {
            profileId: crootProfile.ID,
            playerId: payload.ID,
            seasonId: 0,
            team: currentUser.cbb_abbr
        };

        if (crootProfile.Recruits.length <= 35) {
            let newProfile =
                await _recruitingService.CreateRecruitingPointsProfile(
                    createRecruitPointsDto
                );

            if (newProfile) {
                if (!crootProfile.Recruits) {
                    crootProfile.Recruits = [];
                }
                // Add to local profile & crootmap
                const keyCode =
                    payload.FirstName +
                    payload.LastName +
                    payload.Stars +
                    payload.PotentialGrade +
                    payload.Shooting2 +
                    payload.Shooting3 +
                    payload.State +
                    payload.Country;
                map[keyCode] = true;
                crootProfile.Recruits.push(newProfile);

                setCrootMap(map);
                setRecruitingProfile(crootProfile);
                setFilteredRecruits(filteredRecruits);
            }
        } else {
            console.log(
                'You have reached the maximum limit of recruits onto your profile!'
            );
        }
    };

    const CollusionButton = async () => {
        const message = GetBBallCollusionStatements(currentUser, cbbTeam);
        const dto = {
            WeekID: cbb_Timestamp.CollegeWeekID,
            SeasonID: cbb_Timestamp.CollegeSeasonID,
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
        setCount((x) => x + 100);
    };

    const loadMoreRecords = () => {
        setTimeout(() => loadRecords(), 500);
    };

    // Secondary Components

    return (
        <div className="container-fluid">
            <div className="justify-content-start">
                <h2>College Basketball Recruiting Overview</h2>
            </div>
            <div className="row mt-3">
                <div className="col-md-2 dashboard-sidebar">
                    <>
                        <div className="row gx-1 mt-3">
                            <div className="justify-content-start">
                                <h4>
                                    {cbbTeam ? cbbTeam.Team : 'Team'} Profile
                                </h4>
                                <Link
                                    to={routes.CBB_RECRUITING_BOARD}
                                    type="button"
                                    className="btn btn-primary btn-md me-2 shadow"
                                >
                                    Recruiting Board
                                </Link>
                            </div>
                        </div>
                        <div className="row gx-1 mt-3">
                            <div className="justify-content-center">
                                <h6>State, Region</h6>
                                {recruitingProfile.State},{' '}
                                {recruitingProfile.Region}
                            </div>
                        </div>
                        <div className="row gx-1 mt-3 justify-content-center">
                            <h6>Weekly Points Remaining</h6>
                            {recruitingProfile
                                ? recruitingProfile.WeeklyPoints -
                                  recruitingProfile.SpentPoints
                                : 'N/A'}
                        </div>
                        <div className="row gx-1 mt-3 justify-content-center">
                            <h6>Scholarships Available</h6>
                            {recruitingProfile
                                ? recruitingProfile.RecruitClassSize -
                                  recruitingProfile.TotalCommitments
                                : 'N/A'}
                        </div>
                        <div className="row gx-1 mt-3 justify-content-center">
                            <h6>Scholarship Offers Available</h6>
                            {recruitingProfile
                                ? recruitingProfile.ScholarshipsAvailable
                                : 'N/A'}
                        </div>
                        <div className="row gx-1 mt-3 justify-content-center">
                            <h6>ESPN Score</h6>
                            {recruitingProfile
                                ? recruitingProfile.ESPNScore
                                : 'N/A'}
                        </div>
                        <div className="row gx-1 mt-3 justify-content-center">
                            <h6>Rivals Score</h6>
                            {recruitingProfile
                                ? recruitingProfile.RivalsScore
                                : 'N/A'}
                        </div>
                        <div className="row gx-1 mt-3 justify-content-center">
                            <h6>247Sports Score</h6>
                            {recruitingProfile
                                ? recruitingProfile.Rank247Score
                                : 'N/A'}
                        </div>
                    </>
                </div>
                <div className="col-md-10 px-md-4">
                    <div className="row mt-3 justify-content-between">
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle">Filters</h4>
                        </div>
                        <div className="col-md-auto">
                            <h4 className="text-start align-middle me-2">
                                {cbb_Timestamp
                                    ? `Current Week ${cbb_Timestamp.CollegeWeek}`
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
                                Countries
                            </h5>
                            <Select
                                options={countries}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-5"
                                classNamePrefix="select"
                                onChange={ChangeCountries}
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        {/* <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Overall Grade
                            </h5>
                            <Select
                                options={simpleLetterGrades}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index-2"
                                classNamePrefix="select"
                                onChange={ChangeOverallLetterGrades}
                            />
                        </div> */}
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
                        {cbb_Timestamp && cbb_Timestamp.CollegeWeek > 4 ? (
                            <div className="col-md-auto">
                                <h5 className="text-start align-middle">
                                    Team Rankings
                                </h5>
                                <button
                                    type="button"
                                    className="btn"
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
                        {cbbTeam &&
                        cbbTeam.ID === luckyTeam &&
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
                    <div className="row mt-2 dashboard-table-height">
                        {cbb_Timestamp && !cbb_Timestamp.IsRecruitingLocked ? (
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
                                    ''
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
                                                <th scope="col">Name</th>
                                                <th scope="col">Pos</th>
                                                <th scope="col">Height</th>
                                                <th scope="col">
                                                    State/Region
                                                </th>
                                                <th scope="col">Stars</th>
                                                <th scope="col">
                                                    2pt. Shooting
                                                </th>
                                                <th scope="col">
                                                    3pt Shooting.
                                                </th>
                                                <th scope="col">Finishing</th>
                                                <th scope="col">Ballwork</th>
                                                <th scope="col">Rebounding</th>
                                                <th scope="col">Defense</th>
                                                <th scope="col">Potential</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">
                                                    Leading Teams
                                                </th>
                                                <th scope="col">Add</th>
                                            </tr>
                                        </thead>
                                        <tbody className="overflow-auto">
                                            {viewableRecruits.length > 0
                                                ? viewableRecruits.map(
                                                      (x, idx) => (
                                                          <CBBDashboardPlayerRow
                                                              key={x.ID}
                                                              player={x}
                                                              rank={idx + 1}
                                                              map={crootMap}
                                                              timestamp={
                                                                  cbb_Timestamp
                                                              }
                                                              add={
                                                                  addPlayerToProfile
                                                              }
                                                          />
                                                      )
                                                  )
                                                : ''}
                                        </tbody>
                                    </table>
                                )}
                            </InfiniteScroll>
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
    cbbTeam: { cbbTeam },
    timestamp: { cbb_Timestamp }
}) => ({
    currentUser,
    cbbTeam,
    cbb_Timestamp
});

export default connect(mapStateToProps)(CBBRecruitingDashboard);
