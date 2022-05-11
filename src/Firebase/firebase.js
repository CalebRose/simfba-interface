import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config_env from './../config';

const config = {
    apiKey: config_env.apiKey,
    authDomain: config_env.authDomain,
    databaseURL: config_env.databaseURL,
    projectId: config_env.projectId,
    storageBucket: config_env.storageBucket,
    messagingSenderId: config_env.messagingSenderId,
    appId: config_env.appId,
    measurementId: config_env.measurementId
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // If not authorized, do nothing
    if (!userAuth) return;
    // Query inside of firestore for the document
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { username, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                username,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
