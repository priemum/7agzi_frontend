/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useCartContext } from "../sidebar_context";
import { Collapse } from "antd";
import SettingsIcon from "../Images/setting-icon.png";
import BookingSummary from "../Images/BookingSummary.png";
import Icon3 from "../Images/icon-3.png";
import Icon4 from "../Images/icon-4.png";
import { getUserBookings } from "./apiUser";
import ClientBookingSummary from "./ClientBookingSummary";
import ProfileUpdate from "./ProfileUpdate";
import PointsAndPayments from "./PointsAndPayments";
import PreviousStoreList from "./PreviousStoreList";
import Slider from "react-slick";
import { getAffiliates } from "../TheBoss/apiBoss";
import AffiliateLinks from "../components/HomePage/AffiliateLinks";

const { Panel } = Collapse;

const customExpandIcon = (props) => {
	// console.log(props, "props");
	if (props.panelKey === "1") {
		return (
			<img
				className='mx-2'
				src={SettingsIcon}
				width={35}
				alt='Powered By https://infinite-apps.com'
			/>
		);
	} else if (props.panelKey === "2") {
		return (
			<img
				className='mx-2'
				src={BookingSummary}
				width={35}
				alt='Powered By https://infinite-apps.com'
			/>
		);
	} else if (props.panelKey === "3") {
		return (
			<img
				className='mx-2'
				src={Icon3}
				width={35}
				alt='Powered By https://infinite-apps.com'
			/>
		);
	} else if (props.panelKey === "4") {
		return (
			<img
				className='mx-2'
				src={Icon4}
				width={35}
				alt='Powered By https://infinite-apps.com'
			/>
		);
	}
	return <i className='fa-solid fa-gear mx-2' style={{ color: "white" }}></i>;
};

