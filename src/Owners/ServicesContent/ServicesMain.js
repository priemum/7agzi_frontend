import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import AddService from "./AddService";
import UpdateService from "./UpdateService";

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
			fontWeight: "bolder",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
		};
	}
};

const ServicesMain = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	//Helper Variables
	const [clickedMenu, setClickedMenu] = useState("AddService");

	useEffect(() => {
		window.scrollTo({ top: 50, behavior: "smooth" });
		// eslint-disable-next-line
	}, []);

	return (
		<ServicesMainWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='Services'
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
								style={isActive(clickedMenu, "AddService")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("AddService")}
							>
								<i className='fa-brands fa-servicestack mr-1'></i> Add A New
								Service
							</div>
							<div
								style={isActive(clickedMenu, "UpdateServices")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("UpdateServices")}
							>
								<i className='fa-solid fa-pen mr-1'></i> Services' List
							</div>
						</div>
					</div>
					{clickedMenu === "AddService" ? <AddService /> : null}
					{clickedMenu === "UpdateServices" ? <UpdateService /> : null}
				</div>
			</div>
		</ServicesMainWrapper>
	);
};

export default ServicesMain;

const ServicesMainWrapper = styled.div`
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
`;
