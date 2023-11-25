/** @format */

import React, { useState, Fragment, useEffect } from "react";
// import { Link } from "react-router-dom";
import { createService, getServices } from "../apiOwner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuthenticated } from "../../auth";
import styled from "styled-components";
import { Select } from "antd";

const AddService = ({ language }) => {
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
	const [allServicesDetails, setAllServicesDetails] = useState([]);
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
	const [bundleServicesAdded, setBundleServicesAdded] = useState([]);

	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);

	// destructure user and token from localstorage
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

	// eslint-disable-next-line
	const handleChange10 = (e) => {
		setError("");
		setCatchyPhrase(e.target.value);
	};

	const handleChange13 = (e) => {
		setError("");
		setServiceDescriptionOtherLanguage(e.target.value);
	};

	// eslint-disable-next-line
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
		getServices(token, user._id).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllServices(
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

		function containsArabicNumerals(str) {
			// Regular expression to match Arabic numerals
			const arabicNumeralsRegex = /[\u0660-\u0669]/;
			return arabicNumeralsRegex.test(str);
		}

		function removeNonNumericCharacters(str) {
			// Regular expression to remove non-numeric characters
			const numericOnlyRegex = /\D/g;
			return str.replace(numericOnlyRegex, "");
		}

		function convertArabicToEnglishNumerals(arabicNumber) {
			const arabicNumeralsMap = {
				"٠": "0",
				"١": "1",
				"٢": "2",
				"٣": "3",
				"٤": "4",
				"٥": "5",
				"٦": "6",
				"٧": "7",
				"٨": "8",
				"٩": "9",
			};

			// Convert Arabic numerals to English numerals
			return arabicNumber.replace(
				/[\u0660-\u0669]/g,
				(match) => arabicNumeralsMap[match]
			);
		}

		function convertArabicOrNumericToEnglish(arabicNumber) {
			// Remove non-numeric characters (including '+') from the input
			const numericOnly = removeNonNumericCharacters(arabicNumber);

			// Check if the input contains Arabic numerals
			if (containsArabicNumerals(arabicNumber)) {
				// If it contains Arabic numerals, convert to English numerals
				return convertArabicToEnglishNumerals(numericOnly);
			}

			// Return the numericOnly string as is (English numerals)
			return numericOnly;
		}

		setError("");
		setSuccess(false);
		// make request to api to create service
		createService(user._id, token, {
			serviceName,
			serviceNameOtherLanguage,
			customerType,
			customerTypeOtherLanguage,
			servicePrice: convertArabicOrNumericToEnglish(servicePrice),
			servicePriceDiscount:
				convertArabicOrNumericToEnglish(servicePriceDiscount),
			serviceTime: convertArabicOrNumericToEnglish(serviceTime),
			serviceLoyaltyPoints:
				convertArabicOrNumericToEnglish(serviceLoyaltyPoints),
			serviceType,
			serviceDescription: serviceDescriptionCombined,
			serviceDescriptionOtherLanguage: serviceDescriptionCombinedOtherLanguage,
			belongsTo: user._id,
			catchyPhrase: catchyPhrase,
			catchyPhraseOtherLanguage: catchyPhraseOtherLanguage,
			bundleService: bundleService,
			bundleServicesAdded: bundleServicesAdded,
			activeService: true,
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
		{ english: "Custom Service", arabic: " خدمة مخصصة" },
		{ english: "Bundle Service", arabic: "خدمة الباقة" },
		{ english: "Haircut", arabic: "قص الشعر" },
		{ english: "Children's haircut", arabic: "قص شعر اطفال " },
		{ english: "Hairdrying", arabic: "سشوار" },
		{ english: "Babyliss", arabic: "مكواه" },
		{
			english: "Hairdrying + babyliss + Hair washing",
			arabic: "غسيل+سشوار+مكواه",
		},
		{ english: "Beard shaving", arabic: "حلاقة ذقن" },
		{ english: "Beard Trimming", arabic: "تقليم اللحية" },
		{ english: "Beard coloring", arabic: "صبغة الذقن" },
		{ english: "Hair Coloring", arabic: "صبغ الشعر" },
		{ english: "Hair Coloring 2 colors", arabic: " صبغ الشعر لونين " },
		{ english: "Highlights/Lowlights", arabic: "الإبراز / الظلال" },
		{ english: "Hair Straightening", arabic: "فرد الشعر" },
		{ english: "Protein hair straightener", arabic: "فرد شعر بالبروتين" },
		{ english: "Creatine hair straightener", arabic: "فرد شعر بالكرياتين " },
		{ english: "Oil bath", arabic: "حمام زيت" },
		{ english: " Cream bath", arabic: "حمام كريم" },
		{
			english: " Steam cream bath session ",
			arabic: " جلسة حمام كريم بالبخار",
		},
		{ english: "Pedicure `hand`", arabic: "باديكير " },
		{ english: " Pedicure `foot`", arabic: " باديكير " },
		{ english: " Edorgil Pedicure ", arabic: "بادكير ايدورجيل" },
		{ english: "Manicure", arabic: "المانيكير" },
		{ english: "Regular mask", arabic: "ماسك عادى" },
		{ english: "Steam mask", arabic: "ماسك بخار" },
		{ english: " Deep skin cleansing ", arabic: " تنظيف بشرة عميق " },
		{
			english: " Laser deep skin cleansing ",
			arabic: " تنظيف بشرة عميق بالليزر ",
		},
		{ english: " Normal skin cleansing ", arabic: " تنظيف بشرة عادى " },
		{
			english: "skin cleansing HydroFacial",
			arabic: "تنظيف بشرة هايدروفيشيل ",
		},
		{ english: "Facial Treatments", arabic: "العلاجات الوجهية" },
		{ english: "Scalp Treatments", arabic: "العلاجات فروة الرأس" },
		{ english: "Threading", arabic: "فتلة" },
		{ english: "Face Waxing", arabic: "للوجه  الشمع" },
		{ english: "Full body waxing", arabic: "للجسم كامل  الشمع" },
		{ english: "Full hand waxing", arabic: "لليد كاملة  الشمع" },
		{ english: "Full leg waxing", arabic: "للرجل كاملة  الشمع" },
		{ english: "Half hand waxing", arabic: " الشمع نصف اليد " },
		{ english: "Half leg waxing", arabic: " نصف الرجل الشمع" },
		{
			english: "Bikini & underarm waxing",
			arabic: " الشمع البكينى والاندر ارم ",
		},
		{ english: "Full body sweet", arabic: "للجسم كامل  سويت" },
		{ english: "Full hand sweet ", arabic: "لليد كاملة  سويت " },
		{ english: "Full leg sweet ", arabic: "للرجل كاملة  سويت " },
		{ english: "Half hand sweet ", arabic: " سويت نصف اليد " },
		{ english: "Half leg sweet ", arabic: " نصف الرجل سويت " },
		{
			english: "Bikini & underarm sweet ",
			arabic: " سويت البكينى والاندر ارم ",
		},
		{ english: "Makeup services", arabic: "خدمات المكياج" },
		{ english: "Groom Offer", arabic: "عرض العريس" },
		{ english: "Bride Offer", arabic: "عرض العروسة" },
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
		<form
			onSubmit={clickSubmit}
			dir={language === "Arabic" ? "rtl" : "ltr"}
			className='col-md-12'
		>
			<div className='row'>
				<div
					className='form-group col-md-6 mx-auto'
					style={{
						textAlign: language === "Arabic" ? "right" : "",
						fontWeight: language === "Arabic" ? "bolder" : "",
					}}
				>
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
								{type.english}{" "}
								{index === 0
									? null
									: " | " + user &&
									  user.storeCountry &&
									  user.storeCountry.toLowerCase() === "egypt"
									? type.arabic
									: null}
							</option>
						))}
					</select>
				</div>
				<div
					className='form-group col-md-6 mx-auto'
					style={{
						textAlign: language === "Arabic" ? "right" : "",
						fontWeight: language === "Arabic" ? "bolder" : "",
					}}
				>
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
								{service.english}{" "}
								{user &&
								user.storeCountry &&
								user.storeCountry.toLowerCase() === "egypt" ? (
									<>/ {service.arabic}</>
								) : null}
							</option>
						))}
					</select>
				</div>
				{customServicePicked || bundleService ? (
					<>
						<div
							className='form-group col-md-6 mx-auto'
							style={{
								textAlign: language === "Arabic" ? "right" : "",
								fontWeight: language === "Arabic" ? "bolder" : "",
							}}
						>
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

						{user &&
						user.storeCountry &&
						user.storeCountry.toLowerCase() === "egypt" ? (
							<div
								className='form-group col-md-6 mx-auto'
								style={{
									textAlign: language === "Arabic" ? "right" : "",
									fontWeight: language === "Arabic" ? "bolder" : "",
								}}
							>
								<>
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
										onChange={(e) =>
											setServiceNameOtherLanguage(e.target.value)
										}
										value={serviceNameOtherLanguage}
										placeholder={
											language === "Arabic"
												? "إضافة اسم خدمة مخصصة باللغة العربية"
												: "Add Custom Service Name In Arabic"
										}
										required
									/>
								</>
							</div>
						) : null}
						{bundleService ? (
							<div
								className='form-group mx-auto col-md-12 w-100 py-2'
								style={{
									textAlign: language === "Arabic" ? "right" : "",
									fontWeight: language === "Arabic" ? "bolder" : "",
								}}
							>
								<label className='text-muted'>
									{language === "Arabic"
										? "Add Set Of Services"
										: "Add Set Of Services"}
								</label>
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
			</div>
			<div className='row'>
				<div
					className='form-group col-md-5 mx-auto col-4'
					style={{
						textAlign: language === "Arabic" ? "right" : "",
						fontWeight: language === "Arabic" ? "bolder" : "",
					}}
				>
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

				<div
					className='form-group col-md-5 mx-auto col-7'
					style={{
						textAlign: language === "Arabic" ? "right" : "",
						fontWeight: language === "Arabic" ? "bolder" : "",
					}}
				>
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
			</div>
			<div
				className='row'
				style={{ textAlign: language === "Arabic" ? "right" : "" }}
			>
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
																serviceDescriptionCombined.filter(function (s) {
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
							? `إضافة مجموعة من الخدمات المرتبطة بـ "${serviceName}" باللغة الإنجليزية`
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

			<div
				className='row'
				style={{ textAlign: language === "Arabic" ? "right" : "" }}
			>
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
															setServiceDescriptionCombinedOtherLanguage(array);
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

					{user &&
					user.storeCountry &&
					user.storeCountry.toLowerCase() === "egypt" ? (
						<>
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
						</>
					) : null}
				</div>
			</div>

			<div className='row my-3'>
				<div
					className='form-group col-md-6 mx-auto col-7'
					style={{
						textAlign: language === "Arabic" ? "right" : "",
						fontWeight: language === "Arabic" ? "bolder" : "",
					}}
				>
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
				<div
					className='form-group col-md-6 mx-auto col-5'
					style={{
						textAlign: language === "Arabic" ? "right" : "",
						fontWeight: language === "Arabic" ? "bolder" : "",
					}}
				>
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
			<div className='text-center'>
				<button className='btn btn-outline-primary mb-3'>
					{language === "Arabic" ? "إضافة خدمة" : "Add a Service"}
				</button>
			</div>
		</form>
	);

	return (
		<AddServiceWrapper>
			<div
				className='col-md-10 col-sm-6  mt-5 p-3 serviceFormWrapper'
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
	z-index: 10000;

	h3 {
		font-weight: bold;
		color: goldenrod;
	}

	@media (max-width: 1000px) {
		.serviceFormWrapper {
			margin-left: 0px !important;
		}
		label {
			font-size: 0.8rem !important;
		}
	}
`;
