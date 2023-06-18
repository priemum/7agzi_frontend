import React, {useEffect, useState} from "react";
import styled from "styled-components";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import MyCalendar from "./MyCalendar";
import {Link, useParams, useLocation} from "react-router-dom";
import EmployeeAppointments from "./EmployeeAppointments";
import TableView from "./TableView";
import ShopReports from "./ShopReports";
import UsersReport from "./ShopReportsContent/UsersReport";
import {
	allLoyaltyPointsAndStoreStatus,
	getAllUsers,
	getEmployees,
} from "../apiOwner";
import Countdown from "./Countdown";
import {isAuthenticated} from "../../../../auth";

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
			fontSize: "1rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
		};
	}
};

const OwnerDashboardBoss = ({language}) => {
	let {ownerId} = useParams();
	let location = useLocation();

	useEffect(() => {
		// Log the path of the current URL
		console.log(location.pathname);
		// Log the ownerId
		console.log(ownerId);
	}, [location, ownerId]);

	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [currentUser, setCurrentUser] = useState("");

	//Helper Variables
	const [clickedMenu, setClickedMenu] = useState("Calendar");
	const [storeProperties, setStoreProperties] = useState("");
	const [allEmployees, setAllEmployees] = useState([]);

	// eslint-disable-next-line
	const {user, token} = isAuthenticated();

	const getOnlineStoreName = () => {
		allLoyaltyPointsAndStoreStatus(token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setStoreProperties(data && data[data.length - 1]);
			}
		});
	};

	const gettingAllEmployees = () => {
		getEmployees(ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllEmployees(data);
			}
		});
	};

	useEffect(() => {
		if (window.location.pathname.includes("/boss/store/admin/dashboard")) {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
		window.scrollTo({top: 78, behavior: "smooth"});
	}, []);

	useEffect(() => {
		if (window.location.search.includes("calendar")) {
			setClickedMenu("Calendar");
		} else if (window.location.search.includes("barber-appointments")) {
			setClickedMenu("BarberAppointment");
		} else if (window.location.search.includes("table-view")) {
			setClickedMenu("TableView");
		} else if (window.location.search.includes("shop-reports")) {
			setClickedMenu("ShopReports");
		} else if (window.location.search.includes("customer-reports")) {
			setClickedMenu("CustomerReports");
		} else {
			setClickedMenu("Calendar");
		}
		getOnlineStoreName();
		gettingCurrentUser();
		gettingAllEmployees();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const gettingCurrentUser = () => {
		getAllUsers(ownerId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setCurrentUser(
					data.filter((i) => i._id === ownerId) &&
						data.filter((i) => i._id === ownerId)[0]
				);
			}
		});
	};

	const now = new Date();
	const endDate = new Date(currentUser && currentUser.createdAt);
	const diffTime = Math.abs(endDate - now);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	// eslint-disable-next-line
	const remainingDays = 3 - diffDays;

	const reloadCount = sessionStorage.getItem("reloadCount");

	useEffect(() => {
		if (reloadCount < 1) {
			sessionStorage.setItem("reloadCount", String(reloadCount + 1));
			window.location.reload();
		} else {
			sessionStorage.removeItem("reloadCount");
		}

		// eslint-disable-next-line
	}, []);

	return (
		<OwnerDashboardBossWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='AdminDasboard'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>

				<div>
					<div className='mt-5 ml-5'>
						<Link
							style={{
								fontSize: "2rem",
								fontWeight: "bolder",
								textDecoration: "underline",
							}}
							to='/boss/admin/added-stores'
						>
							Return To Your BOSS DASHBOARD
						</Link>
					</div>
					<div
						className=''
						style={{top: "70px", right: "2%", position: "absolute"}}
					>
						{currentUser && currentUser.createdAt ? (
							<Countdown theDate={currentUser.createdAt} />
						) : null}
					</div>
					<div className='container-fluid col-lg-12 mx-auto text-center'>
						<div className='row text-center ml-5 my-5'>
							<div
								style={isActive(clickedMenu, "Calendar")}
								className='col-md-2 menuItems'
								onClick={() => setClickedMenu("Calendar")}
							>
								<Link
									style={isActive(clickedMenu, "Calendar")}
									to={`${location.pathname}?calendar`}
								>
									<i className='fa-brands fa-servicestack mr-1'></i>
									{language === "Arabic" ? "الجدول" : "Overall Appointments"}
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "BarberAppointment")}
								className='col-md-2 menuItems'
								onClick={() => setClickedMenu("BarberAppointment")}
							>
								<Link
									style={isActive(clickedMenu, "BarberAppointment")}
									to={`${location.pathname}?barber-appointments`}
								>
									<i className='fa-solid fa-pen mr-1'></i>
									{language === "Arabic"
										? "عمل الموظف"
										: "Employee Appointments"}
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "TableView")}
								className='col-md-2 menuItems'
								onClick={() => setClickedMenu("TableView")}
							>
								<Link
									style={isActive(clickedMenu, "TableView")}
									to={`${location.pathname}?table-view`}
								>
									<i className='fa-solid fa-table mr-1'></i>
									{language === "Arabic" ? "جدول المحتويات" : "Table View"}
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "ShopReports")}
								className='col-md-2 menuItems '
								onClick={() => {
									setClickedMenu("ShopReports");
									window.scrollTo({top: 100, behavior: "smooth"});
								}}
							>
								<Link
									style={isActive(clickedMenu, "ShopReports")}
									to={`${location.pathname}?shop-reports`}
								>
									<i className='fa-solid fa-chart-pie mr-1'></i>
									{language === "Arabic" ? "التقارير العامة" : "Shop Reports"}
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "CustomerReports")}
								className='col-md-2 menuItems '
								onClick={() => {
									setClickedMenu("CustomerReports");
									window.scrollTo({top: 100, behavior: "smooth"});
								}}
							>
								<Link
									style={isActive(clickedMenu, "CustomerReports")}
									to={`${location.pathname}?customer-reports`}
								>
									<i className='fa-solid fa-chart-simple mr-1'></i>
									{language === "Arabic" ? "تقرير العملاء" : "Customers Report"}
								</Link>
							</div>
						</div>
					</div>
					{!storeProperties ? (
						<h2
							style={{
								fontWeight: "bolder",
								marginLeft: "30%",
								fontSize: "3rem",
							}}
						>
							{" "}
							<Link
								style={{
									fontWeight: "bolder",
									textDecoration: "underline",
									letterSpacing: "5px",
								}}
								to='/store/admin/settings'
							>
								{language === "Arabic"
									? "أضف إعدادات المتجر"
									: "Add Store Settings"}
							</Link>{" "}
						</h2>
					) : allEmployees && allEmployees.length === 0 ? (
						<h2
							style={{
								fontWeight: "bolder",
								marginLeft: "30%",
								fontSize: "3rem",
							}}
						>
							{" "}
							<Link
								style={{
									fontWeight: "bolder",
									textDecoration: "underline",
									letterSpacing: "5px",
								}}
								to={`/boss/store/admin/employees/${ownerId}`}
							>
								{language === "Arabic" ? "اضافة موظف" : "Add Employee"}
							</Link>{" "}
						</h2>
					) : (
						<>
							{clickedMenu === "Calendar" ? (
								<MyCalendar language={language} ownerId={ownerId} />
							) : null}
							{clickedMenu === "BarberAppointment" ? (
								<EmployeeAppointments language={language} ownerId={ownerId} />
							) : null}

							{clickedMenu === "TableView" ? (
								<TableView language={language} ownerId={ownerId} />
							) : null}
							{clickedMenu === "ShopReports" ? (
								<ShopReports language={language} ownerId={ownerId} />
							) : null}
							{clickedMenu === "CustomerReports" ? (
								<UsersReport language={language} ownerId={ownerId} />
							) : null}
						</>
					)}
				</div>
			</div>
		</OwnerDashboardBossWrapper>
	);
};

export default OwnerDashboardBoss;

const OwnerDashboardBossWrapper = styled.div`
	min-height: 1200px;

	.grid-container {
		display: grid;
		grid-template-columns: 5% 95%;
	}

	.container-fluid {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.remainingDays {
		/* background-color: darkred; */
		/* padding: 0.1px; */
		/* border-radius: 5px; */
		font-size: 0.9rem;
		font-weight: bold;
		/* text-align: center; */
		/* cursor: pointer; */
		/* transition: var(--mainTransition); */
		color: white;
	}

	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 2% 98%;
		}

		a {
			font-size: 13px !important;
			text-align: center;
		}

		.container-fluid > div {
			text-align: center;
			margin-left: 0px !important;
		}

		.container-fluid {
			margin-left: 0px !important;
			text-align: center;
		}
	}
`;
