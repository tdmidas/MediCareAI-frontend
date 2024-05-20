import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "./validate";
import styles from "./Register.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { notify } from "../../config/toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";
import { auth, googleAuthProvider, signInWithPopup, getEmail, facebookAuthProvider } from "../../firebaseConfig";
import { Flex, Image, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
const googleLogo = require('../../assets/google-18px.svg').default;
const facebookLogo = require('../../assets/facebook-18px.svg').default;
const Register = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
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
				const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
				updateProfile(result.user, {
					displayName: data.name,
					photoURL: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
				});
				const response = await axios.post(`https://medicareai-backend.onrender.com/api/auth/signup`, data);
				if (response.status === 201) {
					message.success("Đăng ký thành công");
					navigate("/login");
				}
			} catch (error) {
				notify(error.message, "error");
			}
		} else {
			notify("Check lại thông tin đăng ký", "error");
			setTouched({
				name: true,
				email: true,
				password: true,
				confirmPassword: true,
				IsAccepted: false,
			});
		}
	};


	const signUpWithFacebook = async () => {
		try {
			const result = await signInWithPopup(auth, facebookAuthProvider);
			if (getEmail) {
				notify("Email đã tồn tại, vui lòng đăng nhập");
				return;
			}
			const user = result.user;
			const userId = user.uid;
			const accessToken = user.accessToken;
			localStorage.setItem('userId', userId);
			localStorage.setItem('email', user.email);
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('photoURL', user.photoURL);
			localStorage.setItem('displayName', user.displayName);
			const userDocRef = doc(collection(db, 'users'), userId);
			await setDoc(userDocRef, { displayName: user.displayName, email: user.email, isAdmin: false, userId: user.uid, photoURL: user.photoURL, lastLogin: new Date() }, { merge: true });
			navigate("/");
			console.log("Facebook Sign-in Successful:", user);
		} catch (error) {
			console.error("Facebook Sign-in Error:", error.message);
		}



	}
	const signUpWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleAuthProvider);
			if (getEmail) {
				notify("Email đã tồn tại, vui lòng đăng nhập");
				return;
			}
			const user = result.user;
			const userId = user.uid;
			const accessToken = user.accessToken;
			localStorage.setItem('userId', userId);
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('email', user.email);
			localStorage.setItem('photoURL', user.photoURL);
			localStorage.setItem('displayName', user.displayName);
			const userDocRef = doc(collection(db, 'users'), userId);
			await setDoc(userDocRef, { displayName: user.displayName, email: user.email, isAdmin: false, userId: user.uid, photoURL: user.photoURL, lastLogin: new Date() }, { merge: true });
			navigate("/");
			console.log("Google Sign-in Successful:", user);
		} catch (error) {
			console.error("Google Sign-in Error:", error.message);
		}
	};


	return (
		<>
			<Flex wrap='wrap' style={{ maxHeight: "100vh", overflowY: 'scroll', padding: "20px" }}>
				<Flex style={{ padding: 20 }}>
					<Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} > Về trang chủ</Button>
				</Flex>
				<Flex wrap="wrap" align="center" justify="center" gap="large" >

					<div className={styles.container}>
						<Flex direction="column" align="center" gap="small" wrap="wrap">

							<form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
								<h2 > <b>Chăm sóc sức khỏe của bạn <br />tốt hơn với AI</b></h2>
								<h3>Đăng ký tài khoản để bắt đầu sử dụng</h3>
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
											placeholder="Họ và tên"
											onChange={changeHandler}
											onFocus={focusHandler}
											autoComplete="off"
										/>
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
											placeholder="Nhập mật khẩu"
											onChange={changeHandler}
											onFocus={focusHandler}
											autoComplete="off"
										/>

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
											placeholder="Nhập lại mật khẩu"
											onChange={changeHandler}
											onFocus={focusHandler}
											autoComplete="off"
										/>

									</div>
									{errors.confirmPassword && touched.confirmPassword && (
										<span className={styles.error}>{errors.confirmPassword}</span>
									)}
								</div>

								<div>
									<button type="submit">Tạo tài khoản</button>


									<button className={styles['facebook-btn']}
										onClick={signUpWithFacebook}>
										<img src={facebookLogo} style={{ paddingRight: 10 }} alt="facebook-logo" /> Đăng ký với Facebook
									</button>
									<button className={styles['google-btn']}
										onClick={signUpWithGoogle}>
										<img src={googleLogo} style={{ paddingRight: 10 }} alt="google-logo" /> Đăng ký với Google
									</button>
									<span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
										Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
									</span>

								</div>

							</form>


							<Image preview={false} src="https://d1xjlj96to6zqh.cloudfront.net/login-bg.png" alt="auth background" style={{ minWidth: 300, maxHeight: 650, borderRadius: 30, padding: 20 }} />
						</Flex>
					</div>

				</Flex>
			</Flex>
		</>
	);
};

export default Register;
