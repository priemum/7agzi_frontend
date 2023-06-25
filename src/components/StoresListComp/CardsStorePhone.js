import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const CardsStorePhone = ({ store, allServicesCombined }) => {
	const ShowImage = ({ item }) => (
		<div>
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
							style={{ width: "100%", height: "100%", borderRadius: "5px" }}
							alt='Developed By Infinite-Apps.com'
							src={i.url}
							key={i.public_id}
						/>
					))}
				</Carousel>
			)}
		</div>
	);

	function shuffleArray(array) {
		let currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	const storeNameModified =
		store && store.addStoreName && store.addStoreName.split(" ").join("-");

	var servicesForStore =
		allServicesCombined &&
		allServicesCombined.filter(
			(i) => i.belongsTo && i.belongsTo._id === store.belongsTo._id
		) &&
		allServicesCombined &&
		allServicesCombined
			.filter((i) => i.belongsTo && i.belongsTo._id === store.belongsTo._id)
			.map((ii) => ii.catchyPhrase);

	servicesForStore = shuffleArray(servicesForStore);

	return (
		<CardsStorePhoneWrapper>
			<div className='btn-info p-1 mb-1' style={{ textTransform: "uppercase" }}>
				{servicesForStore[0]}
			</div>
			<div className='card-img-top  img'>
				<Link to={`/schedule/${storeNameModified}/${store.storePhone}`}>
					<ShowImage item={store} />
				</Link>
			</div>
			<div className='row py-2'>
				<div
					className='col-5 mx-auto'
					style={{
						color: "black",
						fontWeight: "bolder",
						textTransform: "uppercase",
						letterSpacing: "0px",
					}}
				>
					{store && store.addStoreName}

					<div>
						{" "}
						{store && store.belongsTo && store.belongsTo.storeDistrict}
					</div>
				</div>
				<div
					className='col-5 mx-auto'
					style={{ color: "red", fontWeight: "bolder" }}
				>
					5 MINS WALKING
					<div
						style={{ color: "green", fontWeight: "bolder", fontSize: "12px" }}
					>
						AVAILABLE NOW
					</div>
				</div>
			</div>
		</CardsStorePhoneWrapper>
	);
};

export default CardsStorePhone;

const CardsStorePhoneWrapper = styled.div`
	margin-top: 50px;
	margin-bottom: 20px;

	.row {
		background-color: white;
		margin: 0px 0px;
	}
`;
