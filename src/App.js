import React, { Component } from 'react';
import { withRouter } from 'react-router';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './Redux/user/user.actions';
import { setCBBTimestamp } from './Redux/timestamp/timestamp.actions';
import { setCFBTimestamp } from './Redux/timestamp/timestamp.actions';

// Firebase
import { getAuth, onAuthStateChanged, getIdToken } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import {
    auth,
    firestore,
    createUserProfileDocument
} from './Firebase/firebase';
// CSS
import './style.css';

// Routes and Pages
import Home from './Home';
import AdminService from './_Services/simFBA/AdminService';
import BBAAdminService from './_Services/simNBA/BBAAdminService';

class App extends Component {
    state = {
        user: {
            id: null,
            username: '',
            team: '',
            teamAbbr: '',
            mascot: '',
            roleID: null,
            teamId: ''
        },
        cbbTimeStamp: {
            ID: null,
            SeasonID: null,
            CollegeWeekID: null,
            NBAWeekID: null,
            CollegeWeek: null,
            NBAWeek: null,
            GamesARan: false,
            GamesBRan: false,
            GamesCRan: false,
            RecruitingSynced: false,
            GMActionsComplete: false,
            IsOffSeason: false
        },
        cfbTimeStamp: {
            ID: null,
            CollegeWeekID: null,
            CollegeWeek: null,
            CollegeSeasonID: null,
            CollegeSeason: null,
            NFLSeasonID: null,
            NFLSeason: null,
            ThursdayGames: false,
            FridayGames: false,
            SaturdayMorning: false,
            SaturdayNoon: false,
            SaturdayEvening: false,
            SaturdayNight: false,
            NFLThursdayEvening: false,
            NFLSundayNoon: false,
            NFLSundayAfternoon: false,
            NFLSundayEvening: false,
            NFLMondayEvening: false,
            NFLTradingAllowed: false,
            NFLPreseason: false,
            RecruitingSynced: false,
            GMActionsCompleted: false,
            IsOffSeason: false
        }
    };

    _adminService = new AdminService();
    _bbaAdminService = new BBAAdminService();

    // Global Variables
    unSubscribeFromAuth = null;

    // Components
    componentDidMount() {
        const { setCurrentUser, setCBBTimestamp, setCFBTimestamp } = this.props;
        const authInstance = getAuth(); // Use the correct Firebase Auth instance

        this.unSubscribeFromAuth = onAuthStateChanged(
            authInstance,
            async (userAuth) => {
                if (userAuth) {
                    const userRef = doc(firestore, `users/${userAuth.uid}`);
                    const snapShot = await getDoc(userRef);

                    if (snapShot.exists()) {
                        setCurrentUser({
                            id: snapShot.id,
                            ...snapShot.data()
                        });
                    }

                    // Subscribe to real-time updates
                    onSnapshot(userRef, (snapshot) => {
                        if (snapshot.exists()) {
                            setCurrentUser({
                                id: snapshot.id,
                                ...snapshot.data()
                            });
                        }
                    });

                    // Fetch ID Token
                    try {
                        const idToken = await getIdToken(userAuth);
                        localStorage.setItem('token', idToken);
                    } catch (error) {
                        console.error('Error getting ID Token:', error);
                    }
                }
            }
        );
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }
    render() {
        return <Home />;
    }
}

// const mapStateToProps = ({ user }) => ({ // commenting out, not used
//   setCurrentUser: user.currentUser
// });

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setCBBTimestamp: (cbbTimestamp) => dispatch(setCBBTimestamp(cbbTimestamp)),
    setCFBTimestamp: (cfbTimestamp) => dispatch(setCFBTimestamp(cfbTimestamp))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
