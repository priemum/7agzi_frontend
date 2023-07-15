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
import FirstAvailableAppointments from "../components/SingleStorePage/FirstAvailableAppointments";
import { Link } from "react-router-dom";
import GettingMap from "../components/SingleStorePage/GettingMap";

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
	const [chosenDate, setChosenDate] = useState("");
	const [chosenService, setChosenService] = useState("");
	const [loading, setLoading] = useState(true);

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
			}
		});
	};

	useEffect(() => {
		gettingChosenStore();
		// eslint-disable-next-line
	}, [phone, storeName]);

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

	const gettingAllAbouts = (ownerId) => {
		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data2) => {
			if (data2.error) {
				console.log("error rendering store data");
			} else {
				var pickedStoreRendered = data2[data2.length - 1];
				getAbouts("asdasd", pickedStoreRendered.belongsTo._id).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setAboutUs(data[data.length - 1]);
					}
				});
			}
		});
	};

	const gettingAllContacts = (ownerId) => {
		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data2) => {
			if (data2.error) {
				console.log("error rendering store data");
			} else {
				var pickedStoreRendered = data2[data2.length - 1];
				getContacts("asdasd", pickedStoreRendered.belongsTo._id).then(
					(data) => {
						if (data.error) {
							console.log(data.error);
						} else {
							setContact(data[data.length - 1]);
						}
					}
				);
			}
		});
	};

	const gettingAllHeroes = (ownerId) => {
		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data2) => {
			if (data2.error) {
				console.log("error rendering store data");
			} else {
				var pickedStoreRendered = data2[data2.length - 1];
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
			}
		});
	};

	const gettingAllEmployees = (ownerId) => {
		setLoading(true);

		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data2) => {
			if (data2.error) {
				console.log("error rendering store data");
			} else {
				var pickedStoreRendered = data2[data2.length - 1];
				getEmployees(pickedStoreRendered.belongsTo._id).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setAllEmployees(data);
						setLoading(false);
					}
				});
			}
		});
	};

	const getAllService = (ownerId) => {
		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data2) => {
			if (data2.error) {
				console.log("error rendering store data");
			} else {
				var pickedStoreRendered = data2[data2.length - 1];
				getServices("token", pickedStoreRendered.belongsTo._id).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setAllCustomerType([
							...new Set(data && data.map((i) => i.customerType)),
						]);

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
			}
		});
	};

	useEffect(() => {
		if (storeChosen && storeChosen.belongsTo) {
			getAllService();
			gettingAllAbouts();
			gettingAllContacts();
			gettingAllHeroes();
			gettingAllEmployees();
		}
		// eslint-disable-next-line
	}, [props, chosenDate, chosenCustomerType, chosenService]);

	const handleChosenCustomerType = (event) => {
		setChosenCustomerType(event.target.value);
	};

	var screenWidth = typeof window !== "undefined" ? window.innerWidth : null;

	return (
		<SingleStorePageWrapper>
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
						language={language}
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
						{language === "Arabic" ? (
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
								<AddedServices
									ownerId={storeChosen.belongsTo._id}
									chosenCustomerType={chosenCustomerType2}
									language={language}
								/>
							</div>
						) : null}

						{clickedMenu === "STYLISTS" ? (
							<div className='my-4'>
								<EmployeesList
									storeProperties={storeChosen}
									contact={contact}
									filteredResults={allEmployees}
									language={language}
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
								<Gallary filteredResults={allEmployees} />
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
							<FirstAvailableAppointments
								onlineStoreName={storeChosen}
								allEmployees={allEmployees}
								AllServices={AllServices}
								contact={contact}
								allCustomerType={allCustomerType}
								chosenCustomerType={chosenCustomerType}
								setChosenCustomerType={setChosenCustomerType}
								chosenDate={chosenDate}
								setChosenDate={setChosenDate}
								setChosenService={setChosenService}
								chosenService={chosenService}
								handleChosenCustomerType={handleChosenCustomerType}
								fromLocalStore={storeChosen}
								language={language}
								clickedMenu={clickedMenu}
							/>
						</div>
					</div>
				</React.Fragment>
			)}
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
