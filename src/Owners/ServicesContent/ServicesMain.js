import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import AddService from "./AddService";
import UpdateService from "./UpdateService";
import { Helmet } from "react-helmet";
import { isAuthenticated } from "../../auth";

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

const ServicesMain = ({ language }) => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(true);

	//Helper Variables
	const [clickedMenu, setClickedMenu] = useState("AddService");

	useEffect(() => {
		window.scrollTo({ top: 50, behavior: "smooth" });
		// eslint-disable-next-line
	}, []);

	const { user } = isAuthenticated();

	return (
		<ServicesMainWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>Owner {user.name} Add Services</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/store/admin/services`}
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
						language={language}
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
								<i className='fa-brands fa-servicestack mr-1'></i>{" "}
								{language === "Arabic"
									? "إضافة خدمة جديدة"
									: "Add A New Service"}
							</div>
							<div
								style={isActive(clickedMenu, "UpdateServices")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("UpdateServices")}
							>
								<i className='fa-solid fa-pen mr-1'></i>{" "}
								{language === "Arabic" ? "قائمة الخدمات" : "Services' List"}
							</div>
						</div>
					</div>
					{clickedMenu === "AddService" ? (
						<AddService language={language} />
					) : null}
					{clickedMenu === "UpdateServices" ? (
						<UpdateService language={language} />
					) : null}
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
