import React, { useState } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import StarRating from "react-star-ratings";
import { Modal } from "antd";
import { showAverageRating } from "./Rating";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "grey",
			fontWeight: "bolder",
			padding: "5px 0px 5px 0px",
			border: "lightgrey 1px solid",
			textAlign: "center",
			borderRadius: "5px",
			marginRight: "5px",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			fontSize: "11.5px",

			// textDecoration: "underline",
		};
	} else {
		return {
			fontWeight: "bolder",
			padding: "5px 0px 5px 0px",
			border: "lightgrey 1px solid",
			textAlign: "center",
			borderRadius: "5px",
			marginRight: "5px",
			marginLeft: "3px",
			fontSize: "11.5px",
			cursor: "pointer",
		};
	}
};

const isActive2 = (history, path) => {
	if (history === path) {
		return {
			background: "black",
			fontWeight: "bolder",
			padding: "5px 0px 5px 0px",
			border: "lightgrey 1px solid",
			textAlign: "center",
			borderRadius: "5px",
			marginRight: "5px",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			fontSize: "11.5px",

			// textDecoration: "underline",
		};
	} else {
		return {
			fontWeight: "bolder",
			background: "#00182f",
			padding: "5px 0px 5px 0px",
			border: "white 1px solid",
			textAlign: "center",
			borderRadius: "5px",
			fontSize: "11.5px",
			cursor: "pointer",
		};
	}
};

