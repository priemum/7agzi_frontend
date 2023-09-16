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
import { useCartContext } from "../../sidebar_context";
import { isAuthenticated, signout } from "../../auth";

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
	const { chosenLanguage } = useCartContext();

	const { user } = isAuthenticated();
	return (
		<OwnerNavmenuWrapper
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			show={collapseMenu}
			show2={chosenLanguage === "Arabic"}
		>
			<div className='firstGroup'>
				<div
					className='firstGroupItem'
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link
						to='#'
						onClick={() => {
							window.location.href = "/store/admin/dashboard";
						}}
					>
						{chosenLanguage === "Arabic" ? (
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
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/store-preview'>
						{chosenLanguage === "Arabic" ? (
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
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/settings'>
						{chosenLanguage === "Arabic" ? (
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
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/services'>
						{chosenLanguage === "Arabic" ? (
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
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/employees'>
						{chosenLanguage === "Arabic" ? (
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
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/edit-website'>
						{chosenLanguage === "Arabic" ? (
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
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/add-gallary'>
						{chosenLanguage === "Arabic" ? (
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

				<div
					className='pt-1 firstGroupItem manualItem'
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<div style={isActive("ProfileUpdate", fromPage)}>
						<Link to={`/profile-update-owner/${user._id}`}>
							<i className='fa-solid fa-pen-nib'></i>
							<br />
							تعديل كلمة المرور
						</Link>
					</div>
				</div>
			</div>

			<div className='SecondGroup pt-5'>
				<div
					className='SecondGroupItem'
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link to='#'>
						{chosenLanguage === "Arabic" ? (
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
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link to='#'>
						{chosenLanguage === "Arabic" ? (
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
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/branches'>
						{chosenLanguage === "Arabic" ? (
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
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link to='#'>
						{chosenLanguage === "Arabic" ? (
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
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link
						to='#'
						onClick={() => {
							window.location.href = "/store/book-appointment-from-store";
						}}
					>
						{chosenLanguage === "Arabic" ? (
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
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<Link to='/store/admin/billing-account'>
						{chosenLanguage === "Arabic" ? (
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
				<div
					className='pt-4 firstGroupItem manualItem'
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				>
					<div style={isActive("ProfileUpdate", fromPage)}>
						<Link
							to='#'
							onClick={() => {
								signout(() => {
									if (window.ReactNativeWebView) {
										window.ReactNativeWebView.postMessage("signedOut");
									} else {
										window.location.href = "/home";
									}
									localStorage.removeItem("userHistoryPurchases");
									localStorage.removeItem("order");
									window.scrollTo({ top: 0, behavior: "smooth" });
								});
							}}
							style={{ color: "#edb9b9" }}
						>
							<i
								className='fas fa-sign-out-alt'
								style={{ color: "#edb9b9", fontSize: "1.5rem" }}
							></i>
							<br />
							LOGOUT
						</Link>
					</div>
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
		padding-top: 50px;
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

	i {
		color: white;
		text-align: center;
		font-size: 2.3rem;
		padding-top: 5px;
	}

	.manualItem {
		color: white;
		text-align: center;
	}

	.manualItem > div {
		text-align: center;
		margin: auto;
	}

	.manualItem > div > a {
		color: white;
		font-size: 12px;
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
			padding-top: 50px;
		}

		.FourthGroupItem > a > img {
			background: darkred !important;
		}
	}
`;
