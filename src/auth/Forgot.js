/** @format */

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import styled from "styled-components";
import { useCartContext } from "../sidebar_context";

const Forgot = ({ language }) => {
	const { chosenLanguage } = useCartContext();
	const [values, setValues] = useState({
		email: "",
		buttonText:
			chosenLanguage === "Arabic" ? "اعد ضبط كلمه السر" : "Reset Link",
	});

	const { email, buttonText } = values;

	const handleChange = (name) => (event) => {
		// console.log(event.target.value);
		setValues({ ...values, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();
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

		setValues({ ...values, buttonText: "Submitting" });
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API_URL}/forgot-password`,
			data: { username },
		})
			.then((response) => {
				console.log("FORGOT PASSWORD SUCCESS", response);
				toast.success(response.data.message);
				setValues({ ...values, buttonText: "Password Reset Requested" });
			})
			.catch((error) => {
				console.log("FORGOT PASSWORD ERROR", error.response.data);
				toast.error(error.response.data.error);
				setValues({ ...values, buttonText: "Request password reset link" });
			});
	};

	const passwordForgotForm = () => (
		<form>
			<div className='form-group'>
				<label className='text-muted'>Email OR Phone #</label>
				<input
					onChange={handleChange("email")}
					value={email}
					type='email'
					className='form-control'
				/>
			</div>

			<div>
				<button
					className='btn btn-primary'
					onClick={clickSubmit}
					disabled={!email}
				>
					{buttonText}
				</button>
			</div>
		</form>
	);

	const passwordForgotFormArabic = () => (
		<form dir='rtl' style={{ textAlign: "right" }}>
			<div className='form-group'>
				<label className='text-muted' style={{ fontSize: "1.1rem" }}>
					<strong> عنوان البريد الإلكتروني أو رقم الهاتف</strong>
				</label>
				<input
					onChange={handleChange("email")}
					value={email}
					type='email'
					className='form-control'
				/>
			</div>

			<div>
				<button
					className='btn btn-primary'
					onClick={clickSubmit}
					disabled={!email}
				>
					{buttonText}
				</button>
			</div>
		</form>
	);

	return (
		<FogotWrapper dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
			<div
				className='col-md-6 offset-md-3 my-5 p-4'
				style={{ borderRadius: "10px", border: "1px #c1d3e5 solid" }}
			>
				<ToastContainer />
				<div
					className='text-center mt-2 mb-5 p-2'
					style={{
						fontSize: "1.6rem",
						fontWeight: "bold",
						fontStyle: "italic",
						color: "white",
						backgroundColor: "#0f1923",
						// boxShadow: "2px 2px 5px 5px rgba(0,0,0,0.5)",
						boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.5)",
					}}
				>
					{chosenLanguage === "Arabic"
						? "نسيت كلمة السر؟"
						: "Forgot Your Password?"}
				</div>
				{chosenLanguage === "Arabic"
					? passwordForgotFormArabic()
					: passwordForgotForm()}
			</div>
		</FogotWrapper>
	);
};

export default Forgot;

const FogotWrapper = styled.div`
	min-height: 1000px;
`;
