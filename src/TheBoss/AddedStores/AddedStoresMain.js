import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { isAuthenticated } from "../../auth";
import {
	allLoyaltyPointsAndStoreStatus,
	listScheduledOrdersForTheBoss,
} from "../apiBoss";
import CardForStoreBoss from "./CardForStoreBoss";
import { Helmet } from "react-helmet";

//DreamProject2023!

const AddedStoresMain = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const [loading, setLoading] = useState(true);
	const [storeProperties, setStoreProperties] = useState([]);
	const [allAppointments, setAllAppointments] = useState([]);

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
						storeId: i.belongsTo._id,
						storeCreatedAt: i.belongsTo.createdAt,
					};
				});

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

	const gettingAllAppointmentForTheBoss = () => {
		setLoading(true);
		listScheduledOrdersForTheBoss(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAppointments(data);

				setLoading(false);
			}
		});
	};

	useEffect(() => {
		getOnlineStoreName();
		gettingAllAppointmentForTheBoss();
		// eslint-disable-next-line
	}, []);

	return (
		<AddedStoresMainWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>XLOOK ADMIN | ADDED STORES</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/boss/admin/added-stores`}
				/>
			</Helmet>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='AddedStores'
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
									{storeProperties &&
										storeProperties.map((p, i) => {
											return (
												<div
													key={i}
													className={
														storeProperties.length === 1
															? "col-md-6"
															: "col-md-4"
													}
													onClick={() => {
														localStorage.setItem(
															"chosenStore",
															JSON.stringify(p)
														);
														window.scrollTo({ top: 0, behavior: "smooth" });
													}}
												>
													<Link
														to={`/boss/store/admin/dashboard/${p.belongsTo._id}`}
													></Link>
													<CardForStoreBoss
														store={p}
														allAppointments={allAppointments}
													/>
												</div>
											);
										})}
								</div>
							</div>
						</React.Fragment>
					</div>
				) : null}
			</div>
		</AddedStoresMainWrapper>
	);
};

export default AddedStoresMain;

const AddedStoresMainWrapper = styled.div`
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
