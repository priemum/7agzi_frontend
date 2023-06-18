/** @format */

import React, {useState, useEffect, Fragment} from "react";
import {isAuthenticated} from "../auth";
import {Redirect} from "react-router-dom";
import {read, update, updateUser} from "./apiUser";
// eslint-disable-next-line
import {toast} from "react-toastify";
import Usersidebar from "./UserSidebar/Usersidebar";
import UserDarkBackground from "./UserSidebar/UserDarkBackground";

const ProfileUpdate = ({match}) => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: false,
		success: false,
	});

	const {token} = isAuthenticated();
	const {name, email, password, success} = values;

	const init = (userId) => {
		// console.log(userId);
		read(userId, token).then((data) => {
			if (data.error) {
				setValues({...values, error: true});
			} else {
				setValues({...values, name: data.name, email: data.email});
			}
		});
	};

	useEffect(() => {
		init(match.params.userId);
		// eslint-disable-next-line
	}, []);

	const handleChange = (name) => (e) => {
		setValues({...values, error: false, [name]: e.target.value});
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		update(match.params.userId, token, {name, email, password}).then((data) => {
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
			return <Redirect to='/dashboard' />;
		}
	};

	const profileUpdating = (name, email, password) => (
		<form style={{marginTop: "5%"}}>
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
							(Please Check With Your Admin To Change Your Phone)
						</span>{" "}
					</label>
					<input
						onChange={handleChange("")}
						type='number'
						className='form-control'
						placeholder='Please check with your admin to change your phone (Digits Only)'
						value={email}
					/>
				</div>
			) : (
				<div className='form-group'>
					<label className='text-muted'>Phone</label>
					<input
						type='number'
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
					placeholder='update your password'
				/>
			</div>

			<button onClick={clickSubmit} className='btn btn-primary'>
				Submit
			</button>
		</form>
	);

	return (
		<Fragment>
			{click2 && clickMenu2 ? (
				<UserDarkBackground
					setClick2={setClick2}
					setClickMenu2={setClickMenu2}
				/>
			) : null}
			<div className='mx-auto'>
				<Usersidebar
					click2={click2}
					setClick2={setClick2}
					clickMenu2={clickMenu2}
					setClickMenu2={setClickMenu2}
				/>
			</div>
			<div
				className='col-md-6 text-center mx-auto'
				style={{marginBottom: "290px"}}
			>
				{profileUpdating(name, email, password)}
				{redirectUser(success)}
			</div>
		</Fragment>
	);
};

export default ProfileUpdate;
