import React, { useState } from "react";
import styles from "../Register/Register.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../config/toast";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
const Login = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [touched, setTouched] = useState({});

	const chaeckData = (obj) => {
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
		chaeckData(data);
	};

	return (
		<div className={styles.container}>
			<form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
				<h2>Sign In</h2>
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
					<button type="submit">Login</button>
					<span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
						Don't have a account? <Link to="/register">Create account</Link>
					</span>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
};

export default Login;
