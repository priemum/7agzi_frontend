import {DatePicker} from "antd";
import moment from "moment";
import React from "react";
import styled from "styled-components";

const FormStep1 = ({
	storeClosed_NotClosed,
	storeClosed_NotClosedCustomized,
	pickedEmployee,
	availableHoursModified,
	setChosenDate,
	handleChosenCustomerType,
	chosenCustomerType,
	HistOrders,
	allCustomerTypes,
	handleChosenService,
	AllServicesModified,
	chosenService,
	chosenDate,
	chosenDateName,
	handleScheduleTime,
	appointmentRange,
	ServiceTime_Duration,
	chosenTime,
}) => {
	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	return (
		<FormStep1Wrapper>
			<div>
				{storeClosed_NotClosed && (
					<div
						style={{
							fontSize: "0.8rem",
							color: "red",
							fontWeight: "bold",
						}}
					>
						Hair Salon is closed on the chosen date, Please select another date.
					</div>
				)}
				{storeClosed_NotClosedCustomized && (
					<div
						style={{
							fontSize: "0.8rem",
							color: "red",
							fontWeight: "bold",
						}}
					>
						Hair Salon is closed on the chosen date, Please select another date.
					</div>
				)}

				<div className='float-left ml-5 '>
					<span
						className='dataPointsReview'
						style={{fontSize: "1.1rem", color: "black"}}
					>
						{" "}
						<strong> Stylist Name:</strong>{" "}
					</span>{" "}
					<span
						className='dataPointsReview'
						style={{
							color: "#00407f",
							fontSize: "1.1rem",
							fontWeight: "bold",
						}}
					>
						{pickedEmployee.employeeName}
					</span>
				</div>
				<br />
				<br />

				<label
					className='dataPointsReview'
					style={{
						fontWeight: "bold",
						fontSize: "1.05rem",
						color: "#32322b",
					}}
				>
					Select An Appointment Date
					<br />
					{availableHoursModified() && availableHoursModified().length < 1 && (
						<React.Fragment>
							<span
								className='textResizeMessages'
								style={{fontSize: "0.75rem", color: "red"}}
							>
								{" "}
								Please note that {pickedEmployee.employeeName} is fully booked
								for the chosen date.
							</span>{" "}
						</React.Fragment>
					)}
					<React.Fragment>
						{pickedEmployee &&
						pickedEmployee.workingDays &&
						pickedEmployee.workingDays.indexOf(chosenDateName) < 0 &&
						availableHoursModified() &&
						availableHoursModified().length >= 1 ? (
							<React.Fragment>
								<span
									className='textResizeMessages'
									style={{fontSize: "0.75rem", color: "red"}}
								>
									{" "}
									Please note that {pickedEmployee.employeeName} is off on the
									selected date, Please choose another date.
								</span>{" "}
							</React.Fragment>
						) : null}
					</React.Fragment>
				</label>
				<br />
				<DatePicker
					className='inputFields'
					onChange={(date) =>
						setChosenDate(date || new Date(date._d).toLocaleDateString())
					}
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
					placeholder='Please pick the desired schedule date'
					style={{
						height: "auto",
						width: "50%",
						marginBottom: "30px",
						padding: "10px",
						boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						borderRadius: "10px",
					}}
				/>
				<br />
				<label
					className='dataPointsReview mr-2'
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
					onChange={handleChosenCustomerType}
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
					{HistOrders &&
						pickedEmployee &&
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
				<br />
				<br />
				{chosenCustomerType ? (
					<React.Fragment>
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
						<select
							onChange={handleChosenService}
							placeholder='Select a Service'
							className='inputFields'
							style={{
								paddingTop: "12px",
								paddingBottom: "12px",
								paddingRight: "100px",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								width: "50%",
								textTransform: "capitalize",
								fontSize: "0.9rem",
								boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							}}
						>
							{chosenService && chosenService !== "Select a Service" ? (
								<option className='items text-muted inputFields'>
									{chosenService}
								</option>
							) : (
								<option className='items text-muted inputFields'>
									Select A Service
								</option>
							)}
							{pickedEmployee &&
								pickedEmployee.services &&
								AllServicesModified &&
								AllServicesModified.map((s, i) => (
									<option
										key={i}
										value={s.serviceName}
										className='items inputFields'
									>
										{s.serviceName}
									</option>
								))}
						</select>
						{}
						<br />
						<br />
					</React.Fragment>
				) : null}
				{chosenDate &&
				pickedEmployee &&
				chosenService &&
				pickedEmployee.workingDays &&
				pickedEmployee.workingDays.indexOf(chosenDateName) >= 0 ? (
					<React.Fragment>
						<label
							className='dataPointsReview'
							style={{
								fontWeight: "bold",
								fontSize: "1.05rem",
								color: "#32322b",
							}}
						>
							Select An Appointment Time
						</label>
						<br />
						<select
							onChange={handleScheduleTime}
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

							{availableHoursModified() &&
								availableHoursModified().map((t, i) => (
									<option key={i} value={t} className='items'>
										{t}
									</option>
								))}
						</select>
						<br />
						{chosenTime && (
							<React.Fragment>
								<span
									className='dataPointsReview'
									style={{
										fontSize: "0.9rem",
										color: "black",
										fontWeight: "bold",
									}}
								>
									Your Appointment is scheduled from {appointmentRange()} (
									{ServiceTime_Duration && ServiceTime_Duration.serviceTime}{" "}
									mins)
								</span>{" "}
							</React.Fragment>
						)}
					</React.Fragment>
				) : (
					<React.Fragment>
						<label
							className='dataPointsReview'
							style={{
								fontWeight: "bold",
								fontSize: "1.05rem",
								color: "#32322b",
							}}
						>
							Select An Appointment Time
						</label>
						<br />
						<select
							onChange={handleScheduleTime}
							className='selectaTime inputFields'
							placeholder='Select a Time'
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
							<option className='items text-muted'>
								Please select a date and a service first
							</option>
						</select>
					</React.Fragment>
				)}
			</div>
		</FormStep1Wrapper>
	);
};

export default FormStep1;

const FormStep1Wrapper = styled.div``;
