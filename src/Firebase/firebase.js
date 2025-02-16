import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

export const useFirestore = (collection, docName) => {
    const [data, setData] = useState({});
    const firestore = useMemo(() => firebase.firestore(), []);
    const docRef = useMemo(
        () => firestore.collection(collection).doc(docName),
        [firestore, collection, docName]
    );
    useEffect(() => {
        // const docRef = firebase.firestore().collection(collection).doc(docName);
        const unsubscribe = docRef.onSnapshot((doc) => {
            if (doc.exists) {
                setData(doc.data());
            } else {
                setData(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [docRef, collection, docName]);

    const updateData = useCallback(
        (newData) => {
            firestore
                .collection(collection)
                .doc(docName)
                .update(newData)
                .catch((error) => console.error('Update failed:', error));
        },
        [collection, docName]
    );

    return [data, updateData];
};

export const useFireStoreCollection = (collectionName) => {
    const [data, setData] = useState([]);
    const firestore = useMemo(() => firebase.firestore(), []);
    const docRef = useMemo(
        () => firestore.collection(collectionName),
        [firestore, collectionName]
    );
    useEffect(() => {
        const collectionRef = firestore.collection(collectionName);
        const unsubscribe = collectionRef.onSnapshot(
            (snapshot) => {
                const docs = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setData(docs);
            },
            (error) => {
                console.error('Error fetching collection: ', error);
                setData([]);
            }
        );

        return () => unsubscribe();
    }, [docRef, collectionName]);

    const updateDocument = useCallback(
        (docId, newData) => {
            const docRef = firestore.collection(collectionName).doc(docId);
            docRef
                .update(newData)
                .catch((error) => console.error('Update failed:', error));
        },
        [firestore, collectionName]
    );

    return [data, updateDocument];
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
