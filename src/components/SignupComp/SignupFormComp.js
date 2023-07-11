import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Select } from "antd";
import AgentChoiceModal from "./AgentChoiceModal";
import ReactGA from "react-ga4";

const { Option } = Select;

const SignupFormComp = ({
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
	storeName,
	EgyptGovernorate,
	storeGovernorate,
	storeAddress,
	password,
	password2,
	nextClicked,
	setNextClicked,
	language,
	allAgents,
	setAllAgents,
}) => {
	const [animationDirection, setAnimationDirection] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const handleModalOpen = () => {
		setModalVisible(true);
	};
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
					<title dir='rtl'>إكس لوك | تسجيل شركاء العمل الرسميين</title>
				) : (
					<title>XLOOK | Official Business Partners' Registration</title>
				)}

				{language === "Arabic" ? (
					<meta
						name='description'
						content='أفضل برنامج حجز في مصر، خاص بصالونات الحلاقة، صالونات الشعر، مراكز التجميل، وصالونات المساج.'
					/>
				) : (
					<meta
						name='description'
						content='The best booking software in Egypt, specially designed for barber shops, hair salons, beauty centers, and massage salons.'
					/>
				)}

				<meta
					name='keywords'
					content={
						language === "Arabic"
							? "برنامج حجز، صالونات الحلاقة، صالونات الشعر، مراكز التجميل، صالونات المساج"
							: "booking software, barber shops, hair salons, beauty centers, massage salons"
					}
				/>

				<link rel='canonical' href='https://xlookpro.com/signup' />
			</Helmet>
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
									سجل <span className='text-primary'>متجرك</span>
								</h1>
							) : (
								<h1 className='mb-3' style={{ fontWeight: "bolder" }}>
									Business Partners{" "}
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
													ReactGA.event(
														"First Next form business partner. Signup",
														{
															event_category:
																"First Next form business partner. Signup",
															event_label: "FullName: " + name,
															value: 10, // Optional extra parameters
														}
													);
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
													ReactGA.event(
														"Second Next form business partner. Signup",
														{
															event_category:
																"Second Next form business partner. Signup",
															event_label: "Email: " + email,
															// value: 10, // Optional extra parameters
														}
													);
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
													ReactGA.event(
														"Third Next form business partner. Signup",
														{
															event_category:
																"Third Next form business partner. Signup",
															event_label: "Phone: " + phone,
															// value: 10, // Optional extra parameters
														}
													);
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
												{language === "Arabic" ? "نوع المتجر" : "Store Type"}
											</label>
											<select
												className='form-control'
												onChange={(e) => {
													setValues({ ...values, storeType: e.target.value });
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

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={!values.storeType}
												onClick={() => {
													handleNextClick();
													ReactGA.event(
														"Forth Next form business partner. Signup",
														{
															event_category:
																"Forth Next form business partner. Signup",
															event_label: "Store Type: " + values.storeType,
															// value: 10, // Optional extra parameters
														}
													);
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

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={!storeName || storeName.length <= 2}
												onClick={() => {
													handleNextClick();
													ReactGA.event(
														"Fifth Next form business partner. Signup",
														{
															event_category:
																"Fifth Next form business partner. Signup",
															event_label: "Store Name: " + storeName,
															// value: 10, // Optional extra parameters
														}
													);
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

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={
													!values.storeCountry ||
													values.storeCountry !== "Egypt"
												}
												onClick={() => {
													handleNextClick();
													ReactGA.event(
														"Sixth Next form business partner. Signup",
														{
															event_category:
																"Sixth Next form business partner. Signup",
															event_label:
																"Store Country: " + values.storeCountry,
															// value: 10, // Optional extra parameters
														}
													);
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
													? "المحافظة"
													: "Store Governorate"}
											</label>
											<select
												className='form-control'
												onChange={(e) => {
													setValues({
														...values,
														storeGovernorate: e.target.value,
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
											>
												{values &&
												values.storeGovernorate &&
												values.storeGovernorate !== "Alexandria" &&
												values.storeGovernorate !== "Cairo" ? (
													<span>
														{values.storeGovernorate} is not being supported at
														the moment
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
													!values.storeGovernorate ||
													(values.storeGovernorate !== "Alexandria" &&
														values.storeGovernorate !== "Cairo")
												}
												onClick={() => {
													handleNextClick();
													ReactGA.event(
														"Seventh Next form business partner. Signup",
														{
															event_category:
																"Seventh Next form business partner. Signup",
															event_label:
																"Store Governorate: " + values.storeGovernorate,
															// value: 10, // Optional extra parameters
														}
													);
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
										{storeGovernorate === "Alexandria" ? (
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
													}}
												>
													<option value='Please Select'>Please Select</option>

													{alexandriaDistricts.map((g, i) => {
														return (
															<option key={i} value={g}>
																{g}
															</option>
														);
													})}
												</select>
											</div>
										) : null}

										{storeGovernorate === "Cairo" ? (
											<div
												className='form-group col-md-8 mx-auto'
												style={{ marginTop: "25px" }}
											>
												<label style={{ fontWeight: "bold" }}>
													Store District
													{language === "Arabic" ? "منطقة" : "Store District"}
												</label>
												<select
													className='form-control'
													onChange={(e) => {
														setValues({
															...values,
															storeDistrict: e.target.value,
														});
													}}
												>
													<option value='Please Select'>Please Select</option>

													{cairoDistricts.map((g, i) => {
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
												disabled={!values.storeDistrict}
												onClick={() => {
													handleNextClick();
													ReactGA.event(
														"Eighth Next form business partner. Signup",
														{
															event_category:
																"Eighth Next form business partner. Signup",
															event_label:
																"Store District: " + values.storeDistrict,
															// value: 10, // Optional extra parameters
														}
													);
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

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={
													!values.storeAddress ||
													values.storeAddress.length <= 4
												}
												onClick={() => {
													handleNextClick();
													ReactGA.event(
														"Ninth Next form business partner. Signup",
														{
															event_category:
																"Ninth Next form business partner. Signup",
															event_label: "Store Address: " + storeAddress,
															// value: 10, // Optional extra parameters
														}
													);
												}}
												className='text-center btn btn-primary w-25 mx-2'
											>
												{language === "Arabic" ? "التالي" : "Next"}
											</button>
										</div>
									</div>
								) : null}

								{nextClicked === 9 ? (
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
													className='my-2'
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

										<div className='mt-3 mx-auto text-center'>
											<button
												onClick={handlePreviousClick}
												className='text-center btn btn-info w-25 mx-2'
											>
												{language === "Arabic" ? "السابق" : "Previous"}
											</button>
											<button
												disabled={!values.agent}
												onClick={() => {
													handleNextClick();
													ReactGA.event(
														"Tenth Next form business partner. Signup",
														{
															event_category:
																"Tenth Next form business partner. Signup",
															event_label: "Store Agent: ",
															// value: 10, // Optional extra parameters
														}
													);
												}}
												className='text-center btn btn-primary w-25 mx-2'
											>
												{language === "Arabic" ? "التالي" : "Next"}
											</button>
										</div>
									</div>
								) : null}

								{nextClicked === 10 ? (
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

								{nextClicked === 10 ? (
									<Link
										to='#'
										className='btn btn-success w-75 btn-block mx-auto mt-5 mb-5'
										onClick={() => {
											clickSubmit();
											ReactGA.event("Successful Registeration", {
												event_category: "Successful Registeration",
												event_label: "Successful Registeration",
												value: 10, // Optional extra parameters
											});
										}}
										disabled={
											nextClicked !== 10 ||
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
