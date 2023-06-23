/** @format */

import React, { useState, useEffect, Fragment } from "react";
import { isAuthenticated } from "../auth";
import {
	getPreviousScheduledHoursStylist,
	updateEmployeeStylist,
	cloudinaryUploadStylist,
	getServicesStylist,
} from "./apiStylist";
import { Redirect } from "react-router-dom";
import { update, updateUser } from "../customer/apiUser";

// eslint-disable-next-line
import { toast } from "react-toastify";
// import StylistSideBar from "./StylistSideBar";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import StylistBackground from "./StylistMenu/StylistBackground";
import StylistSidebar from "./StylistMenu/StylistSidebar";
import { readByPhone } from "../apiCore";
import UpdateCredentials from "./ProfileContent/UpdateCredentials";
import UpdatePhotos from "./ProfileContent/UpdatePhotos";
import ServicesWorkingDays from "./ProfileContent/ServicesWorkingDays";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#0f377e",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "1.1rem",
			textAlign: "center",
			padding: "10px",
			color: "white",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			backgroundColor: "white",
			padding: "10px",
			borderRadius: "5px",
			fontSize: "1rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
			textDecoration: "underline",
		};
	}
};

const UpdateProfile = ({ match }) => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	const [clickedMenu, setClickedMenu] = useState("UpdateProfile");

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
	const [query, setQuery] = useState([]);
	const [query2, setQuery2] = useState([]);
	const [query3, setQuery3] = useState([]);

	const [employeeProfile, setEmployeeProfile] = useState({});
	const [AllWorkingHours, setAllWorkingHours] = useState([]);
	const [AllServices, setAllServices] = useState([]);
	const [loading, setLoading] = useState(true);

	const { token, user } = isAuthenticated();
	const { name, email, password, success } = values;

	const init = () => {
		setLoading(true);

		setValues({ ...values, name: user.name, email: user.email });

		readByPhone(user.phone).then((data1) => {
			if (data1.error) {
				console.log(data1.error);
			} else {
				setEmployeeProfile(data1);

				setQuery(data1.workingDays);

				setQuery2(data1.workingHours);

				setQuery3(data1.services);

				getPreviousScheduledHoursStylist(token, data1.belongsTo._id).then(
					(data3) => {
						setLoading(true);
						if (data3.error) {
							console.log(data3.error);
						} else {
							setAllWorkingHours(
								data3 &&
									data3[data3.length - 1] &&
									data3[data3.length - 1].hoursCanBeScheduled.map(
										(workinghour) => workinghour
									)
							);
							setLoading(false);
						}
					}
				);

				getServicesStylist(token, data1.belongsTo._id).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setAllServices(
							data.filter((i) => i.activeService === true) &&
								data.filter((i) => i.activeService === true)
						);
					}
				});
				setLoading(false);
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
		update(match.params.userId, token, { name, email, password }).then(
			(data) => {
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
			}
		);
	};

	const handleSubmitUpdate = (e) => {
		e.preventDefault();
		if (
			employeeProfile &&
			employeeProfile.workPhotos &&
			employeeProfile.workPhotos.length > 10
		) {
			return toast.error(
				"You can only upload 10 photos in the working photos section."
			);
		}

		if (
			employeeProfile &&
			employeeProfile.personalPhotos &&
			employeeProfile.personalPhotos.length > 10
		) {
			return toast.error(
				"You can only upload 10 photos in the personal photos section."
			);
		}

		var userId =
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;
		updateEmployeeStylist(
			employeeProfile && employeeProfile._id,
			userId,
			token,
			{
				employee: employeeProfile,
			}
		).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				toast.success("Your Profile Was Successfully Updated");
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const redirectUser = (success) => {
		if (success) {
			return <Redirect to='/stylist/dashboard' />;
		}
	};

	const handleQueryChange = (event) => {
		if (event.target.checked && !query.includes(event.target.value)) {
			setQuery([...query, event.target.value]);
			setEmployeeProfile({ ...employeeProfile, workingDays: query });
		} else if (!event.target.checked && query.includes(event.target.value)) {
			setQuery(query.filter((q) => q !== event.target.value));
			setEmployeeProfile({ ...employeeProfile, workingDays: query });
		}

		setEmployeeProfile({ ...employeeProfile, workingDays: query });
	};

	useEffect(() => {
		setEmployeeProfile({ ...employeeProfile, workingDays: query });
		// eslint-disable-next-line
	}, [query, employeeProfile.workingDays]);

	const handleQueryChange_WorkingHours = (e) => {
		if (e.target.checked && !query2.includes(e.target.value)) {
			setQuery2([...query2, e.target.value]);
			setEmployeeProfile({ ...employeeProfile, workingHours: query2 });
		} else if (!e.target.checked && query2.includes(e.target.value)) {
			setQuery2(query2.filter((q) => q !== e.target.value));
			setEmployeeProfile({ ...employeeProfile, workingHours: query2 });
		}

		setEmployeeProfile({ ...employeeProfile, workingHours: query2 });
	};

	useEffect(() => {
		setEmployeeProfile({ ...employeeProfile, workingHours: query2 });
		// eslint-disable-next-line
	}, [query2, employeeProfile.workinghours]);

	const handleQueryChange_Services = (event) => {
		if (event.target.checked && !query3.includes(event.target.value)) {
			setQuery3([...query3, event.target.value]);
			setEmployeeProfile({ ...employeeProfile, services: query3 });
		} else if (!event.target.checked && query3.includes(event.target.value)) {
			setQuery3(query3.filter((q) => q !== event.target.value));
			setEmployeeProfile({ ...employeeProfile, services: query3 });
		}

		setEmployeeProfile({ ...employeeProfile, services: query3 });
	};

	useEffect(() => {
		setEmployeeProfile({ ...employeeProfile, services: query3 });
		// eslint-disable-next-line
	}, [query3, employeeProfile.services]);

	////
	var userId =
		isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;

	const fileUploadAndResizeWorkPhotos = (e) => {
		// console.log(e.target.files);

		let files = e.target.files;
		let allUploadedFiles = employeeProfile.workPhotos;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 500 * 1024) {
					// file size is in bytes
					alert("File size should be less than 500kb");
					continue; // skip this file
				}
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUploadStylist(userId, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setEmployeeProfile({
									...employeeProfile,
									images: allUploadedFiles,
								});
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64"
				);
			}
		}
	};

	const fileUploadAndResizePersonalPhotos = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = employeeProfile.personalPhotos;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUploadStylist(userId, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setEmployeeProfile({
									...employeeProfile,
									images: allUploadedFiles,
								});
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64"
				);
			}
		}
	};

	// eslint-disable-next-line
	const FileUploadPersonal = () => {
		return (
			<React.Fragment>
				<label
					className='btn btn-info btn-raised'
					style={{ cursor: "pointer", fontSize: "0.80rem" }}
				>
					Upload Updated Stylist Personal Photos
					<input
						type='file'
						multiple
						hidden
						accept='images/*'
						onChange={fileUploadAndResizePersonalPhotos}
						required
					/>
				</label>
			</React.Fragment>
		);
	};
	const FileUploadWork = () => {
		return (
			<React.Fragment>
				<label
					className='btn btn-info btn-raised'
					style={{ cursor: "pointer", fontSize: "0.80rem" }}
				>
					Upload Updated Stylist Work Photos
					<input
						type='file'
						multiple
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeWorkPhotos}
						required
					/>
				</label>
			</React.Fragment>
		);
	};

	const handleImageRemovePersonalPhotos = (public_id) => {
		setLoading(true);
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/stylist/removeimage/${userId}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setLoading(false);
				const { personalPhotos } = employeeProfile;
				let filteredImages = personalPhotos.filter((item) => {
					return item.public_id !== public_id;
				});
				setEmployeeProfile({
					...employeeProfile,
					personalPhotos: filteredImages,
				});
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	const handleImageRemoveWorkingPhotos = (public_id) => {
		setLoading(true);
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/stylist/removeimage/${userId}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setLoading(false);
				const { workPhotos } = employeeProfile;
				let filteredImages = workPhotos.filter((item) => {
					return item.public_id !== public_id;
				});
				setEmployeeProfile({ ...employeeProfile, workPhotos: filteredImages });
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	return (
		<Fragment>
			{click2 && clickMenu2 ? (
				<StylistBackground
					setClick2={setClick2}
					setClickMenu2={setClickMenu2}
				/>
			) : null}
			<div className='mx-auto'>
				<StylistSidebar
					click2={click2}
					setClick2={setClick2}
					clickMenu2={clickMenu2}
					setClickMenu2={setClickMenu2}
				/>
			</div>

			<div className='col-md-11 mx-auto' style={{ marginBottom: "330px" }}>
				<div className='container-fluid col-lg-10 mx-auto text-center'>
					<div className='row text-center ml-5 my-5'>
						<div
							style={isActive(clickedMenu, "UpdateProfile")}
							className='col-md-4 menuItems mx-auto text-center'
							onClick={() => setClickedMenu("UpdateProfile")}
						>
							<i className='fa-brands fa-servicestack mr-1'></i> Update Profile
						</div>
						<div
							style={isActive(clickedMenu, "UpdatePictures")}
							className='col-md-4 menuItems mx-auto text-center'
							onClick={() => setClickedMenu("UpdatePictures")}
						>
							<i className='fa-solid fa-pen mr-1'></i> Update Pictures
						</div>
						<div
							style={isActive(clickedMenu, "WorkingHours")}
							className='col-md-4 menuItems mx-auto text-center'
							onClick={() => setClickedMenu("WorkingHours")}
						>
							<i className='fa-solid fa-table mr-1'></i> Update Working days/
							hours
						</div>
					</div>
				</div>
				{clickedMenu === "UpdateProfile" ? (
					<div className='col-md-6 text-center mx-auto'>
						<UpdateCredentials
							name={name}
							email={email}
							password={password}
							handleChange={handleChange}
							clickSubmit={clickSubmit}
						/>
						{redirectUser(success)}
					</div>
				) : null}

				<br />
				<hr />
				{loading ? (
					<div>Loading...</div>
				) : (
					<React.Fragment>
						{clickedMenu === "UpdatePictures" ? (
							<UpdatePhotos
								employeeProfile={employeeProfile}
								handleImageRemovePersonalPhotos={
									handleImageRemovePersonalPhotos
								}
								handleImageRemoveWorkingPhotos={handleImageRemoveWorkingPhotos}
								FileUploadWork={FileUploadWork}
								setEmployeeProfile={setEmployeeProfile}
							/>
						) : null}

						{clickedMenu === "WorkingHours" ? (
							<ServicesWorkingDays
								AllWorkingHours={AllWorkingHours}
								AllServices={AllServices}
								handleQueryChange={handleQueryChange}
								handleQueryChange_WorkingHours={handleQueryChange_WorkingHours}
								handleQueryChange_Services={handleQueryChange_Services}
								loading={loading}
								employeeProfile={employeeProfile}
							/>
						) : null}

						<div
							className='col-md-9 mx-auto my-2 '
							onClick={handleSubmitUpdate}
						>
							<button
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								className='btn btn-outline-primary my-2 '
								style={{ fontSize: "1.2rem", fontWeight: "bold" }}
							>
								UPDATE YOUR PROFILE
							</button>
						</div>
						<hr />
					</React.Fragment>
				)}
			</div>
		</Fragment>
	);
};

export default UpdateProfile;
