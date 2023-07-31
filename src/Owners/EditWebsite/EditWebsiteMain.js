import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import EditAboutUs from "./EditAboutUs";
import EditContactUs from "./EditContactUs";
import EditHomePageBanner from "./EditHomePageBanner";
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

const EditWebsiteMain = ({ language }) => {
	// const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	// const [collapsed, setCollapsed] = useState(false);
	const [collapseMenu, setCollapseMenu] = useState(false);

	//Helper Variables
	const [clickedMenu, setClickedMenu] = useState("AboutUs");

	useEffect(() => {
		if (window.location.search.includes("edit-about-us")) {
			setClickedMenu("AboutUs");
		} else if (window.location.search.includes("edit-contact-us")) {
			setClickedMenu("ContactUs");
		} else if (window.location.search.includes("edit-hero-comp")) {
			setClickedMenu("HomePage");
		} else {
			setClickedMenu("AboutUs");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { user } = isAuthenticated();

	return (
		<EditWebsiteMainWrapper
			dir={language === "Arabic" ? "rtl" : "ltr"}
			show={collapseMenu}
		>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>Owner {user.name} Add Edit Web Page</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/store/admin/edit-website`}
				/>
			</Helmet>

			<div className='grid-container'>
				{/* <div>
					<AdminNavbar
						fromPage='EditWebsite'
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
						fromPage='EditWebsite'
						collapseMenu={collapseMenu}
					/>
				</div>
				<div>
					<div className='container'>
						{language === "Arabic" ? (
							<div className='row mx-auto'>
								<div
									style={isActive(clickedMenu, "AboutUs")}
									className='col-md-3 col-6 mx-auto menuItems'
									onClick={() => setClickedMenu("AboutUs")}
								>
									<Link
										style={isActive(clickedMenu, "AboutUs")}
										to='/store/admin/edit-website?edit-about-us'
									>
										<i className='fa-brands fa-servicestack mr-1'></i> تعديل
										صفحة من نحن
									</Link>
								</div>
								<div
									style={isActive(clickedMenu, "ContactUs")}
									className='col-md-3 col-6 mx-auto menuItems'
									onClick={() => setClickedMenu("ContactUs")}
								>
									<Link
										style={isActive(clickedMenu, "ContactUs")}
										to='/store/admin/edit-website?edit-contact-us'
									>
										<i className='fa-solid fa-pen mr-1'></i> تعديل صفحة اتصل بنا
									</Link>
								</div>
								<div
									style={isActive(clickedMenu, "HomePage")}
									className='col-md-3 col-6 mx-auto menuItems'
									onClick={() => setClickedMenu("HomePage")}
								>
									<Link
										style={isActive(clickedMenu, "HomePage")}
										to='/store/admin/edit-website?edit-hero-comp'
									>
										<i className='fa-sharp fa-solid fa-house'></i> تعديل صفحة
										الرئيسية
									</Link>
								</div>
							</div>
						) : (
							<div className='row mx-auto'>
								<div
									style={isActive(clickedMenu, "AboutUs")}
									className='col-md-3 col-6 mx-auto menuItems'
									onClick={() => setClickedMenu("AboutUs")}
								>
									<Link
										style={isActive(clickedMenu, "AboutUs")}
										to='/store/admin/edit-website?edit-about-us'
									>
										<i className='fa-brands fa-servicestack mr-1'></i> Edit
										About Us Page
									</Link>
								</div>
								<div
									style={isActive(clickedMenu, "ContactUs")}
									className='col-md-3 col-6 mx-auto menuItems'
									onClick={() => setClickedMenu("ContactUs")}
								>
									<Link
										style={isActive(clickedMenu, "ContactUs")}
										to='/store/admin/edit-website?edit-contact-us'
									>
										<i className='fa-solid fa-pen mr-1'></i> Edit Contact Us
										Page
									</Link>
								</div>
								<div
									style={isActive(clickedMenu, "HomePage")}
									className='col-md-3 col-6 mx-auto menuItems'
									onClick={() => setClickedMenu("HomePage")}
								>
									<Link
										style={isActive(clickedMenu, "HomePage")}
										to='/store/admin/edit-website?edit-hero-comp'
									>
										<i className='fa-sharp fa-solid fa-house'></i> Edit Home
										Page Banners
									</Link>
								</div>
							</div>
						)}
					</div>
					{clickedMenu === "AboutUs" ? <EditAboutUs /> : null}
					{clickedMenu === "ContactUs" ? <EditContactUs /> : null}
					{clickedMenu === "HomePage" ? <EditHomePageBanner /> : null}
				</div>
			</div>
		</EditWebsiteMainWrapper>
	);
};

export default EditWebsiteMain;

const EditWebsiteMainWrapper = styled.div`
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

	@media (max-width: 1200px) {
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

		a {
			font-size: 13px !important;
			text-align: center;
		}

		.container > div {
			text-align: center;
			margin-left: 0px !important;
		}

		.container {
			margin-left: 0px !important;
			text-align: center;
			margin-top: 20px !important;
		}
	}
`;
