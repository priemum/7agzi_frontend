/** @format */

import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import {
	readOwnerAccount,
	updateOwnerAccount,
	updateUser,
} from "../TheBoss/apiBoss";
// eslint-disable-next-line
import { toast } from "react-toastify";
import OwnerNavmenu from "./NewOwnerNavMenu/OwnerNavmenu";
import { useCartContext } from "../sidebar_context";
import styled from "styled-components";

const ProfileUpdateOwner = ({ match }) => {
	const { chosenLanguage } = useCartContext();

	const [collapseMenu, setCollapseMenu] = useState(false);
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: false,
		success: false,
	});

	const { user, token } = isAuthenticated();
	const { name, email, password, success, phone } = values;

	const init = (userId) => {
		// console.log(userId);
		readOwnerAccount(userId, token).then((data) => {
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
		init(match.params.userId);
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

		updateOwnerAccount(match.params.userId, token, {
			name,
			email,
			phone,
			password,
			storeName: user.storeName,
		}).then((data) => {
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
			return <Redirect to='/store/book-appointment-from-store' />;
		}
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
				<label className='text-muted'>
					{" "}
					{chosenLanguage === "Arabic" ? "الاسم" : "Name"}
				</label>
				<input
					type='text'
					onChange={handleChange("name")}
					className='form-control text-center'
					value={name}
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>
					{chosenLanguage === "Arabic" ? "الهاتف" : "Phone"}
				</label>
				<input
					type='text'
					onChange={handleChange("phone")}
					className='form-control text-center'
					value={phone}
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>
					{chosenLanguage === "Arabic" ? "البريد الإلكتروني" : "Email"}
				</label>
				<input
					type='text'
					onChange={handleChange("email")}
					className='form-control text-center'
					value={email}
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>
					{chosenLanguage === "Arabic" ? "كلمة مرور جديدة" : "Password"}
				</label>
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
		<ProfileUpdateOwnerWrapper
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			show={collapseMenu}
		>
			<div
				className={
					chosenLanguage === "Arabic"
						? "grid-container-arabic"
						: "grid-container"
				}
			>
				<div className='menuWrapper'>
					<div
						className='iconMenu'
						onClick={() => {
							setCollapseMenu(!collapseMenu);
						}}
					>
						<i className='fa-solid fa-bars'></i>
					</div>

					<OwnerNavmenu
						language={chosenLanguage}
						fromPage='ProfileUpdate'
						collapseMenu={collapseMenu}
					/>
				</div>

				<div
					className='text-center'
					style={{ marginBottom: "290px", marginTop: "50px" }}
				>
					{profileUpdating(name, email, password)}
					{redirectUser(success)}
				</div>
			</div>
		</ProfileUpdateOwnerWrapper>
	);
};

export default ProfileUpdateOwner;

const ProfileUpdateOwnerWrapper = styled.div`
	min-height: 1200px;
	form {
		margin-top: 200px;
	}
	.grid-container {
		display: grid;
		/* grid-template-columns: 5% 95%; */
		grid-template-columns: ${(props) => (props.show ? "5% 95%" : "5% 95%")};
	}

	.grid-container-arabic {
		display: grid;
		grid-template-columns: 5% 95%;
	}

	.container-fluid {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.remainingDays {
		/* background-color: darkred; */
		/* padding: 0.1px; */
		/* border-radius: 5px; */
		font-size: 0.9rem;
		font-weight: bold;
		/* text-align: center; */
		/* cursor: pointer; */
		/* transition: var(--mainTransition); */
		color: white;
	}

	.trialPeriod {
		display: none;
	}

	.menuWrapper {
		background-color: ${(props) => (props.show ? "" : "black")};
		min-height: 1200px;
		overflow: auto;
	}
	.iconMenu {
		display: none;
	}

	@media (max-width: 1000px) {
		.grid-container {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) => (props.show ? "3% 97%" : "18% 82%")};
		}
		.grid-container-arabic {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) => (props.show ? "3% 97%" : "18% 82%")};
		}

		.menuItems {
			font-size: 12px !important;
			margin: auto !important;
		}

		.iconMenu {
			display: block;
			color: ${(props) => (props.show ? "black" : "white")};
			position: ${(props) => (props.show ? "absolute" : "")};
			text-align: right;
			font-size: 20px;
			margin-right: ${(props) => (props.show ? "10px" : "5px")};
		}

		a {
			font-size: 13px;
			text-align: center;
		}

		.container-fluid > div {
			text-align: center;
			margin-left: 0px !important;
		}

		.container-fluid {
			margin-left: 0px !important;
			margin-top: 80px !important;
			text-align: center;
		}

		.dashboardLinks {
			font-size: 0.75rem !important;
		}
	}

	@media (max-width: 1100px) {
		.trialPeriod {
			display: block;
			margin-left: 50px !important;
			margin-top: 15px !important;
			margin-bottom: 20px !important;
			font-weight: bolder;
			font-size: 1.1rem;
		}
	}
`;
