/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { cloudinaryUpload1, createEmployee } from "../../../apiOwner";
import ImageCard from "./ImageCard";
import { isAuthenticated } from "../../../../auth";
import AddingWorkingHours from "./AddingWorkingHours";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import { toast } from "react-toastify";

const AddEmployeeModal = ({
	modalVisible,
	setModalVisible,
	language,
	lastAddedSettings,
	allWorkingHours,
	allServices,
}) => {
	const [loading, setLoading] = useState(false);
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
		activeEmployee: true,
		personalPhotos: [],
		workPhotos: [],
		employeeGender: "",
		belongsTo:
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id,
	});
	const [query, setQuery] = useState([]);
	const [query2, setQuery2] = useState([]);

	const { user, token } = isAuthenticated();

	const fileUploadAndResizeWorkPhotos = (e) => {
		let files = e.target.files;
		let allUploadedFiles = values.workPhotos;
		setLoading(true);
		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 2048 * 1024) {
					// file size is in bytes
					setLoading(false);

					alert("File size should be less than 2MB");
					continue; // skip this file
				}

				Resizer.imageFileResizer(
					files[i],
					800,
					954,
					"AUTO",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);
								setLoading(false);

								setValues({ ...values, workPhotos: allUploadedFiles });
							})
							.catch((err) => {
								setLoading(false);

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
		// eslint-disable-next-line
	}, [query, values.workingDays]);

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

	const createNewEmployee = () => {
		if (values && values.workPhotos && values.workPhotos.length === 0) {
			return toast.error("Please add at least 1 working photo");
		}

		if (!values.employeeName) {
			return toast.error("Stylist Name is required");
		}

		if (!values.employeeNameOtherLanguage) {
			return toast.error("Stylist Name In Arabic is required");
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
				setModalVisible(false);
				setTimeout(function () {
					window.location.reload(false);
				}, 2000);
			}
		});
	};

	return (
		<EditBannerWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<Modal
				width='100%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}
					>
						{language === "Arabic" ? "أضف الموظفين" : `Add New Employee`}
					</div>
				}
				open={modalVisible}
				onOk={() => {
					setModalVisible(false);
				}}
				okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setModalVisible(false);
				}}
			>
				<div
					dir={language === "Arabic" ? "rtl" : "ltr"}
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					{language === "Arabic" ? (
						<div>
							<h5 style={{ fontWeight: "bold", color: "darkred" }}>
								<strong> ملاحظات مهمة جدا:</strong>
							</h5>
							<ul style={{ fontSize: "1rem" }}>
								<li>كل موظف يمثل كرسي في صالونك.</li>
								<li>
									يمكنك إضافة أي اسم للموظف (ليس من الضروري إضافة الاسم الحقيقي
									للموظف ولكن يُفضل).
								</li>
								<li>يُفضل إضافة صور عمل الموظف للترويج لصالونك.</li>
								<li>
									إذا كان لديك 6 كراسي في الصالون، فيُفضل إضافة 5 موظفين فقط
									هنا.
								</li>
								<li>
									يمكنك دائمًا إضافة أي صور متاحة لصالونك في حالة عدم وجود صور
									عمل ستايلست .
								</li>
							</ul>
						</div>
					) : (
						<div>
							<h5>Very Important Notes:</h5>
							<ul>
								<li>Each Employee Represents A Chair In Your Salon.</li>
								<li>
									You Can Add Any Name For The Employee (You don't have to add
									the employee real name but recommended).
								</li>
								<li>
									It is recommended to add employee working photos to promote
									your salon.
								</li>
								<li>
									If your salon has 6 chairs, then it is recommended to add only
									5 employees here.
								</li>
							</ul>
						</div>
					)}

					<div className='col-md-6'>
						<ImageCard
							addThumbnail={values.workPhotos}
							handleImageRemove={handleImageRemove}
							setAddThumbnail={setValues}
							fileUploadAndResizeThumbNail={fileUploadAndResizeWorkPhotos}
							language={language}
							loading={loading}
						/>
					</div>
					<div className='my-3'>
						<label style={{ fontSize: "1rem" }}>
							{language === "Arabic" ? "اسم الموظف" : "Employee Name"}
						</label>
						<input
							className='form-control'
							type='text'
							placeholder={
								language === "Arabic"
									? "أدخل اسم الموظف بالكامل"
									: "Fill In Stylist Full Name"
							}
							value={values.employeeName}
							onChange={(e) => {
								setValues({
									...values,
									employeeName: e.target.value,
									employeeNameOtherLanguage: e.target.value,
									employeeGender:
										lastAddedSettings &&
										lastAddedSettings.belongsTo &&
										lastAddedSettings.belongsTo.storeType === "barber shop"
											? "male"
											: "female",
								});
							}}
						/>
					</div>
					<div
						className='w-100 my-3'
						dir={language === "Arabic" ? "rtl" : "ltr"}
					>
						<label style={{ fontSize: "1rem" }}>
							{language === "Arabic"
								? "يرجى تحديد أيام العمل للموظف"
								: "Please Select Working Days"}
						</label>
						<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
							<label htmlFor='one' className='block '>
								<input
									type='checkbox'
									id='one'
									onChange={(e) => {
										handleQueryChange(e);
										ReactGA.event(`Account_Added_Working_Days_Saturday`, {
											event_category: "Account_Added_Working_Days_Saturday",
											event_label: "Account_Added_Working_Days_Saturday",
											value: 0, // Optional extra parameters
										});

										ReactPixel.track("Account_Added_Working_Days_Saturday", {
											content_name: "Account_Added_Working_Days_Saturday",
											content_category: "Account_Added_Working_Days_Saturday",
											value: "",
											currency: "",
										});
									}}
									value='Saturday'
									className='mr-3 ml-1 my-2'
									checked={query && query.indexOf("Saturday") !== -1}
								/>
								{language === "Arabic" ? "السبت" : "Saturday"}
							</label>
							<label htmlFor='two' className='block'>
								<input
									type='checkbox'
									id='two'
									onChange={(e) => {
										handleQueryChange(e);
										ReactGA.event(`Account_Added_Working_Days_Sunday`, {
											event_category: "Account_Added_Working_Days_Sunday",
											event_label: "Account_Added_Working_Days_Sunday",
											value: 0, // Optional extra parameters
										});

										ReactPixel.track("Account_Added_Working_Days_Sunday", {
											content_name: "Account_Added_Working_Days_Sunday",
											content_category: "Account_Added_Working_Days_Sunday",
											value: "",
											currency: "",
										});
									}}
									value='Sunday'
									className='mr-3 ml-1 my-2'
									checked={query && query.indexOf("Sunday") !== -1}
								/>
								{language === "Arabic" ? "الأحد" : "Sunday"}
							</label>
							<label htmlFor='three' className='block'>
								<input
									type='checkbox'
									id='three'
									onChange={(e) => {
										handleQueryChange(e);
										ReactGA.event(`Account_Added_Working_Days_Monday`, {
											event_category: "Account_Added_Working_Days_Monday",
											event_label: "Account_Added_Working_Days_Monday",
											value: 0, // Optional extra parameters
										});

										ReactPixel.track("Account_Added_Working_Days_Monday", {
											content_name: "Account_Added_Working_Days_Monday",
											content_category: "Account_Added_Working_Days_Monday",
											value: "",
											currency: "",
										});
									}}
									value='Monday'
									className='mr-3 ml-1 my-2'
									checked={query && query.indexOf("Monday") !== -1}
								/>
								{language === "Arabic" ? "الاثنين" : "Monday"}
							</label>
							<label htmlFor='four' className='block'>
								<input
									type='checkbox'
									id='four'
									onChange={handleQueryChange}
									value='Tuesday'
									className='mr-3 ml-1 my-2'
									checked={query && query.indexOf("Tuesday") !== -1}
								/>
								{language === "Arabic" ? "الثلاثاء" : "Tuesday"}
							</label>
							<label htmlFor='five' className='block'>
								<input
									type='checkbox'
									id='five'
									onChange={handleQueryChange}
									value='Wednesday'
									className='mr-3 ml-1 my-2'
									checked={query && query.indexOf("Wednesday") !== -1}
								/>
								{language === "Arabic" ? "الأربعاء" : "Wednesday"}
							</label>
							<label htmlFor='six' className='block'>
								<input
									type='checkbox'
									id='six'
									onChange={handleQueryChange}
									value='Thursday'
									className='mr-3 ml-1 my-2'
									checked={query && query.indexOf("Thursday") !== -1}
								/>
								{language === "Arabic" ? "الخميس" : "Thursday"}
							</label>
							<label htmlFor='seven' className='block'>
								<input
									type='checkbox'
									id='seven'
									onChange={handleQueryChange}
									value='Friday'
									className='mr-3 ml-1 my-2'
									checked={query && query.indexOf("Friday") !== -1}
								/>
								{language === "Arabic" ? "الجمعة" : "Friday"}
							</label>
						</div>
					</div>
					<div>
						<AddingWorkingHours
							allWorkingHours={allWorkingHours}
							values={values}
							setValues={setValues}
							language={language}
						/>
					</div>
					<div className='my-3'>
						{language === "Arabic" ? (
							<label style={{ fontSize: "1rem" }}>
								يرجى اختيار الخدمات التي يمكن أن يقوم بها الستايلست
							</label>
						) : (
							<label>Please Select Services Stylist Can do</label>
						)}
						<div className='w-100'>
							<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
								{allServices &&
									allServices.map((s, i) => {
										return (
											<span key={i} className='m-1 p-1'>
												<label
													htmlFor={i}
													className='block '
													style={{ fontSize: "1rem" }}
												>
													<input
														type='checkbox'
														id={i}
														onChange={handleQueryChange_Services}
														value={s._id}
														className='m-1'
														checked={query2 && query2.indexOf(s._id) !== -1}
													/>
													<span style={{ textTransform: "capitalize" }}>
														{language === "Arabic"
															? `
												  ${s.serviceNameOtherLanguage}`
															: ` ${s.serviceName}`}
													</span>
												</label>
											</span>
										);
									})}
							</div>
						</div>
					</div>
					<div className='my-5 text-center'>
						<button
							className='btn btn-success'
							style={{ fontSize: "1.1rem" }}
							onClick={() => {
								createNewEmployee();
								ReactGA.event(`Account_Added_Employee_Successfully`, {
									event_category: "Account_Added_Employee_Successfully",
									event_label: "Account_Added_Employee_Successfully",
									value: 0, // Optional extra parameters
								});

								ReactPixel.track("Account_Added_Employee_Successfully", {
									content_name: "Account_Added_Employee_Successfully",
									content_category: "Account_Added_Employee_Successfully",
									value: "",
									currency: "",
								});
							}}
						>
							{" "}
							<strong>
								{language === "Arabic" ? "أضف الستايلست" : "Add New Stylist"}{" "}
							</strong>
						</button>
					</div>
				</div>
			</Modal>
		</EditBannerWrapper>
	);
};

export default AddEmployeeModal;

const EditBannerWrapper = styled.div`
	z-index: 19000 !important;
`;
