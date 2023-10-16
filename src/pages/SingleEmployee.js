/** @format */

import React, { useState, useEffect } from "react";
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

// import ReactGA from "react-ga4";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth";
import { useHistory, useParams } from "react-router-dom";

import Section1PC from "../components/SingleEmployee/Section1PC";
import Section1Phone from "../components/SingleEmployee/Section1Phone";
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
	let { employeeId, employeeName } = useParams();

	// console.log(Employee, "employee");

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
			setError({ error: "Please signin to leave a comment" });
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
		} else {
			setLoading(false);
			setModalVisible(false);
		}
	};

	const deleteComment = (comment) => {
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;
		const employeeId = Employee && Employee._id;

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
							style={{ fontWeight: "bold", fontStyle: "italic" }}
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
						<h3 className='text-primary commentHeader'>
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
													<span style={{ cursor: "pointer" }}>
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
		getContacts("Token", getChosenStore._id).then((data) => {
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
			<div className='pcView'>
				<Section1PC
					storeProperties={storeProperties}
					Employee={Employee}
					employeeIsWorkingTodayLogic={employeeIsWorkingTodayLogic}
					user={user}
					token={token}
					contact={contact}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					handleModal={handleModal}
					addItem={addItem}
					star={star}
					setStar={setStar}
					onStarClick={onStarClick}
					commentForm={commentForm}
					history={history}
				/>
				<div className='p-5'>{historicalComments()}</div>
			</div>

			<div className='phoneView'>
				<Section1Phone
					storeProperties={storeProperties}
					Employee={Employee}
					employeeIsWorkingTodayLogic={employeeIsWorkingTodayLogic}
					user={user}
					token={token}
					contact={contact}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					handleModal={handleModal}
					addItem={addItem}
					star={star}
					setStar={setStar}
					onStarClick={onStarClick}
					commentForm={commentForm}
					history={history}
					historicalComments={historicalComments}
				/>
			</div>
		</SingleEmp>
	);
};

export default SingleEmployee;

const SingleEmp = styled.div`
	width: 100%;
	object-fit: cover;
	min-height: 850px;
	background-color: black;
	padding: 40px;
	color: white !important;
	overflow: hidden;

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

	.phoneView {
		display: none;
	}

	@media (max-width: 1000px) {
		width: 100%;
		padding: 0px;

		.pcView {
			display: none;
		}

		.phoneView {
			display: block;
		}

		.carousel-root {
			border: none;
			border-radius: 5px;
			object-fit: cover;
			/* box-shadow: 3px 2px 3px 2px rgba(0, 0, 0, 0.5); */
		}

		.commentHeader {
			color: white !important;
		}
	}
`;
