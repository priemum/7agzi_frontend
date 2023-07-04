import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import {
	cairoDistricts,
	EgyptGovernorate,
	alexandriaDistricts,
	cloudinaryAgentUpload,
} from "../apiCore";
import { ToastContainer, toast } from "react-toastify";
import { authenticate, isAuthenticated, signin, signup } from "../auth";
import AgentsSignupFormComp from "../components/SignupComp/AgentsSignupFormComp";
import axios from "axios";
import Resizer from "react-image-file-resizer";

const AgentsSignupForm = ({ language }) => {
	const [nextClicked, setNextClicked] = useState(0);
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		phone: "",
		error: "",
		storeType: "No Store",
		storeName: "No Store",
		storeAddress: "No Store",
		storeGovernorate: "No Store",
		storeCountry: "No Store",
		storeDistrict: "No Store",
		agent: "agent",
		roleDescription: "agent",
		success: false,
		redirectToReferrer: "",
		agentOtherData: {
			phone2: null,
			agentAddress: null,
			agentCountry: null,
			agentGovernorate: null,
			agentDistrict: null,
			agentNationalIdNumber: null,
			instagramLink: null,
			fbLink: null,
			idImage: [],
			personalImage: [],
		},
		loading: false,
		loading2: false,
	});

	const {
		name,
		email,
		password,
		// eslint-disable-next-line
		success,
		phone,
		agent,
		password2,
		storeType,
		storeName,
		storeDistrict,
		storeAddress,
		storeGovernorate,
		storeCountry,
		redirectToReferrer,
		roleDescription,
		// eslint-disable-next-line
		loading,
	} = values;

	const { user } = isAuthenticated();
	const handleChange = (name) => (event) => {
		let value = event.target.value;
		if (name === "phone") {
			value = value.replace(/\s/g, ""); // Remove spaces only for the phone field
		}

		setValues({
			...values,
			error: false,
			[name]: value,
		});
	};

	const clickSubmit = (event) => {
		event.preventDefault();

		if (!name) {
			return toast.info("Name is required");
		}
		if (!email) {
			return toast.info("email is required");
		}
		if (!password) {
			return toast.info("password is required");
		}
		if (!password2) {
			return toast.info("password2 is required");
		}
		if (!storeAddress) {
			return toast.info("Store Address is required");
		}

		if (!storeType) {
			return toast.info("Store Type is required");
		}

		if (!storeGovernorate) {
			return toast.info("Store Governorate is required");
		}

		if (!storeName) {
			return toast.info("Store Name is required");
		}

		if (!storeCountry) {
			return toast.info("Store Country Is Required");
		}

		if (!storeDistrict) {
			return toast.info("District is Required");
		}

		if (password !== password2) {
			return toast.info("Passwords don't match");
		}

		if (!values.agentOtherData.agentNationalIdNumber) {
			return toast.info("ID # is required");
		}

		setValues({ ...values, error: false });
		signup({
			name,
			email,
			phone,
			password,
			storeType,
			storeName,
			storeAddress,
			storeGovernorate,
			storeCountry,
			storeDistrict,
			agent,
			role: 2000,
			roleDescription: roleDescription,
			agentOtherData: values.agentOtherData,
			activeUser: true,
			activeAgent: false,
			subscribed: false,
		}).then((data1) => {
			if (data1.error) {
				console.log(data1.error, "data1.error");
				setValues({ ...values, success: false });
				return toast.error(data1.error);
			} else
				signin({ email, password }).then((data) => {
					if (data.error) {
						setValues({ ...values, loading: false });
					} else {
						authenticate(data, () => {
							setValues({
								...values,
								redirectToReferrer: true,
							});
						});
					}
				});
		});
	};

	const redirectUser = () => {
		if (redirectToReferrer) {
			if (user && user.role === 1) {
				return <Redirect to='/admin/dashboard' />;
			} else if (user && user.role === 1000) {
				return <Redirect to='/store/admin/dashboard' />;
			} else if (user && user.role === 2000) {
				return <Redirect to='/agent/dashboard' />;
			} else {
				return <Redirect to='/schedule' />;
			}
		}
		if (isAuthenticated()) {
			return <Redirect to='/' />;
		}
	};

	const countryList = ["Egypt", "Kuwait", "UAE", "United States"];

	const fileUploadAndResizeStoreThumbnail = (e) => {
		// console.log(e.target.files);
		setValues({ ...values, loading: true });
		let files = e.target.files;
		console.log(files);
		let allUploadedFiles = values.agentOtherData.idImage;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 500 * 1024) {
					// file size is in bytes
					setValues({ ...values, loading: false });
					alert("File size should be less than 500kb");
					continue; // skip this file
				}
				Resizer.imageFileResizer(
					files[i],
					800,
					954,
					"PNG",
					100,
					0,
					(uri) => {
						cloudinaryAgentUpload({ image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setValues({
									...values,
									agentOtherData: {
										...values.agentOtherData,
										idImage: allUploadedFiles,
									},
								});
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64"
				);
			}
			// setValues({ ...values, loading: false });
		}
	};

	const handleImageRemove2 = (public_id) => {
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/remove/agent/idupload`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${"token"}`,
					},
				}
			)
			.then((res) => {
				setValues({
					...values,
					agentOtherData: {
						...values.agentOtherData,
						idImage: [],
					},
				});
			})
			.catch((err) => {
				console.log(err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	//Personal Photo
	const fileUploadAndResizeStoreThumbnail2 = (e) => {
		// console.log(e.target.files);
		setValues({ ...values, loading2: true });
		let files = e.target.files;

		let allUploadedFiles = values.agentOtherData.personalImage;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 500 * 1024) {
					// file size is in bytes
					setValues({ ...values, loading2: false });
					alert("File size should be less than 500kb");

					continue; // skip this file
				}
				Resizer.imageFileResizer(
					files[i],
					800,
					954,
					"PNG",
					100,
					0,
					(uri) => {
						cloudinaryAgentUpload({ image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setValues({
									...values,
									agentOtherData: {
										...values.agentOtherData,
										personalImage: allUploadedFiles,
									},
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

	const handleImageRemovePersonal = (public_id) => {
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/remove/agent/idupload`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${"token"}`,
					},
				}
			)
			.then((res) => {
				setValues({
					...values,
					agentOtherData: {
						...values.agentOtherData,
						personalImage: [],
					},
				});
			})
			.catch((err) => {
				console.log(err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const signUpForm = () => (
		<AgentsSignupFormComp
			values={values}
			setValues={setValues}
			clickSubmit={clickSubmit}
			handleChange={handleChange}
			countryList={countryList}
			cairoDistricts={cairoDistricts}
			alexandriaDistricts={alexandriaDistricts}
			name={name}
			email={email}
			phone={phone}
			storeName={storeName}
			EgyptGovernorate={EgyptGovernorate}
			storeGovernorate={storeGovernorate}
			storeAddress={storeAddress}
			password={password}
			password2={password2}
			nextClicked={nextClicked}
			setNextClicked={setNextClicked}
			language={language}
			handleImageRemove2={handleImageRemove2}
			fileUploadAndResizeStoreThumbnail={fileUploadAndResizeStoreThumbnail}
			handleImageRemovePersonal={handleImageRemovePersonal}
			fileUploadAndResizeStoreThumbnail2={fileUploadAndResizeStoreThumbnail2}
		/>
	);

	return (
		<AgentsSignupFormWrapper>
			<ToastContainer />
			{signUpForm()}
			{redirectUser()}
		</AgentsSignupFormWrapper>
	);
};

export default AgentsSignupForm;

const AgentsSignupFormWrapper = styled.div`
	overflow: hidden;
	min-height: 820px;
`;
