import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {isAuthenticated} from "../../auth";
import {allLoyaltyPointsAndStoreStatus, gettingAllUsers} from "../apiBoss";

const AgentsReport = () => {
	const [storeProperties, setStoreProperties] = useState([]);
	const [ownerAccounts, setOwnerAccounts] = useState([]);

	const {token, user} = isAuthenticated();

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

	useEffect(() => {
		getOnlineStoreName();
		allStoreOwnerAccounts();

		// eslint-disable-next-line
	}, []);

	return (
		<AgentsReportWrapper className='container'>
			<div
				className='mt-5'
				style={{
					maxHeight: "800px",
					overflow: "auto",
				}}
			>
				<h3 style={{fontWeight: "bolder"}}>Registered Owners With Agents</h3>
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
							<th scope='col'>Name</th>
							<th scope='col'>Phone</th>
							<th scope='col'>Governorate</th>
							<th scope='col'>Address</th>
							<th scope='col'>Settings?</th>
							<th scope='col'>Agent</th>
							<th scope='col'>Agent Paid?</th>
						</tr>
					</thead>

					<tbody>
						{ownerAccounts &&
							ownerAccounts.map((o, i) => {
								// const now = new Date();
								// const endDate = new Date(o.createdAt);
								// const diffTime = Math.abs(endDate - now);
								// const diffDays = Math.ceil(
								// 	diffTime / (1000 * 60 * 60 * 24)
								// );

								// const remainingDays = 30 - diffDays;

								return (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>{o.name}</td>
										<td>{o.phone}</td>
										<td style={{textTransform: "capitalize"}}>
											{o.storeGovernorate}
										</td>
										<td>{o.storeAddress}</td>
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
										<td>{o.agent.name}</td>
										<td
											style={{
												background:
													o.belongsTo && o.belongsTo.agentPaid
														? "#d4f9d4"
														: "#f9d4d4",
												fontWeight: "bold",
											}}
										>
											{o.belongsTo && o.belongsTo.agentPaid
												? "Paid"
												: "Not Paid"}
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>

			<div className=''>
				<div
					className='mt-5'
					style={{
						maxHeight: "800px",
						overflow: "auto",
					}}
				>
					<h3 style={{fontWeight: "bolder"}}>Stores Added Settings</h3>
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
								<th scope='col'>Name</th>
								<th scope='col'>Phone</th>
								<th scope='col'>Governorate</th>
								<th scope='col'>Store Name</th>
								<th scope='col'>Agent</th>
								<th scope='col'>Address</th>
							</tr>
						</thead>

						<tbody>
							{storeProperties &&
								storeProperties.map((o, i) => {
									return (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{o.belongsTo && o.belongsTo.name}</td>
											<td>{o.belongsTo && o.belongsTo.phone}</td>
											<td style={{textTransform: "capitalize"}}>
												{o.belongsTo && o.belongsTo.storeGovernorate}
											</td>
											<td>{o.addStoreName}</td>
											<td>{o.belongsTo && o.belongsTo.agent.name}</td>
											<td>{o.belongsTo && o.belongsTo.storeAddress}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		</AgentsReportWrapper>
	);
};

export default AgentsReport;

const AgentsReportWrapper = styled.div``;
