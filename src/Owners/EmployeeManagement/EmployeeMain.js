import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { Helmet } from "react-helmet";
import OwnerNavmenu from "../NewOwnerNavMenu/OwnerNavmenu";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#0f377e",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "1.2rem",
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
			fontSize: "1.2rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
		};
	}
};

const EmployeeMain = ({ language }) => {
	// const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	// const [collapsed, setCollapsed] = useState(true);
	const [collapseMenu, setCollapseMenu] = useState(false);

	//Helper Variables
	const [clickedMenu, setClickedMenu] = useState("AddEmployee");

	useEffect(() => {
		if (window.location.search.includes("update-employee")) {
			setClickedMenu("UpdateEmployee");
		} else {
			setClickedMenu("AddEmployee");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const { user } = isAuthenticated();

	return (
		<EmployeeMainWrapper
			dir={language === "Arabic" ? "rtl" : "ltr"}
			show={collapseMenu}
		>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>Owner {user.name} Add Employees</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/store/admin/employees`}
				/>
			</Helmet>
			<div className='grid-container'>
				{/* <div>
					<AdminNavbar
						fromPage='Employees'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
						language={language}
					/>
				</div> */}

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
						language={language}
						fromPage='Employees'
						collapseMenu={collapseMenu}
					/>
				</div>
				<div>
					<div className='container'>
						<div className='row mx-auto'>
							<div
								style={isActive(clickedMenu, "AddEmployee")}
								className='col-md-3 col-6 mx-auto menuItems'
								onClick={() => setClickedMenu("AddEmployee")}
							>
								<Link
									style={isActive(clickedMenu, "AddEmployee")}
									onClick={() => setClickedMenu("AddEmployee")}
									to='/store/admin/employees'
								>
									<i className='fa-solid fa-person-dress-burst mr-1'></i>{" "}
									{language === "Arabic" ? "إضافة موظف جديد" : "New Employee"}
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "UpdateEmployee")}
								className='col-md-3 col-6 mx-auto menuItems'
								onClick={() => setClickedMenu("UpdateEmployee")}
							>
								<Link
									style={isActive(clickedMenu, "UpdateEmployee")}
									onClick={() => setClickedMenu("UpdateEmployee")}
									to='/store/admin/employees?update-employee'
								>
									<i className='fa-solid fa-pen mr-1'></i>{" "}
									{language === "Arabic" ? "قائمة الموظفين" : "Employees' List"}
								</Link>
							</div>
						</div>
					</div>
					{clickedMenu === "AddEmployee" ? (
						<AddEmployee language={language} />
					) : null}
					{clickedMenu === "UpdateEmployee" ? (
						<UpdateEmployee language={language} />
					) : null}
				</div>
			</div>
		</EmployeeMainWrapper>
	);
};

export default EmployeeMain;

const EmployeeMainWrapper = styled.div`
	min-height: 1000px;

	.grid-container {
		display: grid;
		grid-template-columns: 5% 95%;
	}

	.container {
		margin-top: 50px;
		margin-bottom: 20px;
		margin-left: 350px;
	}

	.menuWrapper {
		background-color: ${(props) => (props.show ? "white" : "black")};
		overflow: auto;
	}
	.iconMenu {
		display: none;
	}

	@media (max-width: 1000px) {
		.grid-container {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) => (props.show ? "3% 97%" : "18% 82%")};
		}

		.iconMenu {
			display: block;
			color: ${(props) => (props.show ? "black" : "white")};
			position: ${(props) => (props.show ? "absolute" : "")};
			text-align: right;
			font-size: 20px;
			margin-right: ${(props) => (props.show ? "3px" : "5px")};
		}

		.menuItems > a {
			font-size: 12px !important;
			margin: auto !important;
		}

		.container {
			margin-left: 10px;
		}
	}
`;
