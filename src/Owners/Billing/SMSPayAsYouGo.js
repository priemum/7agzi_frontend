import React from "react";
import styled from "styled-components";
import DropIn from "braintree-web-drop-in-react";
import UpdateCardSMSPayAsYou from "./UpdateCardSMSPayAsYou";
import {updateUserCardFn} from "../../apiCore";
import {toast} from "react-toastify";
import StoredCardInfo from "./StoredCardInfo";

const SMSPayAsYouGo = ({
	data,
	setData,
	buy_SMSAsYouGo,
	user,
	token,
	setUpdateCardClicked,
	updateCardClicked,
}) => {
	console.log(user.smsPayAsYouGoToken, "user.smsPayAsYouGoToken");
	const updateUserCard = async () => {
		const {nonce} = await data.instance.requestPaymentMethod();
		updateUserCardFn(user._id, token, {
			paymentMethodNonce: nonce,
			paymentMethodToken: user.smsPayAsYouGoToken,
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
		<SMSPayAsYouGoWrapper>
			{user && user.smsPayAsYouGo ? (
				<div className='col-md-6 platformShare mt-5'>
					<div>
						<h3>
							THANK YOU!
							<br />
							<br />
							<strong style={{fontSize: "1.5rem", color: "darkgreen"}}>
								You have already submitted your card, our platform is now
								authorized to charge you for your SMS/ Whats App. reminders and
								confirmation messages.
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
							<StoredCardInfo
								user={user}
								token={token}
								paymentMethodToken={user.smsPayAsYouGoToken}
							/>
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
									window.scrollTo({top: 100, behavior: "smooth"});
								} else {
									window.scrollTo({top: 300, behavior: "smooth"});
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
							<UpdateCardSMSPayAsYou
								data={data}
								updateUserCard={updateUserCard}
							/>
						) : null}
					</div>
				</div>
			) : (
				<div className='col-md-6 platformShare mt-5'>
					<div onBlur={() => setData({...data, error: ""})}>
						{data && data.clientToken ? (
							<div className=' col-md-12'>
								<h3>
									Platform will charge you weekly on whats app automatic
									messages
								</h3>
								<h5>
									Initial Payment Will be{" "}
									<strong style={{color: "black", fontSize: "1.3rem"}}>
										$2
									</strong>{" "}
									and then you will be re-charged every week based on how many
									messages were sent to your client
									<br />
									<strong style={{color: "black", fontSize: "1.3rem"}}>
										$0.03 per message
									</strong>
								</h5>
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
									onClick={buy_SMSAsYouGo}
									className='btn btn-success btn-block my-2 col-md-8 mx-auto'
								>
									Pay For <strong>AUTOMATIC</strong> Whats App Reminders
								</button>
							</div>
						) : null}
					</div>
				</div>
			)}
		</SMSPayAsYouGoWrapper>
	);
};

export default SMSPayAsYouGo;

const SMSPayAsYouGoWrapper = styled.div``;
