import React from "react";
import styled from "styled-components";
import MySalonEng from "./MenuImages/application-main-ENG.png";
import MySalonAr from "./MenuImages/application-main.png";
import SettingsEng from "./MenuImages/Setting-Eng.png";
import SettingsAr from "./MenuImages/Setting.png";
import ServicesEng from "./MenuImages/applicationServices-ENG.png";
import ServicesAr from "./MenuImages/applicationServices.png";
import EmployeeAr from "./MenuImages/application-hr.png";
import WebsiteEng from "./MenuImages/Web-site-Eng.png";
import WebsiteAr from "./MenuImages/Web-site.png";
import BookingEng from "./MenuImages/Booking-Eng.png";
import BookingAr from "./MenuImages/Booking-.png";
import CustomerEng from "./MenuImages/customers-ENG.png";
import CustomerAr from "./MenuImages/mobile-application--customers.png";
import BranchesEng from "./MenuImages/branches-ENG.png";
import BranchesAr from "./MenuImages/branches.png";
import CRMEng from "./MenuImages/CRM-ENG.png";
import CRMAr from "./MenuImages/application-CRM.png";
import CashierEng from "./MenuImages/Cashier-Eng.png";
import CashierAr from "./MenuImages/Cashier-.png";
import BillingAr from "./MenuImages/BillingAr.png";
import BillingEn from "./MenuImages/BillingEn.png";
import GallaryAr from "./MenuImages/GallaryAr.png";
import GallaryEn from "./MenuImages/GallaryEn.png";
import SalonPreviewAr from "./MenuImages/SalonPreviewAr.png";
import SalonPreviewEn from "./MenuImages/SalonPreviewEn.png";

import { Link } from "react-router-dom";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#744f0f",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			transition: "var(--mainTransition)",
		};
	}
};

