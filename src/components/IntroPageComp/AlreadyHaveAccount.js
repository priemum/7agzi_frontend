import React, { useState } from "react";
import styled from "styled-components";
import { authenticate, isAuthenticated, signin } from "../../auth";
import { toast } from "react-toastify";
// import LetterX from "../../Images/LetterX.png";

const AlreadyHaveAccount = ({
	chosenLanguage,
	setSteps,
	steps,
	setChosenGender,
	handleNext,
	handlePrev,
}) => {
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

			{redirectUser()}
		</AlreadyHaveAccountWrapper>
	);
};

export default AlreadyHaveAccount;

const AlreadyHaveAccountWrapper = styled.div`
	color: white;
	margin-top: 100px;

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
