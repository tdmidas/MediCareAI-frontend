import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, connectAuthEmulator } from "firebase/auth";

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
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

if (window.location.hostname === "localhost") {
	connectAuthEmulator(auth, "http://localhost:9099");
	connectFirestoreEmulator(db, "localhost", 8080);
}

export { db, auth, googleProvider, githubProvider };
