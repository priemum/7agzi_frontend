import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

const TableViewStore = ({ orders, selectedDate }) => {
	const [q, setQ] = useState("");

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
				row.applyPoints.toString().toLowerCase().indexOf(q) > -1 ||
				row.transaction_id.toString().toLowerCase().indexOf(q) > -1 ||
				// row.BookedFrom.toString().toLowerCase().indexOf(q) > -1 ||
				row.service.toString().toLowerCase().indexOf(q) > -1 ||
				row.BookedFrom.toString().toLowerCase().indexOf(q) > -1
			);
		});
	}

	useEffect(() => {
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("PetType");
		localStorage.removeItem("PetSize");
		localStorage.removeItem("chosenDateFromFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
		localStorage.removeItem("chosenStylistUpdate");
		// eslint-disable-next-line
	}, []);

	const ordersFiltered =
		orders &&
		orders.filter((i) =>
			moment(i.scheduledDate, "MM/DD/YYYY").isSame(
				moment(selectedDate, "MM/DD/YYYY")
			)
		);

	return (
		<TableViewStoreWrapper>
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
					className='p-2 mb-5 mt-2'
					type='text'
					value={q}
					onChange={(e) => setQ(e.target.value.toLowerCase())}
					placeholder='Search By Client Phone, Client Name, Stylist Name or Client Schedule Date'
					style={{ borderRadius: "20px", width: "95%" }}
				/>
			</div>
			{/* <div className='my-3'>{DownloadExcel()}</div> */}

			<div
				style={{
					maxHeight: "700px",
					overflow: "auto",
				}}
			>
				<table
					className='table table-bordered table-md-responsive table-hover table-striped'
					style={{ fontSize: "0.75rem" }}
				>
					<thead
					// className='thead-light'
					// style={{border: "2px black solid"}}
					>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Booking Loc.</th>
							<th scope='col'>Stylist Name</th>
							<th scope='col'>Customer Name</th>
							<th scope='col'>Customer Phone</th>
							<th scope='col'>Schedule DateTime</th>
							<th scope='col'>Booked On</th>
							<th scope='col'>Status</th>
							{/* <th scope='col'>Receipt #</th> */}
							<th scope='col'>Service</th>
							<th scope='col'>Paid Tip</th>
							<th scope='col'>Service Price</th>
							<th scope='col'>Online Fee</th>
							<th scope='col'>Amount</th>
							<th scope='col'>Loyalty Points</th>
						</tr>
					</thead>

					<tbody>
						{search(orders).map((s, i) => (
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
								<td>{s.BookedFrom}</td>
								<td>
									<Link
										to={`/store/single-appointment-details-store/${s._id}/${
											s && s.employees && s.employees[0] && s.employees[0]._id
										}`}
									>
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
															? "black"
															: "",
													textDecoration: "underline",
												}}
											>
												{e.employeeName}
											</div>
										))}
									</Link>
								</td>

								<td>{s.scheduledByUserName}</td>
								<td>{s.phone}</td>
								<td>
									{new Date(s.scheduledDate).toLocaleDateString()}{" "}
									{s.scheduledTime}
								</td>
								<td>{new Date(s.createdAt).toLocaleString()}</td>
								<td>{s.status}</td>
								{/* <td>
									{s.transaction_id === null ||
									s.transaction_id === undefined ||
									s.transaction_id === ""
										? s._id.substring(0, 10)
										: s.transaction_id}
								</td> */}
								<td>{s.service}</td>
								<td>{s.paidTip.toFixed(2)}</td>
								<td>{s.servicePrice}</td>
								<td>{s.onlineServicesFees}</td>
								<td style={{ fontWeight: "bolder", fontSize: "13px" }}>
									{s.amount.toFixed(2)}
								</td>
								<td>{s.applyPoints.toString()}</td>
							</tr>
						))}

						<tr className='grey-row'>
							<td className='text-end'>
								{!q && ordersFiltered && ordersFiltered.length === 0 ? "1" : ""}
							</td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
						</tr>
						<tr className='white-row'>
							<td className='text-end'>
								{!q && ordersFiltered && ordersFiltered.length === 0 ? "2" : ""}
							</td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
						</tr>
						<tr className='grey-row'>
							<td className='text-end'>
								{!q && ordersFiltered && ordersFiltered.length === 0 ? "3" : ""}
							</td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
						</tr>
						<tr className='white-row'>
							<td className='text-end'>
								{!q && ordersFiltered && ordersFiltered.length === 0 ? "4" : ""}
							</td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
							<td className='text-end'></td>
						</tr>
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
					{!q && ordersFiltered && ordersFiltered.length === 0
						? "No Reservations"
						: ""}
				</div>
			</div>
		</TableViewStoreWrapper>
	);
};

export default TableViewStore;

const TableViewStoreWrapper = styled.div`
	margin-right: 20px;
	margin-left: 20px;
	overflow-x: auto;

	@media (max-width: 1100px) {
		font-size: 0.5rem;
		margin-right: 5px;
		margin-left: 5px;
	}
`;
