import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import { readUser, storesListForAgents } from "./apiAgent";
import CountUp from "react-countup";
import { allLoyaltyPointsAndStoreStatus } from "../TheBoss/apiBoss";
import { Link } from "react-router-dom";

const AgentDashboard = ({ language }) => {
	//Read Single User for the agent
	//Get all related stores for this agent
	//Check whether related stores are paid for the agent or not
	//Check if the store is active or not
	const [currentUser, setCurrentUser] = useState("");
	const [ownerAccounts, setOwnerAccounts] = useState("");
	const [storeProperties, setStoreProperties] = useState([]);

	const { user, token } = isAuthenticated();

	const readingCurrentUser = () => {
		readUser(user._id, token).then((data) => {
			if (data.error) {
				console.log("Error getting current User");
			} else {
				setCurrentUser(data);
			}
		});
	};

	const allStoreOwnerAccounts = () => {
		storesListForAgents(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var allOwnerAccounts = data.filter(
					(i) => i.role === 1000 && i.agent._id === user._id
				);

				setOwnerAccounts(allOwnerAccounts);

				//
				//Getting Store Settings
				allLoyaltyPointsAndStoreStatus().then((data2) => {
					if (data2.error) {
						console.log(data2.error);
					} else {
						var dataModified = data2.map((i) => {
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

						setStoreProperties(
							uniqueStoresWithLatestDates.filter((ii) =>
								data.map((iii) => iii._id).indexOf(ii.belongsTo._id)
							)
						);
					}
				});

				//End Of Store Settings
			}
		});
	};

	useEffect(() => {
		readingCurrentUser();
		allStoreOwnerAccounts();

		// eslint-disable-next-line
	}, []);

	const storesWentPro =
		ownerAccounts && ownerAccounts.filter((i) => i.subscribed === true)
			? ownerAccounts.filter((i) => i.subscribed === true)
			: [];
	const storesNotPro =
		ownerAccounts && ownerAccounts.filter((i) => i.subscribed === false)
			? ownerAccounts.filter((i) => i.subscribed === false)
			: [];

	const agentPaid =
		ownerAccounts && ownerAccounts.filter((i) => i.agentPaid === true)
			? ownerAccounts.filter((i) => i.agentPaid === true)
			: [];
	const agentPaidPro =
		ownerAccounts && ownerAccounts.filter((i) => i.agentPaidPro === true)
			? ownerAccounts.filter((i) => i.agentPaidPro === true)
			: [];

	return (
		<AgentDashboardWrapper>
			{currentUser && currentUser.activeAgent === false ? (
				<div
					className='underReview'
					dir={language === "Arabic" ? "rtl" : "ltr"}
				>
					{language === "Arabic" ? (
						<>
							<h1>
								<strong>مرحبا {currentUser && currentUser.name}</strong>
							</h1>
							<h2>
								ملفك الشخصي <strong>قيد المراجعة</strong>. عادةً ما تستغرق هذه
								العملية من 24 إلى 48 ساعة.
							</h2>
							<h2>
								بمجرد مراجعة ملفك الشخصي، سيتواصل معك مدير الموارد البشرية لدينا
								لإجراء مقابلة سريعة.
							</h2>
							<h2 className='mt-5 text-center' style={{ fontSize: "2rem" }}>
								<strong>شكراً لاهتمامك!</strong>
							</h2>
							<h2 className='mt-5 text-center' style={{ fontSize: "2rem" }}>
								<strong style={{ color: "darkgreen" }}>حظاً سعيداً!</strong>
							</h2>
						</>
					) : (
						<>
							<h1>
								<strong> HI {currentUser && currentUser.name}</strong>
							</h1>
							<h2>
								Your Profile Is <strong>Under Review</strong>, This Process
								Usually Takes 24 to 48 hours.
							</h2>
							<h2>
								Once Your Profile Is Reviewed, Our HR Manager Will Reach Out To
								You For A Quick Interview.
							</h2>
							<h2 className='mt-5 text-center' style={{ fontSize: "2rem" }}>
								<strong>THANK YOU FOR SHOWING INTEREST!</strong>
							</h2>
							<h2 className='mt-5 text-center' style={{ fontSize: "2rem" }}>
								<strong style={{ color: "darkgreen" }}>GOOD LUCK!</strong>
							</h2>
						</>
					)}
				</div>
			) : null}

			{currentUser && currentUser.activeAgent === true ? (
				<div>
					<h1>
						{" "}
						<strong> HI AGENT {currentUser && currentUser.name}</strong>
					</h1>
					<div className='row' dir={language === "Arabic" ? "rtl" : "ltr"}>
						<div className='col-xl-3 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
							<div className='card' style={{ background: "#f1416c" }}>
								<div className='card-body'>
									<h5 style={{ fontWeight: "bolder", color: "white" }}>
										{language === "Arabic"
											? "المتاجر التي سجلت بها"
											: "Stores You Registered"}
									</h5>
									<CountUp
										style={{ color: "white" }}
										duration={3}
										delay={0}
										end={ownerAccounts.length}
										separator=','
									/>
								</div>
							</div>
						</div>
						<div className='col-xl-3 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
							<div className='card' style={{ background: "#009ef7" }}>
								<div className='card-body'>
									<h5 style={{ fontWeight: "bolder", color: "white" }}>
										{language === "Arabic"
											? "المتاجر التي أصبحت برو"
											: "Stores Went Pro"}
									</h5>
									<CountUp
										style={{ color: "white" }}
										duration={3}
										delay={0}
										end={storesWentPro.length}
										separator=','
									/>
								</div>
							</div>
						</div>
						<div className='col-xl-3 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
							<div className='card' style={{ background: "#50cd89" }}>
								<div className='card-body'>
									<h5 style={{ fontWeight: "bolder", color: "white" }}>
										{language === "Arabic" ? "حصتك ($)" : "Your Share ($)"}
									</h5>
									<span style={{ color: "white" }}>$</span>{" "}
									<CountUp
										style={{ color: "white" }}
										duration={3}
										delay={0}
										end={
											Number(storesWentPro.length) * 2 +
											Number(storesNotPro.length)
										}
										separator=','
									/>
								</div>
							</div>
						</div>
						<div className='col-xl-3 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
							<div className='card' style={{ background: "#185434" }}>
								<div className='card-body'>
									<h5 style={{ fontWeight: "bolder", color: "white" }}>
										{language === "Arabic"
											? "المبلغ المستلم ($)"
											: "You Got Paid ($)"}
									</h5>
									<span style={{ color: "white" }}>$</span>{" "}
									<CountUp
										style={{ color: "white" }}
										duration={3}
										delay={0}
										end={Number(agentPaid.length) + Number(agentPaidPro.length)}
										separator=','
									/>
								</div>
							</div>
						</div>
					</div>

					<div
						className='mt-5'
						style={{
							maxHeight: "800px",
							overflow: "auto",
						}}
					>
						<h3 style={{ fontWeight: "bolder" }}>
							Registered Accounts With You:
						</h3>
						<table
							className='table table-bordered table-md-responsive table-hover table-striped'
							style={{ fontSize: "0.75rem" }}
						>
							<thead
							// className='thead-light'
							// style={{border: "2px black solid"}}
							>
								<tr dir={language === "Arabic" ? "rtl" : "ltr"}>
									<th scope='col'>#</th>
									<th scope='col'>
										{language === "Arabic" ? "الاسم" : "Name"}
									</th>
									<th scope='col'>
										{language === "Arabic" ? "الهاتف" : "Phone"}
									</th>
									<th scope='col'>
										{language === "Arabic" ? "المحافظة" : "Governorate"}
									</th>
									<th scope='col'>
										{language === "Arabic" ? "العنوان" : "Address"}
									</th>
									<th scope='col'>
										{language === "Arabic" ? "اسم المتجر" : "Store Name"}
									</th>
									<th scope='col'>
										{language === "Arabic" ? "نوع المتجر" : "Store Type"}
									</th>
									<th scope='col'>
										{language === "Arabic"
											? "تاريخ الإنشاء"
											: "Account Created"}
									</th>
									<th scope='col'>
										{language === "Arabic" ? "الإعدادات؟" : "Settings?"}
									</th>
									<th
										scope='col'
										style={{ background: "black", color: "white" }}
									>
										{language === "Arabic" ? "المتجر النشط؟" : "Active Store?"}
									</th>
									<th scope='col'>
										{language === "Arabic" ? "الوكيل" : "Agent"}
									</th>
									<th
										scope='col'
										style={{ background: "darkgoldenrod", color: "white" }}
									>
										{language === "Arabic" ? "حساب Pro" : "Pro Account"}
									</th>
									<th scope='col'>
										{language === "Arabic"
											? "الوكيل قام بالدفع الأولي؟"
											: "Agent Paid Initial?"}
									</th>
									<th scope='col'>
										{language === "Arabic"
											? "الوكيل قام بدفع Pro؟"
											: "Agent Paid Pro?"}
									</th>
									<th>HELP!</th>
								</tr>
							</thead>

							<tbody>
								{ownerAccounts &&
									ownerAccounts.map((o, i) => {
										const now = new Date();
										const endDate = new Date(o.createdAt);
										const diffTime = Math.abs(endDate - now);
										const diffDays = Math.ceil(
											diffTime / (1000 * 60 * 60 * 24)
										);

										// const remainingDays = 30 - diffDays;

										var storeIndex =
											storeProperties &&
											storeProperties.length > 0 &&
											storeProperties.filter(
												(iiii) => iiii.belongsTo && iiii.belongsTo._id === o._id
											)[0];

										return (
											<tr key={i}>
												<td>{i + 1}</td>
												<td>{o.name}</td>
												<td>{o.phone}</td>
												<td style={{ textTransform: "capitalize" }}>
													{o.storeGovernorate}
												</td>
												<td>{o.storeAddress}</td>
												<td>{storeIndex && storeIndex.addStoreName}</td>
												<td style={{ textTransform: "capitalize" }}>
													{o.storeType}
												</td>
												<td>
													{diffDays}{" "}
													{Number(diffDays) <= 1 ? "Day Ago" : "Days Ago"}
												</td>
												<td
													style={{
														background:
															storeProperties &&
															storeProperties
																.map(
																	(iii) => iii.belongsTo && iii.belongsTo._id
																)
																.indexOf(o._id) === -1
																? "red"
																: "darkgreen",
														color:
															storeProperties &&
															storeProperties
																.map(
																	(iii) => iii.belongsTo && iii.belongsTo._id
																)
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
													{storeIndex && storeIndex.activeStore
														? "Active Store"
														: "Inactive"}
												</td>
												<td>{o.agent.name}</td>
												<td>{o.subscribed ? "PRO" : "NOT PRO"}</td>
												<td
													style={{
														background: o.agentPaid ? "#d4f9d4" : "#f9d4d4",
														fontWeight: "bold",
														width: "10%",
													}}
												>
													{o.agentPaid ? "Paid" : "Not Paid"}
												</td>
												<td
													style={{
														background: o.agentPaidPro ? "#d4f9d4" : "#f9d4d4",
														fontWeight: "bold",
														width: "10%",
													}}
												>
													{o.agentPaidPro ? "Paid" : "Not Paid"}
												</td>
												<td
													style={{
														fontWeight: "bolder",
														textDecoration: "underline",
													}}
												>
													<Link
														to={`/store/admin/settings/agent/help/${o._id}`}
													>
														HELP ACCOUNT
													</Link>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</div>
			) : null}
		</AgentDashboardWrapper>
	);
};

export default AgentDashboard;

const AgentDashboardWrapper = styled.div`
	min-height: 800px;
	overflow: hidden;
	margin-right: 100px;
	margin-left: 100px;

	.underReview {
		margin-right: 300px;
		margin-left: 300px;
	}

	h1 {
		font-weight: bolder;
		text-transform: uppercase;
		font-size: 2rem;
		margin-top: 30px;
		text-align: center;
	}

	h2 {
		font-weight: bold;
		font-size: 1.5rem;
	}

	.card-body {
		font-weight: bolder;
	}

	.card-body span {
		font-size: 1.5rem;
	}

	@media (max-width: 1000px) {
		margin-right: 5px;
		margin-left: 5px;

		.underReview {
			margin-right: 0px;
			margin-left: 0px;
		}
	}
`;
