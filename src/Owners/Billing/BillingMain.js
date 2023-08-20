import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";

import {
	getBraintreeClientToken,
	// eslint-disable-next-line
	processPayment,
	processPaymentAndThenStore,
	processPayment_Subscription,
} from "../../apiCore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PlatformShareComp from "./PlatformShareComp";
import BeProComp from "./BeProComp";
import SMSPayAsYouGo from "./SMSPayAsYouGo";
import { updateOwnerProfile } from "../apiOwner";
import { updateUser } from "../../customer/apiUser";
import OwnerNavmenu from "../NewOwnerNavMenu/OwnerNavmenu";
import { Helmet } from "react-helmet";
import { useCartContext } from "../../sidebar_context";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#0f377e",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "1.1rem",
			textAlign: "center",
			padding: "10px",
			color: "white",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			backgroundColor: "white",
			padding: "10px",
			borderRadius: "5px",
			fontSize: "1.1rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
		};
	}
};

const BillingMain = ({ language }) => {
	const { chosenLanguage } = useCartContext();

	const [collapseMenu, setCollapseMenu] = useState(false);
	const [clickedMenu, setClickedMenu] = useState("PlatformShare");
	const [updateCardClicked, setUpdateCardClicked] = useState(false);

	const [data, setData] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {},
	});

	const { user, token } = isAuthenticated();

	const getToken = (userId, token) => {
		setData({ ...data, loading: true });
		getBraintreeClientToken(userId, token, user.storeCountry).then((data) => {
			if (data.error) {
				setData({ ...data, error: data.error });
			} else {
				setData({ ...data, clientToken: data.clientToken });
				setData({ ...data, loading: false });
			}
		});
	};

	useEffect(() => {
		getToken(user._id, token);
		// eslint-disable-next-line
	}, [clickedMenu, updateCardClicked]);

	const buy = () => {
		console.log("clicked");
		let nonce;

		// eslint-disable-next-line
		let getNonce = data.instance
			.requestPaymentMethod()
			.then((data) => {
				nonce = data.nonce;

				const paymentData = {
					paymentMethodNonce: nonce,
					amount: 200,
					email: user.email,
					customerId: user._id,
					planId: "One Time Payment",
					country: user.storeCountry.toLowerCase(),
				};

				processPaymentAndThenStore(user._id, token, paymentData, {
					country: user.storeCountry.toLowerCase(),
				})
					.then((response) => {
						if (
							response.transaction &&
							response.transaction.creditCard &&
							response.transaction.creditCard.token
						) {
							// empty cart
							// create order
							// console.log(response, "responsefromPayment");
							// eslint-disable-next-line

							toast.success(
								"You have successfully subscribed to our platform share"
							);

							updateOwnerProfile(user._id, token, {
								name: user.name,
								email: user.email,
								phone: user.phone,
								platFormShare: true,
								subscribed: user.subscribed,
								smsPayAsYouGo: user.smsPayAsYouGo,
								storeName: user.storeName,
								paymentTo: "platFormShare",
								platFormShareToken: response.transaction.creditCard.token,
								subscriptionToken: user.subscribedToken,
								subscriptionId: user.subscriptionId,
								smsPayAsYouGoToken: user.smsPayAsYouGoToken,
							}).then((data2) => {
								if (data2.error) {
									// console.log(data.error);
									alert(data2.error);
								} else {
									updateUser(data2, () => {
										console.log(data2, "dataUpdated");
									});
								}
							});

							setTimeout(function () {
								window.location.reload(false);
							}, 4000);
						} else {
							toast.error(
								"Not Paid, Maybe insufficient credit, Please try another card"
							);

							setTimeout(function () {
								window.location.reload(false);
							}, 2000);
						}
					})
					.catch((error) => {
						setData({ loading: false });
					});
			})
			.catch((error) => {
				// console.log("dropin error: ", error);
				setData({ ...data, error: error.message });
			});
	};

	const buy_subscribe = () => {
		console.log("clicked");
		let nonce;

		// eslint-disable-next-line
		let getNonce = data.instance
			.requestPaymentMethod()
			.then((data) => {
				nonce = data.nonce;

				const paymentData = {
					paymentMethodNonce: nonce,
					amount: 15,
					email: user.email,
					customerId: user._id,
					planId: "monthly_plan_egy",
				};

				processPayment_Subscription(user._id, token, paymentData)
					.then((response) => {
						if (
							response.subscription &&
							response.subscription.paymentMethodToken
						) {
							// empty cart
							// create order
							// console.log(response, "responsefromPayment");
							// eslint-disable-next-line

							toast.success(
								"CONGRATULATIONS! You now subscribed to our XLOOK PRO Plan"
							);

							console.log(response.subscription, "response.subscription");

							updateOwnerProfile(user._id, token, {
								name: user.name,
								email: user.email,
								phone: user.phone,
								platFormShare: user.platFormShare,
								platFormShareToken: user.platFormShareToken,
								subscribed: true,
								subscriptionToken: response.subscription.paymentMethodToken,
								subscriptionId: response.subscription.id,
								smsPayAsYouGo: user.smsPayAsYouGo,
								smsPayAsYouGoToken: user.smsPayAsYouGoToken,
								storeName: user.storeName,
								paymentTo: "subscribed",
							}).then((data2) => {
								if (data2.error) {
									// console.log(data.error);
									alert(data2.error);
								} else {
									console.log(data2);
									updateUser(data2, () => {
										console.log(data2, "dataUpdated");
									});
								}
							});

							setTimeout(function () {
								window.location.reload(false);
							}, 4000);
						} else {
							toast.error(
								"Not Paid, Maybe insufficient credit, Please try another card"
							);

							setTimeout(function () {
								window.location.reload(false);
							}, 2000);
						}
					})
					.catch((error) => {
						setData({ loading: false });
					});
			})
			.catch((error) => {
				// console.log("dropin error: ", error);
				setData({ ...data, error: error.message });
			});
	};

	const buy_SMSAsYouGo = () => {
		console.log("clicked");
		let nonce;

		// eslint-disable-next-line
		let getNonce = data.instance
			.requestPaymentMethod()
			.then((data) => {
				nonce = data.nonce;

				const paymentData = {
					paymentMethodNonce: nonce,
					amount: 2,
					email: user.email,
					customerId: user._id,
					planId: "One Time Payment",
				};

				processPaymentAndThenStore(user._id, token, paymentData)
					.then((response) => {
						if (
							response.transaction &&
							response.transaction.creditCard &&
							response.transaction.creditCard.token
						) {
							// empty cart
							// create order
							// console.log(response, "responsefromPayment");
							// eslint-disable-next-line

							toast.success(
								"You have successfully subscribed to our Whats App PAY AS YOU GO plan"
							);

							updateOwnerProfile(user._id, token, {
								name: user.name,
								email: user.email,
								phone: user.phone,
								platFormShare: user.platFormShare,
								subscribed: user.subscribed,
								smsPayAsYouGo: true,
								storeName: user.storeName,
								paymentTo: "smsPayAsYouGo",
								platFormShareToken: user.platFormShareToken,
								subscriptionToken: user.subscriptionToken,
								subscriptionId: user.subscriptionId,
								smsPayAsYouGoToken: response.transaction.creditCard.token,
							}).then((data2) => {
								if (data2.error) {
									// console.log(data.error);
									alert(data2.error);
								} else {
									updateUser(data2, () => {
										console.log(data2, "dataUpdated");
									});
								}
							});

							setTimeout(function () {
								window.location.reload(false);
							}, 4000);
						} else {
							toast.error(
								"Not Paid, Maybe insufficient credit, Please try another card"
							);

							setTimeout(function () {
								window.location.reload(false);
							}, 2000);
						}
					})
					.catch((error) => {
						setData({ loading: false });
					});
			})
			.catch((error) => {
				// console.log("dropin error: ", error);
				setData({ ...data, error: error.message });
			});
	};

	useEffect(() => {
		if (window.location.search.includes("platform-share")) {
			setClickedMenu("PlatformShare");
		} else if (window.location.search.includes("be-pro")) {
			setClickedMenu("BePro");
		} else if (window.location.search.includes("sms-pay")) {
			setClickedMenu("SMS => PAY AS YOU GO");
		} else {
			setClickedMenu("PlatformShare");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<BillingMainWrapper
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			show={collapseMenu}
		>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>Owner {user.name} Payment Share</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/store/admin/billing-account`}
				/>
			</Helmet>
			<div className='grid-container'>
				<div className='menuWrapper'>
					<div
						className='iconMenu'
						onClick={() => {
							setCollapseMenu(!collapseMenu);
						}}
					>
						<i className='fa-solid fa-bars'></i>
					</div>

					<OwnerNavmenu
						language={chosenLanguage}
						fromPage='Payment'
						collapseMenu={collapseMenu}
					/>
				</div>

				<div>
					<div className='container'>
						<div className='row mx-auto'>
							<div
								dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
								style={isActive(clickedMenu, "PlatformShare")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("PlatformShare")}
							>
								<Link
									style={isActive(clickedMenu, "PlatformShare")}
									to='/store/admin/billing-account?platform-share'
								>
									<i className='fa-sharp fa-solid fa-house'></i>{" "}
									{chosenLanguage === "Arabic" ? "مشاركة XLOOK" : "XLOOK Share"}
								</Link>
							</div>
							<div
								dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
								style={isActive(clickedMenu, "BePro")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("BePro")}
							>
								<Link
									style={isActive(clickedMenu, "BePro")}
									to='/store/admin/billing-account?be-pro'
								>
									<i className='fa-brands fa-servicestack mr-1'></i>{" "}
									{chosenLanguage === "Arabic" ? "BE PRO" : "BE PRO"}
								</Link>
							</div>
							<div
								dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
								style={isActive(clickedMenu, "SMS => PAY AS YOU GO")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("SMS => PAY AS YOU GO")}
							>
								<Link
									style={isActive(clickedMenu, "SMS => PAY AS YOU GO")}
									to='/store/admin/billing-account?sms-pay'
								>
									<i className='fa-solid fa-pen mr-1'></i>{" "}
									{chosenLanguage === "Arabic"
										? "SMS الدفع حسب الاستخدام"
										: "SMS PAY AS YOU GO"}
								</Link>
							</div>
						</div>
					</div>
					{clickedMenu === "PlatformShare" ? (
						<PlatformShareComp
							setData={setData}
							data={data}
							buy={buy}
							user={user}
							token={token}
							updateCardClicked={updateCardClicked}
							setUpdateCardClicked={setUpdateCardClicked}
							language={chosenLanguage}
						/>
					) : null}
					{clickedMenu === "BePro" ? (
						<BeProComp
							setData={setData}
							data={data}
							buy_subscribe={buy_subscribe}
							user={user}
							token={token}
							updateCardClicked={updateCardClicked}
							setUpdateCardClicked={setUpdateCardClicked}
						/>
					) : null}
					{clickedMenu === "SMS => PAY AS YOU GO" ? (
						<SMSPayAsYouGo
							setData={setData}
							data={data}
							buy_SMSAsYouGo={buy_SMSAsYouGo}
							user={user}
							token={token}
							updateCardClicked={updateCardClicked}
							setUpdateCardClicked={setUpdateCardClicked}
						/>
					) : null}
				</div>
			</div>
		</BillingMainWrapper>
	);
};

export default BillingMain;

const BillingMainWrapper = styled.div`
	min-height: 1000px;
	.grid-container {
		display: grid;
		grid-template-columns: 5% 95%;
	}

	.container {
		margin-top: 50px;
		margin-bottom: 20px;
		margin-left: 320px;
	}

	.platformShare {
		margin-left: 330px;
	}

	h3 {
		font-weight: bolder;
		text-align: center;
		color: goldenrod;
	}

	h5 {
		font-size: 1.1rem;
		font-weight: bolder;
		text-align: center;
		margin: 0px !important;
		color: grey;
	}

	.menuWrapper {
		background-color: ${(props) => (props.show ? "white" : "black")};
		overflow: auto;
	}
	.iconMenu {
		display: none;
	}

	@media (max-width: 1200px) {
		.grid-container {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) => (props.show ? "3% 97%" : "18% 82%")};
		}

		.iconMenu {
			display: block;
			color: ${(props) => (props.show ? "black" : "white")};
			position: ${(props) => (props.show ? "absolute" : "")};
			text-align: right;
			font-size: 20px;
			margin-right: ${(props) => (props.show ? "3px" : "5px")};
		}

		.menuItems {
			font-size: 12px !important;
			margin: auto !important;
		}

		.container {
			margin-left: 10px;
		}

		.platformShare {
			margin-left: 20px;
		}
	}
`;
