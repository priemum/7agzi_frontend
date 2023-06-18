/** @format */

import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import styled from "styled-components";
import {views, viewsCounter} from "../../apiCore";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import {showAverageRating2} from "../SingleEmployee/Rating";

const CardForHomePage = ({employee, storeProperties, contact}) => {
	const [redirect, setRedirect] = useState(false);
	// eslint-disable-next-line
	const [viewss, setViewss] = useState(0);
	// eslint-disable-next-line
	const [viewsCounterr, setViewsCounterr] = useState(0);

	const SettingViews = () => {
		const employeeId = employee._id;
		const viewsLength = employee.views.length + 1;

		views(employeeId).then((data) => {
			setViewss(data.views.length);
		});
		viewsCounter(employeeId, viewsLength).then((data) => {
			setViewsCounterr(data.views.length);
		});
		window.scrollTo(0, 0);
	};

	const addItem = (item = [], next = (f) => f) => {
		let barber = [];
		barber = item._id;

		localStorage.setItem("barber", JSON.stringify(barber));
		next();
	};

	const AddEmployee = () => {
		// console.log('added');
		addItem(employee, setRedirect(true));
		window.scrollTo(0, 0);
	};

	const shouldRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to='/schedule-an-appointment' />;
		}
	};

	const scheduleAppointmentbtn = () => {
		return (
			<button
				onClick={AddEmployee}
				className='btn btn-primary mt-2 mb-2 card-btn-1 mx-auto BarberDetails'
			>
				Schedule An Appointment!
			</button>
		);
	};

	var days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	var d = new Date();
	// eslint-disable-next-line
	var chosenDateName = days[d.getDay()];

	const ShowImage = ({item}) => (
		<div className='product-img' style={{borderRadius: "50%"}}>
			{item && item.workPhotos && (
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
					{item.workPhotos.map((i) => (
						<img
							alt={item.employeeName}
							src={i.url}
							key={i.public_id}
							style={{
								height: "240px",
								width: "240px",
								objectFit: "cover",
							}}
						/>
					))}
				</Carousel>
			)}
		</div>
	);
	const employeeNameModified =
		employee &&
		employee.employeeName &&
		employee.employeeName.split(" ").join("-");

	return (
		<ProductWrapper className='my-3'>
			<div
				className='card '
				style={{borderRadius: "5% 20%", backgroundColor: "white"}}
			>
				<div className='card-body  '>
					{shouldRedirect(redirect)}
					<div className='card-img-top center img'>
						{employee && employee.ratings && employee.ratings.length > 0 ? (
							<div className='mb-3'>{showAverageRating2(employee)}</div>
						) : (
							<div
								className='mb-2'
								style={{
									fontSize: "0.75rem",
									fontStyle: "italic",
									fontWeight: "bold",
									color: "black",
								}}
							>
								No Ratings
							</div>
						)}
						<ImageFeat>
							<Link
								to={`/employee/${employeeNameModified}/${employee._id}${employee._id}${employee._id}`}
								onClick={SettingViews}
							>
								<ShowImage item={employee} />
							</Link>
						</ImageFeat>
					</div>
					<div
						className='mt-2 mb-3 cardData'
						style={{
							fontSize: "18px",
							fontWeight: "bolder",
							textAlign: "center",
						}}
					>
						{employee.employeeName}
					</div>
					{storeProperties && storeProperties.activeOnlineBooking ? (
						<div onClick={SettingViews}>
							{/* {showViewButton()} */}
							{scheduleAppointmentbtn()}
						</div>
					) : (
						<div>
							Please Call{" "}
							<Link
								style={{textDecoration: "underline"}}
								className='ml-2 noAppointFirstAvail'
								to='#'
								onClick={() => window.open(`tel:+1${contact.phone}`)}
							>
								{contact && contact.phone}
							</Link>
						</div>
					)}
				</div>
			</div>
		</ProductWrapper>
	);
};

export default CardForHomePage;

const ProductWrapper = styled.div`
	background-color: white;
	padding: 20px;

	.card {
		text-align: center;
		box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.3);
		transition: var(--mainTransition);
		min-height: 550px;
		width: 85%;
	}
	.card:hover {
		box-shadow: 7px 10px 5px 0px rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}
	.card-img-top {
		transition: var(--mainTransition);
	}

	.card:hover .card-img-top {
		transform: scale(1.1);
		opacity: 0.7;
	}

	.card-body {
		font-weight: bold;
		letter-spacing: 2px;
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

const ImageFeat = styled.div`
	img {
		object-fit: cover !important;
	}

	@media (max-width: 780px) {
		.product-imgs {
			width: 20px !important;
			height: 110px !important;
		}
	}
`;
