import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import MyCalendar from "./MyCalendar";
import { Link } from "react-router-dom";
import EmployeeAppointments from "./EmployeeAppointments";
import TableView from "./TableView";
import ShopReports from "./ShopReports";
import UsersReport from "./ShopReportsContent/UsersReport";
import { isAuthenticated } from "../../auth";
import {
	allLoyaltyPointsAndStoreStatus,
	getAllUsers,
	getEmployees,
} from "../apiOwner";
import Countdown from "./Countdown";
import AddSettingsGuideVideo from "../Videos/AddSettingsGuide.mp4";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import OwnerNavmenu from "../NewOwnerNavMenu/OwnerNavmenu";
import { useCartContext } from "../../sidebar_context";

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
			fontSize: "1rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
		};
	}
};

const OwnerDashboard = ({ language }) => {
	const { chosenLanguage } = useCartContext();
	// const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	// const [collapsed, setCollapsed] = useState(false);
	const [currentUser, setCurrentUser] = useState("");
	const [collapseMenu, setCollapseMenu] = useState(false);

	//Helper Variables
	const [clickedMenu, setClickedMenu] = useState("Calendar");
	const [storeProperties, setStoreProperties] = useState("");
	const [allEmployees, setAllEmployees] = useState([]);

	const [videoWidth, setVideoWidth] = useState(
		window.innerWidth <= 1000 ? "400" : "1000"
	);

	useEffect(() => {
		const handleResize = () => {
			setVideoWidth(window.innerWidth <= 1000 ? "400" : "1000");
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const { user, token } = isAuthenticated();

	const getOnlineStoreName = () => {
		allLoyaltyPointsAndStoreStatus(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setStoreProperties(data && data[data.length - 1]);
			}
		});
	};

	const gettingAllEmployees = () => {
		getEmployees(user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllEmployees(data);
			}
		});
	};

	useEffect(() => {
		if (window.location.search.includes("calendar")) {
			setClickedMenu("Calendar");
		} else if (window.location.search.includes("barber-appointments")) {
			setClickedMenu("BarberAppointment");
		} else if (window.location.search.includes("table-view")) {
			setClickedMenu("TableView");
		} else if (window.location.search.includes("shop-reports")) {
			setClickedMenu("ShopReports");
		} else if (window.location.search.includes("customer-reports")) {
			setClickedMenu("CustomerReports");
		} else {
			setClickedMenu("Calendar");
		}
		getOnlineStoreName();
		gettingCurrentUser();
		gettingAllEmployees();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const gettingCurrentUser = () => {
		getAllUsers(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setCurrentUser(
					data.filter((i) => i._id === user._id) &&
						data.filter((i) => i._id === user._id)[0]
				);
			}
		});
	};

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.gtag("event", "page_view", {
			page_path: window.location.pathname,
		});

		// eslint-disable-next-line
	}, []);

	const now = new Date();
	const endDate = new Date(currentUser && currentUser.createdAt);
	const diffTime = Math.abs(endDate - now);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	// eslint-disable-next-line
	const remainingDays = 90 - diffDays;

	const onPlay = () => {
		ReactGA.event({
			category: "Owner_PlayedSettingsTutorial",
			action: "Owner_PlayedSettingsTutorial",
			label: "Video Played",
		});

		ReactPixel.track("Owner_PlayedSettingsTutorial", {
			content_name: "Owner_PlayedSettingsTutorial",
			content_category: "Owner_PlayedSettingsTutorial",
			value: "",
			currency: "",
		});
	};

	const onPause = () => {
		ReactGA.event({
			category: "Owner_PausedSettingsTutorial",
			action: "Owner_PausedSettingsTutorial",
			label: "Video Paused",
		});
	};

	return (
		<OwnerDashboardWrapper
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			show={collapseMenu}
		>
			<Helmet dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{chosenLanguage === "Arabic" ? (
					<title dir='rtl'>{user.name} | Owner Dashboard</title>
				) : (
					<title>{user.name} | Owner Dashboard</title>
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
					href='https://www.xlookpro.com/store/admin/dashboard'
				/>
			</Helmet>
			<div
				className={
					chosenLanguage === "Arabic"
						? "grid-container-arabic"
						: "grid-container"
				}
			>
				<div className='menuWrapper'>
					<div
						className='iconMenu'
						onClick={() => {
							setCollapseMenu(!collapseMenu);
						}}
					>
						<i className='fa-solid fa-bars'></i>
					</div>

					<OwnerNavmenu
						language={chosenLanguage}
						fromPage='MainPage'
						collapseMenu={collapseMenu}
					/>
				</div>

				<div>
					<div
						className=''
						style={{
							top: "70px",
							right: chosenLanguage === "Arabic" ? "" : "2%",
							position: "absolute",
							left: chosenLanguage === "Arabic" ? "2%" : "",
						}}
					>
						{currentUser && currentUser.createdAt ? (
							<Countdown
								theDate={currentUser.createdAt}
								hasAgent={
									currentUser &&
									currentUser.agent &&
									currentUser.agent.name !== "No Agent"
								}
							/>
						) : null}

						<div
							className='text-center trialPeriod'
							style={{ textAlign: "center", margin: "auto" }}
						>
							انت الان على باقة البرو التجريبية
							<div style={{ fontWeight: "bolder", color: "darkred" }}>
								{" "}
								<strong>متبقى {remainingDays} يوم</strong>{" "}
							</div>
						</div>
					</div>
					<div className='container-fluid col-lg-12  text-center mt-5'>
						<div className='row text-center ml-5 my-5'>
							<div
								style={isActive(clickedMenu, "Calendar")}
								className='col-md-2 col-6  menuItems'
								onClick={() => setClickedMenu("Calendar")}
							>
								<Link
									className='dashboardLinks'
									style={isActive(clickedMenu, "Calendar")}
									to='/store/admin/dashboard?calendar'
								>
									<i className='fa-brands fa-servicestack mx-1'></i>
									{chosenLanguage === "Arabic" ? "الجدول" : "Appointments"}
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "BarberAppointment")}
								className='col-md-2 col-6  menuItems'
								onClick={() => setClickedMenu("BarberAppointment")}
							>
								<Link
									className='dashboardLinks'
									style={isActive(clickedMenu, "BarberAppointment")}
									to='/store/admin/dashboard?barber-appointments'
								>
									<i className='fa-solid fa-pen mx-1'></i>
									{chosenLanguage === "Arabic"
										? "عمل الموظف"
										: "Employee Schedule"}
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "TableView")}
								className='col-md-2 col-6  menuItems'
								onClick={() => setClickedMenu("TableView")}
							>
								<Link
									className='dashboardLinks'
									style={isActive(clickedMenu, "TableView")}
									to='/store/admin/dashboard?table-view'
								>
									<i className='fa-solid fa-table mx-1'></i>
									{chosenLanguage === "Arabic"
										? "جدول المحتويات"
										: "Table View"}
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "ShopReports")}
								className='col-md-2 col-6  menuItems '
								onClick={() => {
									setClickedMenu("ShopReports");
								}}
							>
								<Link
									className='dashboardLinks'
									style={isActive(clickedMenu, "ShopReports")}
									to='/store/admin/dashboard?shop-reports'
								>
									<i className='fa-solid fa-chart-pie mx-1'></i>
									{chosenLanguage === "Arabic"
										? "التقارير العامة"
										: "Shop Reports"}
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "CustomerReports")}
								className='col-md-2 col-6  menuItems '
								onClick={() => {
									setClickedMenu("CustomerReports");
								}}
							>
								<Link
									className='dashboardLinks'
									style={isActive(clickedMenu, "CustomerReports")}
									to='/store/admin/dashboard?customer-reports'
								>
									<i className='fa-solid fa-chart-simple mx-1'></i>
									{chosenLanguage === "Arabic" ? "تقرير العملاء" : "Customers"}
								</Link>
							</div>
						</div>
					</div>
					{!storeProperties ? (
						<>
							<h2
								style={{
									fontWeight: "bolder",
									marginLeft: "15%",
									fontSize: "3rem",
								}}
							>
								<br />
								WELCOME OUR DEAR BUSINESS PARTNER!
								<br />
								<br />
								<Link
									style={{
										fontWeight: "bolder",
										textDecoration: "underline",
										fontSize: "3rem",
									}}
									to='/store/admin/settings'
								>
									{chosenLanguage === "Arabic"
										? "أضف إعدادات المتجر"
										: "IMPORTANT => Please Add Salon Settings"}
								</Link>{" "}
							</h2>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									marginBottom: "100px",
								}}
							>
								<video
									width={videoWidth}
									height='450'
									controls
									controlsList='nodownload'
									onPlay={onPlay}
									onPause={onPause}
								>
									<source src={AddSettingsGuideVideo} type='video/mp4' />
									Your browser does not support the video tag.
								</video>
							</div>
						</>
					) : allEmployees && allEmployees.length === 0 ? (
						<h2
							style={{
								fontWeight: "bolder",
								marginLeft: "15%",
								marginRight: "15%",
								fontSize: "3rem",
							}}
						>
							<Link
								style={{
									fontWeight: "bolder",
									textDecoration: "underline",
									letterSpacing: "5px",
								}}
								to='/store/admin/employees'
							>
								{chosenLanguage === "Arabic" ? "اضافة موظف" : "Add Employee"}
							</Link>{" "}
						</h2>
					) : (
						<>
							{clickedMenu === "Calendar" ? (
								<MyCalendar language={chosenLanguage} />
							) : null}
							{clickedMenu === "BarberAppointment" ? (
								<EmployeeAppointments language={chosenLanguage} />
							) : null}

							{clickedMenu === "TableView" ? (
								<TableView language={chosenLanguage} />
							) : null}
							{clickedMenu === "ShopReports" ? (
								<ShopReports language={chosenLanguage} />
							) : null}
							{clickedMenu === "CustomerReports" ? (
								<UsersReport language={chosenLanguage} />
							) : null}
						</>
					)}
				</div>
			</div>
		</OwnerDashboardWrapper>
	);
};

