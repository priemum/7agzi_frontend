/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Spin } from "antd";
import { toast } from "react-toastify";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import { isAuthenticated } from "../../../../auth";
import { createService, getServices } from "../../../apiOwner";
import CustomServiceModal from "./CustomServiceModal";
import { FemaleStandardServices, MaleStandardServices } from "./Utils";

const ServicesModal = ({ modalVisible, setModalVisible, language }) => {
	// eslint-disable-next-line
	const [customServicePicked, setCustomServicePicked] = useState(false);
	const [modalVisible4, setModalVisible4] = useState(false);
	// eslint-disable-next-line
	const [allServices, setAllServices] = useState([]);

	// eslint-disable-next-line
	const [allServicesDetails, setAllServicesDetails] = useState([]);
	const [loading, setLoading] = useState(false);

	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	const [chosenSetServicesBarbers, setChosenSetServicesBarbers] = useState(
		user.storeType.toLowerCase() === "barber shop"
			? MaleStandardServices
			: user.storeType.toLowerCase() === "hair salon"
			? FemaleStandardServices
			: []
	);

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	const gettingAllServices = () => {
		getServices(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				const existingServiceNames = data.map(
					(serviceNames) =>
						serviceNames.serviceName.toLowerCase() +
						serviceNames.customerType.toLowerCase()
				);
				setAllServices(existingServiceNames);

				// Filter the services based on the existing ones
				const filteredServices = MaleStandardServices.filter(
					(service) =>
						!existingServiceNames.includes(
							service.serviceName.toLowerCase() +
								service.customerType.toLowerCase()
						)
				);

				setChosenSetServicesBarbers(filteredServices);
				setAllServicesDetails(data);
			}
		});
	};

	useEffect(() => {
		gettingAllServices();
		// eslint-disable-next-line
	}, []);

	const clickSubmit = (e) => {
		setLoading(true);
		const onlyChosen = chosenSetServicesBarbers.filter(
			(i) => i.servicePrice !== ""
		);

		onlyChosen &&
			// eslint-disable-next-line
			onlyChosen.map((s) => {
				setTimeout(() => {
					createService(user._id, token, s).then((data) => {
						if (data.error) {
							console.log(data.error);
						} else {
							console.log("Success");
						}
					});
				}, 300);
			});

		setTimeout(() => {
			setChosenSetServicesBarbers(
				user.storeType.toLowerCase() === "barber shop"
					? MaleStandardServices
					: user.storeType.toLowerCase() === "hair salon"
					? FemaleStandardServices
					: []
			);
			setLoading(false);
			toast.success("All Services were successfully added to your salon!");
			setModalVisible(false);
			window.location.reload(false);
		}, onlyChosen.length * 300 + 500);
	};

	function convertToEnglishNumber(input) {
		const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
		let numberString = input.toString();
		arabicNumbers.forEach((num, i) => {
			const regex = new RegExp(num, "g");
			numberString = numberString.replace(regex, i);
		});
		return numberString;
	}

	const resetDefault = MaleStandardServices;

	return (
		<EditBannerWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<CustomServiceModal
				modalVisible={modalVisible4}
				setModalVisible={setModalVisible4}
				chosenSetServicesBarbers={chosenSetServicesBarbers}
				setChosenSetServicesBarbers={setChosenSetServicesBarbers}
				language={language}
				user={user}
			/>
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
							? "إضافة الخدمات لصالونك"
							: `Add Services To Your Salon`}
					</div>
				}
				open={modalVisible}
				onOk={() => {
					setChosenSetServicesBarbers(resetDefault);
					setModalVisible(false);
				}}
				okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setChosenSetServicesBarbers(resetDefault);
					setModalVisible(false);
				}}
			>
				<div dir={language === "Arabic" ? "rtl" : "ltr"}>
					{language === "Arabic" ? (
						<div
							className='mb-3'
							style={{
								textAlign: "right",
								fontSize: "1rem",
								fontWeight: "bolder",
							}}
						>
							<div style={{ fontSize: "1.2rem", color: "darkred" }}>
								مهم جداً
							</div>
							<div className='mb-2'>
								سعر الخدمة: يجب أن يكون أرقام فقط، فلا تضف ج.م أو أي شيء آخر،
								فقط الأرقام من فضلك
							</div>
							<div>
								الوقت المتوقع للخدمة: يجب أن يكون أرقام فقط
								<br />
								يجب أن يكون الوقت المتوقع للخدمة بالدقائق (فإذا كانت خدمتك نصف
								ساعة، يجب أن تكتب أدناه "30" فقط والذي سيعني "30 دقيقة")
							</div>
						</div>
					) : (
						<div
							className='mb-3'
							style={{
								textAlign: "left",
								fontSize: "1rem",
								fontWeight: "bolder",
							}}
						>
							<div style={{ fontSize: "1.2rem", color: "darkred" }}>
								VERY IMPORTANT!
							</div>
							<div>
								Service Price: should be digits only so don't add{" "}
								{user.storeCountry === "egypt" ? "EGP" : "USD"} or anything,
								just digits please
							</div>
							<div>
								Service Estimated Time: should be digits only
								<br />
								Service Estimated Time should be in minutes (so if your service
								is half an hour, you should type below "30" which will mean "30
								mins")
							</div>
						</div>
					)}
					{language === "Arabic" ? (
						<table className='table'>
							<thead>
								<tr>
									<th scope='col' className='service-name-col'>
										الخدمة
									</th>
									<th scope='col' className='price-col'>
										سعر الخدمة
									</th>
									<th scope='col' className='time-col'>
										الوقت المتوقع
									</th>
									<th scope='col' className='delete-col'></th>
								</tr>
							</thead>
							<tbody>
								{chosenSetServicesBarbers &&
									chosenSetServicesBarbers.map((s, i) => {
										return (
											<tr className='align-middle' key={i}>
												<td
													style={{
														fontWeight: "bolder",
														textTransform: "capitalize",
													}}
												>
													{s.serviceNameOtherLanguage}
												</td>
												<td className='price-col'>
													<input
														type='number'
														className='form-control'
														placeholder='الأرقام فقط'
														value={s.servicePrice}
														onChange={(e) => {
															const englishValue = convertToEnglishNumber(
																e.target.value
															);
															setChosenSetServicesBarbers((prevState) =>
																prevState.map((service, index) =>
																	index === i
																		? {
																				...service,
																				servicePrice: englishValue,
																				servicePriceDiscount: englishValue,
																		  }
																		: service
																)
															);
														}}
													/>
												</td>
												<td className='time-col'>
													<input
														type='number'
														className='form-control'
														placeholder='الأرقام فقط'
														value={s.serviceTime}
														onChange={(e) => {
															const englishValue = convertToEnglishNumber(
																e.target.value
															);
															setChosenSetServicesBarbers((prevState) =>
																prevState.map((service, index) =>
																	index === i
																		? { ...service, serviceTime: englishValue }
																		: service
																)
															);
														}}
													/>
												</td>
												<td className='delete-col'>
													<button
														className='btn btn-danger btn-sm'
														onClick={() => {
															setChosenSetServicesBarbers((prevState) =>
																prevState.filter((_, index) => index !== i)
															);

															ReactGA.event("Account_Deleted_Service", {
																event_category: "Account_Deleted_Service",
																event_label: "Account_Deleted_Service",
																value: 0, // Optional extra parameters
															});

															ReactPixel.track("Account_Deleted_Service", {
																content_name: "Account_Deleted_Service",
																content_category: "Account_Deleted_Service",
																value: "",
																currency: "",
															});
														}}
													>
														حذف
													</button>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					) : (
						<table className='table'>
							<thead>
								<tr>
									<th scope='col' className='service-name-col'>
										Service
									</th>
									<th scope='col' className='price-col'>
										Service
									</th>
									<th scope='col' className='time-col'>
										Estimated
									</th>
									<th scope='col' className='delete-col'>
										Delete
									</th>
								</tr>
							</thead>
							<tbody>
								{chosenSetServicesBarbers &&
									chosenSetServicesBarbers.map((s, i) => {
										return (
											<tr className='' key={i}>
												<td style={{ textTransform: "capitalize" }}>
													{s.serviceName}
												</td>
												<td className='price-col'>
													<input
														type='number'
														className='form-control'
														placeholder='add price (Digits Only)'
														onChange={(e) => {
															const englishValue = convertToEnglishNumber(
																e.target.value
															);
															setChosenSetServicesBarbers((prevState) =>
																prevState.map((service, index) =>
																	index === i
																		? {
																				...service,
																				servicePrice: englishValue,
																				servicePriceDiscount: englishValue,
																		  }
																		: service
																)
															);
														}}
													/>
												</td>
												<td className='time-col'>
													<input
														type='text'
														className='form-control'
														placeholder='Digits Only'
														onChange={(e) => {
															const englishValue = convertToEnglishNumber(
																e.target.value
															);
															setChosenSetServicesBarbers((prevState) =>
																prevState.map((service, index) =>
																	index === i
																		? { ...service, serviceTime: englishValue }
																		: service
																)
															);
														}}
													/>
												</td>
												<td className='delete-col'>
													<button
														className='btn btn-danger btn-sm'
														onClick={() => {
															setChosenSetServicesBarbers((prevState) =>
																prevState.filter((_, index) => index !== i)
															);
														}}
													>
														Delete
													</button>
												</td>
											</tr>
										);
									})}
								{/* You can add more rows here */}
							</tbody>
						</table>
					)}

					<div className='my-3 mx-auto text-center'>
						<button
							className='btn btn-info w-50'
							onClick={() => {
								setModalVisible4(true);
							}}
						>
							{language === "Arabic"
								? "أضف خدمة أخرى"
								: "Add Another Custom Service"}
						</button>
					</div>

					<div className='mx-auto text-center my-5'>
						{loading ? (
							<Spin size='large' />
						) : (
							<button
								className='btn-success btn w-50'
								onClick={() => {
									clickSubmit();
									ReactGA.event("Account_Added_Services_Successfully", {
										event_category: "Account_Added_Services_Successfully",
										event_label: "Account_Added_Services_Successfully",
										value: 0, // Optional extra parameters
									});

									ReactPixel.track("Account_Added_Services_Successfully", {
										content_name: "Account_Added_Services_Successfully",
										content_category: "Account_Added_Services_Successfully",
										value: "",
										currency: "",
									});
								}}
							>
								{language === "Arabic"
									? "أضف الخدمات إلى صالونك"
									: "Add Services"}{" "}
							</button>
						)}
					</div>
				</div>
			</Modal>
		</EditBannerWrapper>
	);
};

export default ServicesModal;

const EditBannerWrapper = styled.div`
	z-index: 18000 !important;

	.table th,
	.table td {
		vertical-align: middle;
		text-align: center;
		font-size: 0.8rem;
	}
	.table .form-control {
		width: 100%;
	}

	.service-name-col {
		width: 15% !important;
	}
	.price-col {
		width: 40% !important;
	}
	.time-col {
		width: 40% !important;
	}
	.delete-col {
		width: 5% !important;
	}
`;
