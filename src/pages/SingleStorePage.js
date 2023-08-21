//New Version

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	getAbouts,
	getContacts,
	getAllHeros,
	getServices,
	getEmployees,
} from "../apiCore";
import { Helmet } from "react-helmet";
import HeroComponent from "../components/SingleStorePage/HeroComponent";
import EmployeesList from "../components/SingleStorePage/EmployeeList";
import ContactUs from "../components/SingleStorePage/ContactUs";
import AboutUs from "../components/SingleStorePage/AboutUs";
import { useParams } from "react-router-dom";
import { allLoyaltyPointsAndStoreStatusByPhoneAndStore } from "../TheBoss/apiBoss";
import AddedServices from "../components/SingleStorePage/AddedServices";
import Gallary from "../components/SingleStorePage/Gallary";

// eslint-disable-next-line
// import FirstAvailableAppointments from "../components/SingleStorePage/FirstAvailableAppointments";
import { Link } from "react-router-dom";
import GettingMap from "../components/SingleStorePage/GettingMap";
import { getPreviousAddedGallary } from "../Owners/apiOwner";
import MainFirstAvailableApp from "../components/SingleStorePage/FirstAvailableAppointmentsMain/MainFirstAvailableApp";
import moment from "moment";
import { useCartContext } from "../sidebar_context";
import AdSense from "../components/AdSense";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

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

