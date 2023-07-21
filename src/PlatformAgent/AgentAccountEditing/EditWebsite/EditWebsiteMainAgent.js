import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import EditAboutUs from "./EditAboutUs";
import EditContactUs from "./EditContactUs";
import EditHomePageBanner from "./EditHomePageBanner";
import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

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

const EditWebsiteMainAgent = () => {
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

	return (
		<EditWebsiteMainWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>XLOOK Agent Web Page Edit</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/store/admin/edit-website/agent/help/${ownerId}`}
				/>
			</Helmet>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='EditWebsite'
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
								style={isActive(clickedMenu, "AboutUs")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("AboutUs")}
							>
								<Link
									style={isActive(clickedMenu, "AboutUs")}
									to={`/store/admin/edit-website/agent/help/${ownerId}?edit-about-us`}
								>
									<i className='fa-brands fa-servicestack mr-1'></i> Edit About
									Us Page
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "ContactUs")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("ContactUs")}
							>
								<Link
									style={isActive(clickedMenu, "ContactUs")}
									to={`/store/admin/edit-website/agent/help/${ownerId}?edit-contact-us`}
								>
									<i className='fa-solid fa-pen mr-1'></i> Edit Contact Us Page
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "HomePage")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("HomePage")}
							>
								<Link
									style={isActive(clickedMenu, "HomePage")}
									to={`/store/admin/edit-website/agent/help/${ownerId}?edit-hero-comp`}
								>
									<i className='fa-sharp fa-solid fa-house'></i> Edit Home Page
									Banners
								</Link>
							</div>
						</div>
					</div>
					{clickedMenu === "AboutUs" ? <EditAboutUs ownerId={ownerId} /> : null}
					{clickedMenu === "ContactUs" ? (
						<EditContactUs ownerId={ownerId} />
					) : null}
					{clickedMenu === "HomePage" ? (
						<EditHomePageBanner ownerId={ownerId} />
					) : null}
				</div>
			</div>
		</EditWebsiteMainWrapper>
	);
};

export default EditWebsiteMainAgent;

const EditWebsiteMainWrapper = styled.div`
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

	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 2% 98%;
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
		}
	}
`;
