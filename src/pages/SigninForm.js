import React, { useState } from "react";
import styled from "styled-components";
import { authenticate, isAuthenticated, signin } from "../auth";
import { toast } from "react-toastify";
import { useCartContext } from "../sidebar_context";
import BackgroundImage from "../Images/back-empty.png";
import { Link } from "react-router-dom";

// import LetterX from "../../Images/LetterX.png";

const SigninForm = () => {
	const { chosenLanguage } = useCartContext();
	const [values, setValues] = useState({
		email: "",
		password: "",
		loading: false,
		redirectToReferrer: false,
	});

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prevShow) => !prevShow);
	};

	const { email, password, redirectToReferrer } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });

		// Check if the input is a valid email or phone number
		let username;
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		const phonePattern = /^\d+$/;

		if (emailPattern.test(email)) {
			username = email; // It's an email
		} else if (phonePattern.test(email)) {
			username = email; // It's a phone number
		} else {
			setValues({ ...values, error: true, loading: false });
			return toast.error("Please fill in the correct phone or email");
		}

		signin({ username, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
				toast.error(data.error);
			} else if (data.user.activeUser === false) {
				setValues({ ...values, error: data.error, loading: false });
				return toast.error(
					"User was deactivated, Please reach out to the admin site"
				);
			} else {
				console.log(data);
				authenticate(data, () => {
					setValues({
						...values,
						redirectToReferrer: true,
					});
				});
			}
		});
	};

	const redirectUser = () => {
		if (redirectToReferrer) {
			if (user && user.role === 1) {
				return (window.location.href = "/store/admin/dashboard");
			} else if (user && user.role === 3) {
				return (window.location.href = "/store/book-appointment-from-store");
			} else if (user && user.role === 1000) {
				return (window.location.href = "/store/admin/store-preview");
			} else if (user && user.role === 2) {
				return (window.location.href = "/stylist/dashboard");
			} else if (user && user.role === 10000) {
				return (window.location.href = "/boss/admin/dashboard");
			} else if (user && user.role === 2000) {
				return (window.location.href = "/agent/dashboard");
			} else if (user && user.role === 5000) {
				return (window.location.href = "/ecommerce/admin/dashboard");
			} else {
				return (window.location.href = "/home");
			}
		}

		if (isAuthenticated()) {
			return (window.location.href = "/home");
		}
	};

	return (
		<AlreadyHaveAccountWrapper
			show={chosenLanguage === "Arabic"}
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
		>
			<div className='container'>
				<form
					onSubmit={clickSubmit}
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<div className='form-group' style={{ marginTop: "25px" }}>
						<label style={{ fontWeight: "bold" }}>
							{" "}
							{chosenLanguage === "Arabic"
								? "الهاتف أو البريد الإلكتروني"
								: "Phone OR Email"}{" "}
						</label>
						<input
							className='custom-input'
							type='text'
							name='email'
							value={email}
							placeholder='email or phone'
							required
							onChange={handleChange("email")}
						/>
					</div>
					<div className='form-group ' style={{ marginTop: "25px" }}>
						<label htmlFor='password' style={{ fontWeight: "bold" }}>
							{chosenLanguage === "Arabic" ? "كلمة المرور" : "Password"}
						</label>
						<div style={{ position: "relative" }}>
							<input
								className='custom-input'
								type={showPassword ? "text" : "password"}
								name='password'
								value={password}
								required
								placeholder='password'
								onChange={handleChange("password")}
							/>
							<div
								style={{
									position: "absolute",
									right: chosenLanguage === "Arabic" ? "" : "10px",
									left: chosenLanguage === "Arabic" ? "10px" : "",
									top: "50%",
									transform: "translateY(-50%)",
									color: "white",
									background: "#4a4a4a",
								}}
								onClick={(e) => {
									e.preventDefault();
									togglePasswordVisibility();
								}}
							>
								{showPassword ? (
									<i className='fa-solid fa-eye'></i>
								) : (
									<i className='fa-solid fa-eye-slash'></i>
								)}
							</div>
						</div>
					</div>
					<input
						type='submit'
						value='login'
						className='btn btn-primary w-75 btn-block mx-auto'
						//onClick={sendEmail}
					/>
				</form>
			</div>

			{chosenLanguage === "Arabic" ? (
				<div className='mt-5'>
					<p
						style={{
							fontSize: "0.9rem",
							textAlign: "center",
						}}
					>
						ليس لديك حساب، من فضلك{" "}
						<strong
							style={{
								textDecoration: "underline",
								fontStyle: "italic",
								fontSize: "1rem",
							}}
						>
							<Link to='/signup' className='btn btn-sm btn-outline-primary'>
								سجل هنا
							</Link>
						</strong>
					</p>
					<hr />

					<p
						style={{
							fontSize: "0.9rem",
							textAlign: "center",
						}}
					>
						نسيت كلمة المرور، من فضلك{" "}
						<strong
							style={{
								textDecoration: "underline",
								fontStyle: "italic",
								fontSize: "1rem",
							}}
						>
							<Link
								to='/auth/password/forgot'
								className='btn btn-sm btn-outline-danger'
							>
								إعادة تعيين كلمة المرور
							</Link>
						</strong>
					</p>
				</div>
			) : (
				<div className='mt-5'>
					<p
						style={{
							fontSize: "0.9rem",
							textAlign: "center",
						}}
					>
						Don't have an account, Please{" "}
						<strong
							style={{
								textDecoration: "underline",
								fontStyle: "italic",
								fontSize: "1rem",
							}}
						>
							<Link to='/signup' className='btn btn-sm btn-outline-primary'>
								Register Here
							</Link>
						</strong>
					</p>
					<hr />
					<p
						style={{
							fontSize: "0.9rem",
							textAlign: "center",
						}}
					>
						Forgot Your Password, Please{" "}
						<strong
							style={{
								textDecoration: "underline",
								fontStyle: "italic",
								fontSize: "1rem",
							}}
						>
							<Link
								to='/auth/password/forgot'
								className='btn btn-sm btn-outline-danger'
							>
								Reset Your Password
							</Link>
						</strong>
					</p>
				</div>
			)}

			{redirectUser()}
		</AlreadyHaveAccountWrapper>
	);
};

export default SigninForm;

const AlreadyHaveAccountWrapper = styled.div`
	color: white;
	min-height: 1300px;
	background-image: url(${BackgroundImage});
	background-size: cover; // this will make sure the image covers the entire container
	background-repeat: no-repeat;
	background-position: center; // this will center the background image
	min-height: 100vh; // this will make the div take up at least the full height of the viewport
	width: 100%; // this will make the div take up the full width of the viewport
	overflow: hidden;

	form {
		padding-top: 100px;
	}

	label {
		color: white;
	}

	.custom-input {
		width: 100%; /* Fill the entire width */
		background-color: #4a4a4a; /* Background color */
		color: white; /* Text color */
		padding: 5px 8px; /* Increase padding for more space */
		border: none; /* Remove any border if you don't want it */
		outline: none; /* Remove focus outline if desired */
		border-radius: 5px;
	}
`;
