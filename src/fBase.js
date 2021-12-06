// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiOglV0XyLymISxrqbjLlovt_8Yz2VDE8",
  authDomain: "hand-f5ddb.firebaseapp.com",
  projectId: "hand-f5ddb",
  storageBucket: "hand-f5ddb.appspot.com",
  messagingSenderId: "597052928227",
  appId: "1:597052928227:web:2880367f95cf5e400e15d6",
  measurementId: "G-E4D0H8W763"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const authService = getAuth();

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const authService = getAuth();

// export default authService;