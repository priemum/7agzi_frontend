import React from "react";
import styled from "styled-components";

const UpdateEmpSection4Account = ({values, values2, setValues2}) => {
	const signUpForm = () => (
		<div className=' justify-content-md-center mt-2'>
			<div>
				<div className='form-container text-center'>
					<h3 className='mb-3'>
						Stylist's Account <span className='text-primary'>Update</span>
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
								value={values2 ? values2.password : null}
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
								value={values2 ? values2.password2 : null}
								onChange={(e) =>
									setValues2({...values2, password2: e.target.value})
								}
								required
							/>
						</div>
						<div
							className='form-group'
							style={{marginTop: "25px", marginBottom: "40px"}}
						>
							<label style={{fontWeight: "bold"}}>Active Employee?</label>
							<select
								onChange={(e) =>
									setValues2({...values2, activeUser: e.target.value})
								}
								className='form-control'
								style={{fontSize: "0.85rem"}}
							>
								<option>Please select / Required*</option>
								<option value='0'>Deactivate Employee</option>
								<option value='1'>Activate Employee</option>
							</select>
						</div>
					</form>
					<hr />
				</div>
			</div>
		</div>
	);

	return (
		<UpdateEmpSection4AccountWrapper>
			<div>{signUpForm()}</div>
		</UpdateEmpSection4AccountWrapper>
	);
};

export default UpdateEmpSection4Account;

const UpdateEmpSection4AccountWrapper = styled.div`
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

		.form-container {
			margin-left: 5px;
			margin-right: 5px;
		}
	}
`;
