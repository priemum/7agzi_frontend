/** @format */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CardForStore = ({ store }) => {
	const ShowImage = ({ item }) => (
		<div className='product-img' style={{ borderRadius: "50%" }}>
			{item && item.storeThumbnail && (
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
							alt='Developed By Infinite-Apps.com'
							src={i.url}
							key={i.public_id}
							style={{ height: "240px", width: "100%", objectFit: "cover" }}
						/>
					))}
				</Carousel>
			)}
		</div>
	);

	const storeNameModified =
		store && store.addStoreName && store.addStoreName.split(" ").join("-");

	return (
		<ProductWrapper className='my-3'>
			<div
				className='card '
				style={{ borderRadius: "5% 10%", backgroundColor: "#f7f7f6" }}
			>
				<div className='card-body  '>
					<div className='card-img-top  img'>
						<Link to={`/schedule/${storeNameModified}/${store.storePhone}`}>
							<ShowImage item={store} />
						</Link>
					</div>
					<div
						className='mt-3 mb-3'
						style={{
							fontSize: "18px",
							fontWeight: "bold",
							textTransform: "capitalize",
						}}
					>
						{store.belongsTo.storeType}
					</div>

					<div
						className='mt-3 mb-3'
						style={{
							fontSize: "18px",
							fontWeight: "bold",
							textTransform: "capitalize",
						}}
					>
						{store.addStoreName}
					</div>

					<div
						className='mt-3 mb-3'
						style={{
							fontSize: "13px",
							fontWeight: "bold",
						}}
					>
						Address: {store.belongsTo.storeAddress}
					</div>
				</div>
			</div>
		</ProductWrapper>
	);
};

export default CardForStore;

const ProductWrapper = styled.div`
	.card {
		box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.3);
		transition: var(--mainTransition);
		min-height: 550px;
	}
	.card:hover {
		box-shadow: 7px 10px 5px 0px rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}
	.card-img-top {
		transition: var(--mainTransition);
	}

	.card:hover .card-img-top {
		transform: scale(1.05);
		opacity: 0.7;
	}

	.card-body {
		font-weight: bold;
		/* letter-spacing: 2px; */
	}

	button {
		position: absolute;
		top: 80%;
		text-align: center;
		right: 23%;
	}
	@media (max-width: 900px) {
		.card {
			width: 100%;
		}
		button {
			top: 80%;
			text-align: center;
			right: 25%;
		}

		.cardData {
			font-size: 12px !important;
		}
		.BarberDetails {
			font-size: 12px !important;
		}
	}
`;
