import React from "react";
import styled from "styled-components";

const PointsAndPayments = ({ allBookings }) => {
	function aggregateLoyaltyPoints(allBookings) {
		const aggregatedPoints = {};

		// Filter out bookings with status "Cancelled"
		const validBookings =
			allBookings &&
			allBookings.filter((booking) => booking.status !== "Cancelled");

		validBookings.forEach((booking) => {
			const belongsToId = booking.belongsTo.storeName;
			const servicesPicked = booking.serviceDetails.servicesPicked || [];
			let totalForThisBookingLoyaltyPoints = 0;
			let totalForThisBookingPriceAfterDiscount = 0;

			servicesPicked.forEach((service) => {
				totalForThisBookingLoyaltyPoints += service.serviceLoyaltyPoints || 0;
				totalForThisBookingPriceAfterDiscount +=
					service.servicePriceDiscount || 0;
			});

			// If the belongsToId is already in the aggregatedPoints, add to its value
			// Otherwise, create a new object with loyalty points and price after discount
			if (!aggregatedPoints[belongsToId]) {
				aggregatedPoints[belongsToId] = {
					TotalLoyaltyPoints: totalForThisBookingLoyaltyPoints,
					TotalPriceAfterDiscount: totalForThisBookingPriceAfterDiscount,
				};
			} else {
				aggregatedPoints[belongsToId].TotalLoyaltyPoints +=
					totalForThisBookingLoyaltyPoints;
				aggregatedPoints[belongsToId].TotalPriceAfterDiscount +=
					totalForThisBookingPriceAfterDiscount;
			}
		});

		// Convert the object to the desired array format
		return Object.entries(aggregatedPoints).map(([belongsTo, data]) => ({
			belongsTo,
			...data,
		}));
	}

	var PointsSummary = aggregateLoyaltyPoints(
		allBookings && allBookings.length > 0 ? allBookings : []
	);
	console.log(PointsSummary);

	return (
		<PointsAndPaymentsWrapper>
			<div
				style={{
					maxHeight: "700px",
					overflow: "auto",
				}}
			>
				<table
					className='table table-md-responsive table-hover my-auto'
					style={{ fontSize: "0.75rem" }}
				>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>صالون</th>
							<th scope='col'>المبلغ</th>
							<th scope='col'>النقاط</th>
						</tr>
					</thead>

					<tbody className='my-auto  arabic-table'>
						{PointsSummary &&
							PointsSummary.map((s, i) => (
								<tr key={i}>
									<td className='text-end'>{i + 1}</td>
									<td className='text-end'>{s.belongsTo}</td>
									<td className='text-end'>{s.TotalPriceAfterDiscount}</td>
									<td className='text-end'>{s.TotalLoyaltyPoints}</td>
								</tr>
							))}
					</tbody>
				</table>
				<div
					style={{
						fontSize: "1.4rem",
						fontWeight: "bolder",
						textAlign: "center",
						color: "white",
					}}
				>
					{allBookings && allBookings.length === 0 ? "لا يوجد حجوزات" : ""}
				</div>
			</div>
		</PointsAndPaymentsWrapper>
	);
};

export default PointsAndPayments;

const PointsAndPaymentsWrapper = styled.div`
	color: white;

	table {
		color: white;
	}

	tr {
		text-align: center;
	}

	td {
		color: white;
		align-items: center;
		vertical-align: middle;
		justify-content: center;
	}
`;
