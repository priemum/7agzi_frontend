import React, { useEffect, useState } from "react";
import "./App.css";
/* eslint-disable import/no-webpack-loader-syntax */
import "antd/dist/antd.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { isAuthenticated } from "./auth";

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
import StoresList from "./pages/StoresList";
import SuccessfulSchedule from "./pages/SchedulePage/SuccessfulSchedule";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SingleStorePage from "./pages/SingleStorePage";
import AgentsSignupForm from "./pages/AgentsSignupForm";
import RegisterSteps from "./pages/RegisterSteps";

//Owner Route
import OwnerRoute from "./auth/OwnerRoute";
import OwnerDashboard from "./Owners/OwnerDashboardContents/OwnerDashboard";
import SettingsMain from "./Owners/SettingsContent/SettingsMain";
import ServicesMain from "./Owners/ServicesContent/ServicesMain";
import EmployeeMain from "./Owners/EmployeeManagement/EmployeeMain";
import EditWebsiteMain from "./Owners/EditWebsite/EditWebsiteMain";
import BranchesMain from "./Owners/Branches/BranchesMain";
import EcommerceMain from "./Owners/EcommerceManagement/EcommerceMain";
import SingleAppointmentPage from "./Owners/OwnerDashboardContents/SingleAppointmentPage";
import BillingMain from "./Owners/Billing/BillingMain";

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
import SchedulePageStepsStore from "./StoreBooking/SchedulePageAdjusted/SchedulePageStepsStore";
import SingleAppointmentPageStore from "./StoreBooking/SingleAppointmentPageStore";

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

//Platform Agents routes
import AgentsRoute from "./auth/AgentsRoute";
import AgentDashboard from "./PlatformAgent/AgentDashboard";
import SettingsMainAgent from "./PlatformAgent/AgentAccountEditing/SettingsContent/SettingsMain";
import ServicesMainAgent from "./PlatformAgent/AgentAccountEditing/ServicesContent/ServicesMainAgent";
import EmployeeMainAgent from "./PlatformAgent/AgentAccountEditing/EmployeeManagement/EmployeeMainAgent";
import EditWebsiteMainAgent from "./PlatformAgent/AgentAccountEditing/EditWebsite/EditWebsiteMainAgent";

function App() {
	const [click, setClick] = useState(false);
	const [clickMenu, setClickMenu] = useState(false);
	const [language, setLanguage] = useState("English");

	const { user } = isAuthenticated();

	useEffect(() => {
		setClickMenu(click);
		// eslint-disable-next-line
	}, [click, clickMenu]);

	useEffect(() => {
		if (!navigator.geolocation) {
			console.log("Geolocation is not supported by your browser");
		} else {
			navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
		}

		function successFunction(position) {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;

			axios
				.get(
					`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
				)
				.then((response) => {
					const { address } = response.data;
					const { country, state, city } = address;

					const userLocation = {
						country,
						state,
						city,
					};

					localStorage.setItem("userLocation", JSON.stringify(userLocation));
				})
				.catch((error) => {
					console.log(error);
				});
		}

		function errorFunction(error) {
			console.log(error);
		}
	}, []);

	return (
		<BrowserRouter>
			<React.Fragment>
				<React.Fragment>
					{/* {allAdsCombined && allAdsCombined.show_ad ? <NavbarAds /> : null} */}
					{click && clickMenu ? (
						<DarkBackground setClick={setClick} setClickMenu={setClickMenu} />
					) : null}
					<>
						{user && user.role === 3 ? null : (
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
						path='/about'
						exact
						component={() => <About language={language} />}
					/>
					<Route
						path='/steps'
						exact
						component={() => <RegisterSteps language={language} />}
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
						component={SchedulePageSteps2}
					/>
					<Route path='/schedule' exact component={StoresList} />
					<Route
						path='/appointment-successfully-scheduled/YourAppointmentWasSuccesfullyScheduled/:userId'
						exact
						component={SuccessfulSchedule}
					/>
					<Route
						path='/agents-signup-form'
						exact
						component={() => <AgentsSignupForm language={language} />}
					/>

					{/* Owner Routes */}
					<OwnerRoute
						path='/store/admin/dashboard'
						exact
						component={() => <OwnerDashboard language={language} />}
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
						component={EditWebsiteMain}
					/>
					<OwnerRoute
						path='/store/admin/branches'
						exact
						component={BranchesMain}
					/>
					<OwnerRoute
						path='/store/admin/ecommerce-integration'
						exact
						component={EcommerceMain}
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
						component={BookingFromStore}
					/>
					<StoreRoute
						path='/store/book-appointment-from-store/employee/:employeeId'
						exact
						component={SchedulePageStepsStore}
					/>

					<StoreRoute
						path='/store/single-appointment-details-store/:AppointmentId/:employeeId'
						exact
						component={SingleAppointmentPageStore}
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
						path='/boss/admin/store-billing'
						exact
						component={StoreBillingMain}
					/>
					{/* End OfPlatform Admin Routes */}
				</Switch>
			</React.Fragment>
			<FooterComp />
		</BrowserRouter>
	);
}

export default App;
