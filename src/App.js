import React, { Component } from 'react';
import { withRouter } from 'react-router';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './Redux/user/user.actions';

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
      teamId: '',
    },
  };
  // Global Variables
  unSubscribeFromAuth = null;

  // Components
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth !== null) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(null);
      }
      // setCurrentUser(userAuth);
    });

    // auth.currentUser
    //   .getIdToken(true)
    //   .then(function (idToken) {
    //     localStorage.setItem('token', idToken);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
});

export default withRouter(connect(null, mapDispatchToProps)(App));
