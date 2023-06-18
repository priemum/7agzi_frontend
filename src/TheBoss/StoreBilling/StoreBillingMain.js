import React, {useEffect, useState} from "react";
import styled from "styled-components";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import {
	allLoyaltyPointsAndStoreStatus,
	listScheduledOrdersForTheBoss,
	listScheduledOrdersForTheBossNotPaid,
	schedulesNotPaid,
} from "../apiBoss";
import {isAuthenticated} from "../../auth";
import {getBraintreeClientToken} from "../../apiCore";
import SingleBillingForm from "./SingleBillingForm";

//DreamProject2023!

const StoreBillingMain = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const [loading, setLoading] = useState(true);
	const [storeProperties, setStoreProperties] = useState([]);
	const [allAppointments, setAllAppointments] = useState([]);
	const [allAppointmentsNotPaid, setAllAppointmentsNotPaid] = useState([]);
	const [chosenStore, setChosenStore] = useState("");
	const [detailsSchedules, setDetailsSchedules] = useState("");

	//For Payment Retriggering
	const [data, setData] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {},
	});

	// eslint-disable-next-line
	const {token, user} = isAuthenticated();

	const getOnlineStoreName = () => {
		setLoading(true);
		allLoyaltyPointsAndStoreStatus().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var dataModified = data.map((i) => {
					return {
						...i,
						storeId: i.belongsTo._id,
						storeCreatedAt: i.belongsTo.createdAt,
					};
				});

				dataModified.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				// Then, use reduce to construct an object where the keys are storeNames and the values are the corresponding items with the latest date
				var result = dataModified.reduce((acc, item) => {
					if (
						!acc[item.storeId] ||
						new Date(item.createdAt) > new Date(acc[item.storeId].createdAt)
					) {
						acc[item.storeId] = item;
					}
					return acc;
				}, {});

				// Finally, extract the values from the resulting object to get an array of items
				var uniqueStoresWithLatestDates = Object.values(result);
				uniqueStoresWithLatestDates.sort(
					(a, b) => new Date(a.storeCreatedAt) - new Date(b.storeCreatedAt)
				);

				setStoreProperties(uniqueStoresWithLatestDates);

				setLoading(false);
			}
		});
	};

	const gettingAllAppointmentForTheBoss = () => {
		setLoading(true);
		listScheduledOrdersForTheBoss(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAppointments(data);

				setLoading(false);
			}
		});
	};

	const gettingAllAppointmentForTheBossNotPaid = () => {
		setLoading(true);
		listScheduledOrdersForTheBossNotPaid(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAppointmentsNotPaid(data);

				setLoading(false);
			}
		});
	};

	const schedulesNotPaidRendering = () => {
		if (chosenStore && chosenStore.addStoreName && chosenStore.belongsTo) {
			setLoading(true);
			schedulesNotPaid(user._id, token, chosenStore.belongsTo._id).then(
				(data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setDetailsSchedules(data);

						setLoading(false);
					}
				}
			);
		}
	};

	useEffect(() => {
		getOnlineStoreName();
		gettingAllAppointmentForTheBoss();
		gettingAllAppointmentForTheBossNotPaid();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		schedulesNotPaidRendering();
		// eslint-disable-next-line
	}, [chosenStore]);

	const getToken = (userId, token) => {
		setData({...data, loading: true});
		getBraintreeClientToken(userId, token).then((data) => {
			if (data.error) {
				setData({...data, error: data.error});
			} else {
				setData({...data, clientToken: data.clientToken});
				setData({...data, loading: false});
			}
		});
	};

	useEffect(() => {
		getToken(user._id, token);
		// eslint-disable-next-line
	}, [chosenStore]);

	console.log(allAppointments, "AllAppointments");
	console.log(allAppointmentsNotPaid, "allAppointmentsNotPaid");
	return (
		<StoreBillingMainWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='StoreBilling'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>

				{loading ? (
					<div className='mt-5'>
						{" "}
						<h3>Loading....</h3>{" "}
					</div>
				) : (
					<div className='mt-5'>
						{" "}
						{!chosenStore && !chosenStore.addStoreName ? (
							<div>
								<div className='row'>
									{storeProperties &&
										storeProperties.map((store, i) => {
											var theIndexOfAppointments =
												allAppointments &&
												allAppointments
													.map((ii) => ii._id)
													.indexOf(store.belongsTo._id);

											var theIndexOfAppointmentsNotPaid =
												allAppointmentsNotPaid &&
												allAppointmentsNotPaid
													.map((ii) => ii._id)
													.indexOf(store.belongsTo._id);
											return (
												<div className='col-md-3 mx-auto' key={i}>
													<div
														onClick={() => {
															if (store.belongsTo.platFormShare) {
																setChosenStore(store);
															}
														}}
														style={{
															fontWeight: "bolder",
															fontSize: "1.3rem",
															textDecoration: "underline",
															cursor: "pointer",
															// textAlign: "center",
														}}
													>
														<strong>Store Name: {store.addStoreName}</strong>
														<br />
														<strong>Phone: {store.belongsTo.phone}</strong>
														<br />
														<br />
														<strong>
															{" "}
															{store.activeStore
																? "Active Store"
																: "Inactive Store"}{" "}
														</strong>
														<br />
														<strong>
															{" "}
															{store.belongsTo.platFormShare ? (
																<span style={{color: "darkgreen"}}>
																	Credit Card Added
																</span>
															) : (
																<span style={{color: "darkred"}}>
																	No Credit Card Added
																</span>
															)}{" "}
														</strong>
													</div>

													<div className='mt-3'>
														Total Appointments:{" "}
														<strong>
															{allAppointments &&
																allAppointments[theIndexOfAppointments] &&
																allAppointments[theIndexOfAppointments]
																	.totalAppointments}
														</strong>
													</div>
													<div className='mt-3'>
														Total Amount:{" "}
														<strong>
															{allAppointments &&
																allAppointments[theIndexOfAppointments] &&
																allAppointments[theIndexOfAppointments]
																	.totalAmount}{" "}
															EGP
														</strong>
													</div>
													<div className='mt-3'>
														Our Share:{" "}
														<strong>
															{allAppointments &&
																allAppointments[theIndexOfAppointments] &&
																allAppointments[theIndexOfAppointments]
																	.totalOnlineServicesFees}{" "}
															EGP
														</strong>
													</div>
													<div
														className='mt-3'
														style={{color: "red", fontWeight: "bolder"}}
													>
														Our Share Due:{" "}
														<strong>
															{allAppointmentsNotPaid &&
																allAppointmentsNotPaid[
																	theIndexOfAppointmentsNotPaid
																] &&
																allAppointmentsNotPaid[
																	theIndexOfAppointmentsNotPaid
																].totalOnlineServicesFees}{" "}
															EGP
														</strong>
													</div>
												</div>
											);
										})}
								</div>
							</div>
						) : (
							<div>
								<div className='my-3'>
									<h3
										style={{fontWeight: "bold", cursor: "pointer"}}
										onClick={() => {
											setChosenStore("");
										}}
									>
										{" "}
										<strong>Back To Store Billing List</strong>{" "}
									</h3>
								</div>
								<div>
									<SingleBillingForm
										data={data}
										setData={setData}
										token={token}
										user={user}
										store={chosenStore}
										allAppointmentsNotPaid={allAppointmentsNotPaid}
										setChosenStore={setChosenStore}
										detailsSchedules={detailsSchedules}
									/>
								</div>
							</div>
						)}{" "}
					</div>
				)}
			</div>
		</StoreBillingMainWrapper>
	);
};

export default StoreBillingMain;

const StoreBillingMainWrapper = styled.div`
	min-height: 1200px;
	overflow: auto;

	.grid-container {
		display: grid;
		grid-template-columns: 17% 83%;
	}

	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 2% 98%;
		}
	}
`;
