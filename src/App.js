import React, { Component } from 'react';
import { withRouter } from 'react-router';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './Redux/user/user.actions';
import { setCBBTimestamp } from './Redux/timestamp/timestamp.actions';

// Firebase
import { auth, createUserProfileDocument } from './Firebase/firebase';

// CSS
import './App.css';
import './style.css';

// Routes and Pages
import Home from './Home';

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
            ThursdayGames: false,
            FridayGames: false,
            SaturdayMorning: false,
            SaturdayNoon: false,
            SaturdayEvening: false,
            SaturdayNight: false,
            RecruitingSynced: false,
            IsOffSeason: false
        }
    };
    // Global Variables
    unSubscribeFromAuth = null;

    // Components
    componentDidMount() {
        const { setCurrentUser, setCBBTimestamp, setCFBTimestamp } = this.props;

        this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth !== null) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot((snapShot) => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });

                userAuth
                    .getIdToken(true)
                    .then(function (idToken) {
                        // Send token to your backend via HTTPS
                        // ...
                        localStorage.setItem('token', idToken);
                    })
                    .catch(function (error) {
                        // Handle error
                    });
            }
        });
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
    setCBBTimestamp: (cbbTimestamp) => dispatch(setCBBTimestamp(cbbTimestamp))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
