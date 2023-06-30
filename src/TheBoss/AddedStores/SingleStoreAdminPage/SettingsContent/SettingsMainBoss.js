import React, { useEffect, useState } from "react";
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
import AddingWorkingHours from "./AddingWorkingHours";
import { useParams, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../../../auth";
import { readUser } from "../../../apiBoss";
import { toast } from "react-toastify";

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

const SettingsMainBoss = () => {
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
	const [clickedMenu, setClickedMenu] = useState("AddLogo");
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState("");
	const [currentOwner, setCurrentOwner] = useState("");

	//StoreManagement Main Fields
	const [loyaltyPointsAward, setLoyaltyPointsAward] = useState("");
	const [discountPercentage, setDiscountPercentage] = useState("");
	const [onlineServicesFees, setOnlineServicesFees] = useState("");
	const [addStoreLogo, setAddStoreLogo] = useState([]);
	const [storeThumbnail, setStoreThumbnail] = useState([]);
	const [ownerIdPhoto, setOwnerIdPhoto] = useState([]);
	const [addStoreName, setAddStoreName] = useState("");
	const [addStoreNameArabic, setAddStoreNameArabic] = useState("");
	const [daysStoreClosed, setDaysStoreClosed] = useState("");
	const [datesStoreClosed, setDatesStoreClosed] = useState("");
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [query, setQuery] = useState([]);
	const [oneDateStoreOff, setOneDateStoreOff] = useState("");
	const [activeOnlineBooking, setActiveOnlineBooking] = useState(true);
	const [extraData, setExtraData] = useState({
		branchesCount: 1,
		stylistsCount: 2,
		chairsCount: 2,
		cashPayment: true,
		visaPayment: false,
		airConditioned: false,
		parking: false,
	});
	const [activeWhatsAppNotification, setActiveWhatsAppNotification] =
		useState(true);
	const [loading, setLoading] = useState(false);

	//Checking whether services were added or not
	const [allServices, setAllServices] = useState([]);

	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus(token, ownerId).then((data) => {
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
					setExtraData({
						...extraData,
						branchesCount: lastAddedSettings && lastAddedSettings.branchesCount,
						stylistsCount: lastAddedSettings && lastAddedSettings.stylistsCount,
						chairsCount: lastAddedSettings && lastAddedSettings.chairsCount,
						cashPayment: lastAddedSettings && lastAddedSettings.cashPayment,
						visaPayment: lastAddedSettings && lastAddedSettings.visaPayment,
						airConditioned:
							lastAddedSettings && lastAddedSettings.airConditioned,
						parking: lastAddedSettings && lastAddedSettings.parking,
					});
					setOnlineServicesFees(
						lastAddedSettings && lastAddedSettings.onlineServicesFees
					);
					setDaysStoreClosed({
						daysStoreClosed:
							lastAddedSettings && lastAddedSettings.daysStoreClosed,
					});
					setQuery(lastAddedSettings && lastAddedSettings.daysStoreClosed);
					setActiveWhatsAppNotification(
						lastAddedSettings && lastAddedSettings.activeWhatsAppNotification
					);
					setLongitude(lastAddedSettings && lastAddedSettings.longitude);
					setLatitude(lastAddedSettings && lastAddedSettings.latitude);
					setDatesStoreClosed(
						lastAddedSettings && lastAddedSettings.datesStoreClosed
					);
					setAddStoreLogo(
						lastAddedSettings &&
							lastAddedSettings.addStoreLogo &&
							lastAddedSettings.addStoreLogo.length > 0
							? {
									images: lastAddedSettings.addStoreLogo,
							  }
							: []
					);

					setStoreThumbnail(
						lastAddedSettings &&
							lastAddedSettings.storeThumbnail &&
							lastAddedSettings.storeThumbnail.length > 0
							? { images: lastAddedSettings.storeThumbnail }
							: []
					);
					setOwnerIdPhoto(
						lastAddedSettings &&
							lastAddedSettings.ownerIdPhoto &&
							lastAddedSettings.ownerIdPhoto.length > 0
							? { images: lastAddedSettings.ownerIdPhoto }
							: []
					);

					setAddStoreName(lastAddedSettings && lastAddedSettings.addStoreName);
					setAddStoreNameArabic(
						lastAddedSettings && lastAddedSettings.addStoreNameArabic
					);
					setActiveOnlineBooking(
						lastAddedSettings && lastAddedSettings.activeOnlineBooking
					);
				}
			}
		});
	};

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();
		window.scrollTo({ top: 100, behavior: "smooth" });

		// eslint-disable-next-line
	}, []);

	console.log(storeThumbnail, "storeThu");

	useEffect(() => {
		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		// eslint-disable-next-line
	}, [query]);

	const clickSubmit = () => {
		if (
			storeThumbnail &&
			storeThumbnail.images &&
			storeThumbnail.images.length === 0
		) {
			return toast.error("Please Add Store Thumbnail");
		}

		if (!longitude || !latitude) {
			return toast.error("Longitude & Latitude are required");
		}

		if (!onlineServicesFees) {
			return toast.error(
				"Please Add Online Services Fee which should be at least 3 EGP"
			);
		}

		if (Number(onlineServicesFees) < 3) {
			return toast.error("Online Services Fee which should be at least 3 EGP");
		}

		if (!addStoreName) {
			return toast.error("Store Name Required");
		}
		if (!addStoreNameArabic) {
			return toast.error("Store Name Arabic Required");
		}

		LoyaltyPointsAndStoreStatus(ownerId, token, {
			loyaltyPointsAward: loyaltyPointsAward ? loyaltyPointsAward : 1000000,
			discountPercentage: discountPercentage ? discountPercentage : 0,
			datesStoreClosed,
			daysStoreClosed: daysStoreClosed.daysStoreClosed,
			onlineServicesFees: onlineServicesFees,
			addStoreLogo: addStoreLogo.images,
			storeThumbnail: storeThumbnail.images,
			ownerIdPhoto: ownerIdPhoto.images,
			addStoreName: addStoreName,
			addStoreNameArabic: addStoreNameArabic,
			activeOnlineBooking: activeOnlineBooking,
			activeWhatsAppNotification: activeWhatsAppNotification,
			belongsTo: ownerId,
			longitude: longitude,
			latitude: latitude,
			storePhone: currentOwner.phone,
			branchesCount: extraData.branchesCount,
			stylistsCount: extraData.stylistsCount,
			chairsCount: extraData.chairsCount,
			cashPayment: extraData.cashPayment,
			visaPayment: extraData.visaPayment,
			airConditioned: extraData.airConditioned,
			parking: extraData.parking,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setTimeout(function () {
					setLoyaltyPointsAward("");
					setDiscountPercentage("");
					setDaysStoreClosed([]);
					window.scrollTo({ top: 0, behavior: "smooth" });
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const gettingAllServices = () => {
		getServices(token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllServices(data);
			}
		});
	};

	const gettingCurrentUser = () => {
		readUser(ownerId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setCurrentOwner(data);
			}
		});
	};

	useEffect(() => {
		gettingCurrentUser();
		gettingAllServices();
		// eslint-disable-next-line
	}, []);

	return (
		<SettingsMainBossWrapper>
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
							addStoreNameArabic={addStoreNameArabic}
							setAddStoreName={setAddStoreName}
							setAddStoreNameArabic={setAddStoreNameArabic}
							alreadySetLoyaltyPointsManagement={
								alreadySetLoyaltyPointsManagement
							}
							setClickedMenu={setClickedMenu}
							allServices={allServices}
							storeThumbnail={storeThumbnail}
							setStoreThumbnail={setStoreThumbnail}
							longitude={longitude}
							setLongitude={setLongitude}
							latitude={latitude}
							setLatitude={setLatitude}
							loading={loading}
							setLoading={setLoading}
							ownerIdPhoto={ownerIdPhoto}
							setOwnerIdPhoto={setOwnerIdPhoto}
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
							setExtraData={setExtraData}
							extraData={extraData}
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
							activeWhatsAppNotification={activeWhatsAppNotification}
							setActiveWhatsAppNotification={setActiveWhatsAppNotification}
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
							addStoreName={addStoreName}
							addStoreNameArabic={addStoreNameArabic}
						/>
					) : null}
				</div>
			</div>
		</SettingsMainBossWrapper>
	);
};

export default SettingsMainBoss;

const SettingsMainBossWrapper = styled.div`
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
