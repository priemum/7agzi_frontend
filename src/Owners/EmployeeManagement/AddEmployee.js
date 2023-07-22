import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated, signup } from "../../auth";
import {
	cloudinaryUpload1,
	createEmployee,
	getEmployees,
	getPreviousScheduledHours,
	getServices,
} from "../apiOwner";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import axios from "axios";
import AddEmpSection1 from "./AddEmpSection1";
import AddEmpSection2 from "./AddEmpSection2";
import AddEmpSection3 from "./AddEmpSection3";
import AddEmpSection4Account from "./AddEmpSection4Account";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#2f71e7",
			fontWeight: "bold",
			borderRadius: "3px",
			fontSize: "1rem",
			textAlign: "center",
			padding: "5px",
			color: "white",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			backgroundColor: "white",
			padding: "5px",
			borderRadius: "3px",
			fontSize: "1rem",
			fontWeight: "bolder",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
		};
	}
};

const AddEmployee = ({ language }) => {
	const [clickedMenu, setClickedMenu] = useState("AddImagesAndName");

	const [values, setValues] = useState({
		employeeName: "",
		employeeNameOtherLanguage: "",
		employeeAddress: "",
		employeePhone: "",
		employeeWorkingAt: "",
		description: "",
		description1: "",
		description2: "",
		workingDays: [],
		workingHours: [],
		bookings: null,
		services: [{}],
		servicesForGender: "",
		activeEmployee: null,
		personalPhotos: [],
		workPhotos: [],
		employeeGender: "",
		belongsTo:
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id,
	});

	const [values2, setValues2] = useState({
		password: "",
		password2: "",
	});

	const [allServices, setAllServices] = useState([]);
	const [AllWorkingHours, setAllWorkingHours] = useState([]);
	const [loading, setLoading] = useState(true);
	const [allEmployees, setAllEmployees] = useState(true);

	const { user, token } = isAuthenticated();

	const [query, setQuery] = useState([]);
	const [query2, setQuery2] = useState([]);
	// const [query3, setQuery3] = useState([]);
	const [query4, setQuery4] = useState([]);

	const gettingAllEmployees = () => {
		getEmployees(user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllEmployees(data);
			}
		});
	};
	const allEmployeesPhones =
		allEmployees && allEmployees[0] && allEmployees.map((i) => i.employeePhone);

	const phoneAlreadyAdded =
		allEmployeesPhones && allEmployeesPhones.indexOf(values.employeePhone) >= 0;

	const handleQueryChange = (event) => {
		if (event.target.checked && !query.includes(event.target.value)) {
			setQuery([...query, event.target.value]);
			setValues({ ...values, workingDays: query });
		} else if (!event.target.checked && query.includes(event.target.value)) {
			setQuery(query.filter((q) => q !== event.target.value));
			setValues({ ...values, workingDays: query });
		}

		setValues({ ...values, workingDays: query });
	};

	useEffect(() => {
		setValues({ ...values, workingDays: query });
		gettingAllEmployees();
		// eslint-disable-next-line
	}, [query, values.workingDays]);

	const handleQueryChange_WorkingHours = (e) => {
		// console.log(e.target, "event.target");
		if (e.target.checked && !query4.includes(e.target.value)) {
			setQuery4([...query4, e.target.value]);
			setValues({ ...values, workingHours: query4 });
		} else if (!e.target.checked && query4.includes(e.target.value)) {
			setQuery4(query4.filter((q) => q !== e.target.value));
			setValues({ ...values, workingHours: query4 });
		}

		setValues({ ...values, workingHours: query4 });
	};

	useEffect(() => {
		setValues({ ...values, workingHours: query4 });
		// eslint-disable-next-line
	}, [query4, values.workingHours]);

	const handleQueryChange_Services = (event) => {
		if (event.target.checked && !query2.includes(event.target.value)) {
			setQuery2([...query2, event.target.value]);
			setValues({ ...values, services: query2 });
		} else if (!event.target.checked && query2.includes(event.target.value)) {
			setQuery2(query2.filter((q) => q !== event.target.value));
			setValues({ ...values, services: query2 });
		}

		setValues({ ...values, services: query2 });
	};

	useEffect(() => {
		setValues({ ...values, services: query2 });
		// eslint-disable-next-line
	}, [query2, values.services]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (phoneAlreadyAdded) {
			return toast.error(
				"Added Phone Number of the Stylist was already added before, Please try another Phone Number"
			);
		}
		if (values && values.workPhotos && values.workPhotos.length === 0) {
			return toast.error("Please add at least 1 working photo");
		}

		if (!values.employeeName) {
			return toast.error("Stylist Name is required");
		}

		if (!values.employeeNameOtherLanguage) {
			return toast.error("Stylist Name In Arabic is required");
		}

		if (!values.employeeGender) {
			return toast.error("Stylist Gender is required");
		}

		if (!values.employeePhone) {
			return toast.error("Stylist Phone is required");
		}

		if (values && values.workPhotos && values.workPhotos.length > 10) {
			return toast.error("At most 10 photos are allowed");
		}

		if (values && values.workingDays && values.workingDays.length === 0) {
			return toast.error("Please Select Stylist Working Days");
		}
		if (values && values.workingHours && values.workingHours.length === 0) {
			return toast.error("Please Select Stylist Working Hours");
		}
		if (values && values.services && values.services.length === 0) {
			return toast.error("Please Select Stylist Services he/she can perform");
		}

		createEmployee(user._id, token, values).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				toast.success("Stylist Was Successfully Added");
				// Creating An Account

				if (values2.password) {
					if (values2.password !== values2.password2) {
						setValues2({
							...values2,
							success: false,
							misMatch: true,
						});
						return (
							<React.Fragment>
								{toast.error("Passwords are not matchning")}
							</React.Fragment>
						);
					} else if (phoneAlreadyAdded) {
						return (
							<React.Fragment>
								{toast.error(
									"This user already have an account, Please go to the update Stylist page"
								)}
							</React.Fragment>
						);
					} else {
						setValues2({ ...values2, error: false, misMatch: false });
						signup({
							name: values.employeeName,
							email: values.employeePhone,
							phone: values.employeePhone,
							storeType: user.storeType,
							storeName: user.storeName,
							storeAddress: user.storeAddress,
							storeGovernorate: user.storeGovernorate,
							belongsTo: user._id,
							role: 2,
							password: values2.password,
							password2: values2.password2,
						}).then((data) => {
							if (data.error && values.role === 2) {
								console.log(data, "from if error");
								return toast.error("Stylist Already has an account");
							} else {
							}
						});
					}
				}

				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const handleChange = (name) => (e) => {
		const value = e.target.value;

		setValues({ ...values, [name]: value });
	};

	const gettingAllServices = () => {
		getServices(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllServices(
					data.filter((i) => i.activeService === true) &&
						data.filter((i) => i.activeService === true).map((ii) => ii)
				);
			}
		});
	};

	const gettingAllWorkingHours = () => {
		setLoading(true);
		getPreviousScheduledHours(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				// console.log(data, "data from API");
				var allAddedHours_Settings =
					data &&
					data[data.length - 1] &&
					data[data.length - 1].hoursCanBeScheduled.map(
						(workinghour) => workinghour
					);

				setAllWorkingHours(allAddedHours_Settings);

				setValues({ ...values, workingDays: allAddedHours_Settings });
				setQuery4(allAddedHours_Settings);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingAllServices();
		gettingAllWorkingHours();
		// eslint-disable-next-line
	}, []);

	const fileUploadAndResizeWorkPhotos = (e) => {
		let files = e.target.files;
		let allUploadedFiles = values.workPhotos;

		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 500 * 1024) {
					// file size is in bytes
					alert("File size should be less than 500kb");
					continue; // skip this file
				}

				Resizer.imageFileResizer(
					files[i],
					800,
					954,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setValues({ ...values, workPhotos: allUploadedFiles });
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

	const handleImageRemove = (public_id) => {
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				// eslint-disable-next-line
				const { workPhotos } = values.workPhotos;
				let filteredImages = values.workPhotos.filter((item) => {
					return item.public_id !== public_id;
				});
				setValues({ ...values, workPhotos: filteredImages });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<AddEmployeeWrapper>
			<div
				className='mt-3 p-4'
				style={{ border: "2px #0f377e solid", borderRadius: "20px" }}
			>
				<div className='row mx-auto mb-4'>
					<div
						style={isActive(clickedMenu, "AddImagesAndName")}
						className='col-md-3 menuItems'
						onClick={() => setClickedMenu("AddImagesAndName")}
					>
						<i className='fa-solid fa-address-book mr-1'></i>{" "}
						{language === "Arabic" ? "إضافة الصور والاسم" : "Add Images & Name"}
					</div>
					<div
						style={isActive(clickedMenu, "AboutEmployee")}
						className='col-md-3 menuItems'
						onClick={() => setClickedMenu("AboutEmployee")}
					>
						<i className='fa-solid fa-address-card mr-1'></i>{" "}
						{language === "Arabic" ? "عن الموظف" : "About Employee"}
					</div>
					<div
						style={isActive(clickedMenu, "WorkingDays")}
						className='col-md-3 menuItems'
						onClick={() => setClickedMenu("WorkingDays")}
					>
						<i className='fa-solid fa-calendar mr-1'></i>{" "}
						{language === "Arabic" ? "أيام وساعات العمل" : "Working Days/Hours"}
					</div>
					<div
						style={isActive(clickedMenu, "EmployeeAccount")}
						className='col-md-3 menuItems'
						onClick={() => setClickedMenu("EmployeeAccount")}
					>
						<i className='fa-solid fa-right-to-bracket mr-1'></i>{" "}
						{language === "Arabic" ? "حساب الموظف" : "Employee Account"}
					</div>
				</div>
				{clickedMenu === "AddImagesAndName" ? (
					<div>
						<AddEmpSection1
							addThumbnail={values.workPhotos}
							handleImageRemove={handleImageRemove}
							setAddThumbnail={setValues}
							fileUploadAndResizeThumbNail={fileUploadAndResizeWorkPhotos}
							values={values}
							setValues={setValues}
							language={language}
						/>
					</div>
				) : null}

				{clickedMenu === "AboutEmployee" ? (
					<div>
						<AddEmpSection2
							values={values}
							setValues={setValues}
							handleChange={handleChange}
							language={language}
						/>
					</div>
				) : null}

				{clickedMenu === "WorkingDays" ? (
					<div>
						<AddEmpSection3
							values={values}
							setValues={setValues}
							handleQueryChange={handleQueryChange}
							handleQueryChange_WorkingHours={handleQueryChange_WorkingHours}
							handleQueryChange_Services={handleQueryChange_Services}
							AllWorkingHours={AllWorkingHours}
							allServices={allServices}
							loading={loading}
							query={query}
							query2={query2}
							query4={query4}
							language={language}
						/>
					</div>
				) : null}

				{clickedMenu === "EmployeeAccount" ? (
					<div>
						<AddEmpSection4Account
							values={values}
							setValues2={setValues2}
							values2={values2}
							language={language}
						/>
					</div>
				) : null}

				<form onSubmit={handleSubmit}>
					{/* Working Days */}
					<hr />

					<div className='col-md-6 mx-auto'>
						<button
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
							className='btn btn-outline-primary mt-3 btn-block'
						>
							Add Stylist
						</button>
					</div>
				</form>
			</div>
		</AddEmployeeWrapper>
	);
};

export default AddEmployee;

const AddEmployeeWrapper = styled.div`
	//up right down left
	margin: 30px 140px 140px 140px;

	h3 {
		font-weight: bold;
		color: goldenrod;
	}

	@media (max-width: 1000px) {
		margin: 30px 5px 140px 5px !important;
	}
`;
