import React from "react";
import styled from "styled-components";
import AffiliateLinksCard from "./AffiliateLinksCard";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import Slider from "react-slick";

const AffiliateLinks = ({ affiliateProducts, loading = false }) => {
	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: true,
					infinite: true,
					autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow: 1.5,
					slidesToScroll: 1,
					autoplaySpeed: 5000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};

	return (
		<AffiliateLinksWrapper>
			{!loading ? (
				<div className='carousel thirdSection'>
					<div className='container-fluid'>
						<Slider {...settings}>
							{affiliateProducts &&
								affiliateProducts.map((product, i) => (
									<div
										className='img-fluid images'
										key={i}
										onClick={() => {
											// Open new tab and navigate to product.affiliateLink
											window.open(product.affiliateLink, "_blank");

											// Track the event with Google Analytics
											ReactGA.event("Affiliate Link Clicked", {
												event_category: product.productName
													.split(" ")
													.slice(0, 7)
													.join(" "),
												event_label: product.productName
													.split(" ")
													.slice(0, 7)
													.join(" "),
												value: 1, // Optional extra parameters
											});

											// Track the event with Facebook Pixel
											ReactPixel.track("Affiliate Link Clicked", {
												content_name: product.productName
													.split(" ")
													.slice(0, 7)
													.join(" "),
												content_category: product.productName
													.split(" ")
													.slice(0, 7)
													.join(" "),
												value: "",
												currency: "",
											});
										}}
									>
										<AffiliateLinksCard i={i} product={product} key={i} />
									</div>
								))}
						</Slider>
					</div>
				</div>
			) : null}
		</AffiliateLinksWrapper>
	);
};

export default AffiliateLinks;

const AffiliateLinksWrapper = styled.div`
	padding-top: 20px;
	padding-bottom: 20px;

	.thirdSection {
		padding: 10px 150px;
		background-color: #112234;
	}

	.slick-dots {
		display: none !important;
	}

	.quickLinks {
		text-align: center;
		margin: 10px 2px;
		font-size: 11px !important;
		font-weight: bolder;
		text-transform: uppercase;
		text-decoration: underline;
	}

	@media (max-width: 1100px) {
		.thirdSection {
			padding: 10px 0px;
		}

		.slick-dots {
			display: none !important;
		}

		.quickLinks {
			font-size: 12px;
			text-align: center;
			margin-top: 10px;
		}
	}
`;
