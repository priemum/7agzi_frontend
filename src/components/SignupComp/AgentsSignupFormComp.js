import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ImageCard2 from "./ImageCard";
import ImageCardPersonal from "./ImageCardPersonal";
import { Spin } from "antd";
import ReactGA from "react-ga4";

const AgentsSignupFormComp = ({
	values,
	setValues,
	clickSubmit,
	handleChange,
	countryList,
	cairoDistricts,
	alexandriaDistricts,
	name,
	email,
	phone,
	EgyptGovernorate,
	password,
	password2,
	nextClicked,
	setNextClicked,
	language,
	handleImageRemove2,
	fileUploadAndResizeStoreThumbnail,
	handleImageRemovePersonal,
	fileUploadAndResizeStoreThumbnail2,
}) => {
	const [animationDirection, setAnimationDirection] = useState("");

	const handleNextClick = () => {
		setNextClicked(nextClicked + 1);
		setAnimationDirection("slide-left");
	};

	const handlePreviousClick = () => {
		setNextClicked(nextClicked - 1);
		setAnimationDirection("slide-right");
	};

	return (
		<SignupFormCompWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				{language === "Arabic" ? (
					<title>نموذج التسجيل الرسمي للوكلاء</title>
				) : (
					<title>Agents Official Signup Form</title>
				)}

				{language === "Arabic" ? (
					<meta name='description' content='افضل برنامج حجز فى مصر' />
				) : (
					<meta
						name='description'
						content='The best booking software in Egypt'
					/>
				)}

				<link rel='canonical' href='https://infinite-apps.com' />
			</Helmet>
			<FormSignup>
				<div className='row justify-content-md-center mt-5'>
					<div className='col-md-9 col-sm-12 '>
						<div className='form-container text-center'>
							{language === "Arabic" ? (
								<h1 className='mb-3' style={{ fontWeight: "bolder" }} dir='rtl'>
									تسجيل <span className='text-primary'>الوكلاء</span>
								</h1>
							) : (
								<h1 className='mb-3' style={{ fontWeight: "bolder" }}>
									Agents/ Affiliate{" "}
									<span className='text-primary'>Registration</span>
								</h1>
							)}

							{/* <Google informParent={informParent} /> */}

							<div className='myContent col-md-8 mx-auto mb-3'>
								{nextClicked === 0 ? (
									<div
										className={`mb-3 mx-auto ${
											animationDirection === "slide-right"
												? "slide-in-right"
												: ""
										}`}
									>
										<div className='col-md-8 mx-auto'>
											<label htmlFor='name' style={{ fontWeight: "bold" }}>
												{language === "Arabic" ? "الاسم الكامل" : "Full Name"}
											</label>
											<input
												type='text'
												name='name'
												value={name}
												onChange={handleChange("name")}
												required
												placeholder='e.g. Muhammed Hussein'
											/>
										</div>
										<div className='mt-3 mx-auto text-center'>
											<button
												disabled={!name || name.length < 3}
												onClick={() => {
													handleNextClick();
													ReactGA.event("First Next form Agent Signup", {
														event_category: "First Next form Agent Signup",
														event_label: "name: " + name,
													});
												}}
												className='mx-auto text-center btn btn-primary w-50'
											>
												{language === "Arabic" ? "التالي" : "Next"}
											</button>
										</div>
									</div>
								) : null}

								{nextClicked === 1 && name ? (
									<div
										className={`mb-3 mx-auto ${
											animationDirection === "slide-left"
												? "slide-in-left"
												: "slide-in-right"
										}`}
									>
										<div
											className='form-group col-md-8 mx-auto'
											style={{ marginTop: "25px" }}
										>
											<label htmlFor='email' style={{ fontWeight: "bold" }}>
												{language === "Arabic"
													? "البريد الإلكتروني"
													: "Email Address"}
												{language === "Arabic" ? "" : ""}
											</label>
											<input
												type='email'
												name='email'
												value={email}
												onChange={handleChange("email")}
												required
												placeholder='e.g. MuhammedHussein@gmail.com'
											/>
										</div>

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={
													!email.includes("@") || !email.includes(".com")
												}
												onClick={() => {
													handleNextClick();
													ReactGA.event("Second Next form Agent Signup", {
														event_category: "Second Next form Agent Signup",
														event_label: "email: " + email,
													});
												}}
												className='text-center btn btn-primary w-25 mx-2'
											>
												{language === "Arabic" ? "" : ""}

												{language === "Arabic" ? "التالي" : "Next"}
											</button>
										</div>
									</div>
								) : null}

								{nextClicked === 2 && name && email ? (
									<div
										className={`mb-3 mx-auto ${
											animationDirection === "slide-left"
												? "slide-in-left"
												: "slide-in-right"
										}`}
									>
										<div
											className='form-group col-md-8 mx-auto'
											style={{ marginTop: "25px" }}
										>
											<label style={{ fontWeight: "bold" }}>
												{language === "Arabic"
													? "رقم الهاتف المحمول"
													: "Cell Phone Number"}
											</label>
											<input
												type='text'
												name='phone'
												pattern='\d*'
												maxLength='13'
												value={phone}
												onChange={handleChange("phone")}
												placeholder='e.g. 01022459022 (Digits Only)'
											/>
										</div>
										<div
											className='form-group col-md-8 mx-auto my-2'
											style={{ marginTop: "25px" }}
										>
											<label style={{ fontWeight: "bold" }}>
												{language === "Arabic"
													? "2 رقم الهاتف المحمول"
													: "Cell Phone Number 2"}
											</label>
											<input
												type='text'
												name='phone'
												pattern='\d*'
												maxLength='13'
												value={values.agentOtherData.phone2}
												onChange={(e) => {
													setValues({
														...values,
														agentOtherData: {
															...values.agentOtherData,
															phone2: e.target.value,
														},
													});
												}}
												placeholder='e.g. 01022459022 (Digits Only)'
											/>
										</div>

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={!/^\d{8,13}$/.test(phone)}
												onClick={() => {
													handleNextClick();
													ReactGA.event("Third Next form Agent Signup", {
														event_category: "Third Next form Agent Signup",
														event_label: "phone: " + phone,
													});
												}}
												className='text-center btn btn-primary w-25 mx-2'
											>
												{language === "Arabic" ? "التالي" : "Next"}
											</button>
										</div>
									</div>
								) : null}

								{nextClicked === 3 && name && email && phone ? (
									<div
										className={`mb-3 mx-auto ${
											animationDirection === "slide-left"
												? "slide-in-left"
												: "slide-in-right"
										}`}
									>
										<div
											className='form-group col-md-8 mx-auto'
											style={{ marginTop: "25px" }}
										>
											<label style={{ fontWeight: "bold" }}>
												{language === "Arabic" ? "بلد" : "Agent Country"}
											</label>
											<select
												className='form-control'
												onChange={(e) => {
													setValues({
														...values,
														agentOtherData: {
															...values.agentOtherData,
															agentCountry: e.target.value,
														},
													});
												}}
											>
												<option value='Please Select'>Please Select</option>

												{countryList.map((g, i) => {
													return (
														<option key={i} value={g}>
															{g}
														</option>
													);
												})}
											</select>
											<div
												className='mt-3'
												style={{ color: "darkred", fontWeight: "bolder" }}
											>
												{values &&
												values.agentOtherData &&
												values.agentOtherData.agentCountry &&
												values.agentOtherData.agentCountry !== "Egypt" ? (
													<span>
														{/* {values.storeCountry} is not where you are, please
													select the correct country, Thank you! */}
														Please Select The Correct Country, Thank You!
													</span>
												) : null}
											</div>
										</div>

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={
													!values.agentOtherData.agentCountry ||
													values.agentOtherData.agentCountry !== "Egypt"
												}
												onClick={() => {
													handleNextClick();
													ReactGA.event("Fourth Next form Agent Signup", {
														event_category: "Fourth Next form Agent Signup",
														event_label:
															"Country: " + values.agentOtherData.agentCountry,
													});
												}}
												className='text-center btn btn-primary w-25 mx-2'
											>
												{language === "Arabic" ? "التالي" : "Next"}
											</button>
										</div>
									</div>
								) : null}

								{nextClicked === 4 ? (
									<div
										className={`mb-3 mx-auto ${
											animationDirection === "slide-left"
												? "slide-in-left"
												: "slide-in-right"
										}`}
									>
										<div
											className='form-group col-md-8 mx-auto'
											style={{ marginTop: "25px" }}
										>
											<label style={{ fontWeight: "bold" }}>
												{language === "Arabic"
													? "المحافظة"
													: "Agent Governorate"}
											</label>
											<select
												className='form-control'
												onChange={(e) => {
													setValues({
														...values,
														agentOtherData: {
															...values.agentOtherData,
															agentGovernorate: e.target.value,
														},
													});
												}}
											>
												<option value='Please Select'>Please Select</option>

												{EgyptGovernorate() &&
													EgyptGovernorate().map((g, i) => {
														return (
															<option key={i} value={g}>
																{g}
															</option>
														);
													})}
											</select>

											<div
												className='mt-3'
												style={{ color: "darkred", fontWeight: "bolder" }}
											>
												{values &&
												values.agentOtherData &&
												values.agentOtherData.agentGovernorate !==
													"Alexandria" &&
												values.agentOtherData.agentGovernorate !== "Cairo" &&
												values.agentOtherData.agentGovernorate !== null ? (
													<span>
														{values.agentOtherData.agentGovernorate} is not
														being supported at the moment
													</span>
												) : null}
											</div>
										</div>

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={
													!values.agentOtherData.agentGovernorate ||
													(values.agentOtherData.agentGovernorate !==
														"Alexandria" &&
														values.agentOtherData.agentGovernorate !== "Cairo")
												}
												onClick={() => {
													handleNextClick();
													ReactGA.event("Fifth Next form Agent Signup", {
														event_category: "Fifth Next form Agent Signup",
														event_label:
															"Governorate: " +
															values.agentOtherData.agentGovernorate,
													});
												}}
												className='text-center btn btn-primary w-25 mx-2'
											>
												{language === "Arabic" ? "التالي" : "Next"}
											</button>
										</div>
									</div>
								) : null}

								{nextClicked === 5 ? (
									<div
										className={`mb-3 mx-auto ${
											animationDirection === "slide-left"
												? "slide-in-left"
												: "slide-in-right"
										}`}
									>
										{values.agentOtherData.agentGovernorate === "Alexandria" ? (
											<div
												className='form-group col-md-8 mx-auto'
												style={{ marginTop: "25px" }}
											>
												<label style={{ fontWeight: "bold" }}>
													{language === "Arabic" ? "منطقة" : "Agent District"}
												</label>
												<select
													className='form-control'
													onChange={(e) => {
														setValues({
															...values,
															agentOtherData: {
																...values.agentOtherData,
																agentDistrict: e.target.value,
															},
														});
													}}
												>
													<option value='Please Select'>Please Select</option>

													{alexandriaDistricts().map((g, i) => {
														return (
															<option key={i} value={g}>
																{g}
															</option>
														);
													})}
												</select>
											</div>
										) : null}

										{values.agentOtherData.agentGovernorate === "Cairo" ? (
											<div
												className='form-group col-md-8 mx-auto'
												style={{ marginTop: "25px" }}
											>
												<label style={{ fontWeight: "bold" }}>
													Agent District
													{language === "Arabic" ? "منطقة" : "Agent District"}
												</label>
												<select
													className='form-control'
													onChange={(e) => {
														setValues({
															...values,
															agentOtherData: {
																...values.agentOtherData,
																agentDistrict: e.target.value,
															},
														});
													}}
												>
													<option value='Please Select'>Please Select</option>

													{cairoDistricts().map((g, i) => {
														return (
															<option key={i} value={g}>
																{g}
															</option>
														);
													})}
												</select>
											</div>
										) : null}

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={!values.agentOtherData.agentDistrict}
												onClick={() => {
													handleNextClick();
													ReactGA.event("Sixth Next form Agent Signup", {
														event_category: "Sixth Next form Agent Signup",
														event_label:
															"Governorate: " +
															values.agentOtherData.agentDistrict,
													});
												}}
												className='text-center btn btn-primary w-25 mx-2'
											>
												{language === "Arabic" ? "التالي" : "Next"}
											</button>
										</div>
									</div>
								) : null}

								{nextClicked === 6 ? (
									<div
										className={`mb-3 mx-auto ${
											animationDirection === "slide-left"
												? "slide-in-left"
												: "slide-in-right"
										}`}
									>
										<div
											className='form-group col-md-8 mx-auto'
											style={{ marginTop: "25px" }}
										>
											<label style={{ fontWeight: "bold" }}>
												{language === "Arabic"
													? "العنوان الدقيق"
													: "Agent Address"}
											</label>
											<input
												type='text'
												name='storeAddress'
												value={values.agentOtherData.agentAddress}
												onChange={(e) => {
													setValues({
														...values,
														agentOtherData: {
															...values.agentOtherData,
															agentAddress: e.target.value,
														},
													});
												}}
												required
												placeholder='e.g. 123 main street, Alexandria, Egypt'
											/>
										</div>

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={
													!values.agentOtherData.agentAddress ||
													values.agentOtherData.agentAddress <= 4
												}
												onClick={() => {
													handleNextClick();
													// ReactGA.event("2nd Next form promotion. StoreName", {
													// 	event_category: "Promotion Form StoreName",
													// 	event_label: "StoreName: " + storeName,
													// 	value: 50,
													// });
												}}
												className='text-center btn btn-primary w-25 mx-2'
											>
												{language === "Arabic" ? "التالي" : "Next"}
											</button>
										</div>
									</div>
								) : null}

								{nextClicked === 7 ? (
									<div
										className={`mb-3 mx-auto ${
											animationDirection === "slide-left"
												? "slide-in-left"
												: "slide-in-right"
										}`}
									>
										<div
											className='form-group col-md-11 mx-auto'
											style={{ marginTop: "25px" }}
										>
											<div className='row'>
												<div className='col-md-6 mt-3 mx-auto'>
													{values.loading ? (
														<Spin size='large' /> // Show spinner when loading
													) : (
														<ImageCard2
															addThumbnail={values.agentOtherData.idImage}
															handleImageRemove={handleImageRemove2}
															setAddThumbnail={setValues}
															fileUploadAndResizeThumbNail={
																fileUploadAndResizeStoreThumbnail
															}
														/> // Show ImageCard2 when not loading
													)}
												</div>
												<div className='col-md-6 mt-3 mx-auto'>
													{values.loading2 ? (
														<Spin size='large' /> // Show spinner when loading
													) : (
														<ImageCardPersonal
															addThumbnail={values.agentOtherData.personalImage}
															handleImageRemove={handleImageRemovePersonal}
															setAddThumbnail={setValues}
															fileUploadAndResizeThumbNail={
																fileUploadAndResizeStoreThumbnail2
															}
														/> // Show ImageCard2 when not loading
													)}
												</div>
											</div>
										</div>

										<div
											className='form-group col-md-8 mx-auto mb-5'
											style={{ marginTop: "25px" }}
										>
											<label style={{ fontWeight: "bold" }}>
												{language === "Arabic"
													? " رقم هوية الوكيل / جواز السفر"
													: "Agent ID/ Passport Number"}
											</label>
											<input
												type='text'
												name='storeAddress'
												value={values.agentOtherData.agentNationalIdNumber}
												onChange={(e) => {
													setValues({
														...values,
														agentOtherData: {
															...values.agentOtherData,
															agentNationalIdNumber: e.target.value,
														},
													});
												}}
												required
												placeholder='Your national ID #'
											/>
										</div>

										<div
											className='form-group col-md-8 mx-auto mb-5'
											style={{ marginTop: "25px" }}
										>
											<label style={{ fontWeight: "bold" }}>
												{language === "Arabic"
													? "Instagram Profile Link (Optional)"
													: "Instagram Profile Link (Optional)"}
											</label>
											<input
												type='text'
												name='storeAddress'
												value={values.agentOtherData.instagramLink}
												onChange={(e) => {
													setValues({
														...values,
														agentOtherData: {
															...values.agentOtherData,
															instagramLink: e.target.value,
														},
													});
												}}
												required
												placeholder='Your Instagram Profile Link'
											/>
										</div>

										<div
											className='form-group col-md-8 mx-auto mb-5'
											style={{ marginTop: "25px" }}
										>
											<label style={{ fontWeight: "bold" }}>
												{language === "Arabic"
													? "Facebook Profile Link (Optional)"
													: "Facebook Profile Link (Optional)"}
											</label>
											<input
												type='text'
												name='storeAddress'
												value={values.agentOtherData.fbLink}
												onChange={(e) => {
													setValues({
														...values,
														agentOtherData: {
															...values.agentOtherData,
															fbLink: e.target.value,
														},
													});
												}}
												required
												placeholder='Your Facebook Profile Link'
											/>
										</div>

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={
													!values.agentOtherData.agentNationalIdNumber ||
													values.agentOtherData.idImage.length === 0
												}
												onClick={() => {
													handleNextClick();
													ReactGA.event("Eighth Next form Agent Signup", {
														event_category: "Eighth Next form Agent Signup",
														event_label:
															"Governorate: " +
															values.agentOtherData.agentDistrict,
													});
												}}
												className='text-center btn btn-primary w-25 mx-2'
											>
												{language === "Arabic" ? "التالي" : "Next"}
											</button>
										</div>
									</div>
								) : null}

								{nextClicked === 8 ? (
									<div
										className={`mb-3 mx-auto ${
											animationDirection === "slide-left"
												? "slide-in-left"
												: "slide-in-right"
										}`}
									>
										<div
											className='form-group col-md-8 mx-auto'
											style={{ marginTop: "25px" }}
										>
											<label htmlFor='password' style={{ fontWeight: "bold" }}>
												{language === "Arabic" ? "كلمة المرور" : "Password"}
											</label>
											<input
												type='password'
												name='password'
												value={password}
												onChange={handleChange("password")}
												required
												placeholder='Should have at least one digit'
											/>
										</div>
										<div
											className='form-group col-md-8 mx-auto'
											style={{ marginTop: "10px" }}
										>
											<label htmlFor='password2' style={{ fontWeight: "bold" }}>
												{language === "Arabic"
													? "2 كلمة المرور"
													: "Confirm Password"}
											</label>
											<input
												type='password'
												name='password2'
												value={password2}
												onChange={handleChange("password2")}
												required
												placeholder='Should have at least one digit'
											/>
										</div>

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
										</div>
									</div>
								) : null}

								{nextClicked === 8 ? (
									<Link
										to='#'
										className='btn btn-success w-75 btn-block mx-auto mt-5 mb-5'
										onClick={() => {
											clickSubmit();
											ReactGA.event("Successful Registeration For Agent", {
												event_category: "Successful Registeration For Agent",
												event_label: "Successful Registeration For Agent",
												value: 1, // Optional extra parameters
											});
										}}
										disabled={
											nextClicked !== 8 ||
											!password ||
											password.length <= 5 ||
											!/\d/.test(password)
										}
									>
										{language === "Arabic" ? "التسجيل" : "Register"}
									</Link>
								) : null}
							</div>

							<hr />
						</div>
						<div className='col-md-4 mx-auto text-center'>
							<div
								className='btn-info p-2 btn-block'
								style={{
									color: "white",
									background: "#a9082a",
									border: "1px solid #a9082a",
									fontSize: "1.2rem",
									fontWeight: "bolder",
									borderRadius: "5px",
								}}
							>
								<Link
									style={{ color: "white", background: "#a9082a" }}
									to='/agent-guide'
								>
									<strong>CHECK YOUR GUIDE</strong>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</FormSignup>
		</SignupFormCompWrapper>
	);
};

