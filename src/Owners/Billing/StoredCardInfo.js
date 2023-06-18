import React, {useEffect, useState} from "react";
import {getStoredPaymentData} from "../../apiCore";
import styled from "styled-components";

const StoredCardInfo = ({user, token, paymentMethodToken}) => {
	const [cardInfo, setCardInfo] = useState({});

	useEffect(() => {
		if (user.platFormShareToken) {
			// Check if token is defined
			getStoredPaymentData(user._id, token, paymentMethodToken)
				.then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setCardInfo(data);
					}
				})
				.catch((err) => console.log(err));
		}
		// eslint-disable-next-line
	}, [user, token]);

	return (
		<StoredCardInfoWrapper>
			<h4>
				{" "}
				<strong>Card Info:</strong>{" "}
			</h4>
			<div>Card Type: {cardInfo.cardType}</div>
			<div>Last Four Digits: ****{cardInfo.last4}</div>
			<div>Expiration Date: {cardInfo.expirationDate}</div>
		</StoredCardInfoWrapper>
	);
};

export default StoredCardInfo;

const StoredCardInfoWrapper = styled.div`
	margin-bottom: 20px;

	h4 {
		font-weight: bolder;
		text-decoration: underline;
	}
	div {
		font-size: 0.95rem;
	}
`;
