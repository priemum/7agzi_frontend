/** @format */

import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {
	employeeStar,
	read,
	comment,
	uncomment,
	getContacts,
	//cloudinaryCommentUpload,
} from "../apiCore";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import StarRating from "react-star-ratings";
// import ReactGA from "react-ga4";
import {Modal} from "antd";
import {toast} from "react-toastify";
import {isAuthenticated} from "../auth";
import {useHistory, useParams} from "react-router-dom";
import {showAverageRating} from "../components/SingleEmployee/Rating";
import {Link} from "react-router-dom/cjs/react-router-dom.min";
// import Resizer from "react-image-file-resizer";

const SingleEmployee = (props) => {
	const [Employee, setEmployee] = useState({});
	const [star, setStar] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	const [comments, setComments] = useState([]);
	const [text, setText] = useState("");
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [commentsPhotos, setCommentsPhotos] = useState([]);
	const [storeProperties, setStoreProperties] = useState("");
	const [contact, setContact] = useState([]);

	const token = isAuthenticated() && isAuthenticated().token;
	const user = isAuthenticated() && isAuthenticated().user;
	useEffect(() => {
		const employeeId =
			props.match.params &&
			props.match.params.employeeId &&
			props.match.params.employeeId.substring(
				0,
				props.match.params.employeeId.length / 3
			);
		loadSingleEmployee(employeeId);
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
		// eslint-disable-next-line
	}, [props, star, modalVisible]);

	const loadSingleEmployee = (employeeId) => {
		setLoading(true);
		read(employeeId).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setEmployee(data);
				setComments(data.comments);
			}
		});
		setLoading(false);
	};

	useEffect(() => {
		if (Employee && Employee.ratings && user) {
			let existingRatingObject = Employee.ratings.filter(
				(ele) => ele.ratedBy._id === user._id
			);
			setStar(
				existingRatingObject &&
					existingRatingObject[existingRatingObject.length - 1] &&
					existingRatingObject[existingRatingObject.length - 1].star
			);
			console.log(
				existingRatingObject &&
					existingRatingObject[existingRatingObject.length - 1]
			);
		}
		// eslint-disable-next-line
	}, [modalVisible]);

	const employeeIsWorkingTodayLogic = () => {
		var today = new Date().getDay();
		if (today === 0) {
			today = "Sunday";
		} else if (today === 1) {
			today = "Monday";
		} else if (today === 2) {
			today = "Tuesday";
		} else if (today === 3) {
			today = "Wednesday";
		} else if (today === 4) {
			today = "Thursday";
		} else if (today === 5) {
			today = "Friday";
		} else if (today === 6) {
			today = "Saturday";
		}
		var WorkingOrNot =
			Employee &&
			Employee.workingDays &&
			Employee.workingDays.indexOf(today) > -1;
		return WorkingOrNot;
	};

	const onStarClick = (newRating, name) => {
		setStar(newRating);
		// console.table(newRating, name);
		employeeStar(name, newRating, token, user.email, user._id).then(() => {
			console.log("rating clicked");
			// loadSingleEmployee(); // if you want to show updated rating in real time
		});
	};
	let history = useHistory();
	let {employeeId, employeeName} = useParams();

	const handleModal = () => {
		if (user && token) {
			setModalVisible(true);
		} else {
			history.push({
				pathname: "/signin",
				state: {
					from: `/employee/${employeeName}/${employeeId}`,
				},
			});
		}
	};

	//comments
	const updateComments = (comments) => {
		if (user && token) {
			setComments(comments);
		} else {
			history.push({
				pathname: "/signin",
				state: {
					from: `/employee/${employeeName}/${employeeId}`,
				},
			});
		}
	};

	const handleChange = (event) => {
		setError("");
		setText(event.target.value);
	};

	const isValid = () => {
		if (!text.length > 0 || text.length > 150) {
			setError({
				error: "Comment should not be empty and less than 150 characters long",
			});
			return false;
		}
		return true;
	};

	const addComment = (e) => {
		e.preventDefault();
		setLoading(true);
		if (!isAuthenticated()) {
			setError({error: "Please signin to leave a comment"});
			return false;
		}

		if (isValid()) {
			const userId = isAuthenticated().user._id;
			const token = isAuthenticated().token;
			const employeeId = Employee && Employee._id;

			comment(userId, token, employeeId, {
				text: text,
				commentsPhotos: commentsPhotos && commentsPhotos.images,
			}).then((data) => {
				if (data.error) {
					console.log(data);
				} else {
					setText("");
					// dispatch fresh list of coments to parent (SinglePost)
					updateComments(data.comments);
					setLoading(false);
					setModalVisible(false);
					setCommentsPhotos([]);
					toast.success(`Thank you for your review ${user.name}`);
				}
			});
		}
	};

	const deleteComment = (comment) => {
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;
		const employeeId = Employee && Employee._id;
		console.log(comment, "from delete");

		uncomment(userId, token, employeeId, comment).then((data) => {
			if (data.error) {
				console.log(data);
			} else {
				updateComments(data.comments);
			}
		});
	};
	const commentForm = () => {
		return (
			<React.Fragment>
				{Employee && Employee.comments && !loading ? (
					<React.Fragment>
						<h5
							className='mt-5 mb-3'
							style={{fontWeight: "bold", fontStyle: "italic"}}
						>
							Your Feedback Is Important To Us!!
						</h5>
						<form onSubmit={addComment}>
							<div className='form-group'>
								<input
									type='text'
									onChange={handleChange}
									value={text}
									className='form-control'
									placeholder='Leave a comment...'
									required
								/>
								<button className='btn btn-raised btn-success mt-3'>
									Post
								</button>
							</div>
						</form>
					</React.Fragment>
				) : (
					<div className='p-5 text-center'> Loading...</div>
				)}
			</React.Fragment>
		);
	};

	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	const historicalComments = () => {
		return (
			<React.Fragment>
				{!loading && Employee && Employee.comments && comments ? (
					<div className='col-md-12'>
						<h3 className='text-primary'>
							{comments && comments.length} Comments
						</h3>
						<hr />
						{comments &&
							comments.map((comment, i) => (
								<div key={i}>
									<div>
										<div>
											<p className='font-italic mark'>
												<span className='lead m-3'>{comment.text}</span>
												<br />
												<br />
												{comment.commentsPhotos &&
													comment.commentsPhotos.length > 0 && (
														<img
															src={
																comment.commentsPhotos &&
																comment.commentsPhotos[0] &&
																comment.commentsPhotos[0].url
															}
															alt='CommentPhoto'
															style={{
																width: "180px",
																height: "180px",
																// boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
																borderRadius: "50px",
																marginLeft: "5%",
															}}
														/>
													)}

												<span
													style={{
														padding: "0px",
														margin: "0px",
														fontSize: "0.8rem",
													}}
												>
													Posted by {comment.postedBy.name.slice(0, 6)} on{" "}
													{new Date(comment.created).toDateString()}
													<span style={{cursor: "pointer"}}>
														{isAuthenticated().user &&
															isAuthenticated().user._id ===
																comment.postedBy._id && (
																<span
																	onClick={() => deleteConfirmed(comment)}
																	className='text-danger float-right mr-1'
																>
																	Remove
																</span>
															)}
													</span>
												</span>
											</p>
										</div>
									</div>
									<hr />
								</div>
							))}
					</div>
				) : (
					<div className='text-center'>Loading...</div>
				)}
			</React.Fragment>
		);
	};

	const deleteConfirmed = (comment) => {
		let answer = window.confirm(
			"Are you sure you want to delete your comment?"
		);
		if (answer) {
			deleteComment(comment);
		}
	};

	const addItem = (item = [], next = (f) => f) => {
		let barber = [];
		barber = item._id;

		localStorage.setItem("barber", JSON.stringify(barber));
		next();
	};

	const gettingAllContacts = () => {
		let getChosenStore = JSON.parse(localStorage.getItem("chosenStore"));

		getContacts("Token", getChosenStore.storeId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setContact(data[data.length - 1]);
			}
		});
	};

	useEffect(() => {
		let getChosenStore = JSON.parse(localStorage.getItem("chosenStore"));
		setStoreProperties(getChosenStore);

		gettingAllContacts();
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("pickedPetSizeFirstAvailable");
		localStorage.removeItem("pickedPetTypeFirstAvailable");
		localStorage.removeItem("chosenDateFromFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
		localStorage.removeItem("CustomerType");
		localStorage.removeItem("chosenStylistUpdate");

		// eslint-disable-next-line
	}, []);

	return (
		<SingleEmp className='mx-auto'>
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
									style={{borderRadius: "15px"}}
								/>
							))}
						</Carousel>
					)}
				</div>
				<div
					className='col-md-5 mx-auto mt-3'
					style={{border: "1px solid lightgrey", borderRadius: "15px"}}
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
						Stylist Name: {Employee.employeeName}
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
								Please note that {Employee.employeeName} is not working today,
								but you still can schedule an appointment for future days.{" "}
								<br />
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
								{Employee.employeeName} is available today! In case you would
								like to schedule for other days, please check the stylist
								working days below.
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
						style={{color: "#0052a5"}}
					>
						A little bit about {Employee.employeeName}:{" "}
					</p>

					<p
						className='single-Product-Description-Style'
						style={{fontSize: "0.85rem"}}
					>
						<div
							className='ml-3'
							dangerouslySetInnerHTML={{__html: Employee.description}}
						/>
					</p>
					<p
						className='single-Product-Description-Style'
						style={{fontSize: "0.85rem"}}
					>
						{Employee.description1}
						<br />
					</p>
					<p
						className='single-Product-Description-Style'
						style={{fontSize: "0.85rem"}}
					>
						{Employee.description2}
					</p>
					<ul>
						<p
							className='text-capitalize text-title'
							style={{color: "#0052a5"}}
						>
							{Employee.employeeName}'s Working Days and Hours:
						</p>
						<div className='row'>
							<div className='col-md-4 mt-3'>
								{Employee &&
									Employee.workingDays &&
									Employee.workingDays.map((e, i) => (
										<li key={i} className='ml-4' style={{fontSize: "0.9rem"}}>
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
													style={{fontSize: "0.9rem"}}
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
								style={{fontSize: "0.9rem", fontWeight: "bolder"}}
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
								style={{fontSize: "0.9rem", fontWeight: "bolder"}}
							>
								Call{" "}
								<Link
									style={{textDecoration: "underline"}}
									className=''
									to='#'
									onClick={() =>
										window.open(`tel:+1${contact && contact.phone}`)
									}
								>
									{contact && contact.phone}
								</Link>
							</div>
						)}

						<div
							className='col-md-4  btn btn-outline-info p-2 mx-auto mt-2'
							style={{fontSize: "0.9rem", fontWeight: "bolder"}}
						>
							<React.Fragment>
								<div onClick={handleModal}>
									<span>
										<i className='far fa-comment-alt mr-2'></i>
									</span>

									{user ? (
										"Leave Your Feedback"
									) : (
										<span style={{fontSize: "0.65rem", fontWeight: "bold"}}>
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
									visible={modalVisible}
									onOk={() => {
										setModalVisible(false);
										toast.success(`Thank you for your Feedback ${user.name}`);
									}}
									okButtonProps={{style: {display: "none"}}}
									cancelButtonProps={{style: {display: "none"}}}
									onCancel={() => setModalVisible(false)}
								>
									<h5
										className='mt-4 mb-2'
										style={{fontWeight: "bold", fontStyle: "italic"}}
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
							style={{fontSize: "0.9rem", fontWeight: "bolder"}}
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
			<div className='p-5'>{historicalComments()}</div>
		</SingleEmp>
	);
};

export default SingleEmployee;

const SingleEmp = styled.div`
	width: 85%;
	margin-top: 5px;
	object-fit: cover;

	.carousel-root {
		border: 1px solid lightgrey;
		border-radius: 15px;
		object-fit: cover;
		/* box-shadow: 3px 2px 3px 2px rgba(0, 0, 0, 0.5); */
	}
	/* .control-dots li {
		background-color: black !important;
	} */
	.slider img {
		height: 100%;
		object-fit: cover;
	}
	.buttons:hover {
		cursor: pointer;
	}
`;
