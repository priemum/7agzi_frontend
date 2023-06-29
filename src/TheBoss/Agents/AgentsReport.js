import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import {
	allLoyaltyPointsAndStoreStatus,
	gettingAllUsers,
	gettingOverallSalonOwners,
	updateUserByBoss,
} from "../apiBoss";
import { toast } from "react-toastify";

const AgentsReport = () => {
	const [storeProperties, setStoreProperties] = useState([]);
	const [ownerAccounts, setOwnerAccounts] = useState([]);
	const [ownersOverallData, setOwnerOverallData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	const { token, user } = isAuthenticated();

	const getOnlineStoreName = () => {
		allLoyaltyPointsAndStoreStatus().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var dataModified = data.map((i) => {
					return {
						...i,
						storeId: i.belongsTo && i.belongsTo._id,
						storeCreatedAt: i.belongsTo && i.belongsTo.createdAt,
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
			}
		});
	};

	const allStoreOwnerAccounts = () => {
		gettingAllUsers(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var allOwnerAccounts = data.filter((i) => i.role === 1000);

				setOwnerAccounts(allOwnerAccounts);
			}
		});
	};

	const gettingOverallOwnersData = () => {
		gettingOverallSalonOwners(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				console.log(data, "data");
				setOwnerOverallData(data);
			}
		});
	};

	useEffect(() => {
		getOnlineStoreName();
		allStoreOwnerAccounts();
		gettingOverallOwnersData();

		// eslint-disable-next-line
	}, []);

	const updatingAgentStatus1 = (values) => {
		console.log(values.agentPaid, "el send");
		if (
			window.confirm(
				"Are You Sure This Agent Was Paid Initial Payment Of 1 Dollar?"
			)
		) {
			updateUserByBoss(user._id, token, {
				...values,
				userId: values._id,
				agentPaid: values.agentPaid ? false : true,
			}).then((data) => {
				if (data.error) {
					// console.log(data.error);
					alert(data.error);
				} else {
					toast.success("Agent Successfully Updated");
					setTimeout(() => {
						window.location.reload(false);
					}, 1500);
				}
			});
		}
	};

	const updatingAgentStatus2 = (values) => {
		if (
			window.confirm(
				"Are You Sure This Agent Was Paid for a subscribed account Payment Of 1 Dollar?"
			)
		) {
			updateUserByBoss(user._id, token, {
				...values,
				userId: values._id,
				agentPaidPro: values.agentPaidPro ? false : true,
			}).then((data) => {
				if (data.error) {
					// console.log(data.error);
					alert(data.error);
				} else {
					toast.success("Agent Successfully Updated");
					setTimeout(() => {
						window.location.reload(false);
					}, 1500);
				}
			});
		}
	};

	// Filter owner accounts based on search query
	const filteredOwnerAccounts = ownerAccounts.filter(
		(o) =>
			o.agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			o.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<AgentsReportWrapper className=''>
			<div
				className='mt-5'
				style={{
					maxHeight: "800px",
					overflow: "auto",
				}}
			>
				<h3 style={{ fontWeight: "bolder" }}>AGENTS SUMMARY</h3>
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
							<th scope='col'>Agent</th>
							<th scope='col'>Registered Salons</th>
							<th scope='col'>Settings Added</th>
							<th scope='col'>Services Added</th>
							<th scope='col'>Employees Added</th>
							<th scope='col'>Active Salons</th>
							<th scope='col'>Overall Appointments</th>
						</tr>
					</thead>

					<tbody>
						{ownersOverallData &&
							ownersOverallData.map((o, i) => {
								return (
									<tr key={i}>
										<td
											style={{
												background: "#0d3763",
												color: "white",
											}}
										>
											{i + 1}
										</td>
										<td
											style={{
												textTransform: "capitalize",
												background: "#0d3763",
												color: "white",
											}}
										>
											{o.agentName}
										</td>
										<td
											style={{
												background: o.everythingIsGood ? "green" : "",
												color: o.everythingIsGood ? "white" : "",
											}}
										>
											{" "}
											<strong>
												{Number(o.RegisteredSalons).toFixed(2)}
											</strong>{" "}
										</td>
										<td
											style={{
												background: o.everythingIsGood ? "green" : "",
												color: o.everythingIsGood ? "white" : "",
											}}
										>
											{" "}
											<strong>{Number(o.addedSettings).toFixed(2)}</strong>{" "}
											Salons
										</td>
										<td
											style={{
												background: o.everythingIsGood ? "green" : "",
												color: o.everythingIsGood ? "white" : "",
											}}
										>
											{" "}
											<strong>{Number(o.addedServices).toFixed(2)}</strong>{" "}
											Salons
										</td>
										<td
											style={{
												background: o.everythingIsGood ? "green" : "",
												color: o.everythingIsGood ? "white" : "",
											}}
										>
											{" "}
											<strong>
												{Number(o.addedEmployees).toFixed(2)}
											</strong>{" "}
											Salons
										</td>
										<td
											style={{
												background: o.everythingIsGood ? "green" : "",
												color: o.everythingIsGood ? "white" : "",
											}}
										>
											{" "}
											<strong>{Number(o.activeSalons).toFixed(2)}</strong>{" "}
											Salons
										</td>
										<td>
											<strong>{Number(o.appointmentsCount).toFixed(2)} </strong>{" "}
											Appointments
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			<div
				className='mt-5'
				style={{
					maxHeight: "800px",
					overflow: "auto",
				}}
			>
				<h3 style={{ fontWeight: "bolder" }}>Registered Owners With Agents</h3>
				<div className='text-center col-md-5 mx-auto'>
					<label>
						{" "}
						<strong>Search</strong>{" "}
					</label>
					<br />
					<input
						className='form-control'
						type='text'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Search by agent or owner name'
						style={{ marginBottom: "10px" }}
					/>
				</div>
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
							<th scope='col'>Agent</th>
							<th scope='col'>Owner Name</th>
							<th scope='col'>Owner Phone</th>
							<th scope='col'>Governorate</th>
							<th scope='col'>Address</th>
							<th scope='col'>Store Type</th>
							<th scope='col'>Settings?</th>
							<th scope='col'>Account Created</th>
							<th scope='col'>Pro Account</th>
							<th scope='col'>Agent Paid Initial?</th>
							<th scope='col'>Agent Paid Pro?</th>
						</tr>
					</thead>

					<tbody>
						{filteredOwnerAccounts &&
							filteredOwnerAccounts.map((o, i) => {
								const now = new Date();
								const endDate = new Date(o.createdAt);
								const diffTime = Math.abs(endDate - now);
								const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

								// const remainingDays = 30 - diffDays;

								return (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>{o.agent.name}</td>
										<td>{o.name}</td>
										<td>{o.phone}</td>
										<td style={{ textTransform: "capitalize" }}>
											{o.storeGovernorate}
										</td>
										<td>{o.storeAddress}</td>
										<td style={{ textTransform: "capitalize" }}>
											{o.storeType}
										</td>
										<td
											style={{
												background:
													storeProperties &&
													storeProperties
														.map((iii) => iii.belongsTo && iii.belongsTo._id)
														.indexOf(o._id) === -1
														? "red"
														: "darkgreen",
												color:
													storeProperties &&
													storeProperties
														.map((iii) => iii.belongsTo && iii.belongsTo._id)
														.indexOf(o._id) === -1
														? "white"
														: "white",
											}}
										>
											{storeProperties &&
											storeProperties
												.map((iii) => iii.belongsTo && iii.belongsTo._id)
												.indexOf(o._id) === -1
												? "NO"
												: "YES"}
										</td>
										<td>
											{diffDays}{" "}
											{Number(diffDays) <= 1 ? "Day Ago" : "Days Ago"}
										</td>
										<td>{o.subscribed ? "PRO" : "NOT PRO"}</td>
										<td
											style={{
												background: o.agentPaid ? "#d4f9d4" : "#f9d4d4",
												fontWeight: "bold",
												width: "10%",
											}}
										>
											{o.agentPaid ? "Paid" : "Not Paid"}
											<select
												className='ml-1'
												onChange={() => updatingAgentStatus1(o)}
											>
												<option value='Please select'>Please Select</option>
												<option value='Please select'>
													Agent Paid Initial
												</option>
												<option value='Please select'>Agent Not Paid</option>
											</select>
										</td>
										<td
											style={{
												background: o.agentPaidPro ? "#d4f9d4" : "#f9d4d4",
												fontWeight: "bold",
												width: "10%",
											}}
										>
											{o.agentPaidPro ? "Paid" : "Not Paid"}
											<select
												className='ml-1'
												onChange={() => updatingAgentStatus2(o)}
											>
												<option value='Please select'>Please Select</option>
												<option value='Please select'>Agent Paid Pro</option>
												<option value='Please select'>
													Agent Not Paid Pro
												</option>
											</select>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>

			{/* <div className=''>
				<div
					className='mt-5'
					style={{
						maxHeight: "800px",
						overflow: "auto",
					}}
				>
					<h3 style={{ fontWeight: "bolder" }}>Stores Added Settings</h3>
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
								<th scope='col'>Agent</th>
								<th scope='col'>Owner Name</th>
								<th scope='col'>Owner Phone</th>
								<th scope='col'>Governorate</th>
								<th scope='col'>Store Name</th>
								<th scope='col'>Address</th>
							</tr>
						</thead>

						<tbody>
							{storeProperties &&
								storeProperties.map((o, i) => {
									return (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{o.belongsTo && o.belongsTo.agent.name}</td>
											<td>{o.belongsTo && o.belongsTo.name}</td>
											<td>{o.belongsTo && o.belongsTo.phone}</td>
											<td style={{ textTransform: "capitalize" }}>
												{o.belongsTo && o.belongsTo.storeGovernorate}
											</td>
											<td>{o.addStoreName}</td>
											<td>{o.belongsTo && o.belongsTo.storeAddress}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div> */}
		</AgentsReportWrapper>
	);
};

export default AgentsReport;

const AgentsReportWrapper = styled.div`
	min-height: 800px;
	margin-right: 50px;
	margin-left: 50px;
	margin-bottom: 100px;

	@media (max-width: 1000px) {
		margin-right: 5px;
		margin-left: 5px;
		margin-bottom: 50px;
	}
`;
