import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { showAverageRatingForEntireStore } from "../SingleEmployee/Rating";
import {
	getEmployees,
	getFirstAvailableAppointmentEmployee,
} from "../../apiCore";
import { useCartContext } from "../../sidebar_context";
import useFadeInOnScroll from "./useFadeInOnScroll";

const NewCardPhone = ({ store, allServicesCombined }) => {
	const { chosenLanguage } = useCartContext();

	const [allEmployees, setAllEmployees] = useState("");
	const [firstAvailable, setFirstAvailable] = useState("");
	// Use the hook
	const [cardRef, cardVisible] = useFadeInOnScroll();

	const gettingAllEmployees = () => {
		getEmployees(store.belongsTo._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllEmployees(data);
			}
		});
	};

	const gettingFirstAvailable = () => {
		getFirstAvailableAppointmentEmployee(store.belongsTo._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setFirstAvailable(data);
			}
		});
	};

	useEffect(() => {
		gettingAllEmployees();
		gettingFirstAvailable();
		// eslint-disable-next-line
	}, []);

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
									width: "100%",
									height: "100%",
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

	function shuffleArray(array) {
		let currentIndex = array && array.length,
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

	var servicesForStore = store && store.services.map((i) => i.catchyPhrase);

	// eslint-disable-next-line
	servicesForStore = shuffleArray(servicesForStore);

	const allRatingArray = allEmployees && allEmployees.map((i) => i.ratings);

	function convertToMinutes(timeString) {
		if (!timeString) return 0; // return 0 or a sensible default value if timeString is undefined or null

		const timeArr = timeString.split(" ");
		let hours = 0;
		let minutes = 0;

		for (let i = 0; i < timeArr.length; i++) {
			if (timeArr[i] === "hour" || timeArr[i] === "hours") {
				hours = parseInt(timeArr[i - 1], 10);
			}

			if (timeArr[i] === "min" || timeArr[i] === "mins") {
				minutes = parseInt(timeArr[i - 1], 10);
			}
		}

		const totalMinutes = hours * 60 + minutes;
		return totalMinutes;
	}

	return (
		<CardsStorePhoneWrapper ref={cardRef} isVisible={cardVisible}>
			{/* <div className='btn-info p-1 mb-1' style={{ textTransform: "uppercase" }}>
				{servicesForStore[0]}
			</div> */}
			<Link
				to={`/schedule/${storeNameModified}/${store.storePhone}`}
				onClick={() => {
					window.scrollTo({ top: 1, behavior: "smooth" });
				}}
			>
				<div className='grid'>
					<div className='left'>
						<div className='card-img-top  img'>
							<Link to={`/schedule/${storeNameModified}/${store.storePhone}`}>
								<ShowImage item={store} />
							</Link>
						</div>

						<div
							dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
							className='store-info'
							style={{
								color: "white",
								fontWeight: "bolder",
								textTransform: "uppercase",
								letterSpacing: "0px",
								fontSize: "12px",
								textAlign: chosenLanguage === "Arabic" ? "right" : "",
								marginRight: chosenLanguage === "Arabic" ? "13px" : "",
							}}
						>
							{chosenLanguage === "Arabic" ? (
								<strong>
									{store &&
										store.addStoreNameArabic &&
										store.addStoreNameArabic.substring(0, 16)}{" "}
									{store &&
									store.addStoreNameArabic &&
									store.addStoreNameArabic.length > 16
										? "..."
										: ""}
								</strong>
							) : (
								<strong>
									{store &&
										store.addStoreName &&
										store.addStoreName.substring(0, 16)}{" "}
									{store && store.addStoreName && store.addStoreName.length > 16
										? "..."
										: ""}
								</strong>
							)}

							<div className=''>
								{showAverageRatingForEntireStore(
									allRatingArray,
									store,
									"FromList"
								)}
							</div>
							<div style={{ color: "white" }}>
								{" "}
								{store && store.belongsTo && store.belongsTo.storeDistrict}
							</div>
							<div
								style={{
									color: "#63c900",
									fontWeight: "bolder",
									fontSize: "11px",
								}}
							>
								{firstAvailable && firstAvailable.EgyptDate ? (
									<span>
										{chosenLanguage === "Arabic" ? "متاح" : "AVAILABLE"}
									</span>
								) : (
									<span style={{ color: "red" }}>
										{" "}
										{chosenLanguage === "Arabic"
											? "غير متاح"
											: "Unavailable"}{" "}
									</span>
								)}
								<div style={{ color: "darkgrey" }}>
									{firstAvailable && firstAvailable.EgyptDate}
									<br />
									{firstAvailable && firstAvailable.EgyptTime}
								</div>
							</div>
						</div>
					</div>
					{store.walking || store.drivingTime ? (
						<div
							className='right'
							style={{ color: "red", fontWeight: "bolder", fontSize: "12px" }}
						>
							{Number(convertToMinutes(store.walkingTime)) <= 120 ? (
								<span>{store.walkingTime} Walking</span>
							) : (
								<span>{store.drivingTime} Driving</span>
							)}
						</div>
					) : null}
				</div>
			</Link>
		</CardsStorePhoneWrapper>
	);
};

export default NewCardPhone;

const CardsStorePhoneWrapper = styled.div.attrs((props) => ({
	style: {
		opacity: props.isVisible ? 1 : 0,
		transition: "opacity 1s ease-in-out",
	},
}))`
	margin-top: 20px;
	margin-bottom: 20px;
	width: 100%;
	border-radius: 3px;

	.row {
		background-color: #222222;
		margin: 0px 0px;
		padding: 5px;
		border-radius: 4px;
		/* border: 1px solid grey; */
	}

	.grid {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 10px;
		background-color: #222222;
		margin: 0px 0px;
		padding: 5px;
		border-radius: 4px;
		/* border: 1px solid grey; */
		min-height: 170px;
		max-height: 200px;
		align-items: center; /* Center items vertically */
	}

	.left {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		align-items: center; /* Center items vertically */
	}

	.right {
		justify-self: end;
	}

	@media (max-width: 1000px) {
		margin-top: 7px;
		margin-bottom: 7px;
	}
`;
