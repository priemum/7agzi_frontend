import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import AddService from "./AddService";
import UpdateService from "./UpdateService";
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

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

const ServicesMainBoss = () => {
	let { ownerId } = useParams();
	let location = useLocation();

	useEffect(() => {
		// Log the path of the current URL
		console.log(location.pathname);
		// Log the ownerId
		console.log(ownerId);
	}, [location, ownerId]);

	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	//Helper Variables
	const [clickedMenu, setClickedMenu] = useState("AddService");

	useEffect(() => {
		window.scrollTo({ top: 50, behavior: "smooth" });
		// eslint-disable-next-line
	}, []);

	return (
		<ServicesMainBossWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>XLOOK ADMIN Add Services</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/boss/store/admin/services/${ownerId}`}
				/>
			</Helmet>
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
								<i className='fa-solid fa-pen mr-1'></i> Update Services
							</div>
						</div>
					</div>
					{clickedMenu === "AddService" ? (
						<AddService ownerId={ownerId} />
					) : null}
					{clickedMenu === "UpdateServices" ? (
						<UpdateService ownerId={ownerId} />
					) : null}
				</div>
			</div>
		</ServicesMainBossWrapper>
	);
};

export default ServicesMainBoss;

const ServicesMainBossWrapper = styled.div`
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
		.grid-container {
			display: grid;
			grid-template-columns: 1% 99%;
		}

		.container {
			margin-left: 10px;
		}
	}
`;
