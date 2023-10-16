import React from "react";
import styled from "styled-components";
import moment from "moment";
import { DatePicker } from "antd";
import { Link } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const FirstAvailableAppointmentClient = ({
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
					defaultValue={moment(chosenDate, "MM/DD/YYYY")}
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
								<option key={i} value={s} className='items'>
									{s}
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
							value={serviceDetailsArray.map((i) => i.serviceName)}
							placeholder='Select Services'
							className='inputFields no-input-keyboard'
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
							to={`/schedule-an-appointment`}
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
				<div className='pleaseSelectAServFirstAvail'>
					Please Select A Service To Check The First Available Appointment
					<div className='my-3 disclaimer'>
						If you have the need to schedule for more than one person, please
						schedule a separate appointment for each. You may be able to
						schedule the appointments with different stylists all at once to
						finish your styling needs with less time!
					</div>
				</div>
			)}
		</FirstAvailableAppointmentModifiedWrapper>
	);
};

export default FirstAvailableAppointmentClient;

const FirstAvailableAppointmentModifiedWrapper = styled.div`
	text-align: center;
	margin-left: 100px;
	margin-right: 100px;
	background-color: rgba(0, 0, 0, 0.85);
	padding: 30px;
	border-radius: 20px 100px;
	z-index: 1000;
	background-color: #4e0000;
	margin-left: 0px;
	margin-right: 0px;

	.contentWrapper {
		position: relative;
	}

	.no-input-keyboard .ant-select-selector input {
		pointer-events: none !important;
	}

	@media (max-width: 1000px) {
		background-color: #4e0000;
		margin-left: 0px;
		margin-right: 0px;
	}
`;
