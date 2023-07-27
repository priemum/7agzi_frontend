/** @format */

import React, { useState, Fragment, useEffect } from "react";
// import { Link } from "react-router-dom";
import { createService, getServices } from "../apiOwner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuthenticated } from "../../../auth";
import styled from "styled-components";
import { Select } from "antd";

const AddService = ({ language, ownerId }) => {
	const [serviceName, setServiceName] = useState("");
	const [serviceNameOtherLanguage, setServiceNameOtherLanguage] = useState("");
	const [customerType, setCustomerType] = useState("");
	const [customerTypeOtherLanguage, setCustomerTypeOtherLanguage] =
		useState("");
	const [customServicePicked, setCustomServicePicked] = useState(false);
	const [bundleService, setBundleService] = useState(false);

	const [serviceType, setServiceType] = useState("Package Service");
	const [servicePrice, setServicePrice] = useState("");
	const [servicePriceDiscount, setServicePriceDiscount] = useState("");
	const [serviceTime, setServiceTime] = useState("");
	const [serviceLoyaltyPoints, setServiceLoyaltyPoints] = useState("");
	const [allServices, setAllServices] = useState([]);
	const [serviceDescription, setServiceDescription] = useState("");
	const [serviceDescriptionOtherLanguage, setServiceDescriptionOtherLanguage] =
		useState("");
	const [catchyPhrase, setCatchyPhrase] = useState("");
	const [catchyPhraseOtherLanguage, setCatchyPhraseOtherLanguage] =
		useState("");
	const [serviceDescriptionCombined, setServiceDescriptionCombined] = useState(
		[]
	);
	const [
		serviceDescriptionCombinedOtherLanguage,
		setServiceDescriptionCombinedOtherLanguage,
	] = useState([]);
	const [allServicesDetails, setAllServicesDetails] = useState([]);
	const [bundleServicesAdded, setBundleServicesAdded] = useState([]);

	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);

	// destructure user and token from localstorage

	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	const handleChange = (event) => {
		const service = JSON.parse(event.target.value);

		if (service.english === "Custom Service") {
			setCustomServicePicked(true);
			setBundleService(false);
		} else if (service.english === "Bundle Service") {
			setBundleService(true);
			setCustomServicePicked(false);
		} else {
			setCustomServicePicked(false);
			setBundleService(false);
			setServiceName(service.english);
			setServiceNameOtherLanguage(service.arabic);
		}
	};

	const handleChange2 = (e) => {
		setError("");
		setServicePrice(e.target.value);
	};

	const handleChange3 = (e) => {
		setError("");
		setServiceTime(e.target.value);
	};
	const handleChange4 = (e) => {
		setError("");
		setServiceLoyaltyPoints(e.target.value);
	};

	const handleChange5 = (event) => {
		const type = JSON.parse(event.target.value);
		setCustomerType(type.english);
		setCustomerTypeOtherLanguage(type.arabic);
	};

	const handleChange8 = (e) => {
		setError("");
		setServiceDescription(e.target.value);
	};

	const handleChange9 = (e) => {
		setError("");
		setServicePriceDiscount(e.target.value);
	};

	const handleChange10 = (e) => {
		setError("");
		setCatchyPhrase(e.target.value);
	};

	const handleChange13 = (e) => {
		setError("");
		setServiceDescriptionOtherLanguage(e.target.value);
	};

	const handleChange14 = (e) => {
		setError("");
		setCatchyPhraseOtherLanguage(e.target.value);
	};

	const pushToServiceDescription = (e) => {
		e.preventDefault();
		setServiceDescriptionCombined([
			...serviceDescriptionCombined,
			serviceDescription,
		]);
		setServiceDescription("");
	};

	const pushToServiceDescriptionOtherLanguage = (e) => {
		e.preventDefault();
		setServiceDescriptionCombinedOtherLanguage([
			...serviceDescriptionCombinedOtherLanguage,
			serviceDescriptionOtherLanguage,
		]);
		setServiceDescriptionOtherLanguage("");
	};

	const gettingAllServices = () => {
		getServices(token, ownerId).then((data) => {
			if (data && data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllServices(
					data &&
						data.map(
							(serviceNames) =>
								serviceNames.serviceName.toLowerCase() +
								serviceNames.customerType.toLowerCase()
						)
				);
				setAllServicesDetails(data);
			}
		});
	};

	useEffect(() => {
		gettingAllServices();
		// eslint-disable-next-line
	}, [servicePrice, serviceName, serviceLoyaltyPoints]);

	let matchingServiceName =
		allServices &&
		allServices.indexOf(
			serviceName.toLowerCase() + customerType.toLowerCase()
		) !== -1;

	const clickSubmit = (e) => {
		e.preventDefault();
		if (matchingServiceName) {
			return toast.error("This service was added before.");
		}

		if (Number(servicePrice) < Number(servicePriceDiscount)) {
			return toast.error("Please make sure to adjust the prices properly");
		}

		if (!serviceName) {
			return toast.error("Service Name Required");
		}

		if (!customerType) {
			return toast.error("Service For Is Required");
		}

		if (!serviceNameOtherLanguage) {
			return toast.error("Service Name In Arabic Required");
		}

		if (serviceName === "Custom Service") {
			return toast.error("Please Add Your Custom Service");
		}

		var words = catchyPhrase.split(" ");
		if (words.length > 10) {
			return toast.error("Catchy Phrase Should be 10 words or less.");
		}

		setError("");
		setSuccess(false);
		// make request to api to create service
		createService(ownerId, token, {
			serviceName,
			serviceNameOtherLanguage,
			customerType,
			customerTypeOtherLanguage,
			servicePrice,
			servicePriceDiscount,
			serviceTime,
			serviceLoyaltyPoints,
			serviceType,
			serviceDescription: serviceDescriptionCombined,
			serviceDescriptionOtherLanguage: serviceDescriptionCombinedOtherLanguage,
			belongsTo: ownerId,
			catchyPhrase: catchyPhrase,
			catchyPhraseOtherLanguage: catchyPhraseOtherLanguage,
			bundleService: bundleService,
			bundleServicesAdded: bundleServicesAdded,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				toast.success("Service was successfully Added.");
				setError("");
				setTimeout(function () {
					setServicePrice("");
					setServicePriceDiscount("");
					setServiceTime("");
					setServiceLoyaltyPoints("");
					setCatchyPhrase("");
					setServiceDescription([]);
					setServiceDescriptionCombined([]);
					setBundleServicesAdded([]);
				}, 2000);
			}
		});
	};

	var possibleServices = [
		{ english: "Custom Service", arabic: "Custom Service" },
		{ english: "Bundle Service", arabic: "خدمة الباقة" },
		{ english: "Haircut", arabic: "قص الشعر" },
		{ english: "Hair Styling", arabic: "تصفيف الشعر" },
		{ english: "Hair Coloring", arabic: "صبغ الشعر" },
		{ english: "Highlights/Lowlights", arabic: "الإبراز / الظلال" },
		{ english: "Deep Conditioning Treatments", arabic: "علاجات ترطيب الشعر" },
		{ english: "Perm", arabic: "الشعر الدائم" },
		{ english: "Relaxer", arabic: "مسترخي الشعر" },
		{ english: "Hair Straightening", arabic: "فرد الشعر" },
		{ english: "Hair Extensions", arabic: "امتدادات الشعر" },
		{ english: "Beard Trimming", arabic: "تقليم اللحية" },
		{ english: "Shaving", arabic: "الحلاقة" },
		{ english: "Facial Treatments", arabic: "العلاجات الوجهية" },
		{ english: "Scalp Treatments", arabic: "العلاجات فروة الرأس" },
		{ english: "Manicure", arabic: "المانيكير" },
		{ english: "Pedicure", arabic: "الباديكير" },
		{ english: "Waxing", arabic: "الشمع" },
		{ english: "Threading", arabic: "الخياطة" },
		{ english: "Bridal Hair Styling", arabic: "تصفيف شعر العروس" },
		{ english: "Makeup services", arabic: "خدمات المكياج" },
	];

	var customerTypes = [
		{ english: "Please Select", arabic: "الرجاء الاختيار" },
		{ english: "Male", arabic: "ذكر" },
		{ english: "Female", arabic: "أنثى" },
		{
			english: "Boys",
			arabic: "الأولاد",
		},
		{
			english: "Girls",
			arabic: "البنات)",
		},
	];

	const individualServices =
		allServicesDetails &&
		allServicesDetails.filter((i) => i.bundleService === false);

	// Handle the onChange event to update the state with the selected options
	const handleSelectChange = (selectedServiceNames) => {
		const selectedServices = individualServices.filter((service) =>
			selectedServiceNames.includes(service.serviceName)
		);
		setBundleServicesAdded(selectedServices);
	};

	const newServiceForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='row'>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>
						{language === "Arabic" ? "الخدمة لـ" : "Service For"}
					</label>
					<select
						className='form-control'
						value={JSON.stringify({
							english: customerType,
							arabic: customerTypeOtherLanguage,
						})}
						onChange={handleChange5}
					>
						{customerTypes.map((type, index) => (
							<option key={index} value={JSON.stringify(type)}>
								{type.english} {index === 0 ? null : " | " + type.arabic}
							</option>
						))}
					</select>
				</div>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>
						{language === "Arabic" ? "اسم الخدمة" : "Service Name"}
					</label>
					<select
						className='form-control'
						value={JSON.stringify({
							english: serviceName,
							arabic: serviceNameOtherLanguage,
						})}
						onChange={handleChange}
					>
						<option value=''>
							{language === "Arabic" ? "اختر خدمة" : "Select a service"}
						</option>
						{possibleServices.map((service, index) => (
							<option key={index} value={JSON.stringify(service)}>
								{service.english} / {service.arabic}
							</option>
						))}
					</select>
				</div>
				{customServicePicked || bundleService ? (
					<>
						<div className='form-group col-md-6 mx-auto'>
							<label className='text-muted'>
								{bundleService
									? language === "Arabic"
										? "اسم الحزمة"
										: "Bundle Service Name"
									: language === "Arabic"
									? "اسم الخدمة المخصصة"
									: "Custom Service Name"}
							</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setServiceName(e.target.value)}
								value={serviceName}
								placeholder={
									language === "Arabic"
										? "إضافة خدمة مخصصة"
										: "Add Custom Service"
								}
								required
							/>
						</div>
						<div className='form-group col-md-6 mx-auto'>
							<label className='text-muted'>
								{bundleService
									? language === "Arabic"
										? "اسم الحزمة (بالعربية)"
										: "Bundle Service Name (Arabic)"
									: language === "Arabic"
									? "اسم الخدمة المخصصة (بالعربية)"
									: "Custom Service Name (Arabic)"}
							</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setServiceNameOtherLanguage(e.target.value)}
								value={serviceNameOtherLanguage}
								placeholder={
									language === "Arabic"
										? "إضافة اسم خدمة مخصصة باللغة العربية"
										: "Add Custom Service Name In Arabic"
								}
								required
							/>
						</div>

						{bundleService ? (
							<div className='form-group mx-auto col-md-12 w-100 py-2'>
								<label className='text-muted'>Add Set Of Services</label>
								<Select
									mode='multiple'
									placeholder='Select services'
									style={{ width: "100%" }}
									onChange={handleSelectChange}
									value={
										bundleServicesAdded &&
										bundleServicesAdded.map((service) => service.serviceName)
									}
								>
									{individualServices.map((service) => (
										<Select.Option key={service.id} value={service.serviceName}>
											{service.serviceName}
										</Select.Option>
									))}
								</Select>
							</div>
						) : null}
					</>
				) : null}

				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>
						{language === "Arabic" ? "سعر الخدمة" : "Service Price"}
					</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange2}
						value={servicePrice}
						placeholder={
							language === "Arabic"
								? "يجب أن تكون أرقام فقط"
								: "Should be digits only"
						}
						required
					/>
				</div>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>
						{language === "Arabic"
							? "سعر الخدمة بعد الخصم"
							: "Service Price After Discount"}
					</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange9}
						value={servicePriceDiscount}
						placeholder={
							language === "Arabic"
								? "يجب أن تكون أرقام فقط"
								: "Should be digits only"
						}
						required
					/>
				</div>
				<div className='form-group col-md-8 mx-auto'>
					<label className='text-muted'>
						{language === "Arabic"
							? "عبارة جذابة لهذه الخدمة (10 كلمات)"
							: "Catchy Phrase For This Service (10 words)"}
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange10}
						value={catchyPhrase}
						placeholder={
							language === "Arabic"
								? "على سبيل المثال: لأول مرة ، خصم 20٪ على قص الشعر الخاص بك اليوم!"
								: "e.g. For the first, 20% off your haircut today!"
						}
						// required
					/>
				</div>
				<div className='form-group col-md-8 mx-auto'>
					<label className='text-muted'>
						{language === "Arabic"
							? "عبارة جذابة لهذه الخدمة باللغة العربية (10 كلمات)"
							: "Catchy Phrase For This Service Arabic (10 words)"}
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange14}
						value={catchyPhraseOtherLanguage}
						placeholder={
							language === "Arabic"
								? "على سبيل المثال: لأول مرة ، خصم 20٪ على قص الشعر الخاص بك اليوم!"
								: "e.g. For the first, 20% off your haircut today!"
						}
						// required
					/>
				</div>
			</div>

			{!bundleService ? (
				<div className='row'>
					<div className='col-md-6 mx-auto'>
						<div>
							{serviceDescriptionCombined &&
								serviceDescriptionCombined.length > 0 && (
									<Fragment>
										{language === "Arabic"
											? "الوصف المضاف:"
											: "Added Descriptions:"}
										<ul>
											{serviceDescriptionCombined &&
												serviceDescriptionCombined.map((i, e) => (
													<li
														style={{
															listStyle: "none",
															marginLeft: "20px",
															fontSize: "12px",
														}}
														key={e}
													>
														<button
															type='button'
															onClick={() => {
																var array =
																	serviceDescriptionCombined &&
																	serviceDescriptionCombined.filter(function (
																		s
																	) {
																		return s !== i;
																	});
																setServiceDescriptionCombined(array);
															}}
															style={{
																color: "white",
																background: "black",
																fontSize: "15px",
																borderRadius: "15px",
																marginRight: "10px",
															}}
															aria-label='Close'
														>
															<span aria-hidden='true'>&times;</span>
														</button>
														{i}
													</li>
												))}
										</ul>
									</Fragment>
								)}
						</div>
						<label className='text-muted'>
							{language === "Arabic"
								? `إضافة مجموعة من الخدمات المرتبطة بـ "${serviceName}"`
								: `Add set of services connected to "${serviceName}"`}
						</label>
						<input
							type='text'
							className='form-control'
							onChange={handleChange8}
							value={serviceDescription}
							placeholder={
								language === "Arabic"
									? "وصف الخدمة"
									: "Description of the service"
							}
						/>
						<div className='row'>
							<button
								style={{ fontSize: "12px" }}
								onClick={pushToServiceDescription}
								className='btn btn-outline-info col-md-5  text-center mx-auto my-2'
							>
								{language === "Arabic"
									? "إضافة وصف الخدمة."
									: "Add Service Description."}
							</button>
							<button
								style={{ fontSize: "12px" }}
								onClick={() => {
									setServiceDescriptionCombined([]);
									setServiceType("Please select / Required*");
								}}
								className='btn btn-outline-danger col-md-5  text-center mx-auto my-2'
							>
								{language === "Arabic"
									? "مسح مجموعة الأوصاف"
									: "Clear Set Of Descriptions"}
							</button>
						</div>
					</div>
				</div>
			) : null}

			{!bundleService ? (
				<div className='row'>
					<div className='col-md-6 mx-auto'>
						<div>
							{serviceDescriptionCombinedOtherLanguage &&
								serviceDescriptionCombinedOtherLanguage.length > 0 && (
									<Fragment>
										{language === "Arabic"
											? "الوصف المضاف باللغة العربية:"
											: "Added Descriptions Arabic:"}
										<ul>
											{serviceDescriptionCombinedOtherLanguage &&
												serviceDescriptionCombinedOtherLanguage.map((i, e) => (
													<li
														style={{
															listStyle: "none",
															marginLeft: "20px",
															fontSize: "12px",
														}}
														key={e}
													>
														<button
															type='button'
															onClick={() => {
																var array =
																	serviceDescriptionCombinedOtherLanguage &&
																	serviceDescriptionCombinedOtherLanguage.filter(
																		function (s) {
																			return s !== i;
																		}
																	);
																setServiceDescriptionCombinedOtherLanguage(
																	array
																);
															}}
															style={{
																color: "white",
																background: "black",
																fontSize: "15px",
																borderRadius: "15px",
																marginRight: "10px",
															}}
															aria-label='Close'
														>
															<span aria-hidden='true'>&times;</span>
														</button>
														{i}
													</li>
												))}
										</ul>
									</Fragment>
								)}
						</div>
						<label className='text-muted'>
							{language === "Arabic"
								? `إضافة مجموعة من الخدمات المرتبطة بـ "${serviceNameOtherLanguage}" باللغة العربية`
								: `Add set of services connected to "${serviceNameOtherLanguage}" In Arabic`}
						</label>
						<input
							type='text'
							className='form-control'
							onChange={handleChange13}
							value={serviceDescriptionOtherLanguage}
							placeholder={
								language === "Arabic"
									? "وصف الخدمة"
									: "Description of the service"
							}
						/>
						<div className='row'>
							<button
								style={{ fontSize: "12px" }}
								onClick={pushToServiceDescriptionOtherLanguage}
								className='btn btn-outline-info col-md-5  text-center mx-auto my-2'
							>
								{language === "Arabic"
									? "إضافة وصف الخدمة."
									: "Add Service Description."}
							</button>
							<button
								style={{ fontSize: "12px" }}
								onClick={() => {
									setServiceDescriptionCombinedOtherLanguage([]);
									setServiceType("Please select / Required*");
								}}
								className='btn btn-outline-danger col-md-5  text-center mx-auto my-2'
							>
								{language === "Arabic"
									? "مسح مجموعة الأوصاف"
									: "Clear Set Of Descriptions"}
							</button>
						</div>
					</div>
				</div>
			) : null}

			<div className='row'>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>
						{language === "Arabic"
							? "الوقت المقدر للخدمة"
							: "Service Estimated Time"}
					</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange3}
						value={serviceTime}
						required
						placeholder={
							language === "Arabic"
								? "يرجى إضافة قيمة رقمية (بالدقائق)"
								: "Please add a numerical value (minutes)"
						}
					/>
				</div>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>
						{language === "Arabic" ? "نقاط الولاء" : "Loyalty Points"}
					</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange4}
						value={serviceLoyaltyPoints}
						required
						placeholder={
							language === "Arabic"
								? "يرجى إضافة نقاط الولاء التي يمكن للعميل الحصول عليها (أرقام فقط)"
								: "Please Add Loyalty Points Can Be Gained By Customer (Digits Only)"
						}
					/>
				</div>
			</div>
			<button className='btn btn-outline-primary mb-3'>
				{language === "Arabic" ? "إضافة خدمة" : "Add a Service"}
			</button>
		</form>
	);

	return (
		<AddServiceWrapper>
			<div
				className='col-md-8 col-sm-6  mt-5 p-3 serviceFormWrapper'
				style={{
					border: "2px #0f377e solid",
					borderRadius: "20px",
					marginBottom: "200px",
					marginLeft: "130px",
				}}
			>
				<h3 className='mt-1 mb-3 text-center'>Add Service</h3>
				<ToastContainer />
				{newServiceForm()}
			</div>
		</AddServiceWrapper>
	);
};

export default AddService;

const AddServiceWrapper = styled.div`
	h3 {
		font-weight: bold;
		color: goldenrod;
	}

	@media (max-width: 1000px) {
		.serviceFormWrapper {
			margin-left: 0px !important;
		}
	}
`;
