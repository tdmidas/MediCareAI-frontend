import React, { useEffect, useState } from "react";
import { validate } from "./validate";
import styles from "./Register.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { notify } from "../../config/toast";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		IsAccepted: false,
	});

	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	useEffect(() => {
		setErrors(validate(data, "signUp"));
	}, [data, touched]);

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
		if (!Object.keys(errors).length) {
			// Pushing data to database usuing PHP script
			const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${data.email.toLowerCase()}&password=${data.password
				}&register=true`;
			const pushData = async () => {
				const responseA = axios.get(urlApi);
				const response = await toast.promise(responseA, {
					pending: "Check your data",
					success: "Checked!",
					error: "Something went wrong!",
				});
				if (response.data.ok) {
					notify("You signed Up successfully", "success");
				} else {
					notify("You have already registered, log in to your account", "warning");
				}
			};
			pushData();
		} else {
			notify("Please Check fileds again", "error");
			setTouched({
				name: true,
				email: true,
				password: true,
				confirmPassword: true,
				IsAccepted: false,
			});
		}
	};

	return (


		<div className={styles.container}>

			<form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
				<h2>Sign Up</h2>
				<div>
					<div
						className={
							errors.name && touched.name
								? styles.unCompleted
								: !errors.name && touched.name
									? styles.completed
									: undefined
						}>
						<input
							type="text"
							name="name"
							value={data.name}
							placeholder="Name"
							onChange={changeHandler}
							onFocus={focusHandler}
							autoComplete="off"
						/>
						<img src="../../img/user.svg" alt="" />
					</div>
					{errors.name && touched.name && <span className={styles.error}>{errors.name}</span>}
				</div>
				<div>
					<div
						className={
							errors.email && touched.email
								? styles.unCompleted
								: !errors.email && touched.email
									? styles.completed
									: undefined
						}>
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
					{errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
				</div>
				<div>
					<div
						className={
							errors.password && touched.password
								? styles.unCompleted
								: !errors.password && touched.password
									? styles.completed
									: undefined
						}>
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
					{errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
				</div>
				<div>
					<div
						className={
							errors.confirmPassword && touched.confirmPassword
								? styles.unCompleted
								: !errors.confirmPassword && touched.confirmPassword
									? styles.completed
									: !errors.confirmPassword && touched.confirmPassword
										? styles.completed
										: undefined
						}>
						<input
							type="password"
							name="confirmPassword"
							value={data.confirmPassword}
							placeholder="Confirm Password"
							onChange={changeHandler}
							onFocus={focusHandler}
							autoComplete="off"
						/>
						<img src="#" alt="" />
					</div>
					{errors.confirmPassword && touched.confirmPassword && (
						<span className={styles.error}>{errors.confirmPassword}</span>
					)}
				</div>
				<div>
					<div className={styles.terms}>
						<input
							type="checkbox"
							name="IsAccepted"
							value={data.IsAccepted}
							id="accept"
							onChange={changeHandler}
							onFocus={focusHandler}
						/>
						<label htmlFor="accept">I accept terms of privacy policy</label>
					</div>
					{errors.IsAccepted && touched.IsAccepted && (
						<span className={styles.error}>{errors.IsAccepted}</span>
					)}
				</div>
				<div>
					<button type="submit">Create Account</button>
					<span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
						Already have a account? <Link to="/login">Sign In</Link>
					</span>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
};

export default Register;
