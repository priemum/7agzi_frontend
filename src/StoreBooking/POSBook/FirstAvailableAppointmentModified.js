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
		<FirstAvailableAppointmentModifiedWrapper dir='ltr' className='ml-2'>
			<div style={{ fontWeight: "bolder", fontSize: "1rem" }} className='mb-4'>
				<strong> Date: {new Date(chosenDate).toLocaleDateString()}</strong>
			</div>

			<div className='mb-2'>
				<label className='mr-2 chooseDateServiceFirstAvail '>
					Choose A Different Date
				</label>
				<DatePicker
					onChange={handleChangeDate}
					size='small'
					defaultValue={moment(chosenDate, "MM/DD/YYYY")}
					className='inputFieldsFirstAvail py-1'
					style={{ width: "70%" }}
					disabledDate={disabledDate}
					max
					inputReadOnly
					showToday={true}
					// defaultValue={chosenDate || moment()}
					placeholder='Choose a different Date If Needed'
				/>
			</div>
			{chosenDate ? (
				<div>
					<label className='ml-3 mt-3 chooseDateServiceFirstAvail'>
						Service For:
					</label>
					<select
						onChange={handleChosenCustomerType}
						placeholder='Please Select'
						style={{
							textTransform: "capitalize",
							width: "70%",
							marginLeft: "30px",
						}}
						className='inputFieldsFirstAvail'
					>
						{chosenCustomerType && chosenCustomerType !== "Please Select" ? (
							<option className='items text-muted'>{chosenCustomerType}</option>
						) : (
							<option className='items text-muted'>Please Select </option>
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
			<div className='mt-3'>
				{chosenCustomerType ? (
					<React.Fragment>
						<label className='ml-2 chooseDateServiceFirstAvail'>
							Choose Set Of Services
						</label>

						<Select
							mode='multiple'
							inputReadOnly
							placeholder='Please select the services needed'
							className='inputFields no-input-keyboard'
							style={{
								borderRadius: "5px",
								width: "70%",
								textTransform: "capitalize",
								marginLeft: "30px",
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
						<div className='my-4' style={{ background: "white" }}>
							<table className='table table-bordered table-md-responsive table-hover table-striped'>
								<thead
								// className='thead-light'
								// style={{border: "2px black solid"}}
								>
									<tr>
										<th scope='col'>#</th>
										<th scope='col'>Service</th>
										<th scope='col'>Duration </th>
										<th scope='col'>Price</th>
									</tr>
								</thead>
								<tbody>
									{serviceDetailsArray &&
										serviceDetailsArray.length > 0 &&
										serviceDetailsArray.map((d, i) => {
											return (
												<tr key={i}>
													<td>{i + 1}</td>
													<td style={{ textTransform: "capitalize" }}>
														{d.serviceName}
													</td>
													<td>{d.serviceTime} Minutes</td>
													<td>
														{user.storeCountry === "egypt" ? "EGP" : "USD"}{" "}
														{d.servicePriceDiscount}
													</td>
												</tr>
											);
										})}
									<tr>
										<td></td>
										<td></td>
										<td></td>
										<td>
											{user.storeCountry === "egypt" ? "EGP" : "USD"}{" "}
											{serviceDetailsArray &&
												serviceDetailsArray.reduce((total, serviceDetail) => {
													return total + serviceDetail.servicePriceDiscount;
												}, 0)}{" "}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</React.Fragment>
				) : null}
			</div>
			{chosenCustomerType &&
			chosenDate &&
			chosenService &&
			appointmentFirst &&
			appointmentFirst.firstAvailableTime &&
			!loading ? (
				<div className='message mt-4'>
					First Available Appointment
					<strong>
						{appointmentFirst &&
							appointmentFirst.Employee &&
							appointmentFirst.Employee.employeeName}
					</strong>{" "}
					at <strong>{new Date(chosenDate).toLocaleDateString()}</strong>{" "}
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
							BOOK NOW
						</Link>
					</div>
				</div>
			) : chosenCustomerType &&
			  chosenDate &&
			  chosenService &&
			  !appointmentFirst &&
			  !appointmentFirst.firstAvailableTime ? (
				<div className='message'>
					No Available Appointments
					{new Date(chosenDate).toLocaleDateString("ar-EG")}
				</div>
			) : null}
		</FirstAvailableAppointmentModifiedWrapper>
	);
};

export default FirstAvailableAppointmentModified;

const FirstAvailableAppointmentModifiedWrapper = styled.div`
	padding: 30px;
	border-radius: 20px;

	.contentWrapper {
		position: relative;
	}

	label {
		font-size: 15px;
	}
	.message {
		font-weight: bolder;
		text-align: center;
	}

	.no-input-keyboard .ant-select-selector input {
		pointer-events: none !important;
	}

	@media (max-width: 1000px) {
		padding: 5px;
	}
`;
