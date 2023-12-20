import React from "react";
import AffiliateLinksCard2 from "../AffiliateLinksCard2";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import styled from "styled-components";

const SingleAffiliateProduct = ({
	affiliateProducts,
	randomNumberArray,
	chosenIndex,
}) => {
	return (
		<SingleAffiliateProductWrapper className='mx-auto text-center'>
			{affiliateProducts &&
				affiliateProducts.length > 0 &&
				randomNumberArray &&
				randomNumberArray.length > 0 && (
					<div
						className='img-fluid images'
						onClick={() => {
							// Open new tab and navigate to product.affiliateLink
							window.open(
								affiliateProducts[chosenIndex].affiliateLink,
								"_blank"
							);

							// Track the event with Google Analytics
							ReactGA.event("Affiliate Link Clicked", {
								event_category: affiliateProducts[chosenIndex].productName
									.split(" ")
									.slice(0, 7)
									.join(" "),
								event_label: affiliateProducts[chosenIndex].productName
									.split(" ")
									.slice(0, 7)
									.join(" "),
								value: 1, // Optional extra parameters
							});

							// Track the event with Facebook Pixel
							ReactPixel.track("Affiliate Link Clicked", {
								content_name: affiliateProducts[chosenIndex].productName
									.split(" ")
									.slice(0, 7)
									.join(" "),
								content_category: affiliateProducts[chosenIndex].productName
									.split(" ")
									.slice(0, 7)
									.join(" "),
								value: "",
								currency: "",
							});
						}}
					>
						<AffiliateLinksCard2
							i={chosenIndex}
							product={affiliateProducts[chosenIndex]}
							key={chosenIndex}
						/>
					</div>
				)}
		</SingleAffiliateProductWrapper>
	);
};

export default SingleAffiliateProduct;

const SingleAffiliateProductWrapper = styled.div`
	position: relative;
	left: 100%;

	@media (max-width: 1300px) {
		left: 10px !important;
	}
`;
