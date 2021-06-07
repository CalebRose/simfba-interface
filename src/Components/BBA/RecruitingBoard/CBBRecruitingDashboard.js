import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CBBDashboardPlayerRow from './DashboardComponents/CBBDashboardPlayerRow';
import BBAPlayerService from '../../../_Services/simNBA/BBAPlayerService';
import SimBBA_url from '../../../Constants/SimBBA_url';
import LocalStorageService from '../../../_Services/localStorage/LocalStorageService';
import BBARecruitingService from '../../../_Services/simNBA/BBARecruitingService';

const CBBRecruitingDashboard = ({ currentUser }) => {
    // Services
    let playerService = new BBAPlayerService();
    let localStorageService = new LocalStorageService();
    let recruitingService = new BBARecruitingService();

    // Hooks
    const [selectedState, setSelectedState] = React.useState('All');
    const [selectedCountry, setCountry] = React.useState('All');
    const [states, setUSStates] = React.useState([]);
    const [countries, setCountries] = React.useState([]);
    const [selectedPosition, setPosition] = React.useState('All');
    const [selectedPositionDisplay, setPositionDisplay] =
        React.useState('Positions');
    const [recruits, setRecruits] = React.useState([]);
    const [filteredRecruits, setFilteredRecruits] = React.useState([]);
    const [recruitingProfile, setRecruitingProfile] = React.useState({});
    const [crootMap, setCrootMap] = React.useState({});

    // Static Data
    const filterCroots = (recruits) => {
        let croots = recruits;
        if (selectedState !== 'All' && selectedState !== '') {
            croots = croots.filter((x) => x.State.includes(selectedState));
            setCountry('USA');
        } else if (
            selectedCountry !== 'All' &&
            selectedCountry !== 'USA' &&
            selectedCountry !== ''
        ) {
            croots = croots.filter((x) => x.Country.includes(selectedCountry));
        }

        if (selectedPosition !== 'All') {
            croots = croots.filter((x) =>
                x.Position.includes(selectedPosition)
            );
        }

        setFilteredRecruits(croots);
    };

    // UseEffects
    useEffect(() => {
        if (currentUser) {
            getCroots();
            getProfile();
        }
    }, [currentUser]);

    useEffect(() => {
        filterCroots(recruits);
    }, [selectedState, selectedCountry, selectedPosition]);

    const getProfile = async () => {
        let profile = localStorageService.getRecruitingProfile();
        if (profile === null || profile === undefined) {
            profile = await recruitingService.GetRecruitingProfile(
                SimBBA_url,
                currentUser.cbb_id
            );
            localStorageService.setRecruitingProfile(profile);
        }
        // Get Map
        let recruits = profile.Recruits;
        let map = {};
        for (let i = 0; i < recruits.length; i++) {
            map[
                recruits[i].Recruit.FirstName + recruits[i].Recruit.LastName
            ] = true;
        }
        setCrootMap(map);
        setRecruitingProfile(profile);
    };

    const getCroots = async () => {
        if (recruits.length < 1) {
            let croots = await playerService.GetRecruits(SimBBA_url);
            let allApplicableStates = [
                ...new Set(
                    croots
                        .map((x) => x.State)
                        .filter((x) => x !== '')
                        .sort()
                )
            ];
            let allApplicableCountries = [
                ...new Set(croots.map((x) => x.Country).sort())
            ];
            setRecruits(croots);
            setUSStates(allApplicableStates);
            setCountries(allApplicableCountries);
            filterCroots(croots);
        }
    };

    // Click Functions
    const selectState = (value) => {
        setSelectedState(value);
    };

    const selectCountry = (value) => {
        if (value === 'USA') {
            setSelectedState('All');
        } else {
            setSelectedState('');
        }
        setCountry(value);
    };

    const togglePosition = (value) => {
        setPosition(value);
        switch (value) {
            case 'F':
                setPositionDisplay('Forwards');
                break;
            case 'C':
                setPositionDisplay('Centers');
                break;
            case 'G':
                setPositionDisplay('Guards');
                break;
            default:
                setPositionDisplay('Positions');
                break;
        }
    };

    const clearFilters = () => {
        togglePosition('All');
        selectState('All');
        selectCountry('All');
    };

    const addPlayerToProfile = async (payload) => {
        let crootProfile = recruitingProfile;
        let map = crootMap;
        let createRecruitPointsDto = {
            profileId: crootProfile.ID,
            playerId: payload.ID,
            seasonId: 0
        };

        if (crootProfile.Recruits.length <= 10) {
            let res = await recruitingService.CreateRecruitingPointsProfile(
                SimBBA_url,
                createRecruitPointsDto
            );

            if (res.ok) {
                console.log(
                    'Successfully added player to profile:',
                    payload.ID
                );
            } else {
                throw (
                    ('HTTP-Error: Could not add player to profile', res.status)
                );
            }

            // Add to local profile & crootmap
            map[payload.FirstName + payload.LastName] = true;
            crootProfile.Recruits.push({
                SeasonID: 0,
                PlayerID: payload.ID,
                ProfileID: crootProfile.ID,
                TotalPointsSpent: 0,
                CurrentPointsSpent: 0,
                Scholarship: false,
                InterestLevel: 'None',
                InterestLevelThreshold: 0,
                Signed: false,
                Recruit: payload
            });

            setCrootMap(map);
            setRecruitingProfile(crootProfile);
            localStorageService.setRecruitingProfile(crootProfile);
            setFilteredRecruits(filteredRecruits);
        } else {
            console.log(
                'You have reached the maximum limit of recruits onto your profile!'
            );
        }
    };

    // Secondary Components

    return (
        <div className="row mt-3">
            <div className="col-md-2">
                <div className="row mt-3">
                    <h3>Side content?</h3>
                </div>
            </div>
            <div className="col-md-auto container">
                <div className="justify-content-start">
                    <h2>College Basketball Recruiting Dashboard</h2>
                </div>
                <div className="row mt-3">
                    <div className="col-md-auto">
                        <div className="justify-content-start">
                            <h4 className="text-start">Filters</h4>
                        </div>
                        <div className="col-md-auto">
                            <div className="btn-group me-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {selectedPosition === 'All'
                                        ? 'Position'
                                        : selectedPositionDisplay}
                                </button>
                                <ul className="dropdown-menu">
                                    <li onClick={() => togglePosition('All')}>
                                        <p className="dropdown-item">All</p>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li onClick={() => togglePosition('C')}>
                                        <p className="dropdown-item">C</p>
                                    </li>
                                    <li onClick={() => togglePosition('F')}>
                                        <p className="dropdown-item">F</p>
                                    </li>
                                    <li onClick={() => togglePosition('G')}>
                                        <p className="dropdown-item">G</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="btn-group me-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {selectedState === 'All' ||
                                    selectedState === ''
                                        ? 'State'
                                        : selectedState}
                                </button>
                                <ul className="dropdown-menu dropdown-content">
                                    <li onClick={() => selectState('All')}>
                                        <p className="dropdown-item">All</p>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    {states.length > 0
                                        ? states.map((x) => (
                                              <li
                                                  onClick={() => selectState(x)}
                                              >
                                                  <p className="dropdown-item">
                                                      {x}
                                                  </p>
                                              </li>
                                          ))
                                        : ''}
                                </ul>
                            </div>
                            <div className="btn-group me-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {selectedCountry === 'All'
                                        ? 'Country'
                                        : selectedCountry}
                                </button>
                                <ul className="dropdown-menu">
                                    <li onClick={() => selectCountry('All')}>
                                        <p className="dropdown-item">All</p>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    {countries.length > 0
                                        ? countries.map((x) => (
                                              <li
                                                  onClick={() =>
                                                      selectCountry(x)
                                                  }
                                              >
                                                  <p className="dropdown-item">
                                                      {x}
                                                  </p>
                                              </li>
                                          ))
                                        : ''}
                                </ul>
                            </div>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={clearFilters}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 dashboard-table-height">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
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
                                <th scope="col">Recruiting Status</th>
                                <th scope="col">Leading Teams</th>
                                <th scope="col">Add</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-auto">
                            {filteredRecruits.length > 0
                                ? filteredRecruits.map((x, idx) => (
                                      <CBBDashboardPlayerRow
                                          key={x.ID}
                                          player={x}
                                          rank={idx + 1}
                                          map={crootMap}
                                          add={addPlayerToProfile}
                                      />
                                  ))
                                : ''}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-md-2">
                <div className="row mt-3">
                    <h3>Side content?</h3>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(CBBRecruitingDashboard);
