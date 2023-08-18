import React from "react";
import styled from "styled-components";

const ClientBookingSummary = ({ allBookings }) => {
	function convertToArabicNumerals(str) {
		const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
		return str.replace(/\d/g, (digit) => arabicNumerals[Number(digit)]);
	}
	return (
		<BookingSummaryWrapper>
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
							<th scope='col'>التاريخ</th>
							<th scope='col'>صالون</th>
							<th scope='col'>ستايليست</th>
							<th scope='col'>المبلغ</th>
							<th className='col'>مصدر </th>
						</tr>
					</thead>

					<tbody className='my-auto  arabic-table'>
						{allBookings &&
							allBookings.map((s, i) => (
								<tr
									key={i}
									className={
										s.status === "Paid"
											? "green-back"
											: s.status === "Cancelled"
											? "red-back"
											: i % 2 === 0
											? "white-row"
											: "grey-row"
									}
								>
									<td className='text-end'>{i + 1}</td>
									<td className='text-end'>
										{new Date(s.scheduledDate).toLocaleDateString("ar-EG", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}{" "}
										{convertToArabicNumerals(s.scheduledTime)}
									</td>
									<td className='text-end'>{s.belongsTo.storeName}</td>

									<td className='text-end'>
										{s.employees.map((e, ii) => (
											<div
												key={ii}
												// className='text-center'
												style={{
													color:
														s.status === "Cancelled"
															? "white"
															: s.status.includes("Not Paid")
															? ""
															: s.status.includes("Paid")
															? "white"
															: "",
												}}
											>
												{e.employeeName}
											</div>
										))}
									</td>
									<td
										className='text-end'
										style={{ fontWeight: "bolder", fontSize: "10px" }}
									>
										{s.amount.toFixed(2)}ج
									</td>

									<td className='text-end'>
										{s.BookedFrom === "Store" ? "أوفلاين" : "أونلاين"}
									</td>
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
		</BookingSummaryWrapper>
	);
};

export default ClientBookingSummary;

const BookingSummaryWrapper = styled.div`
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
