import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './Redux/user/user.actions';
import { setCBBTimestamp } from './Redux/timestamp/timestamp.actions';
import { setCFBTimestamp } from './Redux/timestamp/timestamp.actions';

// Firebase
import { getAuth, onAuthStateChanged, getIdToken } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from './Firebase/firebase';
// CSS
import './style.css';

// Routes and Pages
import Home from './Home';
import AdminService from './_Services/simFBA/AdminService';
import BBAAdminService from './_Services/simNBA/BBAAdminService';

const App = ({ setCurrentUser, setCBBTimestamp, setCFBTimestamp }) => {
    const navigate = useNavigate(); // ✅ Hooks are now inside a functional component
    const authInstance = getAuth();
    const _adminService = new AdminService();
    const _bbaAdminService = new BBAAdminService();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
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

                    const cfbTS = await _adminService.GetCurrentTimestamp();
                    const cbbTS = await _bbaAdminService.GetCurrentTimestamp();
                    setCFBTimestamp(cfbTS);
                    setCBBTimestamp(cbbTS);

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

        return () => unsubscribe(); // Cleanup function to avoid memory leaks
    }, [setCurrentUser]);

    return <Home />;
};

// const mapStateToProps = ({ user }) => ({ // commenting out, not used
//   setCurrentUser: user.currentUser
// });

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setCBBTimestamp: (cbbTimestamp) => dispatch(setCBBTimestamp(cbbTimestamp)),
    setCFBTimestamp: (cfbTimestamp) => dispatch(setCFBTimestamp(cfbTimestamp))
});

export default connect(null, mapDispatchToProps)(App);
