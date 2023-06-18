/** @format */

import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
// import ReactGA from "react-ga";
import {Steps, Button, message} from "antd";
import styled from "styled-components";
import moment from "moment";
import Resizer from "react-image-file-resizer";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {Helmet} from "react-helmet";
import {
	cloudinaryCommentUpload,
	createScheduledAppointment,
	getServices,
	listScheduledOrders,
	read,
} from "../../../apiCore";
import {
	authenticate,
	getSingleUser,
	isAuthenticated,
	signin,
	signup,
} from "../../../auth";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
const {Step} = Steps;
const allDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const SchedulePageSteps2 = () => {
	const [current, setCurrent] = useState(0);
	const [scheduledHours, setScheduledHours] = useState([]);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [pickedEmployee, setPickedEmployee] = useState({});
	const [chosenTime, setChosenTime] = useState("");
	const [chosenDate, setChosenDate] = useState("");
	const [chosenService, setChosenService] = useState("");
	const [AllServices, setAllServices] = useState("");
	const [chosenTips, setChosenTips] = useState("");
	const [chosenTipOtherAmount, setChosenTipOtherAmount] = useState();
	const [TipsAmountFinal, setTipsAmountFinal] = useState(0);
	const [phone, setPhone] = useState("");
	const [scheduleComment, setScheduleComment] = useState("");
	const [scheduleAppointmentPhoto, setScheduleAppointmentPhoto] = useState([]);
	const [applyPoints, setApplyPoints] = useState(false);
	const [updatedUser, setUpdatedUser] = useState({});
	const [HistOrders, setHistOrders] = useState([]);
	const [addingANewPhone, setAddingNewPhone] = useState(false);
	const [signedInCheck, setsignedInCheck] = useState(false);
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState([]);

	const [allCustomerTypes, setAllCustomerTypes] = useState([]);
	const [chosenCustomerType, setChosenCustomerType] = useState("");
	const [fullName, setFullName] = useState("");

	const user = isAuthenticated() && isAuthenticated().user;
	const token = isAuthenticated() && isAuthenticated().token;
	let getChosenStore = JSON.parse(localStorage.getItem("chosenStore"));

	const {email} = user;
	const email_phone_Check = () => {
		if (
			user &&
			allDigits.indexOf(email.substring(0, 4)[0]) >= 0 &&
			allDigits.indexOf(email.substring(0, 4)[1]) >= 0 &&
			allDigits.indexOf(email.substring(0, 4)[2]) >= 0 &&
			allDigits.indexOf(email.substring(0, 4)[3]) >= 0 &&
			addingANewPhone === false
		) {
			return "Phone";
		} else {
			return "Email";
		}
	};

	useEffect(() => {
		let getChosenStore = JSON.parse(localStorage.getItem("chosenStore"));

		setAlreadySetLoyaltyPointsManagement(getChosenStore);

		setPhone(user.email);
		setFullName(user.name);

		// ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// // To Report Page View
		// ReactGA.pageview(window.location.pathname + window.location.search);

		// eslint-disable-next-line
	}, []);

	const checkLength = (i) => {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	};

	const NumberOfPointsForAwarding =
		alreadySetLoyaltyPointsManagement &&
		alreadySetLoyaltyPointsManagement.loyaltyPointsAward;

	const today = new Date();
	var todayDate =
		today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
	var h = today.getHours();
	var m = today.getMinutes();
	h = checkLength(h);
	m = checkLength(m);
	const timeNow = h + ":" + m;
	const discountedAmountFromLoyaltyPoints = (
		1 -
		Number(
			alreadySetLoyaltyPointsManagement &&
				alreadySetLoyaltyPointsManagement.discountPercentage
		) /
			100
	).toFixed(2);
	const onlineServices =
		alreadySetLoyaltyPointsManagement &&
		alreadySetLoyaltyPointsManagement.onlineServicesFees;
	// console.log(timeNow, "test yad");

	useEffect(() => {
		const pickedDateFirstAvailable = JSON.parse(
			localStorage.getItem("chosenDateFromFirstAvailable")
		);
		if (pickedDateFirstAvailable) {
			setChosenDate(new Date(pickedDateFirstAvailable).toLocaleDateString());
		} else {
			setChosenDate(new Date().toLocaleDateString());
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getAllService();
		getCurrentUser();
		loadOrders();
		isAuthenticated();

		const chosenStylistId = JSON.parse(localStorage.getItem("barber"));
		const pickedServiceFirstAvailable = JSON.parse(
			localStorage.getItem("pickedServiceFirstAvailable")
		);
		const CustomerType = JSON.parse(localStorage.getItem("CustomerType"));

		loadPickedEmployee(
			chosenStylistId,
			pickedServiceFirstAvailable,
			CustomerType
		);

		if (chosenTips === "Select a Tip") {
			setChosenTips("");
			setChosenTipOtherAmount("");
		} else if (chosenTips !== "Other amount") {
			setChosenTipOtherAmount("");
		}
		if (
			chosenTips !== "Select a Tip" &&
			chosenTips !== "Other amount" &&
			chosenTips
		) {
			setTipsAmountFinal(
				Number(chosenTips / 100) *
					Number(
						chosenServicePrice && chosenServicePrice.servicePriceDiscount / 1
					)
			);
		} else if (
			chosenTips !== "Select a Tip" &&
			chosenTips === "Other amount" &&
			chosenTipOtherAmount
		) {
			setTipsAmountFinal(chosenTipOtherAmount);
		} else {
			setTipsAmountFinal(0);
		}

		if (email_phone_Check() === "Phone") {
			setPhone(email);
		}
		// eslint-disable-next-line
	}, [
		chosenDate,
		chosenTime,
		chosenService,
		chosenTips,
		chosenTipOtherAmount,
		scheduleComment,
		phone,
		chosenCustomerType,
		signedInCheck,
	]);

	const handleScheduleTime = (event) => {
		setChosenTime(event.target.value);
	};
	const handleChosenService = (event) => {
		setChosenService(event.target.value);
	};

	const handleChosenCustomerType = (event) => {
		setChosenCustomerType(event.target.value);
	};

	const handleChosenTips = (event) => {
		setChosenTips(event.target.value);
	};
	const handleChosenTipOtherAmount = (event) => {
		setChosenTipOtherAmount(event.target.value);
	};

	const handlePhone = (event) => {
		setPhone(event.target.value);
	};

	const handleScheduleComment = (event) => {
		setScheduleComment(event.target.value);
	};
	const TipsValues = [5, 10, 15, 20, 25, 30];

	const loadPickedEmployee = (
		employeeId,
		pickedServiceFirstAvailable,
		CustomerType
	) => {
		setLoading(true);
		read(employeeId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setPickedEmployee(data);
				if (
					chosenDate &&
					new Date(chosenDate).toLocaleDateString() ===
						new Date(todayDate).toLocaleDateString()
				) {
					setScheduledHours(
						data &&
							data.workingHours &&
							data.workingHours.filter((i) => i >= timeNow) &&
							data.workingHours.filter((i) => i >= timeNow).sort()
					);
				} else {
					setScheduledHours(data && data.workingHours.sort());
				}
				if (pickedServiceFirstAvailable) {
					setChosenService(pickedServiceFirstAvailable.serviceName);
				}
				if (CustomerType) {
					setChosenCustomerType(CustomerType);
				}
				//--------------------------------------//
				//getting Services Associated With Picked Employee
				getServices("token", getChosenStore.storeId).then((data2) => {
					setLoading(true);

					if (data2.error) {
						console.log(data2.error);
					} else {
						var pickedEmployeePetsIncluded =
							data &&
							data.services &&
							data.services.map((ii) => ii.customerType);
						var pickedEmployeeServicesIncluded =
							data &&
							data.services &&
							data.services.map((ii) => ii.serviceName + ii.customerType);

						// console.log(
						// 	pickedEmployeeServicesIncluded,
						// 	"pickedEmployeeServicesIncluded from API",
						// );
						setAllCustomerTypes([
							...new Set(
								data2 &&
									data2.filter(
										(i) =>
											pickedEmployeePetsIncluded &&
											pickedEmployeePetsIncluded[0] &&
											pickedEmployeePetsIncluded.indexOf(i.customerType) !== -1
									) &&
									data2
										.filter(
											(i) =>
												pickedEmployeePetsIncluded &&
												pickedEmployeePetsIncluded[0] &&
												pickedEmployeePetsIncluded.indexOf(i.customerType) !==
													-1
										)
										.map((iii) => iii.customerType)
							),
						]);

						if (chosenCustomerType) {
							setAllServices(
								data2.filter((i) => i.activeService === true) &&
									data2
										.filter((i) => i.activeService === true)
										.map((ii) => ii) &&
									data2
										.filter((i) => i.activeService === true)
										.map((ii) => ii)
										.filter(
											(iv) =>
												iv.customerType === chosenCustomerType &&
												iv.serviceType === "package service" &&
												pickedEmployeeServicesIncluded &&
												pickedEmployeeServicesIncluded.indexOf(
													iv.serviceName + iv.customerType
												) !== -1
										)
							);
						}
					}
				});
			}
		});
		setLoading(false);
	};
	const getCurrentUser = () => {
		const userId =
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;
		getSingleUser(userId, token).then((data) => {
			if (data.error) {
				console.log("Error getting single user");
			} else {
				setUpdatedUser(data);
				// console.log(data, "user");
			}
		});
	};

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	const getAllService = () => {};

	const indexOfService =
		chosenService &&
		AllServices &&
		AllServices.map((service) => service.serviceName.toLowerCase()).indexOf(
			chosenService.toLowerCase()
		);
	const chosenServicePrice =
		chosenService && AllServices && indexOfService && indexOfService === 0
			? AllServices[indexOfService]
			: AllServices[indexOfService];

	const LoyaltyPoints =
		chosenService && AllServices && indexOfService && indexOfService === 0
			? AllServices[indexOfService] &&
			  AllServices[indexOfService].serviceLoyaltyPoints
			: AllServices[indexOfService] &&
			  AllServices[indexOfService].serviceLoyaltyPoints;

	var AllServicesModified =
		AllServices &&
		AllServices[0] &&
		AllServices.filter(
			(i) =>
				pickedEmployee.services &&
				pickedEmployee.services.map((s) => s.serviceName.toLowerCase()) &&
				pickedEmployee.services
					.map((s) => s.serviceName.toLowerCase())
					.indexOf(i.serviceName.toLowerCase()) >= 0
		);
	var ServiceTime_Duration =
		AllServices &&
		AllServices[0] &&
		AllServices.filter((i) => i.serviceName === chosenService) &&
		AllServices.filter((i) => i.serviceName === chosenService)[0];

	const loadOrders = () => {
		setLoading(true);
		const userId = user._id;
		listScheduledOrders(userId, token, getChosenStore.storeId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistOrders(
					data.filter(
						(i) =>
							new Date(i.scheduledDate).setHours(0, 0, 0, 0) ===
								new Date(chosenDate).setHours(0, 0, 0, 0) &&
							i.status !== "Cancelled"
					)
				);
				setLoading(false);
			}
		});
	};

	const alreadyScheduledTimesInchosenDate = () => {
		return (
			HistOrders &&
			HistOrders.map((i) => {
				if (
					new Date(i.scheduledDate).setHours(0, 0, 0, 0) ===
						new Date(chosenDate).setHours(0, 0, 0, 0) &&
					i.employeeId === pickedEmployee._id
				) {
					return i.scheduledTime;
				} else {
					return null;
				}
			}).filter((i2) => i2 !== null)
		);
	};

	const alreadyScheduledTimesInchosenDateV2 = () => {
		return (
			HistOrders &&
			HistOrders.map((i) => {
				if (
					new Date(i.scheduledDate).setHours(0, 0, 0, 0) ===
						new Date(chosenDate).setHours(0, 0, 0, 0) &&
					i.employeeId === pickedEmployee._id
				) {
					return {
						scheduledTime: i.scheduledTime,
						serviceDurationPeriods:
							i.serviceDuration === undefined ? 0 : i.serviceDuration / 15 - 1,
					};
				} else {
					return null;
				}
			}).filter((i2) => i2 !== null)
		);
	};

	const el3abatkollo = (periods, timing, lastPeriods) => {
		var finalAlreadyScheduledTimes = [];
		// eslint-disable-next-line
		var timeModified = new Date("1970-01-01" + " " + timing + ":00");
		timeModified = timeModified.setMinutes(
			timeModified.getMinutes() - lastPeriods * 15
		);
		// timeModified = new Date(
		// 	timeModified.setMinutes(timeModified.getMinutes() - periods * 15),
		// );
		var helper = new Date();
		for (let i = 0; i <= periods + lastPeriods; i++) {
			finalAlreadyScheduledTimes = [
				...finalAlreadyScheduledTimes,
				{
					scheduledTime: new Date(timeModified),

					serviceDuration: 0,
				},
			];

			helper = new Date(
				finalAlreadyScheduledTimes[
					finalAlreadyScheduledTimes.length - 1
				].scheduledTime
			);
			timeModified = helper.setMinutes(helper.getMinutes() + 15);
		}
		return finalAlreadyScheduledTimes.map((addedTimes) =>
			new Date(addedTimes.scheduledTime).toLocaleTimeString()
		);
	};

	// console.log(alreadyScheduledTimesInchosenDateV2(), "v2");

	var timesInBetweenAlreadyChosenTimes =
		alreadyScheduledTimesInchosenDateV2() &&
		alreadyScheduledTimesInchosenDateV2().map((i) =>
			el3abatkollo(
				i.serviceDurationPeriods,
				i.scheduledTime,
				ServiceTime_Duration && ServiceTime_Duration.serviceTime
					? ServiceTime_Duration.serviceTime / 15 - 1
					: 0
			)
		);

	var timesInBetweenAlreadyChosenTimesV2 = [].concat.apply(
		[],
		timesInBetweenAlreadyChosenTimes
	);

	var allAlreadyScheduledHoursWithDuplicates =
		timesInBetweenAlreadyChosenTimesV2.concat(
			alreadyScheduledTimesInchosenDate() && alreadyScheduledTimesInchosenDate()
		) &&
		timesInBetweenAlreadyChosenTimesV2
			.concat(
				alreadyScheduledTimesInchosenDate() &&
					alreadyScheduledTimesInchosenDate()
			)
			.map(
				(i) =>
					// eslint-disable-next-line
					checkLength(new Date("1970-01-01" + " " + i).getHours()).toString() +
					":" +
					// eslint-disable-next-line
					checkLength(new Date("1970-01-01" + " " + i).getMinutes()).toString()
			);
	var allAlreadyScheduledHoursFinal = [];
	allAlreadyScheduledHoursWithDuplicates.map((time) => {
		if (allAlreadyScheduledHoursFinal.indexOf(time) === -1) {
			return allAlreadyScheduledHoursFinal.push(time);
		}
		return allAlreadyScheduledHoursFinal.sort();
	});

	const availableHoursModified = () => {
		if (
			alreadyScheduledTimesInchosenDate() &&
			allAlreadyScheduledHoursFinal &&
			scheduledHours
		) {
			return scheduledHours
				.map((i) => {
					if (
						alreadyScheduledTimesInchosenDate() &&
						allAlreadyScheduledHoursFinal &&
						allAlreadyScheduledHoursFinal.indexOf(i) < 0
					) {
						return i;
					} else {
						return null;
					}
				})
				.filter((ii2) => ii2 !== null);
		}
	};

	var appointmentRange = () => {
		if (chosenTime) {
			// eslint-disable-next-line
			var timeModified = new Date("1970-01-01" + " " + chosenTime + ":00");
			var serviceDuration2 = ServiceTime_Duration
				? ServiceTime_Duration.serviceTime
				: 0;
			var helper = new Date(timeModified);
			var finalOutputDateTimeFormat = new Date(
				(timeModified = helper.setMinutes(
					helper.getMinutes() + serviceDuration2
				))
			);
			// eslint-disable-next-line
			var finalOutputTimeFormat =
				checkLength(finalOutputDateTimeFormat.getHours()) +
				":" +
				checkLength(finalOutputDateTimeFormat.getMinutes());
			// eslint-disable-next-line
			return chosenTime + " to " + finalOutputTimeFormat;
		}
	};

	var days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	var d = new Date(chosenDate);
	var chosenDateName = days[d.getDay()];

	var storeClosed_NotClosed =
		alreadySetLoyaltyPointsManagement &&
		alreadySetLoyaltyPointsManagement.daysStoreClosed &&
		alreadySetLoyaltyPointsManagement.daysStoreClosed.length > 0 &&
		alreadySetLoyaltyPointsManagement.daysStoreClosed.indexOf(chosenDateName) >
			-1;

	var storeClosed_NotClosedCustomized =
		alreadySetLoyaltyPointsManagement &&
		alreadySetLoyaltyPointsManagement.datesStoreClosed &&
		alreadySetLoyaltyPointsManagement.datesStoreClosed.length > 0 &&
		alreadySetLoyaltyPointsManagement.datesStoreClosed.indexOf(
			new Date(chosenDate._d || chosenDate).toLocaleDateString()
		) > -1;

	const fileUploadAndResizeCommentsPhotos = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = scheduleAppointmentPhoto;
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
						cloudinaryCommentUpload(user._id, token, {image: uri})
							.then((data) => {
								allUploadedFiles.push(data);

								setScheduleAppointmentPhoto({images: allUploadedFiles});
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

	const FileUploadComments = () => {
		return (
			<React.Fragment>
				<label
					className='btn btn-info btn-raised mb-3'
					style={{cursor: "pointer", fontSize: "0.80rem"}}
				>
					Please add the desired styling photo if available
					<input
						type='file'
						multiple
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeCommentsPhotos}
						required
					/>
				</label>
				<br />
				{scheduleAppointmentPhoto && scheduleAppointmentPhoto.images && (
					<React.Fragment>
						<img
							src={
								scheduleAppointmentPhoto &&
								scheduleAppointmentPhoto.images &&
								scheduleAppointmentPhoto.images[0].url
							}
							alt='CommentPhoto'
							style={{
								width: "80px",
								height: "80px",
								boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
							}}
						/>
						<button
							type='button'
							className='close '
							onClick={() => {
								setScheduleAppointmentPhoto([]);
							}}
							style={{
								transform: "translate(-2900%, -50%)",
								color: "white",
								background: "black",
								fontSize: "20px",
							}}
							aria-label='Close'
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	};

	const steps = [
		{
			title: <div className='FormTitle'>Appointment Date/Time</div>,
			content: (
				<FormStep1
					storeClosed_NotClosed={storeClosed_NotClosed}
					storeClosed_NotClosedCustomized={storeClosed_NotClosedCustomized}
					pickedEmployee={pickedEmployee}
					availableHoursModified={availableHoursModified}
					setChosenDate={setChosenDate}
					handleChosenCustomerType={handleChosenCustomerType}
					chosenCustomerType={chosenCustomerType}
					HistOrders={HistOrders}
					allCustomerTypes={allCustomerTypes}
					handleChosenService={handleChosenService}
					AllServicesModified={AllServicesModified}
					chosenService={chosenService}
					chosenDate={chosenDate}
					chosenDateName={chosenDateName}
					handleScheduleTime={handleScheduleTime}
					appointmentRange={appointmentRange}
					ServiceTime_Duration={ServiceTime_Duration}
					disabled={disabledDate}
					chosenTime={chosenTime}
				/>
			),
		},
		{
			title: <div className='FormTitle'>Add a Tip</div>,
			content: (
				<FormStep2
					pickedEmployee={pickedEmployee}
					chosenDate={chosenDate}
					chosenTime={chosenTime}
					ServiceTime_Duration={ServiceTime_Duration}
					chosenService={chosenService}
					chosenServicePrice={chosenServicePrice}
					chosenTips={chosenTips}
					chosenTipOtherAmount={chosenTipOtherAmount}
					handleChosenTipOtherAmount={handleChosenTipOtherAmount}
					handleChosenTips={handleChosenTips}
					TipsAmountFinal={TipsAmountFinal}
					appointmentRange={appointmentRange}
					onlineServices={onlineServices}
					TipsValues={TipsValues}
					fullName={fullName}
					setFullName={setFullName}
					phone={phone}
					setPhone={setPhone}
				/>
			),
		},
		{
			title: <div className='FormTitle'>Review</div>,
			content: (
				<FormStep3
					isAuthenticated={isAuthenticated}
					updatedUser={updatedUser}
					NumberOfPointsForAwarding={NumberOfPointsForAwarding}
					applyPoints={applyPoints}
					alreadySetLoyaltyPointsManagement={alreadySetLoyaltyPointsManagement}
					chosenService={chosenService}
					chosenDate={chosenDate}
					chosenServicePrice={chosenServicePrice}
					chosenTipOtherAmount={chosenTipOtherAmount}
					chosenTips={chosenTips}
					chosenTime={chosenTime}
					pickedEmployee={pickedEmployee}
					ServiceTime_Duration={ServiceTime_Duration}
					appointmentRange={appointmentRange}
					FileUploadComments={FileUploadComments}
					setPhone={setPhone}
					phone={phone}
					scheduleComment={scheduleComment}
					handleScheduleComment={handleScheduleComment}
					onlineServices={onlineServices}
					TipsAmountFinal={TipsAmountFinal}
					discountedAmountFromLoyaltyPoints={discountedAmountFromLoyaltyPoints}
					email_phone_Check={email_phone_Check}
					handlePhone={handlePhone}
					setApplyPoints={setApplyPoints}
					setAddingNewPhone={setAddingNewPhone}
					email={email}
					setCurrent={setCurrent}
				/>
			),
		},
	];

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const dataEnter1 = () => {
		if (chosenDate && chosenTime && chosenTime !== "Select Time") {
			return false;
		} else {
			return true;
		}
	};

	const dataEnter2 = () => {
		if (
			chosenDate &&
			chosenTime &&
			chosenService &&
			chosenService !== "Select a Service" &&
			chosenTime !== "Select Time" &&
			fullName &&
			phone &&
			phone.length >= 8
		) {
			return false;
		} else {
			return true;
		}
	};

	const dataEnter3 = () => {
		if (
			chosenDate &&
			chosenTime &&
			chosenService &&
			chosenService !== "Select a Service" &&
			chosenTime !== "Select Time" &&
			phone
		) {
			return false;
		} else {
			return true;
		}
	};

	var ScheduleStartsAt = () => {
		var helper = chosenDate && new Date(chosenDate).toLocaleDateString();

		return chosenTime && new Date(helper + " " + chosenTime);
	};

	var ScheduleEndsAt = () => {
		var helper = chosenDate && new Date(chosenDate).toLocaleDateString();
		var serviceTimeDuration = ServiceTime_Duration
			? ServiceTime_Duration.serviceTime
			: 0;
		return (
			chosenTime &&
			new Date(helper + " " + chosenTime).setMinutes(
				new Date(helper + " " + chosenTime).getMinutes() + serviceTimeDuration
			)
		);
	};

	// console.log(
	// 	ScheduleEndsAt() && new Date(ScheduleEndsAt()).toTimeString(),
	// 	"scheduledEndsAt",
	// );

	const clickSubmitSchedule_NoPayment = () => {
		window.scrollTo({top: 0, behavior: "smooth"});
		if (
			pickedEmployee &&
			pickedEmployee.workingDays[0] &&
			pickedEmployee.workingDays.indexOf(chosenDateName) < 0
		) {
			return toast.error(
				`${pickedEmployee.employeeName} is off today, Please chose another date`
			);
		}
		// console.log("scheduleSubmitted");
		if (alreadyScheduledTimesInchosenDate().indexOf(chosenTime) >= 0) {
			return toast.error(
				"This time was scheduled few moments ago, please choose another time"
			);
		}

		if (!phone) {
			return toast.error("Please Fill in Your Phone #...");
		}

		if (storeClosed_NotClosed) {
			return toast.error("Hair Salon is closed on the chosen date");
		}

		if (storeClosed_NotClosedCustomized) {
			return toast.error("Hair Salon is closed on the chosen date");
		}

		const createOrderData = {
			employees: [pickedEmployee],
			scheduledByUserName:
				isAuthenticated() &&
				isAuthenticated().user &&
				isAuthenticated().user.name,
			scheduledByUserEmail:
				isAuthenticated() &&
				isAuthenticated().user &&
				isAuthenticated().user.email,
			amount: applyPoints
				? (
						(Number(TipsAmountFinal) +
							Number(chosenServicePrice.servicePriceDiscount) +
							Number(onlineServices)) *
						discountedAmountFromLoyaltyPoints
				  ).toFixed(2)
				: Number(TipsAmountFinal) +
				  Number(chosenServicePrice.servicePriceDiscount) +
				  Number(onlineServices),
			paidTip: Number(TipsAmountFinal),
			tipPercentage: (
				Number(TipsAmountFinal) /
				Number(chosenServicePrice.servicePriceDiscount)
			).toFixed(2),
			servicePrice: chosenServicePrice.servicePriceDiscount,
			service: chosenServicePrice && chosenServicePrice.serviceName,
			serviceDetails: chosenServicePrice,
			serviceDuration: ServiceTime_Duration.serviceTime,
			LoyaltyPoints: LoyaltyPoints,
			scheduledDate: chosenDate._d || chosenDate,
			scheduledTime: chosenTime,
			scheduleEndsAt:
				ScheduleEndsAt() && new Date(ScheduleEndsAt()).toLocaleString(),
			scheduleStartsAt:
				ScheduleStartsAt() && new Date(ScheduleStartsAt()).toLocaleString(),
			paymentStatus: false,
			status: "Scheduled Online / Not Paid",
			minLoyaltyPointsForAward:
				alreadySetLoyaltyPointsManagement &&
				alreadySetLoyaltyPointsManagement.loyaltyPointsAward,
			onlineServicesFees: alreadySetLoyaltyPointsManagement.onlineServicesFees,
			phone: phone,
			scheduleAppointmentPhoto: scheduleAppointmentPhoto,
			appointmentComment: scheduleComment,
			discountedAmount: applyPoints
				? Number(TipsAmountFinal) +
				  Number(chosenServicePrice.servicePriceDiscount) +
				  Number(onlineServices) -
				  (
						(Number(TipsAmountFinal) +
							Number(chosenServicePrice.servicePriceDiscount) +
							Number(onlineServices)) *
						discountedAmountFromLoyaltyPoints
				  ).toFixed(2)
				: 0,
			discountedPercentage:
				alreadySetLoyaltyPointsManagement &&
				alreadySetLoyaltyPointsManagement.discountPercentage,
			BookedFrom: "Online",
			transaction_id: "",
			card_data: "",
			applyPoints: applyPoints,
			appliedCoupon: "Functionality Not added",
			// totalwithNoDiscounts: actualPaymentByUser,
			appliedCouponData: "Not added",
			firstPurchase: "Not added yet",
			belongsTo: getChosenStore.storeId,
			updatedByUser:
				isAuthenticated() &&
				isAuthenticated().user &&
				isAuthenticated().user._id,
			sharePaid: false,
		};
		var userId =
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;

		createScheduledAppointment(
			userId,
			token,
			createOrderData,
			getChosenStore.storeId
		).then((response) => {
			// console.log(response);
			// console.log("schedule booked");

			window.scrollTo({top: 0, behavior: "smooth"});
			localStorage.removeItem("barber");
			localStorage.removeItem("pickedServiceFirstAvailable");
			localStorage.removeItem("chosenDateFromFirstAvailable");
			localStorage.removeItem("CustomerType");

			// window.location.reload(false);
		});
		return setTimeout(function () {
			window.location.href = `/appointment-successfully-scheduled/YourAppointmentWasSuccesfullyScheduled/${userId}`;
		}, 1000);
	};

	return (
		<SchedulePage className='col-md-10 mx-auto mt-4'>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Infinite-Apps - Demo Schedule Form</title>
				<meta
					name='description'
					content='This is a demo website created by Infinite-Apps (Infinite Apps). This web app is mainly focusing on Barbershop business but it could be used for multiple other businesses like groomers / grooming salons, hair salons, nail salons, and even e-commerce platforms . Infinite Apps main goal is your comfort and growing your business.'
				/>
				<link rel='canonical' href='http://infinite-apps.com' />
			</Helmet>
			<div
				className='textResizeMain'
				style={{
					fontSize: "2rem",
					textAlign: "center",
					fontWeight: "bold",
					letterSpacing: "2px",
					color: "#000034",
				}}
			>
				Thank you for choosing "{alreadySetLoyaltyPointsManagement.addStoreName}
				"
			</div>

			<div
				className='textResizeMain my-3'
				style={{
					fontSize: "1.5rem",
					textAlign: "center",
					fontWeight: "bold",
					color: "#670000",
				}}
			>
				Schedule your appointment and never wait in line!
			</div>

			<Steps current={current}>
				{steps.map((item) => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>

			<div className='steps-content'>{steps[current].content}</div>
			<div className='steps-action text-center'>
				{current === 0 && (
					<React.Fragment>
						<Button
							disabled={dataEnter1()}
							type='primary'
							className='Buttons'
							style={{
								width: "20%",
								fontWeight: "bold",
								fontSize: "1.1rem",
							}}
							onClick={() => {
								next();
								window.scrollTo({top: 100, behavior: "smooth"});
							}}
						>
							Next
						</Button>
					</React.Fragment>
				)}
				{current === 1 && (
					<Button
						disabled={dataEnter2()}
						type='primary'
						className='Buttons'
						style={{
							width: "20%",
							fontWeight: "bold",
							fontSize: "1.1rem",
						}}
						onClick={() => {
							signup({
								name: fullName,
								email: phone,
								password: phone,
								password2: phone,
								phone: phone,
								storeType: "client",
								storeName: getChosenStore.addStoreName,
								storeAddress: "client",
								storeGovernorate: getChosenStore.belongsTo.storeGovernorate,
							}).then((data) => {
								if (data.error || data.misMatch) {
									console.log(data.error);
									signin({email: phone, password: phone}).then((data2) => {
										if (data2.error) {
											console.log(data2.error);
										} else if (data2.user.activeUser === false) {
											return toast.error(
												"User was deactivated, Please reach out to the admin site"
											);
										} else {
											console.log(data2);
											setsignedInCheck(true);
											authenticate(data2, () => {
												console.log("signed in");
											});
										}
									});
								} else {
									signin({email: phone, password: phone}).then((data2) => {
										if (data2.error) {
											console.log(data2.error);
										} else if (data2.user.activeUser === false) {
											return toast.error(
												"User was deactivated, Please reach out to the admin site"
											);
										} else {
											console.log(data2);
											setsignedInCheck(true);
											authenticate(data2, () => {
												console.log("signed in");
											});
										}
									});
								}
							});

							window.scrollTo({top: 150, behavior: "smooth"});
							next();
						}}
					>
						Next
					</Button>
				)}
				{current === steps.length - 1 && (!phone || phone.length <= 7) && (
					<Button
						disabled={dataEnter3()}
						className='Buttons'
						type='success'
						style={{
							width: "20%",
							backgroundColor: "darkgrey",
							color: "white",
							fontWeight: "bold",
							fontSize: "1rem",
						}}
						onClick={() => {
							message.success("Processing complete!");
							console.log("Success");
							window.scrollTo({top: 0, behavior: "smooth"});
							setCurrent(0);
						}}
					>
						Please Fill In Your Phone
					</Button>
				)}
				{current === steps.length - 1 &&
					phone &&
					phone.length > 7 &&
					alreadySetLoyaltyPointsManagement &&
					alreadySetLoyaltyPointsManagement.activeOnlineBooking && (
						<Button
							disabled={dataEnter2()}
							className='Buttons'
							type='success'
							style={{
								width: "20%",
								backgroundColor: "darkgreen",
								color: "white",
								fontWeight: "bold",
								fontSize: "1.1rem",
							}}
							onClick={() => {
								clickSubmitSchedule_NoPayment();
								message.success(() => {
									if (
										alreadyScheduledTimesInchosenDate().indexOf(chosenTime) >= 0
									) {
										return toast.error(
											"This time was scheduled few moments ago, please choose another time"
										);
									} else {
										return "Appoitnment was successfully scheduled!";
									}
								});
								window.scrollTo({top: 0, behavior: "smooth"});
							}}
						>
							Schedule Now
						</Button>
					)}

				{current > 0 && (
					<Button
						className='Buttons'
						style={{
							width: "25%",
							marginLeft: "10px",
							backgroundColor: "burlywood",
							color: "white",
							fontWeight: "bold",
							fontSize: "1.1rem",
						}}
						onClick={() => prev()}
					>
						Previous
					</Button>
				)}
				<Link
					to='/schedule'
					onClick={() => {
						window.scrollTo({top: 0, behavior: "smooth"});
					}}
				>
					<div className='continueShoppingEmpty  my-5'>
						Change Selected Stylist...
					</div>
				</Link>
			</div>
		</SchedulePage>
	);
};

export default SchedulePageSteps2;

const SchedulePage = styled.div`
	margin-bottom: 20px;
	th {
		font-size: 10px !important;
	}

	.steps-content {
		min-height: 450px;
		margin-top: 16px;
		padding-top: 20px;
		text-align: center;
		background-color: #fafafa;
		border: 1px dashed #e9e9e9;
		border-radius: 10px;
	}

	.steps-action {
		margin-top: 24px;
	}
	[data-theme="dark"] .steps-content {
		margin-top: 16px;
		border: 1px dashed #303030;
		background-color: rgba(255, 255, 255, 0.04);
		color: rgba(255, 255, 255, 0.65);
		padding-top: 80px;
	}

	@media (max-width: 1100px) {
		.formSecondStep {
			text-align: left;
		}

		.textResizeMain {
			font-size: 0.9rem !important;
			text-shadow: 0px 0px 0px !important;
			font-weight: bold !important;
		}

		.textResizeMain2 {
			font-size: 0.8rem !important;
			text-shadow: 0px 0px 0px !important;
			font-weight: bold !important;
		}

		.textResizeMessages {
			font-size: 0.65rem !important;
			text-shadow: 0px 0px 0px !important;
		}

		.dataPointsReview {
			font-size: 0.8rem !important;
			text-transform: capitalize !important;
		}
	}

	@media (max-width: 900px) {
		.ScheduleNowButton {
			font-size: 0.8rem !important;
			width: 40% !important;
		}
		.selectaTime {
			width: 80% !important;
		}
		.Buttons {
			width: 40% !important;
			font-size: 0.76rem !important;
		}
		.FormTitle {
			font-size: 0.7rem;
		}
		.inputFields {
			padding-top: 9px;
			padding-bottom: 9px;
			border: #cfcfcf solid 1px;
			border-radius: 4px !important;
			width: 80% !important;
			font-size: 0.8rem !important;
			box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.2);
			margin-bottom: 15px;
		}
		.ant-steps-item-icon {
			font-size: 12px;
			width: 25px;
			height: 25px;
			line-height: 25px;
		}
	}
`;
