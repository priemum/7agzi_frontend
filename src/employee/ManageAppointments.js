/** @format */

import React, {useState, useEffect} from "react";
import styled from "styled-components";
// import ReactGA from "react-ga";
import {Link} from "react-router-dom";
import {listScheduledOrders3} from "./apiStylist";
import StylistCalendar from "./StylistCalendar";
// import StylistSideBar from "./StylistSideBar";
import StylistBackground from "./StylistMenu/StylistBackground";
import StylistSidebar from "./StylistMenu/StylistSidebar";
import {isAuthenticated} from "../auth";
import {readByPhone} from "../apiCore";

const ManageAppointments = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const [orders, setOrders] = useState([]);

	// eslint-disable-next-line
	const [employee, setEmployee] = useState("");
	const [loading, setLoading] = useState(true);
	const [q, setQ] = useState("");
	const {user, token} = isAuthenticated();

	const loadOrders = () => {
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

		readByPhone(user.phone).then((data1) => {
			if (data1.error) {
				console.log(data1.error);
			} else {
				setEmployee(data1);

				listScheduledOrders3(user._id, token, data1.belongsTo._id).then(
					(data) => {
						if (data.error) {
							console.log(data.error);
						} else {
							const ordersModified = data.map((i) => {
								return {
									...i,
									scheduleStartsAtModified: new Date(
										i.scheduleStartsAt
									).toLocaleDateString(),
								};
							});

							setOrders(ordersModified.sort(compareTotalAppointments));

							setLoading(false);
						}
					}
				);
			}
		});
	};

	useEffect(() => {
		loadOrders();
		// eslint-disable-next-line
	}, []);

	const showOrdersLength = () => {
		if (orders && orders.length > 0) {
			return (
				<ShowOrderLength>
					<h3 className='overall-schedules1'>
						Overall schedules for all stylists: {orders && orders.length}{" "}
						Appointments
					</h3>
				</ShowOrderLength>
			);
		} else {
			return <h1 className='text-danger'>No Schedules</h1>;
		}
	};

	console.log(employee, "employee");

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
				// row.BookedFrom.toString().toLowerCase().indexOf(q) > -1 ||
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
				<div
					style={{
						maxHeight: "700px",
						overflow: "auto",
					}}
				>
					<table
						className='table table-bordered table-md-responsive table-hover table-striped'
						style={{fontSize: "0.75rem"}}
					>
						<thead className='thead-light'>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Booking Loc.</th>
								<th scope='col'>Barber Name</th>
								<th scope='col'>Customer Name</th>
								<th scope='col'>Customer Phone</th>
								<th scope='col'>Schedule DateTime</th>
								<th scope='col'>Booked On</th>
								<th scope='col'>Status</th>
								{/* <th scope='col'>Receipt #</th> */}
								<th scope='col'>Service</th>
								<th scope='col'>Paid Tip</th>
								<th scope='col'>Service Price</th>
								<th scope='col'>Online Fee</th>
								<th scope='col'>Amount</th>
								<th scope='col'>Loyalty Points</th>
							</tr>
						</thead>

						<tbody>
							{search(orders).map((s, i) => (
								<tr
									key={i}
									style={{
										background:
											s.status === "Cancelled"
												? "darkred"
												: s.status.includes("Not Paid")
												? ""
												: s.status.includes("Paid")
												? "lightgreen"
												: "",
										color:
											s.status === "Cancelled"
												? "white"
												: s.status.includes("Not Paid")
												? ""
												: s.status.includes("Paid")
												? "black"
												: "",
									}}
								>
									<td>{i + 1}</td>
									<td>{s.BookedFrom}</td>
									<Link
										to={`/employee/single-appointment-details/${s._id}/${
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
									{/* <td>
										{s.transaction_id === null ||
										s.transaction_id === undefined ||
										s.transaction_id === ""
											? s._id.substring(0, 10)
											: s.transaction_id}
									</td> */}
									<td>{s.service}</td>
									<td>{Number(s.paidTip).toFixed(2)}</td>
									<td>{s.servicePrice}</td>
									<td>{s.onlineServicesFees}</td>
									<td>{Number(s.amount).toFixed(2)}</td>
									<td>{s.applyPoints.toString()}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Summary>
		);
	};

	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	return (
		<FinalDiv>
			{loading ? (
				<div
					style={{
						fontSize: "2rem",
						textAlign: "center",
						marginTop: "100px",
						fontWeight: "bold",
					}}
				>
					Loading
				</div>
			) : (
				<React.Fragment>
					{click2 && clickMenu2 ? (
						<StylistBackground
							setClick2={setClick2}
							setClickMenu2={setClickMenu2}
						/>
					) : null}
					<div className='mx-auto'>
						<StylistSidebar
							click2={click2}
							setClick2={setClick2}
							clickMenu2={clickMenu2}
							setClickMenu2={setClickMenu2}
						/>
					</div>
					<h4
						className='card-header mt-4 col-lg-6 col-md-10  mx-auto'
						style={{
							textAlign: "center",
							boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.5)",
							fontWeight: "bold",
							// letterSpacing: "2px",
							borderRadius: "20px",
						}}
					>
						Welcome back to your dashboard {user.name}
					</h4>
					<StylistCalendar />
					{showOrdersLength()}
					{allApointmentDetails()}
				</React.Fragment>
			)}
		</FinalDiv>
	);
};

export default ManageAppointments;

const FinalDiv = styled.div`
	overflow-x: auto;
	margin-bottom: 100px;
	.fa-angle-left:hover {
		cursor: pointer;
		font-size: 1.8rem;
		transition: var(--mainTransition);
	}
	.fa-angle-left {
		transition: var(--mainTransition);
	}

	.fa-angle-right:hover {
		cursor: pointer;
		font-size: 1.8rem;
		transition: var(--mainTransition);
		color: darkgoldenrod;
	}
	.fa-angle-right {
		transition: var(--mainTransition);
	}
	.EmployeesLinks:hover {
		text-decoration: underline;
	}
`;

const ShowOrderLength = styled.div`
	margin-top: 50px;
	.overall-schedules1 {
		font-style: italic;
		font-size: 1.5rem;
		text-align: center;
		font-weight: bold;
		margin-top: 30px;
		background-color: var(--primaryColor);
		padding: 7px;
		border-radius: 20px;
		color: white;
		margin-right: 400px;
		margin-left: 400px;
		border: 2px solid black;
		box-shadow: 3px 2px 2px 2px rgb(0, 0, 0, 0.3);
	}

	@media (max-width: 1100px) {
		.overall-schedules1 {
			margin-left: 10px;
			margin-right: 10px;
			margin-top: 10px;
			margin-bottom: 5px;
			font-size: 1rem;
		}
	}
`;

const Summary = styled.div`
	overflow-x: auto;

	margin-right: 20px;
	margin-left: 20px;
	@media (max-width: 1100px) {
		font-size: 0.5rem;
		margin-right: 5px;
		margin-left: 5px;
	}
`;
