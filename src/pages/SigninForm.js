/** @format */

import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import styled from "styled-components";
// eslint-disable-next-line
import {authenticate, isAuthenticated, signin, authenticate2} from "../auth";
// import Google from "../auth/Google";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const SigninForm = ({history}) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		loading: false,
		redirectToReferrer: false,
	});

	const {email, password, loading, redirectToReferrer} = values;
	const {user} = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({...values, error: false, [name]: event.target.value});
	};

	// const informParent = (response) => {
	// 	setValues({ ...values, error: false, loading: true });
	// 	if (response.error) {
	// 		setValues({ ...values, error: response.error, loading: false });
	// 		toast.error(response.error);
	// 	} else {
	// 		authenticate2(response, () => {
	// 			setValues({
	// 				...values,
	// 				redirectToReferrer: true,
	// 			});
	// 		});
	// 	}
	// };

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({...values, error: false, loading: true});
		signin({email, password}).then((data) => {
			if (data.error) {
				setValues({...values, error: data.error, loading: false});
				toast.error(data.error);
			} else if (data.user.activeUser === false) {
				setValues({...values, error: data.error, loading: false});
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

	const showLoading = () =>
		loading && (
			<div className='alert alert-info'>
				<h2>Loading...</h2>
			</div>
		);

	const redirectUser = () => {
		let intendedDestination = history.location.state;
		if (intendedDestination && redirectToReferrer) {
			return <Redirect to={intendedDestination.from} />;
		} else {
			if (redirectToReferrer) {
				if (user && user.role === 1) {
					return <Redirect to='/store/admin/dashboard' />;
				} else if (user && user.role === 3) {
					return <Redirect to='/store/book-appointment-from-store' />;
				} else if (user && user.role === 1000) {
					return <Redirect to='/store/admin/dashboard' />;
				} else if (user && user.role === 2) {
					return <Redirect to='/stylist/dashboard' />;
				} else if (user && user.role === 10000) {
					return <Redirect to='/boss/admin/dashboard' />;
				} else if (user && user.role === 2000) {
					return <Redirect to='/agent/dashboard' />;
				} else {
					return <Redirect to='/dashboard' />;
				}
			}
		}

		if (isAuthenticated()) {
			return <Redirect to='/' />;
		}
	};

	const signinForm = () => (
		<FormSignin>
			<div className='row justify-content-md-center mt-4'>
				<div className='col-md-5 col-sm-12 '>
					<div className='form-container text-center'>
						<h1 className='mb-3'>
							Account <span className='text-primary'>Login</span>
						</h1>
						{/* <Google informParent={informParent} /> */}

						<form onSubmit={clickSubmit}>
							<div className='form-group' style={{marginTop: "25px"}}>
								<label style={{fontWeight: "bold"}}>Phone/ Email</label>
								<input
									type='text'
									name='email'
									value={email}
									onChange={handleChange("email")}
								/>
							</div>
							<div className='form-group ' style={{marginTop: "25px"}}>
								<label htmlFor='password' style={{fontWeight: "bold"}}>
									Password
								</label>
								<input
									type='password'
									name='password'
									value={password}
									onChange={handleChange("password")}
								/>
							</div>
							<input
								type='submit'
								value='login'
								className='btn btn-primary w-75 btn-block mx-auto'
								//onClick={sendEmail}
							/>
						</form>
						<hr />
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
				</div>
			</div>
		</FormSignin>
	);

	return (
		<WholeSignin>
			<ToastContainer />
			{showLoading()}
			{signinForm()}
			{redirectUser()}
		</WholeSignin>
	);
};

export default SigninForm;

const FormSignin = styled.div`
	margin-top: 5%;
	min-height: 700px;

	form {
		background-color: white;
		padding: 20px;
		border-radius: 5px;
		margin-bottom: 50px;
		min-height: 350px;
	}

	input[type="text"],
	input[type="number"],
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
	input[type="number"]:focus,
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
