// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} = process.env;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};

const ERROR_MESSAGES = {
  'auth/wrong-password': 'Incorrect password for email.',
  'auth/user-not-found': 'No user found with this email.',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

const auth = getAuth();
const db = getFirestore(app);

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// CREATE USER -----------------------------------
export const createUserDocumentFromAuth = async (userAuth, additionalDetails) => {
  if (!userAuth) return;

  // pointer to a space where the data lives
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if user do not exists, create
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalDetails
      });
    } catch (error) {
      console.log(error);
    }
  }
  // changed from userDocRef because now we'd like to get 
  // the data inside the snapshot and get it stored in the 
  // reducer;
  return userSnapshot;
};
// -----------------------------------------------

// USER FUNCTIONS --------------------------------
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
}
// -----------------------------------------------


export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// GET ALL CATEGORIES DOCUMENTS
// should return all the cateries as it is in the database!!
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const dbQuery = query(collectionRef);
  
  const querySnapshot = await getDocs(dbQuery);
  
  const categories = querySnapshot.docs.map(docSnapshot => docSnapshot.data());

  return categories;
}

// RETURNS THE ERROR MESSAGE BASED ON RECEIVED ERROR CODE
export const returnErrorMessageFromCode = (errorCode) => {
  return ERROR_MESSAGES[errorCode];
};

// ATTENTION!! workaround to load database with some data!!!
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
}