const SingleStorePage = ({ props, language }) => {
	let { storeName } = useParams();
	let { phone } = useParams();
	const { chosenLanguage } = useCartContext();

	const [clickedMenu, setClickedMenu] = useState("SERVICES");
	const [storeChosen, setStoreChosen] = useState("");
	// eslint-disable-next-line
	const [aboutus, setAboutUs] = useState({});
	const [contact, setContact] = useState({});
	const [hero1, setHero1] = useState("");
	// eslint-disable-next-line
	const [hero2, setHero2] = useState("");
	const [allEmployees, setAllEmployees] = useState([]);
	const [AllServices, setAllServices] = useState([]);
	const [AllServices2, setAllServices2] = useState([]);
	const [allCustomerType, setAllCustomerType] = useState([]);
	const [chosenCustomerType, setChosenCustomerType] = useState("");
	const [chosenCustomerType2, setChosenCustomerType2] = useState("");
	const [gettingGallary, setGettingGallary] = useState("");
	const [chosenDate, setChosenDate] = useState(moment().format("MM/DD/YYYY"));
	const [chosenService, setChosenService] = useState("");
	const [loading, setLoading] = useState(true);
	const [serviceDetailsArray, setServiceDetailsArray] = useState([]);

	const handleButtonClick = () => {
		const firstAvailableApp = document.getElementById("firstAvailableApp");

		if (firstAvailableApp) {
			const topPos =
				firstAvailableApp.getBoundingClientRect().top + window.scrollY;

			window.scrollTo({ top: topPos, behavior: "smooth" });
		} else {
			console.log("FirstAvailableAppointments div is not available");
		}
	};

	const formatEnglishDate = (date) => {
		return moment(date).locale("en").format("MM/DD/YYYY");
	};

	useEffect(() => {
		setChosenDate(formatEnglishDate(moment()));
		// eslint-disable-next-line
	}, [chosenLanguage, clickedMenu]);

	const gettingChosenStore = () => {
		setLoading(true);

		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data) => {
			if (data.error) {
				console.log("error rendering store data");
				setLoading(false);
			} else {
				var pickedStoreRendered = data[data.length - 1];
				setStoreChosen({
					...pickedStoreRendered,
					storeId: pickedStoreRendered.belongsTo._id,
					storeCreatedAt: pickedStoreRendered.belongsTo.createdAt,
				});

				getServices("token", pickedStoreRendered.belongsTo._id).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setAllCustomerType([
							...new Set(data && data.map((i) => i.customerType)),
						]);

						setChosenCustomerType(
							[...new Set(data && data.map((i) => i.customerType))][0]
						);

						setChosenCustomerType2(
							[...new Set(data && data.map((i) => i.customerType))][0]
						);

						var allServices2 =
							data.filter((i) => i.activeService === true) &&
							data.filter((i) => i.activeService === true).map((ii) => ii);

						setAllServices2([...new Set(allServices2)]);

						if (chosenCustomerType) {
							setAllServices(
								data.filter((i) => i.activeService === true) &&
									data
										.filter((i) => i.activeService === true)
										.map((ii) => ii) &&
									data
										.filter((i) => i.activeService === true)
										.map((ii) => ii)
										.filter((iv) => iv.customerType === chosenCustomerType)
							);
						}
					}
				});

				getAllHeros("token", pickedStoreRendered.belongsTo._id).then((data) => {
					if (data.error) {
					} else {
						const lastAddedHeros = data[data.length - 1];
						if (lastAddedHeros && data.length > 0) {
							setHero1(
								data[data.length - 1].thumbnail[0]
									? data[data.length - 1].thumbnail[0]
									: []
							);
							setHero2(
								data[data.length - 1].thumbnail2[0]
									? data[data.length - 1].thumbnail2[0]
									: []
							);
						} else {
							setHero1([]);
							setHero2([]);
						}

						// setHyperLink(data[data.length - 1].hyper_link);
						// setHyperLink2(data[data.length - 1].hyper_link2);
						// setHyperLink3(data[data.length - 1].hyper_link3);
					}
				});

				getAbouts("asdasd", pickedStoreRendered.belongsTo._id).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setAboutUs(data[data.length - 1]);
					}
				});

				getContacts("asdasd", pickedStoreRendered.belongsTo._id).then(
					(data) => {
						if (data.error) {
							console.log(data.error);
						} else {
							setContact(data[data.length - 1]);
						}
					}
				);

				getEmployees(pickedStoreRendered.belongsTo._id).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setAllEmployees(data);
						setLoading(false);
					}
				});

				getPreviousAddedGallary(
					"token",
					pickedStoreRendered.belongsTo._id
				).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						var lastAdded = data[data.length - 1];
						var adjustingPhotos =
							lastAdded &&
							lastAdded.gallaryPhotos &&
							lastAdded.gallaryPhotos.map((i) => {
								return {
									url: i.url,
									public_id: i.public_id,
								};
							});
						setGettingGallary(adjustingPhotos);
					}
				});

				setLoading(false);
			}
		});
	};

	useEffect(() => {
		gettingChosenStore();
		// eslint-disable-next-line
	}, [phone, storeName, chosenDate, chosenCustomerType]);

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

	const handleChosenCustomerType = (event) => {
		setChosenCustomerType(event.target.value);
	};

	var screenWidth = typeof window !== "undefined" ? window.innerWidth : null;

	return (
		<SingleStorePageWrapper dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
			{loading && !storeChosen && !storeChosen.belongsTo ? (
				<div></div>
			) : (
				<React.Fragment>
					<Helmet>
						<meta charSet='utf-8' />
						<title>
							{storeChosen && storeChosen.addStoreName.toUpperCase()} | Official
							Booking Website
						</title>
						<meta
							name='description'
							content={`${
								storeChosen && storeChosen.addStoreName.toUpperCase()
							} Booking Software Developed By Infinite-Apps.com`}
						/>
						<link
							rel='canonical'
							href={`https://xlookpro.com/${storeName}/${phone}`}
						/>
					</Helmet>
					<HeroComponent
						hero1={hero1}
						onlineStoreName={storeChosen}
						allEmployees={allEmployees}
						AllServices={AllServices}
						AllServices2={AllServices2}
						contact={contact}
						allCustomerType={allCustomerType}
						setChosenCustomerType={setChosenCustomerType}
						chosenCustomerType={chosenCustomerType}
						chosenDate={chosenDate}
						setChosenDate={setChosenDate}
						setChosenService={setChosenService}
						chosenService={chosenService}
						handleChosenCustomerType={handleChosenCustomerType}
						fromLocalStore={storeChosen}
						language={chosenLanguage}
					/>

					<div className='deskTopContent'>
						<div>
							<EmployeesList
								storeProperties={storeChosen}
								contact={contact}
								filteredResults={allEmployees}
							/>
						</div>

						<div>
							<ContactUs contact={contact} />
						</div>

						<div>
							<AboutUs aboutus={aboutus} storeProperties={storeChosen} />
						</div>

						<div>
							{!loading &&
							storeChosen &&
							screenWidth &&
							screenWidth >= 810 &&
							storeChosen.addStoreName &&
							storeChosen.latitude &&
							storeChosen.longitude ? (
								<GettingMap storeProperties={storeChosen} loading={loading} />
							) : null}
						</div>
					</div>

					<div className='phoneContent mt-2'>
						<div
							className='row'
							style={{
								background: "#1e1e1e",
								padding: "5px 0px",
								paddingLeft: chosenLanguage === "Arabic" ? "" : "20px",
								paddingRight: chosenLanguage === "Arabic" ? "20px" : "",
							}}
						>
							<div
								className='col-2 navLinks'
								style={isActive(clickedMenu, "SERVICES")}
								onClick={() => setClickedMenu("SERVICES")}
							>
								{chosenLanguage === "Arabic" ? "الخدمات" : "SERVICES"}
							</div>
							<div
								className='col-2 navLinks'
								style={isActive(clickedMenu, "STYLISTS")}
								onClick={() => setClickedMenu("STYLISTS")}
							>
								{chosenLanguage === "Arabic" ? "الفريق" : "TEAM"}
							</div>
							<div
								className='col-2 navLinks'
								style={isActive(clickedMenu, "ABOUT")}
								onClick={() => setClickedMenu("ABOUT")}
							>
								{chosenLanguage === "Arabic" ? "عنا" : "ABOUT"}
							</div>
							<div
								className='col-2 navLinks'
								style={isActive(clickedMenu, "GALLERY")}
								onClick={() => setClickedMenu("GALLERY")}
							>
								{chosenLanguage === "Arabic" ? "المعرض" : "GALLERY"}
							</div>
							<div
								className='col-2 navLinks'
								style={isActive(clickedMenu, "MAP")}
								onClick={() => setClickedMenu("MAP")}
							>
								{chosenLanguage === "Arabic" ? "الخريطة" : "MAP"}
							</div>
						</div>
						{chosenLanguage === "Arabic" ? (
							<div className='text-center mt-2'>
								<Link
									onClick={handleButtonClick}
									to='#'
									style={{
										fontWeight: "bold",
										textAlign: "center",
										fontSize: "20px",
										color: "lightgrey",
										textDecoration: "underline",
									}}
								>
									تحقق من أول موعد متاح
								</Link>
							</div>
						) : (
							<div className='text-center mt-2'>
								<Link
									onClick={handleButtonClick}
									to='#'
									style={{
										fontWeight: "bold",
										textAlign: "center",
										color: "lightgrey",
										textDecoration: "underline",
									}}
								>
									Check First Available Appointment
								</Link>
							</div>
						)}

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
										onChange={(e) => {
											setChosenCustomerType2(e.target.value);
											setChosenCustomerType(e.target.value);
										}}
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
								<AddedServices
									ownerId={storeChosen.belongsTo._id}
									chosenCustomerType={chosenCustomerType2}
									language={chosenLanguage}
									setServiceDetailsArray={setServiceDetailsArray}
									setChosenService={setChosenService}
									chosenService={chosenService}
									serviceDetailsArray={serviceDetailsArray}
									fromPage='SingleStore'
								/>
							</div>
						) : null}

						{clickedMenu === "STYLISTS" ? (
							<div className='my-4'>
								<EmployeesList
									storeProperties={storeChosen}
									contact={contact}
									filteredResults={allEmployees}
									language={chosenLanguage}
								/>
							</div>
						) : null}

						{clickedMenu === "ABOUT" ? (
							<div className='my-2'>
								<AboutUs aboutus={aboutus} storeProperties={storeChosen} />
								<div className='mb-5'>
									<ContactUs contact={contact} />
								</div>
							</div>
						) : null}

						{clickedMenu === "GALLERY" ? (
							<div className='my-4'>
								<Gallary filteredResults={gettingGallary} />
							</div>
						) : null}

						{clickedMenu === "MAP" ? (
							<div className='my-4'>
								{!loading &&
								storeChosen &&
								storeChosen.addStoreName &&
								storeChosen.latitude &&
								storeChosen.longitude ? (
									<GettingMap storeProperties={storeChosen} loading={loading} />
								) : null}
							</div>
						) : null}
						<div id='firstAvailableApp' className='firstAvailableApp mb-5'>
							<MainFirstAvailableApp
								onlineStoreName={storeChosen}
								user={storeChosen}
								language={chosenLanguage}
								chosenDate={chosenDate}
								setChosenDate={setChosenDate}
								allCustomerType={allCustomerType}
								chosenCustomerType={chosenCustomerType}
								setChosenCustomerType={setChosenCustomerType}
								allActiveServices={AllServices}
								chosenService={chosenService}
								setChosenService={setChosenService}
								loading={loading}
								allEmployees={allEmployees}
								serviceDetailsArray={serviceDetailsArray}
								setServiceDetailsArray={setServiceDetailsArray}
								setLoading={setLoading}
							/>
						</div>
					</div>
				</React.Fragment>
			)}

			<div
				onClick={() => {
					ReactGA.event("Ads_Clicked_From_Salon", {
						event_category: "Ads_Clicked_From_Salon",
						event_label: "Ads_Clicked",
						value: 1, // Optional extra parameters
					});

					ReactPixel.track("Ads_Clicked_From_Salon", {
						content_name: "Ads_Clicked_From_Salon",
						content_category: "Ads_Clicked_From_Salon",
						value: "",
						currency: "",
					});
				}}
			>
				<AdSense adSlot='5842698744' />
			</div>
		</SingleStorePageWrapper>
	);
};

export default SingleStorePage;

const SingleStorePageWrapper = styled.div`
	min-height: 900px;
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
