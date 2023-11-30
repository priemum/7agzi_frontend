import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Helmet } from "react-helmet";
import { Spin } from "antd";
import { getAllUsers } from "../apiBoss";
import { isAuthenticated } from "../../auth";
import CountUp from "react-countup";

const UsersReportsMain = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [storeUsers, setStoreUsers] = useState("");
	const [sortedUserData, setSortedUserData] = useState([]);
	const [totalUsersCount, setTotalUsersCount] = useState(0);

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

	const gettingAllStoreUsers = () => {
		setLoading(true);
		getAllUsers(token, user._id).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setStoreUsers(data);
				setLoading(false);
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
					<div className='mt-3 container mx-auto'>
						<div className='mx-auto text-center mb-5'>
							<div className='card' style={{ background: "#f1416c" }}>
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