export default OwnerDashboard;

const OwnerDashboardWrapper = styled.div`
	min-height: 1200px;

	.grid-container {
		display: grid;
		/* grid-template-columns: 5% 95%; */
		grid-template-columns: ${(props) => (props.show ? "5% 95%" : "5% 95%")};
	}

	.grid-container-arabic {
		display: grid;
		grid-template-columns: 5% 95%;
	}

	.container-fluid {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.remainingDays {
		/* background-color: darkred; */
		/* padding: 0.1px; */
		/* border-radius: 5px; */
		font-size: 0.9rem;
		font-weight: bold;
		/* text-align: center; */
		/* cursor: pointer; */
		/* transition: var(--mainTransition); */
		color: white;
	}

	.trialPeriod {
		display: none;
	}

	.menuWrapper {
		background-color: ${(props) => (props.show ? "" : "black")};
		min-height: 1200px;
		overflow: auto;
	}
	.iconMenu {
		display: none;
	}

	@media (max-width: 1000px) {
		.grid-container {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) => (props.show ? "3% 97%" : "18% 82%")};
		}
		.grid-container-arabic {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) => (props.show ? "3% 97%" : "18% 82%")};
		}

		.menuItems {
			font-size: 12px !important;
			margin: auto !important;
		}

		.iconMenu {
			display: block;
			color: ${(props) => (props.show ? "black" : "white")};
			position: ${(props) => (props.show ? "absolute" : "")};
			text-align: right;
			font-size: 20px;
			margin-right: ${(props) => (props.show ? "10px" : "5px")};
		}

		a {
			font-size: 13px;
			text-align: center;
		}

		.container-fluid > div {
			text-align: center;
			margin-left: 0px !important;
		}

		.container-fluid {
			margin-left: 0px !important;
			margin-top: 80px !important;
			text-align: center;
		}

		.dashboardLinks {
			font-size: 0.75rem !important;
		}
	}

	@media (max-width: 1100px) {
		.trialPeriod {
			display: block;
			margin-left: 50px !important;
			margin-top: 15px !important;
			margin-bottom: 20px !important;
			font-weight: bolder;
			font-size: 1.1rem;
		}
	}
`;
