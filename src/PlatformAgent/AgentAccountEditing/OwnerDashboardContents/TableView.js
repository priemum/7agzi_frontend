import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {isAuthenticated} from "../../auth";
import {listScheduledOrders2} from "../apiOwner";
// eslint-disable-next-line
import {Button} from "antd";
import {Link} from "react-router-dom";

// import ReactExport from "react-export-excel";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const TableView = () => {
	const [orders, setOrders] = useState([]);
	// eslint-disable-next-line
	const [excelDataSet, setExcelDataSet] = useState([]);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);

	const [q, setQ] = useState("");
	const {user, token} = isAuthenticated();

	const loadOrders = () => {
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

		setLoading(true);
		listScheduledOrders2(user._id, token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data.sort(compareTotalAppointments));
				setExcelDataSet(
					data.sort(compareTotalAppointments) &&
						data.sort(compareTotalAppointments).map((data, i) => {
							return {
								id: i + 1,
								BookingLoc: data.BookedFrom,
								BarberName:
									data.employees &&
									data.employees[0] &&
									data.employees[0].employeeName,
								CustomerName: data.scheduledByUserName,
								CustomerPhone: data.phone,
								CustomerEmail_Phone:
									data.BookedFrom && data.BookedFrom === "Store"
										? data.phone
										: data.user.email,
								ScheduleDateTime:
									new Date(data.scheduledDate).toLocaleDateString() +
									" " +
									data.scheduledTime,
								BookedOn: new Date(data.createdAt).toLocaleString(),
								Status: data.status,
								Receipt:
									data.transaction_id === null ||
									data.transaction_id === undefined ||
									data.transaction_id === ""
										? data._id.substring(0, 10)
										: data.transaction_id,
								Service: data.service,
								PaidTip: Number(data.paidTip).toFixed(2),
								ServicePrice: data.servicePrice,
								OnlineFee: data.onlineServicesFees,
								Amount: data.amount,
								LoyaltyPoints: data.applyPoints,
							};
						})
				);

				setLoading(false);
			}
		});
	};

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
		loadOrders();
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("PetType");
		localStorage.removeItem("PetSize");
		localStorage.removeItem("chosenDateFromFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
		localStorage.removeItem("chosenStylistUpdate");
		// eslint-disable-next-line
	}, []);

	// const DownloadExcel = () => {
	// 	return (
	// 		<ExcelFile
	// 			filename={`Appointments ${new Date().toLocaleString()}`}
	// 			element={
	// 				<Button
	// 					bsStyle='info'
	// 					style={{
	// 						backgroundColor: "black",
	// 						color: "white",
	// 						borderRadius: "10px",
	// 						marginLeft: "10%",
	// 					}}
	// 				>
	// 					{" "}
	// 					Download Report{" "}
	// 				</Button>
	// 			}
	// 		>
	// 			<ExcelSheet data={excelDataSet} name='Appointments'>
	// 				<ExcelColumn label='Id' value='id' />
	// 				<ExcelColumn label='Booking Loc.' value='BookingLoc' />
	// 				<ExcelColumn label='Stylist Name' value='BarberName' />
	// 				<ExcelColumn label='Customer Name' value='CustomerName' />
	// 				<ExcelColumn label='Customer Phone' value='CustomerPhone' />
	// 				<ExcelColumn
	// 					label='Customer Email/Phone'
	// 					value='CustomerEmail_Phone'
	// 				/>
	// 				<ExcelColumn label='Schedule DateTime' value='ScheduleDateTime' />
	// 				<ExcelColumn label='Booked On' value='BookedOn' />
	// 				<ExcelColumn label='Status' value='Status' />
	// 				<ExcelColumn label='Receipt #' value='Receipt' />
	// 				<ExcelColumn label='Service' value='Service' />
	// 				<ExcelColumn label='Paid Tip' value='PaidTip' />
	// 				<ExcelColumn label='Service Price' value='ServicePrice' />
	// 				<ExcelColumn label='Online Fee' value='OnlineFee' />
	// 				<ExcelColumn label='Amount' value='Amount' />
	// 				<ExcelColumn label='Loyalty Points' value='LoyaltyPoints' />
	// 			</ExcelSheet>
	// 		</ExcelFile>
	// 	);
	// };

	return (
		<TableViewWrapper>
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
					className='p-2 my-5 '
					type='text'
					value={q}
					onChange={(e) => setQ(e.target.value.toLowerCase())}
					placeholder='Search By Client Phone, Client Name, Stylist Name or Client Schedule Date'
					style={{borderRadius: "20px", width: "50%"}}
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
					style={{fontSize: "0.75rem"}}
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
							<th scope='col'>Receipt #</th>
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
										to={`/store/admin/single-appointment-details/${s._id}/${
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
								<td>
									{s.transaction_id === null ||
									s.transaction_id === undefined ||
									s.transaction_id === ""
										? s._id.substring(0, 10)
										: s.transaction_id}
								</td>
								<td>{s.service}</td>
								<td>{Number(s.paidTip).toFixed(2)}</td>
								<td>{s.servicePrice}</td>
								<td>{s.onlineServicesFees}</td>
								<td>{Number(s.amount).toFixed(2)}</td>
								<td>{s.applyPoints.toString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</TableViewWrapper>
	);
};

export default TableView;

const TableViewWrapper = styled.div`
	margin-right: 20px;
	margin-left: 20px;
	overflow-x: auto;

	@media (max-width: 1100px) {
		font-size: 0.5rem;
		margin-right: 5px;
		margin-left: 5px;
	}
`;
