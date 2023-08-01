import React, { useState } from "react";
import styled from "styled-components";
import { isAuthenticated, signup } from "../auth";
import { toast } from "react-toastify";

const POSAccount = () => {
	const [values, setValues] = useState({
		name: "",
		phone: "",
		email: "",
		password: "",
		role: 3,
		password2: "",
		belongsTo:
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id,
	});

	const { user } = isAuthenticated();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (values.password) {
			if (values.password !== values.password2) {
				setValues({
					...values,
					success: false,
					misMatch: true,
				});
				return (
					<React.Fragment>
						{toast.error("Passwords are not matchning")}
					</React.Fragment>
				);
			} else {
				setValues({ ...values, error: false, misMatch: false });
				signup({
					name: values.name,
					email: values.phone,
					phone: values.phone,
					storeType: user.storeType,
					storeName: user.storeName,
					storeAddress: user.storeAddress,
					storeGovernorate: user.storeGovernorate,
					storeCountry: user.storeCountry,
					belongsTo: user._id,
					role: 3,
					password: values.password,
					password2: values.password2,
				}).then((data) => {
					if (data.error && values.role === 3) {
						console.log(data, "from if error");
						return toast.error("Account already exist");
					} else {
						toast.success("POS Account was successfully added");

						setTimeout(function () {
							window.location.reload(false);
						}, 2500);
					}
				});
			}
		}
	};

	const signUpForm = () => (
		<div className=' justify-content-md-center mt-2 col-md-6 mx-auto'>
			<div className='mb-3'>
				This account will be only dedicated in your Salon/ Shop
				<br />
				It is recommended to give the email/ phone of this account to a manager
				not to anyone else
			</div>

			<div>
				<div className='form-container text-center'>
					<h3 className='mb-3'>
						In Store/ POS Account <span className='text-primary'>Register</span>
					</h3>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label style={{ fontWeight: "bold" }}>Full Name</label>
							<input
								onChange={(e) => setValues({ ...values, name: e.target.value })}
								type='text'
								name='name'
								value={values.name}
								required
							/>
						</div>
						<div
							className='form-group '
							style={{
								marginTop: "25px",
							}}
						></div>
						<div className='form-group' style={{ marginTop: "25px" }}>
							<label style={{ fontWeight: "bold" }}>Phone #/ Email</label>
							<input
								onChange={(e) =>
									setValues({
										...values,
										email: e.target.value,
										phone: e.target.value,
									})
								}
								type='text'
								name='email'
								value={values.email}
								required
							/>
						</div>

						<div className='form-group ' style={{ marginTop: "25px" }}>
							<label style={{ fontWeight: "bold" }}>Password</label>
							<input
								type='password'
								name='password'
								value={values.password}
								onChange={(e) =>
									setValues({ ...values, password: e.target.value })
								}
								required
							/>
						</div>
						<div
							className='form-group'
							style={{ marginTop: "25px", marginBottom: "40px" }}
						>
							<label style={{ fontWeight: "bold" }}> Confirm Password</label>
							<input
								background='red'
								type='password'
								name='password2'
								value={values.password2}
								onChange={(e) =>
									setValues({ ...values, password2: e.target.value })
								}
								required
							/>
						</div>

						<div className='col-md-6 mx-auto'>
							<button
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								className='btn btn-outline-primary mt-3 btn-block'
							>
								ADD POS ACCOUNT
							</button>
						</div>
					</form>
					<hr />
				</div>
			</div>
		</div>
	);

	return <POSAccountWrapper>{signUpForm()}</POSAccountWrapper>;
};

export default POSAccount;

const POSAccountWrapper = styled.div`
	margin: 0px 200px;
	background-color: white;
	padding: 10px;

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

	@media (max-width: 1000px) {
		margin: 0px 10px;
	}
`;
