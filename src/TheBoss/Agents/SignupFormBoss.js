import React from "react";
import styled from "styled-components";

const SignupFormBoss = ({values2, setValues2, handleSubmit, fromPage}) => {
	const signUpForm = () => (
		<div className=' justify-content-md-center mt-2'>
			<div>
				<div className='form-container text-center'>
					<h3 className='mb-3'>
						Agent's Account{" "}
						<span className='text-primary'>
							{fromPage === "Update" ? "Update" : "Register"}{" "}
						</span>
					</h3>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label style={{fontWeight: "bold"}}>Full Name</label>
							<input
								type='text'
								name='name'
								value={values2.name}
								onChange={(e) => setValues2({...values2, name: e.target.value})}
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
								value={values2.email}
								onChange={(e) =>
									setValues2({
										...values2,
										email: e.target.value,
										phone: e.target.value,
									})
								}
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
						<div className='col-md-6 mx-auto'>
							<button className='btn btn-primary btn-block'>
								{fromPage === "Update"
									? "Update Agent Account"
									: "Create Agent Account"}
							</button>
						</div>
					</form>
					<hr />
				</div>
			</div>
		</div>
	);

	return (
		<SignupFormBossWrapper>
			<div>{signUpForm()}</div>
		</SignupFormBossWrapper>
	);
};

export default SignupFormBoss;

const SignupFormBossWrapper = styled.div`
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
