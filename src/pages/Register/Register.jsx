import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "./validate";
import styles from "./Register.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { notify } from "../../config/toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth, googleAuthProvider, signInWithPopup, getEmail } from "../../firebaseConfig";
const googleLogo = require('../../assets/google-18px.svg').default;
const Register = () => {
	const navigate = useNavigate();
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

	const submitHandler = async (event) => {
		event.preventDefault();
		if (!Object.keys(errors).length) {
			try {
				const response = await axios.post("http://localhost:5000/api/auth/signup", data);
				if (response.user) {
					notify("You signed Up successfully", "success");
				}
			} catch (error) {
				notify(error.message, "error");
			}
		} else {
			notify("Please Check fields again", "error");
			setTouched({
				name: true,
				email: true,
				password: true,
				confirmPassword: true,
				IsAccepted: false,
			});
		}
	};



	const signUpWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleAuthProvider);
			if (getEmail) {
				notify("Email đã tồn tại, vui lòng đăng nhập");
				return;
			}
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
				<h2 >Đăng ký tài khoản</h2>
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
						<label htmlFor="accept">Tôi đồng ý với các điều khoản và quy tắc</label>
					</div>
					{errors.IsAccepted && touched.IsAccepted && (
						<span className={styles.error}>{errors.IsAccepted}</span>
					)}
				</div>
				<div>
					<button type="submit">Tạo tài khoản</button>
					<button className={styles['google-btn']}
						onClick={signUpWithGoogle}>
						<img src={googleLogo} style={{ paddingRight: 10 }} /> Đăng ký với Google
					</button>

					<span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
						Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
					</span>
				</div>
			</form>
			<ToastContainer />
		</div>
	);
};

export default Register;
