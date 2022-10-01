import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCqFqqlTNnw6YWRrSUHmdxsPoWQZzDQx30',
  authDomain: 'crwn-clothing-db-935af.firebaseapp.com',
  projectId: 'crwn-clothing-db-935af',
  storageBucket: 'crwn-clothing-db-935af.appspot.com',
  messagingSenderId: '933699704668',
  appId: '1:933699704668:web:8f9d441bef117513591399',
};

const firebaseApp = initializeApp(firebaseConfig);

// Set Providers
// Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
// Facebook
const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters();

// Sign in with...

export const auth = getAuth(firebaseApp);

// Google
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Facebook
export const signInWithFacebookPopup = () =>
  signInWithPopup(auth, facebookProvider);

// db
export const db = getFirestore(firebaseApp);

//
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
