import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getServices, updateService } from "../apiOwner";
import { isAuthenticated } from "../../auth";
import { toast } from "react-toastify";
import { Select } from "antd";

const UpdateService = ({ language }) => {
	const [allServices, setAllServices] = useState([]);
	const [serviceClicked, setServiceClicked] = useState("");
	const [chosenService, setChosenService] = useState("");

	//elements for updating services
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
	const [activeService, setActiveService] = useState("1");
	const [bundleServicesAdded, setBundleServicesAdded] = useState([]);
	const [allServicesDetails, setAllServicesDetails] = useState([]);

	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	const gettingAllServices = () => {
		getServices(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllServices(data);
				setAllServicesDetails(data);
			}
		});
	};

	useEffect(() => {
		gettingAllServices();
		// eslint-disable-next-line
	}, [serviceClicked]);

	useEffect(() => {
		if (chosenService && chosenService._id) {
			setServiceName(chosenService.serviceName);
			setServiceNameOtherLanguage(chosenService.serviceNameOtherLanguage);
			setCustomerType(chosenService.customerType);
			setCustomerTypeOtherLanguage(chosenService.customerTypeOtherLanguage);
			setServicePrice(chosenService.servicePrice);
			setServicePriceDiscount(chosenService.servicePriceDiscount);
			setServiceTime(chosenService.serviceTime);
			setServiceLoyaltyPoints(chosenService.serviceLoyaltyPoints);
			setServiceDescription(chosenService.serviceDescription);
			setServiceDescriptionOtherLanguage(
				chosenService.serviceDescriptionOtherLanguage
			);
			setServiceDescriptionCombined(chosenService.serviceDescription);
			setServiceDescriptionCombinedOtherLanguage(
				chosenService.serviceDescriptionOtherLanguage
			);
			setActiveService(chosenService.activeService);
			setCatchyPhrase(chosenService.catchyPhrase);
			setCatchyPhraseOtherLanguage(chosenService.catchyPhraseOtherLanguage);
			setBundleService(chosenService.bundleService);
			setBundleServicesAdded(chosenService.bundleServicesAdded);
		}
		// eslint-disable-next-line
	}, [serviceClicked]);

	const clickSubmit = (e) => {
		e.preventDefault();
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

		if (activeService === "0") {
			if (
				window.confirm(
					"Are you sure you want to deactivate the selected Service?"
				)
			) {
				updateService(chosenService._id, user._id, token, {
					serviceName,
					serviceNameOtherLanguage,
					customerType,
					customerTypeOtherLanguage,
					servicePrice: convertArabicOrNumericToEnglish(servicePrice),
					servicePriceDiscount:
						convertArabicOrNumericToEnglish(servicePriceDiscount),
					serviceTime,
					serviceLoyaltyPoints:
						convertArabicOrNumericToEnglish(serviceLoyaltyPoints),
					serviceType,
					serviceDescription: serviceDescriptionCombined,
					serviceDescriptionOtherLanguage:
						serviceDescriptionCombinedOtherLanguage,
					belongsTo: user._id,
					catchyPhrase: catchyPhrase,
					catchyPhraseOtherLanguage: catchyPhraseOtherLanguage,
					bundleService: bundleService,
					activeService,
					bundleServicesAdded: bundleServicesAdded,
				}).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						toast.success("Service was successfully Updated.");
						setTimeout(function () {
							setServiceClicked(false);
						}, 2000);
					}
				});
			}
		} else {
			updateService(chosenService._id, user._id, token, {
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
				serviceDescriptionOtherLanguage:
					serviceDescriptionCombinedOtherLanguage,
				belongsTo: user._id,
				catchyPhrase: catchyPhrase,
				catchyPhraseOtherLanguage: catchyPhraseOtherLanguage,
				bundleService: bundleService,
				bundleServicesAdded: bundleServicesAdded,
				activeService: activeService,
			}).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					toast.success("Service was successfully Updated.");
					setTimeout(function () {
						setServiceClicked(false);
					}, 2000);
				}
			});
		}
	};

	var possibleServices = [
		{ english: "Custom Service", arabic: " خدمة مخصصة" },
		{ english: "Bundle Service", arabic: "خدمة الباقة" },
		{ english: "Haircut", arabic: "قص الشعر" },
		{ english: "Children's haircut", arabic: "قص شعر اطفال " },
		{ english: "Hairdrying", arabic: "استشوار" },
		{ english: "Babyliss", arabic: "مكواه" },
		{
			english: "Hairdrying + babyliss + Hair washing",
			arabic: "غسيل+سشوار+مكواه",
		},
		{ english: "Beard shaving", arabic: "حلاقة ذقن" },
		{ english: "Beard Trimming", arabic: "تقليم اللحية" },
		{ english: "Beard coloring", arabic: " صبغة الذقن" },
		{ english: "Hair Coloring", arabic: "صبغ الشعر" },
		{ english: "Hair Coloring 2 colors", arabic: " صبغ الشعر لونين " },
		{ english: "Highlights/Lowlights", arabic: "الإبراز / الظلال" },
		{ english: "Hair Straightening", arabic: "فرد الشعر" },
		{ english: "Protein hair straightener", arabic: "فرد شعر بالبروتين " },
		{ english: "Creatine hair straightener", arabic: "فرد شعر بالكرياتين " },
		{ english: " Oil bath", arabic: "حمام زيت " },
		{ english: " Cream bath ", arabic: "حمام كريم" },
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
		{ english: " Half hand waxing", arabic: " الشمع نصف اليد " },
		{ english: "Half leg waxing", arabic: " نصف الرجل الشمع" },
		{
			english: "Bikini & underarm waxing",
			arabic: " الشمع البكينى والاندر ارم ",
		},
		{ english: "Full body sweet", arabic: "للجسم كامل  سويت" },
		{ english: "Full hand sweet ", arabic: "لليد كاملة  سويت " },
		{ english: "Full leg sweet ", arabic: "للرجل كاملة  سويت " },
		{ english: " Half hand sweet ", arabic: " سويت نصف اليد " },
		{ english: "Half leg sweet ", arabic: " نصف الرجل سويت " },
		{
			english: "Bikini & underarm sweet ",
			arabic: " سويت البكينى والاندر ارم ",
		},
		{ english: "Makeup services", arabic: "خدمات المكياج" },
	];

	var customerTypes = [
		{ english: "Please Select", arabic: "الرجاء الاختيار" },
		{ english: "Male", arabic: "ذكر" },
		{ english: "Female", arabic: "أنثى" },
		{
			english: "Boys (Client 12 Years Old or Younger)",
			arabic: "الأولاد (العميل الذي تقل أعمارهم عن 12 سنة)",
		},
		{
			english: "Girls (Client 12 Years Old or Younger)",
			arabic: "البنات (العميل الذي تقل أعمارهم عن 12 سنة)",
		},
	];

	const handleChange1 = (event) => {
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
		setServicePrice(e.target.value);
	};

	const handleChange3 = (e) => {
		setServiceTime(e.target.value);
	};
	const handleChange4 = (e) => {
		setServiceLoyaltyPoints(e.target.value);
	};

	const handleChange5 = (event) => {
		const type = JSON.parse(event.target.value);
		setCustomerType(type.english);
		setCustomerTypeOtherLanguage(type.arabic);
	};

	const handleChange8 = (e) => {
		setServiceDescription(e.target.value);
	};

	const handleChange9 = (e) => {
		setServicePriceDiscount(e.target.value);
	};

	const handleChange10 = (e) => {
		setActiveService(e.target.value);
	};

	// eslint-disable-next-line
	const handleChange11 = (e) => {
		setCatchyPhrase(e.target.value);
	};

	const handleChange13 = (e) => {
		setServiceDescriptionOtherLanguage(e.target.value);
	};

	// eslint-disable-next-line
	const handleChange14 = (e) => {
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
			className='col-md-10'
			dir={language === "Arabic" ? "rtl" : "ltr"}
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
						{" "}
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
						onChange={handleChange1}
					>
						{serviceName ? (
							<option value=''>{serviceName}</option>
						) : (
							<option value=''>
								{language === "Arabic" ? "اختر خدمة" : "Select a service"}
							</option>
						)}
						{possibleServices.map((service, index) => (
							<option key={index} value={JSON.stringify(service)}>
								{service.english} / {service.arabic}
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
								placeholder='Add Custom Service'
								required
							/>
						</div>

						<div className='form-group col-md-6 mx-auto'>
							<label className='text-muted'>
								{" "}
								{bundleService ? "Bundle" : "Custom"} Service Name (Arabic)
							</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setServiceNameOtherLanguage(e.target.value)}
								value={serviceNameOtherLanguage}
								placeholder='Add Custom Service Name In Arabic'
								required
							/>
						</div>

						{bundleService ? (
							<div className='form-group mx-auto col-md-12 w-100 py-2'>
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

				<div className='row'>
					<div
						className='form-group col-md-6 mx-auto col-4'
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
						className='form-group col-md-6 mx-auto col-7'
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

				{/* <div className='form-group col-md-8 mx-auto'>
					<label className='text-muted'>
						Catchy Phrase For This Service (10 words)
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange11}
						value={catchyPhrase}
						placeholder='e.g. For the first, 20% off your haircut today!'
						// required
					/>
				</div>

				<div className='form-group col-md-8 mx-auto'>
					<label className='text-muted'>
						Catchy Phrase For This Service Arabic (10 words)
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange14}
						value={catchyPhraseOtherLanguage}
						placeholder='e.g. For the first, 20% off your haircut today!'
						// required
					/>
				</div> */}
			</div>
			<div className='row'>
				<div className='col-md-6 mx-auto'>
					<div>
						{serviceDescriptionCombined &&
							serviceDescriptionCombined.length > 0 && (
								<React.Fragment>
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
								</React.Fragment>
							)}
					</div>
					<label className='text-muted'>
						Add set of services connected to{" "}
						<span style={{ color: "blue", fontWeight: "bold" }}>
							"{serviceName}"
						</span>
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange8}
						value={serviceDescription}
						placeholder='Describtion of the service'
					/>
					<div className='row'>
						<button
							style={{ fontSize: "12px" }}
							onClick={pushToServiceDescription}
							className='btn btn-outline-info col-md-5  text-center mx-auto my-2'
						>
							Add Service Description.
						</button>
						<button
							style={{ fontSize: "12px" }}
							onClick={() => {
								setServiceDescriptionCombined([]);
								setServiceType("Please select / Required*");
							}}
							className='btn btn-outline-danger col-md-5  text-center mx-auto my-2'
						>
							Clear Set Of Descriptions
						</button>
					</div>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-6 mx-auto'>
					<div>
						{serviceDescriptionCombinedOtherLanguage &&
							serviceDescriptionCombinedOtherLanguage.length > 0 && (
								<React.Fragment>
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
								</React.Fragment>
							)}
					</div>
					<label className='text-muted'>
						Add set of services connected to{" "}
						<span style={{ color: "blue", fontWeight: "bold" }}>
							"{serviceNameOtherLanguage}" In Arabic
						</span>
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange13}
						value={serviceDescriptionOtherLanguage}
						placeholder='Describtion of the service'
					/>
					<div className='row'>
						<button
							style={{ fontSize: "12px" }}
							onClick={pushToServiceDescriptionOtherLanguage}
							className='btn btn-outline-info col-md-5  text-center mx-auto my-2'
						>
							Add Service Description.
						</button>
						<button
							style={{ fontSize: "12px" }}
							onClick={() => {
								setServiceDescriptionCombinedOtherLanguage([]);
								setServiceType("Please select / Required*");
							}}
							className='btn btn-outline-danger col-md-5  text-center mx-auto my-2'
						>
							Clear Set Of Descriptions
						</button>
					</div>
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

			<div
				className='row'
				style={{
					textAlign: language === "Arabic" ? "right" : "",
					fontWeight: language === "Arabic" ? "bolder" : "",
				}}
			>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>
						{" "}
						{language === "Arabic" ? "تفعيل الخدمة" : "Active Service?"}{" "}
					</label>
					<select
						onChange={handleChange10}
						className='form-control'
						style={{ fontSize: "0.80rem" }}
					>
						<option>Please select / Required*</option>
						<option value='0'>
							{" "}
							{language === "Arabic"
								? "إلغاء الخدمة"
								: "Deactivate Service"}{" "}
						</option>
						<option value='1'>
							{" "}
							{language === "Arabic" ? "تفعيل الخدمة" : "Activate Service"}{" "}
						</option>
					</select>
				</div>
			</div>
			<div className='text-center mt-4'>
				<button className='btn btn-outline-primary mb-3'>
					{" "}
					{language === "Arabic" ? "تعديل الخدمة" : "Update Service"}{" "}
				</button>
			</div>
		</form>
	);

	return (
		<UpdateServiceWrapper>
			{!serviceClicked ? (
				<h3 className='mt-5'>
					Total of {allServices.length} Added Services{" "}
					<strong style={{ textTransform: "uppercase" }}>
						{" "}
						{language === "Arabic"
							? "  (اضغط على الخدمة للتعديل)"
							: "(Click To Update)"}
					</strong>
				</h3>
			) : null}

			{!serviceClicked ? (
				<ul className='list-group col-md-10 pr-3 pl-2' dir='ltr'>
					{allServices.map((s, i) => (
						<div
							style={{ textTransform: "capitalize", cursor: "pointer" }}
							key={i}
						>
							<div
								className='row py-4'
								style={{
									fontSize: "13px",
									border: "2px lightgray solid",
								}}
								onClick={() => {
									setServiceClicked(true);
									setChosenService(s);
									window.scrollTo({ top: 150, behavior: "smooth" });
								}}
							>
								<div className='col-6'>
									<strong>
										{" "}
										Service For:{" "}
										<span
											style={{ color: "darkred", textTransform: "capitalize" }}
										>
											{language === "Arabic"
												? s.customerTypeOtherLanguage
												: s.customerType}{" "}
											{s.bundleService ? " | (Bundle)" : null}
										</span>
									</strong>{" "}
								</div>
								<div className='col-2'></div>
								<div className='col-4 mb-2'>
									<button
										style={{ fontSize: "13px" }}
										className='btn btn-outline-info'
									>
										{" "}
										<strong>
											{" "}
											{language === "Arabic" ? "تعديل" : "EDIT"}{" "}
										</strong>{" "}
									</button>
								</div>
								<div className='col-6'>
									<strong>
										{i + 1}-{"  "}{" "}
										{language === "Arabic"
											? s.serviceNameOtherLanguage
											: s.serviceName}
									</strong>
								</div>
								<div className='col-6 mx-auto'>
									<strong>{s.servicePrice} EGP</strong>,
									<strong style={{ color: "green" }}>
										{" "}
										{s.servicePriceDiscount} EGP
									</strong>
								</div>
								<div className='col-6'>
									{!s.activeService && (
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center  col-md-3'
											style={{
												fontSize: "0.7rem",
												color: "red",
												fontWeight: "bold",
											}}
										>
											<strong>Deactivated</strong>
										</li>
									)}
								</div>
							</div>
							<br />
						</div>
					))}
				</ul>
			) : null}

			{serviceClicked ? (
				<div>
					<h5
						className='mt-5'
						style={{ cursor: "pointer" }}
						onClick={() => {
							setServiceClicked(false);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
					>
						<i className='fa-sharp fa-solid fa-arrow-left mr-2'></i>
						{language === "Arabic"
							? "العودة إلى قائمة الخدمات ..."
							: "Back to Services List..."}
					</h5>
					<h3 className='mt-3'>
						{language === "Arabic" ? (
							<span>
								تعديل الخدمة (
								{chosenService && chosenService.serviceNameOtherLanguage})
							</span>
						) : (
							<span>
								Update Service ({chosenService && chosenService.serviceName})
							</span>
						)}
					</h3>
					<div
						className='col-md-8 col-sm-6  mt-5 p-3'
						style={{
							border: "2px #0f377e solid",
							borderRadius: "20px",
							marginBottom: "200px",
							marginLeft: "50px",
						}}
					>
						{newServiceForm()}
					</div>
				</div>
			) : null}
		</UpdateServiceWrapper>
	);
};

export default UpdateService;

const UpdateServiceWrapper = styled.div`
	margin-left: 200px;

	h3 {
		margin-left: 150px;
		font-weight: bold;
		color: goldenrod;
		text-transform: capitalize;
		font-size: 1.3rem;
	}

	h5 {
		margin-left: 150px;
		font-weight: bolder;
		color: black;
		font-size: 1.1rem;
		text-decoration: underline;
	}

	@media (max-width: 1000px) {
		margin-left: 10px;

		label {
			font-size: 0.8rem !important;
		}

		h5 {
			margin-left: 15px;
		}

		h3 {
			margin-left: 15px;
		}
	}
`;
