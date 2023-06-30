/** @format */

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { views, viewsCounter } from "../../apiCore";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { showAverageRating2 } from "../SingleEmployee/Rating";
import StarRating from "react-star-ratings";

const CardEmployeePhone = ({ employee, storeProperties, contact }) => {
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
				className='btn btn-primary btn-block card-btn-1 mx-auto '
			>
				BOOK NOW!
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

	const ShowImage = ({ item }) => (
		<div className='product-img'>
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
								height: "75%",
								width: "100%",
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
		<ProductWrapper className='cardPhone'>
			{shouldRedirect(redirect)}

			<div className='card-img-top center img'>
				<Link
					to={`/employee/${employeeNameModified}/${employee._id}${employee._id}${employee._id}`}
					onClick={SettingViews}
				>
					<ShowImage item={employee} />
				</Link>
			</div>
			<div className='row mb-4'>
				<div className='col-6'>
					<div
						className='mt-2 ml-4'
						style={{
							fontSize: "18px",
							fontWeight: "bold",
							color: "white",
							textTransform: "uppercase",
						}}
					>
						{employee.employeeName}
					</div>
					{employee && employee.ratings && employee.ratings.length > 0 ? (
						<div className='mb-1 ml-4'>{showAverageRating2(employee)}</div>
					) : (
						<div className='mb-1 ml-4'>
							<span>
								<StarRating
									starDimension='20px'
									starSpacing='2px'
									starRatedColor='#ffba3b'
									rating={3.5}
									editing={false}
								/>{" "}
							</span>
						</div>
					)}

					<div className='ml-4'>
						{employee &&
							employee.services &&
							employee.services.map((s, i) => {
								if (i <= 4) {
									// Check if current element is the last one in the iteration or the 5th one (since we're showing max 5 items)
									const isLastElement =
										i === employee.services.length - 1 || i === 4;

									return (
										<span
											style={{
												color: "lightgrey",
												textTransform: "uppercase",
												fontSize: "11px",
											}}
											key={i}
										>
											{s.serviceName} {isLastElement ? "" : "- "}
										</span>
									);
								} else {
									return null;
								}
							})}
					</div>
					<p
						style={{
							fontSize: "14px",
							fontWeight: "bold",
						}}
					>
						{employee.workingDays.indexOf(chosenDateName) === -1 ? (
							<span
								style={{
									fontSize: "0.7rem",
									color: "red",
									textTransform: "uppercase",
								}}
							>
								Note: {employee.employeeName} is off today
							</span>
						) : null}
					</p>
				</div>

				<div className='col-6 mt-3'>
					{storeProperties && storeProperties.activeOnlineBooking ? (
						<div onClick={SettingViews} className='mr-3'>
							{/* {showViewButton()} */}
							{scheduleAppointmentbtn()}
							<div
								className='mx-auto mt-2 text-center'
								style={{
									fontSize: "12px",
									color: "lightgreen",
									fontWeight: "bolder",
								}}
							>
								<strong>AVAILABLE TODAY</strong>
							</div>
						</div>
					) : (
						<div>
							Please Call{" "}
							<Link
								style={{ textDecoration: "underline" }}
								className='ml-4 noAppointFirstAvail'
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

export default CardEmployeePhone;

const ProductWrapper = styled.div`
	display: none;

	@media (max-width: 1000px) {
		display: block;

		button {
			background-color: #222427;
			border: 1px solid #222427;
			font-size: 15px;
			font-weight: bolder;
		}
	}
`;
