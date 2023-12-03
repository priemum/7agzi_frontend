import React, { useEffect, useState } from "react";
import "./App.css";
/* eslint-disable import/no-webpack-loader-syntax */
import "antd/dist/antd.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
// eslint-disable-next-line
import axios from "axios";
import { isAuthenticated } from "./auth";
import { Redirect } from "react-router-dom";

//Regular Routes
import NavbarTop from "./components/Navbars/NavbarTop";
import Navbar from "./components/Navbars/Navbar";
import FooterComp from "./components/FooterComp";
import Home from "./pages/Home";
import DarkBackground from "./components/Navbars/DarkBackground";
import SigninForm from "./pages/SigninForm";
import SignupForm from "./pages/SignupForm";
import SingleEmployee from "./pages/SingleEmployee";
import SchedulePageSteps2 from "./pages/SchedulePage/SchedulePageAdjusted/SchedulePageSteps2";
import MyStoreList from "./pages/MyStoreList";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";
import AppsLandingPage from "./pages/AppsLandingPage";
import SignupFormEcommerce from "./pages/SignupFormEcommerce";
import IconHaircut from "./pages/IconHaircut";
import IconBeard from "./pages/IconBeard";
import IconBundle from "./pages/IconBundle";
import IconGroom from "./pages/IconGroom";
import IconSkinCare from "./pages/IconSkinCare";

// eslint-disable-next-line
import StoresList from "./pages/StoresList";
import SuccessfulSchedule from "./pages/SchedulePage/SuccessfulSchedule";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SingleStorePage from "./pages/SingleStorePage";
// import AgentsSignupForm from "./pages/AgentsSignupForm";
import RegisterSteps from "./pages/RegisterSteps";
import AgentGuide from "./pages/AgentGuide";
import AgentsSignupForm2 from "./pages/AgentsSignupForm2";

//Owner Route
import OwnerRoute from "./auth/OwnerRoute";
import OwnerDashboard from "./Owners/OwnerDashboardContents/OwnerDashboard";
import SettingsMain from "./Owners/SettingsContent/SettingsMain";
import ServicesMain from "./Owners/ServicesContent/ServicesMain";
import EmployeeMain from "./Owners/EmployeeManagement/EmployeeMain";
import EditWebsiteMain from "./Owners/EditWebsite/EditWebsiteMain";
import BranchesMain from "./Owners/Branches/BranchesMain";
import EcommerceMain from "./Owners/EcommerceManagement/EcommerceMain";
import SingleAppointmentPage from "./Owners/OwnerDashboardContents/SingleAppointmentFolder/SingleAppointmentPage";
import BillingMain from "./Owners/Billing/BillingMain";
import GallaryMain from "./Owners/GallaryAddition/GallaryMain";
import StorePreviewMain from "./Owners/StorePreview/StorePreviewMain";

//user routes
import PrivateRoute from "./auth/PrivateRoute";
import ProfileUpdate from "./customer/ProfileUpdate";
import UserDashboard from "./customer/UserDashboard";
import SingleUserReportPage2 from "./Owners/OwnerDashboardContents/ShopReportsContent/SingleUserReportPage2";

//Employee routes
import EmployeeRoute from "./auth/EmployeeRoute";
import ManageAppointments from "./employee/ManageAppointments";
import StylistSingleSchedulePage from "./employee/StylistSingleSchedulePage";
import UpdateProfile from "./employee/UpdateProfile";
import GeneralStats from "./employee/GeneralStats";

//StoreBooking
import StoreRoute from "./auth/StoreRoute";
import BookingFromStore from "./StoreBooking/BookingFromStore";
import ScheduleFormFinal from "./StoreBooking/POSBook/ScheduleFormFinal";

