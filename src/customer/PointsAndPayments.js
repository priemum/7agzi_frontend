import React from "react";
import styled from "styled-components";

const PointsAndPayments = ({ totalPointsAndPayments, allBookings }) => {
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
						{totalPointsAndPayments &&
							totalPointsAndPayments.map((s, i) => (
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
