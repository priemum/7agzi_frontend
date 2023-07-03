import React from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import StarRating from "react-star-ratings";
import { Modal } from "antd";
import { showAverageRating } from "./Rating";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const Section1PC = ({
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
	history,

	props,
}) => {
	return (
		<Section1PCWrapper>
			<div className='row'>
				<div className='col-md-6 text-center  mt-3'>
					{Employee && Employee.workPhotos && (
						<Carousel
							autoPlay
							infiniteLoop
							interval={3000}
							showStatus={false}
							// dynamicHeight={true}
							showThumbs={true}
							thumbWidth={70}
							width={"100%"}
							autoFocus={true}
						>
							{Employee.workPhotos.map((i) => (
								<img
									alt={Employee.employeeName}
									src={i.url}
									key={i.public_id}
									style={{ borderRadius: "15px" }}
								/>
							))}
						</Carousel>
					)}
				</div>
				<div
					className='col-md-5 mx-auto mt-3'
					style={{ border: "1px solid lightgrey", borderRadius: "15px" }}
				>
					<h3
						className='text-title mb-4 my-3'
						style={{
							backgroundColor: "black",
							textAlign: "center",
							padding: "8px",
							color: "grey",
							fontStyle: "italic",
						}}
					>
						Stylist Name: {Employee && Employee.employeeName}
						{!employeeIsWorkingTodayLogic() ? (
							<div
								className='mt-2'
								style={{
									fontSize: "0.75rem",
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
									fontSize: "0.75rem",
									fontStyle: "italic",
									fontWeight: "bold",
									color: "#cdffcd",
								}}
							>
								{Employee && Employee.employeeName} is available today! In case
								you would like to schedule for other days, please check the
								stylist working days below.
							</div>
						)}
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
								No Ratings
							</div>
						)}
					</h3>

					<p
						className='text-capitalize text-title mt-2'
						style={{ color: "#0052a5" }}
					>
						A little bit about {Employee && Employee.employeeName}:{" "}
					</p>

					<p
						className='single-Product-Description-Style'
						style={{ fontSize: "0.85rem" }}
					>
						<div
							className='ml-3'
							dangerouslySetInnerHTML={{
								__html: Employee && Employee.description,
							}}
						/>
					</p>
					<p
						className='single-Product-Description-Style'
						style={{ fontSize: "0.85rem" }}
					>
						{Employee && Employee.description1}
						<br />
					</p>
					<p
						className='single-Product-Description-Style'
						style={{ fontSize: "0.85rem" }}
					>
						{Employee && Employee.description2}
					</p>
					<ul>
						<p
							className='text-capitalize text-title'
							style={{ color: "#0052a5" }}
						>
							{Employee && Employee.employeeName}'s Working Days and Hours:
						</p>
						<div className='row'>
							<div className='col-md-4 mt-3'>
								{Employee &&
									Employee.workingDays &&
									Employee.workingDays.map((e, i) => (
										<li key={i} className='ml-4' style={{ fontSize: "0.9rem" }}>
											{e}
										</li>
									))}
							</div>
							<div className='col-md-6 mt-3'>
								<div className='row'>
									{Employee &&
										Employee.workingHours &&
										Employee.workingHours.sort() &&
										Employee.workingHours.sort().map((h, i) => (
											<div className='col-3'>
												<li
													key={i}
													className='ml-4'
													style={{ fontSize: "0.9rem" }}
												>
													{h}
												</li>
											</div>
										))}
								</div>
							</div>
						</div>
					</ul>
					<br />
					<hr />
					<div className='row text-center col-lg-12 col-md-11 mx-auto my-5 buttons'>
						{storeProperties && storeProperties.activeOnlineBooking ? (
							<div
								className='col-md-3 btn btn-outline-primary p-2 mx-auto mt-2'
								style={{ fontSize: "0.9rem", fontWeight: "bolder" }}
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
								style={{ fontSize: "0.9rem", fontWeight: "bolder" }}
							>
								Call{" "}
								<Link
									style={{ textDecoration: "underline" }}
									className=''
									to='#'
									onClick={() =>
										window.open(`tel:+2${contact && contact.phone}`)
									}
								>
									{contact && contact.phone}
								</Link>
							</div>
						)}

						<div
							className='col-md-4  btn btn-outline-info p-2 mx-auto mt-2'
							style={{ fontSize: "0.9rem", fontWeight: "bolder" }}
						>
							<React.Fragment>
								<div onClick={handleModal}>
									<span>
										<i className='far fa-comment-alt mr-2'></i>
									</span>

									{user ? (
										"Leave Your Feedback"
									) : (
										<span style={{ fontSize: "0.65rem", fontWeight: "bold" }}>
											Login to leave a feedback or a rating
										</span>
									)}
								</div>
								<Modal
									title={
										<div
											style={{
												textAlign: "center",
												margin: "10px",
												padding: "5px",
												fontWeight: "bold",
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
										style={{ fontWeight: "bold", fontStyle: "italic" }}
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
							className='col-md-4 btn btn-outline-danger p-2 mx-auto mt-2'
							style={{ fontSize: "0.9rem", fontWeight: "bolder" }}
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
			</div>
		</Section1PCWrapper>
	);
};

export default Section1PC;

const Section1PCWrapper = styled.div``;
