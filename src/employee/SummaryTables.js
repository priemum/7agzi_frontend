import React from "react";
import styled from "styled-components";

const SummaryTables = ({sortedArrayCancelled, sortedArray}) => {
	const DataDisplayDayOverDayNonCancelled = (data) => {
		return (
			<div className='container mt-4'>
				<h4 style={{fontWeight: "bold"}}>
					<strong style={{color: "darkgoldenrod"}}>Non Cancelled</strong>{" "}
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
										<td> {item.amount} EGP</td>
										<td> {item.onlineServicesFees} EGP</td>
										<td> {item.paidTip} EGP</td>
										<td>{item.reservationsCount}</td>
										<td> {item.servicePrice} EGP</td>
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
				<h4 style={{fontWeight: "bold"}}>
					<strong style={{color: "red"}}>Cancelled</strong> Reservations
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
		<SummaryTablesWrapper>
			<div className='mx-auto text-center mt-4'>
				{DataDisplayDayOverDayNonCancelled(sortedArray)}
			</div>

			<div className='mx-auto text-center mt-4'>
				{DataDisplayDayOverDayCancelled(sortedArrayCancelled)}
			</div>
		</SummaryTablesWrapper>
	);
};

export default SummaryTables;

const SummaryTablesWrapper = styled.div`
	margin-bottom: 100px;
`;
