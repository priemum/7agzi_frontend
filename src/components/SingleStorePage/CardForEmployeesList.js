/** @format */

import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import styled from "styled-components";
import {views, viewsCounter} from "../../apiCore";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import {showAverageRating2} from "../SingleEmployee/Rating";

const CardForEmployeesList = ({employee, storeProperties, contact}) => {
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

	// eslint-disable-next-line
	const showViewButton = () => {
		return (
			<Link
				to={`/employee/${employeeNameModified}/${employee._id}${employee._id}${employee._id}`}
				className='mr-2'
				onClick={() => {
					window.scrollTo(0, 0);
				}}
			>
				<button className='btn btn-primary mt-2 mb-2 card-btn-1 mx-auto'>
					Barber Details
				</button>
			</Link>
		);
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
				className='btn btn-primary mt-2 mb-2 card-btn-1 mx-auto '
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
							style={{height: "240px", width: "240px", objectFit: "cover"}}
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
				style={{borderRadius: "5% 20%", backgroundColor: "#f7f7f6"}}
			>
				<div className='card-body  '>
					{shouldRedirect(redirect)}
					<div className='card-img-top center img'>
						{
							employee && employee.ratings && employee.ratings.length > 0 ? (
								<div className='mb-3'>{showAverageRating2(employee)}</div>
							) : null
							// <div
							// 	className='mb-2'
							// 	style={{
							// 		fontSize: "0.75rem",
							// 		fontStyle: "italic",
							// 		fontWeight: "bold",
							// 		color: "black",
							// 	}}
							// >
							// 	No Ratings
							// </div>
						}
						<Link
							to={`/employee/${employeeNameModified}/${employee._id}${employee._id}${employee._id}`}
							onClick={SettingViews}
						>
							<ShowImage item={employee} />
						</Link>
					</div>
					<div
						className='mt-2 mb-3'
						style={{
							fontSize: "18px",
							fontWeight: "bold",
							textAlign: "center",
							color: "black",
							textTransform: "capitalize",
						}}
					>
						{employee.employeeName}
					</div>
					<p
						style={{
							fontSize: "14px",
							fontWeight: "bold",
						}}
					>
						{/* <span className='mt-1'>
							<span style={{ color: "#ff9d36" }}>
								About {employee.employeeName}
							</span>{" "}
							:{" "}
							<span style={{ fontSize: "11.5px", textAlign: "center" }}>
								{employee.description}
							</span>
						</span> */}
						{/* <br /> */}
						{employee.workingDays.indexOf(chosenDateName) === -1 ? (
							<span
								style={{
									fontSize: "0.7rem",
									color: "red",
									textTransform: "capitalize",
								}}
							>
								Note: {employee.employeeName} is off today
							</span>
						) : null}
					</p>

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
								onClick={() => window.open(`tel:+1${contact && contact.phone}`)}
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

export default CardForEmployeesList;

const ProductWrapper = styled.div`
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
