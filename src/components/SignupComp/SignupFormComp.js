import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet";
import { Select } from "antd";
import AgentChoiceModal from "./AgentChoiceModal";
import ReactGA from "react-ga4";
import { ShipToData } from "../../Utils";
import ReactPixel from "react-facebook-pixel";

const { Option } = Select;

const SignupFormComp = ({
	values,
	setValues,
	clickSubmit,
	handleChange,
	countryList,
	name,
	email,
	phone,
	storeName,
	EgyptGovernorate,
	storeAddress,
	password,
	password2,
	nextClicked,
	language,
	allAgents,
	setAllAgents,
	allDistricts,
	setAllDistricts,
}) => {
	// eslint-disable-next-line
	const [animationDirection, setAnimationDirection] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const handleModalOpen = () => {
		setModalVisible(true);
	};

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	return (
		<SignupFormCompWrapper>
			<FormSignup>
				<AgentChoiceModal
					allAgents={allAgents}
					language={language}
					setModalVisible={setModalVisible}
					modalVisible={modalVisible}
					setAllAgents={setAllAgents}
					values={values}
					setValues={setValues}
				/>
				<div className='row justify-content-md-center mt-5'>
					<div className='col-md-9 col-sm-12 '>
						<div className='form-container text-center'>
							{language === "Arabic" ? (
								<h1 className='mb-3' style={{ fontWeight: "bolder" }} dir='rtl'>
									سجل <span className='text-primary'>صالونك</span>
								</h1>
							) : (
								<h1 className='mb-3' style={{ fontWeight: "bolder" }}>
									Business Partners{" "}
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

								{name ? (
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
									</div>
								) : null}

								{name && email ? (
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
									</div>
								) : null}

								{name && email && phone ? (
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
												{language === "Arabic" ? "نوع المتجر" : "Store Type"}
											</label>
											<select
												className='form-control'
												onChange={(e) => {
													setValues({ ...values, storeType: e.target.value });
													ReactGA.event("Account_Chose_Store_Type", {
														event_category: "Account_Chose_Store_Type",
														event_label: "Account_Chose_Store_Type",
														value: 1, // Optional extra parameters
													});

													ReactPixel.track("Account_Chose_Store_Type", {
														content_name: "Account_Chose_Store_Type",
														content_category: "Account_Chose_Store_Type",
														value: "",
														currency: "",
													});
												}}
											>
												<option value='Please Select'>Please Select</option>
												<option value='Hair Salon'>
													Beauty Salon/ Coiffure <strong> (WOMEN)</strong>
												</option>
												<option value='Barber Shop'>
													Barber Shop <strong> (MEN)</strong>{" "}
												</option>
												<option value='Massage Salon'>
													Massage Salon <strong>(BOTH)</strong>{" "}
												</option>
											</select>
										</div>
									</div>
								) : null}

								{name && email && phone && values.storeType ? (
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
												{language === "Arabic" ? "اسم المتجر" : "Store Name"}
											</label>
											<input
												type='text'
												name='storeName'
												value={storeName}
												onChange={handleChange("storeName")}
												required
												placeholder='e.g. Barber Cut'
											/>
										</div>
									</div>
								) : null}

								{name &&
								email &&
								phone &&
								values.storeType &&
								values.storeName ? (
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
												{language === "Arabic" ? "بلد المتجر" : "Store Country"}
											</label>
											<select
												className='form-control'
												onChange={(e) => {
													setValues({
														...values,
														storeCountry: e.target.value,
													});

													ReactGA.event("Account_Chose_Country", {
														event_category: "Account_Chose_Country",
														event_label: "Account_Chose_Country",
														value: 1, // Optional extra parameters
													});

													ReactPixel.track("Account_Chose_Country", {
														content_name: "Account_Chose_Country",
														content_category: "Account_Chose_Country",
														value: "",
														currency: "",
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
												values.storeCountry &&
												values.storeCountry !== "Egypt" ? (
													<span>
														{/* {values.storeCountry} is not where you are, please
														select the correct country, Thank you! */}
														Please Select The Correct Country, Thank You!
													</span>
												) : null}
											</div>
										</div>
									</div>
								) : null}

								{name &&
								email &&
								phone &&
								values.storeType &&
								values.storeName &&
								values.storeCountry &&
								values.storeCountry === "Egypt" ? (
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
													: "Store Governorate"}
											</label>
											<select
												className='form-control'
												onChange={(e) => {
													const selectedGovernorate = e.target.value;
													setValues({
														...values,
														storeGovernorate: selectedGovernorate,
													});

													const governorateCities = ShipToData.filter(
														(item) => item.GovernorateEn === selectedGovernorate
													).map((item) => item.City.AreaEn);

													setAllDistricts([...new Set(governorateCities)]);

													ReactGA.event("Account_Chose_Governorate", {
														event_category: "Account_Chose_Governorate",
														event_label: "Account_Chose_Governorate",
														value: 1, // Optional extra parameters
													});

													ReactPixel.track("Account_Chose_Governorate", {
														content_name: "Account_Chose_Governorate",
														content_category: "Account_Chose_Governorate",
														value: "",
														currency: "",
													});
												}}
											>
												<option value='Please Select'>Please Select</option>

												{EgyptGovernorate.map((g, i) => {
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
											></div>
										</div>
									</div>
								) : null}

								{name &&
								email &&
								phone &&
								values.storeType &&
								values.storeName &&
								values.storeCountry &&
								values.storeGovernorate ? (
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
												{language === "Arabic" ? "منطقة" : "Store District"}
											</label>
											<select
												className='form-control'
												onChange={(e) => {
													setValues({
														...values,
														storeDistrict: e.target.value,
													});

													ReactGA.event("Account_Chose_District", {
														event_category: "Account_Chose_District",
														event_label: "Account_Chose_District",
														value: 1, // Optional extra parameters
													});

													ReactPixel.track("Account_Chose_District", {
														content_name: "Account_Chose_District",
														content_category: "Account_Chose_District",
														value: "",
														currency: "",
													});
												}}
											>
												<option value='Please Select'>Please Select</option>

												{allDistricts &&
													allDistricts.map((g, i) => {
														return (
															<option key={i} value={g}>
																{g}
															</option>
														);
													})}
											</select>
										</div>
									</div>
								) : null}

								{name &&
								email &&
								phone &&
								values.storeType &&
								values.storeName &&
								values.storeCountry &&
								values.storeGovernorate &&
								values.storeDistrict ? (
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
													? "العنوان الدقيق"
													: "Store Address"}
											</label>
											<input
												type='text'
												name='storeAddress'
												value={storeAddress}
												onChange={handleChange("storeAddress")}
												required
												placeholder='e.g. 123 main street, Alexandria, Egypt'
											/>
										</div>
									</div>
								) : null}

								{name &&
								email &&
								phone &&
								values.storeType &&
								values.storeName &&
								values.storeCountry &&
								values.storeGovernorate &&
								values.storeDistrict &&
								values.storeAddress ? (
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
											{language === "Arabic" ? (
												<div
													dir='rtl'
													className='my-2'
													style={{
														color: "darkred",
														fontWeight: "bolder",
														fontSize: "1rem",
													}}
												>
													يرجى ملاحظة أن وجود وكيل يمنحك فترة تجريبية مجانية
													لمدة 60 يومًا بدلاً من 30 يومًا. إذا كان لديك وكيل،
													يرجى إضافة معلوماته أدناه.
												</div>
											) : (
												<div
													className='mt-4 mb-2'
													style={{ color: "darkred", fontWeight: "bolder" }}
												>
													Please note that having an agent entitles you to a
													60-day free trial instead of the standard 30 days. If
													you have an agent, please add their information below.
												</div>
											)}

											<label style={{ fontWeight: "bold" }}>
												{language === "Arabic" ? "وكيلك" : "Your Agent"}
											</label>
											<Select
												className='form-control'
												placeholder='Please choose an agent...'
												style={{
													textAlign: "left",
													textTransform: "capitalize",
												}}
												onChange={(value) => {
													const chosenAgent =
														value === "No Agent" || value === "Please Select"
															? { name: "No Agent" }
															: allAgents.find((agent) => agent._id === value);
													setValues({
														...values,
														agent: chosenAgent,
													});

													ReactGA.event("Account_Chose_Agent", {
														event_category: "Account_Chose_Agent",
														event_label: "Account_Chose_Agent",
														value: 1, // Optional extra parameters
													});

													ReactPixel.track("Account_Chose_Agent", {
														content_name: "Account_Chose_Agent",
														content_category: "Account_Chose_Agent",
														value: "",
														currency: "",
													});
												}}
												showSearch
												optionFilterProp='children'
												filterOption={(input, option) =>
													option.children
														.toLowerCase()
														.indexOf(input.toLowerCase()) >= 0
												}
												value={values.agent.name}
											>
												<Option value='Please Select'>Please Select</Option>
												<Option value='No Agent'>No Agent</Option>
												{allAgents &&
													allAgents.map((agent) => (
														<Option key={agent._id} value={agent._id}>
															{agent.name}
														</Option>
													))}
											</Select>
											<div
												className='mt-3'
												style={{ fontWeight: "bolder", fontSize: "1rem" }}
											>
												{language === "Arabic" ? (
													<>
														إذا كنت لا تملك وكيلاً،{" "}
														<strong
															style={{
																fontWeight: "bolder",
																cursor: "pointer",
																textDecoration: "underline",
															}}
															onClick={handleModalOpen}
														>
															انقر هنا
														</strong>{" "}
														واحصل على أقرب وكيل في منطقتك
													</>
												) : (
													<>
														If you don't have an agent,{" "}
														<strong
															style={{
																fontWeight: "bolder",
																cursor: "pointer",
																textDecoration: "underline",
															}}
															onClick={handleModalOpen}
														>
															CLICK HERE
														</strong>{" "}
														and get the closest agent in your area
													</>
												)}
											</div>
										</div>
									</div>
								) : null}

								{name &&
								email &&
								phone &&
								values.storeType &&
								values.storeName &&
								values.storeCountry &&
								values.storeGovernorate &&
								values.storeDistrict &&
								values.storeAddress &&
								values.agent.name ? (
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
											style={{ marginTop: "25px" }}
										>
											<label htmlFor='password2' style={{ fontWeight: "bold" }}>
												{language === "Arabic"
													? "تأكيد كلمة المرور"
													: "Confirm Password"}
											</label>
											<br />

											<input
												type='password'
												className='form-control'
												name='password2'
												value={password2}
												onChange={handleChange("password2")}
												required
												placeholder='Should have at least one digit'
											/>
										</div>
									</div>
								) : null}

								{name &&
								email &&
								phone &&
								values.storeType &&
								values.storeName &&
								values.storeCountry &&
								values.storeGovernorate &&
								values.storeDistrict &&
								values.storeAddress &&
								values.agent.name ? (
									<Link
										to='#'
										className='btn btn-success w-75 btn-block mx-auto mt-5 mb-5'
										onClick={() => {
											clickSubmit();
											ReactGA.event("SalonSuccessfulRegistration", {
												event_category: "SalonSuccessfulRegistration",
												event_label: "SalonSuccessfulRegistration",
												value: 10, // Optional extra parameters
											});

											ReactPixel.track("SalonSuccessfulRegistration", {
												content_name: "SalonSuccessfulRegistration",
												content_category: "SalonSuccessfulRegistration",
												value: "",
												currency: "",
											});
										}}
										disabled={
											!password || password.length <= 5 || !/\d/.test(password)
										}
									>
										{language === "Arabic" ? "التسجيل" : "Register"}
									</Link>
								) : null}
							</div>

							<hr />
							<p
								style={{
									fontSize: "0.9rem",
									textAlign: "center",
								}}
							>
								If You Already have an account, Please{" "}
								<strong
									style={{
										textDecoration: "underline",
										fontStyle: "italic",
										fontSize: "1rem",
									}}
								>
									<Link to='/signin' className='btn btn-sm btn-outline-primary'>
										Login Here
									</Link>
								</strong>
							</p>
							<hr />
						</div>
					</div>
				</div>
			</FormSignup>
		</SignupFormCompWrapper>
	);
};

export default SignupFormComp;

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
			margin-left: 1px;
			margin-right: 1px;
		}

		button {
			width: 32% !important;
			margin-bottom: 10px !important;
		}
	}
`;
