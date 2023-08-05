import React from "react";
import styled from "styled-components";
import moment from "moment";
import { DatePicker } from "antd";
import { Link } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const FirstAvailableAppointmentModified = ({
	user,
	language,
	chosenDate,
	setChosenDate,
	allCustomerType,
	allActiveServices,
	chosenCustomerType,
	setChosenCustomerType,
	chosenService,
	setChosenService,
	setServiceDetailsArray,
	serviceDetailsArray,
	appointmentFirst,
	loading,
}) => {
	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	const handleChosenCustomerType = (event) => {
		setChosenCustomerType(event.target.value);
	};

	const handleChangeDate = (date) => {
		if (date) {
			const formattedDate = moment(date).format("MM/DD/YYYY");
			setChosenDate(formattedDate);
		} else {
			setChosenDate(null);
		}
	};

	const addItem = (item = [], next = (f) => f) => {
		let barber = [];
		barber = item._id;

		localStorage.setItem("barber", JSON.stringify(barber));
		next();
	};

	const AddEmployee = () => {
		// console.log('added');
		var employee = appointmentFirst && appointmentFirst.Employee;
		addItem(employee);
		window.scrollTo(0, 0);
	};

	return (
		<FirstAvailableAppointmentModifiedWrapper dir='ltr'>
			<div className='mt-3 firstAvailableApp text-center'>
				Check First Available Appointment on{" "}
				{new Date(chosenDate).toDateString()}
			</div>{" "}
			<div className='horizLine col-6 col-lg-2 col-md-3  mx-auto'></div>
			<div className='mb-3'>
				<label
					style={{ marginRight: "20px" }}
					className='chooseDateServiceFirstAvail'
				>
					Choose a Date
				</label>

				<DatePicker
					onChange={handleChangeDate}
					size='small'
					// defaultValue={
					// 	JSON.parse(localStorage.getItem("chosenDateFromFirstAvailable"))
					// 		? moment(
					// 				new Date(
					// 					JSON.parse(
					// 						localStorage.getItem("chosenDateFromFirstAvailable")
					// 					)
					// 				)
					// 		  )
					// 		: moment()
					// }
					className='inputFieldsFirstAvail py-1'
					style={{ width: "63%" }}
					disabledDate={disabledDate}
					max
					showToday={true}
					// defaultValue={chosenDate || moment()}
					placeholder='Please pick the desired schedule date'
				/>
			</div>
			{chosenDate ? (
				<div>
					<label
						className='mt-3 chooseDateServiceFirstAvail'
						style={{ marginRight: "35px" }}
					>
						Service For
					</label>
					<select
						onChange={handleChosenCustomerType}
						placeholder='Please Select'
						style={{ textTransform: "capitalize", width: "63%" }}
						className='inputFieldsFirstAvail ml-1'
					>
						{chosenCustomerType && chosenCustomerType !== "Please Select" ? (
							<option className='items text-muted'>{chosenCustomerType}</option>
						) : (
							<option className='items text-muted'>Please Select</option>
						)}
						{allCustomerType &&
							allCustomerType.map((s, i) => (
								<option key={i} value={s.customerType} className='items'>
									{s.customerType}
								</option>
							))}
					</select>
					<br />
				</div>
			) : null}
			<div>
				{chosenCustomerType ? (
					<div>
						<label
							className='mt-3 chooseDateServiceFirstAvail'
							style={{ marginRight: "20px" }}
						>
							Select Services
						</label>
						<Select
							mode='multiple'
							placeholder='Select Services'
							className='inputFields'
							style={{
								borderRadius: "5px",
								width: "62%",
								textTransform: "capitalize",
							}}
							onChange={(values) => {
								const selectedServices = values.map((value) =>
									allActiveServices.find(
										(service) => service.serviceName === value
									)
								);
								console.log(selectedServices, "selectedServices");

								setServiceDetailsArray(selectedServices);
								setChosenService(
									selectedServices &&
										selectedServices.map((iii) => iii.serviceName)
								);
							}}
						>
							<Option
								className='items text-muted inputFields'
								value=''
								disabled
							>
								Select A Service
							</Option>

							{allActiveServices &&
								allActiveServices
									.filter((s) => s.serviceName.trim() !== "")
									.map((s, i) => (
										<Option
											key={i}
											value={s.serviceName}
											className='items inputFields'
										>
											{s.serviceName}
										</Option>
									))}
						</Select>
						<br />
						<br />
					</div>
				) : null}
			</div>
			{chosenCustomerType &&
			chosenDate &&
			chosenService &&
			appointmentFirst &&
			appointmentFirst.firstAvailableTime &&
			appointmentFirst.Employee &&
			appointmentFirst.Employee._id &&
			!loading ? (
				<div className='message'>
					The First Available Appointment is with{" "}
					<strong>
						{appointmentFirst &&
							appointmentFirst.Employee &&
							appointmentFirst.Employee.employeeName}{" "}
					</strong>
					AT{" "}
					<strong>
						{appointmentFirst && appointmentFirst.firstAvailableTime}
					</strong>
					<div
						onClick={AddEmployee}
						style={{
							fontWeight: "bold",
							fontSize: "1.2rem",
							marginBottom: "10px",
							marginTop: "10px",
							// letterSpacing: "5px",
							textShadow: "1px 2px 4px",
						}}
					>
						<Link
							className='btn btn-info'
							to={`/store/book-appointment-from-store2/employee/${appointmentFirst.Employee._id}`}
							onClick={() => {
								localStorage.setItem(
									"pickedServiceFirstAvailable",
									JSON.stringify(serviceDetailsArray)
								);
								localStorage.setItem(
									"CustomerType",
									JSON.stringify(chosenCustomerType)
								);

								localStorage.setItem(
									"chosenDateFromFirstAvailable",
									JSON.stringify(chosenDate)
								);
								window.scrollTo(0, 0);
							}}
						>
							Schedule Now...
						</Link>
					</div>
				</div>
			) : chosenCustomerType &&
			  chosenDate &&
			  chosenService &&
			  !appointmentFirst &&
			  !appointmentFirst.firstAvailableTime ? (
				<div className='message'>
					No Available Times In The Selected Date{" "}
					{new Date(chosenDate).toDateString()}
				</div>
			) : (
				<div className='message'>
					Please select a date and service to check the first available
					appointment...
				</div>
			)}
		</FirstAvailableAppointmentModifiedWrapper>
	);
};

export default FirstAvailableAppointmentModified;

const FirstAvailableAppointmentModifiedWrapper = styled.div`
	background: #191919;
	padding: 30px;
	border-radius: 20px;
	text-align: center;

	margin-left: 100px;
	margin-right: 100px;

	.contentWrapper {
		position: relative;
	}

	.message {
		color: wheat;
		font-weight: bolder;
		text-align: center;
	}

	@media (max-width: 1000px) {
		padding: 5px;
		margin-left: 1px;
		margin-right: 1px;
	}
`;
