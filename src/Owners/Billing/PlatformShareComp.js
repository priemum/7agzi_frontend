import React from "react";
import styled from "styled-components";
import DropIn from "braintree-web-drop-in-react";
import UpdateCardPlatformShare from "./UpdateCardPlatformShare";
import { toast } from "react-toastify";
import { updateUserCardFn } from "../../apiCore";
import StoredCardInfo from "./StoredCardInfo";

const PlatformShareComp = ({
	data,
	setData,
	buy,
	user,
	token,
	setUpdateCardClicked,
	updateCardClicked,
	language,
}) => {
	const updateUserCard = async () => {
		const { nonce } = await data.instance.requestPaymentMethod();
		updateUserCardFn(user._id, token, {
			paymentMethodNonce: nonce,
			paymentMethodToken: user.platFormShareToken,
		})
			.then((response) => {
				if (response.success) {
					toast.success("Card updated successfully");
					setTimeout(function () {
						window.location.reload(false);
					}, 4000);
				} else {
					toast.error("Failed to update card");
					setTimeout(function () {
						window.location.reload(false);
					}, 4000);
				}
			})
			.catch((error) => {
				toast.error("Error updating card");
				setTimeout(function () {
					window.location.reload(false);
				}, 4000);
			});
	};
	return (
		<PlatformShareCompWrapper>
			{user && user.platFormShare ? (
				<div className='col-md-6 platformShare mt-5'>
					<div>
						<h3>
							THANK YOU!
							<br />
							<br />
							<strong style={{ fontSize: "1.5rem", color: "darkgreen" }}>
								You have already submitted your card, our platform is now
								authorized to get transactions from you.
							</strong>
						</h3>
						<br />
						<br />
						<h5>
							{" "}
							<strong
								style={{
									fontSize: "1.3rem",
									textTransform: "uppercase",
									color: "black",
								}}
							>
								Thank you again for your business!
							</strong>{" "}
						</h5>
					</div>
					<div
						className='mt-4'
						style={{
							fontSize: "1.2rem",
							fontWeight: "bolder",
							color: "black",
						}}
					>
						<div>
							<div>
								<StoredCardInfo
									user={user}
									token={token}
									paymentMethodToken={user.platFormShareToken}
								/>
							</div>
						</div>
						If you would like to update your card,{" "}
						<div
							onClick={() => {
								setUpdateCardClicked(!updateCardClicked);
								if (updateCardClicked === true) {
									window.scrollTo({ top: 100, behavior: "smooth" });
								} else {
									window.scrollTo({ top: 300, behavior: "smooth" });
								}
							}}
							style={{
								fontSize: "1.4rem",
								fontWeight: "bolder",
								color: "darkgoldenrod",
								cursor: "pointer",
							}}
						>
							<strong>PLEASE CLICK HERE....</strong>
						</div>
					</div>
					<div>
						{updateCardClicked ? (
							<UpdateCardPlatformShare
								data={data}
								updateUserCard={updateUserCard}
							/>
						) : null}
					</div>
				</div>
			) : (
				<div className='col-md-6 platformShare mt-5'>
					<div onBlur={() => setData({ ...data, error: "" })}>
						{data && data.clientToken ? (
							<div className=' col-md-12'>
								<>
									{language === "Arabic" ? (
										<div dir='rtl'>
											<h3>المنصة ستحصل على 3 جنيهات مصرية من كل موعد</h3>
											<h5>
												الدفع الأولي سيكون{" "}
												<strong style={{ color: "black", fontSize: "1.3rem" }}>
													5 دولارات
												</strong>{" "}
												ومن ثم سيتم إعادة الشحن كل أسبوع بمقدار 3 جنيهات مصرية
												من إجمالي مواعيدك
											</h5>
										</div>
									) : (
										<>
											<h3>
												The platform's share will be 3 EGP from each appointment
											</h3>
											<h5>
												The initial payment will be{" "}
												<strong style={{ color: "black", fontSize: "1.3rem" }}>
													$5
												</strong>{" "}
												and then you will be re-charged 3 EGP each week based on
												your overall appointments
											</h5>
										</>
									)}
								</>

								<DropIn
									options={{
										authorization: data && data.clientToken,
										// paypal: {
										// 	flow: "vault",
										// },
										// googlePay: {
										// 	flow: "vault",
										// },
										// applePay: {
										// 	flow: "vault",
										// },
									}}
									onInstance={(instance) => (data.instance = instance)}
								/>
								<button
									onClick={buy}
									className='btn btn-success btn-block my-2 col-md-8 mx-auto'
								>
									Pay Now
								</button>

								{/* <button
											onClick={() => {
												// Adjust the amount according to your requirement
												const paymentData = {
													amount: 50, // Replace 30 with the amount you want to charge the customer
												};

												retriggerPayment(user._id, token, paymentData)
													.then((response) => {
														if (response.success) {
															toast.success(
																"You have successfully recharged your account!"
															);
														} else {
															toast.error(
																"Charge Failed. Please check your card details and balance."
															);
														}
													})
													.catch((error) => {
														console.error("Payment error:", error);
														toast.error(
															"There was a problem processing your payment."
														);
													});
											}}
											className='btn btn-info btn-block my-2 col-md-8 mx-auto'
										>
											Retrigger Amount
										</button> */}
							</div>
						) : null}
					</div>
				</div>
			)}
		</PlatformShareCompWrapper>
	);
};

export default PlatformShareComp;

const PlatformShareCompWrapper = styled.div``;
