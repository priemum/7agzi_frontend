/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
	getBraintreeClientTokenGuest,
	createOrderGuest,
	processPaymentGuestUser,
} from "../apiCore";
import {
	allLoyaltyPointsAndStoreStatus,
	getCoupons,
} from "../../admin/apiAdmin";

import DropIn from "braintree-web-drop-in-react";

import { useCartContext } from "./cart_context";
import { toast } from "react-toastify";

const CheckoutStorePickupGuest = ({ chosenLanguage }) => {
	const [data, setData] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {},
		phone: "",
		email: "",
		DeliveryComments: "",
		customerName: "",
	});

	const [allCoupons, setAllCoupons] = useState([]);
	const [appliedCoupon, setAppliedCoupon] = useState("");
	const [appliedCouponAvailable, setAppliedCouponAvailable] = useState(false);
	const [appliedCouponData, setAppliedCouponData] = useState({});
	const [pressApplyCoupon, setPressApplyCoupon] = useState(false);
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState([]);

	const {
		cart,
		// eslint-disable-next-line
		toggleAmount,
		total_amount,
		// eslint-disable-next-line
		addShipmentDetails,
		// eslint-disable-next-line
		shipmentChosen,
		clearCart,
		// eslint-disable-next-line
		shipping_fee,
		total_items,
		isSidebarOpen,
		closeSidebar,
		openSidebar,
	} = useCartContext();

	var carrierDataFromStorage = JSON.parse(localStorage.shipping_carrier);

	// console.log(updatedUser, "updateduser");
	// console.log(alreadySetLoyaltyPointsManagement, "updateduser");

	const loadAllCoupons = () => {
		getCoupons().then((res) => setAllCoupons(res.data));
	};
	// console.log(appliedCouponAvailable, "AppliedCouponAvailableTrueFalse");
	// console.log(
	// 	new Date(appliedCouponData.expiry).toLocaleString() >=
	// 		new Date().toLocaleString(),
	// 	"AppliedCouponAvailableData",
	// );

	const checkAppliedCoupon = () => {
		const allCouponsnames =
			allCoupons &&
			allCoupons.map((items) => items.name.toLowerCase().replace(/\s/g, ""));
		let match =
			allCouponsnames.indexOf(
				appliedCoupon.toLowerCase().replace(/\s/g, ""),
			) !== -1;
		setAppliedCouponAvailable(match);
		if (match) {
			setAppliedCouponData(
				allCoupons &&
					allCoupons[
						allCouponsnames.indexOf(
							appliedCoupon.toLowerCase().replace(/\s/g, ""),
						)
					],
			);
		} else {
			setAppliedCouponData({});
		}
		setPressApplyCoupon(true);
	};

	const handleAppliedCoupon = (event) => {
		setAppliedCoupon(event.target.value);
	};

	const handleDeliveryEmailAddress = (event) => {
		setData({ ...data, email: event.target.value });
	};

	const couponForm = () => {
		return (
			<>
				<>
					<label className='' style={{ fontWeight: "bold" }}>
						Apply Coupon:
					</label>
					<input
						className='form-control'
						placeholder='Please paste your coupon here!'
						onChange={handleAppliedCoupon}
						value={appliedCoupon}
					/>
					<div
						style={{
							fontWeight: "bold",
							fontStyle: "italic",
						}}></div>
					{appliedCouponData &&
					pressApplyCoupon &&
					appliedCouponAvailable &&
					new Date(appliedCouponData.expiry).setHours(0, 0, 0, 0) >=
						new Date().setHours(0, 0, 0, 0) &&
					new Date(appliedCouponData.expiry).setHours(0, 0, 0, 0) !==
						undefined ? (
						<div
							className='mt-2 mb-1 text-center'
							style={{
								fontSize: "0.7rem",
								fontStyle: "italic",
								fontWeight: "bold",
								color: "green",
							}}>
							Thank you for applying the coupon. You have received %
							{appliedCouponData.discount} discount.
						</div>
					) : (
						<>
							{(!appliedCouponAvailable && appliedCoupon && pressApplyCoupon) ||
							(appliedCouponData.expiry &&
								appliedCouponAvailable &&
								new Date(appliedCouponData.expiry).toLocaleString() <
									new Date().toLocaleString() &&
								new Date(appliedCouponData.expiry).toLocaleString() !==
									undefined) ? (
								<div
									className='mt-2 mb-1 text-center'
									style={{
										fontSize: "0.7rem",
										fontStyle: "italic",
										fontWeight: "bold",
										color: "red",
									}}>
									This coupon is expired or unavailable, Please try another one.
								</div>
							) : (
								<div
									className='mt-2 mb-1 text-center'
									style={{
										fontSize: "0.7rem",
										fontStyle: "italic",
										fontWeight: "bold",
										color: "grey",
									}}>
									Please add a coupon...
								</div>
							)}
						</>
					)}
					<div className='col-md-6 mt-2 mx-auto'>
						<button
							className='btn btn-outline-info btn-block  '
							onClick={checkAppliedCoupon}>
							Apply Coupon
						</button>
					</div>
				</>
			</>
		);
	};

	const getToken = (userId, token) => {
		getBraintreeClientTokenGuest(userId, token).then((data) => {
			if (data.error) {
				setData({ ...data, error: data.error });
			} else {
				setData({ clientToken: data.clientToken });
			}
		});
	};

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI2NjQ2YTMzNjA4YzBiZjVhMzI3MzgiLCJpYXQiOjE2NDE1MTM1MTh9.8xXl6OHF5oCDnand3zXDXYU90OFMX5ezXZ88VrljCvM",
		).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAlreadySetLoyaltyPointsManagement(data && data[data.length - 1]);
			}
		});
	};

	// eslint-disable-next-line
	const NumberOfPointsForAwarding =
		alreadySetLoyaltyPointsManagement &&
		alreadySetLoyaltyPointsManagement.loyaltyPointsAward;

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();
		getToken(
			"61b6646a33608c0bf5a32738",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI2NjQ2YTMzNjA4YzBiZjVhMzI3MzgiLCJpYXQiOjE2NDE1MTM1MTh9.8xXl6OHF5oCDnand3zXDXYU90OFMX5ezXZ88VrljCvM",
		);
		loadAllCoupons();
		// eslint-disable-next-line
	}, []);

	const handlePhone = (event) => {
		if (cart.length === 0) {
			setData({ ...data, phone: "" });
		} else {
			setData({ ...data, phone: event.target.value });
		}
	};
	const handleDeliveryComments = (event) => {
		setData({ ...data, DeliveryComments: event.target.value });
	};

	const handleCustomerName = (event) => {
		setData({ ...data, customerName: event.target.value });
	};

	const getTotalAmount = () => {
		if (
			appliedCouponAvailable &&
			new Date(appliedCouponData.expiry).toLocaleString() >=
				new Date().toLocaleString()
		) {
			return total_amount - (total_amount * appliedCouponData.discount) / 100;
		} else {
			return total_amount;
		}
	};

	// console.log(JSON.parse(localStorage.shipping_carrier), "from localstoreage");

	const getShippingFee = () => {
		if (
			total_amount >= alreadySetLoyaltyPointsManagement.freeShippingLimit &&
			alreadySetLoyaltyPointsManagement.freeShippingLimit !== 0
		) {
			return 0;
		} else {
			return carrierDataFromStorage && carrierDataFromStorage.shippingPrice;
		}
	};
	// console.log(getShippingFee(), "shipping fee");

	// console.log(getTotalAmount(), "getting Total Amount Updated");

	const getTaxes = () => {
		return (
			(getTotalAmount() * alreadySetLoyaltyPointsManagement.purchaseTaxes) /
			100
		).toFixed(2);
	};
	const getActualTaxes = () => {
		return (
			(total_amount * alreadySetLoyaltyPointsManagement.purchaseTaxes) /
			100
		).toFixed(2);
	};

	const getTransactionFee = () => {
		return (
			alreadySetLoyaltyPointsManagement &&
			(getTotalAmount() *
				alreadySetLoyaltyPointsManagement.transactionFeePercentage) /
				100 +
				alreadySetLoyaltyPointsManagement.onlineServicesFees
		).toFixed(2);
	};
	const getActualTransactionFee = () => {
		return (
			alreadySetLoyaltyPointsManagement &&
			(total_amount *
				alreadySetLoyaltyPointsManagement.transactionFeePercentage) /
				100 +
				alreadySetLoyaltyPointsManagement.onlineServicesFees
		).toFixed(2);
	};

	const getTotal = () => {
		return Number(
			Number(getTaxes()) +
				Number(getTotalAmount()) +
				Number(getShippingFee()) +
				Number(getTransactionFee()),
		).toFixed(2);
	};

	const getActualTotal = () => {
		return Number(
			Number(getActualTaxes()) +
				Number(total_amount) +
				Number(carrierDataFromStorage && carrierDataFromStorage.shippingPrice) +
				Number(getActualTransactionFee()),
		).toFixed(2);
	};

	// console.log(getActualTotal(), "actualTotal");
	// console.log(total_amount, "total Amount Actual");

	let deliveryPhone = data.phone;
	let deliveryComments = data.DeliveryComments;
	let deliveryEmailAddress = data.email;
	let customerName = data.customerName;

	const loyaltyPointInTheCurrentOrder = () => {
		return cart
			.map((i) => i.loyaltyPoints)
			.reduce((currentValue, nextValue) => {
				return Number(currentValue + nextValue);
			}, 0);
	};

	const buy = () => {
		if (!data.phone) {
			return toast.error("Please Add Your Phone");
		}
		if (!data.email) {
			return toast.error("Please Add Your Email");
		}

		if (!data.customerName) {
			return toast.error("Your Name Is Required");
		}

		setData({ loading: true });
		// send the nonce to your server
		// nonce = data.instance.requestPaymentMethod()
		let nonce;
		// eslint-disable-next-line
		let getNonce = data.instance
			.requestPaymentMethod()
			.then((data) => {
				// console.log(data);
				nonce = data.nonce;
				// once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
				// and also total to be charged
				// console.log(
				//     "send nonce and total to process: ",
				//     nonce,
				//     getTotal(products)
				// );
				const paymentData = {
					paymentMethodNonce: nonce,
					amount: getTotal(),
				};

				processPaymentGuestUser(
					"61b6646a33608c0bf5a32738",
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI2NjQ2YTMzNjA4YzBiZjVhMzI3MzgiLCJpYXQiOjE2NDE1MTM1MTh9.8xXl6OHF5oCDnand3zXDXYU90OFMX5ezXZ88VrljCvM",
					paymentData,
				)
					.then((response) => {
						// empty cart
						// create order
						// console.log(response, "responsefromPayment");
						const createOrderData = {
							products: cart,
							transaction_id: response.transaction.id,
							amount: response.transaction.amount,
							customerName: customerName,
							address: "Pick Up In Store",
							country: "Pick Up In Store",
							city: "Pick Up In Store",
							zipcode: "Pick Up In Store",
							state: "Pick Up In Store",
							phone: deliveryPhone,
							email: deliveryEmailAddress,
							deliveryComments: deliveryComments,
							LoyaltyPoints: loyaltyPointInTheCurrentOrder(),
							minLoyaltyPointsForAward:
								alreadySetLoyaltyPointsManagement &&
								alreadySetLoyaltyPointsManagement.loyaltyPointsAward,
							discountedAmount: getActualTotal() - getTotal(),
							card_data: response.transaction.creditCard,
							onlineServicesFees:
								alreadySetLoyaltyPointsManagement.onlineServicesFees,
							androidPayCard: response.transaction.androidPayCard,
							applePayCard: response.transaction.applePayCard,
							applyPoints: false,
							// zipcode: cardData.billing_postal_code,
							appliedCoupon:
								appliedCouponData.expiry &&
								appliedCoupon &&
								appliedCouponAvailable &&
								new Date(appliedCouponData.expiry).toLocaleString() >=
									new Date().toLocaleString() &&
								new Date(appliedCouponData.expiry).toLocaleString() !==
									undefined
									? appliedCoupon
									: null,
							totalwithNoDiscounts: getActualTotal(),
							shippingFees: getShippingFee(),
							paidTaxes: getTaxes(),
							TaxPercentageSet:
								alreadySetLoyaltyPointsManagement &&
								alreadySetLoyaltyPointsManagement.purchaseTaxes,
							chosenShippingOption:
								carrierDataFromStorage && carrierDataFromStorage,
							appliedCouponData:
								appliedCouponData.expiry &&
								appliedCoupon &&
								appliedCouponAvailable &&
								new Date(appliedCouponData.expiry).toLocaleString() >=
									new Date().toLocaleString() &&
								new Date(appliedCouponData.expiry).toLocaleString() !==
									undefined
									? appliedCouponData
									: null,
							// firstPurchase: orderDataToCreate.firstPurchase,
						};

						createOrderGuest(
							"61b6646a33608c0bf5a32738",
							"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI2NjQ2YTMzNjA4YzBiZjVhMzI3MzgiLCJpYXQiOjE2NDE1MTM1MTh9.8xXl6OHF5oCDnand3zXDXYU90OFMX5ezXZ88VrljCvM",
							createOrderData,
						)
							.then((response) => {
								clearCart();
								setData({
									loading: false,
									success: true,
								});
								toast.success("Paid Successfully");
							})

							.catch((error) => {
								setData({ loading: false });
							});
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

	const buyNoPayment = () => {
		if (!data.phone) {
			return toast.error("Please Add Your Phone");
		}

		if (!data.email) {
			return toast.error("Please Add Your Email");
		}

		if (!data.customerName) {
			return toast.error("Your Name Is Required");
		}

		const createOrderData = {
			products: cart,
			transaction_id: "Pick up in store (Guest)",
			amount: getTotal(),
			customerName: customerName,
			address: "Pick up in store (Guest)",
			country: "Pick up in store (Guest)",
			city: "Pick up in store (Guest)",
			zipcode: "Pick up in store (Guest)",
			state: "Pick up in store (Guest)",
			phone: deliveryPhone,
			email: deliveryEmailAddress,
			deliveryComments: deliveryComments,
			LoyaltyPoints: loyaltyPointInTheCurrentOrder(),
			minLoyaltyPointsForAward:
				alreadySetLoyaltyPointsManagement &&
				alreadySetLoyaltyPointsManagement.loyaltyPointsAward,
			discountedAmount: getActualTotal() - getTotal(),
			card_data: "Pick up in store (Guest)",
			onlineServicesFees: alreadySetLoyaltyPointsManagement.onlineServicesFees,
			androidPayCard: "No Android Pay Card (Guest)",
			applePayCard: "No Apple Pay Card (Guest)",
			applyPoints: false,
			// zipcode: cardData.billing_postal_code,
			appliedCoupon:
				appliedCouponData.expiry &&
				appliedCoupon &&
				appliedCouponAvailable &&
				new Date(appliedCouponData.expiry).toLocaleString() >=
					new Date().toLocaleString() &&
				new Date(appliedCouponData.expiry).toLocaleString() !== undefined
					? appliedCoupon
					: null,
			totalwithNoDiscounts: getActualTotal(),
			shippingFees: getShippingFee(),
			paidTaxes: getTaxes(),
			TaxPercentageSet:
				alreadySetLoyaltyPointsManagement &&
				alreadySetLoyaltyPointsManagement.purchaseTaxes,
			chosenShippingOption: carrierDataFromStorage && carrierDataFromStorage,
			appliedCouponData:
				appliedCouponData.expiry &&
				appliedCoupon &&
				appliedCouponAvailable &&
				new Date(appliedCouponData.expiry).toLocaleString() >=
					new Date().toLocaleString() &&
				new Date(appliedCouponData.expiry).toLocaleString() !== undefined
					? appliedCouponData
					: null,
			// firstPurchase: orderDataToCreate.firstPurchase,
		};

		createOrderGuest(
			"61b6646a33608c0bf5a32738",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI2NjQ2YTMzNjA4YzBiZjVhMzI3MzgiLCJpYXQiOjE2NDE1MTM1MTh9.8xXl6OHF5oCDnand3zXDXYU90OFMX5ezXZ88VrljCvM",
			createOrderData,
		)
			.then((response) => {
				clearCart();
				setData({
					loading: false,
					success: true,
				});
				toast.success("Reserved Successfully");
			})

			.catch((error) => {
				setData({ loading: false });
			});
	};

	const requiredNotation = () => {
		return (
			<>
				{chosenLanguage === "Arabic" ? (
					<span
						style={{
							fontSize: "11px",
							marginLeft: "10px",
							color: "red",
							fontWeight: "bold",
						}}>
						(مطلوب)
					</span>
				) : (
					<span
						style={{
							fontSize: "11px",
							marginLeft: "10px",
							color: "red",
							fontWeight: "bold",
						}}>
						Required*
					</span>
				)}
			</>
		);
	};

	const showDeliverToInfo = () => (
		<div>
			<div onBlur={() => setData({ ...data, error: "" })}>
				{data.clientToken !== null && cart.length > 0 ? (
					<div>
						<div
							className='text-center mb-3'
							style={{
								fontSize: "1.4rem",
								fontWeight: "bold",
								letterSpacing: chosenLanguage === "Arabic" ? "0px" : "4px",
								textShadow: "3px 3px 6px",
							}}>
							{chosenLanguage === "Arabic"
								? "معلومات شحنة العميل"
								: "Deliver to info:"}
						</div>
						<hr />

						<div className='row'>
							<div className='col-md-5 mx-auto'>
								<div className='form-group '>
									<label className='text-muted'>
										{chosenLanguage === "Arabic" ? "الاسم الكامل" : "Full Name"}{" "}
										{data.customerName && data.customerName.length > 3
											? null
											: requiredNotation()}
									</label>
									<input
										onChange={handleCustomerName}
										className='form-control'
										value={data.customerName}
										placeholder='Full Name'
										required
									/>
								</div>
							</div>
							<div className='col-md-5 mx-auto'>
								<div className='form-group '>
									<label className='text-muted'>
										{chosenLanguage === "Arabic" ? "رقم التليفون" : "Phone #"}{" "}
										{data.phone && data.phone.length > 5
											? null
											: requiredNotation()}
									</label>
									<input
										onChange={handlePhone}
										className='form-control'
										value={data.phone}
										placeholder='Please type your Phone Number. (e.g. 955-555-5555)'
										required
									/>
								</div>
							</div>
							<div className='col-md-5 mx-auto'>
								<div className='form-group'>
									<label className='text-muted'>
										{chosenLanguage === "Arabic" ? "بريد الالكتروني" : "Email"}
									</label>
									{data.email && data.email.length >= 5
										? null
										: requiredNotation()}
									<input
										onChange={handleDeliveryEmailAddress}
										className='form-control'
										value={data.email}
										placeholder='Email Address'
									/>
								</div>
							</div>

							<div className='col-md-5 mx-auto'>
								<div className='form-group'>
									<label className='text-muted'>
										{chosenLanguage === "Arabic"
											? "تعليقات أخرى"
											: "Further Comments"}
									</label>
									<textarea
										onChange={handleDeliveryComments}
										className='form-control'
										value={data.DeliveryComments}
										placeholder='Further Comments to better know your address'
									/>
								</div>
							</div>
						</div>
						<div className='col-md-8 mx-auto'>{couponForm()}</div>
					</div>
				) : null}
			</div>
		</div>
	);

	const showDropIn = () => {
		return (
			<div
				onBlur={() => setData({ ...data, error: "" })}
				style={{ marginBottom: "100px !important" }}>
				{data.clientToken !== null && cart.length > 0 ? (
					<>
						<DropIn
							options={{
								authorization: data.clientToken,
								// paypal: {
								// 	flow: "vault",
								// },
								googlePay: {
									flow: "vault",
								},
								applePay: {
									flow: "vault",
								},
							}}
							onInstance={(instance) => (data.instance = instance)}
						/>
						{data.phone && data.email ? (
							<button onClick={buy} className='btn btn-success btn-block'>
								Purchase
							</button>
						) : null}
					</>
				) : null}
			</div>
		);
	};

	const showError = (error) => (
		<div
			className='alert alert-danger'
			style={{ display: error ? "" : "none" }}>
			{error}
		</div>
	);

	const showSuccess = (success) => (
		<div
			className='alert alert-info'
			style={{ display: success ? "" : "none" }}>
			{chosenLanguage === "Arabic"
				? "شكرا! دفعت بنجاح"
				: "Thanks! Your payment was successful!"}
		</div>
	);

	const showLoading = (loading) =>
		loading && <h2 className='text-danger'>Loading...</h2>;

	return (
		<ShowCheckoutWrapper className='mt-2'>
			{cart && cart.length === 0 ? (
				<div
					className='text-center'
					style={{
						marginBottom: "590px",
						fontSize: "2rem",
						fontWeight: "bold",
						marginTop: "20px",
					}}>
					Your Cart Is Empty
					<br />
					<Link
						to='/our-products'
						style={{
							fontSize: "1.5rem",
							fontWeight: "bold",
						}}>
						Continue Shopping
					</Link>
				</div>
			) : (
				<>
					{data.clientToken !== null && cart.length > 0 ? (
						<div>
							<div className='row'>
								<div className='col-md-5 mx-auto mt-5'>
									{showDeliverToInfo()}
								</div>
								<div className='col-md-5 mx-auto mt-5'>
									<div
										className='text-center mb-3'
										style={{
											fontSize: "1.4rem",
											fontWeight: "bold",
											letterSpacing:
												chosenLanguage === "Arabic" ? "0px" : "4px",
											textShadow: "3px 3px 6px",
										}}>
										{chosenLanguage === "Arabic"
											? "ملخص سلة التسوق الخاصة بك"
											: "Your Cart Summary"}
									</div>

									<hr />
									<br />
									<h4 style={{ fontWeight: "bold", fontSize: "1rem" }}>
										Total Quantity:{" "}
										<span style={{ color: "#3498ff" }}>
											{total_items} units
										</span>
										<span
											className='updateCart'
											onClick={isSidebarOpen ? closeSidebar : openSidebar}
											style={{
												fontSize: "14px",
												color: "#7b7b7b",
												fontWeight: "bold",
												textShadow: "0px 0px 0px",
												cursor: "pointer",
												marginLeft: "20px",
												letterSpacing: "2px",
											}}>
											(Update Your Cart)
										</span>
									</h4>
									<hr />
									<h4 style={{ fontWeight: "bold", fontSize: "1rem" }}>
										Shipping Carrier:{" "}
										<span style={{ color: "#3498ff" }}>
											{carrierDataFromStorage &&
											carrierDataFromStorage.carrierName === "PickupInStore"
												? "In Store Pickup"
												: null}
										</span>
									</h4>
									<hr />
									<h4 style={{ fontWeight: "bold", fontSize: "1rem" }}>
										Shipping Fee:{" "}
										<span style={{ color: "#3498ff" }}>
											{total_amount >=
												alreadySetLoyaltyPointsManagement.freeShippingLimit &&
											alreadySetLoyaltyPointsManagement.freeShippingLimit !==
												0 ? (
												<span>
													<s
														style={{
															color: "red",
															marginRight: "10px",
															fontSize: "0.9rem",
														}}>
														{carrierDataFromStorage &&
															carrierDataFromStorage.shippingPrice.toFixed(
																2,
															)}{" "}
														KD
													</s>{" "}
													{getShippingFee().toFixed(2)} KD
												</span>
											) : (
												<span>
													{carrierDataFromStorage &&
														carrierDataFromStorage.shippingPrice}{" "}
													KD
												</span>
											)}
										</span>
									</h4>
									<hr />

									<h4 style={{ fontWeight: "bold", fontSize: "1rem" }}>
										Subtotal:{" "}
										<span style={{ color: "#3498ff" }}>
											{getTotalAmount() !== total_amount ? (
												<span>
													<s
														style={{
															color: "red",
															marginRight: "10px",
															fontSize: "0.9rem",
														}}>
														{total_amount.toFixed(2)} KD
													</s>{" "}
													{getTotalAmount().toFixed(2)} KD
												</span>
											) : (
												<span>{getTotalAmount().toFixed(2)} KD</span>
											)}
										</span>
									</h4>
									<hr />

									<h4 style={{ fontWeight: "bold", fontSize: "1rem" }}>
										Transaction Fee:{" "}
										<span style={{ color: "#3498ff" }}>
											{getTransactionFee() !== getActualTransactionFee() ? (
												<span>
													<s
														style={{
															color: "red",
															marginRight: "10px",
															fontSize: "0.9rem",
														}}>
														{getActualTransactionFee()} KD
													</s>{" "}
													{getTransactionFee()} KD
												</span>
											) : (
												<span>{getTransactionFee()} KD</span>
											)}
										</span>
										<br />
										<span style={{ fontSize: "11px", color: "#999999" }}>
											Transaction fee is{" "}
											{
												alreadySetLoyaltyPointsManagement.transactionFeePercentage
											}
											% of Subtotal +{"   "}
											{alreadySetLoyaltyPointsManagement.onlineServicesFees} KD
										</span>
									</h4>
									<h4
										style={{
											fontWeight: "bold",
											fontSize: "1rem",
											marginTop: "10px",
										}}>
										Taxes:{" "}
										<span style={{ color: "#3498ff" }}>
											{getTaxes() !== getActualTaxes() ? (
												<span>
													<s
														style={{
															color: "red",
															marginRight: "10px",
															fontSize: "0.9rem",
														}}>
														{getActualTaxes()} KD
													</s>{" "}
													{getTaxes()} KD (
													{alreadySetLoyaltyPointsManagement &&
														alreadySetLoyaltyPointsManagement.purchaseTaxes}
													% )
												</span>
											) : (
												<span>
													{getTaxes()} KD (
													{alreadySetLoyaltyPointsManagement &&
														alreadySetLoyaltyPointsManagement.purchaseTaxes}
													% )
												</span>
											)}
										</span>
									</h4>
									<div
										style={{
											borderBottom: "solid 2px #ffcece",
											marginTop: "20px",
										}}></div>

									<h3
										className='mt-3'
										style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
										Total Amount:{" "}
										<span style={{ color: "#3498ff" }}>
											{getActualTotal() !== getTotal() ? (
												<span>
													<s
														style={{
															color: "red",
															marginRight: "10px",
															fontSize: "1.2rem",
														}}>
														{getActualTotal()} KD
													</s>{" "}
													{getTotal()} KD
												</span>
											) : (
												<span>{getTotal()} KD</span>
											)}
										</span>
									</h3>
									<br />
								</div>
							</div>

							<div className='col-md-4 mx-auto my-2'>
								<button
									onClick={buyNoPayment}
									className='btn btn-success btn-block'>
									Reserve Now For Pick Up In Bukisha Store
								</button>
							</div>
							{alreadySetLoyaltyPointsManagement &&
							alreadySetLoyaltyPointsManagement.activatePayOnline ? (
								<>
									<div
										className='col-md-8 mx-auto mt-5'
										style={{
											borderTop: "solid 5px #0074e8",
											marginTop: "10px",
										}}></div>

									<div className='my-5 col-md-5 mx-auto'>{showDropIn()}</div>
									<br />
								</>
							) : null}
						</div>
					) : null}
					<div className='container'>
						{showLoading(data.loading)}
						{showSuccess(data.success)}
						{showError(data.error)}
					</div>
				</>
			)}
		</ShowCheckoutWrapper>
	);
};

export default CheckoutStorePickupGuest;

const ShowCheckoutWrapper = styled.div`
	overflow: hidden;
	margin-bottom: 9.5%;

	.updateCart:hover {
		color: black !important;
		font-size: 15px !important;
		transition: all 0.3s ease-in-out !important;
	}
	@media (max-width: 770px) {
		margin-right: 5%;
		margin-left: 5%;
		.updateCart {
			font-size: 10px !important;
		}
		.updateCart:hover {
			color: black !important;
			font-size: 12px !important;
			transition: all 0.3s ease-in-out !important;
		}
	}
`;