const OwnerNavmenu = ({ language, fromPage, collapseMenu }) => {
	return (
		<OwnerNavmenuWrapper
			dir={language === "Arabic" ? "rtl" : "ltr"}
			show={collapseMenu}
			show2={language === "Arabic"}
		>
			<div className='firstGroup'>
				<div
					className='firstGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/dashboard'>
						{language === "Arabic" ? (
							<img
								src={MySalonAr}
								alt='Powered By Infinite-Apps'
								style={isActive("MainPage", fromPage)}
							/>
						) : (
							<img
								src={MySalonEng}
								alt='Powered By Infinite-Apps'
								style={isActive("MainPage", fromPage)}
							/>
						)}
					</Link>
				</div>

				<div
					className='pt-1 firstGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/store-preview'>
						{language === "Arabic" ? (
							<img
								src={SalonPreviewAr}
								alt='Powered By Infinite-Apps'
								style={isActive("Salon", fromPage)}
							/>
						) : (
							<img
								src={SalonPreviewEn}
								alt='Powered By Infinite-Apps'
								style={isActive("Salon", fromPage)}
							/>
						)}
					</Link>
				</div>

				<div
					className='pt-1 firstGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/settings'>
						{language === "Arabic" ? (
							<img
								src={SettingsAr}
								alt='Powered By Infinite-Apps'
								style={isActive("Settings", fromPage)}
							/>
						) : (
							<img
								src={SettingsEng}
								alt='Powered By Infinite-Apps'
								style={isActive("Settings", fromPage)}
							/>
						)}
					</Link>
				</div>

				<div
					className='pt-1 firstGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/services'>
						{language === "Arabic" ? (
							<img
								src={ServicesAr}
								alt='Powered By Infinite-Apps'
								style={isActive("Services", fromPage)}
							/>
						) : (
							<img
								src={ServicesEng}
								alt='Powered By Infinite-Apps'
								style={isActive("Services", fromPage)}
							/>
						)}
					</Link>
				</div>

				<div
					className='pt-1 firstGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/employees'>
						{language === "Arabic" ? (
							<img
								src={EmployeeAr}
								alt='Powered By Infinite-Apps'
								style={isActive("Employees", fromPage)}
							/>
						) : (
							<img
								src={EmployeeAr}
								alt='Powered By Infinite-Apps'
								style={isActive("Employees", fromPage)}
							/>
						)}
					</Link>
				</div>

				<div
					className='pt-1 firstGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/edit-website'>
						{language === "Arabic" ? (
							<img
								src={WebsiteAr}
								alt='Powered By Infinite-Apps'
								style={isActive("EditWebsite", fromPage)}
							/>
						) : (
							<img
								src={WebsiteEng}
								alt='Powered By Infinite-Apps'
								style={isActive("EditWebsite", fromPage)}
							/>
						)}
					</Link>
				</div>

				<div
					className='pt-1 firstGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/add-gallary'>
						{language === "Arabic" ? (
							<img
								src={GallaryAr}
								alt='Powered By Infinite-Apps'
								style={isActive("Gallary", fromPage)}
							/>
						) : (
							<img
								src={GallaryEn}
								alt='Powered By Infinite-Apps'
								style={isActive("Gallary", fromPage)}
							/>
						)}
					</Link>
				</div>
			</div>

			<div className='SecondGroup pt-5'>
				<div
					className='SecondGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='#'>
						{language === "Arabic" ? (
							<img
								src={CustomerAr}
								alt='Powered By Infinite-Apps'
								style={isActive("Customer", fromPage)}
							/>
						) : (
							<img
								src={CustomerEng}
								alt='Powered By Infinite-Apps'
								style={isActive("Customer", fromPage)}
							/>
						)}
					</Link>
				</div>

				<div
					className=' SecondGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='#'>
						{language === "Arabic" ? (
							<img
								src={BookingAr}
								alt='Powered By Infinite-Apps'
								style={isActive("Bookings", fromPage)}
							/>
						) : (
							<img
								src={BookingEng}
								alt='Powered By Infinite-Apps'
								style={isActive("Bookings", fromPage)}
							/>
						)}
					</Link>
				</div>
			</div>

			<div className='ThirdGroup pt-5'>
				<div
					className='ThirdGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/branches'>
						{language === "Arabic" ? (
							<img
								src={BranchesAr}
								alt='Powered By Infinite-Apps'
								style={isActive("Branches", fromPage)}
							/>
						) : (
							<img
								src={BranchesEng}
								alt='Powered By Infinite-Apps'
								style={isActive("Branches", fromPage)}
							/>
						)}
					</Link>
				</div>

				<div
					className='ThirdGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='#'>
						{language === "Arabic" ? (
							<img
								src={CRMAr}
								alt='Powered By Infinite-Apps'
								style={isActive("CRM", fromPage)}
							/>
						) : (
							<img
								src={CRMEng}
								alt='Powered By Infinite-Apps'
								style={isActive("CRM", fromPage)}
							/>
						)}
					</Link>
				</div>
				<div
					className='ThirdGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/book-appointment-from-store'>
						{language === "Arabic" ? (
							<img
								src={CashierAr}
								alt='Powered By Infinite-Apps'
								style={isActive("Cashier", fromPage)}
							/>
						) : (
							<img
								src={CashierEng}
								alt='Powered By Infinite-Apps'
								style={isActive("Cashier", fromPage)}
							/>
						)}
					</Link>
				</div>
			</div>

			<div className='FourthGroup'>
				<div
					className='FourthGroupItem'
					style={{ textAlign: language === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/billing-account'>
						{language === "Arabic" ? (
							<img
								src={BillingAr}
								alt='Powered By Infinite-Apps'
								style={isActive("Payment", fromPage)}
							/>
						) : (
							<img
								src={BillingEn}
								alt='Powered By Infinite-Apps'
								style={isActive("Payment", fromPage)}
							/>
						)}
					</Link>
				</div>
			</div>
		</OwnerNavmenuWrapper>
	);
};

export default OwnerNavmenu;

const OwnerNavmenuWrapper = styled.div`
	margin-top: 15px;
	overflow-y: auto;
	max-height: 80vh; // modify this value as per your requirement
	width: 100%; // add a width if it's not there
	overflow-y: auto;
	/* border: 1px solid black; */
	img {
		background-color: black;
		width: 85%;
		overflow: auto;
	}

	.SecondGroupItem > a > img {
		background: #0f6674;
	}

	.ThirdGroupItem > a > img {
		background: #0f744f;
	}

	.FourthGroup {
		padding-top: 90px;
	}

	.FourthGroupItem > a > img {
		background: darkred;
	}

	/* For WebKit-based browsers (Chrome, Safari, Opera) */
	::-webkit-scrollbar {
		width: 8px; /* Width of the scrollbar */
	}

	::-webkit-scrollbar-thumb {
		background-color: transparent; /* Color of the thumb (draggable part of the scrollbar) */
		border-radius: 10px; /* Rounded corners for the thumb */
		transition: 0.2s;
	}

	::-webkit-scrollbar-thumb:hover {
		background-color: #555; /* Color of the thumb on hover */
		transition: 0.2s;
	}

	/* For Firefox */
	/* Note: For Firefox, scrollbar styling is only available for version 64 and above. */
	/* The properties for Firefox are non-standard and are subject to change. */
	/* Check Mozilla Developer Network for up-to-date information. */
	* {
		scrollbar-color: #888 #eee; /* Color of the thumb and track (background) */
	}

	*::-webkit-scrollbar {
		width: 10px; /* Width of the scrollbar */
	}

	*::-webkit-scrollbar-thumb {
		background-color: #888; /* Color of the thumb (draggable part of the scrollbar) */
		border-radius: 5px; /* Rounded corners for the thumb */
	}

	*::-webkit-scrollbar-thumb:hover {
		background-color: #555; /* Color of the thumb on hover */
	}

	@media (max-width: 1000px) {
		position: fixed;
		width: 20%; // add a width if it's not there
		transform: ${(props) =>
			props.show && props.show2
				? "translateX(100%)"
				: props.show && !props.show2
				? "translateX(-100%)"
				: "translateX(0%)"};
		transition: 0.5s;

		img {
			background-color: black;
			width: 95%;
			overflow: auto;
		}

		.SecondGroupItem > a > img {
			background: #0f6674 !important;
		}

		.ThirdGroupItem > a > img {
			background: #0f744f !important;
		}

		.FourthGroup {
			padding-top: 90px;
		}

		.FourthGroupItem > a > img {
			background: darkred !important;
		}
	}
`;
