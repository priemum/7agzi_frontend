import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import { Link } from "react-router-dom";

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
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

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

	return (
		<EmployeeMainWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='Employees'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div>
					<div className='container'>
						<div className='row mx-auto'>
							<div
								style={isActive(clickedMenu, "AddEmployee")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("AddEmployee")}
							>
								<Link
									style={isActive(clickedMenu, "AddEmployee")}
									onClick={() => setClickedMenu("AddEmployee")}
									to='/store/admin/employees'
								>
									<i className='fa-solid fa-person-dress-burst mr-1'></i>{" "}
									{language === "Arabic"
										? "إضافة موظف جديد"
										: "Add A New Employee"}
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "UpdateEmployee")}
								className='col-md-3 menuItems'
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
		grid-template-columns: 16% 84%;
	}

	.container {
		margin-top: 50px;
		margin-bottom: 20px;
		margin-left: 350px;
	}

	@media (max-width: 1000px) {
		.container {
			margin-top: 50px;
			margin-bottom: 20px;
			margin-left: -10px;
		}
	}
`;
