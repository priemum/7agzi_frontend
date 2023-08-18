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
	const { chosenLanguage } = useCartContext();

	const { user, token } = isAuthenticated();

	const allUsersBooking = () => {
		getUserBookings(user.phone, user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllBookings(data);
			}
		});
	};

	useEffect(() => {
		allUsersBooking();
		// eslint-disable-next-line
	}, []);

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
					<div className='row pt-3 menuItems'>
						<div className='col-3'>Pending</div>
						<div className='col-3'>Successful</div>
						<div className='col-3'>Cancelled</div>
						<div className='col-3'>Points</div>
					</div>
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
								<p>المحتوى لـ "الصالونات التي قمت بالحجز بها"</p>
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
									<PointsAndPayments allBookings={allBookings} />
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
								<p>Content for "Update My Account"</p>
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
								<p>Content for "My Bookings Summary"</p>
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
								<p>Content for "Salons I Booked With"</p>
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
								<p>Content for "Payments and Loyalty Points"</p>
							</Panel>
						</Collapse>
					</div>
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
