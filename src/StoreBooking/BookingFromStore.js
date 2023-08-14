/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
	allLoyaltyPointsAndStoreStatus,
	getEmployees,
	listScheduledOrders2,
	listScheduledOrdersStore,
} from "../Owners/apiOwner";
import { isAuthenticated } from "../auth";
import { Animated } from "react-animated-css";
import styled from "styled-components";
import OverallCalendarStore from "./OverallCalendarStore";
import TableViewStore from "./TableViewStore";
import POSAccount from "./POSAccount";
import NavbarPOS from "./NavbarPOS/NavbarPOS";
import { Helmet } from "react-helmet";
import OwnerNavmenu from "../Owners/NewOwnerNavMenu/OwnerNavmenu";
import {
	getServices,
	getUniqueCustomerTypesStore,
	gettingFirstAppointmentFromBackend,
} from "../apiCore";
import FirstAvailableAppointmentModified from "./POSBook/FirstAvailableAppointmentModified";
import FirstAvailableAppointmentModifiedArabic from "./POSBook/FirstAvailableAppointmentModifiedArabic";
import moment from "moment";
import TableViewArabic from "./TableViewArabic";
import { useCartContext } from "../sidebar_context";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#2c2c2c",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "1.1rem",
			textAlign: "center",
			padding: "10px",
			color: "white",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			backgroundColor: "grey",
			padding: "10px",
			borderRadius: "5px",
			fontSize: "1.1rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "white",
		};
	}
};

const isActive2 = (history, path) => {
	if (history === path) {
		return {
			background: "#2c2c2c",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "1.1rem",
			textAlign: "center",
			padding: "10px",
			color: "white",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			backgroundColor: "grey",
			padding: "10px",
			borderRadius: "5px",
			fontSize: "0.9rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "white",
		};
	}
};

