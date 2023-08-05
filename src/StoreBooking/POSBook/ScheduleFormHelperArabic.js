import React from "react";
import styled from "styled-components";
import moment from "moment";
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
}) => {
	const handleChangeDate = (date) => {
		if (date) {
			const formattedDate = moment(date).format("MM/DD/YYYY");
			setChosenDate(formattedDate);
		} else {
			setChosenDate(null);
		}
	};

	const hoursModifiedFunction = () => {
		// Assuming you have 'chosenDate' available in this scope.
		let now = moment(); // Current date & time
		let chosenDateHelper = moment(chosenDate); // Make sure this is in correct date format. If it is a string, you might need to parse it first.

		// Check if chosenDate is today.
		if (now.isSame(chosenDateHelper, "day")) {
			// Current hour in HH:mm format
			let currentHour = moment().format("HH:mm");
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
	const totalServicePrice =
		servicesPicked &&
		servicesPicked.reduce((sum, service) => sum + service.servicePrice, 0);

	return (
		<ScheduleFormHelperWrapper dir='rtl'>
			<>
				<div className='pt-5 pb-4'>
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

				<div>
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
						max
						size='small'
						showToday={true}
						defaultValue={
							JSON.parse(localStorage.getItem("chosenDateFromFirstAvailable"))
								? moment(
										new Date(
											JSON.parse(
												localStorage.getItem("chosenDateFromFirstAvailable")
											)
										)
								  )
								: moment()
						}
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
				<div>
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
					<div className='mt-3'>
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
							className='inputFields'
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
					<>
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
					</>
				) : null}
				{employeeAvailability &&
				employeeAvailability.hoursAvailable &&
				employeeAvailability.hoursAvailable.length > 0 &&
				employeeAvailability.availability === "Available" &&
				serviceDetailsArray &&
				serviceDetailsArray.length > 0 ? (
					<div>
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
							<span>الموظف في جميع الفترات الزمنية</span>
							<br />
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

							{scheduledHours &&
								scheduledHours.map((t, i) => (
									<option key={i} value={t} className='items'>
										{t}
									</option>
								))}
						</select>
						{employeeAvailability &&
						employeeAvailability.hoursAvailable &&
						employeeAvailability.hoursAvailable.length > 0 &&
						employeeAvailability.availability === "Available" &&
						serviceDetailsArray &&
						serviceDetailsArray.length > 0 &&
						chosenTime ? (
							<div>
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
							<div className='mt-3'>
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
						chosenTime ? (
							<div className='mt-3 messageFromTo2'>
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
									{totalServicePrice === totalServicePriceDiscount ? (
										<span>
											{" "}
											<strong>EGP {totalServicePriceDiscount}</strong>{" "}
										</span>
									) : (
										<>
											<br />
											<s style={{ color: "#e2c4c4" }} className='mr-2'>
												EGP {totalServicePrice}
											</s>
											<span style={{ color: "#b9edb9" }}>
												<strong>EGP {totalServicePriceDiscount}</strong>
											</span>
										</>
									)}
									<div
										className='mt-4'
										style={{ fontSize: "1rem", color: "#b9edb9" }}
										onClick={() => {
											setModalVisible(true);
										}}
									>
										<strong>Add Discount...</strong>
									</div>
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
						chosenDate &&
						chosenTime ? (
							<div
								className='my-5 text-center'
								onClick={() => {
									clickSubmitSchedule_NoPayment();
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
