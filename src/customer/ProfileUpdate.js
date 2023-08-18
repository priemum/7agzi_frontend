/** @format */

import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";
// eslint-disable-next-line
import { toast } from "react-toastify";
import styled from "styled-components";

const ProfileUpdate = ({ userId }) => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: false,
		success: false,
	});

	const { token } = isAuthenticated();
	const { name, email, password, success, phone } = values;

	const init = (userId) => {
		// console.log(userId);
		read(userId, token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: true });
			} else {
				setValues({ ...values, name: data.name, email: data.email });
			}
		});
	};

	useEffect(() => {
		init(userId);
		// eslint-disable-next-line
	}, []);

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		update(userId, token, { name, email, password }).then((data) => {
			if (data.error) {
				// console.log(data.error);
				alert(data.error);
			} else {
				updateUser(data, () => {
					setValues({
						...values,
						name: data.name,
						email: data.email,
						success: true,
					});
				});
			}
		});
	};

	const redirectUser = (success) => {
		if (success) {
			return (window.location.href = "/dashboard");
		}
	};

	const profileUpdating = (name, email, phone, password) => (
		<form>
			<div className='form-group'>
				<label className=''>Name</label>
				<input
					type='text'
					onChange={handleChange("name")}
					className='form-control'
					value={name}
				/>
			</div>

			<div className='form-group'>
				<label className=''>Password</label>
				<input
					type='password'
					onChange={handleChange("password")}
					className='form-control'
					value={password}
					placeholder='update your password'
				/>
			</div>

			<button onClick={clickSubmit} className='btn btn-primary'>
				Update Profile
			</button>
		</form>
	);

	return (
		<ProfileUpdateWrapper>
			<div
				className='col-md-6 text-center mx-auto'
				style={{ marginBottom: "10px" }}
			>
				{profileUpdating(name, email, phone, password)}
				{redirectUser(success)}
			</div>
		</ProfileUpdateWrapper>
	);
};

export default ProfileUpdate;

const ProfileUpdateWrapper = styled.div`
	label {
		color: white;
		font-weight: bolder;
	}
`;
