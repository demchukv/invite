// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const FIREBASE_API_ID = import.meta.env.VITE_FIREBASE_API_ID;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "inviteapp-63d4e.firebaseapp.com",
  projectId: "inviteapp-63d4e",
  storageBucket: "inviteapp-63d4e.appspot.com",
  messagingSenderId: "176449321112",
  appId: FIREBASE_API_ID,
  measurementId: "G-MX70QZDV99"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);
// export default app;

// const analytics = getAnalytics(app);