const UserDashboard = () => {
	const [activeKey, setActiveKey] = useState("2");
	const [allBookings, setAllBookings] = useState("");
	const [allPendingBookings, setAllPendingBookings] = useState([]);
	const [allSuccessfulBookings, setAllSuccessfulBookings] = useState([]);
	const [allCancelledBookings, setAllCancelledBookings] = useState([]);
	const [totalPointsAndPayments, setTotalPointsAndPayments] = useState([]);
	const [loading2, setLoading2] = useState(true);
	const [affiliateProducts, setAffiliateProducts] = useState(null);
	const { chosenLanguage } = useCartContext();

	const { user, token } = isAuthenticated();

	// Get today's date without time for accurate comparison
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const allUsersBooking = () => {
		function aggregateLoyaltyPoints(allBookings) {
			const aggregatedPoints = {};

			// Filter out bookings with status "Cancelled"
			const validBookings =
				allBookings &&
				allBookings.filter((booking) => booking.status !== "Cancelled");

			validBookings.forEach((booking) => {
				const belongsToId = booking.belongsTo.storeName;
				const servicesPicked = booking.serviceDetails.servicesPicked || [];
				let totalForThisBookingLoyaltyPoints = 0;
				let totalForThisBookingPriceAfterDiscount = 0;

				servicesPicked.forEach((service) => {
					totalForThisBookingLoyaltyPoints += service.serviceLoyaltyPoints || 0;
					totalForThisBookingPriceAfterDiscount +=
						service.servicePriceDiscount || 0;
				});

				// If the belongsToId is already in the aggregatedPoints, add to its value
				// Otherwise, create a new object with loyalty points and price after discount
				if (!aggregatedPoints[belongsToId]) {
					aggregatedPoints[belongsToId] = {
						TotalLoyaltyPoints: totalForThisBookingLoyaltyPoints,
						TotalPriceAfterDiscount: totalForThisBookingPriceAfterDiscount,
					};
				} else {
					aggregatedPoints[belongsToId].TotalLoyaltyPoints +=
						totalForThisBookingLoyaltyPoints;
					aggregatedPoints[belongsToId].TotalPriceAfterDiscount +=
						totalForThisBookingPriceAfterDiscount;
				}
			});

			// Convert the object to the desired array format
			return Object.entries(aggregatedPoints).map(([belongsTo, data]) => ({
				belongsTo,
				...data,
			}));
		}
		getUserBookings(user.phone, user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllBookings(data);

				// Filter out all pending orders
				const allPending = data.filter((booking) => {
					// Convert scheduledDate to a Date object for comparison
					const scheduledDate = new Date(booking.scheduledDate);

					return scheduledDate >= today && booking.status === "Not Paid";
				});

				// Filter out all successful orders
				const allSuccess = data.filter((booking) => {
					// Convert scheduledDate to a Date object for comparison
					const scheduledDate = new Date(booking.scheduledDate);

					return scheduledDate < today && booking.status !== "Cancelled";
				});

				// Filter out all Cancelled orders
				const allCancelled = data.filter((booking) => {
					return booking.status === "Cancelled";
				});

				//Aggregating Loyalty Bookings

				setAllPendingBookings(allPending);
				setAllSuccessfulBookings(allSuccess);
				setAllCancelledBookings(allCancelled);

				setTotalPointsAndPayments(
					aggregateLoyaltyPoints(data.length > 0 ? data : [])
				);
			}
		});
	};

	const gettingAllAffiliates = () => {
		setLoading2(true);
		getAffiliates().then((data) => {
			if (data && data.error) {
				console.log("Affiliate Products Error");
			} else {
				setAffiliateProducts(data);
				setLoading2(false);
			}
		});
	};

	useEffect(() => {
		allUsersBooking();
		gettingAllAffiliates();

		// eslint-disable-next-line
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: true,
					infinite: true,
					autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplaySpeed: 3000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};

	return (
		<UserDashboardOverall dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
			<div
				className='wrapperClass '
				style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "" }}
				dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			>
				<div className='userMenu pt-4'>
					<div>{user.name}</div>
					<div>{user.email}</div>
					<div>{user.phone}</div>
					{chosenLanguage === "Arabic" ? (
						<div className='row pt-3 menuItems'>
							<div className='col-4'>
								حجوزات جارية
								<div>{allPendingBookings && allPendingBookings.length}</div>
							</div>
							<div className='col-4'>
								حجوزات ناجحة
								<div>
									{allSuccessfulBookings && allSuccessfulBookings.length}
								</div>
							</div>
							<div className='col-2'>
								ألغيت
								<div style={{ color: "#edb9b9" }}>
									{" "}
									<strong>
										{allCancelledBookings && allCancelledBookings.length}
									</strong>{" "}
								</div>
							</div>
							<div className='col-2'>
								النقاط
								<div style={{ color: "lightgreen", fontWeight: "bolder" }}>
									{totalPointsAndPayments &&
										totalPointsAndPayments.reduce(
											(accumulatedSum, currentObject) => {
												return (
													accumulatedSum + currentObject.TotalLoyaltyPoints
												);
											},
											0
										)}
								</div>
							</div>
						</div>
					) : (
						<div className='row pt-3 menuItems'>
							<div className='col-3'>
								Pending
								<div>{allPendingBookings && allPendingBookings.length}</div>
							</div>
							<div className='col-3'>
								Successful
								<div>
									{allSuccessfulBookings && allSuccessfulBookings.length}
								</div>
							</div>
							<div className='col-3'>
								Cancelled
								<div style={{ color: "#edb9b9" }}>
									{" "}
									<strong>
										{allCancelledBookings && allCancelledBookings.length}
									</strong>{" "}
								</div>
							</div>
							<div className='col-3'>
								Points
								<div style={{ color: "lightgreen", fontWeight: "bolder" }}>
									{totalPointsAndPayments &&
										totalPointsAndPayments.reduce(
											(accumulatedSum, currentObject) => {
												return (
													accumulatedSum + currentObject.TotalLoyaltyPoints
												);
											},
											0
										)}
								</div>
							</div>
						</div>
					)}
				</div>

				{chosenLanguage === "Arabic" ? (
					<div className='dashboardContent'>
						<Collapse
							accordion
							expandIconPosition='left'
							expandIcon={customExpandIcon}
							activeKey={activeKey}
							onChange={(key) => setActiveKey(key)}
						>
							<Panel
								header={
									<div
										style={{
											color: "white",
											marginTop: "3px",
											fontSize: "1.1rem",
											fontWeight: "bolder",
										}}
									>
										<strong>تعديل حسابي</strong>
									</div>
								}
								key='1'
								style={{
									backgroundColor: activeKey === "1" ? "#0f0f0f" : "#191919",
									color: activeKey === "1" ? "white" : "#7b7b7b",
									marginTop: "30px",
								}}
							>
								<ProfileUpdate userId={user._id} />
							</Panel>
							<Panel
								header={
									<div
										style={{
											color: "white",
											marginTop: "3px",
											fontSize: "1.1rem",
											fontWeight: "bolder",
										}}
									>
										ملخص حجوزاتي
									</div>
								}
								key='2'
								style={{
									backgroundColor: activeKey === "2" ? "#0f0f0f" : "#191919",
									color: activeKey === "2" ? "white" : "#7b7b7b",
									marginTop: "5px",
								}}
							>
								<ClientBookingSummary allBookings={allBookings} />
							</Panel>
							<Panel
								header={
									<div
										style={{
											color: "white",
											marginTop: "3px",
											fontSize: "1.1rem",
											fontWeight: "bolder",
										}}
									>
										الصالونات التي قمت بالحجز بها
									</div>
								}
								key='3'
								style={{
									backgroundColor: activeKey === "3" ? "#0f0f0f" : "#191919",
									color: activeKey === "3" ? "white" : "#7b7b7b",
									marginTop: "5px",
								}}
							>
								<div className='container-fluid'>
									<Slider {...settings}>
										{allBookings &&
											allBookings.map((b, i) => (
												<div
													className='img-fluid images'
													key={i}
													onClick={() => {
														localStorage.setItem(
															"chosenStore",
															JSON.stringify(b.settings)
														);
														window.scrollTo({ top: 0, behavior: "smooth" });
													}}
												>
													<PreviousStoreList
														i={i}
														salon={b}
														key={i}
														language={chosenLanguage}
													/>
												</div>
											))}
									</Slider>
								</div>
							</Panel>
							<Panel
								header={
									<div
										style={{
											color: "white",
											marginTop: "3px",
											fontSize: "1.1rem",
											fontWeight: "bolder",
										}}
									>
										المدفوعات ونقاط الولاء
									</div>
								}
								key='4'
								style={{
									backgroundColor: activeKey === "4" ? "#0f0f0f" : "#191919",
									color: activeKey === "4" ? "white" : "",
									marginTop: "5px",
									paddingTop: "10px",
									paddingBottom: "10px",
								}}
							>
								{allBookings && allBookings.length > 0 ? (
									<PointsAndPayments
										totalPointsAndPayments={totalPointsAndPayments}
										allBookings={allBookings}
									/>
								) : null}
							</Panel>
						</Collapse>
					</div>
				) : (
					<div className='dashboardContent'>
						<Collapse
							accordion
							expandIconPosition='left'
							expandIcon={customExpandIcon}
							activeKey={activeKey}
							onChange={(key) => setActiveKey(key)}
						>
							<Panel
								header={
									<div style={{ color: "white", marginRight: "10px" }}>
										Update My Account
									</div>
								}
								key='1'
								style={{
									backgroundColor: activeKey === "1" ? "black" : "#191919",
									color: activeKey === "1" ? "white" : "#7b7b7b",
									marginTop: "30px",
								}}
							>
								<ProfileUpdate userId={user._id} />
							</Panel>
							<Panel
								header={
									<div style={{ color: "white" }}>My Bookings Summary</div>
								}
								key='2'
								style={{
									backgroundColor: activeKey === "2" ? "black" : "#191919",
									color: activeKey === "2" ? "white" : "#7b7b7b",
									marginTop: "5px",
								}}
							>
								<ClientBookingSummary allBookings={allBookings} />
							</Panel>
							<Panel
								header={
									<div style={{ color: "white" }}>Salons I Booked With</div>
								}
								key='3'
								style={{
									backgroundColor: activeKey === "3" ? "black" : "#191919",
									color: activeKey === "3" ? "white" : "#7b7b7b",
									marginTop: "5px",
								}}
							>
								<div className='container-fluid'>
									<Slider {...settings}>
										{allBookings &&
											allBookings.map((b, i) => (
												<div
													className='img-fluid images'
													key={i}
													onClick={() => {
														localStorage.setItem(
															"chosenStore",
															JSON.stringify(b.settings)
														);
														window.scrollTo({ top: 0, behavior: "smooth" });
													}}
												>
													<PreviousStoreList
														i={i}
														salon={b}
														key={i}
														language={chosenLanguage}
													/>
												</div>
											))}
									</Slider>
								</div>
							</Panel>
							<Panel
								header={
									<div style={{ color: "white" }}>
										Payments and Loyalty Points
									</div>
								}
								key='4'
								style={{
									backgroundColor: activeKey === "4" ? "black" : "#191919",
									color: activeKey === "4" ? "white" : "",
									marginTop: "5px",
									paddingTop: "10px",
									paddingBottom: "10px",
								}}
							>
								{allBookings && allBookings.length > 0 ? (
									<PointsAndPayments
										totalPointsAndPayments={totalPointsAndPayments}
										allBookings={allBookings}
									/>
								) : null}
							</Panel>
						</Collapse>
					</div>
				)}
			</div>
			<div className='my-4'>
				{loading2 ? null : (
					<AffiliateLinks
						affiliateProducts={affiliateProducts}
						loading={loading2}
					/>
				)}
			</div>
		</UserDashboardOverall>
	);
};

export default UserDashboard;

const UserDashboardOverall = styled.div`
	min-height: 750px;
	background-color: black;
	padding-left: 100px;
	padding-right: 100px;

	.userMenu {
		background-color: #191919;
		color: white;
		padding: 10px;
		text-align: center;
	}
	.menuItems {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		margin: auto;
		justify-content: center;
		align-items: center;
	}

	.ant-collapse,
	.ant-collapse-icon-position-start {
		color: white;
		background-color: black;
	}

	.ant-collapse-content,
	.ant-collapse-content-active {
		color: white;
		background-color: #404040;
	}

	@media (max-width: 1200px) {
		padding-left: 0px;
		padding-right: 0px;
	}
`;
