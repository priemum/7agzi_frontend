/** @format */

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import axios from "axios";
import { cloudinaryUpload1, updateEmployee } from "../../../apiOwner";
import ImageCard from "./ImageCard";
import Resizer from "react-image-file-resizer";
import { isAuthenticated } from "../../../../auth";
import AddingWorkingHours from "./AddingWorkingHours";
import { toast } from "react-toastify";

const EditEmployeeModal = ({
	modalVisible,
	setModalVisible,
	language,
	pickedEmployee,
	setPickedEmployee,
	allWorkingHours,
	employeeServices,
	allServices,
}) => {
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState(pickedEmployee.workingDays);
	const [query2, setQuery2] = useState([]);

	useEffect(() => {
		setQuery(pickedEmployee.workingDays);
		setQuery2(employeeServices.map((i) => i._id));
		// eslint-disable-next-line
	}, []);

	const { user, token } = isAuthenticated();

	const fileUploadAndResizeWorkPhotos = (e) => {
		let files = e.target.files;
		let allUploadedFiles = pickedEmployee.workPhotos;
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

								setPickedEmployee({
									...pickedEmployee,
									workPhotos: allUploadedFiles,
								});
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
				const { workPhotos } = pickedEmployee.workPhotos;
				let filteredImages = pickedEmployee.workPhotos.filter((item) => {
					return item.public_id !== public_id;
				});
				setPickedEmployee({ ...pickedEmployee, workPhotos: filteredImages });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleQueryChange = (event) => {
		if (event.target.checked && !query.includes(event.target.value)) {
			setQuery([...query, event.target.value]);
			setPickedEmployee({ ...pickedEmployee, workingDays: query });
		} else if (!event.target.checked && query.includes(event.target.value)) {
			setQuery(query.filter((q) => q !== event.target.value));
			setPickedEmployee({ ...pickedEmployee, workingDays: query });
		}

		setPickedEmployee({ ...pickedEmployee, workingDays: query });
	};

	useEffect(() => {
		if (isMounted.current) {
			// Check if it's not the first render
			setPickedEmployee({ ...pickedEmployee, workingDays: query });
		} else {
			isMounted.current = true; // Set the reference to true after the first render
		}
		// eslint-disable-next-line
	}, [query, pickedEmployee.workingDays, modalVisible]);

	const handleQueryChange_Services = (event) => {
		if (event.target.checked && !query2.includes(event.target.value)) {
			setQuery2([...query2, event.target.value]);
			setPickedEmployee({ ...pickedEmployee, services: query2 });
		} else if (!event.target.checked && query2.includes(event.target.value)) {
			setQuery2(query2.filter((q) => q !== event.target.value));
			setPickedEmployee({ ...pickedEmployee, services: query2 });
		}

		setPickedEmployee({ ...pickedEmployee, services: query2 });
	};

	useEffect(() => {
		if (isMounted.current) {
			// Check if it's not the first render
			setPickedEmployee({ ...pickedEmployee, services: query2 });
		} else {
			isMounted.current = true; // Set the reference to true after the first render
		}
		// eslint-disable-next-line
	}, [query2, pickedEmployee.services, modalVisible]);

	const handleSubmit = (e) => {
		if (
			pickedEmployee &&
			pickedEmployee.workPhotos &&
			pickedEmployee.workPhotos.length === 0
		) {
			return toast.error("Please add at least 1 working photo");
		}

		if (!pickedEmployee.employeeName) {
			return toast.error("Stylist Name is required");
		}

		if (!pickedEmployee.employeeNameOtherLanguage) {
			return toast.error("Stylist Name In Arabic is required");
		}

		if (
			pickedEmployee &&
			pickedEmployee.workPhotos &&
			pickedEmployee.workPhotos.length > 10
		) {
			return toast.error("At most 10 photos are allowed");
		}

		if (
			pickedEmployee &&
			pickedEmployee.workingDays &&
			pickedEmployee.workingDays.length === 0
		) {
			return toast.error("Please Select Stylist Working Days");
		}
		if (
			pickedEmployee &&
			pickedEmployee.workingHours &&
			pickedEmployee.workingHours.length === 0
		) {
			return toast.error("Please Select Stylist Working Hours");
		}
		if (
			pickedEmployee &&
			pickedEmployee.services &&
			pickedEmployee.services.length === 0
		) {
			return toast.error("Please Select Stylist Services he/she can perform");
		}

		updateEmployee(pickedEmployee._id, user._id, token, {
			employee: pickedEmployee,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				toast.success("Stylist Was Successfully Updated");
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
						{language === "Arabic"
							? `Update ${pickedEmployee.employeeName}`
							: `Update ${pickedEmployee.employeeName}`}
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
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
					dir={language === "Arabic" ? "rtl" : "ltr"}
				>
					<div className='col-md-6'>
						<ImageCard
							addThumbnail={pickedEmployee.workPhotos}
							handleImageRemove={handleImageRemove}
							setAddThumbnail={setPickedEmployee}
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
							value={pickedEmployee.employeeName}
							onChange={(e) => {
								setPickedEmployee({
									...pickedEmployee,
									employeeName: e.target.value,
									employeeNameOtherLanguage: e.target.value,
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
									onChange={() => {
										handleQueryChange();
										ReactGA.event(`Account_Updated_Working_Days_Saturday`, {
											event_category: "Account_Updated_Working_Days_Saturday",
											event_label: "Account_Updated_Working_Days_Saturday",
											value: 0, // Optional extra parameters
										});

										ReactPixel.track("Account_Updated_Working_Days_Saturday", {
											content_name: "Account_Updated_Working_Days_Saturday",
											content_category: "Account_Updated_Working_Days_Saturday",
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
									onChange={() => {
										handleQueryChange();
										ReactGA.event(`Account_Updated_Working_Days_Sunday`, {
											event_category: "Account_Updated_Working_Days_Sunday",
											event_label: "Account_Updated_Working_Days_Sunday",
											value: 0, // Optional extra parameters
										});

										ReactPixel.track("Account_Updated_Working_Days_Sunday", {
											content_name: "Account_Updated_Working_Days_Sunday",
											content_category: "Account_Updated_Working_Days_Sunday",
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
									onChange={() => {
										handleQueryChange();
										ReactGA.event(`Account_Updated_Working_Days_Monday`, {
											event_category: "Account_Updated_Working_Days_Monday",
											event_label: "Account_Updated_Working_Days_Monday",
											value: 0, // Optional extra parameters
										});

										ReactPixel.track("Account_Updated_Working_Days_Monday", {
											content_name: "Account_Updated_Working_Days_Monday",
											content_category: "Account_Updated_Working_Days_Monday",
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
							values={pickedEmployee}
							setValues={setPickedEmployee}
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
					<div className='mx-auto text-center'>
						<button
							className='btn btn-success'
							onClick={() => {
								handleSubmit();
								ReactGA.event(`Account_Updated_Stylist_Successfully`, {
									event_category: "Account_Updated_Stylist_Successfully",
									event_label: "Account_Updated_Stylist_Successfully",
									value: 0, // Optional extra parameters
								});

								ReactPixel.track("Account_Updated_Stylist_Successfully", {
									content_name: "Account_Updated_Stylist_Successfully",
									content_category: "Account_Updated_Stylist_Successfully",
									value: "",
									currency: "",
								});
							}}
						>
							Update Stylist
						</button>
					</div>
				</div>
			</Modal>
		</EditBannerWrapper>
	);
};

export default EditEmployeeModal;

const EditBannerWrapper = styled.div`
	z-index: 18000 !important;
`;
