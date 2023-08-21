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
} from "../../Owners/apiOwner";
import { isAuthenticated } from "../../auth";
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

const isActive2 = (history, path) => {
	if (history === path) {
		return {
			background: "#0f377e",
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
			backgroundColor: "white",
			padding: "10px",
			borderRadius: "5px",
			fontSize: "1.1rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
		};
	}
};

const SingleAppointmentPageStoreArabic = ({ props }) => {
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
				setStatusValues(data);
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
					حالة دفع الحجز:
					<div className='mt-2'>
						<strong
							style={{
								background: o.status === "Paid" ? "darkgreen" : "darkred",
								padding: "5px",
								color: "white",
							}}
						>
							{o.status === "Paid"
								? "مدفوع"
								: o.status === "Not Paid"
								? "غير مدفوع"
								: o.status === "Cancelled"
								? "ملغى"
								: o.status}
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
					<option>تحديث الحالة</option>
					{statusValues.map((status, index) => (
						<option key={index} value={status}>
							{status === "Paid"
								? "مدفوع"
								: status === "Not Paid"
								? "غير مدفوع"
								: status === "Cancelled"
								? "ملغى"
								: status}
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
								<th scope='col'>مكان الحجز</th>
								<th scope='col'>اسم الحلاق</th>
								<th scope='col'>اسم العميل</th>
								<th scope='col'>هاتف العميل</th>
								<th scope='col'>توقيت الحجز</th>
								<th scope='col'>تاريخ الحجز</th>
								<th scope='col'>الحالة</th>
								<th scope='col'>رقم الإيصال</th>
								<th scope='col'>الخدمة</th>
								<th scope='col'>تعليق الحلاق</th>
								<th scope='col'>سعر الخدمة</th>
								<th scope='col'>المبلغ</th>
								<th scope='col'>نقاط الولاء</th>
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
		<SingleAppointmentPageStoreArabicWrapper dir='rtl'>
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
					<div
						className='row mx-auto text-center mb-3 mt-3 col-md-10'
						dir='rtl'
					>
						<div
							dir='rtl'
							className='col-md-4 col-4 mx-auto menuItems'
							style={isActive2(clickedMenu, "NewAppointment")}
							onClick={() => setClickedMenu("NewAppointment")}
						>
							<Link
								style={isActive2(clickedMenu, "NewAppointment")}
								to='/store/book-appointment-from-store?new-appointments'
							>
								<i className='fa-brands fa-servicestack mr-1'></i> حجز جديد
							</Link>
						</div>

						<div
							className='col-md-4 col-4 mx-auto menuItems'
							style={isActive2(clickedMenu, "OverAllCalendar")}
							onClick={() => setClickedMenu("OverAllCalendar")}
						>
							<Link
								style={isActive2(clickedMenu, "OverAllCalendar")}
								to='/store/book-appointment-from-store?overall-calendar'
							>
								<i className='fa-brands fa-servicestack mr-1'></i>
								قائمة الحجز
							</Link>
						</div>
						<div
							className='col-md-4 col-4 mx-auto menuItems'
							style={isActive2(clickedMenu, "TableView")}
							onClick={() => setClickedMenu("TableView")}
						>
							<Link
								style={isActive2(clickedMenu, "TableView")}
								to='/store/book-appointment-from-store?table-view'
							>
								<i className='fa-brands fa-servicestack mr-1'></i>
								الكاشير
							</Link>
						</div>
					</div>
					<div className='row'>
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
										التفاصيل
									</div>
									<div
										className='col-4'
										style={isActive(clickedMenu, "Update")}
										onClick={() => setClickedMenu("Update")}
									>
										تحديث
									</div>
									<div
										className='col-4'
										style={isActive(clickedMenu, "History")}
										onClick={() => setClickedMenu("History")}
									>
										العميل
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
											<strong>مصدر الحجز:</strong>{" "}
											<span
												className='alert alert-info'
												style={{ fontWeight: "bold" }}
											>
												{singleAppointment &&
												singleAppointment.BookedFrom === "Store"
													? "المتجر (نقطة البيع)"
													: singleAppointment.BookedFrom}
											</span>
										</li>

										<li className='list-group-item'>
											<strong>حالة نقاط الولاء:</strong>{" "}
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
													التاريخ المختار:{" "}
													<span className='detailsAboutAppointment'>
														{new Date(
															singleAppointment.scheduledDate
														).toLocaleDateString()}
													</span>
												</li>
											</div>
											<div className='col-md-4 col-6'>
												<li className='list-group-item'>
													بدء الموعد في:{" "}
													<span className='detailsAboutAppointment'>
														{singleAppointment.scheduledTime}
													</span>
												</li>
											</div>
											<div className='col-md-4 mt-3 col-6'>
												<li className='list-group-item'>
													هاتف العميل:
													<span className='detailsAboutAppointment'>
														{singleAppointment.phone}
													</span>
												</li>
											</div>
											<div className='col-md-4 mt-3 col-6'>
												<li className='list-group-item'>
													اسم العميل:
													<span className='detailsAboutAppointment'>
														{singleAppointment.scheduledByUserName}
													</span>
												</li>
											</div>
											<div className='col-md-4 mt-3 col-6'>
												<li className='list-group-item'>
													الخدمات:{" "}
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
													رقم الإيصال / رقم الفاتورة:{" "}
													<span className='detailsAboutAppointment'>
														{singleAppointment.transaction_id === null ||
														singleAppointment.transaction_id === undefined ||
														singleAppointment.transaction_id === ""
															? singleAppointment._id.substring(0, 10)
															: singleAppointment.transaction_id}
													</span>
												</li>
											</div>
											<div className='col-md-4 mt-3 col-6'>
												<li className='list-group-item'>
													تاريخ الحجز:{" "}
													<span className='detailsAboutAppointment'>
														{new Date(
															singleAppointment.createdAt
														).toLocaleDateString("ar-EG")}{" "}
														({moment(singleAppointment.createdAt).fromNow()})
													</span>
												</li>
											</div>
											<div className='col-md-2 mt-3 col-6'>
												<li className='list-group-item'>
													سعر الخدمة:
													<span className='detailsAboutAppointment'>
														{singleAppointment.servicePrice} جنيه مصري
													</span>
												</li>
											</div>
											<div className='col-md-2 mt-3 col-6'>
												<li className='list-group-item'>
													البقشيش المدفوع: {"  "}
													<span className='detailsAboutAppointment'>
														{singleAppointment.paidTip.toFixed(2)} جنيه مصري
													</span>
												</li>
											</div>
											<div className='col-md-3 mt-3 col-6'>
												<li className='list-group-item'>
													رسوم الخدمة عبر الإنترنت:{"  "}
													<span className='detailsAboutAppointment'>
														{singleAppointment.onlineServicesFees} جنيه مصري
													</span>
												</li>
											</div>
											<div className='col-md-10 mx-auto mt-3 col-12'>
												<li
													className='list-group-item'
													style={{ fontSize: "1.4rem", fontWeight: "bolder" }}
												>
													المبلغ المدفوع:{"  "}
													<span
														className='detailsAboutAppointment'
														style={{ fontSize: "1.4rem" }}
													>
														<strong>
															{singleAppointment.amount} جنيه مصري
														</strong>
													</span>
												</li>
											</div>
											<div className='col-md-7 mt-3 mx-auto col-6'>
												<li className='list-group-item'>
													المبلغ المخصوم:{"  "}
													<span className='detailsAboutAppointment'>
														{singleAppointment.discountedAmount &&
														singleAppointment.discountedAmount !== 0
															? singleAppointment.discountedAmount.toFixed(2) +
															  "    " +
															  `(${singleAppointment.discountedPercentage}%)`
															: 0}{" "}
														{""} جنيه مصري
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
															}}
														>
															الصورة المرفقة:{"  "}
															<img
																alt='لم يتم إرفاق صورة من قبل المستخدم...'
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
															}}
														>
															تعليق العميل:
															<br />
															<br />
															<span>
																{" "}
																{singleAppointment &&
																singleAppointment.appointmentComment
																	? singleAppointment.appointmentComment
																	: "لم يتم إضافة تعليق من العميل لهذا الموعد"}
															</span>
														</li>
													</div>
												</>
											)}

											<div className='col-md-8 my-5 mx-auto'>
												<li
													className='list-group-item'
													style={{ fontWeight: "bold" }}
												>
													تعليق الحلاق:
													<br />
													<br />
													<span>
														{" "}
														{singleAppointment &&
														singleAppointment.commentsByStylist
															? singleAppointment.commentsByStylist
															: "لم يتم إضافة تعليق من قبل الحلاق لهذا الموعد"}
													</span>
												</li>
												<div className='mt-3 mb-2'>
													أضف تعليقًا لهذا الموعد حول العميل
													<textarea
														type='text'
														className='form-control'
														value={stylistComment}
														onChange={handleStylistComment}
														placeholder='مثلًا: قام هذا العميل بقص الشعر على 2 وقص اللحية على 4 ، وهو / هي يعمل في x ، إلخ...'
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
													أضف تعليق
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
		</SingleAppointmentPageStoreArabicWrapper>
	);
};

export default SingleAppointmentPageStoreArabic;

const SingleAppointmentPageStoreArabicWrapper = styled.div`
	text-align: right;

	@media (max-width: 1200px) {
		.backToAdminDashboard {
			width: 90% !important;
			text-align: center;
		}

		.menuItems {
			font-size: 13px !important;
			padding: 2px !important;
			width: 100% !important;
		}

		.menuItems > a {
			font-size: 13px !important;
			padding: 2px !important;
			width: 100% !important;
		}
	}
`;

const CustomersHistoryWrapper = styled.div`
	overflow-x: auto;
`;
