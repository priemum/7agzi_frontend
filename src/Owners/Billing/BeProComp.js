import React from "react";
import styled from "styled-components";
import DropIn from "braintree-web-drop-in-react";
import UpdateCardBeProComp from "./UpdateCardBeProComp";
import { updateSubscriptionCardFn } from "../../apiCore";
import { toast } from "react-toastify";
import SubscriptionDataInfo from "./SubscriptionDataInfo";

const BeProComp = ({
	data,
	setData,
	buy_subscribe,
	user,
	token,
	updateCardClicked,
	setUpdateCardClicked,
}) => {
	const updateSubscriptionCard = async () => {
		const { nonce } = await data.instance.requestPaymentMethod();
		updateSubscriptionCardFn(user._id, token, {
			paymentMethodNonce: nonce,
			paymentMethodToken: user.subscriptionToken,
			subscriptionId: user.subscriptionId,
		})
			.then((response) => {
				if (response.success) {
					toast.success("Card updated successfully for your PRO subscription");
					setTimeout(function () {
						window.location.reload(false);
					}, 4000);
				} else {
					toast.error("Failed to update card for your PRO subscription");
					setTimeout(function () {
						window.location.reload(false);
					}, 4000);
				}
			})
			.catch((error) => {
				toast.error("Error updating card for your PRO subscription");
				setTimeout(function () {
					window.location.reload(false);
				}, 4000);
			});
	};
	return (
		<BeProCompWrapper>
			{user && user.subscribed ? (
				<div className='col-md-6 platformShare mt-5'>
					<div>
						<h3>
							THANK YOU!
							<br />
							<br />
							<strong style={{ fontSize: "1.5rem", color: "darkgreen" }}>
								You have already submitted your card, our XLOOK is now
								authorized to get monthly transactions from you.
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
					<div>
						<div>
							<SubscriptionDataInfo user={user} token={token} />
						</div>
					</div>
					<div
						className='mt-4'
						style={{
							fontSize: "1.2rem",
							fontWeight: "bolder",
							color: "black",
						}}
					>
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
							<UpdateCardBeProComp
								data={data}
								updateUserCard={updateSubscriptionCard}
							/>
						) : null}
					</div>
				</div>
			) : (
				<div className='col-md-6 platformShare mt-5'>
					<div onBlur={() => setData({ ...data, error: "" })}>
						{data && data.clientToken ? (
							<div className=' col-md-12'>
								<h3>
									Our PRO PLAN costs{" "}
									<strong style={{ color: "black" }}>EGP 500/ Month</strong>{" "}
								</h3>
								<ul
									className='mx-auto col-md-8'
									style={{ fontWeight: "bolder" }}
								>
									<li>
										Our Pro Partners Have The Priority In Our Marketing Strategy
										So You Will Get More Clients
									</li>
									<li>Receiving Coupons Regularly</li>
									<li>Point Of Sale System In Your Store.</li>
									<li>Adding Unlimited Employees</li>
									<li>
										More Reports and More Historical View To Know Your KPI's
									</li>
								</ul>

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
									onClick={buy_subscribe}
									className='btn btn-success btn-block my-2 col-md-8 mx-auto'
								>
									Subscribe to our PRO plan
								</button>
							</div>
						) : null}
					</div>
				</div>
			)}
		</BeProCompWrapper>
	);
};

export default BeProComp;

const BeProCompWrapper = styled.div`
	ul {
		list-style-type: none; /* Remove default bullets */
	}

	ul li {
		padding-left: 1.5em; /* Add some padding to the left of list items */
	}

	ul li::before {
		content: "✔︎"; /* Insert content before each li element */
		padding-right: 0.5em; /* Add some padding to the right of the check mark */
		color: green; /* Make the check mark green */
	}
`;
