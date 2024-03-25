import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCrKEWN_0gFq66oURJCdcMkfGrdgcKVYk0",
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
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
facebookAuthProvider.addScope("user_birthday");
const getEmail = auth.currentUser?.email;
export { auth, googleAuthProvider, signInWithPopup, getEmail, facebookAuthProvider };
