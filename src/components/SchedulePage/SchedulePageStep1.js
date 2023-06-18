/** @format */

import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Steps, Button, message, DatePicker, Modal } from "antd";
import { isAuthenticated, getSingleUser } from "../../auth/index";
import styled from "styled-components";
import moment from "moment";
import Resizer from "react-image-file-resizer";
import {
	read,
	getServices,
	cloudinaryCommentUpload,
	createScheduledAppointment,
	listScheduledOrders,
} from "../apiCore";
import { allLoyaltyPointsAndStoreStatus } from "../../admin/apiAdmin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";
const { Step } = Steps;
const allDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const SchedulePageStep1 = () => {
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
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [applyPoints, setApplyPoints] = useState(false);
	const [updatedUser, setUpdatedUser] = useState({});
	const [HistOrders, setHistOrders] = useState([]);
	const [addingANewPhone, setAddingNewPhone] = useState(false);
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState([]);

	const user = isAuthenticated() && isAuthenticated().user;
	const token = isAuthenticated() && isAuthenticated().token;
	const { email } = user;
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
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, []);

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAlreadySetLoyaltyPointsManagement(data && data[data.length - 1]);
			}
		});
	};

	// console.log(alreadySetLoyaltyPointsManagement, "management");

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();
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
				alreadySetLoyaltyPointsManagement.discountPercentage,
		) /
			100
	).toFixed(2);
	const onlineServices =
		alreadySetLoyaltyPointsManagement &&
		alreadySetLoyaltyPointsManagement.onlineServicesFees;
	// console.log(timeNow, "test yad");

	useEffect(() => {
		const pickedDateFirstAvailable = JSON.parse(
			localStorage.getItem("chosenDateFromFirstAvailable"),
		);
		if (pickedDateFirstAvailable) {
			setChosenDate(new Date(pickedDateFirstAvailable).toLocaleDateString());
		} else {
			setChosenDate(new Date().toLocaleDateString());
		}
	}, []);

	const handleScheduleTime = (event) => {
		setChosenTime(event.target.value);
	};
	const handleChosenService = (event) => {
		setChosenService(event.target.value);
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

	const loadPickedEmployee = (employeeId, pickedServiceFirstAvailable) => {
		setLoading(true);
		read(employeeId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setPickedEmployee(data);
				if (
					chosenDate &&
					new Date(chosenDate).setHours(0, 0, 0, 0) ===
						new Date(todayDate).setHours(0, 0, 0, 0)
				) {
					setScheduledHours(
						data &&
							data.workingHours &&
							data.workingHours.filter((i) => i >= timeNow) &&
							data.workingHours.filter((i) => i >= timeNow).sort(),
					);
				} else {
					setScheduledHours(data && data.workingHours.sort());
				}
				if (pickedServiceFirstAvailable) {
					setChosenService(pickedServiceFirstAvailable.serviceName);
				}
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

	const getAllService = () => {
		getServices().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllServices(
					data.filter((i) => i.activeService === true) &&
						data.filter((i) => i.activeService === true).map((ii) => ii),
				);
			}
		});
	};

	const indexOfService =
		chosenService &&
		AllServices &&
		AllServices.map((service) => service.serviceName.toLowerCase()).indexOf(
			chosenService.toLowerCase(),
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
				pickedEmployee.services.indexOf(i.serviceName.toLowerCase()) >= 0,
		);
	var ServiceTime_Duration =
		AllServices &&
		AllServices[0] &&
		AllServices.filter((i) => i.serviceName === chosenService) &&
		AllServices.filter((i) => i.serviceName === chosenService)[0];

	// console.log(AllServicesModified, "Ahowan Yaddddddddddddddddddddd ");

	// console.log(pickedEmployee.services, "services attached to employee");
	// console.log(
	// 	AllServices.map((i) => i.serviceName.toLowerCase()),
	// 	"All Active Services",
	// );

	// console.log(LoyaltyPoints, "loyaltyPoints");

	const loadOrders = () => {
		setLoading(true);
		const userId = user._id;
		listScheduledOrders(userId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistOrders(
					data.filter(
						(i) =>
							new Date(i.scheduledDate).setHours(0, 0, 0, 0) ===
								new Date(chosenDate).setHours(0, 0, 0, 0) &&
							i.status !== "Cancelled",
					),
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
			timeModified.getMinutes() - lastPeriods * 15,
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
				].scheduledTime,
			);
			timeModified = helper.setMinutes(helper.getMinutes() + 15);
		}
		return finalAlreadyScheduledTimes.map((addedTimes) =>
			new Date(addedTimes.scheduledTime).toLocaleTimeString(),
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
					: 0,
			),
		);

	var timesInBetweenAlreadyChosenTimesV2 = [].concat.apply(
		[],
		timesInBetweenAlreadyChosenTimes,
	);

	var allAlreadyScheduledHoursWithDuplicates =
		timesInBetweenAlreadyChosenTimesV2.concat(
			alreadyScheduledTimesInchosenDate() &&
				alreadyScheduledTimesInchosenDate(),
		) &&
		timesInBetweenAlreadyChosenTimesV2
			.concat(
				alreadyScheduledTimesInchosenDate() &&
					alreadyScheduledTimesInchosenDate(),
			)
			.map(
				(i) =>
					// eslint-disable-next-line
					checkLength(new Date("1970-01-01" + " " + i).getHours()).toString() +
					":" +
					// eslint-disable-next-line
					checkLength(new Date("1970-01-01" + " " + i).getMinutes()).toString(),
			);
	var allAlreadyScheduledHoursFinal = [];
	allAlreadyScheduledHoursWithDuplicates.map((time) => {
		if (allAlreadyScheduledHoursFinal.indexOf(time) === -1) {
			return allAlreadyScheduledHoursFinal.push(time);
		}
		return allAlreadyScheduledHoursFinal.sort();
	});

	// console.log(allAlreadyScheduledHoursFinal, "everything yaba");

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
					helper.getMinutes() + serviceDuration2,
				)),
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

	console.log(appointmentRange(), "TimeModifiedV2 Yabaaaaaaaaaaaaaaaaaaa");

	// console.log(
	// 	alreadyScheduledTimesInchosenDate()
	// 		.sort()
	// 		.map((i) =>
	// 			new Date(
	// 				new Date("1970-01-01" + " " + i + ":00").setHours(
	// 					new Date("1970-01-01" + " " + i + ":00").getHours() + 2,
	// 				),
	// 			).toLocaleTimeString(),
	// 		),
	// );

	// console.log(
	// 	alreadyScheduledTimesInchosenDate() && alreadyScheduledTimesInchosenDate(),
	// 	"Already Scheduled Hours",
	// );
	// console.log(
	// 	scheduledHours.map((i) => i),
	// 	"modified",
	// );
	// console.log(HistOrders);
	useEffect(() => {
		isAuthenticated();
		const chosenStylistId = JSON.parse(localStorage.getItem("barber"));
		const pickedServiceFirstAvailable = JSON.parse(
			localStorage.getItem("pickedServiceFirstAvailable"),
		);

		loadPickedEmployee(chosenStylistId, pickedServiceFirstAvailable);
		getAllService();
		getCurrentUser();

		loadOrders();

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
						chosenServicePrice && chosenServicePrice.servicePriceDiscount / 1,
					),
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
		modalVisible,
		phone,
	]);

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
	// var storeClosed =
	// 	(alreadySetLoyaltyPointsManagement &&
	// 		alreadySetLoyaltyPointsManagement.daysStoreClosed &&
	// 		alreadySetLoyaltyPointsManagement.daysStoreClosed.indexOf(
	// 			days[today.getDay()],
	// 		)) >= 0;
	// console.log(storeClosed, "todayDate");

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
						cloudinaryCommentUpload(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setScheduleAppointmentPhoto({ images: allUploadedFiles });
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64",
				);
			}
		}
	};

	const FileUploadComments = () => {
		return (
			<React.Fragment>
				<label
					className='btn btn-info btn-raised mb-3'
					style={{ cursor: "pointer", fontSize: "0.80rem" }}>
					Please add a haircut photo
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
								transform: "translate(-2350%, -50%)",
								color: "white",
								background: "black",
								fontSize: "20px",
							}}
							aria-label='Close'>
							<span aria-hidden='true'>&times;</span>
						</button>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	};

	// console.log(
	// 	new Date(chosenDate._d).toLocaleDateString() === "Invalid Date" ||
	// 		new Date(chosenDate._d).toLocaleDateString() === undefined
	// 		? chosenDate
	// 		: new Date(chosenDate._d).toLocaleDateString(),
	// 	"elchosenDateyaba",
	// );

	const steps = [
		{
			title: <div className='FormTitle'>Appointment Date/Time</div>,
			content: (
				<div>
					<div className='float-left ml-5'>
						<span style={{ fontSize: "1.1rem", color: "black" }}>
							{" "}
							<strong> Stylist Name:</strong>{" "}
						</span>{" "}
						<span
							style={{
								color: "#00407f",
								fontSize: "1.1rem",
								fontWeight: "bold",
							}}>
							{pickedEmployee.employeeName}
						</span>
					</div>

					<br />
					<br />
					<label
						style={{
							fontWeight: "bold",
							fontSize: "1.05rem",
							color: "#660000",
							textShadow: "1px 2px 4px",
						}}>
						Select an Appointment Date
						<br />
						{availableHoursModified() && availableHoursModified().length < 1 && (
							<React.Fragment>
								<span style={{ fontSize: "0.75rem", color: "black" }}>
									{" "}
									Please note that {pickedEmployee.employeeName} is fully booked
									for the chosen date.
								</span>{" "}
							</React.Fragment>
						)}
						<React.Fragment>
							{pickedEmployee &&
							pickedEmployee.workingDays &&
							pickedEmployee.workingDays.indexOf(chosenDateName) < 0 &&
							availableHoursModified() &&
							availableHoursModified().length >= 1 ? (
								<React.Fragment>
									<span style={{ fontSize: "0.75rem", color: "black" }}>
										{" "}
										Please note that {pickedEmployee.employeeName} is off on the
										selected date, Please choose another date.
									</span>{" "}
								</React.Fragment>
							) : null}
						</React.Fragment>
					</label>

					<br />
					<DatePicker
						className='inputFields'
						onChange={(date) =>
							setChosenDate(date || new Date(date._d).toLocaleDateString())
						}
						disabledDate={disabledDate}
						max
						size='small'
						showToday={true}
						defaultValue={
							JSON.parse(localStorage.getItem("chosenDateFromFirstAvailable"))
								? moment(
										new Date(
											JSON.parse(
												localStorage.getItem("chosenDateFromFirstAvailable"),
											),
										),
								  )
								: moment()
						}
						placeholder='Please pick the desired schedule date'
						style={{
							height: "auto",
							width: "50%",
							marginBottom: "30px",
							padding: "10px",
							boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							borderRadius: "10px",
						}}
					/>
					<br />
					<React.Fragment>
						<label
							style={{
								fontWeight: "bold",
								fontSize: "1.05rem",
								color: "#660000",
								textShadow: "1px 2px 4px",
							}}>
							Select a Service
						</label>
						<br />
						<select
							onChange={handleChosenService}
							placeholder='Select a Service'
							className='inputFields'
							style={{
								paddingTop: "12px",
								paddingBottom: "12px",
								// paddingRight: "100px",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								width: "50%",
								textTransform: "capitalize",
								fontSize: "0.9rem",
								boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							}}>
							{chosenService && chosenService !== "Select a Service" ? (
								<option className='items text-muted inputFields'>
									{chosenService}
								</option>
							) : (
								<option className='items text-muted inputFields'>
									Select A Service
								</option>
							)}
							{pickedEmployee &&
								pickedEmployee.services &&
								AllServicesModified &&
								AllServicesModified.map((s, i) => (
									<option
										key={i}
										value={s.serviceName}
										className='items inputFields'>
										{s.serviceName}
									</option>
								))}
						</select>
						<br />
						<br />
					</React.Fragment>
					{chosenDate &&
					pickedEmployee &&
					chosenService &&
					pickedEmployee.workingDays &&
					pickedEmployee.workingDays.indexOf(chosenDateName) >= 0 ? (
						<React.Fragment>
							<label
								style={{
									fontWeight: "bold",
									fontSize: "1.05rem",
									color: "#660000",
									textShadow: "1px 2px 4px",
								}}>
								Select an Appointment Time
							</label>
							<br />
							<select
								onChange={handleScheduleTime}
								placeholder='Select a Time'
								className='inputFields mb-3'
								style={{
									paddingTop: "12px",
									paddingBottom: "12px",
									// paddingRight: "100px",
									border: "#cfcfcf solid 1px",
									borderRadius: "10px",
									width: "50%",
									fontSize: "0.9rem",
									boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
								}}>
								{chosenTime && chosenTime !== "Select Time" ? (
									<option className='items text-muted'>{chosenTime}</option>
								) : (
									<option className='items text-muted'>Select Time</option>
								)}

								{availableHoursModified() &&
									availableHoursModified().map((t, i) => (
										<option key={i} value={t} className='items'>
											{t}
										</option>
									))}
							</select>
							<br />
							{chosenTime && (
								<React.Fragment>
									<span
										style={{
											fontSize: "0.9rem",
											color: "black",
											fontWeight: "bold",
										}}>
										Your Appointment is scheduled from {appointmentRange()} (
										{ServiceTime_Duration.serviceTime} mins)
									</span>{" "}
								</React.Fragment>
							)}
						</React.Fragment>
					) : (
						<React.Fragment>
							<label
								style={{
									fontWeight: "bold",
									fontSize: "1.05rem",
									color: "#660000",
									textShadow: "1px 2px 4px",
								}}>
								Select an Appointment Time
							</label>
							<br />
							<select
								onChange={handleScheduleTime}
								className='selectaTime'
								placeholder='Select a Time'
								style={{
									paddingTop: "12px",
									paddingBottom: "12px",
									// paddingRight: "100px",
									// textAlign: "center",
									border: "#cfcfcf solid 1px",
									borderRadius: "10px",
									width: "50%",
									fontSize: "0.9rem",
									boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
								}}>
								<option className='items text-muted'>
									Please select a date and a service first
								</option>
							</select>
						</React.Fragment>
					)}
				</div>
			),
		},
		{
			title: <div className='FormTitle'>Add a Tip</div>,
			content: (
				<React.Fragment>
					<div className='row'>
						<div className=' col-md-4 m-2' style={{ textAlign: "left" }}>
							<div className='mb-2 '>
								<span
									style={{ fontSize: "1.1rem", color: "black" }}
									className='dataPointsReview2'>
									{" "}
									<strong> Stylist Name:</strong>{" "}
								</span>{" "}
								<span
									className='dataPointsReview2'
									style={{
										color: "#00407f",
										fontSize: "1.1rem",
										fontWeight: "bold",
									}}>
									{pickedEmployee.employeeName}
								</span>
							</div>

							{chosenDate && (
								<div className='mb-2 '>
									<span
										style={{ fontSize: "1.1rem", color: "black" }}
										className='dataPointsReview'>
										{" "}
										<strong> Appointment Scheduled On Date:</strong>{" "}
									</span>{" "}
									<span
										className='dataPointsReview'
										style={{
											color: "#00407f",
											fontSize: "1.1rem",
											fontWeight: "bold",
										}}>
										{new Date(chosenDate).toLocaleDateString()}
									</span>
								</div>
							)}

							{chosenTime && (
								<div className='mb-2 '>
									<span
										style={{ fontSize: "1.1rem", color: "black" }}
										className='dataPointsReview'>
										{" "}
										<strong> Appointment Scheduled:</strong>{" "}
									</span>{" "}
									<span
										className='dataPointsReview'
										style={{
											color: "#00407f",
											fontSize: "1.1rem",
											fontWeight: "bold",
										}}>
										From {appointmentRange()} (
										{ServiceTime_Duration.serviceTime} mins)
									</span>
								</div>
							)}

							{chosenService && chosenService !== "Select a Service" && (
								<div className='mb-2 '>
									<span
										style={{ fontSize: "1.1rem", color: "black" }}
										className='dataPointsReview'>
										{" "}
										<strong>Scheduled Service:</strong>{" "}
									</span>{" "}
									<span
										className='dataPointsReview'
										style={{
											color: "#00407f",
											fontSize: "1.1rem",
											fontWeight: "bold",
										}}>
										{chosenService}
									</span>
								</div>
							)}

							{chosenServicePrice && (
								<div className='mb-2 '>
									<span
										style={{ fontSize: "1.1rem", color: "black" }}
										className='dataPointsReview'>
										{" "}
										<strong>Scheduled Service Price:</strong>{" "}
									</span>{" "}
									<span
										className='dataPointsReview'
										style={{
											color: "#00407f",
											fontSize: "1.1rem",
											fontWeight: "bold",
										}}>
										${chosenServicePrice.servicePriceDiscount}
									</span>
								</div>
							)}

							{chosenTips &&
								chosenTips !== "Please Select A Service First" &&
								chosenTips !== "Select a Tip" &&
								chosenTips !== "Other amount" &&
								chosenService !== "Select a Service" && (
									<div className='mb-2 '>
										<span
											style={{ fontSize: "1.1rem", color: "black" }}
											className='dataPointsReview'>
											{" "}
											<strong>Added Tip:</strong>{" "}
										</span>{" "}
										<span
											className='dataPointsReview'
											style={{
												color: "#00407f",
												fontSize: "1.1rem",
												fontWeight: "bold",
											}}>
											$
											{Number(
												Number(chosenTips / 100).toFixed(2) *
													Number(chosenServicePrice.servicePriceDiscount / 1),
											).toFixed(2)}
										</span>
									</div>
								)}
							{chosenTipOtherAmount &&
								chosenService !== "Select a Service" &&
								chosenTips !== "Select a Tip" &&
								chosenTips === "Other amount" && (
									<div className='mb-2 '>
										<span
											style={{ fontSize: "1.1rem", color: "black" }}
											className='dataPointsReview'>
											{" "}
											<strong>Added Tip:</strong>{" "}
										</span>{" "}
										<span
											className='dataPointsReview'
											style={{
												color: "#00407f",
												fontSize: "1.1rem",
												fontWeight: "bold",
											}}>
											${Number(chosenTipOtherAmount) * 1}
										</span>
									</div>
								)}
						</div>
						<div className='col-md-7 m-2'>
							<label
								style={{
									fontWeight: "bold",
									fontSize: "1.05rem",
									color: "#660000",
									textShadow: "1px 2px 4px",
								}}>
								***Optional... Tips
							</label>
							<br />

							<select
								onChange={handleChosenTips}
								placeholder='Select a Tip'
								className='inputFields'
								style={{
									paddingTop: "12px",
									paddingBottom: "12px",
									// paddingRight: "100px",
									border: "#cfcfcf solid 1px",
									borderRadius: "10px",
									width: "50%",
									fontSize: "0.9rem",
									boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
								}}>
								{TipsAmountFinal &&
								TipsAmountFinal !== "Select a Tip" &&
								chosenTips !== "Select a Tip" ? (
									<option className='items text-muted'>
										${TipsAmountFinal}
									</option>
								) : (
									<option className='items text-muted'>Select a Tip</option>
								)}
								{chosenService && chosenService !== "Select a Service" ? (
									<React.Fragment>
										{TipsValues.map((t, i) => (
											<option key={i} value={t} className='items'>
												{t}%
											</option>
										))}
										<option className='items text-muted'>Other amount</option>
									</React.Fragment>
								) : (
									<option className='items text-muted'>
										Please Select A Service First
									</option>
								)}
							</select>
							{chosenTips === "Other amount" &&
								chosenService !== "Select a Service" && (
									<div className='mt-3'>
										<label
											className='mr-3'
											style={{
												fontWeight: "lighter",
												fontSize: "0.8rem",
												color: "#660000",
												textShadow: "1px 2px 4px",
											}}>
											Please select desired $ amount
										</label>
										<input
											type='number'
											onChange={handleChosenTipOtherAmount}
											value={chosenTipOtherAmount}
											style={{ borderRadius: "10px", textAlign: "center" }}
										/>
									</div>
								)}
						</div>
					</div>
				</React.Fragment>
			),
		},
		{
			title: <div className='FormTitle'>Review</div>,
			content: (
				<React.Fragment>
					<div className='mx-auto mb-3'>
						<span
							className='dataPointsReview2'
							style={{
								fontWeight: "lighter",
								fontSize: "1.3rem",
								color: "#660000",
								// textShadow: "1px 2px 4px",
							}}>
							Please review your booking info before scheduling
						</span>
						<React.Fragment>
							{isAuthenticated() &&
							updatedUser &&
							updatedUser.activePoints >= NumberOfPointsForAwarding ? (
								<div
									className='mt-2'
									style={{
										fontSize: "0.85rem",
										fontStyle: "italic",
										fontWeight: "bold",
										color: "green",
									}}>
									{!applyPoints && (
										<span>
											Congrats, you now have {updatedUser.activePoints} points,
											you can get{" "}
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.discountPercentage}
											% off!
										</span>
									)}
								</div>
							) : (
								<div
									className='mt-2'
									style={{
										fontSize: "0.75rem",
										fontStyle: "italic",
										fontWeight: "bold",
										color: "grey",
									}}>
									You currently have {updatedUser.activePoints} active points,
									you will need{" "}
									{NumberOfPointsForAwarding - updatedUser.activePoints} more
									points to get{" "}
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.discountPercentage}
									% off.
								</div>
							)}
						</React.Fragment>
						<React.Fragment>
							{isAuthenticated() &&
							updatedUser &&
							updatedUser.activePoints >= NumberOfPointsForAwarding ? (
								<div className=''>
									{!applyPoints && (
										<button
											onClick={() => setApplyPoints(true)}
											className='btn btn-success  m-3 card-btn-1 mx-auto'>
											Apply{" "}
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.discountPercentage}
											% off!
										</button>
									)}
									{applyPoints && (
										<div
											className='mt-2'
											style={{
												fontSize: "0.9rem",
												fontStyle: "italic",
												fontWeight: "bold",
												color: "green",
											}}>
											Thank you for applying your loyalty points, you got{" "}
											{alreadySetLoyaltyPointsManagement &&
												alreadySetLoyaltyPointsManagement.discountPercentage}
											% off!
										</div>
									)}
								</div>
							) : null}
						</React.Fragment>
					</div>
					<div className='row'>
						<div className=' col-md-5 my-auto'>
							<div className='mb-2 '>
								<span
									style={{ fontSize: "1.1rem", color: "black" }}
									className='dataPointsReview2'>
									{" "}
									<strong> Stylist Name:</strong>{" "}
								</span>{" "}
								<span
									className='dataPointsReview2'
									style={{
										color: "#00407f",
										fontSize: "1.1rem",
										fontWeight: "bold",
										marginBottom: "20px",
									}}>
									{pickedEmployee.employeeName}
								</span>
							</div>
							{chosenDate && (
								<div className='mb-2 '>
									<span
										style={{ fontSize: "1rem", color: "black" }}
										className='dataPointsReview'>
										{" "}
										<strong> Appointment Scheduled On Date:</strong>{" "}
									</span>{" "}
									<span
										className='dataPointsReview'
										style={{
											color: "#00407f",
											fontSize: "1rem",
											fontWeight: "bold",
										}}>
										{new Date(chosenDate).toLocaleDateString()}
									</span>
								</div>
							)}

							{chosenTime && (
								<div className='mb-2 '>
									<span
										style={{ fontSize: "1rem", color: "black" }}
										className='dataPointsReview'>
										{" "}
										<strong> Appointment Scheduled:</strong>{" "}
									</span>{" "}
									<span
										className='dataPointsReview'
										style={{
											color: "#00407f",
											fontSize: "1rem",
											fontWeight: "bold",
										}}>
										From {appointmentRange()} (
										{ServiceTime_Duration.serviceTime} mins)
									</span>
								</div>
							)}

							{chosenService && chosenService !== "Select a Service" && (
								<div className='mb-2 '>
									<span
										style={{ fontSize: "1rem", color: "black" }}
										className='dataPointsReview'>
										{" "}
										<strong>Scheduled Service:</strong>{" "}
									</span>{" "}
									<span
										className='dataPointsReview'
										style={{
											color: "#00407f",
											fontSize: "1rem",
											fontWeight: "bold",
										}}>
										{chosenService}
									</span>
								</div>
							)}

							{chosenServicePrice && (
								<div className='mb-2 '>
									<span
										style={{ fontSize: "1rem", color: "black" }}
										className='dataPointsReview'>
										{" "}
										<strong>Scheduled Service Price:</strong>{" "}
									</span>{" "}
									<span
										className='dataPointsReview'
										style={{
											color: "#00407f",
											fontSize: "1rem",
											fontWeight: "bold",
										}}>
										${chosenServicePrice.servicePriceDiscount}
									</span>
								</div>
							)}

							{chosenService !== "Select a Service" &&
								chosenTips !== "Select a Tip" &&
								chosenDate &&
								chosenTime && (
									<div className='mb-2 '>
										<span
											style={{ fontSize: "1rem", color: "black" }}
											className='dataPointsReview'>
											{" "}
											<strong>Online Services:</strong>{" "}
										</span>{" "}
										<span
											className='dataPointsReview'
											style={{
												color: "#00407f",
												fontSize: "1rem",
												fontWeight: "bold",
											}}>
											${Number(onlineServices) * 1}
										</span>
									</div>
								)}

							{chosenTips &&
								chosenTips !== "Please Select A Service First" &&
								chosenTips !== "Select a Tip" &&
								chosenTips !== "Other amount" &&
								chosenService !== "Select a Service" && (
									<div className='mb-2 '>
										<span
											style={{ fontSize: "1rem", color: "black" }}
											className='dataPointsReview'>
											{" "}
											<strong>Added Tip:</strong>{" "}
										</span>{" "}
										<span
											className='dataPointsReview'
											style={{
												color: "#00407f",
												fontSize: "1rem",
												fontWeight: "bold",
											}}>
											$
											{Number(
												Number(chosenTips / 100).toFixed(2) *
													Number(chosenServicePrice.servicePriceDiscount / 1),
											).toFixed(2)}
										</span>
									</div>
								)}
							{chosenTipOtherAmount &&
								chosenService !== "Select a Service" &&
								chosenTips !== "Select a Tip" &&
								chosenTips === "Other amount" && (
									<div className='mb-2 '>
										<span
											style={{ fontSize: "1rem", color: "black" }}
											className='dataPointsReview'>
											{" "}
											<strong>Added Tip:</strong>{" "}
										</span>{" "}
										<span
											className='dataPointsReview'
											style={{
												color: "#00407f",
												fontSize: "1rem",
												fontWeight: "bold",
											}}>
											${Number(chosenTipOtherAmount) * 1}
										</span>
									</div>
								)}
							<hr />
							{TipsAmountFinal >= 0 &&
								chosenService !== "Select a Service" &&
								chosenService &&
								chosenDate &&
								chosenTime && (
									<div className='my-2'>
										<span style={{ fontSize: "1.2rem", color: "black" }}>
											{" "}
											<strong>Total:</strong>{" "}
										</span>{" "}
										{applyPoints && (
											<span
												style={{
													color: "#00407f",
													fontSize: "1.2rem",
													fontWeight: "bold",
												}}>
												<s
													style={{
														color: "red",
														marginRight: "20px",
														fontSize: "1.1rem",
													}}>
													$
													{Number(TipsAmountFinal) +
														Number(chosenServicePrice.servicePriceDiscount) +
														Number(onlineServices)}
													{"     "}
												</s>
												$
												{(
													(Number(TipsAmountFinal) +
														Number(chosenServicePrice.servicePriceDiscount) +
														Number(onlineServices)) *
													discountedAmountFromLoyaltyPoints
												).toFixed(2)}
											</span>
										)}
										{!applyPoints && (
											<span
												style={{
													color: "#00407f",
													fontSize: "1.2rem",
													fontWeight: "bold",
												}}>
												$
												{(
													Number(TipsAmountFinal) +
													Number(chosenServicePrice.servicePriceDiscount) +
													Number(onlineServices)
												).toFixed(2)}
											</span>
										)}
									</div>
								)}
						</div>
						<div className='col-md-5 mx-auto'>
							{email_phone_Check() === "Phone" && (
								<div className=''>
									<span style={{ fontSize: "1rem", color: "black" }}>
										{" "}
										<strong>Your phone is:</strong>{" "}
									</span>{" "}
									<span
										style={{
											color: "#00407f",
											fontSize: "1rem",
											fontWeight: "bold",
										}}>
										{email}
									</span>
									<div style={{ color: "grey", fontSize: "12px" }}>
										Would you like to change your phone?{" "}
										<Link
											onClick={() => {
												setAddingNewPhone(true);
												setPhone("");
											}}>
											"Click here"
										</Link>
									</div>
								</div>
							)}
							<br />
							<label
								className='dataPointsReview'
								style={{
									fontWeight: "bold",
									fontSize: "1rem",
									color: "#00407f",
								}}>
								*Optional: Write a comment or upload a haircut photo.
							</label>
							<div className='mb-1'>{FileUploadComments()}</div>

							<textarea
								type='text'
								className='form-control'
								value={scheduleComment}
								onChange={handleScheduleComment}
								placeholder='If you have any further comments, Please add them here...'
							/>
							<br />
							{email_phone_Check() === "Email" && (
								<React.Fragment>
									<label
										className=''
										style={{
											fontWeight: "bold",
											fontSize: "1rem",
											color: "#00407f",
										}}>
										Phone
									</label>

									<input
										type='text'
										className='form-control'
										value={phone}
										onChange={handlePhone}
										placeholder='Please fill in your phone (**Required)'
										required
										minLength={9}
									/>
								</React.Fragment>
							)}
						</div>
					</div>
				</React.Fragment>
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
			chosenTime !== "Select Time"
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
				new Date(helper + " " + chosenTime).getMinutes() + serviceTimeDuration,
			)
		);
	};

	console.log(
		ScheduleEndsAt() && new Date(ScheduleEndsAt()).toTimeString(),
		"scheduledEndsAt",
	);

	const clickSubmitSchedule_NoPayment = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		if (
			pickedEmployee &&
			pickedEmployee.workingDays[0] &&
			pickedEmployee.workingDays.indexOf(chosenDateName) < 0
		) {
			return toast.error(
				`${pickedEmployee.employeeName} is off today, Please chose another date`,
			);
		}
		// console.log("scheduleSubmitted");
		if (alreadyScheduledTimesInchosenDate().indexOf(chosenTime) >= 0) {
			return toast.error(
				"This time was scheduled few moments ago, please choose another time",
			);
		}

		const createOrderData = {
			employees: [pickedEmployee],
			commentsByStylist: "",
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
			service: chosenService,
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
		};
		var userId =
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;

		createScheduledAppointment(userId, token, createOrderData).then(
			(response) => {
				// console.log(response);
				console.log("schedule booked");

				window.scrollTo({ top: 0, behavior: "smooth" });
				localStorage.removeItem("barber");
				// window.location.reload(false);
			},
		);
		return setTimeout(function () {
			window.location.href = `/appointment-successfully-scheduled/YourAppointmentWasSuccesfullyScheduled/${userId}`;
		}, 1000);
	};

	return (
		<SchedulePage className='col-md-10 mx-auto mt-4 ThankYouQuote'>
			<div
				className='ThankYouQuote'
				style={{
					fontSize: "2rem",
					textAlign: "center",
					fontWeight: "bold",
					letterSpacing: "2px",
					color: "#000034",
				}}>
				Thank you for choosing Barber Shop And Beauty
			</div>

			<div
				className='my-3 ThankYouQuote2'
				style={{
					fontSize: "1.5rem",
					textAlign: "center",
					fontWeight: "bold",
					color: "#670000",
				}}>
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
						{isAuthenticated() ? (
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
									window.scrollTo({ top: 150, behavior: "smooth" });
								}}>
								Next
							</Button>
						) : (
							<React.Fragment>
								<React.Fragment>
									<Button
										type='info'
										className='m-2 Buttons'
										style={{
											width: "20%",
											fontWeight: "bold",
											fontSize: "0.9rem",
											backgroundColor: "#000034",
											borderColor: "yellow",
											color: "whitesmoke",
											borderRadius: "15px",
										}}
										onClick={() => {
											setModalVisible2(!modalVisible2);
										}}>
										Please Login
									</Button>
									<Modal
										width={800}
										title={
											<div
												style={{
													textAlign: "center",
													margin: "10px",
													padding: "5px",
													fontWeight: "bold",
												}}>
												{`Please Login`}
											</div>
										}
										visible={modalVisible2}
										onOk={() => {
											setModalVisible2(false);
											toast.success(`Thank you for signing in with....`);
										}}
										okButtonProps={{ style: { display: "none" } }}
										cancelButtonProps={{ style: { display: "none" } }}
										onCancel={() => setModalVisible2(false)}>
										<div>
											<SigninModal />
										</div>
									</Modal>
								</React.Fragment>
								<React.Fragment>
									<Button
										className='Buttons m-2'
										type='primary'
										style={{
											width: "20%",
											fontWeight: "bold",
											fontSize: "0.9rem",
											backgroundColor: "#000034",
											borderColor: "yellow",
											color: "whitesmoke",
											borderRadius: "15px",
										}}
										onClick={() => {
											setModalVisible(!modalVisible);
										}}>
										Please Register
									</Button>
									<Modal
										width={800}
										title={
											<div
												style={{
													textAlign: "center",
													margin: "10px",
													padding: "5px",
													fontWeight: "bold",
												}}>
												{`Please Signup to be able to Schedule an Appointment 
												`}
											</div>
										}
										visible={modalVisible}
										onOk={() => {
											setModalVisible(false);
											toast.success(`Thank you for signing up with....`);
										}}
										okButtonProps={{ style: { display: "none" } }}
										cancelButtonProps={{ style: { display: "none" } }}
										onCancel={() => setModalVisible(false)}>
										<div>
											<SignupModal />
										</div>
									</Modal>
								</React.Fragment>
							</React.Fragment>
						)}
					</React.Fragment>
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
						onClick={() => prev()}>
						Previous
					</Button>
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
							window.scrollTo({ top: 300, behavior: "smooth" });
							next();
						}}>
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
							fontSize: "1rem",
						}}
						onClick={() => {
							message.success("Processing complete!");
							console.log("Success");
							window.scrollTo({ top: 0, behavior: "smooth" });
							setCurrent(0);
						}}>
						Phone is Required
					</Button>
				)}
				{current === steps.length - 1 && phone && phone.length > 7 && (
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
										"This time was scheduled few moments ago, please choose another time",
									);
								} else {
									return "Appoitnment was successfully scheduled!";
								}
							});
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						Schedule Now
					</Button>
				)}

				<Link
					to='/schedule'
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}>
					<div className='continueShoppingEmpty  my-5'>
						Change Selected Barber...
					</div>
				</Link>
			</div>
		</SchedulePage>
	);
};

export default SchedulePageStep1;

const SchedulePage = styled.div`
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
			width: 80% !important;
		}
		.ant-steps-item-icon {
			font-size: 12px;
			width: 25px;
			height: 25px;
			line-height: 25px;
		}
		.dataPointsReview {
			font-size: 0.8rem !important;
			text-transform: capitalize !important;
		}

		.dataPointsReview2 {
			font-size: 0.95rem !important;
			text-transform: capitalize !important;
		}

		.ThankYouQuote {
			font-size: 1.2rem !important;
		}
		.ThankYouQuote2 {
			font-size: 1rem !important;
		}
	}
`;
