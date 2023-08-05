/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import moment from "moment";
import styled from "styled-components";

import { Collapse } from "antd";
import {
	readSingleAppointment,
	getStatusValues,
	updateOrderStatus,
	updateOrderStylistComment,
	listScheduledOrders2,
} from "../../apiOwner";
import { isAuthenticated } from "../../../auth";
import UpdateAppointment from "./UpdateAppointment";

// eslint-disable-next-line
const { Panel } = Collapse;

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#2c2c2c",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "1.1rem",
			textAlign: "center",
			padding: "10px",
			color: "white",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			backgroundColor: "grey",
			padding: "10px",
			borderRadius: "5px",
			fontSize: "1rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "white",
		};
	}
};

const SingleAppointmentPage = (props) => {
	const [loading, setLoading] = useState(true);
	const [clickedMenu, setClickedMenu] = useState("Details");
	const [singleAppointment, setSingleAppointment] = useState({});
	const [statusValues, setStatusValues] = useState([]);
	//From here to update the Appointment
	const [stylistComment, setStylistComment] = useState("");
	const [orders, setOrders] = useState({});

	const { user, token } = isAuthenticated();

	const loadSingleOrder = (AppointmentId) => {
		setLoading(true);
		readSingleAppointment(user._id, token, AppointmentId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setSingleAppointment(data);

				setLoading(false);
			}
		});
	};

	const loadOrders2 = () => {
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
				setOrders(data.sort(compareTotalAppointments));
			}
		});
	};

	const ImageURLForAppointment =
		singleAppointment &&
		singleAppointment.scheduleAppointmentPhoto &&
		singleAppointment.scheduleAppointmentPhoto.length > 0 &&
		singleAppointment.scheduleAppointmentPhoto[0].images[0].url;

	const loadStatusValues = () => {
		getStatusValues(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setStatusValues(
					singleAppointment && singleAppointment.BookedFrom === "Store"
						? data.filter((i) => !i.includes("Online") || i === "Cancelled")
						: data.filter((i) => i.includes("Online") || i === "Cancelled")
				);
			}
		});
	};

	const handleStatusChange = (e, orderId) => {
		var updatedByUser =
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;

		updateOrderStatus(
			user._id,
			token,
			orderId,
			e.target.value,
			updatedByUser
		).then((data) => {
			if (data.error) {
				console.log("Status update failed");
			} else {
				window.scrollTo({ top: 0, behavior: "smooth" });
				window.location.reload(false);
			}
		});
	};

	const showStatus = (o) => (
		<React.Fragment>
			<div className='form-group'>
				<h3 className='' style={{ fontSize: "1.3rem" }}>
					Status:
					<div className='mt-2'>
						<strong
							style={{
								background:
									o.status === "Scheduled From Store / Paid" ||
									o.status === "Scheduled Online / Paid in Store"
										? "darkgreen"
										: "darkred",
								padding: "5px",
								color: "white",
							}}
						>
							{o.status}
						</strong>
					</div>
				</h3>
				<br />
				<select
					className='form-control'
					onChange={(e) => handleStatusChange(e, o._id)}
					style={{
						border: "#cfcfcf solid 1px",
						borderRadius: "10px",
						width: "100%",
						fontSize: "0.9rem",
						boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
					}}
				>
					<option>Update Status</option>
					{statusValues.map((status, index) => (
						<option key={index} value={status}>
							{status}
						</option>
					))}
				</select>
			</div>
		</React.Fragment>
	);

	useEffect(() => {
		const AppointmentId = props.match.params.AppointmentId;
		const employeeId = props.match.params.employeeId;
		loadSingleOrder(AppointmentId, employeeId);
		loadStatusValues();
		localStorage.removeItem("barber");
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		loadOrders2();
		// eslint-disable-next-line
	}, []);

	const relatedCustomersHistory = () => {
		var customersOrders =
			orders &&
			singleAppointment &&
			singleAppointment.user &&
			orders[0] &&
			orders.filter(
				(i) =>
					i.phone === singleAppointment.scheduledByUserEmail ||
					i.scheduledByUserEmail === singleAppointment.scheduledByUserEmail
			);

		return (
			<CustomersHistoryWrapper>
				<div className='col-md-12 mx-auto'>
					<h4 className='text-center'>Customer's History</h4>
					<table
						className='table table-bordered table-md-responsive table-hover table-striped'
						style={{ fontSize: "0.75rem" }}
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
								<th scope='col'>Receipt #</th>
								<th scope='col'>Service</th>
								<th scope='col'>Stylist Comment</th>
								<th scope='col'>Service Price</th>
								<th scope='col'>Amount</th>
								<th scope='col'>Loyalty Points</th>
							</tr>
						</thead>

						<tbody>
							{customersOrders &&
								customersOrders.map((s, i) => (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>{s.BookedFrom}</td>
										<Link
											to={`/store/admin/single-appointment-details/${s._id}/${
												s && s.employees && s.employees[0] && s.employees[0]._id
											}`}
										>
											{s.employees.map((e, ii) => (
												<div
													key={ii}
													className=' p-3 text-center'
													style={{ border: "1px lightGrey solid" }}
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
										<td>
											{s.transaction_id === null ||
											s.transaction_id === undefined ||
											s.transaction_id === ""
												? s._id.substring(0, 10)
												: s.transaction_id}
										</td>
										<td>{s.service}</td>
										<td>{s.commentsByStylist}</td>
										<td>{s.serviceDetails.servicePriceDiscount} EGP</td>
										<td>{s.amount.toFixed(2)} EGP</td>
										<td>{s.applyPoints.toString()}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</CustomersHistoryWrapper>
		);
	};

	const handleStylistComment = (event) => {
		setStylistComment(event.target.value);
	};

	const addStylistComment = (e, scheduleorderId) => {
		e.preventDefault();
		updateOrderStylistComment(
			user._id,
			token,
			scheduleorderId,
			stylistComment
		).then((data) => {
			if (data.error) {
				console.log("Status update failed");
			} else {
				window.scrollTo({ top: 0, behavior: "smooth" });
				window.location.reload(false);
			}
		});
	};

	return (
		<SingleAppointmentPageWrapper>
			{loading ? (
				<div>
					<div
						style={{
							fontSize: "2rem",
							textAlign: "center",
							marginTop: "50px",
							color: "darkslategray",
							fontWeight: "bold",
						}}
					>
						Loading...
					</div>
				</div>
			) : (
				<React.Fragment>
					<div className='row'>
						<div className='col-md-10 mt-3 mx-auto'>
							<Link
								to='/store/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								<div className='backToAdminDashboard'>
									<i className='fas fa-arrow-alt-circle-left mr-3'></i>
									Back to Admin Dashboard
								</div>
							</Link>
						</div>
						<div className='col-md-8 mx-auto mb-5'>
							<div
								className='mt-3'
								style={{
									border: "2px solid black",
									boxShadow: "4px 4px 2px 2px rgba(0,0,0,0.3)",
								}}
							>
								<div className='row my-3 text-center'>
									<div
										className='col-4'
										style={isActive(clickedMenu, "Details")}
										onClick={() => setClickedMenu("Details")}
									>
										Details
									</div>
									<div
										className='col-4'
										style={isActive(clickedMenu, "Update")}
										onClick={() => setClickedMenu("Update")}
									>
										Update
									</div>
									<div
										className='col-4'
										style={isActive(clickedMenu, "History")}
										onClick={() => setClickedMenu("History")}
									>
										Customer
									</div>
								</div>
								{clickedMenu === "Details" ? (
									<ul className='list-group my-3'>
										<li
											className='list-group-item mb-3 mx-3'
											style={{
												textAlign: "center",
												fontSize: "1.2rem",
												fontWeight: "bold",
												backgroundColor: "#2a0000",
												color: "white",
											}}
										>
											Stylist Name:{" "}
											{singleAppointment && singleAppointment.employees
												? singleAppointment.employees[0].employeeName
												: null}
										</li>
										{/* {Invoice(order)} */}
										<li className='list-group-item'>
											{showStatus(singleAppointment)}
										</li>

										<li className='list-group-item'>
											<strong>Booking Source:</strong>{" "}
											<span
												className='alert alert-info'
												style={{ fontWeight: "bold" }}
											>
												{singleAppointment &&
												singleAppointment.BookedFrom === "Store"
													? "Store (POS)"
													: singleAppointment.BookedFrom}
											</span>
										</li>

										<li className='list-group-item'>
											<strong>Loyalty Points Status:</strong>{" "}
											<span
												className='alert alert-info'
												style={{ fontWeight: "bold" }}
											>
												{singleAppointment.applyPoints.toString()}
											</span>
										</li>

										<div className='row mx-2' style={{ textAlign: "center" }}>
											<div className='col-md-4 col-6'>
												<li className='list-group-item'>
													Chosen Date:{" "}
													<span className='detailsAboutAppointment'>
														{new Date(
															singleAppointment.scheduledDate
														).toLocaleDateString()}
													</span>
												</li>
											</div>
											<div className='col-md-4 col-6'>
												<li className='list-group-item'>
													Appointment starts at:{" "}
													<span className='detailsAboutAppointment'>
														{singleAppointment.scheduledTime}
													</span>
												</li>
											</div>
											<div className='col-md-4 mt-3 col-6'>
												<li className='list-group-item'>
													Scheduled by Phone:
													<span className='detailsAboutAppointment'>
														{singleAppointment.phone}
													</span>
												</li>
											</div>
											<div className='col-md-4 mt-3 col-6'>
												<li className='list-group-item'>
													Scheduled by:
													<span className='detailsAboutAppointment'>
														{singleAppointment.scheduledByUserName}
													</span>
												</li>
											</div>
											<div className='col-md-4 mt-3 col-6'>
												<li className='list-group-item'>
													Chosen Service:{" "}
													{singleAppointment.employeeAvailability &&
														singleAppointment.employeeAvailability
															.servicesPicked &&
														singleAppointment.employeeAvailability
															.servicesPicked[0] &&
														singleAppointment.employeeAvailability.servicesPicked.map(
															(s, i) => {
																return (
																	<span
																		key={i}
																		className='detailsAboutAppointment mr-3'
																	>
																		/ {s.serviceNameOtherLanguage}
																	</span>
																);
															}
														)}
												</li>
											</div>

											<div className='col-md-4 mt-3 col-6'>
												<li className='list-group-item'>
													Receipt Number / Invoice Number:{" "}
													<span className='detailsAboutAppointment'>
														{singleAppointment.transaction_id === null ||
														singleAppointment.transaction_id === undefined ||
														singleAppointment.transaction_id === ""
															? singleAppointment._id.substring(0, 10)
															: singleAppointment.transaction_id}
													</span>
												</li>
											</div>

											{/* <div className='col-md-4 mt-3 col-6'>
											<li className='list-group-item'>
												Scheduled by Email:
												<span className='detailsAboutAppointment'>
													{singleAppointment.scheduledByUserEmail}
												</span>
											</li>
										</div> */}

											<div className='col-md-4 mt-3 col-6'>
												<li className='list-group-item'>
													Booked On:{" "}
													<span className='detailsAboutAppointment'>
														{new Date(
															singleAppointment.createdAt
														).toLocaleDateString()}{" "}
														({moment(singleAppointment.createdAt).fromNow()})
													</span>
												</li>
											</div>
											<div className='col-md-2 mt-3 col-6'>
												<li className='list-group-item'>
													Service Price:
													<span className='detailsAboutAppointment'>
														{singleAppointment.servicePrice} EGP
													</span>
												</li>
											</div>
											<div className='col-md-2 mt-3 col-6'>
												<li className='list-group-item'>
													Paid Tip: {"  "}
													<span className='detailsAboutAppointment'>
														{singleAppointment.paidTip.toFixed(2)} EGP
													</span>
												</li>
											</div>
											<div className='col-md-3 mt-3 col-6'>
												<li className='list-group-item'>
													Online Service Fee:{"  "}
													<span className='detailsAboutAppointment'>
														{singleAppointment.onlineServicesFees} EGP
													</span>
												</li>
											</div>
											<div className='col-md-10 mx-auto mt-3 col-12'>
												<li
													className='list-group-item'
													style={{ fontSize: "1.4rem", fontWeight: "bolder" }}
												>
													Paid Amount:{"  "}
													<span
														className='detailsAboutAppointment'
														style={{ fontSize: "1.4rem" }}
													>
														<strong>{singleAppointment.amount} EGP</strong>
													</span>
												</li>
											</div>
											<div className='col-md-7  mt-3 mx-auto col-6'>
												<li className='list-group-item'>
													Discounted Amount:{"  "}
													<span className='detailsAboutAppointment'>
														{singleAppointment.discountedAmount &&
														singleAppointment.discountedAmount !== 0
															? singleAppointment.discountedAmount.toFixed(2) +
															  "    " +
															  `(${singleAppointment.discountedPercentage}%)`
															: 0}{" "}
														{""} EGP
													</span>
												</li>
											</div>
											{singleAppointment &&
											singleAppointment.BookedFrom &&
											singleAppointment.BookedFrom === "Store" ? null : (
												<>
													<div className='col-md-6 mt-3'>
														<li
															className='list-group-item'
															style={{
																fontWeight: "bold",
																letterSpacing: "7px",
															}}
														>
															Attached Image:{"  "}
															<img
																alt='User has not attached...'
																src={ImageURLForAppointment}
																style={{
																	height: "400px",
																	width: "400px",
																	marginTop: "10px",
																}}
															/>
														</li>
													</div>
													<div className='col-md-4 my-auto mx-auto'>
														<li
															className='list-group-item'
															style={{
																fontWeight: "bold",
																letterSpacing: "7px",
															}}
														>
															Customer's Comment:
															<br />
															<br />
															<span style={{ letterSpacing: "2px" }}>
																{" "}
																{singleAppointment &&
																singleAppointment.appointmentComment
																	? singleAppointment.appointmentComment
																	: "No Comment was Added By The Customer For This Appointment"}
															</span>
														</li>
													</div>
												</>
											)}

											<div className='col-md-8 my-5 mx-auto'>
												<li
													className='list-group-item'
													style={{ fontWeight: "bold", letterSpacing: "7px" }}
												>
													Stylist Comment:
													<br />
													<br />
													<span style={{ letterSpacing: "2px" }}>
														{" "}
														{singleAppointment &&
														singleAppointment.commentsByStylist
															? singleAppointment.commentsByStylist
															: "No Comment was Added By The Stylist For This Appointment"}
													</span>
												</li>
												<div className='mt-3 mb-2'>
													Add A Comment For This Appointment About the Client
													<textarea
														type='text'
														className='form-control'
														value={stylistComment}
														onChange={handleStylistComment}
														placeholder='e.g. This client had a haircut on 2 and beardcut on 4, he/she works at x, etc...'
													/>
												</div>
												<button
													className='btn btn-primary'
													onClick={(e) =>
														addStylistComment(
															e,
															singleAppointment && singleAppointment._id
														)
													}
												>
													Add Comment
												</button>
											</div>
										</div>
									</ul>
								) : null}

								<br />
								{clickedMenu === "Update" ? (
									<>
										<UpdateAppointment singleAppointment={singleAppointment} />
									</>
								) : null}
							</div>
						</div>
					</div>
				</React.Fragment>
			)}

			{clickedMenu === "History" ? <>{relatedCustomersHistory()}</> : null}
		</SingleAppointmentPageWrapper>
	);
};

export default SingleAppointmentPage;

const SingleAppointmentPageWrapper = styled.div`
	@media (max-width: 1200px) {
		.backToAdminDashboard {
			width: 90% !important;
			text-align: center;
		}
	}
`;

const CustomersHistoryWrapper = styled.div`
	overflow-x: auto;
`;
