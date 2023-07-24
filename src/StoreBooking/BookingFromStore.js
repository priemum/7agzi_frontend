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
import FirstAvailableAppointmentsStore2 from "./FirstAvailableAppointmentsStore2";
import { Animated } from "react-animated-css";
import styled from "styled-components";
import OverallCalendarStore from "./OverallCalendarStore";
import TableViewStore from "./TableViewStore";
import POSAccount from "./POSAccount";
import NavbarPOS from "./NavbarPOS/NavbarPOS";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#0f377e",
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
			backgroundColor: "white",
			padding: "10px",
			borderRadius: "5px",
			fontSize: "1.1rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
		};
	}
};

const BookingFromStore = ({ language, setLanguage }) => {
	const [clickedMenu, setClickedMenu] = useState("NewAppointment");
	const [allEmployees, setAllEmployees] = useState([]);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [chosenDate, setChosenDate] = useState("");
	const [orders, setOrders] = useState([]);
	const [onlineStoreName, setOnlineStoreName] = useState("");

	const { user, token } = isAuthenticated();

	var userBelongsToModified = user.role === 1000 ? user._id : user.belongsTo;

	useEffect(() => {
		setChosenDate(new Date().toLocaleDateString());
		// eslint-disable-next-line
	}, []);

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

	useEffect(() => {
		loadOrders();
		loadAllAvailableEmployees();
		getOnlineStoreName();
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

	// console.log(onlineStoreName, "onlineStoreName");

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

	// const reloadCount = sessionStorage.getItem("reloadCount");

	// useEffect(() => {
	// 	if (user && user.role === 3) {
	// 		if (reloadCount < 2) {
	// 			sessionStorage.setItem("reloadCount", String(reloadCount + 1));
	// 			window.location.reload();
	// 		} else {
	// 			sessionStorage.removeItem("reloadCount");
	// 		}
	// 	}

	// 	// eslint-disable-next-line
	// }, []);

	return (
		<BookFromStoreWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<NavbarPOS
				language={language}
				setLanguage={setLanguage}
				onlineStoreName={onlineStoreName}
			/>
			{user && user.role === 1000 ? (
				<>
					<div className='mx-auto col-md-10 mt-5'>
						<Link
							style={{
								fontSize: "1.2rem",
								fontWeight: "bolder",
								textDecoration: "underline",
							}}
							to='/store/admin/dashboard'
						>
							Back to admin dashboard
						</Link>
					</div>
					{language === "Arabic" ? (
						<div className='row mx-auto text-center my-5 col-md-10'>
							<div
								className='col-md-3 mx-auto'
								style={isActive(clickedMenu, "NewAppointment")}
								onClick={() => setClickedMenu("NewAppointment")}
							>
								<Link
									style={isActive(clickedMenu, "NewAppointment")}
									to='/store/book-appointment-from-store?new-appointments'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> حجز موعد
									جديد
								</Link>
							</div>
							<div
								className='col-md-3 mx-auto'
								style={isActive(clickedMenu, "POSAccount")}
								onClick={() => setClickedMenu("POSAccount")}
							>
								<Link
									style={isActive(clickedMenu, "POSAccount")}
									to='/store/book-appointment-from-store?pos-account'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> إنشاء حساب
									نقطة البيع (POS)
								</Link>
							</div>
							<div
								className='col-md-3 mx-auto'
								style={isActive(clickedMenu, "OverAllCalendar")}
								onClick={() => setClickedMenu("OverAllCalendar")}
							>
								<Link
									style={isActive(clickedMenu, "OverAllCalendar")}
									to='/store/book-appointment-from-store?overall-calendar'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> عرض التقويم
									العام
								</Link>
							</div>
							<div
								className='col-md-3 mx-auto'
								style={isActive(clickedMenu, "TableView")}
								onClick={() => setClickedMenu("TableView")}
							>
								<Link
									style={isActive(clickedMenu, "TableView")}
									to='/store/book-appointment-from-store?table-view'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> عرض الجدول
								</Link>
							</div>
						</div>
					) : (
						<div className='row mx-auto text-center my-5 col-md-10'>
							<div
								className='col-md-3 mx-auto'
								style={isActive(clickedMenu, "NewAppointment")}
								onClick={() => setClickedMenu("NewAppointment")}
							>
								<Link
									style={isActive(clickedMenu, "NewAppointment")}
									to='/store/book-appointment-from-store?new-appointments'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> Book New
									Appointment
								</Link>
							</div>
							<div
								className='col-md-3 mx-auto'
								style={isActive(clickedMenu, "POSAccount")}
								onClick={() => setClickedMenu("POSAccount")}
							>
								<Link
									style={isActive(clickedMenu, "POSAccount")}
									to='/store/book-appointment-from-store?pos-account'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> Create a
									POS Account
								</Link>
							</div>
							<div
								className='col-md-3 mx-auto'
								style={isActive(clickedMenu, "OverAllCalendar")}
								onClick={() => setClickedMenu("OverAllCalendar")}
							>
								<Link
									style={isActive(clickedMenu, "OverAllCalendar")}
									to='/store/book-appointment-from-store?overall-calendar'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> Overall
									Calendar View
								</Link>
							</div>
							<div
								className='col-md-3 mx-auto'
								style={isActive(clickedMenu, "TableView")}
								onClick={() => setClickedMenu("TableView")}
							>
								<Link
									style={isActive(clickedMenu, "TableView")}
									to='/store/book-appointment-from-store?table-view'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> Table View
								</Link>
							</div>
						</div>
					)}
				</>
			) : (
				<>
					{language === "Arabic" ? (
						<div className='row mx-auto text-center my-5 col-md-10'>
							<div
								className='col-md-4 mx-auto'
								style={isActive(clickedMenu, "NewAppointment")}
								onClick={() => setClickedMenu("NewAppointment")}
							>
								<Link
									style={isActive(clickedMenu, "NewAppointment")}
									to='/store/book-appointment-from-store?new-appointments'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> حجز موعد
									جديد
								</Link>
							</div>

							<div
								className='col-md-4 mx-auto'
								style={isActive(clickedMenu, "OverAllCalendar")}
								onClick={() => setClickedMenu("OverAllCalendar")}
							>
								<Link
									style={isActive(clickedMenu, "OverAllCalendar")}
									to='/store/book-appointment-from-store?overall-calendar'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> عرض التقويم
									العام
								</Link>
							</div>
							<div
								className='col-md-4 mx-auto'
								style={isActive(clickedMenu, "TableView")}
								onClick={() => setClickedMenu("TableView")}
							>
								<Link
									style={isActive(clickedMenu, "TableView")}
									to='/store/book-appointment-from-store?table-view'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> عرض الجدول
								</Link>
							</div>
						</div>
					) : (
						<div className='row mx-auto text-center my-5 col-md-10'>
							<div
								className='col-md-4 mx-auto'
								style={isActive(clickedMenu, "NewAppointment")}
								onClick={() => setClickedMenu("NewAppointment")}
							>
								<Link
									style={isActive(clickedMenu, "NewAppointment")}
									to='/store/book-appointment-from-store?new-appointments'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> Book New
									Appointment
								</Link>
							</div>

							<div
								className='col-md-4 mx-auto'
								style={isActive(clickedMenu, "OverAllCalendar")}
								onClick={() => setClickedMenu("OverAllCalendar")}
							>
								<Link
									style={isActive(clickedMenu, "OverAllCalendar")}
									to='/store/book-appointment-from-store?overall-calendar'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> Overall
									Calendar View
								</Link>
							</div>
							<div
								className='col-md-4 mx-auto'
								style={isActive(clickedMenu, "TableView")}
								onClick={() => setClickedMenu("TableView")}
							>
								<Link
									style={isActive(clickedMenu, "TableView")}
									to='/store/book-appointment-from-store?table-view'
								>
									<i className='fa-brands fa-servicestack mr-1'></i> Table View
								</Link>
							</div>
						</div>
					)}
				</>
			)}

			{clickedMenu === "NewAppointment" ? (
				<>
					<div className='col-md-8 mx-auto mt-2'>
						<Animated
							animationIn='bounceInLeft'
							animationOut='zoomOut'
							animationInDuration={2000}
							animationInDelay={0}
							animationOutDuration={1000}
							isVisible={true}
						>
							<FirstAvailableAppointmentsStore2
								user={user}
								language={language}
							/>
						</Animated>
					</div>

					<div style={{ marginBottom: "300px" }}>
						<div className='col-md-10 mx-auto'>
							<hr />
						</div>
						<div
							className='my-5'
							style={{
								fontWeight: "bolder",
								fontSize: "1.4rem",
								// textShadow: "3px 3px 6px",
								letterSpacing: "6px",
								color: "#7a0909",
								textAlign: "center",
							}}
						>
							<strong>All Stylists (Click To Book):</strong>
						</div>
						<div className='row text-center my-5'>
							{allEmployees &&
								allEmployees.map((i, c) => (
									<div className='col-md-3 my-3 mx-auto EmployeesLinks' key={c}>
										{" "}
										<Link
											to={`/store/book-appointment-from-store/employee/${i._id}`}
											onClick={() => {
												localStorage.setItem("barber", JSON.stringify(i._id));
											}}
											style={{ fontWeight: "bold" }}
										>
											{i.employeeName}
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
																new Date(chosenDate).toLocaleDateString()
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
												Appoint. Today )
											</span>
										</Link>
									</div>
								))}
						</div>
					</div>
				</>
			) : null}
			{clickedMenu === "OverAllCalendar" ? (
				<>
					<OverallCalendarStore />
				</>
			) : null}
			{clickedMenu === "TableView" ? (
				<>
					<TableViewStore orders={orders} />
				</>
			) : null}
			{clickedMenu === "POSAccount" ? (
				<>
					<POSAccount orders={orders} />
				</>
			) : null}
		</BookFromStoreWrapper>
	);
};

export default BookingFromStore;

const BookFromStoreWrapper = styled.div`
	overflow: hidden;
	min-height: 1100px;
`;
