import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Helmet } from "react-helmet";
import { Spin, Table, Pagination } from "antd";
import {
	getAllUsers,
	getAllUsersBookings,
	listAppointmentsByBoss,
} from "../apiBoss";
import { isAuthenticated } from "../../auth";
import CountUp from "react-countup";
import AppointmentsTable from "./AppointmentsTable";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#0f377e",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "0.75rem",
			padding: "10px",
			color: "white",
			transition: "var(--mainTransition)",
		};
	} else {
		return {
			backgroundColor: "lightgrey",
			padding: "10px",
			borderRadius: "5px",
			fontSize: "0.85rem",
			fontWeight: "bold",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
		};
	}
};

const UsersReportsMain = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [storeUsers, setStoreUsers] = useState("");
	const [sortedUserData, setSortedUserData] = useState([]);
	const [appointmentsHistory, setAppointmentsHistory] = useState([]);
	const [totalUsersCount, setTotalUsersCount] = useState(0);
	const [usersReportData, setUsersReportData] = useState("");
	const [menuClicked, setMenuClicked] = useState("UserCount");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalRecords, setTotalRecords] = useState(0);
	const pageSize = 100; // Number of records per page

	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);

	const { token, user } = isAuthenticated();

	useEffect(() => {
		if (window.location.pathname.includes("/store/admin/dashboard")) {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
	}, []);

	const gettingAllStoreUsers = (page = 1) => {
		setLoading(true);
		getAllUsers(token, user._id).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setStoreUsers(data);

				getAllUsersBookings(token, user._id, pageSize, page).then((data2) => {
					if (data2 && data2.error) {
						console.log(data2.error);
					} else {
						// Sort bookings so that entries with non-blank storeName come first
						data2.sort((a, b) => {
							if (a.storeName && b.storeName) return 0; // Both have storeName
							if (a.storeName) return -1; // Only a has storeName
							return 1; // Only b has storeName or both don't have
						});

						const totalCount = data.reduce((sum, user) => sum + user.count, 0);

						setUsersReportData(data2);
						setTotalRecords(totalCount);

						listAppointmentsByBoss(user._id, token, 60).then((data3) => {
							if (data3 && data3.error) {
								console.log(data3.error);
							} else {
								setAppointmentsHistory(data3);
								setLoading(false);
							}
						});

						setLoading(false);
					}
				});
			}
		});
	};

	useEffect(() => {
		gettingAllStoreUsers();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (storeUsers) {
			// Parse the dates and sort
			const parsedData = storeUsers.map((user) => {
				const date = new Date(user._id.year, user._id.month - 1, user._id.day);
				return { date, count: user.count };
			});

			parsedData.sort((a, b) => b.date - a.date); // Sort in descending order

			setSortedUserData(parsedData);

			const totalCount = storeUsers.reduce((sum, user) => sum + user.count, 0);
			setTotalUsersCount(totalCount);
		}
	}, [storeUsers]);

	const columns = [
		{
			title: "#",
			key: "index",
			render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (text) => new Date(text).toDateString(),
		},
		{
			title: "Salon Name",
			dataIndex: "storeName",
			key: "storeName",
		},
		{
			title: "Salon Country",
			dataIndex: "storeCountry",
			key: "storeCountry",
		},
		{
			title: "Salon Governorate",
			dataIndex: "storeGovernorate",
			key: "storeGovernorate",
		},
		{
			title: "Booking Date",
			dataIndex: "scheduledDate",
			key: "scheduledDate",
		},
		{
			title: "Booking Time",
			dataIndex: "scheduledTime",
			key: "scheduledTime",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
	];

	// Handle page change
	const handlePageChange = (page) => {
		setCurrentPage(page);
		gettingAllStoreUsers(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<UsersReportsMainWrapper show={collapsed}>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>XLOOK XLook Regular Users</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/boss/admin/xlook-users`}
				/>
			</Helmet>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='Users'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				{loading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "50vh",
						}}
					>
						<Spin size='large' tip='Loading...' />
					</div>
				) : (
					<div className='mt-3  mx-auto col-md-11 mx-auto'>
						<div className='row mb-5 col-md-10 mx-auto text-center'>
							<div
								className='col-md-4 text-center mx-auto'
								style={isActive(menuClicked, "UserCount")}
								onClick={() => setMenuClicked("UserCount")}
							>
								User Count Report
							</div>
							<div
								className='col-md-4 text-center mx-auto'
								style={isActive(menuClicked, "UserDetails")}
								onClick={() => setMenuClicked("UserDetails")}
							>
								User Details Report
							</div>

							<div
								className='col-md-4 text-center mx-auto'
								style={isActive(menuClicked, "BookingHistory")}
								onClick={() => setMenuClicked("BookingHistory")}
							>
								Booking History
							</div>
						</div>
						{menuClicked === "UserCount" ? (
							<div className='container'>
								<div className='mx-auto text-center mb-5'>
									<div
										className='card col-md-6 mx-auto'
										style={{ background: "#f1416c" }}
									>
										<div className='card-body'>
											<h5
												style={{
													fontWeight: "bolder",
													color: "white",
													fontSize: "2rem",
												}}
											>
												Overall Registered Users
											</h5>
											<CountUp
												style={{ color: "white" }}
												duration={2}
												delay={1}
												end={totalUsersCount}
												separator=','
											/>
										</div>
									</div>
								</div>
								<h3 className='mb-4'>Users Count By Date Report:</h3>

								<div style={{ maxHeight: "800px", overflow: "auto" }}>
									<table className='table'>
										<thead>
											<tr>
												<th>User Registered On Date</th>
												<th>User Count</th>
											</tr>
										</thead>
										<tbody>
											{sortedUserData.map((data, index) => (
												<tr key={index}>
													<td>{data.date.toDateString()}</td>
													<td>{data.count}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						) : null}

						{menuClicked === "UserDetails" ? (
							<div className='px-5 ml-3'>
								<h3 className='mt-5'>Users Detailed Data:</h3>

								<div style={{ maxHeight: "1000px", overflow: "auto" }}>
									<Table
										columns={columns}
										dataSource={usersReportData}
										pagination={false} // Disable built-in pagination
										rowKey={(record) => record._id} // Use unique key from record
										className='custom-table-header'
									/>
								</div>
								<div className='m-5'>
									<Pagination
										current={currentPage}
										pageSize={pageSize}
										total={totalRecords}
										onChange={handlePageChange}
									/>
								</div>
							</div>
						) : null}

						{menuClicked === "BookingHistory" ? (
							<>
								<AppointmentsTable appointmentsHistory={appointmentsHistory} />
							</>
						) : null}
					</div>
				)}
			</div>
		</UsersReportsMainWrapper>
	);
};

export default UsersReportsMain;

const UsersReportsMainWrapper = styled.div`
	min-height: 1200px;

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "2% 100%" : "11% 91%")};
	}

	.container {
		margin-top: 50px !important;
		margin-bottom: 20px;
	}

	.card-body {
		font-weight: bolder;
	}

	table {
		overflow: auto;
	}

	.tableWrapper {
		display: none;
	}

	.card-body span {
		font-size: 2rem;
	}

	.custom-table-header .ant-table-thead > tr > th,
	.custom-table-header .ant-table-tbody > tr > td {
		font-size: 12px !important; /* Set your desired font size */
	}

	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 2% 98%;
		}

		a {
			font-size: 13px !important;
			text-align: center;
		}

		.container-fluid > div {
			text-align: center;
			margin-left: 0px !important;
		}

		.container-fluid {
			margin-left: 0px !important;
			text-align: center;
		}

		.apexcharts-toolbar {
			display: none !important;
		}
	}
`;
