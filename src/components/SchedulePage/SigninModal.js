/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { authenticate, signin, authenticate2 } from "../../auth";
import Google from "../../auth/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const SigninModal = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		success: false,
	});

	const {
		email,
		password,
		// eslint-disable-next-line
		success,
	} = values;

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			[name]: event.target.value,
		});
	};

	const informParent = (response) => {
		setValues({ ...values, error: false, loading: true });
		if (response.error) {
			setValues({ ...values, error: response.error, loading: false });
			toast.error(response.error);
		} else {
			authenticate2(response, () => {
				setValues({
					...values,
					redirectToReferrer: true,
				});
				toast.success("Thank you for signing in!!");
				setTimeout(function () {
					window.location.reload(false);
				}, 2000);
			});
		}
	};

	const clickSubmit = (event) => {
		event.preventDefault();

		signin({ email, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				authenticate(data, () => {
					setValues({
						...values,
					});
				});
				toast.success("Thank you for signing in!!");
				setTimeout(function () {
					window.location.reload(false);
				}, 2000);
			}
		});
	};

	const signinForm = () => (
		<FormSignin>
			<div className='row justify-content-md-center mt-5'>
				<div className='col-md-8 col-sm-12 '>
					<div className='form-container text-center'>
						<h1 className='mb-3'>
							Account <span className='text-primary'>Login</span>
						</h1>
						<Google informParent={informParent} />
						<form onSubmit={clickSubmit}>
							<div
								className='form-group '
								style={{
									marginTop: "25px",
								}}></div>
							<div className='form-group' style={{ marginTop: "25px" }}>
								<label htmlFor='email' style={{ fontWeight: "bold" }}>
									Email Address / Phone
								</label>
								<input
									type='text'
									name='email'
									value={email}
									onChange={handleChange("email")}
									required
								/>
							</div>
							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='password' style={{ fontWeight: "bold" }}>
									Password
								</label>
								<input
									type='password'
									name='password'
									value={password}
									onChange={handleChange("password")}
									required
								/>
							</div>

							<input
								type='submit'
								value='Login'
								className='btn btn-primary w-75 btn-block mx-auto'
								//onClick={sendEmail}
							/>
						</form>
						<hr />
						<hr />
					</div>
				</div>
			</div>
		</FormSignin>
	);

	return (
		<WholeSignin>
			<ToastContainer />
			{signinForm()}
		</WholeSignin>
	);
};

export default SigninModal;

const FormSignin = styled.div`
	input[type="text"],
	input[type="email"],
	input[type="password"],
	input[type="date"],
	select,
	textarea {
		display: block;
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
	}
	input[type="text"]:focus,
	input[type="email"]:focus,
	input[type="password"]:focus,
	input[type="date"]:focus,
	select:focus,
	textarea:focus,
	label:focus {
		outline: none;
		border: 1px solid var(--primaryColor);

		box-shadow: 5px 8px 3px 0px rgba(0, 0, 0, 0.3);
		transition: var(--mainTransition);
		font-weight: bold;
	}

	.form-container {
		margin-left: 50px;
		margin-right: 50px;
	}
`;

const WholeSignin = styled.div`
	overflow: hidden;
`;
