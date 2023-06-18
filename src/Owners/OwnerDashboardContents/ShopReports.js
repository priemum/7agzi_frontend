import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {listScheduledOrders2} from "../apiOwner";
import {isAuthenticated} from "../../auth";
import {Spin} from "antd";
import Section1 from "./ShopReportsContent/Section1";
import Section2 from "./ShopReportsContent/Section2";
import Section3 from "./ShopReportsContent/Section3";
import Section4 from "./ShopReportsContent/Section4";
import StylistFilter from "./ShopReportsContent/StylistFilter";

const ShopReports = () => {
	const [orders, setOrders] = useState([]);
	const [allOrders, setAllOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [filteredStylistName, setFilteredStylistName] = useState("");
	const {user, token} = isAuthenticated();

	const loadOrders = () => {
		function compareTotalAppointments(a, b) {
			const TotalAppointmentsA =
				a.employees &&
				a.employees[0] &&
				a.employees[0].employeeName &&
				a.employees[0].employeeName.toLowerCase();
			const TotalAppointmentsB =
				b.employees &&
				b.employees[0] &&
				b.employees[0].employeeName &&
				b.employees[0].employeeName.toLowerCase();
			let comparison = 0;
			if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}
		setLoading(true);
		listScheduledOrders2(user._id, token, user._id).then((data) => {
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

				setAllOrders(ordersModified.sort(compareTotalAppointments));

				if (filteredStylistName && filteredStylistName !== "Select All") {
					const filteringAppointmentsByStylist =
						ordersModified &&
						ordersModified.filter(
							(i) => i.employees[0].employeeName === filteredStylistName
						);

					setOrders(
						filteringAppointmentsByStylist.sort(compareTotalAppointments)
					);
				} else {
					setOrders(ordersModified.sort(compareTotalAppointments));
				}

				setLoading(false);
			}
		});
	};

	useEffect(() => {
		loadOrders();
		// eslint-disable-next-line
	}, [filteredStylistName]);

	const NotCancelledOrders =
		orders && orders.filter((i) => i.status.toLowerCase() !== "cancelled");

	const CancelledOrders =
		orders && orders.filter((i) => i.status.toLowerCase() === "cancelled");

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

	const {minDate, maxDate} =
		orders &&
		orders.reduce(
			(result, current) => {
				const currentDate = new Date(current.scheduleStartsAtModified);
				if (!result.minDate || currentDate < result.minDate) {
					result.minDate = currentDate;
				}
				if (!result.maxDate || currentDate > result.maxDate) {
					result.maxDate = currentDate;
				}
				return result;
			},
			{minDate: null, maxDate: null}
		);

	return (
		<ShopReportsWrapper>
			{loading ? (
				<div style={{textAlign: "center", marginTop: "20px"}}>
					<Spin size='large' style={{fontSize: "48px"}} />
				</div>
			) : (
				<div className='container-fluid col-lg-11 mx-auto'>
					<StylistFilter
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						setFilteredStylistName={setFilteredStylistName}
						filteredStylistName={filteredStylistName}
						orders={allOrders}
					/>
					<div>
						<h4>
							Date Range: <strong>{new Date(minDate).toDateString()}</strong> to{" "}
							<strong>{new Date(maxDate).toDateString()}</strong>
							<span
								onClick={() => {
									setModalVisible(true);
								}}
								style={{
									marginLeft: "20px",
									fontSize: "1.1rem",
									fontWeight: "bold",
									cursor: "pointer",
								}}
							>
								FILTERS <i className='fa-solid fa-filter ml-1'></i>
							</span>
						</h4>
					</div>

					<Section1 orders={orders} />
					<Section2 sortedArray={sortedArray} />
					<Section3
						sortedArray={sortedArray}
						sortedArrayCancelled={sortedArrayCancelled}
					/>

					<Section4 orders={orders} NotCancelledOrders={NotCancelledOrders} />
				</div>
			)}
		</ShopReportsWrapper>
	);
};

export default ShopReports;

const ShopReportsWrapper = styled.div`
	.card-body {
		font-weight: bolder;
	}

	.card-body span {
		font-size: 1.5rem;
	}

	@media (max-width: 1000px) {
		.apexcharts-toolbar {
			display: none !important;
		}
	}
`;
