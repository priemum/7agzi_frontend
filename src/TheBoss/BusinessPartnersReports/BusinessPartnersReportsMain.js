import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import { summaryByGovernorate } from "../apiBoss";
import { Table } from "antd";
import { Helmet } from "react-helmet";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

const BusinessPartnersReportsMain = () => {
	const [governorateReport, setGovernorateReport] = useState([]);
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

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

	useEffect(() => {
		gettingSummaryByGovernorate();
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
			<div className='container my-5'>
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
`;
