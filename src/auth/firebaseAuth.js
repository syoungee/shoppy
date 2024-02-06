// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

export async function login() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user);
    return user;
  } catch (message_1) {
    return console.error(message_1);
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return null;
  } catch (message) {
    return console.error(message);
  }
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}
