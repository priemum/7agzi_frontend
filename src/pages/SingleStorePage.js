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

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "grey",
			fontWeight: "bolder",
			padding: "10px",
			border: "lightgrey 1px solid",
			textAlign: "center",
			borderRadius: "25px",
			cursor: "pointer",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			fontWeight: "bolder",
			padding: "10px",
			border: "lightgrey 0.1px solid",
			textAlign: "center",
			borderRadius: "25px",
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

	const gettingChosenStore = () => {
		setLoading(true);

		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data) => {
			if (data.error) {
				console.log("error rendering store data");
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

	return (
		<SingleStorePageWrapper>
			{loading && !storeChosen && !storeChosen.belongsTo ? (
				<div></div>
			) : (
				<React.Fragment>
					<Helmet>
						<meta charSet='utf-8' />
						<title>
							{storeChosen && storeChosen.addStoreName.toUpperCase()} |
							Barbershop Official Booking Website
						</title>
						<meta
							name='description'
							content={`${
								storeChosen && storeChosen.addStoreName.toUpperCase()
							} Booking Software Developed By Infinite-Apps.com`}
						/>
						<link rel='canonical' href='https://infinite-apps.com' />
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
							<AboutUs aboutus={aboutus} />
						</div>
					</div>

					<div className='phoneContent mt-2'>
						<div className='row'>
							<div
								className='col-3 navLinks'
								style={isActive(clickedMenu, "SERVICES")}
								onClick={() => setClickedMenu("SERVICES")}
							>
								SERVICES
							</div>
							<div
								className='col-3 navLinks'
								style={isActive(clickedMenu, "STYLISTS")}
								onClick={() => setClickedMenu("STYLISTS")}
							>
								BOOK
							</div>
							<div
								className='col-3 navLinks'
								style={isActive(clickedMenu, "ABOUT")}
								onClick={() => setClickedMenu("ABOUT")}
							>
								ABOUT
							</div>
							<div
								className='col-3 navLinks'
								style={isActive(clickedMenu, "GALLERY")}
								onClick={() => setClickedMenu("GALLERY")}
							>
								GALLERY
							</div>
						</div>

						{clickedMenu === "SERVICES" ? (
							<div className='my-5'>
								<div className='mb-3'>
									<select
										style={{ textTransform: "capitalize" }}
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
								/>
							</div>
						) : null}

						{clickedMenu === "STYLISTS" ? (
							<div className='my-5'>
								<EmployeesList
									storeProperties={storeChosen}
									contact={contact}
									filteredResults={allEmployees}
								/>
							</div>
						) : null}

						{clickedMenu === "ABOUT" ? (
							<div className='my-5'>
								<AboutUs aboutus={aboutus} />
								<div className='mb-5'>
									<ContactUs contact={contact} />
								</div>
							</div>
						) : null}

						{clickedMenu === "GALLERY" ? (
							<div className='my-5'>
								<Gallary filteredResults={allEmployees} />
							</div>
						) : null}
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
			padding: 20px;
		}

		.navLinks {
			font-weight: bolder;
			padding: 10px;
			border: lightgrey 0.1px solid;
			text-align: center;
			border-radius: 25px;
			cursor: pointer;
		}
	}
`;
