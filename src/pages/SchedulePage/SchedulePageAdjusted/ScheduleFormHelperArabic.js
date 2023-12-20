import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import "moment-timezone";
import { DatePicker } from "antd";
import { Select } from "antd";
const { Option } = Select;

const ScheduleFormHelperArabic = ({
	pickedEmployee,
	chosenDate,
	setChosenDate,
	disabledDate,
	setChosenCustomerType,
	allCustomerTypes,
	chosenCustomerType,
	AllServices,
	setServiceDetailsArray,
	serviceDetailsArray,
	employeeAvailability,
	chosenTime,
	setChosenTime,
	customerPhone,
	setCustomerPhone,
	scheduledByUserName,
	setScheduledByUserName,
	scheduledHours,
	appointmentStarts,
	setModalVisible,
	clickSubmitSchedule_NoPayment,
	discountCash,
	password,
	setPassword,
	password2,
	setPassword2,
	user,
	couponApplied,
	appliedCoupon,
}) => {
	// eslint-disable-next-line
	const [animationDirection, setAnimationDirection] = useState("");

	const handleChangeDate = (date) => {
		const formatEnglishDate = (date) => {
			return moment(date).locale("en").format("MM/DD/YYYY");
		};
		if (date) {
			const formattedDate = formatEnglishDate(
				moment(date).format("MM/DD/YYYY")
			);
			setChosenDate(formattedDate);
		} else {
			setChosenDate(null);
		}
	};

	const hoursModifiedFunction = () => {
		// Assuming you have 'chosenDate' available in this scope.
		let now = moment.tz("Africa/Cairo").locale("en"); // Current date & time in the Egyptian time zone, set to English locale
		let chosenDateHelper = moment.tz(chosenDate, "Africa/Cairo").locale("en"); // Make sure this is in the correct date format. If it is a string, you might need to parse it first.

		// Check if chosenDate is today.
		if (now.isSame(chosenDateHelper, "day")) {
			// Current hour in HH:mm format in the Egyptian time zone
			let currentHour = moment.tz("Africa/Cairo").locale("en").format("HH:mm");
			// Check that employeeAvailability is not null or undefined before accessing hoursAvailable
			if (employeeAvailability && employeeAvailability.hoursAvailable) {
				// Filter hoursAvailable to only include times that are later than the current time
				return employeeAvailability.hoursAvailable.length > 0
					? employeeAvailability.hoursAvailable.filter(
							(time) => time >= currentHour
					  )
					: employeeAvailability.hoursAvailable;
			}
		} else {
			// If chosenDateHelper is not today, leave hoursAvailable as is
			if (employeeAvailability && employeeAvailability.hoursAvailable) {
				return employeeAvailability.hoursAvailable.length > 0
					? employeeAvailability.hoursAvailable
					: [];
			}
		}

		// Return empty array if employeeAvailability or hoursAvailable is undefined or null
		return [];
	};

	const servicesPicked =
		employeeAvailability && employeeAvailability.servicesPicked;

	// Calculate the sum of "servicePriceDiscount"
	const totalServicePriceDiscount =
		servicesPicked &&
		Number(
			servicesPicked.reduce(
				(sum, service) => sum + service.servicePriceDiscount,
				0
			)
		) - Number(discountCash);

	const totalServicePriceFinal = couponApplied
		? Number(
				totalServicePriceDiscount -
					totalServicePriceDiscount * (appliedCoupon.discount / 100)
		  ).toFixed(2)
		: totalServicePriceDiscount;

	const totalServicePrice =
		servicesPicked &&
		servicesPicked.reduce((sum, service) => sum + service.servicePrice, 0);

	return (
		<ScheduleFormHelperWrapper dir='rtl'>
			<>
				<div className='pt-2 pb-4'>
					<h3
						style={{
							fontSize: "1.5rem",
							fontWeight: "bolder",
							textTransform: "capitalize",
							textAlign: "center",
							color: "#e2c4c4",
						}}
					>
						Chosen Stylist:{" "}
						<strong>{pickedEmployee && pickedEmployee.employeeName}</strong>
					</h3>
				</div>

				<div
					className={` ${
						animationDirection === "slide-left"
							? "slide-in-left"
							: "slide-in-right"
					}`}
				>
					<label
						className='dataPointsReview mt-3'
						style={{
							fontWeight: "bold",
							fontSize: "1.05rem",
							color: "#32322b",
						}}
					>
						التاريخ
					</label>
					<br />
					<DatePicker
						className='inputFields'
						onChange={handleChangeDate}
						disabledDate={disabledDate}
						inputReadOnly
						max
						size='small'
						showToday={true}
						defaultValue={chosenDate ? moment(chosenDate, "MM/DD/YYYY") : null}
						placeholder='الرجاء اختيار التاريخ المطلوب'
						style={{
							height: "auto",
							width: "50%",
							padding: "10px",
							boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							borderRadius: "10px",
						}}
					/>
				</div>
				<div
					className={` ${
						animationDirection === "slide-left"
							? "slide-in-left"
							: "slide-in-right"
					}`}
				>
					<label
						className='dataPointsReview mr-2 mt-3'
						style={{
							fontWeight: "bold",
							fontSize: "1.05rem",
							color: "#32322b",
						}}
					>
						اختر من فضلك
					</label>
					<br />
					<select
						onChange={(e) => {
							setChosenCustomerType(e.target.value);
						}}
						placeholder='Select a Service'
						className='inputFields'
						style={{
							paddingTop: "12px",
							paddingBottom: "12px",
							paddingLeft: "5px",
							border: "#cfcfcf solid 1px",
							borderRadius: "10px",
							width: "50%",
							textTransform: "capitalize",
							fontSize: "0.9rem",
							boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						}}
					>
						{chosenCustomerType && chosenCustomerType !== "Please Select" ? (
							<option className='items text-muted'>{chosenCustomerType}</option>
						) : (
							<option className='items text-muted'>اختر من فضلك</option>
						)}
						{pickedEmployee &&
							allCustomerTypes &&
							allCustomerTypes[0] &&
							chosenDate &&
							allCustomerTypes.map((s, i) => {
								// console.log(s);
								return (
									<option key={i} value={s} className='items'>
										{s}
									</option>
								);
							})}
					</select>
				</div>

				{chosenCustomerType ? (
					<div
						className={`mt-3 ${
							animationDirection === "slide-left"
								? "slide-in-left"
								: "slide-in-right"
						}`}
					>
						<label
							className='dataPointsReview'
							style={{
								fontWeight: "bold",
								fontSize: "1.05rem",
								color: "#32322b",
							}}
						>
							اختر خدمة
						</label>
						<br />
						<Select
							mode='multiple'
							placeholder='اختر خدمة'
							value={serviceDetailsArray.map((i) => i.serviceName)}
							className='inputFields no-input-keyboard'
							style={{
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								width: "50%",
								textTransform: "capitalize",
								fontSize: "0.9rem",
								boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
							}}
							onChange={(values) => {
								const selectedServices = values.map((value) =>
									AllServices.find((service) => service.serviceName === value)
								);
								console.log(selectedServices, "selectedServices");

								setServiceDetailsArray(selectedServices);
							}}
						>
							<Option
								className='items text-muted inputFields'
								value=''
								disabled
							>
								اختر خدمة
							</Option>

							{pickedEmployee &&
								pickedEmployee.services &&
								AllServices &&
								AllServices.filter((s) => s.serviceName.trim() !== "").map(
									(s, i) => (
										<Option
											key={i}
											value={s.serviceName}
											className='items inputFields'
										>
											{s.serviceNameOtherLanguage}
										</Option>
									)
								)}
						</Select>
						<br />
						<br />
					</div>
				) : null}
				{employeeAvailability &&
				employeeAvailability.hoursAvailable &&
				employeeAvailability.hoursAvailable.length > 0 &&
				employeeAvailability.availability === "Available" &&
				serviceDetailsArray &&
				serviceDetailsArray.length > 0 &&
				hoursModifiedFunction() ? (
					<div
						className={`${
							animationDirection === "slide-left"
								? "slide-in-left"
								: "slide-in-right"
						}`}
					>
						<label
							className='dataPointsReview'
							style={{
								fontWeight: "bold",
								fontSize: "1.05rem",
								color: "#32322b",
							}}
						>
							اختر وقتًا
							<br />
							<span>الفترات الزمنية المتاحة للموظف</span>
						</label>
						<br />
						<select
							onChange={(e) => {
								setChosenTime(e.target.value);
							}}
							placeholder='Select a Time'
							className='inputFields mb-3'
							style={{
								paddingTop: "12px",
								paddingBottom: "12px",
								// paddingRight: "100px",
								// textAlign: "center",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								width: "50%",
								fontSize: "0.9rem",
								boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							}}
						>
							{chosenTime && chosenTime !== "Select Time" ? (
								<option className='items text-muted inputFields'>
									{chosenTime}
								</option>
							) : (
								<option className='items text-muted inputFields'>
									اختر وقتًا
								</option>
							)}

							{employeeAvailability &&
								employeeAvailability.hoursAvailable &&
								employeeAvailability.hoursAvailable &&
								hoursModifiedFunction() &&
								hoursModifiedFunction().map((t, i) => (
									<option key={i} value={t} className='items'>
										{t}
									</option>
								))}
						</select>
					</div>
				) : null}
				{employeeAvailability &&
				employeeAvailability.hoursAvailable &&
				employeeAvailability.hoursAvailable.length > 0 &&
				employeeAvailability.availability === "Available" &&
				serviceDetailsArray &&
				serviceDetailsArray.length > 0 ? (
					<div>
						{employeeAvailability &&
						employeeAvailability.hoursAvailable &&
						employeeAvailability.hoursAvailable.length > 0 &&
						employeeAvailability.availability === "Available" &&
						serviceDetailsArray &&
						serviceDetailsArray.length > 0 &&
						chosenTime ? (
							<div
								className={`${
									animationDirection === "slide-left"
										? "slide-in-left"
										: "slide-in-right"
								}`}
							>
								<label
									className='dataPointsReview'
									style={{
										fontWeight: "bold",
										fontSize: "1.05rem",
										color: "#32322b",
									}}
								>
									اسم العميل
								</label>
								<br />
								<input
									type='text'
									className='form-control '
									value={scheduledByUserName}
									onChange={(e) => setScheduledByUserName(e.target.value)}
									placeholder='يرجى ملء اسم العميل الخاص بك'
								/>
							</div>
						) : null}

						{employeeAvailability &&
						employeeAvailability.hoursAvailable &&
						employeeAvailability.hoursAvailable.length > 0 &&
						employeeAvailability.availability === "Available" &&
						serviceDetailsArray &&
						serviceDetailsArray.length > 0 &&
						chosenTime &&
						scheduledByUserName ? (
							<div
								className={`mt-3 ${
									animationDirection === "slide-left"
										? "slide-in-left"
										: "slide-in-right"
								}`}
							>
								<label
									className='dataPointsReview'
									style={{
										fontWeight: "bold",
										fontSize: "1.05rem",
										color: "#32322b",
									}}
								>
									هاتف العميل
								</label>
								<br />
								<input
									type='number'
									className='form-control '
									value={customerPhone}
									onChange={(e) => setCustomerPhone(e.target.value)}
									placeholder='يرجى ملء رقم هاتف العميل الخاص بك'
								/>
							</div>
						) : null}

						{employeeAvailability &&
						employeeAvailability.hoursAvailable &&
						employeeAvailability.hoursAvailable.length > 0 &&
						employeeAvailability.availability === "Available" &&
						serviceDetailsArray &&
						serviceDetailsArray.length > 0 &&
						chosenTime &&
						scheduledByUserName &&
						customerPhone &&
						customerPhone.length > 9 &&
						chosenDate &&
						chosenTime &&
						!user ? (
							<div
								className={`mb-3 mx-auto ${
									animationDirection === "slide-left"
										? "slide-in-left"
										: "slide-in-right"
								}`}
							>
								<div className='form-group col-md-8 mx-auto mt-3'>
									<label htmlFor='password' style={{ fontWeight: "bold" }}>
										كلمة المرور
									</label>
									<input
										type='password'
										name='password'
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										className='form-control '
										required
										placeholder='Should have at least one digit'
									/>
								</div>

								<div className='form-group col-md-8 mx-auto'>
									<label htmlFor='password2' style={{ fontWeight: "bold" }}>
										تأكيد كلمة المرور
									</label>
									<br />

									<input
										type='password'
										className='form-control '
										name='password2'
										value={password2}
										onChange={(e) => {
											setPassword2(e.target.value);
										}}
										required
										placeholder='Should have at least one digit'
									/>
								</div>
							</div>
						) : null}

						{employeeAvailability &&
						employeeAvailability.hoursAvailable &&
						employeeAvailability.hoursAvailable.length > 0 &&
						employeeAvailability.availability === "Available" &&
						serviceDetailsArray &&
						serviceDetailsArray.length > 0 &&
						chosenTime &&
						scheduledByUserName &&
						customerPhone &&
						customerPhone.length > 9 &&
						chosenDate &&
						chosenTime &&
						((password && password2 && password.length >= 6) ||
							(user && user.name)) ? (
							<div
								className={`mt-3 messageFromTo2 ${
									animationDirection === "slide-left"
										? "slide-in-left"
										: "slide-in-right"
								}`}
							>
								{window.scrollTo({ top: 550, behavior: "smooth" })}

								<div>
									<strong style={{ color: "#e2c4c4", fontSize: "1.5rem" }}>
										المراجعة:
									</strong>
								</div>
								<div>اسم العميل: {scheduledByUserName}</div>
								<div>هاتف العميل: {customerPhone}</div>
								<div style={{ textTransform: "capitalize" }}>
									اسم الموظف: {pickedEmployee && pickedEmployee.employeeName}
								</div>
								<div>
									تاريخ الموعد:{" "}
									<div className='mr-4'>
										الموعد في يوم: <br />{" "}
										{appointmentStarts() && appointmentStarts()[0]} <br />{" "}
										<span className='mr-3' style={{ fontSize: "1rem" }}>
											إلى
										</span>{" "}
										<br /> {appointmentStarts() && appointmentStarts()[1]}
									</div>
								</div>
								<div>
									الخدمات المختارة:
									{servicesPicked &&
										servicesPicked.map((s, i) => {
											return (
												<div
													style={{ textTransform: "capitalize" }}
													className='mr-3'
													key={i}
												>
													<div className='row'>
														<div className='col-5'>
															{s.serviceNameOtherLanguage}:
														</div>
														<div className='col-5'>
															{s.servicePriceDiscount} جنيه
														</div>
													</div>
												</div>
											);
										})}
								</div>

								<div className='mt-4' style={{ fontSize: "1.5rem" }}>
									المبلغ الإجمالي:{" "}
									{totalServicePrice === totalServicePriceFinal ? (
										<span>
											{" "}
											<strong>EGP {totalServicePriceFinal}</strong>{" "}
										</span>
									) : (
										<>
											<br />
											<s style={{ color: "#e2c4c4" }} className='mr-2'>
												EGP {totalServicePrice}
											</s>
											<span style={{ color: "#b9edb9" }}>
												<strong>EGP {totalServicePriceFinal}</strong>
											</span>
										</>
									)}
								</div>
							</div>
						) : null}

						{employeeAvailability &&
						employeeAvailability.hoursAvailable &&
						employeeAvailability.hoursAvailable.length > 0 &&
						employeeAvailability.availability === "Available" &&
						serviceDetailsArray &&
						serviceDetailsArray.length > 0 &&
						chosenTime &&
						scheduledByUserName &&
						customerPhone &&
						customerPhone.length > 9 &&
						chosenDate &&
						chosenTime &&
						((password && password2 && password.length >= 6) ||
							(user && user.name)) ? (
							<div
								className='my-5 text-center'
								onClick={() => {
									clickSubmitSchedule_NoPayment();

									ReactGA.event("Client_Successfully_Reserved", {
										event_category: "Client_Successfully_Reserved",
										event_label: "Client_Successfully_Reserved",
										value: 1, // Optional extra parameters
									});

									ReactPixel.track("Client_Successfully_Reserved", {
										content_name: "Client_Successfully_Reserved",
										content_category: "Client_Successfully_Reserved",
										value: "",
										currency: "",
									});

									if (window.ttq) {
										window.ttq.track("Client_Successfully_Reserved", {
											content_name: "Client_Successfully_Reserved",
											content_category: "Client_Successfully_Reserved",
											value: 1,
											currency: "USD", // Change the currency if needed
										});
									}
								}}
							>
								<button className='btn btn-success w-50'>احجز الآن</button>
							</div>
						) : null}
					</div>
				) : null}
			</>
		</ScheduleFormHelperWrapper>
	);
};

export default ScheduleFormHelperArabic;

const ScheduleFormHelperWrapper = styled.div`
	text-align: center;

	label {
		color: white !important;
		font-weight: bolder;
		font-size: 1.2rem;
	}

	.messageFromTo {
		color: white;
		font-weight: bolder;
	}

	.messageFromTo2 {
		text-align: right;
		color: white;
		font-weight: bolder;
		margin-right: 30px;
		margin-bottom: 70px;
	}

	.messageFromTo2 > div {
		font-size: 1rem;
	}

	input {
		width: 50% !important;
		margin: auto;
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

	.no-input-keyboard .ant-select-selector input {
		pointer-events: none !important;
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

	@media (max-width: 1200px) {
		.inputFields {
			width: 95% !important;
		}

		input {
			width: 95% !important;
			margin: auto;
		}

		label {
			font-size: 1rem !important;
		}
	}
`;
