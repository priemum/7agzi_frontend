import React, {useEffect, useState} from "react";
import styled from "styled-components";
import AdminNavbar from "../Owners/OwnerNavbar/AdminNavbar";
import {Link} from "react-router-dom";

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

const OwnersDashboard = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const [clickedMenu, setClickedMenu] = useState("Calendar");

	useEffect(() => {
		if (window.location.pathname.includes("/store/admin/dashboard")) {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<OwnersDashboardWrapper>
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
				<div className='container-fluid col-lg-12 mx-auto text-center'>
					<div className='row text-center ml-5 my-5'>
						<div
							style={isActive(clickedMenu, "Calendar")}
							className='col-md-2 menuItems'
							onClick={() => setClickedMenu("Calendar")}
						>
							<Link
								style={isActive(clickedMenu, "Calendar")}
								to='/admin/dashboard?calendar'
							>
								<i className='fa-brands fa-servicestack mr-1'></i> Overall
								Appointments
							</Link>
						</div>
						<div
							style={isActive(clickedMenu, "BarberAppointment")}
							className='col-md-2 menuItems'
							onClick={() => setClickedMenu("BarberAppointment")}
						>
							<Link
								style={isActive(clickedMenu, "BarberAppointment")}
								to='/admin/dashboard?barber-appointments'
							>
								<i className='fa-solid fa-pen mr-1'></i> Stylist Appointments
							</Link>
						</div>
						<div
							style={isActive(clickedMenu, "TableView")}
							className='col-md-2 menuItems'
							onClick={() => setClickedMenu("TableView")}
						>
							<Link
								style={isActive(clickedMenu, "TableView")}
								to='/admin/dashboard?table-view'
							>
								<i className='fa-solid fa-table mr-1'></i> Table View
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
								to='/admin/dashboard?shop-reports'
							>
								<i className='fa-solid fa-chart-pie mr-1'></i> Shop Reports
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
								to='/admin/dashboard?customer-reports'
							>
								<i className='fa-solid fa-chart-simple mr-1'></i> Customers
								Report
							</Link>
						</div>
					</div>
				</div>
			</div>
		</OwnersDashboardWrapper>
	);
};

export default OwnersDashboard;

const OwnersDashboardWrapper = styled.div`
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
