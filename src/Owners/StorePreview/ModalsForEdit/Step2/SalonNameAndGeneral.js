/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import {
	AddingAppointmentWorkingHours,
	LoyaltyPointsAndStoreStatus,
	allLoyaltyPointsAndStoreStatus,
	getPreviousScheduledHours,
} from "../../../apiOwner";
import { isAuthenticated } from "../../../../auth";
import { DatePicker } from "antd";
import moment from "moment";
import StoreTimePicker from "./StoreTimePicker";
import { toast } from "react-toastify";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const SalonNameAndGeneral = ({
	modalVisible,
	setModalVisible,
	language,
	setLoading,
	lastSettings,
	hero1,
}) => {
	const [addStoreName, setAddStoreName] = useState([]);
	const [addStoreNameArabic, setAddStoreNameArabic] = useState([]);
	const [daysStoreClosed, setDaysStoreClosed] = useState({
		daysStoreClosed: [],
	});
	const [datesStoreClosed, setDatesStoreClosed] = useState([]);
	const [query, setQuery] = useState([]);
	const [oneDateStoreOff, setOneDateStoreOff] = useState("");
	const [openTime, setOpenTime] = useState(null);
	const [closeTime, setCloseTime] = useState(null);
	const [allHours, setAllHours] = useState([]);
	const [activeProp, setActiveProp] = useState(false);

	const { user, token } = isAuthenticated();

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var lastAddedSettings;

				if (data.length === 0) {
					lastAddedSettings = "";
				} else {
					lastAddedSettings = data && data[data.length - 1];
				}

				if (lastAddedSettings) {
					setDaysStoreClosed({
						daysStoreClosed:
							lastAddedSettings && lastAddedSettings.daysStoreClosed,
					});
					setQuery(lastAddedSettings && lastAddedSettings.daysStoreClosed);

					setDatesStoreClosed(
						lastAddedSettings && lastAddedSettings.datesStoreClosed
					);
					setActiveProp(lastAddedSettings && lastAddedSettings.activeStore);
					setAddStoreName(lastAddedSettings && lastAddedSettings.addStoreName);
					setAddStoreNameArabic(
						lastAddedSettings && lastAddedSettings.addStoreNameArabic
					);
				}
			}
		});
	};

	const pushToAllDates = (e) => {
		e.preventDefault();
		console.log(
			new Date(oneDateStoreOff._d).toLocaleDateString(),
			"oneDateStoreOff"
		);
		setDatesStoreClosed([
			...datesStoreClosed,
			new Date(oneDateStoreOff._d).toLocaleDateString(),
		]);
		setOneDateStoreOff("");
	};

	const handleQueryChange = (event) => {
		if (event.target.checked && !query.includes(event.target.value)) {
			setQuery([...query, event.target.value]);
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		} else if (!event.target.checked && query.includes(event.target.value)) {
			setQuery(query.filter((q) => q !== event.target.value));
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		}

		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
	};

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	// console.log(daysStoreClosed.daysStoreClosed, "daysStore");

	const removeDay = (index) => {
		const newDatesStoreClosed = [...datesStoreClosed];
		newDatesStoreClosed.splice(index, 1);
		setDatesStoreClosed(newDatesStoreClosed);
	};

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.gtag("event", "page_view", {
			page_path: window.location.pathname,
		});

		// eslint-disable-next-line
	}, [window.location.pathname]);

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	const clickSubmit = () => {
		if (!addStoreName) {
			return toast.error("Please Adjust Name");
		}
		if (!addStoreNameArabic) {
			return toast.error("Please Adjust Name in Arabic");
		}

		if (allHours.length === 0) {
			return toast.error("Please add opening and closing times for your salon");
		}

		setLoading(true);

		LoyaltyPointsAndStoreStatus(user._id, token, {
			loyaltyPointsAward:
				lastSettings && lastSettings.loyaltyPointsAward
					? lastSettings.loyaltyPointsAward
					: 100,
			discountPercentage:
				lastSettings && lastSettings.discountPercentage
					? lastSettings.discountPercentage
					: 15,
			datesStoreClosed:
				lastSettings && lastSettings.datesStoreClosed
					? lastSettings.datesStoreClosed
					: datesStoreClosed,
			daysStoreClosed:
				lastSettings && lastSettings.daysStoreClosed
					? lastSettings.daysStoreClosed
					: daysStoreClosed.daysStoreClosed,
			onlineServicesFees:
				lastSettings && lastSettings.onlineServicesFees
					? lastSettings.onlineServicesFees
					: 5,
			addStoreLogo:
				lastSettings && lastSettings.addStoreLogo
					? lastSettings.addStoreLogo
					: [],
			storeThumbnail:
				lastSettings && lastSettings.storeThumbnail
					? lastSettings.storeThumbnail
					: [],
			ownerIdPhoto:
				lastSettings && lastSettings.ownerIdPhoto
					? lastSettings.ownerIdPhoto
					: [],
			addStoreName: addStoreName
				? addStoreName
				: lastSettings && lastSettings.addStoreName
				? lastSettings.addStoreName
				: user && user.storeName,
			addStoreNameArabic: addStoreNameArabic
				? addStoreNameArabic
				: lastSettings && lastSettings.addStoreNameArabic
				? lastSettings.addStoreNameArabic
				: user && user.storeName,
			longitude:
				lastSettings && lastSettings.longitude ? lastSettings.longitude : "",
			latitude:
				lastSettings && lastSettings.latitude ? lastSettings.latitude : "",
			activeOnlineBooking:
				lastSettings && lastSettings.activeOnlineBooking
					? lastSettings.activeOnlineBooking
					: true,
			activeWhatsAppNotification:
				lastSettings && lastSettings.activeWhatsAppNotification
					? lastSettings.activeWhatsAppNotification
					: true,
			storePhone:
				lastSettings && lastSettings.storePhone
					? lastSettings.storePhone
					: user.phone,
			branchesCount:
				lastSettings && lastSettings.branchesCount
					? lastSettings.branchesCount
					: 1,
			stylistsCount:
				lastSettings && lastSettings.stylistsCount
					? lastSettings.stylistsCount
					: 3,
			chairsCount:
				lastSettings && lastSettings.chairsCount ? lastSettings.chairsCount : 4,
			cashPayment:
				lastSettings && lastSettings.cashPayment
					? lastSettings.cashPayment
					: true,
			visaPayment:
				lastSettings && lastSettings.visaPayment
					? lastSettings.visaPayment
					: false,
			airConditioned:
				lastSettings && lastSettings.airConditioned
					? lastSettings.airConditioned
					: false,
			parking:
				lastSettings && lastSettings.parking ? lastSettings.parking : true,
			belongsTo: user._id,
			activeStore: activeProp,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setModalVisible(false);

				AddingAppointmentWorkingHours(user._id, token, {
					hoursCanBeScheduled: allHours,
					belongsTo: user._id,
				}).then((data) => {
					if (data.error) {
						console.log(data.error, "error handiling times for appointments");
					} else {
						ReactGA.event("Account_Added_Salon_Working_Time_Successfully", {
							event_category: "Account_Added_Salon_Working_Time_Successfully",
							event_label: "Account_Added_Salon_Working_Time_Successfully",
							value: 0, // Optional extra parameters
						});

						ReactPixel.track("Account_Added_Salon_Working_Time_Successfully", {
							content_name: "Account_Added_Salon_Working_Time_Successfully",
							content_category: "Account_Added_Salon_Working_Time_Successfully",
							value: "",
							currency: "",
						});

						toast.success("Settings was successfully Updated.");
					}
				});

				setTimeout(function () {
					window.location.reload(false);
				}, 2000);
			}
		});
	};

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		// eslint-disable-next-line
	}, [query]);

	const PreviousAddedAppointmentHours = () => {
		getPreviousScheduledHours(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error, "Retrieving Previous Working Hours");
			} else {
				var lastAddedScheduledHours = data[data.length - 1];
				setAllHours(
					lastAddedScheduledHours && lastAddedScheduledHours.hoursCanBeScheduled
						? lastAddedScheduledHours.hoursCanBeScheduled
						: []
				);
			}
		});
	};

	useEffect(() => {
		PreviousAddedAppointmentHours();
		// eslint-disable-next-line
	}, []);

	return (
		<SalonNameAndGeneralWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<Modal
				width='90%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}
					>
						{language === "Arabic"
							? "تعديل البيانات العامة للصالون"
							: `EDIT SALON GENERAL DATA`}
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
				<>
					<div>
						<div className='col-md-5 pt-3 mx-auto'>
							<label>
								{language === "Arabic"
									? "اسم المتجر بالإنجليزية"
									: "Store Name In English"}{" "}
								<span style={{ color: "red", fontWeight: "bold" }}>
									{" "}
									<strong>*</strong>{" "}
								</span>{" "}
							</label>
							<input
								className='form-control'
								type='text'
								placeholder={
									language === "Arabic"
										? "ادخل اسم متجرك"
										: "Fill In Your Store Name In English"
								}
								value={addStoreName}
								onChange={(e) => {
									setAddStoreName(e.target.value);
								}}
							/>
						</div>

						<div className='col-md-5 pt-3 mx-auto'>
							<label>
								{language === "Arabic"
									? "اسم المتجر (بالعربية)"
									: "Store Name (Arabic)"}{" "}
								<span style={{ color: "red", fontWeight: "bold" }}>
									{" "}
									<strong>*</strong>{" "}
								</span>{" "}
							</label>
							<input
								className='form-control'
								type='text'
								placeholder={
									language === "Arabic"
										? "ادخل اسم متجرك بالعربية"
										: "Fill In Your Store Name In Arabic"
								}
								value={addStoreNameArabic}
								onChange={(e) => {
									setAddStoreNameArabic(e.target.value);
								}}
							/>

							<div className='w-100 mb-3 mt-3'>
								<label>
									{language === "Arabic"
										? "أيام إغلاق المتجر:"
										: "Store Closed on days:"}
								</label>
								<div className='checkboxes border-gray-200 border border-solid'>
									<div className='row'>
										<div className='col-md-1 col-6'>
											<label htmlFor='one' className='block '>
												<input
													type='checkbox'
													id='one'
													onChange={handleQueryChange}
													value='Saturday'
													className='m-3'
													checked={
														daysStoreClosed.daysStoreClosed.indexOf(
															"Saturday"
														) > -1
													}
												/>
												{language === "Arabic" ? "السبت" : "Saturday"}
											</label>
										</div>

										<div className='col-md-1 col-6'>
											<label htmlFor='two' className='block'>
												<input
													type='checkbox'
													id='two'
													onChange={handleQueryChange}
													value='Sunday'
													className='m-3'
													checked={
														daysStoreClosed.daysStoreClosed.indexOf("Sunday") >
														-1
													}
												/>
												{language === "Arabic" ? "الأحد" : "Sunday"}
											</label>
										</div>

										<div className='col-md-1 col-6 mx-auto'>
											<label htmlFor='three' className='block'>
												<input
													type='checkbox'
													id='three'
													onChange={handleQueryChange}
													value='Monday'
													className='m-3'
													checked={
														daysStoreClosed.daysStoreClosed.indexOf("Monday") >
														-1
													}
												/>
												{language === "Arabic" ? "الاثنين" : "Monday"}
											</label>
										</div>

										<div className='col-md-1 col-6 mx-auto'>
											<label htmlFor='four' className='block'>
												<input
													type='checkbox'
													id='four'
													onChange={handleQueryChange}
													value='Tuesday'
													className='m-3'
													checked={
														daysStoreClosed.daysStoreClosed.indexOf("Tuesday") >
														-1
													}
												/>
												{language === "Arabic" ? "الثلاثاء" : "Tuesday"}
											</label>
										</div>
										<div className='col-md-1 col-6 mx-auto'>
											<label htmlFor='five' className='block'>
												<input
													type='checkbox'
													id='five'
													onChange={handleQueryChange}
													value='Wednesday'
													className='m-3'
													checked={
														daysStoreClosed.daysStoreClosed.indexOf(
															"Wednesday"
														) > -1
													}
												/>
												{language === "Arabic" ? "الأربعاء" : "Wednesday"}
											</label>
										</div>
										<div className='col-md-1 col-6 mx-auto'>
											<label htmlFor='six' className='block'>
												<input
													type='checkbox'
													id='six'
													onChange={handleQueryChange}
													value='Thursday'
													className='m-3'
													checked={
														daysStoreClosed.daysStoreClosed.indexOf(
															"Thursday"
														) > -1
													}
												/>
												{language === "Arabic" ? "الخميس" : "Thursday"}
											</label>
										</div>
										<div className='col-md-1 col-6 mx-auto'>
											<label htmlFor='seven' className='block'>
												<input
													type='checkbox'
													id='seven'
													onChange={handleQueryChange}
													value='Friday'
													className='m-3'
													checked={
														daysStoreClosed.daysStoreClosed.indexOf("Friday") >
														-1
													}
												/>
												{language === "Arabic" ? "الجمعة" : "Friday"}
											</label>
										</div>
									</div>
								</div>
							</div>

							<div className='form-group'>
								<label className='text-muted'>
									{language === "Arabic"
										? "أضف التواريخ التي تكون فيها المتجر مغلقًا (مثل العطلات، عيد العمال ، وما إلى ذلك)؟"
										: "Add dates your store is closed (e.g. Holidays, labor day, etc...)"}
								</label>
								<br />
								<DatePicker
									className='inputFieldsFirstAvail w-100 mb-2'
									onChange={(date) =>
										setOneDateStoreOff(
											date || new Date(date._d).toLocaleDateString()
										)
									}
									disabledDate={disabledDate}
									max
									showToday={true}
									// defaultValue={moment()}
									placeholder={
										language === "Arabic"
											? "الرجاء اختيار مواعيد إغلاق الصالون المطلوبة"
											: "Please pick the desired store closing date"
									}
								/>
								<div className='ml-5 mb-1'>
									<button
										onClick={pushToAllDates}
										className='btn btn-outline-info mb-1  ml-5'
									>
										{language === "Arabic" ? "إضافة التاريخ" : "Add Date"}
									</button>
								</div>
							</div>

							<div className=' mb-5'>
								{datesStoreClosed && datesStoreClosed.length > 0 ? (
									<strong>
										{language === "Arabic"
											? "التواريخ المضافة:"
											: "Added Dates:"}
									</strong>
								) : null}
								<ul>
									{datesStoreClosed &&
										datesStoreClosed.length > 0 &&
										datesStoreClosed.map((i, e) => (
											<li
												className='mb-1'
												style={{
													listStyle: "none",
													marginLeft: "20px",
													fontSize: "12px",
												}}
												key={e}
											>
												{new Date(i).toDateString()}
												<span
													className='ml-2 removeButton'
													onClick={() => removeDay(e)}
													style={{ cursor: "pointer", fontWeight: "bolder" }}
												>
													X
												</span>
											</li>
										))}
								</ul>
							</div>

							<div className='form-group mt-3'>
								<StoreTimePicker
									language={language}
									openTime={openTime}
									setOpenTime={setOpenTime}
									closeTime={closeTime}
									setCloseTime={setCloseTime}
									allHours={allHours}
									setAllHours={setAllHours}
								/>
							</div>
						</div>
					</div>
					<div
						className='mx-auto text-center'
						onClick={() => {
							clickSubmit();
						}}
					>
						<button className='btn-success btn w-75'>SUBMIT CHANGES</button>
					</div>
				</>
			</Modal>
		</SalonNameAndGeneralWrapper>
	);
};

export default SalonNameAndGeneral;

const SalonNameAndGeneralWrapper = styled.div`
	z-index: 18000 !important;
`;
