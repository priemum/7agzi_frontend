/** @format */

import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {
	getAllUsers,
	listScheduledOrders2,
	updateClientActivity,
} from "../../apiOwner";
import moment from "moment";
import {isAuthenticated} from "../../../auth";

const SingleUserReportPage2 = (props) => {
	const [loading, setLoading] = useState(true);

	const [selectedUser, setSelectedUser] = useState({});
	const [HistOrders, setHistOrders] = useState([]);
	const [q, setQ] = useState("");
	// eslint-disable-next-line
	const adminName = isAuthenticated() && isAuthenticated().user.name;
	const token = isAuthenticated().token;
	const user = isAuthenticated() && isAuthenticated().user;

	const loadAllUsers = () => {
		setLoading(true);
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
		getAllUsers(user._id, token).then((data) => {
			setLoading(true);

			if (data.error) {
				console.log(data.error);
			} else {
				setSelectedUser(
					data.filter((i) => i._id === props.match.params.userId) &&
						data.filter((i) => i._id === props.match.params.userId)[0]
				);
				setLoading(false);

				listScheduledOrders2(user._id, token, user._id).then((data2) => {
					setLoading(true);

					if (data2.error) {
						console.log(data2.error);
					} else {
						setHistOrders(
							data2.filter((ii) => ii.user._id === props.match.params.userId) &&
								data2
									.filter((ii) => ii.user._id === props.match.params.userId)
									.sort(compareTotalAppointments)
						);
						setLoading(false);
					}
				});
			}
		});
	};

	useEffect(() => {
		loadAllUsers();

		// eslint-disable-next-line
	}, []);

	function search(orders) {
		return orders.filter((row) => {
			var datesYaba = new Date(row.scheduledDate).toLocaleDateString();
			return (
				row.employees[0].employeeName.toLowerCase().indexOf(q) > -1 ||
				row.phone.toLowerCase().indexOf(q) > -1 ||
				datesYaba.toString().toLowerCase().indexOf(q) > -1 ||
				row._id.substring(0, 10).toString().toLowerCase().indexOf(q) > -1 ||
				row.scheduledByUserName.toString().toLowerCase().indexOf(q) > -1 ||
				row.scheduledByUserEmail.toString().toLowerCase().indexOf(q) > -1 ||
				row.status.toString().toLowerCase().indexOf(q) > -1 ||
				row.applyPoints.toString().toLowerCase().indexOf(q) > -1 ||
				row.transaction_id.toString().toLowerCase().indexOf(q) > -1 ||
				row.service.toString().toLowerCase().indexOf(q) > -1
			);
		});
	}

	const allApointmentDetails = () => {
		return (
			<Summary>
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
						placeholder='Search By Client Phone, Client Name, Stylist Name or Client Schedule Date'
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
							<th scope='col'>Barber Name</th>
							<th scope='col'>Customer Name</th>
							<th scope='col'>Customer Phone</th>
							<th scope='col'>Schedule DateTime</th>
							<th scope='col'>Booked On</th>
							<th scope='col'>Status</th>
							<th scope='col'>Service</th>
							<th scope='col'>Paid Tip</th>
							<th scope='col'>Service Price</th>
							<th scope='col'>Online Fee</th>
							<th scope='col'>Amount</th>
							<th scope='col'>Loyalty Points</th>
						</tr>
					</thead>

					<tbody>
						{search(HistOrders).map((s, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<Link
									to={`/admin/single-appointment-details/${s._id}/${
										s && s.employees && s.employees[0] && s.employees[0]._id
									}`}
								>
									{s.employees.map((e, ii) => (
										<div
											key={ii}
											className=' p-3 text-center'
											style={{border: "1px lightGrey solid"}}
										>
											{e.employeeName}
										</div>
									))}
								</Link>

								<td>{s.scheduledByUserName}</td>
								<td>{s.phone}</td>
								<td>
									{new Date(s.scheduledDate).toLocaleDateString()}{" "}
									{s.scheduledTime}
								</td>
								<td>{new Date(s.createdAt).toLocaleString()}</td>
								<td>{s.status}</td>

								<td>{s.service}</td>
								<td>{s.paidTip.toFixed(2)}</td>
								<td>{s.servicePrice}</td>
								<td>{s.onlineServicesFees}</td>
								<td>{s.amount.toFixed(2)}</td>
								<td>{s.applyPoints.toString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Summary>
		);
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
			HistOrders &&
			HistOrders.map((i) => {
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

	const customersSummary = () => {
		return (
			<CustomerSummaryWrapper className='col-md-8 mx-auto'>
				<div>
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
								userByAppointmentStatus().map((a, i) => {
									return (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>
												{" "}
												<Link
													to={`/admin/customer-reporting-appointments-by-user2/${a.ClientId}`}
												>
													{a.ClientName}
												</Link>{" "}
											</td>
											<td>{a.email}</td>
											<td>{a.AppointmentStatus}</td>
											<td>{a.count}</td>
											{a.AppointmentStatus.toLowerCase() === "cancelled" ? (
												<td>
													{a.role !== 0 ? (
														"Not a Client"
													) : a.activeUser ? (
														<select
															className='form-control'
															onChange={(e) =>
																handleStatusChange(e, a.ClientId)
															}
															style={{
																border: "#cfcfcf solid 1px",
																borderRadius: "10px",
																width: "100%",
																fontSize: "0.9rem",
																boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.1)",
															}}
														>
															<option value='1'>Active User</option>
															<option value='0'>Block User</option>
														</select>
													) : (
														<select
															className='form-control'
															onChange={(e) =>
																handleStatusChange(e, a.ClientId)
															}
															style={{
																border: "#cfcfcf solid 1px",
																borderRadius: "10px",
																width: "100%",
																fontSize: "0.9rem",
																boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.1)",
															}}
														>
															<option value='0'>Blocked User</option>
															<option value='1'>Activate User</option>
														</select>
													)}
												</td>
											) : null}
										</tr>
									);
								})}
						</thead>
					</table>
				</div>
			</CustomerSummaryWrapper>
		);
	};

	const handleStatusChange = (e, clientUserId) => {
		updateClientActivity(user._id, token, clientUserId, e.target.value).then(
			(data) => {
				if (data.error) {
					console.log("Status update failed");
				} else {
					window.scrollTo({top: 0, behavior: "smooth"});
					window.location.reload(false);
				}
			}
		);
	};

	return (
		<React.Fragment>
			{loading ? (
				<div>loading.....</div>
			) : (
				<React.Fragment>
					{user && user.role === 1 ? (
						<div className='mx-auto col-md-10 mt-5'>
							<Link
								style={{fontSize: "1.2rem", fontWeight: "bolder"}}
								to='/admin/dashboard?customer-reports'
							>
								Back to admin dashboard
							</Link>
						</div>
					) : null}
					<div
						className='card-header mt-4 col-lg-6 col-md-10  mx-auto'
						style={{
							textAlign: "center",
							boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.1)",
							fontWeight: "bold",
							letterSpacing: "2px",
							borderRadius: "20px",
							fontSize: "1.2rem",
						}}
					>
						Client "{selectedUser && selectedUser.name}" Report
					</div>
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
						{selectedUser && selectedUser.name} has registered on{" "}
						{new Date(selectedUser.createdAt).toDateString()} (
						{moment(selectedUser.createdAt).fromNow()})
					</div>
					<div
						className='card-header mt-4 col-lg-6 col-md-10  mx-auto'
						style={{
							textAlign: "center",
							boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.2)",
							fontWeight: "bold",
							letterSpacing: "2px",
							borderRadius: "20px",
							fontSize: "1rem",
						}}
					>
						Total Appointments Scheduled By {selectedUser.name} is{" "}
						{selectedUser &&
							selectedUser.history &&
							selectedUser.history.length}{" "}
						Appointments.
					</div>
					<div
						className='card-header mt-4 col-lg-6 col-md-10  mx-auto'
						style={{
							textAlign: "center",
							boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.2)",
							fontWeight: "bold",
							letterSpacing: "2px",
							borderRadius: "20px",
							fontSize: "1rem",
						}}
					>
						{selectedUser.name}'s Last Appointment was scheduled on{" "}
						{selectedUser &&
							selectedUser.history &&
							selectedUser.history[0] &&
							new Date(
								selectedUser.history[
									selectedUser.history.length - 1
								][0].scheduledDate
							).toDateString()}{" "}
					</div>
					<div className='mt-5'>{customersSummary()}</div>
					{allApointmentDetails()}
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default SingleUserReportPage2;

const Summary = styled.div`
	margin-right: 20px;
	margin-left: 20px;
	overflow-x: auto;
	@media (max-width: 1100px) {
		font-size: 0.5rem;
		margin-right: 5px;
		margin-left: 5px;
	}
`;

const CustomerSummaryWrapper = styled.div`
	overflow-x: auto;
`;
