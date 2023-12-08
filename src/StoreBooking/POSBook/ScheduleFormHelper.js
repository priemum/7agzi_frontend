import React from "react";
import styled from "styled-components";
import moment from "moment";
import "moment-timezone";
import { DatePicker } from "antd";
import { Select } from "antd";
const { Option } = Select;

const ScheduleFormHelper = ({
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
	clickSubmitSchedule_NoPayment,
	setModalVisible,
	discountCash,
	user,
}) => {
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
		if (
			user &&
			user.storeCountry &&
			user.storeCountry.toLowerCase() === "united states"
		) {
			// Use local timezone for users in the United States

			let now = moment().locale("en"); // Current date & time in the local timezone, set to English locale
			let chosenDateHelper = moment(chosenDate).locale("en"); // Make sure this is in the correct date format. If it is a string, you might need to parse it first.

			// Check if chosenDate is today.
			if (now.isSame(chosenDateHelper, "day")) {
				// Current hour in HH:mm format in the local timezone
				let currentHour = moment().locale("en").format("HH:mm");
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
		} else {
			// Assuming you have 'chosenDate' available in this scope.
			let now = moment.tz("Africa/Cairo").locale("en"); // Current date & time in the Egyptian time zone, set to English locale
			let chosenDateHelper = moment.tz(chosenDate, "Africa/Cairo").locale("en"); // Make sure this is in the correct date format. If it is a string, you might need to parse it first.

			// Check if chosenDate is today.
			if (now.isSame(chosenDateHelper, "day")) {
				// Current hour in HH:mm format in the Egyptian time zone
				let currentHour = moment
					.tz("Africa/Cairo")
					.locale("en")
					.format("HH:mm");
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
		}
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
		<ScheduleFormHelperWrapper dir='ltr'>
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
						Select An Appointment Date
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
						placeholder='Please pick the desired schedule date'
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
						Please Select
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
							paddingRight: "5px",
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
							<option className='items text-muted'>Please Select</option>
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
							Select A Service
						</label>
						<br />

						<Select
							mode='multiple'
							inputReadOnly
							placeholder='Select a Service'
							value={serviceDetailsArray.map((i) => i.serviceName)}
							className='inputFields no-input no-input-keyboard'
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

								setServiceDetailsArray(selectedServices);
							}}
						>
							<Option
								className='items text-muted inputFields'
								value=''
								disabled
							>
								Select A Service
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
											{s.serviceName}
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
							Select An Appointment Time
							<br />
							<span>Employee Free Time Slots</span>
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
									Select Time
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
				) : (
					<div
						style={{
							fontWeight: "bolder",
							color: "white",
							marginTop: "20px",
							textAlign: "center",
						}}
					>
						No Available Appointments On The Selected Date, Please Choose
						Another One.
					</div>
				)}
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
							<div>
								<label
									className='dataPointsReview'
									style={{
										fontWeight: "bold",
										fontSize: "1.05rem",
										color: "#32322b",
									}}
								>
									Customer Name
								</label>
								<br />
								<input
									type='text'
									className='form-control '
									value={scheduledByUserName}
									onChange={(e) => setScheduledByUserName(e.target.value)}
									placeholder='Please fill in your client name'
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
									Customer Phone
								</label>
								<br />
								<input
									type='number'
									className='form-control '
									value={customerPhone}
									onChange={(e) => setCustomerPhone(e.target.value)}
									placeholder='Please fill in your client phone'
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
							<div className='mt-5 messageFromTo2 container mx-auto'>
								<div>
									<strong style={{ color: "#e2c4c4", fontSize: "1.1rem" }}>
										REVIEW:
									</strong>
								</div>
								<div>Customer Name: {scheduledByUserName}</div>
								<div>Customer Phone: {customerPhone}</div>
								<div style={{ textTransform: "capitalize" }}>
									Stylist Name: {pickedEmployee && pickedEmployee.employeeName}
								</div>
								<div>
									Appointment Date:{" "}
									<div className='ml-4'>
										Appointment is from: <br />{" "}
										{appointmentStarts() && appointmentStarts()[0]} <br />{" "}
										<span className='ml-3' style={{ fontSize: "1rem" }}>
											to
										</span>{" "}
										<br /> {appointmentStarts() && appointmentStarts()[1]}
									</div>
								</div>
								<div>
									Picked Services:
									{servicesPicked &&
										servicesPicked.map((s, i) => {
											return (
												<div
													style={{ textTransform: "capitalize" }}
													className='ml-3'
													key={i}
												>
													<div className='row'>
														<div className='col-5'>{s.serviceName}:</div>
														<div className='col-5'>
															{user && user.storeCountry === "egypt"
																? "EGP"
																: "$"}{" "}
															{s.servicePriceDiscount}
														</div>
													</div>
												</div>
											);
										})}
								</div>

								<div className='mt-4' style={{ fontSize: "1.5rem" }}>
									Total Amount:{" "}
									{totalServicePrice === totalServicePriceDiscount ? (
										<span>
											{" "}
											<strong>
												{user.storeCountry === "egypt" ? "EGP" : "USD"}{" "}
												{totalServicePriceDiscount}
											</strong>{" "}
										</span>
									) : (
										<>
											<br />
											<s style={{ color: "#e2c4c4" }} className='mr-2'>
												{user.storeCountry === "egypt" ? "EGP" : "USD"}{" "}
												{totalServicePrice}
											</s>
											<span style={{ color: "#b9edb9" }}>
												<strong>
													{user.storeCountry === "egypt" ? "EGP" : "USD"}{" "}
													{totalServicePriceDiscount}
												</strong>
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
								<button className='btn btn-success w-50'>BOOK NOW</button>
							</div>
						) : null}
					</div>
				) : null}
			</>
		</ScheduleFormHelperWrapper>
	);
};

export default ScheduleFormHelper;

const ScheduleFormHelperWrapper = styled.div`
	text-align: center;

	label {
		color: white !important;
		font-weight: bolder;
	}

	.messageFromTo {
		color: white;
		font-weight: bolder;
	}

	.messageFromTo2 {
		text-align: left;
		color: white;
		font-weight: bolder;
		margin-left: 30px;
		margin-bottom: 70px;
	}

	input {
		width: 50% !important;
		margin: auto;
	}

	.no-input {
		> div > div > input {
			pointer-events: none !important;
		}
	}

	.no-input-keyboard .ant-select-selector input {
		pointer-events: none !important;
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
			font-size: 15px !important;
		}
	}
`;
