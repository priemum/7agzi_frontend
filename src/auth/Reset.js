import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import styled from "styled-components";
import { useCartContext } from "../sidebar_context";
import { Helmet } from "react-helmet";

const decodeJwt = (token) => {
	try {
		const base64Url = token.split(".")[1]; // Split the JWT token and take the payload part
		const base64 = base64Url.replace("-", "+").replace("_", "/"); // Replace URL-safe characters with Base64 ones
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
				.join("")
		);

		return JSON.parse(jsonPayload);
	} catch (error) {
		console.log("Error decoding token", error);
		return null;
	}
};

const Reset = ({ match }) => {
	const { chosenLanguage } = useCartContext();
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prevShow) => !prevShow);
	};

	// props.match from react router dom
	const [values, setValues] = useState({
		name: "",
		token: match.params.token, // Assuming the token is part of the URL path
		newPassword: "",
		buttonText:
			chosenLanguage === "Arabic" ? "تعديل كلمة المرور" : "Reset password",
	});

	const { name, token, newPassword, buttonText } = values;

	const handleChange = (event) => {
		setValues({ ...values, newPassword: event.target.value });
	};

	useEffect(() => {
		if (token) {
			const decoded = decodeJwt(token);
			if (decoded && decoded.name) {
				setValues({ ...values, name: decoded.name });
			}
		}
		// eslint-disable-next-line
	}, [token]);

	const clickSubmit = (event) => {
		event.preventDefault();

		// Check if the password has at least one digit
		const hasDigit = /\d/.test(newPassword);
		if (!hasDigit) {
			return toast.error(
				`${
					chosenLanguage === "Arabic"
						? "من فضلك، ضمن وجود رقم واحد على الأقل في كلمة السر الجديدة"
						: "Please include at least one number in your new password"
				}`
			);
		}

		// Check if the password is at least 6 characters long
		if (newPassword.length < 6) {
			return toast.error(
				`${
					chosenLanguage === "Arabic"
						? "يجب أن تكون كلمة السر ٦ أحرف أو أكثر، من فضلك حاول مرة أخرى!"
						: "Passwords should be 6 characters or more, Please try again!"
				}`
			);
		}

		setValues({ ...values, buttonText: "Submitting" });
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API_URL}/reset-password`,
			data: { newPassword, resetPasswordLink: token },
		})
			.then((response) => {
				console.log("RESET PASSWORD SUCCESS", response);
				toast.success(response.data.message);
				setValues({ ...values, buttonText: "Done" });
				setTimeout(() => {
					window.location.href = `${process.env.REACT_APP_MAIN_URL}/signin`;
				}, 2500);
			})
			.catch((error) => {
				console.log("RESET PASSWORD ERROR", error.response.data);
				toast.error(error.response.data.error);
				setValues({ ...values, buttonText: "Reset password" });
			});
	};

	const passwordResetForm = () => (
		<form dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"} className='mt-5'>
			<div
				className='form-group'
				style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
			>
				<label className='text-muted'>
					{" "}
					{chosenLanguage === "Arabic"
						? "أدخل كلمة مرور جديدة"
						: "New Password"}{" "}
				</label>
				<input
					onChange={handleChange}
					value={newPassword}
					type={showPassword ? "text" : "password"}
					className='form-control'
					placeholder='Type new password'
					required
				/>
				<div
					className='toggelingShow'
					style={{
						position: "absolute",
						right: chosenLanguage === "Arabic" ? "" : "25px",
						left: chosenLanguage === "Arabic" ? "25px" : "",
						top: "77%",
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

			<div className='mx-auto text-center'>
				<button className='btn btn-primary' onClick={clickSubmit}>
					{buttonText}
				</button>
			</div>
		</form>
	);

	return (
		<ResetWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				{chosenLanguage === "Arabic" ? (
					<title dir='rtl'>XLOOK | إعادة تعيين كلمة المرور {name} </title>
				) : (
					<title>XLOOK | Reset Password {name}</title>
				)}
			</Helmet>
			<div className='col-md-6 offset-md-3' style={{ marginTop: "50px" }}>
				<ToastContainer />
				<h1 className='p-5 text-center message'>
					Hey {name}, Type your new password
				</h1>
				{passwordResetForm()}
			</div>
		</ResetWrapper>
	);
};

export default Reset;

const ResetWrapper = styled.div`
	min-height: 900px;

	@media (max-width: 1100px) {
		.toggelingShow {
			top: 78% !important;
		}
		.message {
			font-size: 1.5rem;
			font-weight: bolder;
		}
	}
`;
