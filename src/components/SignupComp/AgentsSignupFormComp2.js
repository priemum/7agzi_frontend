import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

const AgentsSignupFormComp2 = ({
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
}) => {
	const [animationDirection, setAnimationDirection] = useState("");

	// eslint-disable-next-line
	const handlePreviousClick = () => {
		setNextClicked(nextClicked - 1);
		setAnimationDirection("slide-right");
	};

	return (
		<SignupFormCompWrapper>
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
								<div
									className={`mb-3 mx-auto ${
										animationDirection === "slide-left"
											? "slide-in-left"
											: "slide-in-right"
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
								</div>

								<div
									className={`mb-3 mx-auto ${
										animationDirection === "slide-left"
											? "slide-in-left"
											: "slide-in-right"
									}`}
								>
									<div
										className='form-group col-md-8 mx-auto'
										style={{ marginTop: "10px" }}
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
								</div>

								<div
									className={`mb-3 mx-auto ${
										animationDirection === "slide-left"
											? "slide-in-left"
											: "slide-in-right"
									}`}
								>
									<div
										className='form-group col-md-8 mx-auto'
										style={{ marginTop: "10px" }}
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
									{/* <div
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
										</div> */}
								</div>

								<div
									className={`mb-3 mx-auto ${
										animationDirection === "slide-left"
											? "slide-in-left"
											: "slide-in-right"
									}`}
								>
									<div
										className='form-group col-md-8 mx-auto'
										style={{ marginTop: "10px" }}
									>
										<label htmlFor='email' style={{ fontWeight: "bold" }}>
											{language === "Arabic"
												? "الدرجة العلمية / المؤهل (اختياري)"
												: "Degree/ Qualification (Optional)"}
										</label>
										<input
											type='text'
											name='certificate'
											value={values.agentOtherData.agentQualification}
											onChange={(e) => {
												setValues({
													...values,
													agentOtherData: {
														...values.agentOtherData,
														agentQualification: e.target.value,
													},
												});
											}}
											required
											placeholder='OPTIONAL*'
										/>
									</div>
								</div>

								<div
									className={`mb-3 mx-auto ${
										animationDirection === "slide-left"
											? "slide-in-left"
											: "slide-in-right"
									}`}
								>
									<div
										className='form-group col-md-8 mx-auto'
										style={{ marginTop: "10px" }}
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

												ReactGA.event("Agent Selected Country", {
													event_category: "Agent Selected Country",
													event_label: "Agent Selected Country",
													value: 1, // Optional extra parameters
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
								</div>
								{values.agentOtherData.agentCountry &&
								values.agentOtherData.agentCountry === "Egypt" ? (
									<div
										className={`mb-3 mx-auto ${
											animationDirection === "slide-left"
												? "slide-in-left"
												: "slide-in-right"
										}`}
									>
										<div
											className='form-group col-md-8 mx-auto'
											style={{ marginTop: "10px" }}
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

													ReactGA.event("Agent Selected Governorate", {
														event_category: "Agent Selected Governorate",
														event_label: "Agent Selected Governorate",
														value: 1, // Optional extra parameters
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
									</div>
								) : null}

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
											style={{ marginTop: "10px" }}
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

													ReactGA.event("Agent Selected District", {
														event_category: "Agent Selected District",
														event_label: "Agent Selected District",
														value: 1, // Optional extra parameters
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
											style={{ marginTop: "10px" }}
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
								</div>
								{values.agentOtherData.agentCountry &&
								values.agentOtherData.agentGovernorate &&
								values.agentOtherData.agentDistrict ? (
									<>
										<div
											className={`mb-3 mx-auto ${
												animationDirection === "slide-left"
													? "slide-in-left"
													: "slide-in-right"
											}`}
										>
											<div
												className='form-group col-md-8 mx-auto'
												style={{ marginTop: "10px" }}
											>
												<label
													htmlFor='password'
													style={{ fontWeight: "bold" }}
												>
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
												<label
													htmlFor='password2'
													style={{ fontWeight: "bold" }}
												>
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
										</div>
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
												!password ||
												password.length <= 5 ||
												!/\d/.test(password) ||
												!values.name ||
												!values.email ||
												!values.phone ||
												!values.agentOtherData.agentCountry ||
												!values.agentOtherData.agentGovernorate ||
												!values.agentOtherData.agentDistrict
											}
										>
											{language === "Arabic" ? "التسجيل" : "Register"}
										</Link>
									</>
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
									marginBottom: "100px",
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

export default AgentsSignupFormComp2;

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
