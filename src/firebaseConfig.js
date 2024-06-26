import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: "medicareai.firebaseapp.com",
	projectId: "medicareai",
	storageBucket: "medicareai.appspot.com",
	messagingSenderId: "1071142761241",
	appId: "1:1071142761241:web:03538b5750d0f971f7cb88",
	measurementId: "G-2040YCZZTH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const getEmail = auth.currentUser?.email;
export { auth, googleAuthProvider, signInWithPopup, getEmail, db, facebookAuthProvider };
