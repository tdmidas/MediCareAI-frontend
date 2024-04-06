import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../Register/Register.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../config/toast";
import { Link } from "react-router-dom";
import "./Login.css";
import { auth, googleAuthProvider, signInWithPopup, db } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";
import axios from "axios";

const googleLogo = require('../../assets/google-18px.svg').default;

const Login = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [touched, setTouched] = useState({});
	const navigate = useNavigate();


	const changeHandler = (event) => {
		if (event.target.name === "IsAccepted") {
			setData({ ...data, [event.target.name]: event.target.checked });
		} else {
			setData({ ...data, [event.target.name]: event.target.value });
		}
	};

	const focusHandler = (event) => {
		setTouched({ ...touched, [event.target.name]: true });
	};
	const signInWithEmail = async () => {
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
			notify("You logged in to your account successfully", "success");
			//store accessToken
			const response = await axios.post("http://localhost:5000/api/auth/login", {
				email: data.email,
				password: data.password,
			});
			const { userId, token } = response.data
			localStorage.setItem("userId", userId);

			localStorage.setItem("accessToken", token);
			//Update lastLogin
			const usersCollection = collection(db, "users");
			const userDoc = doc(usersCollection, data.email);
			await setDoc(userDoc, { userLastlogin: new Date() }, { merge: true });
			navigate("/");
		} catch (error) {
			console.error('Error:', error);
			notify("Your password or your email is wrong", "error");
		}
	};

	const signInWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleAuthProvider);
			const user = result.user;
			navigate("/");
			console.log("Google Sign-in Successful:", user);
		} catch (error) {
			console.error("Google Sign-in Error:", error.message);
		}
	};
	const submitHandler = async (event) => {
		event.preventDefault();
		signInWithEmail();
	};
	return (
		<div className={styles.container}>
			<form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
				<h2><b>Đăng nhập</b></h2>
				<div>
					<div>
						<input
							type="text"
							name="email"
							value={data.email}
							placeholder="E-mail"
							onChange={changeHandler}
							onFocus={focusHandler}
							autoComplete="off"
						/>
						<img src="#" alt="" />
					</div>
				</div>
				<div>
					<div>
						<input
							type="password"
							name="password"
							value={data.password}
							placeholder="Password"
							onChange={changeHandler}
							onFocus={focusHandler}
							autoComplete="off"
						/>
						<img src="#" alt="" />
					</div>
				</div>

				<div>
					<button type="submit">Đăng nhập</button>
					<ToastContainer />

					<button className={styles['google-btn']}
						onClick={signInWithGoogle}>
						<img src={googleLogo} style={{ paddingRight: 10 }} /> Đăng nhập với Google
					</button>

					<span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
						Bạn chưa có tài khoản? <Link to="/register">Tạo tài khoản</Link>
					</span>
				</div>
			</form>
		</div>
	);
};

export default Login;
