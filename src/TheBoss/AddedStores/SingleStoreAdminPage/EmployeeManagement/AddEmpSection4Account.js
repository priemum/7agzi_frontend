import React from "react";
import styled from "styled-components";

const AddEmpSection4Account = ({values, values2, setValues2}) => {
	const signUpForm = () => (
		<div className=' justify-content-md-center mt-2'>
			<div className='mb-3'>
				Please be noted that stylist account is optional.
				<br />
				When a stylist has an account, he/ she will be able to see their
				calendar, change their own working photos, working hours and days
			</div>

			<div>
				<div className='form-container text-center'>
					<h3 className='mb-3'>
						Stylist's Account <span className='text-primary'>Register</span>
					</h3>
					<form>
						<div className='form-group'>
							<label style={{fontWeight: "bold"}}>Full Name</label>
							<input
								type='text'
								name='name'
								value={values.employeeName}
								required
							/>
						</div>
						<div
							className='form-group '
							style={{
								marginTop: "25px",
							}}
						></div>
						<div className='form-group' style={{marginTop: "25px"}}>
							<label style={{fontWeight: "bold"}}>Phone #</label>
							<input
								type='text'
								name='email'
								value={values.employeePhone}
								required
							/>
						</div>

						<div className='form-group ' style={{marginTop: "25px"}}>
							<label style={{fontWeight: "bold"}}>Password</label>
							<input
								type='password'
								name='password'
								value={values2.password}
								onChange={(e) =>
									setValues2({...values2, password: e.target.value})
								}
								required
							/>
						</div>
						<div
							className='form-group'
							style={{marginTop: "25px", marginBottom: "40px"}}
						>
							<label style={{fontWeight: "bold"}}> Confirm Password</label>
							<input
								background='red'
								type='password'
								name='password2'
								value={values2.password2}
								onChange={(e) =>
									setValues2({...values2, password2: e.target.value})
								}
								required
							/>
						</div>
					</form>
					<hr />
				</div>
			</div>
		</div>
	);

	return (
		<AddEmpSection4AccountWrapper>
			<div>{signUpForm()}</div>
		</AddEmpSection4AccountWrapper>
	);
};

export default AddEmpSection4Account;

const AddEmpSection4AccountWrapper = styled.div`
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
