import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeroComponent from "./HeroComponent";
import {
	allLoyaltyPointsAndStoreStatus,
	getAbouts,
	getAllHeros,
	getContacts,
	getEmployees,
	getPreviousAddedGallary,
	getServices,
} from "../apiOwner";
import { isAuthenticated } from "../../../../auth";
import AddedServicesPreview from "./AddedServicesPreview";
import EmployeesListPreview from "./EmployeeListPreview";
import GettingMap from "../../../../components/SingleStorePage/GettingMap";
import Gallary from "./Gallary";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import EditBanner from "./ModalsForEdit/BannerAndThumb/EditBanner";
import { Spin } from "antd";
import SalonNameAndGeneral from "./ModalsForEdit/SalonNameAndGeneral";
import { useParams, useLocation } from "react-router-dom";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "grey",
			fontWeight: "bolder",
			padding: "5px 0px 5px 0px",
			border: "lightgrey 1px solid",
			textAlign: "center",
			borderRadius: "5px",
			marginRight: "5px",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			fontSize: "11.5px",

			// textDecoration: "underline",
		};
	} else {
		return {
			fontWeight: "bolder",
			padding: "5px 0px 5px 0px",
			border: "lightgrey 1px solid",
			textAlign: "center",
			borderRadius: "5px",
			marginRight: "5px",
			marginLeft: "3px",
			fontSize: "11.5px",
			cursor: "pointer",
		};
	}
};

