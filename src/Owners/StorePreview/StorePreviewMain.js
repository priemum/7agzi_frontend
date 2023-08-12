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
	getPreviousScheduledHours,
	getServices,
} from "../apiOwner";
import { isAuthenticated } from "../../auth";
import AddedServicesPreview from "./AddedServicesPreview";
import EmployeesListPreview from "./EmployeeListPreview";
import GettingMap from "../../components/SingleStorePage/GettingMap";
import Gallary from "./Gallary";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import EditBanner from "./ModalsForEdit/BannerAndThumb/EditBanner";
import { Spin } from "antd";
import SalonNameAndGeneral from "./ModalsForEdit/Step2/SalonNameAndGeneral";
import { Helmet } from "react-helmet";
import { useCartContext } from "../../sidebar_context";
import ServicesModal from "./ModalsForEdit/Step3/ServicesModal";
import AddEmployeeModal from "./ModalsForEdit/Step4/AddEmployeeModal";
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

const StorePreviewMain = ({ language }) => {
	const { chosenLanguage } = useCartContext();

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
	// eslint-disable-next-line
	const [values, setValues] = useState({ gallaryPhotos: [] });
	const [lastSettings, setLastSettings] = useState(null);
	const [overallAddedSettings, setOverallAddedSettings] = useState([]);
	const [chosenCustomerType2, setChosenCustomerType2] = useState("");
	const [allCustomerType, setAllCustomerType] = useState([]);
	const [storeThumbnail, setStoreThumbnail] = useState([]);
	const [allWorkingHours, setAllWorkingHours] = useState([]);

	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [modalVisible3, setModalVisible3] = useState(false);
	const [modalVisible4, setModalVisible4] = useState(false);
	const [modalVisible5, setModalVisible5] = useState(false);

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
		getAbouts(token, user._id).then((data) => {
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

		getContacts(token, user._id).then((data) => {
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

		getAllHeros(token, user._id).then((data) => {
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
		getPreviousAddedGallary(token, user._id).then((data) => {
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

		getServices(token, user._id).then((data) => {
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

		getEmployees(user._id).then((data) => {
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
		allLoyaltyPointsAndStoreStatus(token, user._id).then((data) => {
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

	const gettingAllWorkingHours = () => {
		setLoading(true);
		getPreviousScheduledHours(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				// console.log(data, "data from API");
				var allAddedHours_Settings =
					data &&
					data[data.length - 1] &&
					data[data.length - 1].hoursCanBeScheduled.map(
						(workinghour) => workinghour
					);

				setAllWorkingHours(allAddedHours_Settings);

				setLoading(false);
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
		gettingAllWorkingHours();
		// eslint-disable-next-line
	}, []);

	const clickedOnPos = localStorage.getItem("ClickedPOS") === "ClickedPOS";

	return (
		<StorePreviewMainWrapper>
			<Helmet dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{chosenLanguage === "Arabic" ? (
					<title dir='rtl'>{user.name} | Page Builder</title>
				) : (
					<title>{user.name} | Page Builder</title>
				)}
				<meta
					name='description'
					content={
						chosenLanguage === "Arabic"
							? `إكس لوك هي منصة تضم جميع صالونات الحلاقة وصالونات تجميل النساء ومراكز التجميل الموجودة في مصر.
				المنصة تقدم خدمات لجميع أفراد العائلة، بما في ذلك السيدات، الآنسات، الرجال، والأطفال، مع مجموعة متنوعة من الخدمات المقدمة.
				منصة إكس لوك تُستخدم لاختيار وحجز موعد في صالون الحلاقة أو مركز التجميل الأقرب أو الأبعد حسب موقعك.
				الزائرين يمكنهم حجز الخدمات التي تقدمها المنصة من خلال تطبيق خاص مصمم لتسجيل المستخدمين وحجز خدمات التجميل. Powered By https://infinite-apps.com`
							: `XLOOK is a platform that includes barbershops, ladies' beauty salons, and beauty centers.
				The platform offers services for all family members, including women, girls, men, and children, with a variety of services provided.
				The XLOOK platform is used to choose and book a barbershop or beauty center appointment with the closest to the farthest offer according to your location.
				Visitors can book the services offered by the platform through a special application designed for user registration and booking beauty services. Powered By https://infinite-apps.com`
					}
				/>
				<meta
					name='keywords'
					content={
						chosenLanguage === "Arabic"
							? `إكس لوك، من نحن، لماذا إكس لوك، صالونات الحلاقة، صالونات تجميل النساء، مراكز التجميل، العائلة، حجز المواعيد، تسجيل المستخدمين`
							: `XLOOK, WHO, WHY XLOOK, barbershops, ladies' beauty salons, beauty centers, family, appointment booking, user registration`
					}
				/>
				<link
					rel='canonical'
					href='https://www.xlookpro.com/store/admin/store-preview'
				/>
			</Helmet>
			<EditBanner
				language={chosenLanguage}
				setLoading={setLoading}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				hero1={hero1}
				storeThumbnail={storeThumbnail}
				setStoreThumbnail={setStoreThumbnail}
				lastSettings={lastSettings}
			/>
			<SalonNameAndGeneral
				language={chosenLanguage}
				setLoading={setLoading}
				modalVisible={modalVisible2}
				setModalVisible={setModalVisible2}
				setStoreThumbnail={setStoreThumbnail}
				lastSettings={lastSettings}
			/>

			<ServicesModal
				language={chosenLanguage}
				setLoading={setLoading}
				modalVisible={modalVisible3}
				setModalVisible={setModalVisible3}
				setModalVisible2={setModalVisible4}
				modalVisible2={modalVisible4}
			/>

			<AddEmployeeModal
				modalVisible={modalVisible5}
				setModalVisible={setModalVisible5}
				language={chosenLanguage}
				user={user}
				lastAddedSettings={lastSettings}
				allWorkingHours={allWorkingHours}
				allServices={AllServices}
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
						language={chosenLanguage}
						clickedOnPos={clickedOnPos}
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
						{chosenLanguage === "Arabic" ? "الخدمات" : "SERVICES"}
					</div>

					<div
						className='col-2 navLinks'
						style={isActive(clickedMenu, "STYLISTS")}
						onClick={() => {
							setClickedMenu("STYLISTS");
							if (allEmployees && allEmployees.length <= 1) {
								setModalVisible5(true);
							}

							ReactGA.event("Account_Clicked_To_Add_Stylists", {
								event_category: "Account_Clicked_To_Add_Stylists",
								event_label: "Account_Clicked_To_Add_Stylists",
								value: 0, // Optional extra parameters
							});

							ReactPixel.track("Account_Clicked_To_Add_Stylists", {
								content_name: "Account_Clicked_To_Add_Stylists",
								content_category: "Account_Clicked_To_Add_Stylists",
								value: "",
								currency: "",
							});
						}}
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

					<div
						style={{
							transform: "rotate(-30deg)",
							transformOrigin: "center",
							zIndex: "10000000",
							background: "white",
						}}
					>
						{overallAddedSettings &&
						overallAddedSettings.length >= 2 &&
						AllServices &&
						AllServices.length > 0 &&
						allEmployees &&
						allEmployees.length <= 1 ? (
							<div
								style={{
									position: "absolute",
									right: "190px",
									top: "-150px",
									animation: "moveArrow 1s infinite",
									fontWeight: "bolder",
									fontSize: "3rem",
									color: "#ff7676",
								}}
							>
								#4 →
							</div>
						) : null}
					</div>
					<AddedServicesPreview
						ownerId={user._id}
						chosenCustomerType={chosenCustomerType2}
						language={chosenLanguage}
						overallAddedSettings={overallAddedSettings}
						setModalVisible={setModalVisible3}
						setModalVisible2={setModalVisible4}
						modalVisible2={modalVisible4}
					/>
				</div>
			) : null}

			{clickedMenu === "STYLISTS" ? (
				<div className='my-4'>
					<EmployeesListPreview
						storeProperties={lastSettings}
						contact={contact}
						filteredResults={allEmployees}
						language={chosenLanguage}
						modalVisible={modalVisible5}
						setModalVisible={setModalVisible5}
						allWorkingHours={allWorkingHours}
						allServices={AllServices}
					/>
				</div>
			) : null}

			{clickedMenu === "ABOUT" ? (
				<div className='my-2'>
					<AboutUs aboutus={aboutus} storeProperties={lastSettings} />
					<div className='mb-5'>
						<ContactUs contact={contact} />
					</div>
				</div>
			) : null}

			{clickedMenu === "GALLERY" ? (
				<div className='my-4'>
					<Gallary filteredResults={values} />
				</div>
			) : null}

			{clickedMenu === "MAP" ? (
				<div className='my-4'>
					{!loading &&
					lastSettings &&
					lastSettings.addStoreName &&
					lastSettings.latitude &&
					lastSettings.longitude ? (
						<GettingMap storeProperties={lastSettings} loading={loading} />
					) : null}
				</div>
			) : null}
		</StorePreviewMainWrapper>
	);
};

export default StorePreviewMain;

const StorePreviewMainWrapper = styled.div`
	min-height: 1000px;
	background-color: black;

	.phoneContent {
		display: none;
	}

	@keyframes moveArrow {
		0% {
			transform: translateX(-70%);
		}
		50% {
			transform: translateX(-40%);
		}
		100% {
			transform: translateX(-70%);
		}
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
