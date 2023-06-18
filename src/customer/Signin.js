/** @format */

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { authenticate, isAuthenticated, signin, authenticate2 } from "../auth";
import Google from "../auth/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Signin = ({ history }) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		loading: false,
		redirectToReferrer: false,
	});

	const { email, password, loading, redirectToReferrer } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
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
			});
		}
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
				toast.error(data.error);
			} else if (data.user.activeUser === false) {
				setValues({ ...values, error: data.error, loading: false });
				return toast.error(
					"User was deactivated, Please reach out to the admin site",
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
					return <Redirect to='/admin/dashboard' />;
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
						<Google informParent={informParent} />

						<form onSubmit={clickSubmit}>
							<div className='form-group' style={{ marginTop: "25px" }}>
								<label htmlFor='email' style={{ fontWeight: "bold" }}>
									Email Address / Phone
								</label>
								<input
									type='text'
									name='email'
									value={email}
									onChange={handleChange("email")}
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
							}}>
							Don't have an account, Please{" "}
							<strong
								style={{
									textDecoration: "underline",
									fontStyle: "italic",
									fontSize: "1rem",
								}}>
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
							}}>
							Forgot Your Password, Please{" "}
							<strong
								style={{
									textDecoration: "underline",
									fontStyle: "italic",
									fontSize: "1rem",
								}}>
								<Link
									to='/auth/password/forgot'
									className='btn btn-sm btn-outline-danger'>
									Reset Your Password
								</Link>
							</strong>
						</p>
					</div>
				</div>
				<div
					className='col-md-5  SigninPic'
					style={{
						borderRadius: "20px",
						background: "rgba(0,0,0,0.3)",
						color: "black",
					}}>
					<h5 className='mt-3'>
						<Link to='/'>
							<h3
								className=''
								style={{
									fontWeight: "bold",
									fontFamily: "Brush Script MT, Brush Script Std, cursive",
									textDecoration: "underline",
									textAlign: "center",
								}}>
								Hair Salon Logo
							</h3>
						</Link>
					</h5>
					<div
						className='col-md-12'
						style={{ textAlign: "center", marginTop: "0%" }}>
						<h3>
							Login with{" "}
							<span
								style={{
									fontWeight: "bold",
									fontFamily: "Brush Script MT, Brush Script Std, cursive",
									textDecoration: "underline",
									textAlign: "center",
									color: "black",
								}}>
								Hair Salon
							</span>
						</h3>
						<p className='container'>
							When you Login with{" "}
							<span
								style={{
									fontWeight: "bold",
									fontFamily: "Brush Script MT, Brush Script Std, cursive",
									textDecoration: "underline",
									textAlign: "center",
									color: "black",
									fontSize: "1.3rem",
								}}>
								Stylist Shop Brand
							</span>
							, you will have the privilege of obtaining free shipping,
							discounts and free products!
							<br />
							Your sensitive data is safe with highly secured complicated tokens
							and servers, furthermore, your personal information{" "}
							<span style={{ fontWeight: "bold", textDecoration: "underline" }}>
								WILL NEVER
							</span>{" "}
							be shared.
						</p>

						<p className='container mt-3'>
							<span
								style={{
									fontWeight: "bold",
									fontFamily: "Brush Script MT, Brush Script Std, cursive",
									textDecoration: "underline",
									textAlign: "center",
									color: "black",
									fontSize: "1.3rem",
								}}>
								Stylist Shop Brand
							</span>{" "}
							is the way to uniqueness and modern fashion.
							<br /> Once you Login, you will be able to use our special program
							"Design It" which will allow you to add your preferred text to
							your loved ones or even photos from your design!{" "}
							<div className='mt-3'>
								Our{" "}
								<span
									style={{
										fontWeight: "bold",
										fontFamily: "Brush Script MT, Brush Script Std, cursive",
										textDecoration: "underline",
										textAlign: "center",
										color: "black",
										fontSize: "1.3rem",
									}}>
									Stylist Shop Brand
								</span>{" "}
								team will be always there for your comfort in case you need any
								advise whether at choosing items or even at designing your own
								unique items!
							</div>
							<div className='mt-2'>
								If you decided to design with us, Please be noted that
								<span
									style={{
										fontWeight: "bold",
										fontFamily: "Brush Script MT, Brush Script Std, cursive",
										textDecoration: "underline",
										textAlign: "center",
										color: "black",
										fontSize: "1.3rem",
									}}>
									Stylist Shop Brand
								</span>{" "}
								will always check the Copy Rights of any photo or even quote, if
								your design is Copy Righted, We will address this to you and
								give you advises.
							</div>
							<br />
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

export default Signin;

const FormSignin = styled.div`
	margin-top: 5%;
	margin-bottom: 95px;
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
