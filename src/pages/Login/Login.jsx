import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../Register/Register.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../config/toast";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { auth, googleAuthProvider, signInWithPopup, getEmail } from "../../firebaseConfig";
const googleLogo = require('../../assets/google-18px.svg').default;

const Login = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [touched, setTouched] = useState({});
	const navigate = useNavigate();

	const checkData = (obj) => {
		const { email, password } = obj;
		const urlApi = `http://localhost:5000/api/auth/login?email=${email}&password=${password}`;
		const api = axios
			.get(urlApi)
			.then((response) => response.data)
			.then((data) =>
				data.ok
					? notify("You login to your account successfully", "success")
					: notify("Your password or your email is wrong", "error")
			);
		toast.promise(api, {
			pending: "Loading your data...",
			success: false,
			error: "Something went wrong!",
		});
	};

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

	const submitHandler = (event) => {
		event.preventDefault();
		checkData(data);
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
	return (
		<div className={styles.container}>
			<form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
				<h2>Đăng nhập</h2>
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
					<button className={styles['google-btn']}
						onClick={signInWithGoogle}>
						<img src={googleLogo} style={{ paddingRight: 10 }} /> Đăng nhập với Google
					</button>
					<span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
						Bạn chưa có tài khoản? <Link to="/register">Create account</Link>
					</span>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
};

export default Login;
