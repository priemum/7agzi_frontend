import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import AddService from "./AddService";
import UpdateService from "./UpdateService";
import { Helmet } from "react-helmet";
import { isAuthenticated } from "../../auth";
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
			fontWeight: "bolder",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
		};
	}
};

const ServicesMain = ({ language }) => {
	// const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	// const [collapsed, setCollapsed] = useState(true);
	const [collapseMenu, setCollapseMenu] = useState(false);

	//Helper Variables
	const [clickedMenu, setClickedMenu] = useState("AddService");

	useEffect(() => {
		window.scrollTo({ top: 50, behavior: "smooth" });
		// eslint-disable-next-line
	}, []);

	const { user } = isAuthenticated();

	return (
		<ServicesMainWrapper
			dir={language === "Arabic" ? "rtl" : "ltr"}
			show={collapseMenu}
		>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>Owner {user.name} Add Services</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/store/admin/services`}
				/>
			</Helmet>
			<div className='grid-container'>
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
						fromPage='Services'
						collapseMenu={collapseMenu}
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

		.menuItems {
			font-size: 12px !important;
			margin: auto !important;
		}

		.container {
			margin-left: 10px;
		}
	}
`;
