/** @format */

import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {DatePicker, Collapse} from "antd";
import {
	readSingleAppointment,
	getStatusValues,
	updateOrderStatus,
	UpdateScheduledAppointment,
	listScheduledOrders3,
} from "./apiStylist";
import {
	read,
	getAllEmployees,
	listScheduledOrders,
	getServices,
	readByPhone,
} from "../apiCore";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import moment from "moment";
import styled from "styled-components";
import {
	updateOrderStylistComment,
	allLoyaltyPointsAndStoreStatus,
} from "../Owners/apiOwner";
import {isAuthenticated} from "../auth";

const StylistSingleSchedulePage = (props) => {
	const {Panel} = Collapse;
	const [loading, setLoading] = useState(true);
	const [singleAppointment, setSingleAppointment] = useState({});
	// eslint-disable-next-line
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
	const [sendOrNot, setsendOrNot] = useState(false);
	const [stylistComment, setStylistComment] = useState("");
	const [orders, setOrders] = useState({});
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState([]);

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
					}
				});
				setLoading(false);
			}
		});
	};

	const ImageURLForAppointment =
		singleAppointment &&
		singleAppointment.scheduleAppointmentPhoto &&
		singleAppointment.scheduleAppointmentPhoto.length > 0 &&
		singleAppointment.scheduleAppointmentPhoto[0].images[0].url;

	const loadStatusValues = () => {
		getStatusValues(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setStatusValues(data);
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
				console.log(data.error, "data.error");
				console.log("Status update failed");
			} else {
				window.scrollTo({top: 0, behavior: "smooth"});

				window.setTimeout(() => {
					window.location.reload(false);
				}, 2000);
			}
		});
	};

	const showStatus = (o) => (
		<React.Fragment>
			<div className='form-group'>
				<h3 className='mark mb-4'>Status: {o.status}</h3>
				<select
					className='form-control'
					onChange={(e) => handleStatusChange(e, o._id)}
					style={{
						border: "#cfcfcf solid 1px",
						borderRadius: "10px",
						width: "100%",
						fontSize: "0.9rem",
						boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
					}}
				>
					<option>Update Status</option>
					{singleAppointment &&
					singleAppointment.status &&
					singleAppointment.status.includes("Store") ? (
						<>
							<option value='Scheduled From Store / Not Paid'>
								Scheduled From Store / Not Paid
							</option>
							<option value='Scheduled From Store / Paid'>
								Scheduled From Store / Paid
							</option>
							<option value='Cancelled'>Cancelled</option>
						</>
					) : (
						<>
							<option value='Scheduled Online / Not Paid'>
								Scheduled Online / Not Paid
							</option>
							<option value='Scheduled Online / Paid in Store'>
								Scheduled Online / Paid in Store
							</option>
							<option value='Cancelled'>Cancelled</option>
						</>
					)}
				</select>
			</div>
		</React.Fragment>
	);

	const gettingPreviousLoyaltyPointsManagement = () => {
		if (
			chosenStylist &&
			chosenStylist.belongsTo &&
			chosenStylist.belongsTo._id
		) {
			allLoyaltyPointsAndStoreStatus(token, chosenStylist.belongsTo._id).then(
				(data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setAlreadySetLoyaltyPointsManagement(data && data[data.length - 1]);
					}
				}
			);
		}
	};

	useEffect(() => {
		const AppointmentId = props.match.params.AppointmentId;
		const employeeId = props.match.params.employeeId;
		loadSingleOrder(AppointmentId, employeeId);
		loadStatusValues();
		getAllService();
		gettingPreviousLoyaltyPointsManagement();
		localStorage.removeItem("barber");
		// eslint-disable-next-line
	}, []);

	// To Update The current Schedule
	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	const getAllService = () => {
		if (
			chosenStylist &&
			chosenStylist.belongsTo &&
			chosenStylist.belongsTo._id
		) {
			getServices("token", chosenStylist.belongsTo._id).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					var pickedEmployeePetsIncluded =
						chosenStylist &&
						chosenStylist.services &&
						chosenStylist.services.map((ii) => ii.customerType);

					var pickedEmployeeServicesIncluded =
						chosenStylist &&
						chosenStylist.services &&
						chosenStylist.services.map(
							(ii) => ii.serviceName + ii.customerType
						);
					setAllCustomerTypes([
						...new Set(
							data &&
								data.filter(
									(i) =>
										pickedEmployeePetsIncluded &&
										pickedEmployeePetsIncluded.indexOf(i.customerType) !== -1
								) &&
								data
									.filter(
										(i) =>
											pickedEmployeePetsIncluded &&
											pickedEmployeePetsIncluded.indexOf(i.customerType) !== -1
									)
									.map((iii) => iii.customerType)
						),
					]);
					if (chosenCustomerType) {
						setAllServices(
							data.filter((i) => i.activeService === true) &&
								data.filter((i) => i.activeService === true).map((ii) => ii) &&
								data
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

	const loadOrders = () => {
		readByPhone(user.phone).then((data1) => {
			if (data1.error) {
				console.log(data1.error);
			} else {
				listScheduledOrders(user._id, token, data1.belongsTo._id).then(
					(data) => {
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
							getAllEmployees(data1.belongsTo._id).then((data2) => {
								setLoading(true);
								if (data2.error) {
									console.log(data2.error);
								} else {
									setAllStylists(data2);
									setLoading(false);
								}
							});
						}
					}
				);
			}
		});
	};

	const loadOrders2 = () => {
		setLoading(true);

		function compareTotalAppointments(a, b) {
			const TotalAppointmentsA = a.createdAt;
			const TotalAppointmentsB = b.createdAt;

			let comparison = 0;
			if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}

		readByPhone(user.phone).then((data1) => {
			if (data1.error) {
				console.log(data1.error);
			} else {
				listScheduledOrders3(user._id, token, data1.belongsTo._id).then(
					(data) => {
						if (data.error) {
							console.log(data.error);
						} else {
							const ordersModified = data.map((i) => {
								return {
									...i,
									scheduleStartsAtModified: new Date(
										i.scheduleStartsAt
									).toLocaleDateString(),
								};
							});

							setOrders(ordersModified.sort(compareTotalAppointments));

							setLoading(false);
						}
					}
				);
			}
		});
	};

	useEffect(() => {
		loadOrders();
		loadOrders2();
		getAllService();
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
	console.log(alreadyScheduledTimesInchosenDate(), "A8a");

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
									{ServiceTime_Duration && ServiceTime_Duration.serviceTime}{" "}
									mins)
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
			sendOrNot: sendOrNot,
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

	const relatedCustomersHistory = () => {
		var customersOrders =
			orders &&
			singleAppointment &&
			singleAppointment.user &&
			orders[0] &&
			orders.filter((i) => i.user._id === singleAppointment.user._id);
		return (
			<RelatedCustomersTable className='col-md-11 mx-auto'>
				<h4 className='text-center'>Customer's History</h4>
				<table
					className='table table-bordered table-md-responsive table-hover table-striped'
					style={{fontSize: "0.75rem"}}
				>
					<thead className='thead-light'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Booking Loc.</th>
							<th scope='col'>Barber Name</th>
							<th scope='col'>Customer Name</th>
							<th scope='col'>Customer Phone</th>
							<th scope='col'>Schedule DateTime</th>
							<th scope='col'>Booked On</th>
							<th scope='col'>Status</th>
							<th scope='col'>Receipt #</th>
							<th scope='col'>Service</th>
							<th scope='col'>Stylist Comment</th>
							<th scope='col'>Service Price</th>
							<th scope='col'>Loyalty Points</th>
						</tr>
					</thead>

					<tbody>
						{customersOrders &&
							customersOrders.map((s, i) => (
								<tr key={i}>
									<td>{i + 1}</td>
									<td>{s.BookedFrom}</td>
									<Link
										to={`/admin/single-appointment-details/${s._id}/${
											s && s.employees && s.employees[0] && s.employees[0]._id
										}`}
									>
										{s.employees.map((e, ii) => (
											<div
												key={ii}
												className=' p-3 text-center'
												style={{border: "1px lightGrey solid"}}
											>
												{e.employeeName}
											</div>
										))}
									</Link>

									<td>{s.scheduledByUserName}</td>
									<td>{s.phone}</td>
									<td>
										{new Date(s.scheduledDate).toLocaleDateString()}{" "}
										{s.scheduledTime}
									</td>
									<td>{new Date(s.createdAt).toLocaleString()}</td>
									<td>{s.status}</td>
									<td>
										{s.transaction_id === null ||
										s.transaction_id === undefined ||
										s.transaction_id === ""
											? s._id.substring(0, 10)
											: s.transaction_id}
									</td>
									<td>{s.service}</td>
									<td>{s.commentsByStylist}</td>
									<td>${s.servicePrice}</td>
									<td>{s.applyPoints.toString()}</td>
								</tr>
							))}
					</tbody>
				</table>
			</RelatedCustomersTable>
		);
	};

	const handleStylistComment = (event) => {
		setStylistComment(event.target.value);
	};

	const addStylistComment = (e, scheduleorderId) => {
		e.preventDefault();
		updateOrderStylistComment(
			user._id,
			token,
			scheduleorderId,
			stylistComment
		).then((data) => {
			if (data.error) {
				console.log("Status update failed");
			} else {
				window.scrollTo({top: 0, behavior: "smooth"});
				window.location.reload(false);
			}
		});
	};

	return (
		<StylistSingleSchedulePageWrapper>
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
					<div className='row'>
						<div className='col-md-10 mt-3 mx-auto'>
							<Link
								to='/stylist/dashboard'
								onClick={() => {
									window.scrollTo({top: 0, behavior: "smooth"});
								}}
							>
								<div className='backToAdminDashboard'>
									<i className='fas fa-arrow-alt-circle-left mr-3'></i>
									Back to Your Dashboard
								</div>
							</Link>
						</div>
						<div className='col-md-8 mx-auto mb-5'>
							<div
								className='mt-3'
								style={{
									border: "3px solid black",
									boxShadow: "4px 4px 2px 2px rgba(0,0,0,0.3)",
								}}
							>
								<ul className='list-group my-3'>
									<li
										className='list-group-item mb-3 mx-3'
										style={{
											textAlign: "center",
											fontSize: "1.2rem",
											fontWeight: "bold",
											backgroundColor: "#2a0000",
											color: "white",
										}}
									>
										Stylist Name:{" "}
										{singleAppointment && singleAppointment.employees
											? singleAppointment.employees[0].employeeName
											: null}
									</li>
									{/* {Invoice(order)} */}
									<li className='list-group-item'>
										{showStatus(singleAppointment)}
									</li>

									<li className='list-group-item'>
										<strong>Appointment Status:</strong>{" "}
										<span
											className='alert alert-info'
											style={{fontWeight: "bold"}}
										>
											{singleAppointment.status}
										</span>
									</li>
									{/* <li className='list-group-item my-2'>
										<strong>Card Type:</strong>{" "}
										<span
											className='alert alert-info'
											style={{ fontWeight: "bold" }}>
											{singleAppointment.card_data ? (
												singleAppointment.card_data.cardType
											) : (
												<React.Fragment>Not Paid Online</React.Fragment>
											)}
										</span>
									</li> */}
									<li className='list-group-item'>
										<strong>Loyalty Points Status:</strong>{" "}
										<span
											className='alert alert-info'
											style={{fontWeight: "bold"}}
										>
											{singleAppointment.applyPoints.toString()}
										</span>
									</li>
									<li className='list-group-item text-capitalize mb-3'>
										<strong>Service For:</strong>{" "}
										<span
											className='alert alert-info'
											style={{fontWeight: "bold"}}
										>
											{singleAppointment.serviceDetails.customerType}
										</span>
									</li>
									<div className='row mx-2' style={{textAlign: "center"}}>
										<div className='col-md-4'>
											<li className='list-group-item'>
												Chosen Schedule Date:{" "}
												<span className='detailsAboutAppointment'>
													{new Date(
														singleAppointment.scheduledDate
													).toLocaleDateString()}
												</span>
											</li>
										</div>
										<div className='col-md-4'>
											<li className='list-group-item'>
												Appointment starts at:{" "}
												<span className='detailsAboutAppointment'>
													{new Date(
														singleAppointment.scheduleStartsAt
													).toLocaleTimeString()}
												</span>
											</li>
										</div>
										<div className='col-md-4'>
											<li className='list-group-item'>
												Appointment Estimated Ending Time:{" "}
												<span className='detailsAboutAppointment'>
													{new Date(
														singleAppointment.scheduleEndsAt
													).toLocaleTimeString()}
												</span>
											</li>
										</div>
										<div className='col-md-4 mt-3'>
											<li className='list-group-item'>
												Chosen Service:{" "}
												<span className='detailsAboutAppointment'>
													{singleAppointment.service}
												</span>
											</li>
										</div>

										<div className='col-md-4 mt-3'>
											<li className='list-group-item'>
												Receipt Number / Invoice Number:{" "}
												<span className='detailsAboutAppointment'>
													{singleAppointment.transaction_id === null ||
													singleAppointment.transaction_id === undefined ||
													singleAppointment.transaction_id === ""
														? singleAppointment._id.substring(0, 10)
														: singleAppointment.transaction_id}
												</span>
											</li>
										</div>
										<div className='col-md-4 mt-3'>
											<li className='list-group-item'>
												Scheduled by Phone:
												<span className='detailsAboutAppointment'>
													{singleAppointment.phone}
												</span>
											</li>
										</div>
										<div className='col-md-4 mt-3'>
											<li className='list-group-item'>
												Scheduled by:
												<span className='detailsAboutAppointment'>
													{singleAppointment.scheduledByUserName}
												</span>
											</li>
										</div>
										<div className='col-md-4 mt-3'>
											<li className='list-group-item'>
												Scheduled by Email:
												<span className='detailsAboutAppointment'>
													{singleAppointment.scheduledByUserEmail}
												</span>
											</li>
										</div>

										<div className='col-md-4 mt-3'>
											<li className='list-group-item'>
												Booked On:{" "}
												<span className='detailsAboutAppointment'>
													{new Date(
														singleAppointment.createdAt
													).toLocaleDateString()}{" "}
													({moment(singleAppointment.createdAt).fromNow()})
												</span>
											</li>
										</div>
										<div className='col-md-2 mt-3'>
											<li className='list-group-item'>
												Service Price:
												<span className='detailsAboutAppointment'>
													${singleAppointment.servicePrice}
												</span>
											</li>
										</div>
										<div className='col-md-2 mt-3'>
											<li className='list-group-item'>
												Paid Tip: {"  "}
												<span className='detailsAboutAppointment'>
													${singleAppointment.paidTip.toFixed(2)}
												</span>
											</li>
										</div>
										<div className='col-md-3 mt-3'>
											<li className='list-group-item'>
												Online Service Fee:{"  "}
												<span className='detailsAboutAppointment'>
													${singleAppointment.onlineServicesFees}
												</span>
											</li>
										</div>
										<div className='col-md-2 mt-3'>
											<li className='list-group-item'>
												Paid Amount:{"  "}
												<span className='detailsAboutAppointment'>
													${singleAppointment.amount}
												</span>
											</li>
										</div>
										<div className='col-md-3 mt-3'>
											<li className='list-group-item'>
												Discounted Amount:{"  "}
												<span className='detailsAboutAppointment'>
													$
													{singleAppointment.discountedAmount &&
													singleAppointment.discountedAmount !== 0
														? singleAppointment.discountedAmount.toFixed(2) +
														  "    " +
														  `(${singleAppointment.discountedPercentage}%)`
														: 0}
												</span>
											</li>
										</div>
										<div className='col-md-8 mt-3 mx-auto'>
											<Collapse>
												<Panel
													header={
														<span>
															Service Description:{" "}
															{chosenServicePrice &&
																chosenServicePrice.serviceName}{" "}
															<span className='ml-2' style={{color: "blue"}}>
																(
																{chosenServicePrice &&
																	chosenServicePrice.serviceTime}{" "}
																mins)
															</span>
														</span>
													}
													style={{
														textTransform: "capitalize",
													}}
												>
													<div>
														{chosenServicePrice &&
															chosenServicePrice.serviceDescription.map(
																(d, ii) => {
																	return (
																		<li
																			key={ii + 10}
																			style={{
																				textTransform: "capitalize",
																				listStyle: "outside",
																				fontSize: "12px",
																				textAlign: "left",
																			}}
																		>
																			{d}
																		</li>
																	);
																}
															)}
													</div>
												</Panel>
											</Collapse>
										</div>
										<div className='col-md-6 mt-3'>
											<li
												className='list-group-item'
												style={{fontWeight: "bold", letterSpacing: "7px"}}
											>
												Attached Image:{"  "}
												<img
													alt='User has not attached...'
													src={ImageURLForAppointment}
													style={{
														height: "400px",
														width: "400px",
														marginTop: "10px",
													}}
												/>
											</li>
										</div>
										<div className='col-md-4 my-auto mx-auto'>
											<li
												className='list-group-item'
												style={{fontWeight: "bold", letterSpacing: "7px"}}
											>
												Customer's Comment:
												<br />
												<br />
												<span style={{letterSpacing: "2px"}}>
													{" "}
													{singleAppointment &&
													singleAppointment.appointmentComment
														? singleAppointment.appointmentComment
														: "No Comment was Added By The Customer For This Appointment"}
												</span>
											</li>
										</div>
										<div className='col-md-8 my-5 mx-auto'>
											<li
												className='list-group-item'
												style={{fontWeight: "bold", letterSpacing: "7px"}}
											>
												Stylist Comment:
												<br />
												<br />
												<span style={{letterSpacing: "2px"}}>
													{" "}
													{singleAppointment &&
													singleAppointment.commentsByStylist
														? singleAppointment.commentsByStylist
														: "No Comment was Added By The Stylist For This Appointment"}
												</span>
											</li>
											<div className='mt-3 mb-2'>
												Add A Comment For This Appointment About the Client
												<textarea
													type='text'
													className='form-control'
													value={stylistComment}
													onChange={handleStylistComment}
													placeholder='e.g. This client had a haircut on 2 and beardcut on 4, he/she works at x, etc...'
												/>
											</div>
											<button
												className='btn btn-primary'
												onClick={(e) =>
													addStylistComment(
														e,
														singleAppointment && singleAppointment._id
													)
												}
											>
												Add Comment
											</button>
										</div>
									</div>
								</ul>
								<hr />
								<br />
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
									Update Appointment:
									<br />
									{storeClosed_NotClosed && (
										<div
											style={{
												fontSize: "0.8rem",
												color: "red",
												fontWeight: "bold",
												textAlign: "center",
											}}
										>
											Hair Salon is closed on the chosen date, Please select
											another date.
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
											Hair Salon is closed on the chosen date, Please select
											another date.
										</div>
									)}
									<br />
									<label
										className='my-2'
										style={{
											fontSize: "0.8rem",
											fontWeight: "bold",
											color: "black",
											textAlign: "center",
											fontStyle: "normal",
											textShadow: "0px 0px 0px",
											letterSpacing: "1px",
										}}
									>
										Send Notification SMS for your updates to the customer
									</label>
									<input
										type='checkbox'
										className='ml-2 mt-4'
										checked={sendOrNot === true ? true : false}
										onChange={() => setsendOrNot(!sendOrNot)}
									/>
								</div>
								<div className='col-md-6 mx-auto'>
									<hr />
								</div>
								<div className='row'>
									<div className='col-md-6'>{updatingCustomerType()}</div>
									<div className='col-md-6'>{updatingTheStylist()}</div>
									<div className='col-md-6'>{updatingChosenService()}</div>
									<div className='col-md-6'>{updatingChosenDate()}</div>
									<div className='col-md-6 mx-auto'>{updatingChosenTime()}</div>
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
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			)}
			{relatedCustomersHistory()}
		</StylistSingleSchedulePageWrapper>
	);
};

export default StylistSingleSchedulePage;

const StylistSingleSchedulePageWrapper = styled.div`
	overflow-x: auto;
`;

const RelatedCustomersTable = styled.div`
	overflow-x: auto;
	margin-bottom: 50px;
`;
