/** @format */

import React from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const AffiliateLinksCard2 = ({
	product,
	language,
	i,
	// changeCartSize
}) => {
	const ShowImage = ({ item }) => (
		<div style={{ height: "100%", width: "100%" }}>
			{item && item.images && (
				<div style={{ height: "100%", width: "100%" }}>
					<Carousel
						showArrows={false}
						dynamicHeight={true}
						autoPlay
						infiniteLoop
						interval={3000}
						showStatus={false}
						showIndicators={false}
						showThumbs={false}
					>
						{item.images.map((i) => (
							<img
								style={{
									width: "75%",
									borderRadius: "5px",
									objectFit: "cover",
								}}
								alt='Developed By Infinite-Apps.com'
								src={i.url}
								key={i.public_id}
							/>
						))}
					</Carousel>
				</div>
			)}
		</div>
	);

	return (
		<AffiliateLinksCardWrapper className=''>
			<div className='card mx-auto'>
				<div className='card-body'>
					<div className='card-img-top center'>
						<ImageFeat>
							<Link
								to={`#`}
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								<ShowImage item={product} />
							</Link>
							<div className='productDetails'>
								<div>
									{product &&
										(product.productName.split(" ").length > 7
											? product.productName.split(" ").slice(0, 7).join(" ") +
											  "..."
											: product.productName)}
								</div>
							</div>
						</ImageFeat>
					</div>
				</div>
			</div>
		</AffiliateLinksCardWrapper>
	);
};

export default AffiliateLinksCard2;

const AffiliateLinksCardWrapper = styled.div`
	margin-right: 20px;

	.card {
		transition: var(--mainTransition);
		width: 100%;
		background-color: #141414;
	}

	.card:hover {
		box-shadow: 2.5px 2.5px 1.5px 0px rgba(0, 0, 0, 0.3);
		cursor: pointer;
	}
	.card-img-top {
		transition: var(--mainTransition);
	}

	/*To zoom in into the picture when hovering */
	.card:hover .card-img-top {
		transform: scale(1);
		opacity: 0.4;
	}

	.card-body {
		font-weight: bold;
		padding: 0px !important;
		width: 100%;
		margin-left: 7px;
		min-height: 300px;
	}

	@media (max-width: 680px) {
		/* .card {
    width: 100%;
    height: 100%;
} */

		.card {
			width: 100%;
			margin: 0px !important;
		}

		.card-body {
			padding: 0px !important;
			width: 100%;
			margin-left: ${(props) => (props.show % 2 === 0 ? "" : "5px")};
		}
	}
`;

const ImageFeat = styled.div`
	width: 97% !important;

	.productDetails {
		position: absolute;
		top: 75%;
		background-color: rgba(0, 0, 0, 0.7);
		padding: 5px;
		width: 100%;
		min-height: 70px;
	}

	.productDetails > div {
		text-transform: capitalize;
		color: white !important;
	}

	@media (max-width: 750px) {
		.productDetails {
			position: absolute;
			top: 73%;
			background-color: rgba(0, 0, 0, 0.7);
			padding: 5px;
			width: 98%;
		}

		.productDetails > div {
			text-transform: capitalize;
		}

		.address {
			font-size: 11px;
		}
	}
`;
