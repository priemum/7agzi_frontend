import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import EditHomePageBanner from "./EditHomePageBanner";
import { Link, useParams, useLocation } from "react-router-dom";
import EditContactUsBoss from "./EditContactUsBoss";
import EditAboutUsBoss from "./EditAboutUsBoss";

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

const EditWebsiteMainBoss = () => {
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
		<EditWebsiteMainBossWrapper>
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
									to={`/boss/store/admin/edit-website/${ownerId}?edit-about-us`}
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
									to={`/boss/store/admin/edit-website/${ownerId}?edit-contact-us`}
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
									to={`/boss/store/admin/edit-website/${ownerId}?edit-hero-comp`}
								>
									<i className='fa-sharp fa-solid fa-house'></i> Edit Home Page
									Banners
								</Link>
							</div>
						</div>
					</div>
					{clickedMenu === "AboutUs" ? (
						<EditAboutUsBoss ownerId={ownerId} />
					) : null}
					{clickedMenu === "ContactUs" ? (
						<EditContactUsBoss ownerId={ownerId} />
					) : null}
					{clickedMenu === "HomePage" ? (
						<EditHomePageBanner ownerId={ownerId} />
					) : null}
				</div>
			</div>
		</EditWebsiteMainBossWrapper>
	);
};

export default EditWebsiteMainBoss;

const EditWebsiteMainBossWrapper = styled.div`
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
