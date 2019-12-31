import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyA1Rv7u0t_5TOoa2b8uiUsBTRqPik5p2fM",
    authDomain: "crwn-db-adca2.firebaseapp.com",
    databaseURL: "https://crwn-db-adca2.firebaseio.com",
    projectId: "crwn-db-adca2",
    storageBucket: "crwn-db-adca2.appspot.com",
    messagingSenderId: "863430759435",
    appId: "1:863430759435:web:6b33a3f93ee45af0f9e30e",
    measurementId: "G-EY9EFHS93J"
  };


  firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
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
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;