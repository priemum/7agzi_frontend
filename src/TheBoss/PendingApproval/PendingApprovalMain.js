import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { isAuthenticated } from "../../auth";
import { allLoyaltyPointsAndStoreStatus } from "../apiBoss";
import CardForStorePendingApp from "./CardForStorePendingApp";

//DreamProject2023!

const PendingApprovalMain = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const [loading, setLoading] = useState(true);
	const [storeProperties, setStoreProperties] = useState([]);

	// eslint-disable-next-line
	const { token, user } = isAuthenticated();

	const getOnlineStoreName = () => {
		setLoading(true);
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

				dataModified &&
					dataModified.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
					);
				// Then, use reduce to construct an object where the keys are storeNames and the values are the corresponding items with the latest date
				var result =
					dataModified &&
					dataModified.reduce((acc, item) => {
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

				setLoading(false);
			}
		});
	};

	useEffect(() => {
		getOnlineStoreName();

		// eslint-disable-next-line
	}, []);

	var storeModified =
		storeProperties && storeProperties.filter((i) => i.activeStore === false);

	return (
		<PendingApprovalMainWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='PendingApproval'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>

				{!loading ? (
					<div className='mt-5 mx-auto'>
						<React.Fragment>
							<div className='container'>
								<div className='row'>
									{storeModified &&
										storeModified.map((p, i) => {
											return (
												<div
													key={i}
													className='col-md-4'
													onClick={() => {
														localStorage.setItem(
															"chosenStore",
															JSON.stringify(p)
														);
													}}
												>
													<CardForStorePendingApp store={p} />
												</div>
											);
										})}
								</div>
							</div>
						</React.Fragment>
					</div>
				) : null}
			</div>
		</PendingApprovalMainWrapper>
	);
};

export default PendingApprovalMain;

const PendingApprovalMainWrapper = styled.div`
	min-height: 1200px;
	overflow: auto;

	.grid-container {
		display: grid;
		grid-template-columns: 16% 84%;
	}

	min-height: 800px;

	img {
		width: 100%;
		min-height: 300px;
	}

	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 2% 98%;
		}
	}
`;
