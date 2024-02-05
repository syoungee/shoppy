// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyATdLPcp80COCNTqLiluTBzlHKEbvC50uQ',
  authDomain: 'shoppy-f5bf7.firebaseapp.com',
  databaseURL: 'https://shoppy-f5bf7-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'shoppy-f5bf7',
  storageBucket: 'shoppy-f5bf7.appspot.com',
  messagingSenderId: '668821711406',
  appId: '1:668821711406:web:2440c533ca0517f4b58dbf',
  measurementId: 'G-P22NJ6GMTG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
