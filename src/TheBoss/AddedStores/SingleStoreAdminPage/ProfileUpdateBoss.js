/** @format */

import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import AdminNavbar from "./OwnerNavbar/AdminNavbar";
import { readOwnerAccount, updateOwnerAccount } from "../../apiBoss";
// eslint-disable-next-line
import { toast } from "react-toastify";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";

const ProfileUpdateBoss = () => {
	let { ownerId } = useParams();
	let location = useLocation();

	useEffect(() => {
		// Log the path of the current URL
		console.log(location.pathname);
		// Log the ownerId
		console.log(ownerId);
	}, [location, ownerId]);

	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: false,
		success: false,
	});

	const { token } = isAuthenticated();
	const { name, email, password, phone } = values;

	const init = () => {
		readOwnerAccount(ownerId, token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: true });
			} else {
				console.log(data, "Data");
				setValues({
					...values,
					name: data.name,
					email: data.email,
					phone: data.phone,
				});
			}
		});
	};

	useEffect(() => {
		init();
		// eslint-disable-next-line
	}, []);

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();

		// Check if the password is updated and if so, validate it
		if (password) {
			// Check if the password is at least 6 characters long
			if (password.length < 6) {
				return toast.error("Password should be 6 characters or more");
			}

			// Check if the password has at least one digit
			const hasDigit = /\d/.test(password);
			if (!hasDigit) {
				return toast.error("Password should include at least one number");
			}
		}

		updateOwnerAccount(ownerId, token, {
			name,
			email,
			phone,
			password,
		}).then((data) => {
			if (data.error) {
				// console.log(data.error);
				alert(data.error);
			} else {
				toast.success("Account Was Successfully Updated");
			}
		});
	};

	const profileUpdating = (name, email, password) => (
		<form style={{ marginTop: "5%" }}>
			<h3
				className='my-4'
				style={{
					textDecoration: "underline",
					fontStyle: "italic",
					color: "black",
					fontWeight: "bolder",
				}}
			>
				Profile update
			</h3>
			<div className='form-group'>
				<label className='text-muted'> Name</label>
				<input
					type='text'
					onChange={handleChange("name")}
					className='form-control text-center'
					value={name}
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Phone</label>
				<input
					type='text'
					onChange={handleChange("phone")}
					className='form-control text-center'
					value={phone}
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Email</label>
				<input
					type='text'
					onChange={handleChange("email")}
					className='form-control text-center'
					value={email}
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>New Password</label>
				<input
					type='password'
					onChange={handleChange("password")}
					className='form-control text-center'
					value={password}
					placeholder='update your password'
				/>
			</div>

			<button onClick={clickSubmit} className='btn btn-primary'>
				Submit
			</button>
		</form>
	);

	return (
		<ProfileUpdateOwnerWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='UpdateProfile'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div>
					<div className='container'>
						<div
							className='text-center'
							style={{ marginBottom: "290px", marginTop: "50px" }}
						>
							{profileUpdating(name, email, password)}
						</div>
					</div>
				</div>
			</div>
		</ProfileUpdateOwnerWrapper>
	);
};

export default ProfileUpdateBoss;

const ProfileUpdateOwnerWrapper = styled.div`
	min-height: 1000px;
	.grid-container {
		display: grid;
		grid-template-columns: 12% 84%;
	}

	.container {
		margin-top: 50px;
		margin-bottom: 20px;
	}

	h3 {
		font-weight: bold;
		color: goldenrod;
	}

	@media (max-width: 1000px) {
		.grid-container {
			display: grid;
			grid-template-columns: 1% 99%;
		}
	}
`;
