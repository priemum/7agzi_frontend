/** @format */

import React, {useState, useEffect} from "react";
// import ReactGA from "react-ga";
import styled from "styled-components";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {getPurchaseHistory, read} from "./apiUser";
// import UsersSidebar from "./UsersSidebar";
import UpdateSingleAppointmentUser from "./UpdateSingleAppointmentUser";
import moment from "moment";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Usersidebar from "./UserSidebar/Usersidebar";
import UserDarkBackground from "./UserSidebar/UserDarkBackground";

const UserDashboard = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	const [getChosenStore, setGetChosenStore] = useState("");

	useEffect(() => {
		setClickMenu2(click2);
		setGetChosenStore(JSON.parse(localStorage.getItem("chosenStore")));
	}, [click2, clickMenu2]);

	const [history, setHistory] = useState([]);
	// eslint-disable-next-line
	const [logoImage, setLogoImage] = useState([]);
	const [currentUser, setCurrentUser] = useState({});

	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	const {
		user: {_id},
	} = isAuthenticated();
	const token = isAuthenticated().token;

	const init = (userId, token) => {
		function compareTotalAppointments(a, b) {
			const TotalAppointmentsA = a.createdAt;
			const TotalAppointmentsB = b.createdAt;

			let comparison = 0;
			if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}

		getPurchaseHistory(userId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistory(
					data.sort(compareTotalAppointments) &&
						data.sort(compareTotalAppointments).filter((e, i) => i <= 15)
				);
			}
		});
	};

	const gettingUsersData = (userId, token) => {
		read(userId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setCurrentUser(data);
			}
		});
	};

	useEffect(() => {
		init(_id, token);
		gettingUsersData(_id, token);
		// eslint-disable-next-line
	}, []);

	const purchaseHistory = (history) => {
		return (
			<div className='card mb-5 text-center'>
				<h3 className='card-header'>Your Last Appointments</h3>
				<ul className='list-group text-center'>
					<li className='list-group-item'>
						{history.map((h, i) => {
							return (
								<div
									className='row text-center '
									style={{border: "1px solid black"}}
									key={i}
								>
									{/* {Invoice(h)} */}

									{h.employees.map((e, ii) => {
										const employeeNameModified = e.employeeName
											.split(" ")
											.join("-");
										return (
											<React.Fragment key={ii}>
												<div className='col-3 text-center my-2 mx-auto'>
													<div>
														<Link
															to={`/employee/${employeeNameModified}/${e._id}${e._id}${e._id}`}
															onClick={() => {
																window.scrollTo(0, 0);
															}}
														>
															<div className='text-center'>
																<img
																	width='150'
																	height='150'
																	src={
																		e &&
																		e.workPhotos &&
																		e.workPhotos[0] &&
																		e.workPhotos[0].url
																	}
																	alt={e.employeeName}
																	className='img-fluid'
																/>
															</div>
														</Link>
													</div>
												</div>
												<hr />
												<div className='col-8 text-center mt-3'>
													<h6>Stylist Name: {e.employeeName}</h6>
													<h6>Chosen Service: {h.service}</h6>
													<h6>Appointment Schedule Date: {h.scheduledDate}</h6>
													<h6>Appointment Schedule Time: {h.scheduledTime}</h6>
													<h6>
														Appointment Estimated Duration: {h.serviceDuration}{" "}
														Minutes
													</h6>
													<h6>Amount: ${h.amount} EGP</h6>
													<h6>Booked On: {moment(h.createdAt).fromNow()}</h6>
													<h6>
														Receipt / Invoice Number:{" "}
														<span>
															{h.transaction_id === null ||
															h.transaction_id === undefined ||
															h.transaction_id === ""
																? h._id.substring(0, 10)
																: h.transaction_id}
														</span>
													</h6>

													{h.status === "Cancelled" ? (
														<h5
															className='mb-5 CardData3'
															style={{fontWeight: "bold", color: "red"}}
														>
															Appointment Status: {h.status}
														</h5>
													) : (
														<h5
															className='mb-5 CardData3'
															style={{fontWeight: "bold", color: "blue"}}
														>
															Appointment Status: {h.status}
														</h5>
													)}
													<hr />
												</div>
											</React.Fragment>
										);
									})}
								</div>
							);
						})}
					</li>
				</ul>
			</div>
		);
	};

	const overAllAppointmentsForLastDay = () => {
		var futureAppointments =
			history &&
			history.filter(
				(i) =>
					new Date(i.scheduleStartsAt).setHours(0, 0, 0, 0) >=
					new Date().setHours(0, 0, 0, 0)
			);

		return futureAppointments;
	};

	console.log(overAllAppointmentsForLastDay(), "overAllAppointmentsForLastDay");

	const lastAppointmentDetails = () => {
		var userLastAppointment = history && history[0];
		var employeeNameModified =
			userLastAppointment.employees &&
			userLastAppointment.employees[0] &&
			userLastAppointment.employees[0].employeeName.split(" ").join("-");
		var employeeId =
			userLastAppointment.employees &&
			userLastAppointment.employees[0] &&
			userLastAppointment.employees[0]._id;

		return (
			<div className='mb-3'>
				{history && history[0] && getChosenStore && (
					<h5
						className='card-header mt-4  col-md-10  mx-auto'
						style={{
							textAlign: "center",
							boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.5)",
							backgroundColor: "#00010c",
							borderRadius: "50px",
							color: "white",
						}}
					>
						Your last appointment was scheduled with{" "}
						{userLastAppointment.employees.map((e, iii) => (
							<React.Fragment key={iii}>
								<strong>{e.employeeName}</strong> on{" "}
								<strong>
									{new Date(
										userLastAppointment.scheduledDate
									).toLocaleDateString()}
								</strong>{" "}
								({moment(userLastAppointment.createdAt).fromNow()}
								).
							</React.Fragment>
						))}
						<br />
						<Link
							style={{fontSize: "1rem", color: "#aaabfc"}}
							to={`/employee/${employeeNameModified}/${employeeId}${employeeId}${employeeId}`}
						>
							Please click here to rate and leave a comment.
						</Link>
					</h5>
				)}
				<h5
					className='card-header  mt-5 mb-5 mx-auto text-center'
					style={{
						boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.5)",
						fontWeight: "bold",
						// letterSpacing: "2px",
						borderRadius: "50px",
						marginTop: "10px",
					}}
				>
					Your last appointment details:
				</h5>
				<div className='row my-auto'>
					<div className='text-center col-md-5 mx-auto'>
						<div
							className='card '
							style={{borderRadius: "15px", backgroundColor: "#e8f3ff"}}
						>
							{/* <div className='text-center mx-5'>
								{Invoice(userLastAppointment)}
							</div> */}
							<div className='card-body  '>
								<Link
									to={`/employee/${employeeNameModified}/${employeeId}${employeeId}${employeeId}`}
									onClick={() => {
										window.scrollTo(0, 0);
									}}
								>
									<div className='text-center mt-3'>
										<img
											width='200'
											height='200'
											style={{
												borderRadius: "20px",
												minHeight: "22vh",
											}}
											src={
												userLastAppointment.employees &&
												userLastAppointment.employees[0] &&
												userLastAppointment.employees[0].workPhotos &&
												userLastAppointment.employees[0].workPhotos[0] &&
												userLastAppointment.employees[0].workPhotos[0].url
											}
											alt={employeeNameModified}
											className='img-fluid'
										/>
									</div>
								</Link>
								<div
									className='mt-2 mb-3'
									style={{
										fontSize: "18px",
										fontWeight: "bold",
										textAlign: "center",
									}}
								>
									Stylist Name:{" "}
									{userLastAppointment &&
										userLastAppointment.employees &&
										userLastAppointment.employees[0] &&
										userLastAppointment.employees[0].employeeName}
								</div>

								<span className='mt-1'>
									<h6>Chosen Service: {userLastAppointment.service}</h6>
									<h6>
										Appointment Schedule Date:{" "}
										{new Date(
											userLastAppointment.scheduledDate
										).toLocaleDateString()}
									</h6>
									<h6>
										Appointment Schedule Time:{" "}
										{userLastAppointment.scheduledTime}
									</h6>
									<h6>
										Appointment Estimated Duration:{" "}
										{userLastAppointment.serviceDuration} Minutes
									</h6>
									<h6>Amount: {userLastAppointment.amount} EGP</h6>
									<h6>
										Booked: {moment(userLastAppointment.createdAt).fromNow()}
									</h6>
									<h6>
										Receipt / Invoice Number:{" "}
										<span>
											{userLastAppointment.transaction_id === null ||
											userLastAppointment.transaction_id === undefined ||
											userLastAppointment.transaction_id === ""
												? userLastAppointment._id.substring(0, 10)
												: userLastAppointment.transaction_id}
										</span>
									</h6>

									{userLastAppointment.status === "Cancelled" ? (
										<h5
											className='mb-5 CardData3'
											style={{fontWeight: "bold", color: "red"}}
										>
											Appointment Status: {userLastAppointment.status}
										</h5>
									) : (
										<h5
											className='mb-5 CardData3'
											style={{fontWeight: "bold", color: "blue"}}
										>
											Appointment Status: {userLastAppointment.status}
										</h5>
									)}
									<hr />
								</span>
							</div>
						</div>
					</div>
					{overAllAppointmentsForLastDay() &&
					overAllAppointmentsForLastDay().length > 0 ? (
						<div className='col-md-12 mx-auto'>
							{overAllAppointmentsForLastDay() &&
								overAllAppointmentsForLastDay().map((appoint, ii) => {
									return (
										<div key={ii}>
											{appoint.status === "Cancelled" ||
											appoint.status === "Scheduled Online / Paid in Store" ||
											appoint.status ===
												"Scheduled From Store / Paid" ? null : (
												<div>
													<UpdateSingleAppointmentUser
														SingleAppointment={appoint}
														getChosenStore={getChosenStore}
													/>
												</div>
											)}
										</div>
									);
								})}
						</div>
					) : null}
				</div>
			</div>
		);
	};

	return (
		<UserDashboardOverall>
			{click2 && clickMenu2 ? (
				<UserDarkBackground
					setClick2={setClick2}
					setClickMenu2={setClickMenu2}
				/>
			) : null}
			<div className='mx-auto'>
				<Usersidebar
					click2={click2}
					setClick2={setClick2}
					clickMenu2={clickMenu2}
					setClickMenu2={setClickMenu2}
				/>
			</div>
			<div className='mx-auto col-md-8 my-3'>
				<div
					style={{
						// letterSpacing: "5px",
						fontSize: "1.4rem",
						fontWeight: "bold",
						textAlign: "center",
						color: "#4482c1",
						textShadow: "3px 3px 6px",
					}}
				>
					Hi {currentUser.name}
				</div>

				{history && (history.length === 0 || history[0] === undefined) ? (
					<div className='text-center'>
						<h3 className='card-header'>Your Last Appointments</h3>

						<h4 className='mt-3'>
							You have no previous appointments scheduled yet
						</h4>
						<h6 className='mt-3 mb-5'>
							Please visit to our{" "}
							<strong>
								<Link to='/schedule' style={{textDecoration: "underline"}}>
									{" "}
									Stylist Lists
								</Link>{" "}
							</strong>
							and Navigate, We have great and talented stylists!
						</h6>
					</div>
				) : (
					<React.Fragment>
						{lastAppointmentDetails()}
						{purchaseHistory(history)}
					</React.Fragment>
				)}
			</div>
		</UserDashboardOverall>
	);
};

export default UserDashboard;

const UserDashboardOverall = styled.div`
	min-height: 750px;
`;
