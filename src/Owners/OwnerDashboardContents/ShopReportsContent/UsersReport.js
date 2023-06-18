/** @format */

import React, {useState, useEffect} from "react";
// eslint-disable-next-line
import styled from "styled-components";
import {getAllUsers, listScheduledOrders2} from "../../apiOwner";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../../../auth";

//
const UsersReport = () => {
	const [allUsers, setAllUsers] = useState([]);

	// eslint-disable-next-line
	const [firstSetOfCustomers, setFirstSetOfCustomers] = useState([]);
	const [histOrders, setHistOrders] = useState([]);
	const [q, setQ] = useState("");

	// eslint-disable-next-line
	const adminName = isAuthenticated() && isAuthenticated().user.name;
	const token = isAuthenticated().token;
	const user = isAuthenticated() && isAuthenticated().user;

	const loadAllUsers = () => {
		function compareTotalAppointments(a, b) {
			const TotalAppointmentsA = a.overAllAppointments;
			const TotalAppointmentsB = b.overAllAppointments;

			let comparison = 0;
			if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}
		getAllUsers(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllUsers(data.filter((i) => i.role === 0));
				setFirstSetOfCustomers(
					data.filter((i) => i.role === 0) &&
						data
							.filter((i) => i.role === 0)
							.map((ii) => {
								return {
									_id: ii._id,
									customerName: ii.name,
									activeUser: ii.activeUser,
									overAllAppointments: ii.history.length,
								};
							}) &&
						data.filter((i) => i.role === 0) &&
						data
							.filter((i) => i.role === 0)
							.map((ii) => {
								return {
									_id: ii._id,
									customerName: ii.name,
									activeUser: ii.activeUser,
									overAllAppointments: ii.history.length,
								};
							})
							.sort(compareTotalAppointments)
				);
			}
		});
	};

	const loadOrders = () => {
		function compareTotalAppointments(a, b) {
			const TotalAppointmentsA = a.createdAt;
			const TotalAppointmentsB = b.createdAt;

			let comparison = 0;
			if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}

		listScheduledOrders2(user._id, token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistOrders(data.sort(compareTotalAppointments));
			}
		});
	};

	useEffect(() => {
		loadAllUsers();
		loadOrders();

		// eslint-disable-next-line
	}, []);

	const activeCustomers = () => {
		const allActiveUsers =
			allUsers && allUsers.filter((i) => i.activeUser === true);
		return allActiveUsers;
	};

	const blockedCustomers = () => {
		const allBlockedUsers =
			allUsers && allUsers.filter((i) => i.activeUser === false);
		return allBlockedUsers;
	};

	const userByAppointmentStatus = () => {
		function compareTotalAppointments(a, b) {
			const TotalAppointmentsA = a.count;
			const TotalAppointmentsB = b.count;

			let comparison = 0;
			if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}

		const convert = (arr) => {
			const res = {};
			arr.forEach((obj) => {
				const key = `${obj.ClientName}${obj["PK"]}`;
				if (!res[key]) {
					res[key] = {...obj, count: 0};
				}
				res[key].count += 1;
			});
			return Object.values(res);
		};

		var modifiedOrders =
			histOrders &&
			histOrders.map((i) => {
				return {
					AppointmentStatus: i.status,
					PK: i.status + " " + i.user.name,
					ClientName: i.user.name,
					ClientId: i.user._id,
					role: i.user.role,
					activeUser: i.user.activeUser,
					email: i.user.email,
				};
			});
		// &&
		// histOrders
		// 	.map((i) => {
		// 		return {
		// 			AppointmentStatus: i.status,
		// 			PK: i.status + " " + i.user.name,
		// 			ClientName: i.user.name,
		// 			ClientId: i.user._id,
		// 			role: i.user.role,
		// 			activeUser: i.user.activeUser,
		// 			email: i.user.email,
		// 		};
		// 	})
		// 	.filter((ii) => ii.role === 0);

		return convert(modifiedOrders).sort(compareTotalAppointments);
	};

	function search(orders) {
		return orders.filter((row) => {
			return (
				row.AppointmentStatus.toLowerCase().indexOf(q) > -1 ||
				row.ClientName.toString().toLowerCase().indexOf(q) > -1 ||
				row.email.toString().toLowerCase().indexOf(q) > -1
			);
		});
	}

	const customersSummary = () => {
		return (
			<CusterSummaryWrapper className='col-md-8 mx-auto'>
				<div>
					<div className=' mb-3 form-group mx-3 text-center'>
						<label
							className='mt-3 mx-3'
							style={{
								fontWeight: "bold",
								fontSize: "1.05rem",
								color: "black",
								borderRadius: "20px",
							}}
						>
							Search
						</label>
						<input
							className='p-2 my-5 '
							type='text'
							value={q}
							onChange={(e) => setQ(e.target.value.toLowerCase())}
							placeholder='Search Client or Status'
							style={{borderRadius: "20px", width: "50%"}}
						/>
					</div>
					<table
						className='table table-bordered table-md-responsive table-hover table-striped'
						style={{fontSize: "0.75rem"}}
					>
						<thead className='thead-light'>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Customer Name</th>
								<th scope='col'>Customer Account Email/Phone</th>
								<th scope='col'>Appointments Status</th>
								<th scope='col'>Count of Appointments / Status</th>
								<th scope='col'>Active/Blocked</th>
							</tr>
						</thead>
						<thead>
							{userByAppointmentStatus() &&
								search(userByAppointmentStatus()) &&
								search(userByAppointmentStatus()).map((a, i) => {
									return (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>
												{" "}
												<Link
													to={`/store/admin/customer-reporting-appointments-by-user2/${a.ClientId}`}
												>
													{a.ClientName}
												</Link>{" "}
											</td>
											<td>{a.email}</td>
											<td>{a.AppointmentStatus}</td>
											<td>{a.count}</td>
											<td>
												{a.role !== 0
													? "Not a Client"
													: a.activeUser
													? "Active"
													: "Blocked"}
											</td>
										</tr>
									);
								})}
						</thead>
					</table>
				</div>
			</CusterSummaryWrapper>
		);
	};

	// console.log(histOrders, "HistOrders");
	// console.log(userByAppointmentStatus(), "userByAppointmentStatus");
	// console.log(allUsers, "all Users");
	// console.log(firstSetOfCustomers, "allUsersSummarized");

	return (
		<div style={{marginBottom: "200px"}}>
			<div
				className='card-header my-5 col-lg-6 col-md-10  mx-auto'
				style={{
					textAlign: "center",
					boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.2)",
					fontWeight: "bold",
					letterSpacing: "2px",
					borderRadius: "20px",
					fontSize: "1rem",
				}}
			>
				The total signed in customers you have is
				<span style={{fontStyle: "italic"}}>
					<strong>
						{" "}
						{allUsers && allUsers.length} Customers, (
						{activeCustomers() && activeCustomers().length} active and{" "}
						{blockedCustomers() && blockedCustomers().length} blocked)
					</strong>
				</span>
			</div>
			{customersSummary()}
		</div>
	);
};

export default UsersReport;

const CusterSummaryWrapper = styled.div`
	overflow-x: auto;
`;