const Section1Phone = ({
	storeProperties,
	Employee,
	employeeIsWorkingTodayLogic,
	user,
	contact,
	addItem,
	handleModal,
	modalVisible,
	setModalVisible,
	star,
	onStarClick,
	commentForm,
	historicalComments,
	history,
}) => {
	const [clickedMenu, setClickedMenu] = useState("PROFILE");

	const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(true);
	const [swipeStart, setSwipeStart] = useState({ x: 0, y: 0 });

	const handleTouchStart = (e) => {
		setSwipeStart({
			x: e.changedTouches[0].screenX,
			y: e.changedTouches[0].screenY,
		});
	};

	const handleTouchEnd = (e) => {
		let swipeEndX = e.changedTouches[0].screenX;
		let swipeEndY = e.changedTouches[0].screenY;
		let swipeDiffX = swipeEndX - swipeStart.x;
		let swipeDiffY = swipeEndY - swipeStart.y;

		if (Math.abs(swipeDiffX) > Math.abs(swipeDiffY)) {
			setIsHorizontalSwipe(true);
		} else {
			setIsHorizontalSwipe(false);
		}
	};

	var previousAddedHours =
		Employee &&
		Employee.workingHours &&
		Employee.workingHours.map((time) => {
			const [hours, minutes] = time.split(":");
			return `${hours.padStart(2, "0")}:${minutes}`;
		});

	var weekDays = [
		{ abbr: "SUN", full: "Sunday" },
		{ abbr: "MON", full: "Monday" },
		{ abbr: "TUES", full: "Tuesday" },
		{ abbr: "WED", full: "Wednesday" },
		{ abbr: "THURS", full: "Thursday" },
		{ abbr: "FRI", full: "Friday" },
		{ abbr: "SAT", full: "Saturday" },
	];

	function findDayIndex(weekDays, chosenDay) {
		// Ensure chosenDay is trimmed and converted to the proper case.
		var modifiedChosenDay = chosenDay.trim();

		// Find the index of the day object in the weekDays array.
		return weekDays.findIndex(
			(day) =>
				day.abbr.toUpperCase() === modifiedChosenDay.toUpperCase() ||
				day.full.toUpperCase() === modifiedChosenDay.toUpperCase()
		);
	}

	const chosenDays =
		Employee && Employee.workingDays && Employee.workingDays.length > 0
			? Employee.workingDays
			: ["Nothing"];
	const indices = chosenDays.map((chosenDay) =>
		findDayIndex(weekDays, chosenDay)
	);

	//Scroll Effect on phones
	return (
		<Section1PhoneWrapper>
			<div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
				{Employee && Employee.workPhotos && (
					<Carousel
						autoPlay
						infiniteLoop
						interval={5000}
						showStatus={false}
						showThumbs={false}
						autoFocus={true}
						showArrows={false}
						dynamicHeight={true}
						// showIndicators={true}
						swipeable={isHorizontalSwipe}
						// swipeScrollTolerance={"100%"}
					>
						{Employee.workPhotos.map((i) => (
							<img
								alt={Employee && Employee.employeeName}
								src={i.url}
								key={i.public_id}
								style={{ objectFit: "cover", minHeight: "450px" }}
							/>
						))}
					</Carousel>
				)}
			</div>
			<div className='onCarousel'>
				<div
					style={{
						fontSize: "1.2rem",
						fontWeight: "bolder",
						marginLeft: "10px",
						textTransform: "uppercase",
						color: "white",
					}}
				>
					<strong>{Employee && Employee.employeeName} </strong>
				</div>

				<div className='row'>
					<div className='col-5'>
						<div
							style={{
								fontSize: "1.05rem",
								fontWeight: "bolder",
								marginLeft: "10px",
								textTransform: "uppercase",
								color: "white",
							}}
						>
							{storeProperties && storeProperties.addStoreName}
						</div>
					</div>

					<div className='col-7'>
						<div
							style={{
								fontSize: "1.05rem",
								fontWeight: "bolder",
								marginLeft: "10px",
								textTransform: "uppercase",
								color: "white",
							}}
						>
							{Employee && Employee.ratings && Employee.ratings.length > 0 ? (
								showAverageRating(Employee)
							) : (
								<div
									className='mt-2'
									style={{
										fontSize: "0.75rem",
										fontStyle: "italic",
										fontWeight: "bold",
										color: "white",
									}}
								>
									<div className='mb-2'>
										<span>
											<StarRating
												starDimension='15px'
												starSpacing='1px'
												starRatedColor='#ffba3b'
												rating={3.5}
												editing={false}
											/>{" "}
										</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='ml-3'>
					{Employee &&
						Employee.services &&
						Employee.services.map((s, i) => {
							if (i <= 4) {
								// Check if current element is the last one in the iteration or the 5th one (since we're showing max 5 items)
								const isLastElement =
									i === Employee.services.length - 1 || i === 4;

								return (
									<span
										style={{
											color: "darkgrey",
											textTransform: "uppercase",
											fontSize: "12px",
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
			</div>

			<div
				className='row'
				style={{
					background: "#1e1e1e",
					padding: "5px 0px",
					paddingLeft: "20px",
					paddingTop: "10px",
					paddingBottom: "10px",
				}}
			>
				<div
					className='col-2 navLinks'
					style={isActive(clickedMenu, "PROFILE")}
					onClick={() => setClickedMenu("PROFILE")}
				>
					PROFILE
				</div>
				<div
					className='col-2 navLinks'
					style={isActive(clickedMenu, "REVIEWS")}
					onClick={() => setClickedMenu("REVIEWS")}
				>
					REVIEWS
				</div>
				<div
					className='col-4 navLinks'
					style={isActive(clickedMenu, "LEAVE A COMMENT")}
					onClick={() => {
						setClickedMenu("LEAVE A COMMENT");
						handleModal();
					}}
				>
					LEAVE A COMMENT
					<React.Fragment>
						<Modal
							title={
								<div
									style={{
										textAlign: "center",
										margin: "10px",
										padding: "5px",
										fontWeight: "bold",
										textTransform: "uppercase",
									}}
								>
									{`Please leave a Star Rating and a Comment for ${
										Employee && Employee.employeeName
									}`}
								</div>
							}
							open={modalVisible}
							onOk={() => {
								setModalVisible(false);
								toast.success(`Thank you for your Feedback ${user.name}`);
							}}
							okButtonProps={{ style: { display: "none" } }}
							cancelButtonProps={{ style: { display: "none" } }}
							onCancel={() => setModalVisible(false)}
						>
							<h5
								className='mt-4 mb-2'
								style={{
									fontWeight: "bold",
									fontStyle: "italic",
									textTransform: "capitalize",
								}}
							>
								Please Leave a Rating
							</h5>
							<StarRating
								name={Employee && Employee._id}
								numberOfStars={5}
								rating={star}
								changeRating={onStarClick}
								isSelectable={true}
								starRatedColor='red'
							/>
							<br />
							<div className='mt-5'>
								{/* {FileUploadComments()} */}
								{commentForm()}
							</div>
						</Modal>
					</React.Fragment>
				</div>

				<div
					className='col-3 navLinks'
					style={isActive2(clickedMenu, "SCHEDULE")}
					onClick={() => {
						if (storeProperties && storeProperties.activeOnlineBooking) {
							setClickedMenu("SCHEDULE");
							history.push("/schedule-an-appointment");
							addItem(Employee);
						}
					}}
				>
					SCHEDULE
				</div>
			</div>

			{clickedMenu === "PROFILE" ? (
				<>
					<h2 className='mt-3 mb-1'>WHO AM I?</h2>

					<div className='secondSection'>
						<div className='row'>
							<div className='col-md-6 about-us'>
								<div
									className='ml-3'
									dangerouslySetInnerHTML={{
										__html: Employee && Employee.description,
									}}
								/>
							</div>
						</div>
					</div>

					<h2 className='mt-3 mb-1'>WORKING TIME</h2>

					<div className='thirdSection'>
						<div>
							Working Days:{" "}
							{weekDays.map((d, i) => {
								return (
									<span
										key={i}
										className='ml-2'
										style={{
											fontSize: "11px",
											fontWeight: "bolder",
											color: indices.indexOf(i) === -1 ? "#ffb1b1" : "#b1ffd8",
										}}
									>
										{d.abbr}
									</span>
								);
							})}
						</div>

						<div className='my-2 row'>
							<div className='col-2' style={{ fontSize: "10px" }}>
								WORKING HOURS:
							</div>
							<div className='col-6' style={{ fontSize: "11px" }}>
								<div className='row'>
									<div className='col-3'>
										FROM:
										<br />
										TO:
									</div>

									<div className='col-3'>
										{previousAddedHours && previousAddedHours[0]}
										<br />
										{previousAddedHours &&
											previousAddedHours[previousAddedHours.length - 1]}
									</div>
								</div>
							</div>

							<div
								className='col-12'
								style={{
									color: "#ffb1b1",
									fontWeight: "bolder",
									fontSize: "12px",
									textTransform: "uppercase",
								}}
							>
								{!employeeIsWorkingTodayLogic() ? (
									<div
										className='mt-2'
										style={{
											fontSize: "12px",
											fontStyle: "italic",
											fontWeight: "bold",
											color: "#ffcdcd",
										}}
									>
										Please note that {Employee && Employee.employeeName} is not
										working today, but you still can schedule an appointment for
										future days. <br />
										Check the working days below.
									</div>
								) : (
									<div
										className='mt-2'
										style={{
											fontSize: "11px",
											fontStyle: "italic",
											fontWeight: "bold",
											color: "#cdffcd",
										}}
									>
										{Employee && Employee.employeeName} is available today! In
										case you would like to schedule for other days, please check
										the stylist working days below.
									</div>
								)}
							</div>
						</div>
					</div>
				</>
			) : null}

			{clickedMenu === "REVIEWS" ? (
				<div className='p-2 comments'>{historicalComments()}</div>
			) : null}

			<div className='col-md-5 mx-auto mt-3'>
				<div className='row text-center col-lg-12 col-md-11 mx-auto py-5 buttons'>
					{storeProperties && storeProperties.activeOnlineBooking ? (
						<div
							className='col-md-3 btn btn-outline-primary p-2 mx-auto mt-2'
							style={{
								fontSize: "0.9rem",
								fontWeight: "bolder",
								color: "white",
							}}
							onClick={() => {
								history.push("/schedule-an-appointment");
								addItem(Employee);
							}}
						>
							<span>
								<i className='fa fa-calendar mr-2' aria-hidden='true'></i>
							</span>
							Schedule Now
						</div>
					) : (
						<div
							className='col-md-3 btn btn-outline-primary p-2 mx-auto mt-2'
							style={{
								fontSize: "0.9rem",
								fontWeight: "bolder",
								color: "white",
							}}
						>
							Call{" "}
							<Link
								style={{ textDecoration: "underline" }}
								className=''
								to='#'
								onClick={() => window.open(`tel:+2${contact && contact.phone}`)}
							>
								{contact && contact.phone}
							</Link>
						</div>
					)}

					<div
						className='col-md-4 btn btn-outline-danger p-2 mx-auto mt-2'
						style={{ fontSize: "0.9rem", fontWeight: "bolder", color: "white" }}
						onClick={() =>
							history.push(
								`/schedule/${storeProperties.addStoreName}/${storeProperties.belongsTo.phone}`
							)
						}
					>
						<span>
							<i className='fas fa-home mr-2'></i>
						</span>
						Back to Stylists Page
					</div>
				</div>
			</div>
		</Section1PhoneWrapper>
	);
};

export default Section1Phone;

const Section1PhoneWrapper = styled.div`
	@media (max-width: 1000px) {
		.thumbs,
		.animated,
		.control-dots {
			display: none;
		}

		.onCarousel {
			position: absolute;
			top: 350px;
			background-color: rgba(0, 0, 0, 0.75);
			color: white;
			padding: 30px 20px;
			border-radius: 100px 20px;
		}

		.secondSection {
			padding: 20px 5px;
			background-color: #2b2e31;
		}

		h2 {
			font-size: 1.1rem;
			margin-left: 5px;
			font-weight: bolder;
			color: white;
			text-transform: uppercase;
		}

		.thirdSection {
			padding: 10px 2px;
			background-color: #2b2e31;
		}

		.comments {
			color: black;
			width: 100% !important;
		}
	}
`;
