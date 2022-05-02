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
    StatesList
} from '../../Constants/CommonConstants';
import FBARecruitingService from '../../_Services/simFBA/FBARecruitingService';
import DCPositionItem from '../DepthChart/DC_PositionItem';
import DropdownDoubleItem from '../_Common/DropdownDoubleItem';
import DropdownSingularItem from '../_Common/DropdownSingularItem';
import CFBDashboardPlayerRow from './CFBDashboardComponents/CFBDashboardPlayerRow';
import CrootModal from './CFBDashboardComponents/CFBDashboardCrootModal';
import { MapOptions } from '../../_Utility/filterHelper';
import {
    ValidateAffinity,
    ValidateCloseToHome
} from '../../_Utility/CFBRecruitingHelper';
import CFBDashboardSidebar from './CFBDashboardComponents/CFBDashboardSidebar';

const CFBRecruitingDashboard = ({ currentUser, cfbTeam, cfb_Timestamp }) => {
    // Services
    let _recruitingService = new FBARecruitingService();

    // Hooks
    const positions = [{ name: 'All', abbr: '' }, ...PositionList];
    const [selectedPosition, setSelectedPosition] = React.useState({
        name: 'All',
        abbr: ''
    });
    const states = ['All', ...StatesList];
    const [selectedState, setSelectedState] = React.useState('All');
    const affinities = MapOptions(AffinitiesList);
    const letterGrades = MapOptions(LetterGradesList);
    const overallLetterGrades = MapOptions(SimpleLetterGrades);
    const [selectedPotentialLetterGrades, setSelectedPotentialLetterGrades] =
        React.useState('');
    const [selectedOverallLetterGrades, setSelectedOverallLetterGrades] =
        React.useState('');
    const [selectedAffinities, setSelectedAffinities] = React.useState('');
    const [recruits, setRecruits] = React.useState([]);
    const [filteredRecruits, setFilteredRecruits] = React.useState([]);
    const [recruitingProfile, setRecruitingProfile] = React.useState({});
    const [recruitingNeeds, setRecruitingNeeds] = React.useState(null);
    const [crootMap, setCrootMap] = React.useState({});
    const [teamColors, setTeamColors] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [serviceMessage, setServiceMessage] = React.useState('');
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);

    // Setup Modals?

    // For mobile
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const isMobile = useMediaQuery({ query: `(max-width:760px)` });

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
        }
    }, [cfbTeam]);

    useEffect(() => {
        FilterCroots(recruits);
    }, [
        selectedState,
        selectedPosition,
        selectedAffinities,
        selectedPotentialLetterGrades,
        selectedOverallLetterGrades
    ]);

    //
    const GetCroots = async () => {
        let croots = await _recruitingService.GetRecruits();
        setRecruits([...croots]);
        FilterCroots(croots);
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

    const FilterCroots = (croots) => {
        let fr = [...croots];

        if (fr.length > 0) {
            if (selectedState !== 'All' && selectedState !== '') {
                fr = fr.filter((x) => x.State.includes(selectedState));
            }

            if (
                selectedPosition.name !== 'All' ||
                selectedPosition.abbr !== ''
            ) {
                fr = fr.filter((x) =>
                    x.Position.includes(selectedPosition.abbr)
                );
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
        }

        setFilteredRecruits((x) => fr);
    };

    // OnClick Events

    const SelectPosition = (pos) => {
        setSelectedPosition(pos);
    };

    const SelectState = (state) => {
        setSelectedState(state);
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
                    : ValidateAffinity(recruit.AffinityOne, crootProfile);

            const CreateRecruitProfileDto = {
                PlayerID: recruit.ID,
                SeasonID: cfb_Timestamp.SeasonID,
                RecruitID: recruit.ID,
                ProfileID: cfbTeam.ID,
                Team: cfbTeam.TeamAbbr,
                AffinityOneEligible: affinityOneValid,
                AffinityTwoEligible: affinityTwoValid,
                PlayerRecruit: recruit
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

    const ClearFilters = () => {
        setSelectedPosition({ name: 'All', abbr: '' });
        SelectState('All');
        setSelectedOverallLetterGrades('');
        setSelectedPotentialLetterGrades('');
        setSelectedAffinities('');
    };

    return (
        <div className="container-fluid">
            <div className="justify-content-start">
                <h2>College Football Recruiting Dashboard</h2>
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
                    <div className="row mt-3">
                        <div className="col-md-auto justify-content-start">
                            <h4 className="text-start align-middle">Filters</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Position
                            </h5>
                            <div className="drop-start btn-dropdown-width-team">
                                <button
                                    name="position"
                                    className="btn dropdown-toggle btn-dropdown-width-team"
                                    id="dropdownMenuButton2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
                                >
                                    <span>
                                        {selectedPosition
                                            ? selectedPosition.name +
                                              ' | ' +
                                              selectedPosition.abbr
                                            : ''}
                                    </span>
                                </button>
                                <ul className="dropdown-menu dropdown-content">
                                    <DropdownDoubleItem
                                        item={
                                            selectedPosition
                                                ? selectedPosition
                                                : ''
                                        }
                                        id={0}
                                        click={SelectPosition}
                                    />
                                    <hr className="dropdown-divider"></hr>
                                    {positions && positions.length > 0
                                        ? positions.map((x, idx) => (
                                              <DropdownDoubleItem
                                                  key={idx}
                                                  item={x}
                                                  id={idx}
                                                  click={SelectPosition}
                                              />
                                          ))
                                        : ''}
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">States</h5>
                            <div className="drop-start btn-dropdown-width-team">
                                <button
                                    name="state"
                                    className="btn dropdown-toggle btn-dropdown-width-team"
                                    id="dropdownMenuButton2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
                                >
                                    <span>
                                        {selectedState ? selectedState : 'All'}
                                    </span>
                                </button>
                                <ul className="dropdown-menu dropdown-content">
                                    <DropdownSingularItem
                                        value={
                                            selectedState ? selectedState : ''
                                        }
                                        id={0}
                                        click={SelectState}
                                    />
                                    <hr className="dropdown-divider"></hr>
                                    {states && states.length > 0
                                        ? states.map((x, idx) => (
                                              <DropdownSingularItem
                                                  key={idx}
                                                  value={x}
                                                  id={idx}
                                                  click={SelectState}
                                              />
                                          ))
                                        : ''}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-auto">
                            <h5 className="text-start align-middle">
                                Affinities
                            </h5>
                            <Select
                                options={affinities}
                                isMulti={true}
                                className="basic-multi-select btn-dropdown-width-team z-index"
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
                                className="basic-multi-select btn-dropdown-width-team z-index"
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
                                className="basic-multi-select btn-dropdown-width-team z-index"
                                classNamePrefix="select"
                                onChange={ChangeOverallLetterGrades}
                            />
                        </div>
                        {/* <div className="col-md-auto align-self-end ms-auto">
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={ClearFilters}
                                >
                                    Clear Filters
                                </button>
                            </div> 
                        */}
                    </div>
                    <div className="row mt-3 mb-4 dashboard-table-height">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Rank</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Archetype</th>
                                    <th scope="col">High School</th>
                                    <th scope="col">City</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Stars</th>
                                    <th scope="col">Overall</th>
                                    <th scope="col">Potential</th>
                                    <th scope="col">Affinities</th>
                                    <th scope="col">Leading Schools</th>
                                    <th scope="col">Add</th>
                                </tr>
                            </thead>

                            <tbody className="overflow-auto">
                                {filteredRecruits.length > 0
                                    ? filteredRecruits.map((x, idx) => (
                                          <>
                                              <CrootModal crt={x} idx={idx} />
                                              <CFBDashboardPlayerRow
                                                  key={x.ID}
                                                  croot={x}
                                                  idx={idx}
                                                  add={AddRecruitToBoard}
                                                  map={crootMap}
                                              />
                                          </>
                                      ))
                                    : ''}
                            </tbody>
                        </table>
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

export default connect(mapStateToProps)(CFBRecruitingDashboard);
