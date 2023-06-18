import React, {useEffect, useState} from "react";
import styled from "styled-components";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import Adding1Logo from "./Adding1Logo";
import Adding2DaysClosed from "./Adding2DaysClosed";
import Adding3Awards from "./Adding3Awards";
import {
	LoyaltyPointsAndStoreStatus,
	allLoyaltyPointsAndStoreStatus,
	getServices,
} from "../apiOwner";
import {isAuthenticated} from "../../auth";
import AddingWorkingHours from "./AddingWorkingHours";
// import {Redirect} from "react-router-dom";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#0f377e",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "1.1rem",
			textAlign: "center",
			padding: "7px",
			color: "white",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			backgroundColor: "white",
			padding: "7px",
			borderRadius: "5px",
			fontSize: "1.1rem",
			fontWeight: "bolder",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
		};
	}
};

const SettingsMain = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	//Helper Variables
	const [clickedMenu, setClickedMenu] = useState("AddLogo");
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState("");

	//StoreManagement Main Fields
	const [loyaltyPointsAward, setLoyaltyPointsAward] = useState("");
	const [discountPercentage, setDiscountPercentage] = useState("");
	const [onlineServicesFees, setOnlineServicesFees] = useState("");
	const [addStoreLogo, setAddStoreLogo] = useState([]);
	const [storeThumbnail, setStoreThumbnail] = useState([]);
	const [addStoreName, setAddStoreName] = useState("");
	const [daysStoreClosed, setDaysStoreClosed] = useState("");
	const [datesStoreClosed, setDatesStoreClosed] = useState("");
	const [query, setQuery] = useState([]);
	const [oneDateStoreOff, setOneDateStoreOff] = useState("");
	const [activeOnlineBooking, setActiveOnlineBooking] = useState(true);

	//Checking whether services were added or not
	const [allServices, setAllServices] = useState([]);

	const {user, token} = isAuthenticated();

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var lastAddedSettings;

				if (data.length === 0) {
					lastAddedSettings = "";
				} else {
					lastAddedSettings = data && data[data.length - 1];
				}

				if (lastAddedSettings) {
					setAlreadySetLoyaltyPointsManagement(lastAddedSettings);
					setLoyaltyPointsAward(
						lastAddedSettings && lastAddedSettings.loyaltyPointsAward
					);
					setDiscountPercentage(
						lastAddedSettings && lastAddedSettings.discountPercentage
					);
					setOnlineServicesFees(
						lastAddedSettings && lastAddedSettings.onlineServicesFees
					);
					setDaysStoreClosed({
						daysStoreClosed:
							lastAddedSettings && lastAddedSettings.daysStoreClosed,
					});
					setQuery(lastAddedSettings && lastAddedSettings.daysStoreClosed);
					setDatesStoreClosed(
						lastAddedSettings && lastAddedSettings.datesStoreClosed
					);
					setAddStoreLogo({
						images: lastAddedSettings && lastAddedSettings.addStoreLogo,
					});
					setStoreThumbnail({
						images: lastAddedSettings && lastAddedSettings.storeThumbnail,
					});
					setAddStoreName(lastAddedSettings && lastAddedSettings.addStoreName);
					setActiveOnlineBooking(
						lastAddedSettings && lastAddedSettings.activeOnlineBooking
					);
				}
			}
		});
	};

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();
		window.scrollTo({top: 100, behavior: "smooth"});

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setDaysStoreClosed({...daysStoreClosed, daysStoreClosed: query});
		// eslint-disable-next-line
	}, [query]);

	const clickSubmit = () => {
		LoyaltyPointsAndStoreStatus(user._id, token, {
			loyaltyPointsAward: loyaltyPointsAward ? loyaltyPointsAward : 1000000,
			discountPercentage: discountPercentage ? discountPercentage : 0,
			datesStoreClosed,
			daysStoreClosed: daysStoreClosed.daysStoreClosed,
			onlineServicesFees: onlineServicesFees,
			addStoreLogo: addStoreLogo.images,
			storeThumbnail: storeThumbnail.images,
			addStoreName: addStoreName,
			activeOnlineBooking: activeOnlineBooking,
			storePhone: user.phone,
			belongsTo: isAuthenticated().user._id,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setTimeout(function () {
					setLoyaltyPointsAward("");
					setDiscountPercentage("");
					setDaysStoreClosed([]);
					window.scrollTo({top: 0, behavior: "smooth"});
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const gettingAllServices = () => {
		getServices(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllServices(data);
			}
		});
	};

	useEffect(() => {
		gettingAllServices();
		// eslint-disable-next-line
	}, []);

	return (
		<SettingsMainWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='Settings'
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
								style={isActive(clickedMenu, "AddLogo")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("AddLogo")}
							>
								<i className='fa-brands fa-html5 mr-1'></i> Add Logo
							</div>
							<div
								style={isActive(clickedMenu, "WorkingDays")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("WorkingDays")}
							>
								<i className='fa-solid fa-calendar-days mr-1'></i> Add Working
								Days
							</div>
							<div
								style={isActive(clickedMenu, "Awards")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("Awards")}
							>
								<i className='fa-solid fa-award mr-1'></i> Add Awards
							</div>
							<div
								style={isActive(clickedMenu, "WorkingHours")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("WorkingHours")}
							>
								<i className='fa-solid fa-clock mr-1'></i> Add Working Hours
							</div>
						</div>
					</div>

					{clickedMenu === "AddLogo" ? (
						<Adding1Logo
							addStoreLogo={addStoreLogo}
							setAddStoreLogo={setAddStoreLogo}
							addStoreName={addStoreName}
							setAddStoreName={setAddStoreName}
							alreadySetLoyaltyPointsManagement={
								alreadySetLoyaltyPointsManagement
							}
							setClickedMenu={setClickedMenu}
							allServices={allServices}
							storeThumbnail={storeThumbnail}
							setStoreThumbnail={setStoreThumbnail}
						/>
					) : null}

					{clickedMenu === "WorkingDays" ? (
						<Adding2DaysClosed
							daysStoreClosed={daysStoreClosed}
							setDaysStoreClosed={setDaysStoreClosed}
							datesStoreClosed={datesStoreClosed}
							setDatesStoreClosed={setDatesStoreClosed}
							alreadySetLoyaltyPointsManagement={
								alreadySetLoyaltyPointsManagement
							}
							query={query}
							setQuery={setQuery}
							oneDateStoreOff={oneDateStoreOff}
							setOneDateStoreOff={setOneDateStoreOff}
							setClickedMenu={setClickedMenu}
							activeOnlineBooking={activeOnlineBooking}
							setActiveOnlineBooking={setActiveOnlineBooking}
						/>
					) : null}

					{clickedMenu === "Awards" ? (
						<Adding3Awards
							loyaltyPointsAward={loyaltyPointsAward}
							setLoyaltyPointsAward={setLoyaltyPointsAward}
							discountPercentage={discountPercentage}
							setDiscountPercentage={setDiscountPercentage}
							onlineServicesFees={onlineServicesFees}
							setOnlineServicesFees={setOnlineServicesFees}
							alreadySetLoyaltyPointsManagement={
								alreadySetLoyaltyPointsManagement
							}
							clickSubmit={clickSubmit}
							setClickedMenu={setClickedMenu}
						/>
					) : null}

					{clickedMenu === "WorkingHours" ? (
						<AddingWorkingHours
							loyaltyPointsAward={loyaltyPointsAward}
							setLoyaltyPointsAward={setLoyaltyPointsAward}
							discountPercentage={discountPercentage}
							setDiscountPercentage={setDiscountPercentage}
							onlineServicesFees={onlineServicesFees}
							setOnlineServicesFees={setOnlineServicesFees}
							alreadySetLoyaltyPointsManagement={
								alreadySetLoyaltyPointsManagement
							}
							clickSubmit2={clickSubmit}
						/>
					) : null}
				</div>
			</div>
		</SettingsMainWrapper>
	);
};

export default SettingsMain;

const SettingsMainWrapper = styled.div`
	min-height: 1000px;
	.grid-container {
		display: grid;
		grid-template-columns: 12% 84%;
	}

	.container {
		margin-top: 50px;
		margin-bottom: 20px;
	}

	h3 {
		font-weight: bold;
		color: goldenrod;
	}
`;