//Platform Admin routes
import BossRoute from "./auth/BossRoute";
import BossDashboard from "./TheBoss/BossDashboardContent/BossDashboard";
import AddedStoresMain from "./TheBoss/AddedStores/AddedStoresMain";
import OwnerDashboardBoss from "./TheBoss/AddedStores/SingleStoreAdminPage/OwnerDashboardContents/OwnerDashboardBoss";
import SettingsMainBoss from "./TheBoss/AddedStores/SingleStoreAdminPage/SettingsContent/SettingsMainBoss";
import ServicesMainBoss from "./TheBoss/AddedStores/SingleStoreAdminPage/ServicesContent/ServicesMainBoss";
import EmployeeMainBoss from "./TheBoss/AddedStores/SingleStoreAdminPage/EmployeeManagement/EmployeeMainBoss";
import EditWebsiteMainBoss from "./TheBoss/AddedStores/SingleStoreAdminPage/EditWebsite/EditWebsiteMainBoss";
import SingleAppointmentPageBoss from "./TheBoss/AddedStores/SingleStoreAdminPage/OwnerDashboardContents/SingleAppointmentPageBoss";
import PendingApprovalMain from "./TheBoss/PendingApproval/PendingApprovalMain";
import StorePreviewPage from "./TheBoss/PendingApproval/StorePreviewPage";
import AgentsManagementMain from "./TheBoss/Agents/AgentsManagementMain";
import StoreBillingMain from "./TheBoss/StoreBilling/StoreBillingMain";
import UpdateBusinessAgent from "./TheBoss/AddedStores/SingleStoreAdminPage/OwnerDashboardContents/UpdateBusinessAgent";
import GallaryMainBoss from "./TheBoss/AddedStores/SingleStoreAdminPage/GallaryAddition/GallaryMainBoss";
import StorePreviewMainBoss from "./TheBoss/AddedStores/SingleStoreAdminPage/StorePreview/StorePreviewMainBoss";
import UsersReportsMain from "./TheBoss/UsersReports/UsersReportsMain";
import StoreAccountsMain from "./TheBoss/XStoreAccounts/StoreAccountsMain";
import CouponMain from "./TheBoss/CouponManagement/CouponMain";

//Platform Agents routes
import AgentsRoute from "./auth/AgentsRoute";
import AgentDashboard from "./PlatformAgent/AgentDashboard";
import SettingsMainAgent from "./PlatformAgent/AgentAccountEditing/SettingsContent/SettingsMain";
import ServicesMainAgent from "./PlatformAgent/AgentAccountEditing/ServicesContent/ServicesMainAgent";
import EmployeeMainAgent from "./PlatformAgent/AgentAccountEditing/EmployeeManagement/EmployeeMainAgent";
import EditWebsiteMainAgent from "./PlatformAgent/AgentAccountEditing/EditWebsite/EditWebsiteMainAgent";
import GallaryMainAgent from "./PlatformAgent/AgentAccountEditing/GallaryAddition/GallaryMainAgent";
import ProfileUpdateOwner from "./Owners/ProfileUpdateOwner";
import ProfileUpdateBoss from "./TheBoss/AddedStores/SingleStoreAdminPage/ProfileUpdateBoss";
import IntroPage from "./pages/IntroPage";
import BusinessPartnersReportsMain from "./TheBoss/BusinessPartnersReports/BusinessPartnersReportsMain";
import SingleAppointmentMain from "./StoreBooking/SingleAppointmentFolder/SingleAppointmentMain";
import PrivacyPolicy from "./components/Footer/PrivacyPolicy";
import CookiePolicy from "./components/Footer/CookiePolicy";

import ShopRoute from "./auth/ShopRoute";
import Icon50EGP from "./pages/Icon50EGP";
import IconOffers from "./pages/IconOffers";
import ShopLandingPage from "./pages/TheShop/ShopLandingPage";
import SingleProduct from "./pages/TheShop/SingleProduct/SingleProduct";
import Cart from "./pages/TheShop/checkout/Cart";
import { useCartContext } from "./sidebar_context";
import SearchKeyword from "./pages/SearchKeyword";