const BookingFromStore = ({ language, setLanguage }) => {
	const { chosenLanguage } = useCartContext();
	moment.locale("en");

	const [clickedMenu, setClickedMenu] = useState("NewAppointment");
	const [clickedMenu2, setClickedMenu2] = useState("FirstAppointment");
	const [chosenEmployee, setChosenEmployee] = useState({ employeeName: "" });
	const [allEmployees, setAllEmployees] = useState([]);
	const [allCustomerType, setAllCustomerType] = useState([]);
	const [allActiveServices, setAllActiveServices] = useState([]);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [orders, setOrders] = useState([]);
	const [onlineStoreName, setOnlineStoreName] = useState("");
	const [appointmentFirst, setAppointmentFirst] = useState({
		firstAvailableTime: null,
	});
	const [collapseMenu, setCollapseMenu] = useState(false);
	const [chosenCustomerType, setChosenCustomerType] = useState("");
	const [chosenService, setChosenService] = useState("");
	const [serviceDetailsArray, setServiceDetailsArray] = useState([]);
	const [selectedDate, setSelectedDate] = useState(
		moment().format("MM/DD/YYYY")
	);
	const [chosenDate, setChosenDate] = useState(moment().format("MM/DD/YYYY"));

	const { user, token } = isAuthenticated();

	var userBelongsToModified = user.role === 1000 ? user._id : user.belongsTo;

	const loadAllActiveCustomerTypes = () => {
		setLoading(true);

		getUniqueCustomerTypesStore(userBelongsToModified).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllCustomerType(data);
				setChosenCustomerType(data[0].customerType);
				setLoading(false);
			}
		});
	};

	const formatEnglishDate = (date) => {
		return moment(date).locale("en").format("MM/DD/YYYY");
	};

	useEffect(() => {
		setChosenDate(formatEnglishDate(moment()));
		setSelectedDate(formatEnglishDate(moment()));
		// eslint-disable-next-line
	}, [chosenLanguage, clickedMenu]);

	const loadAllAvailableEmployees = () => {
		setLoading(true);
		function compareTotalAppointments(a, b) {
			const TotalAppointmentsA = a.createdAt;
			const TotalAppointmentsB = b.createdAt;

			let comparison = 0;
			if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}

		getEmployees(userBelongsToModified).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllEmployees(
					data.filter((e) => e.activeEmployee === true) &&
						data
							.filter((e) => e.activeEmployee === true)
							.sort(compareTotalAppointments)
				);
				setLoading(false);
			}
		});
	};

	const loadOrders = () => {
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

		setLoading(true);
		if (user.role === 3) {
			listScheduledOrdersStore(user._id, token, userBelongsToModified).then(
				(data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setOrders(data.sort(compareTotalAppointments));
						setLoading(false);
					}
				}
			);
		} else {
			listScheduledOrders2(user._id, token, userBelongsToModified).then(
				(data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setOrders(data.sort(compareTotalAppointments));
						setLoading(false);
					}
				}
			);
		}
	};

	const getOnlineStoreName = () => {
		allLoyaltyPointsAndStoreStatus("token", userBelongsToModified).then(
			(data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setOnlineStoreName(data && data[data.length - 1]);
				}
			}
		);
	};

	const firstAppointmentAvailable = () => {
		if (
			chosenDate &&
			chosenCustomerType &&
			chosenService &&
			chosenService.length > 0
		) {
			setLoading(true);
			let allPickedServices =
				serviceDetailsArray && serviceDetailsArray.map((i) => i.serviceName);

			// Format date to "MM-DD-YYYY"
			const date = new Date(chosenDate);
			const formattedDate = `${
				date.getMonth() + 1
			}-${date.getDate()}-${date.getFullYear()}`;

			gettingFirstAppointmentFromBackend(
				allPickedServices.join(","),
				chosenCustomerType,
				formattedDate,
				"Egypt",
				userBelongsToModified
			).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setAppointmentFirst(data);
					// console.log(data, "first Available time");
					setLoading(false);
				}
			});
		}
	};

	useEffect(() => {
		loadOrders();
		loadAllAvailableEmployees();
		getOnlineStoreName();
		loadAllActiveCustomerTypes();
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
		localStorage.removeItem("CustomerType");
		localStorage.removeItem("chosenDateFromFirstAvailable");
		localStorage.removeItem("chosenStylistUpdate");
		localStorage.removeItem("pickedPetSizeFirstAvailable");
		localStorage.removeItem("pickedPetTypeFirstAvailable");
		// eslint-disable-next-line
	}, []);

	const getAllService = () => {
		getServices("token", userBelongsToModified).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				if (chosenCustomerType) {
					setAllActiveServices(
						data.filter((i) => i.activeService === true) &&
							data.filter((i) => i.activeService === true).map((ii) => ii) &&
							data
								.filter((i) => i.activeService === true)
								.map((ii) => ii)
								.filter(
									(iv) =>
										iv.customerType.toLowerCase() ===
										chosenCustomerType.toLowerCase()
								)
					);
				}
			}
		});
	};

	useEffect(() => {
		getAllService();
		firstAppointmentAvailable();
		// eslint-disable-next-line
	}, [chosenCustomerType, chosenService, chosenDate]);

	useEffect(() => {
		if (window.location.search.includes("new-appointments")) {
			setClickedMenu("NewAppointment");
		} else if (window.location.search.includes("overall-calendar")) {
			setClickedMenu("OverAllCalendar");
		} else if (window.location.search.includes("table-view")) {
			setClickedMenu("TableView");
		} else if (window.location.search.includes("pos-account")) {
			setClickedMenu("POSAccount");
		} else {
			setClickedMenu("NewAppointment");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// console.log(chosenEmployee, "chosenEmp");

	const addItem = (item = [], next = (f) => f) => {
		let barber = [];
		barber = item._id;

		localStorage.setItem("barber", JSON.stringify(barber));
		next();
	};

	return (
		<BookFromStoreWrapper
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			show={collapseMenu}
			show2={user.role === 1000}
		>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>Owner {user.storeName} Point Of Sale</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/store/book-appointment-from-store`}
				/>
			</Helmet>
			<NavbarPOS
				language={chosenLanguage}
				setLanguage={setLanguage}
				onlineStoreName={onlineStoreName}
			/>

			<div className='grid-container'>
				{user && user.role === 1000 ? (
					<div className='menuWrapper'>
						<div
							className='iconMenu'
							onClick={() => {
								setCollapseMenu(!collapseMenu);
							}}
						>
							<i className='fa-solid fa-bars'></i>
						</div>

						<OwnerNavmenu
							language={chosenLanguage}
							fromPage='PointOfSale'
							collapseMenu={collapseMenu}
						/>
					</div>
				) : (
					<div></div>
				)}

				<div className=''>
					{user && user.role === 1000 ? (
						<>
							{chosenLanguage === "Arabic" ? (
								<div className='row mx-auto text-center mb-4 mt-2'>
									<div
										className='col-md-10 col-10 mx-auto menuItems mt-2'
										style={isActive(clickedMenu, "POSAccount")}
										onClick={() => setClickedMenu("POSAccount")}
									>
										<Link
											className='mb-2'
											style={isActive(clickedMenu, "POSAccount")}
											to='/store/book-appointment-from-store?pos-account'
										>
											<i className='fa-brands fa-servicestack mr-1'></i> إنشاء
											حساب نقطة البيع (POS)
										</Link>
									</div>
									<div
										className='col-md-3 col-4 mx-auto menuItems mt-2'
										style={isActive(clickedMenu, "NewAppointment")}
										onClick={() => setClickedMenu("NewAppointment")}
									>
										<Link
											style={isActive(clickedMenu, "NewAppointment")}
											to='/store/book-appointment-from-store?new-appointments'
										>
											<i className='fa-brands fa-servicestack mr-1'></i>
											موعد جديد
										</Link>
									</div>
									<div
										className='col-md-3 col-4 mx-auto menuItems mt-2'
										style={isActive(clickedMenu, "TableView")}
										onClick={() => setClickedMenu("TableView")}
									>
										<Link
											style={isActive(clickedMenu, "TableView")}
											to='/store/book-appointment-from-store?table-view'
										>
											<i className='fa-brands fa-servicestack mr-1'></i>
											الكاشير
										</Link>
									</div>

									<div
										className='col-md-3 col-4 mx-auto menuItems mt-2'
										style={isActive(clickedMenu, "OverAllCalendar")}
										onClick={() => setClickedMenu("OverAllCalendar")}
									>
										<Link
											style={isActive(clickedMenu, "OverAllCalendar")}
											to='/store/book-appointment-from-store?overall-calendar'
										>
											<i className='fa-brands fa-servicestack mr-1'></i>
											تقويم
										</Link>
									</div>
								</div>
							) : (
								<div className='row mx-auto text-center mb-4 mt-2'>
									<div
										className='col-md-9 col-9 mx-auto menuItems mb-1'
										style={isActive(clickedMenu, "POSAccount")}
										onClick={() => setClickedMenu("POSAccount")}
									>
										<Link
											style={isActive(clickedMenu, "POSAccount")}
											to='/store/book-appointment-from-store?pos-account'
										>
											<i className='fa-brands fa-servicestack mr-1'></i> Create
											a POS Account
										</Link>
									</div>

									<div
										className='col-md-3 col-4 mx-auto menuItems'
										style={isActive(clickedMenu, "NewAppointment")}
										onClick={() => setClickedMenu("NewAppointment")}
									>
										<Link
											style={isActive(clickedMenu, "NewAppointment")}
											to='/store/book-appointment-from-store?new-appointments'
										>
											<i className='fa-brands fa-servicestack mr-1'></i>
											New Appoint.
										</Link>
									</div>
									<div
										className='col-md-3 col-4 mx-auto menuItems'
										style={isActive(clickedMenu, "TableView")}
										onClick={() => setClickedMenu("TableView")}
									>
										<Link
											style={isActive(clickedMenu, "TableView")}
											to='/store/book-appointment-from-store?table-view'
										>
											<i className='fa-brands fa-servicestack mr-1'></i> Cashier
										</Link>
									</div>
									<div
										className='col-md-3 col-4 mx-auto menuItems'
										style={isActive(clickedMenu, "OverAllCalendar")}
										onClick={() => setClickedMenu("OverAllCalendar")}
									>
										<Link
											style={isActive(clickedMenu, "OverAllCalendar")}
											to='/store/book-appointment-from-store?overall-calendar'
										>
											<i className='fa-brands fa-servicestack mr-1'></i>
											Calendar
										</Link>
									</div>
								</div>
							)}
						</>
					) : (
						<>
							{chosenLanguage === "Arabic" ? (
								<div className='row mx-auto text-center mb-3 mt-3 col-md-10'>
									<div
										className='col-md-4 col-4 mx-auto menuItems'
										style={isActive(clickedMenu, "NewAppointment")}
										onClick={() => setClickedMenu("NewAppointment")}
									>
										<Link
											style={isActive(clickedMenu, "NewAppointment")}
											to='/store/book-appointment-from-store?new-appointments'
										>
											<i className='fa-brands fa-servicestack mr-1'></i> حجز
											جديد
										</Link>
									</div>

									<div
										className='col-md-4 col-4 mx-auto menuItems'
										style={isActive(clickedMenu, "TableView")}
										onClick={() => setClickedMenu("TableView")}
									>
										<Link
											style={isActive(clickedMenu, "TableView")}
											to='/store/book-appointment-from-store?table-view'
										>
											<i className='fa-brands fa-servicestack mr-1'></i>
											الكاشير
										</Link>
									</div>

									<div
										className='col-md-4 col-4 mx-auto menuItems'
										style={isActive(clickedMenu, "OverAllCalendar")}
										onClick={() => setClickedMenu("OverAllCalendar")}
									>
										<Link
											style={isActive(clickedMenu, "OverAllCalendar")}
											to='/store/book-appointment-from-store?overall-calendar'
										>
											<i className='fa-brands fa-servicestack mr-1'></i>
											تقويم
										</Link>
									</div>
								</div>
							) : (
								<div className='row mx-auto text-center mb-2 mt-3 '>
									<div
										className='col-md-4 col-4 mx-auto menuItems w-100'
										style={isActive(clickedMenu, "NewAppointment")}
										onClick={() => setClickedMenu("NewAppointment")}
									>
										<Link
											style={isActive(clickedMenu, "NewAppointment")}
											to='/store/book-appointment-from-store?new-appointments'
										>
											<i className='fa-brands fa-servicestack mr-1'></i>
											New Appoint.
										</Link>
									</div>

									<div
										className='col-md-4 col-4 mx-auto menuItems'
										style={isActive(clickedMenu, "OverAllCalendar")}
										onClick={() => setClickedMenu("OverAllCalendar")}
									>
										<Link
											style={isActive(clickedMenu, "OverAllCalendar")}
											to='/store/book-appointment-from-store?overall-calendar'
										>
											<i className='fa-brands fa-servicestack mr-1'></i>
											Calendar
										</Link>
									</div>
									<div
										className='col-md-4 col-4 mx-auto menuItems'
										style={isActive(clickedMenu, "TableView")}
										onClick={() => setClickedMenu("TableView")}
									>
										<Link
											style={isActive(clickedMenu, "TableView")}
											to='/store/book-appointment-from-store?table-view'
										>
											<i className='fa-brands fa-servicestack mr-1'></i> Cashier
										</Link>
									</div>
								</div>
							)}
						</>
					)}

					{clickedMenu === "NewAppointment" ? (
						<>
							<div className='row mx-1 my-3'>
								<div
									className='col-6 mx-auto text-center'
									style={isActive2(clickedMenu2, "FirstAppointment")}
									onClick={() => setClickedMenu2("FirstAppointment")}
								>
									أول حجز متاح
								</div>
								<div
									className='col-6 mx-auto text-center'
									style={isActive2(clickedMenu2, "SpecificEmp")}
									onClick={() => setClickedMenu2("SpecificEmp")}
								>
									احجز مع موظف معين
								</div>
							</div>
							{clickedMenu2 === "FirstAppointment" ? (
								<>
									<Animated
										animationIn='bounceInLeft'
										animationOut='zoomOut'
										animationInDuration={2000}
										animationInDelay={0}
										animationOutDuration={1000}
										isVisible={true}
									>
										{chosenLanguage === "Arabic" ? (
											<FirstAvailableAppointmentModifiedArabic
												user={user}
												language={chosenLanguage}
												chosenDate={chosenDate}
												setChosenDate={setChosenDate}
												allCustomerType={allCustomerType}
												allActiveServices={allActiveServices}
												chosenCustomerType={chosenCustomerType}
												setChosenCustomerType={setChosenCustomerType}
												chosenService={chosenService}
												setChosenService={setChosenService}
												appointmentFirst={appointmentFirst}
												loading={loading}
												setServiceDetailsArray={setServiceDetailsArray}
												serviceDetailsArray={serviceDetailsArray}
												formatEnglishDate={formatEnglishDate}
												allEmployees={allEmployees}
												addItem={addItem}
												chosenEmployee={chosenEmployee}
												setChosenEmployee={setChosenEmployee}
												orders={orders}
											/>
										) : (
											<FirstAvailableAppointmentModified
												user={user}
												language={chosenLanguage}
												chosenDate={chosenDate}
												setChosenDate={setChosenDate}
												allCustomerType={allCustomerType}
												allActiveServices={allActiveServices}
												chosenCustomerType={chosenCustomerType}
												setChosenCustomerType={setChosenCustomerType}
												chosenService={chosenService}
												setChosenService={setChosenService}
												appointmentFirst={appointmentFirst}
												loading={loading}
												setServiceDetailsArray={setServiceDetailsArray}
												serviceDetailsArray={serviceDetailsArray}
												formatEnglishDate={formatEnglishDate}
											/>
										)}
									</Animated>
								</>
							) : null}

							{clickedMenu2 === "SpecificEmp" ? (
								<div style={{ marginBottom: "300px" }}>
									<div className='col-md-10 mx-auto'>
										<hr />
									</div>
									{chosenLanguage === "Arabic" ? (
										<div
											className='my-2'
											style={{
												fontWeight: "bolder",
												fontSize: "1.8rem",
												color: "#7a0909",
												textAlign: "center",
											}}
										>
											<strong>جميع المصففين </strong>
										</div>
									) : (
										<div
											className='my-2'
											style={{
												fontWeight: "bolder",
												fontSize: "1.2rem",
												// textShadow: "3px 3px 6px",
												letterSpacing: "2px",
												color: "#7a0909",
												textAlign: "center",
											}}
										>
											<strong>All Stylists </strong>
										</div>
									)}

									<Animated
										animationIn='bounceInLeft'
										animationOut='zoomOut'
										animationInDuration={2000}
										animationInDelay={0}
										animationOutDuration={1000}
										isVisible={true}
									>
										<div className='text-center'>
											<label style={{ fontSize: "1rem", fontWeight: "bolder" }}>
												{" "}
												{chosenLanguage === "Arabic"
													? " اختر ستايليست "
													: "Choose A Stylist"}{" "}
											</label>
											<select
												onChange={(e) => {
													var indexOfEmployee = allEmployees
														.map((i) => i.employeeName)
														.indexOf(e.target.value);
													setChosenEmployee(allEmployees[indexOfEmployee]);
												}}
												placeholder='Select a Service'
												className='inputFields'
												style={{
													paddingTop: "12px",
													paddingBottom: "12px",
													paddingRight: "5px",
													border: "#cfcfcf solid 1px",
													borderRadius: "10px",
													width: "90%",
													textTransform: "capitalize",
													fontSize: "0.9rem",
													boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
												}}
											>
												<option value='' className='text-muted'>
													{chosenLanguage === "Arabic"
														? "اختر  "
														: "Select A Stylist"}
												</option>

												{allEmployees &&
													allEmployees.map((e, i) => {
														return (
															<option
																className='text-muted'
																value={e.employeeName}
																key={i}
															>
																{e.employeeNameOtherLanguage} |{" "}
																<span style={{ color: "black" }}>
																	{" "}
																	(
																	{orders &&
																		orders.filter(
																			(ii) =>
																				ii.employees &&
																				ii.employees[0] &&
																				ii.employees[0]._id === i._id &&
																				new Date(
																					ii.scheduledDate
																				).toLocaleDateString() ===
																					new Date(
																						chosenDate
																					).toLocaleDateString()
																		) &&
																		orders.filter(
																			(ii) =>
																				ii.employees &&
																				ii.employees[0] &&
																				ii.employees[0]._id === i._id &&
																				new Date(
																					ii.scheduledDate
																				).toLocaleDateString() ===
																					new Date().toLocaleDateString()
																		).length}{" "}
																	{chosenLanguage === "Arabic"
																		? "حجوزات اليوم"
																		: "Appoint. Today"}{" "}
																	)
																</span>
															</option>
														);
													})}
											</select>
											{chosenEmployee &&
											chosenEmployee.employeeName &&
											chosenEmployee._id ? (
												<div className='my-5 mx-auto text-center'>
													<button
														style={{
															fontSize: "1.1rem",
															fontWeight: "bolder",
															background: "black",
															color: "white",
														}}
														onClick={() => {
															addItem(chosenEmployee);
															window.location.href = `/store/book-appointment-from-store2/employee/${chosenEmployee._id}`;
														}}
														className='btn'
													>
														{" "}
														{chosenLanguage === "Arabic"
															? "احجز الآن"
															: "BOOK NOW"}{" "}
													</button>
												</div>
											) : null}
										</div>
									</Animated>
								</div>
							) : null}
						</>
					) : null}
					{clickedMenu === "OverAllCalendar" ? (
						<>
							<OverallCalendarStore />
						</>
					) : null}
					{clickedMenu === "TableView" ? (
						<>
							{chosenLanguage === "Arabic" ? (
								<TableViewArabic
									orders={orders}
									selectedDate={selectedDate}
									setSelectedDate={setSelectedDate}
								/>
							) : (
								<TableViewStore
									orders={orders}
									setSelectedDate={setSelectedDate}
								/>
							)}
						</>
					) : null}
					{clickedMenu === "POSAccount" ? (
						<>
							<POSAccount orders={orders} />
						</>
					) : null}
				</div>
			</div>
		</BookFromStoreWrapper>
	);
};

export default BookingFromStore;

const BookFromStoreWrapper = styled.div`
	min-height: 1000px;
	background-color: lightgray;

	.grid-container {
		display: grid;
		grid-template-columns: 5% 95%;
		background-color: lightgray;
	}

	.container {
		margin-top: 50px;
		margin-bottom: 20px;
		margin-left: 350px;
	}

	.menuWrapper {
		background-color: ${(props) => (props.show ? "white" : "black")};
		overflow: auto;
		min-height: 1000px;
	}
	.iconMenu {
		display: none;
	}

	@media (max-width: 1000px) {
		background-color: lightgray;

		.grid-container {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) =>
				!props.show2 ? "0 100%" : props.show ? "3% 97%" : "18% 82%"};
		}

		.iconMenu {
			display: block;
			color: ${(props) => (props.show ? "black" : "white")};
			position: ${(props) => (props.show ? "absolute" : "")};
			text-align: right;
			font-size: 20px;
			margin-right: ${(props) => (props.show ? "3px" : "5px")};
		}

		.menuItems {
			font-size: 13px !important;
			padding: 2px !important;
			width: 100% !important;
		}

		.menuItems > a {
			font-size: 13px !important;
			padding: 2px !important;
			width: 100% !important;
		}
	}
`;
