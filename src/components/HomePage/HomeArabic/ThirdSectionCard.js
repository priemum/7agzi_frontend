/** @format */

import React from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const ThirdSectionCard = ({
	salon,
	language,
	i,
	// changeCartSize
}) => {
	const ShowImage = ({ item }) => (
		<div style={{ height: "100%", width: "100%" }}>
			{item && item.storeThumbnail && (
				<div style={{ height: "100%", width: "100%" }}>
					<Carousel
						showArrows={false}
						dynamicHeight={true}
						autoPlay
						infiniteLoop
						interval={5000}
						showStatus={false}
						showIndicators={false}
						showThumbs={false}
					>
						{item.storeThumbnail.map((i) => (
							<img
								style={{
									width: "110%",
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

	const storeNameModified =
		salon && salon.addStoreName && salon.addStoreName.split(" ").join("-");

	return (
		<ThirdSectionCardWrapper dir='ltr'>
			<div className='card'>
				<div className='card-body'>
					<div className='card-img-top center'>
						<ImageFeat>
							<Link
								to={`/schedule/${storeNameModified}/${salon.belongsTo.phone}`}
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								<ShowImage item={salon} />
							</Link>
							<div className='salonDetails'>
								<div
									style={{
										fontWeight: "bolder",
										fontSize:
											salon.addStoreNameArabic.length > 13 ? "11px" : "15px",
									}}
								>
									{" "}
									<strong>{salon && salon.addStoreNameArabic}</strong>{" "}
								</div>
								<div className='address'>
									{salon && salon.belongsTo.storeGovernorate} |{" "}
									{salon && salon.belongsTo.storeDistrict}
								</div>
							</div>
						</ImageFeat>
					</div>
				</div>
			</div>
		</ThirdSectionCardWrapper>
	);
};

export default ThirdSectionCard;

const ThirdSectionCardWrapper = styled.div`
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
	width: 100% !important;

	.salonDetails {
		position: absolute;
		top: 75%;
		background-color: rgba(0, 0, 0, 0.7);
		padding: 5px;
		width: 100%;
		min-height: 70px;
	}

	.salonDetails > div {
		text-transform: capitalize;
	}

	@media (max-width: 750px) {
		.salonDetails {
			position: absolute;
			top: 73%;
			background-color: rgba(0, 0, 0, 0.7);
			padding: 5px;
			width: 100%;
		}

		.salonDetails > div {
			text-transform: capitalize;
		}

		.address {
			font-size: 11px;
		}
	}
`;