const StorePreviewMainBoss = ({ language }) => {
	let { ownerId } = useParams();
	let location = useLocation();

	useEffect(() => {
		// Log the path of the current URL
		console.log(location.pathname);
		// Log the ownerId
		console.log(ownerId);
	}, [location, ownerId]);

	const [clickedMenu, setClickedMenu] = useState("SERVICES");
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [hero1, setHero1] = useState("");
	const [allEmployees, setAllEmployees] = useState([]);
	const [AllServices, setAllServices] = useState([]);
	const [AllServices2, setAllServices2] = useState([]);
	// eslint-disable-next-line
	const [aboutus, setAboutUs] = useState({});
	// eslint-disable-next-line
	const [contact, setContact] = useState({});
	// eslint-disable-next-line
	const [previousGallary, setPreviousGallary] = useState("");
	const [values, setValues] = useState({ gallaryPhotos: [] });
	const [lastSettings, setLastSettings] = useState(null);
	const [overallAddedSettings, setOverallAddedSettings] = useState([]);
	const [chosenCustomerType2, setChosenCustomerType2] = useState("");
	const [allCustomerType, setAllCustomerType] = useState([]);
	const [storeThumbnail, setStoreThumbnail] = useState([]);

	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);

	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	useEffect(() => {
		if (window.location.search.includes("STYLISTS")) {
			setClickedMenu("STYLISTS");
		} else if (window.location.search.includes("about")) {
			setClickedMenu("ABOUT");
		} else if (window.location.search.includes("gallery")) {
			setClickedMenu("GALLERY");
		} else if (window.location.search.includes("map")) {
			setClickedMenu("MAP");
		} else {
			setClickedMenu("SERVICES");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const gettingAllAbouts = () => {
		setLoading(true);
		getAbouts(token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAboutUs(data[data.length - 1]);
				setLoading(false);
			}
		});
	};

	const gettingAllContacts = () => {
		setLoading(true);

		getContacts(token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setContact(data[data.length - 1]);
				setLoading(false);
			}
		});
	};

	const gettingAllHeroes = () => {
		setLoading(true);

		getAllHeros(token, ownerId).then((data) => {
			if (data.error) {
			} else {
				const lastAddedHeros = data[data.length - 1];
				if (lastAddedHeros && data.length > 0) {
					setHero1(
						data[data.length - 1].thumbnail[0]
							? data[data.length - 1].thumbnail[0]
							: []
					);
					setLoading(false);
				} else {
					setHero1([]);
					setLoading(false);
				}
			}
		});
	};

	const getStoreGallary = () => {
		setLoading(true);
		getPreviousAddedGallary(token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
				setLoading(true);
			} else {
				var lastAdded = data[data.length - 1];
				setPreviousGallary(lastAdded);
				var adjustingPhotos =
					lastAdded &&
					lastAdded.gallaryPhotos &&
					lastAdded.gallaryPhotos.map((i) => {
						return {
							url: i.url,
							public_id: i.public_id,
						};
					});

				setValues(
					lastAdded &&
						lastAdded.gallaryPhotos &&
						lastAdded.gallaryPhotos.length > 0
						? { gallaryPhotos: adjustingPhotos }
						: { gallaryPhotos: [] }
				);

				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
		});
	};

	const gettingAllServices = () => {
		setLoading(true);

		getServices(token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error, "Error getting services");
			} else {
				setAllServices(data);

				var allServices2 =
					data.filter((i) => i.activeService === true) &&
					data.filter((i) => i.activeService === true).map((ii) => ii);

				setChosenCustomerType2(
					[...new Set(data && data.map((i) => i.customerType))][0]
				);

				setAllCustomerType([
					...new Set(data && data.map((i) => i.customerType)),
				]);

				setAllServices2([...new Set(allServices2)]);

				setLoading(false);
			}
		});
	};

	const gettingAllEmployees = () => {
		setLoading(true);

		getEmployees(ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllEmployees(data);
				setLoading(false);
			}
		});
	};

	const gettingPreviousLoyaltyPointsManagement = () => {
		setLoading(true);
		allLoyaltyPointsAndStoreStatus(token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var lastAddedSettings;

				if (data.length === 0) {
					lastAddedSettings = "";
					setLastSettings([]);
					setOverallAddedSettings([]);
					setLoading(false);
				} else {
					lastAddedSettings = data && data[data.length - 1];
					setLastSettings(lastAddedSettings);
					setOverallAddedSettings(data);
					setStoreThumbnail(
						lastAddedSettings &&
							lastAddedSettings.storeThumbnail &&
							lastAddedSettings.storeThumbnail.length > 0
							? { images: lastAddedSettings.storeThumbnail }
							: []
					);

					setLoading(false);
				}
			}
		});
	};

	useEffect(() => {
		gettingAllServices();
		gettingAllAbouts();
		gettingAllContacts();
		gettingAllHeroes();
		gettingAllEmployees();
		getStoreGallary();
		gettingPreviousLoyaltyPointsManagement();
		// eslint-disable-next-line
	}, []);

	return (
		<StorePreviewMainWrapper>
			<EditBanner
				language={language}
				setLoading={setLoading}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				hero1={hero1}
				storeThumbnail={storeThumbnail}
				setStoreThumbnail={setStoreThumbnail}
				lastSettings={lastSettings}
				ownerId={ownerId}
			/>
			<SalonNameAndGeneral
				language={language}
				setLoading={setLoading}
				modalVisible={modalVisible2}
				setModalVisible={setModalVisible2}
				setStoreThumbnail={setStoreThumbnail}
				lastSettings={lastSettings}
				ownerId={ownerId}
			/>
			<div>
				{loading ? (
					<div
						style={{
							textAlign: "center",
							paddingTop: "10%",
							paddingBottom: "20%",
						}}
					>
						<Spin size='large' />
					</div>
				) : (
					<HeroComponent
						hero1={hero1}
						AllServices={AllServices}
						AllServices2={AllServices2}
						allEmployees={allEmployees}
						fromLocalStore={lastSettings}
						setModalVisible={setModalVisible}
						modalVisible={modalVisible}
						setModalVisible2={setModalVisible2}
						overallAddedSettings={overallAddedSettings}
						language={language}
						ownerId={ownerId}
					/>
				)}
			</div>
			<div className='phoneContent'>
				<div
					className='row'
					style={{
						background: "#1e1e1e",
						padding: "5px 0px",
						paddingLeft: "20px",
					}}
				>
					<div
						className='col-2 navLinks'
						style={isActive(clickedMenu, "SERVICES")}
						onClick={() => setClickedMenu("SERVICES")}
					>
						{language === "Arabic" ? "الخدمات" : "SERVICES"}
					</div>
					<div
						className='col-2 navLinks'
						style={isActive(clickedMenu, "STYLISTS")}
						onClick={() => setClickedMenu("STYLISTS")}
					>
						{language === "Arabic" ? "الفريق" : "TEAM"}
					</div>
					<div
						className='col-2 navLinks'
						style={isActive(clickedMenu, "ABOUT")}
						onClick={() => setClickedMenu("ABOUT")}
					>
						{language === "Arabic" ? "عنا" : "ABOUT"}
					</div>
					<div
						className='col-2 navLinks'
						style={isActive(clickedMenu, "GALLERY")}
						onClick={() => setClickedMenu("GALLERY")}
					>
						{language === "Arabic" ? "المعرض" : "GALLERY"}
					</div>
					<div
						className='col-2 navLinks'
						style={isActive(clickedMenu, "MAP")}
						onClick={() => setClickedMenu("MAP")}
					>
						{language === "Arabic" ? "الخريطة" : "MAP"}
					</div>
				</div>
			</div>

			{clickedMenu === "SERVICES" ? (
				<div className='my-4'>
					<div className='mb-3'>
						<select
							style={{
								textTransform: "capitalize",
								backgroundColor: "#1e1e1e",
								color: "white",
								border: "none",
							}}
							className='form-control'
							onChange={(e) => setChosenCustomerType2(e.target.value)}
						>
							{chosenCustomerType2 ? (
								<option
									value={chosenCustomerType2}
									style={{ textTransform: "capitalize" }}
								>
									{chosenCustomerType2}
								</option>
							) : (
								<option value='Please Select'>
									Please Select Customer Type
								</option>
							)}

							{allCustomerType &&
								allCustomerType.map((customerType, i) => {
									return (
										<option
											style={{ textTransform: "capitalize" }}
											key={i}
											value={customerType}
										>
											{customerType}
										</option>
									);
								})}
						</select>
					</div>
					<AddedServicesPreview
						ownerId={ownerId}
						chosenCustomerType={chosenCustomerType2}
						language={language}
						overallAddedSettings={overallAddedSettings}
					/>
				</div>
			) : null}

			{clickedMenu === "STYLISTS" ? (
				<div className='my-4'>
					<EmployeesListPreview
						storeProperties={lastSettings}
						contact={contact}
						filteredResults={allEmployees}
						language={language}
						ownerId={ownerId}
					/>
				</div>
			) : null}

			{clickedMenu === "ABOUT" ? (
				<div className='my-2'>
					<AboutUs
						aboutus={aboutus}
						storeProperties={lastSettings}
						ownerId={ownerId}
					/>
					<div className='mb-5'>
						<ContactUs contact={contact} />
					</div>
				</div>
			) : null}

			{clickedMenu === "GALLERY" ? (
				<div className='my-4'>
					<Gallary filteredResults={values} ownerId={ownerId} />
				</div>
			) : null}

			{clickedMenu === "MAP" ? (
				<div className='my-4'>
					{!loading &&
					lastSettings &&
					lastSettings.addStoreName &&
					lastSettings.latitude &&
					lastSettings.longitude ? (
						<GettingMap
							storeProperties={lastSettings}
							loading={loading}
							ownerId={ownerId}
						/>
					) : null}
				</div>
			) : null}
		</StorePreviewMainWrapper>
	);
};

export default StorePreviewMainBoss;

const StorePreviewMainWrapper = styled.div`
	min-height: 1000px;
	background-color: black;

	.phoneContent {
		display: none;
	}

	@media (max-width: 800px) {
		.deskTopContent {
			display: none;
		}
		.phoneContent {
			display: block;
			color: white;
			padding: 5px;
			overflow: hidden;
		}

		.navLinks {
			font-weight: bolder;
			padding: 5px;
			border: lightgrey 0.1px solid;
			text-align: center;
			border-radius: 2px;
			cursor: pointer;
		}

		.firstAvailableApp {
			border-radius: 25px 110px;
		}
	}
`;
