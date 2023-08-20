import React, { useState, useEffect } from "react";
import { getSubscriptionData, getStoredPaymentData } from "../../apiCore";
import styled from "styled-components";

const SubscriptionDataInfo = ({ user, token }) => {
	const [subscriptionInfo, setSubscriptionInfo] = useState({});
	const [paymentInfo, setPaymentInfo] = useState({});

	useEffect(() => {
		if (user.subscriptionId) {
			getSubscriptionData(user._id, token, user.subscriptionId)
				.then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setSubscriptionInfo(data);
					}
				})
				.catch((err) => console.log(err));
		}

		if (user.subscriptionToken) {
			getStoredPaymentData(user._id, token, user.subscriptionToken)
				.then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						console.log(data, "payment Data");
						setPaymentInfo(data);
					}
				})
				.catch((err) => console.log(err));
		}
		// eslint-disable-next-line
	}, [user, token]);

	return (
		<SubscriptionDataInfoWrapper>
			<h4>Subscription Info:</h4>
			<p>
				Subscription ID: <strong>{subscriptionInfo.id}</strong>{" "}
			</p>
			<p>
				Status: <strong>{subscriptionInfo.status}</strong>{" "}
			</p>
			<p>
				Start date: <strong>{subscriptionInfo.createdAt}</strong>{" "}
			</p>
			<p>
				Next billing date: <strong>{subscriptionInfo.nextBillingDate}</strong>{" "}
			</p>
			{/* Additional payment info */}
			<h4>Payment Info:</h4>
			<p>
				Card Type: <strong>{paymentInfo.cardType}</strong>{" "}
			</p>
			<p>
				Card last 4 digits: <strong>********{paymentInfo.last4}</strong>{" "}
			</p>
			<p>
				Card expiry date: <strong>{paymentInfo.expirationDate}</strong>{" "}
			</p>
		</SubscriptionDataInfoWrapper>
	);
};

export default SubscriptionDataInfo;

const SubscriptionDataInfoWrapper = styled.div`
	margin-bottom: 20px;
	margin-top: 20px;

	h4 {
		font-weight: bolder;
		text-decoration: underline;
	}
	p {
		font-size: 0.95rem;
	}
`;
