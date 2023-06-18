import React from "react";
import styled from "styled-components";
import {isAuthenticated} from "../../auth";

const UpdateCredentials = ({
	name,
	email,
	password,
	handleChange,
	clickSubmit,
}) => {
	const profileUpdating = (name, email, password) => (
		<form style={{marginTop: "1%"}}>
			<h3
				className='my-4'
				style={{
					textDecoration: "underline",
					fontStyle: "italic",
				}}
			>
				Profile update
			</h3>
			<div className='form-group'>
				<label className='text-muted'>Name</label>
				<input
					type='text'
					onChange={handleChange("name")}
					className='form-control'
					value={name}
				/>
			</div>
			{(isAuthenticated() &&
				isAuthenticated().user &&
				isAuthenticated().user.role === 2) ||
			isAuthenticated().user.role === 1 ? (
				<div className='form-group'>
					<label className='text-muted'>
						Phone{" "}
						<span style={{color: "red", fontSize: "12px"}}>
							(Please Check With Your Admin To Change Your Email / Phone)
						</span>{" "}
					</label>
					<input
						onChange={handleChange("")}
						// type='email'
						className='form-control'
						placeholder='Please check with your admin to change your email/phone'
						value={email}
					/>
				</div>
			) : (
				<div className='form-group'>
					<label className='text-muted'>Email / Phone</label>
					<input
						// type='email'
						onChange={handleChange("email")}
						className='form-control'
						value={email}
					/>
				</div>
			)}
			<div className='form-group'>
				<label className='text-muted'>Password</label>
				<input
					type='password'
					onChange={handleChange("password")}
					className='form-control'
					value={password}
				/>
			</div>

			<button onClick={clickSubmit} className='btn btn-primary'>
				Submit
			</button>
		</form>
	);

	return (
		<UpdateCredentialsWrapper>
			{profileUpdating(name, email, password)}
		</UpdateCredentialsWrapper>
	);
};

export default UpdateCredentials;

const UpdateCredentialsWrapper = styled.div``;