function App() {
	const [click, setClick] = useState(false);
	const [clickMenu, setClickMenu] = useState(false);
	const [language, setLanguage] = useState("English");

	const { chosenLanguage } = useCartContext();
	// eslint-disable-next-line
	const { user } = isAuthenticated();

	useEffect(() => {
		setClickMenu(click);
		// eslint-disable-next-line
	}, [click, clickMenu]);

	// useEffect(() => {
	// 	if (!navigator.geolocation) {
	// 		console.log("Geolocation is not supported by your browser");
	// 	} else {
	// 		navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
	// 	}

	// 	function successFunction(position) {
	// 		const lat = position.coords.latitude;
	// 		const lon = position.coords.longitude;

	// 		axios
	// 			.get(
	// 				`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
	// 			)
	// 			.then((response) => {
	// 				const { address } = response.data;
	// 				const { country, state, city } = address;

	// 				if (country.toLowerCase() === "egypt") {
	// 					setLanguage("Arabic");
	// 				}

	// 				const userLocation = {
	// 					country,
	// 					state,
	// 					city,
	// 				};

	// 				localStorage.setItem("userLocation", JSON.stringify(userLocation));
	// 			})
	// 			.catch((error) => {
	// 				console.log(error);
	// 			});
	// 	}

	// 	function errorFunction(error) {
	// 		console.log(error);
	// 	}
	// }, []);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.gtag("event", "page_view", {
			page_path: window.location.pathname,
		});

		// eslint-disable-next-line
	}, [window.location.pathname]);

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
		localStorage.setItem("lang", JSON.stringify(chosenLanguage));

		// eslint-disable-next-line
	}, [chosenLanguage]);

	return (
		<BrowserRouter>
			{window.location.pathname === "/home" ? <Redirect to='/' /> : null}
			<React.Fragment>
				<React.Fragment>
					{/* {allAdsCombined && allAdsCombined.show_ad ? <NavbarAds /> : null} */}
					{click && clickMenu ? (
						<DarkBackground setClick={setClick} setClickMenu={setClickMenu} />
					) : null}
					<>
						{window.location.pathname.includes(
							"book-appointment-from-store"
						) ? null : (
							<>
								<NavbarTop
									click={click}
									setClick={setClick}
									clickMenu={clickMenu}
									setClickMenu={setClickMenu}
									language={language}
									setLanguage={setLanguage}
								/>
								<Navbar language={language} setLanguage={setLanguage} />
							</>
						)}
					</>
				</React.Fragment>

				<ToastContainer />
				<Switch>
					<Route
						path='/'
						exact
						component={() => (
							<Home language={language} setLanguage={setLanguage} />
						)}
					/>
					<Route path='/landing' exact component={() => <IntroPage />} />
					<Route
						path='/signin'
						exact
						component={() => <SigninForm language={language} />}
					/>
					<Route
						path='/signup'
						exact
						component={() => <SignupForm language={language} />}
					/>

					<Route
						path='/register-your-ecommerce-shop'
						exact
						component={() => <SignupFormEcommerce language={language} />}
					/>

					<Route
						path='/auth/password/forgot'
						exact
						component={() => <Forgot language={language} />}
					/>

					<Route path='/auth/password/reset/:token' exact component={Reset} />
					<Route path='/privacy-policy' exact component={PrivacyPolicy} />
					<Route path='/cookie-policy' exact component={CookiePolicy} />
					<Route
						path='/search-by-keyword/:keyword'
						exact
						component={SearchKeyword}
					/>

					<Route
						path='/about'
						exact
						component={() => (
							<About language={language} setLanguage={setLanguage} />
						)}
					/>

					<Route
						path='/steps'
						exact
						component={() => (
							<RegisterSteps language={language} setLanguage={setLanguage} />
						)}
					/>
					<Route
						path='/agent-guide'
						exact
						component={() => (
							<AgentGuide language={language} setLanguage={setLanguage} />
						)}
					/>
					<Route
						path='/contact'
						exact
						component={() => <Contact language={language} />}
					/>

					<Route
						path='/schedule/:storeName/:phone'
						exact
						component={() => (
							<SingleStorePage language={language} setLanguage={setLanguage} />
						)}
					/>

					<Route
						path='/employee/:employeeName/:employeeId'
						exact
						component={SingleEmployee}
					/>

					<Route
						path='/schedule-an-appointment'
						exact
						component={() => (
							<SchedulePageSteps2
								language={language}
								setLanguage={setLanguage}
							/>
						)}
					/>
					<Route path='/xlookpro-apps' exact component={AppsLandingPage} />

					{/* <Route
						path='/schedule'
						exact
						component={() => <StoresList language={language} />}
					/> */}
					<Route
						path='/schedule'
						exact
						component={() => <MyStoreList language={language} />}
					/>
					<Route
						path='/schedule/haircut'
						exact
						component={() => <IconHaircut language={language} />}
					/>
					<Route
						path='/schedule/beard-shaving'
						exact
						component={() => <IconBeard language={language} />}
					/>

					<Route
						path='/schedule/bundle'
						exact
						component={() => <IconBundle language={language} />}
					/>

					<Route
						path='/schedule/skin-care'
						exact
						component={() => <IconSkinCare language={language} />}
					/>

					<Route
						path='/schedule/groom'
						exact
						component={() => <IconGroom language={language} />}
					/>

					<Route
						path='/schedule/50-EGP-Offer'
						exact
						component={() => <Icon50EGP language={language} />}
					/>

					<Route
						path='/schedule/offers'
						exact
						component={() => <IconOffers language={language} />}
					/>

					<Route
						path='/appointment-successfully-scheduled/YourAppointmentWasSuccesfullyScheduled/:userId'
						exact
						component={SuccessfulSchedule}
					/>

					<Route
						path='/xlook/shop'
						exact
						component={() => <ShopLandingPage language={language} />}
					/>

					{/* <Route
						path='/agents-signup-form'
						exact
						component={() => <AgentsSignupForm language={language} />}
					/> */}

					<Route
						path='/agents-signup-form'
						exact
						component={() => <AgentsSignupForm2 language={language} />}
					/>

					<Route
						path='/agents-signup-form2'
						exact
						component={() => <AgentsSignupForm2 language={language} />}
					/>

					<Route
						path='/product/:categoryslug/:slug/:productId'
						exact
						component={SingleProduct}
					/>

					<Route path='/cart' exact component={Cart} />

					{/* Ecommerce Routes */}
					<ShopRoute
						path='/ecommerce/admin/dashboard'
						exact
						component={() => <EcommerceMain language={language} />}
					/>

					{/* Owner Routes */}
					<OwnerRoute
						path='/store/admin/dashboard'
						exact
						component={() => <OwnerDashboard language={language} />}
					/>

					<OwnerRoute
						path='/store/admin/store-preview'
						exact
						component={() => <StorePreviewMain language={language} />}
					/>

					<OwnerRoute
						path='/store/admin/settings'
						exact
						component={() => <SettingsMain language={language} />}
					/>

					<OwnerRoute
						path='/store/admin/services'
						exact
						component={() => <ServicesMain language={language} />}
					/>

					<OwnerRoute
						path='/store/admin/employees'
						exact
						component={() => <EmployeeMain language={language} />}
					/>

					<OwnerRoute
						path='/store/admin/edit-website'
						exact
						component={() => <EditWebsiteMain language={language} />}
					/>

					<OwnerRoute
						path='/store/admin/branches'
						exact
						component={() => <BranchesMain language={language} />}
					/>

					<OwnerRoute
						path='/store/admin/ecommerce-integration'
						exact
						component={() => <EcommerceMain language={language} />}
					/>

					<OwnerRoute
						path='/store/admin/single-appointment-details/:AppointmentId/:employeeId'
						exact
						component={SingleAppointmentPage}
					/>

					<OwnerRoute
						path='/store/admin/customer-reporting-appointments-by-user2/:userId'
						exact
						component={SingleUserReportPage2}
					/>

					<OwnerRoute
						path='/store/admin/billing-account'
						exact
						component={() => <BillingMain language={language} />}
					/>

					<OwnerRoute
						path='/store/admin/add-gallary'
						exact
						component={() => <GallaryMain language={language} />}
					/>

					<OwnerRoute
						path='/profile-update-owner/:userId'
						exact
						component={ProfileUpdateOwner}
					/>

					<PrivateRoute
						path='/profile-update/:userId'
						exact
						component={ProfileUpdate}
					/>
					<PrivateRoute path='/dashboard' exact component={UserDashboard} />

					<EmployeeRoute
						path='/stylist/dashboard'
						exact
						component={ManageAppointments}
					/>
					<EmployeeRoute
						path='/employee/single-appointment-details/:AppointmentId/:employeeId'
						exact
						component={StylistSingleSchedulePage}
					/>

					<EmployeeRoute
						path='/update-profile/:userId'
						exact
						component={UpdateProfile}
					/>

					<EmployeeRoute
						path='/general-stats/:userId'
						exact
						component={GeneralStats}
					/>

					<StoreRoute
						path='/store/book-appointment-from-store'
						exact
						component={() => (
							<BookingFromStore language={language} setLanguage={setLanguage} />
						)}
					/>

					<StoreRoute
						path='/store/book-appointment-from-store2/employee/:employeeId'
						exact
						component={() => (
							<ScheduleFormFinal
								language={language}
								setLanguage={setLanguage}
							/>
						)}
					/>

					<StoreRoute
						path='/store/single-appointment-details-store/:AppointmentId/:employeeId'
						exact
						component={SingleAppointmentMain}
					/>

					{/* Platform Agents Routes */}
					<AgentsRoute
						path='/agent/dashboard'
						exact
						component={() => <AgentDashboard language={language} />}
					/>

					<AgentsRoute
						path='/store/admin/settings/agent/help/:ownerId'
						exact
						component={() => (
							<SettingsMainAgent language={language} setLanuage={setLanguage} />
						)}
					/>
					<AgentsRoute
						path='/store/admin/services/agent/help/:ownerId'
						exact
						component={() => <ServicesMainAgent language={language} />}
					/>
					<AgentsRoute
						path='/store/admin/employees/agent/help/:ownerId'
						exact
						component={() => <EmployeeMainAgent language={language} />}
					/>

					<AgentsRoute
						path='/store/admin/edit-website/agent/help/:ownerId'
						exact
						component={() => <EditWebsiteMainAgent language={language} />}
					/>

					<AgentsRoute
						path='/store/admin/add-gallary/agent/help/:ownerId'
						exact
						component={() => <GallaryMainAgent language={language} />}
					/>

					{/*End Of Platform Agents Routes */}

					{/* Platform Admin Routes */}
					<BossRoute
						path='/boss/admin/dashboard'
						exact
						component={BossDashboard}
					/>
					<BossRoute
						path='/boss/admin/added-stores'
						exact
						component={AddedStoresMain}
					/>

					<BossRoute
						path='/boss/admin/business-partners-reports'
						exact
						component={BusinessPartnersReportsMain}
					/>

					<BossRoute
						path='/boss/store/admin/dashboard/:ownerId'
						exact
						component={OwnerDashboardBoss}
					/>

					<BossRoute
						path='/boss/store/admin/settings/:ownerId'
						exact
						component={SettingsMainBoss}
					/>

					<BossRoute
						path='/boss/store/admin/update-business-agent/:ownerId'
						exact
						component={UpdateBusinessAgent}
					/>

					<BossRoute
						path='/boss/store/admin/store-preview/:ownerId'
						exact
						component={() => <StorePreviewMainBoss language={language} />}
					/>

					<BossRoute
						path='/boss/store/admin/services/:ownerId'
						exact
						component={ServicesMainBoss}
					/>

					<BossRoute
						path='/boss/store/admin/employees/:ownerId'
						exact
						component={EmployeeMainBoss}
					/>

					<BossRoute
						path='/boss/store/admin/update-profile/:ownerId'
						exact
						component={ProfileUpdateBoss}
					/>

					<BossRoute
						path='/boss/store/admin/edit-website/:ownerId'
						exact
						component={EditWebsiteMainBoss}
					/>
					<BossRoute
						path='/boss/store/admin/single-appointment-details/:AppointmentId/:employeeId/:ownerId'
						exact
						component={SingleAppointmentPageBoss}
					/>
					<BossRoute
						path='/boss/admin/pending-approval'
						exact
						component={PendingApprovalMain}
					/>
					<BossRoute
						path='/boss/admin/schedule/:storeName/:phone'
						exact
						component={StorePreviewPage}
					/>
					<BossRoute
						path='/boss/admin/agent-management'
						exact
						component={AgentsManagementMain}
					/>
					<BossRoute
						path='/boss/store/admin/add-gallary/:ownerId'
						exact
						component={GallaryMainBoss}
					/>
					<BossRoute
						path='/boss/admin/store-billing'
						exact
						component={StoreBillingMain}
					/>

					<BossRoute
						path='/boss/admin/xstore'
						exact
						component={() => <StoreAccountsMain language={language} />}
					/>

					<BossRoute
						path='/boss/admin/xlook-user'
						exact
						component={() => <UsersReportsMain language={language} />}
					/>

					<BossRoute
						path='/boss/admin/xlook-coupons'
						exact
						component={CouponMain}
					/>

					{/* End OfPlatform Admin Routes */}
				</Switch>
			</React.Fragment>
			<FooterComp />
		</BrowserRouter>
	);
}

export default App;
