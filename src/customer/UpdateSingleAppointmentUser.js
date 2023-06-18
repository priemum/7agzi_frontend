/** @format */

import React, {useState, useEffect} from "react";
import {DatePicker} from "antd";

import {isAuthenticated} from "../auth/index";
import {
	readSingleAppointment,
	getStatusValues,
	updateOrderStatus,
	UpdateScheduledAppointment,
} from "./apiUser";
import {
	read,
	getAllEmployees,
	listScheduledOrders,
	getServices,
} from "../apiCore";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import moment from "moment";

const UpdateSingleAppointmentUser = ({SingleAppointment, getChosenStore}) => {
	const [loading, setLoading] = useState(true);
	const [singleAppointment, setSingleAppointment] = useState({});
	const [statusValues, setStatusValues] = useState([]);
	//From here to update the Appointment
	const [chosenStylist, setChosenStylist] = useState({});
	const [chosenDate, setChosenDate] = useState("");
	const [chosenTime, setChosenTime] = useState("");
	const [scheduledHours, setScheduledHours] = useState([]);
	const [AllStylists, setAllStylists] = useState();
	const [HistOrders, setHistOrders] = useState([]);
	const [chosenService, setChosenService] = useState("");
	const [AllServices, setAllServices] = useState("");
	const [allCustomerTypes, setAllCustomerTypes] = useState([]);
	const [chosenCustomerType, setChosenCustomerType] = useState("");

	const {user, token} = isAuthenticated();

	const checkLength = (i) => {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	};

	const today = new Date();
	var todayDate =
		today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
	var h = today.getHours();
	var m = today.getMinutes();
	h = checkLength(h);
	m = checkLength(m);
	const timeNow = h + ":" + m;

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

	const loadSingleOrder = (AppointmentId, employeeId) => {
		setLoading(true);
		readSingleAppointment(user._id, token, AppointmentId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setSingleAppointment(data);
				setChosenDate(data.scheduledDate);
				setChosenTime(data.scheduledTime);
				setChosenService(data.service);
				setChosenCustomerType(data.serviceDetails.customerType);
				read(employeeId).then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						setChosenStylist(data2);
						if (
							data &&
							new Date(data.scheduledDate).setHours(0, 0, 0, 0) ===
								new Date(todayDate).setHours(0, 0, 0, 0)
						) {
							setScheduledHours(
								data2 &&
									data2.workingHours &&
									data2.workingHours.filter((i) => i >= timeNow) &&
									data2.workingHours.filter((i) => i >= timeNow).sort()
							);
						} else {
							setScheduledHours(data2 && data2.workingHours.sort());
						}
						const storeData2 = JSON.parse(localStorage.getItem("chosenStore"));
						getServices("Token", storeData2.storeId).then((data4) => {
							if (data4.error) {
								console.log(data4.error);
							} else {
								var pickedEmployeePetsIncluded =
									data2 &&
									data2.services &&
									data2.services.map((ii) => ii.customerType);
								setAllCustomerTypes([
									...new Set(
										data4 &&
											data4.filter(
												(i) =>
													pickedEmployeePetsIncluded &&
													pickedEmployeePetsIncluded.indexOf(i.customerType) !==
														-1
											) &&
											data4
												.filter(
													(i) =>
														pickedEmployeePetsIncluded &&
														pickedEmployeePetsIncluded.indexOf(
															i.customerType
														) !== -1
												)
												.map((iii) => iii.customerType)
									),
								]);
								if (data.serviceDetails.customerType) {
									setAllServices(
										data4.filter((i) => i.activeService === true) &&
											data4
												.filter((i) => i.activeService === true)
												.map((ii) => ii) &&
											data4
												.filter((i) => i.activeService === true)
												.map((ii) => ii)
												.filter(
													(iv) =>
														iv.customerType ===
															data.serviceDetails.customerType &&
														iv.serviceType === "package service"
												)
									);
								}
							}
						});
					}
				});

				setLoading(false);
			}
		});
	};

	const loadStatusValues = () => {
		getStatusValues(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setStatusValues(data.filter((e) => e === "Cancelled"));
			}
		});
	};

	const handleStatusChange = (e, orderId) => {
		var updatedByUser =
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;

		updateOrderStatus(
			user._id,
			token,
			orderId,
			e.target.value,
			updatedByUser
		).then((data) => {
			if (data.error) {
				console.log("Status update failed");
			} else {
				window.scrollTo({top: 0, behavior: "smooth"});
				window.location.reload(false);
			}
		});
	};

	const showStatus = (o) => (
		<React.Fragment>
			<div className='form-group'>
				<h3 className='mark mb-4'>Your Last Appointment Status: {o.status}</h3>
				<div
					style={{
						fontWeight: "bold",
						color: "red",
						textAlign: "center",
						marginBottom: "5px",
					}}
				>
					Would You Like To Cancel Your Appointment?
				</div>
				<select
					className='form-control'
					onChange={(e) => handleStatusChange(e, o._id)}
					style={{
						textAlign: "center",
						border: "#cfcfcf solid 1px",
						borderRadius: "10px",
						width: "100%",
						fontSize: "0.9rem",
						boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
					}}
				>
					<option>Would You Like To Cancel Your Appointment?</option>
					{statusValues.map((status, index) => (
						<option key={index} value={status}>
							Cancel This Appointment
						</option>
					))}
				</select>
			</div>
		</React.Fragment>
	);

	useEffect(() => {
		const AppointmentId = SingleAppointment && SingleAppointment._id;
		const employeeId =
			SingleAppointment &&
			SingleAppointment.employees &&
			SingleAppointment.employees[0] &&
			SingleAppointment.employees[0]._id;
		loadSingleOrder(AppointmentId, employeeId);

		loadStatusValues();
		localStorage.removeItem("barber");

		// eslint-disable-next-line
	}, [SingleAppointment]);

	// To Update The current Schedule
	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	var AllServicesModified =
		AllServices &&
		!loading &&
		AllServices[0] &&
		AllServices.filter(
			(i) =>
				chosenStylist.services &&
				chosenStylist.services.map((s) => s.serviceName.toLowerCase()) &&
				chosenStylist.services
					.map((s) => s.serviceName.toLowerCase())
					.indexOf(i.serviceName.toLowerCase()) >= 0
		);

	var ServiceTime_Duration =
		AllServices &&
		AllServices[0] &&
		AllServices.filter((i) => i.serviceName === chosenService) &&
		AllServices.filter((i) => i.serviceName === chosenService)[0];

	const handleUpdatedStylist = (event) => {
		var employeeId = event.target.value;
		read(employeeId).then((data) => {
			setLoading(true);
			if (data.error) {
				console.log(data.error);
			} else {
				setChosenStylist(data);
				if (
					chosenDate &&
					new Date(chosenDate).setHours(0, 0, 0, 0) ===
						new Date(todayDate).setHours(0, 0, 0, 0)
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
				localStorage.setItem(
					"chosenStylistUpdate",
					JSON.stringify(data.employeeName)
				);

				setLoading(false);
			}
		});
	};
	const handleScheduleTime = (event) => {
		setChosenTime(event.target.value);
	};
	const handleChosenService = (event) => {
		setChosenService(event.target.value);
	};

	const handleChosenCustomerType = (event) => {
		setChosenCustomerType(event.target.value);
	};

	const loadOrders = (ownerId) => {
		listScheduledOrders(user._id, token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistOrders(
					data.filter(
						(i) =>
							new Date(i.scheduledDate).setHours(0, 0, 0, 0) >=
								new Date(chosenDate).setHours(0, 0, 0, 0) &&
							i.status !== "Cancelled"
					)
				);
				getAllEmployees(ownerId).then((data) => {
					setLoading(true);
					if (data.error) {
						console.log(data.error);
					} else {
						setAllStylists(data);
						setLoading(false);
					}
				});
			}
		});
	};

	useEffect(() => {
		loadOrders(getChosenStore && getChosenStore.storeId);
		// eslint-disable-next-line
	}, [chosenStylist, chosenService, chosenCustomerType]);

	const alreadyScheduledTimesInchosenDate = () => {
		return (
			HistOrders &&
			HistOrders.map((i) => {
				if (
					new Date(i.scheduledDate).setHours(0, 0, 0, 0) ===
						new Date(chosenDate).setHours(0, 0, 0, 0) &&
					i.employeeId === chosenStylist._id
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
					i.employeeId === chosenStylist._id
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

	const checkOldTimes = (timing) => {
		var todaysTime =
			// eslint-disable-next-line
			checkLength(new Date().getHours()).toString() +
			":" +
			// eslint-disable-next-line
			checkLength(new Date().getMinutes()).toString();

		//
		// eslint-disable-next-line
		var timeModified = new Date("1970-01-01" + " " + timing + ":00");
		timeModified = timeModified.setMinutes(timeModified.getMinutes() - 120);
		timeModified = new Date(timeModified).toLocaleTimeString();
		timeModified =
			checkLength(
				// eslint-disable-next-line
				new Date("1970-01-01" + " " + timeModified).getHours()
			).toString() +
			":" +
			// eslint-disable-next-line
			checkLength(
				// eslint-disable-next-line
				new Date("1970-01-01" + " " + timeModified).getMinutes()
			).toString();
		//

		if (
			new Date().setHours(0, 0, 0, 0) >
			new Date(
				singleAppointment && singleAppointment.scheduleStartsAt
			).setHours(0, 0, 0, 0)
		) {
			return false;
		} else if (
			new Date().setHours(0, 0, 0, 0) <
			new Date(
				singleAppointment && singleAppointment.scheduleStartsAt
			).setHours(0, 0, 0, 0)
		) {
			return true;
		} else if (timeModified >= todaysTime) {
			return true;
		} else {
			return false;
		}
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

	var chosenStylistLocalStorage = JSON.parse(
		localStorage.getItem("chosenStylistUpdate")
	);

	const updatingTheStylist = () => {
		return (
			<div className='form-group' style={{textAlign: "center"}}>
				<div className='mt-3'>
					<label
						style={{
							fontWeight: "bold",
							fontSize: "1.05rem",
							color: "#660000",
							textShadow: "1px 2px 4px",
						}}
					>
						Update Stylist
						<span
							className='ml-2'
							style={{
								fontSize: "0.75rem",
								fontStyle: "italic",
								fontWeight: "bold",
								color: "darkgrey",
							}}
						>
							***Optional.
						</span>
					</label>
					<br />
					<select
						onChange={handleUpdatedStylist}
						style={{
							paddingTop: "12px",
							paddingBottom: "12px",
							// paddingRight: "100px",
							// textAlign: "center",
							border: "#cfcfcf solid 1px",
							borderRadius: "10px",
							width: "80%",
							fontSize: "0.9rem",
							boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						}}
					>
						<React.Fragment>
							{chosenStylistLocalStorage ? (
								<React.Fragment>
									<option className=' text-muted'>
										{chosenStylistLocalStorage && !loading
											? chosenStylistLocalStorage
											: "Please Select"}
									</option>
									{AllStylists &&
										!loading &&
										AllStylists.map((s, i) => (
											<option key={i} value={s._id} className=''>
												{s.employeeName}
											</option>
										))}
								</React.Fragment>
							) : (
								<React.Fragment>
									<option className=' text-muted'>
										{chosenStylist && !loading
											? chosenStylist.employeeName
											: "Please Select"}
									</option>
									{AllStylists &&
										!loading &&
										AllStylists.map((s, i) => (
											<option key={i} value={s._id} className=''>
												{s.employeeName}
											</option>
										))}
								</React.Fragment>
							)}
						</React.Fragment>
					</select>
				</div>
			</div>
		);
	};

	const updatingChosenService = () => {
		return (
			<div className='form-group' style={{textAlign: "center"}}>
				<div className='mt-3'>
					<label
						style={{
							fontWeight: "bold",
							fontSize: "1.05rem",
							color: "#660000",
							textShadow: "1px 2px 4px",
						}}
					>
						Update Services
					</label>
					<br />
					<select
						onChange={handleChosenService}
						style={{
							paddingTop: "12px",
							paddingBottom: "12px",
							// paddingRight: "100px",
							// textAlign: "center",
							border: "#cfcfcf solid 1px",
							borderRadius: "10px",
							width: "80%",
							fontSize: "0.9rem",
							boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						}}
					>
						<option className=' text-muted'>
							{chosenService && !loading ? chosenService : "Please Select"}
						</option>
						{AllServicesModified &&
							!loading &&
							AllServicesModified.map((s, i) => (
								<option key={i} value={s.serviceName} className=''>
									{s.serviceName}
								</option>
							))}
					</select>
				</div>
			</div>
		);
	};

	const updatingCustomerType = () => {
		return (
			<div className='form-group' style={{textAlign: "center"}}>
				<div className='mt-3'>
					<label
						style={{
							fontWeight: "bold",
							fontSize: "1.05rem",
							color: "#660000",
							textShadow: "1px 2px 4px",
						}}
					>
						Update Customer Type
					</label>
					<br />
					<select
						onChange={handleChosenCustomerType}
						style={{
							paddingTop: "12px",
							paddingBottom: "12px",
							paddingRight: "100px",
							// textAlign: "center",
							border: "#cfcfcf solid 1px",
							borderRadius: "10px",
							width: "80%",
							fontSize: "0.9rem",
							boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						}}
					>
						<option className=' text-muted'>
							{chosenService && chosenCustomerType && !loading
								? chosenCustomerType
								: "Please Select"}
						</option>
						{allCustomerTypes &&
							!loading &&
							allCustomerTypes.map((s, i) => (
								<option key={i} value={s} className=''>
									{s}
								</option>
							))}
					</select>
				</div>
			</div>
		);
	};

	const updatingChosenDate = () => {
		return (
			<div style={{textAlign: "center"}}>
				<label
					style={{
						fontWeight: "bold",
						fontSize: "1.05rem",
						color: "#660000",
						textShadow: "1px 2px 4px",
					}}
				>
					Update Appointment Date
					<br />
					{availableHoursModified() && availableHoursModified().length < 1 && (
						<React.Fragment>
							<span style={{fontSize: "0.75rem", color: "black"}}>
								{" "}
								Please note that {chosenStylist.employeeName} is fully booked
								for the chosen date.
							</span>{" "}
						</React.Fragment>
					)}
					<React.Fragment>
						{chosenStylist &&
							chosenStylist.workingDays &&
							chosenStylist.workingDays.indexOf(chosenDateName) < 0 && (
								<React.Fragment>
									<span style={{fontSize: "0.75rem", color: "black"}}>
										{" "}
										Please note that {chosenStylist.employeeName} is off on the
										selected date, Please choose another date.
									</span>{" "}
								</React.Fragment>
							)}
					</React.Fragment>
				</label>
				<div
					style={{
						fontSize: "12px",
						color: "grey",
						fontWeight: "bold",
						textAlign: "center",
					}}
				>
					Your Current Scheduled Date is (
					{new Date(singleAppointment.scheduledDate).toLocaleDateString()})
				</div>
				<br />
				<DatePicker
					className='inputFields'
					onChange={(date) => {
						if (
							date &&
							new Date(date._d).toLocaleDateString() ===
								new Date(todayDate).toLocaleDateString()
						) {
							setScheduledHours(
								chosenStylist &&
									chosenStylist.workingHours &&
									chosenStylist.workingHours.filter((i) => i >= timeNow) &&
									chosenStylist.workingHours.filter((i) => i >= timeNow).sort()
							);
						} else {
							setScheduledHours(
								chosenStylist && chosenStylist.workingHours.sort()
							);
						}
						setChosenDate(date || new Date(date._d).toLocaleDateString());
					}}
					disabledDate={disabledDate}
					max
					showToday={true}
					defaultValue={moment(
						new Date(singleAppointment.scheduledDate).toDateString()
					)}
					placeholder='Please update schedule date'
					style={{
						height: "auto",
						width: "80%",
						marginBottom: "30px",
						padding: "10px",
						boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						borderRadius: "10px",
					}}
				/>
			</div>
		);
	};

	const updatingChosenTime = () => {
		return (
			<div style={{textAlign: "center"}}>
				{chosenDate &&
				chosenStylist &&
				chosenService &&
				chosenStylist.workingDays &&
				chosenStylist.workingDays.indexOf(chosenDateName) >= 0 ? (
					<React.Fragment>
						<label
							style={{
								fontWeight: "bold",
								fontSize: "1.05rem",
								color: "#660000",
								textShadow: "1px 2px 4px",
							}}
						>
							Update Appointment Time
						</label>
						<div
							style={{
								fontSize: "12px",
								color: "grey",
								fontWeight: "bold",
								textAlign: "center",
							}}
						>
							Your Current Scheduled Time is ({singleAppointment.scheduledTime})
						</div>
						<br />
						<select
							onChange={handleScheduleTime}
							placeholder='Select a Time'
							className='inputFields mb-3'
							style={{
								paddingTop: "12px",
								paddingBottom: "12px",
								// paddingRight: "100px",
								// textAlign: "center",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								width: "80%",
								fontSize: "0.9rem",
								boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							}}
						>
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
									}}
								>
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
							}}
						>
							Update Appointment Time
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
								width: "80%",
								fontSize: "0.9rem",
								boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							}}
						>
							<option className='items text-muted'>
								Please select a date and a service first
							</option>
						</select>
					</React.Fragment>
				)}
			</div>
		);
	};

	const indexOfService =
		chosenService &&
		AllServices &&
		AllServices.map((service) => service.serviceName.toLowerCase()).indexOf(
			chosenService.toLowerCase()
		);

	const chosenServicePrice =
		AllServices && chosenService && indexOfService && indexOfService === 0
			? AllServices[indexOfService]
			: AllServices[indexOfService];

	const LoyaltyPoints =
		chosenService && AllServices && indexOfService && indexOfService === 0
			? AllServices[indexOfService] &&
			  AllServices[indexOfService].serviceLoyaltyPoints
			: AllServices[indexOfService] &&
			  AllServices[indexOfService].serviceLoyaltyPoints;

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

	const updateScheduleDateTime = () => {
		window.scrollTo({top: 0, behavior: "smooth"});
		if (
			chosenStylist &&
			chosenStylist.workingDays[0] &&
			chosenStylist.workingDays.indexOf(chosenDateName) < 0
		) {
			return toast.error(
				`${chosenStylist.employeeName} is off on the chosen date, Please choose another date`
			);
		}
		// console.log("scheduleSubmitted");
		if (
			alreadyScheduledTimesInchosenDate().indexOf(chosenTime) >= 0 &&
			chosenTime !== singleAppointment.scheduledTime
		) {
			return toast.error(
				"This time was scheduled few moments ago, please choose another time"
			);
		}

		if (!chosenTime) {
			return toast.error("Nothing was changed to update");
		}

		if (storeClosed_NotClosed) {
			return toast.error("Hair Salon is closed on the chosen date");
		}

		if (storeClosed_NotClosedCustomized) {
			return toast.error("Hair Salon is closed on the chosen date");
		}

		var totalAmountPaid = singleAppointment.applyPoints
			? Number(
					Number(
						chosenServicePrice && chosenServicePrice.servicePriceDiscount
					) * singleAppointment.tipPercentage
			  ) +
			  Number(chosenServicePrice.servicePriceDiscount) +
			  Number(singleAppointment.onlineServicesFees) -
			  (
					(Number(chosenServicePrice.servicePriceDiscount) *
						singleAppointment.tipPercentage +
						Number(chosenServicePrice.servicePriceDiscount) +
						Number(singleAppointment.onlineServicesFees)) *
					(singleAppointment.discountedPercentage / 100)
			  ).toFixed(2)
			: Number(
					Number(chosenServicePrice.servicePriceDiscount) *
						singleAppointment.tipPercentage
			  ) +
			  Number(chosenServicePrice.servicePriceDiscount) +
			  Number(singleAppointment.onlineServicesFees);

		var discountedAmountUpdated = singleAppointment.applyPoints
			? (
					(Number(chosenServicePrice.servicePriceDiscount) *
						singleAppointment.tipPercentage +
						Number(chosenServicePrice.servicePriceDiscount) +
						Number(singleAppointment.onlineServicesFees)) *
					(singleAppointment.discountedPercentage / 100)
			  ).toFixed(2)
			: 0;

		const appointmentData = {
			orderDetails: singleAppointment,
			employees: [chosenStylist],
			scheduledByUserName:
				singleAppointment && singleAppointment.scheduledByUserName,
			scheduledByUserEmail:
				singleAppointment && singleAppointment.scheduledByUserEmail,
			amount: totalAmountPaid && totalAmountPaid,
			applyPoints: singleAppointment.applyPoints,
			paidTip:
				Number(chosenServicePrice.servicePriceDiscount) *
				singleAppointment.tipPercentage,
			tipPercentage: singleAppointment && singleAppointment.tipPercentage,
			servicePrice: chosenServicePrice.servicePriceDiscount,
			service: chosenService,
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
			minLoyaltyPointsForAward: singleAppointment.minLoyaltyPointsForAward,
			onlineServicesFees: singleAppointment.onlineServicesFees,
			phone: singleAppointment.phone,
			scheduleAppointmentPhoto: singleAppointment.scheduleAppointmentPhoto,
			appointmentComment: singleAppointment.scheduleComment,
			discountedPercentage: singleAppointment.discountedPercentage,
			discountedAmount: discountedAmountUpdated,
			transaction_id: "",
			card_data: "",
			appliedCoupon: "Functionality Not added",
			// totalwithNoDiscounts: actualPaymentByUser,
			appliedCouponData: "Not added",
			firstPurchase: "Not added yet",
			sharePaid: singleAppointment.sharePaid,
			updatedByUser:
				isAuthenticated() &&
				isAuthenticated().user &&
				isAuthenticated().user._id,
		};

		var userId =
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;
		var scheduleorderId = singleAppointment._id;

		UpdateScheduledAppointment(
			scheduleorderId,
			userId,
			token,
			appointmentData
		).then((response) => {
			// console.log(response);
			console.log("schedule booked");

			window.scrollTo({top: 0, behavior: "smooth"});
			localStorage.removeItem("barber");
			window.location.reload(false);
		});
	};

	var storeClosed_NotClosed =
		getChosenStore &&
		getChosenStore.daysStoreClosed &&
		getChosenStore.daysStoreClosed.length > 0 &&
		getChosenStore.daysStoreClosed.indexOf(chosenDateName) > -1;

	var storeClosed_NotClosedCustomized =
		getChosenStore &&
		getChosenStore.datesStoreClosed &&
		getChosenStore.datesStoreClosed.length > 0 &&
		getChosenStore.datesStoreClosed.indexOf(
			new Date(chosenDate._d || chosenDate).toLocaleDateString()
		) > -1;

	return (
		<React.Fragment>
			{loading ? (
				<div>
					<div
						style={{
							fontSize: "2rem",
							textAlign: "center",
							marginTop: "50px",
							color: "darkslategray",
							fontWeight: "bold",
						}}
					>
						Loading...
					</div>
				</div>
			) : (
				<React.Fragment>
					{singleAppointment &&
					singleAppointment.status === "Cancelled" ? null : (
						<React.Fragment>
							{(singleAppointment &&
								singleAppointment.status === "Cancelled") ||
							singleAppointment.status === "Scheduled Online / Paid in Store" ||
							singleAppointment.status ===
								"Scheduled From Store / Paid" ? null : (
								<React.Fragment>
									<div className='row'>
										<div className='col-md-8 mx-auto mb-5'>
											<div
												className='mt-3'
												style={{
													border: "3px solid black",
													boxShadow: "4px 4px 2px 2px rgba(0,0,0,0.3)",
												}}
											>
												<div
													style={{
														fontSize: "1.35rem",
														fontWeight: "bold",
														color: "darkturquoise",
														textAlign: "center",
														textShadow: "2px 2px 4px",
														fontStyle: "italic",
														letterSpacing: "4px",
													}}
												>
													Update Your Last Appointment:
												</div>
												<div className='col-md-6 mx-auto'>
													<hr />
												</div>
												{storeClosed_NotClosed && (
													<div
														style={{
															fontSize: "0.8rem",
															color: "red",
															fontWeight: "bold",
															textAlign: "center",
														}}
													>
														Hair Salon is closed on the chosen date, Please
														select another date.
													</div>
												)}
												{storeClosed_NotClosedCustomized && (
													<div
														style={{
															fontSize: "0.8rem",
															color: "red",
															fontWeight: "bold",
															textAlign: "center",
														}}
													>
														Hair Salon is closed on the chosen date, Please
														select another date.
													</div>
												)}
												<li className='list-group-item'>
													{checkOldTimes(
														singleAppointment && singleAppointment.scheduledTime
													) && singleAppointment ? (
														<React.Fragment>
															{showStatus(singleAppointment)}
														</React.Fragment>
													) : (
														<div
															className='col-md-10 my-5 mx-auto'
															style={{
																textAlign: "center",
																fontWeight: "bold",
																color: "royalblue",
															}}
														>
															Your Appointment Cannot Be Cancelled, Please Call
															Our Barber Shop Or Re-schedule it from below
														</div>
													)}
												</li>
												<hr />

												<div className='row'>
													{singleAppointment &&
													singleAppointment.status === "Cancelled" ? (
														<div
															className='col-md-6 my-5 mx-auto'
															style={{
																textAlign: "center",
																fontWeight: "bold",
																color: "royalblue",
															}}
														>
															Your Appointment Was Cancelled, Please Re-schedule
															The Appointment.
														</div>
													) : (
														<React.Fragment>
															<div className='col-md-6'>
																{updatingCustomerType()}
															</div>
															<div className='col-md-6'>
																{updatingTheStylist()}
															</div>
															<div className='col-md-6'>
																{updatingChosenService()}
															</div>
															<div className='col-md-6'>
																{updatingChosenDate()}
															</div>
															<div className='col-md-6 mx-auto'>
																{updatingChosenTime()}
															</div>
															<div
																onClick={updateScheduleDateTime}
																className='btn btn-success btn-block col-md-7 col-sm-10 mx-auto mt-5 mb-5 applyScheduleUpdateUser'
																style={{
																	borderRadius: "20px",
																	boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.4)",
																}}
															>
																Apply Schedule Updates
															</div>
														</React.Fragment>
													)}
												</div>
											</div>
										</div>
									</div>
								</React.Fragment>
							)}
						</React.Fragment>
					)}
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default UpdateSingleAppointmentUser;