export default AgentsSignupFormComp;

const SignupFormCompWrapper = styled.div`
	.myContent {
		background-color: white;
		padding: 20px;
		border-radius: 10px;
	}

	.slide-in-left {
		animation: slideInLeft 0.5s forwards;
	}

	.slide-in-right {
		animation: slideInRight 0.5s forwards;
	}

	.slide-left {
		animation: slideLeft 0.5s forwards;
	}

	.slide-right {
		animation: slideRight 0.5s forwards;
	}

	@keyframes slideInLeft {
		from {
			transform: translateX(-100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes slideInRight {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes slideLeft {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			transform: translateX(-100%);
			opacity: 0;
		}
	}

	@keyframes slideRight {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			transform: translateX(100%);
			opacity: 0;
		}
	}
`;

const FormSignup = styled.div`
	min-height: 750px;

	input[type="text"],
	input[type="number"],
	input[type="email"],
	input[type="password"],
	input[type="date"],
	select,
	textarea {
		display: block;
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
	}
	input[type="text"]:focus,
	input[type="number"]:focus,
	input[type="email"]:focus,
	input[type="password"]:focus,
	input[type="date"]:focus,
	select:focus,
	textarea:focus,
	label:focus {
		outline: none;
		border: 1px solid var(--primaryColor);

		box-shadow: 5px 8px 3px 0px rgba(0, 0, 0, 0.3);
		transition: var(--mainTransition);
		font-weight: bold;
	}

	.form-container {
		margin-left: 50px;
		margin-right: 50px;
	}

	@media (max-width: 900px) {
		.form-container {
			margin-left: 5px;
			margin-right: 5px;
		}

		button {
			width: 32% !important;
			margin-bottom: 10px !important;
		}
	}
`;
