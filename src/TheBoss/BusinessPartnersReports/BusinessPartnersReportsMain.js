import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import { gettingBookingSummary, summaryByGovernorate } from "../apiBoss";
import { Table } from "antd";
import { Helmet } from "react-helmet";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import CountUp from "react-countup";

const BusinessPartnersReportsMain = () => {
	const [governorateReport, setGovernorateReport] = useState([]);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [getBookingSummary, setGetBookingSummary] = useState("");

	const { user, token } = isAuthenticated();

	const gettingSummaryByGovernorate = () => {
		summaryByGovernorate(user._id, token).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setGovernorateReport(data);
			}
		});
	};

	const BookingSummary = () => {
		gettingBookingSummary(token, user._id).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setGetBookingSummary(data);
			}
		});
	};

	useEffect(() => {
		gettingSummaryByGovernorate();
		BookingSummary();
		// eslint-disable-next-line
	}, []);

	const columns = [
		{
			title: "#",
			key: "index",
			render: (text, record, index) => index + 1,
		},
		{
			title: "Governorate",
			dataIndex: "governorate",
			key: "governorate",
			render: (text) => text.charAt(0).toUpperCase() + text.slice(1),
		},
		{
			title: "Store Count",
			dataIndex: "StoreCount",
			key: "StoreCount",
		},
		{
			title: "Active Stores",
			dataIndex: "activeStores",
			key: "activeStores",
		},
		{
			title: "Inactive Stores",
			dataIndex: "inactiveStores",
			key: "inactiveStores",
		},
		{
			title: "Booking Count",
			dataIndex: "BookingCount",
			key: "BookingCount",
		},
		{
			title: "Online Booking",
			dataIndex: "OnlineBooking",
			key: "OnlineBooking",
		},
		{
			title: "Store Booking",
			dataIndex: "StoreBooking",
			key: "StoreBooking",
		},
		{
			title: "Cancelled Booking",
			dataIndex: "CancelledBooking",
			key: "CancelledBooking",
		},
		{
			title: "Paid Booking",
			dataIndex: "PaidBooking",
			key: "PaidBooking",
		},
		{
			title: "Not Paid Booking",
			dataIndex: "NotPaidBooking",
			key: "NotPaidBooking",
		},
	];

	console.log(getBookingSummary, "booking summary");
	return (
		<BusinessPartnersReportsMainWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>XLOOK ADMIN | Business Partner Report</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/boss/admin/business-partners-reports`}
				/>
			</Helmet>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='BusinessReport'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
			</div>
			<div className='contentWrapper my-5'>
				<div className='col-md-6 mx-auto text-center mb-3'>
					<div className='card' style={{ background: "#f1416c" }}>
						<div className='card-body'>
							<h5
								style={{
									fontWeight: "bolder",
									color: "white",
									fontSize: "2rem",
								}}
							>
								Overall Reservations
							</h5>
							<CountUp
								style={{ color: "white" }}
								duration={2}
								delay={1}
								end={getBookingSummary.OverallBookings}
								separator=','
							/>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-6 col-md-2 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#f1416c" }}>
							<div className='card-body'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "1rem",
									}}
								>
									Today's Reservations
								</h5>
								<CountUp
									style={{ color: "white" }}
									duration={2}
									delay={1}
									end={getBookingSummary.todayBookings}
									separator=','
								/>
							</div>
						</div>
					</div>

					<div className='col-6 col-md-2 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#009ef7" }}>
							<div className='card-body'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "0.9rem",
									}}
								>
									Yesterday's Reservations
								</h5>
								<CountUp
									style={{ color: "white" }}
									duration={2}
									delay={1}
									end={getBookingSummary.yesterdayBookings}
									separator=','
								/>
							</div>
						</div>
					</div>

					<div className='col-6 col-md-2 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#00f7d5" }}>
							<div className='card-body'>
								<h5
									style={{
										fontWeight: "bold",
										color: "white",
										fontSize: "1rem",
									}}
								>
									Last 7 Days
								</h5>
								<CountUp
									style={{ color: "white" }}
									duration={2}
									delay={1}
									end={getBookingSummary.last7daysBookings}
									separator=','
								/>
							</div>
						</div>
					</div>

					<div className='col-6 col-md-2 text-center mx-auto my-2'>
						<div className='card' style={{ background: "#d500f7" }}>
							<div className='card-body'>
								<h5
									style={{
										fontWeight: "bolder",
										color: "white",
										fontSize: "1rem",
									}}
								>
									Last 30 Days
								</h5>
								<CountUp
									style={{ color: "white" }}
									duration={2}
									delay={1}
									end={getBookingSummary.last30DaysBooking}
									separator=','
								/>
							</div>
						</div>
					</div>
				</div>
				<Table
					dataSource={governorateReport}
					columns={columns}
					pagination={{ pageSize: 30 }}
				/>
			</div>
		</BusinessPartnersReportsMainWrapper>
	);
};

export default BusinessPartnersReportsMain;

const BusinessPartnersReportsMainWrapper = styled.div`
	min-height: 1000px;

	.contentWrapper {
		padding-right: 20px;
		padding-left: 17%;
	}

	.card-body span {
		font-size: 2rem;
	}

	.main-header > span {
		font-size: 2.5rem;
	}

	@media (max-width: 1000px) {
		.contentWrapper {
			padding-right: 10px;
			padding-left: 4%;
		}
	}
`;
