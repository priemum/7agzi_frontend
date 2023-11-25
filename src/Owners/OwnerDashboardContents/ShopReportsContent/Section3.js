import React from "react";
import styled from "styled-components";

const Section3 = ({ sortedArrayCancelled, sortedArray, user }) => {
	const DataDisplayDayOverDayNonCancelled = (data) => {
		return (
			<div className='container mt-4'>
				<h4 style={{ fontWeight: "bold" }}>
					<strong style={{ color: "darkgoldenrod" }}>Non Cancelled</strong>{" "}
					Reservations Overview By Date
				</h4>
				<div
					style={{
						maxHeight: "370px",
						overflow: "auto",
					}}
				>
					<table className='table table-bordered table-md-responsive table-hover'>
						<thead className='thead-dark'>
							<tr>
								<th>Schedule Date</th>
								<th>Amount</th>
								<th>Online Services Fees</th>
								<th>Paid Tip</th>
								<th>Reservations Count</th>
								<th>Service Price</th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data.map((item, index) => (
									<tr key={index}>
										<td>{item.scheduleStartsAtModified}</td>
										<td>
											{" "}
											{user.storeCountry === "Egypt" ? "EGP" : "$"}
											{item.amount}
										</td>
										<td>
											{" "}
											{user.storeCountry === "Egypt" ? "EGP" : "$"}
											{item.onlineServicesFees}
										</td>
										<td>
											{" "}
											{user.storeCountry === "Egypt" ? "EGP" : "$"}
											{item.paidTip}
										</td>
										<td>{item.reservationsCount}</td>
										<td>
											{" "}
											{user.storeCountry === "Egypt" ? "EGP" : "$"}
											{item.servicePrice}
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	const DataDisplayDayOverDayCancelled = (data) => {
		return (
			<div className='container mt-5'>
				<h4 style={{ fontWeight: "bold" }}>
					<strong style={{ color: "red" }}>Cancelled</strong> Reservations
					Overview By Date
				</h4>
				<div
					style={{
						maxHeight: "370px",
						overflow: "auto",
					}}
				>
					<table className='table table-bordered table-md-responsive table-hover'>
						<thead className='thead-dark'>
							<tr>
								<th>Schedule Date</th>
								<th>Amount</th>
								<th>Online Services Fees</th>
								<th>Paid Tip</th>
								<th>Reservations Count</th>
								<th>Service Price</th>
							</tr>
						</thead>
						<tbody>
							{data &&
								data.map((item, index) => (
									<tr key={index}>
										<td>{item.scheduleStartsAtModified}</td>
										<td>$ {item.amount}</td>
										<td>$ {item.onlineServicesFees}</td>
										<td>$ {item.paidTip}</td>
										<td>{item.reservationsCount}</td>
										<td>$ {item.servicePrice}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	return (
		<Section3Wrapper>
			<div className='mx-auto text-center mt-4'>
				{DataDisplayDayOverDayNonCancelled(sortedArray)}
			</div>

			<div className='mx-auto text-center mt-4'>
				{DataDisplayDayOverDayCancelled(sortedArrayCancelled)}
			</div>
		</Section3Wrapper>
	);
};

export default Section3;

const Section3Wrapper = styled.div``;
