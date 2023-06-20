/** @format */

// eslint-disable-next-line
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {listScheduledOrders3} from "./apiStylist";
import styled from "styled-components";
import StylistBackground from "./StylistMenu/StylistBackground";
import StylistSidebar from "./StylistMenu/StylistSidebar";
import {isAuthenticated} from "../auth";
import SummaryTables from "./SummaryTables";
import {readByPhone} from "../apiCore";

const ShopReportingExtension = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const [HistOrders, setHistOrders] = useState([]);

	// eslint-disable-next-line
	const [employee, setEmployee] = useState([]);
	const [dateIncrement, setDateIncrement] = useState(0);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);

	const [q, setQ] = useState("");

	var requiredDate = new Date();
	requiredDate.setDate(requiredDate.getDate() + dateIncrement);

	// eslint-disable-next-line
	const adminName = isAuthenticated() && isAuthenticated().user.name;
	const token = isAuthenticated().token;
	const user = isAuthenticated() && isAuthenticated().user;

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

							setHistOrders(ordersModified.sort(compareTotalAppointments));

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
				row.service.toString().toLowerCase().indexOf(q) > -1 ||
				row.transaction_id.toString().toLowerCase().indexOf(q) > -1
			);
		});
	}

	var reportChosenDateSchedules =
		HistOrders &&
		HistOrders.filter(
			(e) =>
				new Date(requiredDate).toDateString() ===
					new Date(e.scheduledDate).toDateString() &&
				new Date(requiredDate).getFullYear() ===
					new Date(e.scheduledDate).getFullYear()
		);

	const TodaysoverAllRevenueSum = () => {
		var allAmounts = reportChosenDateSchedules.map((revenue) => revenue.amount);
		var sum = allAmounts.reduce((a, b) => {
			return a + b;
		}, 0);
		return sum
			.toFixed(2)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	const TodaystransactionFeesSum = () => {
		var allTransactionFees = reportChosenDateSchedules
			.filter((revenue) => revenue.status !== "Cancelled")
			.map((ii) => ii.onlineServicesFees);
		var sum = allTransactionFees.reduce((a, b) => {
			return a + b;
		}, 0);
		return sum
			.toFixed(2)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	const TodaysoverAllPaidTip = () => {
		var allPaidTips = reportChosenDateSchedules
			.filter((revenue) => revenue.status !== "Cancelled")
			.map((i) => i.paidTip);
		var sum = allPaidTips.reduce((a, b) => {
			return a + b;
		}, 0);
		return sum
			.toFixed(2)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	const cancelledAppointmentsDollarValue = () => {
		var allCancelledAppointmentsRevenue = reportChosenDateSchedules
			.filter((revenue) => revenue.status === "Cancelled")
			.map((ii) => ii.amount);
		var sum = allCancelledAppointmentsRevenue.reduce((a, b) => {
			return a + b;
		}, 0);
		return sum
			.toFixed(2)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	// eslint-disable-next-line
	const TodaysBarberShopPureRevenue = () => {
		var allAmounts = reportChosenDateSchedules.map((a) => a.amount);
		var allPaidTips = reportChosenDateSchedules
			.filter((c) => c.status !== "Cancelled")
			.map((ii) => ii.paidTip);
		var AllCancelled = reportChosenDateSchedules
			.filter((c) => c.status === "Cancelled")
			.map((ii) => ii.amount);

		var onlineServicesFees = reportChosenDateSchedules
			.filter((revenue) => revenue.status !== "Cancelled")
			.map((ii) => ii.onlineServicesFees);

		var sum1 = allAmounts.reduce((a, b) => {
			return a + b;
		}, 0);
		var sum2 = AllCancelled.reduce((a, b) => {
			return a + b;
		}, 0);

		var sum3 = allPaidTips.reduce((a, b) => {
			return a + b;
		}, 0);

		var sum4 = onlineServicesFees.reduce((a, b) => {
			return a + b;
		}, 0);

		var OverAllProfit = sum1 + sum4 - sum3 - sum2;

		return OverAllProfit.toFixed(2)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const NotCancelledOrders =
		HistOrders &&
		HistOrders.filter((i) => i.status.toLowerCase() !== "cancelled");

	const CancelledOrders =
		HistOrders &&
		HistOrders.filter((i) => i.status.toLowerCase() === "cancelled");

	const aggregatedArray =
		NotCancelledOrders &&
		NotCancelledOrders.reduce((result, current) => {
			const existingItem = result.find(
				(item) =>
					new Date(item.scheduleStartsAtModified).toLocaleDateString() ===
					new Date(current.scheduleStartsAtModified).toLocaleDateString()
			);

			if (existingItem) {
				existingItem.amount += current.amount;
				existingItem.servicePrice += current.servicePrice;
				existingItem.paidTip += current.paidTip;
				existingItem.onlineServicesFees += current.onlineServicesFees;
				existingItem.reservationsCount += 1;
			} else {
				result.push({
					scheduleStartsAtModified: current.scheduleStartsAtModified,
					amount: current.amount,
					servicePrice: current.servicePrice,
					paidTip: current.paidTip,
					onlineServicesFees: current.onlineServicesFees,
					reservationsCount: 1,
				});
			}

			return result;
		}, []);

	const sortedArray =
		aggregatedArray &&
		aggregatedArray.sort((a, b) => {
			const dateA = new Date(a.scheduleStartsAtModified);
			const dateB = new Date(b.scheduleStartsAtModified);
			return dateB - dateA; // Sort in descending order
		});

	const aggregatedArrayCancelled =
		CancelledOrders &&
		CancelledOrders.reduce((result, current) => {
			const existingItem = result.find(
				(item) =>
					new Date(item.scheduleStartsAtModified).toLocaleDateString() ===
					new Date(current.scheduleStartsAtModified).toLocaleDateString()
			);

			if (existingItem) {
				existingItem.amount += current.amount;
				existingItem.servicePrice += current.servicePrice;
				existingItem.paidTip += current.paidTip;
				existingItem.onlineServicesFees += current.onlineServicesFees;
				existingItem.reservationsCount += 1;
			} else {
				result.push({
					scheduleStartsAtModified: current.scheduleStartsAtModified,
					amount: current.amount,
					servicePrice: current.servicePrice,
					paidTip: current.paidTip,
					onlineServicesFees: current.onlineServicesFees,
					reservationsCount: 1,
				});
			}

			return result;
		}, []);

	const sortedArrayCancelled =
		aggregatedArrayCancelled &&
		aggregatedArrayCancelled.sort((a, b) => {
			const dateA = new Date(a.scheduleStartsAtModified);
			const dateB = new Date(b.scheduleStartsAtModified);
			return dateB - dateA; // Sort in descending order
		});

	const allApointmentDetails = () => {
		return (
			<Summary>
				<hr />
				<br />
				<SummaryTables
					sortedArray={sortedArray}
					sortedArrayCancelled={sortedArrayCancelled}
				/>

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
						maxHeight: "800px",
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
				</div>
			</Summary>
		);
	};

	return (
		<ShopReport>
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
				Hello {adminName}
			</h4>
			<br />
			<br />
			<div
				style={{
					border: "solid 3px black",
					borderRadius: "15px",
					marginRight: "50px",
					marginLeft: "50px",
					boxShadow: "3px 4px 4px 10px rgb(0,0,0,0.2)",
				}}
			>
				<i
					style={{fontSize: "1.4rem", fontWeight: "bold"}}
					onClick={() => setDateIncrement(dateIncrement - 1)}
					className='fas fa-angle-double-left pt-3 pl-5 arrows'
				></i>
				<span onClick={() => setDateIncrement(0)} className='resetToToday'>
					Today
				</span>
				<i
					onClick={() => setDateIncrement(dateIncrement + 1)}
					style={{fontSize: "1.4rem", fontWeight: "bold"}}
					className='fas fa-angle-double-right pt-3 pr-5 float-right arrows'
				></i>

				<h5
					className='card-header my-5 col-lg-6 col-md-10  mx-auto'
					style={{
						textAlign: "center",
						boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.5)",
						fontWeight: "bold",
						// letterSpacing: "2px",
						borderRadius: "20px",
						fontSize: "1rem",
					}}
				>
					EGP Values for {reportChosenDateSchedules.length} Appointments in (
					{new Date(requiredDate).toDateString()}):
				</h5>

				<div className='col-md-10 mx-auto my-5'>
					<div className='row mt-5'>
						<div className='col-lg-3 mx-auto col-md-6  mb-4'>
							<div className='card'>
								<div className='card-header text-center mx-2 cardHeader'>
									Overall Revenue
								</div>
								<div className='card-body text-center'>
									<strong>{TodaysoverAllRevenueSum()} EGP</strong>
								</div>
							</div>
						</div>
						<div className='col-lg-3 mx-auto col-md-6'>
							<div className='card'>
								<div className='card-header text-center mx-2 cardHeader'>
									Cancelled Appoint. Revenue
								</div>
								<div className='card-body text-center'>
									<strong>{cancelledAppointmentsDollarValue()} EGP</strong>
								</div>
							</div>
						</div>
						<div className='col-lg-3 mx-auto col-md-6'>
							<div className='card'>
								<div className='card-header text-center mx-2 cardHeader'>
									Online Services Fee
								</div>
								<div className='card-body text-center'>
									<strong>{TodaystransactionFeesSum()} EGP</strong>
								</div>
							</div>
						</div>
						<div className='col-lg-3 mx-auto col-md-6'>
							<div className='card'>
								<div className='card-header text-center mx-2 cardHeader'>
									Overall Paid Tips
								</div>
								<div className='card-body text-center'>
									<strong>{TodaysoverAllPaidTip()} EGP</strong>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{allApointmentDetails()}
		</ShopReport>
	);
};

export default ShopReportingExtension;

const ShopReport = styled.div`
	overflow: hidden;

	.card {
		box-shadow: 2px 2px 2px 5px rgba(0, 0, 0, 0.1);
		transition: 0.3s;
		font-weight: bold;
		font-size: 1.2rem;
	}

	.cardHeader {
		background-color: #000e1c;
		color: wheat;
		font-size: 1.1rem;
		box-shadow: 2px 2px 2px 5px rgba(0, 0, 0, 0.2);
	}
	.cardHeader:hover {
		color: white;
	}

	.cardHeader2 {
		background-color: black;
		color: white;
		box-shadow: 2px 2px 2px 5px rgba(0, 0, 0, 0.2);
	}
	.cardHeader2:hover {
		color: white;
	}

	.card:hover {
		background-color: #00284f !important;
		transition: 0.3s;
		box-shadow: 2px 2px 2px 5px rgba(0, 0, 0, 0.4);
		color: white;
		padding: 10px;
	}
	.arrows:hover {
		cursor: pointer;
		transition: 0.3s;
		color: blue;
		font-size: 1.6rem !important;
	}
	.resetToToday {
		font-size: 1.2rem;
		font-weight: bold;
		background-color: darkslategray;
		position: absolute;
		left: 50%;
		top: 34%;
		color: white;
		padding: 5px;
		border-radius: 15px;
		/* right: 50%; */
	}
	.resetToToday:hover {
		cursor: pointer;
		transition: 0.3s;
		background-color: black;
		font-size: 1.3rem !important;
	}

	@media (max-width: 760px) {
		.employeesBarChart {
			width: 90%;
		}
		.resetToToday {
			left: 45%;
			top: 31%;
			font-size: 1rem;
		}
		.cardHeader {
			background-color: #000e1c;
			color: wheat;
			font-size: 0.8rem;
			box-shadow: 2px 2px 2px 5px rgba(0, 0, 0, 0.2);
		}
	}
`;

const Summary = styled.div`
	margin-right: 20px;
	margin-left: 20px;
	margin-top: 80px;
	margin-bottom: 100px;
	@media (max-width: 1100px) {
		font-size: 0.5rem;
		margin-right: 5px;
		margin-left: 5px;
	}
`;
